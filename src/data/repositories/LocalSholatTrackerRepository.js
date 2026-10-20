// Repository tracker sholat tersimpan di localStorage (data layer).
const KUNCI = 'noor.sholat-tracker.v1';

export const LocalSholatTrackerRepository = {
  loadSemua() {
    try {
      const raw = localStorage.getItem(KUNCI);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      // Defensif: data lama/rusak (null, angka, string, array) → {} agar
      // konsumen yang mengindeks per tanggal tidak pernah melempar.
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? parsed
        : {};
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
