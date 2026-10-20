import { useCallback, useEffect, useState } from 'react';

// Posisi baca terakhir tersimpan di localStorage (data layer sederhana).
// Dipakai SurahPage/AyatCard untuk mencatat dan HomePage untuk "Lanjutkan Membaca".
// Bentuk: { surahId, nomorAyat, namaSurah, pada (timestamp ms) }
const KUNCI = 'noor.terakhir-baca.v1';

export function catatAyatTerakhirBaca({ surahId, nomorAyat, namaSurah }) {
  try {
    localStorage.setItem(
      KUNCI,
      JSON.stringify({ surahId, nomorAyat, namaSurah, pada: Date.now() }),
    );
  } catch {
    /* abaikan */
  }
}

export function bacaAyatTerakhir() {
  try {
    const raw = localStorage.getItem(KUNCI);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Hook reaktif: mengembalikan posisi terakhir + fungsi pencatat. */
export function useTerakhirDibaca() {
  const [terakhir, setTerakhir] = useState(() => bacaAyatTerakhir());
  useEffect(() => {
    const segarkan = () => setTerakhir(bacaAyatTerakhir());
    window.addEventListener('focus', segarkan);
    return () => window.removeEventListener('focus', segarkan);
  }, []);
  const catat = useCallback((payload) => {
    catatAyatTerakhirBaca(payload);
    setTerakhir(bacaAyatTerakhir());
  }, []);
  return { terakhir, catat };
}
