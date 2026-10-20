/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { FaExclamationTriangle, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import { DialogContext } from './dialogStore.js';
import { fadeIn, fadeInUp, reduceMotion } from '../motion.js';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(4, 37, 31, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  animation: ${fadeIn} 180ms ease-out both;
  ${reduceMotion}
`;

const Kotak = styled.div`
  width: min(420px, 100%);
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  box-shadow: ${({ theme }) => theme.shadows.lift};
  padding: 22px 20px 18px;
  animation: ${fadeInUp} 240ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
  ${reduceMotion}
`;

const Judul = styled.h2`
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 19px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDeep};
  svg {
    flex-shrink: 0;
    color: ${({ bahaya, theme }) => (bahaya ? theme.colors.danger : theme.colors.goldDeep)};
  }
`;

const Pesan = styled.div`
  margin-top: 9px;
  font-size: 14.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const BarisTombol = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  > button {
    flex: 1;
  }
`;

const TombolAman = styled.button`
  min-height: 48px;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 15px;
  font-weight: 700;
  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
  }
  &:active {
    transform: scale(0.98);
  }
`;

const TombolUtama = styled.button`
  min-height: 48px;
  padding: 12px 16px;
  border-radius: 14px;
  border: none;
  background: ${({ bahaya, theme }) =>
    bahaya ? theme.colors.danger : theme.gradients.gold};
  color: ${({ bahaya, theme }) => (bahaya ? '#fff' : theme.colors.primaryDeep)};
  font-size: 15px;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadows.card};
  &:active {
    transform: scale(0.98);
  }
`;

/**
 * DialogProvider — modal alert/confirm kustom bertema Noor.
 * Antrean dialog ditangani berurutan; fokus awal selalu ke tombol yang aman
 * (Batal pada confirm, Tutup pada alert), ESC/backdrop pada confirm = false.
 */
export default function DialogProvider({ children }) {
  const [antre, setAntre] = useState([]);
  const aktif = antre[0] ?? null;
  const fokusAwalRef = useRef(null);
  const elemenSebelumRef = useRef(null);

  const tutupAktif = useCallback((nilai) => {
    setAntre((a) => {
      const [kepala, ...sisa] = a;
      if (kepala) kepala.selesaikan(nilai);
      return sisa;
    });
  }, []);

  const ajukan = useCallback(
    (jenis, opsi) =>
      new Promise((resolve) => {
        setAntre((a) => [...a, { jenis, opsi, selesaikan: resolve }]);
      }),
    [],
  );

  const api = useMemo(
    () => ({
      alert: (opsi) => ajukan('alert', opsi ?? {}).then(() => undefined),
      confirm: (opsi) => ajukan('confirm', opsi ?? {}).then((v) => Boolean(v)),
    }),
    [ajukan],
  );

  // Fokus awal + jebakan fokus sederhana + ESC, setiap dialog aktif berganti.
  useEffect(() => {
    if (!aktif) return undefined;
    elemenSebelumRef.current = document.activeElement;
    const id = setTimeout(() => fokusAwalRef.current?.focus({ preventScroll: true }), 30);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        tutupAktif(aktif.jenis === 'confirm' ? false : undefined);
      }
      if (e.key === 'Tab') {
        const wadah = document.getElementById('noor-dialog');
        if (!wadah) return;
        const fokusable = wadah.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!fokusable.length) return;
        const pertama = fokusable[0];
        const terakhir = fokusable[fokusable.length - 1];
        if (e.shiftKey && document.activeElement === pertama) {
          e.preventDefault();
          terakhir.focus();
        } else if (!e.shiftKey && document.activeElement === terakhir) {
          e.preventDefault();
          pertama.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(id);
      document.removeEventListener('keydown', onKey);
      elemenSebelumRef.current?.focus?.({ preventScroll: true });
    };
  }, [aktif, tutupAktif]);

  const opsi = aktif?.opsi ?? {};
  const judul = opsi.judul ?? (aktif?.jenis === 'confirm' ? 'Konfirmasi' : 'Informasi');
  const teksYa = opsi.teksYa ?? 'Ya';
  const teksTidak = opsi.teksTidak ?? 'Batal';
  const teksTutup = opsi.teksTutup ?? 'Mengerti';
  const bahaya = Boolean(opsi.bahaya);

  return (
    <DialogContext.Provider value={api}>
      {children}
      {aktif && (
        <Overlay
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              tutupAktif(aktif.jenis === 'confirm' ? false : undefined);
            }
          }}
        >
          <Kotak
            id="noor-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="noor-dialog-judul"
            aria-describedby="noor-dialog-pesan"
            bahaya={bahaya}
          >
            <Judul id="noor-dialog-judul" bahaya={bahaya}>
              {bahaya ? (
                <FaExclamationTriangle />
              ) : aktif.jenis === 'confirm' ? (
                <FaQuestionCircle />
              ) : (
                <FaInfoCircle />
              )}
              {judul}
            </Judul>
            {opsi.pesan && <Pesan id="noor-dialog-pesan">{opsi.pesan}</Pesan>}
            <BarisTombol>
              {aktif.jenis === 'confirm' && (
                <TombolAman
                  type="button"
                  ref={fokusAwalRef}
                  onClick={() => tutupAktif(false)}
                >
                  {teksTidak}
                </TombolAman>
              )}
              <TombolUtama
                type="button"
                ref={aktif.jenis === 'alert' ? fokusAwalRef : undefined}
                bahaya={bahaya}
                onClick={() => tutupAktif(aktif.jenis === 'confirm' ? true : undefined)}
              >
                {aktif.jenis === 'confirm' ? teksYa : teksTutup}
              </TombolUtama>
            </BarisTombol>
          </Kotak>
        </Overlay>
      )}
    </DialogContext.Provider>
  );
}
