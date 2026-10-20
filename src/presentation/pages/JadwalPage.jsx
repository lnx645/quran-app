/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaClock, FaMapMarkerAlt, FaBell, FaSun, FaMoon, FaCloudSun, FaTimes, FaBan,
} from 'react-icons/fa';
import { useJadwal, KOTA_OPSI } from '../hooks/useJadwal.js';
import { CornerOrnament } from '../components/ornaments/index.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SelectInput, TextInput, Field,
  ErrorBox, SectionTitle, Skeleton, GhostButton, PrimaryButton,
} from '../components/common.jsx';
import { useToast } from '../components/feedback/toastStore.js';
import { umumkan } from '../components/feedback/umumkan.js';
import { useAkses } from '../a11y/pengaturanStore.js';
import { usePengingat } from '../hooks/usePengingat.js';

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

// Kartu hitung mundur iqamah: tampil hanya saat adzan sudah masuk dan
// iqamah (waktu sholat + offset) belum tiba.
const IqamahBox = styled(GoldCard)`
  text-align: center;
  .label {
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
  .hitung {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 38px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: 2px;
    color: ${({ theme }) => theme.colors.judul};
    margin: 4px 0 2px;
  }
  .ket {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

// Baris + sakelar pengingat: pola yang SAMA dengan Toggle di
// AksesibilitasPage (BarisSetelan + Saklar role="switch") — bukan gaya baru.
// Area sentuh sakelar dibuat setinggi 44px; rel visualnya tetap 32px
// (digambar ::before) agar tampilannya identik dengan sakelar aksesibilitas.
const BarisSetelan = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .teks {
    flex: 1;
    min-width: 0;
  }
  .judul {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
  .desc {
    font-size: 12.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
`;

const Saklar = styled.button`
  flex-shrink: 0;
  width: 56px;
  height: 44px;
  min-width: 56px;
  min-height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 32px;
    border-radius: 999px;
    border: 2px solid
      ${({ theme, nyala }) => (nyala ? theme.colors.gold : theme.colors.border)};
    background: ${({ theme, nyala }) =>
      nyala ? theme.colors.emeraldPanel : theme.colors.surfaceAlt};
    transition: background 0.18s ease;
    box-sizing: border-box;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: ${({ nyala }) => (nyala ? 'calc(100% - 27px)' : '3px')};
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${({ theme, nyala }) => (nyala ? theme.colors.goldLight : '#fff')};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    transition: left 0.18s ease;
  }
`;

function BarisPengingat({ judul, desc, nyala, onToggle }) {
  return (
    <BarisSetelan>
      <div className="teks">
        <div className="judul">{judul}</div>
        {desc && <div className="desc">{desc}</div>}
      </div>
      <Saklar
        type="button"
        role="switch"
        aria-checked={nyala}
        aria-label={judul}
        nyala={nyala}
        onClick={onToggle}
      />
    </BarisSetelan>
  );
}

const menitDariJam = (jam) => {
  const [h, m] = jam.split(':').map(Number);
  return h * 60 + m;
};

