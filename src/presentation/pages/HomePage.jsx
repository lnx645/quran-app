/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaQuran, FaBookOpen, FaClock, FaCoins, FaBookReader, FaGraduationCap,
  FaHandPointer, FaCloudSun, FaPrayingHands, FaClipboardCheck, FaCompass,
  FaCalendarAlt, FaListUl, FaBook, FaHeart, FaMoon, FaVenus,
  FaSearch, FaBookmark, FaBrain, FaPalette, FaTint, FaTasks, FaBroadcastTower, FaMicrophone, FaChild,
  FaBalanceScale, FaKaaba, FaBaby, FaGift, FaHandHoldingHeart, FaMonument, FaPenFancy, FaMosque,
  FaDownload, FaTimes, FaFire, FaChevronRight,
} from 'react-icons/fa';
import { useInstallPrompt } from '../hooks/useInstallPrompt.js';
import { useStreak } from '../hooks/useStreak.js';
import { kunciHari, hariAktif } from '../../domain/usecases/streakIbadah.js';
import { useBahasa } from '../../app/bahasa.js';
import { Page, SectionTitle, MenuCard, Card } from '../components/common.jsx';
import LanjutkanMembaca from '../components/LanjutkanMembaca.jsx';
import KartuHarian from '../components/KartuHarian.jsx';
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

