/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

const Bar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.primaryDeep}, ${({ theme }) => theme.colors.primaryDark});
  color: #fff;
  box-shadow: ${({ theme }) => theme.shadows.player};
  padding: 10px 16px calc(12px + env(safe-area-inset-bottom));
`;

const Inner = styled.div`
  max-width: 880px;
  margin: 0 auto;
`;

const InfoBaris = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.goldLight};
  margin-bottom: 6px;
`;

const Track = styled.div`
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  cursor: pointer;
`;

const Fill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.gold}, ${({ theme }) => theme.colors.goldLight});
  width: ${({ persen }) => persen}%;
  transition: width 0.2s linear;
`;

const PenandaAyat = styled.span`
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  transform: translate(-50%, -50%);
  left: ${({ persen }) => persen}%;
`;

const Kontrol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 8px;
`;

const TombolSamping = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  transition: background 0.15s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.22);
  }
  &:disabled {
    opacity: 0.35;
  }
`;

const TombolUtama = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.gold}, ${({ theme }) => theme.colors.goldLight});
  border: none;
  color: ${({ theme }) => theme.colors.primaryDeep};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  transition: transform 0.15s ease;
  &:active {
    transform: scale(0.94);
  }
`;

const fmt = (ms) => {
  const d = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(d / 60)).padStart(2, '0')}:${String(d % 60).padStart(2, '0')}`;
};

/**
 * PlayerBar: kontrol audio Cara 2 — play/pause, prev/next ayat,
 * progress dengan penanda posisi ayat aktif, klik untuk seek.
 */
export default function PlayerBar({
  playing,
  onToggle,
  onPrev,
  onNext,
  posisiMs,
  durasiMs,
  onSeek,
  ayatAktif,
  totalAyat,
  posisiAyatMs,
  namaSurah,
}) {
  const persen = durasiMs > 0 ? Math.min(100, (posisiMs / durasiMs) * 100) : 0;
  const persenAyat =
    durasiMs > 0 && posisiAyatMs != null ? (posisiAyatMs / durasiMs) * 100 : null;

  const klikTrack = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rasio = (e.clientX - r.left) / r.width;
    onSeek(rasio * durasiMs);
  };

  return (
    <Bar>
      <Inner>
        <InfoBaris>
          <span>
            {namaSurah} — Ayat {ayatAktif > 0 ? ayatAktif : '–'} dari {totalAyat}
          </span>
          <span>
            {fmt(posisiMs)} / {fmt(durasiMs)}
          </span>
        </InfoBaris>
        <Track onClick={klikTrack} role="slider" aria-label="Posisi audio">
          <Fill persen={persen} />
          {persenAyat != null && <PenandaAyat persen={persenAyat} />}
        </Track>
        <Kontrol>
          <TombolSamping onClick={onPrev} aria-label="Ayat sebelumnya">
            <FaStepBackward />
          </TombolSamping>
          <TombolUtama onClick={onToggle} aria-label={playing ? 'Jeda' : 'Putar'}>
            {playing ? <FaPause /> : <FaPlay style={{ marginLeft: 3 }} />}
          </TombolUtama>
          <TombolSamping onClick={onNext} aria-label="Ayat berikutnya">
            <FaStepForward />
          </TombolSamping>
        </Kontrol>
      </Inner>
    </Bar>
  );
}
