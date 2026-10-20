import { createSurah } from '../../domain/entities/Surah.js';
import { createAyah } from '../../domain/entities/Ayah.js';
import { adalahAyatSajdah } from '../sources/ayatSajdahData.js';

/** DTO chapter Quran.com → entity Surah. */
export function mapChapter(chapter) {
  return createSurah({
    id: chapter.id,
    nameLatin: chapter.name_simple,
    nameArabic: chapter.name_arabic,
    translationId: chapter.translated_name?.name ?? '',
    versesCount: chapter.verses_count,
    revelationPlace: chapter.revelation_place,
    bismillahPre: chapter.bismillah_pre,
  });
}

/**
 * DTO verse Quran.com → entity Ayah.
 * - words difilter: hanya char_type_name === 'word' (buang penanda akhir ayat).
 * - latin digabung dari transliterasi per kata.
 * - timing diambil dari peta timestamps audio_file (kunci verse_key).
 */
export function mapVerse(verse, timingByKey) {
  const words = (verse.words ?? [])
    .filter((w) => w.char_type_name === 'word')
    .map((w) => ({
      position: w.position,
      arabic: w.text_uthmani ?? w.text ?? '',
      latin: w.transliteration?.text ?? '',
    }));

  const t = timingByKey?.get(verse.verse_key);
  return createAyah({
    number: verse.verse_number,
    key: verse.verse_key,
    arabic: verse.text_uthmani ?? words.map((w) => w.arabic).join(' '),
    teksTajwid: verse.text_uthmani_tajweed ?? '',
    latin: words.map((w) => w.latin).filter(Boolean).join(' '),
    translation: verse.translations?.[0]?.text?.replace(/<[^>]+>/g, '') ?? '',
    // Penanda ayat sajdah: sumber utama field `sajdah_number` API
    // (terverifikasi curl 2026-10-20, mis. 7:206 → 1); daftar statis
    // 14 ayat jumhur menambal bila API tidak mengirim field itu.
    sajdah: verse.sajdah_number != null || adalahAyatSajdah(verse.verse_key),
    words,
    timing: t
      ? { fromMs: t.timestamp_from, toMs: t.timestamp_to, segments: t.segments ?? [] }
      : null,
  });
}

/**
 * DTO hasil pencarian Quran.com → bentuk ternormalisasi untuk halaman Cari.
 * Terjemahan dipilih: resource 33 (Kemenag) bila ada, selain itu terjemahan
 * Indonesia pertama, selain itu terjemahan pertama. Tag <em> (penanda kata
 * cocok dari API) dibersihkan dari teksTerjemahan, tetapi dipertahankan di
 * terjemahanSorot agar UI bisa menyorot kata yang cocok.
 */
export function mapSearchResult(result) {
  const [surahIdStr, nomorAyatStr] = String(result.verse_key ?? '').split(':');
  const terjemahanDipilih =
    result.translations?.find((t) => t.resource_id === 33) ??
    result.translations?.find((t) => t.language_name === 'indonesian') ??
    result.translations?.[0];
  const mentah = terjemahanDipilih?.text ?? '';
  return {
    verseKey: result.verse_key ?? '',
    surahId: Number(surahIdStr) || 0,
    nomorAyat: Number(nomorAyatStr) || 0,
    teksArab: result.text ?? '',
    teksTerjemahan: mentah.replace(/<[^>]+>/g, ''),
    terjemahanSorot: mentah,
  };
}

/**
 * DTO verses (fetchWordTranslations) → Map<verse_key, kata[]> untuk mode
 * terjemahan per kata. Tiap kata: { position, arabic, latin, arti } —
 * `arti` adalah terjemahan kata Bahasa Inggris dari API (satu-satunya
 * bahasa yang disediakan Quran.com untuk terjemahan per kata;
 * terverifikasi curl 2026-10-20). Kata penanda akhir ayat dibuang.
 */
export function mapWordTranslations(verses) {
  const peta = new Map();
  for (const v of verses ?? []) {
    const kata = (v.words ?? [])
      .filter((w) => w.char_type_name === 'word')
      .map((w) => ({
        position: w.position,
        arabic: w.text_uthmani ?? w.text ?? '',
        latin: w.transliteration?.text ?? '',
        arti: w.translation?.text ?? '',
      }));
    if (kata.length) peta.set(v.verse_key, kata);
  }
  return peta;
}

/** audio_file.timestamps → Map<verse_key, timingDTO>. */
export function mapTimings(timestamps = []) {
  return new Map(timestamps.map((t) => [t.verse_key, t]));
}
