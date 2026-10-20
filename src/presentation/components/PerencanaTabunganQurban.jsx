/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaPiggyBank, FaPaw, FaUsers, FaWallet, FaPlus, FaTrash, FaSave,
  FaInfoCircle, FaHistory, FaBullseye, FaCheckCircle,
} from 'react-icons/fa';
import {
  Card, GoldCard, SectionTitle, PrimaryButton, GhostButton,
  Field, TextInput, ResultRow,
} from './common.jsx';
import { SegmenWadah, SegmenTab } from './SegmentedControl.jsx';
import StateKosong from './StateKosong.jsx';
import { useToast } from './feedback/toastStore.js';
import { useDialog } from './feedback/dialogStore.js';
import { LocalTabunganQurbanRepository } from '../../data/repositories/LocalTabunganQurbanRepository.js';
import {
  JENIS_QURBAN, LABEL_JENIS_QURBAN, HARGA_DEFAULT_QURBAN,
  hitungTabunganQurban, formatRupiah, formatBulanTahun,
} from '../../domain/usecases/hitungTabunganQurban.js';
import { kunciHari } from '../../domain/usecases/streakIbadah.js';

/**
 * PerencanaTabunganQurban — seksi perencana tabungan pada halaman
 * Aqiqah & Kurban (tab Kurban, di bawah panduan kurban). Data tersimpan
 * hanya di perangkat ini (LocalTabunganQurbanRepository). Harga hewan
 * adalah PERKIRAAN yang bisa diubah pengguna — label peringatannya
 * wajib tampil di dekat pemilih target.
 */

const IKON_JENIS = {
  kambing: <FaPaw aria-hidden="true" />,
  'sapi-bersama': <FaUsers aria-hidden="true" />,
  'sapi-utuh': <FaWallet aria-hidden="true" />,
};

const LABEL_SEGMEN = {
  kambing: 'Kambing',
  'sapi-bersama': 'Sapi 1/7',
  'sapi-utuh': 'Sapi Utuh',
};

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

const BarisSetoran = styled.div`
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
  .nominal {
    font-size: 15px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    white-space: nowrap;
  }
`;

