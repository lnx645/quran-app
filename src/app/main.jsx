/** @jsxImportSource @emotion/react */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, Global, css } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import theme from './theme.js';
import router from './router.jsx';
import ToastProvider from '../presentation/components/feedback/Toast.jsx';
import DialogProvider from '../presentation/components/feedback/Dialog.jsx';

const globalStyles = (t) => css`
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; padding: 0; }
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
`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <DialogProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </DialogProvider>
    </ThemeProvider>
  </StrictMode>
);
