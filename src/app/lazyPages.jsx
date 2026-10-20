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
const _Cari = lazy(() => import('../presentation/pages/CariPage.jsx'));
const _PanduanTajwid = lazy(() => import('../presentation/pages/PanduanTajwidPage.jsx'));
const _Hafalan = lazy(() => import('../presentation/pages/HafalanPage.jsx'));
const _Bookmark = lazy(() => import('../presentation/pages/BookmarkPage.jsx'));
const _PanduanWudhu = lazy(() => import('../presentation/pages/PanduanWudhuPage.jsx'));
const _PanduanSholat = lazy(() => import('../presentation/pages/PanduanSholatPage.jsx'));
const _SholatSunnah = lazy(() => import('../presentation/pages/SholatSunnahPage.jsx'));
const _DzikirBadaSholat = lazy(() => import('../presentation/pages/DzikirBadaSholatPage.jsx'));
const _SholatJenazah = lazy(() => import('../presentation/pages/SholatJenazahPage.jsx'));
const _PanduanPuasa = lazy(() => import('../presentation/pages/PanduanPuasaPage.jsx'));
const _QadhaPuasa = lazy(() => import('../presentation/pages/QadhaPuasaPage.jsx'));
const _Ramadhan = lazy(() => import('../presentation/pages/RamadhanPage.jsx'));
const _Hadits = lazy(() => import('../presentation/pages/HaditsPage.jsx'));
const _HisnulMuslim = lazy(() => import('../presentation/pages/HisnulMuslimPage.jsx'));
const _Sirah = lazy(() => import('../presentation/pages/SirahPage.jsx'));
const _Waris = lazy(() => import('../presentation/pages/WarisPage.jsx'));
const _Fidyah = lazy(() => import('../presentation/pages/FidyahPage.jsx'));
const _Kafarat = lazy(() => import('../presentation/pages/KafaratPage.jsx'));
const _HajiUmrah = lazy(() => import('../presentation/pages/HajiUmrahPage.jsx'));
const _PanduanJenazah = lazy(() => import('../presentation/pages/PanduanJenazahPage.jsx'));
const _AqiqahKurban = lazy(() => import('../presentation/pages/AqiqahKurbanPage.jsx'));
const _Mutabaah = lazy(() => import('../presentation/pages/MutabaahPage.jsx'));
const _NamaBayi = lazy(() => import('../presentation/pages/NamaBayiPage.jsx'));
const _MasjidTerdekat = lazy(() => import('../presentation/pages/MasjidTerdekatPage.jsx'));
const _SholatId = lazy(() => import('../presentation/pages/SholatIdPage.jsx'));
const _SholatMusafir = lazy(() => import('../presentation/pages/SholatMusafirPage.jsx'));
const _SholatSakit = lazy(() => import('../presentation/pages/SholatSakitPage.jsx'));
const _DoaQunut = lazy(() => import('../presentation/pages/DoaQunutPage.jsx'));
const _PanduanImam = lazy(() => import('../presentation/pages/PanduanImamPage.jsx'));
const _IndeksTematik = lazy(() => import('../presentation/pages/IndeksTematikPage.jsx'));
const _Sujud = lazy(() => import('../presentation/pages/SujudPage.jsx'));
const _Kuis = lazy(() => import('../presentation/pages/KuisPage.jsx'));
const _PanduanNikah = lazy(() => import('../presentation/pages/PanduanNikahPage.jsx'));
const _FikihKeluarga = lazy(() => import('../presentation/pages/FikihKeluargaPage.jsx'));
const _Muamalah = lazy(() => import('../presentation/pages/MuamalahPage.jsx'));
const _WakafWasiat = lazy(() => import('../presentation/pages/WakafWasiatPage.jsx'));
const _Halal = lazy(() => import('../presentation/pages/HalalPage.jsx'));
const _Itikaf = lazy(() => import('../presentation/pages/ItikafPage.jsx'));
const _Ruqyah = lazy(() => import('../presentation/pages/RuqyahPage.jsx'));
const _Khutbah = lazy(() => import('../presentation/pages/KhutbahPage.jsx'));
const _Peristiwa = lazy(() => import('../presentation/pages/PeristiwaPage.jsx'));
const _Riyadhus = lazy(() => import('../presentation/pages/RiyadhusPage.jsx'));
const _Konverter = lazy(() => import('../presentation/pages/KonverterPage.jsx'));
const _Statistik = lazy(() => import('../presentation/pages/StatistikPage.jsx'));
const _DataProgres = lazy(() => import('../presentation/pages/DataProgresPage.jsx'));
const _Radio = lazy(() => import('../presentation/pages/RadioPage.jsx'));
const _TesBaca = lazy(() => import('../presentation/pages/TesBacaPage.jsx'));

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
export function CariPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Cari />
    </Suspense>
  );
}
export function PanduanTajwidPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_PanduanTajwid />
    </Suspense>
  );
}
export function HafalanPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Hafalan />
    </Suspense>
  );
}
export function BookmarkPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Bookmark />
    </Suspense>
  );
}
export function PanduanWudhuPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_PanduanWudhu />
    </Suspense>
  );
}
export function PanduanSholatPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_PanduanSholat />
    </Suspense>
  );
}
export function SholatSunnahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_SholatSunnah />
    </Suspense>
  );
}
export function DzikirBadaSholatPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_DzikirBadaSholat />
    </Suspense>
  );
}
export function SholatJenazahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_SholatJenazah />
    </Suspense>
  );
}
export function PanduanPuasaPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_PanduanPuasa />
    </Suspense>
  );
}
export function QadhaPuasaPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_QadhaPuasa />
    </Suspense>
  );
}
export function RamadhanPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Ramadhan />
    </Suspense>
  );
}
export function HaditsPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Hadits />
    </Suspense>
  );
}
export function HisnulMuslimPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_HisnulMuslim />
    </Suspense>
  );
}
export function SirahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Sirah />
    </Suspense>
  );
}
export function WarisPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Waris />
    </Suspense>
  );
}
export function FidyahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Fidyah />
    </Suspense>
  );
}
export function KafaratPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Kafarat />
    </Suspense>
  );
}
export function HajiUmrahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_HajiUmrah />
    </Suspense>
  );
}
export function PanduanJenazahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_PanduanJenazah />
    </Suspense>
  );
}
export function AqiqahKurbanPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_AqiqahKurban />
    </Suspense>
  );
}
export function MutabaahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Mutabaah />
    </Suspense>
  );
}
export function NamaBayiPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_NamaBayi />
    </Suspense>
  );
}
export function MasjidTerdekatPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_MasjidTerdekat />
    </Suspense>
  );
}

