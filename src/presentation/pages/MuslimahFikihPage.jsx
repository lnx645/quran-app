/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaBookOpen, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { Page, PageHero, Card, SectionTitle } from '../components/common.jsx';
import { RINGKASAN_FIKIH, MITOS_VS_HUKUM, DISCLAIMER, SUMBER_RINGKAS } from '../../data/sources/muslimahData.js';

const Baris = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .label {
    flex: 0 0 108px;
    font-size: 12.5px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .nilai {
    font-size: 13.5px;
    line-height: 1.6;
  }
`;

const MitosCard = styled(Card)`
  .mitos {
    display: flex;
    gap: 8px;
    font-size: 13.5px;
    font-weight: 700;
    line-height: 1.55;
    margin-bottom: 6px;
    svg {
      color: ${({ theme }) => theme.colors.danger};
      flex-shrink: 0;
      margin-top: 3px;
    }
  }
  .hukum {
    display: flex;
    gap: 8px;
    font-size: 13.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
    svg {
      color: ${({ theme }) => theme.colors.success};
      flex-shrink: 0;
      margin-top: 3px;
    }
  }
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

export default function MuslimahFikihPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaBookOpen /> Fikih &amp; Mitos
        </h2>
        <p>
          Ringkasan fikih haid, nifas, dan istihadah menurut mazhab Syafi&apos;i, plus tabel mitos
          vs hukum sebenarnya.
        </p>
      </PageHero>

      <SectionTitle>Haid (Syafi&apos;i)</SectionTitle>
      <Card>
        {RINGKASAN_FIKIH.haid.map((r, i) => (
          <Baris key={i}>
            <span className="label">{r.label}</span>
            <span className="nilai">{r.nilai}</span>
          </Baris>
        ))}
      </Card>

      <SectionTitle>Nifas (Syafi&apos;i)</SectionTitle>
      <Card>
        {RINGKASAN_FIKIH.nifas.map((r, i) => (
          <Baris key={i}>
            <span className="label">{r.label}</span>
            <span className="nilai">{r.nilai}</span>
          </Baris>
        ))}
      </Card>

      <SectionTitle>Istihadah</SectionTitle>
      <Card>
        {RINGKASAN_FIKIH.istihadah.map((r, i) => (
          <Baris key={i}>
            <span className="label">{r.label}</span>
            <span className="nilai">{r.nilai}</span>
          </Baris>
        ))}
      </Card>

      <SectionTitle>Larangan saat Haid/Nifas</SectionTitle>
      <Card>
        {RINGKASAN_FIKIH.larangan.map((r, i) => (
          <Baris key={i}>
            <span className="label">{r.label}</span>
            <span className="nilai">{r.nilai}</span>
          </Baris>
        ))}
      </Card>

      <SectionTitle>Mitos vs Hukum Sebenarnya</SectionTitle>
      {MITOS_VS_HUKUM.map((m, i) => (
        <MitosCard key={i}>
          <div className="mitos">
            <FaTimesCircle /> <span>Mitos: {m.mitos}</span>
          </div>
          <div className="hukum">
            <FaCheckCircle /> <span>{m.hukum}</span>
          </div>
        </MitosCard>
      ))}

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER}</span>
        </Catatan>
        <Catatan css={{ marginTop: 8 }}>
          <FaInfoCircle /> <span>{SUMBER_RINGKAS}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
