/**
 * Use case Tabungan Qurban (fungsi MURNI — tanpa DOM/localStorage).
 *
 * Bentuk data (disimpan LocalTabunganQurbanRepository,
 * kunci `noor.tabungan-qurban.v1`):
 *   {
 *     target: { jenis: 'kambing'|'sapi-bersama'|'sapi-utuh', harga: number } | null,
 *     setoran: [{ id, tanggal: 'YYYY-MM-DD', nominal: number }],
 *   }
 *
 * Harga hewan di berkas ini adalah PERKIRAAN AWAL yang umum dipakai
 * untuk perencanaan di Indonesia — BUKAN harga pasar aktual. UI wajib
 * menampilkan label "perkiraan — sesuaikan harga daerahmu" dan harga
 * selalu bisa diubah pengguna (lihat HARGA_DEFAULT_QURBAN).
 *
 * `formatRupiah` TIDAK didefinisikan ulang di sini: dipakai ulang dari
 * hitungZakat.js (penolong yang sudah ada di aplikasi) dan diekspor
 * kembali agar pemanggil cukup mengimpor dari satu berkas ini.
 */
export { formatRupiah } from './hitungZakat.js';

export const JENIS_QURBAN = ['kambing', 'sapi-bersama', 'sapi-utuh'];

export const LABEL_JENIS_QURBAN = {
  kambing: 'Kambing (1 orang)',
  'sapi-bersama': 'Sapi patungan 1/7 (1 dari 7 orang)',
  'sapi-utuh': 'Sapi utuh (untuk 7 orang)',
};

// Nilai awal PERKIRAAN (rupiah) — selalu bisa diubah pengguna di UI.
export const HARGA_DEFAULT_QURBAN = {
  kambing: 2_500_000,
  'sapi-bersama': 3_500_000,
  'sapi-utuh': 24_000_000,
};

export const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const POLA_TANGGAL = /^\d{4}-\d{2}-\d{2}$/;

