// Repository Jurnal Syukur harian di localStorage (data layer).
// Bentuk data: {
//   'YYYY-MM-DD': { syukur: [string, string, string], refleksi: string }
// }
// — tiga hal yang disyukuri pada tanggal itu + satu refleksi bebas.
// Semua pembacaan defensif: data rusak / bentuk tak dikenal dinormalisasi
// menjadi entri kosong, tidak pernah melempar ke pemanggil (pola sama
// dengan LocalMutabaahRepository & LocalSedekahRepository).
import { LocalProfilRepository } from './LocalProfilRepository.js';
const KUNCI = 'noor.jurnal-syukur.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);
const POLA_TANGGAL = /^\d{4}-\d{2}-\d{2}$/;

function teksAman(v) {
  return typeof v === 'string' ? v : '';
}

function entriAman(entri) {
  if (!entri || typeof entri !== 'object' || Array.isArray(entri)) return null;
  const mentah = Array.isArray(entri.syukur) ? entri.syukur : [];
  return {
    syukur: [teksAman(mentah[0]), teksAman(mentah[1]), teksAman(mentah[2])],
    refleksi: teksAman(entri.refleksi),
  };
}

function entriKosong() {
  return { syukur: ['', '', ''], refleksi: '' };
}

function entriTerisi(entri) {
  if (!entri) return false;
  return entri.syukur.some((s) => s.trim() !== '') || entri.refleksi.trim() !== '';
}

function normalisasi(parsed) {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
  const hasil = {};
  for (const [kunci, entri] of Object.entries(parsed)) {
    if (!POLA_TANGGAL.test(kunci)) continue;
    const aman = entriAman(entri);
    if (aman && entriTerisi(aman)) hasil[kunci] = aman;
  }
  return hasil;
}

export const LocalJurnalSyukurRepository = {
  /** Muat seluruh jurnal: { 'YYYY-MM-DD': { syukur, refleksi } }. */
  loadSemua() {
    try {
      const raw = localStorage.getItem(kunciAktif());
      return raw ? normalisasi(JSON.parse(raw)) : {};
    } catch {
      return {};
    }
  },

  /** Muat satu tanggal; tanggal kosong/tidak ada → entri kosong. */
  loadTanggal(kunci) {
    if (typeof kunci !== 'string' || !POLA_TANGGAL.test(kunci)) return entriKosong();
    return this.loadSemua()[kunci] ?? entriKosong();
  },

  /**
   * Simpan entri satu tanggal. Entri yang seluruhnya kosong menghapus
   * tanggal itu (jurnal tidak menyimpan hari kosong). Mengembalikan
   * seluruh data terbaru.
   */
  simpanTanggal(kunci, entri) {
    if (typeof kunci !== 'string' || !POLA_TANGGAL.test(kunci)) return this.loadSemua();
    const aman = entriAman(entri) ?? entriKosong();
    const semua = this.loadSemua();
    if (entriTerisi(aman)) {
      semua[kunci] = aman;
    } else {
      delete semua[kunci];
    }
    try {
      localStorage.setItem(kunciAktif(), JSON.stringify(semua));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
    return this.loadSemua();
  },

  /** Hapus entri satu tanggal. Mengembalikan seluruh data terbaru. */
  hapusTanggal(kunci) {
    if (typeof kunci !== 'string' || !POLA_TANGGAL.test(kunci)) return this.loadSemua();
    const semua = this.loadSemua();
    delete semua[kunci];
    try {
      localStorage.setItem(kunciAktif(), JSON.stringify(semua));
    } catch {
      /* abaikan */
    }
    return this.loadSemua();
  },
};

export default LocalJurnalSyukurRepository;
