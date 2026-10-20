/** @jsxImportSource @emotion/react */
// AnakPage — Mode Anak (Gelombang 6, item 5): belajar huruf hijaiyah
// dengan target sentuh BESAR untuk anak. Dua bagian:
//  (a) Huruf Hijaiyah — grid huruf besar; ketuk huruf → panel detail +
//      nama huruf diucapkan SpeechSynthesis (lang ar-SA, teks namaArab).
//  (b) Kuis Tebak Huruf — 10 soal/sesi tanpa pengulangan, 4 pilihan nama,
//      umpan balik langsung, skor bintang FaStar.
// Suara JUJUR: ucapan hanya dijalankan bila speechSynthesis tersedia DAN
// ada suara Arab (getVoices). Bila tidak, panel detail tetap tampil dan
// catatan kecil ditampilkan — tidak pernah berpura-pura bersuara.
// Data: HURUF_ANAK (anakData.js) — melengkapi HURUF_HIJAIYAH iqroData.js
// yang belum punya contoh kata & nama Arab berharakat.
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaChild,
  FaFont,
  FaPuzzlePiece,
  FaVolumeUp,
  FaCheck,
  FaTimes,
  FaStar,
  FaTrophy,
  FaRedo,
  FaArrowRight,
  FaPrayingHands,
  FaBookOpen,
  FaGamepad,
} from 'react-icons/fa';
import { HURUF_ANAK } from '../../data/sources/anakData.js';
import {
  Page,
  PageHero,
  Card,
  GoldCard,
  SectionTitle,
  PrimaryButton,
  GhostButton,
  MenuCard,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import StateKosong from '../components/StateKosong.jsx';

const JUMLAH_SOAL = 10;
const CATATAN_TANPA_SUARA =
  'Suara Arab tidak tersedia di perangkat ini — minta bimbingan orang tua/guru untuk bunyi yang tepat';

/* ---------- util acak & sesi kuis ---------- */

function acak(arr) {
  const salin = [...arr];
  for (let i = salin.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [salin[i], salin[j]] = [salin[j], salin[i]];
  }
  return salin;
}

// Satu sesi: JUMLAH_SOAL huruf berbeda (tanpa pengulangan). Tiap soal 4
// pilihan nama — pengecoh dipilih yang namanya BEDA dari jawaban (huruf
// ح dan ه sama-sama bernama "Ha", jadi tidak boleh saling jadi pengecoh).
function buatSesi() {
  return acak(HURUF_ANAK)
    .slice(0, JUMLAH_SOAL)
    .map((huruf) => {
      const pengecoh = [];
      for (const kandidat of acak(HURUF_ANAK)) {
        if (pengecoh.length >= 3) break;
        if (kandidat.nama === huruf.nama) continue;
        if (pengecoh.some((p) => p.nama === kandidat.nama)) continue;
        pengecoh.push(kandidat);
      }
      return { huruf, pilihan: acak([huruf.nama, ...pengecoh.map((p) => p.nama)]) };
    });
}

/* ---------- suara (SpeechSynthesis) ---------- */

// Ada suara Arab? null = daftar suara belum selesai dimuat peramban.
function cekSuaraArab() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  try {
    const suara = window.speechSynthesis.getVoices();
    if (!suara.length) return null;
    return suara.some((v) => (v.lang || '').toLowerCase().startsWith('ar'));
  } catch {
    return false;
  }
}

function cariSuaraArab() {
  try {
    return (
      window.speechSynthesis
        .getVoices()
        .find((v) => (v.lang || '').toLowerCase().startsWith('ar')) ?? null
    );
  } catch {
    return null;
  }
}

/* ---------- styled (token tema saja) ---------- */

