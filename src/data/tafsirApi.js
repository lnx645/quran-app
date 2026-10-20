// Fetch client tafsir per ayat Bahasa Indonesia (Tafsir Kemenag).
// Quran.com API v4 tidak menyediakan tafsir Bahasa Indonesia, jadi sumbernya
// adalah API equran.id (api.quran.gading.dev): GET /surah/{surahId}/{nomorAyat}
// → data.tafsir.id = { short, long }. Kami memakai versi `long` bila ada.
// Hasil dicache di memori per kunci "surah:ayat" selama sesi berjalan.
const BASE = 'https://api.quran.gading.dev';

const cache = new Map();

/** Kosongkan cache tafsir (dipakai tes / pemulihan galat). */
export function bersihkanCacheTafsir() {
  cache.clear();
}

/**
 * Ambil tafsir satu ayat.
 * @param {number} surahId
 * @param {number} nomorAyat
 * @returns {Promise<string>} teks tafsir Bahasa Indonesia (paragraf dipisah \n\n)
 */
export async function fetchTafsirAyat(surahId, nomorAyat) {
  const kunci = `${surahId}:${nomorAyat}`;
  if (cache.has(kunci)) return cache.get(kunci);

  const res = await fetch(`${BASE}/surah/${surahId}/${nomorAyat}`);
  if (!res.ok) throw new Error(`API tafsir ${res.status}: surah ${surahId} ayat ${nomorAyat}`);
  const json = await res.json();
  const tafsir = json?.data?.tafsir?.id;
  const teks = String(tafsir?.long ?? tafsir?.short ?? '').trim();
  if (!teks) throw new Error(`Tafsir surah ${surahId} ayat ${nomorAyat} tidak tersedia`);
  cache.set(kunci, teks);
  return teks;
}
