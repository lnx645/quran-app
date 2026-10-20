import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchChapterRecitation } from '../../data/quranApi.js';

/**
 * useRadioPlayer — mesin Radio Murottal: SATU elemen Audio yang memutar
 * recitation utuh per bab (fetchChapterRecitation dari data layer, qari
 * aktif dari useQari di halaman) lalu otomatis lanjut ke bab berikutnya
 * sesuai mode putar:
 * - 'berurutan': bab 1 → 114, lalu kembali ke 1.
 * - 'acak'     : bab acak 1–114, tidak mengulang bab yang sama berurutan.
 * - 'juzamma'  : bab 78 → 114 berurutan, lalu kembali ke 78.
 *
 * Ayat berjalan dihitung dari audio_file.timestamps[] (per ayat:
 * verse_key + timestamp_from/to dalam milidetik) dibandingkan dengan
 * currentTime audio — pola yang sama dengan sinkronisasi SurahPage.
 * Bila qari/bab tidak menyediakan timestamps, ayatBerjalan = null dan UI
 * menampilkan catatan jujur (audio tetap diputar sebagai radio bab utuh).
 *
 * Sleep timer: hitung mundur per detik; saat habis, volume diturunkan
 * bertahap (fade ±1 detik) lalu audio dijeda & timer direset.
 * Media Session API diisi sebisa mungkin (dibungkus try/catch).
 * Audio selalu dihentikan saat komponen yang memakai hook ini dilepas.
 */

export const MODE_RADIO = [
  { id: 'berurutan', label: 'Berurutan' },
  { id: 'acak', label: 'Acak' },
  { id: 'juzamma', label: "Juz 'Amma" },
];

const AWAL_JUZ_AMMA = 78;
const TOTAL_BAB = 114;

function babAcakSelain(idSekarang) {
  if (TOTAL_BAB <= 1) return 1;
  let kandidat = idSekarang ?? 1;
  while (kandidat === idSekarang) {
    kandidat = 1 + Math.floor(Math.random() * TOTAL_BAB);
  }
  return kandidat;
}

/** Bab berikutnya dari `dariId` menurut mode (dariId null → awal mode). */
export function babBerikutnya(mode, dariId) {
  if (mode === 'acak') return babAcakSelain(dariId);
  if (mode === 'juzamma') {
    if (!dariId || dariId < AWAL_JUZ_AMMA || dariId >= TOTAL_BAB) return AWAL_JUZ_AMMA;
    return dariId + 1;
  }
  // berurutan
  if (!dariId || dariId >= TOTAL_BAB) return 1;
  return dariId + 1;
}

/** Bab awal saat radio dimulai tanpa pilihan bab tertentu. */
function babAwal(mode) {
  if (mode === 'acak') return 1 + Math.floor(Math.random() * TOTAL_BAB);
  if (mode === 'juzamma') return AWAL_JUZ_AMMA;
  return 1;
}

