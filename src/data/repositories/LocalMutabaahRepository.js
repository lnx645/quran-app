// Repository mutaba'ah yaumiyah (checklist amal harian) di localStorage (data layer).
// Bentuk data: { 'YYYY-MM-DD': { subuh: true, dzuhur: true, ..., tilawah: 4 } }
// — kunci boolean untuk centang amal, 'tilawah' berupa angka halaman yang dibaca.
const KUNCI = 'noor.mutabaah.v1';

export const LocalMutabaahRepository = {
  loadSemua() {
    try {
      const raw = localStorage.getItem(KUNCI);
      const data = raw ? JSON.parse(raw) : {};
      return data && typeof data === 'object' ? data : {};
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
