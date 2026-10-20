/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaMoon, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GirihPattern, OrnamentBand } from './ornaments/index.js';

// Logo: bulan sabit + bintang (SVG inline + react-icons).
const LogoMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 13px;
  background: linear-gradient(135deg, rgba(231, 198, 90, 0.28), rgba(231, 198, 90, 0.1));
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 19px;
  position: relative;
  svg {
    position: relative;
  }
`;

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.primaryDeep}, ${({ theme }) => theme.colors.primary} 70%);
  color: #fff;
  box-shadow: 0 3px 14px rgba(4, 37, 31, 0.3);
`;

const Inner = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 11px 16px 13px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 23px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const Sub = styled.span`
  font-size: 10.5px;
  color: ${({ theme }) => theme.colors.goldLight};
  letter-spacing: 1.6px;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  gap: 2px;
  overflow-x: auto;
  max-width: 52%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavLink = styled(Link)`
  padding: 8px 13px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;
  &:hover {
    background: rgba(231, 198, 90, 0.22);
    color: #fff;
  }
`;

export default function AppHeader() {
  return (
    <Bar>
      <div css={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <GirihPattern opacity={0.1} />
      </div>
      <Inner>
        <LogoMark>
          <FaMoon />
        </LogoMark>
        <div>
          <Title to="/">Noor</Title>
          <div>
            <Sub>
              <FaStar size={8} /> Al-Qur&apos;an &amp; Ibadah <FaStar size={8} />
            </Sub>
          </div>
        </div>
        <Nav>
          <NavLink to="/surah/36">Yasin</NavLink>
          <NavLink to="/iqro">Iqro</NavLink>
          <NavLink to="/jadwal">Jadwal</NavLink>
          <NavLink to="/zakat">Zakat</NavLink>
          <NavLink to="/khatam">Khatam</NavLink>
        </Nav>
      </Inner>
      <OrnamentBand height={16} opacity={0.55} />
    </Bar>
  );
}
