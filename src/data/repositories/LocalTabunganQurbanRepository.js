// Repository Perencana Tabungan Qurban di localStorage (data layer).
// Bentuk data: {
//   target: { jenis: 'kambing'|'sapi-bersama'|'sapi-utuh', harga: number } | null,
//   setoran: [{ id, tanggal: 'YYYY-MM-DD', nominal: number }],
// }
// Harga pada target adalah PERKIRAAN yang dipilih/diubah pengguna —
// bukan harga pasar; logika hitungnya ada di
// domain/usecases/hitungTabunganQurban.js.
import { JENIS_QURBAN } from '../../domain/usecases/hitungTabunganQurban.js';
import { kunciHari } from '../../domain/usecases/streakIbadah.js';
import { LocalProfilRepository } from './LocalProfilRepository.js';

const KUNCI = 'noor.tabungan-qurban.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
const kunciAktif = () => LocalProfilRepository.kunciAktif(KUNCI);
const KOSONG = { target: null, setoran: [] };
const POLA_TANGGAL = /^\d{4}-\d{2}-\d{2}$/;

function hargaAman(n) {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : null;
}

function nominalAman(n) {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : null;
}

function targetAman(t) {
  if (!t || typeof t !== 'object') return null;
  if (!JENIS_QURBAN.includes(t.jenis)) return null;
  const harga = hargaAman(t.harga);
  return harga ? { jenis: t.jenis, harga } : null;
}

function setoranAman(s) {
  if (!s || typeof s !== 'object') return null;
  return {
    id: typeof s.id === 'string' && s.id ? s.id : null,
    tanggal: typeof s.tanggal === 'string' && POLA_TANGGAL.test(s.tanggal) ? s.tanggal : null,
    nominal: nominalAman(s.nominal),
  };
}

function normalisasi(parsed) {
  if (!parsed || typeof parsed !== 'object') return { ...KOSONG, setoran: [] };
  const setoran = Array.isArray(parsed.setoran)
    ? parsed.setoran
        .map(setoranAman)
        .filter((s) => s && s.id && s.tanggal && s.nominal !== null)
    : [];
  return { target: targetAman(parsed.target), setoran };
}

let penghitungId = 0;
function buatId() {
  penghitungId += 1;
  return `q${Date.now().toString(36)}-${penghitungId.toString(36)}${Math.floor(
    Math.random() * 1e6,
  ).toString(36)}`;
}

export const LocalTabunganQurbanRepository = {
  load() {
    try {
      const raw = localStorage.getItem(kunciAktif());
      return raw ? normalisasi(JSON.parse(raw)) : { ...KOSONG, setoran: [] };
    } catch {
      return { ...KOSONG, setoran: [] };
    }
  },

  saveSemua(data) {
    try {
      localStorage.setItem(kunciAktif(), JSON.stringify(normalisasi(data)));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
  },

  /**
   * Simpan target tabungan. `null` menghapus target; objek tidak valid
   * (jenis tak dikenal / harga ≤ 0) juga tersimpan sebagai tanpa target.
   * Mengembalikan data terbaru.
   */
  simpanTarget(target) {
    const data = this.load();
    data.target = target === null ? null : targetAman(target);
    this.saveSemua(data);
    return this.load();
  },

  /**
   * Tambah satu setoran (id dibuat di sini bila belum ada; tanggal
   * default hari ini). Setoran tanpa nominal sah (> 0) TIDAK ditambahkan.
   * Mengembalikan data terbaru.
   */
  tambahSetoran(setoranBaru) {
    const data = this.load();
    const aman = setoranAman(setoranBaru);
    if (!aman || aman.nominal === null) return data;
    data.setoran.push({
      id: aman.id ?? buatId(),
      tanggal: aman.tanggal ?? kunciHari(),
      nominal: aman.nominal,
    });
    this.saveSemua(data);
    return this.load();
  },

  /** Hapus setoran berdasarkan id. Mengembalikan data terbaru. */
  hapusSetoran(id) {
    const data = this.load();
    data.setoran = data.setoran.filter((s) => s.id !== id);
    this.saveSemua(data);
    return this.load();
  },
};
