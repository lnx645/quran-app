/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import {
  FaBalanceScale, FaInfoCircle, FaExclamationTriangle, FaBan, FaUsers,
} from 'react-icons/fa';
import KotakCentang from '../components/KotakCentang.jsx';
import { hitungWaris, teksPecahan } from '../../domain/usecases/hitungWaris.js';
import { formatRupiah } from '../../domain/usecases/hitungZakat.js';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, Field, TextInput, SelectInput, ResultRow,
} from '../components/common.jsx';

const LABEL_STATUS = {
  fardhu: 'Fardhu (bagian pasti)',
  ashabah: "'Ashabah (pengambil sisa)",
  'fardhu-ashabah': "Fardhu + 'Ashabah",
  terhalang: 'Terhalang (mahjub)',
};

const PENJELASAN_KASUS = {
  aul: "Terjadi 'AUL — total bagian fardhu melebihi harta (lebih dari 1), sehingga semua bagian fardhu disusutkan secara proporsional.",
  radd: 'Terjadi RADD — sisa harta dikembalikan secara proporsional kepada ahli waris fardhu selain pasangan.',
  ashabah: "Sisa harta setelah fardhu diambil oleh ahli waris 'ashabah.",
  pas: 'Bagian fardhu tepat menghabiskan seluruh harta — tidak ada sisa.',
  'sisa-tak-terbagi':
    'Ada sisa harta yang tidak terbagi karena tidak ada penerima radd maupun \'ashabah (lihat catatan di hasil).',
};

const parseAngka = (s) => {
  const n = Number(String(s).replace(/[^\d]/g, ''));
  return Number.isFinite(n) ? n : 0;
};
const formatInput = (n) => (n > 0 ? n.toLocaleString('id-ID') : '');
const formatPersen = (p) => `${p.toLocaleString('id-ID', { maximumFractionDigits: 2 })}%`;

