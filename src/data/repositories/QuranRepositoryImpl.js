import { fetchChapter, fetchVersesByChapter, fetchChapterRecitation } from '../quranApi.js';
import { mapChapter, mapVerse, mapTimings } from '../dto/quranMapper.js';

/**
 * Implementasi QuranRepository memakai Quran.com API v4.
 * Menggabungkan: info surah + ayat (Arab/latin/terjemahan) + satu file audio
 * utuh dengan timestamps per ayat & segments per kata (Cara 2).
 */
export const QuranRepositoryImpl = {
  async getSurahDetail(surahId) {
    const chapter = await fetchChapter(surahId);
    const [verses, audioFile] = await Promise.all([
      fetchVersesByChapter(surahId, chapter.verses_count),
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
};
