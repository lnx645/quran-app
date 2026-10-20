/** @jsxImportSource @emotion/react */
import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowLeft } from 'react-icons/fa';
import { KISAH_NABI } from '../../data/sources/kisahNabiData.js';
import { Page, Card, GhostButton, ErrorBox } from '../components/common.jsx';
import OrnamentDivider from '../components/OrnamentDivider.jsx';

const ArabBesar = styled.div`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 54px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryDeep};
  line-height: 1.5;
`;

const Isi = styled.p`
  font-size: 16.5px;
  line-height: 1.9;
`;

export default function KisahDetailPage() {
  const { slug } = useParams();
  const nabi = KISAH_NABI.find((k) => k.slug === slug);
  const idx = KISAH_NABI.indexOf(nabi);

  if (!nabi) {
    return (
      <Page>
        <ErrorBox>Kisah tidak ditemukan.</ErrorBox>
      </Page>
    );
  }

  return (
    <Page>
      <Link to="/kisah">
        <GhostButton>
          <FaArrowLeft /> Daftar Nabi
        </GhostButton>
      </Link>
      <h1
        css={{ fontFamily: "'Playfair Display', serif", fontSize: 26, margin: '14px 0 2px' }}
      >
        {idx + 1}. {nabi.nama}
      </h1>
      <Card css={{ marginTop: 12 }}>
        <ArabBesar lang="ar">{nabi.arab}</ArabBesar>
        <OrnamentDivider />
        <Isi>{nabi.ringkasan}</Isi>
      </Card>
    </Page>
  );
}
