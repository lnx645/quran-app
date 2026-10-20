// Data statis panduan sholat fardhu: niat 5 waktu + urutan gerakan
// beserta bacaannya (data layer). Konten: ringkasan edukasi yang ditulis
// ulang — bukan fatwa; untuk kasus khusus rujuk ulama setempat.
// Teks Arab di bawah adalah lafaz ibadah lazim (bukan kutipan buku).

export const DISCLAIMER_PANDUAN =
  'Ringkasan edukasi — bukan fatwa. Untuk kasus khusus, silakan rujuk ulama atau guru setempat.';

export const NIAT_SHOLAT = [
  {
    nama: 'Subuh',
    rakaat: 2,
    arab: 'أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
    latin: "Ushallī fardhash-shubhi rak'ataini mustaqbilal-qiblati adā'al lillāhi ta'ālā.",
    arti: 'Aku berniat sholat fardhu Subuh dua rakaat menghadap kiblat tepat waktu karena Allah Ta\u2019ala.',
  },
  {
    nama: 'Zuhur',
    rakaat: 4,
    arab: 'أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
    latin: "Ushallī fardhazh-zhuhri arba'a raka'ātin mustaqbilal-qiblati adā'al lillāhi ta'ālā.",
    arti: 'Aku berniat sholat fardhu Zuhur empat rakaat menghadap kiblat tepat waktu karena Allah Ta\u2019ala.',
  },
  {
    nama: 'Asar',
    rakaat: 4,
    arab: 'أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
    latin: "Ushallī fardhal-'ashri arba'a raka'ātin mustaqbilal-qiblati adā'al lillāhi ta'ālā.",
    arti: 'Aku berniat sholat fardhu Asar empat rakaat menghadap kiblat tepat waktu karena Allah Ta\u2019ala.',
  },
  {
    nama: 'Magrib',
    rakaat: 3,
    arab: 'أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
    latin: "Ushallī fardhal-maghribi tsalātsa raka'ātin mustaqbilal-qiblati adā'al lillāhi ta'ālā.",
    arti: 'Aku berniat sholat fardhu Magrib tiga rakaat menghadap kiblat tepat waktu karena Allah Ta\u2019ala.',
  },
  {
    nama: 'Isya',
    rakaat: 4,
    arab: 'أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
    latin: "Ushallī fardhal-'isyā'i arba'a raka'ātin mustaqbilal-qiblati adā'al lillāhi ta'ālā.",
    arti: 'Aku berniat sholat fardhu Isya empat rakaat menghadap kiblat tepat waktu karena Allah Ta\u2019ala.',
  },
];

export const CATATAN_NIAT =
  'Niat letaknya di hati; lafaz di atas sekadar menuntun niat. Jika menjadi makmum, lafaznya disesuaikan, misalnya: \u201C... adā\u2019am ma\u2019mūmal lillāhi ta\u2019ālā\u201D (menjadi makmum). Jika menjadi imam: \u201C... adā\u2019an imāmal lillāhi ta\u2019ālā\u201D (menjadi imam).';

