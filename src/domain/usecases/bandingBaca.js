// bandingBaca.js — pembanding bacaan untuk fitur Tes Baca (Gelombang 6).
// Domain MURNI: tanpa DOM, tanpa fetch, tanpa state — bisa diimpor Node
// langsung (lihat skrip uji /tmp/uji-banding.mjs) dan oleh TesBacaPage.
//
// Konteks: halaman merekam suara pengguna (Web Speech API, lang ar-SA),
// mendapat TRANSKRIP Arab mentah dari ASR, lalu membandingkannya dengan
// teks ayat target. ASR Arab TIDAK konsisten soal harakat dan bentuk
// huruf (hamzah, ta marbuthah, alif maqshurah, …), jadi kedua sisi WAJIB
// dinormalisasi dulu — kalau tidak, bacaan yang benar akan dinilai salah
// hanya karena perbedaan penulisan, bukan perbedaan bacaan.

/**
 * Normalisasi teks Arab untuk PERBANDINGAN (bukan untuk ditampilkan).
 *
 * Keputusan penyamaan huruf (didokumentasikan sesuai desain fitur):
 * - Harakat/diakritik dibuang semua: fathah, dammah, kasrah, sukun,
 *   syaddah, tanwin (U+064B–U+0652), alif khanjariyah/dagger alif
 *   (U+0670), tanda-tanda kecil lain (U+0610–U+061A, U+06D6–U+06ED),
 *   dan tatweel/kashida (U+0640). ASR hampir tidak pernah mengeluarkan
 *   harakat, sedangkan teks mushaf Uthmani penuh harakat — tanpa langkah
 *   ini tidak akan pernah ada kata yang cocok.
 * - Bentuk alif disatukan ke alif polos (ا): أ إ آ ٱ → ا. ASR sering
 *   memilih bentuk hamzah yang berbeda dari mushaf untuk bunyi yang sama.
 * - Alif maqshurah → ya: ى → ي (bunyi akhirnya sama, ASR campur aduk).
 * - Ta marbuthah → ha: ة → ه. DIPILIH disamakan (bukan dipertahankan)
 *   karena ة di akhir kata memang dibaca "h" saat waqaf dan ASR sangat
 *   sering menulis ه untuk bunyi itu; mempertahankannya akan menghukum
 *   bacaan waqaf yang sah.
 * - Hamzah pembawa disederhanakan ke huruf kursinya: ئ → ي, ؤ → و.
 * - Tanda baca (Arab maupun Latin) → spasi, spasi dirapikan. Angka dan
 *   huruf non-Arab dibiarkan apa adanya (transkrip ar-SA murni Arab,
 *   tetapi fungsi ini tidak boleh meledak bila ada sisipan Latin).
 *
 * Pola ini memperluas semangat `normalisasi()` di indeksPencarian.js
 * (buang \p{M} + tatweel) tetapi khusus Arab: versi di sana generik
 * untuk pencarian Latin+Arab dan tidak menyamakan bentuk huruf Arab.
 */
