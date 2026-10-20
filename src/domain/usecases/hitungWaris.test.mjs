/**
 * Uji node untuk hitungWaris.js — jalankan: node src/domain/usecases/hitungWaris.test.mjs
 * Semua pecahan harapan dihitung manual terlebih dahulu (lihat komentar per kasus).
 */
import assert from 'node:assert/strict';
import { hitungWaris } from './hitungWaris.js';

let lulus = 0;
const kasus = (nama, fn) => {
  fn();
  lulus += 1;
  console.log(`  ✓ ${nama}`);
};
const baris = (hasil, kunci) => {
  const b = hasil.baris.find((r) => r.kunci === kunci);
  assert.ok(b, `baris ${kunci} harus ada`);
  return b;
};
const pecahan = (hasil, kunci, num, den) => {
  assert.deepEqual(baris(hasil, kunci).pecahan, { num, den }, `${kunci} harus ${num}/${den}`);
};
const jumlahPecahan = (hasil) =>
  hasil.baris.reduce(
    (acc, b) => {
      const n = acc.num * b.pecahan.den + b.pecahan.num * acc.den;
      const d = acc.den * b.pecahan.den;
      // sederhanakan kasar via gcd lokal
      let x = Math.abs(n);
      let y = Math.abs(d);
      while (y) [x, y] = [y, x % y];
      const g = x || 1;
      return { num: n / g, den: d / g };
    },
    { num: 0, den: 1 },
  );

console.log('hitungWaris.test.mjs');

// 1) RADD — yang wafat suami: istri + 2 anak perempuan + ibu.
//    Fardhu: istri 1/8 (ada anak), ibu 1/6 (ada anak), 2 anak pr 2/3.
//    Total = 3/24 + 4/24 + 16/24 = 23/24 → sisa 1/24.
//    Tidak ada 'ashabah → radd ke ibu + anak pr (bukan istri), proporsional 4:16.
//    Ibu: 1/6 + (1/24 × 4/20) = 1/6 + 1/120 = 21/120 = 7/40.
//    Anak pr: 2/3 + (1/24 × 16/20) = 2/3 + 1/30 = 21/30 = 7/10. Istri tetap 1/8.
kasus('1. Radd: istri + 2 anak perempuan + ibu', () => {
  const h = hitungWaris({
    totalHarta: 240_000_000, pasangan: 'istri', ibu: true, anakPerempuan: 2,
  });
  assert.equal(h.valid, true);
  assert.ok(h.statusKasus.includes('radd'));
  pecahan(h, 'pasangan', 1, 8);
  pecahan(h, 'ibu', 7, 40);
  pecahan(h, 'anakPerempuan', 7, 10);
  assert.deepEqual(baris(h, 'anakPerempuan').perOrang.pecahan, { num: 7, den: 20 });
  assert.deepEqual(jumlahPecahan(h), { num: 1, den: 1 });
});

// 2) 'AUL — yang wafat istri: suami + 2 anak perempuan + ibu.
//    Fardhu: suami 1/4 + ibu 1/6 + anak pr 2/3 = 3/12 + 2/12 + 8/12 = 13/12 > 1
//    → 'aul 12→13: suami 3/13, ibu 2/13, anak pr 8/13.
kasus("2. 'Aul: suami + 2 anak perempuan + ibu", () => {
  const h = hitungWaris({
    totalHarta: 130_000_000, pasangan: 'suami', ibu: true, anakPerempuan: 2,
  });
  assert.ok(h.statusKasus.includes('aul'));
  pecahan(h, 'pasangan', 3, 13);
  pecahan(h, 'ibu', 2, 13);
  pecahan(h, 'anakPerempuan', 8, 13);
  assert.deepEqual(jumlahPecahan(h), { num: 1, den: 1 });
});

// 3) 'UMARIYYAH — suami + ayah + ibu, tanpa anak.
//    Suami 1/2; ibu = 1/3 dari sisa (1/2) = 1/6; ayah sisa = 1 − 1/2 − 1/6 = 1/3.
kasus("3. 'Umariyyah: suami + ayah + ibu", () => {
  const h = hitungWaris({ totalHarta: 120_000_000, pasangan: 'suami', ayah: true, ibu: true });
  pecahan(h, 'pasangan', 1, 2);
  pecahan(h, 'ibu', 1, 6);
  pecahan(h, 'ayah', 1, 3);
  assert.deepEqual(jumlahPecahan(h), { num: 1, den: 1 });
});

