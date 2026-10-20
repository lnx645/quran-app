/**
 * Use case: rentang waktu terlarang (makruh) sholat & waktu mustajab
 * (fungsi murni — tanpa efek samping, tanpa panggilan API).
 *
 * Tiga rentang waktu yang dimakruhkan untuk sholat sunnah mutlak
 * menurut jumhur ulama, dihitung MURNI dari jadwal sholat hari
 * berjalan yang sama dengan yang tampil di halaman Jadwal (hasil
 * `useJadwal` → JadwalRepositoryImpl → mapJadwal): daftar
 * `jadwal.waktu` berisi { kunci, nama, jam: 'HH:MM' } dengan kunci
 * Aladhan 'Fajr' (Subuh), 'Sunrise' (Terbit/Syuruq), 'Dhuhr'
 * (Dzuhur), 'Asr' (Ashar), 'Maghrib', 'Isha' (Isya).
 *
 * 1. Setelah Subuh s.d. Syuruq — dari waktu Subuh sampai terbit.
 * 2. Istiwa' menjelang Dzuhur — PERKIRAAN ±10 menit sebelum Dzuhur
 *    s.d. masuk Dzuhur (saat matahari tepat di tengah langit).
 * 3. Setelah Ashar s.d. Maghrib — dari waktu Ashar sampai terbenam.
 *
 * Catatan fikih: ini kemakruhan untuk sholat sunnah mutlak menurut
 * jumhur, BUKAN larangan mutlak semua sholat. Sholat wajib/qadha
 * tetap dikerjakan pada waktunya, dan untuk sholat yang beralasan
 * (tahiyatul masjid, jenazah, sujud tilawah, dsb.) terdapat
 * perbedaan pendapat — ikuti bimbingan guru setempat.
 */

/** Selisih perkiraan awal istiwa' sebelum Dzuhur, dalam menit. */
export const MENIT_SEBELUM_ISTIWA = 10;

const KUNCI = { SUBUH: 'Fajr', TERBIT: 'Sunrise', DZUHUR: 'Dhuhr', ASHAR: 'Asr', MAGHRIB: 'Maghrib' };

/** 'HH:MM' / 'HH.MM' → menit sejak tengah malam; null bila tak terbaca. */
function menitDariJam(jam) {
  const cocok = /^(\d{1,2})[:.](\d{2})/.exec(String(jam ?? '').trim());
  if (!cocok) return null;
  const menit = Number(cocok[1]) * 60 + Number(cocok[2]);
  return menit >= 0 && menit < 1440 ? menit : null;
}

/** Menit sejak tengah malam → 'HH.MM' (format tampil Indonesia). */
function jamDariMenit(menit) {
  const total = ((Math.round(menit) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}.${String(total % 60).padStart(2, '0')}`;
}

function jamDariKunci(peta, kunci) {
  const menit = peta.get(kunci);
  return menit == null ? null : jamDariMenit(menit);
}

/**
 * Hitung tiga rentang waktu terlarang dari jadwal hari berjalan.
 *
 * @param {{waktu?: Array<{kunci:string, jam:string}>}|Array<{kunci:string, jam:string}>|null|undefined} jadwal
 *   Objek jadwal hasil mapJadwal (field `waktu`) atau langsung daftar
 *   waktunya. Jadwal kosong/belum termuat/rusak → [] (aman).
 * @returns {Array<{kunci:string, label:string, dari:string, sampai:string, catatan:string}>}
 *   Jam dalam format 'HH.MM'. Rentang yang ujungnya tidak tersedia
 *   di jadwal dilewati, bukan dikarang.
 */
export function hitungRentangTerlarang(jadwal) {
  const daftar = Array.isArray(jadwal) ? jadwal : jadwal?.waktu;
  if (!Array.isArray(daftar) || daftar.length === 0) return [];

  const peta = new Map();
  for (const w of daftar) {
    const menit = menitDariJam(w?.jam);
    if (w?.kunci && menit != null && !peta.has(w.kunci)) peta.set(w.kunci, menit);
  }
  if (peta.size === 0) return [];

  const kandidat = [
    {
      kunci: 'subuh-syuruq',
      label: 'Setelah Subuh sampai Syuruq',
      dari: jamDariKunci(peta, KUNCI.SUBUH),
      sampai: jamDariKunci(peta, KUNCI.TERBIT),
      catatan: 'Sejak masuk waktu Subuh sampai matahari terbit (syuruq).',
    },
    {
      kunci: 'istiwa',
      label: "Istiwa' menjelang Dzuhur (perkiraan)",
      dari:
        peta.get(KUNCI.DZUHUR) == null
          ? null
          : jamDariMenit(peta.get(KUNCI.DZUHUR) - MENIT_SEBELUM_ISTIWA),
      sampai: jamDariKunci(peta, KUNCI.DZUHUR),
      catatan: `Perkiraan: sekitar ${MENIT_SEBELUM_ISTIWA} menit sebelum Dzuhur sampai masuk waktu Dzuhur, saat matahari tepat di tengah langit (istiwa').`,
    },
    {
      kunci: 'ashar-maghrib',
      label: 'Setelah Ashar sampai Maghrib',
      dari: jamDariKunci(peta, KUNCI.ASHAR),
      sampai: jamDariKunci(peta, KUNCI.MAGHRIB),
      catatan: 'Sejak masuk waktu Ashar sampai matahari terbenam (masuk waktu Maghrib).',
    },
  ];

  return kandidat.filter((r) => r.dari != null && r.sampai != null);
}

