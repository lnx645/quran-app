/**
 * Uji node untuk hitungSedekah.js — jalankan:
 *   node --test src/domain/usecases/hitungSedekah.test.mjs
 * Angka harapan dihitung manual dari fixture di bawah.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  JENIS_SEDEKAH,
  totalHari,
  totalHariIni,
  totalBulan,
  progresTarget,
  ringkasanPerJenis,
  ringkasanBulanBerjalan,
} from './hitungSedekah.js';

// Fixture: Oktober 2026 — Subuh 10rb bernominal, Jumat tanpa nominal,
// Umum 50rb, Infaq 25rb; September 2026 — Umum 99rb; entri rusak 2.
const CATATAN = [
  { id: 'a', tanggal: '2026-10-02', nominal: 10_000, jenis: 'Subuh', catatan: '' },
  { id: 'b', tanggal: '2026-10-02', nominal: null, jenis: 'Jumat', catatan: 'kotak amal' },
  { id: 'c', tanggal: '2026-10-05', nominal: 50_000, jenis: 'Umum', catatan: '' },
  { id: 'd', tanggal: '2026-10-05', nominal: 25_000, jenis: 'Infaq', catatan: '' },
  { id: 'e', tanggal: '2026-09-30', nominal: 99_000, jenis: 'Umum', catatan: '' },
  { id: 'x', tanggal: 'bukan-tanggal', nominal: 777_000, jenis: 'Umum', catatan: '' },
  null,
];

test('totalBulan menjumlahkan hanya bulan & tahun yang cocok', () => {
  // Okt 2026: 10.000 + 50.000 + 25.000 = 85.000; 4 catatan, 3 bernominal.
  assert.deepEqual(totalBulan(CATATAN, 2026, 10), {
    total: 85_000, jumlahCatatan: 4, jumlahBernominal: 3,
  });
  // Sep 2026 hanya entri e.
  assert.deepEqual(totalBulan(CATATAN, 2026, 9), {
    total: 99_000, jumlahCatatan: 1, jumlahBernominal: 1,
  });
  // Tahun lain kosong.
  assert.deepEqual(totalBulan(CATATAN, 2025, 10), {
    total: 0, jumlahCatatan: 0, jumlahBernominal: 0,
  });
});

test('totalBulan menolak bulan di luar 1–12', () => {
  assert.deepEqual(totalBulan(CATATAN, 2026, 13), { total: 0, jumlahCatatan: 0, jumlahBernominal: 0 });
  assert.deepEqual(totalBulan(CATATAN, 2026, 0), { total: 0, jumlahCatatan: 0, jumlahBernominal: 0 });
});

test('catatan tanpa nominal dihitung sebagai catatan, bukan uang', () => {
  const h = totalHari(CATATAN, '2026-10-02');
  assert.equal(h.total, 10_000);
  assert.equal(h.jumlahCatatan, 2);
  assert.equal(h.jumlahBernominal, 1);
});

test('totalHari tanggal tanpa catatan menghasilkan nol', () => {
  assert.deepEqual(totalHari(CATATAN, '2026-10-20'), {
    total: 0, jumlahCatatan: 0, jumlahBernominal: 0,
  });
});

test('totalHariIni memakai tanggal lokal dari Date yang diberikan', () => {
  const h = totalHariIni(CATATAN, new Date(2026, 9, 5));
  assert.deepEqual(h, { total: 75_000, jumlahCatatan: 2, jumlahBernominal: 2 });
});

test('progresTarget null bila target tidak diatur / tidak valid', () => {
  assert.equal(progresTarget(50_000, null), null);
  assert.equal(progresTarget(50_000, 0), null);
  assert.equal(progresTarget(50_000, -5), null);
  assert.equal(progresTarget(50_000, 'abc'), null);
});

test('progresTarget menghitung persen & sisa', () => {
  assert.deepEqual(progresTarget(50_000, 200_000), {
    target: 200_000, total: 50_000, persen: 25, sisa: 150_000, tercapai: false,
  });
});

test('progresTarget melampaui target: persen dibatasi 100, sisa 0', () => {
  assert.deepEqual(progresTarget(250_000, 200_000), {
    target: 200_000, total: 250_000, persen: 100, sisa: 0, tercapai: true,
  });
});

test('ringkasanPerJenis mengelompokkan sesuai urutan JENIS_SEDEKAH', () => {
  const per = ringkasanPerJenis(CATATAN);
  assert.deepEqual(per.map((p) => p.jenis), JENIS_SEDEKAH);
  const ambil = (j) => per.find((p) => p.jenis === j);
  assert.deepEqual(ambil('Subuh'), { jenis: 'Subuh', total: 10_000, jumlahCatatan: 1, jumlahBernominal: 1 });
  assert.deepEqual(ambil('Jumat'), { jenis: 'Jumat', total: 0, jumlahCatatan: 1, jumlahBernominal: 0 });
  // Umum = Okt 50.000 + Sep 99.000 (semua catatan, lintas bulan).
  assert.deepEqual(ambil('Umum'), { jenis: 'Umum', total: 149_000, jumlahCatatan: 2, jumlahBernominal: 2 });
  assert.deepEqual(ambil('Infaq'), { jenis: 'Infaq', total: 25_000, jumlahCatatan: 1, jumlahBernominal: 1 });
});

test('ringkasanPerJenis jenis tak dikenal tidak masuk kelompok mana pun', () => {
  const per = ringkasanPerJenis([
    { id: 'z', tanggal: '2026-10-01', nominal: 5_000, jenis: 'Aneh', catatan: '' },
  ]);
  assert.ok(per.every((p) => p.jumlahCatatan === 0 && p.total === 0));
});

test('ringkasanBulanBerjalan menggabungkan total & per jenis bulan itu', () => {
  const r = ringkasanBulanBerjalan(CATATAN, new Date(2026, 9, 20));
  assert.equal(r.tahun, 2026);
  assert.equal(r.bulan, 10);
  assert.equal(r.total, 85_000);
  assert.equal(r.jumlahCatatan, 4);
  assert.equal(r.perJenis.find((p) => p.jenis === 'Umum').total, 50_000);
});

test('defensif: input bukan array tidak melempar error', () => {
  assert.deepEqual(totalBulan(null, 2026, 10), { total: 0, jumlahCatatan: 0, jumlahBernominal: 0 });
  assert.deepEqual(totalHari(undefined, '2026-10-02'), { total: 0, jumlahCatatan: 0, jumlahBernominal: 0 });
  assert.deepEqual(ringkasanPerJenis('teks').map((p) => p.total), [0, 0, 0, 0]);
});

test('nominal negatif / NaN tidak menambah total', () => {
  const h = totalHari(
    [
      { id: 'n1', tanggal: '2026-10-03', nominal: -100, jenis: 'Umum', catatan: '' },
      { id: 'n2', tanggal: '2026-10-03', nominal: Number.NaN, jenis: 'Umum', catatan: '' },
      { id: 'n3', tanggal: '2026-10-03', nominal: 7_000, jenis: 'Umum', catatan: '' },
    ],
    '2026-10-03',
  );
  assert.equal(h.total, 7_000);
  assert.equal(h.jumlahCatatan, 3);
});
