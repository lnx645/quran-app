import { useMemo } from 'react';

/**
 * Rotasi harian deterministik — dipakai kartu "Hadits Hari Ini" dan
 * "Ayat Hari Ini" di beranda.
 *
 * indeksHarian(total, tanggal): nomor hari lokal (hari sejak epoch,
 * dihitung dari komponen tanggal LOKAL agar berganti tepat tengah malam
 * waktu pengguna) dimodulo total. Hasilnya: indeks yang sama sepanjang
 * satu hari kalender, berubah keesokan harinya, dan merata membagi
 * seluruh daftar. Fungsi murni — mudah diuji.
 */
export function indeksHarian(total, tanggal = new Date()) {
  const n = Math.floor(Number(total));
  if (!Number.isFinite(n) || n <= 0) return 0;
  const hariKe = Math.floor(
    Date.UTC(tanggal.getFullYear(), tanggal.getMonth(), tanggal.getDate()) / 86400000,
  );
  return ((hariKe % n) + n) % n;
}

/** Hook pembungkus: indeks item "hari ini" untuk daftar sepanjang total. */
export function useRotasiHarian(total) {
  return useMemo(() => indeksHarian(total), [total]);
}

export default useRotasiHarian;
