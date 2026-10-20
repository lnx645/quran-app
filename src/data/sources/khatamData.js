// Data statis Khatam: halaman awal tiap juz pada Mushaf Madinah (total 604 halaman).
// Juz ke-n membentang dari HALAMAN_AWAL_JUZ[n-1] sampai HALAMAN_AWAL_JUZ[n]-1 (juz 30 s/d 604).
export const TOTAL_HALAMAN = 604;
export const HALAMAN_AWAL_JUZ = [
  1, 22, 42, 62, 82, 102, 122, 142, 162, 182, 202, 222, 242, 262, 282, 302, 322, 342,
  362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582,
];

export function halamanJuz(juz) {
  const awal = HALAMAN_AWAL_JUZ[juz - 1];
  const akhir = juz < 30 ? HALAMAN_AWAL_JUZ[juz] - 1 : TOTAL_HALAMAN;
  return { awal, akhir, jumlah: akhir - awal + 1 };
}
