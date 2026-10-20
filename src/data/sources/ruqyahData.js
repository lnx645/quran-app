// Data statis Ruqyah Syar'iyyah (data layer).
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa dan bukan pengganti pengobatan medis. Teks ayat di bawah
// adalah teks Al-Qur'an lazim; arti ringkasnya parafrase singkat, bukan
// terjemahan resmi — terjemahan lengkap tersedia di halaman surah.
// Modul ini HANYA diimpor oleh RuqyahPage agar ikut chunk halamannya.
// Field surah/dari/sampai dipakai pemutar berurutan: audio PER-AYAT
// diambil dari Quran.com lewat QuranRepositoryImpl.getAudioAyatUrl
// (pola yang sama dengan pemutar berurutan DzikirPage).

export const DISCLAIMER_RUQYAH =
  'Ringkasan edukasi — bukan fatwa dan bukan pengganti pengobatan medis. Ruqyah adalah ikhtiar doa dan bacaan; bila sakit berlanjut, berobatlah juga kepada tenaga medis. Untuk bimbingan ruqyah, silakan rujuk ustadz/ulama terpercaya setempat.';

export const PENGERTIAN_RUQYAH = {
  judul: 'Pengertian Ruqyah Syar\u2019iyyah',
  isi: 'Ruqyah syar\u2019iyyah adalah pengobatan dengan membacakan ayat-ayat Al-Qur\u2019an dan doa-doa yang bersumber dari sunnah Nabi \uFD3A, lalu meniupkannya (dengan sedikit hembusan) kepada diri sendiri atau orang yang sakit, seraya memohon kesembuhan kepada Allah. Ruqyah dipakai untuk memohon perlindungan dan kesembuhan — antara lain dari gangguan jin/sihir (\u2019ain/hasad) maupun keluhan penyakit pada umumnya — sebagaimana Nabi \uFD3A meruqyah dirinya dan keluarganya.',
};

export const SYARAT_RUQYAH = [
  {
    judul: 'Dari Al-Qur\u2019an dan sunnah',
    isi: 'Bacaannya berasal dari ayat Al-Qur\u2019an, nama dan sifat Allah, atau doa yang diajarkan Rasulullah \uFD3A — bukan mantra, jampi, atau lafaz yang tidak dikenal sumbernya.',
  },
  {
    judul: 'Bahasa yang dipahami maknanya',
    isi: 'Bacaan harus jelas dan dipahami artinya (bahasa Arab Qur\u2019an/sunnah, atau doa berbahasa sendiri yang maknanya baik). Dilarang memakai kalimat yang tidak diketahui maknanya karena dikhawatirkan mengandung kesyirikan.',
  },
  {
    judul: 'Yakin kesembuhan dari Allah',
    isi: 'Bacaan hanyalah sebab/perantara. Yang menyembuhkan adalah Allah semata — meyakini bacaan, peruqyah, air, atau benda lain menyembuhkan dengan sendirinya adalah keyakinan yang keliru.',
  },
  {
    judul: 'Tidak disertai praktik terlarang',
    isi: 'Tanpa jimat, rajah, bantuan jin, permintaan kepada selain Allah, atau cara-cara yang diharamkan. Bila ada unsur tersebut, itu bukan lagi ruqyah syar\u2019iyyah.',
  },
];

export const CARA_RUQYAH = [
  {
    judul: 'Niat & bersuci',
    isi: 'Awali dengan niat memohon kesembuhan/perlindungan kepada Allah; dianjurkan dalam keadaan berwudhu, duduk tenang, dan menghadirkan hati.',
  },
  {
    judul: 'Baca ayat & doa ruqyah',
    isi: 'Bacakan ayat-ayat pada playlist di halaman ini — Al-Fatihah, Ayat Kursi, penutup Al-Baqarah, dan tiga surah perlindungan (Al-Ikhlas, Al-Falaq, An-Naas) — dengan tartil. Boleh diulang, antara lain tiga surah terakhir lazim dibaca 3 kali sebagaimana pada dzikir pagi-petang.',
  },
  {
    judul: 'Tiupkan (nafts) ke tubuh / telapak tangan',
    isi: 'Setelah membaca, tiupkan hembusan ringan disertai sedikit ludah halus (nafts) ke bagian yang sakit, atau ke kedua telapak tangan lalu usapkan ke wajah dan badan — sebagaimana dicontohkan Nabi \uFD3A saat meruqyah dirinya menjelang tidur dan saat sakit.',
  },
  {
    judul: 'Bisa mandiri atau oleh orang lain',
    isi: 'Ruqyah boleh dilakukan sendiri untuk diri sendiri (yang utama untuk kebutuhan harian), atau oleh orang lain — keluarga maupun peruqyah terpercaya yang bacaannya sesuai sunnah. Peruqyah tetap menjaga adab: mahram/khalwat diperhatikan, dan tidak menyentuh yang bukan mahramnya.',
  },
  {
    judul: 'Tutup dengan doa & tawakal',
    isi: 'Akhiri dengan doa memohon kesembuhan dan bertawakal. Ulangi secara rutin (misalnya pagi dan petang bersama dzikir) dan iringi dengan pengobatan medis bila penyakitnya memerlukan.',
  },
];

