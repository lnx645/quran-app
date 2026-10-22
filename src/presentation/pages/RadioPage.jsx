/** @jsxImportSource @emotion/react */
import { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import {
  FaBroadcastTower,
  FaListOl,
  FaRandom,
  FaBookOpen,
  FaPlay,
  FaPause,
  FaStop,
  FaStepForward,
  FaMoon,
  FaRedoAlt,
  FaExclamationTriangle,
} from 'react-icons/fa';
import {
  Page,
  PageHero,
  GoldCard,
  SectionTitle,
  PrimaryButton,
  GhostButton,
  Field,
  SelectInput,
  ErrorBox,
  LoadingBox,
  Spinner,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab, SegmenKompakWadah, SegmenKompak } from '../components/SegmentedControl.jsx';
import StateKosong from '../components/StateKosong.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import { useChapters } from '../hooks/useChapters.js';
import { useQari } from '../hooks/useQari.js';
import { useRadioPlayer, MODE_RADIO } from '../hooks/useRadioPlayer.js';
import { DAFTAR_QARI } from '../../data/quranApi.js';

/**
 * Radio Murottal (/radio) — putar murottal per bab tanpa henti:
 * mode Berurutan (1→114), Acak, atau Juz 'Amma (78–114), qari mengikuti
 * pilihan global (useQari — sama dengan halaman Surah), ayat berjalan
 * dari timestamps API, sleep timer dengan fade-out, dan Media Session.
 * Mesin putarnya ada di useRadioPlayer (elemen Audio tunggal).
 */

const IKON_MODE = {
  berurutan: <FaListOl />,
  acak: <FaRandom />,
  juzamma: <FaBookOpen />,
};

const OPSI_TIDUR = [
  { menit: 0, label: 'Mati' },
  { menit: 15, label: '15 mnt' },
  { menit: 30, label: '30 mnt' },
  { menit: 45, label: '45 mnt' },
  { menit: 60, label: '60 mnt' },
];

const KartuPutar = styled(GoldCard)`
  text-align: center;
  padding-top: 22px;
  padding-bottom: 22px;
`;

const NamaArabBesar = styled.div`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 40px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.judul};
`;

const NamaLatinBesar = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.judul};
  margin-top: 2px;
`;

const MetaPutar = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 4px;
  .ayat {
    display: block;
    margin-top: 8px;
    font-size: 15px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
  }
  .catatan {
    display: block;
    margin-top: 6px;
    font-size: 12px;
  }
  .waktu {
    display: block;
    margin-top: 6px;
    font-variant-numeric: tabular-nums;
    font-size: 12.5px;
  }
`;

const BarisKontrol = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const TombolUtama = styled(PrimaryButton)`
  min-width: 168px;
  min-height: 56px;
  font-size: 16.5px;
`;

const BarisGalat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const SisaTidur = styled.p`
  text-align: center;
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-variant-numeric: tabular-nums;
  margin: -6px 0 14px;
`;

