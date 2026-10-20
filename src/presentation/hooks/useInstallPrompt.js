import { useCallback, useEffect, useState } from 'react';

/**
 * Prompt pemasangan PWA (beforeinstallprompt).
 * Expose { bisaInstall, pasang }:
 * - bisaInstall true hanya bila browser menawarkan pemasangan DAN aplikasi
 *   belum berjalan sebagai aplikasi terpasang (display-mode standalone /
 *   navigator.standalone di iOS).
 * - pasang() menampilkan prompt bawaan browser dan mengembalikan hasil
 *   userChoice ('accepted' | 'dismissed' | null bila prompt tak tersedia).
 */
export function useInstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [terpasang, setTerpasang] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onTerpasang = () => {
      setTerpasang(true);
      setDeferred(null);
    };
    const media = window.matchMedia('(display-mode: standalone)');
    const onMedia = (e) => {
      if (e.matches) setTerpasang(true);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onTerpasang);
    media.addEventListener?.('change', onMedia);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onTerpasang);
      media.removeEventListener?.('change', onMedia);
    };
  }, []);

  const pasang = useCallback(async () => {
    if (!deferred) return null;
    try {
      await deferred.prompt();
      const pilihan = await deferred.userChoice;
      if (pilihan?.outcome === 'accepted') setDeferred(null);
      return pilihan?.outcome ?? null;
    } catch {
      return null;
    }
  }, [deferred]);

  return { bisaInstall: Boolean(deferred) && !terpasang, pasang, terpasang };
}

export default useInstallPrompt;
