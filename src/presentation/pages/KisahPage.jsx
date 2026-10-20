/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaBook } from 'react-icons/fa';
import { KISAH_NABI } from '../../data/sources/kisahNabiData.js';
import { Page, PageTitle, PageSubtitle, MenuCard } from '../components/common.jsx';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function KisahPage() {
  return (
    <Page>
      <PageTitle>Kisah 25 Nabi</PageTitle>
      <PageSubtitle>
        Teladan para nabi &amp; rasul dalam 2–4 kalimat ringkas. Ketuk untuk membaca lengkap.
      </PageSubtitle>
      <Grid>
        {KISAH_NABI.map((k, i) => (
          <MenuCard
            key={k.slug}
            to={`/kisah/${k.slug}`}
            icon={<FaBook />}
            judul={`${i + 1}. ${k.nama}`}
            desc={k.ringkasan.slice(0, 110) + '…'}
          />
        ))}
      </Grid>
    </Page>
  );
}
