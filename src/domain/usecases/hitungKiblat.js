/**
 * Use case: arah kiblat (fungsi murni).
 * Rumus bearing awal (initial bearing) pada bola:
 *   θ = atan2( sin Δλ, cos φ1 · tan φ2 − sin φ1 · cos Δλ )
 * dengan φ = lintang, λ = bujur (radian). Hasil dinormalisasi 0–360° dari utara searah jarum jam.
 */

export const KABAH = Object.freeze({ lat: 21.4225, lng: 39.8262 });
export const SUMEDANG = Object.freeze({ lat: -6.858, lng: 107.924 });

const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;

export function hitungBearingKiblat(dari = SUMEDANG, ke = KABAH) {
  const phi1 = toRad(dari.lat);
  const phi2 = toRad(ke.lat);
  const dLambda = toRad(ke.lng - dari.lng);
  const y = Math.sin(dLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(dLambda);
  const theta = toDeg(Math.atan2(y, x));
  return (theta + 360) % 360;
}

/** Jarak garis lurus (haversine, km) — info pendukung. */
export function jarakKeKabahKm(dari = SUMEDANG, ke = KABAH) {
  const R = 6371;
  const dLat = toRad(ke.lat - dari.lat);
  const dLng = toRad(ke.lng - dari.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(dari.lat)) * Math.cos(toRad(ke.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}
