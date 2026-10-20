/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Logo: bulan sabit + bintang (SVG inline, react-icons FaMoon).
const LogoMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(201, 162, 39, 0.7);
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 20px;
`;

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.primaryDeep}, ${({ theme }) => theme.colors.primaryDark});
  color: #fff;
  box-shadow: 0 2px 12px rgba(7, 51, 44, 0.25);
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${({ theme }) => theme.pattern};
    background-size: 56px 56px;
    opacity: 0.14;
    pointer-events: none;
  }
`;

const Inner = styled.div`
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #fff;
`;

const Sub = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.goldLight};
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  gap: 4px;
  overflow-x: auto;
  max-width: 55%;
  &::-webkit-scrollbar { display: none; }
`;

const NavLink = styled(Link)`
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
  &:hover {
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
  }
`;

export default function AppHeader() {
  return (
    <Bar>
      <Inner>
        <LogoMark>
          <FaMoon />
        </LogoMark>
        <div>
          <Title to="/">Noor</Title>
          <div>
            <Sub>Al-Qur&apos;an &amp; Ibadah</Sub>
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
    </Bar>
  );
}
