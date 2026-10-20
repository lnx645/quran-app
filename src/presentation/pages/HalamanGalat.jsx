/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { FaExclamationTriangle, FaRedo, FaHome } from 'react-icons/fa';
import { Page, PrimaryButton, GhostButton } from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import {
  adalahGalatChunk,
  penandaPemulihanBaruSaja,
  pasangPenandaPemulihan,
} from '../../app/pemulihanChunk.js';

/**
 * HalamanGalat — errorElement router: pengganti layar galat bawaan
 * React Router ("Unexpected Application Error!" + tumpukan teks mentah).
 * Prinsip: jangan pernah menampilkan teks teknis mentah ke pengguna —
 * tampilkan penjelasan ramah + jalan keluar (muat ulang / ke Beranda).
 * Komponen ini sengaja mandiri & sederhana agar tidak ikut gagal saat
 * halaman lain bermasalah.
 */
export default function HalamanGalat() {
  const galat = useRouteError();
  const tidakDitemukan = galat?.status === 404;

  // Pulih sendiri untuk galat chunk basi (shell lama meminta chunk yang
  // sudah tidak ada setelah deploy): tampilkan keadaan "memperbarui" lalu
  // muat ulang SEKALI. Penanda sessionStorage yang sama dengan
  // lazyDenganPemulihan menjaga agar tidak terjadi loop — bila penanda
  // masih segar, halaman galat biasa yang tampil.
  const perluPulih =
    !tidakDitemukan && adalahGalatChunk(galat) && !penandaPemulihanBaruSaja();
  useEffect(() => {
    if (!perluPulih) return undefined;
    pasangPenandaPemulihan();
    const t = setTimeout(() => window.location.reload(), 700);
    return () => clearTimeout(t);
  }, [perluPulih]);

  if (perluPulih) {
    return (
      <Page>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '56px 8px 40px',
          }}
          role="status"
          aria-live="polite"
        >
          <NomorMedali nomor="↻" ukuran={64} />
          <h1
            css={(t) => ({
              fontFamily: t.fonts.display,
              fontSize: 24,
              fontWeight: 700,
              color: t.colors.judul,
              marginTop: 20,
            })}
          >
            Memperbarui Aplikasi
          </h1>
          <p
            css={(t) => ({
              fontSize: 14.5,
              lineHeight: 1.7,
              color: t.colors.muted,
              maxWidth: 340,
              marginTop: 9,
            })}
          >
            Memperbarui aplikasi ke versi terbaru…
          </p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '56px 8px 40px',
        }}
      >
        <span css={{ position: 'relative', display: 'inline-flex' }}>
          <NomorMedali nomor="!" ukuran={64} />
        </span>
        <h1
          css={(t) => ({
            fontFamily: t.fonts.display,
            fontSize: 24,
            fontWeight: 700,
            color: t.colors.judul,
            marginTop: 20,
          })}
        >
          {tidakDitemukan ? 'Halaman Tidak Ditemukan' : 'Terjadi Kendala'}
        </h1>
        <p
          css={(t) => ({
            fontSize: 14.5,
            lineHeight: 1.7,
            color: t.colors.muted,
            maxWidth: 340,
            marginTop: 9,
          })}
        >
          {tidakDitemukan
            ? 'Alamat yang Anda tuju tidak ada di Noor. Silakan kembali ke Beranda dan lanjutkan dari sana.'
            : 'Halaman ini mengalami gangguan sesaat. Coba muat ulang — data dan progres Anda tersimpan aman di perangkat.'}
        </p>
        <div
          css={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 22,
          }}
        >
          <PrimaryButton type="button" onClick={() => window.location.reload()}>
            <FaRedo aria-hidden="true" /> Muat Ulang
          </PrimaryButton>
          <GhostButton as={Link} to="/">
            <FaHome aria-hidden="true" /> Ke Beranda
          </GhostButton>
        </div>
        <p
          css={(t) => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: t.colors.faint,
            marginTop: 26,
          })}
        >
          <FaExclamationTriangle aria-hidden="true" />
          Bila berulang, catat halaman terakhir yang dibuka lalu kabari pengembang.
        </p>
      </div>
    </Page>
  );
}
