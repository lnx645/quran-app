/** @jsxImportSource @emotion/react */
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { FaBookOpen, FaChevronUp, FaRedo } from 'react-icons/fa';
import AyatRosette from './ornaments/AyatRosette.jsx';
import RubElHizb from './ornaments/RubElHizb.jsx';
import KhatamStar from './ornaments/KhatamStar.jsx';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';
import { parseTajweed } from '../../data/dto/tajweedParser.js';
import { ATURAN_TAJWID } from '../../data/sources/tajwidData.js';

const NAMA_ATURAN = Object.fromEntries(ATURAN_TAJWID.map((a) => [a.kelompok, a.nama]));

/**
 * Aliran ayat ala mushaf cetak — BUKAN kartu:
 * teks ayat mengalir menyatu di kertas mushaf; pemisah antar ayat hanya
 * rosette ۝ di akhir teks Arab + jarak vertikal yang lega.
 * Ayat aktif = blok latar full-width (menyentuh garis emas dalam bingkai
 * mushaf): tint kertas sedikit lebih gelap + pita emas tipis di sisi kiri +
 * rosette terisi emas + medali bintang-8 di pita. Bukan kartu membulat.
 */
const Blok = styled.article`
  position: relative;
  cursor: pointer;
  /* Meluas sampai garis emas dalam bingkai mushaf
     (padding frame 27 / 35 di desktop, garis dalam inset 5 → selisih 22/30) */
  margin: 0 -22px;
  padding: 17px 22px 15px;
  transition: background 0.45s ease;
  background: ${({ theme, aktif, sorot }) =>
    aktif || sorot ? theme.colors.paperDeep : 'transparent'};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin: 0 -30px;
    padding: 19px 30px 17px;
  }
  /* Pita emas tipis di sisi kiri saat ayat aktif */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.goldLight},
      ${({ theme }) => theme.colors.gold}
    );
    opacity: ${({ aktif }) => (aktif ? 1 : 0)};
    transition: opacity 0.4s ease;
  }
`;

const PitaJuz = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: -2px 0 10px;
  padding: 6px 10px;
  border-radius: 8px;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.goldSoft} 18%, ${({ theme }) => theme.colors.goldSoft} 82%, transparent);
  border-top: 1px solid ${({ theme }) => theme.colors.gold};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gold};
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
`;

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: ${({ ukuran }) => ukuran}px;
  line-height: 2.4;
  text-align: right;
  color: ${({ theme }) => theme.colors.teksArab};
  position: relative;
`;

const Kata = styled.span`
  border-radius: 6px;
  padding: 0 1px;
  transition: background 0.25s ease, color 0.25s ease;
  background: ${({ theme, aktif }) => (aktif ? theme.colors.goldSoft : 'transparent')};
  box-shadow: ${({ theme, aktif }) =>
    aktif ? `inset 0 -3px 0 ${theme.colors.gold}` : 'none'};
  color: ${({ theme, aktif }) => (aktif ? theme.colors.judul : 'inherit')};
`;

/* Referensi kecil samar di atas baris terjemahan: muncul bila latin/arti
   ditampilkan, atau saat ayat sedang aktif. */
const RefBaris = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.faint};
  text-align: right;
  margin: 10px 0 0;
`;

const LatinBaris = styled.p`
  margin-top: 7px;
  text-align: right;
  font-size: 13px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.teksLatin};
  font-variant: small-caps;
  letter-spacing: 0.45px;
`;

const Terjemah = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 14.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.teksTerjemah};
  margin-top: 7px;
`;

/* Segmen Arab berwarna per aturan tajwid (warna dari token tema). */
const SegmenTajwid = styled.span`
  color: ${({ theme, aturan }) =>
    aturan ? (theme.colors.tajwid?.[aturan] ?? 'inherit') : 'inherit'};
`;

/* Baris aksi di bawah ayat: tombol Tafsir (target sentuh ≥44px). */
const BarisAksi = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
`;

const TombolTafsir = styled.button`
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.paperCard};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.3px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &:active {
    transform: scale(0.96);
  }
