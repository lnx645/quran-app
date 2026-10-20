/** @jsxImportSource @emotion/react */
import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaSearchMinus, FaExclamationTriangle, FaBookOpen, FaRedo } from 'react-icons/fa';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';
import StateKosong from '../components/StateKosong.jsx';

/** Chip saran pencarian populer — ketuk untuk langsung mencari. */
const SARAN_PENCARIAN = ['puasa', 'syukur', 'sabar', 'rezeki', 'ampunan'];
import {
  Page,
  PageTitle,
  PageSubtitle,
  Card,
  TextInput,
  PrimaryButton,
  ErrorBox,
  LoadingBox,
  Spinner,
} from '../components/common.jsx';

/**
 * Pencarian global (rute usulan: /cari).
 * Cari ayat lewat Quran.com /search (language=id → terjemahan Kemenag).
 * Ketuk hasil → /surah/{id}?ayat={n} (SurahPage menggulir & menyorot ayat).
 */

const Formulir = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
`;

const TombolCari = styled(PrimaryButton)`
  min-width: 64px;
  flex-shrink: 0;
`;

const MetaHasil = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 10px 0 12px;
`;

const KartuHasil = styled(Card)`
  cursor: pointer;
  text-align: left;
  width: 100%;
  display: block;
  transition: transform 0.15s ease;
  &:active {
    transform: scale(0.99);
  }
  .ref {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 7px;
    svg {
      color: ${({ theme }) => theme.colors.gold};
    }
  }
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 23px;
    line-height: 2.05;
    text-align: right;
    direction: rtl;
    color: ${({ theme }) => theme.colors.teksArab};
    margin-bottom: 8px;
  }
  .terjemah {
    font-size: 14px;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.teksTerjemah};
  }
  .terjemah mark {
    background: ${({ theme }) => theme.colors.goldSoft};
    color: inherit;
    border-radius: 4px;
    padding: 0 2px;
  }
`;

/** Sorot kata yang cocok di terjemahan dengan <mark>. */
function sorotKata(terjemahan, kataKunci) {
  const kata = String(kataKunci ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!kata.length) return terjemahan;
  const pola = new RegExp(`(${kata.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const bagian = terjemahan.split(pola);
  return bagian.map((b, i) =>
    i % 2 === 1 ? <mark key={i}>{b}</mark> : <span key={i}>{b}</span>
  );
}

export default function CariPage() {
  const navigate = useNavigate();
  const [kata, setKata] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | gagal | selesai
  const [hasil, setHasil] = useState([]);
  const [total, setTotal] = useState(0);
  const [pesanGalat, setPesanGalat] = useState('');
  const [kataDitampilkan, setKataDitampilkan] = useState('');

  const cari = useCallback((kataKunci) => {
    const bersih = String(kataKunci ?? '').trim();
    if (!bersih) return;
    setKataDitampilkan(bersih);
    setStatus('loading');
    setPesanGalat('');
    QuranRepositoryImpl.searchQuran(bersih)
      .then((d) => {
        setHasil(d.hasil);
        setTotal(d.total);
        setStatus('selesai');
      })
      .catch((err) => {
        setPesanGalat(err?.message ?? 'gagal');
        setStatus('gagal');
      });
  }, []);

  const kirim = (e) => {
    e.preventDefault();
    cari(kata);
  };

  return (
    <Page>
      <PageTitle>
        <FaSearch /> Cari Ayat
      </PageTitle>
      <PageSubtitle>Cari ayat dari seluruh Al-Qur’an — berdasarkan terjemahan maupun kata dalam ayat.</PageSubtitle>

      <Formulir onSubmit={kirim} role="search">
        <TextInput
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="misalnya: sabar, surga, atau بِسْمِ اللَّهِ"
          aria-label="Kata kunci pencarian ayat"
          enterKeyHint="search"
          autoComplete="off"
        />
        <TombolCari type="submit" aria-label="Cari" disabled={status === 'loading'}>
          <FaSearch aria-hidden="true" />
        </TombolCari>
      </Formulir>

      {status === 'loading' && (
        <LoadingBox>
          <Spinner />
          Mencari ayat…
        </LoadingBox>
      )}

      {status === 'gagal' && (
        <ErrorBox role="alert">
          <FaExclamationTriangle /> Gagal mencari: {pesanGalat}. Periksa koneksi internet.
          <button
            type="button"
            css={(t) => ({
              marginInlineStart: 6,
              textDecoration: 'underline',
              fontWeight: 800,
              color: t.colors.text,
            })}
            onClick={() => cari(kataDitampilkan)}
            aria-label="Coba cari lagi"
          >
            <FaRedo aria-hidden="true" /> Coba lagi
          </button>
        </ErrorBox>
      )}

      {status === 'selesai' && hasil.length === 0 && (
        <StateKosong
          ikon={<FaSearchMinus />}
          judul={`Tidak ada hasil untuk “${kataDitampilkan}”`}
          deskripsi="Periksa kembali ejaannya, coba kata yang lebih umum, atau ketuk salah satu saran berikut."
          saran={SARAN_PENCARIAN}
          onSaran={(s) => {
            setKata(s);
            cari(s);
          }}
        />
      )}

      {status === 'selesai' && hasil.length > 0 && (
        <>
          <MetaHasil>
            {hasil.length} dari {total} hasil untuk “{kataDitampilkan}”
          </MetaHasil>
          {hasil.map((h) => (
            <KartuHasil
              as="button"
              type="button"
              key={h.verseKey}
              onClick={() => navigate(`/surah/${h.surahId}?ayat=${h.nomorAyat}`)}
              aria-label={`Buka surah ${h.surahId} ayat ${h.nomorAyat}`}
            >
              <div className="ref">
                <FaBookOpen aria-hidden="true" /> QS {h.surahId} : Ayat {h.nomorAyat}
              </div>
              <p className="arab" lang="ar">{h.teksArab}</p>
              <p className="terjemah">{sorotKata(h.teksTerjemahan, kataDitampilkan)}</p>
            </KartuHasil>
          ))}
        </>
      )}

      {status === 'idle' && (
        <StateKosong
          ikon={<FaSearch />}
          judul="Cari Ayat Al-Qur’an"
          deskripsi="Ketik kata kunci di kolom atas lalu tekan Cari — atau ketuk salah satu pencarian populer berikut."
          saran={SARAN_PENCARIAN}
          onSaran={(s) => {
            setKata(s);
            cari(s);
          }}
        />
      )}
    </Page>
  );
}
