/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaPrayingHands, FaListOl, FaPlay, FaArrowLeft, FaArrowRight, FaRedoAlt,
  FaHandPointer, FaBookOpen, FaInfoCircle, FaCheckCircle,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, PrimaryButton, GhostButton,
} from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import { useToast } from '../components/feedback/toastStore.js';
import { umumkan } from '../components/feedback/umumkan.js';
import {
  RANGKAIAN_TAHLIL, BINGKAI_TAHLIL, DISCLAIMER_TAHLIL,
} from '../../data/sources/tahlilData.js';

/**
 * Halaman Tahlil & Doa Arwah: daftar rangkaian (kartu bernomor) + mode
 * terpandu langkah demi langkah dengan penghitung ketuk untuk bacaan
 * berjumlah. Langkah Surah Yasin berupa tautan ke rute /yasin yang sudah
 * ada — teksnya tidak diduplikasi di sini.
 */

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 26px;
  line-height: 2;
  direction: rtl;
  text-align: right;
  margin: 8px 0 10px;
`;

const ArabBesar = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 32px;
  line-height: 2.05;
  direction: rtl;
  text-align: right;
  margin: 10px 0 12px;
`;

const Latin = styled.p`
  font-style: italic;
  font-size: 14.5px;
  line-height: 1.7;
  margin-bottom: 8px;
`;

const Arti = styled.p`
  font-size: 14.5px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.teksTerjemah};
`;

const Keterangan = styled.p`
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 10px;
`;

const Sumber = styled.p`
  font-size: 12px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.faint};
  margin-top: 12px;
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

const KepalaLangkah = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  h3 {
    font-size: ${({ theme }) => theme.type.h3.size}px;
    line-height: ${({ theme }) => theme.type.h3.lineHeight};
    color: ${({ theme }) => theme.colors.judul};
    min-width: 0;
  }
`;

const LencanaJumlah = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  background: ${({ theme }) => theme.colors.goldSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 4px 10px;
  margin-top: 10px;
`;

const BarProgres = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  margin: 10px 0 4px;
  > div {
    height: 100%;
    border-radius: 999px;
    background: ${({ theme }) => theme.gradients.gold};
    transition: width ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
  }
`;

const KotakHitung = styled.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
`;

const AngkaHitung = styled.div`
  font-size: 56px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.judul};
  line-height: 1.1;
`;

const TombolKetuk = styled.button`
  width: 132px;
  height: 132px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.emeraldPanel},
    ${({ theme }) => theme.colors.emeraldPanelGelap}
  );
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lift};
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.93);
  }
`;

const BarisNavigasi = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
  > * {
    flex: 1;
  }
`;

const getarSelesai = () => {
  try {
    if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
  } catch {
    /* tidak didukung */
  }
};

function teksLangkah(langkah, kunciVarian) {
  if (Array.isArray(langkah.varian) && langkah.varian.length > 0) {
    const v = langkah.varian.find((x) => x.kunci === kunciVarian) ?? langkah.varian[0];
    return { arab: v.arab, latin: v.latin, arti: v.arti };
  }
  return { arab: langkah.arab, latin: langkah.latin, arti: langkah.arti };
}

