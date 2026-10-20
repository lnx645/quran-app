/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import {
  FaBookOpen, FaCog, FaHandPointer, FaInfoCircle, FaRedoAlt, FaStar,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, GhostButton, PrimaryButton,
  Field, TextInput,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import StateKosong from '../components/StateKosong.jsx';
import { useToast } from '../components/feedback/toastStore.js';
import { umumkan } from '../components/feedback/umumkan.js';
import {
  SHOLAWAT_LIST, KEUTAMAAN_SHOLAWAT, AYAT_REFERENSI_SHOLAWAT, CATATAN_CAKUPAN_SHOLAWAT,
} from '../../data/sources/sholawatData.js';

// Pola penghitung mengikuti TasbihPage: ketuk tombol bulat, getar +
// pengumuman screen reader setiap kelipatan target tercapai, reset
// manual. Hitungan disimpan di state saja selama halaman dibuka
// (sama seperti TasbihPage — tidak ada penyimpanan persisten).
const TARGET_OPSI = [33, 100, 1000];

// Label cara menghitung per sholawat — WAJIB jelas: Ibrahimiyah yang
// panjang dihitung per SATU BACAAN LENGKAP, bukan per ketuk di tengah
// bacaan; sholawat pendek dihitung per ketuk (= satu bacaan ringkas).
function labelHitung(entri) {
  return entri.id === 'ibrahimiyah'
    ? 'Dihitung per bacaan lengkap — ketuk tombol setelah membaca seluruhnya sampai selesai.'
    : 'Dihitung per ketuk — satu ketuk untuk satu bacaan.';
}

const KartuBacaan = styled(Card)`
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 32px;
    line-height: 1.9;
    text-align: right;
    direction: rtl;
    color: ${({ theme }) => theme.colors.teksArab};
  }
  .latin {
    font-style: italic;
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.teksLatin};
    margin-top: 10px;
  }
  .arti {
    font-size: 14.5px;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.text};
    margin-top: 4px;
  }
  .sumber {
    font-size: 12.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.faint};
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
  }
`;

const Lencana = styled.span`
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
  margin-bottom: 10px;
`;

const NamaBacaan = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.type.h3.size}px;
  font-weight: ${({ theme }) => theme.type.h3.weight};
  line-height: ${({ theme }) => theme.type.h3.lineHeight};
  color: ${({ theme }) => theme.colors.judul};
  margin-bottom: 10px;
`;

const CounterCard = styled(Card)`
  text-align: center;
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  padding: 26px 18px;
`;

const ArabBesar = styled.div`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 34px;
  color: ${({ theme }) => theme.colors.judul};
  line-height: 1.8;
`;

const Angka = styled.div`
  font-size: 76px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.judul};
  line-height: 1.1;
`;

const TombolHitung = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.emeraldPanel}, ${({ theme }) => theme.colors.emeraldPanelGelap});
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lift};
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.93);
  }
`;

const Opsi = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  border: 1.5px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, aktif }) =>
    aktif ? theme.colors.primarySoft : theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  .ar {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 22px;
    color: ${({ theme }) => theme.colors.judul};
  }
  .lat {
    font-size: 14px;
    font-weight: 600;
  }
  .ket {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.5;
  }
`;

const TargetBtn = styled.button`
  padding: 9px 20px;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  border: 1.5px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, aktif }) =>
    aktif ? theme.colors.goldSoft : theme.colors.surface};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.judul};
