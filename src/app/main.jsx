import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import PengaturanProvider from '../presentation/a11y/PengaturanProvider.jsx';
import Aplikasi from './Aplikasi.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PengaturanProvider>
      <Aplikasi />
    </PengaturanProvider>
  </StrictMode>
);

// PWA: daftarkan service worker HANYA pada build production di platform web.
// Di dalam shell native Capacitor service worker tidak dipakai — aset sudah
// terbundel di aplikasi dan pembaruan mengikuti rilis APK.
// Kegagalan pendaftaran tidak boleh mengganggu aplikasi.
if (import.meta.env.PROD && !Capacitor.isNativePlatform() && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* diam-diam: aplikasi tetap berjalan tanpa offline cache */
    });
  });
}
