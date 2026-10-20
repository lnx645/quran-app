/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaPrayingHands, FaSun, FaMoon, FaClock, FaBookOpen, FaInfoCircle, FaListUl,
} from 'react-icons/fa';
import {
  DOA_QUNUT, PERBEDAAN_QUNUT, CATATAN_QUNUT_NAZILAH, DISCLAIMER_QUNUT,
} from '../../data/sources/qunutData.js';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';

// Peta kunci ikon data → komponen ikon.
const IKON = {
  subuh: FaSun,
  witir: FaMoon,
};

const KartuDoa = styled(Card)`
  .judul {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 18px;
    color: ${({ theme }) => theme.colors.judul};
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    svg {
      color: ${({ theme }) => theme.colors.gold};
      flex-shrink: 0;
    }
  }
  .kapan {
    display: flex;
    gap: 8px;
    font-size: 13.5px;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 10px;
    svg {
      flex-shrink: 0;
      margin-top: 3px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 26px;
    line-height: 2;
    text-align: right;
    direction: rtl;
    color: ${({ theme }) => theme.colors.teksArab};
  }
  .latin {
    font-style: italic;
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.teksLatin};
    margin-top: 8px;
  }
  .arti {
    font-size: 14.5px;
    line-height: 1.65;
    margin-top: 6px;
  }
  .catatan {
    margin-top: 10px;
    padding-top: 8px;
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.type.caption.size}px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.faint};
    display: flex;
    gap: 6px;
    svg {
      color: ${({ theme }) => theme.colors.goldDeep};
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
`;

const KartuTeks = styled(Card)`
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

export default function DoaQunutPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaPrayingHands /> Doa Qunut
        </h2>
        <p>
          Doa qunut Subuh dan qunut witir dengan Arab, latin, arti, keterangan waktu membaca,
          dan perbedaan ringkas antar mazhab.
        </p>
      </PageHero>

      <GoldCard>
        <p css={(t) => ({ fontSize: 14, lineHeight: 1.6, color: t.colors.text })}>
          Inti doa qunut diajarkan Nabi ﷺ kepada cucunya, Al-Hasan bin Ali. Qunut adalah doa
          yang dibaca sambil berdiri dalam sholat — paling masyhur pada Subuh dan witir.
          Perbedaan praktiknya antar mazhab dijelaskan di bagian bawah sebagai label edukasi.
        </p>
      </GoldCard>

      {DOA_QUNUT.map((d) => {
        const Ikon = IKON[d.id] ?? FaPrayingHands;
        return (
          <KartuDoa key={d.id}>
            <div className="judul">
              <Ikon aria-hidden="true" /> {d.judul}
            </div>
            <p className="kapan">
              <FaClock aria-hidden="true" />
              <span>
                <strong>Kapan dibaca: </strong>
                {d.kapan}
              </span>
            </p>
            <p className="arab" lang="ar">{d.arab}</p>
            <p className="latin">{d.latin}</p>
            <p className="arti">{d.arti}</p>
            <p className="catatan">
              <FaBookOpen aria-hidden="true" />
              <span>{d.catatan}</span>
            </p>
          </KartuDoa>
        );
      })}

      <SectionTitle>
        <FaListUl /> Perbedaan Antar Mazhab
      </SectionTitle>
      {PERBEDAAN_QUNUT.map((m) => (
        <KartuTeks key={m.mazhab}>
          <div className="nama">Mazhab {m.mazhab}</div>
          <p className="isi">{m.isi}</p>
        </KartuTeks>
      ))}

      <Card>
        <Catatan>
          <FaInfoCircle /> <span>{CATATAN_QUNUT_NAZILAH}</span>
        </Catatan>
      </Card>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_QUNUT}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
