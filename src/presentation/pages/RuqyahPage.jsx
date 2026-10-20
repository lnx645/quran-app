/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaHandHoldingHeart, FaBookOpen, FaCheckCircle, FaInfoCircle, FaListOl,
  FaPlay, FaPause, FaStop, FaVolumeUp,
} from 'react-icons/fa';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, PrimaryButton, GhostButton,
} from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import {
  PENGERTIAN_RUQYAH, SYARAT_RUQYAH, CARA_RUQYAH, KELOMPOK_RUQYAH,
  CATATAN_RUQYAH, DISCLAIMER_RUQYAH,
} from '../../data/sources/ruqyahData.js';

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 26px;
  line-height: 2;
  direction: rtl;
  text-align: right;
  color: ${({ theme }) => theme.colors.teksArab};
`;

const Paragraf = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

const KartuJudul = styled(Card)`
  .nama {
    font-size: 15px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 5px;
    display: flex;
    gap: 8px;
    svg {
      color: ${({ theme }) => theme.colors.goldDeep};
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
  .isi {
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const LencanaRef = styled.span`
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
  border-radius: ${({ theme }) => theme.radii.pill}px;
  padding: 4px 10px;
  margin-bottom: 10px;
`;

const TombolPutarKelompok = styled(GhostButton)`
  min-height: 44px;
  margin-top: 12px;
`;

export default function RuqyahPage() {
  // — Playlist audio ayat ruqyah (pola pemutar berurutan DzikirPage) —
  // Antrean diratakan per ayat dari KELOMPOK_RUQYAH: audio PER-AYAT
  // diambil dari Quran.com API v4 lewat QuranRepositoryImpl.getAudioAyatUrl
  // (qari Al-Afasy), lalu diputar berurutan: ayat selesai → ayat berikutnya,
  // kelompok selesai → kelompok berikutnya, sampai An-Naas ayat 6.
  const antrean = useMemo(
    () =>
      KELOMPOK_RUQYAH.flatMap((k, kelompokIdx) => {
        const perAyat = [];
        for (let a = k.dari; a <= k.sampai; a += 1) {
          perAyat.push({ kelompokIdx, surah: k.surah, ayat: a, label: k.label });
        }
        return perAyat;
      }),
    []
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

  // Halaman ditutup → hentikan putaran.
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

  const putarDariKelompok = (kelompokIdx) => {
    const awal = antrean.findIndex((a) => a.kelompokIdx === kelompokIdx);
    if (awal < 0) return;
    setAudioGagal(false);
    setJeda(false);
    setPosisi(awal);
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

  return (
    <Page>
      <PageHero>
        <h2>
          <FaHandHoldingHeart /> Ruqyah Syar&rsquo;iyyah
        </h2>
        <p>
          Panduan ringkas ruqyah yang sesuai sunnah — pengertian, syarat, dan cara
          melakukannya — disertai playlist audio ayat-ayat ruqyah yang diputar berurutan.
        </p>
      </PageHero>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_RUQYAH}</span>
        </Catatan>
      </Card>

      <SectionTitle>
        <FaBookOpen /> {PENGERTIAN_RUQYAH.judul}
      </SectionTitle>
      <Card>
        <Paragraf>{PENGERTIAN_RUQYAH.isi}</Paragraf>
      </Card>

      <SectionTitle>
        <FaCheckCircle /> Syarat Ruqyah Syar&rsquo;i
      </SectionTitle>
      {SYARAT_RUQYAH.map((s) => (
        <KartuJudul key={s.judul}>
          <div className="nama">
            <FaCheckCircle aria-hidden="true" /> {s.judul}
          </div>
          <p className="isi">{s.isi}</p>
        </KartuJudul>
      ))}

      <SectionTitle>
        <FaListOl /> Cara Melakukan Ruqyah
      </SectionTitle>
      {CARA_RUQYAH.map((c, i) => (
        <Card key={c.judul} css={{ display: 'flex', gap: 12 }}>
          <NomorMedali nomor={i + 1} ukuran={30} />
          <div>
            <p css={(t) => ({ fontSize: 15, fontWeight: 800, color: t.colors.primary, marginBottom: 4 })}>
              {c.judul}
            </p>
            <p css={{ fontSize: 14, lineHeight: 1.7 }}>{c.isi}</p>
          </div>
        </Card>
      ))}

      <SectionTitle>
        <FaVolumeUp /> Playlist Ayat Ruqyah
      </SectionTitle>
      <Card aria-label="Putar berurutan ayat ruqyah">
        <p css={(t) => ({ fontWeight: 800, fontSize: 15.5, color: t.colors.judul, marginBottom: 6 })}>
          <FaVolumeUp css={(t) => ({ color: t.colors.goldDeep, marginRight: 8 })} aria-hidden="true" />
          Putar Berurutan — Ayat Ruqyah
        </p>
        <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, lineHeight: 1.6, marginBottom: 14 })}>
          {KELOMPOK_RUQYAH.length} kelompok ayat ({antrean.length} ayat) diputar per ayat secara
          berurutan dari rekaman Al-Afasy via Quran.com: Al-Fatihah, Ayat Kursi, penutup
          Al-Baqarah, Al-Ikhlas, Al-Falaq, dan An-Naas. Dengarkan dengan tenang, resapi
          maknanya, lalu tiupkan ke telapak tangan dan usapkan — atau bacakan langsung dari
          teks di bawah.
        </p>
        {ayatAktif && (
          <p aria-live="polite" css={(t) => ({ fontSize: 14, fontWeight: 700, color: t.colors.primary, marginBottom: 12 })}>
            {memuatAudio ? 'Memuat audio… ' : jeda ? 'Jeda: ' : 'Sedang diputar: '}
            {ayatAktif.label} — ayat {ayatAktif.ayat}
          </p>
        )}
        {!ayatAktif && (
          <p aria-live="polite" css={(t) => ({ fontSize: 13.5, color: t.colors.muted, marginBottom: 12 })}>
            Playlist belum diputar.
          </p>
        )}
        {audioGagal && (
          <p role="alert" css={(t) => ({ fontSize: 13.5, color: t.colors.danger, marginBottom: 12 })}>
            Audio ayat gagal dimuat (periksa koneksi internet), putaran dihentikan.
          </p>
        )}
        <div css={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {posisi < 0 ? (
            <PrimaryButton onClick={mulaiPutar} disabled={antrean.length === 0} aria-label="Putar berurutan seluruh playlist ayat ruqyah">
              <FaPlay /> Putar Playlist
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

      {KELOMPOK_RUQYAH.map((k, i) => {
        const sedangDiputar = ayatAktif?.kelompokIdx === i;
        return (
          <Card
            key={k.id}
            css={(t) => ({
              borderColor: sedangDiputar ? t.colors.gold : undefined,
              borderWidth: sedangDiputar ? 2 : undefined,
            })}
          >
            <LencanaRef>
              <FaVolumeUp aria-hidden="true" /> {k.referensi}
            </LencanaRef>
            <p css={(t) => ({ fontSize: 16, fontWeight: 800, color: t.colors.judul, marginBottom: 8 })}>
              {k.judul}
              {sedangDiputar ? ' — sedang diputar' : ''}
            </p>
            <Arab lang="ar">{k.arab}</Arab>
            <p css={{ fontSize: 14, lineHeight: 1.7, marginTop: 8 }}>{k.artiRingkas}</p>
            <TombolPutarKelompok
              onClick={() => putarDariKelompok(i)}
              aria-label={`Putar playlist mulai dari ${k.judul}`}
            >
              <FaPlay aria-hidden="true" /> Putar dari sini
            </TombolPutarKelompok>
          </Card>
        );
      })}

      <GoldCard>
        <Catatan>
          <FaInfoCircle /> <span>{CATATAN_RUQYAH}</span>
        </Catatan>
      </GoldCard>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_RUQYAH}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
