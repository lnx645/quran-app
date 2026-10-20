/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaClock, FaMapMarkerAlt, FaBell, FaSun, FaMoon, FaCloudSun, FaTimes,
} from 'react-icons/fa';
import { useJadwal, KOTA_OPSI } from '../hooks/useJadwal.js';
import { CornerOrnament } from '../components/ornaments/index.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SelectInput, Field,
  ErrorBox, SectionTitle, Skeleton,
} from '../components/common.jsx';
import { useToast } from '../components/feedback/toastStore.js';
import { umumkan } from '../components/feedback/umumkan.js';
import { useAkses } from '../a11y/pengaturanStore.js';

// Banner adzan PERSISTEN (untuk pengguna tuli & lingkungan senyap):
// menetap sampai ditutup manual — bukan toast sesaat yang mudah terlewat.
const BannerAdzan = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.emeraldPanelGelap}, ${({ theme }) => theme.colors.emeraldPanel});
  color: #fff;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  .ikon {
    font-size: 26px;
    color: ${({ theme }) => theme.colors.goldLight};
    flex-shrink: 0;
  }
  .judul {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 19px;
    font-weight: 700;
    line-height: 1.3;
  }
  .sub {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.88);
    margin-top: 2px;
  }
`;

const TutupBanner = styled.button`
  margin-left: auto;
  flex-shrink: 0;
  min-width: 44px;
  min-height: 44px;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(231, 198, 90, 0.6);
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

// Pola getar khas per waktu sholat (membedakan tanpa melihat layar).
const POLA_GETAR_ADZAN = {
  Subuh: [300, 100, 300],
  Dzuhur: [150, 80, 150],
  Ashar: [150, 80, 150, 80, 150],
  Maghrib: [450],
  Isya: [200, 100, 200, 100, 200],
};

const hijriBulanId = (en) =>
  ({
    'Muḥarram': 'Muharram', Muharram: 'Muharram', "Jumādá al-ūlá": 'Jumadil Ula',
    'Jumādá al-ākhirah': 'Jumadil Akhir', Rajab: 'Rajab', "Shaʿbān": 'Sya\u2019ban',
    'Ramaḍān': 'Ramadan', Ramadan: 'Ramadan', 'Shawwāl': 'Syawal', 'Dhū al-Qaʿdah': 'Dzulqa\u2019dah',
    'Dhū al-Ḥijjah': 'Dzulhijjah',
  }[en] ?? en);

const ikonWaktu = { Subuh: <FaMoon />, Terbit: <FaSun />, Dzuhur: <FaCloudSun />, Ashar: <FaCloudSun />, Maghrib: <FaSun />, Isya: <FaMoon /> };

const HeaderJadwal = styled(GoldCard)`
  text-align: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${({ theme }) => theme.pattern};
    background-size: 56px 56px;
    opacity: 0.12;
    pointer-events: none;
  }
`;

const HijriBesar = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.judul};
`;

const BarisWaktu = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 14px;
  margin-bottom: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, status }) =>
    status === 'berikutnya'
      ? `linear-gradient(120deg, ${theme.colors.emeraldPanelGelap}, ${theme.colors.emeraldPanel})`
      : status === 'lewat'
      ? theme.colors.surfaceAlt
      : theme.colors.surface};
  color: ${({ theme, status }) =>
    status === 'berikutnya' ? '#fff' : theme.colors.text};
  opacity: ${({ status }) => (status === 'lewat' ? 0.55 : 1)};
  transition: opacity 0.3s ease;
  .ikon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    background: ${({ theme, status }) =>
      status === 'berikutnya' ? 'rgba(255,255,255,.15)' : theme.colors.primarySoft};
    color: ${({ theme, status }) =>
      status === 'berikutnya' ? theme.colors.goldLight : theme.colors.primary};
  }
  .jam {
    margin-left: auto;
    font-weight: 700;
    font-size: 18px;
    font-variant-numeric: tabular-nums;
  }
  .lencana {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldLight};
  }
`;

const CountdownBox = styled.div`
  text-align: center;
  font-size: 34px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.judul};
  letter-spacing: 2px;
`;

const menitDariJam = (jam) => {
  const [h, m] = jam.split(':').map(Number);
  return h * 60 + m;
};

// Skeleton loading: tiruan kartu jadwal + deretan baris waktu.
function JadwalSkeleton() {
  return (
    <div aria-busy="true">
      <div css={{ marginBottom: 16 }}>
        <Skeleton h={168} radius={20} />
      </div>
      <div css={{ marginBottom: 12 }}>
        <Skeleton h={20} w="42%" radius={6} />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} css={{ marginBottom: 8 }}>
          <Skeleton h={64} radius={14} />
        </div>
      ))}
    </div>
  );
}

const fmtCountdown = (detik) => {
  const s = Math.max(0, detik);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
};

/** Bunyi beep pendek via WebAudio (tanpa file eksternal). */
function beepAdzan() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const mulai = t + i * 0.28;
      gain.gain.setValueAtTime(0.001, mulai);
      gain.gain.exponentialRampToValueAtTime(0.4, mulai + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, mulai + 0.26);
      osc.start(mulai);
      osc.stop(mulai + 0.3);
    });
  } catch {
    /* Audio tidak didukung — abaikan */
  }
}

