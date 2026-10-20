import { createContext, useContext } from 'react';

/**
 * Konteks Toast kustom Noor (pengganti pesan sesaat ala window / toast ad-hoc).
 * Dipakai lewat useToast(): { sukses, error, info, peringatan }.
 * Semua toast dirender ToastProvider dengan role status/alert (aria-live),
 * jadi ikut terumumkan ke screen reader.
 */
export const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast harus dipakai di dalam <ToastProvider>');
  return ctx;
}
