/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch, FaSearchMinus, FaExclamationTriangle, FaBookOpen, FaRedo,
  FaChevronRight, FaQuran, FaThLarge, FaListUl, FaPrayingHands, FaBook,
  FaCalendarAlt, FaStar, FaBaby, FaGraduationCap, FaHistory, FaTrashAlt,
} from 'react-icons/fa';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';
import {
  bangunEntriLokal, entriSurahDariChapters, cariLokal,
} from '../../domain/usecases/indeksPencarian.js';
import StateKosong from '../components/StateKosong.jsx';
import {
  Page,
  PageTitle,
  PageSubtitle,
  Card,
  TextInput,
  PrimaryButton,
  ErrorBox,
  LoadingBox,
  Spinner,
} from '../components/common.jsx';

/**
 * Pencarian global NurQalam (rute /cari) — satu pintu untuk seluruh ekosistem:
 * - Hasil LOKAL (indeks domain indeksPencarian): surah, fitur, topik ayat,
 *   doa, hadits, kisah, peristiwa, Asmaul Husna, nama bayi, iqro. Live saat
 *   mengetik, berkelompok per kategori + chip filter.
 * - Hasil AYAT (Quran.com /search, terjemahan Kemenag): jalan saat
 *   submit/Enter. Ketuk ayat → /surah/{id}?ayat={n}.
 * Riwayat pencarian terakhir disimpan lokal (maks 6).
 */

const SERING_DICARI = ['yasin', 'ayat kursi', 'zakat', 'kiblat', 'doa sebelum makan', 'waris', 'nama bayi'];
const KUNCI_RIWAYAT = 'noor.cari.terakhir.v1';
const MAKS_RIWAYAT = 6;

const IKON_KATEGORI = {
  Surah: <FaQuran aria-hidden="true" />,
  Fitur: <FaThLarge aria-hidden="true" />,
  'Topik Ayat': <FaListUl aria-hidden="true" />,
  Doa: <FaPrayingHands aria-hidden="true" />,
  Hadits: <FaBook aria-hidden="true" />,
  Kisah: <FaBookOpen aria-hidden="true" />,
  Peristiwa: <FaCalendarAlt aria-hidden="true" />,
  'Asmaul Husna': <FaStar aria-hidden="true" />,
  'Nama Bayi': <FaBaby aria-hidden="true" />,
  Iqro: <FaGraduationCap aria-hidden="true" />,
};

const Formulir = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  align-items: stretch;
`;

// Kolom cari dengan ikon DI DALAM kolom (pola HisnulMuslimPage).
const BarisCari = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  > svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.goldDeep};
    font-size: 16px;
    pointer-events: none;
  }
  input {
    padding-left: 43px;
    height: 100%;
  }
`;

const TombolCari = styled(PrimaryButton)`
  min-width: 56px;
  flex-shrink: 0;
`;

