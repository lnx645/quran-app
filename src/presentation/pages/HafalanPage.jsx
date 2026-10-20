/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaBookOpen, FaBrain, FaBullseye, FaCheck, FaChevronLeft, FaEye, FaEyeSlash,
  FaExclamationTriangle, FaInfinity, FaPause, FaPlay, FaSearch, FaTrophy,
} from 'react-icons/fa';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';
import { LocalHafalanRepository } from '../../data/repositories/LocalHafalanRepository.js';
import { useChapters } from '../hooks/useChapters.js';
import { useToast } from '../components/feedback/toastStore.js';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, GhostButton, PrimaryButton,
  ErrorBox, Skeleton, TextInput,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab, SegmenKompakWadah, SegmenKompak } from '../components/SegmentedControl.jsx';
import NomorMedali from '../components/NomorMedali.jsx';

const PREFS_KUNCI = 'noor.hafalan.prefs.v1';

function bacaPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KUNCI);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function simpanPrefs(p) {
  try {
    localStorage.setItem(PREFS_KUNCI, JSON.stringify(p));
  } catch {
    /* abaikan */
  }
}

/* ---------- util kata tersembunyi (deterministik, merata) ---------- */
// Urutan kata diacak secara deterministik (hash posisi) supaya kata yang
// disembunyikan tersebar merata di seluruh ayat, bukan blok di awal/akhir.
function urutanKata(jumlah, biji) {
  return Array.from({ length: jumlah }, (_, i) => i)
    .map((i) => {
      let h = (i + 1) * 2654435761 + biji * 40503;
      h ^= h >>> 13;
      h = Math.imul(h, 0x5bd1e995);
      h ^= h >>> 15;
      return { i, h: h >>> 0 };
    })
    .sort((a, b) => a.h - b.h)
    .map((x) => x.i);
}

function setTersembunyi(ayah, persen) {
  const words = ayah.words?.length ? ayah.words : null;
  const jumlah = words ? words.length : ayah.arabic.split(/\s+/).filter(Boolean).length;
  const n = Math.round((jumlah * Math.min(100, Math.max(0, persen))) / 100);
  return new Set(urutanKata(jumlah, ayah.number).slice(0, n));
}

/* ---------- styled ---------- */

const BarProgres = styled.div`
  height: 10px;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  overflow: hidden;
  .isi {
    height: 100%;
    border-radius: inherit;
    background: ${({ theme }) => theme.gradients.gold};
    transition: width ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
  }
`;

const GridRingkasan = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  text-align: center;
  .angka {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
  }
  .label {
    font-size: 11.5px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.4;
  }
`;

const KontrolBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: flex-end;
  margin-bottom: 14px;
  label:not(.noor-kotak-label) {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 6px;
  }
  input[type='range'] {
    accent-color: ${({ theme }) => theme.colors.primary};
    height: 44px;
  }
  input[type='number'] {
    width: 90px;
  }
`;

const DaftarSurah = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.sm}px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TombolSurah = styled.button`
  display: flex;
  align-items: center;
  gap: 13px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 13px 14px;
  min-height: 64px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.card};
  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }
  .latin {
    display: block;
    font-weight: 700;
    font-size: 15.5px;
    color: ${({ theme }) => theme.colors.text};
  }
  .meta {
    display: block;
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
  }
  .arab {
    margin-left: auto;
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const KartuAyat = styled(Card)`
  border-color: ${({ hafal, theme }) => (hafal ? theme.colors.gold : theme.colors.border)};
  background: ${({ hafal, theme }) => (hafal ? theme.colors.goldSoft : theme.colors.surface)};
`;

const ArabTeks = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 28px;
  line-height: 2.2;
  text-align: right;
  color: ${({ theme }) => theme.colors.teksArab};
`;

const KataSembunyi = styled.span`
  cursor: pointer;
  border-radius: 6px;
  padding: 0 4px;
  user-select: none;
  ${(props) =>
    props.peek
      ? `background: ${props.theme.colors.primarySoft};`
      : `color: transparent; background: ${props.theme.colors.surfaceAlt}; box-shadow: inset 0 -3px 0 ${props.theme.colors.gold}; filter: blur(0.4px); text-shadow: none;`}
`;

