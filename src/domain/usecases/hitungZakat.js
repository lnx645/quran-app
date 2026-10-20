/**
 * Use case: perhitungan zakat (fungsi murni — mudah diuji, tanpa efek samping).
 *
 * Acuan:
 * - Zakat mal: nisab 85 gram emas, kadar 2,5% dari harta (bila haul terpenuhi).
 * - Zakat profesi: nisab tahunan 85 gram emas → nisab bulanan = 85 × hargaEmas / 12,
 *   kadar 2,5% dari penghasilan bruto bulanan.
 * - Zakat fitrah: 2,5 kg beras per jiwa (atau uang senilai).
 */

export const EMAS_NISAB_GRAM = 85;
export const KADAR_ZAKAT = 0.025;
export const BERAS_FITRAH_KG_PER_JIWA = 2.5;
// Harga emas acuan awal (IDR/gram) — selalu bisa diedit pengguna di UI.
export const HARGA_EMAS_DEFAULT = 1_550_000;
export const HARGA_BERAS_DEFAULT = 14_000;

const aman = (n) => {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

/** Zakat Mal. @returns {{nisab:number, wajib:boolean, zakat:number}} */
export function hitungZakatMal(totalHarta, hargaEmasPerGram) {
  const harta = aman(totalHarta);
  const emas = aman(hargaEmasPerGram);
  const nisab = EMAS_NISAB_GRAM * emas;
  const wajib = emas > 0 && harta >= nisab && nisab > 0;
  return { nisab, wajib, zakat: wajib ? harta * KADAR_ZAKAT : 0 };
}

/** Zakat Profesi (penghasilan bulanan). @returns {{nisabBulanan:number, nisabTahunan:number, wajib:boolean, zakat:number}} */
export function hitungZakatProfesi(penghasilanBulanan, hargaEmasPerGram) {
  const gaji = aman(penghasilanBulanan);
  const emas = aman(hargaEmasPerGram);
  const nisabTahunan = EMAS_NISAB_GRAM * emas;
  const nisabBulanan = nisabTahunan / 12;
  const wajib = emas > 0 && gaji >= nisabBulanan && nisabBulanan > 0;
  return { nisabBulanan, nisabTahunan, wajib, zakat: wajib ? gaji * KADAR_ZAKAT : 0 };
}

/** Zakat Fitrah. @returns {{totalBerasKg:number, totalUang:number}} */
export function hitungZakatFitrah(jumlahJiwa, hargaBerasPerKg) {
  const jiwa = Math.max(0, Math.floor(aman(jumlahJiwa)));
  const harga = aman(hargaBerasPerKg);
  const totalBerasKg = jiwa * BERAS_FITRAH_KG_PER_JIWA;
  return { totalBerasKg, totalUang: totalBerasKg * harga };
}

/** Format angka menjadi Rupiah Indonesia. */
export function formatRupiah(n) {
  const v = Math.round(Number(n) || 0);
  return 'Rp' + v.toLocaleString('id-ID');
}
