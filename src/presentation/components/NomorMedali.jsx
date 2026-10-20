/** @jsxImportSource @emotion/react */
import { useId } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { khatamPath } from './ornaments/geometry.js';

/**
 * NomorMedali — penanda nomor daftar berbentuk medali bintang-8 (khatam).
 * Bintang digambar MATEMATIS via khatamPath (gabungan dua persegi, 16 titik
 * eksak dari geometry.js) — bukan gambar bebas. Isi gradasi emerald tema,
 * tepi & cakram tengah beraksen emas; angka HTML di tengah (terbaca screen
 * reader — SVG murni dekoratif aria-hidden).
 *
 * Props: nomor (angka/teks), ukuran (px, default 46).
 */
const Bungkus = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ ukuran }) => ukuran}px;
  height: ${({ ukuran }) => ukuran}px;
  filter: drop-shadow(0 2px 4px rgba(4, 37, 31, 0.28));
  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .angka {
    position: relative;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.goldLight};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }
`;

export default function NomorMedali({ nomor, ukuran = 46 }) {
  const theme = useTheme();
  const gid = `medali-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const digit = String(nomor).length;
  const fontSize = Math.round(ukuran * (digit >= 3 ? 0.25 : digit === 2 ? 0.31 : 0.36));

  return (
    <Bungkus ukuran={ukuran}>
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={theme.colors.primaryMid} />
            <stop offset="100%" stopColor={theme.colors.primary} />
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
      </svg>
      <span className="angka" style={{ fontSize }}>
        {nomor}
      </span>
    </Bungkus>
  );
}
