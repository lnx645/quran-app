/**
 * Use case Pengingat Ibadah (fungsi murni, tanpa DOM/localStorage):
 * menentukan pengingat mana yang jatuh tempo pada suatu waktu.
 *
 * Tiga jenis pengingat harian berjam TETAP (waktu lokal perangkat):
 * - dzikirPagi   : 05.30 → /dzikir
 * - dzikirPetang : 17.00 → /dzikir
 * - targetBaca   : 20.00 → /quran
 *
 * Jenis-jenis DINAMIS (penanda `dinamis: true`):
 * - tahajud : awal sepertiga malam terakhir, dihitung dari Maghrib dan
 *   Subuh keesokan hari (lihat hitungAwalSepertigaMalamTerakhir). Ia hanya
 *   bisa jatuh tempo bila pemanggil memberi konteks { menitTahajud }
 *   (dan, bila ada, { menitSubuh } sebagai akhir jendela); tanpa konteks
 *   jenis ini dilewati diam-diam — tidak pernah ditembakkan sembarangan.
 * - puasaSunnah : pengingat H-1 puasa sunnah. Jamnya TETAP 17.30, tetapi
 *   hanya jatuh tempo bila BESOK adalah hari puasa sunnah — pemanggil
 *   memberi konteks { puasaBesok } (lihat tentukanPuasaBesok); tanpa
 *   konteks (atau puasaBesok null) jenis ini dilewati diam-diam.
 *
 * Dedupe per hari: `terakhir` adalah objek { [kunciJenis]: 'YYYY-MM-DD' }
 * berisi tanggal lokal terakhir pengingat itu ditembakkan. Pengingat
 * hanya jatuh tempo bila jam target hari ini sudah lewat DAN tanggal
 * terakhirnya bukan hari ini.
 */

import { puasaSunnahPadaHari } from './hitungPuasaSunnah.js';

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
  {
    kunci: 'puasaSunnah',
    // Judul/isi CADANGAN: judul yang tampil dibangun dinamis oleh
    // pemanggil dari nama puasa besok (konteks.puasaBesok.nama), mis.
    // "Besok Puasa Ayyamul Bidh".
    judul: 'Besok Hari Puasa Sunnah',
    isi: 'Besok adalah hari puasa sunnah — siapkan sahur dan niatkan puasa malam ini.',
    // DINAMIS bersyarat hari: jam tetap 17.30, tetapi hanya jatuh tempo
    // bila konteks { puasaBesok } terisi (besok hari puasa sunnah).
    dinamis: true,
    jam: 17,
    menit: 30,
    jamLabel: '17.30',
    url: '/kalender',
  },
];

