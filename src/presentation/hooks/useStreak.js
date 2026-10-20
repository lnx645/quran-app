import { useCallback, useMemo, useState } from 'react';
import {
  KUNCI_STREAK,
  stateAwal,
  normalisasiState,
  catatAyat as catatAyatDomain,
  catatAktivitas as catatAktivitasDomain,
  aturTarget,
  ringkasanHari,
  hitungStreak,
  daftarLencana,
} from '../../domain/usecases/streakIbadah.js';

/**
 * Hook Streak, Target & Lencana Ibadah.
 *
 * Seluruh logika hitung ada di domain murni `streakIbadah.js`; berkas ini
 * hanya menjembatani localStorage (kunci `noor.streak.v1`) ↔ React state.
 *
 * Dua jalur pencatatan yang SENGAJA dibedakan:
 * 1. Hook `useStreak()` — untuk halaman yang MENAMPILKAN streak (Beranda,
 *    Statistik): memegang React state, setiap catat* menulis state baru dan
 *    menyimpannya, tampilan langsung segar.
 * 2. Fungsi modul `catatAyatGlobal()` / `catatAktivitasGlobal()` — untuk
 *    halaman PENCATAT murni (Surah, Dzikir, Sholat Tracker, Mutaba'ah) yang
 *    tidak menampilkan streak: membaca-menulis localStorage langsung tanpa
 *    perlu mengangkat (lifting) state bersama ke App/router. Pola ini dipilih
 *    karena pencatatan bersifat fire-and-forget satu arah (halaman pencatat
 *    tidak pernah membaca balik nilainya), datanya kecil, dan domain sudah
 *    menjamin dedupe per hari — jadi penulisan ganda antar-halaman aman.
 *    Halaman penampil membaca ulang dari localStorage setiap kali dipasang,
 *    sehingga nilai yang ditulis jalur global selalu tampil mutakhir saat
 *    pengguna berpindah halaman.
 */

function muatState() {
  try {
    const mentah = localStorage.getItem(KUNCI_STREAK);
    if (!mentah) return stateAwal();
    return normalisasiState(JSON.parse(mentah));
  } catch {
    return stateAwal();
  }
}

function simpanState(state) {
  try {
    localStorage.setItem(KUNCI_STREAK, JSON.stringify(state));
  } catch {
    /* penyimpanan tidak tersedia — streak cukup tidak tersimpan */
  }
}

/** Terapkan perubahan domain pada localStorage langsung (jalur global). */
function terapkanGlobal(ubah) {
  const lama = muatState();
  const baru = ubah(lama);
  if (baru !== lama) simpanState(baru);
}

/** Catat satu ayat terbaca hari ini dari halaman mana pun (tanpa hook). */
export function catatAyatGlobal(kunciAyat) {
  terapkanGlobal((s) => catatAyatDomain(s, kunciAyat));
}

/** Catat aktivitas ('dzikir'|'sholat'|'mutabaah') hari ini dari halaman mana pun. */
export function catatAktivitasGlobal(jenis) {
  terapkanGlobal((s) => catatAktivitasDomain(s, jenis));
}

export function useStreak() {
  const [state, setState] = useState(muatState);

  const terapkan = useCallback((ubah) => {
    setState((lama) => {
      const baru = ubah(lama);
      if (baru !== lama) simpanState(baru);
      return baru;
    });
  }, []);

  const catatAyat = useCallback(
    (kunciAyat) => terapkan((s) => catatAyatDomain(s, kunciAyat)),
    [terapkan],
  );
  const catatAktivitas = useCallback(
    (jenis) => terapkan((s) => catatAktivitasDomain(s, jenis)),
    [terapkan],
  );
  const ubahTarget = useCallback(
    (target) => terapkan((s) => aturTarget(s, target)),
    [terapkan],
  );

  const ringkasanHariIni = useMemo(() => ringkasanHari(state), [state]);
  const streak = useMemo(() => hitungStreak(state), [state]);
  const lencana = useMemo(() => daftarLencana(state), [state]);

  return { state, ringkasanHariIni, streak, lencana, catatAyat, catatAktivitas, ubahTarget };
}
