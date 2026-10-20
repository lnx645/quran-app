/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaQuran, FaBookOpen, FaClock, FaCoins, FaBookReader, FaGraduationCap,
  FaHandPointer, FaCloudSun, FaPrayingHands, FaClipboardCheck, FaCompass,
  FaCalendarAlt, FaListUl, FaBook, FaHeart, FaMoon, FaVenus,
  FaSearch, FaBookmark, FaBrain, FaPalette, FaTint, FaTasks,
  FaBalanceScale, FaKaaba, FaBaby, FaGift, FaHandHoldingHeart, FaMosque,
} from 'react-icons/fa';
import { Page, SectionTitle, MenuCard } from '../components/common.jsx';
import LanjutkanMembaca from '../components/LanjutkanMembaca.jsx';
import HaditsHariIni from '../components/HaditsHariIni.jsx';
import AyatHariIni from '../components/AyatHariIni.jsx';
import Logo from '../components/Logo.jsx';
import OrnamentDivider from '../components/OrnamentDivider.jsx';
import { GirihPattern, OrnamentBand, CornerOrnament, MosqueSilhouette, MoonStar } from '../components/ornaments/index.js';
import { mountUp, reduceMotion, stagger } from '../components/motion.js';

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background: ${({ theme }) => theme.gradients.heroGlow}, ${({ theme }) => theme.gradients.hero};
  color: #fff;
  text-align: center;
  margin: 2px -2px 6px;
  box-shadow: ${({ theme }) => theme.shadows.lift};
  ${mountUp}
  ${reduceMotion}
`;

const HeroIsi = styled.div`
  position: relative;
  padding: 30px 20px 8px;
  .arab-hero {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: ${({ theme }) => theme.type.arabDisplay.size - 13}px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.goldLight};
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  }
  h1 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.type.display.size}px;
    font-weight: ${({ theme }) => theme.type.display.weight};
    line-height: ${({ theme }) => theme.type.display.lineHeight};
    margin-top: 8px;
    letter-spacing: 0.4px;
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  }
  p {
    font-size: ${({ theme }) => theme.type.bodySm.size}px;
    line-height: ${({ theme }) => theme.type.bodySm.lineHeight};
    color: rgba(255, 255, 255, 0.9);
    margin-top: 7px;
    padding: 0 6px;
  }
`;

const GridMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.gridGap}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  ${stagger(6, 40)}
  ${reduceMotion}
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.md}px;
  }
`;

