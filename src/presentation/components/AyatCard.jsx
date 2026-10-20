/** @jsxImportSource @emotion/react */
import { memo, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { FaPlay } from 'react-icons/fa';

const Kartu = styled.article`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  box-shadow: ${({ theme, aktif }) =>
    aktif ? theme.shadows.lift : theme.shadows.card};
  padding: 18px 18px 14px;
  margin-bottom: 14px;
  cursor: pointer;
  transition: background 0.45s ease, border-color 0.45s ease, box-shadow 0.3s ease;
  background-color: ${({ theme, aktif }) =>
    aktif ? theme.colors.goldSoft : theme.colors.surface};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 18px;
    right: 18px;
    height: 3px;
    border-radius: 0 0 6px 6px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.gold}, transparent);
    opacity: ${({ aktif }) => (aktif ? 1 : 0.35)};
  }
`;

const Kepala = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

// Badge nomor ayat: lingkaran bermotif emas.
const Badge = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.goldSoft};
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
`;

const TombolPutarMini = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 34px;
  line-height: 2.1;
  text-align: right;
  color: ${({ theme }) => theme.colors.text};
`;

const Kata = styled.span`
  border-radius: 6px;
  padding: 0 1px;
  transition: background 0.25s ease, color 0.25s ease;
  background: ${({ theme, aktif }) =>
    aktif ? theme.colors.gold : 'transparent'};
  color: ${({ theme, aktif }) => (aktif ? '#fff' : 'inherit')};
`;

const Latin = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14.5px;
  margin-top: 10px;
`;

const Terjemah = styled.p`
  font-size: 15px;
  margin-top: 4px;
`;

/**
 * Kartu satu ayat:
 * - aktif (sedang diputar) → latar emas lembut + auto-scroll ke tengah.
 * - kata aktif diberi highlight emas (segments Cara 2).
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
      <Kepala>
        <Badge>{ayah.number}</Badge>
        <span css={{ fontSize: 12, color: '#94A3B8' }}>{ayah.key}</span>
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
