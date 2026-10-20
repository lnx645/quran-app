/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaQuran, FaBookOpen, FaClock, FaCoins, FaBookReader, FaGraduationCap,
  FaHandPointer, FaCloudSun, FaPrayingHands, FaClipboardCheck, FaCompass,
  FaCalendarAlt, FaListUl, FaBook, FaHeart, FaMoon,
} from 'react-icons/fa';
import { Page, SectionTitle, MenuCard } from '../components/common.jsx';
import OrnamentDivider from '../components/OrnamentDivider.jsx';

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 26px 20px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: #fff;
  text-align: center;
  margin-bottom: 8px;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${({ theme }) => theme.pattern};
    background-size: 56px 56px;
    opacity: 0.15;
  }
  .arab-hero {
    position: relative;
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 34px;
    line-height: 1.7;
  }
  h1 {
    position: relative;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 26px;
    margin-top: 6px;
  }
  p {
    position: relative;
    font-size: 13.5px;
    color: ${({ theme }) => theme.colors.goldLight};
    margin-top: 6px;
  }
`;

const GridMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SEKSI = [
  {
    nama: "Al-Qur'an",
    ikon: <FaQuran />,
    items: [
      { to: '/surah/36', icon: <FaHeart />, judul: 'Surah Ya-Sin', desc: 'Jantung Al-Qur\u2019an — 83 ayat, audio + highlight perkata' },
      { to: '/surah/18', icon: <FaBookOpen />, judul: 'Surah Al-Kahf', desc: 'Dianjurkan dibaca hari Jumat — 110 ayat' },
      { to: '/surah/67', icon: <FaBookOpen />, judul: 'Surah Al-Mulk', desc: 'Dibaca sebelum tidur — 30 ayat' },
      { to: '/surah/55', icon: <FaBookOpen />, judul: 'Surah Ar-Rahman', desc: 'Arus nikmat Allah — 78 ayat' },
    ],
  },
  {
    nama: 'Ibadah Harian',
    ikon: <FaPrayingHands />,
    items: [
      { to: '/jadwal', icon: <FaClock />, judul: 'Jadwal Sholat', desc: 'Waktu sholat, hijriah, countdown adzan (API Aladhan)' },
      { to: '/tasbih', icon: <FaHandPointer />, judul: 'Tasbih Digital', desc: 'Counter dzikir dengan target & getar' },
      { to: '/dzikir', icon: <FaCloudSun />, judul: 'Dzikir Pagi & Petang', desc: 'Al-Ma\u2019tsurat ringkas dengan penghitung per dzikir' },
      { to: '/doa', icon: <FaPrayingHands />, judul: 'Doa Harian', desc: '10 doa keseharian: Arab, latin, arti' },
      { to: '/sholat-tracker', icon: <FaClipboardCheck />, judul: 'Sholat Tracker', desc: 'Checklist 5 waktu + rangkaian hari (streak)' },
    ],
  },
  {
    nama: 'Belajar & Kisah',
    ikon: <FaGraduationCap />,
    items: [
      { to: '/iqro', icon: <FaGraduationCap />, judul: 'Belajar Iqro', desc: 'Jilid 1–6: huruf hijaiyah, harakat, tajwid dasar' },
      { to: '/kisah', icon: <FaBook />, judul: 'Kisah 25 Nabi', desc: 'Ringkasan kisah teladan para nabi & rasul' },
      { to: '/asmaul-husna', icon: <FaListUl />, judul: 'Asmaul Husna', desc: '99 nama Allah + mode hafalan' },
    ],
  },
  {
    nama: 'Utilitas',
    ikon: <FaCoins />,
    items: [
      { to: '/zakat', icon: <FaCoins />, judul: 'Kalkulator Zakat', desc: 'Zakat mal, profesi & fitrah (nisab 85 gr emas)' },
      { to: '/khatam', icon: <FaBookReader />, judul: 'Khatam Tracker', desc: 'Checklist 30 juz, target tanggal & halaman/hari' },
      { to: '/kiblat', icon: <FaCompass />, judul: 'Arah Kiblat', desc: 'Kompas kiblat dari Sumedang + sensor perangkat' },
      { to: '/kalender', icon: <FaCalendarAlt />, judul: 'Kalender Hijriah', desc: 'Tanggal hijriah & hari besar Islam' },
    ],
  },
];

export default function HomePage() {
  return (
    <Page>
      <Hero>
        <div className="arab-hero" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <h1>Ahlan wa Sahlan</h1>
        <p>
          <FaMoon style={{ display: 'inline', verticalAlign: '-2px' }} /> Noor menemani ibadah
          harian dan perjalanan belajar Al-Qur&apos;an Anda.
        </p>
      </Hero>
      <OrnamentDivider />
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
