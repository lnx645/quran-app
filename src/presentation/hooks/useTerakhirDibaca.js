import { useCallback, useEffect, useState } from 'react';
import { LocalProfilRepository } from '../../data/repositories/LocalProfilRepository.js';

// Posisi baca terakhir tersimpan di localStorage (data layer sederhana).
// Dipakai SurahPage/AyatCard untuk mencatat dan HomePage untuk "Lanjutkan Membaca".
// Bentuk: { surahId, nomorAyat, namaSurah, pada (timestamp ms) }
const KUNCI = 'noor.terakhir-baca.v1';

// Namespace profil keluarga: posisi baca terakhir adalah data per profil
// (profil 'utama' = kunci dasar persis; profil lain berakhiran #<id>).
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);

export function catatAyatTerakhirBaca({ surahId, nomorAyat, namaSurah }) {
  try {
    localStorage.setItem(
      kunciAktif(),
      JSON.stringify({ surahId, nomorAyat, namaSurah, pada: Date.now() }),
    );
  } catch {
    /* abaikan */
  }
}

export function bacaAyatTerakhir() {
  try {
    const raw = localStorage.getItem(kunciAktif());
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
