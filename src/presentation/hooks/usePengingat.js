import { useCallback, useEffect, useState } from 'react';
import {
  DEFINISI_PENGINGAT,
  definisiPengingat,
  kunciTanggalLokal,
  normalisasiPrefPengingat,
  tentukanPengingatJatuhTempo,
} from '../../domain/usecases/pengingatIbadah.js';
import {
  adalahPlatformNative,
  cekIzinNotifikasiNative,
  daftarkanAksiKlikNative,
  mintaIzinNotifikasiNative,
  sinkronkanPengingatNative,
} from '../../data/platform/pengingatNative.js';

/**
 * usePengingat — pengingat ibadah lokal Noor (Gelombang 6, item 6).
 *
 * Preferensi tersimpan di localStorage `noor.pengingat.v1`:
 *   { dzikirPagi: bool, dzikirPetang: bool, targetBaca: bool } (bawaan semua false)
 * Status izin TIDAK disimpan terpisah — selalu dibaca langsung dari
 * Notification.permission.
 *
 * Rekaman tembakan terakhir di localStorage `noor.pengingat.terakhir.v1`:
 *   { [kunciJenis]: 'YYYY-MM-DD' } — dedupe agar tiap pengingat hanya
 *   tampil sekali per hari.
 *
 * JUJUR: di platform WEB pengingat hanya bisa tampil selama aplikasi/
 * peramban terbuka di perangkat ini (tidak ada server/push) — tidak ada
 * penjadwalan latar belakang saat aplikasi tertutup total.
 *
 * Di shell NATIVE (Capacitor) penjadwalan diserahkan ke sistem Android
 * lewat lapisan data/platform (pengingatNative): notifikasi berulang
 * harian yang tetap berbunyi walau aplikasi ditutup. Mesin timer web di
 * bawah ini tidak berjalan di native.
 */

export const KUNCI_PREF_PENGINGAT = 'noor.pengingat.v1';
export const KUNCI_TERAKHIR_PENGINGAT = 'noor.pengingat.terakhir.v1';

// Interval pemeriksaan penjadwalan: 45 detik (rentang yang diminta 30–60 dtk).
const INTERVAL_PERIKSA_MS = 45_000;

export function didukungNotifikasi() {
  if (adalahPlatformNative()) return true;
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function bacaPrefPengingat() {
  try {
    return normalisasiPrefPengingat(
      JSON.parse(localStorage.getItem(KUNCI_PREF_PENGINGAT) ?? '{}'),
    );
  } catch {
    return normalisasiPrefPengingat(null);
  }
}

function simpanPrefPengingat(pref) {
  try {
    localStorage.setItem(KUNCI_PREF_PENGINGAT, JSON.stringify(pref));
  } catch {
    /* penyimpanan tidak tersedia — pilihan berlaku sesi ini saja */
  }
}

export function bacaTerakhirPengingat() {
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI_TERAKHIR_PENGINGAT) ?? '{}');
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

function catatTerakhirPengingat(kunci, tanggalKunci) {
  try {
    const terakhir = bacaTerakhirPengingat();
    terakhir[kunci] = tanggalKunci;
    localStorage.setItem(KUNCI_TERAKHIR_PENGINGAT, JSON.stringify(terakhir));
  } catch {
    /* abaikan: dedupe sesi ini tetap dijaga pemanggil */
  }
}

/**
 * Tembakkan satu notifikasi untuk sebuah definisi pengingat.
 * Diutamakan lewat Service Worker (registration.showNotification) agar klik
 * ditangani handler `notificationclick` di sw.js (membuka data.url);
 * fallback ke `new Notification` dengan onclick fokus + navigasi.
 */
export async function tembakNotifikasiPengingat(def) {
  // Di native, notifikasi ditembakkan penjadwal sistem — bukan dari sini.
  if (adalahPlatformNative()) return false;
  if (!def || !didukungNotifikasi()) return false;
  if (Notification.permission !== 'granted') return false;

  const opsi = {
    body: def.isi,
    tag: `noor-pengingat-${def.kunci}`,
    data: { url: def.url },
  };

  try {
    const registrasi = await navigator.serviceWorker?.getRegistration?.();
    if (registrasi && typeof registrasi.showNotification === 'function') {
      await registrasi.showNotification(def.judul, opsi);
      return true;
    }
  } catch {
    /* lanjut ke fallback Notification biasa */
  }

  try {
    const notif = new Notification(def.judul, opsi);
    notif.onclick = () => {
      try {
        window.focus();
      } catch {
        /* abaikan */
      }
      window.location.assign(def.url);
      notif.close();
    };
    return true;
  } catch {
    return false;
  }
}

/**
 * Periksa jatuh tempo sekali: untuk tiap pengingat aktif yang sudah lewat
 * jam targetnya hari ini dan belum ditembakkan hari ini, catat dedupe
 * TERLEBIH DAHULU (agar interval + visibilitychange yang berbarengan tidak
 * menembak dobel), lalu tampilkan notifikasinya.
 * Diam total (tanpa error) bila izin bukan 'granted'.
 */
