/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useSurah } from '../hooks/useSurah.js';
import { useAudioSync } from '../hooks/useAudioSync.js';
import SurahHeader from '../components/SurahHeader.jsx';
import AyatCard from '../components/AyatCard.jsx';
import PlayerBar from '../components/PlayerBar.jsx';
import { Page, ErrorBox, Skeleton } from '../components/common.jsx';

/**
 * Halaman Surah generik (/surah/:id, /yasin → /surah/36).
 * Audio satu file + timestamp (Cara 2): ayat & kata ter-highlight otomatis.
 */

// Skeleton loading: tiruan header surah + beberapa kartu ayat.
function SurahSkeleton() {
  return (
    <Page aria-busy="true">
      <div css={{ marginBottom: 20 }}>
        <Skeleton h={190} radius={20} />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} css={{ marginBottom: 14 }}>
          <Skeleton h={130} radius={20} />
        </div>
      ))}
    </Page>
  );
}

export default function SurahPage() {
  const { id } = useParams();
  const { loading, error, data } = useSurah(id);
  const sync = useAudioSync(data?.ayahs, data?.audioUrl, data?.audioDurationMs);

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
      <SurahHeader surah={surah} />
      {ayahs.map((ayat, i) => (
        <AyatCard
          key={ayat.key}
          ayah={ayat}
          aktif={sync.activeIndex === i}
          kataAktif={sync.activeIndex === i ? sync.activeWord : -1}
          onSelect={() => sync.seekToAyah(i)}
        />
      ))}
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
