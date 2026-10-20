/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaQuran, FaBookOpen, FaClock, FaCoins, FaBookReader, FaGraduationCap,
  FaHandPointer, FaCloudSun, FaPrayingHands, FaClipboardCheck, FaCompass,
  FaCalendarAlt, FaListUl, FaBook, FaHeart, FaMoon,
} from 'react-icons/fa';
import { Page, SectionTitle, MenuCard } from '../components/common.jsx';
import OrnamentDivider from '../components/OrnamentDivider.jsx';
import { GirihPattern, OrnamentBand, CornerOrnament, MosqueSilhouette } from '../components/ornaments/index.js';

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background: linear-gradient(160deg, ${({ theme }) => theme.colors.primaryDeep}, ${({ theme }) => theme.colors.primary} 55%, ${({ theme }) => theme.colors.primaryMid});
  color: #fff;
  text-align: center;
  margin: 2px -2px 6px;
  box-shadow: ${({ theme }) => theme.shadows.lift};
`;

const HeroIsi = styled.div`
  position: relative;
  padding: 30px 20px 8px;
  .arab-hero {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 33px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.goldLight};
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  }
  h1 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 30px;
    font-weight: 700;
    margin-top: 8px;
    letter-spacing: 0.4px;
  }
  p {
    font-size: 13.5px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 7px;
    padding: 0 6px;
  }
`;

const GridMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 11px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
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
        <GirihPattern opacity={0.14} />
        <CornerOrnament corner="tl" style={{ top: 6, left: 6 }} />
        <CornerOrnament corner="tr" style={{ top: 6, right: 6 }} />
        <HeroIsi>
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
