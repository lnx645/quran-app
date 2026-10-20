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

/**
 * Konversi Masehi → Hijriah LENGKAP (string DD-MM-YYYY Masehi):
 * mengembalikan data utuh { hijri, gregorian } apa adanya dari API
 * (terverifikasi curl 2026-10-20: hijri.day/month{number,en,ar}/year/
 * weekday{en,ar}, gregorian.day/month{number,en}/year/weekday.en).
 */
export function fetchGToHLengkap(masehiDateStr) {
  return getJson(`/gToH/${masehiDateStr}`);
}

/**
 * Konversi Hijriah → Masehi LENGKAP (string DD-MM-YYYY Hijriah):
 * data utuh { hijri, gregorian } — pasangan fetchGToHLengkap.
 */
export function fetchHToGLengkap(hijriDateStr) {
  return getJson(`/hToG/${hijriDateStr}`);
}

/**
 * Konversi SATU BULAN Masehi penuh → Hijriah (1 panggilan untuk ±30 hari,
 * terverifikasi 2026-10-20) — jangan fetch gToH per hari.
 * @param {number} bulanMasehi 1-12
 */
export function fetchGToHCalendar(bulanMasehi, tahunMasehi) {
  return getJson(`/gToHCalendar/${bulanMasehi}/${tahunMasehi}`);
}

/**
 * Kalender jadwal sholat SATU BULAN HIJRIAH penuh per kota (terverifikasi
 * 2026-10-20: urutan path tahun/bulan Hijriah) — dipakai Imsakiyah Ramadan.
 */
export function fetchHijriCalendarByCity(kota, tahunHijriah, bulanHijriah) {
  return getJson(
    `/hijriCalendarByCity/${tahunHijriah}/${bulanHijriah}?city=${encodeURIComponent(kota)}&country=Indonesia&method=20`
  );
}
