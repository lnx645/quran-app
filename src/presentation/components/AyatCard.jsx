/** @jsxImportSource @emotion/react */
import { memo, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { FaPlay } from 'react-icons/fa';
import AyatRosette from './ornaments/AyatRosette.jsx';
import RubElHizb from './ornaments/RubElHizb.jsx';
import KhatamStar from './ornaments/KhatamStar.jsx';

const Kartu = styled.article`
  position: relative;
  background: ${({ theme }) => theme.colors.paperCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(154, 123, 26, 0.05);
  padding: 14px 14px 13px;
  margin-bottom: 11px;
  cursor: pointer;
  transition: background 0.45s ease, border-color 0.45s ease;
  background-color: ${({ theme, aktif }) =>
    aktif ? theme.colors.paperDeep : theme.colors.paperCard};
  border-color: ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  /* Pita emas di sisi kiri saat ayat aktif (margin marker) */
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 0;
    width: 4px;
    border-radius: 0 4px 4px 0;
    background: linear-gradient(180deg, ${({ theme }) => theme.colors.goldLight}, ${({ theme }) => theme.colors.gold});
    opacity: ${({ aktif }) => (aktif ? 1 : 0)};
    transition: opacity 0.4s ease;
  }
`;

const PitaJuz = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: -2px 0 10px;
  padding: 6px 10px;
  border-radius: 8px;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.goldSoft} 18%, ${({ theme }) => theme.colors.goldSoft} 82%, transparent);
  border-top: 1px solid ${({ theme }) => theme.colors.gold};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gold};
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
`;

const MetaBaris = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  position: relative;
`;

const KunciAyat = styled.span`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.faint};
`;

const TombolPutarMini = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.colors.goldDeep};
  opacity: 0.85;
`;

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: ${({ ukuran }) => ukuran}px;
  line-height: 2.4;
  text-align: right;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
`;

const Kata = styled.span`
  border-radius: 6px;
  padding: 0 1px;
  transition: background 0.25s ease, color 0.25s ease;
  background: ${({ theme, aktif }) => (aktif ? theme.colors.goldSoft : 'transparent')};
  box-shadow: ${({ theme, aktif }) =>
    aktif ? `inset 0 -3px 0 ${theme.colors.gold}` : 'none'};
  color: ${({ theme, aktif }) => (aktif ? theme.colors.primaryDeep : 'inherit')};
`;

const LatinBaris = styled.p`
  margin-top: 9px;
  text-align: right;
  font-size: 13px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.muted};
  font-variant: small-caps;
  letter-spacing: 0.45px;
`;

const Terjemah = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 14.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 8px;
`;

/**
 * Kartu ayat ala mushaf:
 * - penanda akhir ayat = rosette ۝ bernomor di akhir teks Arab (bukan badge kotak).
 * - pita "Juz N" (۞ Rub el Hizb) muncul bila ayat ini awal sebuah Juz.
 * - ayat aktif: kertas sedikit lebih gelap + pita emas di margin kiri +
 *   medali bintang-8 di sisi + rosette terisi emas; kata aktif ber-highlight halus.
 * - tampilLatin / tampilTerjemah & ukuranArab diatur preferensi baca (SurahPage).
 * - klik kartu → seek ke ayat ini (diurus parent lewat onSelect).
 */
function AyatCard({
  ayah,
  aktif,
  kataAktif,
  onSelect,
  arabSize = 32,
  tampilLatin = false,
  tampilTerjemah = true,
  juzAwal = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (aktif && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [aktif]);

  return (
    <Kartu ref={ref} aktif={aktif} onClick={() => onSelect?.(ayah)}>
      {aktif && (
        <span
          css={{ position: 'absolute', left: -9, top: '50%', transform: 'translateY(-50%)', zIndex: 3, lineHeight: 0 }}
          aria-hidden="true"
        >
          <KhatamStar size={24} />
        </span>
      )}
      {juzAwal > 0 && (
        <PitaJuz aria-label={`Awal Juz ${juzAwal}`}>
          <RubElHizb size={17} />
          <span>Juz {juzAwal}</span>
          <RubElHizb size={17} />
        </PitaJuz>
      )}
      <MetaBaris>
        <KunciAyat>
          AYAT {ayah.number} · {ayah.key}
        </KunciAyat>
        <TombolPutarMini aria-hidden="true">
          <FaPlay size={9} /> Putar
        </TombolPutarMini>
      </MetaBaris>
      <Arab dir="rtl" lang="ar" ukuran={arabSize}>
        {ayah.words.length
          ? ayah.words.map((w) => (
              <Kata key={w.position} aktif={aktif && kataAktif === w.position}>
                {w.arabic}{' '}
              </Kata>
            ))
          : ayah.arabic}
        <span css={{ display: 'inline-block', marginInlineStart: 7, verticalAlign: 'middle' }}>
          <AyatRosette nomor={ayah.number} aktif={aktif} size={40} />
        </span>
      </Arab>
      {tampilLatin && ayah.words.length > 0 && (
        <LatinBaris dir="ltr">
          {ayah.words.map((w) => w.latin).filter(Boolean).join(' ')}
        </LatinBaris>
      )}
      {tampilTerjemah && ayah.translation && <Terjemah>{ayah.translation}</Terjemah>}
    </Kartu>
  );
}

export default memo(AyatCard);
