/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { FaBookOpen, FaChevronDown, FaInfoCircle, FaSearch } from 'react-icons/fa';
import { HADITS_ARBAIN, SUMBER_HADITS_ARBAIN } from '../../data/sources/haditsArbainData.js';
import StateKosong from '../components/StateKosong.jsx';

/** Saran pencarian hadits — ketuk untuk langsung memfilter daftar. */
const SARAN_HADITS = ['niat', 'iman', 'ilmu', 'sabar', 'amal'];
import {
  Page,
  PageTitle,
  PageSubtitle,
  Card,
  SectionTitle,
  TextInput,
} from '../components/common.jsx';

// Halaman /hadits — daftar 42 Hadits Arbain an-Nawawi.
// Dataset penuh (haditsArbainData.js) HANYA diimpor di sini agar ikut
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
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    line-height: 1.3;
  }
  .perawi {
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
  .sumber {
    font-size: 12.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.faint};
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

export default function HaditsPage() {
  const [terbuka, setTerbuka] = useState(null);
  const [kata, setKata] = useState('');

  const hasil = useMemo(() => {
    const q = kata.trim().toLowerCase();
    if (!q) return HADITS_ARBAIN;
    return HADITS_ARBAIN.filter(
      (h) =>
        h.judul.toLowerCase().includes(q) ||
        h.terjemahan.toLowerCase().includes(q) ||
        h.perawi.toLowerCase().includes(q),
    );
  }, [kata]);

  return (
    <Page>
      <PageTitle>
        <FaBookOpen /> Hadits Arbain Nawawi
      </PageTitle>
      <PageSubtitle>
        42 hadits pilihan Imam an-Nawawi — fondasi ajaran Islam. Ketuk kartu untuk membaca teks
        Arab dan terjemahannya.
      </PageSubtitle>

      <BungkusCari>
        <FaSearch aria-hidden="true" />
        <TextInput
          type="search"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari judul, isi terjemahan, atau perawi…"
          aria-label="Cari hadits Arbain"
        />
      </BungkusCari>

      <SectionTitle>Daftar 42 Hadits</SectionTitle>

      {hasil.length === 0 && (
        <StateKosong
          ikon={<FaSearch />}
          judul={`Tidak ada hadits untuk “${kata}”`}
          deskripsi="Periksa kembali ejaannya, coba kata yang lebih umum, atau ketuk salah satu saran berikut."
          saran={SARAN_HADITS}
          labelSaran="Topik populer"
          onSaran={(s) => setKata(s)}
        />
      )}

      {hasil.map((h) => {
        const isOpen = terbuka === h.nomor;
        return (
          <KartuHadits key={h.nomor}>
            <KepalaKartu
              type="button"
              $terbuka={isOpen}
              aria-expanded={isOpen}
              aria-controls={`isi-hadits-${h.nomor}`}
              aria-label={`Hadits ${h.nomor}: ${h.judul}, perawi ${h.perawi}`}
              onClick={() => setTerbuka(isOpen ? null : h.nomor)}
            >
              <NomorMedali nomor={h.nomor} ukuran={40} />
              <span className="teks">
                <span className="judul">{h.judul}</span>
                <span className="perawi">Perawi: {h.perawi}</span>
              </span>
              <FaChevronDown className="panah" aria-hidden="true" />
            </KepalaKartu>
            {isOpen && (
              <IsiKartu id={`isi-hadits-${h.nomor}`}>
                <p className="arab" lang="ar" dir="rtl">
                  {h.arab}
                </p>
                <p className="terjemahan">{h.terjemahan}</p>
                {h.sumber && <p className="sumber">Sumber: {h.sumber}</p>}
              </IsiKartu>
            )}
          </KartuHadits>
        );
      })}

      <InfoSumber>
        <FaInfoCircle aria-hidden="true" />
        <p>
          Sumber teks: <a href={SUMBER_HADITS_ARBAIN.url}>{SUMBER_HADITS_ARBAIN.nama}</a>.{' '}
          {SUMBER_HADITS_ARBAIN.catatan}
        </p>
      </InfoSumber>
    </Page>
  );
}
