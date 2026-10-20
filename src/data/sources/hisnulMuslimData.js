// Data statis Hisnul Muslim (data layer): doa-doa masyhur per aktivitas &
// situasi, dari Al-Qur'an dan hadits, sebagaimana dihimpun dalam kitab
// Hisnul Muslim karya Syaikh Sa'id bin Wahf Al-Qahthani.
// Teks doa itu sendiri bersumber dari Qur'an/hadits (riwayat dicantumkan
// per doa); susunan kategori mengikuti aktivitas keseharian.
// Modul ini HANYA diimpor oleh HisnulMuslimPage agar ikut chunk halamannya.
//
// Struktur: [{ kategori, ikon (kunci string, dipetakan di halaman), doa:
// [{ judul, arab, latin, arti, riwayat }] }]
export const HISNUL_MUSLIM = [
  {
    kategori: 'Bangun Tidur',
    ikon: 'bangun',
    doa: [
      {
        judul: 'Doa Bangun Tidur',
        arab: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
        latin: 'Alhamdulillaahil ladzii ahyaanaa ba’da maa amaatanaa wa ilaihin nusyuur',
        arti: 'Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami (tidur), dan hanya kepada-Nya kami akan dibangkitkan.',
        riwayat: 'HR. Bukhari',
      },
      {
        judul: 'Doa Bangun Tidur (Lainnya)',
        arab: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي وَأَذِنَ لِي بِذِكْرِهِ',
        latin: 'Alhamdulillaahil ladzii ‘aafaanii fii jasadii wa radda ‘alayya ruuhii wa adzina lii bidzikrih',
        arti: 'Segala puji bagi Allah yang telah menyehatkan badanku, mengembalikan ruhku kepadaku, dan mengizinkanku untuk berdzikir kepada-Nya.',
        riwayat: 'HR. Tirmidzi',
      },
    ],
  },
  {
    kategori: 'Sebelum & Sesudah Makan',
    ikon: 'makan',
    doa: [
      {
        judul: 'Doa Sebelum Makan',
        arab: 'بِسْمِ اللَّهِ',
        latin: 'Bismillaah',
        arti: 'Dengan menyebut nama Allah. (Apabila tersedia makanan, dianjurkan pula berdoa memohon keberkahan atas rezeki tersebut.)',
        riwayat: 'HR. Bukhari & Muslim',
      },
      {
        judul: 'Bila Lupa Membaca Bismillah',
        arab: 'بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ',
        latin: 'Bismillaahi fii awwalihi wa aakhirih',
        arti: 'Dengan nama Allah pada awal dan akhirnya.',
        riwayat: 'HR. Abu Dawud & Tirmidzi',
      },
      {
        judul: 'Doa Sesudah Makan',
        arab: 'الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ، غَيْرَ مَكْفِيٍّ وَلَا مُوَدَّعٍ وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا',
        latin: 'Alhamdulillaahi hamdan katsiiran thayyiban mubaarakan fiih, ghayra makfiyyin wa laa muwadda’in wa laa mustaghnan ‘anhu rabbanaa',
        arti: 'Segala puji bagi Allah dengan pujian yang banyak, baik, dan diberkahi; pujian yang tidak pernah cukup, tidak ditinggalkan, dan selalu dibutuhkan, wahai Rabb kami.',
        riwayat: 'HR. Bukhari',
      },
    ],
  },
  {
    kategori: 'Masuk & Keluar Rumah',
    ikon: 'rumah',
    doa: [
      {
        judul: 'Doa Masuk Rumah',
        arab: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
        latin: 'Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa ‘alaa rabbinaa tawakkalnaa',
        arti: 'Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan hanya kepada Rabb kami, kami bertawakal. (Kemudian ucapkan salam kepada penghuni rumah.)',
        riwayat: 'HR. Abu Dawud',
      },
      {
        judul: 'Doa Keluar Rumah',
        arab: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
        latin: 'Bismillaahi tawakkaltu ‘alallaah, laa hawla wa laa quwwata illaa billaah',
        arti: 'Dengan nama Allah, aku bertawakal kepada Allah, tiada daya dan kekuatan kecuali dengan pertolongan Allah.',
        riwayat: 'HR. Abu Dawud & Tirmidzi',
      },
      {
        judul: 'Doa Keluar Rumah (Tambahan)',
        arab: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ',
        latin: 'Allahumma innii a’uudzu bika an adhilla aw udhalla, aw azilla aw uzalla, aw azhlima aw uzhlama, aw ajhala aw yujhala ‘alayya',
        arti: 'Ya Allah, aku berlindung kepada-Mu dari tersesat atau disesatkan, tergelincir atau digelincirkan, menzalimi atau dizalimi, dan berbuat bodoh atau dibodohi.',
        riwayat: 'HR. Abu Dawud, Tirmidzi, An-Nasa’i & Ibnu Majah',
      },
    ],
  },
  {
    kategori: 'Masuk & Keluar Masjid',
    ikon: 'masjid',
    doa: [
      {
        judul: 'Doa Masuk Masjid',
        arab: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ وَبِوَجْهِهِ الْكَرِيمِ وَسُلْطَانِهِ الْقَدِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ، بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
        latin: 'A’uudzu billaahil ‘azhiimi wa biwajhihil kariimi wa sulthaanihil qadiimi minasy syaithaanir rajiim. Bismillaahi wash shalaatu was salaamu ‘alaa rasuulillaah. Allahummaf-tah lii abwaaba rahmatik',
        arti: 'Aku berlindung kepada Allah Yang Maha Agung, dengan wajah-Nya yang mulia dan kekuasaan-Nya yang terdahulu, dari setan yang terkutuk. Dengan nama Allah, shalawat dan salam atas Rasulullah. Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
        riwayat: 'HR. Abu Dawud & Muslim',
      },
      {
        judul: 'Doa Keluar Masjid',
        arab: 'بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ',
        latin: 'Bismillaahi wash shalaatu was salaamu ‘alaa rasuulillaah. Allahumma innii as-aluka min fadhlika. Allahumma‘-shimnii minasy syaithaanir rajiim',
        arti: 'Dengan nama Allah, shalawat dan salam atas Rasulullah. Ya Allah, sesungguhnya aku memohon kepada-Mu karunia-Mu. Ya Allah, lindungilah aku dari setan yang terkutuk.',
        riwayat: 'HR. Muslim, Abu Dawud & Ibnu Majah',
      },
    ],
  },
  {
    kategori: 'Berpakaian',
    ikon: 'pakaian',
    doa: [
      {
        judul: 'Doa Memakai Pakaian',
        arab: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
        latin: 'Alhamdulillaahil ladzii kasaanii haadzaa wa razaqaniihi min ghayri hawlin minnii wa laa quwwah',
        arti: 'Segala puji bagi Allah yang telah memakaikan pakaian ini kepadaku dan memberikannya sebagai rezeki, tanpa daya dan kekuatan dariku.',
        riwayat: 'HR. Abu Dawud, Tirmidzi & Ibnu Majah',
      },
      {
        judul: 'Doa Memakai Pakaian Baru',
        arab: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ',
        latin: 'Allahumma lakal hamdu anta kasawtaniih, as-aluka min khayrihi wa khayri maa shuni’a lah, wa a’uudzu bika min syarrihi wa syarri maa shuni’a lah',
        arti: 'Ya Allah, segala puji bagi-Mu, Engkaulah yang memakaikannya kepadaku. Aku memohon kepada-Mu kebaikannya dan kebaikan tujuan ia dibuat, dan aku berlindung kepada-Mu dari keburukannya dan keburukan tujuan ia dibuat.',
        riwayat: 'HR. Abu Dawud & Tirmidzi',
      },
      {
        judul: 'Doa Melepas Pakaian',
        arab: 'بِسْمِ اللَّهِ',
        latin: 'Bismillaah',
        arti: 'Dengan menyebut nama Allah. (Membaca bismillah menjadi penghalang antara pandangan jin dan aurat manusia.)',
        riwayat: 'HR. Tirmidzi',
      },
    ],
  },
  {
    kategori: 'Safar',
    ikon: 'safar',
    doa: [
      {
        judul: 'Doa Naik Kendaraan',
        arab: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
        latin: 'Subhaanal ladzii sakhkhara lanaa haadzaa wa maa kunnaa lahu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun',
        arti: 'Maha Suci (Allah) yang telah menundukkan (kendaraan) ini untuk kami, padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Rabb kami.',
        riwayat: 'QS. Az-Zukhruf: 13–14',
      },
      {
        judul: 'Doa Bepergian (Safar)',
        arab: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ',
        latin: 'Allahumma innaa nas-aluka fii safarinaa haadzal birra wat taqwaa, wa minal ‘amali maa tardhaa. Allahumma hawwin ‘alaynaa safaranaa haadzaa wathwi ‘annaa bu’dah. Allahumma antash shaahibu fis safari wal khaliifatu fil ahl',
        arti: 'Ya Allah, kami memohon kepada-Mu kebaikan dan ketakwaan dalam perjalanan ini, serta amal yang Engkau ridhai. Ya Allah, mudahkanlah perjalanan kami ini dan dekatkanlah jaraknya yang jauh. Ya Allah, Engkaulah teman dalam perjalanan dan penjaga bagi keluarga yang ditinggalkan.',
        riwayat: 'HR. Muslim',
      },
      {
        judul: 'Doa Singgah / Tiba di Suatu Tempat',
        arab: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        latin: 'A’uudzu bikalimaatillaahit taammaati min syarri maa khalaq',
        arti: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang Dia ciptakan.',
        riwayat: 'HR. Muslim',
      },
    ],
  },
  {
    kategori: 'Sakit & Menjenguk Orang Sakit',
    ikon: 'sakit',
    doa: [
      {
        judul: 'Doa Saat Merasakan Sakit',
        arab: 'بِسْمِ اللَّهِ (٣×)، أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (٧×)',
        latin: 'Bismillaah (3 kali). A’uudzu billaahi wa qudratihi min syarri maa ajidu wa uhaadzir (7 kali)',
        arti: 'Dengan nama Allah. Aku berlindung kepada Allah dan kekuasaan-Nya dari kejahatan (rasa sakit) yang aku rasakan dan aku khawatirkan. (Dibaca sambil meletakkan tangan pada bagian yang sakit.)',
        riwayat: 'HR. Muslim',
      },
      {
        judul: 'Ucapan untuk Orang Sakit',
        arab: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ',
        latin: 'Laa ba’sa thahuurun insyaa allaah',
        arti: 'Tidak apa-apa, menjadi pembersih (dari dosa), insya Allah.',
        riwayat: 'HR. Bukhari',
      },
      {
        judul: 'Doa Memohon Kesembuhan',
        arab: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
        latin: 'Allahumma rabban naasi adzhibil ba’sa, isyfi antasy syaafii, laa syifaa-a illaa syifaa-uka, syifaa-an laa yughaadiru saqamaa',
        arti: 'Ya Allah, Rabb seluruh manusia, hilangkanlah penyakit ini. Sembuhkanlah, Engkaulah Yang Maha Menyembuhkan; tidak ada kesembuhan kecuali kesembuhan dari-Mu, kesembuhan yang tidak meninggalkan penyakit.',
        riwayat: 'HR. Bukhari & Muslim',
      },
    ],
  },
  {
    kategori: 'Saat Hujan & Angin',
    ikon: 'hujan',
    doa: [
      {
        judul: 'Doa Ketika Turun Hujan',
        arab: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
        latin: 'Allahumma shayyiban naafi’an',
        arti: 'Ya Allah, jadikanlah hujan ini hujan yang bermanfaat.',
        riwayat: 'HR. Bukhari',
      },
      {
        judul: 'Doa Setelah Turun Hujan',
        arab: 'مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ',
        latin: 'Muthirnaa bifadhlillaahi wa rahmatih',
        arti: 'Kami diberi hujan berkat karunia dan rahmat Allah.',
        riwayat: 'HR. Bukhari & Muslim',
      },
      {
        judul: 'Doa Ketika Angin Kencang',
        arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ',
        latin: 'Allahumma innii as-aluka khayrahaa wa khayra maa fiihaa wa khayra maa ursilat bih, wa a’uudzu bika min syarrihaa wa syarri maa fiihaa wa syarri maa ursilat bih',
        arti: 'Ya Allah, aku memohon kepada-Mu kebaikan angin ini, kebaikan yang ada padanya, dan kebaikan tujuan ia diutus. Dan aku berlindung kepada-Mu dari keburukannya, keburukan yang ada padanya, dan keburukan tujuan ia diutus.',
        riwayat: 'HR. Muslim',
      },
    ],
  },
  {
    kategori: 'Berbuka Puasa',
    ikon: 'berbuka',
    doa: [
      {
        judul: 'Doa Berbuka Puasa',
        arab: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
        latin: 'Dzahabazh zhama-u wabtallatil ‘uruuqu wa tsabatal ajru insyaa allaah',
        arti: 'Telah hilang rasa haus, urat-urat telah basah, dan pahala telah tetap, insya Allah.',
        riwayat: 'HR. Abu Dawud',
      },
      {
        judul: 'Doa Berbuka Puasa (Lainnya)',
        arab: 'اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
        latin: 'Allahumma laka shumtu wa ‘alaa rizqika afthartu',
        arti: 'Ya Allah, untuk-Mu aku berpuasa dan dengan rezeki-Mu aku berbuka.',
        riwayat: 'HR. Abu Dawud',
      },
      {
        judul: 'Doa untuk yang Menjamu Berbuka',
        arab: 'أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ، وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ',
        latin: 'Afthara ‘indakumush shaa-imuun, wa akala tha’aamakumul abraar, wa shallat ‘alaykumul malaa-ikah',
        arti: 'Semoga orang-orang yang berpuasa berbuka di rumahmu, makananmu dimakan oleh orang-orang saleh, dan para malaikat mendoakanmu.',
        riwayat: 'HR. Abu Dawud & Ibnu Majah',
      },
    ],
  },
  {
    kategori: 'Sebelum Tidur',
    ikon: 'tidur',
    doa: [
      {
        judul: 'Doa Sebelum Tidur',
        arab: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
        latin: 'Bismika allaahumma amuutu wa ahyaa',
        arti: 'Dengan nama-Mu ya Allah, aku mati dan aku hidup.',
        riwayat: 'HR. Bukhari & Muslim',
      },
      {
        judul: 'Doa Perlindungan Sebelum Tidur',
        arab: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
        latin: 'Allahumma qinii ‘adzaabaka yawma tab’atsu ‘ibaadak',
        arti: 'Ya Allah, lindungilah aku dari azab-Mu pada hari Engkau membangkitkan hamba-hamba-Mu. (Dibaca 3 kali.)',
        riwayat: 'HR. Abu Dawud & Tirmidzi',
      },
      {
        judul: 'Doa Bila Gelisah / Takut Saat Tidur',
        arab: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ',
        latin: 'A’uudzu bikalimaatillaahit taammaati min ghadhabihi wa ‘iqaabihi wa syarri ‘ibaadih, wa min hamazaatisy syayaathiini wa an yahdhuruun',
        arti: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kemurkaan dan siksaan-Nya, dari kejahatan hamba-hamba-Nya, dari godaan setan, dan dari kedatangan mereka kepadaku.',
        riwayat: 'HR. Abu Dawud & Tirmidzi',
      },
    ],
  },
  {
    kategori: 'Gelisah, Sedih & Berutang',
    ikon: 'gelisah',
    doa: [
      {
        judul: 'Doa Berlindung dari Gelisah & Utang',
        arab: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
        latin: 'Allahumma innii a’uudzu bika minal hammi wal hazan, wal ‘ajzi wal kasal, wal bukhli wal jubn, wa dhala’id dayni wa ghalabatir rijaal',
        arti: 'Ya Allah, aku berlindung kepada-Mu dari kegelisahan dan kesedihan, dari kelemahan dan kemalasan, dari kekikiran dan sifat pengecut, dari lilitan utang dan tekanan orang lain.',
        riwayat: 'HR. Bukhari',
      },
      {
        judul: 'Doa Nabi Yunus (Saat Kesulitan)',
        arab: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
        latin: 'Laa ilaaha illaa anta subhaanaka innii kuntu minazh zhaalimiin',
        arti: 'Tidak ada sesembahan yang berhak disembah kecuali Engkau. Maha Suci Engkau, sesungguhnya aku termasuk orang-orang yang zalim.',
        riwayat: 'QS. Al-Anbiya’: 87',
      },
      {
        judul: 'Doa Saat Ditimpa Kesusahan',
        arab: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',
        latin: 'Yaa hayyu yaa qayyuumu birahmatika astaghiits',
        arti: 'Wahai Yang Maha Hidup, wahai Yang Maha Berdiri Sendiri (mengurus makhluk-Nya), dengan rahmat-Mu aku memohon pertolongan.',
        riwayat: 'HR. Tirmidzi',
      },
    ],
  },
  {
    kategori: 'Doa untuk Orang Tua',
    ikon: 'orangtua',
    doa: [
      {
        judul: 'Doa Memohon Rahmat untuk Orang Tua',
        arab: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
        latin: 'Rabbir hamhumaa kamaa rabbayaanii shaghiiraa',
        arti: 'Ya Rabbku, sayangilah kedua orang tuaku sebagaimana mereka mendidikku di waktu kecil.',
        riwayat: 'QS. Al-Isra’: 24',
      },
      {
        judul: 'Doa Ampunan untuk Orang Tua',
        arab: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
        latin: 'Rabbanaghfir lii wa liwaalidayya wa lil mu’miniina yawma yaquumul hisaab',
        arti: 'Ya Rabb kami, ampunilah aku, kedua orang tuaku, dan seluruh orang mukmin pada hari terjadinya hisab (perhitungan amal).',
        riwayat: 'QS. Ibrahim: 41',
      },
      {
        judul: 'Doa Syukur atas Orang Tua',
        arab: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
        latin: 'Rabbi awzi’nii an asykura ni’matakal latii an’amta ‘alayya wa ‘alaa waalidayya wa an a’mala shaalihan tardhaahu wa adkhilnii birahmatika fii ‘ibaadikash shaalihiin',
        arti: 'Ya Rabbku, berilah aku ilham untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan kepada kedua orang tuaku, dan agar aku dapat beramal saleh yang Engkau ridhai; dan masukkanlah aku dengan rahmat-Mu ke dalam golongan hamba-hamba-Mu yang saleh.',
        riwayat: 'QS. An-Naml: 19',
      },
    ],
  },
  {
    kategori: 'Doa Sehari-hari Pilihan',
    ikon: 'pilihan',
    doa: [
      {
        judul: 'Doa Ketika Mendengar Petir',
        arab: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ',
        latin: 'Subhaanal ladzii yusabbihur ra’du bihamdihi wal malaa-ikatu min khiifatih',
        arti: 'Maha Suci (Allah) yang petir bertasbih dengan memuji-Nya, demikian pula para malaikat karena takut kepada-Nya.',
        riwayat: 'Dari Abdullah bin Az-Zubair, HR. Malik',
      },
      {
        judul: 'Doa Setelah Adzan',
        arab: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
        latin: 'Allahumma rabba haadzihid da’watit taammah wash shalaatil qaa-imah, aati muhammadanil wasiilata wal fadhiilah, wab’atshu maqaaman mahmuudanil ladzii wa’adtah',
        arti: 'Ya Allah, Rabb seruan yang sempurna ini dan shalat yang akan didirikan, berikanlah kepada Muhammad wasilah (kedudukan tinggi) dan keutamaan, dan bangkitkanlah beliau pada kedudukan terpuji yang telah Engkau janjikan. (Dibaca setelah menjawab adzan dan bershalawat.)',
        riwayat: 'HR. Bukhari',
      },
      {
        judul: 'Doa Masuk Kamar Mandi',
        arab: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
        latin: 'Allahumma innii a’uudzu bika minal khubutsi wal khabaa-its',
        arti: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari setan laki-laki dan setan perempuan (gangguan jin).',
        riwayat: 'HR. Bukhari & Muslim',
      },
    ],
  },
];

// Jumlah total doa (untuk subjudul halaman).
export const TOTAL_DOA_HISNUL = HISNUL_MUSLIM.reduce((n, k) => n + k.doa.length, 0);
