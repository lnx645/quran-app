// Data statis Sholawat (data layer): koleksi sholawat yang redaksinya
// bersumber jelas dari Al-Qur'an / hadits sahih, plus keutamaannya.
//
// KEJUJURAN SUMBER TEKS SUCI — tidak ada teks yang dikarang di sini:
//   - Sholawat Ibrahimiyah .. DIIMPOR persis dari panduanSholatData.js
//     (GERAKAN_SHOLAT, bacaan "Tasyahud Akhir"): bagian sholawatnya
//     dipotong mulai penanda lafaznya dari bacaan tasyahud akhir yang
//     utuh, tanpa mengetik ulang satu huruf pun — jadi arab/latin/arti
//     dijamin sama persis dengan yang sudah terverifikasi di aplikasi.
//     Redaksi yang sama juga dipakai sholatSunnahData.js (SHOLAT_JENAZAH,
//     takbir kedua sholat jenazah).
//   - Sholawat ringkas ...... potongan penutup bacaan "Tasyahud Awal"
//     pada berkas yang sama (Allāhumma shalli 'alā Muhammad wa 'alā āli
//     Muhammad) — lafaz minimal sholawat di dalam sholat.
//   - Sholawat Jibril ....... redaksi pendek masyhur "Shallallāhu 'alā
//     Muhammad" (صَلَّى اللَّهُ عَلَى مُحَمَّدٍ) — bentuk salam/sholawat
//     ringkas yang lazim diajarkan untuk dzikir harian.
//   - QS. Al-Ahzab: 56 ...... HANYA referensi + tema, mengikuti pola
//     ayatPilihanData.js (entri surah 33 ayat 56, tema "Bershalawat
//     kepada Nabi") yang memang sengaja tanpa teks ayat. Teks Arab &
//     terjemahan resmi ayat dibaca di halaman surah aplikasi ini
//     (sumber Quran.com / terjemahan Kemenag) — tidak diketik dari
//     ingatan di berkas ini.
//   - Keutamaan ............. ringkasan bermakna dalam Bahasa Indonesia
//     (bukan kutipan Arab) dari hadits-hadits masyhur, dengan sumber
//     riwayat tercantum pada tiap entri.
//
// CAKUPAN (disengaja sempit): Noor hanya memuat sholawat yang
// redaksinya bersumber jelas dari Al-Qur'an/hadits — sholawat susunan
// ulama yang redaksinya diperselisihkan (mis. Nariyah, Munfarijah,
// Fatih) TIDAK dimuat. Lihat CATATAN_CAKUPAN_SHOLAWAT.
//
// Modul ini hanya diimpor oleh SholawatPage agar ikut chunk halamannya.
import { GERAKAN_SHOLAT } from './panduanSholatData.js';

// --- Ambil teks tasyahud yang sudah ada di aplikasi (tanpa ketik ulang) ---
const bacaanTasyahudAwal = GERAKAN_SHOLAT.find((g) => g.nama === 'Tasyahud Awal')?.bacaan;
const bacaanTasyahudAkhir = GERAKAN_SHOLAT.find((g) => g.nama === 'Tasyahud Akhir')?.bacaan;

// Potong teks mulai penanda lafaz; bila penanda tidak ditemukan, kembalikan
// teks utuhnya apa adanya (tidak pernah mengarang teks pengganti).
function mulaiDari(teks, penanda) {
  if (!teks) return teks;
  const idx = teks.indexOf(penanda);
  return idx >= 0 ? teks.slice(idx) : teks;
}

// Sholawat Ibrahimiyah = bagian sholawat dari bacaan Tasyahud Akhir.
const IBRAHIMIYAH = {
  arab: mulaiDari(bacaanTasyahudAkhir?.arab, 'اللَّهُمَّ صَلِّ'),
  latin: mulaiDari(bacaanTasyahudAkhir?.latin, 'Allāhumma shalli'),
  arti: mulaiDari(
    bacaanTasyahudAkhir?.arti,
    'Ya Allah, limpahkanlah shalawat kepada Muhammad dan keluarga Muhammad sebagaimana',
  ),
};

// Sholawat ringkas = lafaz sholawat penutup bacaan Tasyahud Awal.
const RINGKAS = {
  arab: mulaiDari(bacaanTasyahudAwal?.arab, 'اللَّهُمَّ صَلِّ'),
  latin: mulaiDari(bacaanTasyahudAwal?.latin, 'Allāhumma shalli'),
  arti: mulaiDari(
    bacaanTasyahudAwal?.arti,
    'Ya Allah, limpahkanlah shalawat kepada Muhammad dan keluarga Muhammad.',
  ),
};

