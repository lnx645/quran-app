/** @jsxImportSource @emotion/react */
// Komponen bersama (Emotion) dipakai seluruh halaman — MOBILE-FIRST.
// Semua warna/radius/bayangan dari theme tokens (palet emerald & gold v2).
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { GirihPattern, CornerOrnament } from './ornaments/index.js';

export const Page = styled.div`
  padding-top: 16px;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 18px 16px;
  margin-bottom: 16px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 22px;
  }
`;

export const GoldCard = styled(Card)`
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.goldSoft}, ${({ theme }) => theme.colors.surface} 58%);
`;

export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 29px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDeep};
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
  font-size: 14.5px;
  line-height: 1.55;
  margin-bottom: 18px;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
  margin: 26px 0 14px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding-left: 12px;
  border-left: 4px solid ${({ theme }) => theme.colors.gold};
  line-height: 1.2;
  svg {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.gold}, ${({ theme }) => theme.colors.goldLight});
  color: ${({ theme }) => theme.colors.primaryDeep};
  border: none;
  border-radius: 14px;
  padding: 14px 20px;
  min-height: 52px;
  font-size: 15.5px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 6px 16px rgba(201, 162, 39, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
  &:hover {
    filter: brightness(1.04);
    box-shadow: 0 10px 22px rgba(201, 162, 39, 0.42);
  }
  &:active {
    transform: scale(0.97);
  }
  &:disabled {
    opacity: 0.55;
    cursor: default;
    box-shadow: none;
  }
`;

export const GhostButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 14px;
  padding: 12px 16px;
  min-height: 48px;
  font-size: 14.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.15s ease, transform 0.15s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
  }
  &:active {
    transform: scale(0.97);
  }
`;

export const Field = styled.div`
  margin-bottom: 14px;
  label {
    display: block;
    font-size: 13px;
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
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorBox = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
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
    font-size: 14px;
    color: ${({ theme }) => theme.colors.muted};
  }
  .value {
    font-size: 18.5px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    text-align: right;
  }
`;

// PageHero — header halaman fitur: gradasi emerald + pola girih + bingkai sudut emas.
// Pemakaian: <PageHero><h2>Judul</h2><p>subjudul</p></PageHero>
const HeroBox = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 22px 18px;
  margin-bottom: 18px;
  background: linear-gradient(140deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryMid} 55%, ${({ theme }) => theme.colors.primaryDark});
  color: #fff;
  box-shadow: ${({ theme }) => theme.shadows.card};
  h2 {
    position: relative;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
    svg {
      color: ${({ theme }) => theme.colors.goldLight};
    }
  }
  p {
    position: relative;
    font-size: 13.5px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.88);
    margin-top: 6px;
    max-width: 92%;
  }
`;

export function PageHero({ children }) {
  return (
    <HeroBox>
      <GirihPattern opacity={0.13} />
      <CornerOrnament corner="tl" size={64} style={{ top: 5, left: 5 }} />
      <CornerOrnament corner="br" size={64} style={{ bottom: 5, right: 5 }} />
      {children}
    </HeroBox>
  );
}

// Kartu menu grid (2 kolom di HP) — ikon di atas, judul, deskripsi singkat.
const MenuLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 16px 14px 14px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
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
  }
`;

const MenuIcon = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryMid});
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 21px;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(231, 198, 90, 0.45);
`;

const MenuText = styled.span`
  position: relative;
  .judul {
    display: block;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.25;
    color: ${({ theme }) => theme.colors.text};
  }
  .desc {
    display: block;
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
