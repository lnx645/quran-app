/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { FaCoins, FaBriefcase, FaHandshake, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import {
  hitungZakatMal, hitungZakatProfesi, hitungZakatFitrah, formatRupiah,
  HARGA_EMAS_DEFAULT, HARGA_BERAS_DEFAULT, EMAS_NISAB_GRAM,
} from '../../domain/usecases/hitungZakat.js';
import {
  Page, PageTitle, PageSubtitle, Card, SectionTitle, Field, TextInput, ResultRow, GoldCard,
} from '../components/common.jsx';

const Tab = styled.button`
  flex: 1;
  padding: 11px 8px;
  border-radius: 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, aktif }) => (aktif ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, aktif }) => (aktif ? '#fff' : theme.colors.text)};
  font-weight: 700;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.15s ease;
`;

const LencanaWajib = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  background: ${({ theme, wajib }) => (wajib ? theme.colors.goldSoft : theme.colors.primarySoft)};
  color: ${({ theme, wajib }) => (wajib ? '#7A5B00' : theme.colors.primaryDark)};
  border: 1px solid ${({ theme, wajib }) => (wajib ? theme.colors.gold : theme.colors.primarySoft)};
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 6px;
  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

const parseAngka = (s) => {
  const n = Number(String(s).replace(/[^\d]/g, ''));
  return Number.isFinite(n) ? n : 0;
};
const formatInput = (n) => (n > 0 ? n.toLocaleString('id-ID') : '');

export default function ZakatPage() {
  const [tab, setTab] = useState('mal');
  const [hargaEmas, setHargaEmas] = useState(HARGA_EMAS_DEFAULT);
  // Mal
  const [harta, setHarta] = useState(0);
  // Profesi
  const [gaji, setGaji] = useState(0);
  // Fitrah
  const [jiwa, setJiwa] = useState(1);
  const [hargaBeras, setHargaBeras] = useState(HARGA_BERAS_DEFAULT);

  const hasilMal = useMemo(() => hitungZakatMal(harta, hargaEmas), [harta, hargaEmas]);
  const hasilProfesi = useMemo(() => hitungZakatProfesi(gaji, hargaEmas), [gaji, hargaEmas]);
  const hasilFitrah = useMemo(() => hitungZakatFitrah(jiwa, hargaBeras), [jiwa, hargaBeras]);

  return (
    <Page>
      <PageTitle>
        <FaCoins /> Kalkulator Zakat
      </PageTitle>
      <PageSubtitle>
        Hitung zakat mal, zakat profesi, dan zakat fitrah. Nisab acuan: {EMAS_NISAB_GRAM} gram
        emas, kadar 2,5%.
      </PageSubtitle>

      <div css={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Tab aktif={tab === 'mal'} onClick={() => setTab('mal')}>
          <FaCoins /> Zakat Mal
        </Tab>
        <Tab aktif={tab === 'profesi'} onClick={() => setTab('profesi')}>
          <FaBriefcase /> Profesi
        </Tab>
        <Tab aktif={tab === 'fitrah'} onClick={() => setTab('fitrah')}>
          <FaHandshake /> Fitrah
        </Tab>
      </div>

      {tab !== 'fitrah' && (
        <Card>
          <Field>
            <label htmlFor="emas">Harga Emas per Gram (Rp)</label>
            <TextInput
              id="emas"
              inputMode="numeric"
              placeholder="cth: 1.550.000"
              value={formatInput(hargaEmas)}
              onChange={(e) => setHargaEmas(parseAngka(e.target.value))}
            />
          </Field>
          <Catatan>
            <FaInfoCircle /> Perbarui dengan harga emas terbaru (Antam) agar nisab akurat.
          </Catatan>
        </Card>
      )}

      {tab === 'mal' && (
        <Card>
          <Field>
            <label htmlFor="harta">Total Harta (tabungan, emas, aset — Rp)</label>
            <TextInput
              id="harta"
              inputMode="numeric"
              placeholder="cth: 200.000.000"
              value={formatInput(harta)}
              onChange={(e) => setHarta(parseAngka(e.target.value))}
            />
          </Field>
          <ResultRow>
            <span className="label">Nisab (85 gram emas)</span>
            <span className="value">{formatRupiah(hasilMal.nisab)}</span>
          </ResultRow>
          <div css={{ margin: '10px 0 4px' }}>
            <LencanaWajib wajib={hasilMal.wajib}>
              <FaCheckCircle /> {hasilMal.wajib ? 'Wajib zakat' : 'Belum mencapai nisab'}
            </LencanaWajib>
          </div>
          <ResultRow>
            <span className="label">Zakat Mal (2,5%)</span>
            <span className="value">{formatRupiah(hasilMal.zakat)}</span>
          </ResultRow>
          <Catatan>
            <FaInfoCircle /> Zakat mal dikeluarkan bila harta dimiliki penuh selama 1 tahun
            (haul) dan mencapai nisab.
          </Catatan>
        </Card>
      )}

      {tab === 'profesi' && (
        <Card>
          <Field>
            <label htmlFor="gaji">Penghasilan per Bulan (Rp)</label>
            <TextInput
              id="gaji"
              inputMode="numeric"
              placeholder="cth: 12.000.000"
              value={formatInput(gaji)}
              onChange={(e) => setGaji(parseAngka(e.target.value))}
            />
          </Field>
          <ResultRow>
            <span className="label">Nisab per Bulan (85 gr emas ÷ 12)</span>
            <span className="value">{formatRupiah(hasilProfesi.nisabBulanan)}</span>
          </ResultRow>
          <div css={{ margin: '10px 0 4px' }}>
            <LencanaWajib wajib={hasilProfesi.wajib}>
              <FaCheckCircle /> {hasilProfesi.wajib ? 'Wajib zakat' : 'Belum mencapai nisab'}
            </LencanaWajib>
          </div>
          <ResultRow>
            <span className="label">Zakat Profesi per Bulan (2,5%)</span>
            <span className="value">{formatRupiah(hasilProfesi.zakat)}</span>
          </ResultRow>
        </Card>
      )}

      {tab === 'fitrah' && (
        <GoldCard>
          <Field>
            <label htmlFor="jiwa">Jumlah Jiwa</label>
            <TextInput
              id="jiwa"
              type="number"
              min="1"
              value={jiwa}
              onChange={(e) => setJiwa(Number(e.target.value))}
            />
          </Field>
          <Field>
            <label htmlFor="beras">Harga Beras per Kg (Rp) — untuk opsi uang</label>
            <TextInput
              id="beras"
              inputMode="numeric"
              placeholder="cth: 14.000"
              value={formatInput(hargaBeras)}
              onChange={(e) => setHargaBeras(parseAngka(e.target.value))}
            />
          </Field>
          <ResultRow>
            <span className="label">Zakat Fitrah (beras)</span>
            <span className="value">
              {hasilFitrah.totalBerasKg.toLocaleString('id-ID')} kg
            </span>
          </ResultRow>
          <ResultRow>
            <span className="label">Atau senilai uang</span>
            <span className="value">{formatRupiah(hasilFitrah.totalUang)}</span>
          </ResultRow>
          <Catatan>
            <FaInfoCircle /> Zakat fitrah 2,5 kg beras per jiwa, dibayarkan sebelum shalat Idul
            Fitri.
          </Catatan>
        </GoldCard>
      )}

      <SectionTitle>Catatan</SectionTitle>
      <Card css={{ fontSize: 13.5, color: '#64748B' }}>
        Kalkulator ini alat bantu hitung. Untuk penetapan resmi (termasuk utang/piutang dan haul),
        silakan konsultasikan ke amil zakat / BAZNAS setempat.
      </Card>
    </Page>
  );
}
