// Fetch client Overpass API (OpenStreetMap) — sumber data tempat ibadah (data layer).
// Halaman TIDAK boleh memanggil API mentah; semua request + normalisasi lewat sini.
// Kueri: node/way amenity=place_of_worship + religion=muslim dalam radius meter
// dari titik (way diambil titik tengahnya via `out center`).

const ENDPOINT = 'https://overpass-api.de/api/interpreter';
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
export async function cariMasjidTerdekat(lat, lon, radius = 3000) {
  const body = new URLSearchParams({ data: bangunKueri(lat, lon, radius) });
  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: body.toString(),
    });
  } catch {
    throw new Error('Tidak dapat menghubungi OpenStreetMap. Periksa koneksi internet Anda.');
  }
  if (res.status === 429) throw new Error('Server OpenStreetMap sedang sibuk. Coba lagi sebentar.');
  if (res.status === 504 || res.status === 503)
    throw new Error('Server OpenStreetMap lambat merespons. Coba lagi sebentar.');
  if (!res.ok) throw new Error(`OpenStreetMap merespons dengan kode ${res.status}.`);

  const json = await res.json();
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
