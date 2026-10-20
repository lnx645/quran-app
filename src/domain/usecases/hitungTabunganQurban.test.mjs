/**
 * Uji node untuk hitungTabunganQurban.js — jalankan:
 *   node --test src/domain/usecases/hitungTabunganQurban.test.mjs
 * Angka harapan dihitung manual dari fixture di bawah.
 * Tanggal "sekarang" selalu di-inject agar uji deterministik:
 *   SEKARANG = 20 September 2026.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  JENIS_QURBAN,
  HARGA_DEFAULT_QURBAN,
  totalTerkumpul,
  sisaTarget,
  persenProgres,
  rataRataPerBulan,
  perkiraanBulanTercapai,
  tanggalPerkiraanTercapai,
  formatBulanTahun,
  formatRupiah,
  hitungTabunganQurban,
} from './hitungTabunganQurban.js';

const SEKARANG = new Date(2026, 8, 20); // 20 Sep 2026 (bulan 0-based: 8)

// Fixture utama: Jul 300rb + Agu 300rb + Sep 300rb = 900rb, rentang
// Jul→Sep = 3 bulan → rata-rata tepat 300rb/bulan.
// Dua entri rusak (tanggal tidak valid & nominal negatif) tidak dihitung.
const SETORAN = [
  { id: 'a', tanggal: '2026-07-10', nominal: 300_000 },
  { id: 'b', tanggal: '2026-08-10', nominal: 300_000 },
  { id: 'c', tanggal: '2026-09-05', nominal: 300_000 },
  { id: 'x', tanggal: 'bukan-tanggal', nominal: 777_000 },
  { id: 'y', tanggal: '2026-09-06', nominal: -50_000 },
];

test('konstanta: jenis & harga awal perkiraan sesuai ketetapan', () => {
  assert.deepEqual(JENIS_QURBAN, ['kambing', 'sapi-bersama', 'sapi-utuh']);
  assert.equal(HARGA_DEFAULT_QURBAN.kambing, 2_500_000);
  assert.equal(HARGA_DEFAULT_QURBAN['sapi-bersama'], 3_500_000);
  assert.equal(HARGA_DEFAULT_QURBAN['sapi-utuh'], 24_000_000);
});

test('totalTerkumpul menjumlahkan hanya setoran yang valid', () => {
  assert.equal(totalTerkumpul(SETORAN), 900_000);
  assert.equal(totalTerkumpul([]), 0);
  assert.equal(totalTerkumpul([{ id: 'n', tanggal: '2026-09-01', nominal: Number.NaN }]), 0);
});

test('totalTerkumpul defensif terhadap input bukan array', () => {
  assert.equal(totalTerkumpul(null), 0);
  assert.equal(totalTerkumpul(undefined), 0);
  assert.equal(totalTerkumpul('teks'), 0);
});

test('sisaTarget: selisih harga dengan total, minimum 0', () => {
  assert.equal(sisaTarget(900_000, 2_500_000), 1_600_000);
  assert.equal(sisaTarget(2_500_000, 2_500_000), 0);
  assert.equal(sisaTarget(3_000_000, 2_500_000), 0);
  // Bentuk daftar setoran juga diterima.
  assert.equal(sisaTarget(SETORAN, 2_500_000), 1_600_000);
  // Harga tidak sah → 0.
  assert.equal(sisaTarget(900_000, 0), 0);
  assert.equal(sisaTarget(900_000, null), 0);
});

test('persenProgres: dibulatkan dan dibatasi 100', () => {
  assert.equal(persenProgres(500_000, 2_000_000), 25);
  assert.equal(persenProgres(900_000, 2_500_000), 36);
  assert.equal(persenProgres(3_000_000, 2_500_000), 100);
  assert.equal(persenProgres(0, 2_500_000), 0);
  assert.equal(persenProgres(500_000, 0), 0);
  assert.equal(persenProgres(SETORAN, 2_500_000), 36);
});

test('rataRataPerBulan: total dibagi rentang bulan pertama→sekarang (inklusif)', () => {
  // 900rb / 3 bulan (Jul, Agu, Sep) = 300rb.
  assert.equal(rataRataPerBulan(SETORAN, SEKARANG), 300_000);
  // Setoran hanya bulan berjalan: rentang 1 bulan → rata-rata = total.
  assert.equal(
    rataRataPerBulan([{ id: 'a', tanggal: '2026-09-02', nominal: 500_000 }], SEKARANG),
    500_000,
  );
  // Setoran pertama bulan lalu: rentang 2 bulan → 400rb / 2 = 200rb.
  assert.equal(
    rataRataPerBulan(
      [
        { id: 'a', tanggal: '2026-08-15', nominal: 100_000 },
        { id: 'b', tanggal: '2026-09-15', nominal: 300_000 },
      ],
      SEKARANG,
    ),
    200_000,
  );
  assert.equal(rataRataPerBulan([], SEKARANG), 0);
  assert.equal(rataRataPerBulan(null, SEKARANG), 0);
});

test('perkiraanBulanTercapai: ceil(sisa / rata-rata)', () => {
  // Sisa 1,6jt / 300rb = 5,33 → 6 bulan.
  assert.equal(perkiraanBulanTercapai(SETORAN, 2_500_000, SEKARANG), 6);
  // Sisa pas habis dibagi: target 1,5jt, sisa 600rb / 300rb = tepat 2.
  assert.equal(perkiraanBulanTercapai(SETORAN, 1_500_000, SEKARANG), 2);
});

test('perkiraanBulanTercapai: 0 bila sudah tercapai, null bila belum ada pola', () => {
  assert.equal(perkiraanBulanTercapai(SETORAN, 900_000, SEKARANG), 0);
  assert.equal(perkiraanBulanTercapai(SETORAN, 500_000, SEKARANG), 0);
  assert.equal(perkiraanBulanTercapai([], 2_500_000, SEKARANG), null);
  assert.equal(perkiraanBulanTercapai(null, 2_500_000, SEKARANG), null);
  assert.equal(perkiraanBulanTercapai(SETORAN, 0, SEKARANG), null);
  assert.equal(perkiraanBulanTercapai(SETORAN, null, SEKARANG), null);
});

test('tanggalPerkiraanTercapai & formatBulanTahun', () => {
  // Sep 2026 + 6 bulan → Maret 2027.
  const t = tanggalPerkiraanTercapai(SETORAN, 2_500_000, SEKARANG);
  assert.equal(formatBulanTahun(t), 'Maret 2027');
  // Sudah tercapai → bulan berjalan.
  const kini = tanggalPerkiraanTercapai(SETORAN, 900_000, SEKARANG);
  assert.equal(formatBulanTahun(kini), 'September 2026');
  // Tanpa pola setoran → null.
  assert.equal(tanggalPerkiraanTercapai([], 2_500_000, SEKARANG), null);
  assert.equal(formatBulanTahun(null), '');
  assert.equal(formatBulanTahun(new Date(2027, 0, 15)), 'Januari 2027');
});

test('formatRupiah dipakai ulang dari hitungZakat (bukan duplikasi)', () => {
  assert.equal(formatRupiah(2_500_000), 'Rp2.500.000');
  assert.equal(formatRupiah(0), 'Rp0');
  assert.equal(formatRupiah(900_000), 'Rp900.000');
});

test('hitungTabunganQurban menggabungkan ringkasan lengkap', () => {
  const r = hitungTabunganQurban({ jenis: 'kambing', harga: 2_500_000 }, SETORAN, SEKARANG);
  assert.equal(r.jenis, 'kambing');
  assert.equal(r.hargaTarget, 2_500_000);
  assert.equal(r.totalTerkumpul, 900_000);
  assert.equal(r.sisaTarget, 1_600_000);
  assert.equal(r.persenProgres, 36);
  assert.equal(r.rataRataPerBulan, 300_000);
  assert.equal(r.perkiraanBulanTercapai, 6);
  assert.equal(formatBulanTahun(r.tanggalPerkiraan), 'Maret 2027');
  assert.equal(r.tercapai, false);
  // Jumlah setoran bertanggal valid: 4 — entri nominal negatif tetap
  // terhitung sebagai setoran (pola hitungSedekah: jumlahCatatan), hanya
  // nominalnya yang tidak ikut dijumlahkan; entri bertanggal rusak gugur.
  assert.equal(r.jumlahSetoran, 4);
});

test('hitungTabunganQurban tanpa target: harga 0, perkiraan null, tetap jujur', () => {
  const r = hitungTabunganQurban(null, SETORAN, SEKARANG);
  assert.equal(r.jenis, null);
  assert.equal(r.hargaTarget, 0);
  assert.equal(r.totalTerkumpul, 900_000);
  assert.equal(r.sisaTarget, 0);
  assert.equal(r.persenProgres, 0);
  assert.equal(r.perkiraanBulanTercapai, null);
  assert.equal(r.tanggalPerkiraan, null);
  assert.equal(r.tercapai, false);
});

test('hitungTabunganQurban jenis tidak dikenal dianggap belum ada target', () => {
  const r = hitungTabunganQurban({ jenis: 'unta', harga: 50_000_000 }, SETORAN, SEKARANG);
  assert.equal(r.jenis, null);
  assert.equal(r.hargaTarget, 0);
  assert.equal(r.tercapai, false);
});
