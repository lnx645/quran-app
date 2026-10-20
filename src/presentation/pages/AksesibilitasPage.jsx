/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaUniversalAccess, FaPalette, FaFont, FaVideo, FaBell, FaInfoCircle, FaCompass,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, SectionTitle,
} from '../components/common.jsx';
import { useAkses } from '../a11y/pengaturanStore.js';

/**
 * Halaman Pengaturan Aksesibilitas (/aksesibilitas).
 * Semua preferensi tersimpan otomatis di perangkat ini (localStorage):
 * tema tampilan, skala teks UI, font ramah disleksia, kurangi animasi,
 * sonifikasi kompas, pola getar kompas & adzan.
 */

const BarisSetelan = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .teks {
    flex: 1;
    min-width: 0;
  }
  .judul {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
  .desc {
    font-size: 12.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
`;

const Saklar = styled.button`
  flex-shrink: 0;
  width: 56px;
  height: 32px;
  border-radius: 999px;
  border: 2px solid
    ${({ theme, nyala }) => (nyala ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, nyala }) => (nyala ? theme.colors.primary : theme.colors.surfaceAlt)};
  position: relative;
  transition: background 0.18s ease;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: ${({ nyala }) => (nyala ? 'calc(100% - 27px)' : '3px')};
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${({ theme, nyala }) => (nyala ? theme.colors.goldLight : '#fff')};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    transition: left 0.18s ease;
  }
`;

const SegGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 4px;
`;

const SegBtn = styled.button`
  min-height: 48px;
  padding: 9px 8px;
  border-radius: 12px;
  border: 1.5px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, aktif }) => (aktif ? theme.colors.primarySoft : theme.colors.surface)};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 700;
`;

function Toggle({ judul, desc, nyala, onToggle, label }) {
  return (
    <BarisSetelan>
      <div className="teks">
        <div className="judul">{judul}</div>
        {desc && <div className="desc">{desc}</div>}
      </div>
      <Saklar
        type="button"
        role="switch"
        aria-checked={nyala}
        aria-label={label ?? judul}
        nyala={nyala}
        onClick={onToggle}
      />
    </BarisSetelan>
  );
}

const MODE_TEMA = [
  ['ikut', 'Ikut Sistem'],
  ['terang', 'Terang'],
  ['gelap', 'Mode Gelap'],
  ['kontras', 'Kontras Tinggi'],
];

const SKALA_TEKS = [
  [1, '100% — Normal'],
  [1.125, '112% — Lebih besar'],
  [1.25, '125% — Besar'],
];

