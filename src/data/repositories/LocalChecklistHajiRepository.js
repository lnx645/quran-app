// Repository checklist perlengkapan haji/umrah di localStorage (data layer).
// Pola sama seperti LocalSholatTrackerRepository: satu kunci versi,
// load/save peta { [idItem]: true } — hanya item tercentang yang disimpan.
import { LocalProfilRepository } from './LocalProfilRepository.js';

const KUNCI = 'noor.checklist-haji.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);

export const LocalChecklistHajiRepository = {
  /** Peta item tercentang: { [id: string]: true }. */
  load() {
    try {
      const raw = localStorage.getItem(kunciAktif());
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  },
  save(peta) {
    try {
      localStorage.setItem(kunciAktif(), JSON.stringify(peta));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
  },
  reset() {
    try {
      localStorage.removeItem(kunciAktif());
    } catch {
      /* abaikan */
    }
  },
};
