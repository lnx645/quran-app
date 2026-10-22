/* Noor — Service Worker manual (tanpa plugin/workbox).
 * Strategi:
 * - Navigasi (mode navigate / destination document): SELALU network-first,
 *   fallback cache, terakhir halaman offline inline — shell tidak pernah
 *   basi lebih dari satu muatan.
 * - Aset same-origin (script/style/img/font/worker): stale-while-revalidate.
 *   PENJAGA ANTI-RACUN: respons text/html untuk permintaan script/style
 *   (jawaban rewrite SPA untuk aset yang sudah tidak ada setelah deploy)
 *   TIDAK pernah disajikan dari cache maupun disimpan ke cache.
 * - GET api.quran.com & api.aladhan.com: cache-first runtime (maks 200 entri)
 *   agar surah/jadwal yang pernah dibuka bisa dibaca offline.
 * - Audio murottal (verses.quran.com & download.quranicaudio.com):
 *   cache-first dari cache unduhan 'noor-audio-v1' SAJA — berkas masuk
 *   cache hanya lewat unduhan eksplisit pengguna (halaman surah /
 *   /unduhan); streaming biasa tidak disimpan. Range dilayani 206.
 * - Selain itu (POST, API lain): tidak di-cache, diteruskan apa adanya.
 */
const VERSI = 'v2';
const CACHE_ASET = `noor-aset-${VERSI}`;
const CACHE_RUNTIME = `noor-runtime-${VERSI}`;
const CACHE_NAVIGASI = `noor-navigasi-${VERSI}`;
// Cache unduhan murottal SENGAJA tidak ikut VERSI: unduhan pengguna
// (belasan MB per surah) tidak boleh ikut terhapus saat kerangka
// aplikasi diperbarui. Dikelola eksplisit oleh unduhanMurottal.js.
const CACHE_AUDIO = 'noor-audio-v1';
const SEMUA_CACHE = [CACHE_ASET, CACHE_RUNTIME, CACHE_NAVIGASI, CACHE_AUDIO];
const MAKS_ENTRI_RUNTIME = 200;

const HOST_API_CACHE = new Set(['api.quran.com', 'api.aladhan.com']);
// Host berkas audio bab & per-ayat (CORS * di kedua host).
const HOST_AUDIO = new Set(['verses.quran.com', 'download.quranicaudio.com']);

