import { useEffect, useState } from 'react';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';

// Hook: muat detail surah (info + ayat + audio+timing) lewat repository.
export function useSurah(surahId) {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let batal = false;
    setState({ loading: true, error: null, data: null });
    QuranRepositoryImpl.getSurahDetail(Number(surahId))
      .then((data) => {
        if (!batal) setState({ loading: false, error: null, data });
      })
      .catch((err) => {
        if (!batal) setState({ loading: false, error: err.message, data: null });
      });
    return () => {
      batal = true;
    };
  }, [surahId]);

  return state;
}
