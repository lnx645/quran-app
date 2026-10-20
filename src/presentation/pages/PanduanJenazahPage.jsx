/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaHeart, FaHandsWash, FaLayerGroup, FaPrayingHands, FaCheckCircle,
  FaInfoCircle, FaArrowRight, FaMonument,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, SectionTitle, PrimaryButton,
} from '../components/common.jsx';
import { JENAZAH, DISCLAIMER_JENAZAH } from '../../data/sources/jenazahData.js';

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg { flex-shrink: 0; margin-top: 3px; }
`;

const Baris = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child { border-bottom: none; }
  svg { flex-shrink: 0; margin-top: 3px; color: ${({ theme }) => theme.colors.primary}; }
  .c { font-size: 13.5px; line-height: 1.6; }
`;

const Paragraf = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
  margin-bottom: 8px;
`;

const IKON_TAHAP = {
  1: <FaHandsWash aria-hidden="true" />,
  2: <FaLayerGroup aria-hidden="true" />,
  3: <FaPrayingHands aria-hidden="true" />,
  4: <FaMonument aria-hidden="true" />,
};

export default function PanduanJenazahPage() {
  return (
    <Page>
      <PageHero>
        <h2><FaPrayingHands /> Panduan Penyelenggaraan Jenazah</h2>
        <p>
          Fardhu kifayah merawat jenazah muslim: dari saat sakaratulmaut, memandikan,
          mengkafani, menyolatkan, hingga menguburkan.
        </p>
      </PageHero>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_JENAZAH}</span>
        </Catatan>
      </Card>

      <SectionTitle><FaHeart /> {JENAZAH.sebelum.judul}</SectionTitle>
      <Card>
        {JENAZAH.sebelum.daftar.map((s) => (
          <Baris key={s}>
            <FaCheckCircle />
            <div className="c">{s}</div>
          </Baris>
        ))}
      </Card>

      {JENAZAH.tahap.map((t) => (
        <div key={t.nomor}>
          <SectionTitle>
            {IKON_TAHAP[t.nomor]} Tahap {t.nomor}: {t.judul}
          </SectionTitle>
          <Card>
            <Paragraf>{t.ringkas}</Paragraf>
            {t.poin.map((p) => (
              <Baris key={p}>
                <FaCheckCircle />
                <div className="c">{p}</div>
              </Baris>
            ))}
            {t.tautan && (
              <Link
                to={t.tautan.ke}
                css={{ display: 'inline-block', width: '100%', marginTop: 14 }}
              >
                <PrimaryButton type="button" css={{ width: '100%' }}>
                  {t.tautan.label} <FaArrowRight />
                </PrimaryButton>
              </Link>
            )}
          </Card>
        </div>
      ))}

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_JENAZAH}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
