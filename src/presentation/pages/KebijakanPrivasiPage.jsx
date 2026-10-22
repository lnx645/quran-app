/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaShieldAlt } from 'react-icons/fa';
import {
  Page, PageHero, Card, SectionTitle,
} from '../components/common.jsx';

/**
 * Halaman Kebijakan Privasi (/kebijakan-privasi).
 * Menjelaskan data yang disimpan lokal, layanan pihak ketiga, dan iklan
 * (Google AdSense) secara jujur & ringkas. Halaman ini juga merupakan
 * syarat peninjauan AdSense dan keterbukaan kepada pengguna.
 */

const Teks = styled.p`
  font-size: ${({ theme }) => theme.type.bodySm.size}px;
  line-height: ${({ theme }) => theme.type.bodySm.lineHeight};
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Daftar = styled.ul`
  margin: 0 0 10px;
  padding-left: 18px;
  &:last-child {
    margin-bottom: 0;
  }
  li {
    font-size: ${({ theme }) => theme.type.bodySm.size}px;
    line-height: ${({ theme }) => theme.type.bodySm.lineHeight};
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default function KebijakanPrivasiPage() {
  return (
    <Page>
      <PageHero
        icon={<FaShieldAlt />}
        title="Kebijakan Privasi"
        desc="Bagaimana NurQalam memperlakukan data Anda. Terakhir diperbarui: 22 Oktober 2026."
      />

      <SectionTitle>Ringkasan</SectionTitle>
      <Card>
        <Teks>
          NurQalam adalah aplikasi Al-Qur&rsquo;an &amp; ibadah yang bekerja <strong>tanpa akun</strong>.
          Kami tidak meminta pendaftaran, tidak mengumpulkan data pribadi ke server, dan tidak
          menjual data kepada siapa pun. Hampir seluruh data Anda tersimpan <strong>di perangkat
          Anda sendiri</strong>.
        </Teks>
      </Card>

      <SectionTitle>Data yang Disimpan di Perangkat Anda</SectionTitle>
      <Card>
        <Teks>
          Agar fitur berjalan, aplikasi menyimpan data berikut secara lokal di peramban/aplikasi
          Anda (localStorage), antara lain:
        </Teks>
        <Daftar>
          <li>Penanda ayat, catatan, dan posisi terakhir dibaca.</li>
          <li>Profil keluarga lokal dan progres ibadah (streak, target, tracker sholat, khatam).</li>
          <li>Pengaturan tampilan, bahasa, dan pengingat.</li>
          <li>Catatan pribadi seperti jurnal syukur, utang puasa, dan tabungan qurban.</li>
        </Daftar>
        <Teks>
          Data ini tidak meninggalkan perangkat Anda kecuali Anda sendiri menggunakan fitur
          Ekspor. Anda dapat menghapusnya kapan saja melalui menu Ekspor &amp; Impor Data
          (hapus semua data) atau dari pengaturan peramban.
        </Teks>
      </Card>

      <SectionTitle>Layanan Pihak Ketiga</SectionTitle>
      <Card>
        <Teks>
          Saat Anda memakai fitur daring, perangkat Anda terhubung langsung ke penyedia data
          berikut — sama seperti membuka situs mereka:
        </Teks>
        <Daftar>
          <li><strong>Quran.com API</strong> — teks Al-Qur&rsquo;an, terjemahan, tafsir, dan audio.</li>
          <li><strong>Aladhan API</strong> — jadwal sholat dan kalender Hijriah (mengirim koordinat kota yang Anda pilih).</li>
          <li><strong>OpenStreetMap (Overpass &amp; Photon)</strong> — pencarian masjid terdekat (mengirim koordinat saat fitur dipakai, atas izin lokasi dari Anda).</li>
        </Daftar>
        <Teks>
          Fitur Tes Baca menggunakan pengenalan suara bawaan peramban; pemrosesan mengikuti
          kebijakan peramban Anda. Mikrofon hanya aktif saat Anda menekan tombol rekam.
        </Teks>
      </Card>

      <SectionTitle>Iklan (Google AdSense)</SectionTitle>
      <Card>
        <Teks>
          Untuk mendukung biaya pengembangan, situs web NurQalam dapat menampilkan iklan dari
          <strong> Google AdSense</strong>. Sehubungan dengan iklan tersebut:
        </Teks>
        <Daftar>
          <li>
            Google dan mitra iklannya menggunakan <strong>cookie</strong> untuk menayangkan iklan
            berdasarkan kunjungan Anda ke situs ini dan situs lain.
          </li>
          <li>
            Anda dapat menonaktifkan iklan terpersonalisasi melalui{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">
              Setelan Iklan Google
            </a>
            .
          </li>
          <li>
            Penjelasan cara Google menggunakan data dari situs mitra tersedia di{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">
              policies.google.com/technologies/partner-sites
            </a>
            .
          </li>
          <li>Kategori iklan sensitif (mis. judi dan konten dewasa) diblokir dari penayangan.</li>
        </Daftar>
        <Teks>
          Pada aplikasi Android, iklan bersifat <strong>sukarela</strong> (format reward dari
          Google AdMob): iklan hanya muncul bila Anda sendiri menekan tombol dukungannya, dan
          tidak pernah mengunci konten ibadah. AdMob juga memakai pengenal iklan perangkat
          sesuai kebijakan Google. Data ibadah Anda yang tersimpan lokal tidak pernah dibagikan
          kepada pengiklan.
        </Teks>
      </Card>

      <SectionTitle>Perubahan &amp; Kontak</SectionTitle>
      <Card>
        <Teks>
          Kebijakan ini dapat diperbarui seiring perkembangan aplikasi; tanggal pembaruan
          terakhir selalu tercantum di bagian atas halaman. Pertanyaan mengenai privasi dapat
          disampaikan melalui repositori GitHub NurQalam:{' '}
          <a href="https://github.com/lnx645/quran-app" target="_blank" rel="noreferrer">
            github.com/lnx645/quran-app
          </a>
          .
        </Teks>
      </Card>
    </Page>
  );
}