export default function TahlilPage() {
  const toast = useToast();
  const [tab, setTab] = useState('daftar'); // daftar | pandu
  const [idx, setIdx] = useState(0);
  const [hitung, setHitung] = useState({});
  const [varianDoa, setVarianDoa] = useState('hu');
  const [selesai, setSelesai] = useState(false);

  const total = RANGKAIAN_TAHLIL.length;
  const langkah = RANGKAIAN_TAHLIL[idx];
  const teks = useMemo(() => teksLangkah(langkah, varianDoa), [langkah, varianDoa]);
  const nHitung = hitung[langkah.id] ?? 0;
  const target = langkah.jumlahKetuk ?? 0;
  const hitungTuntas = target > 0 && nHitung >= target;
  const persenProgres = Math.round(((idx + 1) / total) * 100);

  useEffect(() => {
    if (tab === 'pandu') window.scrollTo({ top: 0 });
  }, [tab, idx]);

  const ketuk = () => {
    const baru = nHitung + 1;
    setHitung((lama) => ({ ...lama, [langkah.id]: baru }));
    if (target > 0 && baru === target) {
      getarSelesai();
      umumkan(`Bacaan ${langkah.judul} mencapai ${target} kali.`);
    }
  };

  const resetHitung = () =>
    setHitung((lama) => ({ ...lama, [langkah.id]: 0 }));

  const mulai = () => {
    setIdx(0);
    setSelesai(false);
    setTab('pandu');
  };

  const ulangi = () => {
    setHitung({});
    setIdx(0);
    setSelesai(false);
  };

  const tuntaskan = () => {
    setSelesai(true);
    toast.sukses('Rangkaian tahlil selesai. Semoga pahala bacaan sampai kepada yang didoakan.');
    umumkan('Rangkaian tahlil selesai.');
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaPrayingHands /> Tahlil &amp; Doa Arwah
        </h2>
        <p>
          Rangkaian tahlil yang umum diamalkan di Indonesia — dari pembuka, Al-Fatihah,
          Ayat Kursi, dan Surah Yasin, hingga istighfar, kalimat tahlil, sholawat, dan
          doa arwah untuk yang telah wafat.
        </p>
      </PageHero>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{BINGKAI_TAHLIL}</span>
        </Catatan>
      </Card>

      <SegmenWadah role="tablist" aria-label="Mode tampilan tahlil">
        <SegmenTab aktif={tab === 'daftar'} onClick={() => setTab('daftar')}>
          <FaListOl /> Daftar Rangkaian
        </SegmenTab>
        <SegmenTab aktif={tab === 'pandu'} onClick={() => setTab('pandu')}>
          <FaPlay /> Mode Terpandu
        </SegmenTab>
      </SegmenWadah>

      {tab === 'daftar' && (
        <>
          <PrimaryButton type="button" css={{ width: '100%', marginBottom: 16 }} onClick={mulai}>
            <FaPlay /> Mulai Tahlil Terpandu
          </PrimaryButton>

          {RANGKAIAN_TAHLIL.map((l, i) => {
            const t = teksLangkah(l, varianDoa);
            return (
              <Card key={l.id}>
                <KepalaLangkah>
                  <NomorMedali nomor={i + 1} ukuran={38} />
                  <h3>{l.judul}</h3>
                </KepalaLangkah>
                {l.keterangan && <Keterangan css={{ marginTop: 10 }}>{l.keterangan}</Keterangan>}
                {t.arab && (
                  <Arab lang="ar">{t.arab}</Arab>
                )}
                {t.latin && <Latin>{t.latin}</Latin>}
                {t.arti && <Arti>&ldquo;{t.arti}&rdquo;</Arti>}
                {l.jenis === 'tautan' && l.tautan && (
                  <Link to={l.tautan.ke} css={{ display: 'block', marginTop: 12 }}>
                    <PrimaryButton type="button" css={{ width: '100%' }}>
                      <FaBookOpen /> {l.tautan.label} <FaArrowRight />
                    </PrimaryButton>
                  </Link>
                )}
                {l.jumlahKetuk && (
                  <LencanaJumlah>
                    {l.jumlahKetuk}&times; — {l.labelJumlah}
                  </LencanaJumlah>
                )}
                {l.sumber && <Sumber>{l.sumber}</Sumber>}
              </Card>
            );
          })}
        </>
      )}

      {tab === 'pandu' && !selesai && (
        <>
          <div
            css={(t) => ({
              fontSize: 13,
              fontWeight: 700,
              color: t.colors.muted,
              textAlign: 'center',
            })}
            aria-live="polite"
          >
            Langkah {idx + 1} dari {total}
          </div>
          <BarProgres role="progressbar" aria-valuenow={persenProgres} aria-valuemin={0} aria-valuemax={100} aria-label="Progres rangkaian">
            <div css={{ width: `${persenProgres}%` }} />
          </BarProgres>

          <GoldCard css={{ marginTop: 14 }}>
            <KepalaLangkah>
              <NomorMedali nomor={idx + 1} ukuran={42} />
              <h3>{langkah.judul}</h3>
            </KepalaLangkah>

            {langkah.keterangan && <Keterangan css={{ marginTop: 10 }}>{langkah.keterangan}</Keterangan>}

            {Array.isArray(langkah.varian) && langkah.varian.length > 0 && (
              <SegmenWadah role="tablist" aria-label="Kata ganti doa arwah" css={{ marginTop: 12 }}>
                {langkah.varian.map((v) => (
                  <SegmenTab
                    key={v.kunci}
                    aktif={varianDoa === v.kunci}
                    onClick={() => setVarianDoa(v.kunci)}
                  >
                    {v.label}
                  </SegmenTab>
                ))}
              </SegmenWadah>
            )}

            {teks.arab && (
              <ArabBesar lang="ar">{teks.arab}</ArabBesar>
            )}
            {teks.latin && <Latin>{teks.latin}</Latin>}
            {teks.arti && <Arti>&ldquo;{teks.arti}&rdquo;</Arti>}

            {langkah.jenis === 'tautan' && langkah.tautan && (
              <Link to={langkah.tautan.ke} css={{ display: 'block', marginTop: 14 }}>
                <PrimaryButton type="button" css={{ width: '100%' }}>
                  <FaBookOpen /> {langkah.tautan.label} <FaArrowRight />
                </PrimaryButton>
              </Link>
            )}

            {target > 0 && (
              <KotakHitung>
                <AngkaHitung>{nHitung}</AngkaHitung>
                <div css={(t) => ({ fontSize: 12.5, color: t.colors.muted, marginBottom: 12 })}>
                  {hitungTuntas
                    ? `Target ${target} kali tercapai — boleh lanjut.`
                    : `dari target ${target} kali`}
                  {langkah.labelJumlah ? ` · ${langkah.labelJumlah}` : ''}
                </div>
                <TombolKetuk type="button" onClick={ketuk} aria-label={`Ketuk menghitung ${langkah.judul}`}>
                  <FaHandPointer />
                </TombolKetuk>
                <div css={{ marginTop: 14 }}>
                  <GhostButton
                    type="button"
                    onClick={resetHitung}
                    css={{ minHeight: 44, padding: '8px 14px', fontSize: 13 }}
                  >
                    <FaRedoAlt /> Reset Hitungan
                  </GhostButton>
                </div>
              </KotakHitung>
            )}

            {langkah.sumber && <Sumber>{langkah.sumber}</Sumber>}
          </GoldCard>

          <BarisNavigasi>
            <GhostButton
              type="button"
              disabled={idx === 0}
              onClick={() => setIdx((v) => Math.max(0, v - 1))}
            >
              <FaArrowLeft /> Sebelumnya
            </GhostButton>
            {idx < total - 1 ? (
              <PrimaryButton type="button" onClick={() => setIdx((v) => v + 1)}>
                Lanjut <FaArrowRight />
              </PrimaryButton>
            ) : (
              <PrimaryButton type="button" onClick={tuntaskan}>
                <FaCheckCircle /> Selesai
              </PrimaryButton>
            )}
          </BarisNavigasi>

          <GhostButton
            type="button"
            css={{ width: '100%', marginTop: 10 }}
            onClick={() => setTab('daftar')}
          >
            <FaListOl /> Lihat Daftar Rangkaian
          </GhostButton>
        </>
      )}

      {tab === 'pandu' && selesai && (
        <GoldCard css={{ textAlign: 'center', paddingTop: 28, paddingBottom: 28 }}>
          <FaCheckCircle
            aria-hidden="true"
            css={(t) => ({ fontSize: 44, color: t.colors.goldDeep, marginBottom: 12 })}
          />
          <h3
            css={(t) => ({
              fontFamily: t.fonts.display,
              fontSize: t.type.h2.size,
              color: t.colors.judul,
              marginBottom: 8,
            })}
          >
            Rangkaian Selesai
          </h3>
          <p css={(t) => ({ fontSize: 14.5, lineHeight: 1.7, color: t.colors.text })}>
            Alhamdulillah, rangkaian tahlil telah selesai dibaca. Semoga Allah menerima
            bacaan ini dan menyampaikan pahalanya kepada almarhum/almarhumah yang dituju,
            mengampuni dosa-dosanya, dan melapangkan kuburnya.
          </p>
          <BarisNavigasi>
            <GhostButton type="button" onClick={ulangi}>
              <FaRedoAlt /> Ulangi
            </GhostButton>
            <PrimaryButton type="button" onClick={() => setTab('daftar')}>
              <FaListOl /> Ke Daftar
            </PrimaryButton>
          </BarisNavigasi>
        </GoldCard>
      )}

      <SectionTitle>Catatan</SectionTitle>
      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_TAHLIL}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