// Geser jam "HH:MM" sejumlah menit (untuk rentang waktu terlarang: syuruq
// +15 menit & istiwa' −10 menit sebelum Zuhur) → tetap format "HH:MM".
const tambahMenit = (jam, delta) => {
  const total = ((menitDariJam(jam) + delta) % 1440 + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
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

// Metode perhitungan Aladhan — id TERVERIFIKASI dari GET /v1/methods
// (api.aladhan.com, dicek 2026-10-20): nama resmi → id.
const METODE_OPSI = [
  { id: 20, label: 'Kemenag RI — Kementerian Agama Republik Indonesia' },
  { id: 3, label: 'MWL — Muslim World League' },
  { id: 17, label: 'JAKIM — Malaysia' },
  { id: 11, label: 'MUIS — Singapura' },
  { id: 4, label: 'Umm al-Qura — Makkah' },
  { id: 5, label: 'Mesir — Egyptian General Authority of Survey' },
  { id: 2, label: 'ISNA — Amerika Utara' },
  { id: 13, label: 'Diyanet — Turki' },
  { id: 16, label: 'Dubai' },
  { id: 9, label: 'Kuwait' },
  { id: 10, label: 'Qatar' },
  { id: 8, label: 'Wilayah Teluk (Gulf Region)' },
  { id: 1, label: 'Karachi — University of Islamic Sciences' },
];
const METODE_VALID = METODE_OPSI.map((m) => m.id);

// Sholat wajib yang memiliki iqamah (Terbit/Syuruq tidak termasuk).
const SHOLAT_IQAMAH = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];

const clampMenit = (n) => Math.min(60, Math.max(0, Math.round(Number(n) || 0)));

// Pref jadwal sholat (localStorage) — SATU objek bersama di kunci
// `noor.jadwal.v1`, DIPERLUAS bertahap (migrasi aman: field lama dipertahankan,
// field baru yang belum ada jatuh ke nilai bawaan):
// - suaraAdzan: 'asli' | 'bip' | 'mati'        (gelombang 4)
// - metode: id metode Aladhan                  (gelombang 5, bawaan 20 Kemenag)
// - iqamahGlobal: offset iqamah global (menit) (gelombang 5, bawaan 10)
// - iqamahPer: { [namaSholat]: menit } timpaan per sholat (gelombang 5)
const KUNCI_PREF_JADWAL = 'noor.jadwal.v1';
const PREF_JADWAL_BAWAAN = { suaraAdzan: 'asli', metode: 20, iqamahGlobal: 10, iqamahPer: {} };

function bacaPrefJadwal() {
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI_PREF_JADWAL) ?? '{}');
    const iqamahPer = {};
    if (data.iqamahPer && typeof data.iqamahPer === 'object') {
      for (const nama of SHOLAT_IQAMAH) {
        if (data.iqamahPer[nama] != null && Number.isFinite(Number(data.iqamahPer[nama]))) {
          iqamahPer[nama] = clampMenit(data.iqamahPer[nama]);
        }
      }
    }
    return {
      suaraAdzan: ['asli', 'bip', 'mati'].includes(data.suaraAdzan)
        ? data.suaraAdzan
        : PREF_JADWAL_BAWAAN.suaraAdzan,
      metode: METODE_VALID.includes(Number(data.metode))
        ? Number(data.metode)
        : PREF_JADWAL_BAWAAN.metode,
      iqamahGlobal:
        data.iqamahGlobal != null && Number.isFinite(Number(data.iqamahGlobal))
          ? clampMenit(data.iqamahGlobal)
          : PREF_JADWAL_BAWAAN.iqamahGlobal,
      iqamahPer,
    };
  } catch {
    return { ...PREF_JADWAL_BAWAAN };
  }
}

function simpanPrefJadwal(patch) {
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI_PREF_JADWAL) ?? '{}');
    localStorage.setItem(KUNCI_PREF_JADWAL, JSON.stringify({ ...data, ...patch }));
  } catch {
    /* penyimpanan tidak tersedia — pilihan berlaku sesi ini saja */
  }
}

