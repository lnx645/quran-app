// Data statis Doa Qunut (data layer): qunut Subuh & qunut witir.
// Teks Arab adalah lafaz doa masyhur yang diajarkan Nabi ﷺ kepada
// Al-Hasan bin Ali (HR. Abu Dawud, Tirmidzi, An-Nasa'i, Ibnu Majah)
// dan diamalkan luas; redaksi panjang Subuh memuat tambahan shalawat
// penutup yang lazim dibaca di Indonesia (mazhab Syafi'i).
// Konten: ringkasan edukasi yang ditulis ulang — bukan fatwa.
// Modul ini HANYA diimpor oleh DoaQunutPage agar ikut chunk halamannya.

export const DISCLAIMER_QUNUT =
  'Label edukasi — bukan fatwa. Perbedaan praktik qunut antar mazhab adalah khilafiyah yang mu‘tabar (diperhitungkan); ikuti bimbingan guru/ulama dan kebiasaan jamaah setempat, dan jangan saling menyalahkan.';

export const DOA_QUNUT = [
  {
    id: 'subuh',
    judul: 'Doa Qunut Subuh',
    kapan:
      'Dibaca setiap hari pada sholat Subuh, di rakaat kedua setelah bangkit dari rukuk (i‘tidal) dan sebelum sujud — posisi yang masyhur dalam mazhab Syafi‘i. Dibaca dengan mengangkat kedua tangan, suara pelan (sirr) bila sendirian; imam membacanya dengan suara terdengar dan makmum mengaminkan.',
    arab: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَى مَا قَضَيْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ، وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ',
    latin:
      'Allaahummahdinii fiiman hadait, wa ‘aafinii fiiman ‘aafait, wa tawallanii fiiman tawallait, wa baarik lii fiimaa a‘thait, wa qinii syarra maa qadhait, fa innaka taqdhii wa laa yuqdhaa ‘alaik, wa innahu laa yadzillu man waalait, wa laa ya‘izzu man ‘aadait, tabaarakta rabbanaa wa ta‘aalait, fa lakal hamdu ‘alaa maa qadhait, astaghfiruka wa atuubu ilaik, wa shallallaahu ‘alaa sayyidinaa Muhammadinin nabiyyil ummiyyi wa ‘alaa aalihi wa shahbihi wa sallam.',
    arti: 'Ya Allah, berilah aku petunjuk sebagaimana orang-orang yang telah Engkau beri petunjuk. Berilah aku kesehatan sebagaimana orang-orang yang telah Engkau beri kesehatan. Pimpinlah aku sebagaimana orang-orang yang telah Engkau pimpin. Berilah keberkahan atas apa yang telah Engkau berikan kepadaku. Dan lindungilah aku dari keburukan apa yang telah Engkau tetapkan. Sesungguhnya Engkaulah yang menetapkan dan tidak ada yang menetapkan atas-Mu. Sesungguhnya tidak akan hina orang yang telah Engkau pimpin, dan tidak akan mulia orang yang Engkau musuhi. Maha Suci Engkau wahai Rabb kami dan Maha Tinggi. Bagi-Mu segala puji atas apa yang Engkau tetapkan. Aku memohon ampun kepada-Mu dan bertaubat kepada-Mu. Semoga Allah melimpahkan shalawat kepada junjungan kami Nabi Muhammad, nabi yang ummi, beserta keluarga dan para sahabatnya, serta salam sejahtera.',
    catatan:
      'Di Indonesia (mayoritas Syafi‘i) redaksi panjang dengan shalawat penutup inilah yang paling masyhur. Bila menjadi makmum, cukup mengaminkan doa imam dan ikut membaca pada bagian pujian (tsana) mulai “fa innaka taqdhii…” menurut penjelasan banyak guru.',
  },
  {
    id: 'witir',
    judul: 'Doa Qunut Witir',
    kapan:
      'Dibaca pada sholat Witir, di rakaat terakhir setelah i‘tidal sebelum sujud. Dalam mazhab Syafi‘i dianjurkan khusus pada paruh kedua bulan Ramadhan (mulai malam ke-16); sebagian ulama menganjurkannya sepanjang tahun. Dalam mazhab Hanafi qunut witir dibaca sepanjang tahun sebelum rukuk.',
    arab: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
    latin:
      'Allaahummahdinii fiiman hadait, wa ‘aafinii fiiman ‘aafait, wa tawallanii fiiman tawallait, wa baarik lii fiimaa a‘thait, wa qinii syarra maa qadhait, fa innaka taqdhii wa laa yuqdhaa ‘alaik, wa innahu laa yadzillu man waalait, tabaarakta rabbanaa wa ta‘aalait.',
    arti: 'Ya Allah, berilah aku petunjuk sebagaimana orang-orang yang telah Engkau beri petunjuk. Berilah aku kesehatan sebagaimana orang-orang yang telah Engkau beri kesehatan. Pimpinlah aku sebagaimana orang-orang yang telah Engkau pimpin. Berilah keberkahan atas apa yang telah Engkau berikan kepadaku. Dan lindungilah aku dari keburukan apa yang telah Engkau tetapkan. Sesungguhnya Engkaulah yang menetapkan dan tidak ada yang menetapkan atas-Mu. Sesungguhnya tidak akan hina orang yang telah Engkau pimpin. Maha Suci Engkau wahai Rabb kami dan Maha Tinggi.',
    catatan:
      'Redaksi di atas adalah inti doa dari hadits Al-Hasan bin Ali. Di banyak masjid, qunut witir Ramadhan dibaca dengan redaksi panjang yang sama seperti qunut Subuh (ditambah shalawat penutup) — keduanya boleh, sesuaikan dengan imam dan jamaah setempat.',
  },
];

// Perbedaan ringkas antar mazhab — label edukasi.
export const PERBEDAAN_QUNUT = [
  {
    mazhab: 'Syafi‘i',
    isi: 'Qunut Subuh: sunnah muakkad setiap hari, setelah i‘tidal rakaat kedua. Qunut witir: dianjurkan pada paruh kedua Ramadhan, setelah i‘tidal.',
  },
  {
    mazhab: 'Maliki',
    isi: 'Qunut Subuh: dianjurkan (mandub), dibaca sebelum rukuk dengan suara pelan. Qunut witir tidak menjadi praktik rutin.',
  },
  {
    mazhab: 'Hanafi',
    isi: 'Tidak ada qunut rutin pada Subuh (qunut hanya untuk nazilah/musibah besar menurut sebagian ulama). Qunut witir: dibaca sepanjang tahun, sebelum rukuk rakaat ketiga.',
  },
  {
    mazhab: 'Hambali',
    isi: 'Tidak ada qunut rutin pada Subuh kecuali nazilah. Qunut witir: disunnahkan, boleh sebelum atau sesudah rukuk.',
  },
];

export const CATATAN_QUNUT_NAZILAH =
  'Selain dua qunut di atas, dikenal Qunut Nazilah: doa khusus yang dibaca pada sholat fardhu ketika kaum muslimin ditimpa musibah besar. Isinya disesuaikan dengan musibah yang terjadi dan mengikuti arahan ulama/setempat.';
