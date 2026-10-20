/** @jsxImportSource @emotion/react */
import { memo, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { FaPlay } from 'react-icons/fa';
import { CornerOrnament } from './ornaments/index.js';

const Kartu = styled.article`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme, aktif }) =>
    aktif ? `1.5px solid ${theme.colors.gold}` : `1px solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  box-shadow: ${({ theme, aktif }) =>
    aktif ? theme.shadows.lift : theme.shadows.card};
  padding: 18px 16px 14px;
  margin-bottom: 13px;
  cursor: pointer;
  overflow: hidden;
  transition: background 0.45s ease, border-color 0.45s ease, box-shadow 0.3s ease;
  background-color: ${({ theme, aktif }) =>
    aktif ? theme.colors.goldSoft : theme.colors.surface};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 16px;
    right: 16px;
    height: 3px;
    border-radius: 0 0 6px 6px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.gold}, transparent);
    opacity: ${({ aktif }) => (aktif ? 1 : 0.3)};
  }
`;

const Kepala = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  position: relative;
`;

// Badge nomor ayat: medali lingkaran emas (gradasi).
const Badge = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  background: linear-gradient(160deg, ${({ theme }) => theme.colors.goldSoft}, ${({ theme }) => theme.colors.surface});
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13.5px;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 3px rgba(201, 162, 39, 0.14);
`;

const TombolPutarMini = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 32px;
  line-height: 2.15;
  text-align: right;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 35px;
  }
`;

const Kata = styled.span`
  border-radius: 7px;
  padding: 0 2px;
  transition: background 0.25s ease, color 0.25s ease;
  background: ${({ theme, aktif }) =>
    aktif
      ? `linear-gradient(135deg, ${theme.colors.gold}, ${theme.colors.goldLight})`
      : 'transparent'};
  color: ${({ theme, aktif }) => (aktif ? theme.colors.primaryDeep : 'inherit')};
`;

const Latin = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14.5px;
  line-height: 1.55;
  margin-top: 10px;
`;

const Terjemah = styled.p`
  font-size: 15px;
  line-height: 1.6;
  margin-top: 5px;
`;

/**
 * Kartu satu ayat:
 * - aktif (sedang diputar) → latar emas lembut + bingkai sudut ornamen + auto-scroll.
 * - kata aktif diberi highlight gradasi emas (segments Cara 2).
 * - klik kartu → seek ke ayat ini (diurus parent lewat onSelect).
 */
function AyatCard({ ayah, aktif, kataAktif, onSelect }) {
  const ref = useRef(null);

  useEffect(() => {
    if (aktif && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [aktif]);

  return (
    <Kartu ref={ref} aktif={aktif} onClick={() => onSelect?.(ayah)}>
      {aktif && (
        <>
          <CornerOrnament corner="tl" size={56} style={{ top: 4, left: 4 }} />
          <CornerOrnament corner="br" size={56} style={{ bottom: 4, right: 4 }} />
        </>
      )}
      <Kepala>
        <Badge>{ayah.number}</Badge>
        <span css={{ fontSize: 12, color: '#9BA9A1' }}>{ayah.key}</span>
        <TombolPutarMini>
          <FaPlay size={11} /> Putar ayat ini
        </TombolPutarMini>
      </Kepala>
      <Arab dir="rtl" lang="ar">
        {ayah.words.length
          ? ayah.words.map((w) => (
              <Kata key={w.position} aktif={aktif && kataAktif === w.position}>
                {w.arabic}{' '}
              </Kata>
            ))
          : ayah.arabic}
      </Arab>
      {ayah.latin && <Latin>{ayah.latin}</Latin>}
      {ayah.translation && <Terjemah>{ayah.translation}</Terjemah>}
    </Kartu>
  );
}

export default memo(AyatCard);
