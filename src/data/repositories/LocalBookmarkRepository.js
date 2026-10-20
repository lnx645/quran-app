// Repository bookmark ayat + catatan tersimpan di localStorage (data layer).
// Kontrak ini dipakai AyatCard (tombol bookmark) dan BookmarkPage (daftar).
// Item: { key: 'surahId:nomorAyat', surahId, nomorAyat, namaSurah,
//         teksArab, terjemahan, catatan, dibuatPada (ISO string) }
import { LocalProfilRepository } from './LocalProfilRepository.js';

const KUNCI = 'noor.bookmark.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);

function loadSemua() {
  try {
    const raw = localStorage.getItem(kunciAktif());
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveSemua(data) {
  try {
    localStorage.setItem(kunciAktif(), JSON.stringify(data));
  } catch {
    /* abaikan */
  }
}

export const LocalBookmarkRepository = {
  /** Seluruh bookmark, terbaru di depan. */
  daftarBookmark() {
    return loadSemua();
  },
  adaBookmark(key) {
    return loadSemua().some((b) => b.key === key);
  },
  tambahBookmark(item) {
    const semua = loadSemua().filter((b) => b.key !== item.key);
    semua.unshift({ catatan: '', ...item, dibuatPada: new Date().toISOString() });
    saveSemua(semua);
    return semua;
  },
  hapusBookmark(key) {
    const semua = loadSemua().filter((b) => b.key !== key);
    saveSemua(semua);
    return semua;
  },
  perbaruiCatatan(key, catatan) {
    const semua = loadSemua().map((b) => (b.key === key ? { ...b, catatan } : b));
    saveSemua(semua);
    return semua;
  },
};
