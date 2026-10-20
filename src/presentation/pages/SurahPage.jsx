/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useParams, useSearchParams } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { QuranRepositoryImpl } from '../../data/repositories/QuranRepositoryImpl.js';
import { DAFTAR_QARI, RECITER_ALAFASY } from '../../data/quranApi.js';
import { useQari } from '../hooks/useQari.js';
import { useSurah } from '../hooks/useSurah.js';
import { useAudioSync } from '../hooks/useAudioSync.js';
import { useReadingPrefs } from '../hooks/useReadingPrefs.js';
import { catatAyatGlobal } from '../hooks/useStreak.js';
import SurahHeader from '../components/SurahHeader.jsx';
import AyatCard from '../components/AyatCard.jsx';
import PlayerBar from '../components/PlayerBar.jsx';
import ReadingControls from '../components/ReadingControls.jsx';
import MushafFrame from '../components/ornaments/MushafFrame.jsx';
import { juzMulaiPada } from '../components/ornaments/index.js';
import { Page, ErrorBox, Skeleton } from '../components/common.jsx';
import { umumkan } from '../components/feedback/umumkan.js';

/**
 * Halaman Surah generik (/surah/:id, /yasin → /surah/36).
 * Gaya mushaf cetak: area baca kertas hangat berbingkai garis ganda emas.
 * Audio satu file + timestamp (Cara 2): ayat & kata ter-highlight otomatis.
 */

function SurahSkeleton() {
  return (
    <Page aria-busy="true">
      <MushafFrame>
        <div css={{ marginBottom: 20 }}>
          <Skeleton h={190} radius={10} />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} css={{ marginBottom: 14 }}>
            <Skeleton h={130} radius={12} />
          </div>
        ))}
      </MushafFrame>
    </Page>
  );
}

// Bar mini yang menempel saat panel surah tergulir keluar layar (mobile-first).
const MiniBar = styled.div`
  position: sticky;
  top: 84px;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 0 -2px 10px;
  padding: 8px 12px;
  border-radius: 10px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.paperCard}, ${({ theme }) => theme.colors.paper});
  border: 1px solid ${({ theme }) => theme.colors.gold};
  box-shadow: ${({ theme }) => theme.shadows.card};
  opacity: ${({ tampil }) => (tampil ? 1 : 0)};
  transform: translateY(${({ tampil }) => (tampil ? '0' : '-8px')});
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: ${({ tampil }) => (tampil ? 'auto' : 'none')};
  .nama {
    display: flex;
    align-items: center;
    min-width: 0;
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 17px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.judul};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ayat {
    font-size: 11.5px;
    font-weight: 800;
    line-height: 1.4;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
    flex-shrink: 0;
    white-space: nowrap;
  }
`;

