/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { GirihPaper, KhatamStar } from './KhatamStar.jsx';

const Frame = styled.div`
  position: relative;
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  border-radius: 12px;
  background: linear-gradient(180deg, #fdf9ec 0%, ${({ theme }) => theme.colors.bg} 130%);
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 20px 14px 16px;
  overflow: hidden;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 26px 22px 20px;
  }
  /* Garis ganda dalam — ciri tepian halaman mushaf */
  &::before {
    content: '';
    position: absolute;
    inset: 5px;
    border: 1px solid ${({ theme }) => theme.colors.gold};
    border-radius: 8px;
    opacity: 0.55;
    pointer-events: none;
  }
`;

const SudutPos = [
  { top: 1, left: 1 },
  { top: 1, right: 1 },
  { bottom: 1, left: 1 },
  { bottom: 1, right: 1 },
];

/**
 * MushafFrame — area baca ala halaman mushaf cetak: kertas hangat,
 * bingkai garis ganda emas, medali bintang-8 di empat sudut, pola
 * girih sangat halus di permukaan kertas.
 */
export default function MushafFrame({ children }) {
  return (
    <Frame>
      <GirihPaper opacity={0.05} />
      {SudutPos.map((pos, i) => (
        <span
          key={i}
          css={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', lineHeight: 0 }}
          style={pos}
          aria-hidden="true"
        >
          <KhatamStar size={30} filled={false} strokeWidth={1.2} />
        </span>
      ))}
      <div css={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </Frame>
  );
}
