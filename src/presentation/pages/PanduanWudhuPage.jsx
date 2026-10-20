/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import {
  FaHandsWash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaHandSparkles,
} from 'react-icons/fa';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import { WUDHU, TAYAMMUM, DISCLAIMER_PANDUAN } from '../../data/sources/panduanBersuciData.js';

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
  .t {
    font-size: 14px;
    font-weight: 700;
  }
  .c {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.6;
    margin-top: 3px;
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




const JudulLangkah = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15.5px;
  margin-bottom: 6px;
`;

const DescLangkah = styled.p`
  font-size: 13.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function PanduanWudhuPage() {
  const [tab, setTab] = useState('wudhu'); // wudhu | tayammum

  return (
    <Page>
      <PageHero>
        <h2>
          <FaHandsWash /> Panduan Wudhu &amp; Tayammum
        </h2>
        <p>
          Langkah-langkah bersuci sebelum sholat: wudhu dengan air, dan tayammum sebagai
          penggantinya saat air tidak tersedia.
        </p>
      </PageHero>

      <SegmenWadah role="tablist" aria-label="Jenis bersuci">
        <SegmenTab aktif={tab === 'wudhu'} onClick={() => setTab('wudhu')}>
          <FaHandsWash /> Wudhu
        </SegmenTab>
        <SegmenTab aktif={tab === 'tayammum'} onClick={() => setTab('tayammum')}>
          <FaHandSparkles /> Tayammum
        </SegmenTab>
      </SegmenWadah>

      {tab === 'wudhu' ? (
        <>
          <SectionTitle>Langkah-langkah Wudhu</SectionTitle>
          <Card>
            <figure css={{ margin: 0 }}>
              <img
                src="/ilustrasi/wudhu-praktik.jpg"
                alt="Suasana tempat wudhu di Masjid Süleymaniye, Istanbul: beberapa orang berwudhu di pancuran marmer sebelum sholat"
                loading="lazy"
                css={(t) => ({
                  width: '100%',
                  height: 'auto',
                  borderRadius: 12,
                  border: `1px solid ${t.colors.border}`,
                  display: 'block',
                })}
              />
              <figcaption
                css={(t) => ({ fontSize: 13, lineHeight: 1.6, color: t.colors.muted, marginTop: 8 })}
              >
                Tempat wudhu di Masjid Süleymaniye, Istanbul — berwudhu adalah gerbang sebelum
                sholat. Foto: np&amp;djjewell via Wikimedia Commons (CC BY 2.0).
              </figcaption>
            </figure>
          </Card>
          {WUDHU.langkah.map((s, i) => (
            <Card key={i}>
              <JudulLangkah>
                <NomorMedali nomor={i + 1} ukuran={30} />
                <span>{s.judul}</span>
              </JudulLangkah>
              <DescLangkah>{s.desc}</DescLangkah>
            </Card>
          ))}

          <SectionTitle>Hal yang Membatalkan Wudhu</SectionTitle>
          <Card>
            {WUDHU.pembatal.map((p, i) => (
              <Step key={i}>
                <FaExclamationTriangle />
                <div>
                  <div className="c">{p}</div>
                </div>
              </Step>
            ))}
          </Card>

          <SectionTitle>Doa Sesudah Wudhu</SectionTitle>
          <GoldCard>
            <Arab>{WUDHU.doaSesudah.arab}</Arab>
            <Latin>{WUDHU.doaSesudah.latin}</Latin>
            <Arti>&ldquo;{WUDHU.doaSesudah.arti}&rdquo;</Arti>
          </GoldCard>
        </>
      ) : (
        <>
          <SectionTitle>Syarat Tayammum</SectionTitle>
          <Card>
            {TAYAMMUM.syarat.map((s, i) => (
              <Step key={i}>
                <FaCheckCircle />
                <div>
                  <div className="c">{s}</div>
                </div>
              </Step>
            ))}
          </Card>

          <SectionTitle>Langkah-langkah Tayammum</SectionTitle>
          <Card>
            {TAYAMMUM.langkah.map((s, i) => (
              <Step key={i}>
                <NomorMedali nomor={i + 1} ukuran={30} />
                <div>
                  <div className="t">{s.judul}</div>
                  <div className="c">{s.desc}</div>
                </div>
              </Step>
            ))}
          </Card>

          <Card>
            <Catatan>
              <FaInfoCircle /> <span>{TAYAMMUM.catatan}</span>
            </Catatan>
          </Card>

          <SectionTitle>Doa Setelah Tayammum</SectionTitle>
          <GoldCard>
            <Arab>{TAYAMMUM.doaSesudah.arab}</Arab>
            <Latin>{TAYAMMUM.doaSesudah.latin}</Latin>
            <Arti>&ldquo;{TAYAMMUM.doaSesudah.arti}&rdquo;</Arti>
            <Catatan css={{ marginTop: 12 }}>
              <FaInfoCircle /> <span>{TAYAMMUM.doaSesudah.keterangan}</span>
            </Catatan>
          </GoldCard>
        </>
      )}

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_PANDUAN}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
