import {
  fetchChapter,
  fetchChapters,
  fetchAllVersesByChapter,
  fetchChapterRecitation,
  fetchWordTranslations,
  fetchVerseAudio,
  VERSES_AUDIO_BASE,
  searchVerses,
} from '../quranApi.js';
import { fetchTafsirAyat } from '../tafsirApi.js';
import {
  mapChapter,
  mapVerse,
  mapTimings,
  mapSearchResult,
  mapWordTranslations,
} from '../dto/quranMapper.js';

// Cache terjemahan per kata per surah (mode per kata dimuat malas; buka
// berikutnya dalam sesi yang sama tidak mengulang fetch).
const cacheKata = new Map();

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

  async getSurahDetail(surahId, reciterId) {
    const chapter = await fetchChapter(surahId);
    const [verses, audioFile] = await Promise.all([
      fetchAllVersesByChapter(surahId),
      fetchChapterRecitation(surahId, reciterId),
    ]);
    const timestamps = audioFile?.timestamps ?? [];
    const timingByKey = mapTimings(timestamps);
    const ayahs = verses.map((v) => mapVerse(v, timingByKey));
    const last = timestamps[timestamps.length - 1];
    return {
      surah: mapChapter(chapter),
      ayahs,
      audioUrl: audioFile?.audio_url ?? '',
      audioDurationMs: last?.timestamp_to ?? 0,
      // Bendera kompatibilitas sinkronisasi qari terpilih: SurahPage
      // memakai ini untuk mematikan highlight dengan anggun (fallback
      // mode bab biasa) bila qari tidak menyediakan timestamps/segments.
      sinkronAyatTersedia: timestamps.length > 0,
      sorotKataTersedia: timestamps.some((t) => (t.segments ?? []).length > 0),
    };
  },

  /**
   * Terjemahan per kata satu surah → Map<verse_key, kata[]> (lihat
   * mapWordTranslations). Dipanggil HANYA saat mode per kata dinyalakan.
   */
  async getWordTranslations(surahId) {
    const id = Number(surahId);
    if (cacheKata.has(id)) return cacheKata.get(id);
    const verses = await fetchWordTranslations(id);
    const peta = mapWordTranslations(verses);
    cacheKata.set(id, peta);
    return peta;
  },

  /**
   * URL audio per-ayat utuh (Quran.com verses/by_key, qari Al-Afasy) untuk
   * pemutar berurutan dzikir. '' bila API tidak menyediakan audio ayat itu.
   */
  async getAudioAyatUrl(surah, ayat) {
    const relatif = await fetchVerseAudio(Number(surah), Number(ayat));
    if (!relatif) return '';
    return /^https?:\/\//.test(relatif) ? relatif : `${VERSES_AUDIO_BASE}${relatif}`;
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
