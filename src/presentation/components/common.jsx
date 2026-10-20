/** @jsxImportSource @emotion/react */
// Komponen bersama (Emotion) dipakai seluruh halaman — MOBILE-FIRST.
// Semua warna/radius/bayangan/tipografi/spasi dari theme tokens (palet emerald & gold v2.1).
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { GirihPattern, CornerOrnament, MoonStar, OrnamentBand } from './ornaments/index.js';
import { mountPage, mountUp, reduceMotion, shimmer } from './motion.js';

export const Page = styled.div`
  padding-top: 16px;
  ${mountPage}
  ${reduceMotion}
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing.cardPad}px ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: ${({ theme }) => theme.spacing.cardPadMd}px;
  }
`;

// Kartu penting: border emas 1px halus + bayangan emas berlapis.
export const GoldCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.gold};
  box-shadow: ${({ theme }) => theme.shadows.gold}, ${({ theme }) => theme.shadows.card};
  background: ${({ theme }) => theme.gradients.goldSoftCard};
`;

export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.type.display.size}px;
  font-weight: ${({ theme }) => theme.type.display.weight};
  line-height: ${({ theme }) => theme.type.display.lineHeight};
  color: ${({ theme }) => theme.colors.judul};
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

export const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.type.bodySm.size}px;
  line-height: ${({ theme }) => theme.type.bodySm.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.type.h2.size}px;
  font-weight: ${({ theme }) => theme.type.h2.weight};
  line-height: ${({ theme }) => theme.type.h2.lineHeight};
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.section}px 0 ${({ theme }) => theme.spacing.md}px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding-left: 12px;
  border-left: 4px solid ${({ theme }) => theme.colors.gold};
  svg {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

// KONTRAK UKURAN TOMBOL: PrimaryButton & GhostButton WAJIB berbagi metrik
// kotak yang sama persis (border 1.5px — Primary transparan, padding,
// min-height, font-size). Banyak halaman menukar keduanya menurut status
// (mis. baris checklist: belum = Ghost, sudah = Primary); bila ukurannya
// beda, barisnya tumbuh/menyusut dan seluruh isi di bawahnya bergeser
// (layout shift). Jangan ubah metrik salah satunya tanpa yang lain.
export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.gradients.gold};
  color: ${({ theme }) => theme.colors.primaryDeep};
  border: 1.5px solid transparent;
  border-radius: 14px;
  padding: 13px 18px;
  min-height: 52px;
  font-size: 15px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    box-shadow ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    filter ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:hover {
    filter: brightness(1.05);
    box-shadow: 0 2px 6px rgba(201, 162, 39, 0.25), 0 14px 30px rgba(201, 162, 39, 0.38);
  }
  &:active {
    transform: scale(0.97);
  }
  &:disabled {
    opacity: 0.55;
    cursor: default;
    box-shadow: none;
  }
  ${reduceMotion}
`;

export const GhostButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 14px;
  padding: 13px 18px;
  min-height: 52px;
  font-size: 15px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
  }
  &:active {
    transform: scale(0.97);
  }
  ${reduceMotion}
`;

export const Field = styled.div`
  margin-bottom: 14px;
  label:not(.noor-kotak-label) {
    display: block;
    font-size: ${({ theme }) => theme.type.caption.size}px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 6px;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 13px 14px;
  font-size: 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color ${({ theme }) => theme.anim.fast} ease, box-shadow ${({ theme }) => theme.anim.fast} ease;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primarySoft};
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 13px 14px;
  font-size: 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color ${({ theme }) => theme.anim.fast} ease, box-shadow ${({ theme }) => theme.anim.fast} ease;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primarySoft};
  }
`;

export const ErrorBox = styled.div`
  background: ${({ theme }) => theme.colors.dangerSoft};
  border: 1px solid ${({ theme }) => theme.colors.dangerBorder};
  color: ${({ theme }) => theme.colors.danger};
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 14px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const LoadingBox = styled.div`
  text-align: center;
  padding: 48px 16px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 15px;
`;

