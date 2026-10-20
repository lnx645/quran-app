/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../presentation/components/AppHeader.jsx';
import LiveRegion from '../presentation/components/feedback/LiveRegion.jsx';

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
  [/^\/$/, 'Beranda'],
  [/^\/quran$/, "Al-Qur'an — 114 Surah"],
  [/^\/surah\/\d+$/, 'Baca Surah'],
  [/^\/iqro$/, 'Belajar Iqro'],
  [/^\/iqro\/\d+$/, 'Belajar Iqro'],
  [/^\/jadwal$/, 'Jadwal Sholat'],
  [/^\/zakat$/, 'Kalkulator Zakat'],
  [/^\/khatam$/, 'Khatam Tracker'],
  [/^\/tasbih$/, 'Tasbih Digital'],
  [/^\/dzikir$/, 'Dzikir Pagi & Petang'],
  [/^\/doa$/, 'Doa Harian'],
  [/^\/sholat-tracker$/, 'Sholat Tracker'],
  [/^\/kiblat$/, 'Arah Kiblat'],
  [/^\/kalender$/, 'Kalender Hijriah'],
  [/^\/asmaul-husna$/, 'Asmaul Husna'],
  [/^\/kisah$/, 'Kisah 25 Nabi'],
  [/^\/kisah\//, 'Kisah Nabi'],
  [/^\/muslimah\/kalkulator$/, 'Kalkulator Haid & Nifas'],
  [/^\/muslimah\/mandi-wajib$/, 'Panduan Mandi Wajib'],
  [/^\/muslimah\/doa$/, 'Doa Khusus Wanita'],
  [/^\/muslimah\/fikih$/, 'Fikih Wanita'],
  [/^\/muslimah$/, 'Ruang Muslimah'],
  [/^\/aksesibilitas$/, 'Pengaturan Aksesibilitas'],
  [/^\/cari$/, 'Cari Ayat'],
  [/^\/panduan-tajwid$/, 'Panduan Tajwid'],
  [/^\/hafalan$/, 'Mode Hafalan'],
  [/^\/bookmark$/, 'Bookmark Ayat'],
  [/^\/wudhu$/, 'Panduan Wudhu & Tayammum'],
  [/^\/panduan-sholat$/, 'Panduan Sholat'],
  [/^\/sholat-sunnah$/, 'Panduan Sholat Sunnah'],
  [/^\/dzikir-bada-sholat$/, "Dzikir Ba'da Sholat"],
  [/^\/sholat-jenazah$/, 'Panduan Sholat Jenazah'],
  [/^\/panduan-puasa$/, 'Panduan Puasa'],
  [/^\/qadha-puasa$/, 'Tracker Qadha Puasa'],
  [/^\/ramadhan$/, 'Mode Ramadhan'],
  [/^\/hadits$/, 'Hadits Arbain Nawawi'],
  [/^\/hisnul-muslim$/, 'Hisnul Muslim'],
  [/^\/sirah$/, 'Sirah Nabawiyah'],
  [/^\/waris$/, 'Kalkulator Waris'],
  [/^\/fidyah$/, 'Kalkulator Fidyah'],
  [/^\/kafarat$/, 'Kafarat'],
  [/^\/haji-umrah$/, 'Panduan Haji & Umrah'],
  [/^\/panduan-jenazah$/, 'Panduan Jenazah'],
  [/^\/aqiqah-kurban$/, 'Aqiqah & Kurban'],
  [/^\/mutabaah$/, "Mutaba'ah Yaumiyah"],
  [/^\/nama-bayi$/, 'Nama Bayi Islami'],
  [/^\/masjid-terdekat$/, 'Masjid Terdekat'],
  [/^\/sholat-id$/, 'Panduan Sholat Id'],
  [/^\/sholat-musafir$/, 'Panduan Sholat Musafir'],
  [/^\/sholat-sakit$/, 'Panduan Sholat Orang Sakit'],
  [/^\/qunut$/, 'Doa Qunut'],
  [/^\/panduan-imam$/, 'Panduan Imam & Muadzin'],
  [/^\/indeks-tematik$/, 'Indeks Tematik Al-Qur\'an'],
  [/^\/sujud$/, 'Panduan Sujud Sahwi, Syukur & Tilawah'],
  [/^\/kuis$/, 'Kuis Islami'],
  [/^\/panduan-nikah$/, 'Panduan Nikah'],
  [/^\/fikih-keluarga$/, 'Fikih Keluarga'],
  [/^\/muamalah$/, 'Fikih Muamalah'],
  [/^\/wakaf-wasiat$/, 'Wakaf & Wasiat'],
  [/^\/halal$/, 'Makanan Halal & Adab Makan'],
  [/^\/itikaf$/, "Panduan I'tikaf"],
  [/^\/ruqyah$/, "Ruqyah Syar'iyyah"],
  [/^\/khutbah$/, 'Teks Khutbah'],
  [/^\/peristiwa$/, 'Peristiwa Islam'],
  [/^\/riyadhus$/, 'Riyadhus Shalihin'],
  [/^\/konverter$/, 'Konverter Hijriah'],
  [/^\/statistik$/, 'Statistik Ibadah'],
  [/^\/data-progres$/, 'Data Progres (Ekspor & Impor)'],
];

function judulUntuk(pathname) {
  const cocok = JUDUL_RUTE.find(([pola]) => pola.test(pathname));
  return cocok ? cocok[1] : 'Noor';
}

export default function App() {
  const location = useLocation();
  const mainRef = useRef(null);
  const pertamaRef = useRef(true);

  // Setiap ganti rute: perbarui judul dokumen & pindahkan fokus ke konten
  // utama, supaya pengguna keyboard/screen reader mulai dari awal halaman baru.
  useEffect(() => {
    document.title = `${judulUntuk(location.pathname)} — Noor`;
    window.scrollTo(0, 0);
    if (!pertamaRef.current) {
      mainRef.current?.focus({ preventScroll: true });
    }
    pertamaRef.current = false;
  }, [location.pathname]);

  return (
    <Shell>
      <SkipLink href="#konten">Lewati ke konten utama</SkipLink>
      <AppHeader />
      <LiveRegion />
      <Main id="konten" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </Main>
    </Shell>
  );
}
