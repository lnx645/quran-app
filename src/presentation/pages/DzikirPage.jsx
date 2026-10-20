/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaSun, FaMoon, FaPlusCircle, FaRedoAlt, FaPlay, FaPause, FaStop, FaVolumeUp,
} from 'react-icons/fa';
import { DZIKIR_PAGI, DZIKIR_PETANG } from '../../data/sources/dzikirData.js';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';
import {
  Page, PageTitle, PageSubtitle, Card, GhostButton, PrimaryButton,
} from '../components/common.jsx';
import OrnamentDivider from '../components/OrnamentDivider.jsx';
import { catatAktivitasGlobal } from '../hooks/useStreak.js';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';

const KartuDzikir = styled(Card)`
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 28px;
    line-height: 2;
    text-align: right;
    direction: rtl;
  }
  .latin {
    font-style: italic;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 8px;
  }
  .arti {
    font-size: 14.5px;
    margin-top: 4px;
  }
`;

const BarisHitung = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
`;

const TombolTap = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme, selesai }) =>
    selesai ? theme.colors.emeraldPanel : theme.colors.primarySoft};
  color: ${({ theme, selesai }) =>
    selesai ? '#fff' : theme.colors.judul};
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 700;
  font-size: 15px;
  transition: background 0.2s ease;
`;

