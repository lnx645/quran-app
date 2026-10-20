/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { FaExchangeAlt, FaCalendarAlt, FaBirthdayCake, FaSyncAlt } from 'react-icons/fa';
import { fetchGToHLengkap, fetchHToGLengkap } from '../../data/aladhanApi.js';
import {
  hitungUsia, ulangTahunHijriahBerikutnya,
} from '../../domain/usecases/hitungUsiaHijriah.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle, Field, TextInput,
  SelectInput, PrimaryButton, ErrorBox, LoadingBox, Spinner, ResultRow,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import { useToast } from '../components/feedback/toastStore.js';

// Nama bulan Hijriah (Indonesia) per nomor bulan 1–12.
const BULAN_HIJRIAH_ID = [
  'Muharram', 'Safar', 'Rabiulawal', 'Rabiulakhir', 'Jumadil Ula', 'Jumadil Akhir',
  'Rajab', "Sya'ban", 'Ramadan', 'Syawal', "Dzulqa'dah", 'Dzulhijjah',
];

// Nama bulan Hijriah dari nama Inggris API Aladhan (dengan diakritik).
const BULAN_DARI_EN = {
  Muharram: 'Muharram', 'Muḥarram': 'Muharram', 'Ṣafar': 'Safar',
  'Rabīʿ al-awwal': 'Rabiulawal', 'Rabīʿ al-thānī': 'Rabiulakhir',
  'Jumādá al-ūlá': 'Jumadil Ula', 'Jumādá al-ākhirah': 'Jumadil Akhir',
  Rajab: 'Rajab', 'Shaʿbān': "Sya'ban", 'Ramaḍān': 'Ramadan', Ramadan: 'Ramadan',
  'Shawwāl': 'Syawal', 'Dhū al-Qaʿdah': "Dzulqa'dah", 'Dhū al-Ḥijjah': 'Dzulhijjah',
};
const namaBulanHijriah = (h) =>
  BULAN_HIJRIAH_ID[Number(h?.month?.number) - 1] ??
  BULAN_DARI_EN[h?.month?.en] ??
  h?.month?.en ??
  '';

// Hari Inggris (gregorian.weekday.en) → Indonesia.
const HARI_DARI_EN = {
  Monday: 'Senin', Tuesday: 'Selasa', Wednesday: 'Rabu', Thursday: 'Kamis',
  Friday: 'Jumat', Saturday: 'Sabtu', Sunday: 'Ahad',
};
const namaHari = (en) => HARI_DARI_EN[en] ?? en ?? '';

const pad = (n) => String(n).padStart(2, '0');
const keIso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
/** 'YYYY-MM-DD' (input type=date) → Date lokal tengah malam; null bila tidak valid. */
const parseIso = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
};
/** 'YYYY-MM-DD' → 'DD-MM-YYYY' format path API Aladhan. */
const isoKeDdMmYyyy = (iso) => {
  const d = parseIso(iso);
  return d ? `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}` : null;
};
const fmtMasehi = (g) =>
  g ? `${namaHari(g.weekday?.en)}, ${g.day} ${g.month?.en ?? ''} ${g.year}` : '—';
const fmtHijriah = (h) =>
  h ? `${h.day} ${namaBulanHijriah(h)} ${h.year} H` : '—';

