/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { FaMoon, FaClock, FaCheck } from 'react-icons/fa';
import { JadwalRepositoryImpl } from '../../data/repositories/JadwalRepositoryImpl.js';
import { LocalTarawihRepository } from '../../data/repositories/LocalTarawihRepository.js';
import { KOTA_OPSI } from '../hooks/useJadwal.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle, LoadingBox, Spinner,
  ErrorBox, Field, SelectInput,
} from '../components/common.jsx';

// Halaman ini WAJIB tetap lazy chunk sendiri (di-wiring koordinator lewat
// lazyPages): jangan impor dari entry/common di luar komponen bersama yang
// memang sudah dipakai semua halaman.

const AngkaBesar = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 52px;
  font-weight: 700;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.judul};
`;

const TabelBungkus = styled.div`
  max-height: 430px;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
`;

const Tabel = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
  th, td {
    padding: 10px 10px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    white-space: nowrap;
  }
  th {
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }
  td.jam, th.jam {
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }
  tr.hari-ini td {
    background: ${({ theme }) => theme.colors.goldSoft};
    font-weight: 700;
  }
`;

const GridMalam = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const KotakMalam = styled.button`
  min-width: 44px;
  min-height: 52px;
  border-radius: 12px;
  border: 1.5px solid
    ${({ theme, selesai }) => (selesai ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, selesai }) => (selesai ? theme.colors.goldSoft : theme.colors.surface)};
  color: ${({ theme, selesai }) => (selesai ? theme.colors.goldDeep : theme.colors.text)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 15px;
  font-weight: 700;
  .cek {
    font-size: 12px;
    height: 12px;
  }
`;

const BarLuar = styled.div`
  height: 12px;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  overflow: hidden;
  margin-top: 10px;
`;

const BarIsi = styled.div`
  height: 100%;
  width: ${({ persen }) => persen}%;
  background: ${({ theme }) => theme.gradients.gold};
  transition: width ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
`;

/**
 * Target 1 Ramadan berikutnya dari tanggal Hijriah hari ini.
 * Endpoint Aladhan `nextRamadan` TIDAK ada (terverifikasi 404 pada
 * 2026-10-20 untuk varian timestamp/tahun/tanpa argumen), jadi target
 * dihitung dari konversi gToH hari ini + hToG untuk tanggal Masehinya:
 * bulan < 9 → Ramadan tahun ini; bulan 9 hari ke-1 → hari ini; selain itu
 * (sedang Ramadan lewat hari ke-1, atau bulan > 9) → tahun berikutnya.
 */
function hitungTargetRamadhan(hijri) {
  if (hijri.month < 9) return { tahun: hijri.year, sedangRamadhan: false };
  if (hijri.month === 9 && hijri.day === 1) return { tahun: hijri.year, sedangRamadhan: true };
  if (hijri.month === 9) return { tahun: hijri.year + 1, sedangRamadhan: true };
  return { tahun: hijri.year + 1, sedangRamadhan: false };
}