const KepalaAyat = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  .nomor {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
  .status {
    margin-left: auto;
    font-size: 12px;
    font-weight: 700;
    color: ${({ hafal, theme }) => (hafal ? theme.colors.success : theme.colors.faint)};
  }
`;

const BarisAksiAyat = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  align-items: center;
`;

// Chip status kecil NON-interaktif untuk bar aksi ayat (mode uji).
const ChipStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 4px 11px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12.5px;
  font-weight: 700;
`;

const PetunjukUji = styled.p`
  text-align: right;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  min-height: 44px;
`;

/* ---------- audio per ayat ---------- */

function useAudioAyat(audioUrl, ayah, ulang) {
  const audioRef = useRef(null);
  const sisaRef = useRef(0);
  const [bermain, setBermain] = useState(false);

  const berhenti = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      a.pause();
    }
    setBermain(false);
  }, []);

  useEffect(() => {
    if (!audioUrl || !ayah?.timing) return undefined;
    const audio = new Audio(audioUrl);
    audio.preload = 'auto';
    audioRef.current = audio;
    const { fromMs, toMs } = ayah.timing;

    const onTime = () => {
      if (audio.currentTime * 1000 >= toMs) {
        if (sisaRef.current > 0) {
          sisaRef.current -= 1;
          audio.currentTime = fromMs / 1000;
          audio.play().catch(() => setBermain(false));
        } else {
          audio.pause();
          setBermain(false);
        }
      }
    };
    const onEnd = () => setBermain(false);
    const onPause = () => {
      // pause dari tombol berhenti ditangani pemanggil; sinkronkan state saja
      if (audio.ended) setBermain(false);
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('pause', onPause);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl, ayah]);

  const putar = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !ayah?.timing) return;
    if (bermain) {
      berhenti();
      return;
    }
    // ulang: 1 → sisa 0; 3 → 2 putaran tambahan; 5 → 4; Infinity → tak terbatas
    sisaRef.current = ulang === Infinity ? Infinity : Math.max(0, ulang - 1);
    audio.currentTime = ayah.timing.fromMs / 1000;
    audio
      .play()
      .then(() => setBermain(true))
      .catch(() => setBermain(false));
  }, [ayah, bermain, berhenti, ulang]);

  // Berhenti bila pilihan ulang berubah di tengah putaran agar hitungan konsisten
  useEffect(() => {
    if (!bermain) return;
    sisaRef.current = ulang === Infinity ? Infinity : Math.max(0, ulang - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ulang]);

  return { bermain, putar, adaTiming: Boolean(ayah?.timing && audioUrl) };
}

/* ---------- satu ayat ---------- */

function AyatHafalan({ ayah, audioUrl, mode, persen, ulang, hafal, onToggleHafal }) {
  const [peek, setPeek] = useState(() => new Set());
  const [terbuka, setTerbuka] = useState(false);
  const audio = useAudioAyat(audioUrl, ayah, ulang);

  // Reset intip/buka saat mode atau persen berubah
  useEffect(() => {
    setPeek(new Set());
    setTerbuka(false);
  }, [mode, persen, ayah.key]);

  const sembunyi = useMemo(
    () => (mode === 'bertahap' ? setTersembunyi(ayah, persen) : new Set()),
    [ayah, mode, persen],
  );

  const togglePeek = (idx) => {
    setPeek((prev) => {
      const baru = new Set(prev);
      if (baru.has(idx)) baru.delete(idx);
      else baru.add(idx);
      return baru;
    });
  };

  const kataList = ayah.words?.length
    ? ayah.words.map((w) => w.arabic)
    : ayah.arabic.split(/\s+/).filter(Boolean);

  const renderArab = () => {
    if (mode === 'uji' && !terbuka) {
      return (
        <PetunjukUji as="span">
          <FaEyeSlash aria-hidden="true" /> Teks disembunyikan — ketuk kartu untuk membuka
        </PetunjukUji>
      );
    }
    if (mode === 'bertahap') {
      return (
        <ArabTeks dir="rtl" lang="ar">
          {kataList.map((kata, i) => {
            const disembunyikan = sembunyi.has(i);
            if (!disembunyikan) return <span key={i}>{kata} </span>;
            const intip = peek.has(i);
            return (
              <KataSembunyi
                key={i}
                peek={intip}
                role="button"
                tabIndex={0}
                aria-label={intip ? 'Kata terungkap, ketuk untuk menyembunyikan lagi' : 'Kata tersembunyi, ketuk untuk mengintip'}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePeek(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePeek(i);
                  }
                }}
              >
                {intip ? kata : 'ــــــــ'}
              </KataSembunyi>
            );
          })}
        </ArabTeks>
      );
    }
    return (
      <ArabTeks dir="rtl" lang="ar">
        {ayah.arabic}
      </ArabTeks>
    );
  };

  return (
    <KartuAyat
      hafal={hafal}
      onClick={mode === 'uji' ? () => setTerbuka((v) => !v) : undefined}
      role={mode === 'uji' ? 'button' : undefined}
      tabIndex={mode === 'uji' ? 0 : undefined}
      aria-label={mode === 'uji' ? `Ayat ${ayah.number}, ketuk untuk ${terbuka ? 'menyembunyikan' : 'membuka'} teks` : undefined}
      onKeyDown={
        mode === 'uji'
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setTerbuka((v) => !v);
              }
            }
          : undefined
      }
    >
      <KepalaAyat hafal={hafal}>
        <span className="nomor">Ayat {ayah.number}</span>
        <span className="status">{hafal ? 'Sudah hafal' : 'Belum hafal'}</span>
      </KepalaAyat>

      {renderArab()}

      {mode !== 'uji' || terbuka ? (
        <p css={(t) => ({ fontSize: 13.5, lineHeight: 1.6, color: t.colors.teksTerjemah, marginTop: 10 })}>
          {ayah.translation}
        </p>
      ) : null}

      <BarisAksiAyat onClick={(e) => e.stopPropagation()}>
        {audio.adaTiming && (
          <GhostButton
            type="button"
            onClick={audio.putar}
            aria-label={`${audio.bermain ? 'Berhenti memutar' : 'Putar'} audio ayat ${ayah.number}`}
          >
            {audio.bermain ? <FaPause /> : <FaPlay />} {audio.bermain ? 'Berhenti' : 'Putar Ayat'}
          </GhostButton>
        )}
        {hafal ? (
          <PrimaryButton
            type="button"
            onClick={() => onToggleHafal(ayah)}
            aria-pressed={true}
            aria-label={`Batalkan tanda hafal ayat ${ayah.number}`}
          >
            <FaCheck /> Sudah Hafal
          </PrimaryButton>
        ) : (
          <GhostButton
            type="button"
            onClick={() => onToggleHafal(ayah)}
            aria-pressed={false}
            aria-label={`Tandai sudah hafal ayat ${ayah.number}`}
          >
            <FaCheck /> Sudah Hafal
          </GhostButton>
        )}
        {mode === 'uji' && (
          <ChipStatus>
            {terbuka ? <FaEye aria-hidden="true" /> : <FaEyeSlash aria-hidden="true" />}{' '}
            {terbuka ? 'Terbuka' : 'Tertutup'}
          </ChipStatus>
        )}
      </BarisAksiAyat>
    </KartuAyat>
  );
}

/* ---------- halaman ---------- */

const OPSI_ULANG = [
  { nilai: '1', label: '1×' },
  { nilai: '3', label: '3×' },
  { nilai: '5', label: '5×' },
  { nilai: 'inf', label: '∞' },
];

export default function HafalanPage() {
  const toast = useToast();
  const { loading: muatSurah, error: errorSurah, chapters } = useChapters();
  const prefsAwal = useMemo(() => bacaPrefs(), []);
  const [surahId, setSurahId] = useState(prefsAwal.surahId ?? null);
  const [cari, setCari] = useState('');
  const [mode, setMode] = useState(prefsAwal.mode ?? 'penuh');
  const [persen, setPersen] = useState(prefsAwal.persen ?? 50);
  const [ulangStr, setUlangStr] = useState(prefsAwal.ulang ?? '1');
  const [detail, setDetail] = useState(null);
  const [muatDetail, setMuatDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState(null);
  const [stateHafal, setStateHafal] = useState(() => LocalHafalanRepository.muat());

  const ulang = ulangStr === 'inf' ? Infinity : Number(ulangStr);

  // Simpan preferensi terakhir
  useEffect(() => {
    simpanPrefs({ surahId, mode, persen, ulang: ulangStr });
  }, [surahId, mode, persen, ulangStr]);

  // Muat detail surah terpilih
  useEffect(() => {
    if (!surahId) {
      setDetail(null);
      return undefined;
    }
    let batal = false;
    setMuatDetail(true);
    setErrorDetail(null);
    QuranRepositoryImpl.getSurahDetail(surahId)
      .then((d) => {
        if (!batal) {
          setDetail(d);
          setMuatDetail(false);
        }
      })
      .catch((err) => {
        if (!batal) {
          setErrorDetail(err.message);
          setMuatDetail(false);
        }
      });
    return () => {
      batal = true;
    };
  }, [surahId]);

  const daftarTersaring = useMemo(() => {
    const q = cari.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.filter(
      (s) =>
        s.nameLatin.toLowerCase().includes(q) ||
        s.translationId.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        String(s.id) === q,
    );
  }, [chapters, cari]);

  const progres = detail
    ? LocalHafalanRepository.progresSurah(detail.surah.id, detail.surah.versesCount)
    : { hafal: 0, total: 0, persen: 0 };
  // Hitung progres dari state reaktif agar UI langsung berubah
  const hafalSurahIni = detail
    ? (stateHafal.hafal[String(detail.surah.id)] ?? []).length
    : 0;
  const persenSurahIni = detail?.surah.versesCount
    ? Math.round((hafalSurahIni / detail.surah.versesCount) * 100)
    : progres.persen;
  const { hariIni, target } = useMemo(() => {
    const hitungan = LocalHafalanRepository.hitunganHariIni();
    return { hariIni: hitungan.hariIni, target: stateHafal.targetPerHari };
    // stateHafal berubah → hitung ulang
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateHafal]);
  const totalSemua = Object.values(stateHafal.hafal).reduce((a, arr) => a + arr.length, 0);

  const toggleHafal = (ayah) => {
    if (!detail) return;
    const sid = detail.surah.id;
    const sudah = (stateHafal.hafal[String(sid)] ?? []).includes(ayah.number);
    const baru = sudah
      ? LocalHafalanRepository.batalHafal(sid, ayah.number)
      : LocalHafalanRepository.tandaiHafal(sid, ayah.number);
    setStateHafal(baru);
    if (!sudah) toast.sukses(`Ayat ${ayah.number} ditandai hafal. Barakallahu fiik!`);
  };

  const ubahTarget = (nilai) => {
    const baru = LocalHafalanRepository.setTarget(nilai);
    setStateHafal(baru);
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaBrain /> Mode Hafalan (Tahfidz)
        </h2>
        <p>Sembunyikan teks secara bertahap, dengarkan per ayat berulang, lalu uji hafalanmu.</p>
      </PageHero>

      <GoldCard>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaBullseye /> Progres Hafalan
        </SectionTitle>
        <GridRingkasan>
          <div>
            <div className="angka">{totalSemua}</div>
            <div className="label">
              <FaTrophy aria-hidden="true" /> Total ayat terhafal
            </div>
          </div>
          <div>
            <div className="angka">
              {hariIni}/{target}
            </div>
            <div className="label">Capaian hari ini / target harian</div>
          </div>
          <div>
            <div className="angka">{detail ? `${persenSurahIni}%` : '—'}</div>
            <div className="label">{detail ? `Progres ${detail.surah.nameLatin}` : 'Pilih surah dulu'}</div>
          </div>
        </GridRingkasan>
        {detail && (
          <div css={{ marginTop: 14 }}>
            <BarProgres role="progressbar" aria-valuenow={persenSurahIni} aria-valuemin={0} aria-valuemax={100} aria-label={`Progres hafalan ${detail.surah.nameLatin}`}>
              <div className="isi" style={{ width: `${persenSurahIni}%` }} />
            </BarProgres>
            <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, marginTop: 6 })}>
              {hafalSurahIni} dari {detail.surah.versesCount} ayat sudah hafal di surah ini.
            </p>
          </div>
        )}
        <div css={{ marginTop: 14, display: 'flex', alignItems: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
          <div>
            <label htmlFor="target-hafalan" css={(t) => ({ display: 'block', fontSize: 12.5, fontWeight: 600, color: t.colors.muted, marginBottom: 6 })}>
              Target ayat per hari
            </label>
            <TextInput
              id="target-hafalan"
              type="number"
              min={1}
              max={999}
              value={target}
              onChange={(e) => ubahTarget(e.target.value)}
              aria-label="Target ayat hafalan per hari"
              css={{ width: 110 }}
            />
          </div>
          <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, paddingBottom: 12 })}>
            Sesuaikan target harianmu — konsistensi lebih utama dari banyaknya.
          </p>
        </div>
      </GoldCard>

      {!surahId ? (
        <>
          <SectionTitle>
            <FaBookOpen /> Pilih Surah untuk Dihafal
          </SectionTitle>
          <div css={{ position: 'relative', marginBottom: 14 }}>
            <FaSearch aria-hidden="true" css={(t) => ({ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: t.colors.faint })} />
            <TextInput
              type="search"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari surah — mis. Al-Mulk, Ya-Sin…"
              aria-label="Cari surah untuk dihafal"
              css={{ paddingLeft: 42 }}
            />
          </div>
          {muatSurah ? (
            <div aria-busy="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} h={64} radius={16} css={{ marginBottom: 10 }} />
              ))}
            </div>
          ) : errorSurah ? (
            <ErrorBox>
              <FaExclamationTriangle /> Gagal memuat daftar surah: {errorSurah}
            </ErrorBox>
          ) : (
            <DaftarSurah>
              {daftarTersaring.map((s) => {
                const hafalDiSurah = (stateHafal.hafal[String(s.id)] ?? []).length;
                return (
                  <TombolSurah key={s.id} type="button" onClick={() => setSurahId(s.id)} aria-label={`Pilih surah ${s.nameLatin} untuk dihafal`}>
                    <NomorMedali nomor={s.id} ukuran={44} />
                    <span>
                      <span className="latin">{s.nameLatin}</span>
                      <span className="meta">
                        {s.versesCount} ayat{hafalDiSurah > 0 ? ` · ${hafalDiSurah} terhafal` : ''}
                      </span>
                    </span>
                    <span className="arab" dir="rtl" lang="ar">
                      {s.nameArabic}
                    </span>
                  </TombolSurah>
                );
              })}
            </DaftarSurah>
          )}
        </>
      ) : (
        <>
          <BarisAksiAyat css={{ marginBottom: 14 }}>
            <GhostButton type="button" onClick={() => setSurahId(null)} aria-label="Kembali ke daftar surah">
              <FaChevronLeft /> Ganti Surah
            </GhostButton>
            {detail && (
              <span css={(t) => ({ fontFamily: t.fonts.display, fontSize: 17, fontWeight: 700, color: t.colors.judul })}>
                {detail.surah.nameLatin} · {detail.surah.versesCount} ayat
              </span>
            )}
          </BarisAksiAyat>

          <div role="tablist" aria-label="Mode tampilan hafalan">
            <SegmenWadah>
              <SegmenTab aktif={mode === 'penuh'} onClick={() => setMode('penuh')}>
                Penuh
              </SegmenTab>
              <SegmenTab aktif={mode === 'bertahap'} onClick={() => setMode('bertahap')}>
                Bertahap
              </SegmenTab>
              <SegmenTab aktif={mode === 'uji'} onClick={() => setMode('uji')}>
                Uji
              </SegmenTab>
            </SegmenWadah>
          </div>

          <KontrolBar>
            {mode === 'bertahap' && (
              <div css={{ flex: '1 1 220px' }}>
                <label htmlFor="slider-sembunyi">
                  Kata disembunyikan: {persen}%
                </label>
                <input
                  id="slider-sembunyi"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={persen}
                  onChange={(e) => setPersen(Number(e.target.value))}
                  aria-label="Persentase kata yang disembunyikan"
                  css={{ width: '100%' }}
                />
              </div>
            )}
            <div>
              <span
                id="label-ulang"
                css={(t) => ({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: t.colors.text,
                  marginBottom: 8,
                })}
              >
                <FaInfinity aria-hidden="true" /> Ulang audio per ayat
              </span>
              <SegmenKompakWadah role="group" aria-labelledby="label-ulang">
                {OPSI_ULANG.map((o) => (
                  <SegmenKompak
                    key={o.nilai}
                    type="button"
                    aktif={ulangStr === o.nilai}
                    aria-pressed={ulangStr === o.nilai}
                    onClick={() => setUlangStr(o.nilai)}
                  >
                    {o.label}
                  </SegmenKompak>
                ))}
              </SegmenKompakWadah>
            </div>
          </KontrolBar>

          {mode === 'bertahap' && (
            <p css={(t) => ({ fontSize: 13, color: t.colors.muted, marginBottom: 12 })}>
              Ketuk kata yang tersembunyi untuk mengintipnya. Naikkan persentase seiring hafalanmu menguat.
            </p>
          )}
          {mode === 'uji' && (
            <p css={(t) => ({ fontSize: 13, color: t.colors.muted, marginBottom: 12 })}>
              Mode uji: seluruh teks disembunyikan. Ucapkan hafalanmu, lalu ketuk kartu ayat untuk memeriksa.
            </p>
          )}

          {muatDetail ? (
            <div aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} h={150} radius={16} css={{ marginBottom: 12 }} />
              ))}
            </div>
          ) : errorDetail ? (
            <ErrorBox>
              <FaExclamationTriangle /> Gagal memuat surah: {errorDetail}
            </ErrorBox>
          ) : detail ? (
            detail.ayahs.map((ayah) => (
              <AyatHafalan
                key={ayah.key}
                ayah={ayah}
                audioUrl={detail.audioUrl}
                mode={mode}
                persen={persen}
                ulang={ulang}
                hafal={(stateHafal.hafal[String(detail.surah.id)] ?? []).includes(ayah.number)}
                onToggleHafal={toggleHafal}
              />
            ))
          ) : null}
        </>
      )}
    </Page>
  );
}
