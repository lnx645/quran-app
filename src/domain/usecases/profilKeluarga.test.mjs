/**
 * Uji node untuk profilKeluarga.js + simulasi migrasi profil dengan stub
 * localStorage — jalankan:
 *   node --test src/domain/usecases/profilKeluarga.test.mjs
 *
 * Simulasi migrasi membuktikan prinsip keselamatan fitur Profil Keluarga:
 * data lama (kunci tanpa akhiran) dibaca profil Utama apa adanya, tidak
 * berubah saat profil lain aktif, dan tetap utuh setelah profil lain
 * dihapus.
 */
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  ID_PROFIL_UTAMA,
  MAKS_PROFIL,
  kunciProfil,
  normalisasiDaftarProfil,
  buatIdProfil,
} from './profilKeluarga.js';

// ── Stub localStorage minimal (Map) untuk uji repository di node ──────
function buatStubStorage() {
  const peta = new Map();
  return {
    getItem: (k) => (peta.has(k) ? peta.get(k) : null),
    setItem: (k, v) => peta.set(String(k), String(v)),
    removeItem: (k) => peta.delete(k),
    key: (i) => [...peta.keys()][i] ?? null,
    get length() {
      return peta.size;
    },
    _peta: peta,
  };
}

globalThis.localStorage = buatStubStorage();

const { LocalProfilRepository } = await import(
  '../../data/repositories/LocalProfilRepository.js'
);
const { LocalMutabaahRepository } = await import(
  '../../data/repositories/LocalMutabaahRepository.js'
);

beforeEach(() => {
  globalThis.localStorage._peta.clear();
});

// ── kunciProfil ────────────────────────────────────────────────────────

test('kunciProfil: profil utama memakai kunci dasar apa adanya', () => {
  assert.equal(kunciProfil('noor.mutabaah.v1', 'utama'), 'noor.mutabaah.v1');
  assert.equal(kunciProfil('noor.mutabaah.v1', ID_PROFIL_UTAMA), 'noor.mutabaah.v1');
});

test('kunciProfil: profil lain memakai kunci berakhiran #id', () => {
  assert.equal(kunciProfil('noor.mutabaah.v1', 'anak1'), 'noor.mutabaah.v1#anak1');
  assert.equal(kunciProfil('noor.bookmark.v1', 'ibu'), 'noor.bookmark.v1#ibu');
});

test('kunciProfil: id kosong/null/undefined memakai kunci dasar', () => {
  assert.equal(kunciProfil('noor.mutabaah.v1', ''), 'noor.mutabaah.v1');
  assert.equal(kunciProfil('noor.mutabaah.v1', null), 'noor.mutabaah.v1');
  assert.equal(kunciProfil('noor.mutabaah.v1', undefined), 'noor.mutabaah.v1');
});

// ── normalisasiDaftarProfil ────────────────────────────────────────────

test('normalisasi: data rusak/kosong → hanya Utama aktif', () => {
  for (const rusak of [null, undefined, 'teks', 42, [], {}, { daftar: 'bukan-array' }]) {
    assert.deepEqual(normalisasiDaftarProfil(rusak), {
      aktifId: 'utama',
      daftar: [{ id: 'utama', nama: 'Utama' }],
    });
  }
});

test('normalisasi: duplikat id dibersihkan, id tidak aman di-slug', () => {
  const hasil = normalisasiDaftarProfil({
    aktifId: 'anak-1',
    daftar: [
      { id: 'Anak 1!', nama: 'Anak Pertama' },
      { id: 'anak-1', nama: 'Duplikat' },
      { id: '###', nama: 'Hantu' },
      { id: 'ibu', nama: 'Ibu' },
    ],
  });
  assert.deepEqual(
    hasil.daftar.map((p) => p.id),
    ['utama', 'anak-1', 'ibu'],
  );
  assert.equal(hasil.aktifId, 'anak-1');
  assert.equal(hasil.daftar[1].nama, 'Anak Pertama');
});

test('normalisasi: lebih dari 6 profil dipotong ke MAKS_PROFIL', () => {
  const daftar = Array.from({ length: 9 }, (_, i) => ({ id: `p${i}`, nama: `P${i}` }));
  const hasil = normalisasiDaftarProfil({ aktifId: 'p0', daftar });
  assert.equal(hasil.daftar.length, MAKS_PROFIL);
  assert.equal(hasil.daftar[0].id, 'utama');
});

test('normalisasi: aktifId yatim (tidak ada di daftar) → utama', () => {
  const hasil = normalisasiDaftarProfil({
    aktifId: 'sudah-dihapus',
    daftar: [{ id: 'ibu', nama: 'Ibu' }],
  });
  assert.equal(hasil.aktifId, 'utama');
});

test('normalisasi: nama kosong diberi cadangan, nama panjang terpotong', () => {
  const hasil = normalisasiDaftarProfil({
    aktifId: 'utama',
    daftar: [
      { id: 'utama', nama: '' },
      { id: 'ayah', nama: 'x'.repeat(100) },
    ],
  });
  assert.equal(hasil.daftar.find((p) => p.id === 'utama').nama, 'Utama');
  assert.ok(hasil.daftar.find((p) => p.id === 'ayah').nama.length <= 40);
});

// ── buatIdProfil ───────────────────────────────────────────────────────

test('buatIdProfil: slug dari nama, unik, tidak pernah utama', () => {
  const daftar = [{ id: 'utama', nama: 'Utama' }];
  assert.equal(buatIdProfil('Anak 1', daftar), 'anak-1');
  assert.equal(buatIdProfil('Anak 1', [...daftar, { id: 'anak-1', nama: 'x' }]), 'anak-1-2');
  assert.equal(buatIdProfil('Utama', daftar), 'profil-utama');
  assert.equal(buatIdProfil('!!!', daftar), 'profil');
  assert.equal(buatIdProfil('', daftar), 'profil');
});

