/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { FaPalette, FaBookReader, FaMicrophone, FaListUl, FaRulerHorizontal } from 'react-icons/fa';
import {
  ATURAN_TAJWID,
  MAKHRAJ_HURUF,
  HUKUM_NUN_SUKUN,
  HUKUM_MAD,
} from '../../data/sources/tajwidData.js';
import { Page, PageTitle, PageSubtitle, Card, SectionTitle } from '../components/common.jsx';

/**
 * Panduan Tajwid (rute usulan: /panduan-tajwid).
 * Legenda warna membaca ATURAN_TAJWID + token tema `colors.tajwid` — peta
 * yang sama dengan parser & pewarnaan di halaman baca, jadi selalu sinkron.
 */

const KartuAturan = styled(Card)`
  .kepala {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  .sampel {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.paper};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 24px;
    line-height: 1.4;
  }
  .nama {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 16.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .titik {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
  .isi {
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
  }
  .contoh {
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.paper};
    border: 1px dashed ${({ theme }) => theme.colors.border};
  }
  .contoh .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 22px;
    line-height: 1.9;
    text-align: right;
  }
  .contoh .cara {
    font-size: 13px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 4px;
  }
`;

const KartuTeks = styled(Card)`
  .nama {
    font-size: 15px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 5px;
  }
  .isi {
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default function PanduanTajwidPage() {
  const tema = useTheme();
  const warna = tema.colors.tajwid ?? {};

  return (
    <Page>
      <PageTitle>
        <FaBookReader /> Panduan Tajwid
      </PageTitle>
      <PageSubtitle>
        Warna huruf di halaman baca menandai aturan tajwidnya. Aktifkan chip “Tajwid” saat
        membaca surah, lalu cocokkan warnanya dengan legenda di bawah ini.
      </PageSubtitle>

      <SectionTitle>
        <FaPalette /> Legenda Warna
      </SectionTitle>
      {ATURAN_TAJWID.map((a) => (
        <KartuAturan key={a.kelompok}>
          <div className="kepala">
            <span
              className="titik"
              style={{ background: warna[a.kelompok] ?? 'transparent' }}
              aria-hidden="true"
            />
            <span className="nama">{a.nama}</span>
          </div>
          <p className="isi">{a.penjelasan}</p>
          <div className="contoh">
            <p className="arab" dir="rtl" lang="ar" style={{ color: warna[a.kelompok] }}>
              {a.contohArab}
            </p>
            <p className="cara">{a.caraBaca}</p>
          </div>
        </KartuAturan>
      ))}

      <SectionTitle>
        <FaListUl /> Hukum Nun Sukun &amp; Tanwin
      </SectionTitle>
      {HUKUM_NUN_SUKUN.map((h) => (
        <KartuTeks key={h.nama}>
          <div className="nama">{h.nama}</div>
          <p className="isi">{h.isi}</p>
        </KartuTeks>
      ))}

      <SectionTitle>
        <FaRulerHorizontal /> Hukum Mad
      </SectionTitle>
      {HUKUM_MAD.map((h) => (
        <KartuTeks key={h.nama}>
          <div className="nama">{h.nama}</div>
          <p className="isi">{h.isi}</p>
        </KartuTeks>
      ))}

      <SectionTitle>
        <FaMicrophone /> Makhraj Huruf (Ringkas)
      </SectionTitle>
      {MAKHRAJ_HURUF.map((m) => (
        <KartuTeks key={m.tempat}>
          <div className="nama">{m.tempat}</div>
          <p className="isi">{m.isi}</p>
        </KartuTeks>
      ))}

      <PageSubtitle>
        Panduan ini ringkasan belajar mandiri. Untuk bacaan yang sahih, tetap berguru dan
        bertalaqqi kepada guru yang sanadnya bersambung.
      </PageSubtitle>
    </Page>
  );
}
