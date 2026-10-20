/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { FaCalendarAlt, FaStar, FaMoon, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchGToH, fetchHToG } from '../../data/aladhanApi.js';
import { JadwalRepositoryImpl } from '../../data/repositories/JadwalRepositoryImpl.js';
import { HARI_BESAR } from '../../data/sources/hariBesarData.js';
import {
  puasaSunnahPadaHari, cariPuasaSunnahBerikutnya, INFO_PUASA_DAUD,
} from '../../domain/usecases/hitungPuasaSunnah.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle, LoadingBox, Spinner,
} from '../components/common.jsx';

const HariBesarBaris = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 4px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .ikon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.goldSoft};
    color: ${({ theme }) => theme.colors.goldDeep};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .nama {
    font-weight: 600;
    font-size: 15px;
  }
  .tgl {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
  }
  .kanan {
    margin-left: auto;
    text-align: right;
    font-size: 12.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const KepalaBulan = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  .label-bulan {
    flex: 1;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 17px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
  }
`;

const TombolBulan = styled.button`
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
`;

const GridKalender = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  .kepala-hari {
    text-align: center;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.muted};
    padding: 4px 0;
  }
`;

const SelTanggal = styled.button`
  min-height: 52px;
  padding: 5px 2px;
  border-radius: 12px;
  border: 1.5px solid
    ${({ theme, terpilih }) => (terpilih ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, terpilih, hariIni }) =>
    terpilih ? theme.colors.goldSoft : hariIni ? theme.colors.primarySoft : theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  .tgl-masehi {
    font-size: 15px;
    font-weight: ${({ hariIni }) => (hariIni ? 800 : 600)};
    line-height: 1.15;
  }
  .tgl-hijri {
    font-size: 10.5px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.15;
  }
`;

const TitikPuasa = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gold};
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.goldSoft};
`;

const Legenda = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 12px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.muted};
  .item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .kotak-ini {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.primarySoft};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const BarisTerdekat = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 4px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .ikon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.goldSoft};
    color: ${({ theme }) => theme.colors.goldDeep};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .nama {
    font-weight: 600;
    font-size: 14.5px;
  }
  .tgl {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const NAMA_BULAN_HIJRIAH = {
  Muharram: 'Muharram', 'Ṣafar': 'Safar', "Rabīʿ al-awwal": 'Rabiulawal',
  'Rabīʿ al-thānī': 'Rabiulakhir', 'Jumādá al-ūlá': 'Jumadil Ula',
  'Jumādá al-ākhirah': 'Jumadil Akhir', Rajab: 'Rajab', "Shaʿbān": "Sya'ban",
  'Ramaḍān': 'Ramadan', 'Shawwāl': 'Syawal', 'Dhū al-Qaʿdah': "Dzulqa'dah",
  'Dhū al-Ḥijjah': 'Dzulhijjah',
};
const namaBulanHijriah = (en) => NAMA_BULAN_HIJRIAH[en] ?? en ?? '';

const kunciTgl = (y, m, d) => `${y}-${m}-${d}`;
const HARI_KEPALA = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Ahd'];

export default function KalenderPage() {
  const [hijriahHariIni, setHijriahHariIni] = useState(null);
  const [daftar, setDaftar] = useState(null);

  const sekarang = useMemo(() => new Date(), []);
  const [view, setView] = useState({ bulan: sekarang.getMonth() + 1, tahun: sekarang.getFullYear() });
  const [selBulan, setSelBulan] = useState(null);
  const [gagalBulan, setGagalBulan] = useState(false);
  const [kunciTerpilih, setKunciTerpilih] = useState(() =>
    kunciTgl(sekarang.getFullYear(), sekarang.getMonth() + 1, sekarang.getDate())
  );
  const [terdekat, setTerdekat] = useState(null);

  useEffect(() => {
    let batal = false;
    const hariIni = new Date();
    fetchGToH(hariIni)
      .then(async (h) => {
        if (batal) return;
        setHijriahHariIni(h);
        const tahun = Number(h.year);
        // Konversi tiap hari besar (tahun berjalan Hijriah) ke Masehi.
        const hasil = await Promise.all(
          HARI_BESAR.map(async (hb) => {
            const str = `${String(hb.hari).padStart(2, '0')}-${String(hb.bulanHijriah).padStart(2, '0')}-${tahun}`;
            let masehi = null;
            try {
              const g = await fetchHToG(str);
              masehi = `${g.day} ${g.month?.en ?? ''} ${g.year}`;
            } catch {
              /* tampilkan Hijriah saja */
            }
            return { ...hb, tahunHijriah: tahun, masehi };
          })
        );
        if (!batal) setDaftar(hasil);
      })
      .catch(() => {
        if (!batal) {
          // API gagal: tampilkan Hijriah saja tanpa konversi.
          setHijriahHariIni(null);
          setDaftar(HARI_BESAR.map((hb) => ({ ...hb, tahunHijriah: null, masehi: null })));
        }
      });
    return () => {
      batal = true;
    };
  }, []);

  // Grid satu bulan Masehi: SATU panggilan gToHCalendar per bulan.
  useEffect(() => {
    let batal = false;
    setSelBulan(null);
    setGagalBulan(false);
    JadwalRepositoryImpl.getKalenderMasehiSebulan(view.bulan, view.tahun)
      .then((data) => {
        if (!batal) setSelBulan(data);
      })
      .catch(() => {
        if (!batal) setGagalBulan(true);
      });
    return () => {
      batal = true;
    };
  }, [view]);

  // Puasa sunnah terdekat: resolver dari peta Hijriah 4 bulan ke depan
  // (4 panggilan kalender bulanan, bukan per hari).
  useEffect(() => {
    let batal = false;
    (async () => {
      try {
        const bulanList = [0, 1, 2, 3].map((i) => {
          const d = new Date(sekarang.getFullYear(), sekarang.getMonth() + i, 1);
          return { bulan: d.getMonth() + 1, tahun: d.getFullYear() };
        });
        const hasilBulan = await Promise.all(
          bulanList.map((b) => JadwalRepositoryImpl.getKalenderMasehiSebulan(b.bulan, b.tahun))
        );
        const peta = new Map();
        hasilBulan.flat().forEach((sel) => {
          peta.set(kunciTgl(sel.masehi.year, sel.masehi.month, sel.masehi.day), sel.hijri);
        });
        const resolver = (tgl) => peta.get(kunciTgl(tgl.getFullYear(), tgl.getMonth() + 1, tgl.getDate())) ?? null;
        const daftarTerdekat = cariPuasaSunnahBerikutnya({
          dariTanggal: sekarang, jumlah: 5, batasHari: 125, resolver,
        });
        if (!batal) setTerdekat(daftarTerdekat);
      } catch {
        if (!batal) setTerdekat([]);
      }
    })();
    return () => {
      batal = true;
    };
  }, [sekarang]);

  const geserBulan = (arah) => {
    setView((v) => {
      const d = new Date(v.tahun, v.bulan - 1 + arah, 1);
      return { bulan: d.getMonth() + 1, tahun: d.getFullYear() };
    });
  };

  const selTerpilih = useMemo(() => {
    if (!selBulan) return null;
    const sel = selBulan.find(
      (s) => kunciTgl(s.masehi.year, s.masehi.month, s.masehi.day) === kunciTerpilih
    );
    if (!sel) return null;
    return { ...sel, puasa: puasaSunnahPadaHari({ hijri: sel.hijri, weekday: sel.masehi.weekday }) };
  }, [selBulan, kunciTerpilih]);

  const labelBulan = new Date(view.tahun, view.bulan - 1, 1).toLocaleDateString('id-ID', {
    month: 'long', year: 'numeric',
  });
  const offsetAwal = selBulan?.length ? (selBulan[0].masehi.weekday + 6) % 7 : 0;
  const kunciHariIni = kunciTgl(sekarang.getFullYear(), sekarang.getMonth() + 1, sekarang.getDate());

  const tanggalMasehiStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Page>
      <PageTitle>
        <FaCalendarAlt /> Kalender Hijriah
      </PageTitle>
      <PageSubtitle>Tanggal hari ini dan hari-hari besar Islam tahun Hijriah berjalan.</PageSubtitle>

      <GoldCard css={{ textAlign: 'center' }}>
        <div css={(t) => ({ fontSize: 13, color: t.colors.muted })}>{tanggalMasehiStr}</div>
        {hijriahHariIni ? (
          <>
            <div css={{ fontFamily: "'Playfair Display', serif", fontSize: 27, fontWeight: 700, marginTop: 4 }}>
              {hijriahHariIni.day} {hijriahHariIni.month?.en} {hijriahHariIni.year} H
            </div>
            <div className="arabic" lang="ar" css={{ fontSize: 26, marginTop: 2 }}>
              {hijriahHariIni.month?.ar}
            </div>
          </>
        ) : (
          <div css={{ marginTop: 8, fontSize: 14 }}>Masehi: {tanggalMasehiStr} (konversi Hijriah tidak tersedia)</div>
        )}
      </GoldCard>

      <SectionTitle>Kalender Bulan Ini</SectionTitle>
      <Card>
        <KepalaBulan>
          <TombolBulan type="button" onClick={() => geserBulan(-1)} aria-label="Bulan sebelumnya">
            <FaChevronLeft aria-hidden="true" />
          </TombolBulan>
          <span className="label-bulan">{labelBulan}</span>
          <TombolBulan type="button" onClick={() => geserBulan(1)} aria-label="Bulan berikutnya">
            <FaChevronRight aria-hidden="true" />
          </TombolBulan>
        </KepalaBulan>

        {gagalBulan && <div css={{ fontSize: 14 }}>Kalender bulan ini tidak dapat dimuat. Periksa koneksi lalu coba lagi.</div>}
        {!selBulan && !gagalBulan && (
          <LoadingBox>
            <Spinner /> Memuat kalender…
          </LoadingBox>
        )}
        {selBulan && (
          <>
            <GridKalender role="grid" aria-label={`Kalender ${labelBulan}`}>
              {HARI_KEPALA.map((h) => (
                <span key={h} className="kepala-hari" aria-hidden="true">{h}</span>
              ))}
              {Array.from({ length: offsetAwal }).map((_, i) => (
                <span key={`kosong-${i}`} aria-hidden="true" />
              ))}
              {selBulan.map((sel) => {
                const kunci = kunciTgl(sel.masehi.year, sel.masehi.month, sel.masehi.day);
                const puasa = puasaSunnahPadaHari({ hijri: sel.hijri, weekday: sel.masehi.weekday });
                const labelPuasa = puasa.length ? `, puasa sunnah: ${puasa.map((p) => p.nama).join(', ')}` : '';
                return (
                  <SelTanggal
                    key={kunci}
                    type="button"
                    terpilih={kunci === kunciTerpilih}
                    hariIni={kunci === kunciHariIni}
                    aria-pressed={kunci === kunciTerpilih}
                    aria-label={`${sel.masehi.day} ${labelBulan}, ${sel.hijri.day} ${namaBulanHijriah(sel.hijri.monthName)} ${sel.hijri.year} Hijriah${labelPuasa}`}
                    onClick={() => setKunciTerpilih(kunci)}
                  >
                    <span className="tgl-masehi">{sel.masehi.day}</span>
                    <span className="tgl-hijri">{sel.hijri.day} H</span>
                    {puasa.length > 0 ? <TitikPuasa aria-hidden="true" /> : <span css={{ height: 8 }} aria-hidden="true" />}
                  </SelTanggal>
                );
              })}
            </GridKalender>
            <Legenda>
              <span className="item"><TitikPuasa aria-hidden="true" /> Hari puasa sunnah</span>
              <span className="item"><span className="kotak-ini" aria-hidden="true" /> Hari ini</span>
              <span className="item">Angka kecil = tanggal Hijriah</span>
            </Legenda>
          </>
        )}

        {selTerpilih && (
          <div css={{ marginTop: 16 }} aria-live="polite">
            <div css={(t) => ({ fontWeight: 700, fontSize: 15, color: t.colors.judul })}>
              {new Date(selTerpilih.masehi.year, selTerpilih.masehi.month - 1, selTerpilih.masehi.day).toLocaleDateString('id-ID', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })}
            </div>
            <div css={(t) => ({ fontSize: 13.5, color: t.colors.muted, marginTop: 2 })}>
              {selTerpilih.hijri.day} {namaBulanHijriah(selTerpilih.hijri.monthName)} {selTerpilih.hijri.year} H
            </div>
            {selTerpilih.puasa.length > 0 ? (
              <ul css={{ marginTop: 10, paddingLeft: 18 }}>
                {selTerpilih.puasa.map((p) => (
                  <li key={p.kunci} css={{ marginBottom: 6, fontSize: 14 }}>
                    <strong>{p.nama}</strong> — {p.keterangan}
                  </li>
                ))}
              </ul>
            ) : (
              <div css={{ marginTop: 10, fontSize: 14 }}>Tidak ada puasa sunnah khusus pada tanggal ini.</div>
            )}
            <div css={(t) => ({ marginTop: 8, fontSize: 12.5, color: t.colors.muted })}>{INFO_PUASA_DAUD}</div>
          </div>
        )}
      </Card>

      <SectionTitle>Puasa Sunnah Terdekat</SectionTitle>
      {!terdekat ? (
        <LoadingBox>
          <Spinner /> Mencari puasa sunnah berikutnya…
        </LoadingBox>
      ) : terdekat.length === 0 ? (
        <Card><div css={{ fontSize: 14 }}>Puasa sunnah terdekat tidak ditemukan. Periksa koneksi lalu coba lagi.</div></Card>
      ) : (
        <Card>
          {terdekat.map((item) => (
            <BarisTerdekat key={item.tanggal.toISOString()}>
              <span className="ikon"><FaMoon aria-hidden="true" /></span>
              <span>
                <div className="nama">{item.puasa.map((p) => p.nama).join(' · ')}</div>
                <div className="tgl">
                  {item.tanggal.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  {' — '}
                  {item.hijri.day} {item.hijri.monthName ? namaBulanHijriah(item.hijri.monthName) : item.hijri.month} {item.hijri.year} H
                </div>
              </span>
            </BarisTerdekat>
          ))}
        </Card>
      )}

      <SectionTitle>Hari Besar Islam</SectionTitle>
      {!daftar ? (
        <LoadingBox>
          <Spinner /> Mengonversi tanggal…
        </LoadingBox>
      ) : (
        <Card>
          {daftar.map((hb) => (
            <HariBesarBaris key={`${hb.nama}-${hb.hari}`}>
              <span className="ikon">
                <FaStar />
              </span>
              <span>
                <div className="nama">{hb.nama}</div>
                <div className="tgl">
                  {hb.hari} {hb.namaBulan}
                  {hb.tahunHijriah ? ` ${hb.tahunHijriah} H` : ''}
                </div>
              </span>
              <span className="kanan">{hb.masehi ?? '—'}</span>
            </HariBesarBaris>
          ))}
        </Card>
      )}
    </Page>
  );
}
