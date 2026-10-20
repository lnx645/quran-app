/** @jsxImportSource @emotion/react */
import { useId } from 'react';
import { useTheme } from '@emotion/react';

/**
 * MoonStar — aksen bulan sabit + bintang-8 emas (SVG orisinal, gradasi emas).
 * Dekoratif saja (aria-hidden). Parent wajib position:relative; posisikan
 * lewat prop style. Contoh: <MoonStar size={86} style={{ top: 10, right: 14 }} />
 */
export default function MoonStar({ size = 86, opacity = 0.9, style }) {
  const theme = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gid = `moonstar-${id}`;
  const gold = theme.colors.gold;
  const goldLight = theme.colors.goldLight;
  return (
    <span
      css={{
        position: 'absolute',
        width: size,
        height: size,
        pointerEvents: 'none',
      }}
      style={style}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={goldLight} />
            <stop offset="100%" stopColor={gold} />
          </linearGradient>
        </defs>
        {/* bulan sabit: lingkaran luar dikurangi lingkaran geser (evenodd) */}
        <path
          fill={`url(#${gid})`}
          fillRule="evenodd"
          opacity={opacity}
          d="M 8 50 A 34 34 0 1 0 76 50 A 34 34 0 1 0 8 50 Z
             M 30 42 A 26 26 0 1 1 82 42 A 26 26 0 1 1 30 42 Z"
        />
        {/* bintang-8 di lekuk sabit */}
        <g transform="translate(76 22)" opacity={opacity} fill={`url(#${gid})`}>
          <rect x="-6.5" y="-6.5" width="13" height="13" />
          <rect x="-6.5" y="-6.5" width="13" height="13" transform="rotate(45)" />
          <circle r="2.4" fill="#fff" opacity="0.85" />
        </g>
        {/* titik bintang kecil pendamping */}
        <circle cx="84" cy="52" r="1.8" fill={goldLight} opacity={opacity * 0.8} />
        <circle cx="68" cy="80" r="1.4" fill={goldLight} opacity={opacity * 0.6} />
      </svg>
    </span>
  );
}
