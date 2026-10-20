/** @jsxImportSource @emotion/react */
import { useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaDatabase, FaDownload, FaUpload, FaInfoCircle, FaFileExport, FaFileImport,
} from 'react-icons/fa';
import {
  Page, PageTitle, PageSubtitle, Card, SectionTitle, PrimaryButton, GhostButton,
} from '../components/common.jsx';
import StateKosong from '../components/StateKosong.jsx';
import { useDialog } from '../components/feedback/dialogStore.js';
import { useToast } from '../components/feedback/toastStore.js';

// Label ramah untuk kunci data Noor yang dikenal; kunci lain tampil apa adanya.
const LABEL_KUNCI = {
  'noor.sholat-tracker.v1': 'Sholat Tracker',
  'noor.mutabaah.v1': "Mutaba'ah Harian",
  'noor.qadha-puasa.v1': 'Qadha Puasa',
  'noor.khatam.v1': 'Progres Khatam',
  'noor.hafalan.v1': 'Hafalan (Tahfidz)',
  'noor.bookmark.v1': 'Bookmark Ayat',
  'noor.tarawih.v1': 'Tracker Tarawih',
  'noor.checklist-haji.v1': 'Checklist Haji & Umrah',
  'noor.jadwal.v1': 'Preferensi Jadwal (suara adzan, metode, iqamah)',
  'noor.prefBaca.v1': 'Preferensi Baca',
  'noor.terakhir-baca.v1': 'Terakhir Dibaca',
  'noor.qari.v1': 'Pilihan Qari',
  'noor.akses.v1': 'Pengaturan Aksesibilitas & Tampilan',
  'noor.kuis.v1': 'Skor Kuis',
  'noor.hafalan.prefs.v1': 'Preferensi Hafalan',
  'noor.muslimah.riwayat.v1': 'Riwayat Muslimah (privat)',
  'noor.muslimah.pinHash.v1': 'PIN Muslimah (tersimpan sebagai hash)',
};

const ukuranBytes = (teks) => new TextEncoder().encode(teks ?? '').length;
const fmtUkuran = (b) =>
  b < 1024 ? `${b} B` : `${(b / 1024).toLocaleString('id-ID', { maximumFractionDigits: 1 })} KB`;

/** Kumpulkan semua kunci localStorage berawalan `noor.` beserta ukurannya. */
function kumpulkanData() {
  const daftar = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const kunci = localStorage.key(i);
      if (!kunci || !kunci.startsWith('noor.')) continue;
      const nilai = localStorage.getItem(kunci) ?? '';
      daftar.push({ kunci, nilai, ukuran: ukuranBytes(kunci) + ukuranBytes(nilai) });
    }
  } catch {
    /* penyimpanan tidak tersedia */
  }
  return daftar.sort((a, b) => a.kunci.localeCompare(b.kunci));
}

/**
 * Nilai impor valid bila string DAN (JSON valid ATAU token skalar polos
 * seperti angka pada `noor.qari.v1` yang memang disimpan tanpa JSON).
 */
function nilaiValid(nilai) {
  if (typeof nilai !== 'string' || nilai.length === 0) return false;
  try {
    JSON.parse(nilai);
    return true;
  } catch {
    return /^[A-Za-z0-9._:+-]+$/.test(nilai);
  }
}

const BarisKunci = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .nama {
    font-weight: 600;
    font-size: 14px;
  }
  .kunci {
    font-size: 11.5px;
    color: ${({ theme }) => theme.colors.muted};
    word-break: break-all;
  }
  .ukuran {
    margin-left: auto;
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    white-space: nowrap;
  }
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

