/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaQuestionCircle, FaPlay, FaCheck, FaTimes, FaRedoAlt, FaTrophy, FaListUl,
} from 'react-icons/fa';
import { MODE_KUIS } from '../../data/sources/kuisData.js';
import {
  Page, PageTitle, PageSubtitle, Card, PrimaryButton, GhostButton, SectionTitle,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import StateKosong from '../components/StateKosong.jsx';

const KUNCI_SKOR = 'noor.kuis.v1';
const JUMLAH_SOAL = 10;

function bacaTerbaik() {
  try {
    const mentah = localStorage.getItem(KUNCI_SKOR);
    const data = mentah ? JSON.parse(mentah) : {};
    return { sambung: data.sambung ?? null, tebak: data.tebak ?? null, tajwid: data.tajwid ?? null };
  } catch {
    return { sambung: null, tebak: null, tajwid: null };
  }
}

function simpanTerbaik(terbaik) {
  try {
    localStorage.setItem(KUNCI_SKOR, JSON.stringify(terbaik));
  } catch {
    /* penyimpanan tidak tersedia — kuis tetap jalan */
  }
}

const acak = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Bangun satu sesi: 10 soal acak, opsi tiap soal ikut diacak.
function buatSesi(mode) {
  const bank = MODE_KUIS.find((m) => m.kunci === mode)?.soal ?? [];
  return acak(bank)
    .slice(0, JUMLAH_SOAL)
    .map((s) => {
      const urutan = acak(s.opsi.map((_, i) => i));
      return {
        teks: s.teks,
        tanya: s.tanya,
        ref: s.ref,
        opsi: urutan.map((i) => s.opsi[i]),
        benar: urutan.indexOf(s.benar),
      };
    });
}

const TombolOpsi = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 52px;
  padding: 13px 16px;
  margin-bottom: 10px;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  border-radius: 14px;
  border: 1.5px solid
    ${({ theme, keadaan }) =>
      keadaan === 'benar'
        ? theme.colors.success
        : keadaan === 'salah'
        ? theme.colors.danger
        : theme.colors.border};
  background: ${({ theme, keadaan }) =>
    keadaan === 'benar'
      ? theme.colors.primarySoft
      : keadaan === 'salah'
      ? theme.colors.dangerSoft
      : theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  &:disabled {
    cursor: default;
  }
  .ikon {
    flex-shrink: 0;
    display: inline-flex;
  }
`;

const TeksSoal = styled.p`
  font-size: 17px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.judul};
  margin-bottom: 6px;
`;

const InfoKecil = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.55;
`;

export default function KuisPage() {
  const [mode, setMode] = useState('sambung');
  const [fase, setFase] = useState('pilih'); // pilih | main | selesai
  const [sesi, setSesi] = useState([]);
  const [idx, setIdx] = useState(0);
  const [dipilih, setDipilih] = useState(null);
  const [skor, setSkor] = useState(0);
  const [terbaik, setTerbaik] = useState(bacaTerbaik);

  const modeAktif = useMemo(() => MODE_KUIS.find((m) => m.kunci === mode), [mode]);
  const soal = sesi[idx];

  const mulai = (modeBaru = mode) => {
    setSesi(buatSesi(modeBaru));
    setIdx(0);
    setDipilih(null);
    setSkor(0);
    setFase('main');
  };

  const gantiMode = (kunci) => {
    setMode(kunci);
    setFase('pilih');
    setDipilih(null);
  };

  const jawab = (i) => {
    if (dipilih !== null || !soal) return;
    setDipilih(i);
    if (i === soal.benar) setSkor((s) => s + 1);
  };

  const lanjut = () => {
    if (idx + 1 < sesi.length) {
      setIdx(idx + 1);
      setDipilih(null);
      return;
    }
    setFase('selesai');
    setTerbaik((lama) => {
      const baru = { ...lama };
      if (baru[mode] === null || skor > baru[mode]) baru[mode] = skor;
      simpanTerbaik(baru);
      return baru;
    });
  };

  return (
    <Page>
      <PageTitle>
        <FaQuestionCircle /> Kuis Islami
      </PageTitle>
      <PageSubtitle>
        Uji hafalan dan pemahamanmu: 10 soal pilihan ganda per sesi, skor terbaik tersimpan di
        perangkat ini.
      </PageSubtitle>

      <SegmenWadah role="tablist" aria-label="Mode kuis">
        {MODE_KUIS.map((m) => (
          <SegmenTab key={m.kunci} aktif={mode === m.kunci} onClick={() => gantiMode(m.kunci)}>
            {m.nama}
          </SegmenTab>
        ))}
      </SegmenWadah>

      {fase === 'pilih' && (
        <Card>
          <SectionTitle css={{ marginTop: 0 }}>
            <FaListUl /> Mode: {modeAktif.nama}
          </SectionTitle>
          <InfoKecil>
            {mode === 'sambung' &&
              'Ditampilkan potongan awal terjemahan ayat masyhur — pilih lanjutan terjemahan yang benar dari 4 pilihan.'}
            {mode === 'tebak' &&
              'Ditampilkan cuplikan terjemahan ayat masyhur — tebak nama surah tempat ayat itu berada.'}
            {mode === 'tajwid' &&
              'Soal hukum tajwid dasar dan fikih ibadah sehari-hari (wudhu, sholat, puasa, bersuci) dari panduan aplikasi.'}
          </InfoKecil>
          <p css={(t) => ({ marginTop: 12, fontWeight: 700, color: t.colors.judul })}>
            <FaTrophy css={(t) => ({ color: t.colors.goldDeep, marginRight: 6 })} />
            Skor terbaik mode ini:{' '}
            {terbaik[mode] === null ? 'belum ada — jadilah yang pertama!' : `${terbaik[mode]} / ${JUMLAH_SOAL}`}
          </p>
          <div css={{ marginTop: 16 }}>
            <PrimaryButton onClick={() => mulai()} aria-label={`Mulai kuis ${modeAktif.nama}`}>
              <FaPlay /> Mulai Kuis
            </PrimaryButton>
          </div>
        </Card>
      )}

      {fase === 'main' && !soal && (
        <StateKosong
          ikon={<FaQuestionCircle />}
          judul="Soal tidak tersedia"
          deskripsi="Bank soal mode ini kosong. Coba mode kuis yang lain."
        />
      )}

      {fase === 'main' && soal && (
        <Card>
          <div
            css={(t) => ({
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              fontWeight: 700,
              color: t.colors.muted,
              marginBottom: 12,
            })}
          >
            <span>
              Soal {idx + 1} / {sesi.length}
            </span>
            <span aria-live="polite">Skor: {skor}</span>
          </div>
          <TeksSoal>{soal.teks}</TeksSoal>
          <InfoKecil css={{ marginBottom: 14 }}>{soal.tanya}</InfoKecil>
          <div role="group" aria-label="Pilihan jawaban">
            {soal.opsi.map((opsi, i) => {
              const keadaan =
                dipilih === null
                  ? 'netral'
                  : i === soal.benar
                  ? 'benar'
                  : i === dipilih
                  ? 'salah'
                  : 'netral';
              return (
                <TombolOpsi
                  key={i}
                  type="button"
                  keadaan={keadaan}
                  disabled={dipilih !== null}
                  onClick={() => jawab(i)}
                  aria-label={`Pilihan ${String.fromCharCode(65 + i)}: ${opsi}`}
                >
                  <span className="ikon" aria-hidden="true">
                    {dipilih !== null && i === soal.benar ? (
                      <FaCheck />
                    ) : dipilih === i ? (
                      <FaTimes />
                    ) : (
                      <span css={{ fontWeight: 800 }}>{String.fromCharCode(65 + i)}.</span>
                    )}
                  </span>
                  <span>{opsi}</span>
                </TombolOpsi>
              );
            })}
          </div>
          {dipilih !== null && (
            <div aria-live="polite">
              <p
                css={(t) => ({
                  fontWeight: 700,
                  color: dipilih === soal.benar ? t.colors.success : t.colors.danger,
                  marginBottom: 4,
                })}
              >
                {dipilih === soal.benar ? 'Benar! Barakallah.' : 'Kurang tepat — jawaban yang benar ditandai hijau.'}
              </p>
              <InfoKecil css={{ marginBottom: 14 }}>Referensi: {soal.ref}</InfoKecil>
              <PrimaryButton onClick={lanjut}>
                {idx + 1 < sesi.length ? 'Soal Berikutnya' : 'Lihat Hasil'}
              </PrimaryButton>
            </div>
          )}
        </Card>
      )}

      {fase === 'selesai' && (
        <Card css={{ textAlign: 'center' }}>
          <FaTrophy css={(t) => ({ fontSize: 40, color: t.colors.goldDeep, marginBottom: 10 })} aria-hidden="true" />
          <p css={(t) => ({ fontFamily: t.fonts.display, fontSize: 22, fontWeight: 700, color: t.colors.judul })}>
            Skor Akhir: {skor} / {sesi.length}
          </p>
          <InfoKecil css={{ marginTop: 6 }}>
            Mode {modeAktif.nama} — skor terbaikmu: {terbaik[mode]} / {JUMLAH_SOAL}.
            {skor === sesi.length
              ? ' Sempurna, masya Allah!'
              : skor >= sesi.length * 0.7
              ? ' Bagus sekali, pertahankan!'
              : ' Terus berlatih, buka lagi ayat dan panduannya ya.'}
          </InfoKecil>
          <div css={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 18 }}>
            <PrimaryButton onClick={() => mulai()}>
              <FaRedoAlt /> Main Lagi
            </PrimaryButton>
            <GhostButton onClick={() => setFase('pilih')}>
              <FaListUl /> Ganti Mode
            </GhostButton>
          </div>
        </Card>
      )}
    </Page>
  );
}
