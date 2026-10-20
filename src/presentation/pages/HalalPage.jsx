/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaUtensils, FaInfoCircle, FaBookOpen, FaCheckCircle, FaBan,
  FaQuestionCircle, FaPrayingHands, FaListOl,
} from 'react-icons/fa';
import {
  MAKANAN_HARAM, SEMBELIHAN, RAGU_DARURAT, ADAB_MAKAN,
  DALIL_TIDAK_BERLEBIHAN, DOA_SESUDAH_MAKAN, DISCLAIMER_HALAL,
} from '../../data/sources/halalData.js';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 23px;
  line-height: 2;
  direction: rtl;
  text-align: right;
  margin-bottom: 10px;
`;

const Latin = styled.p`
  font-style: italic;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 8px;
`;

const Arti = styled.p`
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 6px;
`;

const Sumber = styled.p`
  font-size: 12.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
`;

const Paragraf = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
`;

const Step = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child { border-bottom: none; }
  svg { flex-shrink: 0; margin-top: 3px; color: ${({ theme }) => theme.colors.primary}; }
  > div { flex: 1; min-width: 0; }
  .t { font-size: 14px; font-weight: 700; overflow-wrap: break-word; }
  .c { font-size: 13px; color: ${({ theme }) => theme.colors.muted}; line-height: 1.6; margin-top: 3px; overflow-wrap: break-word; }
`;

const BarisNomor = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child { border-bottom: none; }
  span.teks { font-size: 14px; line-height: 1.7; flex: 1; min-width: 0; }
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg { flex-shrink: 0; margin-top: 3px; }
`;

export default function HalalPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaUtensils /> Makanan Halal &amp; Adab Makan
        </h2>
        <p>
          Ringkasan edukasi makanan yang diharamkan, ketentuan sembelihan,
          sikap terhadap yang diragukan dan darurat, serta adab makan.
        </p>
      </PageHero>

      <SectionTitle>
        <FaBan /> Makanan &amp; Minuman yang Diharamkan
      </SectionTitle>
      <Card>
        <Paragraf css={{ marginBottom: 8 }}>{MAKANAN_HARAM.pengertian}</Paragraf>
        {MAKANAN_HARAM.daftar.map((m) => (
          <Step key={m.judul}>
            <FaBan />
            <div>
              <div className="t">{m.judul}</div>
              <div className="c">{m.desc}</div>
            </div>
          </Step>
        ))}
      </Card>
      <GoldCard>
        <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
          <FaBookOpen /> Dalil Ringkas
        </p>
        <Arab lang="ar">{MAKANAN_HARAM.dalil.arab}</Arab>
        <Arti>&ldquo;{MAKANAN_HARAM.dalil.arti}&rdquo;</Arti>
        <Sumber>{MAKANAN_HARAM.dalil.sumber}</Sumber>
      </GoldCard>

      <SectionTitle>
        <FaCheckCircle /> Sembelihan (Dzabihah)
      </SectionTitle>
      <Card>
        <Paragraf css={{ marginBottom: 8 }}>{SEMBELIHAN.pengertian}</Paragraf>
        {SEMBELIHAN.syarat.map((s, i) => (
          <Step key={s.judul}>
            <NomorMedali nomor={i + 1} ukuran={30} />
            <div>
              <div className="t">{s.judul}</div>
              <div className="c">{s.desc}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle>
        <FaQuestionCircle /> Yang Diragukan &amp; Keadaan Darurat
      </SectionTitle>
      <Card>
        {RAGU_DARURAT.poin.map((p) => (
          <Step key={p.judul}>
            <FaQuestionCircle />
            <div>
              <div className="t">{p.judul}</div>
              <div className="c">{p.desc}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle>
        <FaListOl /> Adab Makan
      </SectionTitle>
      <Card>
        {ADAB_MAKAN.map((adab, i) => (
          <BarisNomor key={i}>
            <NomorMedali nomor={i + 1} ukuran={30} />
            <span className="teks">{adab}</span>
          </BarisNomor>
        ))}
      </Card>
      <GoldCard>
        <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
          <FaBookOpen /> Tidak Berlebihan
        </p>
        <Arab lang="ar">{DALIL_TIDAK_BERLEBIHAN.arab}</Arab>
        <Arti>{DALIL_TIDAK_BERLEBIHAN.arti}</Arti>
        <Sumber>{DALIL_TIDAK_BERLEBIHAN.sumber}</Sumber>
      </GoldCard>

      <SectionTitle>
        <FaPrayingHands /> Doa Sesudah Makan
      </SectionTitle>
      <GoldCard>
        <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{DOA_SESUDAH_MAKAN.judul}</p>
        <Arab lang="ar">{DOA_SESUDAH_MAKAN.arab}</Arab>
        <Latin>{DOA_SESUDAH_MAKAN.latin}</Latin>
        <Arti>&ldquo;{DOA_SESUDAH_MAKAN.arti}&rdquo;</Arti>
        <Catatan css={{ marginTop: 10 }}>
          <FaInfoCircle /> <span>{DOA_SESUDAH_MAKAN.keterangan}</span>
        </Catatan>
      </GoldCard>

      <Card css={(t) => ({ fontSize: 13.5, color: t.colors.muted })}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_HALAL}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
