/** @jsxImportSource @emotion/react */
// TesBacaPage — Tes Baca Al-Qur'an dengan mikrofon (Gelombang 6, item 4).
// EKSPERIMENTAL: pengenalan suara memakai Web Speech API peramban
// (window.SpeechRecognition / webkitSpeechRecognition, lang ar-SA).
// Izin mikrofon HANYA diminta saat tombol Rekam ditekan (recognition.start()
// dipanggil dari handler klik, tidak pernah otomatis). Perbandingan
// transkrip vs ayat murni di domain (bandingBaca.js); teks ayat selalu
// lewat data layer (QuranRepositoryImpl), halaman tidak fetch mentah.
// Hasil hanya di state sesi halaman ini (tidak disimpan permanen).
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaRedo,
  FaArrowRight,
  FaExclamationTriangle,
  FaBookOpen,
  FaTrophy,
  FaClipboardCheck,
} from 'react-icons/fa';
import { RECITER_ALAFASY } from '../../data/quranApi.js';
import { useChapters } from '../hooks/useChapters.js';
import { useSurah } from '../hooks/useSurah.js';
import { bandingkanAyat } from '../../domain/usecases/bandingBaca.js';
import {
  Page,
  PageHero,
  Card,
  GoldCard,
  SectionTitle,
  PrimaryButton,
  GhostButton,
  Field,
  SelectInput,
  TextInput,
  ErrorBox,
  LoadingBox,
  Spinner,
} from '../components/common.jsx';
import StateKosong from '../components/StateKosong.jsx';

const TEKS_PERINGATAN =
  'Fitur eksperimental — ketepatan tergantung perangkat, mikrofon & koneksi; hasil terbaik di Chrome Android; ini BUKAN penilaian tajwid resmi.';

/**
 * Peta pesan jujur per jenis galat Web Speech API (event.error):
 * - 'not-allowed' / 'service-not-allowed' → izin mikrofon ditolak pengguna/peramban.
 * - 'no-speech' → tidak ada suara terdeteksi sampai batas waktu.
 * - 'audio-capture' → tidak ada mikrofon yang bisa dipakai di perangkat.
 * - 'network' → layanan pengenalan suara (di server peramban) tak terjangkau.
 * - 'aborted' → perekaman dibatalkan (pengguna / sistem).
 * - 'language-not-supported' → ar-SA tidak didukung pengenal suara peramban.
 * - selain itu → pesan umum + kode galat apa adanya (tetap jujur, tidak crash).
 */
function pesanGalatASR(kode) {
  switch (kode) {
    case 'not-allowed':
    case 'service-not-allowed':
      return 'Izin mikrofon ditolak. Izinkan akses mikrofon untuk situs ini di pengaturan peramban, lalu coba lagi.';
    case 'no-speech':
      return 'Tidak ada suara yang terdengar. Dekatkan mikrofon, baca ayatnya dengan jelas, lalu coba lagi.';
    case 'audio-capture':
      return 'Mikrofon tidak ditemukan di perangkat ini. Periksa mikrofon Anda, lalu coba lagi.';
    case 'network':
      return 'Layanan pengenalan suara butuh koneksi internet dan sedang tidak terjangkau. Periksa koneksi Anda, lalu coba lagi.';
    case 'aborted':
      return 'Perekaman dibatalkan sebelum selesai. Ketuk Rekam untuk mencoba lagi.';
    case 'language-not-supported':
      return 'Bahasa Arab tidak didukung pengenal suara peramban ini. Coba gunakan Chrome di Android.';
    default:
      return `Pengenalan suara gagal (${kode || 'tidak diketahui'}). Coba lagi di tempat yang lebih tenang.`;
  }
}

const denyut = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
`;

const IkonDenyut = styled.span`
  display: inline-flex;
  animation: ${denyut} 1.1s ease-in-out infinite;
