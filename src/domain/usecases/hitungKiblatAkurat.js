/**
 * Use case: arah kiblat AKURAT (funsgi murni + deklinasi magnetik).
 *
 * 1) BEARING — bearing awal (initial bearing) great-circle standar:
 *      θ = atan2( sin Δλ, cos φ1 · tan φ2 − sin φ1 · cos Δλ )
 *    φ = lintang, λ = bujur (radian). Hasil 0–360° dari utara sejati (true north),
 *    searah jarum jam. Ini bearing TRUE — bukan magnetik.
 *
 * 2) DEKLINASI MAGNETIK — kompas HP mengukur arah relatif terhadap UTARA MAGNETIK,
 *    sedangkan bearing kiblat relatif terhadap UTARA SEJATI. Selisihnya = deklinasi
 *    magnetik D (konvensi NOAA/WMM: POSITIF = timur / east of north):
 *      true = magnetic − D(timur+)
 *    ("East is Least": deklinasi timur dikurangkan dari bacaan magnetik.)
 *
 *    Urutan sumber deklinasi di getDeclination():
 *      a. API NOAA geomag-web (WMM terbaru, akurat arc-minute). Timeout 8 detik.
 *         CATATAN LAPANGAN 2026-10-20: endpoint tanpa API key mengembalikan
 *         halaman "Bad request ... key parameter is missing" (bukan JSON) —
 *         maka kode ini memvalidasi struktur respons dan langsung jatuh ke
 *         fallback bila responsnya bukan JSON deklinasi yang valid.
 *      b. FALLBACK: model WMM TEREDUKSI yang disematkan (grid khusus Indonesia).
 *
 *    FALLBACK "WMM tereduksi" — pendekatan orde-1 (dokumentasi jujur):
 *      - Grid deklinasi WMM2025 (epok 2025.0) + laju perubahan sekular per titik,
 *        dihitung dengan implementasi WMM2025 penuh (pygeomag, valid 2025–2030),
 *        lalu disederhanakan menjadi interpolasi BILINEAR 7×10 titik untuk
 *        wilayah Indonesia (lat −11…6, lon 95…141) dengan koreksi linier
 *        D(t) = D_2025 + SV·(t − 2025).
 *      - Diuji terhadap model WMM2025 penuh di 200 titik acak Indonesia ×
 *        tahun 2025–2029.9: galat MAKS 0.068°, rata-rata 0.03°. Klaim akurasi
 *        ±0.5° sangat konservatif/aman.
 *      - BUKAN pengganti WMM penuh: tidak berlaku di luar Indonesia, tidak
 *        menangkap anomali lokal (deposit besi, bangunan baja), dan SV linier
 *        hanya andal dalam masa berlaku WMM2025 (s.d. 2029).
 */

export const KABAH = Object.freeze({ lat: 21.4225, lng: 39.8262 });
export const SUMEDANG = Object.freeze({ lat: -6.858, lng: 107.924 });

const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;
const norm360 = (d) => ((d % 360) + 360) % 360;

/**
 * Bearing awal great-circle dari `dari` ke `ke`, dalam derajat dari utara
 * SEJATI (true north), searah jarum jam. Contoh: Sumedang → Ka'bah ≈ 295.07°.
 */