`;

/* Panel tafsir expandable di bawah ayat. */
const PanelTafsir = styled.section`
  margin-top: 10px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.paperCard};
  cursor: default;
  .isi {
    font-size: 14px;
    line-height: 1.75;
    color: ${({ theme }) => theme.colors.text};
    white-space: pre-line;
  }
  .atribusi {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.faint};
  }
  .galat {
    font-size: 13.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.danger};
  }
  .memuat {
    font-size: 13.5px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

function AyatCard({
  ayah,
  aktif,
  kataAktif,
  onSelect,
  arabSize = 32,
  tampilLatin = false,
  tampilTerjemah = true,
  tampilTajwid = false,
  sorotAwal = false,
  juzAwal = 0,
}) {
  const ref = useRef(null);
  const [sorot, setSorot] = useState(false);
  const sudahSorotRef = useRef(false);
  const [tafsirBuka, setTafsirBuka] = useState(false);
  const [tafsir, setTafsir] = useState({ status: 'idle', teks: '', pesan: '' });

  useEffect(() => {
    if (aktif && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [aktif]);

  // Sorotan sesaat dari tautan ?ayat=N (pencarian / lanjutkan baca):
  // gulir sekali ke ayat ini lalu beri latar kertas lebih gelap ±2,6 detik.
  useEffect(() => {
    if (!sorotAwal || sudahSorotRef.current || !ref.current) return;
    sudahSorotRef.current = true;
    setSorot(true);
    const tGulir = setTimeout(
      () => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      350
    );
    const tMati = setTimeout(() => setSorot(false), 2600);
    return () => {
      clearTimeout(tGulir);
      clearTimeout(tMati);
    };
  }, [sorotAwal]);

  // Segmen tajwid diparse sekali per ayat (null = mode biasa / tak ada data).
  const segmenTajwid = useMemo(() => {
    if (!tampilTajwid || !ayah.teksTajwid) return null;
    const hasil = parseTajweed(ayah.teksTajwid);
    return hasil.length ? hasil : null;
  }, [tampilTajwid, ayah.teksTajwid]);

  // Tafsir dimuat malas: fetch hanya saat panel pertama dibuka (lalu cache
  // di tafsirApi membuat buka berikutnya instan).
  const muatTafsir = useCallback(() => {
    const [surahId] = String(ayah.key).split(':');
    setTafsir((s) => ({ ...s, status: 'loading', pesan: '' }));
    QuranRepositoryImpl.getTafsirAyat(Number(surahId), ayah.number)
      .then((teks) => setTafsir({ status: 'siap', teks, pesan: '' }))
      .catch(() =>
        setTafsir({
          status: 'gagal',
          teks: '',
          pesan: 'Tafsir belum bisa dimuat. Periksa koneksi internet Anda lalu coba lagi.',
        })
      );
  }, [ayah.key, ayah.number]);

  const alihTafsir = (e) => {
    e.stopPropagation();
    setTafsirBuka((buka) => {
      if (!buka && tafsir.status === 'idle') muatTafsir();
      return !buka;
    });
  };

  const tampilRef = tampilLatin || tampilTerjemah || aktif;
  const pilih = () => onSelect?.(ayah);
  const tekan = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pilih();
    }
  };

  return (
    <Blok
      ref={ref}
      aktif={aktif}
      sorot={sorot}
      data-ayat={ayah.number}
      onClick={pilih}
      onKeyDown={tekan}
      role="button"
      tabIndex={0}
      aria-current={aktif ? 'true' : undefined}
      aria-label={`Ayat ${ayah.number} — ketuk atau tekan Enter untuk memutar dari sini`}
    >
      {juzAwal > 0 && (
        <PitaJuz aria-label={`Awal Juz ${juzAwal}`}>
          <RubElHizb size={17} />
          <span>Juz {juzAwal}</span>
          <RubElHizb size={17} />
        </PitaJuz>
      )}
      {aktif && (
        <span
          css={{ position: 'absolute', left: 1, top: '34%', lineHeight: 0, zIndex: 2, pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <KhatamStar size={18} />
        </span>
      )}
      <Arab dir="rtl" lang="ar" ukuran={arabSize}>
        {segmenTajwid
          ? segmenTajwid.map((s, i) => (
              <SegmenTajwid
                key={i}
                aturan={s.aturan}
                title={s.aturan ? NAMA_ATURAN[s.aturan] : undefined}
              >
                {s.teks}
              </SegmenTajwid>
            ))
          : ayah.words.length
            ? ayah.words.map((w) => (
                <Kata key={w.position} aktif={aktif && kataAktif === w.position}>
                  {w.arabic}{' '}
                </Kata>
              ))
            : ayah.arabic}
        <span css={{ display: 'inline-block', marginInlineStart: 7, verticalAlign: 'middle' }}>
          <AyatRosette nomor={ayah.number} aktif={aktif} size={40} />
        </span>
      </Arab>
      {tampilRef && (
        <RefBaris>
          Ayat {ayah.number} · {ayah.key}
        </RefBaris>
      )}
      {tampilLatin && ayah.words.length > 0 && (
        <LatinBaris dir="ltr">
          {ayah.words.map((w) => w.latin).filter(Boolean).join(' ')}
        </LatinBaris>
      )}
      {tampilTerjemah && ayah.translation && <Terjemah>{ayah.translation}</Terjemah>}
      <BarisAksi>
        <TombolTafsir
          type="button"
          onClick={alihTafsir}
          onKeyDown={(e) => e.stopPropagation()}
          aria-expanded={tafsirBuka}
          aria-label={tafsirBuka ? `Tutup tafsir ayat ${ayah.number}` : `Buka tafsir ayat ${ayah.number}`}
        >
          {tafsirBuka ? <FaChevronUp aria-hidden="true" /> : <FaBookOpen aria-hidden="true" />}
          Tafsir
        </TombolTafsir>
      </BarisAksi>
      {tafsirBuka && (
        <PanelTafsir
          aria-label={`Tafsir ayat ${ayah.number}`}
          onClick={(e) => e.stopPropagation()}
        >
          {tafsir.status === 'loading' || tafsir.status === 'idle' ? (
            <p className="memuat">Memuat tafsir…</p>
          ) : tafsir.status === 'gagal' ? (
            <>
              <p className="galat" role="alert">{tafsir.pesan}</p>
              <BarisAksi>
                <TombolTafsir type="button" onClick={muatTafsir} aria-label="Coba muat tafsir lagi">
                  <FaRedo aria-hidden="true" /> Coba lagi
                </TombolTafsir>
              </BarisAksi>
            </>
          ) : (
            <p className="isi">{tafsir.teks}</p>
          )}
          <p className="atribusi">Tafsir Kemenag — via API equran.id</p>
        </PanelTafsir>
      )}
    </Blok>
  );
}

export default memo(AyatCard);
