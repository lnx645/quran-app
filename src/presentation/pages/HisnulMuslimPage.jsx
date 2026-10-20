/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaSun, FaUtensils, FaHome, FaMosque, FaTshirt, FaCar, FaHeartbeat,
  FaCloudRain, FaMoon, FaBed, FaHeart, FaUserFriends, FaStar,
  FaPrayingHands, FaSearch, FaBookOpen, FaLayerGroup,
} from 'react-icons/fa';
import { HISNUL_MUSLIM, TOTAL_DOA_HISNUL } from '../../data/sources/hisnulMuslimData.js';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, TextInput,
} from '../components/common.jsx';

// Peta kunci ikon data → komponen ikon react-icons.
const IKON = {
  bangun: FaSun,
  makan: FaUtensils,
  rumah: FaHome,
  masjid: FaMosque,
  pakaian: FaTshirt,
  safar: FaCar,
  sakit: FaHeartbeat,
  hujan: FaCloudRain,
  berbuka: FaMoon,
  tidur: FaBed,
  gelisah: FaHeart,
  orangtua: FaUserFriends,
  pilihan: FaStar,
};

const BarisCari = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  svg {
    color: ${({ theme }) => theme.colors.goldDeep};
    flex-shrink: 0;
    font-size: 17px;
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

const KartuDoa = styled(Card)`
  .judul {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 17px;
    color: ${({ theme }) => theme.colors.judul};
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    svg {
      color: ${({ theme }) => theme.colors.gold};
      flex-shrink: 0;
    }
  }
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 27px;
    line-height: 2;
    text-align: right;
    direction: rtl;
    color: ${({ theme }) => theme.colors.teksArab};
  }
  .latin {
    font-style: italic;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.teksLatin};
    margin-top: 8px;
  }
  .arti {
    font-size: 14.5px;
    margin-top: 4px;
  }
  .riwayat {
    margin-top: 10px;
    padding-top: 8px;
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.type.caption.size}px;
    color: ${({ theme }) => theme.colors.faint};
    display: flex;
    align-items: center;
    gap: 6px;
    svg {
      color: ${({ theme }) => theme.colors.goldDeep};
      flex-shrink: 0;
    }
  }
`;

const Kosong = styled(Card)`
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14.5px;
  padding: 28px 18px;
`;

export default function HisnulMuslimPage() {
  const [kategoriAktif, setKategoriAktif] = useState('semua');
  const [kata, setKata] = useState('');

  const hasil = useMemo(() => {
    const q = kata.trim().toLowerCase();
    return HISNUL_MUSLIM.filter(
      (k) => kategoriAktif === 'semua' || k.kategori === kategoriAktif,
    )
      .map((k) => ({
        ...k,
        doa: k.doa.filter(
          (d) =>
            !q ||
            d.judul.toLowerCase().includes(q) ||
            d.arti.toLowerCase().includes(q) ||
            d.latin.toLowerCase().includes(q),
        ),
      }))
      .filter((k) => k.doa.length > 0);
  }, [kategoriAktif, kata]);

  const jumlahHasil = hasil.reduce((n, k) => n + k.doa.length, 0);

  return (
    <Page>
      <PageHero>
        <h2>
          <FaPrayingHands /> Hisnul Muslim
        </h2>
        <p>
          Doa-doa per aktivitas &amp; situasi — {TOTAL_DOA_HISNUL} doa dalam{' '}
          {HISNUL_MUSLIM.length} kategori, dengan Arab, latin, arti, dan riwayat.
        </p>
      </PageHero>

      <GoldCard>
        <p css={(t) => ({ fontSize: 14, lineHeight: 1.6, color: t.colors.text })}>
          Isi halaman ini adalah doa-doa masyhur dari kitab <strong>Hisnul Muslim</strong>{' '}
          (penyusun: Syaikh Sa&apos;id bin Wahf Al-Qahthani). Teks doa itu sendiri
          bersumber dari Al-Qur&apos;an dan hadits Nabi ﷺ — riwayatnya dicantumkan
          di setiap kartu.
        </p>
      </GoldCard>

      <BarisCari>
        <FaSearch aria-hidden="true" />
        <TextInput
          type="search"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari doa (judul / arti)…"
          aria-label="Cari doa Hisnul Muslim"
        />
      </BarisCari>

      <BarisChip role="group" aria-label="Filter kategori doa">
        <Chip
          aktif={kategoriAktif === 'semua'}
          onClick={() => setKategoriAktif('semua')}
          aria-label="Tampilkan semua kategori"
          aria-pressed={kategoriAktif === 'semua'}
        >
          <FaLayerGroup /> Semua
        </Chip>
        {HISNUL_MUSLIM.map((k) => {
          const Ikon = IKON[k.ikon] ?? FaStar;
          return (
            <Chip
              key={k.kategori}
              aktif={kategoriAktif === k.kategori}
              onClick={() => setKategoriAktif(k.kategori)}
              aria-label={`Kategori ${k.kategori}`}
              aria-pressed={kategoriAktif === k.kategori}
            >
              <Ikon /> {k.kategori}
            </Chip>
          );
        })}
      </BarisChip>

      <p
        aria-live="polite"
        css={(t) => ({ fontSize: 13, color: t.colors.muted, marginBottom: 4 })}
      >
        Menampilkan {jumlahHasil} doa.
      </p>

      {hasil.length === 0 && (
        <Kosong>
          Tidak ada doa yang cocok. Coba kata kunci atau kategori lain.
        </Kosong>
      )}

      {hasil.map((k) => {
        const Ikon = IKON[k.ikon] ?? FaStar;
        return (
          <section key={k.kategori}>
            <SectionTitle>
              <Ikon /> {k.kategori}
            </SectionTitle>
            {k.doa.map((d) => (
              <KartuDoa key={d.judul}>
                <div className="judul">{d.judul}</div>
                <p className="arab" lang="ar">{d.arab}</p>
                <p className="latin">{d.latin}</p>
                <p className="arti">{d.arti}</p>
                <p className="riwayat">
                  <FaBookOpen aria-hidden="true" /> {d.riwayat}
                </p>
              </KartuDoa>
            ))}
          </section>
        );
      })}
    </Page>
  );
}
