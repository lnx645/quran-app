/**
 * Uji node untuk hitungMusafir.js — jalankan: node src/domain/usecases/hitungMusafir.test.mjs
 * Batas safar yang dipakai: 81 km (2 marhalah, jumhur ulama).
 */
import assert from 'node:assert/strict';
import { hitungMusafir, JARAK_MUSAFIR_KM, BATAS_MUKIM_HARI } from './hitungMusafir.js';

let lulus = 0;
const kasus = (nama, fn) => {
  fn();
  lulus += 1;
  console.log(`  ✓ ${nama}`);
};

console.log('hitungMusafir.test.mjs');

// 1) Konstanta batas sesuai ketentuan jumhur.
kasus('1. Konstanta: batas 81 km, batas mukim 4 hari', () => {
  assert.equal(JARAK_MUSAFIR_KM, 81);
  assert.equal(BATAS_MUKIM_HARI, 4);
});

// 2) Jarak jauh di atas batas → musafir, qashar & jama' boleh.
kasus('2. 150 km: musafir, boleh qashar & jama', () => {
  const h = hitungMusafir(150);
  assert.equal(h.valid, true);
  assert.equal(h.status, 'musafir');
  assert.equal(h.bolehQashar, true);
  assert.equal(h.bolehJama, true);
  assert.ok(h.ringkasan.some((r) => r.includes('Batas mukim')));
});

// 3) Tepat di batas → musafir (>= 81 km).
kasus('3. Tepat 81 km: musafir', () => {
  const h = hitungMusafir(81);
  assert.equal(h.valid, true);
  assert.equal(h.status, 'musafir');
  assert.equal(h.bolehQashar, true);
});

// 4) Sedikit di bawah batas → belum musafir.
kasus('4. 80,9 km: belum musafir', () => {
  const h = hitungMusafir(80.9);
  assert.equal(h.valid, true);
  assert.equal(h.status, 'belum-musafir');
  assert.equal(h.bolehQashar, false);
  assert.equal(h.bolehJama, false);
});

// 5) Jarak pendek → belum musafir.
kasus('5. 20 km: belum musafir', () => {
  const h = hitungMusafir(20);
  assert.equal(h.valid, true);
  assert.equal(h.status, 'belum-musafir');
  assert.ok(h.keterangan.includes('belum mencapai'));
});

// 6) Input tidak valid → valid = false, status belum-musafir.
kasus('6. Input kosong/nol/negatif/teks: tidak valid', () => {
  for (const input of [0, -10, '', 'abc', null, undefined, NaN]) {
    const h = hitungMusafir(input);
    assert.equal(h.valid, false, `input ${String(input)} harus tidak valid`);
    assert.equal(h.status, 'belum-musafir');
    assert.equal(h.bolehQashar, false);
    assert.equal(h.jarakKm, 0);
  }
});

// 7) String angka tetap terbaca sebagai jarak.
kasus('7. String "100": musafir', () => {
  const h = hitungMusafir('100');
  assert.equal(h.valid, true);
  assert.equal(h.jarakKm, 100);
  assert.equal(h.status, 'musafir');
});

console.log(`\nSemua ${lulus} kasus LULUS.`);
