/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaMapMarkerAlt, FaListOl } from 'react-icons/fa';
import OrnamentDivider from './OrnamentDivider.jsx';
import { GirihPattern, CornerOrnament, OrnamentBand } from './ornaments/index.js';

const Box = styled.section`
  position: relative;
  overflow: hidden;
  text-align: center;
  background: linear-gradient(150deg, ${({ theme }) => theme.colors.primaryDeep}, ${({ theme }) => theme.colors.primary} 55%, ${({ theme }) => theme.colors.primaryMid});
  color: #fff;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 28px 18px 6px;
  margin-bottom: 20px;
  box-shadow: ${({ theme }) => theme.shadows.lift};
`;

const Arab = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 46px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.goldLight};
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
`;

const Latin = styled.h1`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 24px;
  margin-top: 4px;
`;

const Meta = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 6px;
  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  svg {
    color: ${({ theme }) => theme.colors.goldLight};
  }
`;

const Bismillah = styled.p`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 30px;
  text-align: center;
  margin-top: 10px;
`;

export default function SurahHeader({ surah }) {
  return (
    <Box>
      <GirihPattern opacity={0.13} />
      <CornerOrnament corner="tl" style={{ top: 6, left: 6 }} />
      <CornerOrnament corner="tr" style={{ top: 6, right: 6 }} />
      <Arab dir="rtl">{surah.nameArabic}</Arab>
      <Latin>
        Surah {surah.nameLatin} ({surah.translationId})
      </Latin>
      <Meta>
        <span>
          <FaListOl /> {surah.versesCount} ayat
        </span>
        <span>
          <FaMapMarkerAlt /> {surah.revelationPlace === 'makkah' ? 'Makkiyah' : 'Madaniyah'}
        </span>
      </Meta>
      {surah.bismillahPre && surah.id !== 9 && (
        <Bismillah dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Bismillah>
      )}
      <div css={{ position: 'relative', marginTop: 10 }}>
        <OrnamentBand height={16} opacity={0.7} />
      </div>
    </Box>
  );
}
