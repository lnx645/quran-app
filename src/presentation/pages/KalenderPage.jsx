/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaCalendarAlt, FaStar } from 'react-icons/fa';
import { fetchGToH, fetchHToG } from '../../data/aladhanApi.js';
import { HARI_BESAR } from '../../data/sources/hariBesarData.js';
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
    color: #7A5B00;
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

export default function KalenderPage() {
  const [hijriahHariIni, setHijriahHariIni] = useState(null);
  const [daftar, setDaftar] = useState(null);

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
        <div css={{ fontSize: 13, color: '#6B7A72' }}>{tanggalMasehiStr}</div>
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
