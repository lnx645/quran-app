/**
 * Unduhan murottal per surah (khusus web/PWA) — simpan SATU berkas audio
 * bab (qari Mishary Al-Afasy) ke Cache Storage agar halaman surah bisa
 * DIPUTAR OFFLINE penuh: service worker menyajikan berkas itu
 * cache-first (termasuk permintaan Range untuk seek), sedangkan respons
 * API (metadata recitation + ayat) ikut ter-cache runtime saat unduhan
 * berjalan, jadi teks & terjemahan surah yang sama juga siap offline.
 *
 * Metadata unduhan di localStorage 'noor.unduhanMurottal.v1':
 * { [nomor]: { nomor, url, ukuran, pada } }.
 *
 * Native (Capacitor) tidak menjalankan service worker, jadi halaman
 * memeriksa dukungUnduhanMurottal() dan menampilkan penjelasan, bukan
 * tombol unduh.
 */
import { fetchChapterRecitation, fetchAllVersesByChapter } from '../quranApi.js';

export const CACHE_AUDIO = 'noor-audio-v1';
const KUNCI_META = 'noor.unduhanMurottal.v1';

export function dukungUnduhanMurottal() {
  return (
    typeof caches !== 'undefined' &&
    typeof fetch !== 'undefined' &&
    typeof localStorage !== 'undefined'
  );
}

export function bacaMeta() {
  try {
    const m = JSON.parse(localStorage.getItem(KUNCI_META));
    return m && typeof m === 'object' && !Array.isArray(m) ? m : {};
  } catch {
    return {};
  }
}

function simpanMeta(meta) {
  try {
    localStorage.setItem(KUNCI_META, JSON.stringify(meta));
  } catch {
    /* penyimpanan penuh — unduhan tetap ada di cache, metadata menyusul */
  }
}

export function infoUnduhan(nomor) {
  return bacaMeta()[nomor] ?? null;
}

export function daftarUnduhan() {
  return Object.values(bacaMeta()).sort((a, b) => a.nomor - b.nomor);
}

export function totalUkuranUnduhan() {
  return daftarUnduhan().reduce((s, x) => s + (x.ukuran || 0), 0);
}

/** Benar bila metadata ada DAN berkasnya benar-benar masih di cache. */
export async function terunduh(nomor) {
  const info = infoUnduhan(nomor);
  if (!info) return false;
  try {
    const cache = await caches.open(CACHE_AUDIO);
    return !!(await cache.match(info.url));
  } catch {
    return false;
  }
}

/**
 * Unduh audio satu surah. onKemajuan(fraksi 0..1, diterima, total).
 * sinyal: AbortSignal untuk tombol Batal. Melempar error bila gagal —
 * pemanggil yang menampilkan pesan.
 */
export async function unduhSurah(nomor, { sinyal, onKemajuan } = {}) {
  // 1) Metadata recitation → URL berkas bab + perkiraan ukuran.
  const berkas = await fetchChapterRecitation(nomor);
  const url = berkas?.audio_url;
  if (!url) throw new Error('URL audio tidak tersedia dari API');
  const perkiraan = Number(berkas?.file_size) || 0;

  // 2) Hangatkan cache teks surah (ayat + terjemahan + audio per ayat
  //    tidak ikut — mode per ayat tetap daring, sesuai catatan di UI).
  await fetchAllVersesByChapter(nomor).catch(() => []);

  // 3) Unduh berkas audio dengan kemajuan byte (kedua host audio
  //    mengirim Access-Control-Allow-Origin: * — terverifikasi).
  const res = await fetch(url, { signal: sinyal });
  if (!res.ok) throw new Error(`Gagal mengunduh audio (HTTP ${res.status})`);
  const total = Number(res.headers.get('Content-Length')) || perkiraan;
  const tipe = res.headers.get('Content-Type') || 'audio/mpeg';
  let blob;
  if (res.body && typeof res.body.getReader === 'function') {
    const pembaca = res.body.getReader();
    const potongan = [];
    let diterima = 0;
    for (;;) {
      // eslint-disable-next-line no-await-in-loop
      const { done, value } = await pembaca.read();
      if (done) break;
      potongan.push(value);
      diterima += value.byteLength;
      onKemajuan?.(total > 0 ? diterima / total : 0, diterima, total);
    }
    blob = new Blob(potongan, { type: tipe });
  } else {
    blob = await res.blob();
    onKemajuan?.(1, blob.size, blob.size);
  }

  const cache = await caches.open(CACHE_AUDIO);
  await cache.put(
    url,
    new Response(blob, { headers: { 'Content-Type': tipe } }),
  );

  const meta = bacaMeta();
  meta[nomor] = {
    nomor,
    url,
    ukuran: blob.size,
    pada: new Date().toISOString(),
  };
  simpanMeta(meta);
  return meta[nomor];
}

/** Hapus satu unduhan (berkas cache + metadata). */
export async function hapusUnduhan(nomor) {
  const meta = bacaMeta();
  const info = meta[nomor];
  if (info?.url) {
    try {
      const cache = await caches.open(CACHE_AUDIO);
      await cache.delete(info.url);
    } catch {
      /* abaikan — metadata tetap dibersihkan */
    }
  }
  delete meta[nomor];
  simpanMeta(meta);
}

/** Format ukuran ramah: "16,2 MB". */
export function formatUkuran(byte) {
  const n = Number(byte) || 0;
  if (n <= 0) return '—';
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
}