`;

const Peringatan = styled.p`
  display: flex;
  gap: 10px;
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.judul};
  svg {
    flex-shrink: 0;
    margin-top: 4px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
`;

const GridRentang = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const InputAngka = styled(TextInput)`
  min-height: 52px;
  text-align: center;
  font-weight: 700;
`;

const InfoKecil = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
`;

const LabelAyat = styled.p`
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  margin-bottom: 10px;
`;

const TeksArabBesar = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 32px;
  line-height: 2;
  color: ${({ theme }) => theme.colors.teksArab};
  text-align: right;
  margin-bottom: 16px;
`;

const KataHasil = styled.span`
  color: ${({ theme, benar }) => (benar ? theme.colors.primary : theme.colors.goldDeep)};
  background: ${({ theme, benar }) => (benar ? theme.colors.primarySoft : theme.colors.goldSoft)};
  font-weight: ${({ benar }) => (benar ? 400 : 700)};
  border-radius: 6px;
  padding: 0 5px;
`;

const BarisSkor = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
  .angka {
    font-size: 26px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
  }
  .label {
    font-size: 13.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.muted};
  }
  svg {
    color: ${({ theme }) => theme.colors.goldDeep};
    font-size: 22px;
  }
`;

const KotakTranskrip = styled.div`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding: 10px 14px;
  margin-bottom: 14px;
  .label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 4px;
  }
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 20px;
    line-height: 1.9;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const BarisTombol = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 6px;
`;

export default function TesBacaPage() {
  // Deteksi dukungan SEKALI di render: tanpa API ini tidak ada kontrol
  // rekam sama sekali (lihat cabang StateKosong di bawah).
  const didukung =
    typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  const { loading: muatBab, error: galatBab, chapters } = useChapters();
  const [surahId, setSurahId] = useState(1);
  const [mulaiStr, setMulaiStr] = useState('1');
  const [selesaiStr, setSelesaiStr] = useState('7');
  // Teks ayat lewat hook resmi useSurah → QuranRepositoryImpl.getSurahDetail
  // (reciter default Al-Afasy; audio tidak dipakai fitur ini, tetapi tanda
  // tangan repository memintanya).
  const { loading: muatDetail, error: galatDetail, data: detail } = useSurah(
    surahId,
    RECITER_ALAFASY,
  );
  const [idx, setIdx] = useState(0);
  const [hasilMap, setHasilMap] = useState({});
  const [merekam, setMerekam] = useState(false);
  const [galatASR, setGalatASR] = useState(null);
  const recRef = useRef(null);

  const babTerpilih = useMemo(
    () => chapters.find((c) => c.id === surahId) ?? null,
    [chapters, surahId],
  );
  const jumlahAyat = babTerpilih?.versesCount ?? detail?.surah?.versesCount ?? 0;

  const ayatMulai = Math.min(
    Math.max(1, Number.parseInt(mulaiStr, 10) || 1),
    Math.max(1, jumlahAyat || 1),
  );
  const ayatSelesai = Math.min(
    Math.max(ayatMulai, Number.parseInt(selesaiStr, 10) || ayatMulai),
    Math.max(ayatMulai, jumlahAyat || ayatMulai),
  );

  // Ganti surah/rentang → sesi dimulai ulang dari ayat pertama rentang dan
  // hasil lama dibuang. Dipanggil dari handler (bukan effect) agar state
  // selalu sinkron dengan peristiwa penggunanya.
  const resetSesi = () => {
    setIdx(0);
    setHasilMap({});
    setGalatASR(null);
  };

  // Berhenti merekam bersih saat halaman ditinggalkan.
  useEffect(
    () => () => {
      try {
        recRef.current?.abort();
      } catch {
        /* abaikan: sesi sudah selesai */
      }
      recRef.current = null;
    },
    [],
  );

  const daftarAyat = useMemo(() => {
    if (!detail) return [];
    return detail.ayahs.filter((a) => a.number >= ayatMulai && a.number <= ayatSelesai);
  }, [detail, ayatMulai, ayatSelesai]);

  const idxAman = daftarAyat.length ? Math.min(idx, daftarAyat.length - 1) : 0;
  const ayatAktif = daftarAyat[idxAman] ?? null;
  const hasilAktif = ayatAktif ? hasilMap[ayatAktif.number] ?? null : null;

  const daftarHasil = Object.values(hasilMap);
  const skorSesi = daftarHasil.length
    ? Math.round(daftarHasil.reduce((s, h) => s + h.skor, 0) / daftarHasil.length)
    : null;

  const pilihSurah = (e) => {
    const id = Number(e.target.value);
    const bab = chapters.find((c) => c.id === id);
    setSurahId(id);
    setMulaiStr('1');
    setSelesaiStr(String(Math.min(7, bab?.versesCount ?? 7)));
    resetSesi();
  };

  const ubahMulai = (e) => {
    setMulaiStr(e.target.value);
    resetSesi();
  };

  const ubahSelesai = (e) => {
    setSelesaiStr(e.target.value);
    resetSesi();
  };

  const mulaiRekam = () => {
    if (!ayatAktif || merekam) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    setGalatASR(null);
    let rec;
    try {
      rec = new SR();
    } catch {
      setGalatASR('Pengenalan suara tidak bisa disiapkan di peramban ini. Coba Chrome di Android.');
      return;
    }
    rec.lang = 'ar-SA';
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (event) => {
      const transkrip = event?.results?.[0]?.[0]?.transcript ?? '';
      if (!String(transkrip).trim()) {
        setGalatASR(pesanGalatASR('no-speech'));
        return;
      }
      const hasil = bandingkanAyat(ayatAktif.arabic, transkrip);
      setHasilMap((prev) => ({
        ...prev,
        [ayatAktif.number]: { ...hasil, transkrip: String(transkrip) },
      }));
    };
    rec.onerror = (event) => {
      setGalatASR(pesanGalatASR(event?.error));
    };
    rec.onend = () => {
      setMerekam(false);
    };
    recRef.current = rec;
    try {
      rec.start(); // ← izin mikrofon diminta TEPAT di sini, dari ketukan pengguna.
      setMerekam(true);
    } catch {
      setMerekam(false);
      setGalatASR('Perekaman tidak bisa dimulai. Tunggu sebentar, lalu ketuk Rekam sekali lagi.');
    }
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaMicrophone /> Tes Baca
        </h2>
        <p>
          Bacakan ayat dengan suara, lalu lihat kata mana yang sudah tepat dan mana yang masih
          meleset — langsung di perangkat Anda.
        </p>
      </PageHero>

      <GoldCard role="note" aria-label="Peringatan fitur eksperimental">
        <Peringatan>
          <FaExclamationTriangle aria-hidden="true" />
          <span>{TEKS_PERINGATAN}</span>
        </Peringatan>
      </GoldCard>

      {!didukung ? (
        <Card>
          <StateKosong
            ikon={<FaMicrophoneSlash />}
            judul="Peramban Tidak Mendukung"
            deskripsi="Tes Baca butuh fitur pengenalan suara (Speech Recognition) yang belum tersedia di peramban ini, jadi tombol rekam tidak dapat ditampilkan. Coba buka NurQalam dengan Chrome di Android — hasil terbaik memang di sana. Anda tetap bisa membaca dan mengulang ayat dari halaman surah seperti biasa."
          />
        </Card>
      ) : (
        <>
          <SectionTitle>
            <FaBookOpen /> Pilih Bacaan
          </SectionTitle>
          <Card>
            <Field>
              <label htmlFor="tesbaca-surah">Surah</label>
              {muatBab ? (
                <LoadingBox>
                  <Spinner />
                  Memuat daftar surah…
                </LoadingBox>
              ) : galatBab ? (
                <ErrorBox role="alert">
                  <FaExclamationTriangle aria-hidden="true" /> Gagal memuat daftar surah: {galatBab}
                </ErrorBox>
              ) : (
                <SelectInput
                  id="tesbaca-surah"
                  value={surahId}
                  onChange={pilihSurah}
                  aria-label="Pilih surah untuk dites"
                >
                  {chapters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id}. {c.nameLatin} — {c.versesCount} ayat
                    </option>
                  ))}
                </SelectInput>
              )}
            </Field>
            <GridRentang>
              <Field>
                <label htmlFor="tesbaca-mulai">Ayat Mulai</label>
                <InputAngka
                  id="tesbaca-mulai"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={jumlahAyat || undefined}
                  value={mulaiStr}
                  onChange={ubahMulai}
                  aria-label="Ayat mulai"
                />
              </Field>
              <Field>
                <label htmlFor="tesbaca-selesai">Ayat Selesai</label>
                <InputAngka
                  id="tesbaca-selesai"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={jumlahAyat || undefined}
                  value={selesaiStr}
                  onChange={ubahSelesai}
                  aria-label="Ayat selesai"
                />
              </Field>
            </GridRentang>
            <InfoKecil>
              Rentang berlaku ayat {ayatMulai}–{ayatSelesai}
              {jumlahAyat ? ` dari ${jumlahAyat} ayat surah ini` : ''}. Awali dari surah pendek
              dan ayat yang sudah Anda hafal agar hasilnya terasa adil.
            </InfoKecil>
          </Card>

          {galatDetail && (
            <ErrorBox role="alert" css={{ marginBottom: 14 }}>
              <FaExclamationTriangle aria-hidden="true" /> Gagal memuat ayat: {galatDetail}
            </ErrorBox>
          )}

          {muatDetail ? (
            <LoadingBox>
              <Spinner />
              Memuat teks ayat…
            </LoadingBox>
          ) : ayatAktif ? (
            <>
              <SectionTitle>
                <FaClipboardCheck /> Bacakan Ayat Ini
              </SectionTitle>
              <Card>
                <LabelAyat>
                  {detail?.surah?.nameLatin ?? babTerpilih?.nameLatin ?? 'Surah'} · Ayat{' '}
                  {ayatAktif.number} — {idxAman + 1} dari {daftarAyat.length} ayat terpilih
                </LabelAyat>

                {hasilAktif ? (
                  <TeksArabBesar dir="rtl" lang="ar" aria-label={`Ayat ${ayatAktif.number} dengan penanda hasil`}>
                    {hasilAktif.perKata.map((k, i) => (
                      <span key={`${ayatAktif.number}-${i}`}>
                        <KataHasil benar={k.benar}>{k.kata}</KataHasil>
                        {i < hasilAktif.perKata.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </TeksArabBesar>
                ) : (
                  <TeksArabBesar dir="rtl" lang="ar">
                    {ayatAktif.arabic}
                  </TeksArabBesar>
                )}

                {hasilAktif && (
                  <>
                    <BarisSkor aria-live="polite">
                      <span className="angka">{hasilAktif.skor}%</span>
                      <span className="label">
                        kata terbaca tepat pada ayat ini — hijau berarti tepat, emas berarti
                        masih meleset.
                      </span>
                    </BarisSkor>
                    <KotakTranskrip>
                      <span className="label">Yang terdengar oleh peramban:</span>
                      <span className="arab" dir="rtl" lang="ar">
                        {hasilAktif.transkrip}
                      </span>
                    </KotakTranskrip>
                  </>
                )}

                {galatASR && (
                  <ErrorBox role="alert" css={{ marginBottom: 14 }}>
                    <FaExclamationTriangle aria-hidden="true" /> {galatASR}
                  </ErrorBox>
                )}

                <InfoKecil css={{ marginBottom: 12 }}>
                  Ketuk Rekam lalu bacakan ayat di atas dengan jelas. Izin mikrofon hanya diminta
                  saat tombol ditekan, dan suara diproses oleh layanan pengenalan suara
                  peramban Anda.
                </InfoKecil>

                <BarisTombol>
                  <PrimaryButton
                    type="button"
                    onClick={mulaiRekam}
                    disabled={merekam}
                    aria-label={
                      hasilAktif
                        ? `Rekam ulang bacaan ayat ${ayatAktif.number}`
                        : `Rekam bacaan ayat ${ayatAktif.number}`
                    }
                  >
                    {merekam ? (
                      <>
                        <IkonDenyut aria-hidden="true">
                          <FaMicrophone />
                        </IkonDenyut>{' '}
                        Mendengarkan…
                      </>
                    ) : hasilAktif ? (
                      <>
                        <FaRedo aria-hidden="true" /> Ulangi
                      </>
                    ) : (
                      <>
                        <FaMicrophone aria-hidden="true" /> Rekam
                      </>
                    )}
                  </PrimaryButton>
                  {idxAman < daftarAyat.length - 1 && (
                    <GhostButton
                      type="button"
                      onClick={() => {
                        setGalatASR(null);
                        setIdx(idxAman + 1);
                      }}
                      disabled={merekam}
                      aria-label="Lanjut ke ayat berikutnya"
                    >
                      Lanjut ke Ayat Berikutnya <FaArrowRight aria-hidden="true" />
                    </GhostButton>
                  )}
                </BarisTombol>
                {idxAman === daftarAyat.length - 1 && hasilAktif && (
                  <InfoKecil css={{ marginTop: 12 }}>
                    Ini ayat terakhir pada rentang terpilih. Anda bisa mengulang ayat mana pun
                    dengan mengganti rentang, atau menekan Ulangi untuk mencoba lagi.
                  </InfoKecil>
                )}
              </Card>

              {skorSesi !== null && (
                <Card aria-live="polite">
                  <BarisSkor css={{ marginBottom: 4 }}>
                    <FaTrophy aria-hidden="true" />
                    <span className="angka">{skorSesi}%</span>
                    <span className="label">
                      skor rata-rata sesi ini — {daftarHasil.length} dari {daftarAyat.length} ayat
                      sudah dites.
                    </span>
                  </BarisSkor>
                  <InfoKecil>
                    Skor ini perkiraan kasar dari pengenalan suara, bukan nilai tajwid. Bila ragu,
                    setorkan bacaan Anda ke guru mengaji.
                  </InfoKecil>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <StateKosong
                ikon={<FaBookOpen />}
                judul="Belum Ada Ayat"
                deskripsi="Rentang ayat ini kosong. Periksa kembali ayat mulai dan ayat selesai, lalu coba lagi."
              />
            </Card>
          )}
        </>
      )}
    </Page>
  );
}
