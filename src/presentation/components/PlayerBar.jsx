/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { GirihPattern, OrnamentBand } from './ornaments/index.js';

const Bar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  /* Efek kaca: latar emerald semi-transparan + blur konten di belakangnya */
  background: linear-gradient(120deg, rgba(4, 37, 31, 0.9), rgba(11, 83, 69, 0.86));
  backdrop-filter: blur(16px) saturate(1.3);
  -webkit-backdrop-filter: blur(16px) saturate(1.3);
  color: #fff;
  box-shadow: ${({ theme }) => theme.shadows.player};
  /* Garis emas di atas player */
  border-top: 1px solid rgba(231, 198, 90, 0.55);
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.goldLight} 30%, ${({ theme }) => theme.colors.gold} 55%, transparent);
    opacity: 0.75;
    pointer-events: none;
  }
`;

const Inner = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 12px 16px calc(13px + env(safe-area-inset-bottom));
`;

const InfoBaris = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.goldLight};
  margin-bottom: 7px;
  font-weight: 600;
  > span:first-of-type {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > span:last-of-type {
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }
`;

// Area sentuh slider 32px (bar visual 10px di tengah) — ramah motorik.
// Slider bisa dioperasikan keyboard: panah ←/→ ∓5 detik, Home/End, PageUp/Down ∓30 detik.
const Track = styled.div`
  position: relative;
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  touch-action: none;
`;

const BarVisual = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
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
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
  left: ${({ persen }) => persen}%;
`;

const Kontrol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 9px;
`;

const TombolSamping = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(231, 198, 90, 0.5);
  color: ${({ theme }) => theme.colors.goldLight};
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  transition: background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:hover {
    background: rgba(231, 198, 90, 0.26);
  }
  &:active {
    transform: scale(0.94);
  }
  &:disabled {
    opacity: 0.35;
  }
`;

const TombolUtama = styled.button`
  background: ${({ theme }) => theme.gradients.gold};
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: ${({ theme }) => theme.colors.primaryDeep};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  box-shadow: 0 2px 6px rgba(201, 162, 39, 0.3), 0 8px 20px rgba(201, 162, 39, 0.5);
  transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: scale(0.93);
  }
`;

const fmt = (ms) => {
  const d = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(d / 60)).padStart(2, '0')}:${String(d % 60).padStart(2, '0')}`;
};

/**
 * PlayerBar: kontrol audio Cara 2 — play/pause, prev/next ayat,
 * progress dengan penanda posisi ayat aktif, klik untuk seek.
 * Mobile-first: tombol jempol 46/60px + pita ornamen emas di atas.
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
    const rasio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    onSeek(rasio * durasiMs);
  };

  // Operasi keyboard penuh untuk slider (WCAG 2.1.1 & pola ARIA slider).
  const tekanTrack = (e) => {
    if (durasiMs <= 0) return;
    const langkahKecil = 5000;
    const langkahBesar = 30000;
    let target = null;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        target = posisiMs - langkahKecil;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        target = posisiMs + langkahKecil;
        break;
      case 'PageDown':
        target = posisiMs - langkahBesar;
        break;
      case 'PageUp':
        target = posisiMs + langkahBesar;
        break;
      case 'Home':
        target = 0;
        break;
      case 'End':
        target = durasiMs;
        break;
      default:
        return;
    }
    e.preventDefault();
    onSeek(Math.min(durasiMs, Math.max(0, target)));
  };

  return (
    <Bar>
      <OrnamentBand height={13} opacity={0.6} />
      <div css={{ position: 'absolute', inset: 0, top: 13, overflow: 'hidden' }} aria-hidden="true">
        <GirihPattern opacity={0.08} />
      </div>
      <Inner>
        <InfoBaris>
          <span>
            {namaSurah} — Ayat {ayatAktif > 0 ? ayatAktif : '–'} dari {totalAyat}
          </span>
          <span>
            {fmt(posisiMs)} / {fmt(durasiMs)}
          </span>
        </InfoBaris>
        <Track
          onClick={klikTrack}
          onKeyDown={tekanTrack}
          tabIndex={0}
          role="slider"
          aria-label="Posisi audio"
          aria-valuemin={0}
          aria-valuemax={Math.round(durasiMs / 1000)}
          aria-valuenow={Math.round(posisiMs / 1000)}
          aria-valuetext={`${fmt(posisiMs)} dari ${fmt(durasiMs)}`}
          aria-orientation="horizontal"
        >
          <BarVisual>
            <Fill persen={persen} />
            {persenAyat != null && <PenandaAyat persen={persenAyat} />}
          </BarVisual>
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
