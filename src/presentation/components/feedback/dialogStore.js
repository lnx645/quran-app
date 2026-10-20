import { createContext, useContext } from 'react';

/**
 * Konteks Dialog kustom Noor (pengganti window.alert / window.confirm).
 * API berbasis promise lewat useDialog():
 *   await dialog.alert({ judul, pesan })                       → void
 *   await dialog.confirm({ judul, pesan, teksYa, teksTidak, bahaya }) → boolean
 */
export const DialogContext = createContext(null);

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog harus dipakai di dalam <DialogProvider>');
  return ctx;
}
