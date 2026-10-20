/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa';
import { GoldCard } from './common.jsx';
import { HADITS_HARIAN } from '../../data/sources/haditsHarianData.js';
import { useRotasiHarian } from '../hooks/useRotasiHarian.js';

// Kartu beranda "Hadits Hari Ini" — menampilkan satu Hadits Arbain yang
// berganti setiap tanggal (rotasi deterministik). SENGAJA memakai data
// cuplikan kecil (haditsHarianData.js); dataset Arbain penuh hanya boleh
// termuat di chunk lazy halaman /hadits.

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
  .judul {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 17px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    margin-top: 2px;
    line-height: 1.3;
  }
`;

const Cuplikan = styled.p`
  font-size: 14.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Perawi = styled.p`
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

export default function HaditsHariIni() {
  const indeks = useRotasiHarian(HADITS_HARIAN.length);
  const hadits = HADITS_HARIAN[indeks];
  if (!hadits) return null;

  return (
    <GoldCard>
      <Kepala>
        <span className="ikon" aria-hidden="true">
          <FaBookOpen />
        </span>
        <div>
          <div className="label">Hadits Hari Ini · Arbain {hadits.nomor}</div>
          <div className="judul">{hadits.judul}</div>
        </div>
      </Kepala>
      <Cuplikan>{hadits.cuplikan}</Cuplikan>
      <Perawi>Perawi: {hadits.perawi}</Perawi>
      <TombolBaca to="/hadits" aria-label="Baca 42 Hadits Arbain Nawawi selengkapnya">
        Baca 42 Hadits Arbain <FaArrowRight aria-hidden="true" />
      </TombolBaca>
    </GoldCard>
  );
}
