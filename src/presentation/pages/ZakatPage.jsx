/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaCoins, FaBriefcase, FaHandshake, FaGem, FaSeedling, FaPaw, FaStore,
  FaCheckCircle, FaInfoCircle,
} from 'react-icons/fa';
import {
  hitungZakatMal, hitungZakatProfesi, hitungZakatFitrah, formatRupiah,
  hitungZakatEmasPerak, hitungZakatPertanian, hitungZakatPeternakan, hitungZakatPerdagangan,
  HARGA_EMAS_DEFAULT, HARGA_PERAK_DEFAULT, HARGA_BERAS_DEFAULT, EMAS_NISAB_GRAM,
  PERAK_NISAB_GRAM, PERTANIAN_NISAB_GABAH_KG, PERTANIAN_NISAB_BERAS_KG, NISAB_TERNAK,
} from '../../domain/usecases/hitungZakat.js';
import {
  Page, PageHero, Card, SectionTitle, Field, TextInput, ResultRow, GoldCard,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab, SegmenKompakWadah, SegmenKompak } from '../components/SegmentedControl.jsx';

const LencanaWajib = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  background: ${({ theme, wajib }) => (wajib ? theme.colors.goldSoft : theme.colors.primarySoft)};
  color: ${({ theme, wajib }) => (wajib ? theme.colors.goldDeep : theme.colors.judul)};
  border: 1px solid ${({ theme, wajib }) => (wajib ? theme.colors.gold : theme.colors.primarySoft)};
`;

const GrupLabel = styled.p`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 8px;
`;

const SegmenBungkus = styled(SegmenWadah)`
  flex-wrap: wrap;
  border-radius: 22px;