// Kelompok ayat ruqyah untuk playlist audio berurutan.
// urutan = urutan putar; surah/dari/sampai = rentang ayat untuk audio.
export const KELOMPOK_RUQYAH = [
  {
    id: 'fatihah',
    judul: 'Al-Fatihah',
    referensi: 'QS. Al-Fatihah: 1\u20137',
    label: 'Al-Fatihah (1: 1\u20137)',
    surah: 1,
    dari: 1,
    sampai: 7,
    arab: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    artiRingkas:
      'Surah pembuka Al-Qur\u2019an: pujian kepada Allah, pengakuan hanya kepada-Nya kita menyembah dan memohon pertolongan, serta doa memohon jalan yang lurus. Nabi \uFD3A menyebut Al-Fatihah sebagai ruqyah — seorang sahabat meruqyah kepala suku yang tersengat dengan surah ini dan sembuh (HR. Bukhari & Muslim).',
  },
  {
    id: 'kursi',
    judul: 'Ayat Kursi',
    referensi: 'QS. Al-Baqarah: 255',
    label: 'Ayat Kursi (2: 255)',
    surah: 2,
    dari: 255,
    sampai: 255,
    arab: 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ',
    artiRingkas:
      'Ayat tentang keesaan dan kekuasaan Allah yang Mahahidup dan terus mengurus makhluk-Nya: tidak ada yang memberi syafaat tanpa izin-Nya dan tidak berat bagi-Nya memelihara langit dan bumi. Dibaca sebagai benteng perlindungan, antara lain sebelum tidur dan pada dzikir pagi-petang.',
  },
  {
    id: 'baqarah-penutup',
    judul: 'Penutup Al-Baqarah',
    referensi: 'QS. Al-Baqarah: 285\u2013286',
    label: 'Al-Baqarah (2: 285\u2013286)',
    surah: 2,
    dari: 285,
    sampai: 286,
    arab: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ. لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    artiRingkas:
      'Dua ayat terakhir Al-Baqarah: pernyataan iman Rasul dan orang beriman (\u201ckami dengar dan kami taat\u201d), janji Allah tidak membebani jiwa melebihi kesanggupannya, dan doa memohon ampunan, maaf, rahmat, serta pertolongan. \u201cSiapa membacanya pada malam hari, cukuplah keduanya baginya\u201d (HR. Bukhari & Muslim).',
  },
  {
    id: 'ikhlas',
    judul: 'Al-Ikhlas',
    referensi: 'QS. Al-Ikhlas: 1\u20134',
    label: 'Al-Ikhlas (112: 1\u20134)',
    surah: 112,
    dari: 1,
    sampai: 4,
    arab: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
    artiRingkas:
      '\u201cKatakanlah: Dialah Allah Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tidak beranak dan tidak diperanakkan, dan tidak ada sesuatu pun yang setara dengan-Nya.\u201d Bagian dari tiga surah perlindungan (al-mu\u2019awwidz\u0101t).',
  },
  {
    id: 'falaq',
    judul: 'Al-Falaq',
    referensi: 'QS. Al-Falaq: 1\u20135',
    label: 'Al-Falaq (113: 1\u20135)',
    surah: 113,
    dari: 1,
    sampai: 5,
    arab: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    artiRingkas:
      '\u201cKatakanlah: Aku berlindung kepada Tuhan yang (menjaga) fajar — dari kejahatan makhluk yang Dia ciptakan, kejahatan malam apabila gelap gulita, kejahatan para penyihir yang meniup buhul, dan kejahatan pendengki apabila ia dengki.\u201d',
  },
  {
    id: 'naas',
    judul: 'An-Naas',
    referensi: 'QS. An-Naas: 1\u20136',
    label: 'An-Naas (114: 1\u20136)',
    surah: 114,
    dari: 1,
    sampai: 6,
    arab: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ ۝ مَلِكِ ٱلنَّاسِ ۝ إِلَـٰهِ ٱلنَّاسِ ۝ مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ ۝ ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ ۝ مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
    artiRingkas:
      '\u201cKatakanlah: Aku berlindung kepada Tuhan manusia, Raja manusia, Sembahan manusia — dari kejahatan (setan) pembisik yang bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari golongan jin dan manusia.\u201d',
  },
];

export const CATATAN_RUQYAH =
  'Nabi \uFD3A membaca Al-Ikhlas, Al-Falaq, dan An-Naas setiap malam sebelum tidur, meniupkan ke kedua telapak tangannya, lalu mengusapkannya ke wajah dan badannya (HR. Bukhari & Muslim). Menjadikan ayat-ayat ini wirid harian adalah bentuk ruqyah mandiri yang paling dicontohkan.';
