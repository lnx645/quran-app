/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { KhatamStar, RubElHizb, GirihPaper } from './ornaments/index.js';
import { mountUp, reduceMotion } from './motion.js';

/**
 * Panel nama surah ala iluminasi mushaf cetak:
 * - bingkai garis ganda emas (luar tebal, dalam tipis, inset 5px)
 * - medali bintang-8 (khatam, konstruksi matematis) di empat sudut
 * - pita pola girih seamless di tepi atas & bawah panel
 * - medali tengah: Rub el Hizb (aset unduhan Wikimedia, CC BY-SA 4.0)
 * - nama surah besar (Amiri), meta kecil huruf kapital berjarak
 * Basmalah berdiri sebagai blok terpisah DI BAWAH panel (elegan,
 * diapit garis emas berlian) — tidak menempel ke ayat pertama.
 */

const Panel = styled.section`
  position: relative;
  overflow: hidden;
  text-align: center;
  background: linear-gradient(180deg, #fffdf4 0%, ${({ theme }) => theme.colors.paper} 100%);
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 10px;
  padding: 10px 14px 12px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  ${mountUp}
  ${reduceMotion}
  &::before {
    content: '';
    position: absolute;
    inset: 5px;
    border: 1px solid ${({ theme }) => theme.colors.gold};
    border-radius: 6px;
    opacity: 0.65;
    pointer-events: none;
  }
`;

const Sudut = [
  { top: 2, left: 2 },
  { top: 2, right: 2 },
  { bottom: 2, left: 2 },
  { bottom: 2, right: 2 },
];

const IsiPanel = styled.div`
  position: relative;
  padding: 14px 6px 12px;
`;

const NamaArab = styled.div`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 44px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.primaryDeep};
  text-shadow: 0 1px 0 rgba(201, 162, 39, 0.25);
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 50px;
  }
`;

const NamaLatin = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 2px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
`;

const BerlianKecil = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.gold};
  transform: rotate(45deg);
  flex-shrink: 0;
`;

const BlokBasmalah = styled.div`
  text-align: center;
  margin: 4px 0 18px;
  ${mountUp}
  ${reduceMotion}
  .basmalah-teks {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 30px;
    line-height: 1.9;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }
  .garis {
    flex: 0 1 64px;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.gold});
  }
  .garis.kanan {
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.gold}, transparent);
  }
`;

export default function SurahHeader({ surah }) {
  const tempat = surah.revelationPlace === 'makkah' ? 'Makkiyah' : 'Madaniyah';
  return (
    <>
      <Panel>
        {Sudut.map((pos, i) => (
          <span
            key={i}
            css={{ position: 'absolute', zIndex: 2, lineHeight: 0, pointerEvents: 'none' }}
            style={pos}
            aria-hidden="true"
          >
            <KhatamStar size={26} filled={false} strokeWidth={1.3} />
          </span>
        ))}
        <div css={{ position: 'relative', height: 24, overflow: 'hidden', borderRadius: 4 }} aria-hidden="true">
          <GirihPaper opacity={0.16} tile={120} />
        </div>
        <IsiPanel>
          <div css={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }} aria-hidden="true">
            <RubElHizb size={52} />
          </div>
          <NamaArab dir="rtl" lang="ar">
            {surah.nameArabic}
          </NamaArab>
          <NamaLatin>
            Surah {surah.nameLatin} — {surah.translationId}
          </NamaLatin>
          <Meta>
            <span>{tempat}</span>
            <BerlianKecil />
            <span>{surah.versesCount} Ayat</span>
            <BerlianKecil />
            <span>Surah ke-{surah.id}</span>
          </Meta>
        </IsiPanel>
        <div css={{ position: 'relative', height: 24, overflow: 'hidden', borderRadius: 4 }} aria-hidden="true">
          <GirihPaper opacity={0.16} tile={120} />
        </div>
      </Panel>

      {surah.bismillahPre && surah.id !== 9 && (
        <BlokBasmalah>
          <div className="basmalah-teks" dir="rtl" lang="ar">
            <span className="garis kanan" aria-hidden="true" />
            <span>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className="garis" aria-hidden="true" />
          </div>
        </BlokBasmalah>
      )}
    </>
  );
}
