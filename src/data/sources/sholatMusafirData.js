// Data statis panduan sholat musafir: jama' & qashar (data layer).
// Konten: ringkasan edukasi yang ditulis ulang — bukan fatwa;
// untuk kasus khusus rujuk ulama setempat.

import { DISCLAIMER_PANDUAN } from './panduanSholatData.js';

export { DISCLAIMER_PANDUAN };

// Pasangan sholat yang boleh dijama' — tidak semua sholat bisa digabung.
export const PASANGAN_JAMA = [
  {
    pasangan: 'Zuhur + Asar',
    keterangan: 'Dijama\u2019 taqdim di waktu Zuhur, atau jama\u2019 ta\u2019khir di waktu Asar. Masing-masing tetap 4 rakaat bila tidak diqashar, atau 2 rakaat bila diqashar.',
  },
  {
    pasangan: 'Magrib + Isya',
    keterangan: 'Dijama\u2019 taqdim di waktu Magrib, atau jama\u2019 ta\u2019khir di waktu Isya. Magrib tetap 3 rakaat (tidak diqashar), Isya 4 rakaat atau 2 rakaat bila diqashar.',
  },
  {
    pasangan: 'Subuh tidak dijama\u2019',
    keterangan: 'Sholat Subuh tidak digabung dengan sholat apa pun — selalu dikerjakan pada waktunya, 2 rakaat.',
  },
];

export const JENIS_JAMA = [
  {
    id: 'taqdim',
    nama: 'Jama\u2019 Taqdim (didahulukan)',
    desc: 'Sholat kedua dikerjakan di waktu sholat pertama. Contoh: Asar dikerjakan di waktu Zuhur, atau Isya dikerjakan di waktu Magrib.',
    syarat: [
      'Berniat jama\u2019 taqdim, paling lambat saat takbiratul ihram sholat pertama.',
      'Tertib: sholat pertama dikerjakan lebih dulu, baru sholat kedua.',
      'Bersambung (muwalah): tidak diselingi jeda panjang di antara keduanya — dzikir singkat tidak mengapa.',
    ],
    langkah: [
      'Sholat pertama seperti biasa (dengan qashar bila dikehendaki: Zuhur 2 rakaat), lalu salam.',
      'Segera iqamah (bagi yang mengerjakan) lalu sholat kedua (Asar 2 rakaat bila diqashar) dengan niat jama\u2019.',
    ],
  },
  {
    id: 'takhir',
    nama: 'Jama\u2019 Ta\u2019khir (diakhirkan)',
    desc: 'Sholat pertama dikerjakan di waktu sholat kedua. Contoh: Zuhur dikerjakan di waktu Asar, atau Magrib dikerjakan di waktu Isya.',
    syarat: [
      'Berniat jama\u2019 ta\u2019khir ketika waktu sholat pertama telah masuk, sebelum waktunya habis.',
      'Status safar masih berlangsung sampai sholat kedua dikerjakan.',
      'Tertib dianjurkan: sholat pertama tetap dikerjakan lebih dulu, baru sholat kedua.',
    ],
    langkah: [
      'Saat masih dalam waktu sholat pertama, tanamkan niat untuk mengakhirkannya ke waktu sholat kedua.',
      'Di waktu sholat kedua: kerjakan sholat pertama dulu (Zuhur 2 rakaat bila diqashar), salam, lalu sholat kedua (Asar 2 rakaat).',
    ],
  },
];

export const PANDUAN_QASHAR = {
  pengertian:
    'Qashar adalah meringkas sholat yang berjumlah 4 rakaat — Zuhur, Asar, dan Isya — menjadi 2 rakaat. Subuh (2 rakaat) dan Magrib (3 rakaat) tidak diqashar.',
  ketentuan: [
    'Qashar hanya untuk musafir yang telah mencapai jarak safar dan belum berniat mukim 4 hari atau lebih.',
    'Bermakmum kepada imam yang sholat sempurna (bukan musafir): makmum musafir ikut sholat sempurna 4 rakaat, tidak qashar.',
    'Menjadi imam bagi jamaah mukim: musafir boleh qashar 2 rakaat, lalu jamaah mukim menyempurnakan rakaatnya sendiri setelah imam salam — sampaikan sebelumnya agar jamaah tahu.',
    'Qashar adalah keringanan sekaligus sunnah yang dicontohkan Rasulullah \uFD3A selama safar; mengerjakannya lebih utama daripada menyempurnakan, menurut jumhur.',
    'Sholat sunnah rawatib tetap boleh dikerjakan, tetapi selama safar Rasulullah \uFD3A lazimnya hanya menjaga rawatib Subuh dan witir.',
  ],
  niat: {
    arab: 'أُصَلِّي فَرْضَ الظُّهْرِ رَكْعَتَيْنِ قَصْرًا لِلَّهِ تَعَالَى',
    latin: "Ushallī fardhazh-zhuhri rak'ataini qashral lillāhi ta'ālā.",
    arti: 'Aku berniat sholat fardhu Zuhur dua rakaat dengan qashar karena Allah Ta\u2019ala.',
  },
};
