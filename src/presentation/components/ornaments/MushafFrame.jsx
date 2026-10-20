/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { GirihPaper, KhatamStar } from './KhatamStar.jsx';

const Frame = styled.div`
  position: relative;
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  border-radius: 12px;
  background: ${({ theme }) => theme.gradients.paperFrame};
  box-shadow: ${({ theme }) => theme.shadows.card};
  /* Margin baca lega ala mushaf cetak: teks berjarak ±22px (HP) / ±30px
     (desktop) dari garis emas dalam (inset 5px). */
  padding: 24px 27px 20px;
  overflow: hidden;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 30px 35px 26px;
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
  const theme = useTheme();
  // Di kertas gelap pola diberi sedikit lebih banyak kehadiran agar tetap
  // terasa, tapi tetap halus (tidak norak): 0,07 vs 0,05 di terang.
  const opasitasGirih = theme.mode === 'gelap' ? 0.07 : 0.05;
  return (
    <Frame>
      <GirihPaper opacity={opasitasGirih} />
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
