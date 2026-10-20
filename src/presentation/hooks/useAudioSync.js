import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Hook sinkronisasi audio "Cara 2":
 * - Satu <audio> utuh per surah (audioUrl).
 * - verse_timings (audio_file.timestamps): ayat aktif dicari dari currentTime.
 * - segments ayat aktif: kata aktif dicari dari currentTime pula.
 * Update lewat requestAnimationFrame saat audio berjalan → highlight halus.
 *
 * @param {Array} ayahs entity Ayah[] (dengan .timing)
 * @param {string} audioUrl URL mp3 surah utuh
 * @param {number} totalMs durasi dari timestamps (fallback bila metadata belum siap)
 */
export function useAudioSync(ayahs, audioUrl, totalMs) {
  const audioRef = useRef(null);
  const rafRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(totalMs || 0);

  if (audioRef.current === null && typeof Audio !== 'undefined') {
    audioRef.current = new Audio();
  }
  const audio = audioRef.current;

  // Ganti sumber saat surah berubah.
  useEffect(() => {
    if (!audio || !audioUrl) return;
    audio.src = audioUrl;
    setPositionMs(0);
    setPlaying(false);
    setDurationMs(totalMs || 0);
    const onMeta = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDurationMs(audio.duration * 1000);
      }
    };
    const onEnd = () => setPlaying(false);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, [audio, audioUrl, totalMs]);

  const tick = useCallback(() => {
    if (!audio) return;
    setPositionMs(audio.currentTime * 1000);
    if (!audio.paused && !audio.ended) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [audio]);

  useEffect(() => {
    if (playing) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
      if (audio) setPositionMs(audio.currentTime * 1000);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, tick, audio]);

  const play = useCallback(() => {
    audio?.play();
    setPlaying(true);
  }, [audio]);
  const pause = useCallback(() => {
    audio?.pause();
    setPlaying(false);
  }, [audio]);
  const toggle = useCallback(() => {
    if (!audio) return;
    if (audio.paused) play();
    else pause();
  }, [audio, play, pause]);

  const seekMs = useCallback(
    (ms, autoPlay = true) => {
      if (!audio) return;
      audio.currentTime = Math.max(0, ms) / 1000;
      setPositionMs(ms);
      if (autoPlay) play();
    },
    [audio, play]
  );

  // Ayat aktif: timestamp_from <= posisi < timestamp_to.
  const activeIndex = useMemo(() => {
    if (!ayahs?.length || positionMs <= 0) return positionMs > 0 ? 0 : -1;
    const idx = ayahs.findIndex(
      (a) => a.timing && positionMs >= a.timing.fromMs && positionMs < a.timing.toMs
    );
    return idx;
  }, [ayahs, positionMs]);

  // Kata aktif dalam ayat aktif dari segments [indexKata, mulaiMs, selesaiMs].
  const activeWord = useMemo(() => {
    if (activeIndex < 0) return -1;
    const segs = ayahs[activeIndex]?.timing?.segments ?? [];
    for (let i = segs.length - 1; i >= 0; i--) {
      if (positionMs >= segs[i][1] && positionMs < segs[i][2]) return segs[i][0];
    }
    return -1;
  }, [ayahs, activeIndex, positionMs]);

  const seekToAyah = useCallback(
    (index) => {
      const ayat = ayahs?.[index];
      if (ayat?.timing) seekMs(ayat.timing.fromMs);
    },
    [ayahs, seekMs]
  );

  return {
    playing,
    toggle,
    play,
    pause,
    positionMs,
    durationMs,
    seekMs,
    seekToAyah,
    activeIndex,
    activeWord,
  };
}
