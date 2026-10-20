/**
 * Entity: Ayah (ayat) beserta data sinkronisasi audio "Cara 2".
 *
 * @typedef {Object} AyahWord
 * @property {number} position  Posisi kata dalam ayat (1-based)
 * @property {string} arabic    Teks Arab kata (Uthmani)
 * @property {string} latin     Transliterasi latin kata
 *
 * @typedef {Object} AyahTiming  (dari chapter_recitations?segments=true)
 * @property {number} fromMs        Awal ayat dalam file audio (ms)
 * @property {number} toMs          Akhir ayat dalam file audio (ms)
 * @property {Array<[number, number, number]>} segments
 *   Segmen per kata: [indexKata(1-based), mulaiMs(absolut), selesaiMs(absolut)]
 *
 * @typedef {Object} Ayah
 * @property {number} number       Nomor ayat dalam surah
 * @property {string} key          Kunci global "surah:ayat", mis. "36:1"
 * @property {string} arabic       Teks Arab lengkap (Uthmani)
 * @property {string} latin        Transliterasi latin gabungan per kata
 * @property {string} translation  Terjemahan Bahasa Indonesia (Kemenag, id 33)
 * @property {string} teksTajwid   Teks Arab bertanda tajwid mentah dari API
 *   (`text_uthmani_tajweed`, tag `<tajweed class=…>`); '' bila API tidak
 *   mengirimnya — render jatuh ke teks biasa. Diparse tajweedParser.
 * @property {boolean} sajdah     Ayat sajdah (sujud tilawah): dari field
 *   `sajdah_number` API, ditambal daftar statis 14 ayat jumhur
 * @property {AyahWord[]} words
 * @property {AyahTiming|null} timing
 */

export function createAyah(data) {
  return Object.freeze({
    number: Number(data.number),
    key: data.key ?? '',
    arabic: data.arabic ?? '',
    latin: data.latin ?? '',
    translation: data.translation ?? '',
    teksTajwid: data.teksTajwid ?? '',
    sajdah: Boolean(data.sajdah),
    words: Object.freeze(data.words ?? []),
    timing: data.timing ?? null,
  });
}