const SEKSI = [
  {
    nama: "Al-Qur'an",
    ikon: <FaQuran />,
    items: [
      { to: '/quran', icon: <FaQuran />, judul: 'Al-Qur\u2019an — 114 Surah', desc: 'Semua surah lengkap dengan pencarian cepat' },
      { to: '/surah/36', icon: <FaHeart />, judul: 'Surah Ya-Sin', desc: '83 ayat dengan audio & highlight' },
      { to: '/surah/18', icon: <FaBookOpen />, judul: 'Surah Al-Kahf', desc: '110 ayat, dianjurkan hari Jumat' },
      { to: '/surah/67', icon: <FaBookOpen />, judul: 'Surah Al-Mulk', desc: '30 ayat dibaca sebelum tidur' },
      { to: '/surah/55', icon: <FaBookOpen />, judul: 'Surah Ar-Rahman', desc: '78 ayat tentang nikmat Allah' },
      { to: '/cari', icon: <FaSearch />, judul: 'Cari Ayat', desc: 'Temukan ayat dari kata kunci' },
      { to: '/hafalan', icon: <FaBrain />, judul: 'Mode Hafalan', desc: 'Tahfidz bertahap, uji & audio ulang' },
      { to: '/bookmark', icon: <FaBookmark />, judul: 'Bookmark Ayat', desc: 'Ayat tersimpan & catatan pribadi' },
      { to: '/panduan-tajwid', icon: <FaPalette />, judul: 'Panduan Tajwid', desc: 'Warna tajwid, makhraj & hukum bacaan' },
      { to: '/indeks-tematik', icon: <FaListUl />, judul: 'Indeks Tematik', desc: 'Ayat per topik: sabar, rezeki, sembuh' },
      { to: '/kuis', icon: <FaBrain />, judul: 'Kuis Islami', desc: 'Sambung ayat, tebak surah & fikih' },
    ],
  },
  {
    nama: 'Ibadah Harian',
    ikon: <FaPrayingHands />,
    items: [
      { to: '/jadwal', icon: <FaClock />, judul: 'Jadwal Sholat', desc: 'Waktu sholat & countdown adzan harian' },
      { to: '/tasbih', icon: <FaHandPointer />, judul: 'Tasbih Digital', desc: 'Counter dzikir dengan target & getar' },
      { to: '/dzikir', icon: <FaCloudSun />, judul: 'Dzikir Pagi & Petang', desc: 'Al-Ma\u2019tsurat ringkas dengan penghitung dzikir' },
      { to: '/doa', icon: <FaPrayingHands />, judul: 'Doa Harian', desc: 'Sepuluh doa: Arab, latin & arti' },
      { to: '/sholat-tracker', icon: <FaClipboardCheck />, judul: 'Sholat Tracker', desc: 'Checklist lima waktu & streak harian' },
      { to: '/wudhu', icon: <FaTint />, judul: 'Wudhu & Tayammum', desc: 'Langkah bersuci & doa sesudah wudhu' },
      { to: '/panduan-sholat', icon: <FaPrayingHands />, judul: 'Panduan Sholat', desc: 'Niat, gerakan & bacaan tiap gerakan' },
      { to: '/sholat-sunnah', icon: <FaMoon />, judul: 'Sholat Sunnah', desc: 'Dhuha, tahajud, witir & lainnya' },
      { to: '/dzikir-bada-sholat', icon: <FaCloudSun />, judul: "Dzikir Ba'da Sholat", desc: 'Wirid sesudah sholat dengan penghitung' },
      { to: '/sholat-jenazah', icon: <FaBook />, judul: 'Sholat Jenazah', desc: 'Empat takbir & bacaan tiap takbir' },
      { to: '/sholat-id', icon: <FaMoon />, judul: 'Sholat Id', desc: 'Idul Fitri & Adha plus teks takbiran' },
      { to: '/sholat-musafir', icon: <FaBookOpen />, judul: 'Sholat Musafir', desc: "Jama' & qashar plus hitung jarak safar" },
      { to: '/sholat-sakit', icon: <FaBook />, judul: 'Sholat Orang Sakit', desc: 'Duduk, berbaring, isyarat & kendaraan' },
      { to: '/qunut', icon: <FaPrayingHands />, judul: 'Doa Qunut', desc: 'Qunut Subuh & witir: Arab, latin, arti' },
      { to: '/panduan-imam', icon: <FaMosque />, judul: 'Imam & Muadzin', desc: 'Syarat, tugas, teks adzan & iqamah' },
      { to: '/sujud', icon: <FaBookOpen />, judul: 'Sujud', desc: 'Sahwi, syukur & tilawah plus bacaannya' },
      { to: '/panduan-puasa', icon: <FaBookOpen />, judul: 'Panduan Puasa', desc: 'Rukun, pembatal, niat & doa berbuka' },
      { to: '/qadha-puasa', icon: <FaClipboardCheck />, judul: 'Tracker Qadha', desc: 'Catat utang & pembayaran puasa' },
      { to: '/ramadhan', icon: <FaMoon />, judul: 'Mode Ramadhan', desc: 'Hitung mundur, imsakiyah & tarawih' },
      { to: '/hisnul-muslim', icon: <FaPrayingHands />, judul: 'Hisnul Muslim', desc: '37 doa per aktivitas & situasi' },
      { to: '/itikaf', icon: <FaMoon />, judul: "I'tikaf", desc: 'Panduan 10 malam terakhir Ramadhan' },
      { to: '/ruqyah', icon: <FaBookOpen />, judul: 'Ruqyah', desc: "Syar'iyyah + playlist ayat ruqyah" },
      { to: '/mutabaah', icon: <FaTasks />, judul: "Mutaba'ah Yaumiyah", desc: 'Checklist amal harian & ringkasan 7 hari' },
    ],
  },
  {
    nama: 'Panduan & Hitungan',
    ikon: <FaBalanceScale />,
    items: [
      { to: '/waris', icon: <FaBalanceScale />, judul: 'Kalkulator Waris', desc: 'Hitung faraidh dasar + penjelasan' },
      { to: '/fidyah', icon: <FaHandHoldingHeart />, judul: 'Kalkulator Fidyah', desc: 'Fidyah puasa per hari & harga pokok' },
      { to: '/kafarat', icon: <FaBookOpen />, judul: 'Kafarat', desc: 'Sumpah, zhihar & lainnya — ringkas' },
      { to: '/haji-umrah', icon: <FaKaaba />, judul: 'Haji & Umrah', desc: 'Manasik per tahap + checklist barang' },
      { to: '/panduan-jenazah', icon: <FaBook />, judul: 'Panduan Jenazah', desc: 'Memandikan sampai menguburkan' },
      { to: '/aqiqah-kurban', icon: <FaGift />, judul: 'Aqiqah & Kurban', desc: 'Syarat, waktu & kalkulator hewan' },
      { to: '/nama-bayi', icon: <FaBaby />, judul: 'Nama Bayi Islami', desc: '110 nama + arti, bisa dicari' },
      { to: '/masjid-terdekat', icon: <FaMosque />, judul: 'Masjid Terdekat', desc: 'Cari masjid di sekitarmu + rute' },
      { to: '/panduan-nikah', icon: <FaHeart />, judul: 'Panduan Nikah', desc: 'Rukun, mahar, akad & doa pengantin' },
      { to: '/fikih-keluarga', icon: <FaBook />, judul: 'Fikih Keluarga', desc: 'Menyusui, khitan & mendidik anak' },
      { to: '/muamalah', icon: <FaBalanceScale />, judul: 'Fikih Muamalah', desc: 'Riba, utang, jual beli & gadai' },
      { to: '/wakaf-wasiat', icon: <FaHandHoldingHeart />, judul: 'Wakaf & Wasiat', desc: 'Ketentuan + contoh redaksi wasiat' },
      { to: '/halal', icon: <FaBookOpen />, judul: 'Halal & Adab Makan', desc: 'Haram, sembelihan & adab makan' },
      { to: '/khutbah', icon: <FaBook />, judul: 'Teks Khutbah', desc: 'Jumat & hari raya untuk khatib' },
    ],
  },
  {
    nama: 'Belajar & Kisah',
    ikon: <FaGraduationCap />,
    items: [
      { to: '/iqro', icon: <FaGraduationCap />, judul: 'Belajar Iqro', desc: 'Jilid 1\u20136: huruf, harakat & tajwid' },
      { to: '/kisah', icon: <FaBook />, judul: 'Kisah 25 Nabi', desc: 'Ringkasan teladan para nabi & rasul' },
      { to: '/asmaul-husna', icon: <FaListUl />, judul: 'Asmaul Husna', desc: '99 nama Allah & mode hafalan' },
      { to: '/hadits', icon: <FaBook />, judul: 'Hadits Arbain', desc: '42 hadits: Arab, arti & perawi' },
      { to: '/sirah', icon: <FaBookOpen />, judul: 'Sirah Nabawiyah', desc: 'Garis waktu kehidupan Rasulullah' },
      { to: '/riyadhus', icon: <FaBook />, judul: 'Riyadhus Shalihin', desc: '141 hadits bab inti + terjemahan' },
      { to: '/peristiwa', icon: <FaCalendarAlt />, judul: 'Peristiwa Islam', desc: 'Maulid, Isra Mi\'raj, Nuzulul Qur\'an' },
    ],
  },
  {
    nama: 'Muslimah',
    ikon: <FaVenus />,
    items: [
      { to: '/muslimah', icon: <FaVenus />, judul: 'Ruang Muslimah', desc: 'Kalkulator haid, doa & fikih wanita' },
      { to: '/muslimah/kalkulator', icon: <FaClipboardCheck />, judul: 'Kalkulator Haid', desc: 'Vonis haid/istihadah terkunci PIN pribadi' },
      { to: '/muslimah/mandi-wajib', icon: <FaHandPointer />, judul: 'Panduan Mandi Wajib', desc: 'Niat & tata cara pasca haid/nifas' },
      { to: '/muslimah/doa', icon: <FaPrayingHands />, judul: 'Doa Khusus Wanita', desc: 'Doa hamil, persalinan & menyusui' },
      { to: '/muslimah/fikih', icon: <FaBook />, judul: 'Fikih Wanita', desc: 'Haid, nifas, istihadah & mitos' },
    ],
  },
  {
    nama: 'Utilitas',
    ikon: <FaCoins />,
    items: [
      { to: '/zakat', icon: <FaCoins />, judul: 'Kalkulator Zakat', desc: 'Mal, profesi & fitrah, otomatis terhitung' },
      { to: '/khatam', icon: <FaBookReader />, judul: 'Khatam Tracker', desc: 'Checklist 30 juz & target harian' },
      { to: '/kiblat', icon: <FaCompass />, judul: 'Arah Kiblat', desc: 'Kompas kiblat & sensor arah perangkat' },
      { to: '/kalender', icon: <FaCalendarAlt />, judul: 'Kalender Hijriah', desc: 'Tanggal hijriah & hari besar Islam' },
      { to: '/konverter', icon: <FaCalendarAlt />, judul: 'Konverter Hijriah', desc: 'Hijriah-Masehi + hitung usia Hijriah' },
      { to: '/statistik', icon: <FaClipboardCheck />, judul: 'Statistik Ibadah', desc: 'Gabungan tracker 7 & 30 hari' },
      { to: '/data-progres', icon: <FaTasks />, judul: 'Data Progres', desc: 'Ekspor & impor cadangan data' },
    ],
  },
];

