// Repository daftar Profil Keluarga Lokal di localStorage (data layer).
//
// Kunci 'noor.profil.v1' TIDAK PERNAH di-namespace — kunci inilah yang
// menentukan namespace semua data lain. Isinya:
//   { aktifId, daftar: [{ id, nama }] }  (bentuk baku: profilKeluarga.js)
//
// KESELAMATAN DATA: repository ini tidak pernah membaca/menulis/menghapus
// kunci data pengguna tanpa akhiran (milik profil 'utama'). Satu-satunya
// penghapusan data terjadi di hapusProfil(): hanya kunci yang berakhiran
// PERSIS `#<idProfil>` milik profil yang dihapus.
import {
  ID_PROFIL_UTAMA,
  MAKS_PROFIL,
  kunciProfil,
  normalisasiDaftarProfil,
  buatIdProfil,
} from '../../domain/usecases/profilKeluarga.js';

const KUNCI_PROFIL = 'noor.profil.v1';

function muatMentah() {
  try {
    const raw = localStorage.getItem(KUNCI_PROFIL);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const LocalProfilRepository = {
  KUNCI_PROFIL,

  /** Daftar profil ternormalisasi (selalu memuat Utama; aktifId selalu sah). */
  load() {
    return normalisasiDaftarProfil(muatMentah());
  },

  /** Simpan daftar profil apa adanya setelah dinormalisasi. */
  simpan(data) {
    const baku = normalisasiDaftarProfil(data);
    try {
      localStorage.setItem(KUNCI_PROFIL, JSON.stringify(baku));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
    return baku;
  },

  /** Tambah profil baru dari nama. Ditolak (data tak berubah) bila penuh/kosong. */
  tambahProfil(nama) {
    const state = this.load();
    const namaBersih = typeof nama === 'string' ? nama.trim() : '';
    if (!namaBersih || state.daftar.length >= MAKS_PROFIL) return state;
    const id = buatIdProfil(namaBersih, state.daftar);
    state.daftar.push({ id, nama: namaBersih.slice(0, 40) });
    return this.simpan(state);
  },

  /** Ganti nama profil (termasuk Utama boleh diganti nama tampilannya). */
  ubahNama(id, nama) {
    const state = this.load();
    const namaBersih = typeof nama === 'string' ? nama.trim().slice(0, 40).trim() : '';
    if (!namaBersih) return state;
    const profil = state.daftar.find((p) => p.id === id);
    if (!profil) return state;
    profil.nama = namaBersih;
    return this.simpan(state);
  },

  /**
   * Hapus profil + seluruh kunci data berakhiran `#<id>` miliknya.
   * DITOLAK (mengembalikan false, tidak ada yang berubah) untuk profil
   * 'utama' dan untuk profil yang sedang aktif.
   */
  hapusProfil(id) {
    const state = this.load();
    if (!id || id === ID_PROFIL_UTAMA || id === state.aktifId) return false;
    if (!state.daftar.some((p) => p.id === id)) return false;
    // Enumerasi aman: kumpulkan dulu semua kunci yang berakhiran PERSIS
    // `#<id>`, baru hapus — tidak pernah menyentuh kunci tanpa akhiran
    // (data profil utama) maupun kunci profil lain.
    try {
      const akhiran = `#${id}`;
      const korban = [];
      for (let i = 0; i < localStorage.length; i += 1) {
        const kunci = localStorage.key(i);
        if (kunci && kunci.endsWith(akhiran)) korban.push(kunci);
      }
      for (const kunci of korban) localStorage.removeItem(kunci);
    } catch {
      /* abaikan — daftar profil tetap diperbarui di bawah */
    }
    state.daftar = state.daftar.filter((p) => p.id !== id);
    this.simpan(state);
    return true;
  },

  /** Jadikan profil ini aktif. Id tak dikenal → data tak berubah. */
  aturAktif(id) {
    const state = this.load();
    if (!state.daftar.some((p) => p.id === id)) return state;
    state.aktifId = id;
    return this.simpan(state);
  },

  /** Profil aktif saat ini: { id, nama }. */
  profilAktif() {
    const state = this.load();
    return state.daftar.find((p) => p.id === state.aktifId) ?? state.daftar[0];
  },

  /**
   * Penolong namespace untuk SEMUA repository/hook data pengguna lain:
   * resolusi kunci dasar → kunci milik profil aktif. Untuk profil 'utama'
   * hasilnya kunci dasar persis (data lama). Kegagalan apa pun → kunci
   * dasar, agar pembacaan tidak pernah putus gara-gara data profil rusak.
   */
  kunciAktif(kunciDasar) {
    try {
      return kunciProfil(kunciDasar, this.load().aktifId);
    } catch {
      return kunciDasar;
    }
  },
};

export default LocalProfilRepository;