export function hitungBearingKiblat(dari = SUMEDANG, ke = KABAH) {
  const phi1 = toRad(dari.lat);
  const phi2 = toRad(ke.lat);
  const dLambda = toRad(ke.lng - dari.lng);
  const y = Math.sin(dLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(dLambda);
  return norm360(toDeg(Math.atan2(y, x)));
}

/** Jarak great-circle (haversine, km) — info pendukung. */
export function jarakKeKabahKm(dari = SUMEDANG, ke = KABAH) {
  const R = 6371;
  const dLat = toRad(ke.lat - dari.lat);
  const dLng = toRad(ke.lng - dari.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(dari.lat)) * Math.cos(toRad(ke.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}

// ---------------------------------------------------------------------------
// FALLBACK WMM TEREDUKSI (Indonesia saja)
// Grid: deklinasi WMM2025 epok 2025.0 (derajat, + = timur) & laju sekular SV
// (°/tahun). Lintang −11…6, bujur 95…141. Lihat komentar header untuk validasi.
// ---------------------------------------------------------------------------
const GRID_LAT = [-11, -8, -5, -2, 1, 4, 6];
const GRID_LON = [95, 100, 105, 110, 115, 120, 125, 130, 135, 141];
const GRID_D = [
  [-1.94, -0.62, 0.29, 0.75, 0.91, 1.0, 1.27, 1.89, 2.84, 4.3],
  [-1.44, -0.3, 0.44, 0.76, 0.78, 0.76, 0.94, 1.48, 2.4, 3.83],
  [-1.11, -0.13, 0.47, 0.67, 0.58, 0.46, 0.56, 1.04, 1.93, 3.34],
  [-0.89, -0.07, 0.4, 0.48, 0.3, 0.1, 0.14, 0.58, 1.43, 2.83],
  [-0.77, -0.1, 0.25, 0.23, -0.03, -0.3, -0.32, 0.07, 0.89, 2.28],
  [-0.71, -0.19, 0.03, -0.08, -0.41, -0.74, -0.81, -0.47, 0.31, 1.68],
  [-0.7, -0.28, -0.13, -0.31, -0.69, -1.06, -1.16, -0.85, -0.1, 1.25],
];
const GRID_SV = [
  [0.0734, 0.0539, 0.0334, 0.0135, -0.0058, -0.0247, -0.0415, -0.0532, -0.0567, -0.0493],
  [0.0682, 0.0507, 0.0314, 0.0118, -0.0081, -0.0281, -0.0461, -0.0587, -0.0625, -0.0544],
  [0.0633, 0.0478, 0.0299, 0.0107, -0.0097, -0.0306, -0.0498, -0.0631, -0.067, -0.0586],
  [0.0586, 0.0452, 0.0286, 0.0099, -0.0108, -0.0325, -0.0523, -0.0661, -0.0702, -0.0616],
  [0.0541, 0.0427, 0.0275, 0.0093, -0.0115, -0.0336, -0.0539, -0.0679, -0.072, -0.0634],
  [0.0496, 0.0401, 0.0263, 0.0088, -0.012, -0.0343, -0.0546, -0.0685, -0.0725, -0.0642],
  [0.0467, 0.0383, 0.0254, 0.0083, -0.0123, -0.0345, -0.0546, -0.0682, -0.0722, -0.0641],
];

function bilin(grid, lat, lon) {
  let i = 0;
  while (i < GRID_LAT.length - 2 && lat > GRID_LAT[i + 1]) i += 1;
  let j = 0;
  while (j < GRID_LON.length - 2 && lon > GRID_LON[j + 1]) j += 1;
  const t = Math.min(1, Math.max(0, (lat - GRID_LAT[i]) / (GRID_LAT[i + 1] - GRID_LAT[i])));
  const u = Math.min(1, Math.max(0, (lon - GRID_LON[j]) / (GRID_LON[j + 1] - GRID_LON[j])));
  const a = grid[i][j];
  const b = grid[i][j + 1];
  const c = grid[i + 1][j];
  const d = grid[i + 1][j + 1];
  return a * (1 - t) * (1 - u) + b * (1 - t) * u + c * t * (1 - u) + d * t * u;
}

/** Tahun desimal sekarang, mis. 2026.79. */
export function tahunDesimalSekarang(tanggal = new Date()) {
  const awalTahun = new Date(tanggal.getFullYear(), 0, 1);
  const awalDepan = new Date(tanggal.getFullYear() + 1, 0, 1);
  return tanggal.getFullYear() + (tanggal - awalTahun) / (awalDepan - awalTahun);
}

/**
 * Deklinasi magnetik fallback (°; + = timur) dari grid WMM tereduksi.
 * Hanya andal di wilayah Indonesia (di-clamp ke batas grid) & era WMM2025.
 */
export function deklinasiWmmFallback(lat, lon, tahun = tahunDesimalSekarang()) {
  const latC = Math.min(6, Math.max(-11, lat));
  const lonC = Math.min(141, Math.max(95, lon));
  return bilin(GRID_D, latC, lonC) + bilin(GRID_SV, latC, lonC) * (tahun - 2025.0);
}

// ---------------------------------------------------------------------------
// API NOAA (sumber utama bila tersedia)
// ---------------------------------------------------------------------------
const NOAA_URL = 'https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination';
const NOAA_TIMEOUT_MS = 8000;

function ekstrakDeklinasiNoaa(json) {
  // Format geomag-web: { result: [ { declination: <derajat>, ... } ] }
  const r = json && (Array.isArray(json.result) ? json.result[0] : json.result);
  const d = r && (r.declination ?? r.d);
  return typeof d === 'number' && Number.isFinite(d) ? d : null;
}

/**
 * Deklinasi magnetik (°; + = timur) untuk posisi.
 * Coba API NOAA (timeout 8 dtk) → fallback grid WMM tereduksi (Indonesia).
 * Mengembalikan { nilai, sumber: 'NOAA' | 'WMM-fallback' }.
 */
export async function getDeclination(lat, lon) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), NOAA_TIMEOUT_MS);
    const url =
      `${NOAA_URL}?lat1=${encodeURIComponent(lat)}&lon1=${encodeURIComponent(lon)}&resultFormat=json`;
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json(); // lempar bila respons HTML (mode tanpa key)
    const d = ekstrakDeklinasiNoaa(json);
    if (d == null) throw new Error('format respons tak dikenal');
    return { nilai: d, sumber: 'NOAA' };
  } catch {
    return { nilai: deklinasiWmmFallback(lat, lon), sumber: 'WMM-fallback' };
  }
}

/**
 * Koreksi bacaan magnetik → utara sejati. Konvensi: deklinasi + = timur.
 * true = magnetic − D(timur+). Contoh Sumedang D≈+0.7°: 295.0° magnetik = 294.3° sejati.
 */
export function magnetikKeSejati(sudutMagnetik, deklinasi) {
  return norm360(sudutMagnetik - deklinasi);
}

/**
 * Sudut jarum kiblat relatif terhadap atas layar perangkat (°; 0 = lurus ke atas).
 * bearing & heading keduanya dalam acuan utara SEJATI.
 */
export function sudutJarumRelatif(bearingSejati, headingSejati) {
  return norm360(bearingSejati - headingSejati);
}
