// Data statis panduan sholat Id (Idul Fitri & Idul Adha) + teks takbiran
// lengkap (data layer). Konten: ringkasan edukasi yang ditulis ulang —
// bukan fatwa; untuk kasus khusus rujuk ulama setempat. Teks takbiran
// adalah lafaz ibadah lazim yang diamalkan umat Islam.

import { DISCLAIMER_PANDUAN } from './panduanSholatData.js';

export { DISCLAIMER_PANDUAN };

// Perbandingan pokok kedua sholat Id — dirender sebagai dua kartu.
export const PERBANDINGAN_ID = [
  {
    id: 'fitri',
    nama: 'Idul Fitri',
    tanggal: '1 Syawal, setelah sebulan penuh berpuasa Ramadhan.',
    takbirRakaat: 'Rakaat pertama 7 takbir tambahan, rakaat kedua 5 takbir tambahan.',
    sebelumBerangkat:
      'Disunnahkan makan terlebih dahulu sebelum berangkat — lazimnya kurma dalam jumlah ganjil — sebagai tanda tidak lagi berpuasa.',
    catatan:
      'Takbiran dikumandangkan sejak terbenam matahari malam 1 Syawal sampai imam memulai sholat Id.',
  },
  {
    id: 'adha',
    nama: 'Idul Adha',
    tanggal: '10 Dzulhijjah, hari raya kurban, di tengah rangkaian ibadah haji.',
    takbirRakaat: 'Rakaat pertama 7 takbir tambahan, rakaat kedua 5 takbir tambahan.',
    sebelumBerangkat:
      'Disunnahkan tidak makan terlebih dahulu sebelum sholat, agar makanan pertama hari itu berasal dari daging kurbannya (bagi yang berkurban).',
    catatan:
      'Takbiran dilanjutkan pada hari-hari tasyrik (11, 12, 13 Dzulhijjah) setiap selesai sholat fardhu sampai Asar hari terakhir.',
  },
];

// Kesamaan & ketentuan umum kedua sholat Id.
export const KETENTUAN_ID = [
  'Sholat Id dikerjakan 2 rakaat berjamaah, hukumnya sunnah muakkad (sebagian ulama berpendapat wajib/fardhu kifayah).',
  'Waktunya sejak matahari terbit setinggi tombak (sekitar 15 menit setelah syuruq) sampai menjelang Zuhur.',
  'Tanpa adzan dan tanpa iqamah — seruan yang dipakai adalah "ash-shalātu jāmi\u2019ah" (marilah sholat berjamaah).',
  'Khutbah disampaikan SETELAH sholat (berbeda dengan khutbah Jumat yang sebelum sholat) — jamaah dianjurkan menyimaknya dan tidak pulang lebih dulu.',
  'Pada rakaat pertama: setelah takbiratul ihram dan doa iftitah, bertakbir 7 kali (takbir zawaid) sebelum membaca Al-Fatihah. Di sela antar takbir boleh membaca tasbih, tahmid, dan tahlil dengan pelan.',
  'Pada rakaat kedua: setelah takbir bangkit dari sujud, bertakbir 5 kali sebelum membaca Al-Fatihah.',
  'Bacaan imam dikeraskan (jahr). Surah yang dianjurkan: rakaat pertama Al-A\u2019la atau Qaf, rakaat kedua Al-Ghasyiyah atau Al-Qamar.',
];