export default function KonverterPage() {
  const toast = useToast();
  const [mode, setMode] = useState('masehi');

  // --- Mode Masehi → Hijriah ---
  const [inputMasehi, setInputMasehi] = useState(() => keIso(new Date()));
  const [hasilMH, setHasilMH] = useState(null);
  const [muatMH, setMuatMH] = useState(false);
  const [gagalMH, setGagalMH] = useState('');

  // --- Mode Hijriah → Masehi ---
  const [hHari, setHHari] = useState('1');
  const [hBulan, setHBulan] = useState('1');
  const [hTahun, setHTahun] = useState('1447');
  const [hasilHM, setHasilHM] = useState(null);
  const [muatHM, setMuatHM] = useState(false);
  const [gagalHM, setGagalHM] = useState('');

  // --- Mode Usia Hijriah ---
  const [inputLahir, setInputLahir] = useState('');
  const [hasilUsia, setHasilUsia] = useState(null);
  const [muatUsia, setMuatUsia] = useState(false);
  const [gagalUsia, setGagalUsia] = useState('');

  const konversiMKeH = async () => {
    const str = isoKeDdMmYyyy(inputMasehi);
    if (!str) {
      setGagalMH('Pilih tanggal Masehi yang valid terlebih dahulu.');
      return;
    }
    setMuatMH(true);
    setGagalMH('');
    try {
      const data = await fetchGToHLengkap(str);
      setHasilMH(data);
    } catch {
      setHasilMH(null);
      setGagalMH('Konversi gagal. Periksa koneksi internet lalu coba lagi.');
    } finally {
      setMuatMH(false);
    }
  };

  const konversiHKeM = async () => {
    const hari = Number(hHari);
    const bulan = Number(hBulan);
    const tahun = Number(hTahun);
    if (!(hari >= 1 && hari <= 30) || !(bulan >= 1 && bulan <= 12) || !(tahun >= 1 && tahun <= 1600)) {
      setGagalHM('Periksa lagi: tanggal 1–30, bulan 1–12, tahun Hijriah 1–1600.');
      return;
    }
    setMuatHM(true);
    setGagalHM('');
    try {
      const data = await fetchHToGLengkap(`${pad(hari)}-${pad(bulan)}-${tahun}`);
      setHasilHM(data);
    } catch {
      setHasilHM(null);
      setGagalHM('Konversi gagal. Tanggal Hijriah itu mungkin tidak ada, atau koneksi bermasalah.');
    } finally {
      setMuatHM(false);
    }
  };

  const hitungUsiaSaya = async () => {
    const lahir = parseIso(inputLahir);
    if (!lahir) {
      setGagalUsia('Pilih tanggal lahir terlebih dahulu.');
      return;
    }
    const usia = hitungUsia(lahir, new Date());
    if (!usia) {
      setGagalUsia('Tanggal lahir tidak boleh di masa depan.');
      return;
    }
    setMuatUsia(true);
    setGagalUsia('');
    try {
      const [konvLahir, konvKini] = await Promise.all([
        fetchGToHLengkap(isoKeDdMmYyyy(inputLahir)),
        fetchGToHLengkap(isoKeDdMmYyyy(keIso(new Date()))),
      ]);
      const lahirH = konvLahir.hijri;
      const kiniH = konvKini.hijri;
      const ultahH = ulangTahunHijriahBerikutnya(
        { day: Number(lahirH.day), month: Number(lahirH.month?.number) },
        { day: Number(kiniH.day), month: Number(kiniH.month?.number), year: Number(kiniH.year) },
      );
      let ultahMasehi = null;
      try {
        const konvUltah = await fetchHToGLengkap(
          `${pad(ultahH.day)}-${pad(ultahH.month)}-${ultahH.year}`,
        );
        ultahMasehi = konvUltah.gregorian;
      } catch {
        /* tanggal Masehi ultah Hijriah tidak tersedia — tampilkan Hijriahnya saja */
      }
      setHasilUsia({ usia, lahirH, kiniH, ultahH, ultahMasehi });
      toast.sukses('Usia berhasil dihitung.');
    } catch {
      setHasilUsia(null);
      setGagalUsia('Gagal mengambil tanggal Hijriah. Periksa koneksi lalu coba lagi.');
    } finally {
      setMuatUsia(false);
    }
  };

  return (
    <Page>
      <PageTitle>
        <FaExchangeAlt /> Konverter Hijriah
      </PageTitle>
      <PageSubtitle>
        Konversi tanggal Masehi ↔ Hijriah (API Aladhan) dan hitung usia dalam tahun Hijriah.
      </PageSubtitle>

      <SegmenWadah role="tablist" aria-label="Mode konverter">
        <SegmenTab aktif={mode === 'masehi'} onClick={() => setMode('masehi')}>
          <FaCalendarAlt /> Ke Hijriah
        </SegmenTab>
        <SegmenTab aktif={mode === 'hijriah'} onClick={() => setMode('hijriah')}>
          <FaCalendarAlt /> Ke Masehi
        </SegmenTab>
        <SegmenTab aktif={mode === 'usia'} onClick={() => setMode('usia')}>
          <FaBirthdayCake /> Usia Hijriah
        </SegmenTab>
      </SegmenWadah>

      {mode === 'masehi' && (
        <>
          <Card>
            <Field>
              <label htmlFor="tgl-masehi">Tanggal Masehi</label>
              <TextInput
                id="tgl-masehi"
                type="date"
                value={inputMasehi}
                onChange={(e) => setInputMasehi(e.target.value)}
              />
            </Field>
            <PrimaryButton type="button" onClick={konversiMKeH} disabled={muatMH} css={{ width: '100%' }}>
              <FaSyncAlt /> Konversi ke Hijriah
            </PrimaryButton>
          </Card>
          {muatMH && (
            <LoadingBox>
              <Spinner /> Mengonversi…
            </LoadingBox>
          )}
          {gagalMH && <ErrorBox>{gagalMH}</ErrorBox>}
          {hasilMH && !muatMH && (
            <GoldCard aria-live="polite">
              <ResultRow>
                <span className="label">Tanggal Hijriah</span>
                <span className="value">{fmtHijriah(hasilMH.hijri)}</span>
              </ResultRow>
              <ResultRow>
                <span className="label">Hari</span>
                <span className="value">
                  {namaHari(hasilMH.gregorian?.weekday?.en)}
                  {hasilMH.hijri?.weekday?.ar ? ` · ${hasilMH.hijri.weekday.ar}` : ''}
                </span>
              </ResultRow>
              <ResultRow>
                <span className="label">Bulan Hijriah</span>
                <span className="value">
                  {namaBulanHijriah(hasilMH.hijri)}
                  {hasilMH.hijri?.month?.ar ? ` (${hasilMH.hijri.month.ar})` : ''}
                </span>
              </ResultRow>
              <ResultRow>
                <span className="label">Tanggal Masehi</span>
                <span className="value">{fmtMasehi(hasilMH.gregorian)}</span>
              </ResultRow>
            </GoldCard>
          )}
        </>
      )}

      {mode === 'hijriah' && (
        <>
          <Card>
            <div css={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 10 }}>
              <Field>
                <label htmlFor="h-hari">Tanggal</label>
                <TextInput
                  id="h-hari"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="30"
                  value={hHari}
                  onChange={(e) => setHHari(e.target.value)}
                />
              </Field>
              <Field>
                <label htmlFor="h-bulan">Bulan Hijriah</label>
                <SelectInput id="h-bulan" value={hBulan} onChange={(e) => setHBulan(e.target.value)}>
                  {BULAN_HIJRIAH_ID.map((nama, i) => (
                    <option key={nama} value={String(i + 1)}>
                      {i + 1}. {nama}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field>
                <label htmlFor="h-tahun">Tahun H</label>
                <TextInput
                  id="h-tahun"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="1600"
                  value={hTahun}
                  onChange={(e) => setHTahun(e.target.value)}
                />
              </Field>
            </div>
            <PrimaryButton type="button" onClick={konversiHKeM} disabled={muatHM} css={{ width: '100%' }}>
              <FaSyncAlt /> Konversi ke Masehi
            </PrimaryButton>
          </Card>
          {muatHM && (
            <LoadingBox>
              <Spinner /> Mengonversi…
            </LoadingBox>
          )}
          {gagalHM && <ErrorBox>{gagalHM}</ErrorBox>}
          {hasilHM && !muatHM && (
            <GoldCard aria-live="polite">
              <ResultRow>
                <span className="label">Tanggal Masehi</span>
                <span className="value">{fmtMasehi(hasilHM.gregorian)}</span>
              </ResultRow>
              <ResultRow>
                <span className="label">Hari</span>
                <span className="value">{namaHari(hasilHM.gregorian?.weekday?.en)}</span>
              </ResultRow>
              <ResultRow>
                <span className="label">Tanggal Hijriah</span>
                <span className="value">{fmtHijriah(hasilHM.hijri)}</span>
              </ResultRow>
            </GoldCard>
          )}
        </>
      )}

      {mode === 'usia' && (
        <>
          <Card>
            <Field>
              <label htmlFor="tgl-lahir">Tanggal lahir (Masehi)</label>
              <TextInput
                id="tgl-lahir"
                type="date"
                value={inputLahir}
                onChange={(e) => setInputLahir(e.target.value)}
              />
            </Field>
            <PrimaryButton type="button" onClick={hitungUsiaSaya} disabled={muatUsia} css={{ width: '100%' }}>
              <FaBirthdayCake /> Hitung Usia Saya
            </PrimaryButton>
            <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, lineHeight: 1.6, marginTop: 10 })}>
              Usia Hijriah dihitung dari total hari hidup dibagi 354,367 hari (rata-rata satu tahun
              qamariyah), sehingga biasanya 1–2 tahun lebih besar daripada usia Masehi.
            </p>
          </Card>
          {muatUsia && (
            <LoadingBox>
              <Spinner /> Menghitung…
            </LoadingBox>
          )}
          {gagalUsia && <ErrorBox>{gagalUsia}</ErrorBox>}
          {hasilUsia && !muatUsia && (
            <>
              <SectionTitle>Hasil Usia</SectionTitle>
              <GoldCard aria-live="polite">
                <ResultRow>
                  <span className="label">Usia Masehi</span>
                  <span className="value">
                    {hasilUsia.usia.masehi.tahun} thn {hasilUsia.usia.masehi.bulan} bln
                  </span>
                </ResultRow>
                <ResultRow>
                  <span className="label">Usia Hijriah</span>
                  <span className="value">
                    {hasilUsia.usia.hijriah.tahun} thn {hasilUsia.usia.hijriah.bulan} bln
                  </span>
                </ResultRow>
                <ResultRow>
                  <span className="label">Total hari hidup</span>
                  <span className="value">
                    {hasilUsia.usia.totalHari.toLocaleString('id-ID')} hari
                  </span>
                </ResultRow>
                <ResultRow>
                  <span className="label">Lahir pada (Hijriah)</span>
                  <span className="value">{fmtHijriah(hasilUsia.lahirH)}</span>
                </ResultRow>
                <ResultRow>
                  <span className="label">Ulang tahun Hijriah berikutnya</span>
                  <span className="value">
                    {hasilUsia.ultahH.day}{' '}
                    {BULAN_HIJRIAH_ID[hasilUsia.ultahH.month - 1] ?? ''} {hasilUsia.ultahH.year} H
                    {hasilUsia.ultahMasehi
                      ? ` · ${hasilUsia.ultahMasehi.day} ${hasilUsia.ultahMasehi.month?.en ?? ''} ${hasilUsia.ultahMasehi.year}`
                      : ''}
                  </span>
                </ResultRow>
              </GoldCard>
            </>
          )}
        </>
      )}
    </Page>
  );
}