export default function WarisPage() {
  const [harta, setHarta] = useState(0);
  const [pasangan, setPasangan] = useState('tidak-ada');
  const [ayah, setAyah] = useState(false);
  const [ibu, setIbu] = useState(false);
  const [anakLaki, setAnakLaki] = useState('0');
  const [anakPerempuan, setAnakPerempuan] = useState('0');
  const [saudaraLaki, setSaudaraLaki] = useState('0');
  const [saudaraPerempuan, setSaudaraPerempuan] = useState('0');

  const hasil = useMemo(
    () =>
      hitungWaris({
        totalHarta: harta,
        pasangan,
        ayah,
        ibu,
        anakLaki,
        anakPerempuan,
        saudaraLaki,
        saudaraPerempuan,
      }),
    [harta, pasangan, ayah, ibu, anakLaki, anakPerempuan, saudaraLaki, saudaraPerempuan],
  );

  return (
    <Page>
      <PageHero>
        <h2>
          <FaBalanceScale /> Kalkulator Waris (Faraidh)
        </h2>
        <p>
          Hitung pembagian waris dasar untuk pasangan, ayah, ibu, anak, dan saudara kandung —
          lengkap dengan &apos;aul, radd, dan &apos;ashabah.
        </p>
      </PageHero>

      <Card
        css={(t) => ({
          fontSize: 13.5,
          lineHeight: 1.6,
          color: t.colors.goldDeep,
          background: t.colors.goldSoft,
          borderColor: t.colors.gold,
          display: 'flex',
          gap: 8,
        })}
      >
        <FaExclamationTriangle css={{ flexShrink: 0, marginTop: 3 }} aria-hidden />
        <span>
          <strong>Ringkasan edukasi — bukan fatwa;</strong> untuk kasus nyata konsultasikan ke
          ahli faraidh/pengadilan agama.
        </span>
      </Card>

      <SectionTitle>
        <FaUsers /> Data Ahli Waris
      </SectionTitle>
      <Card>
        <Field>
          <label htmlFor="harta">Total Harta Bersih (Rp)</label>
          <TextInput
            id="harta"
            inputMode="numeric"
            placeholder="cth: 240.000.000"
            value={formatInput(harta)}
            onChange={(e) => setHarta(parseAngka(e.target.value))}
          />
          <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, marginTop: 6, lineHeight: 1.55 })}>
            Harta bersih = setelah biaya pengurusan jenazah, pelunasan utang, dan wasiat
            (maks. 1/3 untuk bukan ahli waris).
          </p>
        </Field>

        <Field>
          <label htmlFor="pasangan">Pasangan yang Ditinggalkan</label>
          <SelectInput
            id="pasangan"
            value={pasangan}
            onChange={(e) => setPasangan(e.target.value)}
          >
            <option value="tidak-ada">Tidak ada pasangan</option>
            <option value="suami">Suami (yang wafat adalah istri)</option>
            <option value="istri">Istri (yang wafat adalah suami) — dihitung 1 istri</option>
          </SelectInput>
          <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, marginTop: 6, lineHeight: 1.55 })}>
            Bila istri lebih dari satu, bagian istri dibagi rata di antara mereka — kalkulator
            ini menyederhanakan menjadi 1 istri.
          </p>
        </Field>

        <Field>
          <label>Orang Tua Pewaris (yang masih hidup)</label>
          <KotakCentang id="ayah" checked={ayah} onChange={(e) => setAyah(e.target.checked)}>
            Ayah masih hidup
          </KotakCentang>
          <KotakCentang id="ibu" checked={ibu} onChange={(e) => setIbu(e.target.checked)}>
            Ibu masih hidup
          </KotakCentang>
        </Field>

        <Field>
          <label htmlFor="anak-laki">Jumlah Anak Laki-laki</label>
          <TextInput
            id="anak-laki"
            type="number"
            min="0"
            max="99"
            value={anakLaki}
            onChange={(e) => setAnakLaki(e.target.value)}
          />
        </Field>
        <Field>
          <label htmlFor="anak-perempuan">Jumlah Anak Perempuan</label>
          <TextInput
            id="anak-perempuan"
            type="number"
            min="0"
            max="99"
            value={anakPerempuan}
            onChange={(e) => setAnakPerempuan(e.target.value)}
          />
        </Field>
        <Field>
          <label htmlFor="saudara-laki">Jumlah Saudara Laki-laki Kandung</label>
          <TextInput
            id="saudara-laki"
            type="number"
            min="0"
            max="99"
            value={saudaraLaki}
            onChange={(e) => setSaudaraLaki(e.target.value)}
          />
        </Field>
        <Field>
          <label htmlFor="saudara-perempuan">Jumlah Saudara Perempuan Kandung</label>
          <TextInput
            id="saudara-perempuan"
            type="number"
            min="0"
            max="99"
            value={saudaraPerempuan}
            onChange={(e) => setSaudaraPerempuan(e.target.value)}
          />
        </Field>
      </Card>

      <SectionTitle>
        <FaBalanceScale /> Hasil Pembagian
      </SectionTitle>

      {!hasil.valid ? (
        <Card css={(t) => ({ fontSize: 14, color: t.colors.muted, lineHeight: 1.6 })}>
          {hasil.pesan}
        </Card>
      ) : (
        <GoldCard>
          <div role="status" aria-label="Hasil perhitungan waris">
            {hasil.statusKasus.map((s) => (
              <p
                key={s}
                css={(t) => ({
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  fontWeight: 600,
                  color: t.colors.judul,
                  marginBottom: 8,
                  display: 'flex',
                  gap: 8,
                })}
              >
                <FaInfoCircle css={{ flexShrink: 0, marginTop: 3 }} aria-hidden />
                <span>{PENJELASAN_KASUS[s]}</span>
              </p>
            ))}

            {hasil.baris.map((b) => (
              <div
                key={b.kunci}
                css={(t) => ({
                  padding: '12px 0 4px',
                  borderTop: `1px solid ${t.colors.border}`,
                  marginTop: 8,
                })}
              >
                <div
                  css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}
                >
                  <strong css={(t) => ({ fontSize: 15.5, color: t.colors.judul })}>
                    {b.golongan}
                    {b.jumlah > 1 ? ` (${b.jumlah} orang)` : ''}
                  </strong>
                  <span
                    css={(t) => ({ fontSize: 12.5, fontWeight: 700, color: t.colors.goldDeep })}
                  >
                    {LABEL_STATUS[b.status]}
                  </span>
                </div>
                <ResultRow>
                  <span className="label">Dasar bagian</span>
                  <span className="value">{b.dasarBagian}</span>
                </ResultRow>
                <ResultRow>
                  <span className="label">Pecahan akhir</span>
                  <span className="value">{b.pecahanTeks}</span>
                </ResultRow>
                <ResultRow>
                  <span className="label">Persentase</span>
                  <span className="value">{formatPersen(b.persen)}</span>
                </ResultRow>
                <ResultRow>
                  <span className="label">Nominal{b.jumlah > 1 ? ' (kelompok)' : ''}</span>
                  <span className="value">{formatRupiah(b.nominal)}</span>
                </ResultRow>
                {b.perOrang && (
                  <ResultRow>
                    <span className="label">Per orang</span>
                    <span className="value">
                      {b.perOrang.pecahanTeks} · {formatRupiah(b.perOrang.nominal)}
                    </span>
                  </ResultRow>
                )}
                <p
                  css={(t) => ({
                    fontSize: 12.5,
                    lineHeight: 1.6,
                    color: t.colors.muted,
                    margin: '6px 0 8px',
                    display: 'flex',
                    gap: 7,
                  })}
                >
                  {b.status === 'terhalang' ? (
                    <FaBan css={{ flexShrink: 0, marginTop: 3 }} aria-hidden />
                  ) : (
                    <FaInfoCircle css={{ flexShrink: 0, marginTop: 3 }} aria-hidden />
                  )}
                  <span>{b.penjelasan}</span>
                </p>
              </div>
            ))}

            {hasil.sisaTakTerbagi.num > 0 && (
              <ResultRow>
                <span className="label">
                  Sisa tidak terbagi ({teksPecahan(hasil.sisaTakTerbagi)})
                </span>
                <span className="value">
                  {formatRupiah(Math.round(harta * (hasil.sisaTakTerbagi.num / hasil.sisaTakTerbagi.den)))}
                </span>
              </ResultRow>
            )}
            <ResultRow>
              <span className="label">Total terbagi</span>
              <span className="value">
                {teksPecahan(hasil.totalTerbagi)} dari harta
              </span>
            </ResultRow>
          </div>
          <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, lineHeight: 1.6, marginTop: 8 })}>
            Nominal dibulatkan ke rupiah terdekat. Pecahan akhir adalah dasar yang tepat —
            gunakan pecahan bila nominal hasil pembulatan berbeda sedikit dari total.
          </p>
        </GoldCard>
      )}

      <SectionTitle>Keterbatasan Kalkulator Ini</SectionTitle>
      <Card css={(t) => ({ fontSize: 13.5, lineHeight: 1.65, color: t.colors.muted })}>
        <p css={{ marginBottom: 8 }}>
          Kalkulator ini hanya mendukung: suami/istri (1 orang), ayah, ibu, anak laki-laki, anak
          perempuan, serta saudara laki-laki dan saudara perempuan <strong>kandung</strong>.
        </p>
        <p css={{ marginBottom: 8 }}>
          Belum didukung: kakek, nenek, cucu (anak dari anak), saudara seayah atau seibu, paman,
          anak angkat, wasiat wajibah, anak dalam kandungan, ahli waris yang berbeda agama,
          serta perbedaan pendapat mazhab — misalnya sebagian ulama memberi radd juga kepada
          pasangan. Kasus-kasus tersebut memerlukan perhitungan tersendiri.
        </p>
        <p css={{ display: 'flex', gap: 8 }}>
          <FaExclamationTriangle css={{ flexShrink: 0, marginTop: 3 }} aria-hidden />
          <span>
            <strong>Ringkasan edukasi — bukan fatwa;</strong> untuk kasus nyata konsultasikan ke
            ahli faraidh/pengadilan agama.
          </span>
        </p>
      </Card>
    </Page>
  );
}