`;

const SegmenDuaKolom = ({ children, ...props }) => (
  <SegmenTab css={{ flex: '1 1 42%', minHeight: 44 }} {...props}>
    {children}
  </SegmenTab>
);

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
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
const parseDesimal = (s) => {
  const n = Number(String(s).replace(',', '.').replace(/[^\d.]/g, ''));
  return Number.isFinite(n) ? n : 0;
};
const formatInput = (n) => (n > 0 ? n.toLocaleString('id-ID') : '');
const formatKg = (n) =>
  Number(n).toLocaleString('id-ID', { maximumFractionDigits: 2 });

const SEGMENT_TOUCH = { minHeight: 44 };

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
  // Emas & Perak
  const [logam, setLogam] = useState('emas');
  const [beratLogam, setBeratLogam] = useState('');
  const [hargaLogam, setHargaLogam] = useState(HARGA_EMAS_DEFAULT);
  // Pertanian
  const [satuanTani, setSatuanTani] = useState('gabah');
  const [panenKg, setPanenKg] = useState(0);
  const [pengairan, setPengairan] = useState('hujan');
  const [hargaTani, setHargaTani] = useState(0);
  // Peternakan
  const [hewan, setHewan] = useState('kambing');
  const [ekor, setEkor] = useState(0);
  // Perdagangan
  const [modal, setModal] = useState(0);
  const [untung, setUntung] = useState(0);
  const [piutang, setPiutang] = useState(0);
  const [utang, setUtang] = useState(0);

  const hasilMal = useMemo(() => hitungZakatMal(harta, hargaEmas), [harta, hargaEmas]);
  const hasilProfesi = useMemo(() => hitungZakatProfesi(gaji, hargaEmas), [gaji, hargaEmas]);
  const hasilFitrah = useMemo(() => hitungZakatFitrah(jiwa, hargaBeras), [jiwa, hargaBeras]);
  const hasilLogam = useMemo(
    () => hitungZakatEmasPerak(logam, parseDesimal(beratLogam), hargaLogam),
    [logam, beratLogam, hargaLogam],
  );
  const hasilTani = useMemo(
    () => hitungZakatPertanian(panenKg, satuanTani, pengairan, hargaTani),
    [panenKg, satuanTani, pengairan, hargaTani],
  );
  const hasilTernak = useMemo(
    () => hitungZakatPeternakan(hewan, ekor),
    [hewan, ekor],
  );
  const hasilDagang = useMemo(
    () => hitungZakatPerdagangan(modal, untung, piutang, utang, hargaEmas),
    [modal, untung, piutang, utang, hargaEmas],
  );

  const gantiLogam = (j) => {
    setLogam(j);
    setHargaLogam(j === 'perak' ? HARGA_PERAK_DEFAULT : HARGA_EMAS_DEFAULT);
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaCoins /> Kalkulator Zakat
        </h2>
        <p>
          Hitung zakat mal, profesi, fitrah, emas-perak, pertanian, peternakan, dan perdagangan.
          Nisab acuan: 85 gram emas, kadar 2,5%.
        </p>
      </PageHero>

      <GrupLabel>Zakat Utama</GrupLabel>
      <SegmenWadah role="tablist" aria-label="Jenis zakat utama">
        <SegmenTab css={SEGMENT_TOUCH} aktif={tab === 'mal'} onClick={() => setTab('mal')}>
          <FaCoins /> Zakat Mal
        </SegmenTab>
        <SegmenTab css={SEGMENT_TOUCH} aktif={tab === 'profesi'} onClick={() => setTab('profesi')}>
          <FaBriefcase /> Profesi
        </SegmenTab>
        <SegmenTab css={SEGMENT_TOUCH} aktif={tab === 'fitrah'} onClick={() => setTab('fitrah')}>
          <FaHandshake /> Fitrah
        </SegmenTab>
      </SegmenWadah>

      <GrupLabel>Zakat Lainnya</GrupLabel>
      <SegmenBungkus role="tablist" aria-label="Jenis zakat lainnya">
        <SegmenDuaKolom aktif={tab === 'emasPerak'} onClick={() => setTab('emasPerak')}>
          <FaGem /> Emas & Perak
        </SegmenDuaKolom>
        <SegmenDuaKolom aktif={tab === 'pertanian'} onClick={() => setTab('pertanian')}>
          <FaSeedling /> Pertanian
        </SegmenDuaKolom>
        <SegmenDuaKolom aktif={tab === 'peternakan'} onClick={() => setTab('peternakan')}>
          <FaPaw /> Peternakan
        </SegmenDuaKolom>
        <SegmenDuaKolom aktif={tab === 'perdagangan'} onClick={() => setTab('perdagangan')}>
          <FaStore /> Perdagangan
        </SegmenDuaKolom>
      </SegmenBungkus>

      {(tab === 'mal' || tab === 'profesi' || tab === 'perdagangan') && (
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
          <div role="status" aria-label="Hasil hitung zakat mal">
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
          </div>
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
          <div role="status" aria-label="Hasil hitung zakat profesi">
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
          </div>
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
          <div role="status" aria-label="Hasil hitung zakat fitrah">
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
          </div>
          <Catatan>
            <FaInfoCircle /> Zakat fitrah 2,5 kg beras per jiwa, dibayarkan sebelum shalat Idul
            Fitri.
          </Catatan>
        </GoldCard>
      )}

      {tab === 'emasPerak' && (
        <Card>
          <GrupLabel>Jenis logam</GrupLabel>
          <SegmenWadah role="tablist" aria-label="Jenis logam">
            <SegmenTab css={SEGMENT_TOUCH} aktif={logam === 'emas'} onClick={() => gantiLogam('emas')}>
              <FaGem /> Emas
            </SegmenTab>
            <SegmenTab css={SEGMENT_TOUCH} aktif={logam === 'perak'} onClick={() => gantiLogam('perak')}>
              <FaCoins /> Perak
            </SegmenTab>
          </SegmenWadah>
          <Field>
            <label htmlFor="berat">Berat {logam} (gram, bisa desimal)</label>
            <TextInput
              id="berat"
              inputMode="decimal"
              placeholder="cth: 100"
              value={beratLogam}
              onChange={(e) => setBeratLogam(e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="hargalogam">Harga {logam} per Gram (Rp)</label>
            <TextInput
              id="hargalogam"
              inputMode="numeric"
              placeholder={logam === 'emas' ? 'cth: 1.550.000' : 'cth: 18.000'}
              value={formatInput(hargaLogam)}
              onChange={(e) => setHargaLogam(parseAngka(e.target.value))}
            />
          </Field>
          <div role="status" aria-label="Hasil hitung zakat emas dan perak">
            <ResultRow>
              <span className="label">
                Nisab {logam} ({logam === 'emas' ? EMAS_NISAB_GRAM : PERAK_NISAB_GRAM} gram)
              </span>
              <span className="value">{formatRupiah(hasilLogam.nisabGram * hargaLogam)}</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Total nilai {logam} Anda</span>
              <span className="value">{formatRupiah(hasilLogam.nilai)}</span>
            </ResultRow>
            <div css={{ margin: '10px 0 4px' }}>
              <LencanaWajib wajib={hasilLogam.wajib}>
                <FaCheckCircle /> {hasilLogam.wajib ? 'Mencapai nisab — wajib zakat' : 'Belum mencapai nisab'}
              </LencanaWajib>
            </div>
            <ResultRow>
              <span className="label">Zakat (2,5%)</span>
              <span className="value">{formatRupiah(hasilLogam.zakat)}</span>
            </ResultRow>
            {hasilLogam.wajib && (
              <ResultRow>
                <span className="label">Atau dalam {logam}</span>
                <span className="value">{formatKg(hasilLogam.zakatGram)} gram</span>
              </ResultRow>
            )}
          </div>
          <Catatan>
            <FaInfoCircle /> Nisab emas 85 gram, nisab perak 595 gram; zakat 2,5% bila dimiliki
            penuh selama 1 haul.
          </Catatan>
        </Card>
      )}

      {tab === 'pertanian' && (
        <Card>
          <GrupLabel>Satuan hasil</GrupLabel>
          <SegmenKompakWadah role="tablist" aria-label="Satuan hasil panen" css={{ marginBottom: 16 }}>
            <SegmenKompak role="tab" aria-selected={satuanTani === 'gabah'} aktif={satuanTani === 'gabah'} onClick={() => setSatuanTani('gabah')}>
              Gabah
            </SegmenKompak>
            <SegmenKompak role="tab" aria-selected={satuanTani === 'beras'} aktif={satuanTani === 'beras'} onClick={() => setSatuanTani('beras')}>
              Beras
            </SegmenKompak>
          </SegmenKompakWadah>
          <Field>
            <label htmlFor="hasil">Hasil panen (kg {satuanTani})</label>
            <TextInput
              id="hasil"
              inputMode="numeric"
              placeholder="cth: 1.000"
              value={formatInput(panenKg)}
              onChange={(e) => setPanenKg(parseAngka(e.target.value))}
            />
          </Field>
          <GrupLabel>Jenis pengairan</GrupLabel>
          <SegmenBungkus role="tablist" aria-label="Jenis pengairan">
            <SegmenDuaKolom aktif={pengairan === 'hujan'} onClick={() => setPengairan('hujan')}>
              Hujan/tadah (10%)
            </SegmenDuaKolom>
            <SegmenDuaKolom aktif={pengairan === 'irigasi'} onClick={() => setPengairan('irigasi')}>
              Irigasi berbiaya (5%)
            </SegmenDuaKolom>
            <SegmenDuaKolom aktif={pengairan === 'campuran'} onClick={() => setPengairan('campuran')}>
              Campuran (7,5%)
            </SegmenDuaKolom>
          </SegmenBungkus>
          <Field>
            <label htmlFor="hargatani">Harga per kg (Rp) — opsional, untuk nilai uang</label>
            <TextInput
              id="hargatani"
              inputMode="numeric"
              placeholder="cth: 6.000"
              value={formatInput(hargaTani)}
              onChange={(e) => setHargaTani(parseAngka(e.target.value))}
            />
          </Field>
          <div role="status" aria-label="Hasil hitung zakat pertanian">
            <ResultRow>
              <span className="label">
                Nisab ({satuanTani === 'beras' ? PERTANIAN_NISAB_BERAS_KG : PERTANIAN_NISAB_GABAH_KG} kg {satuanTani})
              </span>
              <span className="value">{formatKg(hasilTani.nisabKg)} kg</span>
            </ResultRow>
            <div css={{ margin: '10px 0 4px' }}>
              <LencanaWajib wajib={hasilTani.wajib}>
                <FaCheckCircle /> {hasilTani.wajib ? 'Mencapai nisab — wajib zakat' : 'Belum mencapai nisab'}
              </LencanaWajib>
            </div>
            <ResultRow>
              <span className="label">Zakat ({(hasilTani.persen * 100).toLocaleString('id-ID')}%)</span>
              <span className="value">{formatKg(hasilTani.zakatKg)} kg</span>
            </ResultRow>
            {hargaTani > 0 && (
              <ResultRow>
                <span className="label">Atau senilai uang</span>
                <span className="value">{formatRupiah(hasilTani.zakatUang)}</span>
              </ResultRow>
            )}
          </div>
          <Catatan>
            <FaInfoCircle /> Zakat pertanian dikeluarkan saat panen, tanpa menunggu haul. Nisab
            653 kg gabah (±522 kg beras) setara 5 wasaq.
          </Catatan>
        </Card>
      )}

      {tab === 'peternakan' && (
        <Card>
          <GrupLabel>Jenis hewan</GrupLabel>
          <SegmenBungkus role="tablist" aria-label="Jenis hewan ternak">
            <SegmenDuaKolom aktif={hewan === 'kambing'} onClick={() => setHewan('kambing')}>
              <FaPaw /> Kambing
            </SegmenDuaKolom>
            <SegmenDuaKolom aktif={hewan === 'sapi'} onClick={() => setHewan('sapi')}>
              Sapi/Kerbau
            </SegmenDuaKolom>
            <SegmenDuaKolom aktif={hewan === 'unta'} onClick={() => setHewan('unta')}>
              Unta
            </SegmenDuaKolom>
          </SegmenBungkus>
          <Field>
            <label htmlFor="ekor">Jumlah ekor</label>
            <TextInput
              id="ekor"
              inputMode="numeric"
              placeholder="cth: 50"
              value={formatInput(ekor)}
              onChange={(e) => setEkor(parseAngka(e.target.value))}
            />
          </Field>
          <div role="status" aria-label="Hasil hitung zakat peternakan">
            <ResultRow>
              <span className="label">Nisab {hewan}</span>
              <span className="value">{NISAB_TERNAK[hewan]} ekor</span>
            </ResultRow>
            <div css={{ margin: '10px 0 4px' }}>
              <LencanaWajib wajib={hasilTernak.wajib}>
                <FaCheckCircle /> {hasilTernak.wajib ? 'Mencapai nisab — wajib zakat' : 'Belum mencapai nisab'}
              </LencanaWajib>
            </div>
            <ResultRow>
              <span className="label">Kewajiban yang dikeluarkan</span>
              <span className="value" css={{ fontSize: 16.5, lineHeight: 1.5 }}>
                {hasilTernak.wajib ? hasilTernak.kewajiban : '—'}
              </span>
            </ResultRow>
          </div>
          <Catatan>
            <FaInfoCircle /> Syarat ringkas: hewan dimiliki penuh selama 1 haul dan digembalakan
            bebas (sa’imah) sebagian besar tahunnya. Rincian di atas menurut tabel nisab klasik
            (untuk unta di atas 120 ekor memakai pendekatan per 40/per 50).
          </Catatan>
        </Card>
      )}

      {tab === 'perdagangan' && (
        <Card>
          <Field>
            <label htmlFor="modal">Modal berputar / barang dagangan (Rp)</label>
            <TextInput
              id="modal"
              inputMode="numeric"
              placeholder="cth: 150.000.000"
              value={formatInput(modal)}
              onChange={(e) => setModal(parseAngka(e.target.value))}
            />
          </Field>
          <Field>
            <label htmlFor="untung">Keuntungan terkumpul (Rp)</label>
            <TextInput
              id="untung"
              inputMode="numeric"
              placeholder="cth: 50.000.000"
              value={formatInput(untung)}
              onChange={(e) => setUntung(parseAngka(e.target.value))}
            />
          </Field>
          <Field>
            <label htmlFor="piutang">Piutang tertagih (Rp)</label>
            <TextInput
              id="piutang"
              inputMode="numeric"
              placeholder="cth: 10.000.000"
              value={formatInput(piutang)}
              onChange={(e) => setPiutang(parseAngka(e.target.value))}
            />
          </Field>
          <Field>
            <label htmlFor="utang">Utang jatuh tempo (Rp)</label>
            <TextInput
              id="utang"
              inputMode="numeric"
              placeholder="cth: 10.000.000"
              value={formatInput(utang)}
              onChange={(e) => setUtang(parseAngka(e.target.value))}
            />
          </Field>
          <div role="status" aria-label="Hasil hitung zakat perdagangan">
            <ResultRow>
              <span className="label">Total harta dagang</span>
              <span className="value">{formatRupiah(hasilDagang.totalHarta)}</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Nisab (85 gram emas)</span>
              <span className="value">{formatRupiah(hasilDagang.nisab)}</span>
            </ResultRow>
            <div css={{ margin: '10px 0 4px' }}>
              <LencanaWajib wajib={hasilDagang.wajib}>
                <FaCheckCircle /> {hasilDagang.wajib ? 'Wajib zakat' : 'Belum mencapai nisab'}
              </LencanaWajib>
            </div>
            <ResultRow>
              <span className="label">Zakat (2,5%)</span>
              <span className="value">{formatRupiah(hasilDagang.zakat)}</span>
            </ResultRow>
          </div>
          <Catatan>
            <FaInfoCircle /> Total = modal + keuntungan + piutang − utang jatuh tempo; zakat
            bila mencapai nisab dan telah 1 haul.
          </Catatan>
        </Card>
      )}

      <SectionTitle>Catatan</SectionTitle>
      <Card css={(t) => ({ fontSize: 13.5, color: t.colors.muted })}>
        Kalkulator ini alat bantu hitung. Untuk penetapan resmi (termasuk utang/piutang, haul,
        dan kondisi khusus), silakan konsultasikan ke amil zakat / BAZNAS setempat.
      </Card>
    </Page>
  );
}