const LencanaAyat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  background: ${({ theme }) => theme.colors.goldSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 4px 10px;
  margin-bottom: 10px;
`;

export default function DzikirPage() {
  const [mode, setMode] = useState('pagi'); // pagi | petang
  const [hitung, setHitung] = useState({});
  const daftar = mode === 'pagi' ? DZIKIR_PAGI : DZIKIR_PETANG;

  // — Pemutar berurutan untuk bacaan berupa AYAT Qur'an —
  // Antrean diratakan per ayat: tiap item berfield `ayat` di data dzikir
  // diuraikan menjadi ayat-ayatnya. Audio PER-AYAT diambil dari Quran.com
  // API v4 (verses/by_key → audio.url, qari Al-Afasy) lewat repository,
  // lalu diputar berurutan: ayat selesai → lanjut ayat berikutnya.
  // Item doa non-ayat tidak masuk antrean dan tidak dipaksa beraudio.
  const antrean = useMemo(
    () =>
      daftar.flatMap((d, itemIdx) => {
        if (!d.ayat) return [];
        const perAyat = [];
        for (let a = d.ayat.dari; a <= d.ayat.sampai; a += 1) {
          perAyat.push({ itemIdx, surah: d.ayat.surah, ayat: a, label: d.ayat.label });
        }
        return perAyat;
      }),
    [daftar]
  );
  const [posisi, setPosisi] = useState(-1); // indeks antrean; -1 = berhenti
  const [jeda, setJeda] = useState(false);
  const [memuatAudio, setMemuatAudio] = useState(false);
  const [audioGagal, setAudioGagal] = useState(false);
  const audioRef = useRef(null);
  if (audioRef.current === null && typeof Audio !== 'undefined') {
    audioRef.current = new Audio();
  }
  const audio = audioRef.current;
  const ayatAktif = posisi >= 0 ? antrean[posisi] : null;

  const berhenti = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
    }
    setPosisi(-1);
    setJeda(false);
    setMemuatAudio(false);
  }, [audio]);

  // Muat & putar ayat pada posisi saat ini; posisi di luar antrean = selesai.
  useEffect(() => {
    if (posisi < 0) return undefined;
    const target = antrean[posisi];
    if (!target || !audio) {
      setPosisi(-1);
      return undefined;
    }
    let batal = false;
    setMemuatAudio(true);
    setAudioGagal(false);
    QuranRepositoryImpl.getAudioAyatUrl(target.surah, target.ayat)
      .then((url) => {
        if (batal) return;
        if (!url) throw new Error('audio ayat kosong');
        audio.src = url;
        return audio.play();
      })
      .catch(() => {
        if (!batal) {
          setAudioGagal(true);
          setPosisi(-1);
        }
      })
      .finally(() => {
        if (!batal) setMemuatAudio(false);
      });
    return () => {
      batal = true;
    };
  }, [posisi, antrean, audio]);

  // Ayat selesai → lanjut ke ayat berikutnya (atau berhenti di ujung).
  useEffect(() => {
    if (!audio) return undefined;
    const onEnded = () => setPosisi((p) => (p >= 0 ? p + 1 : p));
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [audio]);

  // Ganti mode / halaman ditutup → hentikan putaran.
  useEffect(() => berhenti, [mode, berhenti]);
  useEffect(
    () => () => {
      if (audio) audio.pause();
    },
    [audio]
  );

  const mulaiPutar = () => {
    setAudioGagal(false);
    setJeda(false);
    setPosisi(0);
  };

  const toggleJeda = () => {
    if (!audio || posisi < 0) return;
    if (jeda) {
      audio.play().catch(() => {});
      setJeda(false);
    } else {
      audio.pause();
      setJeda(true);
    }
  };

  const tap = (idx) =>
    setHitung((lama) => ({ ...lama, [idx]: (lama[idx] ?? 0) + 1 }));

  const resetMode = () => setHitung({});

  const selesaiSemua = useMemo(
    () => daftar.every((d, i) => (hitung[i] ?? 0) >= d.hitung),
    [daftar, hitung]
  );

  // Streak ibadah: dzikir tuntas (semua bacaan mencapai hitungan anjuran)
  // dicatat sekali per sesi halaman; dedupe per hari di domain menahan
  // catatan ganda bila mode pagi & petang sama-sama dituntaskan.
  const dzikirTercatatRef = useRef(false);
  useEffect(() => {
    if (selesaiSemua && !dzikirTercatatRef.current) {
      dzikirTercatatRef.current = true;
      catatAktivitasGlobal('dzikir');
    }
  }, [selesaiSemua]);

  return (
    <Page>
      <PageTitle>Dzikir {mode === 'pagi' ? 'Pagi' : 'Petang'}</PageTitle>
      <PageSubtitle>
        Ringkasan Al-Ma&apos;tsurat. Ketuk tombol di tiap dzikir sesuai jumlah anjuran.
      </PageSubtitle>
      <SegmenWadah role="tablist" aria-label="Waktu dzikir">
        <SegmenTab aktif={mode === 'pagi'} onClick={() => setMode('pagi')}>
          <FaSun /> Pagi
        </SegmenTab>
        <SegmenTab aktif={mode === 'petang'} onClick={() => setMode('petang')}>
          <FaMoon /> Petang
        </SegmenTab>
      </SegmenWadah>

      <Card aria-label="Putar berurutan bacaan ayat">
        <p css={(t) => ({ fontWeight: 800, fontSize: 15.5, color: t.colors.judul, marginBottom: 6 })}>
          <FaVolumeUp css={(t) => ({ color: t.colors.goldDeep, marginRight: 8 })} aria-hidden="true" />
          Putar Berurutan — Bacaan Ayat
        </p>
        <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, lineHeight: 1.6, marginBottom: 14 })}>
          Audio tersedia untuk bacaan berupa ayat Qur&apos;an (Ayat Kursi, Al-Ikhlas, Al-Falaq,
          An-Naas): diputar per ayat secara berurutan, satu kali per bacaan, dari rekaman
          Al-Afasy via Quran.com. Bacaan doa selain ayat belum beraudio.
        </p>
        {ayatAktif && (
          <p aria-live="polite" css={(t) => ({ fontSize: 14, fontWeight: 700, color: t.colors.primary, marginBottom: 12 })}>
            {memuatAudio ? 'Memuat audio… ' : jeda ? 'Jeda: ' : 'Sedang diputar: '}
            {ayatAktif.label} — ayat {ayatAktif.ayat}
          </p>
        )}
        {audioGagal && (
          <p role="alert" css={(t) => ({ fontSize: 13.5, color: t.colors.danger, marginBottom: 12 })}>
            Audio ayat gagal dimuat (periksa koneksi internet), putaran dihentikan.
          </p>
        )}
        <div css={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {posisi < 0 ? (
            <PrimaryButton onClick={mulaiPutar} disabled={antrean.length === 0} aria-label="Putar berurutan bacaan ayat dzikir">
              <FaPlay /> Putar Berurutan
            </PrimaryButton>
          ) : (
            <>
              <PrimaryButton onClick={toggleJeda} aria-label={jeda ? 'Lanjutkan putaran audio' : 'Jeda putaran audio'}>
                {jeda ? <FaPlay /> : <FaPause />} {jeda ? 'Lanjut' : 'Jeda'}
              </PrimaryButton>
              <GhostButton onClick={berhenti} aria-label="Berhenti memutar audio">
                <FaStop /> Berhenti
              </GhostButton>
            </>
          )}
        </div>
      </Card>

      {selesaiSemua && (
        <Card css={{ textAlign: 'center', fontWeight: 700 }}>
          Barakallah, dzikir {mode} selesai!
        </Card>
      )}

      {daftar.map((d, i) => {
        const n = hitung[i] ?? 0;
        const selesai = n >= d.hitung;
        const sedangDiputar = ayatAktif?.itemIdx === i;
        return (
          <KartuDzikir
            key={i}
            css={(t) => ({
              borderColor: sedangDiputar || selesai ? t.colors.gold : undefined,
              borderWidth: sedangDiputar ? 2 : undefined,
            })}
          >
            {d.ayat && (
              <LencanaAyat>
                <FaVolumeUp aria-hidden="true" /> Bacaan ayat · ada audio — {d.ayat.label}
              </LencanaAyat>
            )}
            <p className="arab" lang="ar">{d.arab}</p>
            <p className="latin">{d.latin}</p>
            <p className="arti">{d.arti}</p>
            <BarisHitung>
              <span css={(t) => ({ fontSize: 13.5, color: t.colors.muted })}>
                {n} / {d.hitung} kali
              </span>
              <TombolTap selesai={selesai} onClick={() => tap(i)}>
                <FaPlusCircle /> {selesai ? 'Lagi' : 'Hitung'}
              </TombolTap>
            </BarisHitung>
          </KartuDzikir>
        );
      })}

      <OrnamentDivider />
      <div css={{ display: 'flex', justifyContent: 'center' }}>
        <GhostButton onClick={resetMode}>
          <FaRedoAlt /> Reset {mode === 'pagi' ? 'Pagi' : 'Petang'}
        </GhostButton>
      </div>
    </Page>
  );
}
