// Repository tracker sholat tersimpan di localStorage (data layer).
const KUNCI = 'noor.sholat-tracker.v1';

export const LocalSholatTrackerRepository = {
  loadSemua() {
    try {
      const raw = localStorage.getItem(KUNCI);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },
  saveSemua(data) {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(data));
    } catch {
      /* abaikan */
    }
  },
};
