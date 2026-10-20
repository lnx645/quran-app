import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PengaturanProvider from '../presentation/a11y/PengaturanProvider.jsx';
import Aplikasi from './Aplikasi.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PengaturanProvider>
      <Aplikasi />
    </PengaturanProvider>
  </StrictMode>
);
