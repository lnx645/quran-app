/** @jsxImportSource @emotion/react */
import { useCallback, useRef, useState } from 'react';
import {
  FaMosque, FaMapMarkerAlt, FaRoute, FaLocationArrow, FaSearchPlus, FaRedo,
} from 'react-icons/fa';
import { cariMasjidTerdekat, ATRIBUSI_OSM } from '../../data/overpassApi.js';
import { hitungJarakMeter, formatJarak } from '../../domain/usecases/hitungJarak.js';
import {
  Page, PageTitle, PageSubtitle, Card, SectionTitle, PrimaryButton, GhostButton,
  ErrorBox, LoadingBox, Spinner,
} from '../components/common.jsx';

const RADIUS_AWAL = 3000;
const RADIUS_PERLUAS = 5000;

const pesanGagalLokasi = (err) => {
  if (!err) return 'Lokasi tidak dapat ditentukan. Coba lagi.';
  if (err.code === 1)
    return 'Izin lokasi ditolak. Aktifkan izin lokasi untuk situs ini di pengaturan peramban, lalu coba lagi — tanpa lokasi, kami tidak bisa mencari masjid di sekitar Anda.';
  if (err.code === 2)
    return 'Posisi Anda tidak dapat ditentukan saat ini. Pastikan GPS/layanan lokasi aktif, lalu coba lagi.';
  if (err.code === 3)
    return 'Pencarian lokasi kehabisan waktu. Pastikan GPS aktif, lalu coba lagi.';
  return 'Lokasi tidak dapat ditentukan. Coba lagi.';
};

