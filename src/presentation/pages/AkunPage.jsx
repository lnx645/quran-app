/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaUserCircle,
  FaEnvelope,
  FaGoogle,
  FaSync,
  FaSignOutAlt,
  FaTrash,
  FaInfoCircle,
} from 'react-icons/fa';
import {
  Page,
  PageTitle,
  PageSubtitle,
  Card,
  SectionTitle,
  PrimaryButton,
  GhostButton,
} from '../components/common.jsx';
import { useDialog } from '../components/feedback/dialogStore.js';
import { useToast } from '../components/feedback/toastStore.js';
import {
  konfigurasiSinkron,
  ambilKlien,
  sinkronkanSekarang,
  unggahAwan,
  terapkanAwan,
  hapusAwan,
  kumpulkanSnapshot,
  bacaMetaSinkron,
} from '../../data/platform/sinkronisasi.js';

const Teks = styled.p`
  font-size: 14px;
  line-height: 1.7;
  margin: 0 0 10px;
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${(p) => p.theme.colors.muted};
  margin: 10px 0 0;
  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

const Daftar = styled.ul`
  margin: 6px 0 12px;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.75;
`;

const InputEmail = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  font-size: 15px;
  border-radius: ${(p) => p.theme.radii.md}px;
  border: 1px solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  margin-bottom: 10px;
`;

const BarisTombol = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

/**
 * /akun — akun & sinkronisasi awan OPSIONAL (Supabase). Tanpa akun
 * aplikasi tetap 100% lokal. Halaman menangani tiga keadaan: fitur
 * belum diaktifkan pemilik situs (belum ada konfigurasi), belum
 * masuk, dan sudah masuk (status + sinkron + keluar + hapus data awan).
 */
