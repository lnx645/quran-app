// Repository catatan Sedekah & Infaq di localStorage (data layer).
// Bentuk data: {
//   catatan: [{ id, tanggal: 'YYYY-MM-DD', nominal: number|null,
//               jenis: 'Subuh'|'Jumat'|'Umum'|'Infaq', catatan: string }],
//   targetHarian: number|null, targetBulanan: number|null,
// }
// nominal BOLEH null: pengguna dapat mencatat tanpa menulis jumlah
// (privasi & menjaga keikhlasan) — total uang hanya menjumlahkan yang
// bernominal (lihat domain/usecases/hitungSedekah.js).
import { JENIS_SEDEKAH } from '../../domain/usecases/hitungSedekah.js';
import { kunciHari } from '../../domain/usecases/streakIbadah.js';

const KUNCI = 'noor.sedekah.v1';
const KOSONG = { catatan: [], targetHarian: null, targetBulanan: null };
const POLA_TANGGAL = /^\d{4}-\d{2}-\d{2}$/;

function nominalAman(n) {
  if (n === null || n === undefined || n === '') return null;
  const v = Number(n);
  return Number.isFinite(v) && v >= 0 ? Math.floor(v) : null;
}

function targetAman(n) {
  if (n === null || n === undefined || n === '') return null;
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : null;
}

function catatanAman(c) {
  if (!c || typeof c !== 'object') return null;
  return {
    id: typeof c.id === 'string' && c.id ? c.id : null,
    tanggal: typeof c.tanggal === 'string' && POLA_TANGGAL.test(c.tanggal) ? c.tanggal : null,
    nominal: nominalAman(c.nominal),
    jenis: JENIS_SEDEKAH.includes(c.jenis) ? c.jenis : 'Umum',
    catatan: typeof c.catatan === 'string' ? c.catatan : '',
  };
}

function normalisasi(parsed) {
  if (!parsed || typeof parsed !== 'object') return { ...KOSONG, catatan: [] };
  const catatan = Array.isArray(parsed.catatan)
    ? parsed.catatan.map(catatanAman).filter((c) => c && c.id && c.tanggal)
    : [];
  return {
    catatan,
    targetHarian: targetAman(parsed.targetHarian),
    targetBulanan: targetAman(parsed.targetBulanan),
  };
}

let penghitungId = 0;
function buatId() {
  penghitungId += 1;
  return `s${Date.now().toString(36)}-${penghitungId.toString(36)}${Math.floor(
    Math.random() * 1e6,
  ).toString(36)}`;
}

export const LocalSedekahRepository = {
  load() {
    try {
      const raw = localStorage.getItem(KUNCI);
      return raw ? normalisasi(JSON.parse(raw)) : { ...KOSONG, catatan: [] };
    } catch {
      return { ...KOSONG, catatan: [] };
    }
  },

  saveSemua(data) {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(normalisasi(data)));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
  },

  /** Tambah satu catatan (id dibuat di sini bila belum ada). Mengembalikan data terbaru. */
  tambah(catatanBaru) {
    const data = this.load();
    const aman = catatanAman(catatanBaru) ?? {
      id: null, tanggal: null, nominal: null, jenis: 'Umum', catatan: '',
    };
    const catatan = {
      ...aman,
      id: aman.id ?? buatId(),
      tanggal: aman.tanggal ?? kunciHari(),
    };
    data.catatan.push(catatan);
    this.saveSemua(data);
    return this.load();
  },

  /** Hapus catatan berdasarkan id. Mengembalikan data terbaru. */
  hapus(id) {
    const data = this.load();
    data.catatan = data.catatan.filter((c) => c.id !== id);
    this.saveSemua(data);
    return this.load();
  },

  /**
   * Simpan target. Hanya kunci yang ADA pada argumen yang diubah —
   * nilai null mengosongkan target tersebut. Mengembalikan data terbaru.
   */
  simpanTarget(target) {
    const data = this.load();
    if (target && typeof target === 'object') {
      if (Object.prototype.hasOwnProperty.call(target, 'targetHarian')) {
        data.targetHarian = targetAman(target.targetHarian);
      }
      if (Object.prototype.hasOwnProperty.call(target, 'targetBulanan')) {
        data.targetBulanan = targetAman(target.targetBulanan);
      }
    }
    this.saveSemua(data);
    return this.load();
  },
};