export default function AksesibilitasPage() {
  const { pengaturan, ubah } = useAkses();

  return (
    <Page>
      <PageHero>
        <h2>
          <FaUniversalAccess /> Pengaturan Aksesibilitas
        </h2>
        <p>
          Atur tampilan, teks, gerakan, bunyi &amp; getar sesuai kebutuhanmu. Semua pilihan
          tersimpan otomatis di perangkat ini.
        </p>
      </PageHero>

      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaPalette /> Tema Tampilan
        </SectionTitle>
        <p css={{ fontSize: 13.5, lineHeight: 1.6, marginBottom: 10 }}>
          Mode gelap mengurangi silau; kontras tinggi membuat semua teks sangat jelas.
          &ldquo;Ikut Sistem&rdquo; mengikuti pengaturan gelap/terang HP-mu.
        </p>
        <SegGrid role="group" aria-label="Mode tema tampilan">
          {MODE_TEMA.map(([nilai, label]) => (
            <SegBtn
              key={nilai}
              type="button"
              aktif={pengaturan.modeTema === nilai}
              aria-pressed={pengaturan.modeTema === nilai}
              onClick={() => ubah({ modeTema: nilai })}
            >
              {label}
            </SegBtn>
          ))}
        </SegGrid>
      </Card>

      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaFont /> Teks &amp; Gerakan
        </SectionTitle>
        <div css={{ fontSize: 13.5, fontWeight: 700, marginBottom: 6 }}>Ukuran Teks Antarmuka</div>
        <SegGrid role="group" aria-label="Ukuran teks antarmuka">
          {SKALA_TEKS.map(([nilai, label]) => (
            <SegBtn
              key={nilai}
              type="button"
              aktif={pengaturan.skalaTeks === nilai}
              aria-pressed={pengaturan.skalaTeks === nilai}
              onClick={() => ubah({ skalaTeks: nilai })}
            >
              {label}
            </SegBtn>
          ))}
        </SegGrid>
        <Toggle
          judul="Font Ramah Disleksia"
          desc="Memakai huruf Atkinson Hyperlegible yang dirancang agar bentuk huruf mudah dibedakan (b/d, p/q, l/1)."
          nyala={pengaturan.fontDisleksia}
          onToggle={() => ubah({ fontDisleksia: !pengaturan.fontDisleksia })}
        />
        <Toggle
          judul="Kurangi Animasi"
          desc="Mematikan hampir semua animasi & transisi, di luar pengaturan sistem HP."
          nyala={pengaturan.kurangiGerakan}
          onToggle={() => ubah({ kurangiGerakan: !pengaturan.kurangiGerakan })}
        />
      </Card>

      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaCompass /> Kompas Kiblat Non-Visual
        </SectionTitle>
        <Toggle
          judul="Panduan Bunyi Kompas (Sonifikasi)"
          desc="Bunyi bip yang makin rapat saat arah hadap mendekati kiblat; stabil tinggi saat sejajar. Tombolnya juga ada di halaman kiblat."
          nyala={pengaturan.sonifikasi}
          onToggle={() => ubah({ sonifikasi: !pengaturan.sonifikasi })}
        />
        <Toggle
          judul="Getar Bertingkat Kompas"
          desc="Getar saat mendekati kiblat: 2× pada 10°, lebih rapat pada 5°, panjang saat sejajar. Tidak berlaku di iPhone (Safari tidak mendukung getar web)."
          nyala={pengaturan.getar}
          onToggle={() => ubah({ getar: !pengaturan.getar })}
        />
      </Card>

      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaBell /> Waktu Sholat
        </SectionTitle>
        <Toggle
          judul="Getar Khas Saat Adzan"
          desc="Pola getar berbeda untuk tiap waktu sholat saat waktunya masuk (halaman Jadwal terbuka), menemani banner visual yang menetap."
          nyala={pengaturan.getarAdzan}
          onToggle={() => ubah({ getarAdzan: !pengaturan.getarAdzan })}
        />
      </Card>

      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaInfoCircle /> Tentang Aksesibilitas Noor
        </SectionTitle>
        <div css={{ fontSize: 13.5, lineHeight: 1.7 }}>
          <p css={{ marginBottom: 8 }}>
            Noor dirancang mengikuti pedoman WCAG 2.2 AA: semua fitur bisa dioperasikan
            keyboard &amp; screen reader, teks berkontras cukup, target sentuh besar, dan
            setiap penanda penting hadir di lebih dari satu indra (visual + bunyi/getar +
            pengumuman suara).
          </p>
          <p css={{ marginBottom: 8 }}>
            Di halaman kiblat ada tombol <strong>“Sebutkan Arah”</strong> yang membacakan
            derajat kiblat &amp; instruksi putar. Di halaman jadwal, masuknya waktu sholat
            diumumkan lewat banner menetap, bunyi, getar, dan pengumuman screen reader.
          </p>
          <p>
            Yang masih dalam rencana (pekerjaan konten &amp; uji manusia, bukan kode): video
            bahasa isyarat BISINDO untuk makna doa/dzikir, serta uji pakai bersama pengguna
            disabilitas sebelum klaim kesesuaian penuh. Masukan soal hambatan akses sangat
            diterima.
          </p>
        </div>
      </Card>

      <Card css={{ textAlign: 'center' }}>
        <FaVideo css={{ fontSize: 20, margin: '0 auto 6px' }} aria-hidden="true" />
        <p css={{ fontSize: 13, lineHeight: 1.6 }}>
          Pengaturan ini hanya berlaku di perangkat &amp; browser ini — tidak ada data yang
          dikirim ke server.
        </p>
      </Card>
    </Page>
  );
}
