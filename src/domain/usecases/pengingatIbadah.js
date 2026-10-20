/**
 * Use case Pengingat Ibadah (fungsi murni, tanpa DOM/localStorage):
 * menentukan pengingat mana yang jatuh tempo pada suatu waktu.
 *
 * Tiga jenis pengingat harian (waktu lokal perangkat):
 * - dzikirPagi   : 05.30 → /dzikir
 * - dzikirPetang : 17.00 → /dzikir
 * - targetBaca   : 20.00 → /quran
 *
 * Dedupe per hari: `terakhir` adalah objek { [kunciJenis]: 'YYYY-MM-DD' }
 * berisi tanggal lokal terakhir pengingat itu ditembakkan. Pengingat
 * hanya jatuh tempo bila jam target hari ini sudah lewat DAN tanggal
 * terakhirnya bukan hari ini.
 */

export const DEFINISI_PENGINGAT = [
  {
    kunci: 'dzikirPagi',
    judul: 'Waktunya Dzikir Pagi',
    isi: 'Luangkan beberapa menit untuk dzikir pagi — mulai hari dengan mengingat Allah.',
    jam: 5,
    menit: 30,
    jamLabel: '05.30',
    url: '/dzikir',
  },
  {
    kunci: 'dzikirPetang',
    judul: 'Waktunya Dzikir Petang',
    isi: 'Luangkan beberapa menit untuk dzikir petang sebelum malam tiba.',
    jam: 17,
    menit: 0,
    jamLabel: '17.00',
    url: '/dzikir',
  },
  {
    kunci: 'targetBaca',
    judul: 'Target Baca Harian',
    isi: 'Sudahkah membaca Al-Qur\u2019an hari ini? Lanjutkan target baca harianmu malam ini.',
    jam: 20,
    menit: 0,
    jamLabel: '20.00',
    url: '/quran',
  },
];

export const PREF_PENGINGAT_BAWAAN = {
  dzikirPagi: false,
  dzikirPetang: false,
  targetBaca: false,
};

/** Kunci tanggal lokal 'YYYY-MM-DD' dari sebuah Date. */
export function kunciTanggalLokal(tanggal = new Date()) {
  const d = tanggal instanceof Date ? tanggal : new Date(tanggal);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

/** Normalisasi objek mentah (mis. dari localStorage) menjadi pref yang valid. */
export function normalisasiPrefPengingat(data) {
  const sumber = data && typeof data === 'object' ? data : {};
  const hasil = { ...PREF_PENGINGAT_BAWAAN };
  for (const { kunci } of DEFINISI_PENGINGAT) {
    if (typeof sumber[kunci] === 'boolean') hasil[kunci] = sumber[kunci];
  }
  return hasil;
}

/**
 * Daftar kunci jenis pengingat yang harus ditembakkan pada `sekarang`.
 *
 * @param {object} pref - { dzikirPagi, dzikirPetang, targetBaca } (boolean)
 * @param {Date} sekarang - waktu lokal saat pemeriksaan
 * @param {object} terakhir - { [kunci]: 'YYYY-MM-DD' } tanggal tembakan terakhir
 * @returns {string[]} kunci jenis yang jatuh tempo (urutan DEFINISI_PENGINGAT)
 */
export function tentukanPengingatJatuhTempo(pref, sekarang, terakhir = {}) {
  const aktif = normalisasiPrefPengingat(pref);
  const waktu = sekarang instanceof Date ? sekarang : new Date(sekarang);
  const hariIni = kunciTanggalLokal(waktu);
  const menitSekarang = waktu.getHours() * 60 + waktu.getMinutes();

  const jatuhTempo = [];
  for (const def of DEFINISI_PENGINGAT) {
    if (!aktif[def.kunci]) continue;
    const menitTarget = def.jam * 60 + def.menit;
    if (menitSekarang < menitTarget) continue;
    if (terakhir && terakhir[def.kunci] === hariIni) continue;
    jatuhTempo.push(def.kunci);
  }
  return jatuhTempo;
}

/** Definisi lengkap untuk sebuah kunci jenis (atau null bila tidak dikenal). */
export function definisiPengingat(kunci) {
  return DEFINISI_PENGINGAT.find((d) => d.kunci === kunci) ?? null;
}