/**
 * Apakah waktu `tanggal` berada di dalam rentang terlarang ini?
 * Rentang bersifat setengah-terbuka [dari, sampai): tepat pada jam
 * `sampai` rentang sudah berakhir (mis. tepat Maghrib = sudah masuk
 * waktu Maghrib).
 *
 * @param {{dari:string, sampai:string}|null|undefined} rentang satu item hasil hitungRentangTerlarang
 * @param {Date} [tanggal] waktu yang diuji (bawaan: sekarang)
 * @returns {boolean}
 */
export function dalamRentangTerlarang(rentang, tanggal = new Date()) {
  if (!rentang || !(tanggal instanceof Date) || Number.isNaN(tanggal.getTime())) return false;
  const dari = menitDariJam(rentang.dari);
  const sampai = menitDariJam(rentang.sampai);
  if (dari == null || sampai == null) return false;
  const kini = tanggal.getHours() * 60 + tanggal.getMinutes();
  return kini >= dari && kini < sampai;
}

/**
 * Rentang terlarang yang SEDANG BERLANGSUNG pada `tanggal`, atau
 * null bila tidak ada (untuk penanda visual "sedang berlangsung").
 *
 * @param {Array} rentang daftar hasil hitungRentangTerlarang
 * @param {Date} [tanggal] waktu yang diuji (bawaan: sekarang)
 * @returns {object|null}
 */
export function rentangTerlarangAktif(rentang, tanggal = new Date()) {
  if (!Array.isArray(rentang)) return null;
  return rentang.find((r) => dalamRentangTerlarang(r, tanggal)) ?? null;
}

/**
 * Waktu-waktu mustajab untuk berdoa — daftar tetap edukatif.
 * Sumber disebut singkat hanya yang masyhur, tanpa nomor hadits.
 */
export const DAFTAR_WAKTU_MUSTAJAB = [
  {
    kunci: 'adzan-iqamah',
    judul: 'Antara adzan dan iqamah',
    sumber: 'Doa di antara adzan dan iqamah tidak tertolak (HR. Abu Dawud dan Tirmidzi).',
  },
  {
    kunci: 'sepertiga-malam',
    judul: 'Sepertiga malam terakhir',
    sumber: 'Allah turun ke langit dunia pada sepertiga malam terakhir dan mengabulkan doa hamba-Nya (HR. Bukhari dan Muslim).',
  },
  {
    kunci: 'sore-jumat',
    judul: 'Sore hari Jumat',
    sumber: 'Pada hari Jumat terdapat satu waktu mustajab, diisyaratkan pada waktu setelah Ashar hingga terbenam matahari (HR. Bukhari dan Muslim).',
  },
  {
    kunci: 'saat-sujud',
    judul: 'Saat sujud dalam sholat',
    sumber: 'Keadaan terdekat seorang hamba dengan Rabb-nya adalah ketika sujud, maka perbanyaklah doa (HR. Muslim).',
  },
  {
    kunci: 'saat-hujan',
    judul: 'Saat hujan turun',
    sumber: 'Dua doa yang tidak tertolak: doa ketika adzan berkumandang dan doa ketika hujan turun (HR. Abu Dawud).',
  },
];
