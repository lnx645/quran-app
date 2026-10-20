/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';

/**
 * PemutarAudio — pemutar satu berkas audio yang reusable (adzan, dsb).
 * Tombol putar/jeda emas 48px, bilah kemajuan yang bisa diketuk untuk
 * melompat, tampilan waktu berjalan/total, tombol berhenti. Berkas gagal
 * dimuat → pesan jujur. Audio dihentikan saat komponen dilepas.
 */

const Kotak = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 14px 16px;
`;

const TombolPutar = styled.button`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.gold};
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-size: 17px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  padding-left: ${({ main }) => (main ? '3px' : '0')};
`;

const Isi = styled.div`
  flex: 1;
  min-width: 0;
  .judul {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .waktu {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
    font-variant-numeric: tabular-nums;
    margin-top: 2px;
  }
  .galat {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.danger};
    margin-top: 2px;
  }
`;

const Rel = styled.button`
  display: block;
  width: 100%;
  height: 22px;
  margin-top: 4px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  .trek {
    position: relative;
    height: 6px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.surfaceAlt};
    overflow: hidden;
  }
  .isi-rel {
    position: absolute;
    inset: 0 auto 0 0;
    background: ${({ theme }) => theme.gradients.gold};
    border-radius: 999px;
  }
`;

const TombolStop = styled.button`
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const formatWaktu = (detik) => {
  if (!Number.isFinite(detik) || detik < 0) return '0:00';
  const m = Math.floor(detik / 60);
  const s = Math.floor(detik % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export default function PemutarAudio({ src, judul }) {
  const audioRef = useRef(null);
  if (audioRef.current === null && typeof Audio !== 'undefined') {
    audioRef.current = new Audio();
  }
  const audio = audioRef.current;
  const [main, setMain] = useState(false);
  const [posisi, setPosisi] = useState(0);
  const [durasi, setDurasi] = useState(0);
  const [galat, setGalat] = useState(false);

  useEffect(() => {
    if (!audio) return undefined;
    const onTime = () => setPosisi(audio.currentTime);
    const onMeta = () => setDurasi(audio.duration || 0);
    const onEnd = () => setMain(false);
    const onErr = () => {
      setGalat(true);
      setMain(false);
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onErr);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onErr);
      audio.pause();
    };
  }, [audio]);

  const alihMain = async () => {
    if (!audio) return;
    if (main) {
      audio.pause();
      setMain(false);
      return;
    }
    try {
      if (!audio.src) audio.src = src;
      setGalat(false);
      await audio.play();
      setMain(true);
    } catch {
      setGalat(true);
      setMain(false);
    }
  };

  const berhenti = () => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setMain(false);
    setPosisi(0);
  };

  const lompat = (e) => {
    if (!audio || !durasi) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rasio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audio.currentTime = rasio * durasi;
    setPosisi(audio.currentTime);
  };

  const persen = durasi > 0 ? Math.min(100, (posisi / durasi) * 100) : 0;

  return (
    <Kotak>
      <TombolPutar
        type="button"
        main={!main}
        onClick={alihMain}
        aria-label={main ? `Jeda: ${judul}` : `Putar: ${judul}`}
      >
        {main ? <FaPause /> : <FaPlay />}
      </TombolPutar>
      <Isi>
        <div className="judul">{judul}</div>
        <Rel
          type="button"
          onClick={lompat}
          aria-label={`Geser posisi putar ${judul}`}
        >
          <span className="trek">
            <span className="isi-rel" style={{ width: `${persen}%` }} />
          </span>
        </Rel>
        {galat ? (
          <div className="galat">Audio gagal dimuat — periksa koneksi internet.</div>
        ) : (
          <div className="waktu">
            {formatWaktu(posisi)} / {formatWaktu(durasi)}
          </div>
        )}
      </Isi>
      <TombolStop type="button" onClick={berhenti} aria-label={`Berhenti: ${judul}`}>
        <FaStop />
      </TombolStop>
    </Kotak>
  );
}
