// Fetch client Overpass API (OpenStreetMap) — sumber data tempat ibadah (data layer).
// Halaman TIDAK boleh memanggil API mentah; semua request + normalisasi lewat sini.
// Kueri: node/way amenity=place_of_worship + religion=muslim dalam radius meter
// dari titik (way diambil titik tengahnya via `out center`).

// Beberapa cermin Overpass publik — dicoba bergantian sampai ada yang merespons
// (server utama kadang lambat/tidak terjangkau dari sebagian jaringan).
const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.nchc.org.tw/api/interpreter',
];
const TIMEOUT_MS = 20000;
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
  let galatTerakhir = null;
  for (const endpoint of ENDPOINTS) {
    const kontrol = new AbortController();
    const timer = setTimeout(() => kontrol.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: body.toString(),
        signal: kontrol.signal,
      });
      if (res.status === 429 || res.status === 503 || res.status === 504) {
        galatTerakhir = new Error('sibuk');
        continue;
      }
      if (!res.ok) {
        galatTerakhir = new Error(`kode ${res.status}`);
        continue;
      }
      return await res.json();
    } catch (e) {
      galatTerakhir = e;
    } finally {
      clearTimeout(timer);
    }
  }
  if (galatTerakhir?.message === 'sibuk') {
    throw new Error('Semua server OpenStreetMap sedang sibuk. Coba lagi sebentar.');
  }
  throw new Error('Tidak dapat menghubungi OpenStreetMap. Periksa koneksi internet Anda.');
}

export async function cariMasjidTerdekat(lat, lon, radius = 3000) {
  const body = new URLSearchParams({ data: bangunKueri(lat, lon, radius) });
  const json = await ambilDariCermin(body);
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
