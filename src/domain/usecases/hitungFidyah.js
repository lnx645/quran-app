/**
 * Use case: perhitungan fidyah (fungsi murni — tanpa efek samping).
 *
 * Fidyah: memberi makan orang miskin untuk setiap hari puasa Ramadhan
 * yang ditinggalkan oleh orang yang tidak mampu berpuasa dan tidak
 * diharapkan mampu mengqadhanya (mis. orang tua renta, sakit menahun).
 *
 * Besaran per hari (pilihan paket):
 * - 'beras15' : 1,5 kg beras — praktik umum yang banyak dipakai di Indonesia.
 * - 'mud'     : 1 mud ≈ 0,675 kg bahan makanan pokok.
 * - 'uang'    : nilai uang setara 1× makan per hari.
 */

export const MUD_KG = 0.675;
export const FIDYAH_PRAKTIK_KG = 1.5;
export const HARGA_PORSI_DEFAULT = 15_000;

const aman = (n) => {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

/**
 * @param {number} jumlahHari hari puasa yang ditinggalkan
 * @param {'beras15'|'mud'|'uang'} mode paket besaran fidyah
 * @param {number} harga harga per kg beras (mode beras) atau per porsi (mode uang)
 * @returns {{hari:number, mode:string, kgPerHari:number, totalKg:number, totalRp:number}}
 */
export function hitungFidyah(jumlahHari, mode, harga) {
  const hari = Math.max(0, Math.floor(aman(jumlahHari)));
  const tarif = aman(harga);
  const kgPerHari = mode === 'mud' ? MUD_KG : mode === 'uang' ? 0 : FIDYAH_PRAKTIK_KG;
  const totalKg = hari * kgPerHari;
  const totalRp = mode === 'uang' ? hari * tarif : totalKg * tarif;
  return { hari, mode, kgPerHari, totalKg, totalRp };
}