// Rel chip filter (pola HisnulMuslimPage): geser horizontal, ujung memudar.
const BarisChip = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
  scroll-padding-right: 16px;
  margin: 8px 0 2px;
  scrollbar-width: none;
  -webkit-mask-image: linear-gradient(90deg, #000 88%, transparent 99%);
  mask-image: linear-gradient(90deg, #000 88%, transparent 99%);
  &::after {
    content: '';
    flex: 0 0 16px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BarisChipBungkus = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button`
  flex-shrink: 0;
  min-height: 44px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  border: 1.5px solid ${({ theme, aktif }) =>
    aktif ? theme.colors.gold : theme.colors.border};
  background: ${({ theme, aktif }) =>
    aktif ? theme.gradients.gold : theme.colors.surface};
  color: ${({ theme, aktif }) =>
    aktif ? theme.colors.primaryDeep : theme.colors.text};
  font-size: 13.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  box-shadow: ${({ theme, aktif }) => (aktif ? theme.shadows.gold : 'none')};
  transition: background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: scale(0.97);
  }
  svg {
    font-size: 14px;
  }
`;

const KepalaGrup = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  margin: 20px 0 8px;
  svg {
    color: ${({ theme }) => theme.colors.gold};
    font-size: 14px;
  }
  .jumlah {
    margin-left: auto;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: none;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const KartuGrup = styled(Card)`
  padding-top: 6px;
  padding-bottom: 6px;
`;

const BarisHasil = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 9px 2px;
  background: transparent;
  border: none;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  text-align: left;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  .ikon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.goldSoft};
    color: ${({ theme }) => theme.colors.goldDeep};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 15px;
  }
  .teks {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .judul {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sub {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .panah {
    flex-shrink: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const MetaHasil = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 10px 0 12px;
`;

const KepalaRiwayat = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0 10px;
  .label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12.5px;
    font-weight: 800;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
    svg {
      color: ${({ theme }) => theme.colors.gold};
    }
  }
`;

const TombolHapusRiwayat = styled.button`
  margin-left: auto;
  min-height: 44px;
  padding: 0 8px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const KartuHasil = styled(Card)`
  cursor: pointer;
  text-align: left;
  width: 100%;
  display: block;
  transition: transform 0.15s ease;
  &:active {
    transform: scale(0.99);
  }
  .ref {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 7px;
    svg {
      color: ${({ theme }) => theme.colors.gold};
    }
  }
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 23px;
    line-height: 2.05;
    text-align: right;
    direction: rtl;
    color: ${({ theme }) => theme.colors.teksArab};
    margin-bottom: 8px;
  }
  .terjemah {
    font-size: 14px;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.teksTerjemah};
  }
  .terjemah mark {
    background: ${({ theme }) => theme.colors.goldSoft};
    color: inherit;
    border-radius: 4px;
    padding: 0 2px;
  }
`;

/** Sorot kata yang cocok di terjemahan dengan <mark>. */
function sorotKata(terjemahan, kataKunci) {
  const kata = String(kataKunci ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!kata.length) return terjemahan;
  const pola = new RegExp(`(${kata.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const bagian = terjemahan.split(pola);
  return bagian.map((b, i) =>
    i % 2 === 1 ? <mark key={i}>{b}</mark> : <span key={i}>{b}</span>
  );
}

function muatRiwayat() {
  try {
    const mentah = localStorage.getItem(KUNCI_RIWAYAT);
    const daftar = mentah ? JSON.parse(mentah) : [];
    return Array.isArray(daftar) ? daftar.filter((x) => typeof x === 'string').slice(0, MAKS_RIWAYAT) : [];
  } catch {
    return [];
  }
}

export default function CariPage() {
  const navigate = useNavigate();
  const [kata, setKata] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [entriSurah, setEntriSurah] = useState([]);
  const [riwayat, setRiwayat] = useState(muatRiwayat);

  // Pencarian ayat (API) — status terpisah dari hasil lokal.
  const [statusAyat, setStatusAyat] = useState('idle'); // idle | loading | gagal | selesai
  const [hasilAyat, setHasilAyat] = useState([]);
  const [totalAyat, setTotalAyat] = useState(0);
  const [pesanGalatAyat, setPesanGalatAyat] = useState('');
  const [kataAyat, setKataAyat] = useState('');

  const entriLokal = useMemo(() => bangunEntriLokal(), []);
  const semuaEntri = useMemo(
    () => [...entriLokal, ...entriSurah],
    [entriLokal, entriSurah],
  );

  // Chapters dimuat asinkron; gagal pun indeks lokal tetap berfungsi.
  useEffect(() => {
    let batal = false;
    QuranRepositoryImpl.getChapters()
      .then((chapters) => {
        if (!batal) setEntriSurah(entriSurahDariChapters(chapters));
      })
      .catch(() => {
        /* toleran gagal: pencarian lokal tetap jalan tanpa entri surah */
      });
    return () => {
      batal = true;
    };
  }, []);

  const queryAktif = kata.trim();
  const hasilLokal = useMemo(
    () => (queryAktif ? cariLokal(semuaEntri, queryAktif) : { kelompok: [], totalSemua: 0 }),
    [semuaEntri, queryAktif],
  );
  const daftarKategori = useMemo(
    () => hasilLokal.kelompok.map((k) => k.kategori),
    [hasilLokal],
  );
  const filterAktif = daftarKategori.includes(filterKategori) ? filterKategori : 'Semua';
  const kelompokTampil =
    filterAktif === 'Semua'
      ? hasilLokal.kelompok
      : hasilLokal.kelompok.filter((k) => k.kategori === filterAktif);

  const simpanRiwayat = useCallback((query) => {
    const bersih = String(query ?? '').trim();
    if (!bersih) return;
    setRiwayat((lama) => {
      const baru = [
        bersih,
        ...lama.filter((x) => x.toLowerCase() !== bersih.toLowerCase()),
      ].slice(0, MAKS_RIWAYAT);
      try {
        localStorage.setItem(KUNCI_RIWAYAT, JSON.stringify(baru));
      } catch {
        /* penyimpanan tak tersedia — riwayat sesi ini saja */
      }
      return baru;
    });
  }, []);

  const hapusRiwayat = useCallback(() => {
    setRiwayat([]);
    try {
      localStorage.removeItem(KUNCI_RIWAYAT);
    } catch {
      /* abaikan */
    }
  }, []);

  const cariAyat = useCallback((kataKunci) => {
    const bersih = String(kataKunci ?? '').trim();
    if (!bersih) return;
    setKataAyat(bersih);
    setStatusAyat('loading');
    setPesanGalatAyat('');
    QuranRepositoryImpl.searchQuran(bersih)
      .then((d) => {
        setHasilAyat(d.hasil);
        setTotalAyat(d.total);
        setStatusAyat('selesai');
      })
      .catch((err) => {
        setPesanGalatAyat(err?.message ?? 'gagal');
        setStatusAyat('gagal');
      });
  }, []);

  const kirim = (e) => {
    e.preventDefault();
    if (!queryAktif) return;
    simpanRiwayat(queryAktif);
    cariAyat(queryAktif);
  };

  const pilihSaran = (s) => {
    setKata(s);
    cariAyat(s);
  };

  const bukaHasil = (entri) => {
    simpanRiwayat(queryAktif || kataAyat);
    navigate(entri.tujuan);
  };

  const tanpaHasilSamaSekali =
    statusAyat === 'selesai' && hasilAyat.length === 0 && hasilLokal.kelompok.length === 0;

  return (
    <Page>
      <PageTitle>
        <FaSearch /> Cari
      </PageTitle>
      <PageSubtitle>Cari apa pun di NurQalam — surah, ayat, doa, fitur, dan lainnya.</PageSubtitle>

      <Formulir onSubmit={kirim} role="search">
        <BarisCari>
          <FaSearch aria-hidden="true" />
          <TextInput
            value={kata}
            onChange={(e) => setKata(e.target.value)}
            placeholder="Cari surah, doa, fitur, topik…"
            aria-label="Kata kunci pencarian"
            enterKeyHint="search"
            autoComplete="off"
            autoFocus
          />
        </BarisCari>
        <TombolCari type="submit" aria-label="Cari ayat" disabled={statusAyat === 'loading'}>
          <FaSearch aria-hidden="true" />
        </TombolCari>
      </Formulir>

      {/* ---------- Hasil lokal (live, berkelompok) ---------- */}
      {queryAktif && hasilLokal.kelompok.length > 0 && (
        <>
          <BarisChip role="group" aria-label="Filter kategori hasil">
            <Chip
              type="button"
              aktif={filterAktif === 'Semua'}
              aria-pressed={filterAktif === 'Semua'}
              onClick={() => setFilterKategori('Semua')}
            >
              Semua
            </Chip>
            {daftarKategori.map((k) => (
              <Chip
                key={k}
                type="button"
                aktif={filterAktif === k}
                aria-pressed={filterAktif === k}
                onClick={() => setFilterKategori(k)}
              >
                {IKON_KATEGORI[k]} {k}
              </Chip>
            ))}
          </BarisChip>

          {kelompokTampil.map((grup) => (
            <section key={grup.kategori} aria-label={`Hasil kategori ${grup.kategori}`}>
              <KepalaGrup>
                {IKON_KATEGORI[grup.kategori]} {grup.kategori}
                <span className="jumlah">
                  {grup.total} hasil{grup.total > grup.entri.length ? ` • tampil ${grup.entri.length}` : ''}
                </span>
              </KepalaGrup>
              <KartuGrup>
                {grup.entri.map((e) => (
                  <BarisHasil
                    key={e.id}
                    type="button"
                    onClick={() => bukaHasil(e)}
                    aria-label={`Buka ${e.judul}`}
                  >
                    <span className="ikon" aria-hidden="true">
                      {IKON_KATEGORI[e.kategori]}
                    </span>
                    <span className="teks">
                      <span className="judul">{e.judul}</span>
                      <span className="sub">{e.sub}</span>
                    </span>
                    <FaChevronRight className="panah" aria-hidden="true" />
                  </BarisHasil>
                ))}
              </KartuGrup>
            </section>
          ))}
        </>
      )}

      {queryAktif && hasilLokal.kelompok.length === 0 && statusAyat !== 'selesai' && (
        <MetaHasil>
          Tidak ada hasil lokal untuk “{queryAktif}” — tekan tombol Cari untuk mencari di ayat
          Al-Qur’an.
        </MetaHasil>
      )}

      {/* ---------- Hasil ayat (submit/Enter) ---------- */}
      {statusAyat !== 'idle' && (
        <section aria-label="Hasil pencarian ayat">
          <KepalaGrup>
            <FaBookOpen aria-hidden="true" /> Ayat Al-Qur’an
          </KepalaGrup>

          {statusAyat === 'loading' && (
            <LoadingBox>
              <Spinner />
              Mencari ayat…
            </LoadingBox>
          )}

          {statusAyat === 'gagal' && (
            <ErrorBox role="alert">
              <FaExclamationTriangle /> Gagal mencari ayat: {pesanGalatAyat}. Periksa koneksi
              internet.
              <button
                type="button"
                css={(t) => ({
                  marginInlineStart: 6,
                  textDecoration: 'underline',
                  fontWeight: 800,
                  color: t.colors.text,
                })}
                onClick={() => cariAyat(kataAyat)}
                aria-label="Coba cari ayat lagi"
              >
                <FaRedo aria-hidden="true" /> Coba lagi
              </button>
            </ErrorBox>
          )}

          {statusAyat === 'selesai' && hasilAyat.length > 0 && (
            <>
              <MetaHasil>
                {hasilAyat.length} dari {totalAyat} ayat untuk “{kataAyat}”
              </MetaHasil>
              {hasilAyat.map((h) => (
                <KartuHasil
                  as="button"
                  type="button"
                  key={h.verseKey}
                  onClick={() => {
                    simpanRiwayat(kataAyat);
                    navigate(`/surah/${h.surahId}?ayat=${h.nomorAyat}`);
                  }}
                  aria-label={`Buka surah ${h.surahId} ayat ${h.nomorAyat}`}
                >
                  <div className="ref">
                    <FaBookOpen aria-hidden="true" /> QS {h.surahId} : Ayat {h.nomorAyat}
                  </div>
                  <p className="arab" lang="ar">{h.teksArab}</p>
                  <p className="terjemah">{sorotKata(h.teksTerjemahan, kataAyat)}</p>
                </KartuHasil>
              ))}
            </>
          )}

          {statusAyat === 'selesai' && hasilAyat.length === 0 && hasilLokal.kelompok.length > 0 && (
            <MetaHasil>Tidak ditemukan ayat untuk “{kataAyat}”.</MetaHasil>
          )}
        </section>
      )}

      {tanpaHasilSamaSekali && (
        <StateKosong
          ikon={<FaSearchMinus />}
          judul={`Tidak ada hasil untuk “${kataAyat}”`}
          deskripsi="Periksa kembali ejaannya, coba kata yang lebih umum, atau ketuk salah satu pencarian populer berikut."
          saran={SERING_DICARI}
          labelSaran="Pencarian populer"
          onSaran={pilihSaran}
        />
      )}

      {/* ---------- Keadaan idle ---------- */}
      {!queryAktif && statusAyat === 'idle' && (
        <>
          <StateKosong
            ikon={<FaSearch />}
            judul="Mau cari apa hari ini?"
            deskripsi="Ketik kata kunci di kolom atas — surah, doa, hadits, kisah, sampai fitur seperti zakat & waris, semua bisa dicari dari sini."
            saran={SERING_DICARI}
            labelSaran="Sering Dicari"
            onSaran={pilihSaran}
          />
          {riwayat.length > 0 && (
            <section aria-label="Riwayat pencarian">
              <KepalaRiwayat>
                <span className="label">
                  <FaHistory aria-hidden="true" /> Terakhir Dicari
                </span>
                <TombolHapusRiwayat type="button" onClick={hapusRiwayat}>
                  <FaTrashAlt aria-hidden="true" /> Hapus riwayat
                </TombolHapusRiwayat>
              </KepalaRiwayat>
              <BarisChipBungkus>
                {riwayat.map((r) => (
                  <Chip key={r} type="button" onClick={() => setKata(r)}>
                    <FaSearch aria-hidden="true" /> {r}
                  </Chip>
                ))}
              </BarisChipBungkus>
            </section>
          )}
        </>
      )}
    </Page>
  );
}
