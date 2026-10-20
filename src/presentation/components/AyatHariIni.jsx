/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowRight, FaQuran } from 'react-icons/fa';
import { GoldCard, Skeleton } from './common.jsx';
import { AYAT_PILIHAN } from '../../data/sources/ayatPilihanData.js';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';
import { useRotasiHarian } from '../hooks/useRotasiHarian.js';

// Kartu beranda "Ayat Hari Ini" — satu ayat masyhur berganti setiap tanggal.
// Data lokal hanya berisi referensi ayat (ayatPilihanData.js); teks Arab &
// terjemahan diambil runtime via QuranRepositoryImpl.getSurahDetail agar
// akurat. Bila pengambilan gagal, kartu disembunyikan dengan anggun (null).

const Kepala = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .ikon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 14px;
    background: ${({ theme }) => theme.gradients.header};
    color: ${({ theme }) => theme.colors.goldLight};
    font-size: 20px;
    flex-shrink: 0;
    box-shadow: inset 0 0 0 1px rgba(231, 198, 90, 0.45);
  }
  .label {
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
  .ref {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 17px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    margin-top: 2px;
    line-height: 1.3;
  }
`;

const TeksArab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 26px;
  line-height: 2.1;
  text-align: right;
  direction: rtl;
  color: ${({ theme }) => theme.colors.teksArab};
  margin-top: 14px;
`;

const Terjemahan = styled.p`
  font-size: 14.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.teksTerjemah};
  margin-top: 10px;
`;

const Tema = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 8px;
`;

const TombolBaca = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 12px 20px;
  margin-top: 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.gradients.gold};
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-size: 14.5px;
  font-weight: 800;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.gold};
`;

export default function AyatHariIni() {
  const indeks = useRotasiHarian(AYAT_PILIHAN.length);
  const pilihan = AYAT_PILIHAN[indeks];
  const [status, setStatus] = useState('muat'); // 'muat' | 'siap' | 'gagal'
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!pilihan) return undefined;
    let aktif = true;
    QuranRepositoryImpl.getSurahDetail(pilihan.surahId)
      .then((detail) => {
        if (!aktif) return;
        const ayat = detail.ayahs.find((a) => a.number === pilihan.nomorAyat);
        if (!ayat) {
          setStatus('gagal');
          return;
        }
        setData({ surah: detail.surah, ayat });
        setStatus('siap');
      })
      .catch(() => {
        if (aktif) setStatus('gagal');
      });
    return () => {
      aktif = false;
    };
  }, [pilihan]);

  // Gagal memuat → sembunyikan kartu dengan anggun.
  if (!pilihan || status === 'gagal') return null;

  return (
    <GoldCard aria-busy={status === 'muat'}>
      <Kepala>
        <span className="ikon" aria-hidden="true">
          <FaQuran />
        </span>
        <div>
          <div className="label">Ayat Hari Ini</div>
          <div className="ref">
            {status === 'siap'
              ? `QS. ${data.surah.nameLatin} (${pilihan.surahId}) : ${pilihan.nomorAyat}`
              : 'Memuat ayat…'}
          </div>
        </div>
      </Kepala>

      {status === 'muat' && (
        <div style={{ marginTop: 14 }}>
          <Skeleton h={30} />
          <div style={{ height: 10 }} />
          <Skeleton h={15} w="85%" />
          <div style={{ height: 6 }} />
          <Skeleton h={15} w="65%" />
        </div>
      )}

      {status === 'siap' && (
        <>
          <TeksArab lang="ar" dir="rtl">
            {data.ayat.arabic}
          </TeksArab>
          <Terjemahan>{data.ayat.translation}</Terjemahan>
          <Tema>Tema: {pilihan.tema}</Tema>
          <TombolBaca
            to={`/surah/${pilihan.surahId}?ayat=${pilihan.nomorAyat}`}
            aria-label={`Baca Surah ${data.surah.nameLatin} ayat ${pilihan.nomorAyat}`}
          >
            Baca Surah <FaArrowRight aria-hidden="true" />
          </TombolBaca>
        </>
      )}
    </GoldCard>
  );
}