/** Nomor ayat dari verse_key "surah:ayat" (0 bila tak terbaca). */
function nomorAyatDariKunci(verseKey) {
  const n = Number(String(verseKey ?? '').split(':')[1]);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function useRadioPlayer(qari) {
  const audioRef = useRef(null);
  if (audioRef.current === null && typeof Audio !== 'undefined') {
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';
  }
  const audio = audioRef.current;

  const [mode, setMode] = useState('berurutan');
  const [babId, setBabId] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | memuat | main | jeda | galat
  const [pesanGalat, setPesanGalat] = useState('');
  const [timestamps, setTimestamps] = useState([]);
  const [posisi, setPosisi] = useState(0); // detik
  const [durasi, setDurasi] = useState(0); // detik
  const [tidurMenit, setTidurMenit] = useState(0); // 0 = mati
  const [tidurSisa, setTidurSisa] = useState(null); // detik tersisa | null

  const modeRef = useRef(mode);
  modeRef.current = mode;
  const qariRef = useRef(qari);
  const tokenRef = useRef(0); // penangkal balapan antar-pemuatan bab
  const memudarRef = useRef(false);

  // --- Ayat berjalan: timestamps (ms) vs currentTime (detik) ---
  const posisiMs = posisi * 1000;
  let ayatBerjalan = null;
  if (timestamps.length > 0 && babId) {
    const cocok =
      timestamps.find((t) => posisiMs >= t.timestamp_from && posisiMs < t.timestamp_to) ??
      (posisiMs >= (timestamps[timestamps.length - 1]?.timestamp_from ?? Infinity)
        ? timestamps[timestamps.length - 1]
        : null);
    if (cocok) {
      ayatBerjalan = {
        verseKey: cocok.verse_key,
        nomor: nomorAyatDariKunci(cocok.verse_key),
        total: timestamps.length,
      };
    }
  }

  const muatDanPutar = useCallback(
    async (id, { posisiAwal = 0, putar = true } = {}) => {
      if (!audio || !id) return;
      const token = ++tokenRef.current;
      setBabId(id);
      setStatus('memuat');
      setPesanGalat('');
      setTimestamps([]);
      setPosisi(0);
      setDurasi(0);
      try {
        const berkas = await fetchChapterRecitation(id, qariRef.current);
        if (token !== tokenRef.current) return; // sudah digantikan pemuatan lain
        const url = berkas?.audio_url ?? '';
        if (!url) throw new Error('Audio bab ini tidak tersedia.');
        setTimestamps(Array.isArray(berkas?.timestamps) ? berkas.timestamps : []);
        audio.src = url;
        audio.volume = 1;
        memudarRef.current = false;
        if (posisiAwal > 0) {
          const terapkanPosisi = () => {
            try {
              audio.currentTime = posisiAwal;
            } catch {
              /* abaikan: metadata belum siap */
            }
            audio.removeEventListener('loadedmetadata', terapkanPosisi);
          };
          audio.addEventListener('loadedmetadata', terapkanPosisi);
        }
        if (putar) {
          await audio.play();
          if (token !== tokenRef.current) return;
          setStatus('main');
        } else {
          setStatus('jeda');
        }
      } catch (err) {
        if (token !== tokenRef.current) return;
        setPesanGalat(
          err instanceof Error && err.message
            ? err.message
            : 'Audio gagal dimuat — periksa koneksi internet.',
        );
        setStatus('galat');
      }
    },
    [audio],
  );

  const lewati = useCallback(() => {
    muatDanPutar(babBerikutnya(modeRef.current, babId));
  }, [babId, muatDanPutar]);

  const sebelumnya = useCallback(() => {
    if (!babId) return;
    // Mundur sederhana & dapat diprediksi: mode acak tidak punya riwayat,
    // jadi tombol media "sebelumnya" memulai ulang bab berjalan; mode lain
    // mundur satu bab dalam rentang modenya.
    if (modeRef.current === 'acak' && audio) {
      audio.currentTime = 0;
      setPosisi(0);
      return;
    }
    if (modeRef.current === 'juzamma') {
      // Di dalam rentang 78–114: mundur satu; dari 78 mulai ulang bab itu.
      muatDanPutar(babId <= AWAL_JUZ_AMMA ? AWAL_JUZ_AMMA : babId - 1);
      return;
    }
    // Berurutan: mundur satu, dari bab 1 membungkus ke 114.
    muatDanPutar(babId <= 1 ? TOTAL_BAB : babId - 1);
  }, [audio, babId, muatDanPutar]);

  const jeda = useCallback(() => {
    if (!audio) return;
    audio.pause();
    setStatus((s) => (s === 'main' ? 'jeda' : s));
  }, [audio]);

  const lanjut = useCallback(async () => {
    if (!audio) return;
    try {
      await audio.play();
      setStatus('main');
    } catch {
      setPesanGalat('Audio gagal diputar — periksa koneksi internet.');
      setStatus('galat');
    }
  }, [audio]);

  /** Play/Jeda utama; dari keadaan kosong mulai dari bab awal mode. */
  const alihPutar = useCallback(() => {
    if (status === 'main') {
      jeda();
      return;
    }
    if (status === 'memuat') return;
    if (babId && audio?.src) {
      lanjut();
      return;
    }
    muatDanPutar(babAwal(modeRef.current));
  }, [audio, babId, jeda, lanjut, muatDanPutar, status]);

  const berhenti = useCallback(() => {
    if (!audio) return;
    tokenRef.current += 1; // batalkan pemuatan yang sedang berjalan
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {
      /* abaikan */
    }
    audio.volume = 1;
    memudarRef.current = false;
    setPosisi(0);
    setStatus('idle');
    setPesanGalat('');
  }, [audio]);

  const cobaLagi = useCallback(() => {
    if (babId) muatDanPutar(babId);
  }, [babId, muatDanPutar]);

  /** Putar bab tertentu dari daftar (klik baris bab di halaman). */
  const putarBab = useCallback(
    (id) => {
      if (id === babId && status === 'main') {
        jeda();
        return;
      }
      if (id === babId && status === 'jeda' && audio?.src) {
        lanjut();
        return;
      }
      muatDanPutar(id);
    },
    [audio, babId, jeda, lanjut, muatDanPutar, status],
  );

  // --- Peristiwa elemen audio ---
  useEffect(() => {
    if (!audio) return undefined;
    const onTime = () => setPosisi(audio.currentTime || 0);
    const onMeta = () => setDurasi(audio.duration || 0);
    const onEnd = () => {
      // Bab selesai → otomatis lanjut bab berikutnya sesuai mode.
      muatDanPutar(babBerikutnya(modeRef.current, babId));
    };
    const onErr = () => {
      if (!audio.src) return;
      setPesanGalat('Audio gagal dimuat — periksa koneksi internet.');
      setStatus('galat');
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onErr);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onErr);
    };
  }, [audio, babId, muatDanPutar]);

  // Audio dihentikan saat komponen dilepas.
  useEffect(() => {
    if (!audio) return undefined;
    return () => {
      tokenRef.current += 1;
      audio.pause();
      audio.removeAttribute('src');
    };
  }, [audio]);

  // Ganti qari saat ada bab termuat → muat ulang bab yang sama dengan qari
  // baru (posisi & keadaan putar dipertahankan), seperti SurahPage.
  const qariPertamaRef = useRef(true);
  useEffect(() => {
    qariRef.current = qari;
    if (qariPertamaRef.current) {
      qariPertamaRef.current = false;
      return;
    }
    if (babId && status !== 'idle') {
      muatDanPutar(babId, {
        posisiAwal: audio ? audio.currentTime || 0 : 0,
        putar: status === 'main',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qari]);

  // --- Sleep timer ---
  const aturTidur = useCallback((menit) => {
    const m = Number(menit) || 0;
    setTidurMenit(m);
    setTidurSisa(m > 0 ? m * 60 : null);
    if (audio) audio.volume = 1;
    memudarRef.current = false;
  }, [audio]);

  useEffect(() => {
    if (tidurSisa === null) return undefined;
    if (tidurSisa <= 0) {
      // Waktu habis → fade volume singkat lalu jeda & reset timer.
      if (!audio || memudarRef.current) {
        setTidurMenit(0);
        setTidurSisa(null);
        return undefined;
      }
      memudarRef.current = true;
      const langkah = setInterval(() => {
        const berikut = Math.max(0, (audio.volume || 0) - 0.25);
        audio.volume = berikut;
        if (berikut <= 0) {
          clearInterval(langkah);
          audio.pause();
          setStatus((s) => (s === 'main' ? 'jeda' : s));
          audio.volume = 1;
          memudarRef.current = false;
          setTidurMenit(0);
          setTidurSisa(null);
        }
      }, 220);
      return () => clearInterval(langkah);
    }
    const tunda = setTimeout(() => setTidurSisa((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(tunda);
  }, [audio, tidurSisa]);

  // --- Media Session API (sebisa mungkin, selalu try/catch) ---
  const aksiRef = useRef({ alihPutar, lewati, sebelumnya, jeda });
  aksiRef.current = { alihPutar, lewati, sebelumnya, jeda };
  useEffect(() => {
    try {
      if (!('mediaSession' in navigator)) return undefined;
      navigator.mediaSession.setActionHandler('play', () => aksiRef.current.alihPutar());
      navigator.mediaSession.setActionHandler('pause', () => aksiRef.current.jeda());
      navigator.mediaSession.setActionHandler('nexttrack', () => aksiRef.current.lewati());
      navigator.mediaSession.setActionHandler('previoustrack', () => aksiRef.current.sebelumnya());
    } catch {
      /* Media Session tidak tersedia/parsial — abaikan */
    }
    return () => {
      try {
        if ('mediaSession' in navigator) {
          navigator.mediaSession.setActionHandler('play', null);
          navigator.mediaSession.setActionHandler('pause', null);
          navigator.mediaSession.setActionHandler('nexttrack', null);
          navigator.mediaSession.setActionHandler('previoustrack', null);
          navigator.mediaSession.metadata = null;
        }
      } catch {
        /* abaikan */
      }
    };
  }, []);

  return {
    mode,
    setMode,
    babId,
    status,
    pesanGalat,
    posisi,
    durasi,
    ayatBerjalan,
    punyaTimestamps: timestamps.length > 0,
    tidurMenit,
    tidurSisa,
    aturTidur,
    alihPutar,
    jeda,
    lewati,
    sebelumnya,
    berhenti,
    cobaLagi,
    putarBab,
  };
}
