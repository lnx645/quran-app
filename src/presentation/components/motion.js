import { keyframes, css } from '@emotion/react';

/**
 * motion.js — keyframes & helper mikro-transisi bersama (Emotion).
 * Ringan saja: fade/shimmer 150–250ms, ease-out. Durasi/easing dari
 * theme.anim; keyframes dipusatkan di sini agar konsisten di semua halaman.
 */

// Muncul halaman: opacity saja (tanpa geser, menghindari jank layout).
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Muncul kartu/hero: naik halus 10px.
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Kilau skeleton loading (dipakai komponen Skeleton di common.jsx).
export const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;

// Snippet animasi-masuk untuk halaman.
export const mountPage = css`
  animation: ${fadeIn} 180ms ease-out both;
`;

// Snippet animasi-masuk untuk hero/kartu unggulan.
export const mountUp = css`
  animation: ${fadeInUp} 240ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
`;

/**
 * Stagger halus untuk anak-anak grid (kartu menu/surah) — delay kecil
 * berurutan sampai anak ke-N, selebihnya serentak. Sertakan di styled
 * container grid: `${stagger(6)}`.
 */
export const stagger = (max = 6, step = 45) => css`
  > * {
    animation: ${fadeInUp} 240ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
  }
  ${Array.from({ length: max }, (_, i) => `> *:nth-child(${i + 2}) { animation-delay: ${(i + 1) * step}ms; }`).join('\n')}
`;

// Hormati preferensi pengguna: matikan animasi bila reduced-motion aktif.
export const reduceMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: none !important;
  }
`;