// 4) Suami + ayah saja: suami 1/2 (tanpa anak), ayah 'ashabah sisa 1/2.
kasus('4. Suami + ayah: ayah ashabah 1/2', () => {
  const h = hitungWaris({ totalHarta: 100_000_000, pasangan: 'suami', ayah: true });
  pecahan(h, 'pasangan', 1, 2);
  pecahan(h, 'ayah', 1, 2);
  assert.equal(baris(h, 'ayah').status, 'ashabah');
});

// 5) 1 anak perempuan + ayah: anak 1/2; ayah 1/6 + sisa (1 − 1/2 − 1/6 = 1/3) = 1/2.
kasus('5. Anak perempuan + ayah: ayah 1/6 + sisa = 1/2', () => {
  const h = hitungWaris({ totalHarta: 60_000_000, anakPerempuan: 1, ayah: true });
  pecahan(h, 'anakPerempuan', 1, 2);
  pecahan(h, 'ayah', 1, 2);
  assert.equal(baris(h, 'ayah').status, 'fardhu-ashabah');
  assert.deepEqual(jumlahPecahan(h), { num: 1, den: 1 });
});

// 6) Anak laki-laki + anak perempuan: 'ashabah 2:1 → 2/3 dan 1/3.
kasus("6. Anak lk + anak pr: 'ashabah 2:1", () => {
  const h = hitungWaris({ totalHarta: 90_000_000, anakLaki: 1, anakPerempuan: 1 });
  assert.ok(h.statusKasus.includes('ashabah'));
  pecahan(h, 'anakLaki', 2, 3);
  pecahan(h, 'anakPerempuan', 1, 3);
});

// 7) 'AUL saudari — yang wafat suami: istri + ibu + 1 saudara perempuan kandung.
//    Saudara hanya 1 → ibu tetap 1/3. Istri 1/4 (tanpa anak), saudari 1/2.
//    Total = 3/12 + 4/12 + 6/12 = 13/12 → 'aul: istri 3/13, ibu 4/13, saudari 6/13.
kasus("7. 'Aul: istri + ibu + 1 saudara perempuan", () => {
  const h = hitungWaris({
    totalHarta: 130_000_000, pasangan: 'istri', ibu: true, saudaraPerempuan: 1,
  });
  assert.ok(h.statusKasus.includes('aul'));
  pecahan(h, 'pasangan', 3, 13);
  pecahan(h, 'ibu', 4, 13);
  pecahan(h, 'saudaraPerempuan', 6, 13);
});

// 8) Saudara terhalang ayah — istri + ayah + saudara laki-laki.
//    Istri 1/4 (tanpa anak); ayah 'ashabah sisa 3/4; saudara lk mahjub = 0.
kasus('8. Saudara laki-laki terhalang oleh ayah', () => {
  const h = hitungWaris({
    totalHarta: 80_000_000, pasangan: 'istri', ayah: true, saudaraLaki: 1,
  });
  pecahan(h, 'pasangan', 1, 4);
  pecahan(h, 'ayah', 3, 4);
  pecahan(h, 'saudaraLaki', 0, 1);
  assert.equal(baris(h, 'saudaraLaki').status, 'terhalang');
});

// 9) Saudara terhalang anak laki-laki — istri + 1 anak lk + 1 saudara lk.
//    Istri 1/8 (ada anak); anak lk 'ashabah sisa 7/8; saudara lk 0.
kasus('9. Saudara laki-laki terhalang oleh anak laki-laki', () => {
  const h = hitungWaris({
    totalHarta: 80_000_000, pasangan: 'istri', anakLaki: 1, saudaraLaki: 1,
  });
  pecahan(h, 'pasangan', 1, 8);
  pecahan(h, 'anakLaki', 7, 8);
  pecahan(h, 'saudaraLaki', 0, 1);
  assert.equal(baris(h, 'saudaraLaki').status, 'terhalang');
});

// 10) Ibu tereduksi oleh saudara yang mahjub — suami + ayah + ibu + 2 saudara lk.
//     Saudara ≥ 2 → ibu 1/6 (bukan 'umariyyah). Suami 1/2; ayah sisa
//     = 1 − 1/2 − 1/6 = 1/3; kedua saudara terhalang ayah = 0.
kasus('10. Ibu 1/6 karena 2 saudara (yang terhalang ayah)', () => {
  const h = hitungWaris({
    totalHarta: 60_000_000, pasangan: 'suami', ayah: true, ibu: true, saudaraLaki: 2,
  });
  pecahan(h, 'pasangan', 1, 2);
  pecahan(h, 'ibu', 1, 6);
  pecahan(h, 'ayah', 1, 3);
  pecahan(h, 'saudaraLaki', 0, 1);
});

