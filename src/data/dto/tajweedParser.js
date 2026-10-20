/**
 * Parser teks tajwid Quran.com (`text_uthmani_tajweed`).
 *
 * Format NYATA terverifikasi via curl 2026-10-20 (ayat 1:1, 2:1–3, dan
 * sampel surah 1/2/3/18/36/55/67/112/114) — BUKAN tag gaya `[h:1]`:
 *   بِسْمِ <tajweed class=ham_wasl>ٱ</tajweed>للَّهِ … <span class=end>١</span>
 * Kelas yang benar-benar muncul di data:
 *   ham_wasl, laam_shamsiyah, slnt,
 *   madda_normal, madda_permissible, madda_necessary, madda_obligatory,
 *   ghunnah, qalaqah, ikhafa, ikhafa_shafawi, iqlab,
 *   idgham_ghunnah, idgham_wo_ghunnah, idgham_shafawi,
 *   idgham_mutajanisayn, idgham_mutaqaribayn, dan penanda akhir `end`.
 *
 * Hasil: segmen [{ teks, aturan, kelas }] — `aturan` adalah kelompok warna
 * (kunci token tema `colors.tajwid`), `kelas` nama kelas API mentah, dan
 * keduanya null untuk teks biasa. Segmen penanda akhir ayat (`end`) dibuang
 * karena nomor ayat sudah digambar AyatRosette.
 */

/** Peta kelas API → kelompok aturan (kunci warna di tema & legenda panduan). */
export const KELOMPOK_TAJWID_DARI_KELAS = Object.freeze({
  madda_normal: 'mad',
  madda_permissible: 'mad',
  madda_necessary: 'mad',
  madda_obligatory: 'mad',
  ghunnah: 'ghunnah',
  qalaqah: 'qalqalah',
  ikhafa: 'ikhfa',
  ikhafa_shafawi: 'ikhfa',
  idgham_ghunnah: 'idgham',
  idgham_wo_ghunnah: 'idgham',
  idgham_shafawi: 'idgham',
  idgham_mutajanisayn: 'idgham',
  idgham_mutaqaribayn: 'idgham',
  iqlab: 'iqlab',
  ham_wasl: 'hamzahWasal',
  laam_shamsiyah: 'lamSyamsiyah',
  slnt: 'slnt',
});

/** Kelompok aturan yang dikenal parser (sinkron dengan tajwidData & tema). */
export const KELOMPOK_TAJWID = Object.freeze([
  'mad',
  'ghunnah',
  'qalqalah',
  'ikhfa',
  'idgham',
  'iqlab',
  'hamzahWasal',
  'lamSyamsiyah',
  'slnt',
]);

// <tajweed class=nama>…</tajweed> atau <span class=end>…</span>
const POLA_TAG = /<(tajweed|span)\s+class=([a-z_]+)>([\s\S]*?)<\/\1>/g;

/**
 * Ubah string `text_uthmani_tajweed` menjadi segmen berwarna.
 * Teks di luar tag menjadi segmen aturan null. Tag tak dikenal diperlakukan
 * sebagai teks biasa (isinya tetap tampil, tanpa warna).
 * @param {string} mentah
 * @returns {{teks: string, aturan: string|null, kelas: string|null}[]}
 */
export function parseTajweed(mentah) {
  const sumber = String(mentah ?? '');
  if (!sumber) return [];
  const segmen = [];
  let terakhir = 0;
  let cocok;
  POLA_TAG.lastIndex = 0;
  while ((cocok = POLA_TAG.exec(sumber)) !== null) {
    const [, , kelas, isi] = cocok;
    if (cocok.index > terakhir) {
      segmen.push({ teks: sumber.slice(terakhir, cocok.index), aturan: null, kelas: null });
    }
    if (kelas !== 'end') {
      segmen.push({ teks: isi, aturan: KELOMPOK_TAJWID_DARI_KELAS[kelas] ?? null, kelas });
    }
    terakhir = cocok.index + cocok[0].length;
  }
  if (terakhir < sumber.length) {
    segmen.push({ teks: sumber.slice(terakhir), aturan: null, kelas: null });
  }
  // Gabung segmen bersebelahan dengan aturan sama agar DOM ramping.
  const hasil = [];
  for (const s of segmen) {
    if (!s.teks) continue;
    const prev = hasil[hasil.length - 1];
    if (prev && prev.aturan === s.aturan && prev.kelas === s.kelas) prev.teks += s.teks;
    else hasil.push({ ...s });
  }
  return hasil;
}

/** Teks polos tanpa tag tajwid (untuk fallback / aksesibilitas). */
export function teksPolosTajweed(mentah) {
  return parseTajweed(mentah)
    .map((s) => s.teks)
    .join('');
}