export default function JadwalPage() {
  const [kota, setKota] = useState('Sumedang');
  const { loading, error, data } = useJadwal(kota);
  const [sekarang, setSekarang] = useState(new Date());
  const toast = useToast();
  const { pengaturan } = useAkses();
  const [bannerAdzan, setBannerAdzan] = useState(null);
  const teriakTerakhir = useRef('');

  useEffect(() => {
    const id = setInterval(() => setSekarang(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const status = useMemo(() => {
    if (!data) return null;
    const menitSkrg = sekarang.getHours() * 60 + sekarang.getMinutes();
    const list = data.waktu.map((w) => ({ ...w, menit: menitDariJam(w.jam) }));
    let berikutnya = list.find((w) => w.menit > menitSkrg);
    const untukBesok = !berikutnya;
    if (untukBesok) berikutnya = list[0]; // subuh besok
    const detik = untukBesok
      ? (1440 - menitSkrg + berikutnya.menit) * 60 - sekarang.getSeconds()
      : (berikutnya.menit - menitSkrg) * 60 - sekarang.getSeconds();
    return { list, berikutnya, detik, untukBesok };
  }, [data, sekarang]);

  // Notifikasi saat waktu sholat tiba (tab terbuka).
  useEffect(() => {
    if (!data) return;
    const kunci = `${kota}-${menitDariJamHariIni(data.waktu)}`;
    const match = data.waktu.find((w) => {
      const d = new Date();
      return w.jam === `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    });
    if (match && teriakTerakhir.current !== kunci + match.kunci) {
      teriakTerakhir.current = kunci + match.kunci;
      toast.sukses(`Waktu sholat ${match.nama} telah tiba (${match.jam})`, 9000);
      // Pengumuman tegas untuk screen reader: waktu apa yang masuk.
      umumkan(`Sudah masuk waktu sholat ${match.nama}, pukul ${match.jam}.`, 'tegas');
      beepAdzan();
      // Banner persisten untuk pengguna tuli — menetap sampai ditutup.
      setBannerAdzan({ nama: match.nama, jam: match.jam });
      if (pengaturan.getarAdzan) {
        try {
          navigator.vibrate?.(POLA_GETAR_ADZAN[match.nama] ?? [200, 100, 200]);
        } catch {
          /* getar tidak didukung */
        }
      }
    }
  }, [sekarang, data, kota, toast, pengaturan.getarAdzan]);

  return (
    <Page>
      {bannerAdzan && (
        <BannerAdzan role="alert">
          <FaBell className="ikon" aria-hidden="true" />
          <div>
            <div className="judul">Waktu Sholat {bannerAdzan.nama} Telah Tiba</div>
            <div className="sub">
              Pukul {bannerAdzan.jam} — selamat menunaikan sholat {bannerAdzan.nama.toLowerCase()}.
            </div>
          </div>
          <TutupBanner type="button" onClick={() => setBannerAdzan(null)} aria-label="Tutup banner adzan">
            <FaTimes /> Tutup
          </TutupBanner>
        </BannerAdzan>
      )}
      <PageTitle>
        <FaClock /> Jadwal Sholat
      </PageTitle>
      <PageSubtitle>Metode Kementerian Agama RI. Countdown otomatis setiap detik.</PageSubtitle>

      <Field>
        <label htmlFor="kota">Kota</label>
        <SelectInput id="kota" value={kota} onChange={(e) => setKota(e.target.value)}>
          {KOTA_OPSI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </SelectInput>
      </Field>

      {loading && <JadwalSkeleton />}
      {error && <ErrorBox>Gagal memuat jadwal: {error}</ErrorBox>}

      {data && status && (
        <>
          <HeaderJadwal>
            <CornerOrnament corner="tl" size={52} style={{ top: 4, left: 4 }} />
            <CornerOrnament corner="br" size={52} style={{ bottom: 4, right: 4 }} />
            <div css={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, marginBottom: 6 }}>
              <FaMapMarkerAlt /> {data.kota} — {data.tanggalMasehi}
            </div>
            <HijriBesar>
              {data.hijriah.tanggal} {hijriBulanId(data.hijriah.bulan)} {data.hijriah.tahun} H
            </HijriBesar>
            <div css={{ position: 'relative', marginTop: 10 }}>
              <div css={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                {status.berikutnya.nama} berikutnya{status.untukBesok ? ' (besok)' : ''} dalam
              </div>
              <CountdownBox>{fmtCountdown(status.detik)}</CountdownBox>
            </div>
          </HeaderJadwal>

          <SectionTitle>Jadwal Hari Ini</SectionTitle>
          {status.list.map((w) => {
            const menitSkrg = sekarang.getHours() * 60 + sekarang.getMinutes();
            const s =
              w.kunci === status.berikutnya.kunci
                ? 'berikutnya'
                : w.menit < menitSkrg
                ? 'lewat'
                : '';
            return (
              <BarisWaktu key={w.kunci} status={s}>
                <span className="ikon">{ikonWaktu[w.nama] ?? <FaClock />}</span>
                <span css={{ fontWeight: 600 }}>{w.nama}</span>
                {s === 'berikutnya' && <span className="lencana">Berikutnya</span>}
                <span className="jam">{w.jam}</span>
              </BarisWaktu>
            );
          })}
        </>
      )}
    </Page>
  );
}

function menitDariJamHariIni(list) {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes()}`;
}
