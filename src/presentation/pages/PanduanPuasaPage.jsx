/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaMoon,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaBookOpen,
  FaSun,
  FaHeart,
  FaHandsHelping,
  FaListOl,
} from 'react-icons/fa';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import { PANDUAN_PUASA, NIAT_DOA, DISCLAIMER_PUASA } from '../../data/sources/puasaData.js';

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

const Paragraf = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
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

const Baris = styled.div`
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
  .c {
    font-size: 13.5px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }
`;


function DaftarBernomor({ daftar }) {
  return (
    <Card>
      {daftar.map((item, i) => (
        <Baris key={i}>
          <NomorMedali nomor={i + 1} ukuran={30} />
          <div className="c">{item}</div>
        </Baris>
      ))}
    </Card>
  );
}

function DaftarCek({ daftar, ikon = <FaCheckCircle /> }) {
  return (
    <Card>
      {daftar.map((item, i) => (
        <Baris key={i}>
          {ikon}
          <div className="c">{item}</div>
        </Baris>
      ))}
    </Card>
  );
}

export default function PanduanPuasaPage() {
  const bab = PANDUAN_PUASA;

  return (
    <Page>
      <PageHero>
        <h2>
          <FaMoon /> Panduan Puasa
        </h2>
        <p>
          Niat dan doa berbuka, syarat, rukun, hal yang membatalkan, keringanan, dan
          keutamaan puasa Ramadhan serta puasa sunnah.
        </p>
      </PageHero>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_PUASA}</span>
        </Catatan>
      </Card>

      <SectionTitle>
        <FaBookOpen /> Niat &amp; Doa Berbuka
      </SectionTitle>
      {NIAT_DOA.map((d) => (
        <div key={d.judul}>
          <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{d.judul}</p>
          <GoldCard>
            <Arab>{d.arab}</Arab>
            <Latin>{d.latin}</Latin>
            <Arti>&ldquo;{d.arti}&rdquo;</Arti>
            {d.keterangan ? (
              <Catatan css={{ marginTop: 12 }}>
                <FaInfoCircle /> <span>{d.keterangan}</span>
              </Catatan>
            ) : null}
          </GoldCard>
        </div>
      ))}

      <SectionTitle>
        <FaInfoCircle /> {bab.pengertian.judul}
      </SectionTitle>
      <Card>
        <Paragraf>{bab.pengertian.isi}</Paragraf>
      </Card>

      <SectionTitle>
        <FaCheckCircle /> {bab.syaratWajib.judul}
      </SectionTitle>
      <DaftarCek daftar={bab.syaratWajib.daftar} />

      <SectionTitle>
        <FaListOl /> {bab.rukun.judul}
      </SectionTitle>
      <DaftarBernomor daftar={bab.rukun.daftar} />

      <SectionTitle>
        <FaExclamationTriangle /> {bab.pembatal.judul}
      </SectionTitle>
      <DaftarCek daftar={bab.pembatal.daftar} ikon={<FaExclamationTriangle />} />

      <SectionTitle>
        <FaCheckCircle /> {bab.tidakMembatalkan.judul}
      </SectionTitle>
      <DaftarCek daftar={bab.tidakMembatalkan.daftar} />

      <SectionTitle>
        <FaHandsHelping /> {bab.keringanan.judul}
      </SectionTitle>
      <DaftarCek daftar={bab.keringanan.daftar} />
      <Card>
        <Catatan>
          <FaInfoCircle /> <span>{bab.keringanan.catatan}</span>
        </Catatan>
      </Card>

      <SectionTitle>
        <FaHeart /> {bab.keutamaan.judul}
      </SectionTitle>
      <DaftarCek daftar={bab.keutamaan.daftar} ikon={<FaHeart />} />

      <SectionTitle>
        <FaSun /> {bab.puasaSunnah.judul}
      </SectionTitle>
      <DaftarCek daftar={bab.puasaSunnah.daftar} ikon={<FaSun />} />

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_PUASA}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