// Amalan sunnah sebelum berangkat sholat Id (berurutan).
export const AMALAN_SEBELUM_ID = [
  {
    judul: 'Mandi sunnah',
    desc: 'Mandi sebelum berangkat, memakai pakaian terbaik yang dimiliki, dan memakai wangi-wangian (bagi laki-laki).',
  },
  {
    judul: 'Makan sesuai hari rayanya',
    desc: 'Idul Fitri: makan dulu sebelum berangkat. Idul Adha: menahan makan sampai selesai sholat, lalu makan dari daging kurban.',
  },
  {
    judul: 'Bertakbir dalam perjalanan',
    desc: 'Memperbanyak takbir, tahlil, dan tahmid sejak keluar rumah sampai tiba di tempat sholat.',
  },
  {
    judul: 'Berangkat dan pulang lewat jalan berbeda',
    desc: 'Disunnahkan pergi melalui satu jalan dan pulang melalui jalan lain, sebagaimana dicontohkan Rasulullah \uFD3A — hikmahnya antara lain menyapa dan bersilaturahmi dengan lebih banyak orang.',
  },
  {
    judul: 'Jalan kaki bila mampu',
    desc: 'Berangkat dengan berjalan kaki dalam keadaan tenang dan menundukkan pandangan, bila tempat sholat terjangkau.',
  },
  {
    judul: 'Saling mengucapkan selamat',
    desc: 'Mengucapkan "taqabbalallāhu minnā wa minkum" (semoga Allah menerima amal kami dan amal kalian) serta bermaaf-maafan, terutama di hari Idul Fitri.',
  },
];

// Teks takbiran lengkap: dibaca berulang sejak malam hari raya.
export const TAKBIRAN = {
  arab: [
    'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ',
    'اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا',
    'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، صَدَقَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَأَعَزَّ جُنْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ',
    'لَا إِلَهَ إِلَّا اللَّهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ، مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ',
    'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، وَعَلَى أَصْحَابِ مُحَمَّدٍ، وَعَلَى أَنْصَارِ مُحَمَّدٍ، وَعَلَى أَشْيَاعِ مُحَمَّدٍ، وَعَلَى ذُرِّيَّةِ مُحَمَّدٍ، وَسَلِّمْ تَسْلِيمًا كَثِيرًا',
  ],
  latin: [
    'Allāhu akbar, Allāhu akbar, Allāhu akbar. Lā ilāha illallāh, wallāhu akbar. Allāhu akbar wa lillāhil-hamd.',
    'Allāhu akbar kabīrā, wal-hamdu lillāhi katsīrā, wa subhānallāhi bukrataw wa ashīlā.',
    'Lā ilāha illallāhu wahdah, shadaqa wa\u2019dah, wa nashara \u2019abdah, wa a\u2019azza jundah, wa hazamal-ahzāba wahdah.',
    'Lā ilāha illallāh, wa lā na\u2019budu illā iyyāh, mukhlishīna lahud-dīna wa lau karihal-kāfirūn.',
    'Allāhumma shalli \u2019alā Muhammad, wa \u2019alā āli Muhammad, wa \u2019alā ash-hābi Muhammad, wa \u2019alā anshāri Muhammad, wa \u2019alā asy-yā\u2019i Muhammad, wa \u2019alā dzurriyyati Muhammad, wa sallim taslīman katsīrā.',
  ],
  arti: 'Allah Maha Besar, Allah Maha Besar, Allah Maha Besar. Tiada tuhan selain Allah, dan Allah Maha Besar. Allah Maha Besar dan segala puji hanya bagi Allah. Allah Maha Besar dengan segala kebesaran, segala puji bagi Allah dengan pujian yang banyak, dan Maha Suci Allah pada pagi dan petang hari. Tiada tuhan selain Allah semata, yang menepati janji-Nya, menolong hamba-Nya, memuliakan tentara-Nya, dan mengalahkan golongan-golongan musuh sendirian. Tiada tuhan selain Allah, dan kami tidak menyembah selain kepada-Nya, dengan memurnikan ketaatan kepada-Nya meskipun orang-orang kafir membenci. Ya Allah, limpahkanlah shalawat kepada Muhammad, keluarga Muhammad, para sahabat Muhammad, para penolong Muhammad, para pengikut Muhammad, dan keturunan Muhammad, dan limpahkanlah keselamatan yang banyak.',
};