export function normalisasiArab(teks) {
  return String(teks ?? '')
    .replace(/\u0640/g, '') // tatweel
    .replace(
      /[\u064B-\u0652\u0670\u0610-\u061A\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g,
      '',
    ) // harakat & diakritik (rentang sama di komentar normalisasiArab)
    .replace(/[أإآٱ]/g, 'ا') // semua bentuk alif → ا
    .replace(/ى/g, 'ي') // alif maqshurah → ya
    .replace(/ة/g, 'ه') // ta marbuthah → ha (keputusan di atas)
    .replace(/ئ/g, 'ي') // hamzah di atas ya → ya
    .replace(/ؤ/g, 'و') // hamzah di atas waw → waw
    .replace(/[^\p{L}\p{N}\s]/gu, ' ') // tanda baca → spasi
    .replace(/\s+/g, ' ')
    .trim();
}

/** Tokenisasi: normalisasi dulu, lalu potong per kata. */
function tokenisasi(teks) {
  const n = normalisasiArab(teks);
  return n ? n.split(' ') : [];
}

/** Ukuran jendela geser penyelarasan (lihat bandingkanAyat). */
const JENDELA = 2;

/**
 * Varian ternormalisasi satu kata untuk PERBANDINGAN.
 *
 * Masalah dagger alif (U+0670, alif khanjariyah): di mushaf Uthmani
 * bunyi "ā" panjang sering ditulis TANDA KECIL ini, bukan alif penuh —
 * mis. مَٰلِكِ dan ٱلْعَٰلَمِينَ. Bila U+0670 dibuang (perilaku
 * normalisasiArab), hasilnya "ملك"/"العلمين", padahal ASR menulis ejaan
 * modern ber-alif penuh "مالك"/"العالمين". Sebaliknya هَٰذَا memang
 * ditulis ASR "هذا" (tanpa alif). Tidak ada satu pilihan yang benar
 * untuk semua kata, jadi kata target dibandingkan dalam DUA varian —
 * dagger dibuang DAN dagger → alif penuh — dan dianggap sama bila
 * salah satu varian cocok dengan kata transkrip. (Terverifikasi dengan
 * data nyata Al-Fatihah 1:2 & 1:4 — lihat skrip uji kasus 2–4.)
 */
function varianKata(kataMentah) {
  const polos = normalisasiArab(kataMentah).replace(/\s+/g, '');
  const denganAlif = normalisasiArab(String(kataMentah ?? '').replace(/ٰ/g, 'ا')).replace(
    /\s+/g,
    '',
  );
  return polos === denganAlif ? [polos] : [polos, denganAlif];
}

/**
 * Bandingkan teks ayat target dengan transkrip ASR, kata per kata.
 *
 * Algoritme penyelarasan — indeks berjalan + jendela geser kecil:
 * Kata target diproses satu per satu dari awal. Sebuah indeks `j`
 * berjalan maju di daftar kata transkrip (tidak pernah mundur):
 * 1. Bila kata transkrip di `j` sama dengan kata target → BENAR, `j++`.
 * 2. Bila tidak, cari kata target di jendela kecil berikutnya
 *    (`j+1 … j+JENDELA`) di transkrip. Ketemu → BENAR dan `j` melompat
 *    ke sesudah posisi temuan (kata sisipan ASR di antaranya dilewati —
 *    menangani kata ekstra/hesitasi yang tertangkap ASR).
 * 3. Bila tidak ketemu, periksa apakah kata transkrip di `j` adalah kata
 *    target BERIKUTNYA. Bila ya → kata target ini HILANG di bacaan
 *    (pelafalan terlewat): SALAH, `j` TIDAK maju agar kata berikutnya
 *    tetap bisa cocok (menangani satu kata hilang tanpa menggeser
 *    seluruh sisa ayat menjadi salah semua).
 * 4. Selain itu → kata target terucap SALAH (substitusi): SALAH, `j++`
 *    (kata transkrip yang keliru itu "terpakai" sebagai percobaan yang
 *    salah, sehingga kata berikutnya kembali sejajar).
 * Ini penyelarasan rakus (greedy) yang sederhana dan dapat dijelaskan —
 * BUKAN jarak Levenshtein penuh — dan cukup untuk umpan balik per kata
 * pada ayat pendek; keterbatasannya: sisipan lebih dari JENDELA kata
 * berturut-turut dapat menggeser penilaian kata sesudahnya.
 *
 * @param {string} teksAyat  Teks Arab ayat target (boleh berharakat).
 * @param {string} transkrip Transkrip ASR (boleh tanpa harakat).
 * @returns {{ perKata: Array<{ kata: string, benar: boolean }>, skor: number }}
 *   `kata` adalah kata ASLI dari ayat (dengan harakatnya, untuk
 *   ditampilkan); `skor` persen 0–100 dari kata target yang benar.
 *   Ayat kosong → perKata [] dan skor 0.
 */
export function bandingkanAyat(teksAyat, transkrip) {
  const kataAsli = String(teksAyat ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (kataAsli.length === 0) return { perKata: [], skor: 0 };

  // Normalisasi per kata target (bukan per teks penuh) agar pemetaan
  // 1:1 dengan kata asli untuk tampilan tetap terjaga. Tiap kata target
  // disimpan sebagai daftar VARIAN (lihat varianKata — dagger alif);
  // kata transkrip dianggap sama bila cocok dengan salah satu varian.
  const target = kataAsli.map(varianKata);
  const ucap = tokenisasi(transkrip);
  const sama = (idxTarget, kataUcap) => target[idxTarget].includes(kataUcap);

  const perKata = [];
  let j = 0;
  let jumlahBenar = 0;

  for (let i = 0; i < target.length; i += 1) {
    let benar = false;

    if (j < ucap.length && sama(i, ucap[j])) {
      // Kasus 1: sejajar persis.
      benar = true;
      j += 1;
    } else {
      // Kasus 2: jendela geser — lewati sisipan ASR.
      let lompat = -1;
      for (let k = j + 1; k <= Math.min(j + JENDELA, ucap.length - 1); k += 1) {
        if (sama(i, ucap[k])) {
          lompat = k;
          break;
        }
      }
      if (lompat >= 0) {
        benar = true;
        j = lompat + 1;
      } else if (j < ucap.length && i + 1 < target.length && sama(i + 1, ucap[j])) {
        // Kasus 3: kata ini hilang di bacaan — j jangan maju.
        benar = false;
      } else {
        // Kasus 4: substitusi/kata salah — pakai satu kata transkrip.
        benar = false;
        if (j < ucap.length) j += 1;
      }
    }

    if (benar) jumlahBenar += 1;
    perKata.push({ kata: kataAsli[i], benar });
  }

  return {
    perKata,
    skor: Math.round((jumlahBenar / target.length) * 100),
  };
}

export default bandingkanAyat;
