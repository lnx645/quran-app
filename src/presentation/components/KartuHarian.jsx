/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowRight, FaBookOpen, FaQuran, FaShareAlt } from 'react-icons/fa';
import { GoldCard, GhostButton, Skeleton } from './common.jsx';
import { AYAT_PILIHAN } from '../../data/sources/ayatPilihanData.js';
import { HADITS_HARIAN } from '../../data/sources/haditsHarianData.js';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';
import { useRotasiHarian } from '../hooks/useRotasiHarian.js';
import { useToast } from './feedback/toastStore.js';

// Kartu harian TERPADU Beranda — penerus dua kartu lama AyatHariIni.jsx &
// HaditsHariIni.jsx (berkas lama TIDAK diubah; Beranda kini hanya merender
// kartu ini). Ayat & hadits BERGANTIAN per hari memakai pola rotasi yang
// sama dengan aplikasi: paritas useRotasiHarian(2) — indeks 0 (hari genap
// sejak epoch lokal) → AYAT, indeks 1 (ganjil) → HADITS. Pilihan item di
// dalam masing-masing jenis tetap memakai useRotasiHarian(panjang daftar)
// persis seperti kartu lama, jadi ayat/hadits yang tampil pada hari yang
// sama identik dengan yang dulu ditampilkan kartu terpisah.
//
// Ayat: teks resmi runtime via QuranRepositoryImpl.getSurahDetail dari
// referensi ayatPilihanData (tidak pernah diketik dari ingatan). Bila
// pengambilan ayat gagal, kartu jatuh ke hadits hari itu (bukan hilang).
// Hadits: cuplikan haditsHarianData — data itu SENGAJA hanya berisi
// terjemahan Indonesia ringkas (tanpa Arab), maka gambar bagikan hadits
// pun hanya menampilkan teks Indonesia + sumber, tanpa mengarang Arab.
// Dataset Arbain penuh TIDAK diimpor di sini (aturan chunk di
// haditsArbainData.js: hanya untuk chunk lazy /hadits).
//
// Tombol "Bagikan sebagai Gambar": logika canvas dimuat DINAMIS lewat
// import() ke src/data/platform/bagikanGambarHarian.js saat ditekan.

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

const Cuplikan = styled.p`
  font-size: 14.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 12px;
`;

const Meta = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 8px;
`;

const BarisTombol = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
  align-items: stretch;
`;

