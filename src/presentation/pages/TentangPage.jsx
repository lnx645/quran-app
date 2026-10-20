/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaInfoCircle, FaDatabase, FaShieldAlt, FaExclamationTriangle, FaHeart, FaExternalLinkAlt,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, SectionTitle,
} from '../components/common.jsx';
import Logo from '../components/Logo.jsx';
import { version } from '../../../package.json';

/**
 * Halaman Tentang Aplikasi (/tentang).
 * Identitas aplikasi, sumber data (atribusi), privasi, batasan & penafian,
 * serta kredit. Semua data pribadi pengguna tersimpan lokal — halaman ini
 * murni statis dan tidak memanggil jaringan apa pun.
 */

const JudulSumber = styled.h3`
  font-size: ${({ theme }) => theme.type.h3.size}px;
  font-weight: ${({ theme }) => theme.type.h3.weight};
  line-height: ${({ theme }) => theme.type.h3.lineHeight};
  color: ${({ theme }) => theme.colors.judul};
  margin-bottom: 4px;
`;

const Teks = styled.p`
  font-size: ${({ theme }) => theme.type.bodySm.size}px;
  line-height: ${({ theme }) => theme.type.bodySm.lineHeight};
  color: ${({ theme }) => theme.colors.muted};
`;

const Tautan = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  font-size: ${({ theme }) => theme.type.caption.size}px;
  font-weight: ${({ theme }) => theme.type.caption.weight};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  svg {
    font-size: 10px;
  }
`;

const Daftar = styled.ul`
  margin: 0;
  padding-left: 18px;
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

const BarisIdentitas = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  .nama {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.type.h2.size}px;
    font-weight: ${({ theme }) => theme.type.h2.weight};
    color: ${({ theme }) => theme.colors.judul};
  }
  .versi {
    font-size: ${({ theme }) => theme.type.caption.size}px;
    color: ${({ theme }) => theme.colors.faint};
    margin-top: 2px;
  }
