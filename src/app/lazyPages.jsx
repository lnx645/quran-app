import { lazy, Suspense } from 'react';
import { Page, Skeleton } from '../presentation/components/common.jsx';

// Wrapper lazy per rute (code-splitting): tiap halaman dimuat sebagai chunk
// terpisah; data statis besar (iqro, muslimah, asmaul husna, kisah) ikut
// chunk halamannya, tidak membebani entry. File ini hanya mengekspor
// komponen agar aturan lint only-export-components terpenuhi.

// Fallback selama chunk halaman dimuat: skeleton judul + beberapa blok.
export function PageFallback() {
  return (
    <Page aria-busy="true">
      <Skeleton h={34} w="55%" radius={10} />
      <div style={{ height: 10 }} />
      <Skeleton h={15} w="80%" />
      <div style={{ height: 18 }} />
      <Skeleton h={120} radius={16} />
      <div style={{ height: 14 }} />
      <Skeleton h={120} radius={16} />
    </Page>
  );
}

const _Surah = lazy(() => import('../presentation/pages/SurahPage.jsx'));
const _IqroHub = lazy(() => import('../presentation/pages/IqroHubPage.jsx'));
const _IqroJilid = lazy(() => import('../presentation/pages/IqroJilidPage.jsx'));
const _Jadwal = lazy(() => import('../presentation/pages/JadwalPage.jsx'));
const _Zakat = lazy(() => import('../presentation/pages/ZakatPage.jsx'));
const _Khatam = lazy(() => import('../presentation/pages/KhatamPage.jsx'));
const _Tasbih = lazy(() => import('../presentation/pages/TasbihPage.jsx'));
const _Dzikir = lazy(() => import('../presentation/pages/DzikirPage.jsx'));
const _Doa = lazy(() => import('../presentation/pages/DoaPage.jsx'));
const _SholatTracker = lazy(() => import('../presentation/pages/SholatTrackerPage.jsx'));
const _Kiblat = lazy(() => import('../presentation/pages/KiblatPage.jsx'));
const _Kalender = lazy(() => import('../presentation/pages/KalenderPage.jsx'));
const _AsmaulHusna = lazy(() => import('../presentation/pages/AsmaulHusnaPage.jsx'));
const _Kisah = lazy(() => import('../presentation/pages/KisahPage.jsx'));
const _KisahDetail = lazy(() => import('../presentation/pages/KisahDetailPage.jsx'));
const _QuranList = lazy(() => import('../presentation/pages/QuranListPage.jsx'));
const _MuslimahHub = lazy(() => import('../presentation/pages/MuslimahHubPage.jsx'));
const _MuslimahKalkulator = lazy(() => import('../presentation/pages/MuslimahKalkulatorPage.jsx'));
const _MuslimahMandiWajib = lazy(() => import('../presentation/pages/MuslimahMandiWajibPage.jsx'));
const _MuslimahDoa = lazy(() => import('../presentation/pages/MuslimahDoaPage.jsx'));
const _MuslimahFikih = lazy(() => import('../presentation/pages/MuslimahFikihPage.jsx'));
const _Aksesibilitas = lazy(() => import('../presentation/pages/AksesibilitasPage.jsx'));

export function SurahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Surah />
    </Suspense>
  );
}
export function IqroHubPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_IqroHub />
    </Suspense>
  );
}
export function IqroJilidPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_IqroJilid />
    </Suspense>
  );
}
export function JadwalPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Jadwal />
    </Suspense>
  );
}
export function ZakatPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Zakat />
    </Suspense>
  );
}
export function KhatamPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Khatam />
    </Suspense>
  );
}
export function TasbihPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Tasbih />
    </Suspense>
  );
}
export function DzikirPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Dzikir />
    </Suspense>
  );
}
export function DoaPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Doa />
    </Suspense>
  );
}
export function SholatTrackerPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_SholatTracker />
    </Suspense>
  );
}
export function KiblatPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Kiblat />
    </Suspense>
  );
}
export function KalenderPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Kalender />
    </Suspense>
  );
}
export function AsmaulHusnaPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_AsmaulHusna />
    </Suspense>
  );
}
export function KisahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Kisah />
    </Suspense>
  );
}
export function KisahDetailPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_KisahDetail />
    </Suspense>
  );
}
export function QuranListPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_QuranList />
    </Suspense>
  );
}
export function MuslimahHubPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_MuslimahHub />
    </Suspense>
  );
}
export function MuslimahKalkulatorPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_MuslimahKalkulator />
    </Suspense>
  );
}
export function MuslimahMandiWajibPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_MuslimahMandiWajib />
    </Suspense>
  );
}
export function MuslimahDoaPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_MuslimahDoa />
    </Suspense>
  );
}
export function MuslimahFikihPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_MuslimahFikih />
    </Suspense>
  );
}
export function AksesibilitasPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Aksesibilitas />
    </Suspense>
  );
}