export default function AkunPage() {
  const dialog = useDialog();
  const toast = useToast();
  const terkonfigurasi = !!konfigurasiSinkron();
  const [klien, setKlien] = useState(null);
  // undefined = memuat; null = tidak masuk / fitur tidak aktif.
  const [sesi, setSesi] = useState(() => (terkonfigurasi ? undefined : null));
  const [email, setEmail] = useState('');
  const [tautanTerkirim, setTautanTerkirim] = useState(false);
  const [sibuk, setSibuk] = useState(false);
  const [meta, setMeta] = useState(() => bacaMetaSinkron());

  useEffect(() => {
    if (!terkonfigurasi) return undefined;
    let hidup = true;
    let langganan;
    ambilKlien().then((k) => {
      if (!hidup || !k) return;
      setKlien(k);
      k.auth.getSession().then(({ data }) => {
        if (hidup) setSesi(data.session ?? null);
      });
      langganan = k.auth.onAuthStateChange((_ev, session) => {
        if (hidup) setSesi(session ?? null);
      }).data.subscription;
    });
    return () => {
      hidup = false;
      langganan?.unsubscribe();
    };
  }, [terkonfigurasi]);

  const jalankanSinkron = async (pengguna) => {
    if (!klien || !pengguna) return;
    setSibuk(true);
    try {
      const hasil = await sinkronkanSekarang(klien, pengguna.id);
      if (hasil.arah === 'konflik') {
        const pakaiAwan = await dialog.confirm({
          judul: 'Data Berbeda di Dua Sisi',
          pesan:
            'Data di perangkat ini DAN data di awan sama-sama berubah sejak sinkronisasi terakhir. Pilih data mana yang dipertahankan — sisi yang tidak dipilih akan ditimpa.',
          teksYa: 'Pakai Data Awan',
          teksTidak: 'Pakai Data Perangkat Ini',
        });
        if (pakaiAwan) {
          terapkanAwan(hasil.awan);
          toast.sukses('Data awan diterapkan. Halaman dimuat ulang…');
          setTimeout(() => window.location.reload(), 800);
        } else {
          await unggahAwan(klien, pengguna.id, kumpulkanSnapshot());
          toast.sukses('Data perangkat ini diunggah ke awan.');
        }
      } else if (hasil.arah === 'tarik') {
        toast.sukses('Data terbaru dari awan diterapkan. Halaman dimuat ulang…');
        setTimeout(() => window.location.reload(), 800);
      } else if (hasil.arah === 'unggah') {
        toast.sukses('Data perangkat ini diunggah ke awan.');
      } else {
        toast.sukses('Sudah mutakhir — tidak ada perubahan di kedua sisi.');
      }
      setMeta(bacaMetaSinkron());
    } catch (e) {
      toast.error(`Sinkronisasi gagal: ${e?.message ?? 'periksa koneksi internet'}`);
    } finally {
      setSibuk(false);
    }
  };

  const masukEmail = async () => {
    if (!klien || !email.includes('@')) {
      toast.peringatan('Isi alamat email yang benar dulu.');
      return;
    }
    setSibuk(true);
    try {
      const { error } = await klien.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/akun` },
      });
      if (error) throw error;
      setTautanTerkirim(true);
    } catch (e) {
      toast.error(`Gagal mengirim tautan: ${e?.message ?? 'coba lagi'}`);
    } finally {
      setSibuk(false);
    }
  };

  const masukGoogle = async () => {
    if (!klien) return;
    setSibuk(true);
    try {
      const { error } = await klien.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/akun` },
      });
      if (error) throw error;
    } catch (e) {
      toast.error(`Gagal memulai masuk Google: ${e?.message ?? 'coba lagi'}`);
      setSibuk(false);
    }
  };

  const keluar = async () => {
    if (!klien) return;
    await klien.auth.signOut();
    setSesi(null);
    toast.sukses('Anda sudah keluar. Data di perangkat ini tidak berubah.');
  };

  const hapusDataAwan = async (pengguna) => {
    const yakin = await dialog.confirm({
      judul: 'Hapus Data Awan?',
      pesan:
        'Potret data yang tersimpan di awan akan dihapus permanen. Data di perangkat ini TIDAK ikut terhapus, dan Anda bisa sinkron lagi kapan saja.',
      teksYa: 'Hapus Data Awan',
      teksTidak: 'Batal',
      bahaya: true,
    });
    if (!yakin || !klien) return;
    setSibuk(true);
    try {
      await hapusAwan(klien, pengguna.id);
      setMeta({});
      toast.sukses('Data awan dihapus.');
    } catch (e) {
      toast.error(`Gagal menghapus: ${e?.message ?? 'coba lagi'}`);
    } finally {
      setSibuk(false);
    }
  };

  return (
    <Page>
      <PageTitle>
        <FaUserCircle /> Akun &amp; Sinkronisasi
      </PageTitle>
      <PageSubtitle>
        Pindahkan progres ibadah antarperangkat — sepenuhnya opsional.
      </PageSubtitle>

      <Card>
        <Teks>
          <strong>Tanpa akun pun NurQalam berjalan penuh</strong> — semua data
          tersimpan di perangkat Anda. Akun hanya diperlukan bila Anda ingin
          progres yang sama muncul di HP lain atau peramban lain.
        </Teks>
        <Daftar>
          <li>Yang disinkronkan: penanda &amp; progres baca, streak, tracker, hafalan, jurnal, dan pengaturan.</li>
          <li>
            Yang <strong>tidak</strong> disinkronkan: data &amp; PIN Muslimah
            (privat — tetap di perangkat) dan berkas unduhan audio (khas perangkat).
          </li>
          <li>Data awan disimpan di Supabase dan hanya bisa diakses akun Anda sendiri.</li>
        </Daftar>
      </Card>

      <SectionTitle>Status</SectionTitle>
      {!terkonfigurasi ? (
        <Card>
          <Teks>
            Sinkronisasi awan <strong>belum diaktifkan</strong> pada salinan
            aplikasi ini oleh pengelolanya. Semua fitur lain tetap berjalan
            normal tanpa akun.
          </Teks>
          <Catatan>
            <FaInfoCircle /> <span>Pengelola situs: panduan aktivasi ada di berkas
            supabase/README.md pada repositori aplikasi.</span>
          </Catatan>
        </Card>
      ) : sesi === undefined ? (
        <Card>
          <Teks>Memuat status akun…</Teks>
        </Card>
      ) : !sesi ? (
        <Card>
          {tautanTerkirim ? (
            <>
              <Teks>
                <strong>Tautan masuk terkirim</strong> ke {email}. Buka email
                itu di perangkat ini lalu ketuk tautannya — Anda akan kembali
                ke halaman ini dalam keadaan masuk.
              </Teks>
              <Catatan>
                <FaInfoCircle /> <span>Tidak menerima email? Periksa folder spam, atau
                kirim ulang beberapa saat lagi.</span>
              </Catatan>
            </>
          ) : (
            <>
              <Teks>Masuk dengan tautan email (tanpa kata sandi) atau akun Google:</Teks>
              <InputEmail
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="alamat@email.anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Alamat email"
              />
              <BarisTombol>
                <PrimaryButton onClick={masukEmail} disabled={sibuk}>
                  <FaEnvelope /> Kirim Tautan Masuk
                </PrimaryButton>
                <GhostButton onClick={masukGoogle} disabled={sibuk}>
                  <FaGoogle /> Masuk dengan Google
                </GhostButton>
              </BarisTombol>
            </>
          )}
        </Card>
      ) : (
        <Card>
          <Teks>
            Masuk sebagai <strong>{sesi.user.email}</strong>.
          </Teks>
          <Teks>
            {meta.terakhirPada
              ? `Sinkronisasi terakhir: ${new Date(meta.terakhirPada).toLocaleString('id-ID')}.`
              : 'Belum pernah sinkronisasi dari perangkat ini.'}
          </Teks>
          <BarisTombol>
            <PrimaryButton onClick={() => jalankanSinkron(sesi.user)} disabled={sibuk}>
              <FaSync /> Sinkronkan Sekarang
            </PrimaryButton>
            <GhostButton onClick={keluar} disabled={sibuk}>
              <FaSignOutAlt /> Keluar
            </GhostButton>
            <GhostButton onClick={() => hapusDataAwan(sesi.user)} disabled={sibuk}>
              <FaTrash /> Hapus Data Awan
            </GhostButton>
          </BarisTombol>
          <Catatan>
            <FaInfoCircle /> <span>Sinkronisasi berjalan saat Anda menekan tombolnya —
            tidak ada pengiriman data diam-diam di latar.</span>
          </Catatan>
        </Card>
      )}
    </Page>
  );
}