export default function SurahPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  // ?ayat=N (dari pencarian global / lanjutkan baca): ayat tujuan digulir
  // ke tengah & disorot sesaat oleh AyatCard (prop sorotAwal).
  const ayatTujuan = (() => {
    const n = Number(searchParams.get('ayat'));
    return Number.isInteger(n) && n > 0 ? n : 0;
  })();
  const { qari, ubahQari } = useQari();
  const { loading, error, data } = useSurah(id, qari);
  const sync = useAudioSync(data?.ayahs, data?.audioUrl, data?.audioDurationMs);
  // Fallback qari non-default: segments tak kompatibel → sorotan kata
  // dimatikan (highlight ayat dari timestamps tetap jalan bila ada);
  // timestamps pun absen → timing ayat null, audio berjalan sebagai
  // mode bab biasa tanpa highlight. Mode default (Al-Afasy) tak berubah.
  const sorotKataAktif = qari === RECITER_ALAFASY || Boolean(data?.sorotKataTersedia);
  const sinkronKurang = qari !== RECITER_ALAFASY && data && (!data.sinkronAyatTersedia || !data.sorotKataTersedia);
  const { pref, ubah, tambahArab, kurangArab } = useReadingPrefs();
  const sentinelRef = useRef(null);
  const wadahAyatRef = useRef(null);
  const [miniTampil, setMiniTampil] = useState(false);
  const ayatUcapRef = useRef(-1);

  // Mode terjemahan per kata: data kata (Map<verse_key, kata[]>) dimuat
  // MALAS — fetch hanya terjadi saat pref.perKata pertama kali menyala,
  // tidak pernah pada tampilan normal. Kegagalan muat tidak merusak
  // halaman baca: mode per kata cukup tidak tampil + catatan kecil.
  const [petaKata, setPetaKata] = useState(null);
  const [kataGagal, setKataGagal] = useState(false);
  useEffect(() => {
    if (!pref.perKata || petaKata || kataGagal) return;
    let batal = false;
    QuranRepositoryImpl.getWordTranslations(Number(id))
      .then((peta) => {
        if (!batal) setPetaKata(peta);
      })
      .catch(() => {
        if (!batal) setKataGagal(true);
      });
    return () => {
      batal = true;
    };
  }, [pref.perKata, petaKata, kataGagal, id]);

  // Umumkan ayat aktif ke screen reader saat audio berjalan (sopan, satu per ayat).
  // Nilai diambil dari data/sync langsung (aman saat loading/error).
  useEffect(() => {
    const daftar = data?.ayahs;
    const nomor =
      sync.activeIndex >= 0 && daftar ? daftar[sync.activeIndex]?.number ?? 0 : 0;
    if (sync.playing && nomor > 0 && nomor !== ayatUcapRef.current) {
      ayatUcapRef.current = nomor;
      umumkan(`Ayat ${nomor} dari ${daftar.length} sedang diputar.`);
    }
    if (!sync.playing) ayatUcapRef.current = -1;
  });

  // Catat ayat terbaca untuk streak & target harian: SATU IntersectionObserver
  // untuk semua kartu ayat dalam wadah ini. Penanda DOM = atribut data-ayat
  // pada elemen akar AyatCard (Blok) yang berisi kunci ayat 'surah:ayat'
  // (ayah.key). Kartu yang terlihat ≥50% dianggap terbaca lalu berhenti
  // diamati (dedupe per hari di domain menahan catatan ganda). Observer
  // diputus saat unmount / ganti surah / data berubah.
  useEffect(() => {
    const wadah = wadahAyatRef.current;
    if (!wadah || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const ent of entries) {
          if (!ent.isIntersecting) continue;
          const kunci = ent.target.getAttribute('data-ayat');
          if (kunci) catatAyatGlobal(kunci);
          obs.unobserve(ent.target);
        }
      },
      { threshold: 0.5 }
    );
    wadah.querySelectorAll('[data-ayat]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [data, id]);

  // Munculkan mini-header begitu panel surah tergulir keluar.
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(([ent]) => setMiniTampil(!ent.isIntersecting), {
      rootMargin: '-80px 0px 0px 0px',
    });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [loading]);

  if (loading) {
    return <SurahSkeleton />;
  }

  if (error || !data) {
    return (
      <Page>
        <ErrorBox>
          <FaExclamationTriangle /> Gagal memuat surah: {error ?? 'data kosong'}. Periksa koneksi
          internet lalu muat ulang.
        </ErrorBox>
      </Page>
    );
  }

  const { surah, ayahs } = data;
  const ayatAktifNomor = sync.activeIndex >= 0 ? ayahs[sync.activeIndex]?.number ?? 0 : 0;

  return (
    <Page>
      <MushafFrame>
        <div ref={sentinelRef} aria-hidden="true" />
        <SurahHeader surah={surah} />
        <MiniBar tampil={miniTampil} aria-hidden={!miniTampil}>
          <span className="nama" dir="rtl">
            {surah.nameArabic} — {surah.nameLatin}
          </span>
          <span className="ayat">{ayatAktifNomor > 0 ? `Ayat ${ayatAktifNomor}` : `${surah.versesCount} Ayat`}</span>
        </MiniBar>
        {pref.perKata && (
          <p
            role="note"
            css={{
              fontSize: 12.5,
              lineHeight: 1.6,
              margin: '0 0 12px',
              color: 'inherit',
            }}
          >
            {kataGagal
              ? 'Mode per kata: terjemahan kata belum bisa dimuat (periksa koneksi internet). Tampilan ayat tetap normal.'
              : petaKata
                ? 'Mode per kata aktif — arti tiap kata ditampilkan dalam Bahasa Inggris (terjemahan kata (Inggris)): API Quran.com belum menyediakan terjemahan per kata Bahasa Indonesia.'
                : 'Memuat terjemahan per kata…'}
          </p>
        )}
        {sinkronKurang && (
          <p role="note" css={{ fontSize: 12.5, lineHeight: 1.6, margin: '0 0 12px' }}>
            Catatan: qari ini tidak menyediakan data sinkronisasi lengkap di API — audio
            diputar per bab tanpa sorotan {data.sinkronAyatTersedia ? 'kata' : 'ayat/kata'}.
          </p>
        )}
        <div ref={wadahAyatRef}>
        {ayahs.map((ayat, i) => (
          <AyatCard
            key={ayat.key}
            ayah={ayat}
            aktif={sync.activeIndex === i}
            kataAktif={sync.activeIndex === i && sorotKataAktif ? sync.activeWord : -1}
            onSelect={() => sync.seekToAyah(i)}
            juzAwal={juzMulaiPada(ayat.key)}
            arabSize={pref.arabSize}
            tampilLatin={pref.latin}
            tampilTerjemah={pref.terjemah}
            tampilTajwid={pref.tajwid}
            sorotAwal={ayatTujuan === ayat.number}
            kataPerKata={pref.perKata && petaKata ? petaKata.get(ayat.key) ?? null : null}
          />
        ))}
        </div>
        {/* Spacer bawah: konten terakhir tidak tertutup ReadingControls + PlayerBar (fixed) */}
        <div aria-hidden="true" css={{ height: 'calc(166px + 54px + 28px + env(safe-area-inset-bottom))' }} />
      </MushafFrame>
      <ReadingControls
        pref={pref}
        ubah={ubah}
        tambahArab={tambahArab}
        kurangArab={kurangArab}
        qari={qari}
        daftarQari={DAFTAR_QARI}
        ubahQari={ubahQari}
      />
      <PlayerBar
        playing={sync.playing}
        onToggle={sync.toggle}
        onPrev={() => sync.seekToAyah(Math.max(0, sync.activeIndex - 1))}
        onNext={() => sync.seekToAyah(Math.min(ayahs.length - 1, (sync.activeIndex < 0 ? -1 : sync.activeIndex) + 1))}
        posisiMs={sync.positionMs}
        durasiMs={sync.durationMs}
        onSeek={(ms) => sync.seekMs(ms)}
        ayatAktif={ayatAktifNomor}
        totalAyat={ayahs.length}
        posisiAyatMs={sync.activeIndex >= 0 ? ayahs[sync.activeIndex].timing?.fromMs : null}
        namaSurah={`Surah ${surah.nameLatin}`}
      />
    </Page>
  );
}
