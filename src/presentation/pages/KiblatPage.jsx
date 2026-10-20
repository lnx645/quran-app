/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import {
  FaCompass, FaMapMarkerAlt, FaCrosshairs, FaInfoCircle, FaExclamationTriangle,
  FaMagnet, FaMobileAlt, FaSyncAlt, FaRedo, FaSatellite,
} from 'react-icons/fa';
import {
  hitungBearingKiblat, jarakKeKabahKm, SUMEDANG,
  getDeclination, sudutJarumRelatif,
} from '../../domain/usecases/hitungKiblatAkurat.js';
import { useKompas } from '../hooks/useKompas.js';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, Field, TextInput,
  ResultRow, PrimaryButton, GhostButton, ErrorBox,
} from '../components/common.jsx';

const LOKASI_AWAL = { ...SUMEDANG, nama: 'Sumedang' };

const Baris = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

const Lencana = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
  background: ${({ theme, noaa }) => (noaa ? theme.colors.primarySoft : theme.colors.goldSoft)};
  color: ${({ theme, noaa }) => (noaa ? theme.colors.primaryDark : '#7A5B00')};
  border: 1px solid ${({ theme, noaa }) => (noaa ? theme.colors.primary : theme.colors.gold)};
`;

const Info = styled.p`
  font-size: 13.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  gap: 8px;
  svg {
    flex-shrink: 0;
    margin-top: 4px;
  }
`;

const Langkah = styled.li`
  display: flex;
  gap: 10px;
  font-size: 13.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
