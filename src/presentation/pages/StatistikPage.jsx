/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import {
  FaChartBar, FaPrayingHands, FaMoon, FaClipboardCheck, FaBookReader, FaChartLine,
  FaFire, FaLock, FaCalendarAlt, FaBookOpen,
} from 'react-icons/fa';
import { useStreak } from '../hooks/useStreak.js';
import { totalHariAktif, totalAyat } from '../../domain/usecases/streakIbadah.js';
import { LocalSholatTrackerRepository } from '../../data/repositories/LocalSholatTrackerRepository.js';
import { LocalQadhaRepository } from '../../data/repositories/LocalQadhaRepository.js';
import { LocalMutabaahRepository } from '../../data/repositories/LocalMutabaahRepository.js';
import { LocalKhatamRepository } from '../../data/repositories/LocalKhatamRepository.js';
import { LIMA_WAKTU, kunciTanggal } from '../hooks/useSholatTracker.js';
import { halamanSelesai, persenKhatam } from '../../domain/usecases/hitungKhatam.js';
import { TOTAL_HALAMAN } from '../../data/sources/khatamData.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle, ResultRow,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import StateKosong from '../components/StateKosong.jsx';

// Bobot poin mutaba'ah — SAMA dengan MutabaahPage: 5 wajib × 10 poin,
// 6 sunnah × 5 poin, tilawah ternormalisasi maks 20 poin → total maks 100/hari.
const MUTABAAH_WAJIB = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'];
const MUTABAAH_SUNNAH = ['tahajud', 'dhuha', 'rawatib', 'dzikirPagi', 'dzikirPetang', 'sedekah'];
const TARGET_TILAWAH_HALAMAN = 20;

function poinMutabaahHarian(record) {
  if (!record || typeof record !== 'object') return 0;
  let poin = 0;
  for (const k of MUTABAAH_WAJIB) if (record[k]) poin += 10;
  for (const k of MUTABAAH_SUNNAH) if (record[k]) poin += 5;
  const halaman = Math.max(0, Number(record.tilawah) || 0);
  poin += (Math.min(halaman, TARGET_TILAWAH_HALAMAN) / TARGET_TILAWAH_HALAMAN) * 20;
  return Math.round(poin);
}

const HARI_SINGKAT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

/** Daftar { kunci:'YYYY-MM-DD', tanggal:Date } n hari terakhir, terlama → terbaru. */
function hariTerakhir(n, dari = new Date()) {
  const hasil = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(dari.getFullYear(), dari.getMonth(), dari.getDate() - i);
    hasil.push({ kunci: kunciTanggal(d), tanggal: d });
  }
  return hasil;
}

const AngkaBesar = styled(GoldCard)`
  text-align: center;
  .angka {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 36px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
  }
  .ket {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
`;

// Pemetaan nama ikon lencana (string dari domain) → ikon react-icons.
const IKON_LENCANA = {
  api: <FaFire aria-hidden="true" />,
  buku: <FaBookOpen aria-hidden="true" />,
  kalender: <FaCalendarAlt aria-hidden="true" />,
};

const BarisLencana = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 11px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .nama {
    font-size: 14.5px;
    font-weight: 700;
    color: ${({ theme, terbuka }) => (terbuka ? theme.colors.judul : theme.colors.muted)};
  }
  .progres {
    font-size: 12.5px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 1px;
  }
`;

const LingkaranLencana = styled.span`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: ${({ theme, terbuka }) =>
    terbuka ? theme.colors.goldSoft : theme.colors.surfaceAlt};
  border: 1px solid
    ${({ theme, terbuka }) => (terbuka ? theme.colors.gold : theme.colors.border)};
  color: ${({ theme, terbuka }) => (terbuka ? theme.colors.goldDeep : theme.colors.faint)};
`;

const LabelTarget = styled.p`
  font-size: ${({ theme }) => theme.type.caption.size}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
  margin: 16px 0 8px;
`;

const GridAngka = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 14px;
  > * {
    margin-bottom: 0;
  }
`;

