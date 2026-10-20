/** @jsxImportSource @emotion/react */
import { useId } from 'react';
import { useTheme } from '@emotion/react';
import { girihTilePaths, khatamPath } from './geometry.js';

/**
 * KhatamStar — bintang-8 mushaf dari konstruksi "dua kotak" (lihat geometry.js).
 * Path dihitung matematis: simetri lipat-8 eksak.
 */
export function KhatamStar({ size = 40, filled = true, strokeWidth = 1.6, style, className }) {
  const theme = useTheme();
  const gold = theme.colors.gold;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      css={{ display: 'inline-block', flexShrink: 0 }}
      style={style}
      className={className}
      aria-hidden="true"
    >
      <path
        d={khatamPath(24, 24, 13.5)}
        fill={filled ? gold : 'none'}
        stroke={theme.colors.goldDeep}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="3.1" fill={theme.colors.primary} opacity={filled ? 0.9 : 0.55} />
    </svg>
  );
}

/**
 * GirihPaper — latar pola girih SEAMLESS (ubin dari geometry.js) untuk
 * permukaan kertas mushaf; sangat halus (opacity rendah).
 * Parent wajib position:relative; konten lain ditaruh di atasnya.
 */
export function GirihPaper({ opacity = 0.055, tile = 120, style }) {
  const theme = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const pid = `girihpaper-${id}`;
  const { bintang, berlian } = girihTilePaths(tile);
  const stroke = theme.colors.goldDeep;
  return (
    <svg
      css={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <pattern id={pid} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth="1">
            {bintang.map((d, i) => (
              <path key={`b${i}`} d={d} />
            ))}
            {berlian.map((d, i) => (
              <path key={`d${i}`} d={d} />
            ))}
            <circle cx={tile / 2} cy={tile / 2} r="4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} opacity={opacity} />
    </svg>
  );
}

export default KhatamStar;
