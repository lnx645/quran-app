/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';

/**
 * CornerOrnament — bingkai sudut ala iluminasi mushaf: garis ganda L + bintang-8 emas.
 * corner: 'tl' | 'tr' | 'bl' | 'br'. Parent wajib position:relative; komponen ini
 * diposisikan absolute oleh parent (prop position diberikan via style).
 * Contoh: <CornerOrnament corner="tl" style={{ top: 6, left: 6 }} />
 */
export default function CornerOrnament({ corner = 'tl', size = 84, style }) {
  const theme = useTheme();
  const gold = theme.colors.gold;
  const flipX = corner === 'tr' || corner === 'br';
  const flipY = corner === 'bl' || corner === 'br';
  return (
    <span
      css={{
        position: 'absolute',
        width: size,
        height: size,
        pointerEvents: 'none',
        transform: `scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`,
      }}
      style={style}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 84 84" fill="none">
        <path d="M3 81 L3 26 Q3 3 26 3 L81 3" stroke={gold} strokeWidth="1.6" />
        <path d="M10 81 L10 30 Q10 10 30 10 L81 10" stroke={gold} strokeWidth="0.9" opacity="0.7" />
        {/* bintang-8 kecil di sudut */}
        <g transform="translate(17 17)">
          <rect x="-7" y="-7" width="14" height="14" fill={gold} opacity="0.92" />
          <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" fill={gold} opacity="0.92" />
          <circle r="2.6" fill="#fff" />
        </g>
        <circle cx="46" cy="3" r="1.8" fill={gold} />
        <circle cx="3" cy="46" r="1.8" fill={gold} />
      </svg>
    </span>
  );
}