// jumlah: angka pengulangan yang baku. ikon: kunci ikon react-icons
// yang dipakai halaman (dipetakan di komponen).
export const GERAKAN_SHOLAT = [
  {
    ikon: 'takbir',
    nama: 'Berdiri & Takbiratul Ihram',
    desc: 'Berdiri tegak menghadap kiblat, angkat kedua tangan sejajar bahu/telinga sambil mengucap takbir, lalu sedekap dengan tangan kanan di atas tangan kiri di dada.',
    bacaan: {
      arab: 'اللَّهُ أَكْبَرُ',
      latin: 'Allāhu akbar.',
      arti: 'Allah Maha Besar.',
    },
    jumlah: 1,
  },
  {
    ikon: 'doa',
    nama: 'Doa Iftitah',
    desc: 'Dibaca setelah takbiratul ihram sebagai pembuka sholat. Ada beberapa redaksi; berikut salah satu yang masyhur.',
    bacaan: {
      arab: 'اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا. إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ. إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ. لَا شَرِيكَ لَهُ، وَبِذَلِكَ أُمِرْتُ، وَأَنَا مِنَ الْمُسْلِمِينَ',
      latin: "Allāhu akbaru kabīrā, walhamdu lillāhi katsīrā, wa subhānallāhi bukrataw wa ashīlā. Innī wajjahtu wajhiya lilladzī fatharas-samāwāti wal-ardha hanīfā, wa mā ana minal-musyrikīn. Inna shalātī wa nusukī wa mahyāya wa mamātī lillāhi rabbil-'ālamīn. Lā syarīka lah, wa bidzālika umirtu, wa ana minal-muslimīn.",
      arti: 'Allah Maha Besar sebesar-besarnya, segala puji bagi Allah sebanyak-banyaknya, dan Maha Suci Allah pagi dan petang. Sesungguhnya aku menghadapkan wajahku kepada Zat yang menciptakan langit dan bumi dalam keadaan lurus, dan aku bukan dari golongan orang-orang musyrik. Sesungguhnya sholatku, ibadahku, hidupku dan matiku hanyalah untuk Allah, Rabb semesta alam. Tiada sekutu bagi-Nya, dan demikian aku diperintah, dan aku termasuk orang-orang muslim.',
    },
    jumlah: 1,
  },
  {
    ikon: 'qiroah',
    nama: 'Membaca Al-Fatihah & Surah Pendek',
    desc: 'Al-Fatihah wajib dibaca setiap rakaat, kemudian dilanjutkan membaca surah atau beberapa ayat pendek — terutama pada dua rakaat pertama.',
    bacaan: {
      arab: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ. آمِين',
      latin: "Bismillāhir-rahmānir-rahīm. Alhamdu lillāhi rabbil-'ālamīn. Ar-rahmānir-rahīm. Māliki yaumid-dīn. Iyyāka na'budu wa iyyāka nasta'īn. Ihdinash-shirāthal-mustaqīm. Shirāthal-ladzīna an'amta 'alaihim ghairil-maghdzūbi 'alaihim wa ladh-dhāllīn. Āmīn.",
      arti: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Rabb semesta alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan. Hanya kepada-Mulah kami menyembah dan hanya kepada-Mulah kami memohon pertolongan. Tunjukilah kami jalan yang lurus, yaitu jalan orang-orang yang telah Engkau beri nikmat, bukan jalan orang-orang yang dimurkai dan bukan pula jalan orang-orang yang sesat. Kabulkanlah (doa kami).',
    },
    jumlah: 1,
  },
  {
    ikon: 'rukuk',
    nama: 'Rukuk',
    desc: 'Membungkuk dengan punggung lurus dan kedua tangan memegang lutut. Dibaca tenang sebanyak tiga kali.',
    bacaan: {
      arab: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
      latin: 'Subhāna rabbiyal-\u2018azhīm.',
      arti: 'Maha Suci Rabbku Yang Maha Agung.',
    },
    jumlah: 3,
  },
  {
    ikon: 'iktidal',
    nama: "I'tidal",
    desc: 'Bangkit kembali berdiri tegak sambil mengangkat kedua tangan, lalu membaca tasmi dan doanya.',
    bacaan: {
      arab: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ. رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الْأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ',
      latin: "Sami'allāhu liman hamidah. Rabbanā lakal-hamdu mil'us-samāwāti wa mil'ul-ardhi wa mil'u mā syi'ta min syai'im ba'd.",
      arti: 'Allah mendengar orang yang memuji-Nya. Ya Rabb kami, bagi-Mu segala puji sepenuh langit, sepenuh bumi, dan sepenuh apa yang Engkau kehendaki sesudahnya.',
    },
    jumlah: 1,
  },
  {
    ikon: 'sujud',
    nama: 'Sujud',
    desc: 'Bersujud di atas tujuh anggota: dahi, dua telapak tangan, dua lutut, dan dua ujung kaki. Dibaca tenang sebanyak tiga kali.',
    bacaan: {
      arab: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      latin: "Subhāna rabbiyal-a'lā.",
      arti: 'Maha Suci Rabbku Yang Maha Tinggi.',
    },
    jumlah: 3,
  },
  {
    ikon: 'duduk',
    nama: 'Duduk di Antara Dua Sujud',
    desc: 'Duduk iftirasy (kaki kiri diduduki, kaki kanan ditegakkan) dan membaca doa ini dengan tenang.',
    bacaan: {
      arab: 'رَبِّ اغْفِرْ لِي، وَارْحَمْنِي، وَاجْبُرْنِي، وَارْفَعْنِي، وَارْزُقْنِي، وَاهْدِنِي، وَعَافِنِي، وَاعْفُ عَنِّي',
      latin: "Rabbighfir lī, warhamnī, wajburnī, warfa'nī, warzuqnī, wahdinī, wa'āfinī, wa'fu 'annī.",
      arti: 'Ya Rabbku, ampunilah aku, rahmatilah aku, cukupkanlah aku, angkatlah derajatku, berilah aku rezeki, berilah aku petunjuk, sehatkanlah aku, dan maafkanlah aku.',
    },
    jumlah: 1,
  },
  {
    ikon: 'sujud',
    nama: 'Sujud Kedua',
    desc: 'Bersujud kembali seperti sujud pertama, dengan bacaan yang sama sebanyak tiga kali.',
    bacaan: {
      arab: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      latin: "Subhāna rabbiyal-a'lā.",
      arti: 'Maha Suci Rabbku Yang Maha Tinggi.',
    },
    jumlah: 3,
  },
  {
    ikon: 'tasyahud',
    nama: 'Tasyahud Awal',
    desc: 'Duduk iftirasy pada rakaat kedua sholat yang berjumlah tiga atau empat rakaat, membaca tasyahud, kemudian bangkit ke rakaat berikutnya.',
    bacaan: {
      arab: 'التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ. السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ. السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ. اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
      latin: "At-tahiyyātul-mubārakātush-shalawātuth-thayyibātu lillāh. As-salāmu 'alaika ayyuhan-nabiyyu wa rahmatullāhi wa barakātuh. As-salāmu 'alainā wa 'alā 'ibādillāhish-shālihīn. Asyhadu allā ilāha illallāh, wa asyhadu anna Muhammadan rasūlullāh. Allāhumma shalli 'alā Muhammad wa 'alā āli Muhammad.",
      arti: 'Segala penghormatan, keberkahan, sholat, dan kebaikan hanyalah milik Allah. Salam sejahtera atasmu wahai Nabi, beserta rahmat Allah dan keberkahan-Nya. Salam sejahtera atas kami dan atas hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah, dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Allah, limpahkanlah shalawat kepada Muhammad dan keluarga Muhammad.',
    },
    jumlah: 1,
  },
  {
    ikon: 'tasyahud',
    nama: 'Tasyahud Akhir',
    desc: 'Duduk tawarruk pada rakaat terakhir, membaca tasyahud seperti di atas, lalu melanjutkan shalawat atas Nabi beserta keluarganya secara lengkap.',
    bacaan: {
      arab: 'التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ. السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ. السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ. اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ فِي الْعَالَمِينَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
      latin: "At-tahiyyātul-mubārakātush-shalawātuth-thayyibātu lillāh. As-salāmu 'alaika ayyuhan-nabiyyu wa rahmatullāhi wa barakātuh. As-salāmu 'alainā wa 'alā 'ibādillāhish-shālihīn. Asyhadu allā ilāha illallāh, wa asyhadu anna Muhammadan rasūlullāh. Allāhumma shalli 'alā Muhammad wa 'alā āli Muhammad, kamā shallaita 'alā Ibrāhīm wa 'alā āli Ibrāhīm, wa bārik 'alā Muhammad wa 'alā āli Muhammad, kamā bārakta 'alā Ibrāhīm wa 'alā āli Ibrāhīm fil-'ālamīn, innaka hamīdum majīd.",
      arti: 'Segala penghormatan, keberkahan, sholat, dan kebaikan hanyalah milik Allah. Salam sejahtera atasmu wahai Nabi, beserta rahmat Allah dan keberkahan-Nya. Salam sejahtera atas kami dan atas hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah, dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Allah, limpahkanlah shalawat kepada Muhammad dan keluarga Muhammad sebagaimana Engkau limpahkan kepada Ibrahim dan keluarga Ibrahim, dan berkahilah Muhammad dan keluarga Muhammad sebagaimana Engkau berkahi Ibrahim dan keluarga Ibrahim di seluruh alam. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    },
    jumlah: 1,
  },
  {
    ikon: 'salam',
    nama: 'Salam',
    desc: 'Menoleh ke kanan kemudian ke kiri sambil mengucapkan salam sebagai penutup sholat.',
    bacaan: {
      arab: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
      latin: "As-salāmu 'alaikum wa rahmatullāh.",
      arti: 'Keselamatan dan rahmat Allah tercurah atas kalian.',
    },
    jumlah: 2,
  },
];
