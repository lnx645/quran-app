/**
 * Kontrak repository Al-Qur'an (domain layer).
 * Presentation & hooks HANYA boleh memakai kontrak ini lewat implementasi
 * di data layer (`data/repositories/QuranRepositoryImpl.js`).
 * Domain tidak boleh import dari data/ maupun presentation/.
 */
export const QuranRepository = {
  /**
   * Ambil surah + seluruh ayat + audio satu file utuh beserta
   * timing per ayat & segmen per kata (Cara 2).
   * @param {number} surahId
   * @returns {Promise<{surah: import('../entities/Surah.js').Surah,
   *   ayahs: import('../entities/Ayah.js').Ayah[],
   *   audioUrl: string, audioDurationMs: number}>}
   */
  async getSurahDetail(_surahId) {
    throw new Error('QuranRepository.getSurahDetail belum diimplementasikan');
  },

  /**
   * Tafsir satu ayat Bahasa Indonesia (Tafsir Kemenag, via API equran.id —
   * Quran.com v4 tidak menyediakan tafsir Bahasa Indonesia).
   * @param {number} _surahId
   * @param {number} _nomorAyat
   * @returns {Promise<string>} teks tafsir
   */
  async getTafsirAyat(_surahId, _nomorAyat) {
    throw new Error('QuranRepository.getTafsirAyat belum diimplementasikan');
  },

  /**
   * Pencarian global di seluruh ayat (Quran.com /search, language=id).
   * @param {string} _query
   * @returns {Promise<{total: number, hasil: {
   *   verseKey: string, surahId: number, nomorAyat: number,
   *   teksArab: string, teksTerjemahan: string, terjemahanSorot: string}[]}>}
   */
  async searchQuran(_query) {
    throw new Error('QuranRepository.searchQuran belum diimplementasikan');
  },
};
