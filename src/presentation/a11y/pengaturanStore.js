import { createContext, useContext } from 'react';

/**
 * Konteks Pengaturan Aksesibilitas Noor.
 * Lewat useAkses(): { pengaturan, ubah(patch), modeEfektif }.
 * pengaturan: {
 *   modeTema: 'ikut'|'terang'|'gelap'|'kontras',
 *   skalaTeks: 1 | 1.125 | 1.25,       // skala UI (zoom root)
 *   fontDisleksia: boolean,            // Atkinson Hyperlegible untuk teks Latin
 *   kurangiGerakan: boolean,           // paksa matikan animasi (override sistem)
 *   sonifikasi: boolean,               // bunyi panduan kompas (default OFF)
 *   getar: boolean,                    // pola getar (kompas & adzan)
 *   getarAdzan: boolean,               // pola getar khas saat waktu sholat masuk
 * }
 * modeEfektif: 'terang'|'gelap'|'kontras' hasil resolusi modeTema + sistem.
 */
export const PengaturanContext = createContext(null);

export function useAkses() {
  const ctx = useContext(PengaturanContext);
  if (!ctx) throw new Error('useAkses harus dipakai di dalam <PengaturanProvider>');
  return ctx;
}
