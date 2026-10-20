/**
 * Uji node untuk hitungWaktuTerlarang.js — jalankan:
 *   node --test src/domain/usecases/hitungWaktuTerlarang.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  hitungRentangTerlarang,
  dalamRentangTerlarang,
  rentangTerlarangAktif,
  DAFTAR_WAKTU_MUSTAJAB,
  MENIT_SEBELUM_ISTIWA,
} from './hitungWaktuTerlarang.js';

// Contoh jadwal satu hari (bentuk mapJadwal: kunci Aladhan + jam 'HH:MM').
const JADWAL = {
  waktu: [
    { kunci: 'Fajr', nama: 'Subuh', jam: '04:31' },
    { kunci: 'Sunrise', nama: 'Terbit', jam: '05:47' },
    { kunci: 'Dhuhr', nama: 'Dzuhur', jam: '11:52' },
    { kunci: 'Asr', nama: 'Ashar', jam: '15:14' },
    { kunci: 'Maghrib', nama: 'Maghrib', jam: '17:56' },
    { kunci: 'Isha', nama: 'Isya', jam: '19:09' },
  ],
};

const pada = (jam, menit = 0) => new Date(2026, 9, 20, jam, menit, 0);

test('tiga rentang dihitung dari jadwal hari berjalan, format HH.MM', () => {
  const r = hitungRentangTerlarang(JADWAL);
  assert.equal(r.length, 3);
  assert.deepEqual(
    r.map((x) => [x.kunci, x.dari, x.sampai]),
    [
      ['subuh-syuruq', '04.31', '05.47'],
      ['istiwa', '11.42', '11.52'],
      ['ashar-maghrib', '15.14', '17.56'],
    ],
  );
  for (const x of r) {
    assert.ok(x.label.length > 0);
    assert.ok(x.catatan.length > 0);
  }
});

test("rentang istiwa' = Dzuhur −10 menit dan terlabeli perkiraan", () => {
  assert.equal(MENIT_SEBELUM_ISTIWA, 10);
  const istiwa = hitungRentangTerlarang(JADWAL).find((x) => x.kunci === 'istiwa');
  assert.equal(istiwa.dari, '11.42');
  assert.equal(istiwa.sampai, '11.52');
  assert.match(istiwa.label, /perkiraan/i);
  assert.match(istiwa.catatan, /perkiraan/i);
});

test('menerima langsung daftar waktu (tanpa objek pembungkus)', () => {
  assert.equal(hitungRentangTerlarang(JADWAL.waktu).length, 3);
});

test('jadwal kosong/belum termuat/rusak → [] dengan aman', () => {
  for (const input of [null, undefined, {}, { waktu: [] }, { waktu: null }, [], 'jadwal', 42]) {
    assert.deepEqual(hitungRentangTerlarang(input), []);
  }
});

test('entri jam rusak dilewati; rentang yang ujungnya hilang tidak dikarang', () => {
  const rusak = {
    waktu: [
      { kunci: 'Fajr', nama: 'Subuh', jam: 'bukan-jam' },
      { kunci: 'Sunrise', nama: 'Terbit', jam: '05:47' },
      { kunci: 'Dhuhr', nama: 'Dzuhur', jam: '11:52' },
      { kunci: 'Asr', nama: 'Ashar', jam: '15:14' },
      { kunci: 'Maghrib', nama: 'Maghrib', jam: '17:56' },
    ],
  };
  const kunci = hitungRentangTerlarang(rusak).map((x) => x.kunci);
  assert.deepEqual(kunci, ['istiwa', 'ashar-maghrib']);
});

test('status sekarang: di dalam rentang Subuh–Syuruq', () => {
  const r = hitungRentangTerlarang(JADWAL);
  assert.equal(dalamRentangTerlarang(r[0], pada(4, 31)), true); // tepat mulai
  assert.equal(dalamRentangTerlarang(r[0], pada(5, 0)), true);
  assert.equal(dalamRentangTerlarang(r[0], pada(5, 47)), false); // tepat sampai = berakhir
  assert.equal(dalamRentangTerlarang(r[0], pada(4, 30)), false);
  assert.equal(rentangTerlarangAktif(r, pada(5, 0))?.kunci, 'subuh-syuruq');
});

test("status sekarang: di dalam rentang istiwa' dan Ashar–Maghrib", () => {
  const r = hitungRentangTerlarang(JADWAL);
  assert.equal(rentangTerlarangAktif(r, pada(11, 45))?.kunci, 'istiwa');
  assert.equal(rentangTerlarangAktif(r, pada(16, 30))?.kunci, 'ashar-maghrib');
  assert.equal(rentangTerlarangAktif(r, pada(17, 56)), null); // tepat Maghrib
});

test('status sekarang: di luar semua rentang → null', () => {
  const r = hitungRentangTerlarang(JADWAL);
  assert.equal(rentangTerlarangAktif(r, pada(9, 0)), null);
  assert.equal(rentangTerlarangAktif(r, pada(20, 0)), null);
  assert.equal(rentangTerlarangAktif([], pada(5, 0)), null);
  assert.equal(rentangTerlarangAktif(null, pada(5, 0)), null);
  assert.equal(dalamRentangTerlarang(null, pada(5, 0)), false);
  assert.equal(dalamRentangTerlarang(r[0], new Date('bukan-tanggal')), false);
});

test('daftar waktu mustajab: 5 item edukatif bersumber singkat', () => {
  assert.equal(DAFTAR_WAKTU_MUSTAJAB.length, 5);
  const judul = DAFTAR_WAKTU_MUSTAJAB.map((m) => m.judul);
  assert.ok(judul.some((j) => /adzan dan iqamah/i.test(j)));
  assert.ok(judul.some((j) => /sepertiga malam/i.test(j)));
  assert.ok(judul.some((j) => /jumat/i.test(j)));
  assert.ok(judul.some((j) => /sujud/i.test(j)));
  assert.ok(judul.some((j) => /hujan/i.test(j)));
  for (const m of DAFTAR_WAKTU_MUSTAJAB) assert.ok(m.sumber.length > 0);
});
