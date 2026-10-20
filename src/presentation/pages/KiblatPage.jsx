/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import {
  FaCompass, FaMapMarkerAlt, FaCrosshairs, FaInfoCircle, FaExclamationTriangle,
  FaMagnet, FaMobileAlt, FaSyncAlt, FaRedo, FaSatellite, FaVolumeUp, FaCheckCircle,
} from 'react-icons/fa';
import {
  hitungBearingKiblat, jarakKeKabahKm, SUMEDANG,
  getDeclination,
} from '../../domain/usecases/hitungKiblatAkurat.js';
import { useKompas } from '../hooks/useKompas.js';
import { umumkan } from '../components/feedback/umumkan.js';
import { useAkses } from '../a11y/pengaturanStore.js';
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
  color: ${({ theme, noaa }) => (noaa ? theme.colors.judul : theme.colors.goldDeep)};
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
  webkit: 'iOS — bawaan sistem',
  absolute: 'Android — absolut',
  relative: 'relatif (TIDAK akurat)',
};

function KompasDial({ bearing, heading, rotasi, getarAktif = true }) {
  const theme = useTheme();
  const c = 130;

  // ROSE diputar LANGSUNG per nilai sensor (rotateZ mentah dari hook), tanpa
  // transisi CSS dan tanpa akumulasi jalur-terpendek — persis referensi.
  const sudut = rotasi == null ? 0 : rotasi;

  // Zona dekat kiblat (ala referensi): selisih terkecil bearing−heading tampil.
  // < 15° → banner "Arah Kiblat Ditemukan"; ≤ 3° → glow + getar.
  const selisih =
    heading == null ? null : Math.abs((((bearing - heading + 540) % 360) + 360) % 360 - 180);
  const dekat = selisih != null && selisih < 15;
  const sejajar = selisih != null && selisih <= 3;

  // Getar bertingkat sesuai zona kedekatan (non-visual): ≤10° getar 2×,
  // ≤5° lebih rapat, ≤3° getar panjang — tiap masuk zona yang lebih dekat.
  const zonaRef = useRef('');
  useEffect(() => {
    if (selisih == null) return;
    const zona =
      selisih <= 3 ? 'sejajar' : selisih <= 5 ? 'dekat5' : selisih <= 10 ? 'dekat10' : '';
    if (zona && zona !== zonaRef.current) {
      zonaRef.current = zona;
      if (getarAktif) {
        const pola = { dekat10: [60, 40, 60], dekat5: [60, 40, 60, 40, 60], sejajar: [250] };
        try {
          navigator.vibrate?.(pola[zona]);
        } catch {
          /* perangkat tanpa vibrate — abaikan */
        }
      }
      if (zona === 'sejajar') umumkan('Kamu sudah menghadap kiblat.', 'tegas');
    } else if (!zona) {
      zonaRef.current = '';
    }
  }, [selisih, getarAktif]);

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
    <div>
      <svg width="260" height="260" viewBox="0 0 260 260" role="img" aria-label="Kompas kiblat">
        <circle cx={c} cy={c} r="122" fill={theme.colors.surfaceAlt} stroke={theme.colors.gold} strokeWidth="2.5" />
        <circle cx={c} cy={c} r="92" fill="none" stroke={theme.colors.border} strokeWidth="1" />
        {/* ROSE — satu grup berputar mengikuti heading */}
        <g
          style={{
            transform: `rotate(${sudut}deg)`,
            transformBox: 'view-box',
            transformOrigin: 'center',
          }}
        >
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
          {/* Penanda utara (emerald) — FIX pada 0° di dalam rose */}
          <polygon
            points={`${c},52 ${c + 5},${c} ${c},${c - 6} ${c - 5},${c}`}
            fill={theme.colors.primaryMid}
            opacity="0.85"
          />
          {/* Penanda kiblat — FIX pada sudut bearing di dalam rose */}
          <g
            transform={`rotate(${bearing} ${c} ${c})`}
            style={sejajar ? { filter: `drop-shadow(0 0 7px ${theme.colors.gold})` } : undefined}
          >
            {sejajar && <circle cx={c} cy="26" r="16" fill={theme.colors.gold} opacity="0.35" />}
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
        </g>
        {/* Indikator hadap FIX — segitiga emas di jam 12 (di luar rose) */}
        <polygon
          points={`${c - 8},1 ${c + 8},1 ${c},14`}
          fill={theme.colors.gold}
          stroke={theme.colors.goldDeep}
          strokeWidth="1"
        />
        <circle cx={c} cy={c} r="15" fill={theme.colors.primaryDeep} />
        <circle cx={c} cy={c} r="6" fill={theme.colors.gold} />
      </svg>
      {heading != null && (
        <div
          css={(t) => ({
            marginTop: 8,
            fontSize: 12.5,
            color: t.colors.muted,
          })}
        >
          ▲ Arah hadapmu yang di atas — penanda Ka&apos;bah emas bergerak mengikuti putaran HP-mu.
        </div>
      )}
      {(dekat || sejajar) && (
        <div
          role={sejajar ? 'status' : undefined}
          css={(t) => ({
            marginTop: 10,
            padding: sejajar ? '10px 18px' : '7px 14px',
            borderRadius: 999,
            background: sejajar ? t.gradients.gold : t.colors.goldSoft,
            border: sejajar ? 'none' : `1px solid ${t.colors.gold}`,
            color: t.colors.primaryDeep,
            fontSize: sejajar ? 16 : 13.5,
            fontWeight: 800,
            boxShadow: sejajar ? t.shadows.gold : 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
          })}
        >
          {sejajar ? (
            <>
              <FaCheckCircle /> Menghadap Kiblat
            </>
          ) : (
            <>
              <FaCompass /> Arah kiblat ditemukan — putar sedikit lagi
            </>
          )}
        </div>
      )}
    </div>
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
    status, heading, rotasi, akurasi, sumberEvent, tanpaAbsolut, butuhKalibrasi, mulai, sensorAktif,
  } = useKompas();

  const bearing = useMemo(
    () => hitungBearingKiblat({ lat: lokasi.lat, lng: lokasi.lng }),
    [lokasi.lat, lokasi.lng],
  );
  const jarak = useMemo(
    () => jarakKeKabahKm({ lat: lokasi.lat, lng: lokasi.lng }),
    [lokasi.lat, lokasi.lng],
  );

  const { pengaturan, ubah: ubahAkses } = useAkses();

  // --- Sonifikasi kompas: beep WebAudio makin rapat saat mendekati kiblat ---
  const audioRef = useRef(null);
  const selisihKompas =
    heading == null
      ? null
      : Math.abs((((bearing - heading + 540) % 360) + 360) % 360 - 180);
  useEffect(() => {
    if (!pengaturan.sonifikasi || !sensorAktif || selisihKompas == null) return undefined;
    const jeda =
      selisihKompas <= 3 ? 110
      : selisihKompas <= 5 ? 200
      : selisihKompas <= 10 ? 320
      : selisihKompas <= 20 ? 520
      : selisihKompas <= 35 ? 800
      : 1200;
    const bunyi = () => {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!audioRef.current) audioRef.current = new Ctx();
        const ctx = audioRef.current;
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = selisihKompas <= 3 ? 1320 : 880;
        const t = ctx.currentTime;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.18, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
        osc.start(t);
        osc.stop(t + 0.1);
      } catch {
        /* WebAudio tidak tersedia */
      }
    };
    bunyi();
    const id = setInterval(bunyi, jeda);
    return () => clearInterval(id);
  }, [pengaturan.sonifikasi, sensorAktif, selisihKompas]);


  // --- Kompas non-visual: instruksi arah sebagai teks + ucapan (TTS) ---
  const [teksArah, setTeksArah] = useState('');
  const sebutkanArah = useCallback(() => {
    let teks;
    if (heading == null) {
      teks = `Arah kiblat dari ${lokasi.nama} adalah ${Math.round(bearing)} derajat dari utara. Aktifkan kompas untuk mengetahui arah hadapmu saat ini.`;
    } else {
      const sel = (((bearing - heading + 540) % 360) + 360) % 360 - 180;
      if (Math.abs(sel) <= 3) {
        teks = `Kamu sudah menghadap kiblat. Arah kiblat ${Math.round(bearing)} derajat, arah hadapmu ${Math.round(heading)} derajat.`;
      } else {
        const putar = sel > 0 ? 'kanan' : 'kiri';
        teks = `Arah kiblat ${Math.round(bearing)} derajat. Kamu menghadap ${Math.round(heading)} derajat. Putar ke ${putar} ${Math.abs(Math.round(sel))} derajat lagi.`;
      }
    }
    setTeksArah(teks);
    umumkan(teks);
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(teks);
        const suaraId = window.speechSynthesis
          .getVoices()
          .find((v) => v.lang && v.lang.toLowerCase().startsWith('id'));
        if (suaraId) u.voice = suaraId;
        u.lang = suaraId?.lang ?? 'id-ID';
        u.rate = 1;
        window.speechSynthesis.speak(u);
      }
    } catch {
      /* TTS tidak tersedia — teks di layar tetap tampil */
    }
  }, [bearing, heading, lokasi.nama]);

  // GPS otomatis saat halaman dibuka (seperti referensi): memperbarui lokasi
  // & bearing terus-menerus. Input manual / pilihan lokasi menghentikannya.
  const watchIdRef = useRef(null);
  const lokasiManualRef = useRef(false);
  const gpsErrorRef = useRef(false);

  const hentikanWatchGps = useCallback(() => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const mulaiWatchGps = useCallback(() => {
    if (!('geolocation' in navigator)) return;
    if (watchIdRef.current != null) return;
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        if (lokasiManualRef.current) return;
        setMencariGps(false);
        setLokasi({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          nama: 'Lokasi saya (GPS)',
        });
      },
      (err) => {
        if (!gpsErrorRef.current && err.code === err.PERMISSION_DENIED) {
          gpsErrorRef.current = true;
          setPesanLokasi(
            'Izin lokasi ditolak — bearing dihitung dari Sumedang. Aktifkan izin lokasi di browser untuk arah dari posisimu.',
          );
        }
      },
      { enableHighAccuracy: false, maximumAge: 30000, timeout: 27000 },
    );
  }, []);

  useEffect(() => {
    mulaiWatchGps();
    return () => hentikanWatchGps();
  }, [mulaiWatchGps, hentikanWatchGps]);

  const pakaiGps = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setPesanLokasi('Perangkat ini tidak mendukung Geolocation.');
      return;
    }
    setMencariGps(true);
    setPesanLokasi(null);
    lokasiManualRef.current = false;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMencariGps(false);
        setLokasi({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          nama: 'Lokasi saya (GPS)',
        });
        mulaiWatchGps();
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
  }, [mulaiWatchGps]);

  const terapkanManual = useCallback(() => {
    const lat = Number(String(latInput).replace(',', '.'));
    const lng = Number(String(lonInput).replace(',', '.'));
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setPesanLokasi('Lintang −90…90, bujur −180…180. Contoh: -6.858, 107.924');
      return;
    }
    setPesanLokasi(null);
    lokasiManualRef.current = true;
    hentikanWatchGps();
    setLokasi({ lat, lng, nama: 'Lokasi manual' });
    setTampilManual(false);
  }, [latInput, lonInput, hentikanWatchGps]);

  const kembaliSumedang = useCallback(() => {
    setPesanLokasi(null);
    lokasiManualRef.current = true;
    hentikanWatchGps();
    setLokasi(LOKASI_AWAL);
  }, [hentikanWatchGps]);

  return (
    <Page>
      <PageHero>
        <h2>
          <FaCompass /> Arah Kiblat Akurat
        </h2>
        <p>
          Kompas kiblat penunjuk Ka&apos;bah dari posisimu — rose berputar mengikuti arah
          hadap HP dan penanda emas berhenti tepat di arah kiblat. Lokasi dibaca otomatis
          lewat GPS saat halaman dibuka.
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
        <KompasDial bearing={bearing} heading={heading} rotasi={rotasi} getarAktif={pengaturan.getar} />
        <div
          css={(t) => ({
            fontFamily: t.fonts.display,
            fontSize: 34,
            fontWeight: 700,
            marginTop: 6,
            color: t.colors.primary,
          })}
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

        {/* Panduan non-visual untuk tunanetra/low-vision: ucapan + teks */}
        <div css={{ marginTop: 14 }}>
          <Baris css={{ justifyContent: 'center' }}>
            <GhostButton onClick={sebutkanArah} aria-describedby="teks-arah">
              <FaVolumeUp /> Sebutkan Arah
            </GhostButton>
            <GhostButton
              onClick={() => ubahAkses({ sonifikasi: !pengaturan.sonifikasi })}
              aria-pressed={pengaturan.sonifikasi}
            >
              <FaVolumeUp /> Panduan Bunyi: {pengaturan.sonifikasi ? 'Nyala' : 'Mati'}
            </GhostButton>
          </Baris>
          <p
            id="teks-arah"
            role="status"
            css={{ fontSize: 14, lineHeight: 1.6, marginTop: 10, minHeight: 22 }}
          >
            {teksArah}
          </p>
        </div>

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
          <FaInfoCircle /> Data Arah &amp; Deklinasi
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
          <FaInfoCircle /> Bearing kiblat dihitung dari utara sejati (rumus great-circle ke
          Ka&apos;bah). Kompas HP membaca utara magnetik; deklinasi di atas adalah selisih
          keduanya di lokasi ini dan ditampilkan sebagai informasi — jarum kompas mengikuti
          bacaan sensor HP apa adanya, seperti kompas kiblat daring pada umumnya.
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
