/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaBookOpen, FaChevronDown, FaChevronLeft, FaInfoCircle, FaLeaf, FaSearch,
} from 'react-icons/fa';
import { RIYADHUS_BAB, SUMBER_RIYADHUS } from '../../data/sources/riyadhusData.js';
import StateKosong from '../components/StateKosong.jsx';
import NomorMedali from '../components/NomorMedali.jsx';

/** Saran pencarian — ketuk untuk langsung memfilter semua bab. */
const SARAN_RIYADHUS = ['niat', 'sabar', 'tobat', 'takwa', 'jujur'];
import {
  Page,
  PageTitle,
  PageSubtitle,
  Card,
  SectionTitle,
  TextInput,
} from '../components/common.jsx';

// Halaman /riyadhus — Riyadhus Shalihin (Imam an-Nawawi), Bab 1–13:
// 141 hadits (Arab + terjemahan Indonesia). Alur: daftar bab → daftar
// hadits bab itu; pencarian menelusuri semua bab sekaligus.
// Dataset penuh (riyadhusData.js) HANYA diimpor di sini agar ikut
// chunk lazy halaman ini, bukan chunk beranda/entry.

const BungkusCari = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.faint};
    pointer-events: none;
  }
  input {
    padding-left: 42px;
    min-height: 48px;
  }
`;

const BarisBab = styled.button`
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  .teks {
    flex: 1;
    min-width: 0;
  }
  .judul {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 15.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    line-height: 1.35;
  }
  .meta {
    display: block;
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
  .panah {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.goldDeep};
    transform: rotate(-90deg);
  }
`;

const TombolKembali = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 14px 8px 10px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  border-radius: 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

const KartuHadits = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const KepalaKartu = styled.button`
  width: 100%;
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  .teks {
    flex: 1;
    min-width: 0;
  }
  .judul {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 15.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    line-height: 1.35;
  }
  .bab {
    display: block;
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
  .panah {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.goldDeep};
    transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
    transform: rotate(${({ $terbuka }) => ($terbuka ? '180deg' : '0deg')});
  }
`;

const IsiKartu = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  padding: 16px;
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 25px;
    line-height: 2.1;
    text-align: right;
    direction: rtl;
    color: ${({ theme }) => theme.colors.teksArab};
  }
  .terjemahan {
    font-size: 14.5px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
    margin-top: 12px;
  }
`;