// Bar pencarian global: pil selebar layar tepat di bawah hero — ketuk untuk
// membuka /cari. Sengaja berbentuk kolom cari (ikon + placeholder) agar
// langsung dikenali sebagai pintu pencarian apa pun.
const BarCari = styled.button`
  width: 100%;
  min-height: 52px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 18px;
  margin: 8px 0 2px;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  svg {
    color: ${({ theme }) => theme.colors.goldDeep};
    font-size: 17px;
    flex-shrink: 0;
  }
  &:active {
    transform: scale(0.99);
  }
  ${reduceMotion}
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
    kunciNama: 'grup.quran',
    ikon: <FaQuran />,
    items: [
      { to: '/quran', icon: <FaQuran />, kunci: 'beranda.quran', desc: 'Semua surah lengkap dengan pencarian cepat' },
      { to: '/surah/36', icon: <FaHeart />, kunci: 'menu.yasin', desc: '83 ayat dengan audio & highlight' },
      { to: '/surah/18', icon: <FaBookOpen />, kunci: 'menu.kahf', desc: '110 ayat, dianjurkan hari Jumat' },
      { to: '/surah/67', icon: <FaBookOpen />, kunci: 'menu.mulk', desc: '30 ayat dibaca sebelum tidur' },
      { to: '/surah/55', icon: <FaBookOpen />, kunci: 'menu.rahman', desc: '78 ayat tentang nikmat Allah' },
      { to: '/cari', icon: <FaSearch />, kunci: 'beranda.cariAyat', desc: 'Temukan ayat dari kata kunci' },
      { to: '/hafalan', icon: <FaBrain />, kunci: 'menu.hafalan', desc: 'Tahfidz bertahap, uji & audio ulang' },
      { to: '/bookmark', icon: <FaBookmark />, kunci: 'menu.bookmark', desc: 'Ayat tersimpan & catatan pribadi' },
      { to: '/panduan-tajwid', icon: <FaPalette />, kunci: 'menu.tajwid', desc: 'Warna tajwid, makhraj & hukum bacaan' },
      { to: '/indeks-tematik', icon: <FaListUl />, kunci: 'menu.indeks', desc: 'Ayat per topik: sabar, rezeki, sembuh' },
      { to: '/kuis', icon: <FaBrain />, kunci: 'menu.kuis', desc: 'Sambung ayat, tebak surah & fikih' },
      { to: '/radio', icon: <FaBroadcastTower />, kunci: 'menu.radio', desc: 'Putar murottal terus-menerus + timer tidur' },
      { to: '/tes-baca', icon: <FaMicrophone />, kunci: 'menu.tesBaca', desc: 'Latihan baca dengan mikrofon (eksperimental)' },
      { to: '/anak', icon: <FaChild />, kunci: 'menu.anak', desc: 'Huruf hijaiyah bersuara & kuis tebak huruf' },
    ],
  },
  {
    kunciNama: 'grup.ibadah',
    ikon: <FaPrayingHands />,
    items: [
      { to: '/jadwal', icon: <FaClock />, kunci: 'menu.jadwal', desc: 'Waktu sholat & countdown adzan harian' },
      { to: '/tasbih', icon: <FaHandPointer />, kunci: 'menu.tasbih', desc: 'Counter dzikir dengan target & getar' },
      { to: '/sholawat', icon: <FaHeart />, kunci: 'menu.sholawat', desc: 'Ibrahimiyah & Jibril + penghitung' },
      { to: '/dzikir', icon: <FaCloudSun />, kunci: 'menu.dzikir', desc: 'Al-Ma\u2019tsurat ringkas dengan penghitung dzikir' },
      { to: '/doa', icon: <FaPrayingHands />, kunci: 'menu.doa', desc: 'Sepuluh doa: Arab, latin & arti' },
      { to: '/sholat-tracker', icon: <FaClipboardCheck />, kunci: 'menu.sholatTracker', desc: 'Checklist lima waktu & streak harian' },
      { to: '/wudhu', icon: <FaTint />, kunci: 'beranda.wudhu', desc: 'Langkah bersuci & doa sesudah wudhu' },
      { to: '/panduan-sholat', icon: <FaPrayingHands />, kunci: 'menu.panduanSholat', desc: 'Niat, gerakan & bacaan tiap gerakan' },
      { to: '/sholat-sunnah', icon: <FaMoon />, kunci: 'menu.sholatSunnah', desc: 'Dhuha, tahajud, witir & lainnya' },
      { to: '/dzikir-bada-sholat', icon: <FaCloudSun />, kunci: 'menu.dzikirBada', desc: 'Wirid sesudah sholat dengan penghitung' },
      { to: '/sholat-jenazah', icon: <FaBook />, kunci: 'menu.sholatJenazah', desc: 'Empat takbir & bacaan tiap takbir' },
      { to: '/tahlil', icon: <FaPrayingHands />, kunci: 'menu.tahlil', desc: 'Rangkaian tahlil terpandu & doa arwah' },
      { to: '/sholat-id', icon: <FaMoon />, kunci: 'beranda.sholatId', desc: 'Idul Fitri & Adha plus teks takbiran' },
      { to: '/sholat-musafir', icon: <FaBookOpen />, kunci: 'beranda.sholatMusafir', desc: "Jama' & qashar plus hitung jarak safar" },
      { to: '/sholat-sakit', icon: <FaBook />, kunci: 'menu.sholatSakit', desc: 'Duduk, berbaring, isyarat & kendaraan' },
      { to: '/qunut', icon: <FaPrayingHands />, kunci: 'menu.qunut', desc: 'Qunut Subuh & witir: Arab, latin, arti' },
      { to: '/panduan-imam', icon: <FaMosque />, kunci: 'beranda.imam', desc: 'Syarat, tugas, teks adzan & iqamah' },
      { to: '/sujud', icon: <FaBookOpen />, kunci: 'beranda.sujud', desc: 'Sahwi, syukur & tilawah plus bacaannya' },
      { to: '/panduan-puasa', icon: <FaBookOpen />, kunci: 'menu.puasa', desc: 'Rukun, pembatal, niat & doa berbuka' },
      { to: '/qadha-puasa', icon: <FaClipboardCheck />, kunci: 'beranda.qadha', desc: 'Catat utang & pembayaran puasa' },
      { to: '/utang-puasa', icon: <FaBookOpen />, kunci: 'menu.utangPuasa', desc: 'Buku utang puasa per tahun, centang lunas' },
      { to: '/ramadhan', icon: <FaMoon />, kunci: 'menu.ramadhan', desc: 'Hitung mundur, imsakiyah & tarawih' },
      { to: '/hisnul-muslim', icon: <FaPrayingHands />, kunci: 'menu.hisnul', desc: '101 doa per aktivitas & situasi' },
      { to: '/itikaf', icon: <FaMoon />, kunci: 'beranda.itikaf', desc: 'Panduan 10 malam terakhir Ramadhan' },
      { to: '/ruqyah', icon: <FaBookOpen />, kunci: 'beranda.ruqyah', desc: "Syar'iyyah + playlist ayat ruqyah" },
      { to: '/mutabaah', icon: <FaTasks />, kunci: 'menu.mutabaah', desc: 'Checklist amal harian & ringkasan 7 hari' },
      { to: '/jurnal-syukur', icon: <FaPenFancy />, kunci: 'menu.jurnalSyukur', desc: 'Tiga syukur & refleksi tiap hari' },
    ],
  },
  {
    kunciNama: 'grup.panduan',
    ikon: <FaBalanceScale />,
    items: [
      { to: '/waris', icon: <FaBalanceScale />, kunci: 'menu.waris', desc: 'Hitung faraidh dasar + penjelasan' },
      { to: '/fidyah', icon: <FaHandHoldingHeart />, kunci: 'menu.fidyah', desc: 'Fidyah puasa per hari & harga pokok' },
      { to: '/kafarat', icon: <FaBookOpen />, kunci: 'menu.kafarat', desc: 'Sumpah, zhihar & lainnya — ringkas' },
      { to: '/haji-umrah', icon: <FaKaaba />, kunci: 'beranda.haji', desc: 'Manasik per tahap + checklist barang' },
      { to: '/panduan-jenazah', icon: <FaBook />, kunci: 'menu.panduanJenazah', desc: 'Memandikan sampai menguburkan' },
      { to: '/ziarah', icon: <FaMonument />, kunci: 'menu.ziarah', desc: 'Adab & doa ziarah kubur' },
      { to: '/aqiqah-kurban', icon: <FaGift />, kunci: 'menu.aqiqah', desc: 'Syarat, waktu & kalkulator hewan' },
      { to: '/nama-bayi', icon: <FaBaby />, kunci: 'menu.namaBayi', desc: '110 nama + arti, bisa dicari' },
      { to: '/masjid-terdekat', icon: <FaMosque />, kunci: 'menu.masjid', desc: 'Cari masjid di sekitarmu + rute' },
      { to: '/panduan-nikah', icon: <FaHeart />, kunci: 'menu.nikah', desc: 'Rukun, mahar, akad & doa pengantin' },
      { to: '/fikih-keluarga', icon: <FaBook />, kunci: 'menu.fikihKeluarga', desc: 'Menyusui, khitan & mendidik anak' },
      { to: '/muamalah', icon: <FaBalanceScale />, kunci: 'menu.muamalah', desc: 'Riba, utang, jual beli & gadai' },
      { to: '/wakaf-wasiat', icon: <FaHandHoldingHeart />, kunci: 'menu.wakaf', desc: 'Ketentuan + contoh redaksi wasiat' },
      { to: '/halal', icon: <FaBookOpen />, kunci: 'beranda.halal', desc: 'Haram, sembelihan & adab makan' },
      { to: '/khutbah', icon: <FaBook />, kunci: 'menu.khutbah', desc: 'Jumat & hari raya untuk khatib' },
    ],
  },
  {
    kunciNama: 'grup.belajar',
    ikon: <FaGraduationCap />,
    items: [
      { to: '/iqro', icon: <FaGraduationCap />, kunci: 'menu.iqro', desc: 'Jilid 1\u20136: huruf, harakat & tajwid' },
      { to: '/kisah', icon: <FaBook />, kunci: 'menu.kisah', desc: 'Ringkasan teladan para nabi & rasul' },
      { to: '/asmaul-husna', icon: <FaListUl />, kunci: 'menu.asmaul', desc: '99 nama Allah & mode hafalan' },
      { to: '/hadits', icon: <FaBook />, kunci: 'beranda.hadits', desc: '42 hadits: Arab, arti & perawi' },
      { to: '/sirah', icon: <FaBookOpen />, kunci: 'menu.sirah', desc: 'Garis waktu kehidupan Rasulullah' },
      { to: '/riyadhus', icon: <FaBook />, kunci: 'menu.riyadhus', desc: '141 hadits bab inti + terjemahan' },
      { to: '/peristiwa', icon: <FaCalendarAlt />, kunci: 'menu.peristiwa', desc: 'Maulid, Isra Mi\'raj, Nuzulul Qur\'an' },
    ],
  },
  {
    kunciNama: 'grup.muslimah',
    ikon: <FaVenus />,
    items: [
      { to: '/muslimah', icon: <FaVenus />, kunci: 'menu.muslimah', desc: 'Kalkulator haid, doa & fikih wanita' },
      { to: '/muslimah/kalkulator', icon: <FaClipboardCheck />, kunci: 'menu.haid', desc: 'Vonis haid/istihadah terkunci PIN pribadi' },
      { to: '/muslimah/mandi-wajib', icon: <FaHandPointer />, kunci: 'menu.mandiWajib', desc: 'Niat & tata cara pasca haid/nifas' },
      { to: '/muslimah/doa', icon: <FaPrayingHands />, kunci: 'menu.doaWanita', desc: 'Doa hamil, persalinan & menyusui' },
      { to: '/muslimah/fikih', icon: <FaBook />, kunci: 'menu.fikihWanita', desc: 'Haid, nifas, istihadah & mitos' },
    ],
  },
  {
    kunciNama: 'grup.utilitas',
    ikon: <FaCoins />,
    items: [
      { to: '/zakat', icon: <FaCoins />, kunci: 'menu.zakat', desc: 'Mal, profesi & fitrah, otomatis terhitung' },
      { to: '/sedekah', icon: <FaHandHoldingHeart />, kunci: 'menu.sedekah', desc: 'Panduan & pencatat sedekah harian' },
      { to: '/khatam', icon: <FaBookReader />, kunci: 'menu.khatam', desc: 'Checklist 30 juz & target harian' },
      { to: '/kiblat', icon: <FaCompass />, kunci: 'menu.kiblat', desc: 'Kompas kiblat & sensor arah perangkat' },
      { to: '/kalender', icon: <FaCalendarAlt />, kunci: 'menu.kalender', desc: 'Tanggal hijriah & hari besar Islam' },
      { to: '/konverter', icon: <FaCalendarAlt />, kunci: 'menu.konverter', desc: 'Hijriah-Masehi + hitung usia Hijriah' },
      { to: '/statistik', icon: <FaClipboardCheck />, kunci: 'menu.statistik', desc: 'Gabungan tracker 7 & 30 hari' },
      { to: '/data-progres', icon: <FaTasks />, kunci: 'beranda.dataProgres', desc: 'Ekspor & impor cadangan data' },
    ],
  },
];

// Kartu Streak Ibadah di beranda: api + angka streak besar, progres target
// ayat hari ini (pola BarProgres yang sama dengan HajiUmrahPage), tautan ke
// /statistik untuk lencana & pengatur target.
const KartuStreak = styled(Card)`
  .baris-atas {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .lingkaran-api {
    flex-shrink: 0;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.goldSoft};
    border: 1px solid ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.goldDeep};
    font-size: 25px;
  }
  .info {
    flex: 1;
    min-width: 0;
  }
  .angka {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 32px;
    font-weight: 700;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.judul};
    span {
      font-family: ${({ theme }) => theme.fonts.body};
      font-size: 13.5px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.muted};
      margin-left: 6px;
    }
  }
  .label {
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
  .teks-target {
    font-size: 13.5px;
    color: ${({ theme }) => theme.colors.text};
    margin: 14px 0 8px;
    strong {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  .ajakan {
    font-size: 13px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 10px;
  }
`;

const BarProgres = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primarySoft};
  overflow: hidden;
  > div {
    height: 100%;
    border-radius: 999px;
    background: ${({ theme }) => theme.gradients.gold};
    transition: width ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
  }
`;

const TautanStatistik = styled(Link)`
  flex-shrink: 0;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 6px;
  font-size: 13.5px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  svg {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
`;

const KUNCI_BANNER_TUTUP = 'noor.bannerInstall.tutup.v1';

const BannerInstall = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  .teks {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.type.bodySm.size}px;
    line-height: ${({ theme }) => theme.type.bodySm.lineHeight};
    color: ${({ theme }) => theme.colors.text};
  }
  ${reduceMotion}
`;

const TombolPasang = styled.button`
  flex-shrink: 0;
  min-height: 44px;
  padding: 10px 14px;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.gradients.gold};
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-size: 13.5px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  ${reduceMotion}
`;

const TombolTutupBanner = styled.button`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 15px;
  ${reduceMotion}
`;

export default function HomePage() {
  const navigate = useNavigate();
  const { bisaInstall, pasang } = useInstallPrompt();
  const { state: stateStreak, streak, ringkasanHariIni } = useStreak();
  const [kunciHariIni] = useState(() => kunciHari(new Date()));
  const belumAdaAktivitas =
    streak === 0 && !hariAktif(stateStreak.hari[kunciHariIni]);
  const { t } = useBahasa();
  const [bannerTutup, setBannerTutup] = useState(() => {
    try {
      return localStorage.getItem(KUNCI_BANNER_TUTUP) === '1';
    } catch {
      return false;
    }
  });
  const tutupBanner = () => {
    setBannerTutup(true);
    try {
      localStorage.setItem(KUNCI_BANNER_TUTUP, '1');
    } catch {
      /* abaikan: penyimpanan tidak tersedia */
    }
  };
  return (
    <Page>
      {bisaInstall && !bannerTutup && (
        <BannerInstall role="region" aria-label={t('beranda.bannerAria')}>
          <span className="teks">
            {t('beranda.bannerTeks')}
          </span>
          <TombolPasang type="button" onClick={() => pasang()}>
            <FaDownload aria-hidden="true" /> {t('beranda.pasang')}
          </TombolPasang>
          <TombolTutupBanner type="button" onClick={tutupBanner} aria-label={t('beranda.tutupBanner')}>
            <FaTimes aria-hidden="true" />
          </TombolTutupBanner>
        </BannerInstall>
      )}
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
            <FaMoon style={{ display: 'inline', verticalAlign: '-2px' }} /> NurQalam menemani ibadah
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
      <BarCari type="button" onClick={() => navigate('/cari')} aria-label={t('beranda.bukaPencarian')}>
        <FaSearch aria-hidden="true" />
        <span>{t('beranda.cariPlaceholder')}</span>
      </BarCari>
      <OrnamentDivider />
      <KartuStreak aria-label="Streak ibadah">
        <div className="baris-atas">
          <span className="lingkaran-api" aria-hidden="true">
            <FaFire />
          </span>
          <div className="info">
            <div className="angka">
              {streak}
              <span>hari beruntun</span>
            </div>
            <div className="label">Streak Ibadah</div>
          </div>
          <TautanStatistik to="/statistik" aria-label="Buka statistik, lencana & target harian">
            Statistik <FaChevronRight aria-hidden="true" />
          </TautanStatistik>
        </div>
        <p className="teks-target">
          Ayat dibaca hari ini: <strong>{ringkasanHariIni.ayatHariIni}</strong> dari{' '}
          {ringkasanHariIni.target}
        </p>
        <BarProgres
          role="progressbar"
          aria-valuenow={ringkasanHariIni.persenTarget}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progres target ayat hari ini ${ringkasanHariIni.persenTarget} persen`}
        >
          <div style={{ width: `${ringkasanHariIni.persenTarget}%` }} />
        </BarProgres>
        {belumAdaAktivitas && (
          <p className="ajakan">Mulai streak hari ini — baca satu ayat saja cukup.</p>
        )}
      </KartuStreak>
      <LanjutkanMembaca />
      <KartuHarian />
      {SEKSI.map((seksi) => (
        <div key={seksi.kunciNama}>
          <SectionTitle>
            {seksi.ikon} {t(seksi.kunciNama)}
          </SectionTitle>
          <GridMenu>
            {seksi.items.map((item) => (
              <MenuCard key={item.to} to={item.to} icon={item.icon} judul={t(item.kunci)} desc={item.desc} />
            ))}
          </GridMenu>
        </div>
      ))}
    </Page>
  );
}
