/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { ThemeProvider, Global, css } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { buatTema } from './theme.js';
import router from './router.jsx';
import ToastProvider from '../presentation/components/feedback/Toast.jsx';
import DialogProvider from '../presentation/components/feedback/Dialog.jsx';
import { useAkses } from '../presentation/a11y/pengaturanStore.js';

const globalStyles = (t) => css`
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    font-family: ${t.fonts.body};
    background: ${t.colors.bg};
    color: ${t.colors.text};
    line-height: 1.6;
    min-height: 100vh;
  }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; cursor: pointer; }
  img, svg { display: block; max-width: 100%; }
  .arabic { font-family: ${t.fonts.arabic}; direction: rtl; }
  /* Fokus keyboard yang selalu terlihat jelas (WCAG 2.4.7):
     cincin emas 3px + offset. Hanya untuk navigasi keyboard (:focus-visible),
     klik mouse tidak memunculkannya. */
  :focus-visible {
    outline: 3px solid ${t.colors.goldDeep};
    outline-offset: 2px;
    border-radius: 6px;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  /* Override manual "Kurangi animasi" dari Pengaturan Aksesibilitas */
  html.noor-kurangi-gerakan *, html.noor-kurangi-gerakan *::before, html.noor-kurangi-gerakan *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
`;

// Lapisan dalam aplikasi: tema dibangun dari pengaturan aksesibilitas aktif.
export default function Aplikasi() {
  const { pengaturan, modeEfektif } = useAkses();
  const tema = useMemo(
    () => buatTema(modeEfektif, { fontDisleksia: pengaturan.fontDisleksia }),
    [modeEfektif, pengaturan.fontDisleksia],
  );
  return (
    <ThemeProvider theme={tema}>
      <Global styles={globalStyles} />
      <DialogProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </DialogProvider>
    </ThemeProvider>
  );
}
