/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaRoute,
  FaInfoCircle,
  FaCalculator,
  FaCompressAlt,
  FaLayerGroup,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import {
  Page,
  PageHero,
  Card,
  GoldCard,
  SectionTitle,
  Field,
  TextInput,
  ResultRow,
} from '../components/common.jsx';
import { hitungMusafir, JARAK_MUSAFIR_KM } from '../../domain/usecases/hitungMusafir.js';
import {
  PASANGAN_JAMA,
  JENIS_JAMA,
  PANDUAN_QASHAR,
  DISCLAIMER_PANDUAN,
} from '../../data/sources/sholatMusafirData.js';

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

const Sub = styled.h4`
  font-size: 14px;
  margin: 14px 0 4px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function SholatMusafirPage() {
  const [jarak, setJarak] = useState('');
  const hasil = useMemo(() => hitungMusafir(jarak), [jarak]);

  return (
    <Page>
      <PageHero>
        <h2>
          <FaRoute /> Sholat Musafir
        </h2>
        <p>
          Keringanan bagi orang yang bepergian: menjama&rsquo; (menggabung) dan mengqashar
          (meringkas) sholat. Hitung dulu status safarmu dengan kalkulator jarak di bawah.
        </p>
      </PageHero>

      <SectionTitle>
        <FaCalculator /> Kalkulator Jarak Safar
      </SectionTitle>
      <Card>
        <Field>
          <label htmlFor="jarak-safar">Jarak perjalanan satu arah (km)</label>
          <TextInput
            id="jarak-safar"
            type="number"
            inputMode="decimal"
            min="0"
            placeholder={`cth: 90 — batas safar ${JARAK_MUSAFIR_KM} km`}
            value={jarak}
            onChange={(e) => setJarak(e.target.value)}
          />
        </Field>
        <Catatan>
          <FaInfoCircle /> Batas yang dipakai: {JARAK_MUSAFIR_KM} km atau lebih (2 marhalah
          menurut jumhur ulama). Sebagian pendapat menyebut angka yang sedikit berbeda —
          ikuti pendapat yang Anda yakini.
        </Catatan>

        <div role="status" aria-label="Hasil hitung status musafir" css={{ marginTop: 10 }}>
          <ResultRow>
            <span className="label">Status</span>
            <span className="value">{hasil.judul}</span>
          </ResultRow>
          <ResultRow>
            <span className="label">Qashar</span>
            <span className="value">
              {hasil.bolehQashar ? (
                <>
                  <FaCheckCircle aria-hidden="true" /> Boleh
                </>
              ) : (
                <>
                  <FaTimesCircle aria-hidden="true" /> Belum boleh
                </>
              )}
            </span>
          </ResultRow>
          <ResultRow>
            <span className="label">Jama&rsquo;</span>
            <span className="value">
              {hasil.bolehJama ? (
                <>
                  <FaCheckCircle aria-hidden="true" /> Boleh
                </>
              ) : (
                <>
                  <FaTimesCircle aria-hidden="true" /> Belum boleh
                </>
              )}
            </span>
          </ResultRow>
        </div>
        <p css={{ fontSize: 13.5, lineHeight: 1.65, marginTop: 10 }}>{hasil.keterangan}</p>
        {hasil.valid && (
          <Daftar css={{ marginTop: 10 }}>
            {hasil.ringkasan.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </Daftar>
        )}
      </Card>

      <SectionTitle>
        <FaLayerGroup /> Jama&rsquo;: Pasangan Sholat
      </SectionTitle>
      {PASANGAN_JAMA.map((p) => (
        <Card key={p.pasangan}>
          <h3 css={{ fontSize: 16, marginBottom: 6 }}>{p.pasangan}</h3>
          <p css={{ fontSize: 13.5, lineHeight: 1.65 }}>{p.keterangan}</p>
        </Card>
      ))}

      {JENIS_JAMA.map((j) => (
        <Card key={j.id}>
          <h3 css={{ fontSize: 16, marginBottom: 6 }}>{j.nama}</h3>
          <p css={{ fontSize: 13.5, lineHeight: 1.65 }}>{j.desc}</p>
          <Sub>Syarat</Sub>
          <Daftar>
            {j.syarat.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </Daftar>
          <Sub>Langkah</Sub>
          <Daftar as="ol">
            {j.langkah.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </Daftar>
        </Card>
      ))}

      <SectionTitle>
        <FaCompressAlt /> Qashar: Meringkas Sholat
      </SectionTitle>
      <Card>
        <p css={{ fontSize: 14, lineHeight: 1.65, marginBottom: 10 }}>
          {PANDUAN_QASHAR.pengertian}
        </p>
        <Daftar>
          {PANDUAN_QASHAR.ketentuan.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </Daftar>
        <Sub>Contoh Niat Qashar (Zuhur)</Sub>
        <Arab lang="ar">{PANDUAN_QASHAR.niat.arab}</Arab>
        <Latin>{PANDUAN_QASHAR.niat.latin}</Latin>
        <Arti>&ldquo;{PANDUAN_QASHAR.niat.arti}&rdquo;</Arti>
        <Catatan>
          <FaInfoCircle /> Niat letaknya di hati; lafaz di atas sekadar menuntun. Untuk Asar
          dan Isya, sesuaikan nama sholatnya.
        </Catatan>
      </Card>

      <GoldCard>
        <Catatan>
          <FaInfoCircle />{' '}
          <span>
            Jama&rsquo; dan qashar boleh digabung sekaligus — misalnya Zuhur dan Asar
            dikerjakan di waktu Zuhur, masing-masing 2 rakaat. Inilah cara yang paling ringkas
            dan lazim dikerjakan musafir.
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