const tengahMalam = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export default function RamadhanPage() {
  const [kota, setKota] = useState('Sumedang');
  const [info, setInfo] = useState(null); // { hijri, target, tanggalTarget, sisaHari, trackerTahun }
  const [gagalInfo, setGagalInfo] = useState(false);
  const [imsakiyah, setImsakiyah] = useState(null);
  const [gagalImsakiyah, setGagalImsakiyah] = useState(false);
  const [malamMap, setMalamMap] = useState({});

  useEffect(() => {
    let batal = false;
    (async () => {
      try {
        const hariIni = new Date();
        const hijri = await JadwalRepositoryImpl.getHijriahTanggal(hariIni);
        const target = hitungTargetRamadhan(hijri);
        const tanggalTarget = await JadwalRepositoryImpl.getMasehiDariHijriah(1, 9, target.tahun);
        const sisaHari = Math.round((tengahMalam(tanggalTarget) - tengahMalam(hariIni)) / 86400000);
        // Tracker mengikuti Ramadan yang SEDANG berjalan bila ada,
        // selain itu Ramadan target berikutnya.
        const trackerTahun = hijri.month === 9 ? hijri.year : target.tahun;
        if (!batal) {
          setInfo({ hijri, target, tanggalTarget, sisaHari, trackerTahun });
          setMalamMap(LocalTarawihRepository.loadTahun(trackerTahun));
        }
      } catch {
        if (!batal) setGagalInfo(true);
      }
    })();
    return () => {
      batal = true;
    };
  }, []);

  useEffect(() => {
    if (!info) return;
    let batal = false;
    setImsakiyah(null);
    setGagalImsakiyah(false);
    JadwalRepositoryImpl.getImsakiyahRamadhan(kota, info.target.tahun)
      .then((data) => {
        if (!batal) setImsakiyah(data);
      })
      .catch(() => {
        if (!batal) setGagalImsakiyah(true);
      });
    return () => {
      batal = true;
    };
  }, [info, kota]);

  const progres = useMemo(() => {
    const selesai = Object.values(malamMap).filter(Boolean).length;
    return { selesai, persen: Math.round((selesai / 30) * 100) };
  }, [malamMap]);

  const toggleMalam = (malam) => {
    if (!info) return;
    setMalamMap((prev) => {
      const baru = { ...prev, [malam]: !prev[malam] };
      if (!baru[malam]) delete baru[malam];
      LocalTarawihRepository.saveTahun(info.trackerTahun, baru);
      return baru;
    });
  };

  return (
    <Page>
      <PageTitle>
        <FaMoon /> Mode Ramadhan
      </PageTitle>
      <PageSubtitle>Hitung mundur Ramadan, imsakiyah sebulan penuh, dan tracker tarawih.</PageSubtitle>

      {gagalInfo && <ErrorBox>Gagal memuat perkiraan Ramadan. Periksa koneksi lalu coba lagi.</ErrorBox>}
      {!info && !gagalInfo && (
        <LoadingBox>
          <Spinner /> Menghitung jarak ke Ramadan…
        </LoadingBox>
      )}

      {info && (
        <>
          <GoldCard css={{ textAlign: 'center' }}>
            <div css={(t) => ({ fontSize: 13, color: t.colors.muted })}>
              Hari ini {info.hijri.day} {info.hijri.monthName} {info.hijri.year} H
            </div>
            {info.target.sedangRamadhan && info.sisaHari > 0 ? (
              <div css={{ marginTop: 10, fontSize: 15, fontWeight: 600 }}>
                Ramadan sedang berlangsung — semoga ibadahnya diterima Allah.
              </div>
            ) : null}
            <div css={{ marginTop: 8, fontSize: 13.5 }}>
              {info.sisaHari === 0 ? '1 Ramadan dimulai' : 'Menuju 1 Ramadan berikutnya'}
            </div>
            {info.sisaHari === 0 ? (
              <AngkaBesar>Hari Ini</AngkaBesar>
            ) : (
              <>
                <AngkaBesar>{info.sisaHari}</AngkaBesar>
                <div css={{ fontSize: 14, fontWeight: 600 }}>hari lagi</div>
              </>
            )}
            <div css={(t) => ({ marginTop: 8, fontSize: 14, color: t.colors.muted })}>
              Perkiraan 1 Ramadan {info.target.tahun} H:{' '}
              {info.tanggalTarget.toLocaleDateString('id-ID', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })}
            </div>
            <div css={(t) => ({ marginTop: 6, fontSize: 12.5, color: t.colors.muted })}>
              Perkiraan mengikuti kalender Hijriah Aladhan (metode Kemenag RI) — penetapan resmi menunggu sidang isbat.
            </div>
          </GoldCard>

          <SectionTitle>
            <FaClock /> Imsakiyah Ramadan {info.target.tahun} H
          </SectionTitle>
          <Field>
            <label htmlFor="kota-ramadhan">Kota</label>
            <SelectInput id="kota-ramadhan" value={kota} onChange={(e) => setKota(e.target.value)}>
              {KOTA_OPSI.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </SelectInput>
          </Field>
          {gagalImsakiyah && <ErrorBox>Gagal memuat imsakiyah. Periksa koneksi lalu coba lagi.</ErrorBox>}
          {!imsakiyah && !gagalImsakiyah && (
            <LoadingBox>
              <Spinner /> Memuat imsakiyah sebulan…
            </LoadingBox>
          )}
          {imsakiyah && (
            <Card>
              <TabelBungkus tabIndex={0} aria-label={`Tabel imsakiyah Ramadan ${info.target.tahun} Hijriah untuk ${kota}`}>
                <Tabel>
                  <thead>
                    <tr>
                      <th scope="col">Tanggal</th>
                      <th scope="col" className="jam">Imsak</th>
                      <th scope="col" className="jam">Subuh</th>
                      <th scope="col" className="jam">Magrib</th>
                    </tr>
                  </thead>
                  <tbody>
                    {imsakiyah.map((baris) => {
                      const hariIniDiRamadan =
                        info.hijri.month === 9 && baris.hijriDay === info.hijri.day;
                      return (
                        <tr key={baris.hijriDay} className={hariIniDiRamadan ? 'hari-ini' : undefined}>
                          <td>{baris.hijriDay} Ramadan — {baris.masehiLabel}</td>
                          <td className="jam">{baris.imsak}</td>
                          <td className="jam">{baris.subuh}</td>
                          <td className="jam">{baris.magrib}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Tabel>
              </TabelBungkus>
              <div css={(t) => ({ marginTop: 10, fontSize: 12.5, color: t.colors.muted })}>
                Jadwal untuk {kota}, metode Kementerian Agama RI. Gulir tabel untuk melihat seluruh bulan.
              </div>
            </Card>
          )}

          <SectionTitle>Tracker Tarawih {info.trackerTahun} H</SectionTitle>
          <Card>
            <div css={{ fontSize: 14 }}>
              <strong>{progres.selesai} dari 30 malam</strong> sudah ditandai ({progres.persen}%).
            </div>
            <BarLuar role="progressbar" aria-valuenow={progres.persen} aria-valuemin={0} aria-valuemax={100} aria-label="Progres tarawih">
              <BarIsi persen={progres.persen} />
            </BarLuar>
            <div css={{ height: 14 }} />
            <GridMalam>
              {Array.from({ length: 30 }).map((_, i) => {
                const malam = i + 1;
                const selesai = Boolean(malamMap[malam]);
                return (
                  <KotakMalam
                    key={malam}
                    type="button"
                    selesai={selesai}
                    aria-pressed={selesai}
                    aria-label={`Malam ke-${malam}${selesai ? ', tarawih selesai ditandai' : ', tandai tarawih selesai'}`}
                    onClick={() => toggleMalam(malam)}
                  >
                    <span>{malam}</span>
                    <span className="cek" aria-hidden="true">{selesai ? <FaCheck /> : null}</span>
                  </KotakMalam>
                );
              })}
            </GridMalam>
            <div css={(t) => ({ marginTop: 12, fontSize: 12.5, color: t.colors.muted })}>
              Malam ke-N mengikuti kalender Ramadan setempat: malam pertama adalah malam
              menjelang 1 Ramadan menurut ketetapan setempat, dan penomoran kotak ini
              mengikuti urutan malam Ramadan {info.trackerTahun} H tersebut. Centang
              tersimpan di perangkat ini.
            </div>
          </Card>
        </>
      )}
    </Page>
  );
}
