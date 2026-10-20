/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
  FaHeart, FaChevronLeft, FaChevronRight, FaCalendarDay, FaSave, FaTrash,
  FaHistory, FaLock, FaPen, FaBookOpen,
} from 'react-icons/fa';
import { LocalJurnalSyukurRepository } from '../../data/repositories/LocalJurnalSyukurRepository.js';
import { AYAT_PILIHAN } from '../../data/sources/ayatPilihanData.js';
import { kunciTanggal } from '../hooks/useSholatTracker.js';
import { useToast } from '../components/feedback/toastStore.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle, TextInput, Field,
  PrimaryButton, GhostButton,
} from '../components/common.jsx';
import StateKosong from '../components/StateKosong.jsx';

// Ayat pendorong: QS. Ibrahim ayat 7. Entri ini ADA di ayatPilihanData.js
// ({ surahId: 14, nomorAyat: 7, tema: 'Syukur menambah nikmat' }), tetapi
// berkas itu SENGAJA hanya memuat referensi { surahId, nomorAyat, tema } —
// TANPA teks ayat (teks resmi diambil runtime dari QuranRepositoryImpl di
// komponen AyatHariIni). Karena tidak ada teks untuk diimpor, halaman ini
// menampilkan REFERENSI + parafrase tema saja, tanpa mengklaim kutipan,
// dan menautkan ke halaman surah untuk teks resmi.
const AYAT_SYUKUR = AYAT_PILIHAN.find((a) => a.surahId === 14 && a.nomorAyat === 7) ?? {
  surahId: 14,
  nomorAyat: 7,
  tema: 'Syukur menambah nikmat',
};

const ENTRI_KOSONG = { syukur: ['', '', ''], refleksi: '' };

const parseKunci = (kunci) => {
  const [y, m, d] = kunci.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const geserKunci = (kunci, hari) => {
  const t = parseKunci(kunci);
  t.setDate(t.getDate() + hari);
  return kunciTanggal(t);
};

const fmtTanggalPanjang = (kunci) =>
  new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(parseKunci(kunci));

const fmtTanggalSingkat = (kunci) =>
  new Intl.DateTimeFormat('id-ID', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  }).format(parseKunci(kunci));

const samaEntri = (a, b) =>
  a.refleksi === b.refleksi && a.syukur.every((s, i) => s === b.syukur[i]);

// Navigasi tanggal & baris riwayat mengikuti pola MutabaahPage (GhostButton
// bersama, metrik kotak tidak diubah).
const NavTanggal = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const LabelTanggal = styled.div`
  flex: 1;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 16.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.judul};
  padding: 8px 4px;
`;

// Textarea refleksi — pola aplikasi (samakan TextInput di BookmarkPage:
// border 1.5px, radius 14px, cincin fokus primarySoft).
const AreaTeks = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 12px 14px;
  font-size: 15px;
  line-height: 1.55;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  font-family: inherit;
  transition: border-color ${({ theme }) => theme.anim.fast} ease,
    box-shadow ${({ theme }) => theme.anim.fast} ease;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primarySoft};
  }
`;

const BarisAksi = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

const BarisRiwayat = styled(GhostButton)`
  width: 100%;
  justify-content: flex-start;
  text-align: left;
  margin-bottom: 10px;
  .isi {
    min-width: 0;
  }
  .tgl {
    display: block;
    font-size: 13px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
  }
  .cuplikan {
    display: block;
    font-size: 13.5px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.muted};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const PLACEHOLDER_SYUKUR = [
  'Nikmat pertama yang terasa hari ini…',
  'Nikmat kedua — sekecil apa pun tetap nikmat…',
  'Nikmat ketiga — mungkin dari orang di sekitarmu…',
];

