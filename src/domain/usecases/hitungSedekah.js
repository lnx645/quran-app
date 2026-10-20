/**
 * Use case hitung Sedekah & Infaq (fungsi MURNI — tanpa DOM/localStorage).
 *
 * Bentuk catatan (disimpan LocalSedekahRepository, kunci `noor.sedekah.v1`):
 *   { id, tanggal: 'YYYY-MM-DD', nominal: number|null, jenis, catatan }
 * `nominal` BOLEH null — pengguna dapat mencatat sedekah tanpa menulis
 * jumlahnya (privasi & menjaga keikhlasan). Semua total di berkas ini
 * menjumlahkan HANYA catatan bernominal; catatan tanpa nominal tetap
 * dihitung pada `jumlahCatatan` tetapi tidak pada `jumlahBernominal`,
 * sehingga UI wajib membedakan keduanya dan tidak menampilkan total uang
 * seolah-olah mencakup semua catatan.
 */

import { kunciHari } from './streakIbadah.js';

export const JENIS_SEDEKAH = ['Subuh', 'Jumat', 'Umum', 'Infaq'];

const POLA_TANGGAL = /^\d{4}-\d{2}-\d{2}$/;

/** Catatan valid untuk dihitung: objek bertanggal 'YYYY-MM-DD'. */
function catatanValid(c) {
  return Boolean(c) && typeof c === 'object' && typeof c.tanggal === 'string' && POLA_TANGGAL.test(c.tanggal);
}

function daftarAman(catatan) {
  return Array.isArray(catatan) ? catatan.filter(catatanValid) : [];
}

/** Nominal yang ikut dijumlahkan: angka finite > 0; selain itu 0. */
function nominalHitung(c) {
  const n = Number(c?.nominal);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Bernominal = nominal berupa angka finite (termasuk 0 yang dicatat eksplisit). */
function bernominal(c) {
  return c?.nominal !== null && c?.nominal !== undefined && Number.isFinite(Number(c.nominal));
}

function ringkas(daftar) {
  return {
    total: daftar.reduce((acc, c) => acc + nominalHitung(c), 0),
    jumlahCatatan: daftar.length,
    jumlahBernominal: daftar.filter(bernominal).length,
  };
}

/** Total sedekah pada satu tanggal persis 'YYYY-MM-DD'. */
export function totalHari(catatan, tanggal) {
  return ringkas(daftarAman(catatan).filter((c) => c.tanggal === tanggal));
}

/** Total sedekah hari ini (tanggal lokal perangkat, bisa di-inject untuk uji). */
export function totalHariIni(catatan, date = new Date()) {
  return totalHari(catatan, kunciHari(date));
}

/** Total sedekah satu bulan kalender: `bulan` 1–12, `tahun` 4 digit. */
export function totalBulan(catatan, tahun, bulan) {
  const th = Math.floor(Number(tahun));
  const bl = Math.floor(Number(bulan));
  if (!Number.isFinite(th) || !Number.isFinite(bl) || bl < 1 || bl > 12) {
    return { total: 0, jumlahCatatan: 0, jumlahBernominal: 0 };
  }
  const awalan = `${th}-${String(bl).padStart(2, '0')}`;
  return ringkas(daftarAman(catatan).filter((c) => c.tanggal.startsWith(awalan)));
}

/**
 * Progres menuju target nominal. Mengembalikan null bila target tidak
 * valid (null/0/negatif/bukan angka) — UI menampilkan ajakan mengatur
 * target, bukan bar 0%. `persen` dibatasi 100 untuk tampilan bar.
 */
export function progresTarget(total, target) {
  const t = Number(target);
  if (!Number.isFinite(t) || t <= 0) return null;
  const nilai = Math.max(0, Number(total) || 0);
  return {
    target: t,
    total: nilai,
    persen: Math.min(100, Math.round((nilai / t) * 100)),
    sisa: Math.max(0, t - nilai),
    tercapai: nilai >= t,
  };
}

/** Ringkasan per jenis — selalu keempat jenis, urutan JENIS_SEDEKAH. */
export function ringkasanPerJenis(catatan) {
  const daftar = daftarAman(catatan);
  return JENIS_SEDEKAH.map((jenis) => ({
    jenis,
    ...ringkas(daftar.filter((c) => c.jenis === jenis)),
  }));
}

/** Ringkasan bulan berjalan (dari `date`, default sekarang): total + per jenis. */
export function ringkasanBulanBerjalan(catatan, date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const tahun = d.getFullYear();
  const bulan = d.getMonth() + 1;
  const awalan = `${tahun}-${String(bulan).padStart(2, '0')}`;
  const bulanIni = daftarAman(catatan).filter((c) => c.tanggal.startsWith(awalan));
  return { tahun, bulan, ...ringkas(bulanIni), perJenis: ringkasanPerJenis(bulanIni) };
}
