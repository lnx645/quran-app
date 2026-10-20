import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PengaturanProvider from '../presentation/a11y/PengaturanProvider.jsx';
import Aplikasi from './Aplikasi.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PengaturanProvider>
      <Aplikasi />
    </PengaturanProvider>
  </StrictMode>
);

// PWA: daftarkan service worker HANYA pada build production.
// Kegagalan pendaftaran tidak boleh mengganggu aplikasi.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* diam-diam: aplikasi tetap berjalan tanpa offline cache */
    });
  });
}
