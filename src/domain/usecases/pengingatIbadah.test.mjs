/**
 * Uji node untuk pengingatIbadah.js — jalankan:
 *   node --test src/domain/usecases/pengingatIbadah.test.mjs
 *
 * Mencakup regresi 3 pengingat berjam tetap + pengingat Tahajud dinamis
 * (hitungAwalSepertigaMalamTerakhir & jatuh tempo lewat konteks).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFINISI_PENGINGAT,
  PREF_PENGINGAT_BAWAAN,
  definisiPengingat,
  formatMenitKeJamLabel,
  hitungAwalSepertigaMalamTerakhir,
  jamKeMenit,
  normalisasiPrefPengingat,
  resolverHijriahIntl,
  tentukanKonteksPuasaBesok,
  tentukanPengingatJatuhTempo,
  tentukanPuasaBesok,
} from './pengingatIbadah.js';

const pada = (jam, menit = 0) => new Date(2026, 9, 20, jam, menit, 0); // 2026-10-20 lokal
const HARI_INI = '2026-10-20';

// ---------- jamKeMenit / format ----------

test('jamKeMenit: parse HH:MM valid, tolak yang rusak', () => {
  assert.equal(jamKeMenit('04:30'), 270);
  assert.equal(jamKeMenit('18:00'), 1080);
  assert.equal(jamKeMenit('4:30'), 270);
  assert.equal(jamKeMenit('00:00'), 0);
  for (const rusak of ['24:00', '18:60', 'bukan-jam', '', '18', '18:5', null, undefined, 1080, {}]) {
    assert.equal(jamKeMenit(rusak), null, String(rusak));
  }
  assert.equal(formatMenitKeJamLabel(60), '01.00');
  assert.equal(formatMenitKeJamLabel(1500), '01.00'); // dinormalisasi lintas hari
  assert.equal(formatMenitKeJamLabel(Number.NaN), null);
});

// ---------- hitungAwalSepertigaMalamTerakhir ----------

test('sepertiga malam: kasus acuan Maghrib 18:00 & Subuh 04:30 → 01.00', () => {
  const h = hitungAwalSepertigaMalamTerakhir('18:00', '04:30');
  assert.deepEqual(h, {
    jam: 1,
    menit: 0,
    menitDariTengahMalam: 60,
    jamLabel: '01.00',
    durasiMalamMenit: 630,
  });
});

test('sepertiga malam: durasi malam genap 18:00–06:00 (720 mnt) → 02.00', () => {
  const h = hitungAwalSepertigaMalamTerakhir('18:00', '06:00');
  assert.equal(h.durasiMalamMenit, 720);
  assert.equal(h.menitDariTengahMalam, 120);
  assert.equal(h.jamLabel, '02.00');
});

test('sepertiga malam: lintas tengah malam & pembulatan (17:56–04:31) → 00.59', () => {
  // Durasi 635 mnt; 2/3 = 423,33 → dibulatkan 423; 1076 + 423 = 1499 → 00.59.
  const h = hitungAwalSepertigaMalamTerakhir('17:56', '04:31');
  assert.equal(h.durasiMalamMenit, 635);
  assert.equal(h.menitDariTengahMalam, 59);
  assert.deepEqual([h.jam, h.menit], [0, 59]);
  assert.equal(h.jamLabel, '00.59');
});

test('sepertiga malam: awal bisa jatuh sebelum tengah malam (18:00–00:30) → 22.20', () => {
  const h = hitungAwalSepertigaMalamTerakhir('18:00', '00:30');
  assert.equal(h.durasiMalamMenit, 390);
  assert.equal(h.menitDariTengahMalam, 1340);
  assert.equal(h.jamLabel, '22.20');
});

test('sepertiga malam: input rusak → null (tidak dikarang)', () => {
  for (const [m, s] of [
    ['bukan-jam', '04:30'],
    ['18:00', ''],
    ['', ''],
    [null, '04:30'],
    ['18:00', undefined],
    [1080, 270],
    ['25:00', '04:30'],
    ['18:00', '18:00'], // durasi 0
  ]) {
    assert.equal(hitungAwalSepertigaMalamTerakhir(m, s), null, `${m}/${s}`);
  }
});

// ---------- regresi: 3 jenis berjam tetap & normalisasi pref ----------

test('pref bawaan: 5 kunci semua false; normalisasi pref lama aditif', () => {
  assert.deepEqual(PREF_PENGINGAT_BAWAAN, {
    dzikirPagi: false,
    dzikirPetang: false,
    targetBaca: false,
    tahajud: false,
    puasaSunnah: false,
  });
  // Pref tersimpan LAMA (belum ada tahajud/puasaSunnah) — perilaku lama
  // utuh, kunci baru false.
  assert.deepEqual(normalisasiPrefPengingat({ dzikirPagi: true, targetBaca: true }), {
    dzikirPagi: true,
    dzikirPetang: false,
    targetBaca: true,
    tahajud: false,
    puasaSunnah: false,
  });
  assert.deepEqual(normalisasiPrefPengingat({ tahajud: true, asing: true }), {
    dzikirPagi: false,
    dzikirPetang: false,
    targetBaca: false,
    tahajud: true,
    puasaSunnah: false,
  });
  assert.deepEqual(normalisasiPrefPengingat({ puasaSunnah: true }), {
    dzikirPagi: false,
    dzikirPetang: false,
    targetBaca: false,
    tahajud: false,
    puasaSunnah: true,
  });
  assert.deepEqual(normalisasiPrefPengingat(null), PREF_PENGINGAT_BAWAAN);
  assert.deepEqual(normalisasiPrefPengingat('rusak'), PREF_PENGINGAT_BAWAAN);
});

test('jatuh tempo tetap: ambang jam, dedupe per hari, urutan definisi', () => {
  const pref = { dzikirPagi: true, dzikirPetang: true, targetBaca: true };
  assert.deepEqual(tentukanPengingatJatuhTempo(pref, pada(5, 29)), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(pref, pada(5, 30)), ['dzikirPagi']);
  assert.deepEqual(tentukanPengingatJatuhTempo(pref, pada(21, 0)), [
    'dzikirPagi',
    'dzikirPetang',
    'targetBaca',
  ]);
  assert.deepEqual(
    tentukanPengingatJatuhTempo(pref, pada(21, 0), { dzikirPagi: HARI_INI, targetBaca: HARI_INI }),
    ['dzikirPetang'],
  );
  assert.deepEqual(tentukanPengingatJatuhTempo({}, pada(21, 0)), []); // semua nonaktif
});

test('definisi tahajud: dinamis, tanpa jam tetap, url /jadwal', () => {
  const def = definisiPengingat('tahajud');
  assert.equal(def.judul, 'Waktunya Tahajud');
  assert.equal(def.url, '/jadwal');
  assert.equal(def.dinamis, true);
  assert.equal(def.jam, null);
  assert.equal(DEFINISI_PENGINGAT.length, 5);
});

// ---------- jatuh tempo tahajud (dinamis) ----------

// Awal sepertiga 01.00 (menit 60), Subuh 04.30 (menit 270) — kasus acuan.
const KONTEKS = { menitTahajud: 60, menitSubuh: 270 };
const PREF_TAHAJUD = { tahajud: true };

test('tahajud: jendela [awal sepertiga, Subuh) pada hari yang sama', () => {
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(0, 59), {}, KONTEKS), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(1, 0), {}, KONTEKS), ['tahajud']);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(2, 30), {}, KONTEKS), ['tahajud']);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(4, 29), {}, KONTEKS), ['tahajud']);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(4, 30), {}, KONTEKS), []); // tepat Subuh
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(10, 0), {}, KONTEKS), []); // siang: tidak menembak susulan
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(23, 0), {}, KONTEKS), []); // malam berikutnya belum mulai
});

test('tahajud: tanpa konteks / konteks rusak → dilewati diam-diam', () => {
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(2, 0)), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(2, 0), {}, {}), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(2, 0), {}, { menitTahajud: '01:00' }), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(2, 0), {}, null), []);
});

test('tahajud: dedupe per hari sama seperti jenis lain', () => {
  assert.deepEqual(
    tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(2, 0), { tahajud: HARI_INI }, KONTEKS),
    [],
  );
  assert.deepEqual(
    tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(2, 0), { tahajud: '2026-10-19' }, KONTEKS),
    ['tahajud'],
  );
});

test('tahajud: nonaktif tidak jatuh tempo walau konteks ada', () => {
  assert.deepEqual(tentukanPengingatJatuhTempo({ tahajud: false }, pada(2, 0), {}, KONTEKS), []);
  assert.deepEqual(tentukanPengingatJatuhTempo({}, pada(2, 0), {}, KONTEKS), []);
});

test('tahajud: konteks tanpa menitSubuh → perilaku jam tetap (sejak target tercapai)', () => {
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(0, 30), {}, { menitTahajud: 60 }), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(1, 0), {}, { menitTahajud: 60 }), ['tahajud']);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(10, 0), {}, { menitTahajud: 60 }), ['tahajud']);
});

test('tahajud: awal sebelum tengah malam → jendela menyambung lewat 00.00 sampai Subuh', () => {
  // Awal 23.47 (1427), Subuh 02.46 (166).
  const konteks = { menitTahajud: 1427, menitSubuh: 166 };
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(23, 46), {}, konteks), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(23, 50), {}, konteks), ['tahajud']);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(0, 30), {}, konteks), ['tahajud']);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(2, 46), {}, konteks), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_TAHAJUD, pada(12, 0), {}, konteks), []);
});

test('tahajud + jenis tetap bersamaan: urutan mengikuti DEFINISI_PENGINGAT', () => {
  const pref = { dzikirPagi: true, tahajud: true };
  // Pukul 02.00: dzikir pagi (05.30) belum; hanya tahajud.
  assert.deepEqual(tentukanPengingatJatuhTempo(pref, pada(2, 0), {}, KONTEKS), ['tahajud']);
});

// ---------- puasa sunnah (H-1, dinamis bersyarat hari) ----------

test('definisi puasaSunnah: dinamis, jam tetap 17.30, url /kalender', () => {
  const def = definisiPengingat('puasaSunnah');
  assert.equal(def.dinamis, true);
  assert.equal(def.jam, 17);
  assert.equal(def.menit, 30);
  assert.equal(def.jamLabel, '17.30');
  assert.equal(def.url, '/kalender');
});

const PREF_PUASA = { puasaSunnah: true };
const KONTEKS_PUASA = { puasaBesok: { nama: 'Puasa Ayyamul Bidh', kunci: 'ayyamul-bidh' } };

test('puasaSunnah: jatuh tempo 17.30 HARI INI hanya bila konteks puasaBesok terisi', () => {
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_PUASA, pada(17, 29), {}, KONTEKS_PUASA), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_PUASA, pada(17, 30), {}, KONTEKS_PUASA), ['puasaSunnah']);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_PUASA, pada(23, 0), {}, KONTEKS_PUASA), ['puasaSunnah']);
  // Besok BUKAN puasa sunnah / konteks absen → tidak pernah jatuh tempo.
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_PUASA, pada(18, 0), {}, { puasaBesok: null }), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_PUASA, pada(18, 0), {}, {}), []);
  assert.deepEqual(tentukanPengingatJatuhTempo(PREF_PUASA, pada(18, 0)), []);
  // Nonaktif → tidak jatuh tempo walau konteks ada.
  assert.deepEqual(tentukanPengingatJatuhTempo({ puasaSunnah: false }, pada(18, 0), {}, KONTEKS_PUASA), []);
  assert.deepEqual(tentukanPengingatJatuhTempo({}, pada(18, 0), {}, KONTEKS_PUASA), []);
});

test('puasaSunnah: dedupe per hari & urutan definisi (setelah dzikirPetang)', () => {
  assert.deepEqual(
    tentukanPengingatJatuhTempo(PREF_PUASA, pada(18, 0), { puasaSunnah: HARI_INI }, KONTEKS_PUASA),
    [],
  );
  const pref = { dzikirPetang: true, puasaSunnah: true };
  assert.deepEqual(tentukanPengingatJatuhTempo(pref, pada(21, 0), {}, KONTEKS_PUASA), [
    'dzikirPetang',
    'puasaSunnah',
  ]);
});

// ---------- tentukanPuasaBesok: resolver palsu (Hijriah dikendalikan) ----------

const resolverTetap = (hijri) => () => hijri;

test('puasaBesok: besok Senin → Puasa Senin', () => {
  // 2026-01-04 = Ahad; besoknya Senin.
  const hasil = tentukanPuasaBesok(new Date(2026, 0, 4), resolverTetap({ day: 20, month: 7, year: 1447 }));
  assert.equal(hasil.nama, 'Puasa Senin');
  assert.equal(hasil.kunci, 'senin');
  assert.deepEqual(hasil.hijri, { day: 20, month: 7, year: 1447 });
});

test('puasaBesok: besok 13 Hijriah → Puasa Ayyamul Bidh', () => {
  const hasil = tentukanPuasaBesok(new Date(2026, 0, 1), resolverTetap({ day: 13, month: 7, year: 1447 }));
  assert.equal(hasil.nama, 'Puasa Ayyamul Bidh');
  assert.equal(hasil.kunci, 'ayyamul-bidh');
});

test('puasaBesok: besok 9 Dzulhijjah → Puasa Arafah; besok 10 Muharram → Puasa Asyura', () => {
  const arafah = tentukanPuasaBesok(new Date(2026, 4, 25), resolverTetap({ day: 9, month: 12, year: 1447 }));
  assert.equal(arafah.nama, 'Puasa Arafah');
  const asyura = tentukanPuasaBesok(new Date(2026, 5, 24), resolverTetap({ day: 10, month: 1, year: 1448 }));
  assert.equal(asyura.nama, 'Puasa Asyura');
});

test('puasaBesok: hari HARAM → null (sudah dikecualikan puasaSunnahPadaHari, tanpa cek dobel)', () => {
  // 10 Dzulhijjah (Idul Adha), 13 Dzulhijjah (Tasyrik — Ayyamul Bidh tidak
  // berlaku), 1 Syawal (Idul Fitri).
  for (const hijri of [
    { day: 10, month: 12, year: 1447 },
    { day: 13, month: 12, year: 1447 },
    { day: 1, month: 10, year: 1447 },
  ]) {
    assert.equal(
      tentukanPuasaBesok(new Date(2026, 4, 25), resolverTetap(hijri)),
      null,
      `${hijri.day}-${hijri.month}`,
    );
  }
});

test('puasaBesok: hari biasa & resolver rusak → null', () => {
  // 2026-10-20 = Selasa; besoknya Rabu, 10 Jumadilawal — tidak ada puasa.
  assert.equal(
    tentukanPuasaBesok(new Date(2026, 9, 20), resolverTetap({ day: 10, month: 5, year: 1448 })),
    null,
  );
  assert.equal(tentukanPuasaBesok(new Date(2026, 9, 20), () => null), null);
  assert.equal(tentukanPuasaBesok(new Date(2026, 9, 20), null), null);
  assert.deepEqual(tentukanKonteksPuasaBesok(new Date(2026, 9, 20), () => null), { puasaBesok: null });
});

// ---------- resolverHijriahIntl: tanggal NYATA (dihitung dari resolver itu
// sendiri saat menulis uji; kalender islamic-umalqura) ----------

test('resolverHijriahIntl: konversi tanggal nyata yang diketahui', () => {
  assert.deepEqual(resolverHijriahIntl(new Date(2026, 9, 20)), { day: 9, month: 5, year: 1448 });
  assert.equal(resolverHijriahIntl(new Date('bukan-tanggal')), null);
});

test('puasaBesok (resolver Intl bawaan): tanggal nyata Senin/Ayyamul Bidh/Arafah/Asyura/biasa', () => {
  // Besok Senin 5 Jan 2026 = 16 Rajab 1447.
  const senin = tentukanPuasaBesok(new Date(2026, 0, 4));
  assert.equal(senin.nama, 'Puasa Senin');
  assert.deepEqual(senin.hijri, { day: 16, month: 7, year: 1447 });
  // Besok Jumat 2 Jan 2026 = 13 Rajab 1447.
  const bidh = tentukanPuasaBesok(new Date(2026, 0, 1));
  assert.equal(bidh.nama, 'Puasa Ayyamul Bidh');
  assert.deepEqual(bidh.hijri, { day: 13, month: 7, year: 1447 });
  // Besok Selasa 26 Mei 2026 = 9 Dzulhijjah 1447.
  const arafah = tentukanPuasaBesok(new Date(2026, 4, 25));
  assert.equal(arafah.nama, 'Puasa Arafah');
  assert.deepEqual(arafah.hijri, { day: 9, month: 12, year: 1447 });
  // Besok Kamis 25 Jun 2026 = 10 Muharram 1448: tajuknya Asyura (puasa
  // bertanggal khusus), puasa Kamis tetap tercatat di daftarNama.
  const asyura = tentukanPuasaBesok(new Date(2026, 5, 24));
  assert.equal(asyura.nama, 'Puasa Asyura');
  assert.deepEqual(asyura.daftarNama, ['Puasa Kamis', 'Puasa Asyura']);
  assert.deepEqual(asyura.hijri, { day: 10, month: 1, year: 1448 });
  // Besok Rabu 21 Okt 2026 = 10 Jumadilawal 1448 — hari biasa.
  assert.equal(tentukanPuasaBesok(new Date(2026, 9, 20)), null);
});
