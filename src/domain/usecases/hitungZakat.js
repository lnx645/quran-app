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

// ── Zakat lanjutan (Gelombang 3) ───────────────────────────────────
// Emas & perak, pertanian, peternakan, perdagangan. Semua fungsi di
// bawah MURNI dan tidak mengubah perilaku fungsi lama di atas.

export const PERAK_NISAB_GRAM = 595;
export const HARGA_PERAK_DEFAULT = 18_000;
export const PERTANIAN_NISAB_GABAH_KG = 653; // 5 wasaq
// Setara beras dari 653 kg gabah (acuan umum yang dipakai lembaga amil).
export const PERTANIAN_NISAB_BERAS_KG = 522;
export const KADAR_PERTANIAN = { hujan: 0.1, irigasi: 0.05, campuran: 0.075 };
export const NISAB_TERNAK = { kambing: 40, sapi: 30, unta: 5 };

/**
 * Zakat Emas & Perak.
 * @param {'emas'|'perak'} jenis
 * @returns {{nisabGram:number, nilai:number, wajib:boolean, zakat:number, zakatGram:number}}
 */
export function hitungZakatEmasPerak(jenis, beratGram, hargaPerGram) {
  const berat = aman(beratGram);
  const harga = aman(hargaPerGram);
  const nisabGram = jenis === 'perak' ? PERAK_NISAB_GRAM : EMAS_NISAB_GRAM;
  const nilai = berat * harga;
  const wajib = harga > 0 && berat >= nisabGram;
  return {
    nisabGram,
    nilai,
    wajib,
    zakat: wajib ? nilai * KADAR_ZAKAT : 0,
    zakatGram: wajib ? berat * KADAR_ZAKAT : 0,
  };
}

/**
 * Zakat Pertanian. Kadar menurut pengairan: hujan/tadah 10%, irigasi
 * berbiaya 5%, campuran 7,5%. Nisab 653 kg gabah (±522 kg beras).
 * @param {'gabah'|'beras'} satuan
 * @param {'hujan'|'irigasi'|'campuran'} pengairan
 * @returns {{nisabKg:number, persen:number, wajib:boolean, zakatKg:number, nilaiHasil:number, zakatUang:number}}
 */
export function hitungZakatPertanian(hasilKg, satuan, pengairan, hargaPerKg = 0) {
  const hasil = aman(hasilKg);
  const harga = aman(hargaPerKg);
  const nisabKg = satuan === 'beras' ? PERTANIAN_NISAB_BERAS_KG : PERTANIAN_NISAB_GABAH_KG;
  const persen = KADAR_PERTANIAN[pengairan] ?? KADAR_PERTANIAN.hujan;
  const wajib = hasil >= nisabKg;
  const zakatKg = wajib ? hasil * persen : 0;
  return {
    nisabKg,
    persen,
    wajib,
    zakatKg,
    nilaiHasil: hasil * harga,
    zakatUang: zakatKg * harga,
  };
}

function kewajibanKambing(n) {
  if (n < NISAB_TERNAK.kambing) return '';
  if (n <= 120) return '1 ekor kambing';
  if (n <= 200) return '2 ekor kambing';
  if (n <= 300) return '3 ekor kambing';
  return `${Math.ceil(n / 100)} ekor kambing`;
}

function kewajibanSapi(n) {
  if (n < NISAB_TERNAK.sapi) return '';
  // Pola klasik: tiap 30 ekor → 1 tabi' (1 th), tiap 40 ekor → 1 musinnah
  // (2 th). Cari kombinasi 30a + 40b yang paling menutupi jumlah ternak.
  let terbaik = { a: 0, b: 0, tutup: -1 };
  for (let a = 0; a * 30 <= n; a += 1) {
    for (let b = 0; b * 40 <= n - a * 30; b += 1) {
      const tutup = a * 30 + b * 40;
      if (tutup > terbaik.tutup) terbaik = { a, b, tutup };
    }
  }
  const bagian = [];
  if (terbaik.a > 0) bagian.push(`${terbaik.a} ekor tabi' (umur 1 tahun)`);
  if (terbaik.b > 0) bagian.push(`${terbaik.b} ekor musinnah (umur 2 tahun)`);
  return bagian.join(' + ');
}

function kewajibanUnta(n) {
  if (n < NISAB_TERNAK.unta) return '';
  if (n <= 9) return '1 ekor kambing';
  if (n <= 14) return '2 ekor kambing';
  if (n <= 19) return '3 ekor kambing';
  if (n <= 24) return '4 ekor kambing';
  if (n <= 35) return "1 ekor bintu makhad (unta betina umur 1 tahun)";
  if (n <= 45) return "1 ekor bintu labun (unta betina umur 2 tahun)";
  if (n <= 60) return "1 ekor hiqqah (unta betina umur 3 tahun)";
  if (n <= 75) return "1 ekor jadza'ah (unta betina umur 4 tahun)";
  if (n <= 90) return '2 ekor bintu labun';
  if (n <= 120) return '2 ekor hiqqah';
  // >120: tiap 40 ekor → 1 bintu labun, tiap 50 ekor → 1 hiqqah (pendekatan
  // kombinasi yang paling menutupi jumlah ternak).
  let terbaik = { a: 0, b: 0, tutup: -1 };
  for (let a = 0; a * 40 <= n; a += 1) {
    for (let b = 0; b * 50 <= n - a * 40; b += 1) {
      const tutup = a * 40 + b * 50;
      if (tutup > terbaik.tutup) terbaik = { a, b, tutup };
    }
  }
  const bagian = [];
  if (terbaik.a > 0) bagian.push(`${terbaik.a} ekor bintu labun`);
  if (terbaik.b > 0) bagian.push(`${terbaik.b} ekor hiqqah`);
  return bagian.join(' + ');
}

/**
 * Zakat Peternakan (tabel nisab klasik). Syarat ringkas: ternak dimiliki
 * penuh selama 1 haul dan digembalakan (sa'imah) sebagian besar tahun.
 * @param {'kambing'|'sapi'|'unta'} jenis
 * @returns {{nisab:number, wajib:boolean, kewajiban:string}}
 */
export function hitungZakatPeternakan(jenis, jumlahEkor) {
  const n = Math.max(0, Math.floor(aman(jumlahEkor)));
  const nisab = NISAB_TERNAK[jenis] ?? NISAB_TERNAK.kambing;
  const wajib = n >= nisab;
  const kewajiban = !wajib
    ? ''
    : jenis === 'sapi'
      ? kewajibanSapi(n)
      : jenis === 'unta'
        ? kewajibanUnta(n)
        : kewajibanKambing(n);
  return { nisab, wajib, kewajiban };
}

/**
 * Zakat Perdagangan: (modal berputar + keuntungan + piutang tertagih −
 * utang jatuh tempo) mencapai nisab 85 gram emas → zakat 2,5%.
 * @returns {{totalHarta:number, nisab:number, wajib:boolean, zakat:number}}
 */
export function hitungZakatPerdagangan(
  modalBerputar,
  keuntungan,
  piutangTertagih,
  utangJatuhTempo,
  hargaEmasPerGram,
) {
  const emas = aman(hargaEmasPerGram);
  const totalHarta = Math.max(
    0,
    aman(modalBerputar) + aman(keuntungan) + aman(piutangTertagih) - aman(utangJatuhTempo),
  );
  const nisab = EMAS_NISAB_GRAM * emas;
  const wajib = emas > 0 && nisab > 0 && totalHarta >= nisab;
  return { totalHarta, nisab, wajib, zakat: wajib ? totalHarta * KADAR_ZAKAT : 0 };
}
