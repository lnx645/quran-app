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
  [/^\/sedekah$/, 'judul.sedekah'],
  [/^\/khatam$/, 'judul.khatam'],
  [/^\/tasbih$/, 'judul.tasbih'],
  [/^\/sholawat$/, 'judul.sholawat'],
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
  [/^\/tahlil$/, 'judul.tahlil'],
  [/^\/panduan-puasa$/, 'judul.puasa'],
  [/^\/qadha-puasa$/, 'judul.qadha'],
  [/^\/utang-puasa$/, 'judul.utangPuasa'],
  [/^\/ramadhan$/, 'judul.ramadhan'],
  [/^\/hadits$/, 'judul.hadits'],
  [/^\/hisnul-muslim$/, 'judul.hisnul'],
  [/^\/sirah$/, 'judul.sirah'],
  [/^\/waris$/, 'judul.waris'],
  [/^\/fidyah$/, 'judul.fidyah'],
  [/^\/kafarat$/, 'judul.kafarat'],
  [/^\/haji-umrah$/, 'judul.haji'],
  [/^\/panduan-jenazah$/, 'judul.panduanJenazah'],
  [/^\/ziarah$/, 'judul.ziarah'],
  [/^\/aqiqah-kurban$/, 'judul.aqiqah'],
  [/^\/mutabaah$/, 'judul.mutabaah'],
  [/^\/jurnal-syukur$/, 'judul.jurnalSyukur'],
  [/^\/profil$/, 'judul.profil'],
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
  [/^\/anak\/sholat$/, 'judul.sholatAnak'],
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
  [/^\/tentang$/, 'judul.tentang'],
  [/^\/kebijakan-privasi$/, 'judul.kebijakanPrivasi'],
];

function judulUntuk(pathname, t) {
  const cocok = JUDUL_RUTE.find(([pola]) => pola.test(pathname));
  return cocok ? t(cocok[1]) : 'Noor';
}

// Deskripsi per rute untuk meta description & Open Graph — cuplikan yang
// dilihat mesin pencari dan pratinjau saat tautan dibagikan. Bahasa
// Indonesia (bahasa utama konten); rute tanpa entri memakai bawaan.
const DESKRIPSI_BAWAAN =
  'Noor — aplikasi Al-Qur\'an & ibadah: mushaf 114 surah dengan terjemahan Kemenag & audio, jadwal sholat, kiblat, dzikir, doa, dan panduan ibadah. Gratis di nurqalam.my.id.';

