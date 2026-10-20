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
  return getJson(`/chapters/${id}?language=id`).then((d) => d.chapter);
}

/** Daftar 114 surah. language=id → nama terjemahan Bahasa Indonesia. */
export function fetchChapters() {
  return getJson('/chapters?language=id').then((d) => d.chapters);
}

/** Ukuran halaman aman untuk surah terpanjang (Al-Baqarah: 286 ayat). */
export const VERSES_PAGE_SIZE = 300;

function fetchVersesPage(id, page, perPage) {
  const q = new URLSearchParams({
    words: 'true',
    translations: String(TRANSLATION_KEMENAG),
    audio: String(RECITER_ALAFASY),
    per_page: String(perPage),
    page: String(page),
    fields: 'text_uthmani',
    word_fields: 'text_uthmani,transliteration',
  });
  return getJson(`/verses/by_chapter/${id}?${q}`);
}

/**
 * Ambil SELURUH ayat sebuah surah: per_page=300 + loop halaman mengikuti
 * pagination.next_page. Tahan untuk surah panjang (Al-Baqarah 286 ayat)
 * dan perubahan batas per_page API.
 */
export async function fetchAllVersesByChapter(id) {
  const all = [];
  let page = 1;
  for (;;) {
    const d = await fetchVersesPage(id, page, VERSES_PAGE_SIZE);
    all.push(...(d.verses ?? []));
    const next = d.pagination?.next_page;
    if (!next) break;
    page = next;
  }
  return all;
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
