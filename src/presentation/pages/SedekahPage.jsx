/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaHandHoldingHeart, FaSun, FaMosque, FaMoon, FaHeart, FaCoins, FaPlus,
  FaTrash, FaSave, FaBookOpen, FaInfoCircle, FaHistory, FaBullseye,
  FaListOl, FaCheckCircle, FaHandsHelping,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, PrimaryButton, GhostButton,
  Field, TextInput, ResultRow,
} from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import StateKosong from '../components/StateKosong.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import { useToast } from '../components/feedback/toastStore.js';
import { useDialog } from '../components/feedback/dialogStore.js';
import { LocalSedekahRepository } from '../../data/repositories/LocalSedekahRepository.js';
import {
  JENIS_SEDEKAH, totalHariIni, progresTarget, ringkasanBulanBerjalan,
} from '../../domain/usecases/hitungSedekah.js';
import { kunciHari } from '../../domain/usecases/streakIbadah.js';
import { catatAktivitasGlobal } from '../hooks/useStreak.js';
import {
  KEUTAMAAN_SEDEKAH, WAKTU_UTAMA_SEDEKAH, SEDEKAH_SUBUH,
  JENIS_PANDUAN_SEDEKAH, SEDEKAH_NON_HARTA, ADAB_SEDEKAH,
  DALIL_SEDEKAH, AYAT_REFERENSI_SEDEKAH,
} from '../../data/sources/sedekahData.js';

// Halaman ini Bahasa Indonesia langsung, mengikuti pola mayoritas halaman
// fitur (Mutaba'ah, Qadha Puasa, dll.) — hook bahasa hanya dipakai
// Beranda & Pengaturan Bahasa, jadi tidak dicampur di sini.

const IKON_WAKTU = {
  subuh: <FaSun aria-hidden="true" />,
  jumat: <FaMosque aria-hidden="true" />,
  ramadan: <FaMoon aria-hidden="true" />,
  sehat: <FaHeart aria-hidden="true" />,
};

const IKON_JENIS = {
  Subuh: <FaSun aria-hidden="true" />,
  Jumat: <FaMosque aria-hidden="true" />,
  Umum: <FaHeart aria-hidden="true" />,
  Infaq: <FaCoins aria-hidden="true" />,
};

const fmtRupiah = (n) => `Rp ${new Intl.NumberFormat('id-ID').format(Math.max(0, Number(n) || 0))}`;

function formatTanggal(tgl) {
  const d = new Date(`${tgl}T00:00:00`);
  if (Number.isNaN(d.getTime())) return tgl;
  return d.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const ProgressTrack = styled.div`
  height: 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primarySoft};
  overflow: hidden;
  margin: 6px 0 4px;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ persen }) => persen}%;
  border-radius: 999px;
  background: ${({ theme }) => theme.gradients.gold};
  transition: width ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
`;

const BarisBernomor = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 11px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .isi {
    flex: 1;
    min-width: 0;
    font-size: 14.5px;
    line-height: 1.65;
  }
  .judul-item {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
  }
`;

const BarisRiwayat = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .utama {
    flex: 1;
    min-width: 0;
  }
  .tgl {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
  }
  .meta {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
  .nominal {
    font-size: 15px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    white-space: nowrap;
  }
  .tanpa-nominal {
    font-size: 12.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.faint};
    white-space: nowrap;
  }
`;

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 22px;
  line-height: 2;
  text-align: right;
  color: ${({ theme }) => theme.colors.teksArab};
  margin-bottom: 10px;
`;

const CatatanKecil = styled.p`
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

function BarProgres({ label, progres, ariaLabel }) {
  if (!progres) return null;
  return (
    <div css={{ marginTop: 12 }}>
      <div css={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 600 }}>
        <span>{label}</span>
        <span aria-label={`Progres ${progres.persen} persen`}>{progres.persen}%</span>
      </div>
      <ProgressTrack
        role="progressbar"
        aria-valuenow={progres.persen}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <ProgressFill persen={progres.persen} />
      </ProgressTrack>
      <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted })}>
        {progres.tercapai
          ? 'Target tercapai — alhamdulillah, semoga istiqamah.'
          : `Kurang ${fmtRupiah(progres.sisa)} lagi menuju target ${fmtRupiah(progres.target)}.`}
      </p>
    </div>
  );
}

