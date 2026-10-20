// Repository Muslimah (privasi) tersimpan di localStorage (data layer).
// - Riwayat kalkulasi haid/nifas (data pribadi — hanya tersimpan di perangkat).
// - PIN sederhana sebagai kunci buka halaman kalkulator.
//
import { LocalProfilRepository } from './LocalProfilRepository.js';

// CATATAN: ini hash sederhana (bukan enkripsi kelas bank) — PIN disimpan dalam
// bentuk hash FNV-1a agar teks PIN tidak tersimpan mentah. Cukup untuk privasi
// ringan tingkat perangkat; bukan pengganti kunci kriptografi serius.

// FNV-1a 32-bit → hex. Sengaja sederhana & deterministik (bukan rahasia negara).
function hashPin(pin) {
  let h = 0x811c9dc5;
  const s = `muslimah-pin::${String(pin)}`;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

const KUNCI_RIWAYAT = 'noor.muslimah.riwayat.v1';
// Namespace profil: SEMUA baca/tulis lewat kunciAktif() — profil 'utama'
// memakai kunci dasar persis (data lama), profil lain berakhiran #<id>.
// Riwayat DAN PIN sama-sama data pribadi per profil → keduanya di-namespace
// (PIN profil lain tidak membuka data profil ini).
const kunciAktif = (kunciDasar) => LocalProfilRepository.kunciAktif(kunciDasar);
const KUNCI_PIN = 'noor.muslimah.pinHash.v1';
const MAKS_RIWAYAT = 30;

function baca(kunci, fallback) {
  try {
    const raw = localStorage.getItem(kunci);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function tulis(kunci, nilai) {
  try {
    localStorage.setItem(kunci, JSON.stringify(nilai));
  } catch {
    /* penyimpanan penuh / privat — abaikan */
  }
}

export const LocalMuslimahRepository = {
  // ── Riwayat kalkulasi ──────────────────────────────────────────
  ambilRiwayat() {
    const daftar = baca(kunciAktif(KUNCI_RIWAYAT), []);
    return Array.isArray(daftar) ? daftar : [];
  },
  /** entri: { id, tanggalCatat, jenis, tanggalMulai, tanggalBerhenti,
   *  totalJamDarah, vonis, ringkasan, penjelasan } */
  tambahRiwayat(entri) {
    const daftar = this.ambilRiwayat();
    daftar.unshift({ id: Date.now(), ...entri });
    tulis(kunciAktif(KUNCI_RIWAYAT), daftar.slice(0, MAKS_RIWAYAT));
  },
  hapusRiwayat(id) {
    tulis(
      kunciAktif(KUNCI_RIWAYAT),
      this.ambilRiwayat().filter((e) => e.id !== id),
    );
  },
  kosongkanRiwayat() {
    try {
      localStorage.removeItem(kunciAktif(KUNCI_RIWAYAT));
    } catch {
      /* abaikan */
    }
  },

  // ── PIN kunci kalkulator ───────────────────────────────────────
  pinSudahAda() {
    try {
      return Boolean(localStorage.getItem(kunciAktif(KUNCI_PIN)));
    } catch {
      return false;
    }
  },
  /** Simpan PIN (4–6 digit). */
  simpanPin(pin) {
    const bersih = String(pin).replace(/\D/g, '');
    if (bersih.length < 4 || bersih.length > 6) {
      throw new Error('PIN harus 4–6 digit angka.');
    }
    tulis(kunciAktif(KUNCI_PIN), hashPin(bersih));
  },
  /** true bila cocok dengan hash tersimpan. */
  cekPin(pin) {
    try {
      const tersimpan = localStorage.getItem(kunciAktif(KUNCI_PIN));
      if (!tersimpan) return false;
      return JSON.parse(tersimpan) === hashPin(String(pin));
    } catch {
      return false;
    }
  },
  hapusPin() {
    try {
      localStorage.removeItem(kunciAktif(KUNCI_PIN));
    } catch {
      /* abaikan */
    }
  },
};

export default LocalMuslimahRepository;
