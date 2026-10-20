/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useSurah } from '../hooks/useSurah.js';
import { useAudioSync } from '../hooks/useAudioSync.js';
import SurahHeader from '../components/SurahHeader.jsx';
import AyatCard from '../components/AyatCard.jsx';
import PlayerBar from '../components/PlayerBar.jsx';
import { Page, LoadingBox, Spinner, ErrorBox } from '../components/common.jsx';

/**
 * Halaman Surah generik (/surah/:id, /yasin → /surah/36).
 * Audio satu file + timestamp (Cara 2): ayat & kata ter-highlight otomatis.
 */
export default function SurahPage() {
  const { id } = useParams();
  const { loading, error, data } = useSurah(id);
  const sync = useAudioSync(data?.ayahs, data?.audioUrl, data?.audioDurationMs);

  if (loading) {
    return (
      <Page>
        <LoadingBox>
          <Spinner />
          Memuat surah dan audio…
        </LoadingBox>
      </Page>
    );
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