export default function SedekahPage() {
  const toast = useToast();
  const dialog = useDialog();
  const [data, setData] = useState(() => LocalSedekahRepository.load());

  const kunciHariIni = kunciHari();
  const [tanggal, setTanggal] = useState(kunciHariIni);
  const [nominalStr, setNominalStr] = useState('');
  const [jenis, setJenis] = useState('Umum');
  const [catatanStr, setCatatanStr] = useState('');
  const [inputTargetHarian, setInputTargetHarian] = useState(() =>
    data.targetHarian ? String(data.targetHarian) : '',
  );
  const [inputTargetBulanan, setInputTargetBulanan] = useState(() =>
    data.targetBulanan ? String(data.targetBulanan) : '',
  );

  const ringkasanBulan = useMemo(() => ringkasanBulanBerjalan(data.catatan), [data.catatan]);
  const ringkasanHariIni = useMemo(() => totalHariIni(data.catatan), [data.catatan]);
  const progresBulanan = progresTarget(ringkasanBulan.total, data.targetBulanan);
  const progresHarian = progresTarget(ringkasanHariIni.total, data.targetHarian);

  const riwayat = useMemo(
    () =>
      data.catatan
        .map((c, i) => ({ ...c, _i: i }))
        .sort((a, b) => (a.tanggal === b.tanggal ? b._i - a._i : a.tanggal < b.tanggal ? 1 : -1)),
    [data.catatan],
  );

  const tambah = () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal) || Number.isNaN(new Date(`${tanggal}T00:00:00`).getTime())) {
      toast.peringatan('Isi tanggal catatan dengan benar.');
      return;
    }
    let nominal = null;
    const mentah = nominalStr.trim();
    if (mentah !== '') {
      const n = Number(mentah);
      if (!Number.isFinite(n) || n < 0) {
        toast.peringatan('Nominal harus berupa angka 0 atau lebih — atau kosongkan saja bila tidak ingin mencatat nominal.');
        return;
      }
      nominal = Math.floor(n);
    }
    const baru = LocalSedekahRepository.tambah({
      tanggal, nominal, jenis, catatan: catatanStr.trim(),
    });
    setData(baru);
    // Streak ibadah gabungan: catatan BERTANGGAL HARI INI menghidupkan
    // streak NurQalam; catatan untuk tanggal lain tidak mengubah streak.
    if (tanggal === kunciHariIni) catatAktivitasGlobal('sedekah');
    setNominalStr('');
    setCatatanStr('');
    toast.sukses(
      nominal === null
        ? 'Catatan sedekah tersimpan (tanpa nominal). Jazakallahu khairan!'
        : `Catatan sedekah ${fmtRupiah(nominal)} tersimpan. Jazakallahu khairan!`,
    );
  };

  const hapus = async (item) => {
    const ya = await dialog.confirm({
      judul: 'Hapus Catatan Sedekah?',
      pesan: `Catatan ${item.jenis} tanggal ${formatTanggal(item.tanggal)} akan dihapus. Tindakan ini tidak bisa dibatalkan.`,
      teksYa: 'Hapus',
      teksTidak: 'Batal',
      bahaya: true,
    });
    if (!ya) return;
    setData(LocalSedekahRepository.hapus(item.id));
    toast.sukses('Catatan sedekah dihapus.');
  };

  const parseTarget = (mentah, label) => {
    const t = mentah.trim();
    if (t === '') return { ok: true, nilai: null };
    const n = Number(t);
    if (!Number.isFinite(n) || n <= 0) {
      toast.peringatan(`${label} harus berupa angka lebih dari 0 — atau kosongkan untuk menghapus target.`);
      return { ok: false, nilai: null };
    }
    return { ok: true, nilai: Math.floor(n) };
  };

  const simpanTarget = () => {
    const harian = parseTarget(inputTargetHarian, 'Target harian');
    if (!harian.ok) return;
    const bulanan = parseTarget(inputTargetBulanan, 'Target bulanan');
    if (!bulanan.ok) return;
    setData(LocalSedekahRepository.simpanTarget({
      targetHarian: harian.nilai, targetBulanan: bulanan.nilai,
    }));
    toast.sukses('Target sedekah disimpan.');
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaHandHoldingHeart /> Sedekah &amp; Infaq
        </h2>
        <p>
          Panduan keutamaan sedekah beserta pencatat kebiasaan baikmu — tersimpan hanya di
          perangkat ini, dan nominal boleh dikosongkan demi privasi &amp; keikhlasan.
        </p>
      </PageHero>

      <SectionTitle>
        <FaCoins /> Ringkasan {NAMA_BULAN[ringkasanBulan.bulan - 1]} {ringkasanBulan.tahun}
      </SectionTitle>
      <GoldCard>
        <ResultRow>
          <span className="label">Total bulan ini (yang bernominal)</span>
          <span className="value">{fmtRupiah(ringkasanBulan.total)}</span>
        </ResultRow>
        <ResultRow>
          <span className="label">Jumlah catatan bulan ini</span>
          <span className="value">{ringkasanBulan.jumlahCatatan} catatan</span>
        </ResultRow>
        <ResultRow>
          <span className="label">Total hari ini (yang bernominal)</span>
          <span className="value">{fmtRupiah(ringkasanHariIni.total)}</span>
        </ResultRow>
        {ringkasanBulan.jumlahBernominal < ringkasanBulan.jumlahCatatan && (
          <CatatanKecil css={{ marginTop: 10 }}>
            <FaInfoCircle />
            <span>
              Total uang hanya menjumlahkan {ringkasanBulan.jumlahBernominal} dari{' '}
              {ringkasanBulan.jumlahCatatan} catatan yang menulis nominal — sisanya kamu catat
              tanpa nominal, dan itu tidak mengurangi nilai sedekahnya.
            </span>
          </CatatanKecil>
        )}
        <BarProgres
          label={`Target bulanan ${data.targetBulanan ? fmtRupiah(data.targetBulanan) : ''}`}
          progres={progresBulanan}
          ariaLabel="Progres target sedekah bulanan"
        />
        <BarProgres
          label={`Target harian ${data.targetHarian ? fmtRupiah(data.targetHarian) : ''}`}
          progres={progresHarian}
          ariaLabel="Progres target sedekah harian"
        />
        {!progresBulanan && !progresHarian && (
          <CatatanKecil css={{ marginTop: 10 }}>
            <FaBullseye />
            <span>Belum ada target. Atur target harian/bulanan di bagian &ldquo;Atur Target&rdquo; agar progresmu tampil di sini.</span>
          </CatatanKecil>
        )}
      </GoldCard>

      <Card>
        {ringkasanBulan.perJenis.map((p) => (
          <ResultRow key={p.jenis}>
            <span className="label">{p.jenis} — {p.jumlahCatatan} catatan</span>
            <span className="value">{p.jumlahBernominal > 0 ? fmtRupiah(p.total) : '—'}</span>
          </ResultRow>
        ))}
        <CatatanKecil css={{ marginTop: 8 }}>
          <FaInfoCircle />
          <span>Rincian per jenis untuk bulan berjalan. Tanda &ldquo;—&rdquo; berarti belum ada catatan bernominal pada jenis itu.</span>
        </CatatanKecil>
      </Card>

      <SectionTitle>
        <FaListOl /> Keutamaan Sedekah
      </SectionTitle>
      <Card>
        {KEUTAMAAN_SEDEKAH.map((k, i) => (
          <BarisBernomor key={k.judul}>
            <NomorMedali nomor={i + 1} ukuran={34} />
            <div className="isi">
              <span className="judul-item">{k.judul}. </span>
              {k.isi}
            </div>
          </BarisBernomor>
        ))}
      </Card>

      <SectionTitle>
        <FaSun /> Waktu Utama Bersedekah
      </SectionTitle>
      <Card>
        {WAKTU_UTAMA_SEDEKAH.map((w) => (
          <BarisBernomor key={w.id}>
            <span
              aria-hidden="true"
              css={(t) => ({
                flexShrink: 0, width: 34, height: 34, borderRadius: '50%',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: t.colors.goldSoft, border: `1px solid ${t.colors.gold}`,
                color: t.colors.goldDeep, fontSize: 15,
              })}
            >
              {IKON_WAKTU[w.id]}
            </span>
            <div className="isi">
              <span className="judul-item">{w.judul}. </span>
              {w.isi}
            </div>
          </BarisBernomor>
        ))}
      </Card>

      <SectionTitle>
        <FaSun /> Sedekah Subuh
      </SectionTitle>
      <Card>
        <p css={{ fontSize: 14.5, lineHeight: 1.7, marginBottom: 6 }}>{SEDEKAH_SUBUH.ringkas}</p>
        {SEDEKAH_SUBUH.cara.map((langkah, i) => (
          <BarisBernomor key={i}>
            <NomorMedali nomor={i + 1} ukuran={34} />
            <div className="isi">{langkah}</div>
          </BarisBernomor>
        ))}
        <CatatanKecil css={{ marginTop: 10 }}>
          <FaInfoCircle />
          <span>{SEDEKAH_SUBUH.catatan}</span>
        </CatatanKecil>
      </Card>

      <SectionTitle>
        <FaHandsHelping /> Jenis Sedekah &amp; Infaq
      </SectionTitle>
      <Card>
        {JENIS_PANDUAN_SEDEKAH.map((j) => (
          <BarisBernomor key={j.id}>
            <span
              aria-hidden="true"
              css={(t) => ({
                flexShrink: 0, width: 34, height: 34, borderRadius: '50%',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: t.colors.goldSoft, border: `1px solid ${t.colors.gold}`,
                color: t.colors.goldDeep, fontSize: 15,
              })}
            >
              {IKON_JENIS[j.id]}
            </span>
            <div className="isi">
              <span className="judul-item">{j.nama}. </span>
              {j.contoh}
            </div>
          </BarisBernomor>
        ))}
        <p css={(t) => ({ fontSize: 13.5, fontWeight: 700, color: t.colors.judul, marginTop: 14, marginBottom: 4 })}>
          Sedekah tidak selalu harta:
        </p>
        {SEDEKAH_NON_HARTA.map((s) => (
          <p key={s} css={{ display: 'flex', gap: 8, fontSize: 13.5, lineHeight: 1.65, padding: '5px 0' }}>
            <FaCheckCircle aria-hidden="true" css={(t) => ({ flexShrink: 0, marginTop: 3, color: t.colors.success })} />
            <span>{s}</span>
          </p>
        ))}
      </Card>

      <SectionTitle>
        <FaHeart /> Adab Bersedekah
      </SectionTitle>
      <Card>
        {ADAB_SEDEKAH.map((a, i) => (
          <BarisBernomor key={i}>
            <NomorMedali nomor={i + 1} ukuran={34} />
            <div className="isi">{a}</div>
          </BarisBernomor>
        ))}
      </Card>

      <SectionTitle>
        <FaBookOpen /> Dalil Sedekah
      </SectionTitle>
      {DALIL_SEDEKAH.map((d) => (
        <Card key={d.id}>
          <p css={(t) => ({ fontSize: 15, fontWeight: 700, color: t.colors.judul, marginBottom: 10 })}>
            {d.judul}
          </p>
          <Arab lang="ar" dir="rtl">{d.arab}</Arab>
          <p css={{ fontSize: 14, lineHeight: 1.75 }}>{d.terjemahan}</p>
          <p css={(t) => ({ fontSize: 12.5, fontWeight: 700, color: t.colors.goldDeep, marginTop: 10 })}>
            {d.sumberHadits}
          </p>
          <p css={(t) => ({ fontSize: 12, lineHeight: 1.6, color: t.colors.faint, marginTop: 2 })}>
            Sumber data: {d.sumberData}
          </p>
        </Card>
      ))}
      <Card>
        <p css={(t) => ({ fontSize: 14.5, fontWeight: 700, color: t.colors.judul, marginBottom: 6 })}>
          Ayat-ayat terkait (referensi)
        </p>
        <CatatanKecil css={{ marginBottom: 8 }}>
          <FaInfoCircle />
          <span>
            Bagian ini hanya mencantumkan referensi ayat dan temanya — teks Arab &amp; terjemahan
            resmi Al-Qur&apos;an dibaca di halaman surah masing-masing dalam aplikasi ini, agar
            tidak ada teks suci yang disalin tidak lengkap.
          </span>
        </CatatanKecil>
        {AYAT_REFERENSI_SEDEKAH.map((a) => (
          <ResultRow key={`${a.surahId}-${a.nomorAyat}`}>
            <span className="label">{a.referensi}</span>
            <span className="value" css={{ fontSize: 13.5, fontWeight: 600, maxWidth: '62%' }}>{a.tema}</span>
          </ResultRow>
        ))}
      </Card>

      <SectionTitle>
        <FaPlus /> Tambah Catatan
      </SectionTitle>
      <Card>
        <Field>
          <label htmlFor="sedekah-tanggal">Tanggal</label>
          <TextInput
            id="sedekah-tanggal"
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </Field>
        <Field>
          <label id="sedekah-jenis-label">Jenis</label>
          <SegmenWadah role="tablist" aria-labelledby="sedekah-jenis-label" css={{ marginBottom: 0 }}>
            {JENIS_SEDEKAH.map((j) => (
              <SegmenTab key={j} aktif={jenis === j} onClick={() => setJenis(j)}>
                {IKON_JENIS[j]} {j}
              </SegmenTab>
            ))}
          </SegmenWadah>
        </Field>
        <Field>
          <label htmlFor="sedekah-nominal">Nominal (Rp) — opsional, boleh dikosongkan</label>
          <TextInput
            id="sedekah-nominal"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="Boleh kosong demi privasi & keikhlasan"
            value={nominalStr}
            onChange={(e) => setNominalStr(e.target.value)}
            aria-describedby="sedekah-nominal-ket"
          />
          <p id="sedekah-nominal-ket" css={(t) => ({ fontSize: 12.5, color: t.colors.muted, marginTop: 6 })}>
            Catatan tetap tersimpan tanpa nominal; total uang hanya menjumlahkan catatan yang
            kamu isi nominalnya.
          </p>
        </Field>
        <Field>
          <label htmlFor="sedekah-catatan">Catatan (opsional)</label>
          <TextInput
            id="sedekah-catatan"
            type="text"
            placeholder="Mis. kotak amal masjid, tetangga, anak yatim…"
            value={catatanStr}
            onChange={(e) => setCatatanStr(e.target.value)}
          />
        </Field>
        <PrimaryButton type="button" onClick={tambah}>
          <FaPlus aria-hidden="true" /> Tambah Catatan
        </PrimaryButton>
      </Card>

      <SectionTitle>
        <FaBullseye /> Atur Target
      </SectionTitle>
      <Card>
        <Field>
          <label htmlFor="sedekah-target-harian">Target harian (Rp) — kosongkan bila tidak memakai target</label>
          <TextInput
            id="sedekah-target-harian"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="Mis. 10000"
            value={inputTargetHarian}
            onChange={(e) => setInputTargetHarian(e.target.value)}
          />
        </Field>
        <Field>
          <label htmlFor="sedekah-target-bulanan">Target bulanan (Rp) — kosongkan bila tidak memakai target</label>
          <TextInput
            id="sedekah-target-bulanan"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="Mis. 300000"
            value={inputTargetBulanan}
            onChange={(e) => setInputTargetBulanan(e.target.value)}
          />
        </Field>
        <GhostButton type="button" onClick={simpanTarget}>
          <FaSave aria-hidden="true" /> Simpan Target
        </GhostButton>
      </Card>

      <SectionTitle>
        <FaHistory /> Riwayat Catatan
      </SectionTitle>
      <Card>
        {riwayat.length === 0 ? (
          <StateKosong
            ikon={<FaHistory />}
            judul="Belum ada catatan sedekah"
            deskripsi="Tambahkan catatan pertamamu pada formulir di atas — nominal boleh dikosongkan. Sedikit yang konsisten lebih dicintai Allah daripada banyak yang terputus."
          />
        ) : (
          riwayat.map((c) => (
            <BarisRiwayat key={c.id}>
              <div className="utama">
                <div className="tgl">{formatTanggal(c.tanggal)}</div>
                <div className="meta">
                  {c.jenis}
                  {c.catatan ? ` · ${c.catatan}` : ''}
                </div>
              </div>
              {c.nominal !== null && c.nominal !== undefined ? (
                <span className="nominal">{fmtRupiah(c.nominal)}</span>
              ) : (
                <span className="tanpa-nominal">tanpa nominal</span>
              )}
              <GhostButton
                type="button"
                onClick={() => hapus(c)}
                aria-label={`Hapus catatan sedekah ${c.jenis} tanggal ${formatTanggal(c.tanggal)}`}
                css={{ minHeight: 44, padding: '8px 12px', flexShrink: 0 }}
              >
                <FaTrash aria-hidden="true" />
              </GhostButton>
            </BarisRiwayat>
          ))
        )}
      </Card>

      <Card>
        <CatatanKecil>
          <FaInfoCircle />
          <span>
            Catatan jujur: halaman ini adalah pencatat pribadi di perangkatmu — bukan bukti
            pembayaran atau penyaluran resmi, dan aplikasi NurQalam tidak menerima atau menyalurkan
            dana sedekah apa pun. Salurkan sedekahmu langsung kepada penerima atau melalui
            lembaga yang amanah dan terpercaya.
          </span>
        </CatatanKecil>
      </Card>
    </Page>
  );
}
