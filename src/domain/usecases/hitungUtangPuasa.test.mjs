/**
 * Uji node untuk hitungUtangPuasa.js — jalankan:
 *   node --test src/domain/usecases/hitungUtangPuasa.test.mjs
 * Angka harapan dihitung manual dari fixture di bawah.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  TOTAL_MIN,
  TOTAL_MAKS,
  normalisasiTotalHari,
  validasiTotalHari,
  jumlahLunas,
  sisaUtang,
  persenLunas,
  ringkasanSemuaTahun,
} from './hitungUtangPuasa.js';

// Fixture: Ramadhan 1447 H — utang 7 hari, lunas 3 tanggal.
// Ramadhan 1446 H — utang 30 hari, lunas 30 tanggal (lunas penuh).
const LUNAS_1446 = Object.fromEntries(
  Array.from({ length: 30 }, (_, i) => [`2025-0${1 + Math.floor(i / 28)}-${String((i % 28) + 1).padStart(2, '0')}`, true]),
);
const TAHUN = [
  {
    id: 't1',
    label: 'Ramadhan 1447 H',
    totalHari: 7,
    lunas: { '2026-03-01': true, '2026-03-05': true, '2026-03-09': true },
  },
  { id: 't2', label: 'Ramadhan 1446 H', totalHari: 30, lunas: LUNAS_1446 },
  { id: 't3', label: 'Ramadhan 1445 H', totalHari: 0, lunas: {} },
];

test('batas total sesuai kontrak 0..366', () => {
  assert.equal(TOTAL_MIN, 0);
  assert.equal(TOTAL_MAKS, 366);
});

test('validasiTotalHari menerima angka bulat dalam rentang', () => {
  assert.deepEqual(validasiTotalHari(0), { valid: true, nilai: 0, pesan: null });
  assert.deepEqual(validasiTotalHari(7), { valid: true, nilai: 7, pesan: null });
  assert.deepEqual(validasiTotalHari(366), { valid: true, nilai: 366, pesan: null });
  assert.deepEqual(validasiTotalHari('12'), { valid: true, nilai: 12, pesan: null });
});

test('validasiTotalHari menolak kosong, non-angka, desimal, dan di luar rentang', () => {
  assert.equal(validasiTotalHari('').valid, false);
  assert.equal(validasiTotalHari(null).valid, false);
  assert.equal(validasiTotalHari(undefined).valid, false);
  assert.equal(validasiTotalHari('abc').valid, false);
  assert.equal(validasiTotalHari(7.5).valid, false);
  assert.equal(validasiTotalHari(-1).valid, false);
  assert.equal(validasiTotalHari(367).valid, false);
});

test('normalisasiTotalHari memotong ke rentang & membulatkan ke bawah', () => {
  assert.equal(normalisasiTotalHari(7.9), 7);
  assert.equal(normalisasiTotalHari(-3), 0);
  assert.equal(normalisasiTotalHari(999), 366);
  assert.equal(normalisasiTotalHari('abc'), 0);
  assert.equal(normalisasiTotalHari(null), 0);
});

test('jumlahLunas menghitung hanya kunci tanggal valid bernilai true', () => {
  assert.equal(jumlahLunas(TAHUN[0]), 3);
  assert.equal(jumlahLunas(TAHUN[1]), 30);
  assert.equal(jumlahLunas(TAHUN[2]), 0);
  assert.equal(
    jumlahLunas({
      totalHari: 5,
      lunas: { '2026-01-01': true, '2026-01-02': false, rusak: true, '2026-01-03': 1 },
    }),
    1,
  );
});

test('sisaUtang = total - lunas, tidak pernah negatif', () => {
  assert.equal(sisaUtang(TAHUN[0]), 4);
  assert.equal(sisaUtang(TAHUN[1]), 0);
  assert.equal(sisaUtang({ totalHari: 2, lunas: { '2026-01-01': true, '2026-01-02': true, '2026-01-03': true } }), 0);
  assert.equal(sisaUtang(null), 0);
  assert.equal(sisaUtang({}), 0);
});

test('persenLunas membulatkan & dibatasi 100; total 0 → 0', () => {
  assert.equal(persenLunas(TAHUN[0]), 43); // 3/7 = 42,857 → 43
  assert.equal(persenLunas(TAHUN[1]), 100);
  assert.equal(persenLunas(TAHUN[2]), 0);
  assert.equal(persenLunas(null), 0);
});

test('ringkasanSemuaTahun menjumlahkan semua tahun', () => {
  const r = ringkasanSemuaTahun(TAHUN);
  assert.equal(r.jumlahTahun, 3);
  assert.equal(r.totalHari, 37); // 7 + 30 + 0
  assert.equal(r.totalLunas, 33); // 3 + 30 + 0
  assert.equal(r.totalSisa, 4);
  assert.equal(r.persen, 89); // 33/37 = 89,19 → 89
  assert.deepEqual(r.perTahun[0], {
    id: 't1', label: 'Ramadhan 1447 H', totalHari: 7, lunas: 3, sisa: 4, persen: 43,
  });
  assert.deepEqual(r.perTahun[1], {
    id: 't2', label: 'Ramadhan 1446 H', totalHari: 30, lunas: 30, sisa: 0, persen: 100,
  });
});

test('ringkasanSemuaTahun defensif terhadap input bukan array', () => {
  const kosong = { jumlahTahun: 0, totalHari: 0, totalLunas: 0, totalSisa: 0, persen: 0, perTahun: [] };
  assert.deepEqual(ringkasanSemuaTahun(null), kosong);
  assert.deepEqual(ringkasanSemuaTahun('teks'), kosong);
  assert.deepEqual(ringkasanSemuaTahun([]), kosong);
});

test('ringkasanSemuaTahun entri rusak tidak melempar & dihitung aman', () => {
  const r = ringkasanSemuaTahun([null, { id: 'x', label: 5, totalHari: 'abc', lunas: 'bukan-objek' }]);
  assert.equal(r.jumlahTahun, 2);
  assert.equal(r.totalHari, 0);
  assert.equal(r.totalLunas, 0);
  assert.equal(r.totalSisa, 0);
});