`;

const SUMBER_DATA = [
  {
    judul: "Al-Qur'an — Teks, Terjemahan, Audio & Penanda Kata",
    teks: "Teks Al-Qur'an, terjemahan Bahasa Indonesia (Kemenag), audio per bab & per ayat, serta segmen penanda kata berasal dari Quran.com API — Quran Foundation.",
    tautan: 'https://api.quran.com',
    labelTautan: 'api.quran.com',
  },
  {
    judul: 'Jadwal Sholat & Kalender Hijriah',
    teks: 'Jadwal sholat dan kalender Hijriah berasal dari Aladhan API, dengan metode perhitungan Kemenag RI.',
    tautan: 'https://aladhan.com',
    labelTautan: 'aladhan.com',
  },
  {
    judul: 'Masjid Terdekat',
    teks: 'Data masjid © kontributor OpenStreetMap, diakses lewat Overpass API; pencarian cadangan oleh Photon dari Komoot.',
    tautan: 'https://www.openstreetmap.org/copyright',
    labelTautan: 'openstreetmap.org/copyright',
  },
  {
    judul: "Hadits Arba'in",
    teks: "Hadits Arba'in An-Nawawiyah karya Imam An-Nawawi.",
  },
  {
    judul: 'Riyadhus Shalihin',
    teks: 'Riyadhus Shalihin — edisi IslamEnc/IslamHouse, bab-bab inti.',
  },
  {
    judul: 'Hisnul Muslim',
    teks: "Kitab Hisnul Muslim karya Syaikh Sa'id bin Wahf Al-Qahthani, bab-bab utama.",
  },
  {
    judul: 'Audio Adzan',
    teks: '"The Adhan" oleh Aaqib Azeez via Wikimedia Commons, lisensi CC BY-SA 4.0.',
  },
  {
    judul: 'Ornamen Rub el Hizb',
    teks: 'Ornamen Rub el Hizb — Wikimedia Commons, CC BY-SA 4.0 (Dudaweyll).',
  },
  {
    judul: 'Diagram Makhraj & Foto Praktik Wudhu',
    teks: "Diagram makhraj dari Miftah al-'Ulum karya as-Sakkaki (domain publik); foto praktik wudhu — Wikimedia Commons, CC BY 2.0.",
  },
  {
    judul: 'Audio Mode Anak & Iqro',
    teks: 'Audio nama huruf Mode Anak & audio baris Iqro Jilid 1 adalah suara sintetis yang dihasilkan pengembang dengan Piper TTS (model ar_JO-kareem-medium dari rhasspy/piper-voices).',
  },
  {
    judul: 'Kisah, Doa & Panduan Fikih',
    teks: 'Kisah para nabi, doa & panduan fikih disusun dari literatur Islam rujukan; tiap halaman mencantumkan sumber/dalilnya. Konten fikih berlabel mazhab dan bukan fatwa.',
  },
];

export default function TentangPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaInfoCircle /> Tentang Aplikasi
        </h2>
        <p>Semua ibadah dalam satu aplikasi — Al-Qur&rsquo;an, jadwal sholat, dzikir, doa, dan panduan ibadah harian.</p>
      </PageHero>

      <Card>
        <BarisIdentitas>
          <Logo size={64} />
          <div>
            <div className="nama">Noor — Al-Qur&rsquo;an &amp; Ibadah</div>
            <div className="versi">Versi {version}</div>
          </div>
        </BarisIdentitas>
        <Teks css={{ marginTop: 12 }}>
          Noor dapat diakses di{' '}
          <a href="https://nurqalam.my.id" target="_blank" rel="noreferrer">
            nurqalam.my.id
          </a>
          . Misi Noor sederhana: menghadirkan semua kebutuhan ibadah harian dalam satu aplikasi yang ringan,
          tanpa akun, dan menghormati privasi penggunanya.
        </Teks>
      </Card>

      <SectionTitle>
        <FaDatabase /> Sumber Data
      </SectionTitle>
      {SUMBER_DATA.map((s) => (
        <Card key={s.judul}>
          <JudulSumber>{s.judul}</JudulSumber>
          <Teks>{s.teks}</Teks>
          {s.tautan && (
            <Tautan href={s.tautan} target="_blank" rel="noreferrer">
              {s.labelTautan} <FaExternalLinkAlt />
            </Tautan>
          )}
        </Card>
      ))}

      <SectionTitle>
        <FaShieldAlt /> Privasi
      </SectionTitle>
      <Card>
        <Daftar>
          <li>Noor bekerja <strong>tanpa akun</strong> — tidak ada pendaftaran dan tidak ada login.</li>
          <li>
            Semua data pribadi (catatan, profil keluarga, progres ibadah) tersimpan <strong>lokal di
            perangkat pengguna</strong> dan tidak dikirim ke server mana pun.
          </li>
          <li>Aplikasi <strong>tidak melacak pengguna</strong> — tanpa analitik dan tanpa pelacak pihak ketiga.</li>
          <li>
            Koneksi internet hanya dilakukan ke API Qur&rsquo;an, jadwal sholat, dan peta masjid yang
            tercantum pada bagian Sumber Data di atas.
          </li>
        </Daftar>
      </Card>

      <SectionTitle>
        <FaExclamationTriangle /> Batasan &amp; Penafian
      </SectionTitle>
      <Card>
        <Daftar>
          <li>Pengingat pada versi web hanya berbunyi selama aplikasi/peramban terbuka.</li>
          <li>Kompas kiblat bergantung pada sensor perangkat, sehingga ketepatannya dapat berbeda-beda.</li>
          <li>Kalkulator waris mencakup perhitungan dasar saja.</li>
          <li>
            Seluruh konten bersifat edukasi dan <strong>bukan fatwa</strong> — ikuti bimbingan guru/ulama
            setempat untuk keputusan keagamaan.
          </li>
        </Daftar>
      </Card>

      <SectionTitle>
        <FaHeart /> Kredit
      </SectionTitle>
      <Card>
        <Teks>
          Kode sumber Noor terbuka di GitHub:{' '}
          <a href="https://github.com/lnx645/quran-app" target="_blank" rel="noreferrer">
            github.com/lnx645/quran-app
          </a>
          . Noor dibangun dengan React dan perangkat lunak sumber terbuka. Terima kasih kepada seluruh
          penyedia data di atas yang membuat aplikasi ini dapat hadir dan bermanfaat.
        </Teks>
      </Card>
    </Page>
  );
}