export default function DataProgresPage() {
  const dialog = useDialog();
  const toast = useToast();
  const inputBerkasRef = useRef(null);
  const [daftar, setDaftar] = useState(kumpulkanData);
  const [sibuk, setSibuk] = useState(false);

  const totalUkuran = useMemo(
    () => daftar.reduce((acc, d) => acc + d.ukuran, 0),
    [daftar],
  );

  const ekspor = () => {
    if (daftar.length === 0) {
      toast.peringatan('Belum ada data Noor yang bisa diekspor.');
      return;
    }
    const data = {};
    for (const d of daftar) data[d.kunci] = d.nilai;
    const berkas = {
      aplikasi: 'Noor',
      jenis: 'noor-data-progres',
      versi: 1,
      dieksporPada: new Date().toISOString(),
      data,
    };
    const blob = new Blob([JSON.stringify(berkas, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const tgl = new Date();
    const nama = `noor-data-progres-${tgl.getFullYear()}-${String(tgl.getMonth() + 1).padStart(2, '0')}-${String(tgl.getDate()).padStart(2, '0')}.json`;
    a.href = url;
    a.download = nama;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast.sukses(`Berkas ${nama} diunduh (${daftar.length} kunci data).`);
  };

  const prosesImpor = async (file) => {
    let parsed;
    try {
      parsed = JSON.parse(await file.text());
    } catch {
      toast.error('Berkas tidak valid: bukan JSON yang bisa dibaca.');
      return;
    }
    // Terima bentuk ekspor Noor ({ data: {...} }) maupun peta kunci datar.
    const peta =
      parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? parsed.data && typeof parsed.data === 'object' && !Array.isArray(parsed.data)
          ? parsed.data
          : parsed
        : null;
    if (!peta) {
      toast.error('Berkas tidak valid: struktur data Noor tidak ditemukan.');
      return;
    }
    const diterima = [];
    const ditolak = [];
    for (const [kunci, nilai] of Object.entries(peta)) {
      if (kunci.startsWith('noor.') && nilaiValid(nilai)) diterima.push([kunci, nilai]);
      else ditolak.push(kunci);
    }
    if (diterima.length === 0) {
      toast.error('Tidak ada data yang bisa diimpor: semua kunci ditolak validasi.');
      return;
    }
    const sepakat = await dialog.confirm({
      judul: 'Timpa Data di Perangkat Ini?',
      pesan:
        `${diterima.length} kunci data akan ditulis dan menimpa data Noor saat ini di perangkat ini` +
        (ditolak.length > 0 ? `. ${ditolak.length} kunci ditolak validasi dan dilewati` : '') +
        '. Halaman akan dimuat ulang setelah impor. Lanjutkan?',
      teksYa: 'Ya, Impor',
      teksTidak: 'Batal',
      bahaya: true,
    });
    if (!sepakat) return;
    setSibuk(true);
    try {
      for (const [kunci, nilai] of diterima) localStorage.setItem(kunci, nilai);
    } catch {
      setSibuk(false);
      toast.error('Impor gagal: penyimpanan perangkat tidak tersedia atau penuh.');
      return;
    }
    setDaftar(kumpulkanData());
    toast.sukses(`${diterima.length} kunci data berhasil diimpor. Memuat ulang…`, 2500);
    setTimeout(() => window.location.reload(), 900);
  };

  const onPilihBerkas = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) prosesImpor(file);
  };

  return (
    <Page>
      <PageTitle>
        <FaDatabase /> Data &amp; Progres
      </PageTitle>
      <PageSubtitle>
        Cadangkan seluruh data Noor di perangkat ini (tracker, progres, preferensi) ke satu berkas
        JSON, atau pulihkan dari berkas cadangan.
      </PageSubtitle>

      <SectionTitle>
        <FaFileExport /> Ekspor Data
      </SectionTitle>
      <Card>
        <p css={(t) => ({ fontSize: 14, lineHeight: 1.6, color: t.colors.text, marginBottom: 12 })}>
          {daftar.length > 0
            ? `${daftar.length} kunci data · total ${fmtUkuran(totalUkuran)}. Unduh berkasnya dan simpan di tempat aman untuk dipulihkan nanti atau dipindah ke perangkat lain.`
            : 'Belum ada data tersimpan di perangkat ini.'}
        </p>
        <PrimaryButton type="button" onClick={ekspor} disabled={daftar.length === 0} css={{ width: '100%' }}>
          <FaDownload /> Unduh Cadangan JSON
        </PrimaryButton>
        <Catatan css={{ marginTop: 12 }}>
          <FaInfoCircle /> Berkas cadangan memuat seluruh data lokal termasuk riwayat Muslimah dan
          hash PIN Muslimah — simpan berkas ini secara pribadi, jangan dibagikan.
        </Catatan>
      </Card>

      <SectionTitle>
        <FaFileImport /> Impor Data
      </SectionTitle>
      <Card>
        <p css={(t) => ({ fontSize: 14, lineHeight: 1.6, color: t.colors.text, marginBottom: 12 })}>
          Pilih berkas cadangan Noor (.json). Hanya kunci berawalan <strong>noor.</strong> dengan
          nilai valid yang ditulis; kamu akan diminta konfirmasi sebelum data saat ini ditimpa.
        </p>
        <input
          ref={inputBerkasRef}
          type="file"
          accept="application/json,.json"
          onChange={onPilihBerkas}
          aria-label="Pilih berkas cadangan JSON Noor"
          css={{ display: 'none' }}
        />
        <GhostButton
          type="button"
          onClick={() => inputBerkasRef.current?.click()}
          disabled={sibuk}
          css={{ width: '100%' }}
        >
          <FaUpload /> {sibuk ? 'Mengimpor…' : 'Pilih Berkas Cadangan'}
        </GhostButton>
      </Card>

      <SectionTitle>
        <FaInfoCircle /> Akses Offline
      </SectionTitle>
      <Card>
        <Catatan>
          <FaInfoCircle /> Surah yang pernah dibuka tersimpan untuk dibaca offline, begitu pula
          jadwal sholat yang pernah dimuat. Audio murottal tidak ikut tersimpan — berkas audio
          diputar langsung dari server penyedia (download.quranicaudio.com &amp; verses.quran.com),
          jadi memutar audio tetap membutuhkan koneksi internet.
        </Catatan>
      </Card>

      <SectionTitle>Data Tersimpan di Perangkat Ini</SectionTitle>
      <Card>
        {daftar.length === 0 ? (
          <StateKosong
            ikon={<FaDatabase />}
            judul="Belum ada data"
            deskripsi="Data akan muncul di sini setelah kamu memakai fitur tracker, progres, atau mengubah preferensi di Noor."
          />
        ) : (
          daftar.map((d) => (
            <BarisKunci key={d.kunci}>
              <span>
                <span className="nama">{LABEL_KUNCI[d.kunci] ?? d.kunci}</span>
                {LABEL_KUNCI[d.kunci] && (
                  <>
                    <br />
                    <span className="kunci">{d.kunci}</span>
                  </>
                )}
              </span>
              <span className="ukuran">{fmtUkuran(d.ukuran)}</span>
            </BarisKunci>
          ))
        )}
      </Card>
    </Page>
  );
}
