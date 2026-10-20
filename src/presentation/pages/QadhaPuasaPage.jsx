/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaMoon,
  FaCheckCircle,
  FaUndo,
  FaSave,
  FaInfoCircle,
  FaHistory,
  FaClipboardList,
  FaBookOpen,
  FaArrowRight,
} from 'react-icons/fa';
import {
  Page,
  PageHero,
  Card,
  SectionTitle,
  PrimaryButton,
  GhostButton,
  Field,
  TextInput,
  ResultRow,
} from '../components/common.jsx';
import { useToast } from '../components/feedback/toastStore.js';
import { LocalQadhaRepository } from '../../data/repositories/LocalQadhaRepository.js';

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

const BarisRiwayat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .tgl {
    font-size: 14px;
    font-weight: 600;
  }
  .jml {
    font-size: 14px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    white-space: nowrap;
  }
`;

const Kosong = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 12px 4px;
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

function formatTanggal(tgl) {
  const d = new Date(`${tgl}T00:00:00`);
  if (Number.isNaN(d.getTime())) return tgl;
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function QadhaPuasaPage() {
  const toast = useToast();
  const [data, setData] = useState(() => LocalQadhaRepository.muat());
  const [inputUtang, setInputUtang] = useState(() =>
    data.totalUtang > 0 ? String(data.totalUtang) : '',
  );

  const sisa = LocalQadhaRepository.sisa(data);
  const persen =
    data.totalUtang > 0 ? Math.min(100, Math.round((data.terbayar / data.totalUtang) * 100)) : 0;
  const riwayat = Object.entries(data.log)
    .filter(([, n]) => n > 0)
    .sort(([a], [b]) => (a < b ? 1 : -1));

  const simpanTotal = () => {
    const n = parseInt(inputUtang, 10);
    if (Number.isNaN(n) || n < 0) {
      toast.peringatan('Isi total utang puasa dengan angka yang benar (0 atau lebih).');
      return;
    }
    setData(LocalQadhaRepository.setTotalUtang(n));
    toast.sukses(`Total utang puasa disimpan: ${n} hari.`);
  };

  const bayarSatu = () => {
    setData(LocalQadhaRepository.tambahBayar(1));
    toast.sukses('Alhamdulillah, 1 hari qadha tercatat untuk hari ini.');
  };

  const kurangiSatu = () => {
    if (data.terbayar <= 0) {
      toast.info('Belum ada pembayaran yang bisa dikurangi.');
      return;
    }
    setData(LocalQadhaRepository.batalBayar(1));
    toast.info('Pembayaran terakhir dikurangi 1 hari.');
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaMoon /> Tracker Qadha Puasa
        </h2>
        <p>
          Catat utang puasa Ramadhan dan pantau pembayaran qadhamu hari demi hari.
        </p>
      </PageHero>

      <SectionTitle>
        <FaClipboardList /> Ringkasan
      </SectionTitle>
      <Card>
        <ResultRow>
          <span className="label">Total Utang</span>
          <span className="value">{data.totalUtang} hari</span>
        </ResultRow>
        <ResultRow>
          <span className="label">Sudah Dibayar</span>
          <span className="value">{data.terbayar} hari</span>
        </ResultRow>
        <ResultRow>
          <span className="label">Sisa</span>
          <span className="value">{sisa} hari</span>
        </ResultRow>

        <div css={{ marginTop: 14 }}>
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12.5,
              fontWeight: 600,
            }}
          >
            <span>Progres qadha</span>
            <span aria-label={`Progres ${persen} persen`}>{persen}%</span>
          </div>
          <ProgressTrack
            role="progressbar"
            aria-valuenow={persen}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progres pembayaran qadha"
          >
            <ProgressFill persen={persen} />
          </ProgressTrack>
          {data.totalUtang > 0 && sisa === 0 ? (
            <p
              css={{ fontSize: 13.5, fontWeight: 700, display: 'flex', gap: 7, alignItems: 'center' }}
            >
              <FaCheckCircle aria-hidden="true" /> Masya Allah, utang puasamu sudah lunas!
            </p>
          ) : null}
        </div>
      </Card>

      <SectionTitle>Atur Total Utang</SectionTitle>
      <Card>
        <Field>
          <label htmlFor="input-total-utang">Total utang puasa (hari)</label>
          <TextInput
            id="input-total-utang"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="Contoh: 7"
            value={inputUtang}
            onChange={(e) => setInputUtang(e.target.value)}
          />
        </Field>
        <PrimaryButton type="button" onClick={simpanTotal} aria-label="Simpan total utang puasa">
          <FaSave aria-hidden="true" /> Simpan Total
        </PrimaryButton>
      </Card>

      <SectionTitle>Catat Pembayaran</SectionTitle>
      <Card>
        <div css={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton
            type="button"
            onClick={bayarSatu}
            aria-label="Catat pembayaran qadha 1 hari untuk hari ini"
            css={{ minHeight: 52 }}
          >
            <FaCheckCircle aria-hidden="true" /> + Bayar 1 Hari
          </PrimaryButton>
          <GhostButton
            type="button"
            onClick={kurangiSatu}
            disabled={data.terbayar <= 0}
            aria-label="Kurangi pembayaran 1 hari bila salah tekan"
          >
            <FaUndo aria-hidden="true" /> Kurangi 1 Hari (salah tekan)
          </GhostButton>
        </div>
        <Catatan css={{ marginTop: 12 }}>
          <FaInfoCircle />
          <span>
            Tombol &ldquo;+ Bayar 1 Hari&rdquo; mencatat qadha untuk tanggal hari ini. Gunakan
            tombol kurangi bila salah menekan.
          </span>
        </Catatan>
      </Card>

      <SectionTitle>
        <FaHistory /> Riwayat Pembayaran
      </SectionTitle>
      <Card>
        {data.totalUtang === 0 && riwayat.length === 0 ? (
          <Kosong>
            Belum ada data. Atur total utang puasamu di atas, lalu catat pembayaran qadhamu
            setiap selesai berpuasa. Semangat, semoga Allah memudahkan!
          </Kosong>
        ) : riwayat.length === 0 ? (
          <Kosong>Belum ada pembayaran tercatat. Tekan &ldquo;+ Bayar 1 Hari&rdquo; setelah menyelesaikan satu hari qadha.</Kosong>
        ) : (
          riwayat.map(([tgl, n]) => (
            <BarisRiwayat key={tgl}>
              <span className="tgl">{formatTanggal(tgl)}</span>
              <span className="jml">+{n} hari</span>
            </BarisRiwayat>
          ))
        )}
      </Card>

      <SectionTitle>
        <FaBookOpen /> Buku Catatan Utang per Tahun
      </SectionTitle>
      <Card>
        <Catatan>
          <FaInfoCircle />
          <span>
            Punya utang dari beberapa Ramadhan yang berbeda? Catat tiap tahun secara
            terpisah di buku catatan utang per tahun, lalu centang tanggal pelunasannya
            satu per satu sampai lunas.
          </span>
        </Catatan>
        <GhostButton
          as={Link}
          to="/utang-puasa"
          css={{ width: '100%', marginTop: 12 }}
          aria-label="Buka buku catatan utang puasa per tahun"
        >
          <FaBookOpen aria-hidden="true" /> Buka Buku Catatan per Tahun{' '}
          <FaArrowRight aria-hidden="true" />
        </GhostButton>
      </Card>
    </Page>
  );
}
