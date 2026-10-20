/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaHandshake, FaInfoCircle, FaBookOpen, FaCheckCircle, FaCoins,
} from 'react-icons/fa';
import {
  MUAMALAH_BAGIAN, PENGANTAR_MUAMALAH, DISCLAIMER_MUAMALAH,
} from '../../data/sources/muamalahData.js';
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

const Pengertian = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
  margin-bottom: 12px;
`;

const JudulKartu = styled.h3`
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

export default function MuamalahPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaHandshake /> Fikih Muamalah
        </h2>
        <p>
          Ringkasan edukasi riba, utang-piutang, jual beli, gadai, dan upah —
          agar bermuamalah dengan harta secara halal dan adil.
        </p>
      </PageHero>

      <Card>
        <Pengertian>{PENGANTAR_MUAMALAH}</Pengertian>
        <Catatan>
          <FaInfoCircle /> <span>Label: ringkasan edukasi. Dalil dikutip ringkas; baca ayat lengkapnya pada mushaf atau aplikasi Al-Qur&rsquo;an.</span>
        </Catatan>
      </Card>

      {MUAMALAH_BAGIAN.map((bagian, idx) => (
        <div key={bagian.id}>
          <SectionTitle>
            <FaCoins /> {bagian.judul}
          </SectionTitle>
          <Card>
            <JudulKartu>
              <NomorMedali nomor={idx + 1} ukuran={34} /> {bagian.judul}
            </JudulKartu>
            <Pengertian>{bagian.pengertian}</Pengertian>
            {bagian.poin.map((p) => (
              <Step key={p.judul}>
                <FaCheckCircle />
                <div>
                  <div className="t">{p.judul}</div>
                  <div className="c">{p.desc}</div>
                </div>
              </Step>
            ))}
          </Card>
          {bagian.dalil && (
            <GoldCard>
              <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
                <FaBookOpen /> Dalil Ringkas
              </p>
              <Arab lang="ar">{bagian.dalil.arab}</Arab>
              <Arti>&ldquo;{bagian.dalil.arti}&rdquo;</Arti>
              <Sumber>{bagian.dalil.sumber}</Sumber>
            </GoldCard>
          )}
        </div>
      ))}

      <Card css={(t) => ({ fontSize: 13.5, color: t.colors.muted })}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_MUAMALAH}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