/**
 * Daftar sholawat terverifikasi.
 * Tiap entri: { id, nama, arab, latin, arti, sumber, bisaDihitung }.
 * bisaDihitung menandai bacaan yang disediakan mode hitung di halaman;
 * cara menghitungnya (per ketuk vs per bacaan lengkap) dijelaskan di
 * halaman — Ibrahimiyah dihitung per SATU BACAAN LENGKAP, bukan per kata.
 */
export const SHOLAWAT_LIST = [
  {
    id: 'ibrahimiyah',
    nama: 'Sholawat Ibrahimiyah',
    arab: IBRAHIMIYAH.arab,
    latin: IBRAHIMIYAH.latin,
    arti: IBRAHIMIYAH.arti,
    sumber:
      'Bacaan tasyahud akhir dalam sholat — teks persis dari panduanSholatData.js (bacaan Tasyahud Akhir); redaksi sama di sholatSunnahData.js (takbir kedua sholat jenazah). Diriwayatkan dalam hadits tentang cara bershalawat (HR. Bukhari & Muslim, dari Ka’ab bin ‘Ujrah).',
    bisaDihitung: true,
  },
  {
    id: 'jibril',
    nama: 'Sholawat Jibril',
    arab: 'صَلَّى اللَّهُ عَلَى مُحَمَّدٍ',
    latin: "Shallallāhu 'alā Muhammad.",
    arti: 'Semoga Allah melimpahkan shalawat kepada Muhammad.',
    sumber:
      'Redaksi pendek masyhur “Shallallāhu ’alā Muhammad” — lafaz sholawat ringkas yang lazim dipakai untuk dzikir harian.',
    bisaDihitung: true,
  },
  {
    id: 'ringkas',
    nama: 'Sholawat Ringkas',
    arab: RINGKAS.arab,
    latin: RINGKAS.latin,
    arti: RINGKAS.arti,
    sumber:
      'Lafaz sholawat di dalam tasyahud — teks persis dari panduanSholatData.js (penutup bacaan Tasyahud Awal); lafaz minimal sholawat atas Nabi ﷺ di dalam sholat.',
    bisaDihitung: true,
  },
];

export default SHOLAWAT_LIST;

// Referensi ayat perintah bershalawat — REFERENSI + TEMA saja, tanpa teks
// ayat (mengikuti pola ayatPilihanData.js; teks resmi dibaca di halaman
// surah aplikasi).
export const AYAT_REFERENSI_SHOLAWAT = [
  {
    surahId: 33,
    nomorAyat: 56,
    tema: 'Bershalawat kepada Nabi',
    sumber:
      'Referensi dari ayatPilihanData.js (surah 33 ayat 56). Ayat ini memerintahkan orang-orang beriman bershalawat dan mengucapkan salam kepada Nabi ﷺ; teks Arab & terjemahan resminya dibaca di halaman Surah Al-Ahzab.',
  },
];

// Keutamaan bershalawat — ringkasan bermakna (bukan kutipan verbatim)
// dengan sumber riwayat tercantum pada tiap entri.
export const KEUTAMAAN_SHOLAWAT = [
  {
    judul: 'Satu sholawat dibalas sepuluh kali',
    isi: 'Barangsiapa bershalawat kepada Nabi ﷺ satu kali, Allah bershalawat kepadanya sepuluh kali.',
    sumber: 'HR. Muslim, dari Abu Hurairah radhiyallahu ‘anhu',
  },
  {
    judul: 'Diangkat derajat, ditulis kebaikan, dihapus kesalahan',
    isi: 'Satu sholawat menjadi sebab diangkatnya sepuluh derajat, ditulisnya sepuluh kebaikan, dan dihapusnya sepuluh kesalahan bagi yang membacanya.',
    sumber: 'HR. An-Nasa’i, dari Anas bin Malik radhiyallahu ‘anhu',
  },
  {
    judul: 'Paling dekat dengan Nabi ﷺ pada hari kiamat',
    isi: 'Orang yang paling dekat kedudukannya dengan Nabi ﷺ pada hari kiamat adalah orang yang paling banyak bershalawat kepadanya.',
    sumber: 'HR. Tirmidzi, dari Abdullah bin Mas’ud radhiyallahu ‘anhu',
  },
  {
    judul: 'Perintah langsung dari Al-Qur’an',
    isi: 'Allah memerintahkan orang-orang beriman untuk bershalawat dan mengucapkan salam kepada Nabi ﷺ — sebagaimana direferensikan pada QS. Al-Ahzab: 56 di atas.',
    sumber: 'QS. Al-Ahzab [33]: 56 (referensi ayat — teks dibaca di halaman surah)',
  },
];

export const CATATAN_CAKUPAN_SHOLAWAT =
  'Noor hanya memuat sholawat yang redaksinya bersumber jelas dari Al-Qur’an/hadits — sholawat susunan ulama yang redaksinya diperselisihkan tidak dimuat.';
