/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useParams, useSearchParams } from 'react-router-dom';
import { FaExclamationTriangle, FaPlay } from 'react-icons/fa';
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

// FAB putar (Mode Baca Tenang): pengganti PlayerBar sebelum audio pernah
// aktif. Posisinya dihitung dari strip ReadingControls yang selalu tampil:
// strip itu fixed dengan bottom calc(166px + safe-area) (= tinggi PlayerBar)
// dan min-height 54px, jadi tepi atasnya berada 220px dari bawah layar.
// FAB ditaruh 12px di atas tepi itu: bottom = 166 + 54 + 12 = 232px.
// z-index 56: tepat di atas ReadingControls (55), jauh di bawah overlay
// drawer (90), panel drawer (100), dan dialog/modal (300).
const TombolPutarMelayang = styled.button`
  position: fixed;
  right: 16px;
  bottom: calc(232px + env(safe-area-inset-bottom));
  z-index: 56;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: ${({ theme }) => theme.gradients.gold};
  color: ${({ theme }) => theme.colors.primaryDeep};
  box-shadow: ${({ theme }) => theme.shadows.gold};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  /* Saat tumpukan bilah bawah sembunyi (prop turun), FAB ikut turun ke
     dekat tepi bawah layar (bottom efektif 232px → 16px, jadi geser
     216px) dengan transisi & token anim yang sama persis dengan bilah —
     satu gerakan sinkron, bukan lompatan. Perilaku FAB tidak berubah. */
  transform: translateY(${({ turun }) => (turun ? '216px' : '0')});
  transition: transform ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: translateY(${({ turun }) => (turun ? '216px' : '0')}) scale(0.93);
  }
  /* Fokus keyboard: pola global :focus-visible di Aplikasi.jsx
     (cincin emas 3px + offset) berlaku untuk tombol ini juga. */
`;

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

  // Mode Baca Tenang: SATU boolean niat-buka tambahan — sumber kebenaran
  // audio tetap useAudioSync (sync), bukan mesin state kedua. Visibilitas
  // PlayerBar DITURUNKAN saat render (bukan efek), dari boolean ini + sync:
  // - belum dibuka & audio belum berjalan → hanya FAB (PlayerBar tak dirender);
  // - dibuka (FAB / klik ayat) ATAU audio sedang berjalan → PlayerBar penuh,
  //   termasuk saat paused di tengah (posisi < durasi);
  // - audio selesai: di useAudioSync, event 'ended' men-set playing=false
  //   dengan posisi terkunci di durasi penuh → kondisi audioSelesai membuat
  //   bar menyusut otomatis kembali ke FAB.
  const [playerDibuka, setPlayerDibuka] = useState(false);
  // Ganti surah → niat-buka direset (pola React: sesuaikan state saat
  // "prop" berubah, di render — bukan di efek).
  const [idPlayer, setIdPlayer] = useState(id);
  if (idPlayer !== id) {
    setIdPlayer(id);
    setPlayerDibuka(false);
  }
  const audioSelesai =
    !sync.playing && sync.durationMs > 0 && sync.positionMs >= sync.durationMs;
  const playerTampil = (playerDibuka || sync.playing) && !audioSelesai;

  // Ketuk FAB: tampilkan PlayerBar + putar bab — perilaku yang sama persis
  // dengan tombol putar PlayerBar (sync.toggle).
  const mulaiPutarDariFab = () => {
    setPlayerDibuka(true);
    sync.toggle();
  };

  // Tombol tutup PlayerBar: berhenti total — pause() + seekMs(0, false)
  // mengembalikan sync persis ke keadaan awal (posisi 0, playing false) —
  // lalu niat-buka dicabut → kembali ke FAB.
  const tutupPlayer = () => {
    sync.pause();
    sync.seekMs(0, false);
    setPlayerDibuka(false);
  };

  // Bilah pintar: strip ReadingControls + PlayerBar diperlakukan sebagai
  // SATU unit — bergeser turun keluar layar saat pengguna menggulir ke
  // BAWAH untuk membaca, dan muncul lagi begitu menggulir ke ATAS sedikit
  // saja. TIDAK ada pemunculan otomatis karena diam/idle. Arah dihitung
  // dari AKUMULASI delta scroll (bukan delta per-event) agar jitter kecil
  // tidak memicu flip: sembunyi setelah terkumpul ≥10px ke bawah, tampil
  // setelah terkumpul ≥5px ke atas; akumulator direset tiap ganti arah.
  // Di dekat puncak halaman bilah selalu tampil.
  const [bilahSembunyi, setBilahSembunyi] = useState(false);
  useEffect(() => {
    let yTerakhir = window.scrollY;
    let akumulasi = 0;
    const padaScroll = () => {
      const y = window.scrollY;
      const delta = y - yTerakhir;
      yTerakhir = y;
      if (delta === 0) return;
      if ((delta > 0 && akumulasi < 0) || (delta < 0 && akumulasi > 0)) {
        akumulasi = 0;
      }
      akumulasi += delta;
      if (y <= 64) {
        akumulasi = 0;
        setBilahSembunyi(false);
      } else if (akumulasi >= 10) {
        akumulasi = 0;
        setBilahSembunyi(true);
      } else if (akumulasi <= -5) {
        akumulasi = 0;
        setBilahSembunyi(false);
      }
    };
    window.addEventListener('scroll', padaScroll, { passive: true });
    return () => window.removeEventListener('scroll', padaScroll);
  }, []);

  // Pengecualian pemutar: PlayerBar TIDAK ikut sembunyi selama pengguna
  // berinteraksi dengannya — pointer/touch sedang di atasnya (termasuk
  // menggeser seek) menahan tanpa batas waktu; interaksi putar/jeda/
  // ganti ayat/seek menahan sembunyi selama 3 detik setelah yang
  // terakhir. Strip ReadingControls tidak punya pengecualian ini.
  const [playerDitahan, setPlayerDitahan] = useState(false);
  const timerTahanPlayerRef = useRef(null);
  const tahanPlayerSelama = (ms) => {
    setPlayerDitahan(true);
    if (timerTahanPlayerRef.current) clearTimeout(timerTahanPlayerRef.current);
    timerTahanPlayerRef.current =
      ms > 0 ? setTimeout(() => setPlayerDitahan(false), ms) : null;
  };
  useEffect(
    () => () => {
      if (timerTahanPlayerRef.current) clearTimeout(timerTahanPlayerRef.current);
    },
    [],
  );
  const playerSembunyi = bilahSembunyi && !playerDitahan;

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
            namaSurah={surah.nameLatin}
            aktif={sync.activeIndex === i}
            kataAktif={sync.activeIndex === i && sorotKataAktif ? sync.activeWord : -1}
            onSelect={() => {
              // Klik ayat untuk seek tetap berperilaku sama (seek + putar);
              // PlayerBar ikut tampil karena audio menjadi aktif.
              setPlayerDibuka(true);
              sync.seekToAyah(i);
            }}
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
        sembunyi={bilahSembunyi}
      />
      {playerTampil ? (
        // Pembungkus penahan interaksi: event pointer dari PlayerBar
        // (fixed) tetap menggelembung ke sini lewat pohon React — pointer
        // turun menahan sembunyi, pointer lepas menunda sembunyi 3 detik.
        <div
          onPointerDown={() => tahanPlayerSelama(0)}
          onPointerUp={() => tahanPlayerSelama(3000)}
          onPointerCancel={() => tahanPlayerSelama(3000)}
        >
          <PlayerBar
            playing={sync.playing}
            onToggle={() => {
              tahanPlayerSelama(3000);
              sync.toggle();
            }}
            onClose={tutupPlayer}
            onPrev={() => {
              tahanPlayerSelama(3000);
              sync.seekToAyah(Math.max(0, sync.activeIndex - 1));
            }}
            onNext={() => {
              tahanPlayerSelama(3000);
              sync.seekToAyah(Math.min(ayahs.length - 1, (sync.activeIndex < 0 ? -1 : sync.activeIndex) + 1));
            }}
            posisiMs={sync.positionMs}
            durasiMs={sync.durationMs}
            onSeek={(ms) => {
              tahanPlayerSelama(3000);
              sync.seekMs(ms);
            }}
            ayatAktif={ayatAktifNomor}
            totalAyat={ayahs.length}
            posisiAyatMs={sync.activeIndex >= 0 ? ayahs[sync.activeIndex].timing?.fromMs : null}
            namaSurah={`Surah ${surah.nameLatin}`}
            sembunyi={playerSembunyi}
          />
        </div>
      ) : (
        <TombolPutarMelayang
          type="button"
          onClick={mulaiPutarDariFab}
          aria-label="Putar audio surah"
          turun={bilahSembunyi}
        >
          <FaPlay style={{ marginLeft: 3 }} aria-hidden="true" />
        </TombolPutarMelayang>
      )}
    </Page>
  );
}
