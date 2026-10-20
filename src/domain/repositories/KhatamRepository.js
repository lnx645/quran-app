/**
 * Kontrak repository progres khatam (tersimpan lokal / localStorage).
 * Implementasi: data/repositories/LocalKhatamRepository.js.
 *
 * Progres: { selesai: { [juz:number]: boolean }, targetTanggal: string|null (ISO date) }
 */
export const KhatamRepository = {
  /** @returns {{selesai:Object, targetTanggal:(string|null)}} */
  load() {
    throw new Error('KhatamRepository.load belum diimplementasikan');
  },
  /** @param {{selesai:Object, targetTanggal:(string|null)}} progres */
  save(_progres) {
    throw new Error('KhatamRepository.save belum diimplementasikan');
  },
  reset() {
    throw new Error('KhatamRepository.reset belum diimplementasikan');
  },
};