`;

const getar = () => {
  try {
    if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
  } catch {
    /* tidak didukung */
  }
};

export default function SholawatPage() {
  const toast = useToast();
  const [mode, setMode] = useState('koleksi'); // koleksi | hitung
  const bisaDihitung = SHOLAWAT_LIST.filter((s) => s.bisaDihitung);
  const [pilihan, setPilihan] = useState(
    () => bisaDihitung.find((s) => s.id === 'jibril') ?? bisaDihitung[0],
  );
  const [hitung, setHitung] = useState(0);
  const [target, setTarget] = useState(100);
  const [targetCustom, setTargetCustom] = useState('');

  const tap = () => {
    if (!pilihan) return;
    const baru = hitung + 1;
    setHitung(baru);
    if (baru % target === 0 && target > 0) {
      getar();
      umumkan(`Target ${target} tercapai untuk ${pilihan.nama}. Total hitungan ${baru}.`);
      toast.sukses(`Target ${target} tercapai — ${pilihan.nama}. Barakallahu fiik!`);
    }
  };

  const reset = () => setHitung(0);
  const persen = target > 0 ? Math.min(100, (hitung / target) * 100) : 0;

  const terapkanTargetCustom = () => {
    const n = Number.parseInt(targetCustom, 10);
    if (!Number.isFinite(n) || n <= 0) {
      toast.peringatan('Isi target khusus dengan angka lebih dari 0.');
      return;
    }
    setTarget(n);
    setTargetCustom('');
    toast.sukses(`Target hitungan diatur ke ${n}.`);
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaStar /> Sholawat
        </h2>
        <p>
          Kumpulan sholawat bersumber jelas dari Al-Qur&apos;an dan hadits, beserta penghitung
          dzikirnya. Allah memerintahkan orang beriman bershalawat kepada Nabi ﷺ (QS. Al-Ahzab: 56).
        </p>
      </PageHero>

      <SegmenWadah role="tablist" aria-label="Mode halaman sholawat">
        <SegmenTab aktif={mode === 'koleksi'} onClick={() => setMode('koleksi')}>
          <FaBookOpen /> Koleksi
        </SegmenTab>
        <SegmenTab aktif={mode === 'hitung'} onClick={() => setMode('hitung')}>
          <FaHandPointer /> Hitung
        </SegmenTab>
      </SegmenWadah>

      {mode === 'koleksi' && (
        <>
          {AYAT_REFERENSI_SHOLAWAT.map((a) => (
            <GoldCard key={`${a.surahId}-${a.nomorAyat}`}>
              <Lencana>
                <FaBookOpen aria-hidden="true" /> Dalil perintah bershalawat
              </Lencana>
              <p css={(t) => ({ fontWeight: 800, fontSize: 15.5, color: t.colors.judul, marginBottom: 6 })}>
                QS. Al-Ahzab [{a.surahId}]: {a.nomorAyat} — {a.tema}
              </p>
              <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, lineHeight: 1.6 })}>
                {a.sumber}
              </p>
            </GoldCard>
          ))}

          <SectionTitle>
            <FaBookOpen /> Koleksi Sholawat
          </SectionTitle>
          {SHOLAWAT_LIST.length === 0 ? (
            <StateKosong
              ikon={<FaBookOpen />}
              judul="Belum ada sholawat"
              deskripsi="Koleksi sholawat belum tersedia saat ini."
            />
          ) : (
            SHOLAWAT_LIST.map((s) => (
              <KartuBacaan key={s.id}>
                <NamaBacaan>{s.nama}</NamaBacaan>
                {s.bisaDihitung && (
                  <Lencana>
                    <FaHandPointer aria-hidden="true" /> {labelHitung(s)}
                  </Lencana>
                )}
                <p className="arab" dir="rtl" lang="ar">{s.arab}</p>
                <p className="latin">{s.latin}</p>
                <p className="arti">{s.arti}</p>
                <p className="sumber">{s.sumber}</p>
              </KartuBacaan>
            ))
          )}

          <SectionTitle>
            <FaStar /> Keutamaan Sholawat
          </SectionTitle>
          {KEUTAMAAN_SHOLAWAT.map((k) => (
            <Card key={k.judul}>
              <p css={(t) => ({ fontWeight: 800, fontSize: 15.5, color: t.colors.judul, marginBottom: 6 })}>
                {k.judul}
              </p>
              <p css={(t) => ({ fontSize: 14.5, lineHeight: 1.65, color: t.colors.text })}>
                {k.isi}
              </p>
              <p css={(t) => ({ fontSize: 12.5, color: t.colors.faint, marginTop: 8 })}>
                Sumber: {k.sumber}
              </p>
            </Card>
          ))}

          <Card>
            <p css={(t) => ({ display: 'flex', gap: 8, fontSize: 13.5, lineHeight: 1.65, color: t.colors.muted })}>
              <FaInfoCircle css={(t) => ({ color: t.colors.goldDeep, flexShrink: 0, marginTop: 3 })} aria-hidden="true" />
              <span>{CATATAN_CAKUPAN_SHOLAWAT}</span>
            </p>
          </Card>
        </>
      )}

      {mode === 'hitung' && (
        <>
          <SectionTitle css={{ marginTop: 0 }}>Pilih Sholawat</SectionTitle>
          {bisaDihitung.length === 0 || !pilihan ? (
            <StateKosong
              ikon={<FaHandPointer />}
              judul="Tidak ada bacaan yang bisa dihitung"
              deskripsi="Belum ada sholawat dengan mode hitung saat ini."
            />
          ) : (
            <>
              {bisaDihitung.map((s) => (
                <Opsi
                  key={s.id}
                  aktif={pilihan.id === s.id}
                  onClick={() => { setPilihan(s); reset(); }}
                >
                  <span className="ar" dir="rtl" lang="ar">{s.arab}</span>
                  <span>
                    <div className="lat">{s.nama}</div>
                    <div className="ket">{labelHitung(s)}</div>
                  </span>
                </Opsi>
              ))}

              <CounterCard css={{ marginTop: 16 }}>
                <ArabBesar dir="rtl" lang="ar">{pilihan.arab}</ArabBesar>
                <p css={(t) => ({ fontSize: 13.5, color: t.colors.muted, lineHeight: 1.6, marginTop: 6 })}>
                  {pilihan.latin}
                </p>
                <p css={(t) => ({ fontSize: 12.5, fontWeight: 700, color: t.colors.goldDeep, marginTop: 8 })}>
                  {labelHitung(pilihan)}
                </p>
                <Angka>{hitung}</Angka>
                <div css={(t) => ({ fontSize: 12.5, color: t.colors.muted, marginBottom: 12 })}>
                  {persen.toFixed(0)}% dari target {target} · hitungan tersimpan selama halaman dibuka
                </div>
                <div>
                  <TombolHitung onClick={tap} aria-label={`Hitung ${pilihan.nama}`}>
                    <FaHandPointer />
                  </TombolHitung>
                </div>
                <div css={{ marginTop: 14 }}>
                  <GhostButton onClick={reset}>
                    <FaRedoAlt /> Reset
                  </GhostButton>
                </div>
              </CounterCard>

              <Card>
                <SectionTitle css={{ marginTop: 0 }}>
                  <FaCog /> Target hitungan
                </SectionTitle>
                <div css={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                  {TARGET_OPSI.map((t) => (
                    <TargetBtn key={t} aktif={target === t} onClick={() => setTarget(t)}>
                      {t}
                    </TargetBtn>
                  ))}
                </div>
                <Field>
                  <label htmlFor="target-sholawat-custom">Target khusus</label>
                  <TextInput
                    id="target-sholawat-custom"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    placeholder="Mis. 500"
                    value={targetCustom}
                    onChange={(e) => setTargetCustom(e.target.value)}
                  />
                </Field>
                <PrimaryButton onClick={terapkanTargetCustom}>
                  Terapkan Target
                </PrimaryButton>
              </Card>
            </>
          )}
        </>
      )}
    </Page>
  );
}
