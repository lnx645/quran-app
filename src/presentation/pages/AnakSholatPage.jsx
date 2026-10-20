/** @jsxImportSource @emotion/react */
// AnakSholatPage — Panduan Sholat Anak (sub-halaman Mode Anak).
// Belajar sholat 2 rakaat dengan mode LANGKAH-DEMI-LANGKAH: satu
// langkah tampil BESAR dalam panel (pola sama seperti panel huruf &
// kuis di AnakPage) — NomorMedali besar, ikon gerakan, satu kalimat
// penjelasan gerakan, bacaan Arab besar + latin + arti ringkas — lalu
// tombol Sebelumnya/Berikutnya yang besar untuk jari anak.
// TANPA ilustrasi figur: panduan = kartu bernomor + ikon saja
// (aturan keras user). Bacaan: LANGKAH_SHOLAT_ANAK (sholatAnakData.js)
// yang mengambil teks persis dari panduanSholatData.js.
import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaPray,
  FaArrowLeft,
  FaArrowRight,
  FaHandPaper,
  FaHandHoldingHeart,
  FaBookReader,
  FaAngleDown,
  FaArrowUp,
  FaArrowDown,
  FaChair,
  FaBookOpen,
  FaHeart,
  FaUsers,
  FaTrophy,
  FaRedo,
  FaChild,
} from 'react-icons/fa';
import {
  Page,
  PageHero,
  Card,
  GoldCard,
  SectionTitle,
  PrimaryButton,
  GhostButton,
} from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import StateKosong from '../components/StateKosong.jsx';
import {
  LANGKAH_SHOLAT_ANAK,
  PENGANTAR_SHOLAT_ANAK,
  PENUTUP_SHOLAT_ANAK,
  CATATAN_PENDAMPING_SHOLAT_ANAK,
} from '../../data/sources/sholatAnakData.js';

// Peta ikon gerakan — kunci sama dengan field `ikon` di data anak,
// ikon-ikonnya sama dengan yang dipakai PanduanSholatPage.
const IKON = {
  niat: <FaHeart />,
  takbir: <FaHandPaper />,
  doa: <FaHandHoldingHeart />,
  qiroah: <FaBookReader />,
  rukuk: <FaAngleDown />,
  iktidal: <FaArrowUp />,
  sujud: <FaArrowDown />,
  duduk: <FaChair />,
  tasyahud: <FaBookOpen />,
  salam: <FaPray />,
};

/* ---------- styled (token tema saja) ---------- */

const BarisKembali = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const TeksPengantar = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

const PesanPendamping = styled.p`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primarySoft};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: 12px 14px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  svg {
    flex-shrink: 0;
    font-size: 20px;
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
`;

const PanelLangkah = styled(Card)`
  text-align: center;
`;

const LabelLangkah = styled.p`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  margin-bottom: 10px;
`;

const BarKemajuan = styled.div`
  height: 10px;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  overflow: hidden;
  margin-bottom: 20px;
`;

const IsiKemajuan = styled.div`
  height: 100%;
  width: ${({ persen }) => persen}%;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  background: ${({ theme }) => theme.gradients.gold};
  transition: width ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
`;

const BarisKepala = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const LencanaIkon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.goldSoft};
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.goldDeep};
  font-size: 28px;
`;

const JudulBesar = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 25px;
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.judul};
`;

const TeksGerakan = styled.p`
  font-size: 17.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text};
  max-width: 480px;
  margin: 0 auto 18px;
`;

const LencanaBaca = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13.5px;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  margin-bottom: 14px;
`;

const ArabBesar = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 34px;
  line-height: 2;
  color: ${({ theme }) => theme.colors.teksArab};
  max-width: 560px;
  margin: 0 auto 12px;
`;

const LatinBesar = styled.p`
  font-style: italic;
  font-size: 15.5px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.teksLatin};
  max-width: 560px;
  margin: 0 auto 8px;
`;

const ArtiBesar = styled.p`
  font-size: 15px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 560px;
  margin: 0 auto;
`;

const PesanHati = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.goldSoft};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: 16px;
  max-width: 480px;
  margin: 0 auto;
`;

const BarisNav = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  > * {
    flex: 1;
  }
`;

const BarisNomor = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

// Target sentuh besar untuk anak: tombol nomor langkah min 56px.
const TombolNomor = styled.button`
  min-width: 56px;
  min-height: 56px;
  padding: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  border: 2px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.gold : 'transparent')};
  background: ${({ theme, aktif }) =>
    aktif ? theme.colors.goldSoft : 'transparent'};
  transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    border-color ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: scale(0.94);
  }
`;

