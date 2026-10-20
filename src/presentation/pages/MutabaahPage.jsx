/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import {
  FaClipboardCheck, FaChevronLeft, FaChevronRight, FaCheckCircle, FaRegCircle,
  FaChartBar, FaBookOpen, FaCalendarDay,
} from 'react-icons/fa';
import { LocalMutabaahRepository } from '../../data/repositories/LocalMutabaahRepository.js';
import { kunciTanggal } from '../hooks/useSholatTracker.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle, TextInput, Field,
  PrimaryButton, GhostButton,
} from '../components/common.jsx';

// Daftar amal harian: 5 sholat wajib + amal sunnah pendamping.
const AMAL_WAJIB = [
  { kunci: 'subuh', label: 'Sholat Subuh' },
  { kunci: 'dzuhur', label: 'Sholat Dzuhur' },
  { kunci: 'ashar', label: 'Sholat Ashar' },
  { kunci: 'maghrib', label: 'Sholat Maghrib' },
  { kunci: 'isya', label: 'Sholat Isya' },
];
const AMAL_SUNNAH = [
  { kunci: 'tahajud', label: 'Qiyamul Lail / Tahajud' },
  { kunci: 'dhuha', label: 'Sholat Dhuha' },
  { kunci: 'rawatib', label: 'Sholat Rawatib' },
  { kunci: 'dzikirPagi', label: 'Dzikir Pagi' },
  { kunci: 'dzikirPetang', label: 'Dzikir Petang' },
  { kunci: 'sedekah', label: 'Sedekah' },
];
const SEMUA_CENTANG = [...AMAL_WAJIB, ...AMAL_SUNNAH];

/**
 * Cara hitung kelengkapan harian (poin, maksimum 100 → sekaligus persen):
 * - 5 sholat wajib: masing-masing 10 poin (total 50) — bobot terbesar karena wajib.
 * - 6 amal sunnah: masing-masing 5 poin (total 30).
 * - Tilawah dinormalisasi sederhana: poin = min(halaman dibaca, 20) / 20 × 20
 *   (target 20 halaman per hari = poin penuh 20; lebih dari itu tetap 20).
 * Total poin mingguan = jumlah poin 7 hari terakhir (maksimum 700).
 */
const TARGET_TILAWAH_HALAMAN = 20;

function poinHarian(record) {
  if (!record) return 0;
  let poin = 0;
  for (const a of AMAL_WAJIB) if (record[a.kunci]) poin += 10;
  for (const a of AMAL_SUNNAH) if (record[a.kunci]) poin += 5;
  const halaman = Math.max(0, Number(record.tilawah) || 0);
  poin += (Math.min(halaman, TARGET_TILAWAH_HALAMAN) / TARGET_TILAWAH_HALAMAN) * 20;
  return Math.round(poin);
}

