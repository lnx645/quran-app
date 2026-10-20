// Repository tracker sholat tersimpan di localStorage (data layer).
import { LocalProfilRepository } from './LocalProfilRepository.js';

const KUNCI = 'noor.sholat-tracker.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);

export const LocalSholatTrackerRepository = {
  loadSemua() {
    try {
      const raw = localStorage.getItem(kunciAktif());
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
      localStorage.setItem(kunciAktif(), JSON.stringify(data));
    } catch {
      /* abaikan */
    }
  },
};
