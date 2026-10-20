/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import {
  FaBaby, FaDrumstickBite, FaCalculator, FaCheckCircle, FaInfoCircle,
  FaPrayingHands,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, Field, TextInput, ResultRow,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import {
  AQIQAH, KURBAN, DISCLAIMER_AQIQAH_KURBAN,
} from '../../data/sources/aqiqahKurbanData.js';

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg { flex-shrink: 0; margin-top: 3px; }
`;

const Paragraf = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
`;

const Step = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child { border-bottom: none; }
  svg { flex-shrink: 0; margin-top: 3px; color: ${({ theme }) => theme.colors.primary}; }
  > div { flex: 1; min-width: 0; }
  .t { font-size: 14px; font-weight: 700; overflow-wrap: break-word; }
  .c { font-size: 13px; color: ${({ theme }) => theme.colors.muted}; line-height: 1.6; margin-top: 3px; overflow-wrap: break-word; }
`;

const Tabel = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13.5px;
    line-height: 1.55;
  }
  th, td {
    text-align: left;
    padding: 9px 8px;
    border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
    vertical-align: top;
  }
  th { color: ${({ theme }) => theme.colors.primary}; font-size: 12.5px; }
  tr:last-child td { border-bottom: none; }
`;

const parseJumlah = (s) => {
  const n = Number(String(s).replace(/[^\d]/g, ''));
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, 999);
};

function Disclaimer() {
  return (
    <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
      <Catatan>
        <FaInfoCircle /> <span>{DISCLAIMER_AQIQAH_KURBAN}</span>
      </Catatan>
    </Card>
  );
}

export default function AqiqahKurbanPage() {
  const [tab, setTab] = useState('aqiqah'); // aqiqah | kurban
  const [anakLaki, setAnakLaki] = useState(0);
  const [anakPerempuan, setAnakPerempuan] = useState(0);

  const dariLaki = anakLaki * 2;
  const dariPerempuan = anakPerempuan * 1;
  const totalKambing = dariLaki + dariPerempuan;

  return (
    <Page>
      <PageHero>
        <h2><FaBaby /> Aqiqah &amp; Kurban</h2>
        <p>
          Panduan ringkas aqiqah untuk kelahiran anak — lengkap dengan kalkulator
          jumlah kambing — dan ketentuan kurban Idul Adha.
        </p>
      </PageHero>

      <SegmenWadah role="tablist" aria-label="Bagian aqiqah dan kurban">
        <SegmenTab aktif={tab === 'aqiqah'} onClick={() => setTab('aqiqah')}>
          <FaBaby /> Aqiqah
        </SegmenTab>
        <SegmenTab aktif={tab === 'kurban'} onClick={() => setTab('kurban')}>
          <FaDrumstickBite /> Kurban
        </SegmenTab>
      </SegmenWadah>

      {tab === 'aqiqah' && (
        <>
          <SectionTitle><FaInfoCircle /> Pengertian Aqiqah</SectionTitle>
          <Card>
            <Paragraf>{AQIQAH.pengertian}</Paragraf>
          </Card>

          <SectionTitle><FaCheckCircle /> Ketentuan Aqiqah</SectionTitle>
          <Card>
            {AQIQAH.poin.map((p) => (
              <Step key={p.judul}>
                <FaCheckCircle />
                <div>
                  <div className="t">{p.judul}</div>
                  <div className="c">{p.desc}</div>
                </div>
              </Step>
            ))}
          </Card>

          <SectionTitle><FaCalculator /> Kalkulator Jumlah Kambing</SectionTitle>
          <GoldCard>
            <Field>
              <label htmlFor="anak-laki">Jumlah Anak Laki-laki</label>
              <TextInput
                id="anak-laki"
                type="number"
                inputMode="numeric"
                min="0"
                value={anakLaki || ''}
                placeholder="0"
                onChange={(e) => setAnakLaki(parseJumlah(e.target.value))}
              />
            </Field>
            <Field>
              <label htmlFor="anak-perempuan">Jumlah Anak Perempuan</label>
              <TextInput
                id="anak-perempuan"
                type="number"
                inputMode="numeric"
                min="0"
                value={anakPerempuan || ''}
                placeholder="0"
                onChange={(e) => setAnakPerempuan(parseJumlah(e.target.value))}
              />
            </Field>
            <div role="status" aria-label="Hasil hitung aqiqah">
              <ResultRow>
                <span className="label">Dari anak laki-laki (2 ekor × {anakLaki})</span>
                <span className="value">{dariLaki} ekor</span>
              </ResultRow>
              <ResultRow>
                <span className="label">Dari anak perempuan (1 ekor × {anakPerempuan})</span>
                <span className="value">{dariPerempuan} ekor</span>
              </ResultRow>
              <ResultRow>
                <span className="label">Total kambing/domba dibutuhkan</span>
                <span className="value">{totalKambing} ekor</span>
              </ResultRow>
            </div>
            <Catatan css={{ marginTop: 10 }}>
              <FaInfoCircle /> <span>
                Aqiqah dikerjakan per anak. Bila belum mampu untuk jumlah penuh, kerjakan
                semampunya dan konsultasikan sisanya kepada ulama setempat.
              </span>
            </Catatan>
          </GoldCard>
          <Disclaimer />
        </>
      )}

      {tab === 'kurban' && (
        <>
          <SectionTitle><FaInfoCircle /> Pengertian Kurban</SectionTitle>
          <Card>
            <Paragraf>{KURBAN.pengertian}</Paragraf>
          </Card>

          <SectionTitle><FaCheckCircle /> Syarat Umur Hewan per Jenis</SectionTitle>
          <Card>
            <Tabel>
              <table>
                <thead>
                  <tr><th>Jenis Hewan</th><th>Umur Minimal</th></tr>
                </thead>
                <tbody>
                  {KURBAN.syaratHewan.map((h) => (
                    <tr key={h.jenis}>
                      <td><strong>{h.jenis}</strong></td>
                      <td>{h.umur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tabel>
          </Card>

          <SectionTitle><FaPrayingHands /> Ketentuan Kurban</SectionTitle>
          <Card>
            {KURBAN.poin.map((p) => (
              <Step key={p.judul}>
                <FaCheckCircle />
                <div>
                  <div className="t">{p.judul}</div>
                  <div className="c">{p.desc}</div>
                </div>
              </Step>
            ))}
          </Card>
          <Disclaimer />
        </>
      )}
    </Page>
  );
}
