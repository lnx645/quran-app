/**
 * Use case Khatam (fungsi murni): hitung progres & kebutuhan baca harian.
 */
import { halamanJuz, TOTAL_HALAMAN } from '../../data/sources/khatamData.js';

/** Total halaman dari juz-juz yang ditandai selesai. */
export function halamanSelesai(selesaiMap = {}) {
  return Object.keys(selesaiMap)
    .filter((j) => selesaiMap[j])
    .reduce((acc, j) => acc + halamanJuz(Number(j)).jumlah, 0);
}

export function persenKhatam(selesaiMap = {}) {
  return Math.round((halamanSelesai(selesaiMap) / TOTAL_HALAMAN) * 1000) / 10;
}

/**
 * Halaman per hari yang dibutuhkan dari hari ini (inklusif) sampai tanggal target.
 * @returns {{hariTersisa:number, halamanPerHari:number, sisaHalaman:number}|null}
 * null bila tidak ada target / target sudah lewat.
 */
export function kebutuhanHarian(selesaiMap, targetTanggalISO, hariIni = new Date()) {
  if (!targetTanggalISO) return null;
  const target = new Date(`${targetTanggalISO}T23:59:59`);
  const awalHariIni = new Date(hariIni.getFullYear(), hariIni.getMonth(), hariIni.getDate());
  const hariTersisa = Math.floor((target - awalHariIni) / 86400000) + 1;
  const sisaHalaman = TOTAL_HALAMAN - halamanSelesai(selesaiMap);
  if (hariTersisa <= 0) {
    return { hariTersisa: 0, halamanPerHari: sisaHalaman, sisaHalaman };
  }
  return {
    hariTersisa,
    halamanPerHari: Math.ceil(sisaHalaman / hariTersisa),
    sisaHalaman,
  };
}
