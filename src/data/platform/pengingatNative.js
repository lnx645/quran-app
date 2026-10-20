import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import {
  DEFINISI_PENGINGAT,
  definisiPengingat,
  hitungAwalSepertigaMalamTerakhir,
  jamKeMenit,
  resolverHijriahIntl,
} from '../../domain/usecases/pengingatIbadah.js';
import { cariPuasaSunnahBerikutnya } from '../../domain/usecases/hitungPuasaSunnah.js';

/**
 * Adaptor notifikasi native (lapisan data/platform).
 *
 * Di dalam shell Capacitor, pengingat ibadah dijadwalkan ke penjadwal
 * sistem Android lewat @capacitor/local-notifications: notifikasi
 * berulang harian yang TETAP berbunyi walau aplikasi ditutup (dan pulih
 * setelah perangkat dinyalakan ulang, berkat receiver plugin). Dua jenis
 * dinamis (Tahajud, Puasa Sunnah H-1) dijadwalkan sebagai one-shot untuk
 * kemunculan terdekatnya, dihitung dengan fungsi domain yang sama dengan
 * jalur web, dan diperbarui setiap sinkronisasi berjalan.
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
  // One-shot dinamis (bukan berulang harian): dijadwalkan ulang setiap
  // sinkronisasi berjalan (aplikasi dibuka / pref berubah).
  tahajud: 104,
  puasaSunnah: 105,
};

// Kunci snapshot jadwal terakhir — sama dengan KUNCI_JADWAL_TERAKHIR_PENGINGAT
// di hooks/usePengingat.js (ditulis JadwalPage tiap jadwal termuat); dibaca
// langsung di sini agar lapisan platform tidak mengimpor lapisan presentasi.
const KUNCI_JADWAL_TERAKHIR = 'noor.jadwal.terakhir.v1';

/** Baca snapshot { maghrib, subuh } tersimpan terakhir, atau null. */
function bacaJadwalTerakhirNative() {
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI_JADWAL_TERAKHIR) ?? 'null');
    if (!data || typeof data !== 'object') return null;
    if (jamKeMenit(data.maghrib) === null || jamKeMenit(data.subuh) === null) return null;
    return { maghrib: data.maghrib, subuh: data.subuh };
  } catch {
    return null;
  }
}

/**
 * Kemunculan Tahajud terdekat (Date di masa depan) dari jadwal tersimpan,
 * memakai hitung domain yang sama dengan jalur web. Null bila jadwal tak
 * tersedia/rusak — jenis ini dilewati diam-diam, sama seperti web.
 */
function tanggalTahajudBerikutnya(sekarang = new Date()) {
  const jadwal = bacaJadwalTerakhirNative();
  if (!jadwal) return null;
  const hasil = hitungAwalSepertigaMalamTerakhir(jadwal.maghrib, jadwal.subuh);
  if (!hasil) return null;
  const calon = new Date(
    sekarang.getFullYear(),
    sekarang.getMonth(),
    sekarang.getDate(),
    hasil.jam,
    hasil.menit,
    0,
    0,
  );
  // Kemunculan hari ini sudah lewat → malam berikutnya (jadwal tersimpan
  // dipakai apa adanya; selisih antarhari hanya ±1 menit).
  if (calon <= sekarang) calon.setDate(calon.getDate() + 1);
  return calon;
}

/**
 * Waktu tembak pengingat Puasa Sunnah terdekat: pukul 17.30 pada H-1 hari
 * puasa sunnah berikutnya (dihitung dengan resolver/domain yang sama
 * dengan jalur web). Mengembalikan { pada: Date, nama, keterangan } atau
 * null bila tidak ada puasa dalam cakrawala pencarian / waktunya lewat.
 */
function pengingatPuasaBerikutnya(sekarang = new Date()) {
  const def = definisiPengingat('puasaSunnah');
  const besok = new Date(sekarang.getFullYear(), sekarang.getMonth(), sekarang.getDate() + 1);
  const daftar = cariPuasaSunnahBerikutnya({
    dariTanggal: besok,
    jumlah: 5,
    resolver: resolverHijriahIntl,
  });
  for (const kejadian of daftar) {
    const pada = new Date(
      kejadian.tanggal.getFullYear(),
      kejadian.tanggal.getMonth(),
      kejadian.tanggal.getDate() - 1,
      def.jam,
      def.menit,
      0,
      0,
    );
    if (pada <= sekarang) continue; // momen H-1 kejadian ini sudah lewat
    // Nama utama: puasa bertanggal khusus didahulukan dari Senin/Kamis,
    // sama seperti tentukanPuasaBesok di domain.
    const utama =
      kejadian.puasa.find((p) => p.kunci !== 'senin' && p.kunci !== 'kamis') ??
      kejadian.puasa[0];
    if (!utama) continue;
    return { pada, nama: utama.nama, keterangan: utama.keterangan };
  }
  return null;
}

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
 * batalkan semua id stabil, lalu jadwalkan ulang yang aktif —
 * tiga jenis berjam tetap sebagai notifikasi berulang harian, dan dua
 * jenis dinamis (Tahajud & Puasa Sunnah H-1) sebagai one-shot untuk
 * kemunculan terdekatnya. Pola cancel→schedule membuat sinkronisasi
 * idempoten; ia berjalan setiap aplikasi dibuka & pref berubah, sehingga
 * one-shot selalu terbarui ke kemunculan berikutnya.
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

  const notifikasi = [];

  // Jenis berjam tetap (non-dinamis): berulang harian pada jam definisi.
  for (const def of DEFINISI_PENGINGAT) {
    if (def.dinamis || !pref?.[def.kunci]) continue;
    notifikasi.push({
      id: ID_NOTIFIKASI_PENGINGAT[def.kunci],
      title: def.judul,
      body: def.isi,
      schedule: {
        on: { hour: def.jam, minute: def.menit },
        repeats: true,
        allowWhileIdle: true,
      },
      extra: { url: def.url },
    });
  }

  const sekarang = new Date();

  // Tahajud: one-shot pada awal sepertiga malam terakhir terdekat.
  if (pref?.tahajud) {
    const def = definisiPengingat('tahajud');
    const pada = tanggalTahajudBerikutnya(sekarang);
    if (def && pada) {
      notifikasi.push({
        id: ID_NOTIFIKASI_PENGINGAT.tahajud,
        title: def.judul,
        body: def.isi,
        schedule: { at: pada, allowWhileIdle: true },
        extra: { url: def.url },
      });
    }
  }

  // Puasa Sunnah: one-shot pukul 17.30 pada H-1 puasa berikutnya; judul
  // memuat nama puasanya, sama seperti jalur web.
  if (pref?.puasaSunnah) {
    const def = definisiPengingat('puasaSunnah');
    const berikut = pengingatPuasaBerikutnya(sekarang);
    if (def && berikut) {
      notifikasi.push({
        id: ID_NOTIFIKASI_PENGINGAT.puasaSunnah,
        title: `Besok ${berikut.nama}`,
        body: berikut.keterangan
          ? `${berikut.keterangan} Siapkan sahur dan niatkan puasa malam ini.`
          : def.isi,
        schedule: { at: berikut.pada, allowWhileIdle: true },
        extra: { url: def.url },
      });
    }
  }

  if (!notifikasi.length) return;
  await LocalNotifications.schedule({ notifications: notifikasi });
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