const HALAMAN_OFFLINE = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NurQalam — Anda offline</title>
<style>
body{font-family:system-ui,sans-serif;background:#FAF6EC;color:#1E2A26;margin:0;
display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
main{max-width:420px;text-align:center}
h1{color:#0B5345;font-size:24px;margin:0 0 10px}
p{line-height:1.6;color:#5F6E66}
a{display:inline-block;margin-top:14px;background:#0B5345;color:#fff;
text-decoration:none;padding:12px 22px;border-radius:12px;font-weight:700}
</style>
</head>
<body><main>
<h1>NurQalam</h1>
<p><strong>Anda offline.</strong></p>
<p>Halaman ini belum pernah dibuka sehingga belum tersimpan di perangkat.
Surah dan jadwal yang pernah dibuka tetap bisa diakses dari cache.</p>
<a href="/">Coba Lagi</a>
</main></body>
</html>`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // Precache kerangka aplikasi agar navigasi offline punya fallback.
      try {
        const cache = await caches.open(CACHE_NAVIGASI);
        await cache.add('/index.html');
      } catch {
        /* abaikan: fallback inline tetap tersedia */
      }
      // Precache juga aset MASUK yang dirujuk index.html (JS/CSS ber-hash):
      // tanpa ini, kunjungan PERTAMA belum sempat meng-cache aset lewat
      // jalur SWR (SW belum mengendalikan halaman saat aset dimuat),
      // sehingga muat-ulang offline pertama menghasilkan halaman kosong.
      try {
        const html = await (await fetch('/index.html')).text();
        const urls = new Set();
        for (const m of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
          urls.add(m[1]);
        }
        if (urls.size > 0) {
          const aset = await caches.open(CACHE_ASET);
          await aset.addAll([...urls]);
        }
      } catch {
        /* abaikan: SWR tetap mengisi cache pada kunjungan berikutnya */
      }
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const nama = await caches.keys();
      await Promise.all(
        nama
          .filter((n) => n.startsWith('noor-') && !SEMUA_CACHE.includes(n))
          .map((n) => caches.delete(n)),
      );
      await self.clients.claim();
    })(),
  );
});

/** Pangkas cache runtime sederhana: hapus entri tertua sampai batas maks. */
async function pangkasRuntime(cache) {
  try {
    const kunci = await cache.keys();
    const kelebihan = kunci.length - MAKS_ENTRI_RUNTIME;
    for (let i = 0; i < kelebihan; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await cache.delete(kunci[i]);
    }
  } catch {
    /* abaikan */
  }
}

function adalahAset(url, request) {
  if (url.origin !== self.location.origin) return false;
  if (['script', 'style', 'image', 'font', 'worker'].includes(request.destination)) return true;
  return /\.(?:js|css|png|jpe?g|svg|webp|ico|woff2?|ttf|mp3)$/i.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // (a) Navigasi: network-first → cache → halaman offline inline.
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      (async () => {
        try {
          const segar = await fetch(request);
          const cache = await caches.open(CACHE_NAVIGASI);
          cache.put('/index.html', segar.clone()).catch(() => {});
          return segar;
        } catch {
          const cache = await caches.open(CACHE_NAVIGASI);
          const tersimpan = await cache.match('/index.html');
          if (tersimpan) return tersimpan;
          const cocok = await caches.match(request, { ignoreSearch: true });
          if (cocok) return cocok;
          return new Response(HALAMAN_OFFLINE, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          });
        }
      })(),
    );
    return;
  }

  // (c) API Qur'an & jadwal: cache-first runtime dengan batas entri.
  if (HOST_API_CACHE.has(url.hostname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_RUNTIME);
        const tersimpan = await cache.match(request);
        if (tersimpan) return tersimpan;
        const segar = await fetch(request);
        if (segar && segar.ok) {
          cache
            .put(request, segar.clone())
            .then(() => pangkasRuntime(cache))
            .catch(() => {});
        }
        return segar;
      })(),
    );
    return;
  }

  // (d) Audio murottal: cache-first dari cache UNDUHAN saja. Berkas yang
  // belum diunduh diteruskan ke jaringan TANPA disimpan (streaming biasa
  // tidak boleh memenuhi penyimpanan diam-diam). Permintaan Range (seek
  // pemutar) dilayani dengan potongan 206 dari berkas cache utuh.
  if (HOST_AUDIO.has(url.hostname) && url.pathname.endsWith('.mp3')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_AUDIO);
        const tersimpan = await cache.match(url.href);
        if (!tersimpan) return fetch(request);
        const range = request.headers.get('range');
        if (!range) return tersimpan;
        try {
          const blob = await tersimpan.blob();
          const cocok = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
          if (!cocok) return tersimpan;
          let awal = cocok[1] === '' ? null : Number(cocok[1]);
          let akhir = cocok[2] === '' ? null : Number(cocok[2]);
          if (awal === null) {
            // Bentuk akhiran: bytes=-N → N byte terakhir.
            awal = Math.max(0, blob.size - (akhir ?? 0));
            akhir = blob.size - 1;
          } else if (akhir === null || akhir >= blob.size) {
            akhir = blob.size - 1;
          }
          if (awal > akhir) return tersimpan;
          const potong = blob.slice(awal, akhir + 1);
          return new Response(potong, {
            status: 206,
            headers: {
              'Content-Type': blob.type || 'audio/mpeg',
              'Content-Length': String(potong.size),
              'Content-Range': `bytes ${awal}-${akhir}/${blob.size}`,
              'Accept-Ranges': 'bytes',
            },
          });
        } catch {
          return tersimpan;
        }
      })(),
    );
    return;
  }

  // (b) Aset same-origin: stale-while-revalidate.
  if (adalahAset(url, request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_ASET);
        let tersimpan = await cache.match(request, { ignoreSearch: true });
        // Anti-racun: entri cache berisi HTML untuk script/style adalah sisa
        // jawaban rewrite SPA atas aset yang sudah tiada — buang & abaikan.
        if (
          tersimpan &&
          ['script', 'style'].includes(request.destination) &&
          (tersimpan.headers.get('content-type') || '').includes('text/html')
        ) {
          await cache.delete(request, { ignoreSearch: true }).catch(() => {});
          tersimpan = undefined;
        }
        const jaringan = fetch(request)
          .then((segar) => {
            const tipe = segar?.headers.get('content-type') || '';
            const racun =
              ['script', 'style'].includes(request.destination) &&
              tipe.includes('text/html');
            if (segar && segar.ok && !racun) {
              cache.put(request, segar.clone()).catch(() => {});
            }
            return segar;
          })
          .catch(() => null);
        if (tersimpan) {
          event.waitUntil(jaringan);
          return tersimpan;
        }
        const segar = await jaringan;
        if (segar) return segar;
        throw new Error('Aset tidak tersedia offline');
      })(),
    );
  }
  // Lainnya: biarkan browser menangani (tidak di-cache).
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data?.url || '/';
  event.waitUntil(
    (async () => {
      const daftar = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      for (const klien of daftar) {
        if ('focus' in klien) {
          try {
            if ('navigate' in klien) await klien.navigate(target);
          } catch {
            /* navigasi bisa gagal bila target lintas asal — tetap fokus */
          }
          return klien.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
      return undefined;
    })(),
  );
});