export const Spinner = styled.div`
  width: 38px;
  height: 38px;
  margin: 0 auto 14px;
  border: 4px solid ${({ theme }) => theme.colors.primarySoft};
  border-top-color: ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  animation: putar 0.9s linear infinite;
  @keyframes putar {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .label {
    font-size: ${({ theme }) => theme.type.caption.size}px;
    color: ${({ theme }) => theme.colors.muted};
  }
  .value {
    font-size: 18.5px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    text-align: right;
  }
`;

// Skeleton loading bersama — blok kilau (shimmer). Dipakai semua halaman loading.
// <Skeleton h={16} w="60%" radius={8} />
export const Skeleton = styled.div`
  border-radius: ${({ radius = 10 }) => radius}px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceAlt} 25%,
    ${({ theme }) => theme.colors.kilau} 50%,
    ${({ theme }) => theme.colors.surfaceAlt} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  width: ${({ w = '100%' }) => (typeof w === 'number' ? `${w}px` : w)};
  height: ${({ h = 14 }) => (typeof h === 'number' ? `${h}px` : h)};
  ${reduceMotion}
`;

// PageHero — header halaman fitur: gradasi emerald kaya + kilau emas,
// pola girih, bingkai sudut, aksen bulan sabit & pita ornamen di bawah.
// Pemakaian: <PageHero><h2>Judul</h2><p>subjudul</p></PageHero>
const HeroBox = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 24px 18px 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => theme.gradients.heroGlow}, ${({ theme }) => theme.gradients.hero};
  color: #fff;
  box-shadow: ${({ theme }) => theme.shadows.lift};
  ${mountUp}
  ${reduceMotion}
  h2 {
    position: relative;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.type.heroTitle.size}px;
    font-weight: ${({ theme }) => theme.type.heroTitle.weight};
    line-height: ${({ theme }) => theme.type.heroTitle.lineHeight};
    display: flex;
    align-items: center;
    gap: 10px;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
    svg {
      color: ${({ theme }) => theme.colors.goldLight};
    }
  }
  p {
    position: relative;
    font-size: ${({ theme }) => theme.type.bodySm.size}px;
    line-height: ${({ theme }) => theme.type.bodySm.lineHeight};
    color: rgba(255, 255, 255, 0.88);
    margin-top: 6px;
    max-width: 88%;
    padding-bottom: 4px;
  }
`;

export function PageHero({ children, moon = true }) {
  return (
    <HeroBox>
      <GirihPattern opacity={0.14} />
      <CornerOrnament corner="tl" size={60} style={{ top: 5, left: 5 }} />
      <CornerOrnament corner="br" size={60} style={{ bottom: 22, right: 5 }} />
      {moon && <MoonStar size={84} opacity={0.95} style={{ top: 12, right: 12 }} />}
      <div css={{ position: 'relative', paddingBottom: 18 }}>{children}</div>
      <div css={{ position: 'relative', margin: '0 -18px' }}>
        <OrnamentBand height={15} opacity={0.6} />
      </div>
    </HeroBox>
  );
}

// Kartu menu grid (2 kolom di HP) — ikon di atas, judul, deskripsi singkat.
// Grid seragam: kartu height 100% (baris sama tinggi), judul 1 baris ellipsis,
// deskripsi clamp tepat 2 baris dengan min-height tetap → semua sejajar.
const MenuLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 16px 14px 14px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease},
    box-shadow ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease},
    border-color ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
  position: relative;
  overflow: hidden;
  min-height: 128px;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${({ theme }) => theme.pattern};
    background-size: 64px 64px;
    opacity: 0.05;
    pointer-events: none;
  }
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lift};
    border-color: ${({ theme }) => theme.colors.gold};
  }
  &:active {
    transform: scale(0.98);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
  ${reduceMotion}
`;

const MenuIcon = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: ${({ theme }) => theme.gradients.header};
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 21px;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(231, 198, 90, 0.45);
`;

const MenuText = styled.span`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  .judul {
    display: block;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.25;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 34.8px; /* tepat 2 baris: 12px × 1.45 × 2 */
    font-size: 12px;
    line-height: 1.45;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 3px;
  }
`;

export function MenuCard({ to, icon, judul, desc }) {
  return (
    <MenuLink to={to}>
      <MenuIcon>{icon}</MenuIcon>
      <MenuText>
        <span className="judul">{judul}</span>
        <span className="desc">{desc}</span>
      </MenuText>
    </MenuLink>
  );
}
