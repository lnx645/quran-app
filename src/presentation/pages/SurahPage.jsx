/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useSurah } from '../hooks/useSurah.js';
import { useAudioSync } from '../hooks/useAudioSync.js';
import { useReadingPrefs } from '../hooks/useReadingPrefs.js';
import SurahHeader from '../components/SurahHeader.jsx';
import AyatCard from '../components/AyatCard.jsx';
import PlayerBar from '../components/PlayerBar.jsx';
import ReadingControls from '../components/ReadingControls.jsx';
import MushafFrame from '../components/ornaments/MushafFrame.jsx';
import { juzMulaiPada } from '../components/ornaments/index.js';
import { Page, ErrorBox, Skeleton } from '../components/common.jsx';

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
  background: linear-gradient(180deg, #fffdf4, ${({ theme }) => theme.colors.paper});
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
    color: ${({ theme }) => theme.colors.primaryDeep};
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
  const { loading, error, data } = useSurah(id);
  const sync = useAudioSync(data?.ayahs, data?.audioUrl, data?.audioDurationMs);
  const { pref, ubah, tambahArab, kurangArab } = useReadingPrefs();
  const sentinelRef = useRef(null);
  const [miniTampil, setMiniTampil] = useState(false);

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
        {ayahs.map((ayat, i) => (
          <AyatCard
            key={ayat.key}
            ayah={ayat}
            aktif={sync.activeIndex === i}
            kataAktif={sync.activeIndex === i ? sync.activeWord : -1}
            onSelect={() => sync.seekToAyah(i)}
            juzAwal={juzMulaiPada(ayat.key)}
            arabSize={pref.arabSize}
            tampilLatin={pref.latin}
            tampilTerjemah={pref.terjemah}
          />
        ))}
      </MushafFrame>
      <ReadingControls pref={pref} ubah={ubah} tambahArab={tambahArab} kurangArab={kurangArab} />
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
