/** @jsxImportSource @emotion/react */
import { memo, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import AyatRosette from './ornaments/AyatRosette.jsx';
import RubElHizb from './ornaments/RubElHizb.jsx';
import KhatamStar from './ornaments/KhatamStar.jsx';

/**
 * Aliran ayat ala mushaf cetak — BUKAN kartu:
 * teks ayat mengalir menyatu di kertas mushaf; pemisah antar ayat hanya
 * rosette ۝ di akhir teks Arab + jarak vertikal yang lega.
 * Ayat aktif = blok latar full-width (menyentuh garis emas dalam bingkai
 * mushaf): tint kertas sedikit lebih gelap + pita emas tipis di sisi kiri +
 * rosette terisi emas + medali bintang-8 di pita. Bukan kartu membulat.
 */
const Blok = styled.article`
  position: relative;
  cursor: pointer;
  /* Meluas sampai garis emas dalam bingkai mushaf
     (padding frame 14 / 22 di desktop, garis dalam inset 5) */
  margin: 0 -9px;
  padding: 17px 9px 15px;
  transition: background 0.45s ease;
  background: ${({ theme, aktif }) => (aktif ? theme.colors.paperDeep : 'transparent')};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin: 0 -17px;
    padding: 19px 17px 17px;
  }
  /* Pita emas tipis di sisi kiri saat ayat aktif */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.goldLight},
      ${({ theme }) => theme.colors.gold}
    );
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

/* Referensi kecil samar di atas baris terjemahan: muncul bila latin/arti
   ditampilkan, atau saat ayat sedang aktif. */
const RefBaris = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.faint};
  text-align: right;
  margin: 10px 0 0;
`;

const LatinBaris = styled.p`
  margin-top: 7px;
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
  margin-top: 7px;
`;

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

  const tampilRef = tampilLatin || tampilTerjemah || aktif;
  const pilih = () => onSelect?.(ayah);
  const tekan = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pilih();
    }
  };

  return (
    <Blok
      ref={ref}
      aktif={aktif}
      onClick={pilih}
      onKeyDown={tekan}
      role="button"
      tabIndex={0}
      aria-current={aktif ? 'true' : undefined}
      aria-label={`Ayat ${ayah.number} — ketuk atau tekan Enter untuk memutar dari sini`}
    >
      {juzAwal > 0 && (
        <PitaJuz aria-label={`Awal Juz ${juzAwal}`}>
          <RubElHizb size={17} />
          <span>Juz {juzAwal}</span>
          <RubElHizb size={17} />
        </PitaJuz>
      )}
      {aktif && (
        <span
          css={{ position: 'absolute', left: 1, top: '34%', lineHeight: 0, zIndex: 2, pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <KhatamStar size={18} />
        </span>
      )}
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
      {tampilRef && (
        <RefBaris>
          Ayat {ayah.number} · {ayah.key}
        </RefBaris>
      )}
      {tampilLatin && ayah.words.length > 0 && (
        <LatinBaris dir="ltr">
          {ayah.words.map((w) => w.latin).filter(Boolean).join(' ')}
        </LatinBaris>
      )}
      {tampilTerjemah && ayah.translation && <Terjemah>{ayah.translation}</Terjemah>}
    </Blok>
  );
}

export default memo(AyatCard);
