// Indeks pencarian global Noor (domain) — SATU indeks lokal untuk seluruh
// ekosistem aplikasi: fitur/rute, doa, hadits, kisah, peristiwa, Asmaul Husna,
// nama bayi, topik ayat, dan iqro. Murni data statis (src/data/sources) →
// pencarian instan & offline; entri surah ditambahkan terpisah dari chapters
// API (entriSurahDariChapters) karena daftarnya dinamis.
import { HISNUL_MUSLIM } from '../../data/sources/hisnulMuslimData.js';
import { DOA_HARIAN } from '../../data/sources/doaData.js';
import { HADITS_ARBAIN } from '../../data/sources/haditsArbainData.js';
import { RIYADHUS_BAB } from '../../data/sources/riyadhusData.js';
import { KISAH_NABI } from '../../data/sources/kisahNabiData.js';
import { PERISTIWA_ISLAM } from '../../data/sources/peristiwaData.js';
import { ASMAUL_HUSNA } from '../../data/sources/asmaulHusnaData.js';
import { NAMA_BAYI } from '../../data/sources/namaBayiData.js';
import { INDEKS_TEMATIK } from '../../data/sources/indeksTematikData.js';
import { IQRO_JILID } from '../../data/sources/iqroData.js';

/** Urutan tampil kelompok hasil di halaman Cari. */
export const URUTAN_KATEGORI = [
  'Surah',
  'Fitur',
  'Topik Ayat',
  'Doa',
  'Hadits',
  'Kisah',
  'Peristiwa',
  'Asmaul Husna',
  'Nama Bayi',
  'Iqro',
];

/** Batas entri yang DITAMPILKAN per kategori (total aslinya tetap dilaporkan). */
const BATAS_TAMPIL = { Surah: 8 };
const BATAS_LAIN = 5;

/**
 * Normalisasi teks untuk pencocokan: huruf kecil, harakat Arab dasar dibuang,
 * tanda baca → spasi (apostrof dipertahankan), varian apostrof disamakan,
 * spasi dirapikan. Dipakai konsisten untuk query DAN semua field entri.
 */