/** Parse 'YYYY-MM-DD' menjadi Date lokal; null bila format/tanggal tidak valid. */
function parseTanggal(tanggal) {
  if (typeof tanggal !== 'string' || !POLA_TANGGAL.test(tanggal)) return null;
  const d = new Date(`${tanggal}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Setoran valid untuk dihitung: objek bertanggal 'YYYY-MM-DD' yang nyata. */
function setoranValid(s) {
  return Boolean(s) && typeof s === 'object' && parseTanggal(s.tanggal) !== null;
}

function daftarAman(setoran) {
  return Array.isArray(setoran) ? setoran.filter(setoranValid) : [];
}

/** Nominal yang ikut dijumlahkan: angka finite > 0; selain itu 0. */
function nominalHitung(s) {
  const n = Number(s?.nominal);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Harga target yang sah: angka finite > 0; selain itu 0 (dianggap belum ada target). */
function hargaSah(hargaTarget) {
  const h = Number(hargaTarget);
  return Number.isFinite(h) && h > 0 ? h : 0;
}

/**
 * Terima total sebagai angka ATAU daftar setoran (dijumlahkan dulu) —
 * memudahkan pemanggil yang memegang salah satunya.
 */
function totalDari(totalAtauSetoran) {
  return Array.isArray(totalAtauSetoran)
    ? totalTerkumpul(totalAtauSetoran)
    : Math.max(0, Number(totalAtauSetoran) || 0);
}

function tanggalAman(date) {
  const d = date instanceof Date ? date : new Date(date);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

/** Total semua setoran bernominal sah. */
export function totalTerkumpul(setoran) {
  return daftarAman(setoran).reduce((acc, s) => acc + nominalHitung(s), 0);
}

/** Sisa menuju harga target; 0 bila sudah tercapai atau harga tidak sah. */
export function sisaTarget(totalAtauSetoran, hargaTarget) {
  const harga = hargaSah(hargaTarget);
  if (harga <= 0) return 0;
  return Math.max(0, harga - totalDari(totalAtauSetoran));
}

/** Persen progres 0–100 (dibulatkan); 0 bila harga target tidak sah. */
export function persenProgres(totalAtauSetoran, hargaTarget) {
  const harga = hargaSah(hargaTarget);
  if (harga <= 0) return 0;
  return Math.min(100, Math.round((totalDari(totalAtauSetoran) / harga) * 100));
}

/**
 * Rata-rata setoran per bulan: total dibagi rentang bulan kalender dari
 * bulan setoran PERTAMA sampai bulan `sekarang` (inklusif, minimum 1
 * bulan). Mengembalikan 0 bila belum ada setoran yang valid.
 */
export function rataRataPerBulan(setoran, sekarang = new Date()) {
  const daftar = daftarAman(setoran);
  if (daftar.length === 0) return 0;
  const kini = tanggalAman(sekarang);
  let pertama = null;
  for (const s of daftar) {
    const d = parseTanggal(s.tanggal);
    if (!pertama || d < pertama) pertama = d;
  }
  const rentangBulan = Math.max(
    1,
    (kini.getFullYear() - pertama.getFullYear()) * 12
      + (kini.getMonth() - pertama.getMonth())
      + 1,
  );
  return totalTerkumpul(daftar) / rentangBulan;
}

/**
 * Perkiraan jumlah bulan lagi sampai target tercapai, berdasarkan
 * rata-rata setoran per bulan.
 * - 0    → target sudah tercapai.
 * - null → belum bisa diperkirakan (belum ada pola setoran, rata-rata 0,
 *          atau harga target tidak sah).
 */
export function perkiraanBulanTercapai(setoran, hargaTarget, sekarang = new Date()) {
  const harga = hargaSah(hargaTarget);
  if (harga <= 0) return null;
  const total = totalTerkumpul(setoran);
  if (total >= harga) return 0;
  const rata = rataRataPerBulan(setoran, sekarang);
  if (!(rata > 0)) return null;
  return Math.ceil((harga - total) / rata);
}

/**
 * Tanggal perkiraan tercapai (awal bulan sasaran) atau null bila
 * perkiraan tidak tersedia. Bulan ini juga dikembalikan (sebagai tanggal
 * `sekarang`) bila target sudah tercapai.
 */
export function tanggalPerkiraanTercapai(setoran, hargaTarget, sekarang = new Date()) {
  const bulan = perkiraanBulanTercapai(setoran, hargaTarget, sekarang);
  if (bulan === null) return null;
  const kini = tanggalAman(sekarang);
  if (bulan === 0) return kini;
  return new Date(kini.getFullYear(), kini.getMonth() + bulan, 1);
}

/** 'Bulan Tahun' dalam Bahasa Indonesia, mis. 'Maret 2027'; '' bila tanggal tidak valid. */
export function formatBulanTahun(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return `${NAMA_BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Ringkasan lengkap untuk UI perencana.
 * @param {{jenis:string, harga:number}|null} target target tersimpan (boleh null)
 * @param {Array} setoran daftar setoran dari repository
 * @returns {{
 *   jenis: string|null, hargaTarget: number, totalTerkumpul: number,
 *   sisaTarget: number, persenProgres: number, rataRataPerBulan: number,
 *   perkiraanBulanTercapai: number|null, tanggalPerkiraan: Date|null,
 *   tercapai: boolean, jumlahSetoran: number,
 * }}
 */
export function hitungTabunganQurban(target, setoran, sekarang = new Date()) {
  const jenis = target && JENIS_QURBAN.includes(target.jenis) ? target.jenis : null;
  const hargaTarget = jenis ? hargaSah(target.harga) : 0;
  const daftar = daftarAman(setoran);
  const total = totalTerkumpul(daftar);
  return {
    jenis,
    hargaTarget,
    totalTerkumpul: total,
    sisaTarget: sisaTarget(total, hargaTarget),
    persenProgres: persenProgres(total, hargaTarget),
    rataRataPerBulan: rataRataPerBulan(daftar, sekarang),
    perkiraanBulanTercapai: perkiraanBulanTercapai(daftar, hargaTarget, sekarang),
    tanggalPerkiraan: tanggalPerkiraanTercapai(daftar, hargaTarget, sekarang),
    tercapai: hargaTarget > 0 && total >= hargaTarget,
    jumlahSetoran: daftar.length,
  };
}
