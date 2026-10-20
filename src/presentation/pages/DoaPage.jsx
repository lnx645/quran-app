/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaPrayingHands } from 'react-icons/fa';
import { DOA_HARIAN } from '../../data/sources/doaData.js';
import { Page, PageTitle, PageSubtitle, Card, SectionTitle } from '../components/common.jsx';

const KartuDoa = styled(Card)`
  .judul {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 17px;
    color: ${({ theme }) => theme.colors.judul};
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 27px;
    line-height: 2;
    text-align: right;
    direction: rtl;
  }
  .latin {
    font-style: italic;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 8px;
  }
  .arti {
    font-size: 14.5px;
    margin-top: 4px;
  }
`;

export default function DoaPage() {
  return (
    <Page>
      <PageTitle>
        <FaPrayingHands /> Doa Harian
      </PageTitle>
      <PageSubtitle>{DOA_HARIAN.length} doa keseharian dengan Arab, latin, dan artinya.</PageSubtitle>
      <SectionTitle>Kumpulan Doa</SectionTitle>
      {DOA_HARIAN.map((d) => (
        <KartuDoa key={d.judul}>
          <div className="judul">{d.judul}</div>
          <p className="arab" lang="ar">{d.arab}</p>
          <p className="latin">{d.latin}</p>
          <p className="arti">{d.arti}</p>
        </KartuDoa>
      ))}
    </Page>
  );
}
