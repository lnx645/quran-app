// Usecase murni: hitung usia Masehi & Hijriah dari tanggal lahir.
// Tahun Hijriah rata-rata = 354,367 hari (12 bulan qamariyah) — usia Hijriah
// selalu sedikit lebih besar daripada usia Masehi untuk orang yang sama.

export const HARI_PER_TAHUN_HIJRIAH = 354.367;
export const HARI_PER_TAHUN_MASEHI = 365.2425;

const MS_PER_HARI = 24 * 60 * 60 * 1000;

/** Selisih hari kalender penuh antara dua Date (diabaikan jamnya). */
export function selisihHari(dari, sampai) {
  const a = new Date(dari.getFullYear(), dari.getMonth(), dari.getDate());
  const b = new Date(sampai.getFullYear(), sampai.getMonth(), sampai.getDate());
  return Math.round((b - a) / MS_PER_HARI);
}

/** Pecah total hari menjadi { tahun, bulan, hari } memakai panjang tahun rata-rata. */
function pecahUsia(totalHari, hariPerTahun) {
  const tahun = Math.floor(totalHari / hariPerTahun);
  const sisaSetelahTahun = totalHari - tahun * hariPerTahun;
  const hariPerBulan = hariPerTahun / 12;
  const bulan = Math.floor(sisaSetelahTahun / hariPerBulan);
  const hari = Math.round(sisaSetelahTahun - bulan * hariPerBulan);
  return { tahun, bulan, hari };
}

/**
 * Usia lengkap dari tanggal lahir.
 * @returns {{ totalHari:number,
 *   masehi:{tahun:number,bulan:number,hari:number},
 *   hijriah:{tahun:number,bulan:number,hari:number, desimal:number} } | null}
 * null bila tanggal lahir tidak valid / di masa depan.
 */
export function hitungUsia(tglLahir, hariIni = new Date()) {
  if (!(tglLahir instanceof Date) || Number.isNaN(tglLahir.getTime())) return null;
  const totalHari = selisihHari(tglLahir, hariIni);
  if (totalHari < 0) return null;
  return {
    totalHari,
    masehi: pecahUsia(totalHari, HARI_PER_TAHUN_MASEHI),
    hijriah: {
      ...pecahUsia(totalHari, HARI_PER_TAHUN_HIJRIAH),
      desimal: totalHari / HARI_PER_TAHUN_HIJRIAH,
    },
  };
}

/**
 * Ulang tahun Hijriah berikutnya dari tanggal lahir Hijriah.
 * @param {{day:number, month:number}} lahirHijriah hari & bulan lahir Hijriah
 * @param {{day:number, month:number, year:number}} kiniHijriah tanggal Hijriah hari ini
 * @returns {{day:number, month:number, year:number}} tanggal Hijriah ultah berikutnya
 *   (tahun ini bila belum lewat — termasuk tepat hari ini — selain itu tahun depan).
 */
export function ulangTahunHijriahBerikutnya(lahirHijriah, kiniHijriah) {
  const sudahLewat =
    kiniHijriah.month > lahirHijriah.month ||
    (kiniHijriah.month === lahirHijriah.month && kiniHijriah.day > lahirHijriah.day);
  return {
    day: lahirHijriah.day,
    month: lahirHijriah.month,
    year: kiniHijriah.year + (sudahLewat ? 1 : 0),
  };
}
