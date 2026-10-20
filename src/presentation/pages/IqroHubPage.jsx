/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaBookOpen, FaGraduationCap } from 'react-icons/fa';
import { IqroRepositoryImpl } from '../../data/repositories/IqroRepositoryImpl.js';
import {
  Page, PageTitle, PageSubtitle, MenuCard, ErrorBox, LoadingBox, Spinner,
} from '../components/common.jsx';
import OrnamentDivider from '../components/OrnamentDivider.jsx';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function IqroHubPage() {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    IqroRepositoryImpl.listJilid()
      .then(setList)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <Page>
      <PageTitle>
        <FaGraduationCap /> Belajar Iqro
      </PageTitle>
      <PageSubtitle>
        Metode Iqro dari Jilid 1 sampai 6 — mulai dari mengenal huruf hijaiyah hingga membaca
        Al-Qur&apos;an dengan tajwid dasar.
      </PageSubtitle>
      <OrnamentDivider />
      {error && <ErrorBox>{error}</ErrorBox>}
      {!list && !error && (
        <LoadingBox>
          <Spinner /> Memuat daftar jilid…
        </LoadingBox>
      )}
      {list && (
        <Grid>
          {list.map((j) => (
            <MenuCard
              key={j.jilid}
              to={`/iqro/${j.jilid}`}
              icon={<FaBookOpen />}
              judul={`Jilid ${j.jilid} — ${j.judul}`}
              desc={j.ringkasan}
            />
          ))}
        </Grid>
      )}
    </Page>
  );
}
