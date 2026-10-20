// Repository progres hafalan (tahfidz) tersimpan di localStorage (data layer).
// Bentuk: { targetPerHari: number, hafal: { [surahId]: number[] }, log: { 'YYYY-MM-DD': string[] } }
// log menyimpan kunci 'surahId:nomorAyat' yang ditandai pada tanggal tersebut.
import { LocalProfilRepository } from './LocalProfilRepository.js';

const KUNCI = 'noor.hafalan.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);
const TARGET_DEFAULT = 5;

function tanggalHariIni() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const t = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${t}`;
}

function bentukAwal() {
  return { targetPerHari: TARGET_DEFAULT, hafal: {}, log: {} };
}

function normalisasi(data) {
  const awal = bentukAwal();
  if (!data || typeof data !== 'object') return awal;
  const target = Number(data.targetPerHari);
  return {
    targetPerHari: Number.isFinite(target) && target > 0 ? Math.floor(target) : TARGET_DEFAULT,
    hafal: data.hafal && typeof data.hafal === 'object' ? data.hafal : {},
    log: data.log && typeof data.log === 'object' ? data.log : {},
  };
}

export const LocalHafalanRepository = {
  KUNCI,
  TARGET_DEFAULT,

  /** Muat seluruh state hafalan (selalu ternormalisasi). */
  muat() {
    try {
      const raw = localStorage.getItem(kunciAktif());
      if (!raw) return bentukAwal();
      return normalisasi(JSON.parse(raw));
    } catch {
      return bentukAwal();
    }
  },

  /** Simpan state penuh (dipakai internal setelah mutasi). */
  simpan(state) {
    try {
      localStorage.setItem(kunciAktif(), JSON.stringify(normalisasi(state)));
    } catch {
      /* abaikan */
    }
  },

  /** Ubah target hafalan harian (jumlah ayat). */
  setTarget(n) {
    const state = this.muat();
    const target = Math.max(1, Math.floor(Number(n) || TARGET_DEFAULT));
    state.targetPerHari = target;
    this.simpan(state);
    return state;
  },

  /** Tandai satu ayat sebagai sudah hafal. */
  tandaiHafal(surahId, nomorAyat) {
    const state = this.muat();
    const sid = String(surahId);
    const no = Number(nomorAyat);
    const daftar = new Set(state.hafal[sid] ?? []);
    const kunci = `${sid}:${no}`;
    const hari = tanggalHariIni();
    const sudahAda = daftar.has(no);
    daftar.add(no);
    state.hafal[sid] = [...daftar].sort((a, b) => a - b);
    if (!sudahAda) {
      const logHari = new Set(state.log[hari] ?? []);
      logHari.add(kunci);
      state.log[hari] = [...logHari];
    }
    this.simpan(state);
    return state;
  },

  /** Batalkan tanda hafal satu ayat (log harian tidak dihapus). */
  batalHafal(surahId, nomorAyat) {
    const state = this.muat();
    const sid = String(surahId);
    const no = Number(nomorAyat);
    const daftar = (state.hafal[sid] ?? []).filter((n) => n !== no);
    if (daftar.length) state.hafal[sid] = daftar;
    else delete state.hafal[sid];
    this.simpan(state);
    return state;
  },

  /** Apakah ayat ini sudah ditandai hafal? */
  sudahHafal(surahId, nomorAyat) {
    const state = this.muat();
    return (state.hafal[String(surahId)] ?? []).includes(Number(nomorAyat));
  },

  /** Progres satu surah: { hafal, total, persen }. */
  progresSurah(surahId, totalAyat) {
    const state = this.muat();
    const hafal = (state.hafal[String(surahId)] ?? []).length;
    const total = Math.max(0, Number(totalAyat) || 0);
    return { hafal, total, persen: total > 0 ? Math.round((hafal / total) * 100) : 0 };
  },

  /** Jumlah ayat yang ditandai hafal hari ini + target. */
  hitunganHariIni() {
    const state = this.muat();
    const hariIni = (state.log[tanggalHariIni()] ?? []).length;
    return { hariIni, target: state.targetPerHari };
  },

  /** Total seluruh ayat yang sudah ditandai hafal (semua surah). */
  totalHafal() {
    const state = this.muat();
    return Object.values(state.hafal).reduce((acc, arr) => acc + arr.length, 0);
  },
};
