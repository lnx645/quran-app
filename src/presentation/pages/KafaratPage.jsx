/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaScroll, FaInfoCircle, FaBookOpen, FaListOl } from 'react-icons/fa';
import {
  KAFARAT_LIST, DISCLAIMER_KAFARAT, CATATAN_URUTAN,
} from '../../data/sources/kafaratData.js';
import { Page, PageHero, Card, SectionTitle } from '../components/common.jsx';

const NamaKartu = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.judul};
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 8px;
  svg {
    color: ${({ theme }) => theme.colors.gold};
    flex-shrink: 0;
  }
`;

const Sebab = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

const SumberChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  min-height: 32px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.judul};
  border: 1px solid ${({ theme }) => theme.colors.primarySoft};
`;

const Urutan = styled.ol`
  list-style: none;
  margin: 0 0 12px;
  padding: 0;
  display: grid;
  gap: 10px;
`;

const Langkah = styled.li`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text};
  .nomor {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradients.gold};
    color: ${({ theme }) => theme.colors.primaryDeep};
    font-size: 13px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
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

export default function KafaratPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaScroll /> Kafarat
        </h2>
        <p>
          Kafarat adalah tebusan syariat untuk pelanggaran tertentu. Setiap jenis punya sebab dan
          urutan pilihan yang telah ditetapkan dalil.
        </p>
      </PageHero>

      <Card>
        <Catatan>
          <FaListOl /> {CATATAN_URUTAN}
        </Catatan>
      </Card>

      <SectionTitle>
        <FaBookOpen /> Jenis-Jenis Kafarat
      </SectionTitle>

      {KAFARAT_LIST.map((k) => (
        <Card key={k.id}>
          <NamaKartu>
            <FaScroll /> {k.nama}
          </NamaKartu>
          <Sebab>{k.sebab}</Sebab>
          <Urutan aria-label={`Urutan kafarat ${k.nama}`}>
            {k.urutan.map((langkah, i) => (
              <Langkah key={i}>
                <span className="nomor">{i + 1}</span>
                <span>{langkah}</span>
              </Langkah>
            ))}
          </Urutan>
          <SumberChip>
            <FaBookOpen /> {k.sumber}
          </SumberChip>
        </Card>
      ))}

      <Card css={(t) => ({ fontSize: 13.5, color: t.colors.muted })}>
        <Catatan>
          <FaInfoCircle /> {DISCLAIMER_KAFARAT}
        </Catatan>
      </Card>
    </Page>
  );
}
