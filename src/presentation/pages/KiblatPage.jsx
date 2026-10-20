/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaCompass, FaMapMarkerAlt } from 'react-icons/fa';
import { hitungBearingKiblat, jarakKeKabahKm, SUMEDANG, KABAH } from '../../domain/usecases/hitungKiblat.js';
import { Page, PageTitle, PageSubtitle, Card, PrimaryButton } from '../components/common.jsx';

const BEARING = hitungBearingKiblat(SUMEDANG, KABAH);

const KompasBox = styled(Card)`
  text-align: center;
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
`;

const Info = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function KiblatPage() {
  const [heading, setHeading] = useState(null); // arah hadap perangkat (0 = utara)
  const [pakaiSensor, setPakaiSensor] = useState(false);
  const [pesan, setPesan] = useState(null);

  const dengar = useCallback((e) => {
    let h = null;
    if (typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading;
    else if (typeof e.alpha === 'number') h = 360 - e.alpha;
    if (h != null) setHeading(h);
  }, []);

  const aktifkanSensor = async () => {
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const izin = await DeviceOrientationEvent.requestPermission();
        if (izin !== 'granted') {
          setPesan('Izin sensor ditolak — kompas statis ditampilkan.');
          return;
        }
      }
      window.addEventListener('deviceorientation', dengar, true);
      setPakaiSensor(true);
    } catch {
      setPesan('Sensor orientasi tidak tersedia di perangkat ini.');
    }
  };

  useEffect(
    () => () => {
      window.removeEventListener('deviceorientation', dengar, true);
    },
    [dengar]
  );

  // Sudut jarum: relatif terhadap hadap perangkat bila sensor aktif.
  const sudutJarum = heading == null ? BEARING : (BEARING - heading + 360) % 360;

  return (
    <Page>
      <PageTitle>
        <FaCompass /> Arah Kiblat
      </PageTitle>
      <PageSubtitle>Untuk Sumedang dan sekitarnya.</PageSubtitle>

      <KompasBox>
        <svg width="240" height="240" viewBox="0 0 240 240" role="img" aria-label="Kompas kiblat">
          <circle cx="120" cy="120" r="112" fill="#F5EFE2" stroke="#C9A227" strokeWidth="2" />
          <circle cx="120" cy="120" r="86" fill="none" stroke="#E7DFC9" strokeWidth="1" />
          {['U', 'T', 'S', 'B'].map((huruf, i) => {
            const sudut = (i * 90 * Math.PI) / 180;
            const x = 120 + 96 * Math.sin(sudut);
            const y = 120 - 96 * Math.cos(sudut);
            return (
              <text key={huruf} x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#0A5F53">
                {huruf}
              </text>
            );
          })}
          <g transform={`rotate(${sudutJarum} 120 120)`}>
            <polygon points="120,26 130,120 120,110 110,120" fill="#0D7C6C" />
            <polygon points="120,214 110,120 120,130 130,120" fill="#94A3B8" />
          </g>
          <rect x="106" y="106" width="28" height="28" rx="4" fill="#1E293B" />
          <rect x="112" y="98" width="16" height="8" rx="2" fill="#C9A227" />
          <circle cx="120" cy="120" r="5" fill="#C9A227" />
        </svg>
        <div css={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, marginTop: 10 }}>
          {BEARING.toFixed(1)}°
        </div>
        <Info>
          dari arah utara, searah jarum jam — dari <FaMapMarkerAlt /> Sumedang (jarak ±
          {jarakKeKabahKm(SUMEDANG, KABAH).toLocaleString('id-ID')} km ke Ka&apos;bah)
        </Info>
        {heading != null && (
          <Info css={{ marginTop: 6 }}>
            Hadap perangkat saat ini: {heading.toFixed(0)}° — jarum hijau menunjuk kiblat.
          </Info>
        )}
        {!pakaiSensor && (
          <div css={{ marginTop: 12 }}>
            <PrimaryButton onClick={aktifkanSensor}>
              <FaCompass /> Aktifkan Sensor Kompas
            </PrimaryButton>
          </div>
        )}
        {pesan && <Info css={{ marginTop: 10 }}>{pesan}</Info>}
        {!heading && (
          <Info css={{ marginTop: 12 }}>
            Tanpa sensor: aktifkan GPS HP, buka aplikasi kompas, hadapkan HP ke utara lalu putar
            badan ke arah {BEARING.toFixed(0)}°.
          </Info>
        )}
      </KompasBox>
    </Page>
  );
}
