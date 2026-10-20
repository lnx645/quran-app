// Repository buku catatan utang puasa PER TAHUN di localStorage (data layer).
// Fitur ini TERPISAH dari tracker qadha harian (LocalQadhaRepository,
// kunci 'noor.qadha-puasa.v1') — datanya tidak dicampur.
// Bentuk data: {
//   tahun: [{ id, label: string (bebas, mis. 'Ramadhan 1447 H'),
//             totalHari: number (0..366),
//             lunas: { 'YYYY-MM-DD': true } }],
// }
// Sisa utang TIDAK disimpan (turunan) — dihitung di domain
// (hitungUtangPuasa.js: sisa = totalHari - jumlah kunci lunas).
import {
  normalisasiTotalHari,
  petaLunas,
} from '../../domain/usecases/hitungUtangPuasa.js';
import { LocalProfilRepository } from './LocalProfilRepository.js';

const KUNCI = 'noor.utang-puasa.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);
const KOSONG = { tahun: [] };
const POLA_TANGGAL = /^\d{4}-\d{2}-\d{2}$/;

function tahunAman(t) {
  if (!t || typeof t !== 'object') return null;
  if (typeof t.id !== 'string' || !t.id) return null;
  return {
    id: t.id,
    label: typeof t.label === 'string' ? t.label : '',
    totalHari: normalisasiTotalHari(t.totalHari),
    lunas: petaLunas(t),
  };
}

function normalisasi(parsed) {
  if (!parsed || typeof parsed !== 'object') return { tahun: [] };
  const tahun = Array.isArray(parsed.tahun)
    ? parsed.tahun.map(tahunAman).filter((t) => t !== null)
    : [];
  return { tahun };
}

let penghitungId = 0;
function buatId() {
  penghitungId += 1;
  return `u${Date.now().toString(36)}-${penghitungId.toString(36)}${Math.floor(
    Math.random() * 1e6,
  ).toString(36)}`;
}

export const LocalUtangPuasaRepository = {
  load() {
    try {
      const raw = localStorage.getItem(kunciAktif());
      return raw ? normalisasi(JSON.parse(raw)) : { ...KOSONG, tahun: [] };
    } catch {
      return { ...KOSONG, tahun: [] };
    }
  },

  saveSemua(data) {
    try {
      localStorage.setItem(kunciAktif(), JSON.stringify(normalisasi(data)));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
  },

  /** Tambah entri tahun baru. Label kosong / total tidak valid → data tak berubah. */
  tambahTahun(label, totalHari) {
    const data = this.load();
    const labelAman = typeof label === 'string' ? label.trim() : '';
    if (!labelAman) return data;
    data.tahun.push({
      id: buatId(),
      label: labelAman,
      totalHari: normalisasiTotalHari(totalHari),
      lunas: {},
    });
    this.saveSemua(data);
    return this.load();
  },

  /** Hapus satu entri tahun beserta seluruh catatan lunasnya. */
  hapusTahun(id) {
    const data = this.load();
    data.tahun = data.tahun.filter((t) => t.id !== id);
    this.saveSemua(data);
    return this.load();
  },

  /** Ubah total hari utang satu tahun (terpotong ke rentang 0..366). */
  aturTotal(id, totalHari) {
    const data = this.load();
    const t = data.tahun.find((x) => x.id === id);
    if (t) t.totalHari = normalisasiTotalHari(totalHari);
    this.saveSemua(data);
    return this.load();
  },

  /**
   * Tandai / batalkan pelunasan pada satu tanggal.
   * lunas=true menambah kunci tanggal; false menghapusnya.
   * Tanggal tidak valid → data tak berubah.
   */
  tandaiLunas(id, tanggal, lunas) {
    const data = this.load();
    if (typeof tanggal !== 'string' || !POLA_TANGGAL.test(tanggal)) return data;
    const t = data.tahun.find((x) => x.id === id);
    if (!t) return data;
    if (lunas) {
      t.lunas[tanggal] = true;
    } else {
      delete t.lunas[tanggal];
    }
    this.saveSemua(data);
    return this.load();
  },
};
