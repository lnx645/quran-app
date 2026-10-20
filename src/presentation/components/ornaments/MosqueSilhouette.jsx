/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';

/**
 * MosqueSilhouette — siluet masjid sederhana (kubah bawang tengah + 2 menara
 * berujung bintang) untuk dekorasi hero header. Warna dari theme; opacity prop.
 */
export default function MosqueSilhouette({ opacity = 0.22, height = 110, style }) {
  const theme = useTheme();
  const fill = theme.colors.goldLight;
  return (
    <svg
      viewBox="0 0 400 130"
      width="100%"
      height={height}
      preserveAspectRatio="xMidYMax slice"
      css={{ display: 'block', pointerEvents: 'none' }}
      style={style}
      aria-hidden="true"
    >
      <g fill={fill} opacity={opacity}>
        {/* tanah */}
        <rect x="0" y="120" width="400" height="10" />
        {/* menara kiri */}
        <rect x="58" y="34" width="14" height="86" />
        <rect x="54" y="54" width="22" height="6" />
        <path d="M58 34 Q65 12 72 34 Z" />
        <rect x="64" y="2" width="2" height="10" />
        <path d="M65 -2 L68 3 L65 8 L62 3 Z" transform="translate(0 2)" />
        {/* sayap kiri */}
        <rect x="96" y="90" width="56" height="30" />
        <path d="M96 90 Q124 62 152 90 Z" />
        {/* bangunan tengah */}
        <rect x="152" y="68" width="96" height="52" />
        {/* kubah bawang */}
        <path d="M200 6 C189 30 174 44 166 68 L234 68 C226 44 211 30 200 6 Z" />
        <rect x="199" y="-4" width="2" height="10" />
        {/* sayap kanan */}
        <rect x="248" y="90" width="56" height="30" />
        <path d="M248 90 Q276 62 304 90 Z" />
        {/* menara kanan */}
        <rect x="328" y="34" width="14" height="86" />
        <rect x="324" y="54" width="22" height="6" />
        <path d="M328 34 Q335 12 342 34 Z" />
        <rect x="334" y="2" width="2" height="10" />
        <path d="M335 0 L338 5 L335 10 L332 5 Z" />
      </g>
    </svg>
  );
}
