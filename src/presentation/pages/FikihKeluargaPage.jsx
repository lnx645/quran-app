/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaUsers, FaCheckCircle, FaInfoCircle, FaListOl, FaBaby, FaCut,
  FaGraduationCap, FaHandHoldingHeart, FaPrayingHands, FaArrowRight,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, GhostButton,
} from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import {
  DISCLAIMER_KELUARGA, MENYUSUI, KHITAN, PENDIDIKAN_ANAK, NAFKAH,
} from '../../data/sources/fikihKeluargaData.js';

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

function DaftarPoin({ poin }) {
  return (
    <Card>
      {poin.map((p) => (
        <Step key={p.judul}>
          <FaCheckCircle />
          <div>
            <div className="t">{p.judul}</div>
            <div className="c">{p.desc}</div>
          </div>
        </Step>
      ))}
    </Card>
  );
}

function Disclaimer() {
  return (
    <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
      <Catatan>
        <FaInfoCircle /> <span>{DISCLAIMER_KELUARGA}</span>
      </Catatan>
    </Card>
  );
}

export default function FikihKeluargaPage() {
  return (
    <Page>
      <PageHero>
        <h2><FaUsers /> Fikih Keluarga</h2>
        <p>
          Ketentuan menyusui &amp; mahram persusuan, khitan, tahapan pendidikan
          anak sejak lahir, dan sekilas nafkah keluarga — ringkas dan hati-hati.
        </p>
      </PageHero>

      <SectionTitle><FaBaby /> Menyusui &amp; Mahram Persusuan (Radha&rsquo;ah)</SectionTitle>
      <Card>
        <Paragraf>{MENYUSUI.pengertian}</Paragraf>
      </Card>
      <DaftarPoin poin={MENYUSUI.poin} />

      <SectionTitle><FaCut /> Khitan</SectionTitle>
      <Card>
        <Paragraf>{KHITAN.pengertian}</Paragraf>
      </Card>
      <DaftarPoin poin={KHITAN.poin} />

      <SectionTitle><FaListOl /> Pendidikan Anak: Tahapan sejak Lahir</SectionTitle>
      <Card>
        {PENDIDIKAN_ANAK.tahapan.map((s, i) => (
          <Step key={s.judul}>
            <NomorMedali nomor={i + 1} ukuran={30} />
            <div>
              <div className="t">{s.judul}</div>
              <div className="c">{s.desc}</div>
            </div>
          </Step>
        ))}
      </Card>
      <GhostButton
        as={Link}
        to="/aqiqah-kurban"
        css={{ width: '100%', marginBottom: 12 }}
      >
        <FaArrowRight /> Lihat Panduan Aqiqah &amp; Kurban
      </GhostButton>

      <SectionTitle><FaPrayingHands /> Hadits Pendidikan Sholat Anak</SectionTitle>
      <GoldCard>
        <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
          {PENDIDIKAN_ANAK.haditsSholat.judul}
        </p>
        <Arab lang="ar">{PENDIDIKAN_ANAK.haditsSholat.arab}</Arab>
        <Latin>{PENDIDIKAN_ANAK.haditsSholat.latin}</Latin>
        <Arti>&ldquo;{PENDIDIKAN_ANAK.haditsSholat.arti}&rdquo;</Arti>
        <Catatan css={{ marginTop: 12 }}>
          <FaInfoCircle /> <span>{PENDIDIKAN_ANAK.haditsSholat.keterangan}</span>
        </Catatan>
      </GoldCard>

      <SectionTitle><FaHandHoldingHeart /> Nafkah Keluarga (Sekilas)</SectionTitle>
      <Card>
        <Paragraf>{NAFKAH.pengertian}</Paragraf>
      </Card>
      <DaftarPoin poin={NAFKAH.poin} />

      <SectionTitle><FaGraduationCap /> Catatan</SectionTitle>
      <Disclaimer />
    </Page>
  );
}