export default function MasjidTerdekatPage() {
  // status: 'awal' | 'lokasi' | 'data' | 'sukses' | 'error'
  const [status, setStatus] = useState('awal');
  const [pesanError, setPesanError] = useState('');
  const [hasil, setHasil] = useState([]);
  const [radiusDipakai, setRadiusDipakai] = useState(RADIUS_AWAL);
  const posisiRef = useRef(null);

  const jalankanPencarian = useCallback(async (radius, posisi) => {
    setStatus('data');
    setRadiusDipakai(radius);
    try {
      const mentah = await cariMasjidTerdekat(posisi.lat, posisi.lon, radius);
      const terurut = mentah
        .map((m) => ({ ...m, jarak: hitungJarakMeter(posisi.lat, posisi.lon, m.lat, m.lon) }))
        .filter((m) => Number.isFinite(m.jarak))
        .sort((a, b) => a.jarak - b.jarak);
      setHasil(terurut);
      setStatus('sukses');
    } catch (err) {
      setPesanError(err.message || 'Terjadi kesalahan saat mencari masjid.');
      setStatus('error');
    }
  }, []);

  const mulai = useCallback(
    (radius = RADIUS_AWAL, paksaLokasiBaru = false) => {
      if (!paksaLokasiBaru && posisiRef.current) {
        jalankanPencarian(radius, posisiRef.current);
        return;
      }
      if (!('geolocation' in navigator)) {
        setPesanError('Peramban ini tidak mendukung layanan lokasi, sehingga masjid terdekat tidak bisa dicari.');
        setStatus('error');
        return;
      }
      setStatus('lokasi');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const posisi = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          posisiRef.current = posisi;
          jalankanPencarian(radius, posisi);
        },
        (err) => {
          setPesanError(pesanGagalLokasi(err));
          setStatus('error');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
      );
    },
    [jalankanPencarian]
  );

  const sibuk = status === 'lokasi' || status === 'data';

  return (
    <Page>
      <PageTitle>
        <FaMosque /> Masjid Terdekat
      </PageTitle>
      <PageSubtitle>
        Cari masjid dan musholla di sekitar lokasi Anda dari data OpenStreetMap, lengkap dengan
        jarak dan tautan rute.
      </PageSubtitle>

      <Card>
        <p css={(t) => ({ fontSize: 14.5, color: t.colors.text, lineHeight: 1.6, marginBottom: 14 })}>
          Ketuk tombol di bawah lalu izinkan akses lokasi. Lokasi hanya dipakai di perangkat Anda
          untuk menghitung jarak — tidak disimpan dan tidak dibagikan.
        </p>
        <PrimaryButton
          type="button"
          onClick={() => mulai(RADIUS_AWAL, true)}
          disabled={sibuk}
          css={{ width: '100%' }}
          aria-busy={sibuk}
        >
          <FaLocationArrow aria-hidden="true" />
          {sibuk ? 'Mencari…' : status === 'sukses' ? 'Perbarui Lokasi & Cari Lagi' : 'Gunakan Lokasi Saya'}
        </PrimaryButton>
      </Card>

      {status === 'lokasi' && (
        <LoadingBox role="status">
          <Spinner aria-hidden="true" />
          Menentukan lokasi Anda…
        </LoadingBox>
      )}
      {status === 'data' && (
        <LoadingBox role="status">
          <Spinner aria-hidden="true" />
          Mencari masjid dalam radius {radiusDipakai / 1000} km…
        </LoadingBox>
      )}

      {status === 'error' && (
        <div css={{ marginBottom: 16 }}>
          <ErrorBox role="alert">{pesanError}</ErrorBox>
          <div css={{ marginTop: 12 }}>
            <GhostButton type="button" onClick={() => mulai(RADIUS_AWAL, true)}>
              <FaRedo aria-hidden="true" /> Coba Lagi
            </GhostButton>
          </div>
        </div>
      )}

      {status === 'sukses' && (
        <>
          <SectionTitle>
            {hasil.length > 0
              ? `${hasil.length} tempat ibadah dalam ${radiusDipakai / 1000} km`
              : 'Tidak ditemukan'}
          </SectionTitle>

          {hasil.length === 0 && (
            <Card>
              <p css={(t) => ({ fontSize: 14.5, color: t.colors.muted, lineHeight: 1.6 })}>
                Belum ada masjid/musholla yang terpetakan di OpenStreetMap dalam radius{' '}
                {radiusDipakai / 1000} km dari lokasi Anda.
                {radiusDipakai < RADIUS_PERLUAS &&
                  ' Coba perluas radius pencarian menjadi 5 km.'}
              </p>
              {radiusDipakai < RADIUS_PERLUAS && (
                <div css={{ marginTop: 14 }}>
                  <GhostButton type="button" onClick={() => mulai(RADIUS_PERLUAS)}>
                    <FaSearchPlus aria-hidden="true" /> Perluas pencarian (5 km)
                  </GhostButton>
                </div>
              )}
            </Card>
          )}

          {hasil.map((m) => (
            <Card key={m.id} css={{ marginBottom: 12 }}>
              <div
                css={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
              >
                <span
                  aria-hidden="true"
                  css={(t) => ({
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: t.colors.primarySoft, color: t.colors.primary, fontSize: 19,
                  })}
                >
                  <FaMosque />
                </span>
                <div css={{ flex: 1, minWidth: 0 }}>
                  <div
                    css={(t) => ({
                      fontFamily: t.fonts.display, fontSize: 17.5, fontWeight: 700,
                      color: t.colors.judul, lineHeight: 1.3,
                    })}
                  >
                    {m.nama}
                  </div>
                  <div css={(t) => ({ fontSize: 13.5, color: t.colors.muted, marginTop: 3 })}>
                    Jarak: <strong css={(t) => ({ color: t.colors.primary })}>{formatJarak(m.jarak)}</strong>
                  </div>
                  {m.alamat && (
                    <div
                      css={(t) => ({
                        fontSize: 13.5, color: t.colors.muted, marginTop: 3,
                        display: 'flex', gap: 6, alignItems: 'flex-start',
                      })}
                    >
                      <FaMapMarkerAlt aria-hidden="true" css={{ flexShrink: 0, marginTop: 3 }} />
                      <span>{m.alamat}</span>
                    </div>
                  )}
                </div>
              </div>
              <div css={{ marginTop: 12 }}>
                <GhostButton
                  as="a"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Buka rute ke ${m.nama} di Google Maps`}
                >
                  <FaRoute aria-hidden="true" /> Rute
                </GhostButton>
              </div>
            </Card>
          ))}
        </>
      )}

      <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, textAlign: 'center', marginTop: 20 })}>
        Data peta: {ATRIBUSI_OSM} (OpenStreetMap) • Kelengkapan data bergantung kontribusi komunitas
        pemeta setempat.
      </p>
    </Page>
  );
}