const DESKRIPSI_RUTE = [
  [/^\/$/, DESKRIPSI_BAWAAN],
  [/^\/quran$/, 'Baca Al-Qur\'an 114 surah: teks Utsmani, transliterasi, terjemahan Kemenag, tafsir, dan audio per ayat dengan penanda kata di Noor.'],
  [/^\/surah\/\d+$/, 'Baca surah Al-Qur\'an dengan teks Utsmani, terjemahan Kemenag, tafsir, dan audio murottal dengan penanda kata/ayat di Noor.'],
  [/^\/jadwal$/, 'Jadwal sholat harian metode Kemenag dengan hitung mundur waktu berikutnya, pengingat adzan, dan kalender Hijriah di Noor.'],
  [/^\/kiblat$/, 'Arah kiblat akurat berbasis lokasi & kompas perangkat, dilengkapi jarak ke Ka\'bah — di aplikasi Noor.'],
  [/^\/kalender$/, 'Kalender Hijriah lengkap dengan konverter tanggal Masehi–Hijriah dan penanda hari penting Islam di Noor.'],
  [/^\/masjid-terdekat$/, 'Temukan masjid terdekat dari lokasi Anda lengkap dengan jarak dan petunjuk arah — fitur Noor berbasis OpenStreetMap.'],
  [/^\/zakat$/, 'Kalkulator zakat mal, profesi, fitrah, dan emas/perak sesuai ketentuan syariat — hitung zakat Anda di Noor.'],
  [/^\/waris$/, 'Kalkulator waris Islam (faraidh): hitung pembagian harta warisan sesuai syariat dengan penjelasan ahli waris di Noor.'],
  [/^\/tasbih$/, 'Tasbih digital dengan target hitungan, getar, dan rangkaian dzikir — gratis di aplikasi Noor.'],
  [/^\/dzikir$/, 'Dzikir pagi & petang lengkap dengan teks Arab, latin, arti, dan penghitung — sesuai tuntunan, di Noor.'],
  [/^\/doa$/, 'Kumpulan doa harian dan doa pilihan Al-Qur\'an & hadits dengan teks Arab, latin, dan terjemahan di Noor.'],
  [/^\/hisnul-muslim$/, 'Hisnul Muslim: 101 doa perlindungan muslim dari Al-Qur\'an & sunnah, dikelompokkan per situasi — di Noor.'],
  [/^\/hafalan$/, 'Mode hafalan Al-Qur\'an: sembunyikan ayat bertahap, ulangi per ayat, dan pantau progres hafalan Anda di Noor.'],
  [/^\/panduan-tajwid$/, 'Panduan tajwid interaktif: makhraj, hukum nun mati, mad, dan lainnya dengan contoh ayat — belajar tajwid di Noor.'],
  [/^\/iqro(\/\d+)?$/, 'Belajar Iqro jilid 1–6 dengan audio per huruf/halaman — untuk anak dan pemula, gratis di Noor.'],
  [/^\/anak(\/|$)/, 'Mode Anak Noor: hijaiyah ber-audio, Iqro, doa anak, dan panduan sholat anak dengan bahasa yang ramah.'],
  [/^\/kisah$/, 'Kisah 25 nabi dan kisah pilihan Islami dengan pelajaran di setiap cerita — baca di Noor.'],
  [/^\/sirah$/, 'Sirah Nabawiyah: perjalanan hidup Rasulullah ﷺ dari kelahiran hingga wafat, diringkas runtut di Noor.'],
  [/^\/radio$/, 'Radio murottal Al-Qur\'an streaming 24 jam dari para qari pilihan, dengan sleep timer — di Noor.'],
  [/^\/kuis$/, 'Kuis Islami: uji pengetahuan seputar Al-Qur\'an, sirah, dan ibadah dengan skor & pembahasan di Noor.'],
  [/^\/muslimah\/kalkulator$/, 'Kalkulator haid & nifas sesuai fikih Syafi\'i: catat siklus, hitung masa suci, dan ketahui status ibadah — di Noor.'],
  [/^\/nama-bayi$/, 'Inspirasi nama bayi Islami beserta artinya untuk laki-laki & perempuan — cari nama terbaik di Noor.'],
  [/^\/asmaul-husna$/, 'Asmaul Husna: 99 nama Allah dengan tulisan Arab, latin, dan maknanya — baca & hafalkan di Noor.'],
  [/^\/tentang$/, 'Tentang Noor: aplikasi Al-Qur\'an & ibadah gratis — sumber data, privasi (data tersimpan lokal), dan info dukungan pengembangan.'],
  [/^\/kebijakan-privasi$/, 'Kebijakan Privasi Noor: data tersimpan lokal di perangkat Anda, tanpa akun; penjelasan layanan pihak ketiga & iklan versi web.'],
];

function deskripsiUntuk(pathname) {
  const cocok = DESKRIPSI_RUTE.find(([pola]) => pola.test(pathname));
  return cocok ? cocok[1] : DESKRIPSI_BAWAAN;
}

// Tulis/segarkan satu tag meta di <head>.
function setMeta(selektor, atribut, kunci, nilai) {
  let el = document.head.querySelector(selektor);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(atribut, kunci);
    document.head.appendChild(el);
  }
  el.setAttribute('content', nilai);
}

export default function App() {
  const { t } = useBahasa();
  const location = useLocation();
  const mainRef = useRef(null);
  const pertamaRef = useRef(true);

  // Setiap ganti rute: perbarui judul dokumen & pindahkan fokus ke konten
  // utama, supaya pengguna keyboard/screen reader mulai dari awal halaman baru.
  useEffect(() => {
    const judul = `${judulUntuk(location.pathname, t)} — Noor`;
    document.title = judul;
    const deskripsi = deskripsiUntuk(location.pathname);
    setMeta('meta[name="description"]', 'name', 'description', deskripsi);
    setMeta('meta[property="og:title"]', 'property', 'og:title', judul);
    setMeta('meta[property="og:description"]', 'property', 'og:description', deskripsi);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', judul);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', deskripsi);
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
