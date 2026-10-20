/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes,
} from 'react-icons/fa';
import { ToastContext } from './toastStore.js';
import { fadeInUp, reduceMotion } from '../motion.js';

const Wadah = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(236px + env(safe-area-inset-bottom));
  z-index: 200;
  width: min(520px, 94vw);
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
`;

const Kotak = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 10px 8px 10px 14px;
  border-radius: 14px;
  border: 1.5px solid
    ${({ theme, jenis }) =>
      jenis === 'error'
        ? theme.colors.danger
        : jenis === 'peringatan'
        ? theme.colors.gold
        : theme.colors.primaryMid};
  background: ${({ theme }) => theme.colors.primaryDeep};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;
  box-shadow: ${({ theme }) => theme.shadows.lift};
  animation: ${fadeInUp} 240ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
  .ikon {
    flex-shrink: 0;
    font-size: 19px;
    color: ${({ theme, jenis }) =>
      jenis === 'error'
        ? '#FCA5A5'
        : jenis === 'peringatan'
        ? theme.colors.goldLight
        : jenis === 'sukses'
        ? '#86EFAC'
        : '#BAE6FD'};
  }
  ${reduceMotion}
`;

const Tutup = styled.button`
  margin-left: auto;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const IKON = {
  sukses: <FaCheckCircle />,
  error: <FaExclamationCircle />,
  info: <FaInfoCircle />,
  peringatan: <FaExclamationTriangle />,
};

const DURASI = { sukses: 4000, info: 4500, peringatan: 5500, error: 6500 };

/**
 * ToastProvider — tumpukan toast kustom bertema Noor.
 * Posisi: melayang di bawah tengah layar, di atas PlayerBar & bar kontrol baca.
 */
export default function ToastProvider({ children }) {
  const [daftar, setDaftar] = useState([]);
  const idRef = useRef(0);
  const timerRef = useRef(new Map());

  const tutup = useCallback((id) => {
    setDaftar((d) => d.filter((t) => t.id !== id));
    const timer = timerRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timerRef.current.delete(id);
    }
  }, []);

  const tampilkan = useCallback(
    (jenis, pesan, durasi) => {
      const id = ++idRef.current;
      setDaftar((d) => [...d.slice(-2), { id, jenis, pesan }]);
      const timer = setTimeout(() => tutup(id), durasi ?? DURASI[jenis] ?? 4500);
      timerRef.current.set(id, timer);
      return id;
    },
    [tutup],
  );

  const api = useMemo(
    () => ({
      sukses: (pesan, durasi) => tampilkan('sukses', pesan, durasi),
      error: (pesan, durasi) => tampilkan('error', pesan, durasi),
      info: (pesan, durasi) => tampilkan('info', pesan, durasi),
      peringatan: (pesan, durasi) => tampilkan('peringatan', pesan, durasi),
      tutup,
    }),
    [tampilkan, tutup],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Wadah>
        {daftar.map((t) => (
          <Kotak
            key={t.id}
            jenis={t.jenis}
            role={t.jenis === 'error' ? 'alert' : 'status'}
          >
            <span className="ikon" aria-hidden="true">
              {IKON[t.jenis]}
            </span>
            <span css={{ flex: 1 }}>{t.pesan}</span>
            <Tutup type="button" onClick={() => tutup(t.id)} aria-label="Tutup pemberitahuan">
              <FaTimes />
            </Tutup>
          </Kotak>
        ))}
      </Wadah>
    </ToastContext.Provider>
  );
}
