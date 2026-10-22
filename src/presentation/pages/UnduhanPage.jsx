/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaDownload, FaTrash, FaBookOpen } from 'react-icons/fa';
import {
  Page,
  PageTitle,
  PageSubtitle,
  Card,
  GhostButton,
} from '../components/common.jsx';
import StateKosong from '../components/StateKosong.jsx';
import { useDialog } from '../components/feedback/dialogStore.js';
import { useToast } from '../components/feedback/toastStore.js';
import {
  dukungUnduhanMurottal,
  daftarUnduhan,
  totalUkuranUnduhan,
  hapusUnduhan,
  formatUkuran,
} from '../../data/platform/unduhanMurottal.js';
import { fetchChapters } from '../../data/quranApi.js';

const Baris = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const Nama = styled.div`
  font-weight: 700;
`;

const Meta = styled.div`
  font-size: 12.5px;
  color: ${(p) => p.theme.colors.muted};
  margin-top: 2px;
`;

const Catatan = styled.p`
  font-size: 13px;
  line-height: 1.65;
  color: ${(p) => p.theme.colors.muted};
`;

/**
 * /unduhan — kelola unduhan murottal offline (web/PWA). Daftar surah
 * yang berkas audionya tersimpan di perangkat, ukuran total, dan hapus
 * per surah / semua. Nama surah dilengkapi dari API/cache bab.
 */
export default function UnduhanPage() {
  const dialog = useDialog();
  const toast = useToast();
  const [daftar, setDaftar] = useState(() => daftarUnduhan());
  const [namaSurah, setNamaSurah] = useState({});
  const [estimasi, setEstimasi] = useState(null);
  const dukung = dukungUnduhanMurottal();

  useEffect(() => {
    let hidup = true;
    fetchChapters()
      .then((bab) => {
        if (!hidup) return;
        const peta = {};
        for (const b of bab ?? []) peta[b.id] = b.name_simple;
        setNamaSurah(peta);
      })
      .catch(() => {});
    if (navigator.storage?.estimate) {
      navigator.storage
        .estimate()
        .then((e) => {
          if (hidup) setEstimasi(e);
        })
        .catch(() => {});
    }
    return () => {
      hidup = false;
    };
  }, []);

  const segarkan = () => setDaftar(daftarUnduhan());

  const hapusSatu = async (item) => {
    await hapusUnduhan(item.nomor);
    segarkan();
    toast.sukses(
      `Unduhan ${namaSurah[item.nomor] ?? `Surah ${item.nomor}`} dihapus.`,
    );
  };

  const hapusSemua = async () => {
    const yakin = await dialog.confirm({
      judul: 'Hapus semua unduhan?',
      pesan: `${daftar.length} berkas audio (${formatUkuran(totalUkuranUnduhan())}) akan dihapus dari perangkat. Surah tetap bisa diputar selama ada internet, dan bisa diunduh lagi kapan saja.`,
      teksYa: 'Hapus Semua',
      teksTidak: 'Batal',
      bahaya: true,
    });
    if (!yakin) return;
    for (const item of daftar) {
      // eslint-disable-next-line no-await-in-loop
      await hapusUnduhan(item.nomor);
    }
    segarkan();
    toast.sukses('Semua unduhan audio dihapus.');
  };

  return (
    <Page>
      <PageTitle>
        <FaDownload /> Unduhan Murottal
      </PageTitle>
      <PageSubtitle>
        Surah yang audionya tersimpan di perangkat ini — bisa diputar tanpa
        internet dari halaman surahnya.
      </PageSubtitle>

      {!dukung ? (
        <Card>
          <Catatan>
            Unduhan offline memakai penyimpanan peramban (service worker),
            jadi fitur ini tersedia di <strong>versi web</strong>{' '}
            (nurqalam.my.id — bisa dipasang sebagai aplikasi dari peramban).
            Di aplikasi Android, audio tetap diputar lewat internet seperti
            biasa.
          </Catatan>
        </Card>
      ) : daftar.length === 0 ? (
        <StateKosong
          ikon={<FaDownload />}
          judul="Belum ada unduhan"
          deskripsi="Buka halaman surah mana pun, lalu ketuk tombol Unduh Audio di bawah judul surah. Berkasnya tersimpan di sini dan surah itu bisa didengar tanpa internet."
        />
      ) : (
        <>
          <Card>
            {daftar.map((item) => (
              <Baris key={item.nomor}>
                <FaBookOpen aria-hidden />
                <Info>
                  <Nama>
                    {item.nomor}. {namaSurah[item.nomor] ?? 'Surah'}
                  </Nama>
                  <Meta>
                    {formatUkuran(item.ukuran)} • diunduh{' '}
                    {new Date(item.pada).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Meta>
                </Info>
                <Link to={`/surah/${item.nomor}`}>
                  <GhostButton as="span">Buka</GhostButton>
                </Link>
                <GhostButton
                  onClick={() => hapusSatu(item)}
                  aria-label={`Hapus unduhan surah ${item.nomor}`}
                >
                  <FaTrash /> Hapus
                </GhostButton>
              </Baris>
            ))}
          </Card>
          <Card css={{ marginTop: 14 }}>
            <Catatan>
              Total unduhan: <strong>{formatUkuran(totalUkuranUnduhan())}</strong>
              {estimasi?.usage
                ? ` • seluruh data aplikasi di perangkat ini memakai ±${formatUkuran(estimasi.usage)}.`
                : '.'}{' '}
              Audio adalah berkas bab utuh qari Mishary Al-Afasy; menghapus
              unduhan tidak menghapus progres baca atau data lainnya.
            </Catatan>
            <GhostButton onClick={hapusSemua} css={{ marginTop: 10 }}>
              <FaTrash /> Hapus Semua Unduhan
            </GhostButton>
          </Card>
        </>
      )}
    </Page>
  );
}
