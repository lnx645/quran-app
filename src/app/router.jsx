import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App.jsx';
import HomePage from '../presentation/pages/HomePage.jsx';
import SurahPage from '../presentation/pages/SurahPage.jsx';
import IqroHubPage from '../presentation/pages/IqroHubPage.jsx';
import IqroJilidPage from '../presentation/pages/IqroJilidPage.jsx';
import JadwalPage from '../presentation/pages/JadwalPage.jsx';
import ZakatPage from '../presentation/pages/ZakatPage.jsx';
import KhatamPage from '../presentation/pages/KhatamPage.jsx';
import TasbihPage from '../presentation/pages/TasbihPage.jsx';
import DzikirPage from '../presentation/pages/DzikirPage.jsx';
import DoaPage from '../presentation/pages/DoaPage.jsx';
import SholatTrackerPage from '../presentation/pages/SholatTrackerPage.jsx';
import KiblatPage from '../presentation/pages/KiblatPage.jsx';
import KalenderPage from '../presentation/pages/KalenderPage.jsx';
import AsmaulHusnaPage from '../presentation/pages/AsmaulHusnaPage.jsx';
import KisahPage from '../presentation/pages/KisahPage.jsx';
import KisahDetailPage from '../presentation/pages/KisahDetailPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
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
      { path: 'kalender', element: <KalenderPage /> },
      { path: 'asmaul-husna', element: <AsmaulHusnaPage /> },
      { path: 'kisah', element: <KisahPage /> },
      { path: 'kisah/:slug', element: <KisahDetailPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
