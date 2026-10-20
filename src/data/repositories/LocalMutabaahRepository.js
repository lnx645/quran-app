// Repository mutaba'ah yaumiyah (checklist amal harian) di localStorage (data layer).
// Bentuk data: { 'YYYY-MM-DD': { subuh: true, dzuhur: true, ..., tilawah: 4 } }
// — kunci boolean untuk centang amal, 'tilawah' berupa angka halaman yang dibaca.
import { LocalProfilRepository } from './LocalProfilRepository.js';

const KUNCI = 'noor.mutabaah.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);

export const LocalMutabaahRepository = {
  loadSemua() {
    try {
      const raw = localStorage.getItem(kunciAktif());
      const data = raw ? JSON.parse(raw) : {};
      return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
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
