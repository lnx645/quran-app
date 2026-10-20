// Fetch client Aladhan API (jadwal sholat metode 20 = Kemenag RI + konversi Hijriah).
const BASE = 'https://api.aladhan.com/v1';

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Aladhan API ${res.status}: ${path}`);
  const json = await res.json();
  return json.data;
}

const ddmmYyyy = (date) =>
  `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

export function fetchTimingsByCity(kota, tanggal) {
  return getJson(
    `/timingsByCity/${ddmmYyyy(tanggal)}?city=${encodeURIComponent(kota)}&country=Indonesia&method=20`
  );
}

/** Konversi tanggal Masehi → Hijriah. */
export function fetchGToH(tanggal) {
  return getJson(`/gToH/${ddmmYyyy(tanggal)}`).then((d) => d.hijri);
}

/** Konversi tanggal Hijriah (string DD-MM-YYYY Hijriah) → Masehi. */
export function fetchHToG(hijriDateStr) {
  return getJson(`/hToG/${hijriDateStr}`).then((d) => d.gregorian);
}
