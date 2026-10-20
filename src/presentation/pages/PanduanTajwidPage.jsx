/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import {
  FaPalette,
  FaBookReader,
  FaMicrophone,
  FaListUl,
  FaRulerHorizontal,
  FaPauseCircle,
  FaPlayCircle,
  FaStopCircle,
} from 'react-icons/fa';
import {
  ATURAN_TAJWID,
  MAKHRAJ_HURUF,
  HUKUM_NUN_SUKUN,
  HUKUM_MAD,
} from '../../data/sources/tajwidData.js';
import { TANDA_WAQAF, PANDUAN_IBTIDA, WAQAF_AKHIR_AYAT } from '../../data/sources/waqafData.js';
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

const KartuWaqaf = styled(KartuAturan)`
  .sampel {
    min-width: 56px;
    width: auto;
    height: 56px;
    padding: 0 10px;
    font-size: 30px;
  }
  .hukum {
    display: inline-block;
    margin-top: 6px;
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.radii.pill}px;
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12.5px;
    font-weight: 700;
    line-height: 1.5;
  }
  .ref {
    font-size: 12.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 4px;
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
      <Card>
        <figure css={{ margin: 0 }}>
          <img
            src="/ilustrasi/makhraj-sakkaki.png"
            alt="Diagram makharijul huruf klasik karya as-Sakkaki: potongan mulut dan tenggorokan dengan letak titik keluar huruf — tenggorokan di kanan, lidah di tengah, dan bibir di kiri"
            loading="lazy"
            css={(t) => ({
              width: '100%',
              height: 'auto',
              borderRadius: 12,
              background: '#fff',
              border: `1px solid ${t.colors.border}`,
            })}
          />
          <figcaption
            css={(t) => ({ fontSize: 13, lineHeight: 1.6, color: t.colors.muted, marginTop: 8 })}
          >
            Diagram makhraj klasik dari kitab <em>Miftāḥ al-ʿUlūm</em> karya as-Sakkaki (abad
            ke-13): huruf-huruf tenggorokan tertulis di sisi kanan, huruf lidah di tengah, dan
            huruf bibir di sisi kiri — cocokkan dengan lima kelompok di bawah ini. Sumber:
            Wikimedia Commons (domain publik).
          </figcaption>
        </figure>
      </Card>
      {MAKHRAJ_HURUF.map((m) => (
        <KartuTeks key={m.tempat}>
          <div className="nama">{m.tempat}</div>
          <p className="isi">{m.isi}</p>
        </KartuTeks>
      ))}

      <SectionTitle>
        <FaPauseCircle /> Tanda Waqaf &amp; Ibtida’
      </SectionTitle>
      <KartuTeks>
        <div className="nama">Membaca tanda di mushaf Madinah</div>
        <p className="isi">
          Tanda-tanda berikut tercetak kecil di atas baris ayat mushaf Madinah; di panduan ini
          glifnya diperbesar agar mudah dikenali. Waqaf adalah berhenti mengambil napas untuk
          melanjutkan bacaan, sedangkan ibtida’ adalah cara memulai lagi sesudahnya — keduanya
          menentukan utuh tidaknya makna ayat.
        </p>
      </KartuTeks>
      {TANDA_WAQAF.map((w) => (
        <KartuWaqaf key={`${w.glif}-${w.nama}`}>
          <div className="kepala">
            <span className="sampel" dir="rtl" lang="ar" aria-label={`Tanda ${w.nama}`}>
              {w.glif}
            </span>
            <span>
              <span className="nama">{w.nama}</span>
              <span className="hukum">{w.hukum}</span>
            </span>
          </div>
          <p className="isi">{w.isi}</p>
          {w.contohArab ? (
            <div className="contoh">
              <p className="ref">{w.contohRef}</p>
              <p className="arab" dir="rtl" lang="ar">
                {w.contohArab}
              </p>
              <p className="cara">{w.contohKeterangan}</p>
            </div>
          ) : null}
        </KartuWaqaf>
      ))}

      <SectionTitle>
        <FaPlayCircle /> Ibtida’: Memulai Lagi Setelah Berhenti
      </SectionTitle>
      {PANDUAN_IBTIDA.map((p) => (
        <KartuTeks key={p.nama}>
          <div className="nama">{p.nama}</div>
          <p className="isi">{p.isi}</p>
        </KartuTeks>
      ))}

      <SectionTitle>
        <FaStopCircle /> Waqaf pada Akhir Ayat
      </SectionTitle>
      {WAQAF_AKHIR_AYAT.map((w) => (
        <KartuTeks key={w.nama}>
          <div className="nama">{w.nama}</div>
          <p className="isi">{w.isi}</p>
        </KartuTeks>
      ))}

      <PageSubtitle>
        Panduan ini ringkasan belajar mandiri. Untuk bacaan yang sahih, tetap berguru dan
        bertalaqqi kepada guru yang sanadnya bersambung.
      </PageSubtitle>
    </Page>
  );
}
