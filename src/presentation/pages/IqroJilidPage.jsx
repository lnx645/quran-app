/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowLeft, FaCheckCircle, FaBookOpen } from 'react-icons/fa';
import { IqroRepositoryImpl } from '../../data/repositories/IqroRepositoryImpl.js';
import {
  Page, PageTitle, PageSubtitle, Card, SectionTitle, ErrorBox, LoadingBox, Spinner, GhostButton,
} from '../components/common.jsx';

const GridHuruf = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 10px;
`;

const SelHuruf = styled.button`
  background: ${({ theme, aktif }) =>
    aktif ? theme.colors.primarySoft : theme.colors.surface};
  border: 1.5px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.primary : theme.colors.border)};
  border-radius: 14px;
  padding: 10px 4px 8px;
  text-align: center;
  transition: border-color 0.15s ease, background 0.15s ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }
  .ar {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 32px;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.primaryDeep};
  }
  .lat {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 600;
  }
`;

const PanelBesar = styled(Card)`
  text-align: center;
  border-color: ${({ theme }) => theme.colors.gold};
`;

const TigaBentuk = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Bentuk = styled.div`
  min-width: 92px;
  padding: 14px 10px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  .ar {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 52px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.primaryDeep};
  }
  .lbl {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 600;
  }
`;

const BarisBaca = styled.div`
  display: flex;
  direction: rtl;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 6px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 34px;
  color: ${({ theme }) => theme.colors.text};
  &:last-child {
    border-bottom: none;
  }
`;

const Topik = styled.li`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 8px 0;
  font-size: 15px;
  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 4px;
    flex-shrink: 0;
  }
`;

export default function IqroJilidPage() {
  const { jilid } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [pilihan, setPilihan] = useState(1); // index huruf terpilih (Ba)

  useEffect(() => {
    setData(null);
    IqroRepositoryImpl.getJilid(jilid)
      .then(setData)
      .catch((e) => setError(e.message));
  }, [jilid]);

  if (error) {
    return (
      <Page>
        <ErrorBox>{error}</ErrorBox>
      </Page>
    );
  }
  if (!data) {
    return (
      <Page>
        <LoadingBox>
          <Spinner /> Memuat jilid…
        </LoadingBox>
      </Page>
    );
  }

  const huruf = data.huruf?.[pilihan];

  return (
    <Page>
      <Link to="/iqro">
        <GhostButton>
          <FaArrowLeft /> Semua Jilid
        </GhostButton>
      </Link>
      <PageTitle css={{ marginTop: 14 }}>
        Iqro Jilid {data.jilid}
      </PageTitle>
      <PageSubtitle>
        <b>{data.judul}.</b> {data.ringkasan}
      </PageSubtitle>

      {data.huruf && (
        <>
          <SectionTitle>
            <FaBookOpen /> 28 Huruf Hijaiyah — ketuk untuk melihat harakatnya
          </SectionTitle>
          <GridHuruf>
            {data.huruf.map((h, i) => (
              <SelHuruf key={h.arab} aktif={i === pilihan} onClick={() => setPilihan(i)}>
                <div className="ar">{h.arab}</div>
                <div className="lat">{h.latin}</div>
              </SelHuruf>
            ))}
          </GridHuruf>

          {huruf && (
            <PanelBesar css={{ marginTop: 16 }}>
              <div css={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Huruf {huruf.latin}
              </div>
              <TigaBentuk>
                <Bentuk>
                  <div className="ar">{huruf.fathah}</div>
                  <div className="lbl">Fathah</div>
                </Bentuk>
                <Bentuk>
                  <div className="ar">{huruf.kasrah}</div>
                  <div className="lbl">Kasrah</div>
                </Bentuk>
                <Bentuk>
                  <div className="ar">{huruf.dhammah}</div>
                  <div className="lbl">Dhammah</div>
                </Bentuk>
              </TigaBentuk>
            </PanelBesar>
          )}

          {data.contohBacaan && (
            <>
              <SectionTitle>Contoh Bacaan (Fathah)</SectionTitle>
              <Card>
                {data.contohBacaan.map((baris, i) => (
                  <BarisBaca key={i}>
                    {baris.map((sel, j) => (
                      <span key={j}>{sel}</span>
                    ))}
                  </BarisBaca>
                ))}
              </Card>
            </>
          )}
        </>
      )}

      <SectionTitle>Materi Jilid Ini</SectionTitle>
      <Card>
        <ul css={{ listStyle: 'none' }}>
          {data.topik.map((t) => (
            <Topik key={t}>
              <FaCheckCircle /> <span>{t}</span>
            </Topik>
          ))}
        </ul>
      </Card>
    </Page>
  );
}