const GridHuruf = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(78px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const SelHuruf = styled.button`
  min-height: 104px;
  padding: 12px 4px 10px;
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.md}px;
  background: ${({ theme, aktif }) =>
    aktif ? theme.colors.goldSoft : theme.colors.surface};
  border: 2px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme, aktif }) => (aktif ? theme.shadows.gold : theme.shadows.card)};
  transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    border-color ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    transform: translateY(-2px);
  }
  &:active {
    transform: scale(0.96);
  }
  .ar {
    display: block;
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 40px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.judul};
  }
  .lat {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
`;

const PanelHuruf = styled(GoldCard)`
  text-align: center;
  .huruf-besar {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 76px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.judul};
  }
  .nama {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 10px;
  }
`;

const ContohKata = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: 12px 22px;
  margin-bottom: 16px;
  .label-kecil {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
  .ar {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 34px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.judul};
  }
  .lat {
    font-size: 14.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
  .arti {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const CatatanSuara = styled.p`
  font-size: 12.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.goldDeep};
  max-width: 340px;
  margin: 0 auto;
`;

const BarisBintang = styled.div`
  display: flex;
  justify-content: center;
  gap: 3px;
  margin-bottom: 14px;
  svg {
    font-size: 20px;
  }
  .terisi {
    color: ${({ theme }) => theme.colors.gold};
  }
  .kosong {
    color: ${({ theme }) => theme.colors.border};
  }
`;

const LabelSoal = styled.p`
  text-align: center;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  margin-bottom: 8px;
`;

const HurufSoal = styled.div`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 84px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.judul};
  margin-bottom: 6px;
`;

const BarisDengar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
`;

const GridPilihan = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const TombolPilihan = styled.button`
  min-height: 56px;
  padding: 12px 10px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  font-size: 17px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme, status }) =>
    status === 'benar'
      ? theme.colors.primarySoft
      : status === 'salah'
        ? theme.colors.dangerSoft
        : theme.colors.surface};
  border: 2px solid
    ${({ theme, status }) =>
      status === 'benar'
        ? theme.colors.primary
        : status === 'salah'
          ? theme.colors.dangerBorder
          : theme.colors.border};
  color: ${({ theme, status }) =>
    status === 'benar'
      ? theme.colors.primary
      : status === 'salah'
        ? theme.colors.danger
        : theme.colors.text};
  transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    border-color ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.gold};
  }
  &:active:not(:disabled) {
    transform: scale(0.97);
  }
  &:disabled {
    cursor: default;
  }
  svg {
    flex-shrink: 0;
  }
`;

const UmpanBalik = styled.p`
  text-align: center;
  font-size: 15.5px;
  font-weight: 800;
  line-height: 1.55;
  margin: 16px 0 4px;
  color: ${({ theme, benar }) =>
    benar ? theme.colors.primary : theme.colors.goldDeep};
`;

const BarisBerikutnya = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const GridPintas = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.gridGap}px;
`;

function Bintang({ terisi, total }) {
  return (
    <BarisBintang role="img" aria-label={`${terisi} dari ${total} bintang terkumpul`}>
      {Array.from({ length: total }, (_, i) => (
        <FaStar key={i} className={i < terisi ? 'terisi' : 'kosong'} aria-hidden="true" />
      ))}
    </BarisBintang>
  );
}