function formatTanggal(tgl) {
  const d = new Date(`${tgl}T00:00:00`);
  if (Number.isNaN(d.getTime())) return tgl;
  return d.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

/** Tampilan input rupiah: digit mentah di state, ribuan terformat di layar. */
const formatInputRupiah = (digitMentah) => {
  const n = Number(digitMentah);
  return n > 0 ? n.toLocaleString('id-ID') : '';
};
const parseDigit = (s) => String(s).replace(/[^\d]/g, '');

export default function PerencanaTabunganQurban() {
  const toast = useToast();
  const dialog = useDialog();
  const [data, setData] = useState(() => LocalTabunganQurbanRepository.load());

  const [jenisDraft, setJenisDraft] = useState(() => data.target?.jenis ?? 'kambing');
  const [hargaDraft, setHargaDraft] = useState(() =>
    String(data.target?.harga ?? HARGA_DEFAULT_QURBAN.kambing),
  );
  const [tanggal, setTanggal] = useState(() => kunciHari());
  const [nominalStr, setNominalStr] = useState('');

  const ringkasan = useMemo(
    () => hitungTabunganQurban(data.target, data.setoran),
    [data],
  );

  const setoranTerurut = useMemo(
    () =>
      data.setoran
        .map((s, i) => ({ ...s, _i: i }))
        .sort((a, b) => (a.tanggal === b.tanggal ? b._i - a._i : a.tanggal < b.tanggal ? 1 : -1)),
    [data.setoran],
  );

  const targetBerubah =
    !data.target
    || data.target.jenis !== jenisDraft
    || data.target.harga !== Number(hargaDraft || 0);

  const pilihJenis = (jenis) => {
    setJenisDraft(jenis);
    setHargaDraft(String(HARGA_DEFAULT_QURBAN[jenis]));
  };

  const simpanTarget = () => {
    const harga = Number(hargaDraft || 0);
    if (!Number.isFinite(harga) || harga <= 0) {
      toast.peringatan('Harga target harus berupa angka lebih dari 0.');
      return;
    }
    setData(LocalTabunganQurbanRepository.simpanTarget({ jenis: jenisDraft, harga }));
    toast.sukses(`Target ${LABEL_JENIS_QURBAN[jenisDraft]} ${formatRupiah(harga)} disimpan.`);
  };

  const tambahSetoran = () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal) || Number.isNaN(new Date(`${tanggal}T00:00:00`).getTime())) {
      toast.peringatan('Isi tanggal setoran dengan benar.');
      return;
    }
    const nominal = Number(nominalStr || 0);
    if (!Number.isFinite(nominal) || nominal <= 0) {
      toast.peringatan('Nominal setoran harus berupa angka lebih dari 0.');
      return;
    }
    setData(LocalTabunganQurbanRepository.tambahSetoran({ tanggal, nominal }));
    setNominalStr('');
    toast.sukses(`Setoran ${formatRupiah(nominal)} tersimpan. Semoga dimudahkan sampai hari kurban!`);
  };

  const hapusSetoran = async (item) => {
    const ya = await dialog.confirm({
      judul: 'Hapus Setoran?',
      pesan: `Setoran ${formatRupiah(item.nominal)} tanggal ${formatTanggal(item.tanggal)} akan dihapus dari tabungan qurbanmu. Tindakan ini tidak bisa dibatalkan.`,
      teksYa: 'Hapus',
      teksTidak: 'Batal',
      bahaya: true,
    });
    if (!ya) return;
    setData(LocalTabunganQurbanRepository.hapusSetoran(item.id));
    toast.sukses('Setoran dihapus.');
  };

  return (
    <section id="perencana-tabungan-qurban">
      <SectionTitle>
        <FaPiggyBank /> Perencana Tabungan Qurban
      </SectionTitle>
      <Card>
        <p css={{ fontSize: 14.5, lineHeight: 1.7 }}>
          Sudah membaca panduan kurban di atas — syarat umur hewan, batas peserta patungan,
          dan waktu penyembelihannya? Perencana ini membantumu menyiapkan dananya sedikit
          demi sedikit sampai Idul Adha. Semua catatan tersimpan hanya di perangkat ini.
        </p>
      </Card>

      <GoldCard>
        {data.target ? (
          <>
            <ResultRow>
              <span className="label">Target — {LABEL_JENIS_QURBAN[ringkasan.jenis] ?? ''}</span>
              <span className="value">{formatRupiah(ringkasan.hargaTarget)}</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Terkumpul ({ringkasan.jumlahSetoran} setoran)</span>
              <span className="value">{formatRupiah(ringkasan.totalTerkumpul)}</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Sisa menuju target</span>
              <span className="value">{formatRupiah(ringkasan.sisaTarget)}</span>
            </ResultRow>
            <div css={{ marginTop: 12 }}>
              <div css={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 600 }}>
                <span>Progres tabungan</span>
                <span aria-label={`Progres ${ringkasan.persenProgres} persen`}>
                  {ringkasan.persenProgres}%
                </span>
              </div>
              <ProgressTrack
                role="progressbar"
                aria-valuenow={ringkasan.persenProgres}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progres tabungan qurban"
              >
                <ProgressFill persen={ringkasan.persenProgres} />
              </ProgressTrack>
            </div>
            {ringkasan.tercapai ? (
              <CatatanKecil css={{ marginTop: 8 }}>
                <FaCheckCircle />
                <span>
                  Target tercapai — alhamdulillah! Tinggal laksanakan kurbanmu sesuai panduan
                  kurban di atas (syarat hewan &amp; waktu penyembelihan).
                </span>
              </CatatanKecil>
            ) : ringkasan.perkiraanBulanTercapai !== null && ringkasan.tanggalPerkiraan ? (
              <p css={(t) => ({ fontSize: 13.5, lineHeight: 1.65, color: t.colors.text, marginTop: 8 })}>
                Dengan rata-rata setoran {formatRupiah(Math.round(ringkasan.rataRataPerBulan))}/bulan,
                target tercapai sekitar{' '}
                <strong>{formatBulanTahun(ringkasan.tanggalPerkiraan)}</strong>{' '}
                (±{ringkasan.perkiraanBulanTercapai} bulan lagi).
              </p>
            ) : (
              <CatatanKecil css={{ marginTop: 8 }}>
                <FaInfoCircle />
                <span>Tambah beberapa setoran dulu untuk melihat perkiraan waktu target tercapai.</span>
              </CatatanKecil>
            )}
          </>
        ) : (
          <>
            <ResultRow>
              <span className="label">Terkumpul sejauh ini</span>
              <span className="value">{formatRupiah(ringkasan.totalTerkumpul)}</span>
            </ResultRow>
            <CatatanKecil css={{ marginTop: 10 }}>
              <FaBullseye />
              <span>
                Belum ada target. Pilih jenis hewan dan harga perkiraannya pada formulir
                &ldquo;Atur Target&rdquo; di bawah, lalu simpan — progres tabunganmu akan
                tampil di sini.
              </span>
            </CatatanKecil>
          </>
        )}
      </GoldCard>

      <SectionTitle>
        <FaBullseye /> Atur Target
      </SectionTitle>
      <Card>
        <Field>
          <label id="tabungan-qurban-jenis-label">Jenis hewan</label>
          <SegmenWadah
            role="tablist"
            aria-labelledby="tabungan-qurban-jenis-label"
            css={{ marginBottom: 0 }}
          >
            {JENIS_QURBAN.map((j) => (
              <SegmenTab key={j} aktif={jenisDraft === j} onClick={() => pilihJenis(j)}>
                {IKON_JENIS[j]} {LABEL_SEGMEN[j]}
              </SegmenTab>
            ))}
          </SegmenWadah>
        </Field>
        <Field>
          <label htmlFor="tabungan-qurban-harga">Harga target (Rp)</label>
          <TextInput
            id="tabungan-qurban-harga"
            type="text"
            inputMode="numeric"
            placeholder={HARGA_DEFAULT_QURBAN[jenisDraft].toLocaleString('id-ID')}
            value={formatInputRupiah(hargaDraft)}
            onChange={(e) => setHargaDraft(parseDigit(e.target.value))}
            aria-describedby="tabungan-qurban-harga-ket"
          />
          <p
            id="tabungan-qurban-harga-ket"
            css={(t) => ({ fontSize: 12.5, lineHeight: 1.6, color: t.colors.muted, marginTop: 6 })}
          >
            Harga hewan adalah perkiraan — sesuaikan harga daerahmu. Nilai awal hanya patokan
            umum untuk perencanaan; harga sebenarnya berubah menurut daerah, ukuran hewan,
            dan waktu pembelian.
          </p>
        </Field>
        <GhostButton type="button" onClick={simpanTarget}>
          <FaSave aria-hidden="true" /> Simpan Target
        </GhostButton>
        {targetBerubah && (
          <CatatanKecil css={{ marginTop: 10 }}>
            <FaInfoCircle />
            <span>Ada perubahan jenis/harga yang belum disimpan — klik &ldquo;Simpan Target&rdquo; untuk menerapkannya.</span>
          </CatatanKecil>
        )}
      </Card>

      <SectionTitle>
        <FaPlus /> Tambah Setoran
      </SectionTitle>
      <Card>
        <Field>
          <label htmlFor="tabungan-qurban-tanggal">Tanggal setoran</label>
          <TextInput
            id="tabungan-qurban-tanggal"
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </Field>
        <Field>
          <label htmlFor="tabungan-qurban-nominal">Nominal setoran (Rp)</label>
          <TextInput
            id="tabungan-qurban-nominal"
            type="text"
            inputMode="numeric"
            placeholder="Mis. 250.000"
            value={formatInputRupiah(nominalStr)}
            onChange={(e) => setNominalStr(parseDigit(e.target.value))}
          />
        </Field>
        <PrimaryButton type="button" onClick={tambahSetoran}>
          <FaPlus aria-hidden="true" /> Tambah Setoran
        </PrimaryButton>
      </Card>

      <SectionTitle>
        <FaHistory /> Riwayat Setoran
      </SectionTitle>
      <Card>
        {setoranTerurut.length === 0 ? (
          <StateKosong
            ikon={<FaHistory />}
            judul="Belum ada setoran"
            deskripsi="Mulai dari nominal kecil yang konsisten — tambahkan setoran pertamamu pada formulir di atas. Sedikit demi sedikit, insya Allah sampai pada hewan kurban terbaikmu."
          />
        ) : (
          setoranTerurut.map((s) => (
            <BarisSetoran key={s.id}>
              <div className="utama">
                <div className="tgl">{formatTanggal(s.tanggal)}</div>
              </div>
              <span className="nominal">{formatRupiah(s.nominal)}</span>
              <GhostButton
                type="button"
                onClick={() => hapusSetoran(s)}
                aria-label={`Hapus setoran ${formatRupiah(s.nominal)} tanggal ${formatTanggal(s.tanggal)}`}
                css={{ minHeight: 44, padding: '8px 12px', flexShrink: 0 }}
              >
                <FaTrash aria-hidden="true" />
              </GhostButton>
            </BarisSetoran>
          ))
        )}
      </Card>
    </section>
  );
}
