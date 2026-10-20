/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaHandHoldingHeart, FaScroll, FaInfoCircle, FaBookOpen, FaCheckCircle,
  FaExclamationTriangle, FaListOl,
} from 'react-icons/fa';
import {
  WAKAF, WASIAT, DISCLAIMER_WAKAF_WASIAT,
} from '../../data/sources/wakafWasiatData.js';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 22px;
  line-height: 2;
  direction: rtl;
  text-align: right;
  margin-bottom: 10px;
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

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg { flex-shrink: 0; margin-top: 3px; }
`;

const ContohBlok = styled.div`
  display: grid;
  gap: 10px;
  p { font-size: 14px; line-height: 1.75; }
  p.label-contoh {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.danger};
    font-size: 13px;
    letter-spacing: 0.2px;
  }
`;

export default function WakafWasiatPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaHandHoldingHeart /> Wakaf &amp; Wasiat
        </h2>
        <p>
          Ringkasan edukasi wakaf sebagai sedekah jariyah dan wasiat harta
          dengan batas sepertiga — lengkap dengan contoh redaksi edukatif.
        </p>
      </PageHero>

      <SectionTitle>
        <FaHandHoldingHeart /> Wakaf
      </SectionTitle>
      <Card>
        <Paragraf>{WAKAF.pengertian}</Paragraf>
      </Card>

      <SectionTitle>
        <FaListOl /> Rukun &amp; Unsur Wakaf
      </SectionTitle>
      <Card>
        {WAKAF.rukun.map((r, i) => (
          <Step key={r.judul}>
            <NomorMedali nomor={i + 1} ukuran={30} />
            <div>
              <div className="t">{r.judul}</div>
              <div className="c">{r.desc}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle>
        <FaCheckCircle /> Jenis-Jenis Wakaf
      </SectionTitle>
      <Card>
        {WAKAF.jenis.map((j) => (
          <Step key={j.judul}>
            <FaCheckCircle />
            <div>
              <div className="t">{j.judul}</div>
              <div className="c">{j.desc}</div>
            </div>
          </Step>
        ))}
        <Catatan css={{ marginTop: 10 }}>
          <FaInfoCircle /> <span>{WAKAF.catatan}</span>
        </Catatan>
      </Card>

      <GoldCard>
        <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
          <FaBookOpen /> Pahala Jariyah
        </p>
        <Arab lang="ar">{WAKAF.dalil.arab}</Arab>
        <Arti>&ldquo;{WAKAF.dalil.arti}&rdquo;</Arti>
        <Sumber>{WAKAF.dalil.sumber}</Sumber>
      </GoldCard>

      <SectionTitle>
        <FaScroll /> Wasiat
      </SectionTitle>
      <Card>
        <Paragraf>{WASIAT.pengertian}</Paragraf>
        {WASIAT.poin.map((p) => (
          <Step key={p.judul}>
            <FaCheckCircle />
            <div>
              <div className="t">{p.judul}</div>
              <div className="c">{p.desc}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle>
        <FaScroll /> Contoh Redaksi Wasiat (Edukatif)
      </SectionTitle>
      <GoldCard>
        <ContohBlok>
          <p className="label-contoh">{WASIAT.contohRedaksi[0]}</p>
          <p>{WASIAT.contohRedaksi[1]}</p>
          <p>{WASIAT.contohRedaksi[2]}</p>
        </ContohBlok>
        <Catatan css={{ marginTop: 12 }}>
          <FaExclamationTriangle /> <span>{WASIAT.catatan}</span>
        </Catatan>
      </GoldCard>

      <Card css={(t) => ({ fontSize: 13.5, color: t.colors.muted })}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_WAKAF_WASIAT}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
