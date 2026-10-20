import { useEffect, useState } from 'react';
import { JadwalRepositoryImpl } from '../../data/repositories/JadwalRepositoryImpl.js';

// Hook: jadwal sholat hari ini untuk kota terpilih, lewat repository.
export const KOTA_OPSI = ['Sumedang', 'Bandung', 'Jakarta', 'Surabaya', 'Medan'];

export function useJadwal(kota) {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let batal = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    JadwalRepositoryImpl.getJadwalHarian(kota, new Date())
      .then((data) => {
        if (!batal) setState({ loading: false, error: null, data });
      })
      .catch((err) => {
        if (!batal) setState({ loading: false, error: err.message, data: null });
      });
    return () => {
      batal = true;
    };
  }, [kota]);

  return state;
}
