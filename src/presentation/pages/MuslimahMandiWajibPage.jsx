/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { FaShower, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { Page, PageHero, Card, SectionTitle, GoldCard } from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import { MANDI_WAJIB, DISCLAIMER } from '../../data/sources/muslimahData.js';

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

export default function MuslimahMandiWajibPage() {
  const [tab, setTab] = useState('haid');
  const niat = tab === 'haid' ? MANDI_WAJIB.niat.haid : MANDI_WAJIB.niat.nifas;

  return (
    <Page>
      <PageHero>
        <h2>
          <FaShower /> Panduan Mandi Wajib
        </h2>
        <p>
          Niat, rukun, dan sunnah mandi wajib setelah haid &amp; nifas — menurut mazhab Syafi&apos;i
          (Fathul Mu&apos;in).
        </p>
      </PageHero>

      <SegmenWadah role="tablist" aria-label="Niat mandi wajib">
        <SegmenTab aktif={tab === 'haid'} onClick={() => setTab('haid')}>
          Niat setelah Haid
        </SegmenTab>
        <SegmenTab aktif={tab === 'nifas'} onClick={() => setTab('nifas')}>
          Niat setelah Nifas
        </SegmenTab>
      </SegmenWadah>

      <GoldCard>
        <h3 css={{ fontSize: 16, marginBottom: 12 }}>{niat.label}</h3>
        <Arab>{niat.arab}</Arab>
        <Latin>{niat.latin}</Latin>
        <Arti>&ldquo;{niat.arti}&rdquo;</Arti>
        <Catatan css={{ marginTop: 12 }}>
          <FaInfoCircle /> <span>{MANDI_WAJIB.niat.catatan}</span>
        </Catatan>
      </GoldCard>

      <SectionTitle>Rukun Mandi (Syafi&apos;i — hanya 2)</SectionTitle>
      <Card>
        {MANDI_WAJIB.rukun.map((r, i) => (
          <Step key={i}>
            <FaCheckCircle />
            <div>
              <div className="t">{r.judul}</div>
              <div className="c">{r.desc}</div>
            </div>
          </Step>
        ))}
        <Catatan css={{ marginTop: 10 }}>
          <FaInfoCircle />{' '}
          <span>
            Wudhu dulu, siram kepala 3&times;, mulai dari kanan — semuanya SUNNAH, bukan syarat sah.
          </span>
        </Catatan>
      </Card>

      <SectionTitle>Sunnah-sunnah Mandi (urutan praktik)</SectionTitle>
      <Card>
        {MANDI_WAJIB.sunnah.map((s, i) => (
          <Step key={i}>
            <FaCheckCircle />
            <div>
              <div className="t">{i + 1}.</div>
              <div className="c">{s}</div>
            </div>
          </Step>
        ))}
      </Card>

      <SectionTitle>Doa Setelah Mandi (sunnah)</SectionTitle>
      <GoldCard>
        <Arab>{MANDI_WAJIB.doaSetelahMandi.arab}</Arab>
        <Latin>{MANDI_WAJIB.doaSetelahMandi.latin}</Latin>
        <Arti>&ldquo;{MANDI_WAJIB.doaSetelahMandi.arti}&rdquo;</Arti>
      </GoldCard>

      <SectionTitle>Tanda Suci</SectionTitle>
      <Card>
        <p css={{ fontSize: 13.5, lineHeight: 1.65 }}>{MANDI_WAJIB.tandaSuci}</p>
      </Card>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