`;

const MATA_ANGIN = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
const namaMataAngin = (derajat) => MATA_ANGIN[Math.round(derajat / 45) % 8];

const NAMA_SUMBER = {
  webkit: 'iOS — utara sejati bawaan sistem',
  absolute: 'Android — absolut, dikoreksi deklinasi',
  relative: 'relatif (TIDAK akurat)',
};

function KompasDial({ bearing, heading }) {
  const theme = useTheme();
  const c = 130;
  const jarumKiblat = heading == null ? bearing : sudutJarumRelatif(bearing, heading);
  const jarumUtara = heading == null ? 0 : ((360 - heading) % 360 + 360) % 360;

  const ticks = [];
  for (let d = 0; d < 360; d += 5) {
    const mayor = d % 30 === 0;
    const r1 = 112;
    const r2 = mayor ? 100 : 106;
    const a = (d * Math.PI) / 180;
    ticks.push(
      <line
        key={d}
        x1={c + r1 * Math.sin(a)}
        y1={c - r1 * Math.cos(a)}
        x2={c + r2 * Math.sin(a)}
        y2={c - r2 * Math.cos(a)}
        stroke={mayor ? theme.colors.goldDeep : theme.colors.border}
        strokeWidth={mayor ? 2 : 1}
      />,
    );
  }
  const huruf = ['U', 'T', 'S', 'B'];

  return (
    <svg width="260" height="260" viewBox="0 0 260 260" role="img" aria-label="Kompas kiblat">
      <circle cx={c} cy={c} r="122" fill={theme.colors.surfaceAlt} stroke={theme.colors.gold} strokeWidth="2.5" />
      <circle cx={c} cy={c} r="92" fill="none" stroke={theme.colors.border} strokeWidth="1" />
      {ticks}
      {huruf.map((h, i) => {
        const a = (i * 90 * Math.PI) / 180;
        return (
          <text
            key={h}
            x={c + 84 * Math.sin(a)}
            y={c - 84 * Math.cos(a) + 6}
            textAnchor="middle"
            fontSize="17"
            fontWeight="800"
            fill={theme.colors.primary}
          >
            {h}
          </text>
        );
      })}
      {/* Jarum utara (tipis, emerald) — hanya bila sensor aktif */}
      {heading != null && (
        <g transform={`rotate(${jarumUtara} ${c} ${c})`}>
          <polygon points={`${c},52 ${c + 5},${c} ${c},${c - 6} ${c - 5},${c}`} fill={theme.colors.primaryMid} opacity="0.85" />
        </g>
      )}
      {/* Jarum kiblat (emas) + penanda Ka'bah */}
      <g transform={`rotate(${jarumKiblat} ${c} ${c})`}>
        <polygon
          points={`${c},34 ${c + 9},${c} ${c},${c - 10} ${c - 9},${c}`}
          fill={theme.colors.gold}
          stroke={theme.colors.goldDeep}
          strokeWidth="1"
        />
        <rect x={c - 8} y="20" width="16" height="13" rx="2" fill={theme.colors.primaryDeep} />
        <rect x={c - 8} y="24" width="16" height="3" fill={theme.colors.goldLight} />
        <polygon
          points={`${c},226 ${c - 8},${c} ${c},${c + 10} ${c + 8},${c}`}
          fill={theme.colors.faint}
          opacity="0.7"
        />
      </g>
      <circle cx={c} cy={c} r="15" fill={theme.colors.primaryDeep} />
      <circle cx={c} cy={c} r="6" fill={theme.colors.gold} />
    </svg>
  );
}

export default function KiblatPage() {
  const [lokasi, setLokasi] = useState(LOKASI_AWAL);
  const [latInput, setLatInput] = useState('');
  const [lonInput, setLonInput] = useState('');
  const [tampilManual, setTampilManual] = useState(false);
  const [mencariGps, setMencariGps] = useState(false);
  const [pesanLokasi, setPesanLokasi] = useState(null);

  const [dekl, setDekl] = useState({ nilai: 0, sumber: null, memuat: true });

  // Deklinasi diambil ulang setiap lokasi berubah (NOAA → fallback WMM).
  useEffect(() => {
    let batal = false;
    setDekl((d) => ({ ...d, memuat: true }));
    getDeclination(lokasi.lat, lokasi.lng).then((hasil) => {
      if (!batal) setDekl({ nilai: hasil.nilai, sumber: hasil.sumber, memuat: false });
    });
    return () => {
      batal = true;
    };
  }, [lokasi.lat, lokasi.lng]);

  const {
    status, heading, akurasi, sumberEvent, tanpaAbsolut, butuhKalibrasi, mulai, sensorAktif,
  } = useKompas(dekl.nilai);

  const bearing = useMemo(
    () => hitungBearingKiblat({ lat: lokasi.lat, lng: lokasi.lng }),
    [lokasi.lat, lokasi.lng],
  );
  const jarak = useMemo(
    () => jarakKeKabahKm({ lat: lokasi.lat, lng: lokasi.lng }),
    [lokasi.lat, lokasi.lng],
  );

  const pakaiGps = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setPesanLokasi('Perangkat ini tidak mendukung Geolocation.');
      return;
    }
    setMencariGps(true);
    setPesanLokasi(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMencariGps(false);
        setLokasi({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          nama: 'Lokasi saya (GPS)',
        });
      },
      (err) => {
        setMencariGps(false);
        setPesanLokasi(
          err.code === err.PERMISSION_DENIED
            ? 'Izin lokasi ditolak — aktifkan izin lokasi di browser lalu coba lagi.'
            : 'Gagal membaca GPS. Periksa sinyal / aktifkan layanan lokasi.',
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  }, []);

  const terapkanManual = useCallback(() => {
    const lat = Number(String(latInput).replace(',', '.'));
    const lng = Number(String(lonInput).replace(',', '.'));
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setPesanLokasi('Lintang −90…90, bujur −180…180. Contoh: -6.858, 107.924');
      return;
    }
    setPesanLokasi(null);
    setLokasi({ lat, lng, nama: 'Lokasi manual' });
    setTampilManual(false);
  }, [latInput, lonInput]);

  const kembaliSumedang = useCallback(() => {
    setPesanLokasi(null);
    setLokasi(LOKASI_AWAL);
  }, []);

  return (
    <Page>
      <PageHero>
        <h2>
          <FaCompass /> Arah Kiblat Akurat
        </h2>
        <p>
          Kompas kiblat dengan koreksi deklinasi magnetik — jarum emas menunjuk Ka&apos;bah
          dari posisi Anda, bukan sekadar dari utara magnetik HP.
        </p>
      </PageHero>

      {/* Lokasi */}
      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaMapMarkerAlt /> Lokasi Acuan
        </SectionTitle>
        <ResultRow>
          <span className="label">Titik hitung</span>
          <span className="value" css={{ fontSize: 15 }}>
            {lokasi.nama}
          </span>
        </ResultRow>
        <ResultRow>
          <span className="label">Koordinat</span>
          <span className="value" css={{ fontSize: 15 }}>
            {lokasi.lat.toFixed(4)}, {lokasi.lng.toFixed(4)}
          </span>
        </ResultRow>
        <Baris css={{ marginTop: 12 }}>
          <PrimaryButton onClick={pakaiGps} disabled={mencariGps}>
            <FaCrosshairs /> {mencariGps ? 'Mencari GPS…' : 'Pakai Lokasi Saya'}
          </PrimaryButton>
          <GhostButton onClick={() => setTampilManual((v) => !v)}>
            <FaSatellite /> Input Manual
          </GhostButton>
        </Baris>
        {tampilManual && (
          <div css={{ marginTop: 12 }}>
            <Baris>
              <Field css={{ flex: 1, marginBottom: 0 }}>
                <label htmlFor="lat">Lintang</label>
                <TextInput
                  id="lat"
                  inputMode="decimal"
                  placeholder="-6.858"
                  value={latInput}
                  onChange={(e) => setLatInput(e.target.value)}
                />
              </Field>
              <Field css={{ flex: 1, marginBottom: 0 }}>
                <label htmlFor="lon">Bujur</label>
                <TextInput
                  id="lon"
                  inputMode="decimal"
                  placeholder="107.924"
                  value={lonInput}
                  onChange={(e) => setLonInput(e.target.value)}
                />
              </Field>
            </Baris>
            <Baris css={{ marginTop: 10 }}>
              <PrimaryButton onClick={terapkanManual}>Terapkan</PrimaryButton>
              <GhostButton onClick={kembaliSumedang}>Kembali ke Sumedang</GhostButton>
            </Baris>
          </div>
        )}
        {pesanLokasi && (
          <Info css={{ marginTop: 10 }}>
            <FaInfoCircle /> {pesanLokasi}
          </Info>
        )}
      </Card>

      {/* Kompas */}
      <GoldCard css={{ textAlign: 'center' }}>
        <KompasDial bearing={bearing} heading={heading} />
        <div
          css={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 34,
            fontWeight: 700,
            marginTop: 6,
            color: '#0B5345',
          }}
        >
          {bearing.toFixed(1)}°
        </div>
        <Info css={{ justifyContent: 'center' }}>
          <FaMapMarkerAlt /> dari utara SEJATI, searah jarum jam — jarak ±
          {jarak.toLocaleString('id-ID')} km ke Ka&apos;bah
        </Info>

        {heading != null && !tanpaAbsolut && (
          <Info css={{ justifyContent: 'center', marginTop: 6 }}>
            <FaCompass /> Hadap perangkat: {heading.toFixed(0)}° ({namaMataAngin(heading)})
            {akurasi != null && ` — akurasi sensor ±${akurasi.toFixed(0)}°`}
          </Info>
        )}
        {sumberEvent && (
          <div css={{ marginTop: 6 }}>
            <Lencana noaa={false}>Sensor: {NAMA_SUMBER[sumberEvent]}</Lencana>
          </div>
        )}

        {!sensorAktif && (
          <div css={{ marginTop: 14 }}>
            <PrimaryButton onClick={mulai}>
              <FaCompass /> Aktifkan Kompas
            </PrimaryButton>
          </div>
        )}

        {status === 'ditolak' && (
          <ErrorBox css={{ marginTop: 12, textAlign: 'left' }}>
            <FaExclamationTriangle /> Izin sensor ditolak — kompas statis ditampilkan. Aktifkan
            izin &ldquo;motion &amp; orientation&rdquo; di pengaturan browser lalu coba lagi.
          </ErrorBox>
        )}
        {status === 'tidak-didukung' && (
          <ErrorBox css={{ marginTop: 12, textAlign: 'left' }}>
            <FaExclamationTriangle /> Perangkat/browser ini tidak memberi data orientasi.
            Gunakan panduan tanpa sensor di bawah.
          </ErrorBox>
        )}
        {tanpaAbsolut && heading != null && (
          <ErrorBox css={{ marginTop: 12, textAlign: 'left' }}>
            <FaExclamationTriangle /> Perangkat hanya memberi data orientasi RELATIF (bukan
            absolut) — arah yang ditampilkan tidak bisa dipercaya. Coba putar HP atau gunakan
            aplikasi kompas bawaan.
          </ErrorBox>
        )}
        {butuhKalibrasi && (
          <Info css={{ marginTop: 10, justifyContent: 'center' }}>
            <FaInfoCircle /> iOS meminta kalibrasi: gerakkan HP membentuk angka 8 beberapa kali.
          </Info>
        )}
      </GoldCard>

      {/* Data & koreksi */}
      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaInfoCircle /> Data &amp; Koreksi Deklinasi
        </SectionTitle>
        <ResultRow>
          <span className="label">Bearing kiblat (utara sejati)</span>
          <span className="value">{bearing.toFixed(2)}°</span>
        </ResultRow>
        <ResultRow>
          <span className="label">Deklinasi magnetik {dekl.memuat ? '(menghitung…)' : ''}</span>
          <span className="value">
            {dekl.memuat
              ? '…'
              : `${dekl.nilai >= 0 ? '+' : ''}${dekl.nilai.toFixed(2)}° ${dekl.nilai >= 0 ? 'T' : 'B'}`}
          </span>
        </ResultRow>
        {!dekl.memuat && (
          <div css={{ margin: '8px 0 4px' }}>
            <Lencana noaa={dekl.sumber === 'NOAA'}>
              Sumber: {dekl.sumber === 'NOAA' ? 'NOAA (WMM terbaru)' : 'WMM-fallback (pendekatan)'}
            </Lencana>
          </div>
        )}
        <Info css={{ marginTop: 8 }}>
          <FaInfoCircle /> Kompas HP menunjuk utara magnetik. Bearing kiblat di atas sudah dalam
          acuan utara sejati: untuk Android, bacaan sensor dikoreksi otomatis (magnetik −
          deklinasi); untuk iPhone, sistem sudah memberi arah sejati.
        </Info>
      </Card>

      {/* Kalibrasi */}
      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaSyncAlt /> Kalibrasi Kompas HP
        </SectionTitle>
        <ul css={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <Langkah>
            <FaSyncAlt /> Gerakkan HP membentuk angka 8 miring beberapa kali sampai jarum stabil.
          </Langkah>
          <Langkah>
            <FaMagnet /> Jauhkan dari magnet, casing bermagnet, speaker aktif, dan logam/beton
            bertulang — semuanya membelokkan magnetometer.
          </Langkah>
          <Langkah>
            <FaMobileAlt /> Pegang HP datar (layar menghadap atas) saat membaca arah; kemiringan
            tajam merusak akurasi heading.
          </Langkah>
          <Langkah>
            <FaRedo /> Kalibrasi ulang setiap pindah lokasi, atau bila jarum melompat-lompat.
          </Langkah>
        </ul>
      </Card>

      {/* Kejujuran akurasi */}
      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaExclamationTriangle /> Batas Akurasi — Sejujurnya
        </SectionTitle>
        <Info>
          <FaInfoCircle /> Akurasi akhir dibatasi kalibrasi sensor HP: simpangan ±2–5° adalah
          wajar bahkan setelah kalibrasi, dan bisa jauh lebih besar di dekat logam/magnet.
        </Info>
        <Info css={{ marginTop: 8 }}>
          <FaInfoCircle /> Bila sumber deklinasi tertulis &ldquo;WMM-fallback&rdquo;, nilainya
          adalah pendekatan orde-1 khusus wilayah Indonesia (akurasi ±0.5°, teruji maks 0.07°
          terhadap WMM2025 penuh) — bukan pengganti model geomagnetik penuh dan tidak menangkap
          anomali magnetik lokal.
        </Info>
        <Info css={{ marginTop: 8 }}>
          <FaInfoCircle /> Tanpa sensor: aktifkan GPS, buka aplikasi kompas bawaan HP, hadapkan
          HP ke utara (0°), lalu putar badan ke arah {bearing.toFixed(0)}°.
        </Info>
      </Card>
    </Page>
  );
}