// ── Simulasi migrasi: LocalProfilRepository + LocalMutabaahRepository ──

const DATA_LAMA = JSON.stringify({ '2026-10-19': { subuh: true, tilawah: 4 } });

test('migrasi (i): profil Utama membaca data lama dari kunci tanpa akhiran', () => {
  localStorage.setItem('noor.mutabaah.v1', DATA_LAMA);
  // Belum ada noor.profil.v1 sama sekali → bawaan Utama aktif.
  assert.equal(LocalProfilRepository.load().aktifId, 'utama');
  assert.deepEqual(LocalMutabaahRepository.loadSemua(), JSON.parse(DATA_LAMA));
});

test('migrasi (ii): profil baru mulai kosong; tulis ke kunci berakhiran; kunci lama utuh', () => {
  localStorage.setItem('noor.mutabaah.v1', DATA_LAMA);
  const sebelum = localStorage.getItem('noor.mutabaah.v1');

  const dibuat = LocalProfilRepository.tambahProfil('Anak 1');
  const anak = dibuat.daftar.find((p) => p.nama === 'Anak 1');
  assert.ok(anak);
  LocalProfilRepository.aturAktif(anak.id);
  assert.equal(LocalProfilRepository.kunciAktif('noor.mutabaah.v1'), `noor.mutabaah.v1#${anak.id}`);

  // Profil baru membaca kosong, lalu menulis datanya sendiri.
  assert.deepEqual(LocalMutabaahRepository.loadSemua(), {});
  LocalMutabaahRepository.saveSemua({ '2026-10-20': { dzuhur: true } });
  assert.deepEqual(JSON.parse(localStorage.getItem(`noor.mutabaah.v1#${anak.id}`)), {
    '2026-10-20': { dzuhur: true },
  });
  // Kunci lama TIDAK berubah — string persis sama.
  assert.equal(localStorage.getItem('noor.mutabaah.v1'), sebelum);
});

test('migrasi (iii): kembali ke Utama → data lama utuh terbaca lagi', () => {
  localStorage.setItem('noor.mutabaah.v1', DATA_LAMA);
  const dibuat = LocalProfilRepository.tambahProfil('Anak 1');
  const anak = dibuat.daftar.find((p) => p.nama === 'Anak 1');
  LocalProfilRepository.aturAktif(anak.id);
  LocalMutabaahRepository.saveSemua({ '2026-10-20': { dzuhur: true } });

  LocalProfilRepository.aturAktif('utama');
  assert.equal(LocalProfilRepository.kunciAktif('noor.mutabaah.v1'), 'noor.mutabaah.v1');
  assert.deepEqual(LocalMutabaahRepository.loadSemua(), JSON.parse(DATA_LAMA));
});

test('migrasi (iv): hapus profil lain → kunci berakhirannya hilang; kunci lama & daftar profil tetap', () => {
  localStorage.setItem('noor.mutabaah.v1', DATA_LAMA);
  localStorage.setItem('noor.bookmark.v1#anak1', '[]');
  const dibuat = LocalProfilRepository.tambahProfil('Anak 1');
  const anak = dibuat.daftar.find((p) => p.nama === 'Anak 1');
  localStorage.setItem(`noor.mutabaah.v1#${anak.id}`, '{"2026-10-20":{}}');
  // Kunci profil LAIN yang mirip tidak boleh ikut terhapus.
  localStorage.setItem(`noor.mutabaah.v1#${anak.id}-cadangan`, '"jangan-hilang"');

  LocalProfilRepository.aturAktif('utama');
  assert.equal(LocalProfilRepository.hapusProfil(anak.id), true);

  assert.equal(localStorage.getItem(`noor.mutabaah.v1#${anak.id}`), null);
  assert.equal(localStorage.getItem(`noor.mutabaah.v1#${anak.id}-cadangan`), '"jangan-hilang"');
  assert.equal(localStorage.getItem('noor.mutabaah.v1'), DATA_LAMA);
  assert.equal(localStorage.getItem('noor.bookmark.v1#anak1'), '[]');
  assert.ok(localStorage.getItem('noor.profil.v1'));
  assert.deepEqual(LocalProfilRepository.load().daftar.map((p) => p.id), ['utama']);
});

test('hapusProfil DITOLAK untuk utama dan untuk profil yang sedang aktif', () => {
  localStorage.setItem('noor.mutabaah.v1', DATA_LAMA);
  assert.equal(LocalProfilRepository.hapusProfil('utama'), false);
  const dibuat = LocalProfilRepository.tambahProfil('Ibu');
  const ibu = dibuat.daftar.find((p) => p.nama === 'Ibu');
  LocalProfilRepository.aturAktif(ibu.id);
  assert.equal(LocalProfilRepository.hapusProfil(ibu.id), false);
  assert.equal(localStorage.getItem('noor.mutabaah.v1'), DATA_LAMA);
});

test('tambahProfil berhenti di MAKS_PROFIL', () => {
  let state = LocalProfilRepository.load();
  for (let i = 0; i < MAKS_PROFIL + 3; i += 1) {
    state = LocalProfilRepository.tambahProfil(`Anggota ${i}`);
  }
  assert.equal(state.daftar.length, MAKS_PROFIL);
});

test('kunciAktif: kegagalan baca profil → kunci dasar', () => {
  localStorage.setItem('noor.profil.v1', '{json-rusak');
  assert.equal(LocalProfilRepository.kunciAktif('noor.mutabaah.v1'), 'noor.mutabaah.v1');
});
