// Domain: hitungan buku catatan utang puasa PER TAHUN (fitur terpisah dari
// tracker qadha harian di LocalQadhaRepository — datanya tidak dicampur).
// Bentuk satu entri tahun: {
//   id: string, label: string (bebas, mis. 'Ramadhan 1447 H'),
//   totalHari: number (0..366),
//   lunas: { 'YYYY-MM-DD': true },  // tanggal-tanggal qadha yang sudah dibayar
// }
// Sisa TIDAK disimpan sebagai turunan — selalu dihitung di sini:
//   sisa = totalHari - jumlah tanggal lunas.

export const TOTAL_MIN = 0;
export const TOTAL_MAKS = 366;

const POLA_TANGGAL = /^\d{4}-\d{2}-\d{2}$/;

/** Total hari aman: bilangan bulat terpotong ke rentang 0..366; non-angka → 0. */
export function normalisasiTotalHari(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 0;
  return Math.min(TOTAL_MAKS, Math.max(TOTAL_MIN, Math.floor(v)));
}

/**
 * Validasi input total hari dari formulir.
 * Mengembalikan { valid, nilai, pesan } — pesan null bila valid.
 */
export function validasiTotalHari(n) {
  if (n === null || n === undefined || n === '') {
    return { valid: false, nilai: 0, pesan: 'Isi total hari utang puasa terlebih dahulu.' };
  }
  const v = Number(n);
  if (!Number.isFinite(v) || !Number.isInteger(v)) {
    return { valid: false, nilai: 0, pesan: 'Total hari harus berupa angka bulat.' };
  }
  if (v < TOTAL_MIN || v > TOTAL_MAKS) {
    return {
      valid: false,
      nilai: v,
      pesan: `Total hari harus antara ${TOTAL_MIN} dan ${TOTAL_MAKS} hari.`,
    };
  }
  return { valid: true, nilai: v, pesan: null };
}

/** Peta lunas yang aman: hanya kunci tanggal valid bernilai true yang dihitung. */
export function petaLunas(tahun) {
  if (!tahun || typeof tahun !== 'object') return {};
  const lunas = tahun.lunas;
  if (!lunas || typeof lunas !== 'object') return {};
  const hasil = {};
  for (const [tgl, nilai] of Object.entries(lunas)) {
    if (POLA_TANGGAL.test(tgl) && nilai === true) hasil[tgl] = true;
  }
  return hasil;
}

/** Jumlah hari yang sudah dilunasi pada satu tahun. */
export function jumlahLunas(tahun) {
  return Object.keys(petaLunas(tahun)).length;
}

/** Sisa utang satu tahun: totalHari - jumlah lunas, tidak pernah negatif. */
export function sisaUtang(tahun) {
  if (!tahun || typeof tahun !== 'object') return 0;
  return Math.max(0, normalisasiTotalHari(tahun.totalHari) - jumlahLunas(tahun));
}

/** Persen kelunasan satu tahun (0..100); total 0 → 0. */
export function persenLunas(tahun) {
  if (!tahun || typeof tahun !== 'object') return 0;
  const total = normalisasiTotalHari(tahun.totalHari);
  if (total <= 0) return 0;
  return Math.min(100, Math.round((jumlahLunas(tahun) / total) * 100));
}

/**
 * Ringkasan seluruh tahun.
 * Mengembalikan { jumlahTahun, totalHari, totalLunas, totalSisa, persen, perTahun }
 * dengan perTahun mengikuti urutan daftar masukan.
 */
export function ringkasanSemuaTahun(daftar) {
  const tahun = Array.isArray(daftar) ? daftar : [];
  const perTahun = tahun.map((t) => {
    const total = t && typeof t === 'object' ? normalisasiTotalHari(t.totalHari) : 0;
    const lunas = jumlahLunas(t);
    return {
      id: t && typeof t.id === 'string' ? t.id : null,
      label: t && typeof t.label === 'string' ? t.label : '',
      totalHari: total,
      lunas,
      sisa: Math.max(0, total - lunas),
      persen: total > 0 ? Math.min(100, Math.round((lunas / total) * 100)) : 0,
    };
  });
  const totalHari = perTahun.reduce((a, p) => a + p.totalHari, 0);
  const totalLunas = perTahun.reduce((a, p) => a + p.lunas, 0);
  return {
    jumlahTahun: perTahun.length,
    totalHari,
    totalLunas,
    totalSisa: Math.max(0, totalHari - totalLunas),
    persen: totalHari > 0 ? Math.min(100, Math.round((totalLunas / totalHari) * 100)) : 0,
    perTahun,
  };
}