// Grafik batang SVG murni (tanpa library): satu batang per hari,
// tinggi ∝ jumlah sholat wajib terpenuhi (maks 5).
function GrafikSholat({ seri }) {
  const theme = useTheme();
  const W = 336;
  const H = 176;
  const dasar = 142;
  const tinggiMaks = 108;
  const lebarSlot = W / Math.max(1, seri.length);
  const lebarBatang = Math.min(30, lebarSlot - 8);
  const ringkas = seri.map((s) => `${s.label} ${s.jumlah} dari 5`).join(', ');
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={`Grafik sholat wajib terpenuhi per hari: ${ringkas}`}
      css={{ display: 'block' }}
    >
      <line x1={8} y1={dasar} x2={W - 8} y2={dasar} stroke={theme.colors.border} strokeWidth={1.5} />
      {seri.map((s, i) => {
        const tinggi = Math.max(2, (s.jumlah / 5) * tinggiMaks);
        const x = i * lebarSlot + (lebarSlot - lebarBatang) / 2;
        const y = dasar - tinggi;
        return (
          <g key={s.kunci}>
            <rect
              x={x}
              y={y}
              width={lebarBatang}
              height={tinggi}
              rx={6}
              fill={s.hariIni ? theme.colors.gold : theme.colors.primary}
              opacity={s.jumlah === 0 ? 0.25 : 1}
            />
            <text
              x={x + lebarBatang / 2}
              y={y - 6}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={theme.colors.text}
            >
              {s.jumlah}
            </text>
            <text
              x={x + lebarBatang / 2}
              y={dasar + 16}
              textAnchor="middle"
              fontSize={10.5}
              fill={theme.colors.muted}
            >
              {s.label}
            </text>
            <text
              x={x + lebarBatang / 2}
              y={dasar + 29}
              textAnchor="middle"
              fontSize={10}
              fill={theme.colors.muted}
            >
              {s.tglLabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function muatSemua() {
  return {
    sholat: LocalSholatTrackerRepository.loadSemua(),
    qadha: LocalQadhaRepository.loadSemua(),
    mutabaah: LocalMutabaahRepository.loadSemua(),
    khatam: LocalKhatamRepository.load(),
  };
}

export default function StatistikPage() {
  const [periode, setPeriode] = useState(7);
  const [data] = useState(muatSemua);
  const {
    state: stateStreak,
    streak,
    lencana,
    ubahTarget,
  } = useStreak();
  const totalAktifStreak = totalHariAktif(stateStreak);
  const totalAyatStreak = totalAyat(stateStreak);

  const stats = useMemo(() => {
    const hariIni = new Date();
    const seriSholat = hariTerakhir(7, hariIni).map(({ kunci, tanggal }) => {
      const record = data.sholat[kunci] ?? {};
      return {
        kunci,
        label: HARI_SINGKAT[tanggal.getDay()],
        tglLabel: String(tanggal.getDate()),
        jumlah: LIMA_WAKTU.filter((w) => record[w]).length,
        hariIni: kunci === kunciTanggal(hariIni),
      };
    });

    const hitungPeriode = (n) => {
      const hari = hariTerakhir(n, hariIni);
      let totalSholat = 0;
      let hariLengkap = 0;
      let hariAktifMutabaah = 0;
      let totalPoinMutabaah = 0;
      for (const { kunci } of hari) {
        const recordSholat = data.sholat[kunci] ?? {};
        const jumlah = LIMA_WAKTU.filter((w) => recordSholat[w]).length;
        totalSholat += jumlah;
        if (jumlah === 5) hariLengkap += 1;
        const poin = poinMutabaahHarian(data.mutabaah[kunci]);
        if (data.mutabaah[kunci] && poin > 0) hariAktifMutabaah += 1;
        totalPoinMutabaah += poin;
      }
      return {
        totalSholat,
        maksSholat: n * 5,
        persenSholat: Math.round((totalSholat / (n * 5)) * 100),
        hariLengkap,
        hariAktifMutabaah,
        rataPoinMutabaah: Math.round((totalPoinMutabaah / n) * 10) / 10,
      };
    };

    return { seriSholat, per7: hitungPeriode(7), per30: hitungPeriode(30) };
  }, [data]);

  const aktif = periode === 7 ? stats.per7 : stats.per30;
  const qadhaSisa = Math.max(0, data.qadha.totalUtang - data.qadha.terbayar);
  const qadhaPersen =
    data.qadha.totalUtang > 0
      ? Math.round((data.qadha.terbayar / data.qadha.totalUtang) * 100)
      : 0;
  const juzSelesai = Object.values(data.khatam.selesai ?? {}).filter(Boolean).length;

  const adaData =
    Object.keys(data.sholat).length > 0 ||
    Object.keys(data.mutabaah).length > 0 ||
    data.qadha.totalUtang > 0 ||
    data.qadha.terbayar > 0 ||
    juzSelesai > 0;

  return (
    <Page>
      <PageTitle>
        <FaChartBar /> Statistik Ibadah
      </PageTitle>
      <PageSubtitle>
        Gabungan Sholat Tracker, Mutaba&apos;ah, Qadha Puasa, dan Khatam dari perangkat ini.
      </PageSubtitle>

      {!adaData ? (
        <Card>
          <StateKosong
            ikon={<FaChartLine />}
            judul="Belum ada data ibadah"
            deskripsi="Statistik akan muncul setelah kamu memakai Sholat Tracker, Mutaba'ah, Qadha Puasa, atau Khatam. Semua data tersimpan hanya di perangkat ini."
          />
        </Card>
      ) : (
        <>
          <SegmenWadah role="tablist" aria-label="Periode statistik">
            <SegmenTab css={{ minHeight: 44 }} aktif={periode === 7} onClick={() => setPeriode(7)}>
              7 Hari
            </SegmenTab>
            <SegmenTab css={{ minHeight: 44 }} aktif={periode === 30} onClick={() => setPeriode(30)}>
              30 Hari
            </SegmenTab>
          </SegmenWadah>

          <GridAngka>
            <AngkaBesar>
              <div className="angka">{aktif.persenSholat}%</div>
              <div className="ket">
                <FaPrayingHands /> Sholat wajib terpenuhi ({periode} hari)
              </div>
            </AngkaBesar>
            <AngkaBesar>
              <div className="angka">{aktif.hariLengkap}</div>
              <div className="ket">Hari lengkap 5 waktu ({periode} hari)</div>
            </AngkaBesar>
            <AngkaBesar>
              <div className="angka">{aktif.hariAktifMutabaah}</div>
              <div className="ket">
                <FaClipboardCheck /> Hari aktif mutaba&apos;ah ({periode} hari)
              </div>
            </AngkaBesar>
            <AngkaBesar>
              <div className="angka">{aktif.rataPoinMutabaah}</div>
              <div className="ket">Rata-rata poin mutaba&apos;ah per hari</div>
            </AngkaBesar>
          </GridAngka>

          <SectionTitle>
            <FaPrayingHands /> Sholat Wajib 7 Hari Terakhir
          </SectionTitle>
          <Card>
            <GrafikSholat seri={stats.seriSholat} />
            <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, lineHeight: 1.6, marginTop: 8 })}>
              Angka di atas batang = jumlah sholat wajib yang ditandai selesai hari itu (maksimal
              5). Total {periode} hari terakhir: {aktif.totalSholat} dari {aktif.maksSholat} waktu
              sholat.
            </p>
          </Card>

          <SectionTitle>
            <FaMoon /> Qadha Puasa
          </SectionTitle>
          <Card>
            <ResultRow>
              <span className="label">Total utang puasa</span>
              <span className="value">{data.qadha.totalUtang} hari</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Sudah terbayar</span>
              <span className="value">{data.qadha.terbayar} hari</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Sisa utang</span>
              <span className="value">{qadhaSisa} hari</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Progres pelunasan</span>
              <span className="value">{qadhaPersen}%</span>
            </ResultRow>
          </Card>

          <SectionTitle>
            <FaBookReader /> Khatam Al-Qur&apos;an
          </SectionTitle>
          <Card>
            <ResultRow>
              <span className="label">Juz selesai</span>
              <span className="value">{juzSelesai} dari 30 juz</span>
            </ResultRow>
            <ResultRow>
              <span className="label">Halaman selesai</span>
              <span className="value">
                {halamanSelesai(data.khatam.selesai ?? {})} dari {TOTAL_HALAMAN}
              </span>
            </ResultRow>
            <ResultRow>
              <span className="label">Progres khatam</span>
              <span className="value">{persenKhatam(data.khatam.selesai ?? {})}%</span>
            </ResultRow>
          </Card>
        </>
      )}

      <SectionTitle>
        <FaFire /> Streak &amp; Lencana
      </SectionTitle>
      <Card>
        <ResultRow>
          <span className="label">Streak saat ini</span>
          <span className="value">{streak} hari</span>
        </ResultRow>
        <ResultRow>
          <span className="label">Total hari aktif</span>
          <span className="value">{totalAktifStreak} hari</span>
        </ResultRow>
        <ResultRow>
          <span className="label">Total ayat terbaca</span>
          <span className="value">{totalAyatStreak} ayat</span>
        </ResultRow>

        <LabelTarget id="label-target-ayat">Target ayat per hari</LabelTarget>
        <SegmenWadah role="tablist" aria-labelledby="label-target-ayat" css={{ marginBottom: 6 }}>
          {[5, 10, 20, 50].map((n) => (
            <SegmenTab
              key={n}
              aktif={stateStreak.targetAyat === n}
              onClick={() => ubahTarget(n)}
            >
              {n} ayat
            </SegmenTab>
          ))}
        </SegmenWadah>

        <div>
          {lencana.map((l) => (
            <BarisLencana key={l.id} terbuka={l.terbuka}>
              <LingkaranLencana terbuka={l.terbuka}>
                {l.terbuka ? (IKON_LENCANA[l.ikon] ?? <FaFire aria-hidden="true" />) : <FaLock aria-hidden="true" />}
              </LingkaranLencana>
              <span>
                <span className="nama">{l.nama}</span>
                <span className="progres" css={{ display: 'block' }}>
                  {l.terbuka ? `Terbuka · ${l.deskripsi}` : l.progres}
                </span>
              </span>
            </BarisLencana>
          ))}
        </div>
      </Card>
    </Page>
  );
}
