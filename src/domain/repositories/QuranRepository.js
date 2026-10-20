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
};