// Rekaman adzan asli (public/audio/adzan.mp3): "The Adhan - Muslim Call to
// Prayer" oleh Aaqib Azeez, CC BY-SA 4.0, Wikimedia Commons — atribusi
// lengkap di public/audio/SUMBER.md.
const URL_ADZAN_ASLI = `${import.meta.env.BASE_URL}audio/adzan.mp3`;

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
  const [pref, setPref] = useState(bacaPrefJadwal);
  const { loading, error, data } = useJadwal(kota, pref.metode);
  const [sekarang, setSekarang] = useState(new Date());
  const toast = useToast();
  const { pengaturan } = useAkses();
  const {
    pref: prefPengingat,
    ubah: ubahPengingat,
    izin: izinNotif,
    didukung: notifDidukung,
    mintaIzin: mintaIzinNotif,
    native: platformNative,
  } = usePengingat();
  const [bannerAdzan, setBannerAdzan] = useState(null);
  const teriakTerakhir = useRef('');
  const suaraAdzan = pref.suaraAdzan;
  const adzanAudioRef = useRef(null);

  const ubahPref = useCallback((patch) => {
    setPref((p) => ({ ...p, ...patch }));
    simpanPrefJadwal(patch);
  }, []);

  const ubahSuaraAdzan = (nilai) => ubahPref({ suaraAdzan: nilai });

  // Offset iqamah efektif per sholat: timpaan per-sholat menang atas global.
  const offsetIqamah = useCallback(
    (nama) => pref.iqamahPer[nama] ?? pref.iqamahGlobal,
    [pref.iqamahPer, pref.iqamahGlobal],
  );

  // Putar suara sesuai pref. Dipicu HANYA oleh pemicu yang sudah ada:
  // efek waktu sholat tiba (pengaturan notifikasi pengguna) dan tombol
  // "Tes Suara" (interaksi langsung). play() yang ditolak kebijakan
  // autoplay ditelan diam-diam — banner persisten tetap tampil.
  const putarSuaraAdzan = useCallback(() => {
    if (suaraAdzan === 'mati') return;
    if (suaraAdzan === 'bip') {
      beepAdzan();
      return;
    }
    try {
      if (adzanAudioRef.current === null && typeof Audio !== 'undefined') {
        adzanAudioRef.current = new Audio();
        adzanAudioRef.current.preload = 'none';
      }
      const el = adzanAudioRef.current;
      if (!el) return;
      el.src = URL_ADZAN_ASLI;
      el.currentTime = 0;
      el.play()?.catch(() => {});
    } catch {
      /* audio tidak didukung — banner tetap tampil */
    }
  }, [suaraAdzan]);

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

  // Hitung mundur iqamah: sholat wajib terakhir yang adzannya sudah masuk
  // dan waktu iqamahnya (adzan + offset) belum lewat.
  const statusIqamah = useMemo(() => {
    if (!data) return null;
    const detikSkrg =
      sekarang.getHours() * 3600 + sekarang.getMinutes() * 60 + sekarang.getSeconds();
    for (const w of data.waktu) {
      if (!SHOLAT_IQAMAH.includes(w.nama)) continue;
      const offset = offsetIqamah(w.nama);
      if (offset <= 0) continue;
      const detikAdzan = menitDariJam(w.jam) * 60;
      const detikIqamah = detikAdzan + offset * 60;
      if (detikSkrg >= detikAdzan && detikSkrg < detikIqamah) {
        return {
          nama: w.nama,
          jamIqamah: tambahMenit(w.jam, offset),
          detikSisa: detikIqamah - detikSkrg,
        };
      }
    }
    return null;
  }, [data, sekarang, offsetIqamah]);

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
      putarSuaraAdzan();
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
  }, [sekarang, data, kota, toast, pengaturan.getarAdzan, putarSuaraAdzan]);

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
      <PageSubtitle>
        Metode: {METODE_OPSI.find((m) => m.id === pref.metode)?.label ?? 'Kemenag RI'}. Countdown
        otomatis setiap detik.
      </PageSubtitle>

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

      <Field>
        <label htmlFor="metode">Metode Perhitungan</label>
        <SelectInput
          id="metode"
          value={String(pref.metode)}
          onChange={(e) => ubahPref({ metode: Number(e.target.value) })}
        >
          {METODE_OPSI.map((m) => (
            <option key={m.id} value={String(m.id)}>
              {m.label}
            </option>
          ))}
        </SelectInput>
      </Field>

      <Field>
        <label htmlFor="suara-adzan">Suara Adzan</label>
        <SelectInput
          id="suara-adzan"
          value={suaraAdzan}
          onChange={(e) => ubahSuaraAdzan(e.target.value)}
        >
          <option value="asli">Adzan asli (rekaman)</option>
          <option value="bip">Bip (bunyi penanda)</option>
          <option value="mati">Mati (hanya banner &amp; getar)</option>
        </SelectInput>
        <div css={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
          <GhostButton type="button" onClick={putarSuaraAdzan} aria-label="Putar tes suara adzan terpilih">
            <FaBell /> Tes Suara
          </GhostButton>
          <span css={(t) => ({ fontSize: 12, color: t.colors.muted, lineHeight: 1.5 })}>
            Adzan asli: rekaman Aaqib Azeez, CC BY-SA 4.0 (Wikimedia Commons).
          </span>
        </div>
      </Field>

      <SectionTitle>Iqamah</SectionTitle>
      <Card>
        <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, lineHeight: 1.55, marginBottom: 12 })}>
          Jeda antara adzan dan iqamah. Setelah waktu sholat masuk, hitung mundur ke iqamah tampil
          otomatis. Isi 0 untuk menonaktifkan. Nilai per sholat menimpa nilai umum.
        </p>
        <Field>
          <label htmlFor="iqamah-global">Jeda iqamah umum (menit)</label>
          <TextInput
            id="iqamah-global"
            type="number"
            inputMode="numeric"
            min="0"
            max="60"
            value={String(pref.iqamahGlobal)}
            onChange={(e) => ubahPref({ iqamahGlobal: clampMenit(e.target.value) })}
          />
        </Field>
        <div css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
          {SHOLAT_IQAMAH.map((nama) => (
            <Field key={nama}>
              <label htmlFor={`iqamah-${nama.toLowerCase()}`}>{nama} (menit)</label>
              <TextInput
                id={`iqamah-${nama.toLowerCase()}`}
                type="number"
                inputMode="numeric"
                min="0"
                max="60"
                placeholder={String(pref.iqamahGlobal)}
                value={pref.iqamahPer[nama] != null ? String(pref.iqamahPer[nama]) : ''}
                onChange={(e) => {
                  const mentah = e.target.value;
                  const baru = { ...pref.iqamahPer };
                  if (mentah === '') delete baru[nama];
                  else baru[nama] = clampMenit(mentah);
                  ubahPref({ iqamahPer: baru });
                }}
                aria-label={`Jeda iqamah ${nama} dalam menit, kosong berarti ikut nilai umum`}
              />
            </Field>
          ))}
        </div>
      </Card>

      <SectionTitle>
        <FaBell /> Pengingat
      </SectionTitle>
      <Card>
        <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, lineHeight: 1.55, marginBottom: 12 })}>
          {platformNative
            ? 'Pengingat terjadwal di perangkat — tetap bunyi walau aplikasi ditutup.'
            : 'Pengingat tampil selama aplikasi atau peramban terbuka di perangkat ini.'}
        </p>
        {!notifDidukung ? (
          <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, lineHeight: 1.55, marginBottom: 12 })}>
            {platformNative
              ? 'Perangkat ini tidak mendukung notifikasi.'
              : 'Peramban ini tidak mendukung notifikasi.'}
          </p>
        ) : izinNotif === 'denied' ? (
          <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, lineHeight: 1.55, marginBottom: 12 })}>
            {platformNative
              ? 'Izin notifikasi ditolak — aktifkan lewat pengaturan aplikasi.'
              : 'Izin notifikasi ditolak — aktifkan lewat pengaturan peramban.'}
          </p>
        ) : izinNotif === 'default' ? (
          <div css={{ marginBottom: 12 }}>
            <PrimaryButton type="button" onClick={mintaIzinNotif}>
              <FaBell /> Izinkan Notifikasi
            </PrimaryButton>
          </div>
        ) : (
          <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, lineHeight: 1.55, marginBottom: 12 })}>
            Izin notifikasi sudah diberikan di perangkat ini.
          </p>
        )}
        <BarisPengingat
          judul="Dzikir Pagi"
          desc="Setiap hari pukul 05.30 — membuka halaman Dzikir."
          nyala={prefPengingat.dzikirPagi}
          onToggle={() => ubahPengingat('dzikirPagi', !prefPengingat.dzikirPagi)}
        />
        <BarisPengingat
          judul="Dzikir Petang"
          desc="Setiap hari pukul 17.00 — membuka halaman Dzikir."
          nyala={prefPengingat.dzikirPetang}
          onToggle={() => ubahPengingat('dzikirPetang', !prefPengingat.dzikirPetang)}
        />
        <BarisPengingat
          judul="Target Baca Harian"
          desc="Setiap hari pukul 20.00 — membuka halaman Al-Qur'an."
          nyala={prefPengingat.targetBaca}
          onToggle={() => ubahPengingat('targetBaca', !prefPengingat.targetBaca)}
        />
      </Card>

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

          {statusIqamah && (
            <IqamahBox role="status" aria-live="polite">
              <div className="label">Menuju Iqamah {statusIqamah.nama}</div>
              <div className="hitung">{fmtCountdown(statusIqamah.detikSisa)}</div>
              <div className="ket">
                Iqamah pukul {statusIqamah.jamIqamah} — bersiaplah, luruskan dan rapatkan saf.
              </div>
            </IqamahBox>
          )}

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
                {w.kunci === 'Sunrise' ? (
                  // Baris Syuruq: jam yang sama dengan Sunrise (timings.Sunrise
                  // dari Aladhan) — penanda akhir waktu Subuh & awal waktu Dhuha.
                  <span css={{ display: 'flex', flexDirection: 'column' }}>
                    <span css={{ fontWeight: 600 }}>Syuruq</span>
                    <span css={{ fontSize: 11.5, opacity: 0.75 }}>Matahari terbit</span>
                  </span>
                ) : (
                  <span css={{ fontWeight: 600 }}>{w.nama}</span>
                )}
                {s === 'berikutnya' && <span className="lencana">Berikutnya</span>}
                <span css={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <span className="jam" css={{ marginLeft: 0 }}>{w.jam}</span>
                  {SHOLAT_IQAMAH.includes(w.nama) && offsetIqamah(w.nama) > 0 && (
                    <span css={{ display: 'block', fontSize: 11.5, opacity: 0.8, marginTop: 1 }}>
                      Iqamah {tambahMenit(w.jam, offsetIqamah(w.nama))}
                    </span>
                  )}
                </span>
              </BarisWaktu>
            );
          })}

          <SectionTitle>
            <FaBan /> Waktu Terlarang Sholat
          </SectionTitle>
          <Card>
            <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, marginBottom: 12, lineHeight: 1.55 })}>
              Tiga rentang waktu yang dilarang untuk sholat sunnah tanpa sebab, dihitung dari jadwal
              hari ini:
            </p>
            {(() => {
              const jamDari = (kunci) => data.waktu.find((w) => w.kunci === kunci)?.jam ?? '';
              const rentang = [
                {
                  kunci: 'subuh-syuruq',
                  ikon: <FaSun />,
                  judul: 'Setelah Subuh hingga syuruq',
                  jam: `${jamDari('Fajr')} – ${tambahMenit(jamDari('Sunrise'), 15)}`,
                  ket: 'Sejak masuk Subuh sampai matahari terbit sempurna (±15 menit setelah syuruq).',
                },
                {
                  kunci: 'istiwa',
                  ikon: <FaClock />,
                  judul: "Saat istiwa' sebelum Zuhur",
                  jam: `${tambahMenit(jamDari('Dhuhr'), -10)} – ${jamDari('Dhuhr')}`,
                  ket: 'Saat matahari tepat di tengah langit, sesaat sebelum tergelincir masuk Zuhur.',
                },
                {
                  kunci: 'asar-maghrib',
                  ikon: <FaMoon />,
                  judul: 'Setelah Asar hingga terbenam',
                  jam: `${jamDari('Asr')} – ${jamDari('Maghrib')}`,
                  ket: 'Sejak masuk Asar sampai matahari terbenam sempurna (masuk waktu Maghrib).',
                },
              ];
              return rentang.map((r) => (
                <div
                  key={r.kunci}
                  css={(t) => ({
                    border: `1px solid ${t.colors.border}`,
                    background: t.colors.surface,
                    borderRadius: 14,
                    padding: '13px 14px',
                    marginBottom: 8,
                  })}
                >
                  <div css={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 7 }}>
                    <span
                      css={(t) => ({
                        flexShrink: 0,
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 17,
                        background: t.colors.primarySoft,
                        color: t.colors.primary,
                      })}
                    >
                      {r.ikon}
                    </span>
                    <span css={{ flex: 1, minWidth: 0, fontWeight: 600, fontSize: 15 }}>{r.judul}</span>
                  </div>
                  <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, lineHeight: 1.5, margin: '0 0 9px' })}>
                    {r.ket}
                  </p>
                  <span
                    css={(t) => ({
                      display: 'inline-block',
                      fontWeight: 800,
                      fontSize: 15,
                      fontVariantNumeric: 'tabular-nums',
                      color: t.colors.goldDeep,
                      background: t.colors.goldSoft,
                      border: `1px solid ${t.colors.border}`,
                      borderRadius: 999,
                      padding: '4px 12px',
                    })}
                  >
                    {r.jam}
                  </span>
                </div>
              ));
            })()}
          </Card>
        </>
      )}
    </Page>
  );
}

function menitDariJamHariIni(list) {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes()}`;
}
