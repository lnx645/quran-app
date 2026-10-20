/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import AppHeader from '../presentation/components/AppHeader.jsx';

// App shell: ThemeProvider sudah dipasang di main.jsx.
// Layout: header tetap + konten dengan padding bawah.
const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 0 16px 96px;
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