// 11) 'Umariyyah II — istri + ayah + ibu (yang wafat suami).
//     Istri 1/4; ibu = 1/3 × sisa 3/4 = 1/4; ayah sisa = 1/2.
kasus("11. 'Umariyyah II: istri + ayah + ibu", () => {
  const h = hitungWaris({ totalHarta: 40_000_000, pasangan: 'istri', ayah: true, ibu: true });
  pecahan(h, 'pasangan', 1, 4);
  pecahan(h, 'ibu', 1, 4);
  pecahan(h, 'ayah', 1, 2);
});

// 12) Radd penerima tunggal: ibu saja → 1/3 + radd 2/3 = 1.
//     Anak perempuan tunggal saja → 1/2 + radd 1/2 = 1.
kasus('12. Radd: ibu tunggal & anak perempuan tunggal masing-masing = 1', () => {
  const hIbu = hitungWaris({ totalHarta: 30_000_000, ibu: true });
  assert.ok(hIbu.statusKasus.includes('radd'));
  pecahan(hIbu, 'ibu', 1, 1);
  const hAnak = hitungWaris({ totalHarta: 30_000_000, anakPerempuan: 1 });
  assert.ok(hAnak.statusKasus.includes('radd'));
  pecahan(hAnak, 'anakPerempuan', 1, 1);
});

// 13) 'Ashabah bil-ghair: 1 saudara lk + 1 saudara pr saja → 2/3 dan 1/3.
kasus("13. Saudara lk + pr: 'ashabah bil-ghair 2:1", () => {
  const h = hitungWaris({ totalHarta: 90_000_000, saudaraLaki: 1, saudaraPerempuan: 1 });
  pecahan(h, 'saudaraLaki', 2, 3);
  pecahan(h, 'saudaraPerempuan', 1, 3);
  assert.equal(baris(h, 'saudaraPerempuan').status, 'ashabah');
});

// 14) 'Ashabah ma'a al-ghair: 1 anak pr + 1 saudara pr (tanpa ayah/saudara lk).
//     Anak pr 1/2 (fardhu); saudari mengambil sisa 1/2.
kasus("14. Saudari ma'a al-ghair bersama anak perempuan", () => {
  const h = hitungWaris({ totalHarta: 50_000_000, anakPerempuan: 1, saudaraPerempuan: 1 });
  pecahan(h, 'anakPerempuan', 1, 2);
  pecahan(h, 'saudaraPerempuan', 1, 2);
  assert.equal(baris(h, 'saudaraPerempuan').status, 'ashabah');
});

// 15) Nominal kasus 3 dengan harta Rp120.000.000: 60jt / 20jt / 40jt, total pas.
kasus('15. Nominal Rp kasus umariyyah', () => {
  const h = hitungWaris({ totalHarta: 120_000_000, pasangan: 'suami', ayah: true, ibu: true });
  assert.equal(baris(h, 'pasangan').nominal, 60_000_000);
  assert.equal(baris(h, 'ibu').nominal, 20_000_000);
  assert.equal(baris(h, 'ayah').nominal, 40_000_000);
  const totalNominal = h.baris.reduce((s, b) => s + b.nominal, 0);
  assert.equal(totalNominal, 120_000_000);
});

// 16) Tanpa ahli waris → tidak valid.
kasus('16. Tanpa ahli waris: valid = false', () => {
  const h = hitungWaris({ totalHarta: 100_000_000 });
  assert.equal(h.valid, false);
  assert.equal(h.baris.length, 0);
});

// 17) Suami saja: 1/2, sisa 1/2 tidak terbagi (tidak ada penerima radd/'ashabah).
kasus('17. Suami saja: sisa tak terbagi 1/2', () => {
  const h = hitungWaris({ totalHarta: 100_000_000, pasangan: 'suami' });
  pecahan(h, 'pasangan', 1, 2);
  assert.deepEqual(h.sisaTakTerbagi, { num: 1, den: 2 });
  assert.ok(h.statusKasus.includes('sisa-tak-terbagi'));
});

// 18) Dua saudara perempuan saja: fardhu 2/3 + radd 1/3 → kelompok 1 (per orang 1/2).
kasus('18. Radd: 2 saudara perempuan saja = 1', () => {
  const h = hitungWaris({ totalHarta: 60_000_000, saudaraPerempuan: 2 });
  assert.ok(h.statusKasus.includes('radd'));
  pecahan(h, 'saudaraPerempuan', 1, 1);
  assert.deepEqual(baris(h, 'saudaraPerempuan').perOrang.pecahan, { num: 1, den: 2 });
});

console.log(`\nSemua ${lulus} kasus LULUS.`);
