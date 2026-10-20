/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { FaListUl, FaEyeSlash } from 'react-icons/fa';
import { ASMAUL_HUSNA } from '../../data/sources/asmaulHusnaData.js';
import { Page, PageTitle, PageSubtitle, Card, SectionTitle, GhostButton } from '../components/common.jsx';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;

const Kartu = styled(Card)`
  margin-bottom: 0;
  text-align: center;
  padding: 14px 8px;
  .no {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primaryDeep};
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .ar {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 30px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.primaryDeep};
  }
  .lat {
    font-weight: 600;
    font-size: 13.5px;
  }
  .arti {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
    min-height: 34px;
  }
`;

export default function AsmaulHusnaPage() {
  const [sembunyiArti, setSembunyiArti] = useState(false); // mode hafalan

  return (
    <Page>
      <PageTitle>Asmaul Husna</PageTitle>
      <PageSubtitle>99 nama-nama Allah yang indah — {ASMAUL_HUSNA.length} nama.</PageSubtitle>
      <div css={{ marginBottom: 12 }}>
        <GhostButton onClick={() => setSembunyiArti((s) => !s)}>
          <FaEyeSlash /> {sembunyiArti ? 'Tampilkan Arti' : 'Mode Hafalan (sembunyikan arti)'}
        </GhostButton>
      </div>
      <SectionTitle>
        <FaListUl /> Daftar 99 Asmaul Husna
      </SectionTitle>
      <Grid>
        {ASMAUL_HUSNA.map((a) => (
          <Kartu key={a.nomor}>
            <div className="no">{a.nomor}</div>
            <div className="ar" lang="ar">{a.arab}</div>
            <div className="lat">{a.latin}</div>
            <div className="arti">{sembunyiArti ? '…' : a.arti}</div>
          </Kartu>
        ))}
      </Grid>
    </Page>
  );
}
