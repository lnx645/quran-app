// Fetch client Quran.com API v4 (data layer — presentation tidak boleh menyentuh file ini).
const BASE = 'https://api.quran.com/api/v4';
export const RECITER_ALAFASY = 7;

/**
 * Daftar qari murottal yang ditawarkan aplikasi — subset populer dari
 * GET /resources/recitations (terverifikasi curl 2026-10-20; field API:
 * id, reciter_name, style, translated_name.name). Default aplikasi sejak
 * awal = id 7 (Mishari Rashid al-'Afasy, RECITER_ALAFASY).
 */
export const DAFTAR_QARI = [
  { id: 7, nama: "Mishari Rashid al-'Afasy", gaya: null },
  { id: 3, nama: 'Abdur-Rahman as-Sudais', gaya: null },
  { id: 10, nama: "Sa'ud ash-Shuraym", gaya: null },
  { id: 6, nama: 'Mahmoud Khalil Al-Husary', gaya: null },
  { id: 2, nama: 'AbdulBaset AbdulSamad', gaya: 'Murattal' },
  { id: 9, nama: 'Mohamed Siddiq al-Minshawi', gaya: 'Murattal' },
  { id: 4, nama: 'Abu Bakr al-Shatri', gaya: null },
  { id: 5, nama: 'Hani ar-Rifai', gaya: null },
];
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
    fields: 'text_uthmani,text_uthmani_tajweed',
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
    fields: 'text_uthmani,text_uthmani_tajweed',
    word_fields: 'text_uthmani,transliteration',
  });
  return getJson(`/verses/by_chapter/${id}?${q}`).then((d) => d.verses);
}

/**
 * Pencarian global Quran.com v4: GET /search?q=..&language=id.
 * Terverifikasi 2026-10-20: language=id mengembalikan terjemahan Indonesia
 * (resource_id 33 = Kemenag termasuk di dalamnya) dan kata yang cocok
 * dibungkus tag <em> di dalam teks terjemahan.
 * Melempar d.search apa adanya; normalisasi dilakukan repository/mapper.
 */
export function searchVerses(query, { size = 20, page = 1 } = {}) {
  const q = new URLSearchParams({
    q: String(query),
    language: 'id',
    size: String(size),
    page: String(page),
  });
  return getJson(`/search?${q}`).then((d) => d.search);
}

/**
 * Terjemahan PER KATA satu surah (dimuat malas hanya saat mode per kata
 * dinyalakan di SurahPage — tidak ikut fetch normal).
 * Terverifikasi curl 2026-10-20: word_fields wajib menyertakan
 * `translation` agar tiap kata membawa translation.text. Parameter
 * `word_translation_language=id` TIDAK menghasilkan Bahasa Indonesia —
 * API tetap membalas language_name "english" (terjemahan kata Quran.com
 * hanya tersedia Bahasa Inggris). Karena itu bahasa diminta eksplisit
 * 'en' dan UI wajib melabelinya jujur sebagai terjemahan kata (Inggris).
 * Mengikuti pola pagination fetchAllVersesByChapter (per_page=300 + loop).
 */
export async function fetchWordTranslations(id) {
  const all = [];
  let page = 1;
  for (;;) {
    const q = new URLSearchParams({
      words: 'true',
      word_fields: 'text_uthmani,transliteration,translation',
      word_translation_language: 'en',
      per_page: String(VERSES_PAGE_SIZE),
      page: String(page),
    });
    const d = await getJson(`/verses/by_chapter/${id}?${q}`);
    all.push(...(d.verses ?? []));
    const next = d.pagination?.next_page;
    if (!next) break;
    page = next;
  }
  return all;
}

/**
 * Audio satu file utuh per surah + timestamps per ayat & segments per kata
 * (Cara 2) untuk qari terpilih (default: Al-Afasy, perilaku lama).
 * Terverifikasi curl 2026-10-20: qari populer lain (3, 6, 2, …) juga
 * membalas timestamps + segments per kata yang kompatibel; repository
 * tetap memeriksa ketersediaannya dan SurahPage jatuh ke mode bab biasa
 * bila suatu qari tidak menyediakannya.
 */
export function fetchChapterRecitation(id, reciterId = RECITER_ALAFASY) {
  return getJson(`/chapter_recitations/${reciterId}/${id}?segments=true`).then(
    (d) => d.audio_file
  );
}