const BarisAksiAkhir = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export default function AnakSholatPage() {
  const [idx, setIdx] = useState(0);
  const [selesai, setSelesai] = useState(false);

  const total = LANGKAH_SHOLAT_ANAK.length;
  const langkah = LANGKAH_SHOLAT_ANAK[idx] ?? null;
  const terakhir = idx >= total - 1;

  const sebelumnya = () => {
    if (idx > 0) setIdx((i) => i - 1);
  };

  const berikutnya = () => {
    if (terakhir) {
      setSelesai(true);
      return;
    }
    setIdx((i) => i + 1);
  };

  const ulangi = () => {
    setIdx(0);
    setSelesai(false);
  };

  return (
    <Page>
      <BarisKembali>
        <Link to="/anak">
          <GhostButton type="button">
            <FaArrowLeft aria-hidden="true" /> Mode Anak
          </GhostButton>
        </Link>
      </BarisKembali>

      <PageHero>
        <h2>
          <FaPray /> Belajar Sholat
        </h2>
        <p>
          Yuk belajar gerakan dan bacaan sholat satu demi satu! Tombolnya besar-besar dan
          langkahnya pelan-pelan, pas untuk anak hebat yang sedang belajar.
        </p>
      </PageHero>

      <GoldCard>
        <TeksPengantar>{PENGANTAR_SHOLAT_ANAK}</TeksPengantar>
        <PesanPendamping>
          <FaUsers aria-hidden="true" /> <span>{CATATAN_PENDAMPING_SHOLAT_ANAK}</span>
        </PesanPendamping>
      </GoldCard>

      <SectionTitle>
        <FaChild /> Langkah-Langkah Sholat
      </SectionTitle>

      {selesai ? (
        <Card>
          <StateKosong
            ikon={<FaTrophy />}
            judul="Hebat, Kamu Selesai!"
            deskripsi={PENUTUP_SHOLAT_ANAK}
            aksi={
              <BarisAksiAkhir>
                <PrimaryButton type="button" onClick={ulangi}>
                  <FaRedo aria-hidden="true" /> Ulangi dari Awal
                </PrimaryButton>
                <Link to="/anak">
                  <GhostButton type="button">
                    <FaChild aria-hidden="true" /> Kembali ke Mode Anak
                  </GhostButton>
                </Link>
              </BarisAksiAkhir>
            }
          />
        </Card>
      ) : langkah ? (
        <PanelLangkah aria-live="polite">
          <LabelLangkah>
            Langkah {idx + 1} dari {total}
          </LabelLangkah>
          <BarKemajuan
            role="progressbar"
            aria-valuenow={idx + 1}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={`Langkah ${idx + 1} dari ${total}`}
          >
            <IsiKemajuan persen={((idx + 1) / total) * 100} />
          </BarKemajuan>

          <BarisKepala>
            <NomorMedali nomor={idx + 1} ukuran={68} />
            <LencanaIkon aria-hidden="true">{IKON[langkah.ikon]}</LencanaIkon>
            <JudulBesar>{langkah.judul}</JudulBesar>
          </BarisKepala>

          <TeksGerakan>{langkah.gerakan}</TeksGerakan>

          {langkah.arab ? (
            <>
              {langkah.jumlah > 1 && (
                <div>
                  <LencanaBaca>Dibaca {langkah.jumlah} kali</LencanaBaca>
                </div>
              )}
              <ArabBesar dir="rtl" lang="ar">
                {langkah.arab}
              </ArabBesar>
              <LatinBesar>{langkah.latin}</LatinBesar>
              <ArtiBesar>&ldquo;{langkah.arti}&rdquo;</ArtiBesar>
            </>
          ) : (
            <PesanHati>
              Niat cukup di dalam hati — tidak perlu diucapkan keras-keras. Yang penting
              kita ingat: aku sholat karena Allah.
            </PesanHati>
          )}

          <BarisNav>
            <GhostButton
              type="button"
              onClick={sebelumnya}
              disabled={idx === 0}
              css={idx === 0 ? { visibility: 'hidden' } : undefined}
            >
              <FaArrowLeft aria-hidden="true" /> Sebelumnya
            </GhostButton>
            <PrimaryButton type="button" onClick={berikutnya}>
              {terakhir ? (
                <>
                  <FaTrophy aria-hidden="true" /> Selesai
                </>
              ) : (
                <>
                  Berikutnya <FaArrowRight aria-hidden="true" />
                </>
              )}
            </PrimaryButton>
          </BarisNav>

          <BarisNomor aria-label="Loncat ke langkah">
            {LANGKAH_SHOLAT_ANAK.map((l, i) => (
              <TombolNomor
                key={l.judul}
                type="button"
                aktif={i === idx}
                onClick={() => setIdx(i)}
                aria-label={`Ke langkah ${i + 1}: ${l.judul}`}
                aria-current={i === idx ? 'step' : undefined}
              >
                <NomorMedali nomor={i + 1} ukuran={40} />
              </TombolNomor>
            ))}
          </BarisNomor>
        </PanelLangkah>
      ) : null}
    </Page>
  );
}
