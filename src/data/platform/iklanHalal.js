/**
 * Iklan halal (jaringan pihak ketiga non-Google) — DORMAN secara bawaan.
 *
 * Aktif hanya bila variabel lingkungan VITE_IKLAN_HALAL_URL_SKRIP terisi
 * URL skrip resmi dari jaringan yang dipilih pengelola (mis. HalalSpark
 * menerbitkan satu URL skrip per situs; jaringan lain serupa). Selama
 * kosong, tidak ada skrip yang dimuat dan tidak ada ruang iklan yang
 * dirender — nol biaya untuk pengguna.
 *
 * Penjaga yang sama seperti AdSense di index.html: skrip iklan TIDAK
 * PERNAH dimuat di aplikasi Android (Capacitor/WebView) — di sana iklan
 * berjalan lewat jalur AdMob sukarela yang terpisah.
 *
 * Aturan penempatan (tetap, dari kebijakan produk): tidak di Mode Anak,
 * tidak di halaman baca mushaf/pemutar, tidak mengunci konten ibadah.
 * Panduan aktivasi lengkap: IKLAN-HALAL.md di akar repositori.
 */

export function konfigurasiIklanHalal() {
  const env = import.meta.env || {};
  const url = env.VITE_IKLAN_HALAL_URL_SKRIP;
  return typeof url === 'string' && url.startsWith('https://') ? url : null;
}

export function berjalanDiNative() {
  try {
    const cap = window.Capacitor;
    return !!(
      cap &&
      typeof cap.isNativePlatform === 'function' &&
      cap.isNativePlatform()
    );
  } catch {
    return false;
  }
}

/** True bila slot iklan halal boleh tampil di konteks saat ini. */
export function iklanHalalAktif() {
  return !!konfigurasiIklanHalal() && !berjalanDiNative();
}

let sudahDimuat = false;

/** Suntikkan skrip jaringan iklan (sekali saja per sesi). */
export function muatIklanHalal() {
  const url = konfigurasiIklanHalal();
  if (!url || berjalanDiNative() || sudahDimuat) return false;
  sudahDimuat = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = url;
  s.dataset.iklanHalal = 'nurqalam';
  document.head.appendChild(s);
  return true;
}
