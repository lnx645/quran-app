import { useCallback, useEffect, useMemo, useState } from 'react';
import { PengaturanContext } from './pengaturanStore.js';

const KUNCI = 'noor.akses.v1';

const BAWAAN = {
  modeTema: 'ikut',
  skalaTeks: 1,
  fontDisleksia: false,
  kurangiGerakan: false,
  sonifikasi: false,
  getar: true,
  getarAdzan: true,
};

function muat() {
  try {
    const mentah = localStorage.getItem(KUNCI);
    if (!mentah) return BAWAAN;
    const data = JSON.parse(mentah);
    return {
      modeTema: ['ikut', 'terang', 'gelap', 'kontras'].includes(data.modeTema)
        ? data.modeTema
        : 'ikut',
      skalaTeks: [1, 1.125, 1.25].includes(Number(data.skalaTeks)) ? Number(data.skalaTeks) : 1,
      fontDisleksia: Boolean(data.fontDisleksia),
      kurangiGerakan: Boolean(data.kurangiGerakan),
      sonifikasi: Boolean(data.sonifikasi),
      getar: data.getar !== false,
      getarAdzan: data.getarAdzan !== false,
    };
  } catch {
    return BAWAAN;
  }
}

function sistemGelap() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

function resolusiMode(modeTema) {
  if (modeTema === 'gelap' || modeTema === 'kontras' || modeTema === 'terang') return modeTema;
  return sistemGelap() ? 'gelap' : 'terang';
}

/**
 * PengaturanProvider — sumber kebenaran preferensi aksesibilitas.
 * Tersimpan di localStorage; menghormati prefers-color-scheme sebagai
 * bawaan awal; menerapkan kelas kurangi-gerakan & zoom root.
 */
export default function PengaturanProvider({ children }) {
  const [pengaturan, setPengaturan] = useState(muat);
  const [modeEfektif, setModeEfektif] = useState(() => resolusiMode(muat().modeTema));

  const ubah = useCallback((patch) => setPengaturan((p) => ({ ...p, ...patch })), []);

  // Simpan + resolusi mode setiap pengaturan berubah.
  useEffect(() => {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(pengaturan));
    } catch {
      /* penyimpanan tidak tersedia */
    }
    setModeEfektif(resolusiMode(pengaturan.modeTema));
  }, [pengaturan]);

  // Ikuti perubahan skema warna sistem selama mode = 'ikut'.
  useEffect(() => {
    if (pengaturan.modeTema !== 'ikut' || typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setModeEfektif(mq.matches ? 'gelap' : 'terang');
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, [pengaturan.modeTema]);

  // Override kurangi-gerakan: kelas global di <html>.
  useEffect(() => {
    document.documentElement.classList.toggle('noor-kurangi-gerakan', pengaturan.kurangiGerakan);
  }, [pengaturan.kurangiGerakan]);

  // Skala teks UI: zoom root (didukung Chrome/Edge/Safari & Firefox ≥126).
  useEffect(() => {
    const akar = document.getElementById('root');
    if (akar) akar.style.zoom = pengaturan.skalaTeks !== 1 ? String(pengaturan.skalaTeks) : '';
  }, [pengaturan.skalaTeks]);

  const nilai = useMemo(
    () => ({ pengaturan, ubah, modeEfektif }),
    [pengaturan, ubah, modeEfektif],
  );

  return <PengaturanContext.Provider value={nilai}>{children}</PengaturanContext.Provider>;
}
