/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaBookOpen, FaHandHoldingHeart, FaInfoCircle, FaMoon } from 'react-icons/fa';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import {
  SUJUD_SAHWI,
  SUJUD_SYUKUR,
  SUJUD_TILAWAH,
  BACAAN_SUJUD_TILAWAH,
} from '../../data/sources/sujudData.js';

/**
 * Halaman Panduan Sujud: sujud tilawah (ayat sajdah ۩), sujud sahwi
 * (koreksi lupa dalam sholat), dan sujud syukur. Teks + kartu bernomor
 * saja — tanpa ilustrasi figur (keputusan pemilik).
 */

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

const Par = styled.p`
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 10px;
`;

const Sub = styled.h4`
  font-size: 14px;
  margin: 14px 0 6px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Daftar = styled.ul`
  margin: 0 0 6px;
  padding-left: 18px;
  li {
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 6px;
  }
`;

const Langkah = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 14px;
    line-height: 1.7;
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

function KartuBacaan({ label, bacaan }) {
  return (
    <GoldCard css={{ marginTop: 12 }}>
      <Sub css={{ marginTop: 0 }}>{label}</Sub>
      <Arab lang="ar">{bacaan.arab}</Arab>
      <Latin>{bacaan.latin}</Latin>
      <Arti>&ldquo;{bacaan.arti}&rdquo;</Arti>
    </GoldCard>
  );
}

function SeksiSujud({ ikon, data, anakEkstra }) {
  return (
    <Card>
      <h3
        css={(t) => ({
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          fontSize: t.type.h3.size,
          color: t.colors.judul,
          marginBottom: 8,
        })}
      >
        {ikon} {data.nama}
      </h3>
      <Par>{data.ringkas}</Par>
      {data.sebab && (
        <>
          <Sub>Sebab / Kapan Dilakukan</Sub>
          <Daftar>
            {data.sebab.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </Daftar>
        </>
      )}
      <Sub>Tata Cara</Sub>
      <Langkah>
        {data.cara.map((langkah, i) => (
          <li key={i}>
            <NomorMedali nomor={i + 1} ukuran={34} />
            <span>{langkah}</span>
          </li>
        ))}
      </Langkah>
      {anakEkstra}
      {data.catatan && (
        <Catatan css={{ marginTop: 12 }}>
          <FaInfoCircle aria-hidden="true" /> <span>{data.catatan}</span>
        </Catatan>
      )}
    </Card>
  );
}

export default function SujudPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaMoon /> Panduan Sujud
        </h2>
        <p>
          Tiga sujud istimewa di luar rukun sholat biasa: sujud tilawah saat menjumpai ayat
          sajdah ۩, sujud sahwi untuk mengoreksi lupa dalam sholat, dan sujud syukur atas
          nikmat yang diterima.
        </p>
      </PageHero>

      <SectionTitle>Sujud Tilawah — Ayat Sajdah</SectionTitle>
      <SeksiSujud
        ikon={<FaBookOpen aria-hidden="true" />}
        data={SUJUD_TILAWAH}
        anakEkstra={<KartuBacaan label="Bacaan sujud tilawah" bacaan={BACAAN_SUJUD_TILAWAH} />}
      />

      <SectionTitle>Sujud Sahwi — Lupa dalam Sholat</SectionTitle>
      <SeksiSujud
        ikon={<FaMoon aria-hidden="true" />}
        data={SUJUD_SAHWI}
        anakEkstra={<KartuBacaan label={SUJUD_SAHWI.bacaan.label} bacaan={SUJUD_SAHWI.bacaan} />}
      />

      <SectionTitle>Sujud Syukur — Terima Kasih atas Nikmat</SectionTitle>
      <SeksiSujud ikon={<FaHandHoldingHeart aria-hidden="true" />} data={SUJUD_SYUKUR} />

      <Card css={{ marginTop: 18 }}>
        <Catatan>
          <FaInfoCircle aria-hidden="true" />{' '}
          <span>
            Panduan ini ringkasan fikih yang masyhur diamalkan di Indonesia (madzhab
            Syafi&rsquo;i). Perbedaan pendapat antar ulama dalam rincian sujud-sujud ini
            adalah hal yang wajar — untuk kasus khusus, ikuti bimbingan guru atau ulama
            yang Anda percaya.
          </span>
        </Catatan>
      </Card>
    </Page>
  );
}
