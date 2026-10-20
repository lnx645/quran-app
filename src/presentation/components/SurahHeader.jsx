/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaMapMarkerAlt, FaListOl } from 'react-icons/fa';
import OrnamentDivider from './OrnamentDivider.jsx';

const Box = styled.section`
  position: relative;
  overflow: hidden;
  text-align: center;
  background: linear-gradient(140deg, ${({ theme }) => theme.colors.primaryDark}, ${({ theme }) => theme.colors.primary});
  color: #fff;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 26px 20px 18px;
  margin-bottom: 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${({ theme }) => theme.pattern};
    background-size: 56px 56px;
    opacity: 0.15;
  }
`;

const Arab = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 44px;
  line-height: 1.5;
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
  color: ${({ theme }) => theme.colors.goldLight};
  margin-top: 6px;
  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
`;

const Bismillah = styled.p`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 30px;
  text-align: center;
  margin-top: 14px;
`;

export default function SurahHeader({ surah }) {
  return (
    <Box>
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
      <OrnamentDivider />
    </Box>
  );
}
