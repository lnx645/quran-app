import { useCallback, useEffect, useState } from 'react';
import { DAFTAR_QARI, RECITER_ALAFASY } from '../../data/quranApi.js';

/**
 * Pilihan qari murottal — disimpan di localStorage `noor.qari.v1`
 * (id recitation Quran.com). Default = RECITER_ALAFASY (7), qari yang
 * selama ini dipakai aplikasi. Id tak dikenal jatuh ke default.
 */
const KUNCI = 'noor.qari.v1';

function muat() {
  try {
    const id = Number(localStorage.getItem(KUNCI));
    return DAFTAR_QARI.some((q) => q.id === id) ? id : RECITER_ALAFASY;
  } catch {
    return RECITER_ALAFASY;
  }
}

export function useQari() {
  const [qari, setQari] = useState(muat);

  useEffect(() => {
    try {
      localStorage.setItem(KUNCI, String(qari));
    } catch {
      /* abaikan: penyimpanan tidak tersedia */
    }
  }, [qari]);

  const ubahQari = useCallback((id) => {
    const n = Number(id);
    if (DAFTAR_QARI.some((q) => q.id === n)) setQari(n);
  }, []);

  return { qari, ubahQari };
}
