import { Capacitor } from '@capacitor/core';

/**
 * Iklan dukungan sukarela (Google AdMob, format Reward) — HANYA native.
 *
 * Prinsip penempatan (disepakati pemilik aplikasi):
 * - Iklan TIDAK PERNAH tampil sendiri: hanya muncul bila pengguna sendiri
 *   menekan tombol "Tonton Iklan Pendukung" di halaman Tentang.
 * - Tidak mengunci konten ibadah apa pun; tidak ada di Mode Anak.
 * - Di web modul ini nonaktif total (plugin dimuat dinamis khusus native).
 */

const ID_UNIT_REWARD = 'ca-app-pub-6015832275105491/6455595618';

let janjiModul = null;

async function muatAdmob() {
  if (!Capacitor.isNativePlatform()) return null;
  if (!janjiModul) {
    janjiModul = (async () => {
      const mod = await import('@capacitor-community/admob');
      await mod.AdMob.initialize();
      return mod;
    })().catch(() => null);
  }
  return janjiModul;
}

/** Apakah tombol iklan dukungan layak ditampilkan (native saja). */
export function iklanDukunganTersedia() {
  return Capacitor.isNativePlatform();
}

/**
 * Muat & tampilkan satu iklan reward.
 * Hasil: { status: 'berhadiah' } bila iklan ditonton sampai imbalan keluar,
 * { status: 'batal' } bila ditutup/gagal, { status: 'tidak-tersedia' } di web.
 */
export async function tontonIklanDukungan() {
  const mod = await muatAdmob();
  if (!mod) return { status: 'tidak-tersedia' };
  const { AdMob, RewardAdPluginEvents } = mod;

  return new Promise((resolve) => {
    let selesai = false;
    const pegangan = [];
    const tuntaskan = (hasil) => {
      if (selesai) return;
      selesai = true;
      pegangan.forEach((h) => h.remove().catch(() => {}));
      resolve(hasil);
    };

    // Batas waktu pengaman: jangan biarkan janji menggantung selamanya.
    const pengaman = setTimeout(() => tuntaskan({ status: 'batal' }), 120000);

    (async () => {
      try {
        pegangan.push(
          await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
            clearTimeout(pengaman);
            tuntaskan({ status: 'berhadiah' });
          }),
        );
        pegangan.push(
          await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
            clearTimeout(pengaman);
            tuntaskan({ status: 'batal' });
          }),
        );
        pegangan.push(
          await AdMob.addListener(RewardAdPluginEvents.FailedToShow, () => {
            clearTimeout(pengaman);
            tuntaskan({ status: 'batal' });
          }),
        );
        pegangan.push(
          await AdMob.addListener(RewardAdPluginEvents.FailedToLoad, () => {
            clearTimeout(pengaman);
            tuntaskan({ status: 'batal' });
          }),
        );
        await AdMob.prepareRewardVideoAd({ adId: ID_UNIT_REWARD });
        await AdMob.showRewardVideoAd();
      } catch {
        clearTimeout(pengaman);
        tuntaskan({ status: 'batal' });
      }
    })();
  });
}