const TombolBaca = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  padding: 13px 18px;
  border: 1.5px solid transparent;
  border-radius: 14px;
  background: ${({ theme }) => theme.gradients.gold};
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.gold};
`;

export default function KartuHarian() {
  const toast = useToast();
  const paritas = useRotasiHarian(2);
  const indeksAyat = useRotasiHarian(AYAT_PILIHAN.length);
  const indeksHadits = useRotasiHarian(HADITS_HARIAN.length);
  const pilihan = AYAT_PILIHAN[indeksAyat];
  const hadits = HADITS_HARIAN[indeksHadits];

  const [statusAyat, setStatusAyat] = useState('muat'); // 'muat' | 'siap' | 'gagal'
  const [dataAyat, setDataAyat] = useState(null);
  const [membagikan, setMembagikan] = useState(false);

  const modeAyatDiminta = paritas === 0;
  const tampilAyat = modeAyatDiminta && statusAyat !== 'gagal';

  useEffect(() => {
    if (!modeAyatDiminta || !pilihan) return undefined;
    let aktif = true;
    QuranRepositoryImpl.getSurahDetail(pilihan.surahId)
      .then((detail) => {
        if (!aktif) return;
        const ayat = detail.ayahs.find((a) => a.number === pilihan.nomorAyat);
        if (!ayat) {
          setStatusAyat('gagal');
          return;
        }
        setDataAyat({ surah: detail.surah, ayat });
        setStatusAyat('siap');
      })
      .catch(() => {
        if (aktif) setStatusAyat('gagal');
      });
    return () => {
      aktif = false;
    };
  }, [modeAyatDiminta, pilihan]);

  const bagikan = async () => {
    if (membagikan) return;
    setMembagikan(true);
    try {
      const { bagikanGambarHarian } = await import('../../data/platform/bagikanGambarHarian.js');
      const payload = tampilAyat
        ? {
            label: 'Ayat Hari Ini',
            arab: dataAyat.ayat.arabic,
            terjemahan: dataAyat.ayat.translation,
            sumber: `QS. ${dataAyat.surah.nameLatin}: ${pilihan.nomorAyat}`,
          }
        : {
            label: 'Hadits Hari Ini',
            judul: hadits.judul,
            terjemahan: hadits.cuplikan,
            sumber: `Hadits Arbain No. ${hadits.nomor} — Perawi: ${hadits.perawi}`,
          };
      const hasil = await bagikanGambarHarian(
        payload,
        tampilAyat ? 'noor-ayat-hari-ini.png' : 'noor-hadits-hari-ini.png',
      );
      if (hasil === 'diunduh') toast.sukses('Gambar diunduh sebagai PNG.');
      else if (hasil === 'dibagikan') toast.sukses('Gambar dibagikan.');
    } catch {
      toast.error('Gagal membuat gambar untuk dibagikan. Silakan coba lagi.');
    } finally {
      setMembagikan(false);
    }
  };

  if (!hadits && !pilihan) return null;
  // Hari hadits (atau ayat gagal dimuat): kartu hadits.
  if (!tampilAyat) {
    if (!hadits) return null;
    return (
      <GoldCard>
        <Kepala>
          <span className="ikon" aria-hidden="true">
            <FaBookOpen />
          </span>
          <div>
            <div className="label">Hadits Hari Ini · Arbain {hadits.nomor}</div>
            <div className="ref">{hadits.judul}</div>
          </div>
        </Kepala>
        <Cuplikan>{hadits.cuplikan}</Cuplikan>
        <Meta>Perawi: {hadits.perawi}</Meta>
        <BarisTombol>
          <TombolBaca to="/hadits" aria-label="Baca 42 Hadits Arbain Nawawi selengkapnya">
            Baca 42 Hadits Arbain <FaArrowRight aria-hidden="true" />
          </TombolBaca>
          <GhostButton
            type="button"
            onClick={bagikan}
            disabled={membagikan}
            aria-label="Bagikan hadits hari ini sebagai gambar"
          >
            <FaShareAlt aria-hidden="true" /> {membagikan ? 'Menyiapkan…' : 'Bagikan sebagai Gambar'}
          </GhostButton>
        </BarisTombol>
      </GoldCard>
    );
  }

  // Hari ayat.
  return (
    <GoldCard aria-busy={statusAyat === 'muat'}>
      <Kepala>
        <span className="ikon" aria-hidden="true">
          <FaQuran />
        </span>
        <div>
          <div className="label">Ayat Hari Ini</div>
          <div className="ref">
            {statusAyat === 'siap'
              ? `QS. ${dataAyat.surah.nameLatin} (${pilihan.surahId}) : ${pilihan.nomorAyat}`
              : 'Memuat ayat…'}
          </div>
        </div>
      </Kepala>

      {statusAyat === 'muat' && (
        <div style={{ marginTop: 14 }}>
          <Skeleton h={30} />
          <div style={{ height: 10 }} />
          <Skeleton h={15} w="85%" />
          <div style={{ height: 6 }} />
          <Skeleton h={15} w="65%" />
        </div>
      )}

      {statusAyat === 'siap' && (
        <>
          <TeksArab lang="ar" dir="rtl">
            {dataAyat.ayat.arabic}
          </TeksArab>
          <Terjemahan>{dataAyat.ayat.translation}</Terjemahan>
          <Meta>Tema: {pilihan.tema}</Meta>
          <BarisTombol>
            <TombolBaca
              to={`/surah/${pilihan.surahId}?ayat=${pilihan.nomorAyat}`}
              aria-label={`Baca Surah ${dataAyat.surah.nameLatin} ayat ${pilihan.nomorAyat}`}
            >
              Baca Surah <FaArrowRight aria-hidden="true" />
            </TombolBaca>
            <GhostButton
              type="button"
              onClick={bagikan}
              disabled={membagikan}
              aria-label="Bagikan ayat hari ini sebagai gambar"
            >
              <FaShareAlt aria-hidden="true" /> {membagikan ? 'Menyiapkan…' : 'Bagikan sebagai Gambar'}
            </GhostButton>
          </BarisTombol>
        </>
      )}
    </GoldCard>
  );
}
