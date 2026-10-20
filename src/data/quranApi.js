// Fetch client Quran.com API v4 (data layer — presentation tidak boleh menyentuh file ini).
const BASE = 'https://api.quran.com/api/v4';
export const RECITER_ALAFASY = 7;
export const TRANSLATION_KEMENAG = 33; // Indonesian Islamic Affairs Ministry

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Quran.com API ${res.status}: ${path}`);
  return res.json();
}

export function fetchChapter(id) {
  return getJson(`/chapters/${id}`).then((d) => d.chapter);
}

export function fetchVersesByChapter(id, perPage) {
  const q = new URLSearchParams({
    words: 'true',
    translations: String(TRANSLATION_KEMENAG),
    audio: String(RECITER_ALAFASY),
    per_page: String(perPage),
    fields: 'text_uthmani',
    word_fields: 'text_uthmani,transliteration',
  });
  return getJson(`/verses/by_chapter/${id}?${q}`).then((d) => d.verses);
}

/** Audio satu file utuh per surah + timestamps per ayat & segments per kata (Cara 2). */
export function fetchChapterRecitation(id) {
  return getJson(`/chapter_recitations/${RECITER_ALAFASY}/${id}?segments=true`).then(
    (d) => d.audio_file
  );
}
