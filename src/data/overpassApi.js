// Fetch client Overpass API (OpenStreetMap) — sumber data tempat ibadah (data layer).
// Halaman TIDAK boleh memanggil API mentah; semua request + normalisasi lewat sini.
// Kueri: node/way amenity=place_of_worship + religion=muslim dalam radius meter
// dari titik (way diambil titik tengahnya via `out center`).

// Beberapa cermin Overpass publik. Server utama (overpass-api.de) terukur
// sangat lambat di jam sibuk (>25 detik untuk kueri kecil) sehingga strategi
// "coba satu-satu" selalu kehabisan waktu di browser. Strateginya: BALAP
// semua cermin sekaligus — respons sukses pertama yang dipakai, sisanya
// dibatalkan. Satu pencarian dipicu pengguna, bukan polling berkala.
import { hitungJarakMeter } from '../domain/usecases/hitungJarak.js';

const ENDPOINTS = [
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.nchc.org.tw/api/interpreter',
];
const TIMEOUT_MS = 25000;
export const ATRIBUSI_OSM = '© OpenStreetMap contributors';

const bangunKueri = (lat, lon, radius) => `
[out:json][timeout:25];
(
  node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
  way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
);
out center tags;
`.trim();

const gabungAlamat = (tags) => {
  const bagian = [
    tags['addr:street'],
    tags['addr:suburb'] ?? tags['addr:village'],
    tags['addr:city'] ?? tags['addr:town'] ?? tags['addr:regency'],
  ].filter(Boolean);
  return bagian.join(', ');
};

/**
 * Cari masjid/musholla dalam radius meter dari (lat, lon).
 * @returns Promise<Array<{ id, nama, lat, lon, alamat, jenis }>>
 */
async function ambilDariCermin(body) {
  const kontrols = ENDPOINTS.map(() => new AbortController());
  const balapan = ENDPOINTS.map((endpoint, i) => {
    const kontrol = kontrols[i];
    const timer = setTimeout(() => kontrol.abort(), TIMEOUT_MS);
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: body.toString(),
      signal: kontrol.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`kode ${res.status}`);
        return res.json();
      })
      .finally(() => clearTimeout(timer));
  });
  try {
    const json = await Promise.any(balapan);
    // Batalkan cermin yang belum selesai — pemenang sudah didapat.
    kontrols.forEach((k) => k.abort());
    return json;
  } catch {
    throw new Error(
      'Semua server OpenStreetMap sedang lambat/sibuk. Tunggu sebentar lalu coba lagi.',
    );
  }
}

// --- Cadangan: Photon (Komoot), geocoder OSM yang jauh lebih ringan ---
// Dipakai HANYA bila semua cermin Overpass gagal/lambat (kasus nyata di
// jaringan seluler Indonesia). Photon tidak mendukung pencarian radius murni:
// hasil disaring sendiri memakai jarak haversine ke titik pengguna.
// Terverifikasi live dari Sumedang: respons ±1,5 detik, CORS *.
const URL_PHOTON = 'https://photon.komoot.io/api';
const KATA_PHOTON = ['masjid', 'musholla', 'mushola'];

async function cariViaPhoton(lat, lon, radius) {
  const kumpulan = await Promise.all(
    KATA_PHOTON.map(async (q) => {
      const url = `${URL_PHOTON}?q=${encodeURIComponent(q)}&lat=${lat}&lon=${lon}&limit=50&osm_tag=amenity:place_of_worship`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Photon kode ${res.status}`);
      const json = await res.json();
      return Array.isArray(json.features) ? json.features : [];
    }),
  );
  const hasil = [];
  const terlihat = new Set();
  for (const fitur of kumpulan.flat()) {
    const p = fitur.properties ?? {};
    const [ln, lt] = fitur.geometry?.coordinates ?? [];
    if (!Number.isFinite(lt) || !Number.isFinite(ln)) continue;
    if (hitungJarakMeter(lat, lon, lt, ln) > radius) continue;
    const nama = (p.name ?? '').trim() || 'Masjid/Musholla';
    const kunciDedup = `${nama.toLowerCase()}@${lt.toFixed(4)},${ln.toFixed(4)}`;
    if (terlihat.has(kunciDedup)) continue;
    terlihat.add(kunciDedup);
    hasil.push({
      id: `photon/${p.osm_id ?? kunciDedup}`,
      nama,
      lat: lt,
      lon: ln,
      alamat: [p.street, p.district ?? p.city ?? p.state].filter(Boolean).join(', '),
      jenis: 'place_of_worship',
    });
  }
  return hasil;
}

export async function cariMasjidTerdekat(lat, lon, radius = 3000) {
  const body = new URLSearchParams({ data: bangunKueri(lat, lon, radius) });
  let json;
  try {
    json = await ambilDariCermin(body);
  } catch (galatOverpass) {
    // Semua cermin Overpass gagal → coba Photon sebelum menyerah.
    try {
      return await cariViaPhoton(lat, lon, radius);
    } catch {
      throw galatOverpass;
    }
  }
  const elements = Array.isArray(json.elements) ? json.elements : [];

  const hasil = [];
  const terlihat = new Set();
  for (const el of elements) {
    const t = el.tags ?? {};
    const lt = el.lat ?? el.center?.lat;
    const ln = el.lon ?? el.center?.lon;
    if (!Number.isFinite(lt) || !Number.isFinite(ln)) continue;
    const nama = t.name?.trim() || 'Masjid/Musholla';
    // Hindari duplikat: nama sama persis dalam jarak sangat dekat (koordinat node vs way).
    const kunciDedup = `${nama.toLowerCase()}@${lt.toFixed(4)},${ln.toFixed(4)}`;
    if (terlihat.has(kunciDedup)) continue;
    terlihat.add(kunciDedup);
    hasil.push({
      id: `${el.type}/${el.id}`,
      nama,
      lat: lt,
      lon: ln,
      alamat: gabungAlamat(t),
      jenis: t['place_of_worship:type'] ?? t.building ?? 'place_of_worship',
    });
  }
  return hasil;
}