export function SholatIdPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_SholatId />
    </Suspense>
  );
}

export function SholatMusafirPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_SholatMusafir />
    </Suspense>
  );
}

export function SholatSakitPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_SholatSakit />
    </Suspense>
  );
}

export function DoaQunutPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_DoaQunut />
    </Suspense>
  );
}

export function PanduanImamPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_PanduanImam />
    </Suspense>
  );
}

export function IndeksTematikPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_IndeksTematik />
    </Suspense>
  );
}

export function SujudPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Sujud />
    </Suspense>
  );
}

export function KuisPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Kuis />
    </Suspense>
  );
}

export function RadioPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Radio />
    </Suspense>
  );
}

export function TesBacaPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_TesBaca />
    </Suspense>
  );
}

export function PanduanNikahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_PanduanNikah />
    </Suspense>
  );
}

export function FikihKeluargaPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_FikihKeluarga />
    </Suspense>
  );
}

export function MuamalahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Muamalah />
    </Suspense>
  );
}

export function WakafWasiatPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_WakafWasiat />
    </Suspense>
  );
}

export function HalalPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Halal />
    </Suspense>
  );
}

export function ItikafPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Itikaf />
    </Suspense>
  );
}

export function RuqyahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Ruqyah />
    </Suspense>
  );
}

export function KhutbahPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Khutbah />
    </Suspense>
  );
}

export function PeristiwaPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Peristiwa />
    </Suspense>
  );
}

export function RiyadhusPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Riyadhus />
    </Suspense>
  );
}

export function KonverterPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Konverter />
    </Suspense>
  );
}

export function StatistikPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_Statistik />
    </Suspense>
  );
}

export function DataProgresPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <_DataProgres />
    </Suspense>
  );
}
