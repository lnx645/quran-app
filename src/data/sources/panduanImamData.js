// Data statis Panduan Imam & Muadzin (data layer).
// Konten: ringkasan edukasi fikih sholat berjamaah yang ditulis ulang
// dari pengetahuan masyhur (urutan keutamaan imam: HR. Muslim;
// teks adzan & iqamah: lafaz ibadah lazim) — bukan fatwa.
// Modul ini HANYA diimpor oleh PanduanImamPage agar ikut chunk halamannya.

export const DISCLAIMER_IMAM =
  'Ringkasan edukasi — bukan fatwa. Detail fikih berjamaah bisa berbeda antar mazhab; untuk praktik di masjid Anda, ikuti imam tetap dan bimbingan ulama setempat.';

export const SYARAT_IMAM = [
  {
    judul: 'Muslim, baligh, dan berakal',
    isi: 'Imam adalah pemimpin sholat, maka ia harus muslim, sudah baligh (atau mumayyiz untuk jamaah sebaya menurut sebagian ulama), dan berakal sehat.',
  },
  {
    judul: 'Mampu membaca bacaan wajib dengan benar',
    isi: 'Terutama Al-Fatihah dan bacaan rukun. Orang yang bacaannya belum benar pada rukun bacaan tidak diutamakan mengimami yang bacaannya lebih benar.',
  },
  {
    judul: 'Memahami rukun & tata cara sholat',
    isi: 'Mengetahui mana rukun, wajib, dan sunnah sholat, serta apa yang membatalkannya — agar sholat jamaah sah dan tenang.',
  },
  {
    judul: 'Mampu melaksanakan gerakan rukun',
    isi: 'Dapat berdiri, rukuk, dan sujud dengan sempurna. Bila tidak mampu, ia mengimami dengan cara yang ia mampu sesuai ketentuan (misalnya duduk) untuk jamaah yang keadaannya serupa atau menurut penjelasan ulama.',
  },
  {
    judul: 'Suci dari hadas & najis',
    isi: 'Berwudhu, badan, pakaian, dan tempat sholatnya suci — sama seperti syarat sah sholat pada umumnya.',
  },
  {
    judul: 'Laki-laki untuk jamaah laki-laki/campuran',
    isi: 'Imam bagi jamaah laki-laki atau campuran adalah laki-laki. Perempuan dapat mengimami jamaah khusus perempuan menurut jumhur ulama.',
  },
];

export const URUTAN_IMAM = [
  {
    judul: 'Paling baik & paling banyak bacaan Al-Qur\u2019annya',
    isi: 'Yang paling fasih dan paling banyak hafalan/bacaannya didahulukan (HR. Muslim).',
  },
  {
    judul: 'Paling memahami sunnah & fikih sholat',
    isi: 'Bila bacaan setara, yang paling tahu tuntunan Nabi ﷺ dalam sholat didahulukan.',
  },
  {
    judul: 'Paling dahulu hijrah / lebih dulu menetap',
    isi: 'Bila masih setara, yang lebih dahulu hijrah (dalam konteks hadits) atau lebih dulu datang/menetap di tempat itu.',
  },
  {
    judul: 'Paling tua usianya',
    isi: 'Bila semua setara, yang paling tua didahulukan. Di rumah seseorang, tuan rumah lebih berhak menjadi imam; di masjid, imam tetap (rawatib) lebih berhak daripada pendatang.',
  },
];

