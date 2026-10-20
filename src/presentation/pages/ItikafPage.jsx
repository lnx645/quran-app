/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaMoon, FaMosque, FaBookOpen, FaHeart, FaInfoCircle, FaCheckCircle,
  FaExclamationTriangle, FaStar, FaFemale, FaCalendarAlt,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle,
} from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import {
  PENGERTIAN_ITIKAF, NIAT_ITIKAF, SYARAT_ITIKAF, TEMPAT_ITIKAF,
  AMALAN_10_MALAM, TANDA_LAILATUL_QADAR, PEMBATAL_ITIKAF,
  ITIKAF_WANITA, ITIKAF_SUNNAH, DISCLAIMER_ITIKAF,
} from '../../data/sources/itikafData.js';

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 24px;
  line-height: 2;
  direction: rtl;
  text-align: right;
  margin: 6px 0 10px;
  color: ${({ theme }) => theme.colors.teksArab};
`;

const Latin = styled.p`
  font-style: italic;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.teksLatin};
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

const KartuJudul = styled(Card)`
  .nama {
    font-size: 15px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 5px;
  }
  .isi {
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TautanRamadhan = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 12px 18px;
  border-radius: 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14.5px;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`;

function DaftarCek({ daftar, ikon }) {
  return (
    <Card>
      {daftar.map((item) => (
        <Baris key={item}>
          {ikon}
          <div className="c">{item}</div>
        </Baris>
      ))}
    </Card>
  );
}

export default function ItikafPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaMosque /> Panduan I&rsquo;tikaf
        </h2>
        <p>
          Pengertian dan dalil i&rsquo;tikaf, niat, syarat dan tempatnya di masjid, amalan
          sepuluh malam terakhir berburu Lailatul Qadar, hal yang membatalkan, serta ketentuan
          bagi wanita dan i&rsquo;tikaf sunnah di luar Ramadhan.
        </p>
      </PageHero>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_ITIKAF}</span>
        </Catatan>
      </Card>

      <SectionTitle>
        <FaBookOpen /> {PENGERTIAN_ITIKAF.judul}
      </SectionTitle>
      <Card>
        <Paragraf>{PENGERTIAN_ITIKAF.isi}</Paragraf>
        <Arab lang="ar">{PENGERTIAN_ITIKAF.dalil.arab}</Arab>
        <Arti>{PENGERTIAN_ITIKAF.dalil.arti}</Arti>
        <Catatan css={{ marginTop: 10 }}>
          <FaInfoCircle /> <span>{PENGERTIAN_ITIKAF.dalil.sumber}</span>
        </Catatan>
      </Card>

      <SectionTitle>
        <FaHeart /> Niat I&rsquo;tikaf
      </SectionTitle>
      <GoldCard>
        <Arab lang="ar">{NIAT_ITIKAF.arab}</Arab>
        <Latin>{NIAT_ITIKAF.latin}</Latin>
        <Arti>&ldquo;{NIAT_ITIKAF.arti}&rdquo;</Arti>
        <Catatan css={{ marginTop: 12 }}>
          <FaInfoCircle /> <span>{NIAT_ITIKAF.keterangan}</span>
        </Catatan>
      </GoldCard>

      <SectionTitle>
        <FaCheckCircle /> Syarat I&rsquo;tikaf
      </SectionTitle>
      <DaftarCek daftar={SYARAT_ITIKAF} ikon={<FaCheckCircle aria-hidden="true" />} />

      <SectionTitle>
        <FaMosque /> Tempat I&rsquo;tikaf
      </SectionTitle>
      {TEMPAT_ITIKAF.map((t) => (
        <KartuJudul key={t.judul}>
          <div className="nama">{t.judul}</div>
          <p className="isi">{t.isi}</p>
        </KartuJudul>
      ))}

      <SectionTitle>
        <FaMoon /> Amalan 10 Malam Terakhir
      </SectionTitle>
      {AMALAN_10_MALAM.map((a, i) => (
        <Card key={a.judul} css={{ display: 'flex', gap: 12 }}>
          <NomorMedali nomor={i + 1} ukuran={30} />
          <div>
            <p css={(t) => ({ fontSize: 15, fontWeight: 800, color: t.colors.primary, marginBottom: 4 })}>
              {a.judul}
            </p>
            <p css={{ fontSize: 14, lineHeight: 1.7 }}>{a.isi}</p>
          </div>
        </Card>
      ))}

      <SectionTitle>
        <FaStar /> Tanda-tanda Lailatul Qadar (Sekilas)
      </SectionTitle>
      <DaftarCek daftar={TANDA_LAILATUL_QADAR} ikon={<FaStar aria-hidden="true" />} />

      <SectionTitle>
        <FaExclamationTriangle /> Hal yang Membatalkan I&rsquo;tikaf
      </SectionTitle>
      <DaftarCek
        daftar={PEMBATAL_ITIKAF}
        ikon={<FaExclamationTriangle aria-hidden="true" />}
      />

      <SectionTitle>
        <FaFemale /> I&rsquo;tikaf bagi Wanita
      </SectionTitle>
      <DaftarCek daftar={ITIKAF_WANITA} ikon={<FaCheckCircle aria-hidden="true" />} />

      <SectionTitle>
        <FaCalendarAlt /> I&rsquo;tikaf Sunnah di Luar Ramadhan
      </SectionTitle>
      <DaftarCek daftar={ITIKAF_SUNNAH} ikon={<FaCheckCircle aria-hidden="true" />} />

      <GoldCard>
        <p css={{ fontSize: 14, lineHeight: 1.65, marginBottom: 12 }}>
          I&rsquo;tikaf adalah bagian dari ibadah sepuluh malam terakhir Ramadhan. Jadwal
          imsakiyah sebulan, hitung mundur Ramadhan, dan tracker tarawih tersedia di halaman
          Mode Ramadhan.
        </p>
        <TautanRamadhan to="/ramadhan" aria-label="Buka halaman Mode Ramadhan">
          <FaMoon aria-hidden="true" /> Buka Mode Ramadhan
        </TautanRamadhan>
      </GoldCard>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_ITIKAF}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
