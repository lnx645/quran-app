/** @jsxImportSource @emotion/react */
import { useId } from 'react';
import { useTheme } from '@emotion/react';

/**
 * OrnamentBand — pita ornamen horizontal (berlian + bintang-8 kecil bergantian)
 * dengan garis emas tipis di atas-bawah. Untuk: bawah header app, atas PlayerBar,
 * bawah hero, pembatas atas-bawah kartu penting.
 */
export default function OrnamentBand({ height = 30, opacity = 0.9, style }) {
  const theme = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const pid = `band-${id}`;
  const gold = theme.colors.gold;
  const h = height;
  const cy = h / 2;
  return (
    <div css={{ lineHeight: 0 }} style={style} aria-hidden="true">
      <svg
        width="100%"
        height={h}
        css={{ display: 'block' }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={pid} width="120" height={h} patternUnits="userSpaceOnUse">
            <g fill="none" stroke={gold} strokeWidth="1.2" opacity={opacity}>
              {/* garis atas & bawah */}
              <path d={`M 0 3 H 120 M 0 ${h - 3} H 120`} strokeWidth="1" />
              {/* berlian tengah */}
              <path d={`M 60 ${cy - 9} L 69 ${cy} L 60 ${cy + 9} L 51 ${cy} Z`} />
              {/* bintang-8 kecil di sela */}
              <g transform={`translate(0 ${cy})`}>
                <rect x="-5" y="-5" width="10" height="10" />
                <rect x="-5" y="-5" width="10" height="10" transform="rotate(45)" />
              </g>
              <g transform={`translate(120 ${cy})`}>
                <rect x="-5" y="-5" width="10" height="10" />
                <rect x="-5" y="-5" width="10" height="10" transform="rotate(45)" />
              </g>
              {/* titik penghubung */}
              <circle cx="30" cy={cy} r="1.6" fill={gold} stroke="none" />
              <circle cx="90" cy={cy} r="1.6" fill={gold} stroke="none" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height={h} fill={`url(#${pid})`} />
      </svg>
    </div>
  );
}
