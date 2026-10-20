/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaHeartbeat,
  FaInfoCircle,
  FaHandHoldingWater,
  FaCarSide,
  FaListOl,
} from 'react-icons/fa';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';
import {
  POSISI_SAKIT,
  BERSUCI_SAKIT,
  SHOLAT_KENDARAAN,
  DISCLAIMER_PANDUAN,
} from '../../data/sources/sholatSakitData.js';

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

const Daftar = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  font-size: 14px;
  line-height: 1.65;
`;

const JudulLangkah = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  margin-bottom: 6px;
`;

const Desc = styled.p`
  font-size: 13.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function SholatSakitPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaHeartbeat /> Sholat Orang Sakit
        </h2>
        <p>
          Sakit bukan alasan meninggalkan sholat. Kerjakan sesuai kemampuan — berdiri, duduk,
          berbaring, sampai cukup dengan isyarat — termasuk bersuci dan sholat di kendaraan.
        </p>
      </PageHero>

      <GoldCard>
        <Catatan>
          <FaInfoCircle />{' '}
          <span>
            Kaidah dasarnya dari hadits: &ldquo;Sholatlah sambil berdiri; jika tidak mampu,
            sambil duduk; jika tidak mampu, sambil berbaring miring.&rdquo; (HR. Bukhari).
            Turun ke posisi berikutnya hanya bila posisi di atasnya benar-benar tidak mampu
            dikerjakan.
          </span>
        </Catatan>
      </GoldCard>

      <SectionTitle>
        <FaListOl /> Posisi Sesuai Kemampuan
      </SectionTitle>
      {POSISI_SAKIT.map((p, i) => (
        <Card key={p.judul}>
          <JudulLangkah>
            <NomorMedali nomor={i + 1} ukuran={30} />
            <span>{p.judul}</span>
          </JudulLangkah>
          <Desc>{p.desc}</Desc>
        </Card>
      ))}
      <Card>
        <Catatan>
          <FaInfoCircle /> Di semua posisi, bacaan sholat sama seperti biasa. Bila membaca
          Al-Fatihah pun tidak mampu, cukup dzikir yang dihafal; bila tidak mampu juga,
          hadirkan bacaan dalam hati.
        </Catatan>
      </Card>

      <SectionTitle>
        <FaHandHoldingWater /> Wudhu &amp; Tayammum Saat Sakit
      </SectionTitle>
      <Card>
        <Daftar>
          {BERSUCI_SAKIT.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </Daftar>
      </Card>

      <SectionTitle>
        <FaCarSide /> Sholat di Kendaraan
      </SectionTitle>
      <Card>
        <Daftar>
          {SHOLAT_KENDARAAN.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </Daftar>
        <Catatan>
          <FaInfoCircle /> Di kendaraan, rukuk dan sujud selalu berupa isyarat tundukan —
          sujud lebih rendah daripada rukuk — tidak dengan meletakkan dahi di lantai
          kendaraan.
        </Catatan>
      </Card>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_PANDUAN}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
