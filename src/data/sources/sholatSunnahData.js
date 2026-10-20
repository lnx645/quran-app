// Data statis panduan sholat sunnah: dhuha, tahajud, witir, rawatib,
// tarawih, istikharah, hajat, taubat, gerhana (data layer).
// Konten: ringkasan edukasi yang ditulis ulang — bukan fatwa;
// untuk kasus khusus rujuk ulama setempat. Lafaz niat adalah
// lafaz ibadah lazim yang disesuaikan per jenis sholat.

export const DISCLAIMER_PANDUAN =
  'Ringkasan edukasi — bukan fatwa. Untuk kasus khusus, silakan rujuk ulama atau guru setempat.';

export const SHOLAT_SUNNAH = [
  {
    id: 'dhuha',
    nama: 'Sholat Dhuha',
    waktu: 'Matahari sudah terbit setinggi tombak (sekitar 15 menit setelah syuruq) sampai menjelang Zuhur.',
    rakaat: 'Minimal 2 rakaat, boleh 4, 6, atau 8 rakaat; dikerjakan setiap 2 rakaat satu salam.',
    keutamaan:
      'Dikenal sebagai sholatnya orang-orang yang kembali kepada Allah dan sarana sedekah bagi persendian tubuh. Banyak orang membiasakannya sebagai pembuka pintu rezeki harian.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الضُّحَى رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallī sunnatadh-dhuhā rak'ataini lillāhi ta'ālā.",
      arti: 'Aku berniat sholat sunnah Dhuha dua rakaat karena Allah Ta\u2019ala.',
    },
    tataCara:
      'Dikerjakan seperti sholat dua rakaat pada umumnya. Pada rakaat pertama setelah Al-Fatihah dianjurkan membaca Asy-Syams, dan pada rakaat kedua Adh-Dhuha; boleh juga surah lain.',
  },
  {
    id: 'tahajud',
    nama: 'Sholat Tahajud',
    waktu: 'Malam hari setelah tidur, paling utama pada sepertiga malam terakhir hingga menjelang Subuh.',
    rakaat: 'Minimal 2 rakaat; tidak ada batas maksimal, dikerjakan setiap 2 rakaat satu salam, ditutup witir.',
    keutamaan:
      'Sholat sunnah yang paling utama setelah sholat fardhu. Waktu sepertiga malam terakhir adalah saat yang sangat mustajab untuk berdoa.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallī sunnatat-tahajjudi rak'ataini lillāhi ta'ālā.",
      arti: 'Aku berniat sholat sunnah Tahajud dua rakaat karena Allah Ta\u2019ala.',
    },
    tataCara:
      'Bangun malam setelah tidur, berwudhu, lalu sholat dua rakaat-dua rakaat dengan bacaan dan rukuk-sujud yang dipanjangkan. Perbanyak doa dan istighfar di sela-selanya.',
  },
  {
    id: 'witir',
    nama: 'Sholat Witir',
    waktu: 'Setelah Isya sampai menjelang Subuh; penutup sholat malam.',
    rakaat: 'Ganjil: 1, 3, 5, dan seterusnya. Lazim 3 rakaat — bisa sekaligus satu salam atau 2 rakaat salam lalu 1 rakaat.',
    keutamaan:
      'Penutup sholat malam yang sangat ditekankan; Rasulullah ﷺ tidak pernah meninggalkannya baik saat di rumah maupun dalam perjalanan.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الْوِتْرِ رَكْعَةً لِلَّهِ تَعَالَى',
      latin: "Ushallī sunnatal-witri rak'atal lillāhi ta'ālā.",
      arti: 'Aku berniat sholat sunnah Witir satu rakaat karena Allah Ta\u2019ala.',
    },
    tataCara:
      'Untuk tiga rakaat satu salam, tata caranya seperti Magrib tetapi tanpa duduk tasyahud awal. Pada rakaat terakhir setelah Al-Fatihah boleh membaca Al-Ikhlas, Al-Falaq, dan An-Nas.',
  },
  {
    id: 'rawatib',
    nama: 'Sholat Rawatib',
    waktu: 'Mengiringi sholat fardhu: sebelum (qabliyah) dan sesudah (ba\u2019diyah) sholat wajib.',
    rakaat:
      'Yang muakkad 10–12 rakaat: 2 sebelum Subuh, 4 (atau 2+2) sebelum Zuhur, 2 setelah Zuhur, 2 setelah Magrib, 2 setelah Isya.',
    keutamaan:
      'Menyempurnakan kekurangan pada sholat fardhu. Siapa yang menjaganya dengan istiqamah dijanjikan rumah di surga.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الظُّهْرِ رَكْعَتَيْنِ قَبْلِيَّةً لِلَّهِ تَعَالَى',
      latin: "Ushallī sunnatazh-zhuhri rak'ataini qabliyyatal lillāhi ta'ālā.",
      arti: 'Aku berniat sholat sunnah Zuhur dua rakaat (qabliyah) karena Allah Ta\u2019ala.',
    },
    tataCara:
      'Dikerjakan seperti sholat dua rakaat pada umumnya; niat disesuaikan dengan waktu dan posisinya (qabliyah atau ba\u2019diyah). Rawatib sebelum Subuh dianjurkan dibaca Al-Kafirun dan Al-Ikhlas.',
  },
  {
    id: 'tarawih',
    nama: 'Sholat Tarawih',
    waktu: 'Malam-malam bulan Ramadhan, setelah sholat Isya sampai menjelang fajar.',
    rakaat: 'Di Indonesia lazim 20 rakaat (2 rakaat salam) atau 8 rakaat, ditutup witir 3 rakaat.',
    keutamaan:
      'Qiyam Ramadhan: siapa yang menegakkannya dengan iman dan mengharap pahala, diampuni dosa-dosanya yang telah lalu.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ التَّرَاوِيحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
      latin: "Ushallī sunnatat-tarāwīhi rak'ataini mustaqbilal-qiblati adā'al lillāhi ta'ālā.",
      arti: 'Aku berniat sholat sunnah Tarawih dua rakaat menghadap kiblat tepat waktu karena Allah Ta\u2019ala.',
    },
    tataCara:
      'Berjamaah di masjid atau sendiri di rumah, dua rakaat salam berulang hingga genap, diselingi istirahat singkat dan dzikir. Ditutup dengan witir.',
  },
  {
    id: 'istikharah',
    nama: 'Sholat Istikharah',
    waktu: 'Kapan saja di luar waktu terlarang, ketika menghadapi pilihan penting.',
    rakaat: '2 rakaat.',
    keutamaan:
      'Sarana memohon petunjuk Allah ketika bimbang memilih di antara dua perkara yang sama-sama dibolehkan — jodoh, pekerjaan, tempat tinggal, dan sebagainya.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الِاسْتِخَارَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallī sunnatal-istikhārati rak'ataini lillāhi ta'ālā.",
      arti: 'Aku berniat sholat sunnah Istikharah dua rakaat karena Allah Ta\u2019ala.',
    },
    tataCara:
      'Sholat dua rakaat seperti biasa, lalu setelah salam membaca doa istikharah di bawah ini sambil menyebut pilihan yang dihadapi. Lakukan dengan hati mantap; petunjuk bisa datang lewat kemantapan hati atau kemudahan jalannya urusan.',
    doaKhusus: {
      label: 'Doa Istikharah',
      arab: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ. اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِي الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ',
      latin: "Allāhumma innī astakhīruka bi'ilmika, wa astaqdiruka biqudratika, wa as-aluka min fadhlikal-'azhīm, fa innaka taqdiru wa lā aqdir, wa ta'lamu wa lā a'lam, wa anta 'allāmul-ghuyūb. Allāhumma in kunta ta'lamu anna hādzal-amra khairun lī fī dīnī wa ma'āsyī wa 'āqibati amrī faqdurhu lī wa yassirhu lī tsumma bārik lī fīh. Wa in kunta ta'lamu anna hādzal-amra syarrun lī fī dīnī wa ma'āsyī wa 'āqibati amrī fashrifhu 'annī washrifnī 'anh, waqdur liyal-khaira haitsu kāna tsumma ardhinī bih.",
      arti: 'Ya Allah, sesungguhnya aku memohon pilihan yang tepat kepada-Mu dengan ilmu-Mu, aku memohon kemampuan dengan kekuasaan-Mu, dan aku memohon karunia-Mu yang agung. Sesungguhnya Engkau Mahakuasa sedang aku tidak kuasa, Engkau Maha Mengetahui sedang aku tidak mengetahui, dan Engkau Maha Mengetahui hal-hal yang gaib. Ya Allah, jika Engkau mengetahui perkara ini baik bagiku dalam agamaku, kehidupanku, dan akibat urusanku, maka takdirkanlah dan mudahkanlah ia bagiku, lalu berkahilah aku padanya. Dan jika Engkau mengetahui perkara ini buruk bagiku dalam agamaku, kehidupanku, dan akibat urusanku, maka jauhkanlah ia dariku dan jauhkanlah aku darinya, dan takdirkanlah kebaikan untukku di mana pun berada, lalu jadikanlah aku ridha menerimanya.',
    },
  },
  {
    id: 'hajat',
    nama: 'Sholat Hajat',
    waktu: 'Kapan saja di luar waktu terlarang, terutama malam hari.',
    rakaat: '2 rakaat (sebagian riwayat menyebut sampai 12 rakaat).',
    keutamaan:
      'Wasilah memohon kepada Allah ketika mempunyai kebutuhan atau kesulitan yang mendesak, setelah berusaha secara lahiriah.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الْحَاجَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallī sunnatal-hājati rak'ataini lillāhi ta'ālā.",
      arti: 'Aku berniat sholat sunnah Hajat dua rakaat karena Allah Ta\u2019ala.',
    },
    tataCara:
      'Berwudhu dengan sempurna, sholat dua rakaat dengan khusyuk, lalu setelah salam memuji Allah, bershalawat atas Nabi ﷺ, dan memanjatkan hajat yang diinginkan dengan penuh keyakinan.',
  },
  {
    id: 'taubat',
    nama: 'Sholat Taubat',
    waktu: 'Segera setelah menyadari perbuatan dosa, kapan saja di luar waktu terlarang.',
    rakaat: '2 rakaat.',
    keutamaan:
      'Pintu kembali bagi hamba yang berdosa: siapa yang berwudhu, sholat dua rakaat, dan beristighfar dengan sungguh-sungguh, Allah mengampuninya.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ التَّوْبَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallī sunnatat-taubati rak'ataini lillāhi ta'ālā.",
      arti: 'Aku berniat sholat sunnah Taubat dua rakaat karena Allah Ta\u2019ala.',
    },
    tataCara:
      'Berwudhu, sholat dua rakaat dengan penyesalan yang jujur, lalu perbanyak istighfar. Sempurnakan taubat dengan tekad kuat untuk tidak mengulangi dosa tersebut.',
  },
  {
    id: 'gerhana',
    nama: 'Sholat Gerhana (Khusuf/Kusuf)',
    waktu: 'Saat terjadi gerhana bulan (khusuf) atau gerhana matahari (kusuf), sejak gerhana mulai sampai selesai.',
    rakaat: '2 rakaat dengan tata cara khusus: setiap rakaat dua kali rukuk.',
    keutamaan:
      'Gerhana adalah tanda kebesaran Allah. Umat Islam diperintah memperbanyak sholat, doa, dzikir, dan sedekah ketika menyaksikannya.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الْخُسُوفِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallī sunnatal-khusūfi rak'ataini lillāhi ta'ālā.",
      arti: 'Aku berniat sholat sunnah Gerhana Bulan dua rakaat karena Allah Ta\u2019ala.',
    },
    tataCara:
      'Dalam satu rakaat: takbir, membaca Al-Fatihah dan surah panjang, rukuk lama, bangkit membaca Al-Fatihah dan surah lagi (lebih pendek), rukuk kedua, lalu sujud dua kali seperti biasa. Dianjurkan berjamaah di masjid; untuk gerhana matahari niatnya \u201Ckusuf\u201D. Khutbah singkat boleh menyusul setelahnya.',
  },
];

