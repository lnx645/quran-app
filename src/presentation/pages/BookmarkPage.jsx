/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaBookmark, FaBookOpen, FaCheck, FaExclamationTriangle, FaSave, FaTrash,
} from 'react-icons/fa';
import { LocalBookmarkRepository } from '../../data/repositories/LocalBookmarkRepository.js';
import { useDialog } from '../components/feedback/dialogStore.js';
import { useToast } from '../components/feedback/toastStore.js';
import {
  Page, PageHero, Card, SectionTitle, PrimaryButton,
} from '../components/common.jsx';
import StateKosong from '../components/StateKosong.jsx';

const KartuLink = styled(Link)`
  display: block;
  color: inherit;
`;

const KartuBookmark = styled(Card)`
  transition: border-color ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const Kepala = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  .judul {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
  }
  .meta {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 26px;
  line-height: 1.9;
  text-align: right;
  color: ${({ theme }) => theme.colors.teksArab};
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Terjemahan = styled.p`
  font-size: 13.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.teksTerjemah};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`;

const AreaCatatan = styled.div`
  label {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 6px;
  }
  textarea {
    width: 100%;
    min-height: 76px;
    padding: 12px 14px;
    font-size: 15px;
    line-height: 1.55;
    border: 1.5px solid ${({ theme }) => theme.colors.border};
    border-radius: 14px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    resize: vertical;
    font-family: inherit;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primarySoft};
    }
  }
`;

const BarisAksi = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const TombolHapus = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.danger};
  border: 1.5px solid ${({ theme }) => theme.colors.danger};
  border-radius: 14px;
  padding: 12px 16px;
  min-height: 48px;
  font-size: 14.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:active {
    transform: scale(0.97);
  }
`;

function ItemBookmark({ item, onSimpan, onHapus }) {
  const [catatan, setCatatan] = useState(item.catatan ?? '');
  const kotor = catatan !== (item.catatan ?? '');

  const cegahNavigasi = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <KartuBookmark>
      <KartuLink
        to={`/surah/${item.surahId}?ayat=${item.nomorAyat}`}
        aria-label={`Buka ${item.namaSurah} ayat ${item.nomorAyat}`}
      >
        <Kepala>
          <div>
            <div className="judul">{item.namaSurah}</div>
            <div className="meta">Ayat {item.nomorAyat}</div>
          </div>
          <FaBookmark aria-hidden="true" />
        </Kepala>
        {item.teksArab && (
          <Arab dir="rtl" lang="ar">
            {item.teksArab}
          </Arab>
        )}
        {item.terjemahan && <Terjemahan>{item.terjemahan}</Terjemahan>}
      </KartuLink>

      <AreaCatatan onClick={cegahNavigasi}>
        <label htmlFor={`catatan-${item.key}`}>Catatan pribadi</label>
        <textarea
          id={`catatan-${item.key}`}
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Tulis tadabbur atau catatan untuk ayat ini…"
          aria-label={`Catatan untuk ${item.namaSurah} ayat ${item.nomorAyat}`}
        />
      </AreaCatatan>

      <BarisAksi>
        <PrimaryButton
          type="button"
          disabled={!kotor}
          onClick={() => {
            onSimpan(item.key, catatan);
            // state lokal tetap; parent me-refresh daftar
          }}
          aria-label={`Simpan catatan ${item.namaSurah} ayat ${item.nomorAyat}`}
        >
          <FaSave /> Simpan Catatan
        </PrimaryButton>
        <TombolHapus
          type="button"
          onClick={() => onHapus(item)}
          aria-label={`Hapus bookmark ${item.namaSurah} ayat ${item.nomorAyat}`}
        >
          <FaTrash /> Hapus
        </TombolHapus>
        {item.dibuatPada && (
          <span
            css={(t) => ({
              alignSelf: 'center',
              fontSize: 12,
              color: t.colors.faint,
              marginLeft: 'auto',
            })}
          >
            <FaCheck aria-hidden="true" /> Tersimpan
          </span>
        )}
      </BarisAksi>
    </KartuBookmark>
  );
}

export default function BookmarkPage() {
  const dialog = useDialog();
  const toast = useToast();
  const [daftar, setDaftar] = useState(() => LocalBookmarkRepository.daftarBookmark());

  const simpanCatatan = (key, catatan) => {
    const baru = LocalBookmarkRepository.perbaruiCatatan(key, catatan);
    setDaftar(baru);
    toast.sukses('Catatan tersimpan.');
  };

  const hapus = async (item) => {
    const ya = await dialog.confirm({
      judul: 'Hapus Bookmark?',
      pesan: `Bookmark ${item.namaSurah} ayat ${item.nomorAyat} beserta catatannya akan dihapus. Tindakan ini tidak bisa dibatalkan.`,
      teksYa: 'Hapus',
      teksTidak: 'Batal',
      bahaya: true,
    });
    if (!ya) return;
    const baru = LocalBookmarkRepository.hapusBookmark(item.key);
    setDaftar(baru);
    toast.sukses('Bookmark dihapus.');
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaBookmark /> Bookmark &amp; Catatan
        </h2>
        <p>Ayat-ayat yang kamu tandai beserta catatan tadabburmu — tersimpan di perangkat ini.</p>
      </PageHero>

      {daftar.length === 0 ? (
        <Card>
          <StateKosong
            ikon={<FaBookmark />}
            judul="Belum Ada Bookmark"
            deskripsi="Ketuk ikon bookmark pada ayat mana pun saat membaca, lalu kembali ke sini untuk menulis catatanmu."
            aksi={
              <Link to="/quran" css={{ display: 'inline-block', width: 'min(300px, 100%)' }}>
                <PrimaryButton type="button" css={{ width: '100%' }}>
                  <FaBookOpen /> Lihat Daftar Surah
                </PrimaryButton>
              </Link>
            }
          />
        </Card>
      ) : (
        <>
          <SectionTitle>
            <FaBookmark /> {daftar.length} Ayat Ditandai
          </SectionTitle>
          {daftar.map((item) => (
            <ItemBookmark key={item.key} item={item} onSimpan={simpanCatatan} onHapus={hapus} />
          ))}
          <p css={(t) => ({ fontSize: 12.5, color: t.colors.faint, textAlign: 'center', marginTop: 8 })}>
            <FaExclamationTriangle aria-hidden="true" /> Ketuk kartu untuk membuka ayat di halaman surah.
          </p>
        </>
      )}
    </Page>
  );
}