export const TUGAS_IMAM = [
  {
    judul: 'Niat menjadi imam',
    isi: 'Menghadirkan niat sebagai imam di hati saat takbiratul ihram, terutama pada sholat yang mensyaratkannya seperti sholat Jumat.',
  },
  {
    judul: 'Meluruskan & merapatkan saf sebelum mulai',
    isi: 'Menghadap makmum sejenak, mengingatkan meluruskan dan merapatkan saf serta menutup celah, baru kemudian takbir.',
  },
  {
    judul: 'Mengeraskan takbir & salam agar terdengar makmum',
    isi: 'Setiap takbir perpindahan (takbir intiqal) dan salam diucapkan dengan suara yang jelas terdengar jamaah di belakangnya.',
  },
  {
    judul: 'Membaca dengan jahr / sirr sesuai sholatnya',
    isi: 'Mengeraskan bacaan pada dua rakaat pertama Magrib, Isya, dan Subuh (serta Jumat, Id, tarawih, witir), dan memelankan bacaan pada Zuhur dan Asar.',
  },
  {
    judul: 'Tenang (thuma\u2019ninah) & tidak memberatkan',
    isi: 'Tidak tergesa-gesa dan tidak pula terlalu memanjangkan hingga memberatkan jamaah yang beragam (ada orang tua, pekerja, dan yang memiliki keperluan) — Nabi ﷺ memerintahkan imam meringankan sholat berjamaah tanpa mengurangi rukun.',
  },
  {
    judul: 'Menanggung bacaan & kekeliruan jamaah seperlunya',
    isi: 'Imam menjadi penanggung jawab jalannya sholat: bila ia lupa, makmum mengingatkan (laki-laki dengan tasbih, perempuan dengan menepuk tangan) dan imam menutup kekurangan dengan sujud sahwi bila diperlukan.',
  },
];

export const SYARAT_MUADZIN = [
  'Muslim, berakal, dan amanah menjaga waktu sholat.',
  'Laki-laki untuk adzan jamaah umum (adzan khusus jamaah perempuan boleh oleh perempuan).',
  'Bersuara jelas dan cukup keras / menggunakan pengeras suara dengan adab (tidak berlebihan hingga mengganggu).',
  'Mengetahui waktu-waktu sholat dan tata cara adzan.',
  'Dianjurkan dalam keadaan suci, menghadap kiblat, dan tidak sedang berbicara di sela adzan.',
];

export const TUGAS_MUADZIN = [
  'Menjaga ketepatan waktu: mengumandangkan adzan tepat saat waktunya masuk.',
  'Mengumandangkan adzan dengan tartil — tidak tergesa-gesa dan tidak dibuat-buat melodinya hingga mengubah lafaz.',
  'Membaca tambahan “ash-shalaatu khairum minan-naum” (tatsrib) dua kali pada adzan Subuh setelah “hayya ‘alal-falaah”.',
  'Mengumandangkan iqamah sebagai tanda sholat segera dimulai, setelah imam hadir dan memberi isyarat/izin.',
  'Mengingatkan jamaah dengan cara yang baik bila diperlukan (misalnya pengumuman singkat sebelum iqamah).',
];