export function normalisasi(teks) {
  return String(teks ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '') // harakat Arab + diakritik Latin (ā→a, ṣ→s, …)
    .replace(/ـ/g, '') // tatweel
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[^\p{L}\p{N}'\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Daftar kurasi rute fitur aplikasi (selaras src/app/router.jsx) + sinonim
 * bahasa Indonesia yang umum dipakai pengguna. Field `kata` adalah kunci
 * ditemukannya fitur lewat istilah sehari-hari, bukan hanya judul resminya.
 */
const DAFTAR_FITUR = [
  { tujuan: '/quran', judul: "Al-Qur'an — 114 Surah", sub: 'Daftar semua surah', kata: "quran alquran daftar surah mushaf kitab semua surah" },
  { tujuan: '/jadwal', judul: 'Jadwal Sholat', sub: 'Waktu sholat & hitung mundur adzan', kata: 'jadwal sholat shalat waktu adzan imsak subuh dzuhur zuhur ashar maghrib isya' },
  { tujuan: '/kiblat', judul: 'Arah Kiblat', sub: 'Kompas kiblat & sensor arah', kata: "arah kiblat qiblat kompas ka'bah kaabah makkah" },
  { tujuan: '/zakat', judul: 'Kalkulator Zakat', sub: 'Mal, profesi & fitrah', kata: 'zakat kalkulator hitung mal profesi fitrah emas perak beras penghasilan' },
  { tujuan: '/waris', judul: 'Kalkulator Waris', sub: 'Hitung faraid dasar + penjelasan', kata: 'faraid faraidh warisan pembagian harta kalkulator waris ahli waris warisan' },
  { tujuan: '/fidyah', judul: 'Kalkulator Fidyah', sub: 'Fidyah puasa per hari', kata: 'fidyah kalkulator bayar utang puasa fidya tebusan' },
  { tujuan: '/kafarat', judul: 'Kafarat', sub: 'Sumpah, zhihar & lainnya', kata: 'kafarat kaffarat sumpah zhihar tebusan pelanggaran sumpah' },
  { tujuan: '/haji-umrah', judul: 'Haji & Umrah', sub: 'Manasik per tahap + checklist', kata: "haji umrah umroh manasik ihram thawaf sai wukuf checklist ka'bah makkah ibadah haji" },
  { tujuan: '/kalender', judul: 'Kalender Hijriah', sub: 'Tanggal Hijriah & hari besar Islam', kata: 'kalender hijriah tanggal hari besar islam puasa sunnah bulan' },
  { tujuan: '/konverter', judul: 'Konverter Hijriah', sub: 'Hijriah ↔ Masehi + usia Hijriah', kata: 'konverter konversi hijriah masehi tanggal usia hijriah ubah tanggal' },
  { tujuan: '/statistik', judul: 'Statistik Ibadah', sub: 'Gabungan tracker 7 & 30 hari', kata: 'statistik ibadah gabungan tracker ringkasan grafik laporan' },
  { tujuan: '/data-progres', judul: 'Data Progres', sub: 'Ekspor & impor cadangan data', kata: 'data progres ekspor eksport impor import backup cadangan simpan pulihkan' },
  { tujuan: '/khatam', judul: 'Khatam Tracker', sub: 'Checklist 30 juz & target harian', kata: 'khatam tracker 30 juz target baca quran tamat' },
  { tujuan: '/sholat-tracker', judul: 'Sholat Tracker', sub: 'Checklist lima waktu & streak', kata: 'tracker sholat shalat checklist lima waktu streak catatan harian' },
  { tujuan: '/qadha-puasa', judul: 'Tracker Qadha Puasa', sub: 'Catat utang & pembayaran puasa', kata: 'qadha qada puasa utang puasa bayar tracker ganti puasa hutang' },
  { tujuan: '/mutabaah', judul: "Mutaba'ah Yaumiyah", sub: 'Checklist amal harian', kata: "mutabaah mutaba'ah yaumiyah checklist amal harian evaluasi diri muhasabah" },
  { tujuan: '/iqro', judul: 'Belajar Iqro', sub: 'Jilid 1–6 untuk anak & pemula', kata: 'iqro belajar huruf hijaiyah anak jilid membaca quran pemula' },
  { tujuan: '/yasin', judul: 'Surah Ya-Sin', sub: '83 ayat dengan audio & sorotan', kata: 'yasin ya sin surah 36 jantung quran yasinan' },
  { tujuan: '/surah/2?ayat=255', judul: 'Ayat Kursi', sub: 'QS Al-Baqarah ayat 255', kata: 'ayat kursi kursiy al baqarah 255 ayat teragung singgasana' },
  { tujuan: '/dzikir', judul: 'Dzikir Pagi & Petang', sub: "Al-Ma'tsurat ringkas + penghitung", kata: "dzikir zikir pagi petang almatsurat al ma'tsurat wirid harian" },
  { tujuan: '/dzikir-bada-sholat', judul: "Dzikir Ba'da Sholat", sub: 'Wirid sesudah sholat + penghitung', kata: "dzikir zikir ba'da bada sesudah setelah sholat shalat wirid" },
  { tujuan: '/doa', judul: 'Doa Harian', sub: 'Kumpulan doa sehari-hari', kata: 'doa harian kumpulan doa sehari hari aktivitas' },
  { tujuan: '/hisnul-muslim', judul: 'Hisnul Muslim', sub: 'Doa per aktivitas & situasi', kata: 'hisnul muslim benteng muslim kumpulan doa aktivitas situasi hisnulmuslim' },
  { tujuan: '/hadits', judul: 'Hadits Arbain', sub: '42 hadits Nawawi + perawi', kata: "hadits hadis arbain nawawi 42 hadits kumpulan" },
  { tujuan: '/riyadhus', judul: 'Riyadhus Shalihin', sub: 'Hadits bab inti + terjemahan', kata: 'riyadhus shalihin riyadhus sholihin riyadus hadits kitab bab' },
  { tujuan: '/kisah', judul: 'Kisah 25 Nabi', sub: 'Ringkasan teladan para nabi', kata: 'kisah nabi rasul cerita para nabi 25 sejarah teladan' },
  { tujuan: '/peristiwa', judul: 'Peristiwa Islam', sub: "Maulid, Isra Mi'raj, Nuzulul Qur'an", kata: "peristiwa islam maulid isra mi'raj miraj nuzulul quran tahun baru hijriah sejarah" },
  { tujuan: '/sirah', judul: 'Sirah Nabawiyah', sub: 'Garis waktu kehidupan Rasulullah', kata: 'sirah nabawiyah sejarah hidup nabi muhammad biografi rasulullah perjalanan' },
  { tujuan: '/asmaul-husna', judul: 'Asmaul Husna', sub: '99 nama Allah & mode hafalan', kata: 'asmaul husna asma ul husna 99 nama allah sifat allah' },
  { tujuan: '/nama-bayi', judul: 'Nama Bayi Islami', sub: 'Nama + arti, bisa dicari', kata: 'nama bayi islami anak arti nama pilihan nama lahir' },
  { tujuan: '/masjid-terdekat', judul: 'Masjid Terdekat', sub: 'Cari masjid di sekitar + rute', kata: 'masjid terdekat musholla mushola lokasi cari masjid sekitar rute peta' },
  { tujuan: '/panduan-tajwid', judul: 'Panduan Tajwid & Waqaf', sub: 'Warna tajwid, makhraj & waqaf', kata: 'tajwid waqaf waqof makhraj makharij hukum bacaan warna ibtida berhenti tanda' },
  { tujuan: '/kuis', judul: 'Kuis Islami', sub: 'Sambung ayat, tebak surah & fikih', kata: 'kuis islami sambung ayat tebak surah fikih soal latihan ujian tebak' },
  { tujuan: '/radio', judul: 'Radio Murottal', sub: 'Putar murottal terus-menerus + timer tidur', kata: 'radio murottal murotal streaming putar audio qari dengarkan ngaji sleep timer tidur' },
  { tujuan: '/tes-baca', judul: 'Tes Baca', sub: 'Latihan baca dengan mikrofon (eksperimental)', kata: 'tes baca uji bacaan mikrofon mic speech recognition latihan tartil cek bacaan eksperimental' },
  { tujuan: '/ruqyah', judul: "Ruqyah Syar'iyyah", sub: 'Panduan + playlist ayat ruqyah', kata: "ruqyah rukyah syar'iyyah syariyyah ayat gangguan jin sihir playlist audio pengobatan" },
  { tujuan: '/khutbah', judul: 'Teks Khutbah', sub: 'Jumat & hari raya untuk khatib', kata: 'khutbah khotbah jumat hari raya khatib teks naskah' },
  { tujuan: '/panduan-jenazah', judul: 'Panduan Jenazah', sub: 'Memandikan sampai menguburkan', kata: 'jenazah panduan memandikan mengkafani menyolatkan menguburkan mayit mayat' },
  { tujuan: '/sholat-jenazah', judul: 'Sholat Jenazah', sub: 'Empat takbir & bacaannya', kata: 'sholat jenazah takbir menyolatkan mayit mayat janazah' },
  { tujuan: '/aqiqah-kurban', judul: 'Aqiqah & Kurban', sub: 'Syarat, waktu & kalkulator hewan', kata: 'aqiqah aqiqoh kurban qurban hewan syarat kalkulator kambing sapi kelahiran' },
  { tujuan: '/muslimah', judul: 'Ruang Muslimah', sub: 'Kalkulator haid, doa & fikih wanita', kata: 'muslimah wanita perempuan ruang khusus akhwat' },
  { tujuan: '/muslimah/kalkulator', judul: 'Kalkulator Haid', sub: 'Vonis haid/istihadah (PIN pribadi)', kata: 'kalkulator haid nifas istihadah wanita muslimah siklus menstruasi datang bulan vonis' },
  { tujuan: '/muslimah/mandi-wajib', judul: 'Panduan Mandi Wajib', sub: 'Niat & tata cara pasca haid/nifas', kata: 'mandi wajib junub besar haid nifas niat tata cara muslimah wanita' },
  { tujuan: '/muslimah/doa', judul: 'Doa Khusus Wanita', sub: 'Doa hamil, persalinan & menyusui', kata: 'doa wanita muslimah hamil persalinan melahirkan menyusui khusus ibu' },
  { tujuan: '/muslimah/fikih', judul: 'Fikih Wanita', sub: 'Haid, nifas, istihadah & mitos', kata: 'fikih fiqih wanita haid nifas istihadah mitos muslimah hukum perempuan' },
  { tujuan: '/panduan-sholat', judul: 'Panduan Sholat', sub: 'Niat, gerakan & bacaan', kata: 'panduan sholat shalat tata cara niat gerakan bacaan belajar ruku sujud' },
  { tujuan: '/wudhu', judul: 'Wudhu & Tayammum', sub: 'Langkah bersuci & doa sesudah wudhu', kata: 'wudhu wudu tayammum tayamum bersuci tata cara doa sesudah wudhu membasuh air debu' },
  { tujuan: '/panduan-puasa', judul: 'Panduan Puasa', sub: 'Rukun, pembatal, niat & doa berbuka', kata: 'panduan puasa rukun pembatal batal niat doa berbuka sunnah hukum shaum' },
  { tujuan: '/panduan-imam', judul: 'Imam & Muadzin', sub: 'Syarat, tugas, teks adzan & iqamah', kata: 'imam muadzin muazin adzan azan iqamah iqomah syarat tugas panduan makmum' },
  { tujuan: '/sholat-id', judul: 'Sholat Id', sub: 'Idul Fitri & Adha + takbiran', kata: 'sholat id ied idul fitri idul adha takbiran hari raya lebaran tata cara' },
  { tujuan: '/sholat-musafir', judul: 'Sholat Musafir', sub: "Jama' & qashar + hitung jarak safar", kata: "musafir jama jamak qashar qasar safar perjalanan jarak sholat bepergian" },
  { tujuan: '/sholat-sakit', judul: 'Sholat Orang Sakit', sub: 'Duduk, berbaring, isyarat & kendaraan', kata: 'sholat sakit duduk berbaring isyarat kendaraan orang sakit uzur' },
  { tujuan: '/sholat-sunnah', judul: 'Sholat Sunnah', sub: 'Dhuha, tahajud, witir & lainnya', kata: 'sholat sunnah sunah dhuha tahajud tahajjud witir rawatib istikharah hajat taubat' },
  { tujuan: '/sujud', judul: 'Sujud Sahwi, Syukur & Tilawah', sub: 'Panduan + bacaan tiap sujud', kata: 'sujud sahwi syukur tilawah lupa rakaat rakat bacaan' },
  { tujuan: '/qunut', judul: 'Doa Qunut', sub: 'Qunut Subuh & witir', kata: 'qunut kunut subuh witir doa nazilah bacaan' },
  { tujuan: '/indeks-tematik', judul: 'Indeks Tematik', sub: 'Ayat per topik pilihan', kata: 'indeks tematik ayat topik tema sabar rezeki sembuh kumpulan ayat' },
  { tujuan: '/bookmark', judul: 'Bookmark Ayat', sub: 'Ayat tersimpan & catatan pribadi', kata: 'bookmark penanda ayat tersimpan simpan catatan favorit markah' },
  { tujuan: '/hafalan', judul: 'Mode Hafalan', sub: 'Tahfidz bertahap, uji & audio ulang', kata: 'hafalan tahfidz tahfiz menghafal hafal ayat uji murojaah murajaah setoran' },
  { tujuan: '/tasbih', judul: 'Tasbih Digital', sub: 'Counter dzikir + target & getar', kata: 'tasbih digital counter dzikir zikir hitung penghitung getar' },
  { tujuan: '/ramadhan', judul: 'Mode Ramadhan', sub: 'Hitung mundur, imsakiyah & tarawih', kata: 'ramadhan ramadan puasa hitung mundur imsakiyah imsak tarawih bulan puasa' },
  { tujuan: '/aksesibilitas', judul: 'Pengaturan Aksesibilitas', sub: 'Tema, kontras & ukuran huruf', kata: 'aksesibilitas pengaturan setting tema gelap terang kontras huruf disabilitas tampilan' },
];

/**
 * Bangun seluruh entri indeks lokal (semua kategori kecuali Surah).
 * Entri: { id, kategori, judul, sub, kata, tujuan }.
 */
export function bangunEntriLokal() {
  const entri = [];

  for (const f of DAFTAR_FITUR) {
    entri.push({
      id: `fitur-${f.tujuan}`,
      kategori: 'Fitur',
      judul: f.judul,
      sub: f.sub,
      kata: `${f.judul} ${f.kata}`,
      tujuan: f.tujuan,
    });
  }

  HISNUL_MUSLIM.forEach((kat, ki) => {
    kat.doa.forEach((d, di) => {
      entri.push({
        id: `doa-hisnul-${ki}-${di}`,
        kategori: 'Doa',
        judul: d.judul,
        sub: `Hisnul Muslim • ${kat.kategori}`,
        kata: `${d.judul} ${kat.kategori} ${d.latin ?? ''}`,
        tujuan: '/hisnul-muslim',
      });
    });
  });
  DOA_HARIAN.forEach((d, i) => {
    entri.push({
      id: `doa-harian-${i}`,
      kategori: 'Doa',
      judul: d.judul,
      sub: 'Doa Harian',
      kata: `${d.judul} ${d.latin ?? ''}`,
      tujuan: '/doa',
    });
  });

  HADITS_ARBAIN.forEach((h) => {
    entri.push({
      id: `hadits-arbain-${h.nomor}`,
      kategori: 'Hadits',
      judul: h.judul,
      sub: `Hadits Arbain ke-${h.nomor}${h.perawi ? ` • ${h.perawi}` : ''}`,
      kata: `${h.judul} hadits arbain ${h.nomor} ${h.perawi ?? ''}`,
      tujuan: '/hadits',
    });
  });
  RIYADHUS_BAB.forEach((b) => {
    entri.push({
      id: `hadits-riyadhus-${b.nomor}`,
      kategori: 'Hadits',
      judul: b.judul,
      sub: `Riyadhus Shalihin • Bab ${b.nomor} (${b.hadits?.length ?? 0} hadits)`,
      kata: `${b.judul} riyadhus shalihin bab ${b.nomor}`,
      tujuan: '/riyadhus',
    });
  });

  KISAH_NABI.forEach((k) => {
    entri.push({
      id: `kisah-${k.slug}`,
      kategori: 'Kisah',
      judul: k.nama,
      sub: 'Kisah 25 Nabi',
      kata: `${k.nama} ${k.ringkasan ?? ''}`,
      tujuan: `/kisah/${k.slug}`,
    });
  });

  PERISTIWA_ISLAM.forEach((p) => {
    entri.push({
      id: `peristiwa-${p.slug}`,
      kategori: 'Peristiwa',
      judul: p.nama,
      sub: p.tanggalHijriah ?? 'Peristiwa Islam',
      kata: `${p.nama} peristiwa islam sejarah`,
      tujuan: `/peristiwa#${p.slug}`,
    });
  });

  ASMAUL_HUSNA.forEach((a) => {
    entri.push({
      id: `asmaul-${a.nomor}`,
      kategori: 'Asmaul Husna',
      judul: a.latin,
      sub: a.arti,
      kata: `${a.latin} ${a.latin.replace(/[-\s]/g, '')} ${a.arti} ${a.arab ?? ''} asmaul husna ${a.nomor}`,
      tujuan: '/asmaul-husna',
    });
  });

  NAMA_BAYI.forEach((n, i) => {
    const gender = n.jenis === 'L' ? 'Laki-laki' : n.jenis === 'P' ? 'Perempuan' : '';
    entri.push({
      id: `nama-bayi-${i}`,
      kategori: 'Nama Bayi',
      judul: n.nama,
      sub: `${n.arti}${gender ? ` • ${gender}` : ''}`,
      kata: `${n.nama} ${n.arti} ${n.asal ?? ''} nama bayi ${gender}`,
      tujuan: '/nama-bayi',
    });
  });

  INDEKS_TEMATIK.forEach((t, i) => {
    entri.push({
      id: `topik-${i}`,
      kategori: 'Topik Ayat',
      judul: t.topik,
      sub: `${t.ayat?.length ?? 0} ayat pilihan`,
      kata: `${t.topik} ${t.deskripsi ?? ''} ayat topik tematik`,
      tujuan: '/indeks-tematik',
    });
  });

  IQRO_JILID.forEach((j) => {
    entri.push({
      id: `iqro-${j.jilid}`,
      kategori: 'Iqro',
      judul: `Iqro Jilid ${j.jilid} — ${j.judul}`,
      sub: j.ringkasan ?? 'Belajar Iqro',
      kata: `${j.judul} iqro jilid ${j.jilid} ${(j.topik ?? []).join(' ')}`,
      tujuan: `/iqro/${j.jilid}`,
    });
  });

  return entri;
}

/**
 * Petakan chapters API (entity Surah dari QuranRepositoryImpl.getChapters)
 * menjadi entri kategori 'Surah'.
 */
export function entriSurahDariChapters(chapters) {
  if (!Array.isArray(chapters)) return [];
  return chapters.map((c) => {
    const tempat =
      c.revelationPlace === 'makkah'
        ? 'Makkiyah'
        : c.revelationPlace === 'madinah'
          ? 'Madaniyah'
          : (c.revelationPlace ?? '');
    return {
      id: `surah-${c.id}`,
      kategori: 'Surah',
      judul: `${c.id}. ${c.nameLatin}`,
      sub: `${c.translationId} • ${c.versesCount} ayat${tempat ? ` • ${tempat}` : ''}`,
      kata: `${c.nameLatin} ${String(c.nameLatin ?? '').replace(/[-\s]/g, '')} ${c.translationId} ${c.id} surah ${tempat} ${c.nameArabic ?? ''}`,
      tujuan: `/surah/${c.id}`,
    };
  });
}

/**
 * Cari di indeks lokal: pencocokan token-AND — SEMUA token query harus
 * muncul di judul/kata/sub entri (setelah normalisasi). Skor per token:
 * judul diawali token +100, judul memuat +50, kata memuat +30, sub +10.
 * Hasil dikelompokkan per kategori (urutan URUTAN_KATEGORI), diurutkan skor
 * menurun, dan ditampilkan terbatas per kategori (Surah 8, lainnya 5) —
 * `total` melaporkan jumlah asli sebelum pemotongan.
 *
 * @returns {{ kelompok: Array<{kategori, total, entri}>, totalSemua: number }}
 */
export function cariLokal(semuaEntri, query) {
  const token = normalisasi(query).split(' ').filter(Boolean);
  if (!token.length || !Array.isArray(semuaEntri)) return { kelompok: [], totalSemua: 0 };

  const cocok = [];
  for (const e of semuaEntri) {
    const judulN = normalisasi(e.judul);
    const kataN = normalisasi(e.kata);
    const subN = normalisasi(e.sub);
    let skor = 0;
    let lolos = true;
    for (const t of token) {
      let s = 0;
      if (judulN.startsWith(t)) s += 100;
      else if (judulN.includes(t)) s += 50;
      if (kataN.includes(t)) s += 30;
      if (subN.includes(t)) s += 10;
      if (s === 0) {
        lolos = false;
        break;
      }
      skor += s;
    }
    if (lolos) cocok.push({ ...e, skor });
  }

  const perKategori = new Map();
  for (const e of cocok) {
    if (!perKategori.has(e.kategori)) perKategori.set(e.kategori, []);
    perKategori.get(e.kategori).push(e);
  }

  const kelompok = [];
  let totalSemua = 0;
  for (const kategori of URUTAN_KATEGORI) {
    const daftar = perKategori.get(kategori);
    if (!daftar?.length) continue;
    daftar.sort(
      (a, b) => b.skor - a.skor || String(a.judul).localeCompare(String(b.judul), 'id'),
    );
    totalSemua += daftar.length;
    kelompok.push({
      kategori,
      total: daftar.length,
      entri: daftar.slice(0, BATAS_TAMPIL[kategori] ?? BATAS_LAIN),
    });
  }
  return { kelompok, totalSemua };
}
