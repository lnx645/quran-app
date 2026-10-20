import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App.jsx';
import HomePage from '../presentation/pages/HomePage.jsx';
import {
  SurahPage, IqroHubPage, IqroJilidPage, JadwalPage, ZakatPage, KhatamPage,
  TasbihPage, DzikirPage, DoaPage, SholatTrackerPage, KiblatPage, KalenderPage,
  AsmaulHusnaPage, KisahPage, KisahDetailPage, QuranListPage, MuslimahHubPage,
  MuslimahKalkulatorPage, MuslimahMandiWajibPage, MuslimahDoaPage, MuslimahFikihPage,
  AksesibilitasPage,
} from './lazyPages.jsx';

// HomePage eager (chunk awal); halaman lain lazy lewat lazyPages.jsx.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'quran', element: <QuranListPage /> },
      { path: 'muslimah', element: <MuslimahHubPage /> },
      { path: 'muslimah/kalkulator', element: <MuslimahKalkulatorPage /> },
      { path: 'muslimah/mandi-wajib', element: <MuslimahMandiWajibPage /> },
      { path: 'muslimah/doa', element: <MuslimahDoaPage /> },
      { path: 'muslimah/fikih', element: <MuslimahFikihPage /> },
      { path: 'surah/:id', element: <SurahPage /> },
      { path: 'yasin', element: <Navigate to="/surah/36" replace /> },
      { path: 'iqro', element: <IqroHubPage /> },
      { path: 'iqro/:jilid', element: <IqroJilidPage /> },
      { path: 'jadwal', element: <JadwalPage /> },
      { path: 'zakat', element: <ZakatPage /> },
      { path: 'khatam', element: <KhatamPage /> },
      { path: 'tasbih', element: <TasbihPage /> },
      { path: 'dzikir', element: <DzikirPage /> },
      { path: 'doa', element: <DoaPage /> },
      { path: 'sholat-tracker', element: <SholatTrackerPage /> },
      { path: 'kiblat', element: <KiblatPage /> },
      { path: 'aksesibilitas', element: <AksesibilitasPage /> },
      { path: 'kalender', element: <KalenderPage /> },
      { path: 'asmaul-husna', element: <AsmaulHusnaPage /> },
      { path: 'kisah', element: <KisahPage /> },
      { path: 'kisah/:slug', element: <KisahDetailPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