export default function AnakPage() {
  const [tab, setTab] = useState('huruf');
  const [terpilih, setTerpilih] = useState(null); // huruf aktif di grid
  // null = belum pasti (suara masih dimuat), true/false = hasil periksa.
  const [suaraArab, setSuaraArab] = useState(() => cekSuaraArab());

  // Sesi kuis
  const [sesi, setSesi] = useState(() => buatSesi());
  const [idxSoal, setIdxSoal] = useState(0);
  const [jawaban, setJawaban] = useState(null); // nama yang diketuk
  const [jumlahBenar, setJumlahBenar] = useState(0);
  const [selesai, setSelesai] = useState(false);

  // Daftar suara peramban sering tiba bel belakangan → dengarkan perubahannya.
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined;
    const periksa = () => setSuaraArab(cekSuaraArab());
    periksa();
    window.speechSynthesis.addEventListener?.('voiceschanged', periksa);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', periksa);
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* abaikan: halaman ditutup */
      }
    };
  }, []);

  // Ucapkan teks Arab. Mengembalikan true hanya bila benar-benar diucapkan
  // (ada speechSynthesis + suara Arab); selain itu diam — panel & catatan
  // yang berbicara, bukan pura-pura bersuara.
  const ucapkan = (teksArab) => {
    if (suaraArab !== true || !teksArab) return false;
    try {
      const synth = window.speechSynthesis;
      synth.cancel(); // batalkan ucapan berjalan sebelum yang baru
      const u = new SpeechSynthesisUtterance(teksArab);
      u.lang = 'ar-SA';
      const suara = cariSuaraArab();
      if (suara) u.voice = suara;
      synth.speak(u);
      return true;
    } catch {
      return false;
    }
  };

  const ketukHuruf = (huruf) => {
    setTerpilih(huruf);
    ucapkan(huruf.namaArab);
  };

  const soal = sesi[idxSoal] ?? null;
  const sudahJawab = jawaban !== null;

  const jawab = (nama) => {
    if (sudahJawab || !soal) return;
    setJawaban(nama);
    if (nama === soal.huruf.nama) setJumlahBenar((n) => n + 1);
  };

  const soalBerikutnya = () => {
    if (idxSoal >= sesi.length - 1) {
      setSelesai(true);
      return;
    }
    setIdxSoal((i) => i + 1);
    setJawaban(null);
  };

  const mainLagi = () => {
    setSesi(buatSesi());
    setIdxSoal(0);
    setJawaban(null);
    setJumlahBenar(0);
    setSelesai(false);
  };

  const statusPilihan = (nama) => {
    if (!sudahJawab) return 'netral';
    if (nama === soal.huruf.nama) return 'benar';
    if (nama === jawaban) return 'salah';
    return 'netral';
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaChild /> Mode Anak
        </h2>
        <p>
          Belajar huruf hijaiyah sambil bermain — ketuk hurufnya, dengarkan bunyinya, lalu
          tebak namanya. Hurufnya besar-besar, pas untuk jari kecil!
        </p>
      </PageHero>

      <SegmenWadah role="tablist" aria-label="Bagian Mode Anak">
        <SegmenTab aktif={tab === 'huruf'} onClick={() => setTab('huruf')}>
          <FaFont /> Huruf Hijaiyah
        </SegmenTab>
        <SegmenTab aktif={tab === 'kuis'} onClick={() => setTab('kuis')}>
          <FaPuzzlePiece /> Tebak Huruf
        </SegmenTab>
      </SegmenWadah>

      {tab === 'huruf' && (
        <>
          <SectionTitle>
            <FaFont /> Ketuk Hurufnya!
          </SectionTitle>
          <GridHuruf>
            {HURUF_ANAK.map((h) => (
              <SelHuruf
                key={h.arab}
                type="button"
                aktif={terpilih?.arab === h.arab}
                onClick={() => ketukHuruf(h)}
                aria-label={`Huruf ${h.nama}`}
                aria-pressed={terpilih?.arab === h.arab}
              >
                <span className="ar" dir="rtl" lang="ar">
                  {h.arab}
                </span>
                <span className="lat">{h.nama}</span>
              </SelHuruf>
            ))}
          </GridHuruf>

          {terpilih ? (
            <PanelHuruf css={{ marginTop: 16 }} aria-live="polite">
              <div className="huruf-besar" dir="rtl" lang="ar">
                {terpilih.arab}
              </div>
              <div className="nama">Huruf {terpilih.nama}</div>
              <div>
                <ContohKata>
                  <span className="label-kecil">Contoh kata:</span>
                  <span className="ar" dir="rtl" lang="ar">
                    {terpilih.contohArab}
                  </span>
                  <span className="lat">
                    {terpilih.contohLatin} — artinya {terpilih.contohArti}
                  </span>
                </ContohKata>
              </div>
              {suaraArab === true ? (
                <GhostButton
                  type="button"
                  onClick={() => ucapkan(terpilih.namaArab)}
                  aria-label={`Dengarkan bunyi huruf ${terpilih.nama}`}
                >
                  <FaVolumeUp aria-hidden="true" /> Dengarkan Bunyinya
                </GhostButton>
              ) : suaraArab === false ? (
                <CatatanSuara>{CATATAN_TANPA_SUARA}</CatatanSuara>
              ) : null}
            </PanelHuruf>
          ) : (
            <Card css={{ marginTop: 16 }}>
              <StateKosong
                ikon={<FaFont />}
                judul="Pilih Satu Huruf Dulu"
                deskripsi="Ketuk huruf mana pun di atas — hurufnya akan tampil besar lengkap dengan contoh katanya."
              />
            </Card>
          )}
        </>
      )}

      {tab === 'kuis' && (
        <>
          <SectionTitle>
            <FaGamepad /> Tebak Huruf
          </SectionTitle>
          {selesai ? (
            <Card>
              <Bintang terisi={jumlahBenar} total={sesi.length} />
              <StateKosong
                ikon={<FaTrophy />}
                judul="Hebat, Kamu Selesai!"
                deskripsi={`Kamu menjawab benar ${jumlahBenar} dari ${sesi.length} soal dan mengumpulkan ${jumlahBenar} bintang. Terus berlatih supaya makin hafal semua huruf hijaiyah!`}
                aksi={
                  <PrimaryButton type="button" onClick={mainLagi}>
                    <FaRedo aria-hidden="true" /> Main Lagi
                  </PrimaryButton>
                }
              />
            </Card>
          ) : soal ? (
            <Card>
              <LabelSoal>
                Soal {idxSoal + 1} dari {sesi.length}
              </LabelSoal>
              <Bintang terisi={jumlahBenar} total={sesi.length} />
              <HurufSoal dir="rtl" lang="ar" aria-label="Huruf yang harus ditebak">
                {soal.huruf.arab}
              </HurufSoal>
              <BarisDengar>
                {suaraArab === true ? (
                  <GhostButton
                    type="button"
                    onClick={() => ucapkan(soal.huruf.namaArab)}
                    aria-label="Dengarkan bunyi huruf ini"
                  >
                    <FaVolumeUp aria-hidden="true" /> Dengarkan
                  </GhostButton>
                ) : suaraArab === false ? (
                  <CatatanSuara>{CATATAN_TANPA_SUARA}</CatatanSuara>
                ) : null}
              </BarisDengar>
              <GridPilihan>
                {soal.pilihan.map((nama) => {
                  const status = statusPilihan(nama);
                  return (
                    <TombolPilihan
                      key={nama}
                      type="button"
                      status={status}
                      disabled={sudahJawab}
                      onClick={() => jawab(nama)}
                      aria-label={`Pilihan huruf ${nama}`}
                    >
                      {nama}
                      {status === 'benar' && <FaCheck aria-hidden="true" />}
                      {status === 'salah' && <FaTimes aria-hidden="true" />}
                    </TombolPilihan>
                  );
                })}
              </GridPilihan>
              {sudahJawab && (
                <div aria-live="polite">
                  <UmpanBalik benar={jawaban === soal.huruf.nama}>
                    {jawaban === soal.huruf.nama
                      ? 'Betul! Pintar sekali!'
                      : `Belum tepat — ini huruf ${soal.huruf.nama}. Tetap semangat!`}
                  </UmpanBalik>
                  <BarisBerikutnya>
                    <PrimaryButton type="button" onClick={soalBerikutnya}>
                      {idxSoal >= sesi.length - 1 ? (
                        <>
                          <FaTrophy aria-hidden="true" /> Lihat Hasil
                        </>
                      ) : (
                        <>
                          Soal Berikutnya <FaArrowRight aria-hidden="true" />
                        </>
                      )}
                    </PrimaryButton>
                  </BarisBerikutnya>
                </div>
              )}
            </Card>
          ) : null}
        </>
      )}

      <SectionTitle>
        <FaBookOpen /> Jelajahi Juga
      </SectionTitle>
      <GridPintas>
        <MenuCard
          to="/doa"
          icon={<FaPrayingHands />}
          judul="Doa Anak"
          desc="Kumpulan doa harian yang baik dibaca anak setiap hari"
        />
        <MenuCard
          to="/iqro/1"
          icon={<FaBookOpen />}
          judul="Mulai Iqro"
          desc="Lanjut belajar membaca dari Iqro Jilid 1"
        />
      </GridPintas>
    </Page>
  );
}
