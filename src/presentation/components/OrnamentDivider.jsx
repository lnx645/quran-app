/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';

// Divider ornamen Islami: garis gradasi — berlian kecil — medali bintang-8 — berlian kecil — garis.
export default function OrnamentDivider({ style }) {
  const theme = useTheme();
  const gold = theme.colors.gold;
  return (
    <div
      css={{ display: 'flex', alignItems: 'center', gap: 8, margin: '20px auto', maxWidth: 340 }}
      style={style}
      aria-hidden="true"
    >
      <span css={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${gold})` }} />
      <svg width="11" height="11" viewBox="0 0 11 11">
        <path d="M5.5 0 L11 5.5 L5.5 11 L0 5.5 Z" fill={gold} opacity="0.75" />
      </svg>
      <svg width="34" height="34" viewBox="0 0 34 34">
        <circle cx="17" cy="17" r="15.4" fill="none" stroke={gold} strokeWidth="1.4" opacity="0.85" />
        <circle cx="17" cy="17" r="11.5" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6" />
        <g transform="translate(17 17)">
          <rect x="-5.5" y="-5.5" width="11" height="11" fill={gold} opacity="0.9" />
          <rect x="-5.5" y="-5.5" width="11" height="11" transform="rotate(45)" fill={gold} opacity="0.9" />
          <circle r="2.1" fill={theme.colors.bg} />
        </g>
      </svg>
      <svg width="11" height="11" viewBox="0 0 11 11">
        <path d="M5.5 0 L11 5.5 L5.5 11 L0 5.5 Z" fill={gold} opacity="0.75" />
      </svg>
      <span css={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${gold}, transparent)` }} />
    </div>
  );
}
