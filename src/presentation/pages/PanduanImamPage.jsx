/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaUsers, FaListOl, FaUserTie, FaBullhorn, FaVolumeUp, FaClock,
  FaInfoCircle, FaCheckCircle,
} from 'react-icons/fa';
import {
  SYARAT_IMAM, URUTAN_IMAM, TUGAS_IMAM, SYARAT_MUADZIN, TUGAS_MUADZIN,
  TEKS_ADZAN, TEKS_IQAMAH, CATATAN_IQAMAH, TENTANG_MASBUQ, DISCLAIMER_IMAM,
} from '../../data/sources/panduanImamData.js';
import { Page, PageHero, Card, GoldCard, SectionTitle } from '../components/common.jsx';

const KartuTeks = styled(Card)`
  .nama {
    font-size: 15px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 5px;
    display: flex;
    gap: 8px;
    svg {
      color: ${({ theme }) => theme.colors.goldDeep};
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
  .isi {
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const KartuNomor = styled(Card)`
  display: flex;
  gap: 12px;
  .nama {
    font-size: 15px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 4px;
  }
  .isi {
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const DaftarCek = styled(Card)`
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  li {
    display: flex;
    gap: 8px;
    font-size: 14px;
    line-height: 1.65;
    svg {
      color: ${({ theme }) => theme.colors.primary};
      flex-shrink: 0;
      margin-top: 3px;
    }
  }
`;

const KartuLafaz = styled(Card)`
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 24px;
    line-height: 1.9;
    text-align: right;
    direction: rtl;
    color: ${({ theme }) => theme.colors.teksArab};
  }
  .latin {
    font-style: italic;
    font-size: 13.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.teksLatin};
    margin-top: 6px;
  }
  .arti {
    font-size: 13.5px;
    line-height: 1.6;
    margin-top: 2px;
  }
  .ulang {
    display: inline-block;
    margin-top: 8px;
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: ${({ theme }) => theme.radii.pill}px;
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

function DaftarLafaz({ data }) {
  return data.map((b, i) => (
    <KartuLafaz key={`${b.latin}-${i}`}>
      <p className="arab" lang="ar">{b.arab}</p>
      <p className="latin">{b.latin}</p>
      <p className="arti">{b.arti}</p>
      <span className="ulang">{b.ulang}</span>
    </KartuLafaz>
  ));
}

export default function PanduanImamPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaUsers /> Panduan Imam &amp; Muadzin
        </h2>
        <p>
          Syarat dan tugas imam, siapa yang paling berhak mengimami, syarat dan tugas muadzin,
          teks adzan &amp; iqamah, serta sekilas tentang makmum masbuq.
        </p>
      </PageHero>

      <SectionTitle>
        <FaUserTie /> Syarat Imam
      </SectionTitle>
      {SYARAT_IMAM.map((s) => (
        <KartuTeks key={s.judul}>
          <div className="nama">
            <FaCheckCircle aria-hidden="true" /> {s.judul}
          </div>
          <p className="isi">{s.isi}</p>
        </KartuTeks>
      ))}

      <SectionTitle>
        <FaListOl /> Siapa yang Paling Berhak Jadi Imam
      </SectionTitle>
      {URUTAN_IMAM.map((u, i) => (
        <KartuNomor key={u.judul}>
          <NomorMedali nomor={i + 1} ukuran={30} />
          <div>
            <div className="nama">{u.judul}</div>
            <p className="isi">{u.isi}</p>
          </div>
        </KartuNomor>
      ))}

      <SectionTitle>
        <FaUsers /> Tugas Imam
      </SectionTitle>
      {TUGAS_IMAM.map((t) => (
        <KartuTeks key={t.judul}>
          <div className="nama">{t.judul}</div>
          <p className="isi">{t.isi}</p>
        </KartuTeks>
      ))}

      <SectionTitle>
        <FaBullhorn /> Syarat Muadzin
      </SectionTitle>
      <DaftarCek>
        <ul>
          {SYARAT_MUADZIN.map((s) => (
            <li key={s}>
              <FaCheckCircle aria-hidden="true" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </DaftarCek>

      <SectionTitle>
        <FaBullhorn /> Tugas Muadzin
      </SectionTitle>
      <DaftarCek>
        <ul>
          {TUGAS_MUADZIN.map((t) => (
            <li key={t}>
              <FaCheckCircle aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </DaftarCek>

      <SectionTitle>
        <FaVolumeUp /> Teks Adzan
      </SectionTitle>
      <DaftarLafaz data={TEKS_ADZAN} />

      <SectionTitle>
        <FaVolumeUp /> Teks Iqamah
      </SectionTitle>
      <DaftarLafaz data={TEKS_IQAMAH} />
      <Card>
        <Catatan>
          <FaInfoCircle /> <span>{CATATAN_IQAMAH}</span>
        </Catatan>
      </Card>

      <SectionTitle>
        <FaClock /> Makmum Masbuq (Sekilas)
      </SectionTitle>
      {TENTANG_MASBUQ.map((m) => (
        <KartuTeks key={m.judul}>
          <div className="nama">{m.judul}</div>
          <p className="isi">{m.isi}</p>
        </KartuTeks>
      ))}

      <GoldCard>
        <Catatan>
          <FaInfoCircle />{' '}
          <span>
            Menjadi imam dan muadzin adalah amanah sekaligus ladang pahala besar. Hal terpenting
            bukan suara yang paling merdu, melainkan bacaan yang benar, tepat waktu, dan sikap
            yang menenangkan jamaah.
          </span>
        </Catatan>
      </GoldCard>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_IMAM}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
