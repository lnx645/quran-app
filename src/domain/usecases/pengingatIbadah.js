/**
 * Use case Pengingat Ibadah (fungsi murni, tanpa DOM/localStorage):
 * menentukan pengingat mana yang jatuh tempo pada suatu waktu.
 *
 * Tiga jenis pengingat harian berjam TETAP (waktu lokal perangkat):
 * - dzikirPagi   : 05.30 → /dzikir
 * - dzikirPetang : 17.00 → /dzikir
 * - targetBaca   : 20.00 → /quran
 *
 * Satu jenis DINAMIS (penanda `dinamis: true`, tanpa jam tetap):
 * - tahajud : awal sepertiga malam terakhir, dihitung dari Maghrib dan
 *   Subuh keesokan hari (lihat hitungAwalSepertigaMalamTerakhir). Ia hanya
 *   bisa jatuh tempo bila pemanggil memberi konteks { menitTahajud }
 *   (dan, bila ada, { menitSubuh } sebagai akhir jendela); tanpa konteks
 *   jenis ini dilewati diam-diam — tidak pernah ditembakkan sembarangan.
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
  {
    kunci: 'tahajud',
    judul: 'Waktunya Tahajud',
    isi: 'Sepertiga malam terakhir telah tiba — bangunlah sejenak untuk sholat tahajud dan berdoa di waktu yang mustajab.',
    // DINAMIS: jam dihitung per hari dari jadwal Maghrib & Subuh tersimpan,
    // jadi jam/menit/jamLabel sengaja null (bukan jam tetap).
    dinamis: true,
    jam: null,
    menit: null,
    jamLabel: null,
    url: '/jadwal',
  },
];

export const PREF_PENGINGAT_BAWAAN = {
  dzikirPagi: false,
  dzikirPetang: false,
  targetBaca: false,
  // Aditif: pref tersimpan lama (tanpa kunci ini) dinormalisasi menjadi
  // false, tanpa mengubah perilaku tiga jenis lama.
  tahajud: false,
};

/**
 * Parse jam 'HH:MM' → menit dari tengah malam (0–1439), atau null bila
 * formatnya tidak valid. Menerima jam 1–2 digit ('4:30' maupun '04:30').
 */
export function jamKeMenit(jam) {
  if (typeof jam !== 'string') return null;
  const cocok = /^(\d{1,2}):([0-5]\d)$/.exec(jam.trim());
  if (!cocok) return null;
  const j = Number(cocok[1]);
  if (j > 23) return null;
  return j * 60 + Number(cocok[2]);
}