const parseKunci = (kunci) => {
  const [y, m, d] = kunci.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const geserKunci = (kunci, hari) => {
  const t = parseKunci(kunci);
  t.setDate(t.getDate() + hari);
  return kunciTanggal(t);
};

const HARI_SINGKAT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const fmtTanggalPanjang = (kunci) =>
  new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(parseKunci(kunci));

// Kontrol halaman ini memakai komponen bersama (PrimaryButton/GhostButton/
// SegmentedControl & token tema) — tanpa gaya tombol/pil ad-hoc baru.
// Baris centang: belum = GhostButton, sudah = PrimaryButton (setara segmen
// aktif pada SegmentedControl: gradasi emas + teks primaryDeep).
const cssBarisCentang = {
  width: '100%',
  justifyContent: 'flex-start',
  marginBottom: 10,
  textAlign: 'left',
};

const NavTanggal = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const LabelTanggal = styled.div`
  flex: 1;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 16.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.judul};
  padding: 8px 4px;
`;

const RingkasanBox = styled(GoldCard)`
  text-align: center;
  .angka {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 40px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
  }
`;

// Grafik batang SVG sederhana (di dalam chunk halaman ini — tanpa library grafik).
function GrafikMingguan({ hari }) {
  const theme = useTheme();
  const W = 336;
  const H = 168;
  const dasar = 138; // y garis dasar batang
  const tinggiMaks = 104;
  const lebarSlot = W / hari.length;
  const lebarBatang = 30;
  const labelRingkas = hari.map((h) => `${h.label} ${h.persen}%`).join(', ');
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={`Grafik kelengkapan amal 7 hari terakhir: ${labelRingkas}`}
      css={{ display: 'block' }}
    >
      <line x1={8} y1={dasar} x2={W - 8} y2={dasar} stroke={theme.colors.border} strokeWidth={1.5} />
      {hari.map((h, i) => {
        const tinggi = Math.max(2, (h.persen / 100) * tinggiMaks);
        const x = i * lebarSlot + (lebarSlot - lebarBatang) / 2;
        const y = dasar - tinggi;
        return (
          <g key={h.kunci}>
            <rect
              x={x}
              y={y}
              width={lebarBatang}
              height={tinggi}
              rx={6}
              fill={h.hariIni ? theme.colors.gold : theme.colors.primary}
              opacity={h.persen === 0 ? 0.25 : 1}
            />
            <text
              x={x + lebarBatang / 2}
              y={y - 6}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={theme.colors.text}
            >
              {h.persen}%
            </text>
            <text
              x={x + lebarBatang / 2}
              y={dasar + 18}
              textAnchor="middle"
              fontSize={11.5}
              fill={h.hariIni ? theme.colors.goldDeep : theme.colors.muted}
              fontWeight={h.hariIni ? 700 : 400}
            >
              {h.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function MutabaahPage() {
  const [semua, setSemua] = useState(() => LocalMutabaahRepository.loadSemua());
  const kunciHariIni = kunciTanggal();
  const [kunciPilih, setKunciPilih] = useState(kunciHariIni);
  const adalahHariIni = kunciPilih === kunciHariIni;
  const record = semua[kunciPilih] ?? {};

  const simpanRecord = (baru) => {
    setSemua((lama) => {
      const next = { ...lama, [kunciPilih]: baru };
      LocalMutabaahRepository.saveSemua(next);
      return next;
    });
  };

  const toggle = (kunciAmal) => {
    simpanRecord({ ...record, [kunciAmal]: !record[kunciAmal] });
  };

  const ubahTilawah = (nilai) => {
    const halaman = Math.min(999, Math.max(0, Math.floor(Number(nilai) || 0)));
    simpanRecord({ ...record, tilawah: halaman });
  };

  const centangTerisi = SEMUA_CENTANG.filter((a) => record[a.kunci]).length;
  const persenPilih = poinHarian(record);

  const ringkasan = useMemo(() => {
    const hari = [];
    for (let i = 6; i >= 0; i--) {
      const kunci = geserKunci(kunciHariIni, -i);
      const tanggal = parseKunci(kunci);
      hari.push({
        kunci,
        label: HARI_SINGKAT[tanggal.getDay()],
        persen: poinHarian(semua[kunci]),
        hariIni: i === 0,
      });
    }
    return { hari, totalPoin: hari.reduce((j, h) => j + h.persen, 0) };
  }, [semua, kunciHariIni]);

  const renderBaris = (a, poinPerItem) => {
    const selesai = !!record[a.kunci];
    const isi = (
      <>
        {selesai ? <FaCheckCircle aria-hidden="true" /> : <FaRegCircle aria-hidden="true" />}
        <span>{a.label}</span>
        <span css={{ fontSize: 12.5, fontWeight: 600, opacity: 0.75 }}>{poinPerItem} poin</span>
        <span css={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, letterSpacing: 0.4 }}>
          {selesai ? 'SUDAH' : 'BELUM'}
        </span>
      </>
    );
    const props = {
      key: a.kunci,
      css: cssBarisCentang,
      onClick: () => toggle(a.kunci),
      'aria-pressed': selesai,
      'aria-label': `${a.label}: ${selesai ? 'sudah' : 'belum'} dilakukan`,
    };
    return selesai ? (
      <PrimaryButton {...props}>{isi}</PrimaryButton>
    ) : (
      <GhostButton {...props}>{isi}</GhostButton>
    );
  };

  const renderGrup = (judul, daftar, poinPerItem) => (
    <>
      <SectionTitle>{judul}</SectionTitle>
      <Card>{daftar.map((a) => renderBaris(a, poinPerItem))}</Card>
    </>
  );

  return (
    <Page>
      <PageTitle>
        <FaClipboardCheck /> Mutaba'ah Yaumiyah
      </PageTitle>
      <PageSubtitle>
        Checklist amal harian untuk muhasabah. Ketuk untuk menandai yang sudah dikerjakan —
        tersimpan per tanggal di perangkat ini.
      </PageSubtitle>

      <NavTanggal>
        <GhostButton
          type="button"
          onClick={() => setKunciPilih((k) => geserKunci(k, -1))}
          aria-label="Hari sebelumnya"
          css={{ padding: '12px 14px' }}
        >
          <FaChevronLeft aria-hidden="true" />
        </GhostButton>
        <LabelTanggal aria-live="polite">
          {adalahHariIni ? 'Hari ini — ' : ''}{fmtTanggalPanjang(kunciPilih)}
        </LabelTanggal>
        <GhostButton
          type="button"
          onClick={() => setKunciPilih((k) => geserKunci(k, 1))}
          disabled={adalahHariIni}
          aria-label="Hari berikutnya"
          css={{ padding: '12px 14px', opacity: adalahHariIni ? 0.4 : 1 }}
        >
          <FaChevronRight aria-hidden="true" />
        </GhostButton>
      </NavTanggal>
      {!adalahHariIni && (
        <div css={{ textAlign: 'center', marginBottom: 16 }}>
          <GhostButton type="button" onClick={() => setKunciPilih(kunciHariIni)}>
            <FaCalendarDay aria-hidden="true" /> Kembali ke hari ini
          </GhostButton>
        </div>
      )}

      <RingkasanBox>
        <div css={{ display: 'flex', justifyContent: 'center', gap: 30, flexWrap: 'wrap' }}>
          <div>
            <div className="angka">{persenPilih}%</div>
            <div css={(t) => ({ fontSize: 12.5, color: t.colors.muted })}>
              Kelengkapan {adalahHariIni ? 'hari ini' : 'hari dipilih'}
            </div>
          </div>
          <div>
            <div className="angka">{centangTerisi}/{SEMUA_CENTANG.length}</div>
            <div css={(t) => ({ fontSize: 12.5, color: t.colors.muted })}>Amal tercentang</div>
          </div>
        </div>
      </RingkasanBox>

      {renderGrup('Sholat Wajib', AMAL_WAJIB, 10)}
      {renderGrup('Amal Sunnah', AMAL_SUNNAH, 5)}

      <SectionTitle>
        <FaBookOpen /> Tilawah Al-Qur'an
      </SectionTitle>
      <Card>
        <Field css={{ marginBottom: 6 }}>
          <label htmlFor="tilawah-halaman">Halaman dibaca pada tanggal ini</label>
          <TextInput
            id="tilawah-halaman"
            type="number"
            inputMode="numeric"
            min={0}
            max={999}
            value={record.tilawah ?? ''}
            placeholder="0"
            onChange={(e) => ubahTilawah(e.target.value)}
            aria-describedby="tilawah-ket"
          />
        </Field>
        <p id="tilawah-ket" css={(t) => ({ fontSize: 13, color: t.colors.muted })}>
          Target {TARGET_TILAWAH_HALAMAN} halaman per hari untuk poin tilawah penuh (20 poin dari
          total 100). Sholat wajib bernilai 10 poin per waktu, amal sunnah 5 poin per amal.
        </p>
      </Card>

      <SectionTitle>
        <FaChartBar /> Ringkasan 7 Hari Terakhir
      </SectionTitle>
      <Card>
        <GrafikMingguan hari={ringkasan.hari} />
        <div
          css={(t) => ({
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            borderTop: `1px dashed ${t.colors.border}`, paddingTop: 12, marginTop: 8,
          })}
        >
          <span css={(t) => ({ fontSize: 13.5, color: t.colors.muted })}>Total poin mingguan</span>
          <span css={(t) => ({ fontSize: 20, fontWeight: 800, color: t.colors.primary })}>
            {ringkasan.totalPoin} <span css={{ fontSize: 13, fontWeight: 600 }}>/ 700 poin</span>
          </span>
        </div>
        <p css={(t) => ({ fontSize: 13, color: t.colors.muted, marginTop: 8 })}>
          Poin harian maksimum 100: sholat wajib 50, amal sunnah 30, tilawah 20. Sedikit yang
          konsisten lebih dicintai Allah daripada banyak yang terputus.
        </p>
      </Card>
    </Page>
  );
}
