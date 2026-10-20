import { useCallback, useEffect, useState } from 'react';

/**
 * Preferensi baca halaman SurahPage — disimpan di localStorage:
 * - arabSize: ukuran font Arab (px) 26–46
 * - latin: tampilkan transliterasi latin per kata (default: tersembunyi)
 * - terjemah: tampilkan terjemahan (default: tampil)
 */
const KUNCI = 'noor.prefBaca.v1';
const BAWAAN = { arabSize: 32, latin: false, terjemah: true };

function muat() {
  try {
    const mentah = localStorage.getItem(KUNCI);
    if (!mentah) return BAWAAN;
    const data = JSON.parse(mentah);
    return {
      arabSize: Math.min(46, Math.max(26, Number(data.arabSize) || BAWAAN.arabSize)),
      latin: Boolean(data.latin),
      terjemah: data.terjemah !== false,
    };
  } catch {
    return BAWAAN;
  }
}

export function useReadingPrefs() {
  const [pref, setPref] = useState(muat);

  useEffect(() => {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(pref));
    } catch {
      /* abaikan: penyimpanan tidak tersedia */
    }
  }, [pref]);

  const ubah = useCallback((patch) => setPref((p) => ({ ...p, ...patch })), []);
  const tambahArab = useCallback(
    () => setPref((p) => ({ ...p, arabSize: Math.min(46, p.arabSize + 2) })),
    []
  );
  const kurangArab = useCallback(
    () => setPref((p) => ({ ...p, arabSize: Math.max(26, p.arabSize - 2) })),
    []
  );

  return { pref, ubah, tambahArab, kurangArab };
}
