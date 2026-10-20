/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../presentation/components/AppHeader.jsx';
import { useBahasa } from './bahasa.js';
import LiveRegion from '../presentation/components/feedback/LiveRegion.jsx';
import PengingatRunner from '../presentation/components/PengingatRunner.jsx';

// App shell: ThemeProvider sudah dipasang di main.jsx.
// Mobile-first: konten full-width rapat di HP; max 960px center di desktop.
const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg};
`;
const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 14px 176px;
  outline: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 0 20px 168px;
  }
`;

// Skip-link: tautan pertama di halaman — melompat langsung ke konten utama.
// Tersembunyi sampai mendapat fokus keyboard (WCAG 2.4.1).
const SkipLink = styled.a`
  position: fixed;
  top: -60px;
  left: 12px;
  z-index: 400;
  padding: 12px 18px;
  min-height: 44px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.primaryDeep};
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 14px;
  font-weight: 700;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  transition: top 0.15s ease;
  &:focus-visible {
    top: 10px;
  }
`;

// Peta judul per rute → document.title (screen reader mengumumkan perpindahan
// halaman SPA lewat judul dokumen + fokus yang dipindah ke <main>).
const JUDUL_RUTE = [
  [/^\/$/, 'judul.beranda'],
  [/^\/quran$/, 'judul.quran'],
  [/^\/surah\/\d+$/, 'judul.bacaSurah'],
  [/^\/iqro$/, 'judul.iqro'],
  [/^\/iqro\/\d+$/, 'judul.iqro'],
  [/^\/jadwal$/, 'judul.jadwal'],
  [/^\/zakat$/, 'judul.zakat'],
  [/^\/khatam$/, 'judul.khatam'],
  [/^\/tasbih$/, 'judul.tasbih'],
  [/^\/dzikir$/, 'judul.dzikir'],
  [/^\/doa$/, 'judul.doa'],
  [/^\/sholat-tracker$/, 'judul.sholatTracker'],
  [/^\/kiblat$/, 'judul.kiblat'],
  [/^\/kalender$/, 'judul.kalender'],
  [/^\/asmaul-husna$/, 'judul.asmaul'],
  [/^\/kisah$/, 'judul.kisah'],
  [/^\/kisah\//, 'judul.kisahDetail'],
  [/^\/muslimah\/kalkulator$/, 'judul.haidNifas'],
  [/^\/muslimah\/mandi-wajib$/, 'judul.mandiWajib'],
  [/^\/muslimah\/doa$/, 'judul.doaWanita'],
  [/^\/muslimah\/fikih$/, 'judul.fikihWanita'],
  [/^\/muslimah$/, 'judul.muslimah'],
  [/^\/aksesibilitas$/, 'judul.aksesibilitas'],
  [/^\/cari$/, 'judul.cari'],
  [/^\/panduan-tajwid$/, 'judul.tajwid'],
  [/^\/hafalan$/, 'judul.hafalan'],
  [/^\/bookmark$/, 'judul.bookmark'],
  [/^\/wudhu$/, 'judul.wudhu'],
  [/^\/panduan-sholat$/, 'judul.panduanSholat'],
  [/^\/sholat-sunnah$/, 'judul.sholatSunnah'],
  [/^\/dzikir-bada-sholat$/, 'judul.dzikirBada'],
  [/^\/sholat-jenazah$/, 'judul.sholatJenazah'],
  [/^\/panduan-puasa$/, 'judul.puasa'],
  [/^\/qadha-puasa$/, 'judul.qadha'],
  [/^\/ramadhan$/, 'judul.ramadhan'],
  [/^\/hadits$/, 'judul.hadits'],
  [/^\/hisnul-muslim$/, 'judul.hisnul'],
  [/^\/sirah$/, 'judul.sirah'],
  [/^\/waris$/, 'judul.waris'],
  [/^\/fidyah$/, 'judul.fidyah'],
  [/^\/kafarat$/, 'judul.kafarat'],
  [/^\/haji-umrah$/, 'judul.haji'],
  [/^\/panduan-jenazah$/, 'judul.panduanJenazah'],
  [/^\/aqiqah-kurban$/, 'judul.aqiqah'],
  [/^\/mutabaah$/, 'judul.mutabaah'],
  [/^\/nama-bayi$/, 'judul.namaBayi'],
  [/^\/masjid-terdekat$/, 'judul.masjid'],
  [/^\/sholat-id$/, 'judul.sholatId'],
  [/^\/sholat-musafir$/, 'judul.sholatMusafir'],
  [/^\/sholat-sakit$/, 'judul.sholatSakit'],
  [/^\/qunut$/, 'judul.qunut'],
  [/^\/panduan-imam$/, 'judul.imam'],
  [/^\/indeks-tematik$/, 'judul.indeks'],
  [/^\/sujud$/, 'judul.sujud'],
  [/^\/kuis$/, 'judul.kuis'],
  [/^\/radio$/, 'judul.radio'],
  [/^\/tes-baca$/, 'judul.tesBaca'],
  [/^\/anak(\/|$)/, 'judul.anak'],
  [/^\/panduan-nikah$/, 'judul.nikah'],
  [/^\/fikih-keluarga$/, 'judul.fikihKeluarga'],
  [/^\/muamalah$/, 'judul.muamalah'],
  [/^\/wakaf-wasiat$/, 'judul.wakaf'],
  [/^\/halal$/, 'judul.halal'],
  [/^\/itikaf$/, 'judul.itikaf'],
  [/^\/ruqyah$/, 'judul.ruqyah'],
  [/^\/khutbah$/, 'judul.khutbah'],
  [/^\/peristiwa$/, 'judul.peristiwa'],
  [/^\/riyadhus$/, 'judul.riyadhus'],
  [/^\/konverter$/, 'judul.konverter'],
  [/^\/statistik$/, 'judul.statistik'],
  [/^\/data-progres$/, 'judul.dataProgres'],
];

function judulUntuk(pathname, t) {
  const cocok = JUDUL_RUTE.find(([pola]) => pola.test(pathname));
  return cocok ? t(cocok[1]) : 'Noor';
}

export default function App() {
  const { t } = useBahasa();
  const location = useLocation();
  const mainRef = useRef(null);
  const pertamaRef = useRef(true);

  // Setiap ganti rute: perbarui judul dokumen & pindahkan fokus ke konten
  // utama, supaya pengguna keyboard/screen reader mulai dari awal halaman baru.
  useEffect(() => {
    document.title = `${judulUntuk(location.pathname, t)} — Noor`;
    window.scrollTo(0, 0);
    if (!pertamaRef.current) {
      mainRef.current?.focus({ preventScroll: true });
    }
    pertamaRef.current = false;
  }, [location.pathname, t]);

  return (
    <Shell>
      <SkipLink href="#konten">{t('umum.lewatiKonten')}</SkipLink>
      <AppHeader />
      <LiveRegion />
      <PengingatRunner />
      <Main id="konten" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </Main>
    </Shell>
  );
}
