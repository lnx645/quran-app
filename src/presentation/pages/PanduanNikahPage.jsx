/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaRing, FaCheckCircle, FaInfoCircle, FaListOl, FaGift, FaHandshake,
  FaPrayingHands, FaUsers, FaBookOpen,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle,
} from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import {
  DISCLAIMER_NIKAH, PENGERTIAN_NIKAH, RUKUN_NIKAH, URUTAN_NIKAH, MAHAR,
  AKAD, WALIMAH, HAK_KEWAJIBAN, DOA_PENGANTIN, DOA_MALAM_PERTAMA,
} from '../../data/sources/panduanNikahData.js';

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 24px;
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
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg { flex-shrink: 0; margin-top: 3px; }
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

function KartuLafaz({ lafaz }) {
  return (
    <GoldCard css={{ marginBottom: 12 }}>
      <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{lafaz.judul}</p>
      <Arab lang="ar">{lafaz.arab}</Arab>
      <Latin>{lafaz.latin}</Latin>
      <Arti>&ldquo;{lafaz.arti}&rdquo;</Arti>
      <Paragraf css={{ marginTop: 10 }}>{lafaz.versiIndonesia}</Paragraf>
    </GoldCard>
  );
}

function KartuDoa({ doa }) {
  return (
    <GoldCard>
      <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{doa.judul}</p>
      {doa.arab && <Arab lang="ar">{doa.arab}</Arab>}
      {doa.latin && <Latin>{doa.latin}</Latin>}
      {doa.arti && <Arti>&ldquo;{doa.arti}&rdquo;</Arti>}
      {doa.keterangan && (
        <Catatan css={{ marginTop: 12 }}>
          <FaInfoCircle /> <span>{doa.keterangan}</span>
        </Catatan>
      )}
    </GoldCard>
  );
}

function Disclaimer() {
  return (
    <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
      <Catatan>
        <FaInfoCircle /> <span>{DISCLAIMER_NIKAH}</span>
      </Catatan>
    </Card>
  );
}

export default function PanduanNikahPage() {
  return (
    <Page>
      <PageHero>
        <h2><FaRing /> Panduan Nikah</h2>
        <p>
          Syarat &amp; rukun nikah, urutan rangkaian pernikahan, mahar, contoh
          lafaz ijab-qabul, walimah, hak &amp; kewajiban suami-istri, dan doa
          pengantin.
        </p>
      </PageHero>

      <SectionTitle><FaBookOpen /> Pengertian Nikah</SectionTitle>
      <Card>
        <Paragraf>{PENGERTIAN_NIKAH}</Paragraf>
      </Card>

      <SectionTitle><FaCheckCircle /> Syarat &amp; Rukun Nikah</SectionTitle>
      <Card>
        {RUKUN_NIKAH.map((s, i) => (
          <Step key={s.judul}>
            <NomorMedali nomor={i + 1} ukuran={30} />
            <div>
              <div className="t">{s.judul}</div>
              <div className="c">{s.desc}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle><FaListOl /> Urutan Pernikahan</SectionTitle>
      <Card>
        {URUTAN_NIKAH.map((s, i) => (
          <Step key={s.judul}>
            <NomorMedali nomor={i + 1} ukuran={30} />
            <div>
              <div className="t">{s.judul}</div>
              <div className="c">{s.desc}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle><FaGift /> Mahar</SectionTitle>
      <Card>
        <Paragraf>{MAHAR.pengertian}</Paragraf>
      </Card>
      <Card>
        {MAHAR.poin.map((p) => (
          <Step key={p.judul}>
            <FaCheckCircle />
            <div>
              <div className="t">{p.judul}</div>
              <div className="c">{p.desc}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle><FaHandshake /> Akad: Contoh Lafaz Ijab-Qabul</SectionTitle>
      <Catatan css={{ marginBottom: 10 }}>
        <FaInfoCircle /> <span>{AKAD.keterangan}</span>
      </Catatan>
      <KartuLafaz lafaz={AKAD.ijab} />
      <KartuLafaz lafaz={AKAD.qabul} />

      <SectionTitle><FaUsers /> Walimah</SectionTitle>
      <Card>
        {WALIMAH.map((p) => (
          <Step key={p.judul}>
            <FaCheckCircle />
            <div>
              <div className="t">{p.judul}</div>
              <div className="c">{p.desc}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle><FaUsers /> Hak &amp; Kewajiban Suami-Istri</SectionTitle>
      <Card>
        {HAK_KEWAJIBAN.map((p) => (
          <Step key={p.pihak}>
            <FaCheckCircle />
            <div>
              <div className="t">{p.pihak}</div>
              <div className="c">{p.desc}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle><FaPrayingHands /> Doa Pengantin</SectionTitle>
      <KartuDoa doa={DOA_PENGANTIN} />

      <SectionTitle><FaPrayingHands /> Doa Malam Pertama</SectionTitle>
      <KartuDoa doa={DOA_MALAM_PERTAMA} />

      <Disclaimer />
    </Page>
  );
}
