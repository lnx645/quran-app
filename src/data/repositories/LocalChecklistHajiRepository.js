// Repository checklist perlengkapan haji/umrah di localStorage (data layer).
// Pola sama seperti LocalSholatTrackerRepository: satu kunci versi,
// load/save peta { [idItem]: true } — hanya item tercentang yang disimpan.
const KUNCI = 'noor.checklist-haji.v1';

export const LocalChecklistHajiRepository = {
  /** Peta item tercentang: { [id: string]: true }. */
  load() {
    try {
      const raw = localStorage.getItem(KUNCI);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  },
  save(peta) {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(peta));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
  },
  reset() {
    try {
      localStorage.removeItem(KUNCI);
    } catch {
      /* abaikan */
    }
  },
};
