/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import { FaBaby, FaMars, FaVenus, FaUsers } from 'react-icons/fa';
import { NAMA_BAYI } from '../../data/sources/namaBayiData.js';
import {
  Page, PageTitle, PageSubtitle, Card, SectionTitle, TextInput, Field,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';

const FILTER_OPSI = [
  { kunci: 'semua', label: 'Semua', ikon: <FaUsers aria-hidden="true" /> },
  { kunci: 'L', label: 'Laki-laki', ikon: <FaMars aria-hidden="true" /> },
  { kunci: 'P', label: 'Perempuan', ikon: <FaVenus aria-hidden="true" /> },
];

export default function NamaBayiPage() {
  const [kueri, setKueri] = useState('');
  const [filter, setFilter] = useState('semua');

  const hasil = useMemo(() => {
    const q = kueri.trim().toLowerCase();
    return NAMA_BAYI.filter((n) => {
      if (filter !== 'semua' && n.jenis !== filter) return false;
      if (!q) return true;
      return (
        n.nama.toLowerCase().includes(q) ||
        n.arti.toLowerCase().includes(q) ||
        n.asal.toLowerCase().includes(q)
      );
    });
  }, [kueri, filter]);

  return (
    <Page>
      <PageTitle>
        <FaBaby /> Nama Bayi Islami
      </PageTitle>
      <PageSubtitle>
        Koleksi {NAMA_BAYI.length} nama Islami masyhur beserta arti dan asalnya — nama adalah doa,
        pilihlah yang baik maknanya.
      </PageSubtitle>

      <Field>
        <label htmlFor="cari-nama-bayi">Cari nama atau arti</label>
        <TextInput
          id="cari-nama-bayi"
          type="search"
          value={kueri}
          onChange={(e) => setKueri(e.target.value)}
          placeholder="cth. Muhammad, cahaya, mulia…"
          autoComplete="off"
        />
      </Field>

      <SegmenWadah role="tablist" aria-label="Filter jenis nama">
        {FILTER_OPSI.map((o) => (
          <SegmenTab
            key={o.kunci}
            aktif={filter === o.kunci}
            onClick={() => setFilter(o.kunci)}
            aria-label={`Tampilkan nama ${o.label.toLowerCase()}`}
          >
            {o.ikon} {o.label}
          </SegmenTab>
        ))}
      </SegmenWadah>

      <SectionTitle>
        {hasil.length} nama ditemukan
      </SectionTitle>

      {hasil.length === 0 ? (
        <Card>
          <p css={(t) => ({ fontSize: 14.5, color: t.colors.muted, textAlign: 'center' })}>
            Tidak ada nama yang cocok dengan pencarian “{kueri}”. Coba kata kunci lain, misalnya
            “cahaya”, “mulia”, atau “sabar”.
          </p>
        </Card>
      ) : (
        <div
          css={(t) => ({
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 12,
            marginBottom: 16,
            [`@media (min-width: ${t.breakpoints.md}px)`]: {
              gridTemplateColumns: '1fr 1fr',
            },
          })}
        >
          {hasil.map((n) => (
            <Card key={`${n.jenis}-${n.nama}`} css={{ marginBottom: 0 }}>
              <div
                css={(t) => ({
                  fontFamily: t.fonts.display,
                  fontSize: 22,
                  fontWeight: 700,
                  color: t.colors.judul,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                })}
              >
                {n.jenis === 'L'
                  ? <FaMars aria-hidden="true" css={(t) => ({ color: t.colors.primary, fontSize: 17 })} />
                  : <FaVenus aria-hidden="true" css={(t) => ({ color: t.colors.gold, fontSize: 17 })} />}
                {n.nama}
              </div>
              <p css={(t) => ({ fontSize: 14.5, color: t.colors.text, marginTop: 6, lineHeight: 1.55 })}>
                {n.arti}
              </p>
              <p css={(t) => ({ fontSize: 12.5, color: t.colors.muted, marginTop: 6 })}>
                {n.jenis === 'L' ? 'Laki-laki' : 'Perempuan'} • Asal: {n.asal}
              </p>
            </Card>
          ))}
        </div>
      )}

      <p css={(t) => ({ fontSize: 13, color: t.colors.muted })}>
        Arti nama diringkas dari makna yang dikenal umum dalam bahasa asalnya. Untuk rangkaian nama
        lengkap, padukan dua–tiga nama di atas dan konsultasikan maknanya kepada keluarga.
      </p>
    </Page>
  );
}
