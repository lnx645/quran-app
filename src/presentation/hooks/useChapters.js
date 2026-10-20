import { useEffect, useState } from 'react';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';

// Hook: muat daftar seluruh 114 surah lewat repository (pola sama dengan useSurah).
export function useChapters() {
  const [state, setState] = useState({ loading: true, error: null, chapters: [] });

  useEffect(() => {
    let batal = false;
    setState({ loading: true, error: null, chapters: [] });
    QuranRepositoryImpl.getChapters()
      .then((chapters) => {
        if (!batal) setState({ loading: false, error: null, chapters });
      })
      .catch((err) => {
        if (!batal) setState({ loading: false, error: err.message, chapters: [] });
      });
    return () => {
      batal = true;
    };
  }, []);

  return state;
}
