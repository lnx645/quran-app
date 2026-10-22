/** @jsxImportSource @emotion/react */
import { useId } from 'react';
import { khatamPath } from './ornaments/geometry.js';

/**
 * Logo "NurQalam" — emblem SVG ORISINAL (desain sendiri):
 * - Badge squircle emerald (#0B5345 → #117A65) dengan border emas (#C9A227)
 * - Bulan sabit emas (evenodd) membuka ke kanan-atas
 * - Bintang khatam-8 emas kecil di lekuk sabit (konstruksi matematis via khatamPath)
 * - Siluet mushaf terbuka (2 halaman melengkung) di bawah sabit
 * Dipakai: header (~36px), hero Home (~72px), drawer (~40px).
 * Versi statis: public/logo.svg (favicon).
 */
export default function Logo({ size = 36, label = 'NurQalam' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const eg = `noor-eg-${uid}`;
  const gg = `noor-gg-${uid}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={label}
      css={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={eg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B5345" />
          <stop offset="100%" stopColor="#117A65" />
        </linearGradient>
        <linearGradient id={gg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E7C65A" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>
      {/* badge */}
      <rect x="3" y="3" width="90" height="90" rx="24" fill={`url(#${eg})`} stroke="#C9A227" strokeWidth="2.5" />
      <rect x="8.5" y="8.5" width="79" height="79" rx="19" fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.35" />
      {/* bulan sabit: lingkaran luar minus lingkaran geser (evenodd) */}
      <path
        fillRule="evenodd"
        fill={`url(#${gg})`}
        d="M 25 41 a 19 19 0 1 0 38 0 a 19 19 0 1 0 -38 0 Z
           M 34.9 34.7 a 17.5 17.5 0 1 0 35 0 a 17.5 17.5 0 1 0 -35 0 Z"
      />
      {/* bintang khatam-8 di lekuk sabit */}
      <path d={khatamPath(63, 26, 4.2)} fill={`url(#${gg})`} />
      <circle cx="63" cy="26" r="1.6" fill="#0B5345" />
      {/* siluet mushaf terbuka */}
      <path
        fill={`url(#${gg})`}
        d="M 48 66.5 C 41.8 62 34.2 61 27 62.6 L 27 74.8 C 34.2 73.2 41.8 74.2 48 78.6
           C 54.2 74.2 61.8 73.2 69 74.8 L 69 62.6 C 61.8 61 54.2 62 48 66.5 Z"
      />
      <path d="M 48 66.5 L 48 78.6" stroke="#0B5345" strokeWidth="1.5" opacity="0.4" />
      <path
        d="M 32.5 66.8 C 35.8 65.9 39.4 66.2 43 67.8 M 53 67.8 C 56.6 66.2 60.2 65.9 63.5 66.8"
        fill="none"
        stroke="#0B5345"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.38"
      />
    </svg>
  );
}
