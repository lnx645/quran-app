/**
 * Kontrak repository tracker sholat 5 waktu (tersimpan lokal / localStorage).
 * Implementasi: data/repositories/LocalSholatTrackerRepository.js.
 *
 * Data: { [tanggalISO: string]: { Subuh:boolean, Dzuhur:boolean, Ashar:boolean, Maghrib:boolean, Isya:boolean } }
 */
export const SholatTrackerRepository = {
  /** @returns {Object<string, Object<string, boolean>>} */
  loadSemua() {
    throw new Error('SholatTrackerRepository.loadSemua belum diimplementasikan');
  },
  /** @param {Object} data */
  saveSemua(_data) {
    throw new Error('SholatTrackerRepository.saveSemua belum diimplementasikan');
  },
};
