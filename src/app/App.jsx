/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import AppHeader from '../presentation/components/AppHeader.jsx';

// App shell: ThemeProvider sudah dipasang di main.jsx.
// Mobile-first: konten full-width rapat di HP; max 960px center di desktop.
const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg};
`;
const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 14px 120px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 0 20px 110px;
  }
`;

export default function App() {
  return (
    <Shell>
      <AppHeader />
      <Main>
        <Outlet />
      </Main>
    </Shell>
  );
}
