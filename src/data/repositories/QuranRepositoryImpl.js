import {
  fetchChapter,
  fetchChapters,
  fetchAllVersesByChapter,
  fetchChapterRecitation,
  searchVerses,
} from '../quranApi.js';
import { fetchTafsirAyat } from '../tafsirApi.js';
import { mapChapter, mapVerse, mapTimings, mapSearchResult } from '../dto/quranMapper.js';

/**
 * Implementasi QuranRepository memakai Quran.com API v4.
 * Menggabungkan: info surah + ayat (Arab/latin/terjemahan) + satu file audio
 * utuh dengan timestamps per ayat & segments per kata (Cara 2).
 */
export const QuranRepositoryImpl = {
  /** Daftar seluruh 114 surah → entity Surah[]. */
  async getChapters() {
    const chapters = await fetchChapters();
    return chapters.map(mapChapter);
  },

  async getSurahDetail(surahId) {
    const chapter = await fetchChapter(surahId);
    const [verses, audioFile] = await Promise.all([
      fetchAllVersesByChapter(surahId),
      fetchChapterRecitation(surahId),
    ]);
    const timingByKey = mapTimings(audioFile?.timestamps ?? []);
    const ayahs = verses.map((v) => mapVerse(v, timingByKey));
    const last = audioFile?.timestamps?.[audioFile.timestamps.length - 1];
    return {
      surah: mapChapter(chapter),
      ayahs,
      audioUrl: audioFile?.audio_url ?? '',
      audioDurationMs: last?.timestamp_to ?? 0,
    };
  },

  /** Tafsir Kemenag satu ayat (via API equran.id, dicache di tafsirApi). */
  async getTafsirAyat(surahId, nomorAyat) {
    return fetchTafsirAyat(Number(surahId), Number(nomorAyat));
  },

  /** Pencarian global → hasil ternormalisasi (lihat mapSearchResult). */
  async searchQuran(query) {
    const kata = String(query ?? '').trim();
    if (!kata) return { total: 0, hasil: [] };
    const search = await searchVerses(kata, { size: 20, page: 1 });
    return {
      total: Number(search?.total_results ?? 0),
      hasil: (search?.results ?? []).map(mapSearchResult).filter((h) => h.surahId > 0),
    };
  },
};
