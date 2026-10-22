/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { FaDownload, FaTrash, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { GhostButton, PrimaryButton } from './common.jsx';
import {
  dukungUnduhanMurottal,
  terunduh,
  infoUnduhan,
  unduhSurah,
  hapusUnduhan,
  formatUkuran,
} from '../../data/platform/unduhanMurottal.js';
import { umumkan } from './feedback/umumkan.js';

const Kotak = styled.div`
  border: 1px solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.surface};
  border-radius: ${(p) => p.theme.radii.lg}px;
  padding: 14px 16px;
  margin: 0 0 16px;
`;

const JudulBaris = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Teks = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: ${(p) => p.theme.colors.muted};
`;

const IkonSukses = styled.span`
  color: ${(p) => p.theme.colors.success};
  display: inline-flex;
`;

const Lajur = styled.div`
  height: 8px;
  border-radius: 999px;
  background: ${(p) => p.theme.colors.primarySoft};
  overflow: hidden;
  margin-top: 10px;
`;

const IsiLajur = styled.div`
  height: 100%;
  background: ${(p) => p.theme.colors.primary};
  transition: width 0.2s ease;
`;

/**
 * Kartu unduh audio offline untuk satu surah (di bawah SurahHeader).
 * Hanya dirender di web/PWA (service worker aktif); di native komponen
 * mengembalikan null — unduhan offline native jalur lain.
 */
export default function KartuUnduhSurah({ nomor, namaLatin }) {
  const dukung = dukungUnduhanMurottal();
  const [status, setStatus] = useState('memeriksa'); // memeriksa|belum|mengunduh|sudah|gagal
  const [kemajuan, setKemajuan] = useState(0);
  const [pesanGagal, setPesanGagal] = useState('');
  const pembatalRef = useRef(null);

  useEffect(() => {
    let hidup = true;
    if (!dukung) return undefined;
    terunduh(nomor)
      .then((ada) => {
        if (hidup) setStatus(ada ? 'sudah' : 'belum');
      })
      .catch(() => {
        if (hidup) setStatus('belum');
      });
    return () => {
      hidup = false;
      pembatalRef.current?.abort();
    };
  }, [nomor, dukung]);

  if (!dukung) return null;
  if (status === 'memeriksa') return null;

  const mulai = async () => {
    const kontrol = new AbortController();
    pembatalRef.current = kontrol;
    setStatus('mengunduh');
    setKemajuan(0);
    setPesanGagal('');
    try {
      await unduhSurah(nomor, {
        sinyal: kontrol.signal,
        onKemajuan: (f) => setKemajuan(f),
      });
      setStatus('sudah');
      umumkan(`Audio surah ${namaLatin} tersimpan. Sekarang bisa diputar offline.`);
    } catch (e) {
      if (kontrol.signal.aborted) {
        setStatus('belum');
      } else {
        setStatus('gagal');
        setPesanGagal(e?.message ?? 'Terjadi kesalahan');
      }
    } finally {
      pembatalRef.current = null;
    }
  };

  const hapus = async () => {
    await hapusUnduhan(nomor);
    setStatus('belum');
    umumkan(`Unduhan audio surah ${namaLatin} dihapus.`);
  };

  const info = infoUnduhan(nomor);

  return (
    <Kotak aria-live="polite">
      <JudulBaris>
        {status === 'sudah' ? (
          <>
            <IkonSukses>
              <FaCheckCircle aria-hidden />
            </IkonSukses>
            <strong>Audio tersimpan — bisa diputar offline</strong>
            {info && <span>({formatUkuran(info.ukuran)})</span>}
            <GhostButton onClick={hapus} css={{ marginLeft: 'auto' }}>
              <FaTrash /> Hapus
            </GhostButton>
          </>
        ) : status === 'mengunduh' ? (
          <>
            <FaDownload aria-hidden />
            <strong>Mengunduh audio… {Math.round(kemajuan * 100)}%</strong>
            <GhostButton
              onClick={() => pembatalRef.current?.abort()}
              css={{ marginLeft: 'auto' }}
            >
              <FaTimes /> Batal
            </GhostButton>
          </>
        ) : (
          <>
            <FaDownload aria-hidden />
            <strong>Dengarkan surah ini offline</strong>
            <PrimaryButton onClick={mulai} css={{ marginLeft: 'auto' }}>
              <FaDownload /> Unduh Audio
            </PrimaryButton>
          </>
        )}
      </JudulBaris>
      {status === 'mengunduh' && (
        <Lajur
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(kemajuan * 100)}
        >
          <IsiLajur style={{ width: `${Math.round(kemajuan * 100)}%` }} />
        </Lajur>
      )}
      {status === 'gagal' && (
        <Teks>
          Unduhan gagal: {pesanGagal}. Periksa koneksi internet lalu coba lagi.
        </Teks>
      )}
      <Teks>
        Audio satu berkas per surah dari qari Mishary Al-Afasy (qari bawaan).
        Mode putar per ayat dan qari lain tetap memerlukan internet.
      </Teks>
    </Kotak>
  );
}
