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
 * - Selain itu (POST, API lain, audio dari host lain): tidak di-cache,
 *   diteruskan ke jaringan apa adanya.
 */
const VERSI = 'v2';
const CACHE_ASET = `noor-aset-${VERSI}`;
const CACHE_RUNTIME = `noor-runtime-${VERSI}`;
const CACHE_NAVIGASI = `noor-navigasi-${VERSI}`;
const SEMUA_CACHE = [CACHE_ASET, CACHE_RUNTIME, CACHE_NAVIGASI];
const MAKS_ENTRI_RUNTIME = 200;

const HOST_API_CACHE = new Set(['api.quran.com', 'api.aladhan.com']);

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
