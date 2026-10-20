import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { DEFINISI_PENGINGAT } from '../../domain/usecases/pengingatIbadah.js';

/**
 * Adaptor notifikasi native (lapisan data/platform).
 *
 * Di dalam shell Capacitor, pengingat ibadah dijadwalkan ke penjadwal
 * sistem Android lewat @capacitor/local-notifications: notifikasi
 * berulang harian yang TETAP berbunyi walau aplikasi ditutup (dan pulih
 * setelah perangkat dinyalakan ulang, berkat receiver plugin).
 *
 * Id notifikasi STABIL per jenis pengingat agar sinkronisasi bersifat
 * idempoten: batalkan id lama lalu jadwalkan ulang sesuai pref terbaru.
 *
 * Modul ini hanya dipanggil bila `adalahPlatformNative()` benar; jalur
 * web (Notification API + timer) hidup di hooks/usePengingat.js.
 */

export function adalahPlatformNative() {
  return Capacitor.isNativePlatform();
}

/** Id notifikasi Android per kunci jenis pengingat (stabil, jangan diubah). */
export const ID_NOTIFIKASI_PENGINGAT = {
  dzikirPagi: 101,
  dzikirPetang: 102,
  targetBaca: 103,
};

function petakanIzin(display) {
  if (display === 'granted') return 'granted';
  if (display === 'denied') return 'denied';
  return 'default'; // 'prompt' / 'prompt-with-rationale'
}

/** Status izin notifikasi native → kosakata izin yang sama dengan web. */
export async function cekIzinNotifikasiNative() {
  try {
    const status = await LocalNotifications.checkPermissions();
    return petakanIzin(status.display);
  } catch {
    return 'default';
  }
}

/** Minta izin notifikasi native; kembalikan status sesudahnya. */
export async function mintaIzinNotifikasiNative() {
  try {
    const status = await LocalNotifications.requestPermissions();
    return petakanIzin(status.display);
  } catch {
    return cekIzinNotifikasiNative();
  }
}

/**
 * Samakan jadwal notifikasi sistem dengan pref pengingat:
 * batalkan ketiga id stabil, lalu jadwalkan ulang yang aktif sebagai
 * notifikasi berulang harian pada jam definisinya.
 */
export async function sinkronkanPengingatNative(pref) {
  const ids = Object.values(ID_NOTIFIKASI_PENGINGAT);
  try {
    await LocalNotifications.cancel({
      notifications: ids.map((id) => ({ id })),
    });
  } catch {
    /* belum ada yang terjadwal — lanjut menjadwalkan */
  }

  const aktif = DEFINISI_PENGINGAT.filter((def) => pref?.[def.kunci]);
  if (!aktif.length) return;

  await LocalNotifications.schedule({
    notifications: aktif.map((def) => ({
      id: ID_NOTIFIKASI_PENGINGAT[def.kunci],
      title: def.judul,
      body: def.isi,
      schedule: {
        on: { hour: def.jam, minute: def.menit },
        repeats: true,
        allowWhileIdle: true,
      },
      extra: { url: def.url },
    })),
  });
}

let aksiKlikTerdaftar = false;

/**
 * Daftarkan (sekali) penangan ketukan notifikasi native: buka rute tujuan
 * pengingat di dalam aplikasi.
 */
export async function daftarkanAksiKlikNative() {
  if (aksiKlikTerdaftar) return;
  aksiKlikTerdaftar = true;
  try {
    await LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (aksi) => {
        const url = aksi?.notification?.extra?.url;
        if (typeof url === 'string' && url.startsWith('/')) {
          window.location.assign(url);
        }
      },
    );
  } catch {
    aksiKlikTerdaftar = false;
  }
}
