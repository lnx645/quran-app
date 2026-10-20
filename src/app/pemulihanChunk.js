import { lazy } from 'react';

/**
 * Pemulihan chunk basi (stale chunk) setelah deploy baru.
 *
 * Masalah: shell aplikasi lama (tertahan service worker / cache peramban)
 * meminta chunk lazy dengan nama hash lama. Server SPA menjawab permintaan
 * itu dengan index.html (200 text/html) karena berkasnya sudah tidak ada,
 * sehingga dynamic import() gagal dan pengguna menabrak HalamanGalat.
 *
 * Pola pemulihan standar: muat ulang SEKALI untuk mengambil shell terbaru.
 * Penanda di sessionStorage (berlaku 15 detik) mencegah loop reload tanpa
 * akhir — bila import tetap gagal setelah satu kali pemulihan, galat
 * diteruskan ke ErrorBoundary seperti biasa.
 */

export const KUNCI_PENANDA_PEMULIHAN = 'noor.pemulihanChunk';
const JENDELA_PENANDA_MS = 15_000;

const POLA_GALAT_CHUNK =
  /ChunkLoadError|dynamically imported module|Importing a module script failed|Failed to fetch/i;

/** True bila sebuah galat tampak seperti galat muat chunk/module. */
export function adalahGalatChunk(galat) {
  if (!galat) return false;
  const pesan = galat.message || String(galat);
  return POLA_GALAT_CHUNK.test(pesan);
}

/** True bila penanda pemulihan dipasang dalam 15 detik terakhir. */
export function penandaPemulihanBaruSaja() {
  try {
    const t = Number(sessionStorage.getItem(KUNCI_PENANDA_PEMULIHAN));
    return Number.isFinite(t) && t > 0 && Date.now() - t < JENDELA_PENANDA_MS;
  } catch {
    return false;
  }
}

/** Pasang penanda pemulihan (timestamp sekarang). */
export function pasangPenandaPemulihan() {
  try {
    sessionStorage.setItem(KUNCI_PENANDA_PEMULIHAN, String(Date.now()));
  } catch {
    /* abaikan: mode privat dapat menolak sessionStorage */
  }
}

/** Hapus penanda pemulihan (dipanggil setelah import berhasil). */
export function hapusPenandaPemulihan() {
  try {
    sessionStorage.removeItem(KUNCI_PENANDA_PEMULIHAN);
  } catch {
    /* abaikan */
  }
}

/**
 * Pembungkus React.lazy yang tahan deploy: bila import() menolak (galat
 * chunk atau galat muat apa pun dari importer) dan belum ada pemulihan
 * dalam 15 detik terakhir → pasang penanda lalu reload sekali; promise
 * yang tak pernah selesai dikembalikan agar React tidak menampilkan
 * fallback galat selama reload berlangsung. Bila penanda masih segar →
 * galat dilempar (ErrorBoundary tampil). Import yang sukses menghapus
 * penanda.
 */
export function lazyDenganPemulihan(importer) {
  return lazy(async () => {
    try {
      const modul = await importer();
      hapusPenandaPemulihan();
      return modul;
    } catch (galat) {
      if (!penandaPemulihanBaruSaja()) {
        pasangPenandaPemulihan();
        window.location.reload();
        return new Promise(() => {});
      }
      throw galat;
    }
  });
}