export default function JurnalSyukurPage() {
  const toast = useToast();
  const [semua, setSemua] = useState(() => LocalJurnalSyukurRepository.loadSemua());
  const kunciHariIni = kunciTanggal();
  const [kunciPilih, setKunciPilih] = useState(kunciHariIni);
  const [draf, setDraf] = useState(() => LocalJurnalSyukurRepository.loadTanggal(kunciHariIni));
  const adalahHariIni = kunciPilih === kunciHariIni;

  const tersimpan = semua[kunciPilih] ?? ENTRI_KOSONG;
  const kotor = !samaEntri(draf, tersimpan);
  const adaIsiTersimpan =
    tersimpan.syukur.some((s) => s.trim() !== '') || tersimpan.refleksi.trim() !== '';

  // Pola simpan (diputuskan untuk teks panjang, beda dari centang Mutabaah
  // yang seketika): tombol Simpan eksplisit + Toast konfirmasi, DITAMBAH
  // simpan senyap saat field kehilangan fokus (blur) dan sebelum berpindah
  // tanggal — supaya tulisan panjang tidak hilang.
  const simpan = (beriToast) => {
    const terbaru = LocalJurnalSyukurRepository.simpanTanggal(kunciPilih, draf);
    setSemua(terbaru);
    setDraf(terbaru[kunciPilih] ?? ENTRI_KOSONG);
    if (beriToast) toast.sukses('Jurnal syukur tersimpan.');
    return terbaru;
  };

  const simpanSenyapBilaKotor = () => {
    if (!kotor) return semua;
    const terbaru = LocalJurnalSyukurRepository.simpanTanggal(kunciPilih, draf);
    setSemua(terbaru);
    return terbaru;
  };

  const pindahTanggal = (kunciBaru) => {
    const data = simpanSenyapBilaKotor();
    setKunciPilih(kunciBaru);
    setDraf(data[kunciBaru] ?? ENTRI_KOSONG);
  };

  const ubahSyukur = (indeks, nilai) => {
    setDraf((lama) => {
      const syukur = [...lama.syukur];
      syukur[indeks] = nilai;
      return { ...lama, syukur };
    });
  };

  const hapusHariIni = () => {
    const terbaru = LocalJurnalSyukurRepository.hapusTanggal(kunciPilih);
    setSemua(terbaru);
    setDraf(ENTRI_KOSONG);
    toast.sukses('Jurnal tanggal ini dihapus.');
  };

  const riwayat = useMemo(
    () =>
      Object.keys(semua)
        .sort((a, b) => (a < b ? 1 : -1))
        .map((kunci) => {
          const entri = semua[kunci];
          const barisPertama =
            entri.syukur.find((s) => s.trim() !== '') ?? entri.refleksi.trim();
          return { kunci, cuplikan: barisPertama || '—' };
        }),
    [semua],
  );

  return (
    <Page>
      <PageTitle>
        <FaHeart /> Jurnal Syukur
      </PageTitle>
      <PageSubtitle>
        Luangkan sejenak menulis tiga hal yang kamu syukuri hari ini, lalu satu refleksi
        bebas. Melatih syukur menenangkan hati dan membuka pintu nikmat berikutnya.
      </PageSubtitle>

      <GoldCard>
        <p css={(t) => ({ fontSize: 12, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase', color: t.colors.goldDeep, marginBottom: 6 })}>
          Ayat Pendorong
        </p>
        <p css={(t) => ({ fontFamily: t.fonts.display, fontSize: 17, fontWeight: 700, color: t.colors.judul, marginBottom: 6 })}>
          QS. Ibrahim: 7
        </p>
        <p css={(t) => ({ fontSize: 14, lineHeight: 1.65, color: t.colors.muted })}>
          Tema ayat: {AYAT_SYUKUR.tema}. Allah menjanjikan bahwa hamba yang bersyukur
          akan ditambah nikmatnya — parafrase tema ini mengajak kita mencatat nikmat
          sekecil apa pun setiap hari, bukan sekadar merasakannya lewat begitu saja.
        </p>
        <Link
          to={`/surah/${AYAT_SYUKUR.surahId}?ayat=${AYAT_SYUKUR.nomorAyat}`}
          css={(t) => ({
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12,
            fontSize: 14, fontWeight: 700, color: t.colors.primary,
          })}
        >
          <FaBookOpen aria-hidden="true" /> Baca teks resmi ayat ini
        </Link>
      </GoldCard>

      <NavTanggal>
        <GhostButton
          type="button"
          onClick={() => pindahTanggal(geserKunci(kunciPilih, -1))}
          aria-label="Hari sebelumnya"
          css={{ padding: '12px 14px' }}
        >
          <FaChevronLeft aria-hidden="true" />
        </GhostButton>
        <LabelTanggal aria-live="polite">
          {adalahHariIni ? 'Hari ini — ' : ''}{fmtTanggalPanjang(kunciPilih)}
        </LabelTanggal>
        <GhostButton
          type="button"
          onClick={() => pindahTanggal(geserKunci(kunciPilih, 1))}
          disabled={adalahHariIni}
          aria-label="Hari berikutnya"
          css={{ padding: '12px 14px', opacity: adalahHariIni ? 0.4 : 1 }}
        >
          <FaChevronRight aria-hidden="true" />
        </GhostButton>
      </NavTanggal>
      {!adalahHariIni && (
        <div css={{ textAlign: 'center', marginBottom: 16 }}>
          <GhostButton type="button" onClick={() => pindahTanggal(kunciHariIni)}>
            <FaCalendarDay aria-hidden="true" /> Kembali ke hari ini
          </GhostButton>
        </div>
      )}

      <Card>
        {draf.syukur.map((nilai, i) => (
          <Field key={`${kunciPilih}-syukur-${i}`}>
            <label htmlFor={`syukur-${i}`}>Syukur ke-{i + 1}</label>
            <TextInput
              id={`syukur-${i}`}
              type="text"
              value={nilai}
              placeholder={PLACEHOLDER_SYUKUR[i]}
              onChange={(e) => ubahSyukur(i, e.target.value)}
              onBlur={simpanSenyapBilaKotor}
            />
          </Field>
        ))}

        <Field>
          <label htmlFor="jurnal-refleksi">
            <FaPen aria-hidden="true" /> Refleksi bebas
          </label>
          <AreaTeks
            id="jurnal-refleksi"
            value={draf.refleksi}
            placeholder="Apa yang kamu pelajari dari nikmat hari ini? Untuk siapa kamu berterima kasih?"
            onChange={(e) => setDraf((lama) => ({ ...lama, refleksi: e.target.value }))}
            onBlur={simpanSenyapBilaKotor}
          />
        </Field>

        <BarisAksi>
          <PrimaryButton type="button" disabled={!kotor} onClick={() => simpan(true)}>
            <FaSave aria-hidden="true" /> Simpan Jurnal
          </PrimaryButton>
          {adaIsiTersimpan && !kotor && (
            <GhostButton type="button" onClick={hapusHariIni}>
              <FaTrash aria-hidden="true" /> Hapus
            </GhostButton>
          )}
          <span
            aria-live="polite"
            css={(t) => ({ fontSize: 12.5, color: t.colors.faint, alignSelf: 'center' })}
          >
            {kotor ? 'Ada perubahan belum tersimpan.' : adaIsiTersimpan ? 'Sudah tersimpan.' : ''}
          </span>
        </BarisAksi>

        <p css={(t) => ({ fontSize: 12.5, color: t.colors.faint, marginTop: 14, display: 'flex', gap: 6, alignItems: 'center' })}>
          <FaLock aria-hidden="true" /> Jurnal ini hanya tersimpan di perangkat ini — tidak
          dikirim ke server mana pun.
        </p>
      </Card>

      <SectionTitle>
        <FaHistory /> Riwayat Jurnal
      </SectionTitle>
      {riwayat.length === 0 ? (
        <Card>
          <StateKosong
            ikon={<FaHeart />}
            judul="Belum Ada Jurnal"
            deskripsi="Tulis tiga syukur pertamamu di atas — riwayat hari-hari yang terisi akan muncul di sini."
          />
        </Card>
      ) : (
        <div>
          {riwayat.map((r) => (
            <BarisRiwayat
              key={r.kunci}
              type="button"
              onClick={() => pindahTanggal(r.kunci)}
              aria-label={`Buka jurnal ${fmtTanggalPanjang(r.kunci)}`}
              aria-current={r.kunci === kunciPilih ? 'date' : undefined}
            >
              <span className="isi">
                <span className="tgl">{fmtTanggalSingkat(r.kunci)}</span>
                <span className="cuplikan">{r.cuplikan}</span>
              </span>
            </BarisRiwayat>
          ))}
        </div>
      )}
    </Page>
  );
}
