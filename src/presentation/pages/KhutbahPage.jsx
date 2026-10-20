/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaBullhorn, FaListOl, FaBookOpen, FaInfoCircle, FaCheckCircle,
  FaStarAndCrescent, FaVolumeUp,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle,
} from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import {
  RUKUN_KHUTBAH, SYARAT_KHUTBAH_SEKILAS, CONTOH_JUMAT, KHUTBAH_ID,
  TAKBIR_PEMBUKA, LABEL_CONTOH, DISCLAIMER_KHUTBAH,
} from '../../data/sources/khutbahData.js';

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

const LencanaWaktu = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  background: ${({ theme }) => theme.colors.goldSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill}px;
  padding: 4px 10px;
  margin-bottom: 8px;
`;

const LabelLangkah = styled.p`
  font-size: 14.5px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 6px;
`;

const DaftarKerangka = styled.ul`
  margin: 4px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text};
`;

function LangkahKhutbah({ langkah }) {
  return (
    <Card>
      <LabelLangkah>{langkah.label}</LabelLangkah>
      {langkah.arab ? <Arab lang="ar">{langkah.arab}</Arab> : null}
      {langkah.arti ? <Arti>&ldquo;{langkah.arti}&rdquo;</Arti> : null}
      {langkah.kerangka ? (
        <DaftarKerangka>
          {langkah.kerangka.map((poin) => (
            <li key={poin}>{poin}</li>
          ))}
        </DaftarKerangka>
      ) : null}
    </Card>
  );
}

export default function KhutbahPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaBullhorn /> Teks Khutbah
        </h2>
        <p>
          Rukun khutbah Jumat menurut mazhab Syafi&rsquo;i, contoh khutbah Jumat ringkas dua
          bagian yang rukunnya terpenuhi, serta kerangka khutbah Idul Fitri dan Idul Adha
          dengan takbir pembuka.
        </p>
      </PageHero>

      <GoldCard>
        <Catatan>
          <FaInfoCircle /> <span>{LABEL_CONTOH}</span>
        </Catatan>
      </GoldCard>

      <SectionTitle>
        <FaListOl /> Rukun Khutbah Jumat (Syafi&rsquo;i)
      </SectionTitle>
      {RUKUN_KHUTBAH.map((r, i) => (
        <Card key={r.judul} css={{ display: 'flex', gap: 12 }}>
          <NomorMedali nomor={i + 1} ukuran={30} />
          <div>
            <LencanaWaktu>{r.waktu}</LencanaWaktu>
            <p css={(t) => ({ fontSize: 15, fontWeight: 800, color: t.colors.primary, marginBottom: 4 })}>
              {r.judul}
            </p>
            <p css={{ fontSize: 14, lineHeight: 1.7 }}>{r.isi}</p>
          </div>
        </Card>
      ))}

      <SectionTitle>
        <FaCheckCircle /> Syarat &amp; Adab Sekilas
      </SectionTitle>
      <Card>
        {SYARAT_KHUTBAH_SEKILAS.map((s) => (
          <Baris key={s}>
            <FaCheckCircle aria-hidden="true" />
            <div className="c">{s}</div>
          </Baris>
        ))}
      </Card>

      <SectionTitle>
        <FaBookOpen /> Contoh Khutbah Jumat — {CONTOH_JUMAT.tema}
      </SectionTitle>
      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{LABEL_CONTOH} Bagian rukun ditulis dalam Bahasa Arab; isi khutbah berbentuk kerangka Bahasa Indonesia untuk dikembangkan khatib.</span>
        </Catatan>
      </Card>

      <SectionTitle>Khutbah Pertama</SectionTitle>
      {CONTOH_JUMAT.khutbahPertama.map((langkah) => (
        <LangkahKhutbah key={langkah.label} langkah={langkah} />
      ))}

      <GoldCard>
        <Catatan>
          <FaInfoCircle /> <span>{CONTOH_JUMAT.dudukAntara}</span>
        </Catatan>
      </GoldCard>

      <SectionTitle>Khutbah Kedua</SectionTitle>
      {CONTOH_JUMAT.khutbahKedua.map((langkah) => (
        <LangkahKhutbah key={langkah.label} langkah={langkah} />
      ))}

      <SectionTitle>
        <FaStarAndCrescent /> Khutbah Hari Raya (Ringkas)
      </SectionTitle>
      <Card>
        <p css={{ fontSize: 14, lineHeight: 1.65, marginBottom: 6 }}>
          <FaVolumeUp aria-hidden="true" /> Khutbah Id disampaikan SETELAH sholat Id dan dibuka
          dengan takbir. Lafaz takbiran pembukanya:
        </p>
        <Arab lang="ar">{TAKBIR_PEMBUKA.arab}</Arab>
        <Latin>{TAKBIR_PEMBUKA.latin}</Latin>
        <Arti>&ldquo;{TAKBIR_PEMBUKA.arti}&rdquo;</Arti>
      </Card>
      {KHUTBAH_ID.map((k) => (
        <div key={k.id}>
          <SectionTitle>
            <FaStarAndCrescent /> {k.nama}
          </SectionTitle>
          <Card>
            <p css={{ fontSize: 13.5, lineHeight: 1.65, marginBottom: 10 }}>
              <strong>Takbir pembuka: </strong>
              {k.takbirJumlah}
            </p>
            <DaftarKerangka>
              {k.kerangka.map((poin) => (
                <li key={poin}>{poin}</li>
              ))}
            </DaftarKerangka>
          </Card>
        </div>
      ))}

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_KHUTBAH}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
