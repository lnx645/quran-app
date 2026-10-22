/**
 * Akun & sinkronisasi awan (OPSIONAL) — Supabase.
 *
 * Prinsip:
 * - Tanpa akun, NurQalam bekerja 100% lokal seperti biasa. Akun hanya
 *   menambah kemampuan memindahkan progres antarperangkat.
 * - Yang disinkronkan = potret (snapshot) seluruh kunci localStorage
 *   `noor.*`, DENGAN PENGECUALIAN yang disengaja:
 *   • `noor.muslimah.*` — data siklus & PIN Muslimah bersifat privat,
 *     tidak pernah meninggalkan perangkat lewat sinkronisasi.
 *   • `noor.unduhanMurottal.v1` — registri unduhan bersifat khas
 *     perangkat (berkas audionya sendiri tidak ikut diunggah).
 *   • kunci meta sinkronisasi itu sendiri.
 * - Di awan hanya ada SATU baris per pengguna (tabel data_pengguna,
 *   RLS: pemilik saja) berisi { versi, disimpanPada, data }.
 * - Konflik diselesaikan utuh-per-potret (bukan per kunci): perangkat
 *   yang berubah sejak sinkron terakhir menimpa; bila dua-duanya
 *   berubah, pengguna memilih lewat dialog.
 *
 * Klien Supabase dimuat MALAS (dynamic import) dan hanya bila variabel
 * lingkungan VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY tersedia —
 * salinan tanpa konfigurasi tidak memuat SDK sama sekali.
 */

const KUNCI_META = 'noor.sinkronMeta.v1';
const TABEL = 'data_pengguna';

export function konfigurasiSinkron() {
  const env = import.meta.env || {};
  const url = env.VITE_SUPABASE_URL;
  const anon = env.VITE_SUPABASE_ANON_KEY;
  return url && anon ? { url, anon } : null;
}

let janjiKlien = null;
export async function ambilKlien() {
  const konf = konfigurasiSinkron();
  if (!konf) return null;
  if (!janjiKlien) {
    janjiKlien = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(konf.url, konf.anon, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      }),
    );
  }
  return janjiKlien;
}

/* ---------- Potret data lokal ---------- */

function kunciTersinkron(kunci) {
  return (
    kunci.startsWith('noor.') &&
    kunci !== KUNCI_META &&
    !kunci.startsWith('noor.muslimah.') &&
    kunci !== 'noor.unduhanMurottal.v1'
  );
}

function hashTeks(teks) {
  let h = 5381;
  for (let i = 0; i < teks.length; i += 1) {
    h = ((h << 5) + h + teks.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

/** Kumpulkan potret data lokal yang ikut disinkronkan + hash isinya. */
export function kumpulkanSnapshot() {
  const data = {};
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const kunci = localStorage.key(i);
      if (!kunci || !kunciTersinkron(kunci)) continue;
      const nilai = localStorage.getItem(kunci);
      if (typeof nilai === 'string') data[kunci] = nilai;
    }
  } catch {
    /* penyimpanan tidak tersedia */
  }
  return { data, hash: hashTeks(JSON.stringify(data)) };
}

/** Terapkan potret awan ke localStorage (cermin penuh untuk kunci tersinkron). */
export function terapkanSnapshot(data) {
  try {
    const hapus = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const kunci = localStorage.key(i);
      if (kunci && kunciTersinkron(kunci) && !(kunci in data)) hapus.push(kunci);
    }
    for (const k of hapus) localStorage.removeItem(k);
    for (const [k, v] of Object.entries(data)) {
      if (kunciTersinkron(k) && typeof v === 'string') localStorage.setItem(k, v);
    }
  } catch {
    /* abaikan */
  }
}

/* ---------- Meta sinkronisasi (lokal) ---------- */

export function bacaMetaSinkron() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI_META)) ?? {};
  } catch {
    return {};
  }
}

function simpanMetaSinkron(meta) {
  try {
    localStorage.setItem(KUNCI_META, JSON.stringify(meta));
  } catch {
    /* abaikan */
  }
}

/* ---------- Operasi awan ---------- */

export async function ambilAwan(klien, userId) {
  const { data, error } = await klien
    .from(TABEL)
    .select('data, diperbarui_pada')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data; // null bila belum pernah sinkron
}

export async function unggahAwan(klien, userId, snapshot) {
  const sekarang = new Date().toISOString();
  const muatan = { versi: 1, disimpanPada: sekarang, data: snapshot.data };
  const { error } = await klien
    .from(TABEL)
    .upsert({ user_id: userId, data: muatan, diperbarui_pada: sekarang });
  if (error) throw error;
  simpanMetaSinkron({ terakhirHash: snapshot.hash, terakhirPada: sekarang });
  return muatan;
}

export async function hapusAwan(klien, userId) {
  const { error } = await klien.from(TABEL).delete().eq('user_id', userId);
  if (error) throw error;
  simpanMetaSinkron({});
}

/**
 * Jalankan satu putaran sinkronisasi. Mengembalikan salah satu:
 * { arah: 'unggah' }  — awan diperbarui dari perangkat ini
 * { arah: 'tarik' }   — perangkat ini diperbarui dari awan (pemanggil
 *                       sebaiknya memuat ulang halaman sesudahnya)
 * { arah: 'mutakhir' }— tidak ada perubahan di kedua sisi
 * { arah: 'konflik', awan } — dua sisi berubah; pemanggil menanyakan
 *                       pilihan pengguna lalu memanggil unggahAwan /
 *                       terapkanSnapshot sendiri.
 */
export async function sinkronkanSekarang(klien, userId) {
  const lokal = kumpulkanSnapshot();
  const meta = bacaMetaSinkron();
  const awan = await ambilAwan(klien, userId);

  if (!awan) {
    await unggahAwan(klien, userId, lokal);
    return { arah: 'unggah' };
  }

  const hashAwan = hashTeks(JSON.stringify(awan.data?.data ?? {}));
  const lokalBerubah = meta.terakhirHash !== lokal.hash;
  const awanBerubah = meta.terakhirHash !== hashAwan;

  if (!lokalBerubah && !awanBerubah) return { arah: 'mutakhir' };
  if (lokalBerubah && awanBerubah) return { arah: 'konflik', awan };
  if (lokalBerubah) {
    await unggahAwan(klien, userId, lokal);
    return { arah: 'unggah' };
  }
  // Hanya awan yang berubah → tarik.
  terapkanSnapshot(awan.data?.data ?? {});
  simpanMetaSinkron({
    terakhirHash: hashAwan,
    terakhirPada: awan.data?.disimpanPada ?? new Date().toISOString(),
  });
  return { arah: 'tarik' };
}

/** Terapkan potret awan hasil pilihan konflik + catat meta. */
export function terapkanAwan(awan) {
  const data = awan.data?.data ?? {};
  terapkanSnapshot(data);
  simpanMetaSinkron({
    terakhirHash: hashTeks(JSON.stringify(data)),
    terakhirPada: awan.data?.disimpanPada ?? new Date().toISOString(),
  });
}
