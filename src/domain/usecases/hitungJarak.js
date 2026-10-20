/**
 * Use case: jarak antar dua koordinat geografis (fungsi murni, tanpa efek samping).
 *
 * Rumus haversine: jarak garis lurus di permukaan bumi (radius rata-rata
 * 6.371.000 m) dari pasangan (lat, lon) dalam derajat desimal.
 */

const RADIUS_BUMI_M = 6_371_000;
const keRadian = (derajat) => (derajat * Math.PI) / 180;

/**
 * Jarak haversine dalam meter antara titik A dan titik B.
 * Mengembalikan NaN bila ada koordinat yang tidak valid.
 */
export function hitungJarakMeter(lat1, lon1, lat2, lon2) {
  const a1 = Number(lat1);
  const o1 = Number(lon1);
  const a2 = Number(lat2);
  const o2 = Number(lon2);
  if (![a1, o1, a2, o2].every(Number.isFinite)) return NaN;

  const dLat = keRadian(a2 - a1);
  const dLon = keRadian(o2 - o1);
  const s =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(keRadian(a1)) * Math.cos(keRadian(a2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  return RADIUS_BUMI_M * c;
}

/**
 * Format jarak meter menjadi teks ramah: < 1000 m → "350 m",
 * >= 1000 m → "1,2 km" (satu desimal, koma ala Indonesia).
 */
export function formatJarak(meter) {
  const m = Number(meter);
  if (!Number.isFinite(m) || m < 0) return '—';
  if (m < 1000) return `${Math.round(m)} m`;
  const km = (m / 1000).toFixed(1).replace('.', ',');
  return `${km} km`;
}
