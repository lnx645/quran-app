/**
 * Use case Profil Keluarga Lokal (fungsi MURNI — tanpa DOM/localStorage).
 *
 * Noor dipakai bersama dalam satu keluarga pada satu perangkat. Setiap
 * anggota boleh punya profil sendiri agar data ibadahnya (bookmark,
 * hafalan, tracker, dst.) tidak tercampur.
 *
 * PRINSIP KESELAMATAN DATA (mutlak, jangan dilanggar perubahan berikutnya):
 * - Profil bawaan ber-id 'utama' memakai kunci localStorage LAMA persis
 *   seperti sebelum fitur ini ada — tanpa akhiran apa pun. Data pengguna
 *   lama tidak dipindah, tidak ditulis ulang, tidak dihapus oleh kode
 *   profil.
 * - Profil lain memakai kunci berakhiran `#<idProfil>`,
 *   mis. `noor.mutabaah.v1#anak1`.
 */

export const ID_PROFIL_UTAMA = 'utama';
export const MAKS_PROFIL = 6;
export const NAMA_PROFIL_UTAMA = 'Utama';
const MAKS_PANJANG_NAMA = 40;
const MAKS_PANJANG_ID = 24;

/**
 * Ubah teks bebas menjadi slug id yang aman untuk akhiran kunci:
 * huruf kecil, angka, dan strip saja; tanpa strip di tepi; maks 24 char.
 * Mengembalikan '' bila tidak ada karakter yang bisa dipakai.
 */
export function slugProfil(teks) {
  const mentah = typeof teks === 'string' ? teks : '';
  return mentah
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAKS_PANJANG_ID)
    .replace(/-+$/g, '');
}

function namaAman(nama, cadangan) {
  const bersih = typeof nama === 'string' ? nama.trim().slice(0, MAKS_PANJANG_NAMA).trim() : '';
  return bersih || cadangan;
}

/**
 * Resolusi kunci penyimpanan untuk satu profil.
 * 'utama' / id kosong → kunci dasar APA ADANYA (data lama utuh).
 * Profil lain → `${kunciDasar}#${idProfil}`.
 */
export function kunciProfil(kunciDasar, idProfil) {
  const id = typeof idProfil === 'string' ? idProfil.trim() : '';
  if (!id || id === ID_PROFIL_UTAMA) return kunciDasar;
  return `${kunciDasar}#${id}`;
}

/**
 * Normalisasi data daftar profil mentah (mis. dari localStorage) menjadi
 * bentuk baku: { aktifId, daftar: [{ id, nama }] }.
 * Jaminan: selalu memuat profil Utama, id unik & aman, nama terpotong
 * wajar, jumlah maks MAKS_PROFIL, dan aktifId selalu ada di daftar
 * (fallback 'utama'). Data rusak/kosong → hanya Utama yang aktif.
 */
export function normalisasiDaftarProfil(data) {
  const sumber = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  const mentah = Array.isArray(sumber.daftar) ? sumber.daftar : [];
  const daftar = [];
  const sudahAda = new Set();
  for (const entri of mentah) {
    if (daftar.length >= MAKS_PROFIL) break;
    if (!entri || typeof entri !== 'object') continue;
    const id = slugProfil(typeof entri.id === 'string' ? entri.id : '');
    if (!id || sudahAda.has(id)) continue;
    sudahAda.add(id);
    daftar.push({
      id,
      nama: namaAman(entri.nama, id === ID_PROFIL_UTAMA ? NAMA_PROFIL_UTAMA : id),
    });
  }
  if (!sudahAda.has(ID_PROFIL_UTAMA)) {
    daftar.unshift({ id: ID_PROFIL_UTAMA, nama: NAMA_PROFIL_UTAMA });
    // Utama disisipkan di depan — bila daftar sudah penuh, potong ekornya.
    if (daftar.length > MAKS_PROFIL) daftar.length = MAKS_PROFIL;
  }
  const aktifMentah = typeof sumber.aktifId === 'string' ? slugProfil(sumber.aktifId) : '';
  const aktifId = daftar.some((p) => p.id === aktifMentah) ? aktifMentah : ID_PROFIL_UTAMA;
  return { aktifId, daftar };
}

/**
 * Buat id profil unik dari nama (slug nama; bila bertabrakan, ditambah
 * akhiran -2, -3, …). Id hasil tidak pernah 'utama' — profil bawaan
 * tidak bisa diduplikasi.
 */
export function buatIdProfil(nama, daftar) {
  const terpakai = new Set(
    (Array.isArray(daftar) ? daftar : [])
      .map((p) => (p && typeof p === 'object' ? p.id : null))
      .filter((id) => typeof id === 'string'),
  );
  terpakai.add(ID_PROFIL_UTAMA);
  let dasar = slugProfil(typeof nama === 'string' ? nama : '') || 'profil';
  if (dasar === ID_PROFIL_UTAMA) dasar = 'profil-utama';
  if (!terpakai.has(dasar)) return dasar;
  for (let n = 2; ; n += 1) {
    const kandidat = `${dasar.slice(0, MAKS_PANJANG_ID - String(n).length - 1)}-${n}`;
    if (!terpakai.has(kandidat)) return kandidat;
  }
}