// ── Sholat Jenazah ──────────────────────────────────────────────
// Disertakan di data ini agar satu data layer memuat panduan sholat
// khusus; halamannya sendiri di /sholat-jenazah.
export const SHOLAT_JENAZAH = {
  syarat: [
    'Jenazah adalah muslim yang sudah dimandikan dan dikafani.',
    'Orang yang menyolatkan suci dari hadas kecil dan besar, menutup aurat, dan menghadap kiblat.',
    'Jenazah diletakkan di depan imam (arah kiblat).',
    'Dilakukan tanpa rukuk dan sujud — hanya berdiri dengan empat takbir.',
  ],
  posisiImam:
    'Imam berdiri sejajar kepala jenazah laki-laki, dan sejajar bagian tengah (pinggang) jenazah perempuan. Makmum berbaris lurus di belakang imam.',
  langkah: [
    {
      takbir: 1,
      judul: 'Takbir Pertama — membaca Al-Fatihah',
      desc: 'Berdiri, berniat sholat jenazah dalam hati, angkat tangan sambil bertakbir, lalu membaca Al-Fatihah dengan pelan.',
      bacaan: {
        arab: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ. آمِين',
        latin: "Bismillāhir-rahmānir-rahīm. Alhamdu lillāhi rabbil-'ālamīn. Ar-rahmānir-rahīm. Māliki yaumid-dīn. Iyyāka na'budu wa iyyāka nasta'īn. Ihdinash-shirāthal-mustaqīm. Shirāthal-ladzīna an'amta 'alaihim ghairil-maghdzūbi 'alaihim wa ladh-dhāllīn. Āmīn.",
        arti: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Rabb semesta alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan. Hanya kepada-Mulah kami menyembah dan hanya kepada-Mulah kami memohon pertolongan. Tunjukilah kami jalan yang lurus, yaitu jalan orang-orang yang telah Engkau beri nikmat, bukan jalan orang-orang yang dimurkai dan bukan pula jalan orang-orang yang sesat. Kabulkanlah (doa kami).',
      },
    },
    {
      takbir: 2,
      judul: 'Takbir Kedua — shalawat atas Nabi ﷺ',
      desc: 'Bertakbir sekali lagi tanpa mengangkat tangan (mengangkat tangan juga dibolehkan), lalu membaca shalawat atas Nabi Muhammad ﷺ — minimal shalawat pendek, lebih utama shalawat Ibrahimiyah.',
      bacaan: {
        arab: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ فِي الْعَالَمِينَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
        latin: "Allāhumma shalli 'alā Muhammad wa 'alā āli Muhammad, kamā shallaita 'alā Ibrāhīm wa 'alā āli Ibrāhīm, wa bārik 'alā Muhammad wa 'alā āli Muhammad, kamā bārakta 'alā Ibrāhīm wa 'alā āli Ibrāhīm fil-'ālamīn, innaka hamīdum majīd.",
        arti: 'Ya Allah, limpahkanlah shalawat kepada Muhammad dan keluarga Muhammad sebagaimana Engkau limpahkan kepada Ibrahim dan keluarga Ibrahim, dan berkahilah Muhammad dan keluarga Muhammad sebagaimana Engkau berkahi Ibrahim dan keluarga Ibrahim di seluruh alam. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
      },
    },
    {
      takbir: 3,
      judul: 'Takbir Ketiga — doa untuk jenazah',
      desc: 'Bertakbir ketiga, lalu mendoakan jenazah secara khusus dengan doa berikut (redaksi untuk jenazah laki-laki).',
      bacaan: {
        arab: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مَدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ',
        latin: "Allāhummaghfir lahu warhamhu wa 'āfihi wa'fu 'anhu, wa akrim nuzulahu, wa wassi' madkhalahu, waghsilhu bil-mā'i wats-tsalji wal-barad, wa naqqihi minal-khathāyā kamā yunaqqats-tsaubul-abyadhu minad-danas.",
        arti: 'Ya Allah, ampunilah dia, rahmatilah dia, selamatkanlah dia, dan maafkanlah dia. Muliakanlah tempat tinggalnya, lapangkanlah tempat masuknya, basuhlah dia dengan air, salju, dan embun, dan bersihkanlah dia dari kesalahan sebagaimana pakaian putih dibersihkan dari kotoran.',
      },
      catatanPerempuan:
        'Untuk jenazah perempuan, kata ganti laki-laki (\u201Chu/lahu\u201D) diganti kata ganti perempuan (\u201Chā/lahā\u201D): \u201CAllāhummaghfir lahā warhamhā wa \u2018āfihā wa\u2019fu \u2018anhā...\u201D dan seterusnya.',
    },
    {
      takbir: 4,
      judul: 'Takbir Keempat — doa penutup & salam',
      desc: 'Bertakbir keempat, membaca doa penutup, lalu mengucapkan salam sambil menoleh ke kanan dan ke kiri.',
      bacaan: {
        arab: 'اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ وَلَا تَفْتِنَّا بَعْدَهُ وَاغْفِرْ لَنَا وَلَهُ',
        latin: "Allāhumma lā tahrimnā ajrahu wa lā taftinnā ba'dahu waghfir lanā wa lah.",
        arti: 'Ya Allah, janganlah Engkau halangi kami dari pahalanya, janganlah Engkau timpakan fitnah kepada kami setelahnya, dan ampunilah kami dan dia.',
      },
    },
  ],
};
