/** @jsxImportSource @emotion/react */
import { useId } from 'react';
import { useTheme } from '@emotion/react';

/**
 * GirihPattern — ubin pola geometris Islami (bintang-8 + berlian) yang mulus.
 * Dirender sebagai SVG absolute penuh menutupi parent (parent wajib position:relative + overflow:hidden).
 * Warna/opacity mengikuti theme: emas di atas emerald.
 */
export default function GirihPattern({ opacity = 0.16, tile = 96, style }) {
  const theme = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const pid = `girih-${id}`;
  const stroke = theme.colors.gold;
  return (
    <svg
      css={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <pattern id={pid} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth="1.1" opacity="1">
            {/* Bintang-8 tengah: persegi + berlian */}
            <rect x={tile / 2 - 18} y={tile / 2 - 18} width="36" height="36" />
            <path
              d={`M ${tile / 2} ${tile / 2 - 34} L ${tile / 2 + 34} ${tile / 2} L ${tile / 2} ${tile / 2 + 34} L ${tile / 2 - 34} ${tile / 2} Z`}
            />
            <circle cx={tile / 2} cy={tile / 2} r="6" />
            <circle cx={tile / 2} cy={tile / 2} r="11.5" />
            {/* Berlian di 4 sudut (seperempat tiap ubin → mulus) */}
            <path d="M 0 -14 L 14 0 L 0 14 L -14 0 Z" />
            {/* Garis penghubung ke tepi ubin */}
            <path d={`M 0 ${tile / 2} H ${tile / 2 - 34} M ${tile / 2 + 34} ${tile / 2} H ${tile}`} />
            <path d={`M ${tile / 2} 0 V ${tile / 2 - 34} M ${tile / 2} ${tile / 2 + 34} V ${tile}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} opacity={opacity} />
    </svg>
  );
}
