/**
 * Use case Streak Ibadah (fungsi MURNI — tanpa DOM/localStorage di fungsi inti).
 *
 * State tersimpan di localStorage dengan kunci `noor.streak.v1`:
 *   {
 *     targetAyat: number,                 // target ayat dibaca per hari (default 10)
 *     hari: {
 *       'YYYY-MM-DD': {                   // kunci tanggal LOKAL perangkat
 *         ayat: string[],                 // kunci ayat unik 'surah:ayat', mis. '2:255'
 *         dzikir: boolean,                // dzikir pagi/petang tuntas hari itu
 *         sholat: boolean,                // ada sholat ditandai di Sholat Tracker
 *         mutabaah: boolean,              // ada amal dicentang di Mutaba'ah
 *         sedekah: boolean,               // ada catatan ditambah di Sedekah & Infaq
 *       },
 *     },
 *   }
 *
 * Definisi STREAK: jumlah hari berurutan yang AKTIF, dihitung mundur dari
 * hari ini. Hari disebut aktif bila ada minimal satu aktivitas tercatat
 * (≥1 ayat terbaca, atau dzikir/sholat/mutabaah/sedekah tercatat). Bila hari ini
 * BELUM ada aktivitas, streak belum putus: hitungan dimulai dari kemarin
 * (hari ini masih punya kesempatan). Bila kemarin pun kosong, streak = 0.
 * Satu hari kosong di tengah rangkaian memutus streak — rangkaian yang
 * dihitung selalu rangkaian terakhir yang menyambung ke hari ini/kemarin.
 *
 * Semua fungsi catat* mengembalikan state BARU dan tidak memutasi input;
 * bila tidak ada perubahan (duplikat), state yang sama dikembalikan apa
 * adanya (referensi identik) agar pemanggil bisa melewatkan penulisan ulang.
 */

export const KUNCI_STREAK = 'noor.streak.v1';
export const TARGET_AYAT_DEFAULT = 10;
export const JENIS_AKTIVITAS = ['dzikir', 'sholat', 'mutabaah', 'sedekah'];

