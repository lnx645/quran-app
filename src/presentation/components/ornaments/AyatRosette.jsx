/** @jsxImportSource @emotion/react */
import { useId } from 'react';
import { useTheme } from '@emotion/react';
import { rosettePath } from './geometry.js';

/**
 * AyatRosette — penanda akhir ayat ala mushaf (۝): lingkaran bergerigi
 * 16 lobus simetris (dihitung dari rotasi tetap, lihat geometry.js),
 * nomor ayat di tengah.
 * Aktif → terisi gradasi emas; nonaktif → latar kertas, bingkai emas.
 * Dirender inline-block di akhir teks Arab (arus RTL → duduk di ujung
 * baris terakhir seperti mushaf cetak).
 */
export default function AyatRosette({ nomor, aktif = false, size = 42, style }) {
  const theme = useTheme();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gid = `rosetteGold-${uid}`;
  const r = 22.5;
  const lobus = rosettePath(24, 24, r, 16, 1.16);
  const teksSize = nomor >= 100 ? 10.5 : nomor >= 10 ? 12 : 13.5;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      css={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      style={style}
      role="img"
      aria-label={`Ayat ${nomor}`}
    >
      <defs>
        <radialGradient id={gid} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={theme.colors.goldLight} />
          <stop offset="100%" stopColor={theme.colors.gold} />
        </radialGradient>
      </defs>
      <path
        d={lobus}
        fill={aktif ? `url(#${gid})` : theme.colors.surface}
        stroke={aktif ? theme.colors.goldDeep : theme.colors.gold}
        strokeWidth={aktif ? 1.6 : 1.3}
      />
      <circle
        cx="24"
        cy="24"
        r="14.5"
        fill="none"
        stroke={aktif ? 'rgba(255,255,255,0.75)' : theme.colors.gold}
        strokeWidth="1"
        opacity={aktif ? 1 : 0.65}
      />
      <text
        x="24"
        y="24.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={teksSize}
        fontWeight="800"
        fill={aktif ? '#fff' : theme.colors.judul}
        fontFamily="Inter, system-ui, sans-serif"
      >
        {nomor}
      </text>
    </svg>
  );
}
