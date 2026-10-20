/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import {
  FaMoon,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaLayerGroup,
  FaStar,
  FaInfoCircle,
} from 'react-icons/fa';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';
import { SHOLAT_SUNNAH, DISCLAIMER_PANDUAN } from '../../data/sources/sholatSunnahData.js';

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 24px;
  line-height: 2;
  direction: rtl;
  text-align: right;
  margin: 6px 0 10px;
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
  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

const KepalaKartu = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  padding: 0;
  min-height: 44px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  .judul {
    flex: 1;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
  }
  svg {
    color: ${({ theme }) => theme.colors.goldDeep};
    flex-shrink: 0;
  }
`;

const BarisInfo = styled.p`
  display: flex;
  gap: 8px;
  font-size: 13.5px;
  line-height: 1.65;
  margin-bottom: 10px;
  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.primary};
  }
  .lbl {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
  }
`;

const Sub = styled.h4`
  font-size: 14px;
  margin: 14px 0 4px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function SholatSunnahPage() {
  const [buka, setBuka] = useState('dhuha');

  return (
    <Page>
      <PageHero>
        <h2>
          <FaMoon /> Sholat Sunnah
        </h2>
        <p>
          Sembilan sholat sunnah yang lazim diamalkan: waktu, jumlah rakaat, keutamaan, niat,
          dan tata cara ringkasnya. Ketuk kartu untuk membuka.
        </p>
      </PageHero>

      {SHOLAT_SUNNAH.map((s) => {
        const terbuka = buka === s.id;
        return (
          <Card key={s.id}>
            <KepalaKartu
              aria-expanded={terbuka}
              aria-label={`${s.nama}${terbuka ? ' — tutup' : ' — buka rincian'}`}
              onClick={() => setBuka(terbuka ? null : s.id)}
            >
              <span className="judul">{s.nama}</span>
              {terbuka ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
            </KepalaKartu>
            {terbuka && (
              <div css={{ marginTop: 12 }}>
                <BarisInfo>
                  <FaClock aria-hidden="true" />
                  <span>
                    <span className="lbl">Waktu: </span>
                    {s.waktu}
                  </span>
                </BarisInfo>
                <BarisInfo>
                  <FaLayerGroup aria-hidden="true" />
                  <span>
                    <span className="lbl">Rakaat: </span>
                    {s.rakaat}
                  </span>
                </BarisInfo>
                <BarisInfo>
                  <FaStar aria-hidden="true" />
                  <span>
                    <span className="lbl">Keutamaan: </span>
                    {s.keutamaan}
                  </span>
                </BarisInfo>

                <Sub>Niat</Sub>
                <Arab lang="ar">{s.niat.arab}</Arab>
                <Latin>{s.niat.latin}</Latin>
                <Arti>&ldquo;{s.niat.arti}&rdquo;</Arti>

                <Sub>Tata Cara Ringkas</Sub>
                <p css={{ fontSize: 13.5, lineHeight: 1.65 }}>{s.tataCara}</p>

                {s.doaKhusus && (
                  <>
                    <Sub>{s.doaKhusus.label}</Sub>
                    <Arab lang="ar">{s.doaKhusus.arab}</Arab>
                    <Latin>{s.doaKhusus.latin}</Latin>
                    <Arti>&ldquo;{s.doaKhusus.arti}&rdquo;</Arti>
                  </>
                )}
              </div>
            )}
          </Card>
        );
      })}

      <SectionTitle>Catatan</SectionTitle>
      <GoldCard>
        <Catatan>
          <FaInfoCircle />{' '}
          <span>
            Niat letaknya di hati; lafaz niat di atas sekadar menuntun. Jumlah rakaat dan bacaan
            surah adalah anjuran yang masyhur — perbedaan kecil antar ulama adalah hal yang
            wajar, ikuti bimbingan guru atau ulama yang Anda percaya.
          </span>
        </Catatan>
      </GoldCard>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_PANDUAN}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
