/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';

// Gaya sembunyi-visual: tetap bisa dibaca screen reader, tak terlihat mata.
const SEMBUNYI = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

/**
 * LiveRegion — dua wilayah aria-live global (polite & assertive).
 * Mendengarkan CustomEvent 'noor-umumkan' dari helper umumkan().
 */
export default function LiveRegion() {
  const [sopan, setSopan] = useState('');
  const [tegas, setTegas] = useState('');

  useEffect(() => {
    let timer;
    const handler = (e) => {
      const { pesan, prioritas } = e.detail ?? {};
      if (!pesan) return;
      const set = prioritas === 'tegas' ? setTegas : setSopan;
      // Kosongkan dulu lalu isi pada tick berikutnya agar pesan yang sama
      // pun tetap terumumkan ulang oleh screen reader.
      set('');
      clearTimeout(timer);
      timer = setTimeout(() => set(pesan), 60);
    };
    window.addEventListener('noor-umumkan', handler);
    return () => {
      window.removeEventListener('noor-umumkan', handler);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div aria-live="polite" role="status" style={SEMBUNYI}>
        {sopan}
      </div>
      <div aria-live="assertive" role="alert" style={SEMBUNYI}>
        {tegas}
      </div>
    </>
  );
}
