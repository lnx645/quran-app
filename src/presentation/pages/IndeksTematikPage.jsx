/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaHourglassHalf, FaHeart, FaGift, FaHeartbeat, FaDove, FaHandsHelping,
  FaUsers, FaShieldAlt, FaMoon, FaRing, FaGraduationCap, FaCoins,
  FaPrayingHands, FaStar, FaSearch, FaBookOpen, FaLayerGroup, FaArrowRight,
} from 'react-icons/fa';
import {
  INDEKS_TEMATIK, TOTAL_TOPIK_TEMATIK, TOTAL_AYAT_TEMATIK,
} from '../../data/sources/indeksTematikData.js';
import { Page, PageHero, Card, GoldCard, SectionTitle, TextInput } from '../components/common.jsx';
import StateKosong from '../components/StateKosong.jsx';

// Peta kunci ikon data → komponen ikon react-icons.
const IKON = {
  sabar: FaHourglassHalf,
  syukur: FaHeart,
  rezeki: FaGift,
  sembuh: FaHeartbeat,
  tenang: FaDove,
  ampun: FaHandsHelping,
  ortu: FaUsers,
  ujian: FaShieldAlt,
  mati: FaMoon,
  nikah: FaRing,
  ilmu: FaGraduationCap,
  sedekah: FaCoins,
  doa: FaPrayingHands,
  taubat: FaStar,
};

const BarisCari = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
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
  }
`;

const BarisChip = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  &::after {
    content: '';
    flex: 0 0 16px;
  }
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

const KartuAyat = styled(Card)`
  display: flex;
  align-items: center;
  gap: 12px;
  .isi {
    flex: 1;
    min-width: 0;
  }
  .ref {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    gap: 6px;
    svg {
      flex-shrink: 0;
    }
  }
  .makna {
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TautanAyat = styled(Link)`
  flex-shrink: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0 13px;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
  transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: scale(0.96);
  }
`;

const DeskTopik = styled.p`
  font-size: 13.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  margin: -4px 0 ${({ theme }) => theme.spacing.md}px;
`;

export default function IndeksTematikPage() {
  const [topikAktif, setTopikAktif] = useState('semua');
  const [kata, setKata] = useState('');

  const hasil = useMemo(() => {
    const q = kata.trim().toLowerCase();
    return INDEKS_TEMATIK.filter(
      (t) => topikAktif === 'semua' || t.topik === topikAktif,
    )
      .map((t) => {
        if (!q) return t;
        const topikCocok =
          t.topik.toLowerCase().includes(q) || t.deskripsi.toLowerCase().includes(q);
        if (topikCocok) return t;
        return {
          ...t,
          ayat: t.ayat.filter(
            (a) =>
              a.makna.toLowerCase().includes(q) ||
              a.surah.toLowerCase().includes(q) ||
              `${a.surah} ${a.ayat}`.toLowerCase().includes(q),
          ),
        };
      })
      .filter((t) => t.ayat.length > 0);
  }, [topikAktif, kata]);

  const jumlahAyatHasil = hasil.reduce((n, t) => n + t.ayat.length, 0);

  return (
    <Page>
      <PageHero>
        <h2>
          <FaBookOpen /> Indeks Tematik Al-Qur&apos;an
        </h2>
        <p>
          {TOTAL_TOPIK_TEMATIK} topik kehidupan dengan {TOTAL_AYAT_TEMATIK} ayat masyhur —
          ketuk “Baca” untuk membuka ayat lengkapnya di halaman surah.
        </p>
      </PageHero>

      <GoldCard>
        <p css={(t) => ({ fontSize: 14, lineHeight: 1.6, color: t.colors.text })}>
          Indeks ini kurasi ringkas, bukan pengganti tafsir. Setiap kartu menampilkan referensi
          pasti dan ringkasan makna satu baris; teks Arab dan terjemahan lengkapnya silakan baca
          langsung di surahnya agar konteks ayatnya utuh.
        </p>
      </GoldCard>

      <BarisCari>
        <FaSearch aria-hidden="true" />
        <TextInput
          type="search"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari topik / makna ayat / nama surah…"
          aria-label="Cari indeks tematik"
        />
      </BarisCari>

      <BarisChip role="group" aria-label="Filter topik">
        <Chip
          aktif={topikAktif === 'semua'}
          onClick={() => setTopikAktif('semua')}
          aria-label="Tampilkan semua topik"
          aria-pressed={topikAktif === 'semua'}
        >
          <FaLayerGroup /> Semua
        </Chip>
        {INDEKS_TEMATIK.map((t) => {
          const Ikon = IKON[t.ikon] ?? FaStar;
          return (
            <Chip
              key={t.topik}
              aktif={topikAktif === t.topik}
              onClick={() => setTopikAktif(t.topik)}
              aria-label={`Topik ${t.topik}`}
              aria-pressed={topikAktif === t.topik}
            >
              <Ikon /> {t.topik}
            </Chip>
          );
        })}
      </BarisChip>

      <p
        aria-live="polite"
        css={(t) => ({ fontSize: 13, color: t.colors.muted, marginBottom: 4 })}
      >
        Menampilkan {jumlahAyatHasil} ayat dari {hasil.length} topik.
      </p>

      {hasil.length === 0 && (
        <Card>
          <StateKosong
            ikon={<FaSearch />}
            judul="Tidak ada topik yang cocok"
            deskripsi="Coba kata kunci lain, atau ketuk salah satu topik populer berikut."
            saran={['Sabar', 'Syukur', 'Rezeki', 'Doa', 'Taubat']}
            onSaran={(s) => {
              setKata('');
              setTopikAktif(s);
            }}
          />
        </Card>
      )}

      {hasil.map((t) => {
        const Ikon = IKON[t.ikon] ?? FaStar;
        return (
          <section key={t.topik}>
            <SectionTitle>
              <Ikon /> {t.topik}
            </SectionTitle>
            <DeskTopik>{t.deskripsi}</DeskTopik>
            {t.ayat.map((a) => (
              <KartuAyat key={`${a.surahId}:${a.ayat}`}>
                <div className="isi">
                  <p className="ref">
                    <FaBookOpen aria-hidden="true" />
                    QS. {a.surah} ({a.surahId}): {a.ayat}
                  </p>
                  <p className="makna">{a.makna}</p>
                </div>
                <TautanAyat
                  to={`/surah/${a.surahId}?ayat=${a.ayat}`}
                  aria-label={`Baca QS. ${a.surah} ayat ${a.ayat}`}
                >
                  Baca <FaArrowRight aria-hidden="true" />
                </TautanAyat>
              </KartuAyat>
            ))}
          </section>
        );
      })}
    </Page>
  );
}
