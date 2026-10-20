/**
 * Use case: puasa sunnah pada suatu tanggal Hijriah (fungsi MURNI — tanpa
 * fetch/efek samping, mudah diuji dengan node).
 *
 * Input tanggal: { hijri: { day, month, year }, weekday }
 * - month Hijriah: 1=Muharram … 9=Ramadan, 10=Syawal, 12=Dzulhijjah.
 * - weekday mengikuti Date.getDay(): 0=Ahad, 1=Senin, 2=Selasa, 3=Rabu,
 *   4=Kamis, 5=Jumat, 6=Sabtu.
 *
 * Aturan kesahihan yang dijaga:
 * - Hari yang DIHARAMKAN berpuasa tidak pernah ditandai puasa sunnah:
 *   1 Syawal (Idul Fitri), 10 Dzulhijjah (Idul Adha), dan hari Tasyrik
 *   (11–13 Dzulhijjah). Ini juga berarti Ayyamul Bidh tanggal 13 tidak
 *   berlaku di bulan Dzulhijjah.
 * - Bulan Ramadan: puasanya WAJIB, bukan sunnah — tidak ditandai di sini.
 * - Puasa Daud adalah pola selang-seling (sehari puasa, sehari berbuka)
 *   yang titik mulainya dipilih sendiri oleh pelakunya, jadi TIDAK bisa
 *   ditentukan dari tanggal — lihat INFO_PUASA_DAUD, jangan pernah
 *   ditampilkan sebagai kepastian pada suatu tanggal.
 */

export const INFO_PUASA_DAUD =
  'Puasa Daud adalah pola selang-seling — sehari berpuasa, sehari berbuka — yang dimulai dari hari pilihan pelakunya, sehingga tidak dapat ditentukan hanya dari tanggal.';

const NAMA_HARI = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/** Apakah tanggal Hijriah ini hari yang diharamkan untuk berpuasa? */
export function isHariHaramPuasa(hijri) {
  if (!hijri) return false;
  const { day, month } = hijri;
  if (month === 10 && day === 1) return true; // Idul Fitri
  if (month === 12 && day >= 10 && day <= 13) return true; // Idul Adha + Tasyrik
  return false;
}

/**
 * Daftar jenis puasa sunnah pada satu tanggal.
 * @param {{hijri:{day:number, month:number, year:number}, weekday:number}} input
 * @returns {Array<{kunci:string, nama:string, keterangan:string}>}
 */
export function puasaSunnahPadaHari({ hijri, weekday } = {}) {
  if (!hijri) return [];
  const day = Number(hijri.day);
  const month = Number(hijri.month);
  if (!Number.isFinite(day) || !Number.isFinite(month)) return [];
  if (isHariHaramPuasa({ day, month })) return [];
  if (month === 9) return []; // Ramadan: puasa wajib, bukan sunnah.

  const hasil = [];

  if (weekday === 1) {
    hasil.push({
      kunci: 'senin',
      nama: 'Puasa Senin',
      keterangan: 'Puasa sunnah hari Senin — hari amalan diangkat kepada Allah.',
    });
  }
  if (weekday === 4) {
    hasil.push({
      kunci: 'kamis',
      nama: 'Puasa Kamis',
      keterangan: 'Puasa sunnah hari Kamis — hari amalan diangkat kepada Allah.',
    });
  }
  if (day >= 13 && day <= 15) {
    hasil.push({
      kunci: 'ayyamul-bidh',
      nama: 'Puasa Ayyamul Bidh',
      keterangan: `Puasa hari-hari putih (Ayyamul Bidh), tanggal ${day} Hijriah — dianjurkan 13, 14, dan 15 setiap bulan Hijriah.`,
    });
  }
  if (month === 1 && day === 9) {
    hasil.push({
      kunci: 'tasua',
      nama: "Puasa Tasu'a",
      keterangan: "Puasa Tasu'a, 9 Muharram — dianjurkan mendampingi puasa Asyura.",
    });
  }
  if (month === 1 && day === 10) {
    hasil.push({
      kunci: 'asyura',
      nama: 'Puasa Asyura',
      keterangan: 'Puasa Asyura, 10 Muharram — menghapus dosa setahun yang lalu.',
    });
  }
  if (month === 12 && day === 9) {
    hasil.push({
      kunci: 'arafah',
      nama: 'Puasa Arafah',
      keterangan:
        'Puasa Arafah, 9 Dzulhijjah — menghapus dosa setahun yang lalu dan setahun yang akan datang (bagi yang tidak berhaji).',
    });
  }
  if (month === 10 && day !== 1) {
    hasil.push({
      kunci: 'syawal',
      nama: 'Puasa 6 Hari Syawal',
      keterangan:
        'Puasa enam hari di bulan Syawal (selain 1 Syawal) — seperti berpuasa setahun penuh bila menyempurnakan Ramadan.',
    });
  }

  return hasil;
}

/**
 * Cari kejadian puasa sunnah berikutnya mulai dari `dariTanggal` (inklusif)
 * sampai `jumlah` kejadian terkumpul atau `batasHari` hari dijelajahi.
 *
 * `resolver(tanggal: Date)` adalah fungsi tanggal Masehi → tanggal Hijriah
 * { day, month, year } (atau null bila tidak diketahui). Berkat resolver
 * yang disuntikkan, fungsi ini tetap murni & bisa diuji tanpa API.
 *
 * @returns {Array<{tanggal:Date, hijri:{day:number,month:number,year:number}, weekday:number, namaHari:string, puasa:Array}>}
 */
export function cariPuasaSunnahBerikutnya({ dariTanggal = new Date(), jumlah = 5, batasHari = 370, resolver } = {}) {
  if (typeof resolver !== 'function') return [];
  const hasil = [];
  const awal = new Date(dariTanggal.getFullYear(), dariTanggal.getMonth(), dariTanggal.getDate());
  for (let i = 0; i < batasHari && hasil.length < jumlah; i += 1) {
    const tanggal = new Date(awal.getFullYear(), awal.getMonth(), awal.getDate() + i);
    const hijri = resolver(tanggal);
    if (!hijri) continue;
    const weekday = tanggal.getDay();
    const puasa = puasaSunnahPadaHari({ hijri, weekday });
    if (puasa.length > 0) {
      hasil.push({ tanggal, hijri, weekday, namaHari: NAMA_HARI[weekday], puasa });
    }
  }
  return hasil;
}