export async function periksaPengingatSekarang(sekarang = new Date()) {
  // Di native, penjadwal sistem yang bekerja — pemeriksaan web dilewati.
  if (adalahPlatformNative()) return [];
  if (!didukungNotifikasi()) return [];
  if (Notification.permission !== 'granted') return [];

  const pref = bacaPrefPengingat();
  const terakhir = bacaTerakhirPengingat();
  const jatuhTempo = tentukanPengingatJatuhTempo(pref, sekarang, terakhir);
  const hariIni = kunciTanggalLokal(sekarang);

  const ditembak = [];
  for (const kunci of jatuhTempo) {
    const def = definisiPengingat(kunci);
    if (!def) continue;
    // Catat SEBELUM menembak: bila dua pemeriksaan berjalan berbarengan,
    // yang kedua sudah melihat tanggal hari ini dan tidak menembak ulang.
    catatTerakhirPengingat(kunci, hariIni);
    // eslint-disable-next-line no-await-in-loop
    const ok = await tembakNotifikasiPengingat(def);
    if (ok) ditembak.push(kunci);
  }
  return ditembak;
}

/**
 * Hook pengaturan pengingat (dipakai UI JadwalPage):
 * pref + ubah per jenis + status izin + minta izin.
 */
export function usePengingat() {
  const [native] = useState(adalahPlatformNative);
  const [pref, setPref] = useState(bacaPrefPengingat);
  const [didukung] = useState(didukungNotifikasi);
  const [izin, setIzin] = useState(() => {
    if (native) return 'default'; // dibaca asinkron dari plugin di efek bawah
    return didukungNotifikasi() ? Notification.permission : 'tidak-didukung';
  });

  // Status izin native diketahui asinkron lewat plugin.
  useEffect(() => {
    if (!native) return undefined;
    let batal = false;
    cekIzinNotifikasiNative().then((hasil) => {
      if (!batal) setIzin(hasil);
    });
    return () => {
      batal = true;
    };
  }, [native]);

  const ubah = useCallback(
    (kunci, nilai) => {
      setPref((lama) => {
        const baru = { ...lama, [kunci]: Boolean(nilai) };
        simpanPrefPengingat(baru);
        // Native: sakelar berubah → samakan jadwal sistem (batalkan id lama,
        // jadwalkan ulang yang aktif). Berjalan di latar, diam bila gagal.
        if (native) {
          sinkronkanPengingatNative(baru).catch(() => {});
        }
        return baru;
      });
    },
    [native],
  );

  const mintaIzin = useCallback(async () => {
    if (native) {
      const hasil = await mintaIzinNotifikasiNative();
      setIzin(hasil);
      // Izin baru diberikan → terapkan pref yang tersimpan ke jadwal sistem.
      if (hasil === 'granted') {
        sinkronkanPengingatNative(bacaPrefPengingat()).catch(() => {});
      }
      return hasil;
    }
    if (!didukungNotifikasi()) return 'tidak-didukung';
    try {
      const hasil = await Notification.requestPermission();
      setIzin(hasil);
      return hasil;
    } catch {
      // API lama berbasis callback — baca ulang permission apa adanya.
      const hasil = Notification.permission;
      setIzin(hasil);
      return hasil;
    }
  }, [native]);

  return { pref, ubah, izin, didukung, mintaIzin, definisi: DEFINISI_PENGINGAT, native };
}

/**
 * Mesin penjadwalan pengingat — pasang SEKALI untuk seluruh aplikasi
 * (lewat komponen PengingatRunner di App). Memeriksa saat mount, tiap
 * 45 detik, dan setiap tab kembali aktif (visibilitychange), karena timer
 * tab latar bisa ditunda peramban.
 */
export function usePengingatRunner() {
  useEffect(() => {
    // Native: serahkan ke penjadwal sistem Android. Samakan jadwal dengan
    // pref tersimpan (idempoten) dan daftarkan penangan ketukan notifikasi.
    // Mesin interval web di bawah TIDAK berjalan di native.
    if (adalahPlatformNative()) {
      sinkronkanPengingatNative(bacaPrefPengingat()).catch(() => {});
      daftarkanAksiKlikNative().catch(() => {});
      return undefined;
    }

    let batal = false;

    const periksa = () => {
      if (batal) return;
      periksaPengingatSekarang().catch(() => {
        /* pemeriksaan gagal diam-diam; interval berikutnya mencoba lagi */
      });
    };

    periksa();
    const id = setInterval(periksa, INTERVAL_PERIKSA_MS);

    const saatVisibilitas = () => {
      if (document.visibilityState === 'visible') periksa();
    };
    document.addEventListener('visibilitychange', saatVisibilitas);

    return () => {
      batal = true;
      clearInterval(id);
      document.removeEventListener('visibilitychange', saatVisibilitas);
    };
  }, []);
}
