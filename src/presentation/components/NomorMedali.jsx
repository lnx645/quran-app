/** @jsxImportSource @emotion/react */
import { useId } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { khatamPath } from './ornaments/geometry.js';

/**
 * NomorMedali — penanda nomor daftar berbentuk medali bintang-8 (khatam).
 * Bintang digambar MATEMATIS via khatamPath (gabungan dua persegi, 16 titik
 * eksak dari geometry.js) — bukan gambar bebas. Isi gradasi emerald tema,
 * tepi & cakram tengah beraksen emas.
 *
 * Angka digambar sebagai <text> SVG tepat di titik pusat (50,50) dengan
 * text-anchor middle + dominant-baseline central — SELALU pas tengah di
 * semua ukuran & perangkat (versi lama memakai teks HTML di atas SVG yang
 * bergeser mengikuti metrik font perangkat). Aksesibilitas: svg berperan
 * sebagai gambar berlabel "Nomor N".
 *
 * Props: nomor (angka/teks), ukuran (px, default 46).
 */
const Bungkus = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: ${({ ukuran }) => ukuran}px;
  height: ${({ ukuran }) => ukuran}px;
  filter: drop-shadow(0 2px 4px rgba(4, 37, 31, 0.28));
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default function NomorMedali({ nomor, ukuran = 46 }) {
  const theme = useTheme();
  const gid = `medali-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const digit = String(nomor).length;
  // Ukuran huruf dalam koordinat viewBox 100: 1 digit ±37, 2 digit ±31, 3+ ±25.
  const fontSize = digit >= 3 ? 25 : digit === 2 ? 31 : 37;

  return (
    <Bungkus ukuran={ukuran}>
      <svg viewBox="0 0 100 100" role="img" aria-label={`Nomor ${nomor}`} focusable="false">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={theme.colors.emeraldPanelMid} />
            <stop offset="100%" stopColor={theme.colors.emeraldPanel} />
          </linearGradient>
        </defs>
        {/* bintang khatam-8: dua persegi (axis + rotasi 45°) digabung */}
        <path
          d={khatamPath(50, 50, 26)}
          fill={`url(#${gid})`}
          stroke={theme.colors.gold}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* cakram tengah emerald pekat berbingkai emas tipis — panggung angka */}
        <circle
          cx="50"
          cy="50"
          r="21.5"
          fill={theme.colors.primaryDeep}
          fillOpacity="0.55"
          stroke={theme.colors.goldLight}
          strokeOpacity="0.75"
          strokeWidth="1"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={fontSize}
          fontWeight="800"
          letterSpacing="-1"
          fill={theme.colors.goldLight}
          style={{ fontFamily: theme.fonts.body }}
        >
          {nomor}
        </text>
      </svg>
    </Bungkus>
  );
}
