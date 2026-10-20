/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaPrayingHands, FaCheckCircle, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { Page, PageHero, Card, SectionTitle } from '../components/common.jsx';
import {
  SHOLAT_JENAZAH,
  DISCLAIMER_PANDUAN,
} from '../../data/sources/sholatSunnahData.js';

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 24px;
  line-height: 2;
  direction: rtl;
  text-align: right;
  margin: 6px 0 10px;
`;

const Latin = styled.p`
  font-style: italic;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 8px;
`;

const Arti = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
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

const Step = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.primary};
  }
  .c {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.6;
  }
`;

const JudulTakbir = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  margin-bottom: 6px;
  .no {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradients.header};
    color: ${({ theme }) => theme.colors.goldLight};
    font-size: 14px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const Desc = styled.p`
  font-size: 13.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 10px;
`;

export default function SholatJenazahPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaPrayingHands /> Sholat Jenazah
        </h2>
        <p>
          Sholat fardhu kifayah untuk jenazah muslim: empat takbir tanpa rukuk dan sujud,
          beserta bacaan di setiap takbirnya.
        </p>
      </PageHero>

      <SectionTitle>Syarat Ringkas</SectionTitle>
      <Card>
        {SHOLAT_JENAZAH.syarat.map((s, i) => (
          <Step key={i}>
            <FaCheckCircle />
            <div>
              <div className="c">{s}</div>
            </div>
          </Step>
        ))}
        <Catatan css={{ marginTop: 10 }}>
          <FaMapMarkerAlt /> <span>{SHOLAT_JENAZAH.posisiImam}</span>
        </Catatan>
      </Card>

      <SectionTitle>Empat Takbir &amp; Bacaannya</SectionTitle>
      {SHOLAT_JENAZAH.langkah.map((l) => (
        <Card key={l.takbir}>
          <JudulTakbir>
            <span className="no">{l.takbir}</span>
            <span>{l.judul}</span>
          </JudulTakbir>
          <Desc>{l.desc}</Desc>
          <Arab lang="ar">{l.bacaan.arab}</Arab>
          <Latin>{l.bacaan.latin}</Latin>
          <Arti>&ldquo;{l.bacaan.arti}&rdquo;</Arti>
          {l.catatanPerempuan && (
            <Catatan css={{ marginTop: 10 }}>
              <FaInfoCircle /> <span><strong>Bila jenazah perempuan: </strong>{l.catatanPerempuan}</span>
            </Catatan>
          )}
        </Card>
      ))}

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_PANDUAN}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
