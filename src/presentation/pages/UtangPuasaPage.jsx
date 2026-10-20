/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaBookOpen,
  FaMoon,
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaCalendarPlus,
  FaCalendarDay,
  FaSave,
  FaInfoCircle,
  FaListUl,
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
import KotakCentang from '../components/KotakCentang.jsx';
import StateKosong from '../components/StateKosong.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import { useToast } from '../components/feedback/toastStore.js';
import { useDialog } from '../components/feedback/dialogStore.js';
import { LocalUtangPuasaRepository } from '../../data/repositories/LocalUtangPuasaRepository.js';
import {
  validasiTotalHari,
  jumlahLunas,
  sisaUtang,
  persenLunas,
  ringkasanSemuaTahun,
} from '../../domain/usecases/hitungUtangPuasa.js';

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

const JudulTahun = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.type.h3.size}px;
  font-weight: ${({ theme }) => theme.type.h3.weight};
  line-height: ${({ theme }) => theme.type.h3.lineHeight};
  color: ${({ theme }) => theme.colors.judul};
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

const BarisTanggal = styled.div`
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
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

function tanggalHariIni(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function BarProgres({ persen, label }) {
  return (
    <div css={{ marginTop: 12 }}>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12.5,
          fontWeight: 600,
        }}
      >
        <span>{label}</span>
        <span aria-label={`Progres ${persen} persen`}>{persen}%</span>
      </div>
      <ProgressTrack
        role="progressbar"
        aria-valuenow={persen}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <ProgressFill persen={persen} />
      </ProgressTrack>
    </div>
  );
}

function KartuTahun({ tahun, onBerubah }) {
  const toast = useToast();
  const dialog = useDialog();
  const [inputTanggal, setInputTanggal] = useState('');
  const [inputTotal, setInputTotal] = useState('');

  const lunas = jumlahLunas(tahun);
  const sisa = sisaUtang(tahun);
  const persen = persenLunas(tahun);
  const tanggalLunas = Object.keys(tahun.lunas).sort().reverse();
  const hariIni = tanggalHariIni();
  const sudahHariIni = Boolean(tahun.lunas[hariIni]);

  const tandaiHariIni = () => {
    if (sudahHariIni) {
      toast.info('Hari ini sudah ditandai lunas untuk tahun ini.');
      return;
    }
    onBerubah(LocalUtangPuasaRepository.tandaiLunas(tahun.id, hariIni, true));
    toast.sukses(`Satu hari qadha untuk ${tahun.label} tercatat lunas hari ini.`);
  };

  const tambahTanggal = () => {
    if (!inputTanggal) {
      toast.peringatan('Pilih tanggal pelunasan terlebih dahulu.');
      return;
    }
    if (tahun.lunas[inputTanggal]) {
      toast.info('Tanggal itu sudah tercatat lunas.');
      return;
    }
    onBerubah(LocalUtangPuasaRepository.tandaiLunas(tahun.id, inputTanggal, true));
    setInputTanggal('');
    toast.sukses(`Pelunasan tanggal ${formatTanggal(inputTanggal)} tercatat.`);
  };

  const ubahCentang = (tgl, tercentang) => {
    onBerubah(LocalUtangPuasaRepository.tandaiLunas(tahun.id, tgl, tercentang));
    if (!tercentang) toast.info(`Pelunasan tanggal ${formatTanggal(tgl)} dibatalkan.`);
  };

  const simpanTotal = () => {
    const hasil = validasiTotalHari(inputTotal);
    if (!hasil.valid) {
      toast.peringatan(hasil.pesan);
      return;
    }
    onBerubah(LocalUtangPuasaRepository.aturTotal(tahun.id, hasil.nilai));
    setInputTotal('');
    toast.sukses(`Total utang ${tahun.label} diubah menjadi ${hasil.nilai} hari.`);
  };

  const hapusTahun = async () => {
    const ya = await dialog.confirm({
      judul: 'Hapus Catatan Tahun?',
      pesan: `Catatan "${tahun.label}" beserta ${lunas} tanggal pelunasannya akan dihapus. Tindakan ini tidak bisa dibatalkan.`,
      teksYa: 'Hapus',
      teksTidak: 'Batal',
      bahaya: true,
    });
    if (!ya) return;
    onBerubah(LocalUtangPuasaRepository.hapusTahun(tahun.id));
    toast.sukses(`Catatan ${tahun.label} dihapus.`);
  };

  return (
    <Card>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <JudulTahun>{tahun.label}</JudulTahun>
        <GhostButton
          type="button"
          onClick={hapusTahun}
          aria-label={`Hapus catatan tahun ${tahun.label}`}
          css={{ minHeight: 44, padding: '8px 12px', flexShrink: 0 }}
        >
          <FaTrash aria-hidden="true" />
        </GhostButton>
      </div>

      <ResultRow>
        <span className="label">Total Utang</span>
        <span className="value">{tahun.totalHari} hari</span>
      </ResultRow>
      <ResultRow>
        <span className="label">Sudah Lunas</span>
        <span className="value">{lunas} hari</span>
      </ResultRow>
      <ResultRow>
        <span className="label">Sisa</span>
        <span className="value">{sisa} hari</span>
      </ResultRow>

      <BarProgres persen={persen} label="Progres pelunasan" />
      {tahun.totalHari > 0 && sisa === 0 ? (
        <p
          css={{ fontSize: 13.5, fontWeight: 700, display: 'flex', gap: 7, alignItems: 'center' }}
        >
          <FaCheckCircle aria-hidden="true" /> Masya Allah, utang tahun ini sudah lunas!
        </p>
      ) : null}

      <div css={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
        <PrimaryButton
          type="button"
          onClick={tandaiHariIni}
          disabled={sudahHariIni}
          aria-label={`Tandai lunas hari ini untuk ${tahun.label}`}
        >
          <FaCalendarDay aria-hidden="true" /> Tandai Lunas Hari Ini
        </PrimaryButton>
        <div css={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
          <TextInput
            type="date"
            value={inputTanggal}
            onChange={(e) => setInputTanggal(e.target.value)}
            aria-label={`Tanggal pelunasan untuk ${tahun.label}`}
            css={{ flex: 1 }}
          />
          <GhostButton
            type="button"
            onClick={tambahTanggal}
            aria-label={`Tambah tanggal pelunasan untuk ${tahun.label}`}
            css={{ flexShrink: 0 }}
          >
            <FaCalendarPlus aria-hidden="true" /> Tambah
          </GhostButton>
        </div>
      </div>

      {tanggalLunas.length > 0 ? (
        <div css={{ marginTop: 10 }}>
          {tanggalLunas.map((tgl) => (
            <BarisTanggal key={tgl}>
              <KotakCentang
                id={`lunas-${tahun.id}-${tgl}`}
                checked
                onChange={(e) => ubahCentang(tgl, e.target.checked)}
              >
                {formatTanggal(tgl)}
              </KotakCentang>
            </BarisTanggal>
          ))}
          <Catatan css={{ marginTop: 10 }}>
            <FaInfoCircle />
            <span>Hilangkan centang pada tanggal untuk membatalkan pelunasannya.</span>
          </Catatan>
        </div>
      ) : null}

      <div css={{ display: 'flex', gap: 10, alignItems: 'stretch', marginTop: 14 }}>
        <TextInput
          type="number"
          inputMode="numeric"
          min="0"
          max="366"
          placeholder={`Ubah total (sekarang ${tahun.totalHari} hari)`}
          value={inputTotal}
          onChange={(e) => setInputTotal(e.target.value)}
          aria-label={`Ubah total utang untuk ${tahun.label}`}
          css={{ flex: 1 }}
        />
        <GhostButton
          type="button"
          onClick={simpanTotal}
          aria-label={`Simpan total utang baru untuk ${tahun.label}`}
          css={{ flexShrink: 0 }}
        >
          <FaSave aria-hidden="true" /> Simpan
        </GhostButton>
      </div>
    </Card>
  );
}

export default function UtangPuasaPage() {
  const toast = useToast();
  const [data, setData] = useState(() => LocalUtangPuasaRepository.load());
  const [inputLabel, setInputLabel] = useState('');
  const [inputTotalBaru, setInputTotalBaru] = useState('');
  const [filter, setFilter] = useState('semua');

  const ringkasan = ringkasanSemuaTahun(data.tahun);
  const tahunTampil = data.tahun.filter((t) => {
    if (filter === 'bersisa') return sisaUtang(t) > 0;
    if (filter === 'lunas') return t.totalHari > 0 && sisaUtang(t) === 0;
    return true;
  });

  const tambahTahun = () => {
    const label = inputLabel.trim();
    if (!label) {
      toast.peringatan('Isi label tahun terlebih dahulu, mis. "Ramadhan 1447 H".');
      return;
    }
    const hasil = validasiTotalHari(inputTotalBaru);
    if (!hasil.valid) {
      toast.peringatan(hasil.pesan);
      return;
    }
    setData(LocalUtangPuasaRepository.tambahTahun(label, hasil.nilai));
    setInputLabel('');
    setInputTotalBaru('');
    toast.sukses(`Catatan "${label}" ditambahkan: utang ${hasil.nilai} hari.`);
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaBookOpen /> Buku Catatan Utang per Tahun
        </h2>
        <p>
          Catat utang puasa per tahun Ramadhan secara terpisah, lalu centang tanggal
          pelunasannya satu per satu sampai lunas.
        </p>
      </PageHero>

      <Card>
        <Catatan>
          <FaInfoCircle />
          <span>
            Halaman ini mencatat utang <strong>per tahun</strong> (mis. Ramadhan 1446 H dan
            1447 H sendiri-sendiri). Untuk tracker bayar harian gabungan, kalkulator jumlah
            utang, dan hitungan fidyah, gunakan halaman qadha &amp; fidyah.
          </span>
        </Catatan>
        <GhostButton
          as={Link}
          to="/qadha-puasa"
          css={{ width: '100%', marginTop: 12 }}
          aria-label="Buka tracker qadha puasa dan kalkulator fidyah"
        >
          <FaMoon aria-hidden="true" /> Tracker Qadha &amp; Fidyah
        </GhostButton>
      </Card>

      {data.tahun.length > 0 ? (
        <>
          <SectionTitle>
            <FaListUl /> Ringkasan Semua Tahun
          </SectionTitle>
          <Card>
            <ResultRow>
              <span className="label">Jumlah Tahun Tercatat</span>
              <span className="value">{ringkasan.jumlahTahun} tahun</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Total Utang</span>
              <span className="value">{ringkasan.totalHari} hari</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Sudah Lunas</span>
              <span className="value">{ringkasan.totalLunas} hari</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Sisa Keseluruhan</span>
              <span className="value">{ringkasan.totalSisa} hari</span>
            </ResultRow>
            <BarProgres persen={ringkasan.persen} label="Progres keseluruhan" />
          </Card>
        </>
      ) : null}

      <SectionTitle>
        <FaPlus /> Tambah Tahun
      </SectionTitle>
      <Card>
        <Field>
          <label htmlFor="input-label-tahun">Label tahun</label>
          <TextInput
            id="input-label-tahun"
            type="text"
            placeholder="Contoh: Ramadhan 1447 H"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
          />
        </Field>
        <Field>
          <label htmlFor="input-total-tahun">Total utang puasa tahun itu (hari)</label>
          <TextInput
            id="input-total-tahun"
            type="number"
            inputMode="numeric"
            min="0"
            max="366"
            placeholder="Contoh: 7"
            value={inputTotalBaru}
            onChange={(e) => setInputTotalBaru(e.target.value)}
          />
        </Field>
        <PrimaryButton
          type="button"
          onClick={tambahTahun}
          aria-label="Tambah catatan tahun utang puasa"
          css={{ width: '100%' }}
        >
          <FaPlus aria-hidden="true" /> Tambah Tahun
        </PrimaryButton>
      </Card>

      <SectionTitle>
        <FaMoon /> Catatan per Tahun
      </SectionTitle>
      {data.tahun.length === 0 ? (
        <Card>
          <StateKosong
            ikon={<FaBookOpen />}
            judul="Belum ada catatan tahun"
            deskripsi="Tambahkan tahun pertamamu di atas — misalnya Ramadhan tahun ini — lalu centang tanggal pelunasan qadhamu di sini."
          />
        </Card>
      ) : (
        <>
          <SegmenWadah role="tablist" aria-label="Filter catatan tahun">
            <SegmenTab aktif={filter === 'semua'} onClick={() => setFilter('semua')}>
              <FaListUl /> Semua
            </SegmenTab>
            <SegmenTab aktif={filter === 'bersisa'} onClick={() => setFilter('bersisa')}>
              <FaMoon /> Masih Ada Sisa
            </SegmenTab>
            <SegmenTab aktif={filter === 'lunas'} onClick={() => setFilter('lunas')}>
              <FaCheckCircle /> Lunas
            </SegmenTab>
          </SegmenWadah>
          {tahunTampil.length === 0 ? (
            <Card>
              <StateKosong
                ikon={<FaCheckCircle />}
                judul="Tidak ada tahun pada filter ini"
                deskripsi="Coba filter lain untuk melihat catatan tahun yang lain."
              />
            </Card>
          ) : (
            tahunTampil.map((t) => (
              <KartuTahun key={t.id} tahun={t} onBerubah={setData} />
            ))
          )}
        </>
      )}
    </Page>
  );
}