const InfoSumber = styled(Card)`
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  gap: 10px;
  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const TOTAL_HADITS = RIYADHUS_BAB.reduce((n, b) => n + b.hadits.length, 0);

/** Cuplikan awal terjemahan sebagai judul ringkas kartu hadits. */
function cuplikan(teks, maks = 64) {
  const bersih = teks.replace(/^(Kedua puluh [a-z]+|Ketiga puluh [a-z]+|Kedua belas|Kesebelas|Pertama|Kedua|Ketiga|Keempat|Kelima|Keenam|Ketujuh|Kedelapan|Kesembilan|Kesepuluh)[:\s]+/i, '');
  return bersih.length > maks ? `${bersih.slice(0, maks).trimEnd()}…` : bersih;
}

export default function RiyadhusPage() {
  const [babAktif, setBabAktif] = useState(null);
  const [terbuka, setTerbuka] = useState(null);
  const [kata, setKata] = useState('');

  const hasilCari = useMemo(() => {
    const q = kata.trim().toLowerCase();
    if (!q) return null;
    const hasil = [];
    for (const bab of RIYADHUS_BAB) {
      for (const h of bab.hadits) {
        if (
          bab.judul.toLowerCase().includes(q) ||
          h.terjemahan.toLowerCase().includes(q) ||
          h.arab.includes(q)
        ) {
          hasil.push({ bab, hadits: h });
        }
      }
    }
    return hasil;
  }, [kata]);

  const babDipilih = babAktif ? RIYADHUS_BAB.find((b) => b.nomor === babAktif) : null;

  const renderHadits = (bab, h) => {
    const isOpen = terbuka === h.nomor;
    return (
      <KartuHadits key={h.nomor}>
        <KepalaKartu
          type="button"
          $terbuka={isOpen}
          aria-expanded={isOpen}
          aria-controls={`isi-riyadhus-${h.nomor}`}
          aria-label={`Hadits Riyadhus Shalihin nomor ${h.nomor}, bab ${bab.judul}`}
          onClick={() => setTerbuka(isOpen ? null : h.nomor)}
        >
          <NomorMedali nomor={h.nomor} ukuran={40} />
          <span className="teks">
            <span className="judul">{cuplikan(h.terjemahan)}</span>
            <span className="bab">Bab {bab.nomor}: {bab.judul}</span>
          </span>
          <FaChevronDown className="panah" aria-hidden="true" />
        </KepalaKartu>
        {isOpen && (
          <IsiKartu id={`isi-riyadhus-${h.nomor}`}>
            <p className="arab" lang="ar" dir="rtl">
              {h.arab}
            </p>
            <p className="terjemahan">{h.terjemahan}</p>
          </IsiKartu>
        )}
      </KartuHadits>
    );
  };

  return (
    <Page>
      <PageTitle>
        <FaLeaf /> Riyadhus Shalihin
      </PageTitle>
      <PageSubtitle>
        Kitab hadis Imam an-Nawawi tentang akhlak dan penyucian jiwa. Edisi ini memuat{' '}
        {TOTAL_HADITS} hadits dari {RIYADHUS_BAB.length} bab pertama kitab (Bab 1–13) — teks Arab
        dan terjemahan Indonesia. Pilih bab, atau cari di semua bab.
      </PageSubtitle>

      <BungkusCari>
        <FaSearch aria-hidden="true" />
        <TextInput
          type="search"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari isi terjemahan atau nama bab…"
          aria-label="Cari hadits Riyadhus Shalihin"
        />
      </BungkusCari>

      {hasilCari ? (
        <>
          <SectionTitle>Hasil Pencarian ({hasilCari.length})</SectionTitle>
          {hasilCari.length === 0 && (
            <StateKosong
              ikon={<FaSearch />}
              judul={`Tidak ada hadits untuk “${kata}”`}
              deskripsi="Periksa kembali ejaannya, coba kata yang lebih umum, atau ketuk salah satu saran berikut."
              saran={SARAN_RIYADHUS}
              labelSaran="Topik populer"
              onSaran={(s) => setKata(s)}
            />
          )}
          {hasilCari.map(({ bab, hadits }) => renderHadits(bab, hadits))}
        </>
      ) : babDipilih ? (
        <>
          <TombolKembali type="button" onClick={() => { setBabAktif(null); setTerbuka(null); }}>
            <FaChevronLeft aria-hidden="true" /> Semua Bab
          </TombolKembali>
          <SectionTitle>
            Bab {babDipilih.nomor}: {babDipilih.judul}
          </SectionTitle>
          {babDipilih.hadits.map((h) => renderHadits(babDipilih, h))}
        </>
      ) : (
        <>
          <SectionTitle>Daftar Bab</SectionTitle>
          {RIYADHUS_BAB.map((bab) => (
            <BarisBab
              key={bab.nomor}
              type="button"
              onClick={() => { setBabAktif(bab.nomor); setTerbuka(null); }}
              aria-label={`Bab ${bab.nomor}: ${bab.judul}, ${bab.hadits.length} hadits`}
            >
              <NomorMedali nomor={bab.nomor} ukuran={40} />
              <span className="teks">
                <span className="judul">{bab.judul}</span>
                <span className="meta">{bab.hadits.length} hadits</span>
              </span>
              <FaChevronDown className="panah" aria-hidden="true" />
            </BarisBab>
          ))}
        </>
      )}

      <InfoSumber>
        <FaInfoCircle aria-hidden="true" />
        <p>
          Sumber teks: <a href={SUMBER_RIYADHUS.url}>{SUMBER_RIYADHUS.nama}</a>.{' '}
          {SUMBER_RIYADHUS.catatan}
        </p>
      </InfoSumber>

      <Card>
        <p css={{ fontSize: 13.5, lineHeight: 1.7, display: 'flex', gap: 8 }}>
          <FaBookOpen aria-hidden="true" />
          <span>
            Riyadhus Shalihin memuat lebih dari 1.800 hadits dalam versi lengkapnya; edisi Noor
            ini menghadirkan bab-bab inti di awal kitab sebagai permulaan. Bab 9 (Tafakur) tidak
            ditampilkan karena bab tersebut hanya memuat ayat-ayat Al-Qur\u2019an tanpa hadits.
          </span>
        </p>
      </Card>
    </Page>
  );
}