export const PREF_PENGINGAT_BAWAAN = {
  dzikirPagi: false,
  dzikirPetang: false,
  targetBaca: false,
  // Aditif: pref tersimpan lama (tanpa kunci ini) dinormalisasi menjadi
  // false, tanpa mengubah perilaku tiga jenis lama.
  tahajud: false,
  // Aditif pula untuk pengingat Puasa Sunnah (H-1).
  puasaSunnah: false,
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

// ---------- Puasa Sunnah (H-1): resolver Hijriah & konteks ----------

/**
 * Resolver tanggal Masehi → Hijriah { day, month, year } memakai kalender
 * Islam Umm al-Qura bawaan platform (Intl) — kalender yang sama yang
 * mendasari konversi gToH Aladhan yang ditampilkan KalenderPage (di sana
 * resolusinya lewat API asinkron, sehingga tidak bisa dipakai ulang oleh
 * fungsi murni/runner sinkron ini). Pola resolver yang DISUNTIKKAN sama
 * seperti `cariPuasaSunnahBerikutnya` di hitungPuasaSunnah.js: pemanggil
 * boleh mengganti resolver ini. Mengembalikan null bila tanggal tidak
 * valid / Intl tidak mendukung kalendernya.
 */
const formatHijriahUmalqura = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

export function resolverHijriahIntl(tanggal) {
  try {
    const d = tanggal instanceof Date ? tanggal : new Date(tanggal);
    if (Number.isNaN(d.getTime())) return null;
    const bagian = {};
    for (const p of formatHijriahUmalqura.formatToParts(d)) {
      if (p.type === 'day' || p.type === 'month' || p.type === 'year') {
        bagian[p.type] = Number(p.value);
      }
    }
    const { day, month, year } = bagian;
    if (![day, month, year].every(Number.isFinite)) return null;
    return { day, month, year };
  } catch {
    return null;
  }
}

/**
 * Puasa sunnah BESOK (relatif terhadap tanggal lokal `sekarang`), atau
 * null bila besok bukan hari puasa sunnah.
 *
 * Logika puasanya memakai ULANG puasaSunnahPadaHari dari
 * hitungPuasaSunnah.js — fungsi itu sudah mengecualikan hari yang
 * diharamkan berpuasa (isHariHaramPuasa: Idul Fitri, Idul Adha, Tasyrik)
 * dan bulan Ramadan, jadi di sini TIDAK ada pemeriksaan haram tambahan.
 * Bila besok memuat beberapa puasa, `nama`/`kunci`/`keterangan` mengambil
 * puasa BERTANGGAL khusus (Arafah, Asyura, Ayyamul Bidh, dst.) lebih dulu
 * daripada puasa mingguan rutin (Senin/Kamis) — mis. Kamis yang juga
 * Asyura ditajuki "Puasa Asyura"; `daftarNama` tetap memuat semuanya.
 *
 * @param {Date} sekarang
 * @param {(tanggal: Date) => ({day:number, month:number, year:number}|null)} [resolver]
 * @returns {{nama:string, kunci:string, keterangan:string, daftarNama:string[],
 *   hijri:{day:number, month:number, year:number}, tanggal:Date}|null}
 */
export function tentukanPuasaBesok(sekarang, resolver = resolverHijriahIntl) {
  if (typeof resolver !== 'function') return null;
  const acuan = sekarang instanceof Date ? sekarang : new Date(sekarang);
  if (Number.isNaN(acuan.getTime())) return null;
  const besok = new Date(acuan.getFullYear(), acuan.getMonth(), acuan.getDate() + 1);
  const hijriMentah = resolver(besok);
  if (!hijriMentah) return null;
  const hijri = {
    day: Number(hijriMentah.day),
    month: Number(hijriMentah.month),
    year: Number(hijriMentah.year),
  };
  const daftar = puasaSunnahPadaHari({ hijri, weekday: besok.getDay() });
  if (daftar.length === 0) return null;
  const utama =
    daftar.find((d) => d.kunci !== 'senin' && d.kunci !== 'kamis') ?? daftar[0];
  return {
    nama: utama.nama,
    kunci: utama.kunci,
    keterangan: utama.keterangan,
    daftarNama: daftar.map((d) => d.nama),
    hijri,
    tanggal: besok,
  };
}

/** Konteks dinamis { puasaBesok } untuk tentukanPengingatJatuhTempo. */
export function tentukanKonteksPuasaBesok(sekarang, resolver) {
  return { puasaBesok: tentukanPuasaBesok(sekarang, resolver) };
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
 * @param {object} pref - { dzikirPagi, dzikirPetang, targetBaca, tahajud, puasaSunnah } (boolean)
 * @param {Date} sekarang - waktu lokal saat pemeriksaan
 * @param {object} terakhir - { [kunci]: 'YYYY-MM-DD' } tanggal tembakan terakhir
 * @param {object} [konteks] - konteks jenis dinamis (opsional):
 *   { menitTahajud, menitSubuh, puasaBesok }.
 *   - puasaBesok: hasil tentukanPuasaBesok (objek puasa besok) atau null.
 *     'puasaSunnah' hanya jatuh tempo bila puasaBesok terisi DAN jam
 *     tetapnya (17.30) hari ini sudah tercapai.
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

    if (def.dinamis && def.kunci === 'puasaSunnah') {
      // H-1: hanya bila besok puasa sunnah (konteks terisi) dan jam tetap
      // 17.30 hari ini sudah tercapai; tanpa konteks dilewati diam-diam.
      if (!konteks?.puasaBesok) continue;
      if (menitSekarang < def.jam * 60 + def.menit) continue;
      jatuhTempo.push(def.kunci);
      continue;
    }

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
