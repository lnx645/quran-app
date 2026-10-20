// Repository tracker tarawih tersimpan di localStorage (data layer).
// Kunci `noor.tarawih.v1`, terstruktur per tahun Hijriah:
// { "1448": { "1": true, "2": true, ... }, ... } — malam ke-N Ramadan.
import { LocalProfilRepository } from './LocalProfilRepository.js';

const KUNCI = 'noor.tarawih.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);

function loadSemua() {
  try {
    const raw = localStorage.getItem(kunciAktif());
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export const LocalTarawihRepository = {
  loadSemua,
  /** Peta malam tercentang untuk satu tahun Hijriah: { [malam:number]: true }. */
  loadTahun(tahunHijriah) {
    const semua = loadSemua();
    const tahun = semua[String(tahunHijriah)];
    return tahun && typeof tahun === 'object' ? tahun : {};
  },
  saveTahun(tahunHijriah, malamMap) {
    try {
      const semua = loadSemua();
      semua[String(tahunHijriah)] = malamMap;
      localStorage.setItem(kunciAktif(), JSON.stringify(semua));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
  },
};
