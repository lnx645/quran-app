/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaMoon, FaCalendarAlt, FaBookOpen, FaHandsHelping, FaQuoteRight } from 'react-icons/fa';
import { PERISTIWA_ISLAM } from '../../data/sources/peristiwaData.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle,
} from '../components/common.jsx';

// Halaman /peristiwa — 4 peristiwa Islam (Maulid, Isra Mi'raj,
// Nuzulul Qur'an, Tahun Baru Hijriah). Semua peristiwa ditampilkan
// dalam satu halaman dengan jangkar id per peristiwa; tautan dari
// KalenderPage berbentuk /peristiwa#<slug> dan halaman ini menggulir
// ke jangkar tersebut saat hash ada.
// Dataset (peristiwaData.js) HANYA diimpor di sini agar ikut chunk
// lazy halaman ini.

const KartuPeristiwa = styled(Card)`
  scroll-margin-top: 84px;
`;

const Kepala = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  .ikon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.goldSoft};
    color: ${({ theme }) => theme.colors.goldDeep};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
  }
  .nama {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.judul};
  }
  .tgl {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 3px;
  }
`;

const Paragraf = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 12px;
`;

const SubJudul = styled.h3`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 18px;
  margin-bottom: 8px;
`;

const DaftarKegiatan = styled.ul`
  padding-left: 20px;
  li {
    font-size: 14px;
    line-height: 1.65;
    margin-bottom: 5px;
  }
`;

const Kutipan = styled.blockquote`
  border-left: 4px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.goldSoft};
  border-radius: 0 12px 12px 0;
  padding: 12px 14px;
  margin-top: 10px;
  .teks {
    font-size: 14px;
    line-height: 1.7;
    font-style: italic;
  }
  .sumber {
    font-size: 12.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 6px;
  }
`;

const TautanKalender = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 4px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function PeristiwaPage() {
  // Gulir ke jangkar dari tautan Kalender (/peristiwa#<slug>).
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <Page>
      <PageTitle>
        <FaMoon /> Peristiwa Islam
      </PageTitle>
      <PageSubtitle>
        Empat peristiwa dan peringatan besar dalam Islam: kapan diperingati, apa yang terjadi,
        dan kegiatan yang umum dilakukan untuk mengambil pelajaran darinya.
      </PageSubtitle>

      <GoldCard>
        <div css={{ fontSize: 14, lineHeight: 1.7 }}>
          Tanggal-tanggal di halaman ini adalah tanggal Hijriah yang masyhur dipakai untuk
          peringatan masing-masing peristiwa. Untuk melihat tanggal Masehinya pada tahun
          berjalan, buka{' '}
          <TautanKalender to="/kalender">
            <FaCalendarAlt aria-hidden="true" /> Kalender Hijriah
          </TautanKalender>
        </div>
      </GoldCard>

      {PERISTIWA_ISLAM.map((p) => (
        <KartuPeristiwa key={p.slug} id={p.slug}>
          <Kepala>
            <span className="ikon" aria-hidden="true">
              <FaMoon />
            </span>
            <span>
              <span className="nama">{p.nama}</span>
              <br />
              <span className="tgl">
                <FaCalendarAlt aria-hidden="true" /> {p.tanggalHijriah}
              </span>
            </span>
          </Kepala>

          {p.ringkasan.map((teks) => (
            <Paragraf key={teks.slice(0, 32)}>{teks}</Paragraf>
          ))}

          <SubJudul>
            <FaHandsHelping aria-hidden="true" /> Kegiatan yang Umum Dilakukan
          </SubJudul>
          <DaftarKegiatan>
            {p.kegiatan.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </DaftarKegiatan>

          <SubJudul>
            <FaBookOpen aria-hidden="true" /> Dalil &amp; Rujukan
          </SubJudul>
          {p.rujukan.map((r) => (
            <Kutipan key={r.sumber}>
              <p className="teks">
                <FaQuoteRight aria-hidden="true" /> {r.teks}
              </p>
              <p className="sumber">{r.sumber}</p>
            </Kutipan>
          ))}
        </KartuPeristiwa>
      ))}

      <SectionTitle>Catatan</SectionTitle>
      <Card>
        <p css={{ fontSize: 13.5, lineHeight: 1.7 }}>
          Ringkasan di halaman ini ditulis sebagai bahan edukasi umum dengan nada netral.
          Dalam beberapa hal — misalnya tanggal pasti suatu peristiwa dan hukum memeringati
          Maulid Nabi — para ulama memiliki perbedaan pendapat yang tercatat dalam kitab-kitab
          mereka; pembaca dianjurkan mendalaminya lewat majelis ilmu dan guru yang terpercaya.
        </p>
      </Card>
    </Page>
  );
}
