/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaHandHoldingHeart, FaUtensils, FaInfoCircle, FaBalanceScale,
} from 'react-icons/fa';
import {
  hitungFidyah, MUD_KG, FIDYAH_PRAKTIK_KG, HARGA_PORSI_DEFAULT,
} from '../../domain/usecases/hitungFidyah.js';
import { formatRupiah, HARGA_BERAS_DEFAULT } from '../../domain/usecases/hitungZakat.js';
import {
  Page, PageHero, Card, SectionTitle, Field, TextInput, ResultRow,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';

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

const Daftar = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text};
`;

const parseAngka = (s) => {
  const n = Number(String(s).replace(/[^\d]/g, ''));
  return Number.isFinite(n) ? n : 0;
};
const formatInput = (n) => (n > 0 ? n.toLocaleString('id-ID') : '');
const formatKg = (n) => Number(n).toLocaleString('id-ID', { maximumFractionDigits: 3 });

export default function FidyahPage() {
  const [hari, setHari] = useState(30);
  const [paket, setPaket] = useState('beras15');
  const [hargaBeras, setHargaBeras] = useState(HARGA_BERAS_DEFAULT);
  const [hargaPorsi, setHargaPorsi] = useState(HARGA_PORSI_DEFAULT);

  const modeUang = paket === 'uang';
  const hasil = useMemo(
    () => hitungFidyah(hari, paket, modeUang ? hargaPorsi : hargaBeras),
    [hari, paket, modeUang, hargaPorsi, hargaBeras],
  );

  return (
    <Page>
      <PageHero>
        <h2>
          <FaHandHoldingHeart /> Kalkulator Fidyah
        </h2>
        <p>
          Fidyah adalah memberi makan orang miskin untuk setiap hari puasa yang ditinggalkan oleh
          orang yang tidak mampu berpuasa selamanya.
        </p>
      </PageHero>

      <SectionTitle>
        <FaInfoCircle /> Siapa yang Wajib Fidyah?
      </SectionTitle>
      <Card>
        <Daftar>
          <li>
            <strong>Orang tua renta</strong> yang sudah tidak kuat berpuasa dan tidak diharapkan
            kembali kuat.
          </li>
          <li>
            <strong>Orang sakit menahun</strong> yang menurut keterangan medis tidak ada harapan
            sembuh, sehingga tidak mampu berpuasa dan tidak bisa mengqadha.
          </li>
          <li>
            Orang yang mampu berpuasa tetap wajib <strong>mengqadha</strong> — fidyah bukan
            pengganti qadha bagi yang masih mampu.
          </li>
        </Daftar>
        <Catatan>
          <FaBalanceScale /> Mengenai ibu hamil dan menyusui terdapat perbedaan pendapat ulama:
          sebagian mewajibkan qadha saja, sebagian qadha disertai fidyah, dan sebagian fidyah
          saja bila tidak berpuasa karena khawatir pada anak. Ikuti pendapat yang diyakini /
          guru setempat.
        </Catatan>
      </Card>

      <SectionTitle>
        <FaUtensils /> Hitung Fidyah
      </SectionTitle>
      <Card>
        <Field>
          <label htmlFor="hari">Jumlah hari puasa yang ditinggalkan</label>
          <TextInput
            id="hari"
            type="number"
            min="0"
            value={hari}
            onChange={(e) => setHari(Number(e.target.value))}
          />
        </Field>

        <p css={(t) => ({ fontSize: t.type.caption.size, fontWeight: 600, color: t.colors.muted, marginBottom: 6 })}>
          Besaran per hari
        </p>
        <SegmenWadah role="tablist" aria-label="Besaran fidyah per hari">
          <SegmenTab css={{ minHeight: 44 }} aktif={paket === 'beras15'} onClick={() => setPaket('beras15')}>
            {FIDYAH_PRAKTIK_KG.toLocaleString('id-ID')} kg beras
          </SegmenTab>
          <SegmenTab css={{ minHeight: 44 }} aktif={paket === 'mud'} onClick={() => setPaket('mud')}>
            1 mud
          </SegmenTab>
          <SegmenTab css={{ minHeight: 44 }} aktif={paket === 'uang'} onClick={() => setPaket('uang')}>
            Uang 1× makan
          </SegmenTab>
        </SegmenWadah>
        <Catatan>
          <FaInfoCircle />
          {paket === 'beras15' &&
            `Praktik umum di Indonesia: ${FIDYAH_PRAKTIK_KG.toLocaleString('id-ID')} kg beras per hari.`}
          {paket === 'mud' &&
            `Satu mud ≈ ${MUD_KG.toLocaleString('id-ID')} kg bahan makanan pokok per hari.`}
          {paket === 'uang' && 'Nilai uang setara harga 1× makan per hari (sesuaikan harga setempat).'}
        </Catatan>

        {modeUang ? (
          <Field>
            <label htmlFor="porsi">Harga 1× makan (Rp)</label>
            <TextInput
              id="porsi"
              inputMode="numeric"
              placeholder="cth: 15.000"
              value={formatInput(hargaPorsi)}
              onChange={(e) => setHargaPorsi(parseAngka(e.target.value))}
            />
          </Field>
        ) : (
          <Field>
            <label htmlFor="hargaberas">Harga beras per kg (Rp)</label>
            <TextInput
              id="hargaberas"
              inputMode="numeric"
              placeholder="cth: 14.000"
              value={formatInput(hargaBeras)}
              onChange={(e) => setHargaBeras(parseAngka(e.target.value))}
            />
          </Field>
        )}

        <div role="status" aria-label="Hasil hitung fidyah">
          {!modeUang && (
            <ResultRow>
              <span className="label">Total fidyah (beras)</span>
              <span className="value">{formatKg(hasil.totalKg)} kg</span>
            </ResultRow>
          )}
          <ResultRow>
            <span className="label">{modeUang ? 'Total fidyah (uang)' : 'Atau senilai uang'}</span>
            <span className="value">{formatRupiah(hasil.totalRp)}</span>
          </ResultRow>
        </div>
        <Catatan>
          <FaInfoCircle /> Fidyah diberikan kepada fakir miskin — boleh per hari atau sekaligus
          untuk seluruh hari, sesuai kebiasaan setempat.
        </Catatan>
      </Card>

      <Card css={(t) => ({ fontSize: 13.5, color: t.colors.muted })}>
        Konten halaman ini ringkasan edukasi — bukan fatwa. Untuk kasus khusus, silakan
        konsultasikan ke ulama atau amil zakat setempat.
      </Card>
    </Page>
  );
}