export default function HomePage() {
  return (
    <Page>
      <Hero>
        <GirihPattern opacity={0.15} />
        <CornerOrnament corner="tl" style={{ top: 6, left: 6 }} />
        <MoonStar size={66} opacity={0.95} style={{ top: 10, right: 12 }} />
        <HeroIsi>
          <div css={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <Logo size={76} />
          </div>
          <div className="arab-hero" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <h1>Ahlan wa Sahlan</h1>
          <p>
            <FaMoon style={{ display: 'inline', verticalAlign: '-2px' }} /> Noor menemani ibadah
            harian dan perjalanan belajar Al-Qur&apos;an Anda.
          </p>
        </HeroIsi>
        <div css={{ position: 'relative', marginTop: 6 }}>
          <MosqueSilhouette opacity={0.16} height={86} />
          <div css={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
            <OrnamentBand height={16} opacity={0.75} />
          </div>
        </div>
      </Hero>
      <OrnamentDivider />
      <LanjutkanMembaca />
      <HaditsHariIni />
      <AyatHariIni />
      {SEKSI.map((seksi) => (
        <div key={seksi.nama}>
          <SectionTitle>
            {seksi.ikon} {seksi.nama}
          </SectionTitle>
          <GridMenu>
            {seksi.items.map((item) => (
              <MenuCard key={item.to} {...item} />
            ))}
          </GridMenu>
        </div>
      ))}
    </Page>
  );
}
