/** @jsxImportSource @emotion/react */
// Komponen bersama (Emotion) dipakai seluruh halaman — memakai theme tokens.
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Page = styled.div`
  padding-top: 20px;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 18px;
  margin-bottom: 16px;
`;

export const GoldCard = styled(Card)`
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.goldSoft}, ${({ theme }) => theme.colors.surface} 55%);
`;

export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDeep};
  margin-bottom: 4px;
`;

export const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  margin-bottom: 18px;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 22px 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-size: 15px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    box-shadow: ${({ theme }) => theme.shadows.lift};
  }
  &:active {
    transform: scale(0.97);
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
    box-shadow: none;
  }
`;

export const GhostButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 9px 14px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
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
  padding: 12px 14px;
  font-size: 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
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
  padding: 12px 14px;
  font-size: 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
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
  border-radius: 12px;
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
  border-top-color: ${({ theme }) => theme.colors.primary};
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
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.muted};
  }
  .value {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primaryDeep};
    text-align: right;
  }
`;

// Kartu menu di Home (ikon react-icons, motif halus).
const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 14px 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${({ theme }) => theme.pattern};
    background-size: 56px 56px;
    opacity: 0.06;
    pointer-events: none;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lift};
    border-color: ${({ theme }) => theme.colors.gold};
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
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 22px;
  flex-shrink: 0;
`;

const MenuText = styled.span`
  position: relative;
  .judul {
    display: block;
    font-weight: 700;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text};
  }
  .desc {
    display: block;
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
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
