import { useCallback, useMemo, useState } from 'react';
import { LocalSholatTrackerRepository } from '../../data/repositories/LocalSholatTrackerRepository.js';

export const LIMA_WAKTU = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];

export const kunciTanggal = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function hariLengkap(record) {
  return record && LIMA_WAKTU.every((w) => record[w]);
}

/** Streak: jumlah hari beruntun (berakhir hari ini / kemarin) dengan 5 waktu lengkap. */
export function hitungStreak(data, hariIni = new Date()) {
  let streak = 0;
  const kursor = new Date(hariIni);
  // Hari ini boleh belum lengkap — mulai hitung dari hari ini bila lengkap, jika tidak dari kemarin.
  if (!hariLengkap(data[kunciTanggal(kursor)])) {
    kursor.setDate(kursor.getDate() - 1);
  }
  while (hariLengkap(data[kunciTanggal(kursor)])) {
    streak++;
    kursor.setDate(kursor.getDate() - 1);
  }
  return streak;
}

export function useSholatTracker() {
  const [data, setData] = useState(() => LocalSholatTrackerRepository.loadSemua());
  const hariIniKey = kunciTanggal();

  const toggle = useCallback(
    (waktu) => {
      setData((lama) => {
        const hariIniRecord = { ...(lama[hariIniKey] ?? {}) };
        hariIniRecord[waktu] = !hariIniRecord[waktu];
        const baru = { ...lama, [hariIniKey]: hariIniRecord };
        LocalSholatTrackerRepository.saveSemua(baru);
        return baru;
      });
    },
    [hariIniKey]
  );

  const hariIni = data[hariIniKey] ?? {};
  const selesaiHariIni = LIMA_WAKTU.filter((w) => hariIni[w]).length;
  const streak = useMemo(() => hitungStreak(data), [data]);

  return { hariIni, toggle, selesaiHariIni, streak };
}
