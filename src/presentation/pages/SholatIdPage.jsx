/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaStarAndCrescent,
  FaSun,
  FaInfoCircle,
  FaBullhorn,
  FaRoute,
  FaListOl,
  FaBookOpen,
} from 'react-icons/fa';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';
import {
  PERBANDINGAN_ID,
  KETENTUAN_ID,
  AMALAN_SEBELUM_ID,
  TAKBIRAN,
  DISCLAIMER_PANDUAN,
} from '../../data/sources/sholatIdData.js';

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

const Daftar = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  font-size: 14px;
  line-height: 1.65;
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

const JudulLangkah = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  margin-bottom: 6px;
  .no {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradients.header};
    color: ${({ theme }) => theme.colors.goldLight};
    font-size: 14px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const Desc = styled.p`
  font-size: 13.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function SholatIdPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaStarAndCrescent /> Sholat Id
        </h2>
        <p>
          Panduan sholat Idul Fitri dan Idul Adha: takbir tambahan 7 dan 5 kali, tanpa adzan
          dan iqamah, khutbah setelah sholat, amalan sebelum berangkat, serta teks takbiran
          lengkap.
        </p>
      </PageHero>

      <SectionTitle>
        <FaSun /> Dua Hari Raya
      </SectionTitle>
      {PERBANDINGAN_ID.map((s) => (
        <Card key={s.id}>
          <h3 css={{ fontSize: 16, marginBottom: 8 }}>{s.nama}</h3>
          <BarisInfo>
            <FaSun aria-hidden="true" />
            <span>
              <span className="lbl">Waktu: </span>
              {s.tanggal}
            </span>
          </BarisInfo>
          <BarisInfo>
            <FaListOl aria-hidden="true" />
            <span>
              <span className="lbl">Takbir tambahan: </span>
              {s.takbirRakaat}
            </span>
          </BarisInfo>
          <BarisInfo>
            <FaInfoCircle aria-hidden="true" />
            <span>
              <span className="lbl">Sebelum berangkat: </span>
              {s.sebelumBerangkat}
            </span>
          </BarisInfo>
          <p css={{ fontSize: 13.5, lineHeight: 1.65 }}>{s.catatan}</p>
        </Card>
      ))}

      <SectionTitle>
        <FaListOl /> Ketentuan Umum
      </SectionTitle>
      <Card>
        <Daftar>
          {KETENTUAN_ID.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </Daftar>
        <Catatan>
          <FaBullhorn /> Ingat urutannya: sholat dulu, baru khutbah — kebalikan dari sholat
          Jumat. Tidak ada sholat sunnah qabliyah/ba&rsquo;diyah khusus sebelum atau sesudah
          sholat Id di tempat sholat.
        </Catatan>
      </Card>

      <SectionTitle>
        <FaRoute /> Amalan Sebelum Berangkat
      </SectionTitle>
      {AMALAN_SEBELUM_ID.map((a, i) => (
        <Card key={a.judul}>
          <JudulLangkah>
            <span className="no">{i + 1}</span>
            <span>{a.judul}</span>
          </JudulLangkah>
          <Desc>{a.desc}</Desc>
        </Card>
      ))}

      <SectionTitle>
        <FaBookOpen /> Teks Takbiran Lengkap
      </SectionTitle>
      <GoldCard>
        <p css={{ fontSize: 13.5, lineHeight: 1.65, marginBottom: 10 }}>
          Dibaca berulang-ulang sejak malam hari raya sampai imam memulai sholat Id — dengan
          suara yang dikeraskan bagi laki-laki, secukupnya bagi perempuan.
        </p>
        {TAKBIRAN.arab.map((bait) => (
          <Arab key={bait} lang="ar">
            {bait}
          </Arab>
        ))}
        {TAKBIRAN.latin.map((bait) => (
          <Latin key={bait}>{bait}</Latin>
        ))}
        <Arti>&ldquo;{TAKBIRAN.arti}&rdquo;</Arti>
      </GoldCard>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_PANDUAN}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
