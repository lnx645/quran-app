/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaPray,
  FaHandPaper,
  FaBookOpen,
  FaBookReader,
  FaAngleDown,
  FaArrowUp,
  FaArrowDown,
  FaChair,
  FaHandHoldingHeart,
  FaInfoCircle,
} from 'react-icons/fa';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';
import {
  NIAT_SHOLAT,
  CATATAN_NIAT,
  GERAKAN_SHOLAT,
  DISCLAIMER_PANDUAN,
} from '../../data/sources/panduanSholatData.js';

const IKON = {
  takbir: <FaHandPaper />,
  doa: <FaHandHoldingHeart />,
  qiroah: <FaBookReader />,
  rukuk: <FaAngleDown />,
  iktidal: <FaArrowUp />,
  sujud: <FaArrowDown />,
  duduk: <FaChair />,
  tasyahud: <FaBookOpen />,
  salam: <FaPray />,
};

// Ilustrasi posisi per gerakan — karya orisinal proyek (SVG digambar
// sendiri, satu karakter konsisten, pandangan samping di atas sajadah;
// lihat public/ilustrasi/SUMBER.md). Postur yang sama memakai gambar yang
// sama: doa iftitah & qiroah memakai figur berdiri (qiyam).
const GAMBAR = {
  takbir: { src: '/ilustrasi/sholat-takbir.svg', alt: 'Ilustrasi takbiratul ihram: berdiri tegak dengan kedua tangan terangkat ke samping telinga' },
  doa: { src: '/ilustrasi/sholat-berdiri.svg', alt: 'Ilustrasi posisi berdiri dalam sholat dengan kedua tangan terlipat di dada' },
  qiroah: { src: '/ilustrasi/sholat-berdiri.svg', alt: 'Ilustrasi posisi berdiri dalam sholat dengan kedua tangan terlipat di dada' },
  rukuk: { src: '/ilustrasi/sholat-rukuk.svg', alt: 'Ilustrasi posisi rukuk: membungkuk dengan punggung rata dan kedua tangan memegang lutut' },
  iktidal: { src: '/ilustrasi/sholat-iktidal.svg', alt: 'Ilustrasi posisi iktidal: berdiri tegak setelah rukuk dengan kedua tangan lurus di sisi badan' },
  sujud: { src: '/ilustrasi/sholat-sujud.svg', alt: 'Ilustrasi posisi sujud: dahi dan hidung menyentuh sajadah, kedua tangan di samping kepala' },
  duduk: { src: '/ilustrasi/sholat-duduk.svg', alt: 'Ilustrasi posisi duduk di antara dua sujud (iftirasy): kaki kanan tegak, duduk di atas kaki kiri' },
  tasyahud: { src: '/ilustrasi/sholat-tasyahud.svg', alt: 'Ilustrasi posisi duduk tasyahud dengan jari telunjuk tangan kanan terangkat' },
  salam: { src: '/ilustrasi/sholat-salam.svg', alt: 'Ilustrasi posisi duduk saat salam dengan kepala menoleh ke kanan' },
};

const GambarGerakan = styled.figure`
  margin: 0 0 12px;
  padding: 14px 10px 10px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  img {
    height: 150px;
    width: auto;
    max-width: 100%;
    margin: 0 auto;
  }
`;

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
  svg.tipe {
    color: ${({ theme }) => theme.colors.goldDeep};
    font-size: 18px;
  }
`;

const Desc = styled.p`
  font-size: 13.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 10px;
`;

const BadgeKali = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
`;

export default function PanduanSholatPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaPray /> Panduan Sholat Fardhu
        </h2>
        <p>
          Niat sholat lima waktu serta urutan gerakan dan bacaan dari takbiratul ihram sampai
          salam.
        </p>
      </PageHero>

      <SectionTitle>Niat Sholat 5 Waktu</SectionTitle>
      {NIAT_SHOLAT.map((n) => (
        <Card key={n.nama}>
          <h3 css={{ fontSize: 16, marginBottom: 4 }}>
            Sholat {n.nama} — {n.rakaat} rakaat
          </h3>
          <Arab lang="ar">{n.arab}</Arab>
          <Latin>{n.latin}</Latin>
          <Arti>&ldquo;{n.arti}&rdquo;</Arti>
        </Card>
      ))}
      <Card>
        <Catatan>
          <FaInfoCircle /> <span>{CATATAN_NIAT}</span>
        </Catatan>
      </Card>

      <SectionTitle>Gerakan &amp; Bacaan</SectionTitle>
      {GERAKAN_SHOLAT.map((g, i) => (
        <Card key={i}>
          <JudulLangkah>
            <span className="no">{i + 1}</span>
            <span css={{ flex: 1 }}>{g.nama}</span>
            <span className="tipe" aria-hidden="true">
              {IKON[g.ikon]}
            </span>
          </JudulLangkah>
          {GAMBAR[g.ikon] && (
            <GambarGerakan>
              <img src={GAMBAR[g.ikon].src} alt={GAMBAR[g.ikon].alt} loading="lazy" />
            </GambarGerakan>
          )}
          <Desc>{g.desc}</Desc>
          <BadgeKali>Dibaca {g.jumlah}&times;</BadgeKali>
          <Arab lang="ar">{g.bacaan.arab}</Arab>
          <Latin>{g.bacaan.latin}</Latin>
          <Arti>&ldquo;{g.bacaan.arti}&rdquo;</Arti>
        </Card>
      ))}

      <GoldCard>
        <Catatan>
          <FaInfoCircle />{' '}
          <span>
            Urutan di atas berlaku untuk satu rakaat penuh; pada rakaat berikutnya gerakan
            diulang sampai rakaat terakhir, lalu ditutup tasyahud akhir dan salam. Bacaan iftitah
            dan surah pendek dibaca pada rakaat pertama dan kedua.
          </span>
        </Catatan>
        <Catatan css={{ marginTop: 8 }}>
          <FaInfoCircle />{' '}
          <span>
            Ilustrasi gerakan pada halaman ini adalah karya orisinal proyek Noor (digambar
            sendiri sebagai SVG). Rinciannya ada di berkas public/ilustrasi/SUMBER.md.
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