/** 'YYYY-MM-DD' dari tanggal LOKAL (bukan UTC) — konsisten dengan tracker lain. */
export function kunciHari(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

/** Geser kunci 'YYYY-MM-DD' sebanyak n hari (boleh negatif) — murni via Date lokal. */
function geserKunci(kunci, n) {
  const [y, m, d] = kunci.split('-').map(Number);
  const tgl = new Date(y, (m || 1) - 1, d || 1);
  tgl.setDate(tgl.getDate() + n);
  return kunciHari(tgl);
}

function recordKosong() {
  return { ayat: [], dzikir: false, sholat: false, mutabaah: false, sedekah: false };
}

/** Normalisasi record hari apa pun menjadi bentuk baku (defensif thd. data lama/rusak). */
function recordAman(record) {
  if (!record || typeof record !== 'object') return recordKosong();
  return {
    ayat: Array.isArray(record.ayat) ? record.ayat.filter((k) => typeof k === 'string') : [],
    dzikir: record.dzikir === true,
    sholat: record.sholat === true,
    mutabaah: record.mutabaah === true,
    sedekah: record.sedekah === true,
  };
}

/** Normalisasi state apa pun menjadi bentuk baku; tak pernah melempar error. */
export function normalisasiState(state) {
  if (!state || typeof state !== 'object') return stateAwal();
  const target = Number(state.targetAyat);
  const hari = {};
  if (state.hari && typeof state.hari === 'object') {
    for (const [kunci, record] of Object.entries(state.hari)) hari[kunci] = recordAman(record);
  }
  return {
    targetAyat: Number.isFinite(target) && target > 0 ? Math.floor(target) : TARGET_AYAT_DEFAULT,
    hari,
  };
}

/** State awal: target default, belum ada hari tercatat. */
export function stateAwal() {
  return { targetAyat: TARGET_AYAT_DEFAULT, hari: {} };
}

/** Hari aktif = ada ≥1 aktivitas apa pun tercatat pada hari itu. */
export function hariAktif(record) {
  const r = recordAman(record);
  return r.ayat.length > 0 || r.dzikir || r.sholat || r.mutabaah || r.sedekah;
}

/**
 * Catat satu ayat terbaca pada tanggal `date` (default hari ini).
 * Kunci ayat 'surah:ayat' didedupe per hari: kunci yang sama pada hari yang
 * sama terhitung satu kali. Input tidak dimutasi.
 */
export function catatAyat(state, kunciAyat, date = new Date()) {
  if (typeof kunciAyat !== 'string' || kunciAyat.length === 0) return state;
  const s = normalisasiState(state);
  const kunci = kunciHari(date);
  const record = s.hari[kunci] ?? recordKosong();
  if (record.ayat.includes(kunciAyat)) return state;
  return {
    ...s,
    hari: { ...s.hari, [kunci]: { ...record, ayat: [...record.ayat, kunciAyat] } },
  };
}

/**
 * Catat aktivitas non-ayat ('dzikir' | 'sholat' | 'mutabaah' | 'sedekah') pada `date`.
 * Jenis tak dikenal diabaikan (state dikembalikan apa adanya).
 */
export function catatAktivitas(state, jenis, date = new Date()) {
  if (!JENIS_AKTIVITAS.includes(jenis)) return state;
  const s = normalisasiState(state);
  const kunci = kunciHari(date);
  const record = s.hari[kunci] ?? recordKosong();
  if (record[jenis]) return state;
  return {
    ...s,
    hari: { ...s.hari, [kunci]: { ...record, [jenis]: true } },
  };
}

/** Ubah target ayat harian (dibulatkan, minimum 1). */
export function aturTarget(state, targetAyat) {
  const s = normalisasiState(state);
  const target = Math.max(1, Math.floor(Number(targetAyat) || TARGET_AYAT_DEFAULT));
  return { ...s, targetAyat: target };
}

/** Ringkasan satu hari: ayat terbaca vs target. */
export function ringkasanHari(state, date = new Date()) {
  const s = normalisasiState(state);
  const record = s.hari[kunciHari(date)];
  const ayatHariIni = record ? recordAman(record).ayat.length : 0;
  const target = s.targetAyat;
  return {
    ayatHariIni,
    target,
    persenTarget: target > 0 ? Math.min(100, Math.round((ayatHariIni / target) * 100)) : 0,
    lengkapTarget: ayatHariIni >= target,
  };
}

/**
 * Streak saat ini per definisi di kepala berkas: rangkaian hari aktif
 * berurutan yang berakhir hari ini — atau kemarin bila hari ini belum ada
 * aktivitas (streak dianggap belum putus sampai hari berganti).
 */
export function hitungStreak(state, date = new Date()) {
  const s = normalisasiState(state);
  let kursor = kunciHari(date);
  if (!hariAktif(s.hari[kursor])) kursor = geserKunci(kursor, -1);
  let streak = 0;
  while (hariAktif(s.hari[kursor])) {
    streak += 1;
    kursor = geserKunci(kursor, -1);
  }
  return streak;
}

/** Total hari yang pernah aktif sepanjang waktu. */
export function totalHariAktif(state) {
  const s = normalisasiState(state);
  return Object.values(s.hari).filter((r) => hariAktif(r)).length;
}

/** Total ayat unik terbaca sepanjang waktu (jumlah per hari ditotalkan). */
export function totalAyat(state) {
  const s = normalisasiState(state);
  return Object.values(s.hari).reduce((acc, r) => acc + recordAman(r).ayat.length, 0);
}

/**
 * Daftar lencana pencapaian. `ikon` berupa NAMA STRING ('api' | 'buku' |
 * 'kalender') — pemetaan ke komponen ikon react-icons dilakukan lapisan
 * presentasi agar domain tetap bebas dari UI.
 */
export function daftarLencana(state, date = new Date()) {
  const streak = hitungStreak(state, date);
  const ayat = totalAyat(state);
  const aktif = totalHariAktif(state);
  const lencana = (id, nama, deskripsi, ikon, syarat, nilai, labelSyarat) => ({
    id,
    nama,
    deskripsi,
    ikon,
    terbuka: nilai >= syarat,
    progres: `${labelSyarat} — saat ini ${nilai}`,
  });
  return [
    lencana('streak-3', 'Awal yang Konsisten', 'Streak ibadah 3 hari beruntun.', 'api', 3, streak, 'Streak 3 hari'),
    lencana('streak-7', 'Seminggu Istiqamah', 'Streak ibadah 7 hari beruntun.', 'api', 7, streak, 'Streak 7 hari'),
    lencana('streak-30', 'Sebulan Istiqamah', 'Streak ibadah 30 hari beruntun.', 'api', 30, streak, 'Streak 30 hari'),
    lencana('streak-100', 'Seratus Hari Istiqamah', 'Streak ibadah 100 hari beruntun.', 'api', 100, streak, 'Streak 100 hari'),
    lencana('ayat-100', 'Pembaca Seratus Ayat', 'Total 100 ayat terbaca tercatat.', 'buku', 100, ayat, 'Total 100 ayat'),
    lencana('ayat-1000', 'Pembaca Seribu Ayat', 'Total 1.000 ayat terbaca tercatat.', 'buku', 1000, ayat, 'Total 1.000 ayat'),
    lencana('ayat-5000', 'Pembaca Lima Ribu Ayat', 'Total 5.000 ayat terbaca tercatat.', 'buku', 5000, ayat, 'Total 5.000 ayat'),
    lencana('aktif-30', 'Tiga Puluh Hari Aktif', 'Aktif beribadah pada 30 hari berbeda.', 'kalender', 30, aktif, '30 hari aktif'),
  ];
}
