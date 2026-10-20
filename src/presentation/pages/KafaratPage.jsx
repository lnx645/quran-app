/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaScroll, FaInfoCircle, FaBookOpen, FaListOl } from 'react-icons/fa';
import {
  KAFARAT_LIST, DISCLAIMER_KAFARAT, CATATAN_URUTAN,
} from '../../data/sources/kafaratData.js';
import { Page, PageHero, Card, SectionTitle } from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';

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
                <NomorMedali nomor={i + 1} ukuran={30} />
                <span>{langkah}</span>
              </Langkah>
            ))}
          </Urutan>
          <Catatan>
            <FaBookOpen /> <strong>Sumber:</strong>&nbsp;{k.sumber}
          </Catatan>
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