// Teks adzan ringkas: { arab, latin, arti, ulang (label pengulangan), khusus? }
export const TEKS_ADZAN = [
  { arab: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ', latin: 'Allaahu akbar, Allaahu akbar', arti: 'Allah Maha Besar, Allah Maha Besar.', ulang: '2× (total takbir pembuka 4× dalam dua rangkaian)' },
  { arab: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ', latin: 'Asyhadu allaa ilaaha illallaah', arti: 'Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah.', ulang: '2×' },
  { arab: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', latin: 'Asyhadu anna Muhammadar rasuulullaah', arti: 'Aku bersaksi bahwa Muhammad adalah utusan Allah.', ulang: '2×' },
  { arab: 'حَيَّ عَلَى الصَّلَاةِ', latin: 'Hayya ‘alash-shalaah', arti: 'Marilah sholat.', ulang: '2×' },
  { arab: 'حَيَّ عَلَى الْفَلَاحِ', latin: 'Hayya ‘alal-falaah', arti: 'Marilah menuju kemenangan.', ulang: '2×' },
  { arab: 'الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ', latin: 'Ash-shalaatu khairum minan-nawm', arti: 'Sholat itu lebih baik daripada tidur.', ulang: '2× — khusus adzan Subuh' },
  { arab: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ', latin: 'Allaahu akbar, Allaahu akbar', arti: 'Allah Maha Besar, Allah Maha Besar.', ulang: '1 rangkaian' },
  { arab: 'لَا إِلَهَ إِلَّا اللَّهُ', latin: 'Laa ilaaha illallaah', arti: 'Tidak ada sesembahan yang berhak disembah selain Allah.', ulang: '1×' },
];

export const TEKS_IQAMAH = [
  { arab: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ', latin: 'Allaahu akbar, Allaahu akbar', arti: 'Allah Maha Besar, Allah Maha Besar.', ulang: '1 rangkaian' },
  { arab: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ', latin: 'Asyhadu allaa ilaaha illallaah', arti: 'Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah.', ulang: '1×' },
  { arab: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', latin: 'Asyhadu anna Muhammadar rasuulullaah', arti: 'Aku bersaksi bahwa Muhammad adalah utusan Allah.', ulang: '1×' },
  { arab: 'حَيَّ عَلَى الصَّلَاةِ', latin: 'Hayya ‘alash-shalaah', arti: 'Marilah sholat.', ulang: '1×' },
  { arab: 'حَيَّ عَلَى الْفَلَاحِ', latin: 'Hayya ‘alal-falaah', arti: 'Marilah menuju kemenangan.', ulang: '1×' },
  { arab: 'قَدْ قَامَتِ الصَّلَاةُ', latin: 'Qad qaamatish-shalaah', arti: 'Sungguh sholat akan segera didirikan.', ulang: '2×' },
  { arab: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ', latin: 'Allaahu akbar, Allaahu akbar', arti: 'Allah Maha Besar, Allah Maha Besar.', ulang: '1 rangkaian' },
  { arab: 'لَا إِلَهَ إِلَّا اللَّهُ', latin: 'Laa ilaaha illallaah', arti: 'Tidak ada sesembahan yang berhak disembah selain Allah.', ulang: '1×' },
];

export const CATATAN_IQAMAH =
  'Susunan di atas adalah iqamah menurut praktik masyhur mazhab Syafi‘i (kalimatnya tunggal kecuali takbir dan “qad qaamatish-shalaah”). Mazhab Hanafi membaca iqamah dengan pengulangan seperti adzan ditambah “qad qaamatish-shalaah” — ikuti kebiasaan masjid setempat. Yang menjawab adzan dianjurkan mengucapkan seperti yang diucapkan muadzin, kecuali pada “hayya ‘ala…” dijawab “laa hawla wa laa quwwata illaa billaah”, dan setelah adzan membaca shalawat serta doa sesudah adzan.';

export const TENTANG_MASBUQ = [
  {
    judul: 'Apa itu masbuq?',
    isi: 'Makmum masbuq adalah makmum yang tertinggal sebagian rakaat (atau sebagian gerakan) dari imam karena datang terlambat atau sebab lain.',
  },
  {
    judul: 'Langsung ikut posisi imam',
    isi: 'Bertakbiratul ihram dalam keadaan berdiri, lalu segera mengikuti posisi imam saat itu (rukuk, sujud, duduk, dan seterusnya) — jangan menunggu imam berdiri untuk rakaat berikutnya.',
  },
  {
    judul: 'Hitungan rakaat: yang sempat rukuk bersama imam',
    isi: 'Satu rakaat terhitung didapat bila makmum sempat rukuk bersama imam sebelum imam bangkit dari rukuknya. Bila baru tiba saat imam sudah i‘tidal/sujud, gerakan itu diikuti tetapi rakaatnya belum terhitung.',
  },
  {
    judul: 'Setelah imam salam, sempurnakan kekurangannya',
    isi: 'Jangan ikut salam. Setelah imam salam kedua, masbuq berdiri dan menyempurnakan rakaat yang tertinggal seperti sholat sendiri (membaca Al-Fatihah dan seterusnya), lalu tasyahud akhir dan salam.',
  },
];
