/**
 * Entity: Surah (bab Al-Qur'an).
 * Model plain — dibuat oleh mapper di data layer dari DTO Quran.com.
 *
 * @typedef {Object} Surah
 * @property {number} id            Nomor surah (1–114)
 * @property {string} nameLatin     Nama latin, mis. "Ya-Sin"
 * @property {string} nameArabic    Nama Arab, mis. "يس"
 * @property {string} translationId Terjemahan nama, mis. "Ya Sin"
 * @property {number} versesCount   Jumlah ayat
 * @property {string} revelationPlace "makkah" | "madinah"
 * @property {boolean} bismillahPre Apakah diawali bismillah terpisah
 */

/** Membuat entity Surah tervalidasi ringan. */
export function createSurah(data) {
  return Object.freeze({
    id: Number(data.id),
    nameLatin: data.nameLatin ?? '',
    nameArabic: data.nameArabic ?? '',
    translationId: data.translationId ?? '',
    versesCount: Number(data.versesCount ?? 0),
    revelationPlace: data.revelationPlace ?? '',
    bismillahPre: Boolean(data.bismillahPre),
  });
}