const DaftarBab = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BarisBab = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 60px;
  text-align: left;
  padding: 9px 14px 9px 10px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border: 1.5px solid ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, aktif }) => (aktif ? theme.colors.goldSoft : theme.colors.surface)};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: scale(0.99);
  }
  .tengah {
    flex: 1;
    min-width: 0;
  }
  .latin {
    display: block;
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .meta {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 22px;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }
  .indikator {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
`;

const formatWaktu = (detik) => {
  if (!Number.isFinite(detik) || detik < 0) return '0:00';
  const m = Math.floor(detik / 60);
  const s = Math.floor(detik % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

const formatSisaTidur = (detik) => {
  const m = Math.floor(detik / 60);
  const s = detik % 60;
  return m > 0 ? `${m} menit ${String(s).padStart(2, '0')} detik` : `${s} detik`;
};

export default function RadioPage() {
  const { loading, error, chapters } = useChapters();
  const { qari, ubahQari } = useQari();
  const radio = useRadioPlayer(qari);

  const qariAktif = useMemo(
    () => DAFTAR_QARI.find((q) => q.id === qari) ?? DAFTAR_QARI[0],
    [qari],
  );
  const babAktif = useMemo(
    () => chapters.find((c) => c.id === radio.babId) ?? null,
    [chapters, radio.babId],
  );

  // Media Session: metadata bab berjalan (handler dipasang useRadioPlayer).
  useEffect(() => {
    try {
      if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
      if (!babAktif) return;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `Radio Murottal — ${babAktif.nameLatin}`,
        artist: qariAktif?.nama ?? '',
        album: 'NurQalam',
      });
    } catch {
      /* Media Session tidak tersedia/parsial — abaikan */
    }
  }, [babAktif, qariAktif]);

  const sedangMain = radio.status === 'main';
  const sedangMuat = radio.status === 'memuat';

  return (
    <Page>
      <PageHero>
        <h2>
          <FaBroadcastTower /> Radio Murottal
        </h2>
        <p>
          Dengarkan murottal Al-Qur&rsquo;an per surah tanpa henti — berurutan, acak, atau
          khusus Juz &rsquo;Amma — dengan ayat berjalan dan pengatur waktu tidur.
        </p>
      </PageHero>

      <SectionTitle>Mode Putar</SectionTitle>
      <SegmenWadah role="tablist" aria-label="Mode putar radio">
        {MODE_RADIO.map((m) => (
          <SegmenTab
            key={m.id}
            aktif={radio.mode === m.id}
            onClick={() => radio.setMode(m.id)}
          >
            {IKON_MODE[m.id]}
            {m.label}
          </SegmenTab>
        ))}
      </SegmenWadah>

      <Field>
        <label htmlFor="radio-qari">Qari (mengikuti pilihan di halaman Surah)</label>
        <SelectInput
          id="radio-qari"
          value={qari}
          onChange={(e) => ubahQari(e.target.value)}
          aria-label="Pilih qari murottal"
        >
          {DAFTAR_QARI.map((q) => (
            <option key={q.id} value={q.id}>
              {q.gaya ? `${q.nama} (${q.gaya})` : q.nama}
            </option>
          ))}
        </SelectInput>
      </Field>

      {radio.status === 'galat' && (
        <BarisGalat>
          <ErrorBox role="alert">
            <FaExclamationTriangle aria-hidden="true" />
            <span>{radio.pesanGalat || 'Audio gagal dimuat — periksa koneksi internet.'}</span>
          </ErrorBox>
          <BarisKontrol css={{ marginTop: 0, justifyContent: 'flex-start' }}>
            <PrimaryButton type="button" onClick={radio.cobaLagi}>
              <FaRedoAlt /> Coba Lagi
            </PrimaryButton>
            <GhostButton type="button" onClick={radio.lewati}>
              <FaStepForward /> Lewati Bab Ini
            </GhostButton>
          </BarisKontrol>
        </BarisGalat>
      )}

      <KartuPutar aria-live="polite">
        {babAktif ? (
          <>
            <NamaArabBesar lang="ar" dir="rtl">
              {babAktif.nameArabic}
            </NamaArabBesar>
            <NamaLatinBesar>
              {babAktif.id}. {babAktif.nameLatin}
            </NamaLatinBesar>
            <MetaPutar>
              {babAktif.translationId} • {babAktif.versesCount} ayat • Qari {qariAktif?.nama}
              {radio.ayatBerjalan ? (
                <span className="ayat">
                  Ayat {radio.ayatBerjalan.nomor} dari {radio.ayatBerjalan.total}
                </span>
              ) : radio.babId ? (
                <span className="catatan">
                  Ayat berjalan tidak tersedia untuk qari ini — audio tetap diputar utuh per
                  surah.
                </span>
              ) : null}
              <span className="waktu">
                {sedangMuat
                  ? 'Memuat audio…'
                  : `${formatWaktu(radio.posisi)} / ${formatWaktu(radio.durasi)}`}
              </span>
            </MetaPutar>
          </>
        ) : (
          <>
            <NamaLatinBesar>Belum ada surah diputar</NamaLatinBesar>
            <MetaPutar>
              Qari {qariAktif?.nama}. Tekan tombol Putar untuk mulai dari mode{' '}
              {MODE_RADIO.find((m) => m.id === radio.mode)?.label}, atau pilih surah langsung
              dari daftar di bawah.
            </MetaPutar>
          </>
        )}
        <BarisKontrol>
          <GhostButton
            type="button"
            onClick={radio.berhenti}
            disabled={!radio.babId || radio.status === 'idle'}
            aria-label="Berhenti dan ulangi dari awal"
          >
            <FaStop /> Berhenti
          </GhostButton>
          <TombolUtama
            type="button"
            onClick={radio.alihPutar}
            disabled={sedangMuat}
            aria-label={sedangMain ? 'Jeda' : 'Putar'}
          >
            {sedangMuat ? (
              'Memuat…'
            ) : sedangMain ? (
              <>
                <FaPause /> Jeda
              </>
            ) : (
              <>
                <FaPlay /> Putar
              </>
            )}
          </TombolUtama>
          <GhostButton
            type="button"
            onClick={radio.lewati}
            aria-label="Lewati ke surah berikutnya sesuai mode"
          >
            <FaStepForward /> Lewati
          </GhostButton>
        </BarisKontrol>
      </KartuPutar>

      <SectionTitle>
        <FaMoon /> Pengatur Waktu Tidur
      </SectionTitle>
      <SegmenKompakWadah role="tablist" aria-label="Pengatur waktu tidur" css={{ marginBottom: 16 }}>
        {OPSI_TIDUR.map((o) => (
          <SegmenKompak
            key={o.menit}
            role="tab"
            aria-selected={radio.tidurMenit === o.menit}
            aktif={radio.tidurMenit === o.menit}
            onClick={() => radio.aturTidur(o.menit)}
          >
            {o.label}
          </SegmenKompak>
        ))}
      </SegmenKompakWadah>
      {radio.tidurSisa !== null && (
        <SisaTidur aria-live="polite">
          Radio akan berhenti dalam {formatSisaTidur(radio.tidurSisa)}.
        </SisaTidur>
      )}

      <SectionTitle>Pilih Surah</SectionTitle>
      {loading ? (
        <LoadingBox>
          <Spinner />
          Memuat daftar surah…
        </LoadingBox>
      ) : error ? (
        <ErrorBox role="alert">
          <FaExclamationTriangle aria-hidden="true" />
          <span>Daftar surah gagal dimuat — periksa koneksi internet lalu buka ulang halaman ini.</span>
        </ErrorBox>
      ) : chapters.length === 0 ? (
        <StateKosong
          ikon={<FaBroadcastTower />}
          judul="Daftar surah kosong"
          deskripsi="Daftar surah tidak tersedia saat ini. Periksa koneksi internet lalu coba lagi."
        />
      ) : (
        <DaftarBab>
          {chapters.map((c) => {
            const aktif = c.id === radio.babId;
            return (
              <BarisBab
                key={c.id}
                type="button"
                aktif={aktif}
                onClick={() => radio.putarBab(c.id)}
                aria-label={`Putar surah ${c.id}. ${c.nameLatin}, ${c.versesCount} ayat`}
                aria-pressed={aktif}
              >
                <NomorMedali nomor={c.id} ukuran={44} />
                <span className="tengah">
                  <span className="latin">{c.nameLatin}</span>
                  <span className="meta">
                    {c.translationId} • {c.versesCount} ayat
                  </span>
                </span>
                {aktif && (
                  <span className="indikator">
                    {sedangMain ? <FaPause /> : <FaPlay />}
                    {sedangMuat ? 'Memuat' : sedangMain ? 'Diputar' : 'Terpilih'}
                  </span>
                )}
                <span className="arab" lang="ar" dir="rtl">
                  {c.nameArabic}
                </span>
              </BarisBab>
            );
          })}
        </DaftarBab>
      )}
    </Page>
  );
}
