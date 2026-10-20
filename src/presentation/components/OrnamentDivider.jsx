/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';

// Divider ornamen khas Islami (SVG shape ✦, bukan emoji).
export default function OrnamentDivider({ style }) {
  const theme = useTheme();
  const gold = theme.colors.gold;
  return (
    <div
      css={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px auto', maxWidth: 320 }}
      style={style}
    >
      <span css={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${gold})` }} />
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <path d="M13 1 L16 10 L25 13 L16 16 L13 25 L10 16 L1 13 L10 10 Z" fill={gold} opacity="0.9" />
        <circle cx="13" cy="13" r="3.2" fill="none" stroke={gold} strokeWidth="1.4" />
      </svg>
      <span css={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${gold}, transparent)` }} />
    </div>
  );
}