/** Format menit dari tengah malam → label 'HH.MM' (gaya jamLabel aplikasi). */
export function formatMenitKeJamLabel(menit) {
  if (!Number.isFinite(menit)) return null;
  const total = ((Math.round(menit) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}.${String(total % 60).padStart(2, '0')}`;
}

/**
 * Awal sepertiga malam terakhir.
 *
 * Malam dihitung dari Maghrib sampai Subuh KEESOKAN hari (jadi Subuh selalu
 * dianggap jatuh pada hari berikutnya — durasi malam lintas tengah malam).
 * Sepertiga terakhir mulai pada Maghrib + 2/3 durasi malam.
 *
 * Contoh: Maghrib 18:00 & Subuh 04:30 → durasi 630 menit, 2/3-nya 420 menit
 * → mulai pukul 01.00.
 *
 * @param {string} maghrib - 'HH:MM'
 * @param {string} subuhBesok - 'HH:MM' (Subuh keesokan hari)
 * @returns {{jam:number, menit:number, menitDariTengahMalam:number,
 *   jamLabel:string, durasiMalamMenit:number}|null} null bila input rusak.
 */
export function hitungAwalSepertigaMalamTerakhir(maghrib, subuhBesok) {
  const menitMaghrib = jamKeMenit(maghrib);
  const menitSubuh = jamKeMenit(subuhBesok);
  if (menitMaghrib === null || menitSubuh === null) return null;
  const durasiMalamMenit = (menitSubuh + 1440 - menitMaghrib) % 1440;
  if (durasiMalamMenit === 0) return null;
  const menitDariTengahMalam =
    (menitMaghrib + Math.round((durasiMalamMenit * 2) / 3)) % 1440;
  return {
    jam: Math.floor(menitDariTengahMalam / 60),
    menit: menitDariTengahMalam % 60,
    menitDariTengahMalam,
    jamLabel: formatMenitKeJamLabel(menitDariTengahMalam),
    durasiMalamMenit,
  };
}

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

const normalisasiMenitHari = (menit) => ((Math.round(menit) % 1440) + 1440) % 1440;

/**
 * Daftar kunci jenis pengingat yang harus ditembakkan pada `sekarang`.
 *
 * @param {object} pref - { dzikirPagi, dzikirPetang, targetBaca, tahajud } (boolean)
 * @param {Date} sekarang - waktu lokal saat pemeriksaan
 * @param {object} terakhir - { [kunci]: 'YYYY-MM-DD' } tanggal tembakan terakhir
 * @param {object} [konteks] - konteks jenis dinamis (opsional):
 *   { menitTahajud, menitSubuh } dalam menit dari tengah malam.
 *   - Tanpa menitTahajud yang valid, 'tahajud' TIDAK pernah jatuh tempo.
 *   - Dengan menitSubuh, jendela tahajud adalah [menitTahajud, menitSubuh)
 *     pada hari yang sama — sesudah Subuh pengingat tidak ditembakkan
 *     (mis. saat aplikasi baru dibuka siang hari). Bila awal sepertiganya
 *     jatuh SEBELUM tengah malam (menitTahajud > menitSubuh), jendelanya
 *     adalah [menitTahajud, 24.00) ∪ [00.00, menitSubuh).
 *   - Tanpa menitSubuh, perilakunya seperti jam tetap: jatuh tempo sejak
 *     menitTahajud tercapai.
 * @returns {string[]} kunci jenis yang jatuh tempo (urutan DEFINISI_PENGINGAT)
 */
export function tentukanPengingatJatuhTempo(pref, sekarang, terakhir = {}, konteks = {}) {
  const aktif = normalisasiPrefPengingat(pref);
  const waktu = sekarang instanceof Date ? sekarang : new Date(sekarang);
  const hariIni = kunciTanggalLokal(waktu);
  const menitSekarang = waktu.getHours() * 60 + waktu.getMinutes();

  const jatuhTempo = [];
  for (const def of DEFINISI_PENGINGAT) {
    if (!aktif[def.kunci]) continue;
    if (terakhir && terakhir[def.kunci] === hariIni) continue;

    if (def.dinamis) {
      const menitTarget = Number.isFinite(konteks?.menitTahajud)
        ? normalisasiMenitHari(konteks.menitTahajud)
        : null;
      if (menitTarget === null) continue; // jadwal tak tersedia → lewati diam-diam
      if (Number.isFinite(konteks?.menitSubuh)) {
        const menitAkhir = normalisasiMenitHari(konteks.menitSubuh);
        if (menitTarget === menitAkhir) continue; // jendela kosong
        const dalamJendela =
          menitTarget < menitAkhir
            ? menitSekarang >= menitTarget && menitSekarang < menitAkhir
            : menitSekarang >= menitTarget || menitSekarang < menitAkhir;
        if (!dalamJendela) continue;
      } else if (menitSekarang < menitTarget) {
        continue;
      }
      jatuhTempo.push(def.kunci);
      continue;
    }

    const menitTarget = def.jam * 60 + def.menit;
    if (menitSekarang < menitTarget) continue;
    jatuhTempo.push(def.kunci);
  }
  return jatuhTempo;
}

/** Definisi lengkap untuk sebuah kunci jenis (atau null bila tidak dikenal). */
export function definisiPengingat(kunci) {
  return DEFINISI_PENGINGAT.find((d) => d.kunci === kunci) ?? null;
}
