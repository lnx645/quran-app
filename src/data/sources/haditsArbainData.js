/**
 * Dataset: Hadits Arbain an-Nawawi — 42 hadits lengkap (teks Arab,
 * terjemahan Bahasa Indonesia, perawi, keterangan takhrij/sumber).
 *
 * SUMBER DATASET (diunduh & diverifikasi pada 2026-10-20):
 * - Repo: https://github.com/Eucl1ds/arbain-nawawi
 *   berkas `data/dataHadis.js`
 *   (raw: https://raw.githubusercontent.com/Eucl1ds/arbain-nawawi/main/data/dataHadis.js)
 * - LISENSI/ATRIBUSI: repo sumber TIDAK menyertakan berkas lisensi
 *   (GitHub API /license → 404, dicek 2026-10-20). Teks hadits adalah karya
 *   klasik Imam an-Nawawi (wafat 676 H) — domain publik. Terjemahan
 *   Indonesia, judul, dan keterangan takhrij diambil APA ADANYA dari repo
 *   di atas; satu-satunya perubahan: tag HTML bawaan sumber (<i>, <b>)
 *   dibersihkan menjadi teks polos.
 * - Field `perawi` diekstrak secara mekanis dari kalimat pembuka
 *   terjemahan sumber ("Dari … radhiyallahu …"), bukan karangan baru.
 * - Field `sumber` = keterangan takhrij dari dataset (kurung siku luar
 *   dibuang).
 *
 * PENTING (code splitting): modul ini BESAR — hanya boleh diimpor oleh
 * HaditsPage (chunk lazy /hadits). Kartu beranda memakai cuplikan kecil
 * dari haditsHarianData.js, JANGAN impor modul ini dari komponen beranda.
 */

export const SUMBER_HADITS_ARBAIN = {
  nama: 'Dataset Hadits Arbain — github.com/Eucl1ds/arbain-nawawi',
  url: 'https://github.com/Eucl1ds/arbain-nawawi',
  catatan:
    'Teks Arab & terjemahan Indonesia dari dataset terbuka di atas (repo sumber tidak menyertakan berkas lisensi; teks hadits adalah karya klasik domain publik).',
};

export const HADITS_ARBAIN = [
  {
    "nomor": 1,
    "judul": "Amal Tergantung Niat",
    "arab": "عَنْ أَمِيرِ المُؤمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الخَطَّابِ رَضِيَ اللهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ يَقُوْلُ: إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللهِ وَرَسُوْلِهِ فَهِجْرَتُهُ إِلَى اللهِ وَرَسُوْلِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيْبُهَا، أَوْ امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ. رَوَاهُ إِمَامَا الْمُحَدِّثِيْنَ أَبُوْ عَبْدِ اللهِ مُحَمَّدُ بْنُ إِسْمَاعِيْلَ بْنِ إِبْرَاهِيْمَ بْنِ الْمُغِيْرَةِ بْنِ بَرْدِزْبَهْ الْبُخَارِي، وَأَبُوْ الْحُسَيْنِ مُسْلِمُ بْنُ الْحَجَّاجِ بْنِ مُسْلِمٍ الْقُشَيْرِيّ النَّيْسَابُوْرِيّ، فِيْ صَحِيْحَيْهِمَا اللَّذَيْنِ هُمَا أَصَحُّ الْكُتُبِ اْلمُصَنَّفَةِ.",
    "terjemahan": "Dari Amirul Mukminin Abu Hafsh Umar bin Al-Khaththab radhiyallahu ‘anhu dia berkata: ‘Aku mendengar Rasulullah shalallahu alaihi wa sallam bersabda: “Amalan-amalan itu hanyalah tergantung pada niatnya. Dan setiap orang itu hanyalah akan dibalas berdasarkan apa yang ia niatkan. Maka barang siapa yang hijrahnya kepada Allah dan Rasul-Nya, maka hijrahnya keapda Allah dan Rasul-Nya. Namun barang siapa yang hijrahnya untuk mendapatkan dunia atau seorang wanita yang ingin ia nikahi, maka hijrahnya kepada apa yang ia niatkan tersebut.” Diriwayatkan oleh dua Imamnya para ahli hadis, Abu Abdillah Muhammad bin Isma’il bin Ibrahim bin Al-Mughirah bin Bardizbah Bukhari dan Abul Husain Muslim bin Al-Hajjaj bin Muslim Al-Qusyairi An-Naisaburi dalam dua kitab shahih mereka, yang keduanya merupakan kitab yang paling shahih diantara kitab-kitab yang ada.",
    "perawi": "Amirul Mukminin Abu Hafsh Umar bin Al-Khaththab",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 1, 54, 2529, 3898, 5070, 6689, 6953); Shahih Muslim (no. 1907); Sunan Abu Dawud (no. 2201); Sunan At-Tirmidzi (no. 1647); Sunan Ibnu Majah (no. 4227); Sunan An-Nasa’i (I/59-60); Musnad Ahmad (I/25, 43); Sunan Ad-Daruquthni (I/136); dan Shahih Ibnu Khuzaimah (no. 455)"
  },
  {
    "nomor": 2,
    "judul": "Rukun Islam, Iman dan Ihsan",
    "arab": "عَنْ عُمَرَ رَضِيَ اللهُ عَنْهُ أَيضًا قَالَ: بَيْنَمَا نَحْنُ جُلُوْسٌ عِنْدَ رَسُوْلِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيْدُ بَيَاضِ الثِّيَابِ شَدِيْدُ سَوَادِ الشَّعْرِ لَا يُرَى عَلَيْهِ أَثَرُ السَّفَرِ وَلَا يَعْرِفُهُ مِنَّا أَحَدٌ حَتَّى جَلَسَ إِلَى النَّبِيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ فَأَسْنَدَ رُكْبَتَيْهِ إِلَى رُكْبَتَيْهِ وَوَضَعَ كَفَّيْهِ عَلَى فَخِذِيْهِ وَقَالَ: يَا مُحَمَّدُ أَخْبِرْنِي عَنِ الإِسْلَامِ، فَقَالَ رَسُولُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: الإِسْلَامُ أَنْ تَشْهَدَ أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَنَّ مُحَمَّدًا رَسُوْلُ اللهِ، وَتُقِيْمَ الصَّلَاةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُوْمَ رَمَضَانَ، وَتَحُجَّ البيْتَ إِنِ اسْتَطَعْتَ إِليْهِ سَبِيْلًا. قَالَ: صَدَقْتَ. فَعَجِبْنَا لَهُ يَسْأَلُهُ وَيُصَدِّقُهُ، قَالَ: فَأَخْبِرْنِيْ عَنِ الإِيْمَانِ، قَالَ: أَنْ تُؤْمِنَ بِاللهِ، وَمَلَائِكَتِهِ، وَكُتُبِهِ وَرُسُلِهِ، وَالْيَوْمِ الآخِرِ، وَتُؤْمِنَ بِالقَدَرِ خَيْرِهِ وَشَرِّهِ. قَالَ: صَدَقْتَ، قَالَ: فَأَخْبِرْنِيْ عَنِ الإِحْسَانِ، قَالَ: أَنْ تَعْبُدَ اللهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ قَالَ: فَأَخْبِرْنِي عَنِ السَّاعَةِ، قَالَ: مَا الْمَسئُوُلُ عَنْهَا بِأَعْلَمَ مِنَ السَّائِلِ قَالَ: فَأَخْبِرْنِيْ عَنْ أَمَارَاتِهَا، قَالَ: أَنْ تَلِدَ الأَمَةُ رَبَّتَهَا، وَأَنْ تَرَى الْحُفَاةَ الْعُرَاةَ الْعَالَةَ رِعَاءَ الشَّاءِ يَتَطَاوَلُوْنَ فِي البُنْيَانِ ثُمَّ انْطَلَقَ فَلَبِثْتُ مَلِيًّا ثُمَّ قَالَ: يَا عُمَرُ أَتَدْرِي مَنِ السَّائِلُ؟ قُلْتُ: اللهُ وَرَسُوْلُهُ أَعْلَمُ، قَالَ: فَإِنَّهُ جِبْرِيْلُ أَتَاكُمْ يُعَلِّمُكُمْ دِيْنَكُمْ. رَوَاهُ مُسْلِمٌ.",
    "terjemahan": "Dari Umar radhiyallahu ‘anhu pula dia berkata; pada suatu hari ketika kami sedang duduk-duduk bersama Rasulullah shallallahu ‘alaihi wa sallam, tiba-tiba datang seorang laki-laki berpakaian sangat putih, dan rambutnya sangat hitam, tidak terlihat padanya tanda-tanda bekas perjalanan, dan tidak seorang pun dari kami yang mengenalnya, kemudian ia duduk di hadapan Nabi shallallahu ‘alaihi wa sallam dan mendekatkan lututnya lalu meletakkan kedua tangannya di atas pahanya, seraya berkata: ‘Wahai Muhammad jelaskan kepadaku tentang Islam?’ Nabi shallallahu ‘alaihi wa sallam menjawab: ”Islam itu adalah engkau bersaksi bahwa tidak ada sesembahan yang berhak diibadahi dengan benar kecuali Allah dan Muhammad adalah utusan-Nya, engkau menegakkan shalat, menunaikan zakat, puasa Ramadhan dan haji ke Baitullah Al-Haram jika engkau mampu mengadakan perjalanan ke sana.” Laki-laki tersebut berkata: ‘Engkau benar.’ Maka kami pun terheran-heran padanya, dia yang bertanya dan dia sendiri yang membenarkan jawabannya. Dia berkata lagi: “Jelaskan kepadaku tentang iman?” Nabi shallallahu ‘alaihi wa sallam menjawab: “Iman itu adalah Engkau beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya dan hari akhir serta engkau beriman kepada takdir baik dan buruk.” Ia berkata: ‘Engkau benar.’ Kemudian laki-laki tersebut bertanya lagi: ‘Jelaskan kepadaku tentang ihsan?’ Beliau shallallahu ‘alaihi wa sallam bersabda: “Ihsan adalah Engkau beribadah kepada Allah seolah-olah engkau melihat-Nya. Kalaupun engkau tidak bisa melihat-Nya, sungguh Dia melihatmu.” Dia berkata: “Beritahu kepadaku kapan terjadinya kiamat?” Nabi shallallahu ‘alaihi wa sallam menjawab: “Tidaklah orang yang ditanya lebih mengetahui dari yang bertanya.” Ia berkata: “Jelaskan kepadaku tanda-tandanya!” Nabi shallallahu ‘alaihi wa sallam berkata: “Jika seorang budak wanita melahirkan tuannya dan jika engkau mendapati penggembala kambing yang tidak beralas kaki dan tidak pakaian saling berlomba dalam meninggikan bangunan.” Umar radhiyallahu ‘anhu berkata: ‘Kemudian laki-laki itu pergi, aku pun terdiam sejenak.’ Maka Rasulullah shallallahu ‘alaihi wa sallam bertanya kepadaku: “Wahai ‘Umar, tahukah engkau siapa orang tadi?” Aku pun menjawab: “Allah dan Rasul-Nya lebih tahu.” Nabi shallallahu ‘alaihi wa sallam bersabda: “Dia adalah Jibril yang datang untuk mengajarkan agama ini kepada kalian.” Diriwayatkan oleh Muslim.",
    "perawi": "Umar",
    "sumber": "Shahih: Shahih Muslim (no. 8); Sunan Abu Dawud (no. 4695); Sunan At-Tirmidzi (no. 2610); Sunan Ibnu Majah (no. 63); Sunan An-Nasa’i (VIII/97-101); dan Musnad Ahmad (I/27, 28, 51, 52); Musnad Ath-Thayalisi (no. 21); dan Musnad Abu Ya’la (no. 237)"
  },
  {
    "nomor": 3,
    "judul": "Rukun Islam",
    "arab": "عَنْ أَبِيْ عَبْدِ الرَّحْمَنِ عَبْدِ اللهِ بْنِ عُمَرَ بْنِ الخَطَّابِ رَضِيَ اللهُ عَنْهُمَا قَالَ: سَمِعْتُ النَّبِيَّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ يَقُوْلُ: بُنِيَ الإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَنَّ مُحَمَّدًا رَسُوْلُ اللهِ، وَإِقَامِ الصَّلَاةِ، وَإِيْتَاءِ الزَّكَاةِ، وَحَجِّ البَيْتِ، وَصَوْمِ رَمَضَانَ. رَوَاهُ الْبُخَارِي وَمُسْلِمٌ.",
    "terjemahan": "Dari Abdullah bin Umar radhiyallahu ‘anhuma dia berkata: ”Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Islam itu dibangun di atas lima dasar: persaksian (syahadat) bahwa tidak ada sesembahan yang berhak disembah kecuali Allah subhanahu wa ta’ala dan Muhammad adalah utusan Allah, menegakkan shalat, menunaikan zakat, haji (ke Baitullah) dan puasa di bulan Ramadhan.” Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Abdullah bin Umar",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 8); Shahih Muslim (no. 16); Sunan At-Tirmidzi (no. 2609); Sunan An-Nasa’i (VIII/107-108); Musnad Ahmad (II/26, 93, 120, 143); dan Musnad Al-Humaidi (no. 703)"
  },
  {
    "nomor": 4,
    "judul": "Penciptaan Manusia dan Takdirnya",
    "arab": "عَنْ عَبْدِ اللهِ بنِ مَسْعُوْد رَضِيَ اللهُ عَنْهُ قَالَ: حَدَّثَنَا رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَهُوَ الصَّادِقُ الـْمَصْدُوْقُ: إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِيْ بَطْنِ أُمِّهِ أَرْبَعِيْنَ يَوْمًا نُطْفَةً، ثُمَّ يَكُوْنُ عَلَقَةً مِثْلَ ذَلِكَ، ثُمَّ يَكُوْنُ مُضْغَةً مِثْلَ ذَلِكَ، ثُمَّ يُرْسَلُ إِلَيْهِ الـْمَلَكُ فَيَنْفُخُ فِيْهِ الرٌّوْحَ، وَيُؤْمَرُ بِأَرْبَعِ كَلِمَاتٍ: بِكَتْبِ رِزْقِهِ وَأَجَلِهِ وَعَمَلِهِ وَشَقِيٌّ أَوْ سَعِيْدٌ. فَوَاللهِ الَّذِيْ لَا إِلَهَ غَيْرُهُ إِنَّ أَحَدَكُمْ لَيَعْمَلُ بِعَمَلِ أَهْلِ الجَنَّةِ حَتَّى مَا يَكُوْنُ بَيْنَهُ وَبَيْنَهَا إِلَّاذِرَاعٌ فَيَسْبِقُ عَلَيْهِ الكِتَابُ فَيَعْمَلُ بِعَمَلِ أَهْلِ النَّارِ فَيَدْخُلُهَا، وَإِنَّ أَحَدَكُمْ لَيَعْمَلُ بِعَمَلِ أَهْلِ النَّارِ حَتَّى مَايَكُوْنُ بَيْنَهُ وَبَيْنَهَا إلَّا ذِرَاعٌ فَيَسْبِقُ عَلَيْهِ الكِتَابُ فَيَعْمَلُ بِعَمَلِ أَهْلِ الجَنَّةِ فَيَدْخُلُهَا. رَوَاهُ الْبُخَارِي وَمُسْلِمٌ.",
    "terjemahan": "Dari Abu Abdurrahman Abdullah bin Mas’ud radhiyallahu ‘anhu, dia berkata: ‘Rasulullah shallallahu ‘alaihi wa sallam telah bercerita kepada kami, dan beliau adalah orang yang benar lagi dibenarkan: ”Sesungguhnya salah seorang dari kalian dikumpulkan penciptaannya di dalam perut ibunya selama 40 hari berwujud nuthfah (mani), kemudian menjadi ‘alaqah (gumpalan darah) selama itu juga, kemudian menjadi mudghah (gumpalan daging) selama itu juga. Kemudian diutus seorang malaikat, lalu dia meniupkan ruh kepadanya, dan dia (malaikat tadi) diperintah untuk menulis 4 kalimat (perkara): tentang rezekinya, amalannya, ajalnya dan (apakah) dia termasuk orang yang sengsara atau bahagia. Demi Allah, Dzat yang tidak ada sesembahan yang haq selain Dia, sesungguhnya salah seorang dari kalian, benar-benar beramal dengan amalan penduduk jannah (surga) sehingga jarak antara dia dengan jannah itu tinggal sehasta. Namun dia didahului oleh Al-Kitab (catatan takdirnya) sehingga dia beramal dengan amalan penduduk neraka, maka diapun masuk ke dalamnya. Dan sunguh, salah deorang dari kalian beramal dengan amalan penduduk neraka hingga jarak antara di dengan neraka tinggal satu hasta. Namun dia didahului oleh catatan takdir, sehingga dia beramal dengan amalan penduduk jannah, maka dia masuk ke dalamnya.” Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Abu Abdurrahman Abdullah bin Mas’ud",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 3208); Shahih Muslim (no. 2643); Sunan Abu Dawud (no. 4708); Sunan At-Tirmidzi (no. 2137); dan Sunan Ibnu Majah (no. 76)"
  },
  {
    "nomor": 5,
    "judul": "Bahaya Bid'ah",
    "arab": "عَنْ أُمِّ الْمُؤْمِنِيْنَ أُمِّ عَبْدِ اللهِ عَائِشَةَ رَضِيَ اللهُ عَنْهَا قَالَتْ: قَالَ رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهَ وَسَلَّمَ: مَنْ أَحْدَثَ فِيْ أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ. رَوَاهُ الْبُخَارِي وَمُسْلِمٌ. وَفِيْ رِوَايَةٍ لِمُسْلِمٍ: مَنْ عَمِلَ عَمَلًا لَيْسَ عَلَيْهَ أَمْرُنَا فَهُو رَدٌّ.",
    "terjemahan": "Dari Ummul Mukminin, Ummu Abdillah ‘Aisyah radhiyallahu ‘anha, dia berkata: Rasulullah shallallahu ‘alaihi wa sallam bersabda: “Barangsiapa yang (memulai) mengada-adakan (sesuatu yang baru) dalam urusan (agama) kami ini yang bukan termasuk bagian darinya, maka amalan tersebut tertolak.” Diriwayatkan oleh Bukhari dan Muslim. Dalam riwayat Muslim disebutkan: ”Barangsiapa yang mengerjakan sebuah amalan yang tidak terdapat padanya perintah kami, maka amalan tersebut tertolak.”",
    "perawi": "Ummul Mukminin, Ummu Abdillah ‘Aisyah",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 2697); Shahih Muslim (no. 1718); Sunan Abu Dawud (no. 4606); Sunan Ibnu Majah (no. 14); dan Musnad Ahmad (VI/73, 146, 180, 240, 256, 270)"
  },
  {
    "nomor": 6,
    "judul": "Halal dan Haram",
    "arab": "عَنْ أَبِيْ عَبْدِ اللهِ النُّعْمَانِ بْنِ بِشِيْر رَضِيَ اللهُ عَنْهُ قَالَ: سَمِعْتُ رَسُوْلَ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ يَقُوْلُ: إِنَّ الحَلَالَ بَيِّنٌ وَإِنَّ الحَرَامَ بَيِّنٌ وَبَيْنَهُمَا أُمُوْرٌ مُشْتَبِهَاتٌ لَا يَعْلَمُهُنَّ كَثِيْرٌ مِنَ النَّاسِ، فَمَنِ اتَّقَى الشُّبُهَاتِ فَقَدِ اسْتَبْرأَ لِدِيْنِهِ وعِرْضِهِ، وَمَنْ وَقَعَ فِي الشُّبُهَاتِ وَقَعَ فِيْ الحَرَامِ كَالرَّاعِي يَرْعَى حَوْلَ الحِمَى يُوشِكُ أَنْ يَقَعَ فِيْهِ. أَلَا وَإِنَّ لِكُلِّ مَلِكٍ حِمًى. أَلَا وَإِنَّ حِمَى اللهِ مَحَارِمُهُ، أَلَا وإِنَّ فِي الْجَسَدِ مُضْغَةً إِذَا صَلَحَتْ صَلَحَ الجَسَدُ كُلُّهُ وإذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ أَلَا وَهِيَ اْلقَلْبُ. رَوَاهُ اْلبُخَارِي وَمُسْلِمٌ.",
    "terjemahan": "Dari Abu ‘Abdillah Nu’man bin Basyir radhiyallahu ‘anhu, ia berkata: Aku mendengar Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Sesungguhnya perkara yang halal itu telah jelas dan perkara yang haram itu telah jelas. Dan di antara keduanya terdapat perkara-perkara yang (samar), tidak diketahui oleh mayoritas manusia. Barang siapa yang menjaga diri dari perkara-perkara samar tersebut, maka dia telah menjaga kesucian agama dan kehormatannya. Barang siapa terjatuh ke dalam perkara syubhat, maka dia telah terjatuh kepada perkara haram, seperti seorang penggembala yang menggembalakan ternaknya di sekitar daerah larangan (hima), dikhawatirkan dia akan masuk ke dalamnya. Ketahuilah, bahwa setiap raja itu mempunyai hima, ketahuilah bahwa hima Allah subhanahu wa ta’ala adalah segala yang Allah subhanahu wa ta’ala haramkan. Ketahuilah bahwa dalam tubuh manusia terdapat sepotong daging. Apabila daging tersebut baik maka baik pula seluruh tubuhnya dan apabila daging tersebut rusak maka rusak pula seluruh tubuhnya. Ketahuilah segumpal daging tersebut adalah kalbu (hati). Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Abu ‘Abdillah Nu’man bin Basyir",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 52, 2051); Shahih Muslim (no. 1599); Sunan Abu Dawud (no. 3329, 3330); Sunan At-Tirmidzi (no. 1205); Sunan Ibnu Majah (no. 3984); Sunan An-Nasa’i (VII/241-243); dan Musnad Ahmad (IV/267)"
  },
  {
    "nomor": 7,
    "judul": "Agama Adalah Nasihat",
    "arab": "عَنْ أَبِيْ رُقَيَّةَ تَمِيْم بْنِ أَوْسٍ الدَّارِيِّ رَضِيَ اللهُ عَنْهُ، أَنَّ النَّبِيَّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ قَالَ: الدِّيْنُ النَّصِيْحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: للهِ، وَلِكِتَابِهِ، ولِرَسُوْلِهِ، وَلِأَئِمَّةِ المُسْلِمِيْنَ، وَعَامَّتِهِمْ. رَوَاهُ مُسْلِمٌ.",
    "terjemahan": "Dari Abu Ruqayyah Tamim bin Aus Ad Dari radhiyallahu ‘anhu, dia berkata: “Sesungguhnya Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Agama itu nasihat.” Kami bertanya: ”Untuk siapa?” Beliau shallallahu ‘alaihi wa sallam menjawab: ”Untuk Allah, untuk kitab-Nya, untuk Rasul-Nya, untuk pemimpin kaum muslimin dan seluruh kaum muslimin.” Diriwayatkan oleh Muslim.",
    "perawi": "Abu Ruqayyah Tamim bin Aus Ad Dari",
    "sumber": "Shahih: Shahih Muslim (no. 55); Sunan Abu Dawud (no. 4944); Sunan An-Nasa’i (VII/156-157); Musnad Ahmad (IV/102-103); dan Bukhari secara mu’allaq dalam Kitab Al-Iman, Bab: “Sabda Nabi shallallahu ‘alaihi wa sallam: ”Agama itu nasihat, untuk Allah subhanahu wa ta’ala, untuk Rasul-Nya, pemimpin kaum muslimin dan seluruh kaum muslimin.”"
  },
  {
    "nomor": 8,
    "judul": "Haramnya Darah Seorang Muslim",
    "arab": "عَنْ ابْنِ عُمَرَ رَضِيَ اللهُ عَنْهُمَا أَنَّ رَسُوْلَ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ قَالَ: أُمِرْتُ أَنْ أُقَاتِلَ النَّاسَ حَتَّى يَشْهَدُوْا أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَنَّ مُحَمَّدًا رَسُوْلُ اللهِ وَيُقِيْمُوْا الصَّلَاةَ وَيُؤْتُوْا الزَّكَاةَ فَإِذَا فَعَلُوْا ذَلِكَ عَصَمُوْا مِنِّيْ دِمَاءَهَمْ وَأَمْوَالَهُمْ إِلَّا بِحَقِّ الإِسْلَامِ وَحِسَابُهُمْ عَلَى اللهِ تَعَالَى. رَوَاهُ اْلبُخَارِي وَمُسْلِمٌ.",
    "terjemahan": "Dari Ibnu ‘Umar radhiyallahu ‘anhuma berkata: ‘Rasulullah shallallahu ‘alaihi wa sallam telah bersabda: ”Aku diperintahkan untuk memerangi manusia hingga mereka bersaksi bahwa tidak ada sesembahan yang haq selain Allah, dan Muhammad adalah utusan Allah, menegakkan shalat, menunaikan zakat. Maka apabila mereka telah melakukan itu semua, maka mereka telah melindungi darah dan harta mereka dariku, kecuali dengan hak Islam dan perhitungan mereka (hisab) di sisi Allah subhanahu wa ta’ala.” Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Ibnu ‘Umar",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 25); Shahih Muslim (no. 22); Sunan Ad-Daruquthni (I/512, no. 886); dan As-Sunan Al-Kubra lil Baihaqi (III/92, 367, VIII/177)"
  },
  {
    "nomor": 9,
    "judul": "Menjalankan Perintah Semampunya",
    "arab": "عَنْ أَبِي هُرَيْرَةَ عَبْدِ الرَّحْمَنِ بْنِ صَخْرٍ رَضِيَ اللهُ تَعَالَى عَنْهُ قَالَ: سَمِعْتُ رَسُوْلَ اللهِ صَلَّى اللهُ عَلَيْهَ وَسَلَّمَ يَقُوْلُ: مَا نَهَيْتُكُمْ عَنْهُ فَاجْتَنِبُوْهُ وَمَا أَمَرْتُكُمْ بِهِ فأْتُوْا مِنْهُ مَا اسْتَطَعْتُمْ، فَإِنَّمَا أَهْلَكَ الَّذِيْنَ مِنْ قَبْلِكُمْ كَثْرَةُ مَسَائِلِهِمْ وَاخْتِلَافُهُمْ عَلَى أَنْبِيَائِهِمْ. رَوَاهُ اْلبُخَارِي وَمُسْلِمٌ",
    "terjemahan": "Dari Abu Hurairah Abdurrahman bin Shakhr radhiyallahu ‘anhu, dia berkata: ‘Aku mendengar Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Apa saja yang aku larang kalian darinya maka jauhilah, dan apa saja yang aku perintahkan kepada kalian maka kerjakanlah semampu kalian, karena sesungguhnya yang telah membinasakan orang-orang yang sebelum kalian adalah banyaknya pertanyaan dan penyelisihan terhadap para nabi mereka.” Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Abu Hurairah Abdurrahman bin Shakhr",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 7288); Shahih Muslim (no. 1337); Sunan At-Tirmidzi (2679); Sunan Ibnu Majah (no. 1, 2); Sunan An-Nasa’i (V/110-111); dan Musnad Ahmad (II/247, 258, 428, 517)"
  },
  {
    "nomor": 10,
    "judul": "Meninggalkan yang Haram",
    "arab": "عَنْ أَبِيْ هُرَيْرَةَ رَضِيَ اللهُ تَعَالَى عَنْهُ قَالَ: قَالَ رَسُوْلُ اللهِ: إِنَّ اللهَ تَعَالَى طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا وَإِنَّ اللهَ أَمَرَ المُؤْمِنِيْنَ بِمَا أَمَرَ بِهِ المُرْسَلِيْنَ فَقَالَ تَعَالَى: (يَا أَيُّهَا الرُّسُلُ كُلُوْا مِنَ الطَّيِّبَاتِ وَاعْمَلُوْا صَالِحًا)(المؤمنون: الآية ٥۱)، وَقَالَ تَعَالَى: (يَا أَيُّهَا الَّذِيْنَ آمَنُوْا كُلُوْا مِنْ طَيِّبَاتِ مَا رَزَقْنَاكُمْ)(البقرة: الآية ۱٧٢)، ثُمَّ ذَكَرَ الرَّجُلَ يُطِيْلُ السَّفَرَ أَشْعَثَ أَغْبَرَ يَمُدُّ يَدَيْهِ إِلَى السَّمَاءِ: يَا رَبِّ يَا رَبِّ، وَمَطْعَمُهُ حَرَامٌ، وَمَشْرَبُهُ حَرَامٌ، وَمَلْبَسُهُ حَرَامٌ وَغُذِيَ بِالحَرَامِ فَأَنَّى يُسْتَجَابُ لَهُ. رَوَاهُ مُسْلِمٌ.",
    "terjemahan": "Dari Abu Hurairah radhiyallahu ‘anhu, dia berkata: ‘Rasulullah shallallahu ‘alaihi wa sallam bersabda: “Sesungguhnya Allah Maha Baik dan tidak menerima kecuali yang baik. Dan sesungguhnya Allah subhanahu wa ta’ala telah memerintahkan kepada kaum mukminin dengan sesuatu yang Allah perintahkan pula kepada para rasul. Maka Allah subhanahu wa ta’ala berfirman: (”Wahai para rasul, makanlah dari makanan yang baik-baik dan kerjakanlah amal shalih.”) [QS. Al-Mu’minun [23]: 51] Dan Allah subhanahu wa ta’ala berfirman: (”Wahai orang-orang yang beriman, makanlah kalian dari rezeki yang baik-baik yang telah Kami berikan kepada kalian.”) [QS. Al-Baqarah [2]: 172] Kemudian beliau shallallahu ‘alaihi wa sallam menyebutkan seseorang yang melakukan perjalanan panjang dalam keadaan dirinya kusut dan kotor, dia menengadahkan kedua tangannya ke langit seraya berdoa: ”Wahai Rabb-ku, wahai Rabb-ku,” namun makanannya haram, minumannya haram dan pakaiannya haram dan kenyang dengan sesuatu yang harom, lalu bagaimana mungkin doanya akan dikabulkan?.” Diriwayatkan oleh Muslim.",
    "perawi": "Abu Hurairah",
    "sumber": "Shahih: Shahih Muslim (no. 1015); Sunan At-Tirmidzi (no. 2989); Musnad Ahmad (II/328); dan Sunan Ad-Darimi (II/300)"
  },
  {
    "nomor": 11,
    "judul": "Tinggalkan Apa yang Meragukan",
    "arab": "عَنْ أَبِي مُحَمَّدٍ الحَسَنِ بنِ عَلِيّ بْنِ أَبِيْ طَالِبٍ سِبْطِ رَسُولِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَرَيْحَانَتِهِ رَضِيَ اللهُ عَنْهُمَا قَالَ: حَفِظْتُ مِنْ رَسُوْلِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: دَعْ مَا يَرِيْبُكَ إِلَى مَا لَا يَرِيْبُكَ. رَوَاهُ التِّرْمِذِي وَالنَّسَائِي وَقَالَ التِّرْمِذِيّ: حَدِيْثٌ حَسَنٌ صَحِيْحٌ.",
    "terjemahan": "Dari Abu Muhammad Al-Hasan bin ‘Ali bin Abi Thalib radhiyallahu ‘anhuma, cucu kesayangan Rasulullah shallallahu ‘alaihi wa sallam, dia berkata: ‘Aku hafal dari Rasulullah shallallahu ‘alaihi wa sallam: ”Tinggalkanlah sesuatu yang membuatmu ragu, dan kerjakanlah sesuatu yang tidak membuatmu ragu.” Diriwayatkan oleh At-Tirmidzi dan An-Nasa’i, dan At-Tirmidzi berkata, “Hadis hasan shahih.”",
    "perawi": "Abu Muhammad Al-Hasan bin ‘Ali bin Abi Thalib",
    "sumber": "Shahih: Sunan At-Tirmidzi (no. 2518); Sunan An-Nasa’i (VIII/327-328); Musnad Ahmad (I/200); Sunan Ad-Darimi (II/245); Mushannaf Abdurrazzaq (no. 4984); Musnad Ath-Thayalisi (no. 1274); Al-Mustadrak (II/13, IV/99); dan Sunan Al-Baihaqi (V/335)"
  },
  {
    "nomor": 12,
    "judul": "Tinggalkan Apa yang Tidak Berguna",
    "arab": "عَنْ أَبِيْ هُرَيْرَةَ رَضِيَ اللهُ عَنْهُ قَالَ: قَالَ رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ : مِنْ حُسْنِ إِسْلَامِ المَرْءِ تَرْكُهُ مَا لَايَعْنِيْهِ. حَدِيْثٌ حَسَنٌ، رَوَاهُ التِّرْمِذِي وَغَيْرُهُ هَكَذَا.",
    "terjemahan": "Dari Abu Hurairah radhiyallahu ‘anhu, dia berkata: “Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Termasuk kebaikan Islam seseorang adalah dia meninggalkan perkara yang tidak bermanfaat baginya.” Hadis hasan, diriwayatkan oleh At-Tirmidzi dan selainnya seperti itu.",
    "perawi": "Abu Hurairah",
    "sumber": "Shahih: Sunan At-Tirmidzi (no. 2317); dan Sunan Ibnu Majah (no. 3976)"
  },
  {
    "nomor": 13,
    "judul": "Di Antara Kesempurnaan Iman",
    "arab": "عَنْ أَبِيْ حَمْزَة أَنَسِ بْنِ مَالِكٍ رَضِيَ اللهُ تَعَالَى عَنْهُ خَادِمِ النَّبِيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ عَنْ النَّبِيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ قَالَ: لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيْهِ مَا يُحِبُّ لِنَفْسِهِ. رَوَاهُ اْلبُخَارِيّ وَمُسْلِمٌ.",
    "terjemahan": "Dari Abu Hamzah Anas bin Malik radhiyallahu ‘anhu pembantu Rasulullah, dari Nabi shallallahu ‘alaihi wa sallam, beliau bersabda: ”Tidaklah salah seorang di antara kalian beriman (dengan keimanan yang sempurna) sampai dia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.” Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Abu Hamzah Anas bin Malik",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 13); Shahih Muslim (no. 45); Sunan At-Tirmidzi (no. 2515); Sunan Ibnu Majah (no. 66); Sunan An-Nasa’i (VIII/115); Musnad Ahmad (III/176, 206, 251, 272, 289); Sunan Ad-Darimi (II/307); Musnad Abu Awanah (I/33); dan Musnad Abu Ya’la (no. 2880, 3069, 3171, 3245)"
  },
  {
    "nomor": 14,
    "judul": "Sebab-Sebab Darah Ditumpahkan",
    "arab": "عَنِ ابْنِ مَسْعُودٍ رَضِيَ اللهُ عَنْهُ قَالَ: قَالَ رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: لَا يَحِلُّ دَمُ امْرِئٍ مُسْلِمٍ إِلَّا بِإِحْدَى ثَلَاثٍ: الثَّيِّبُ الزَّانِيْ، وَالنَّفْسُ بِالنَّفْسِ، وَالتَّاركُ لِدِيْنِهِ المُفَارِقُ لِلجَمَاعَةِ. رَوَاهُ اْلبُخَارِي وَمُسْلِمٌ.",
    "terjemahan": "Dari Ibnu Mas’ud radhiyallahu ‘anhu, ia berkata: Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Tidak halal darah seorang muslim (untuk ditumpahkan) kecuali karena salah satu dari 3 perkara: tsayyib (orang yang sudah menikah) yang berzina, jiwa dengan jiwa (qishash) dan orang yang meninggalkan agamanya (murtad) serta memisahkan diri dari jama’ah (kaum muslimin).” Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Ibnu Mas’ud",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 6878); Shahih Muslim (no. 1676); Sunan Abu Dawud (no. 4352); Sunan At-Tirmidzi (no. 1402); Sunan Ibnu Majah (no. 2534); Sunan An-Nasa’i (VII/90-91); Musnad Ahmad (I/382, 428, 444); Sunan Ad-Darimi (II/218); dan Mushannaf Ibnu Abi Syaibah (no. 28358)"
  },
  {
    "nomor": 15,
    "judul": "Di Antara Akhlak Seorang Muslim",
    "arab": "عَن أَبِي هُرَيْرَةَ رَضِيَ اللهُ عَنْهُ قَالَ: قَالَ رَسُولَ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: مَنْ كَانَ يُؤمِنُ بِاللهِ وَاْليَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَو لِيَصْمُتْ، وَمَنْ كَانَ يُؤمِنُ بِاللهِ وَاْليَومِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤمِنُ بِاللهِ واليَومِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ. رَوَاهُ اْلبُخَارِي وَمُسْلِمٌ.",
    "terjemahan": "Dari Abu Hurairah radhiyallahu ‘anhu dia berkata, Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Barangsiapa yang beriman kepada Allah subhanahu wa ta’ala dan hari akhir maka hendaknya dia berbicara yang baik atau (kalau tidak bisa hendaknya) dia diam. Barangsiapa yang beriman kepada Allah dan hari akhir maka hendaklah dia memuliakan tetangganya. Barangsiapa yang beriman kepada Allah dan hari akhir maka hendaknya dia memuliakan tamunya.” Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Abu Hurairah",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 6018, 6136, 6475); Shahih Muslim (no. 47); Sunan Abu Dawud (no. 5154); Sunan At-Tirmidzi (no. 2500); Sunan Ibnu Majah (no. 3971); Musnad Ahmad (II/267, 433, 463); dan Sunan Al-Baihaqi (VIII/164)"
  },
  {
    "nomor": 16,
    "judul": "Jangan Marah",
    "arab": "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللهُ عَنْهُ أَنَّ رَجُلًا قَالَ لِلنَّبيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: أَوْصِنِيْ، قَالَ: لَا تَغْضَبْ. فَرَدَّدَ مِرَارًا قَالَ لَا تَغْضَبْ. رَوَاهُ اْلبُخَارِي.",
    "terjemahan": "Dari Abu Hurairah radhiyallahu ‘anhu bahwasanya ada seseorang yang berkata kepada Nabi shallallahu ‘alaihi wa sallam: ”Berilah aku nasihat.” Beliau shallallahu ‘alaihi wa sallam bersabda: ”Janganlah engkau marah.” Diapun mengulanginya beberapa kali, beliau shallallahu ‘alaihi wa sallam bersabda: ”Janganlah engkau marah.” Diriwayatkan oleh Bukhari.",
    "perawi": "Abu Hurairah",
    "sumber": "Shahih: Shahih Bukhari (no. 6116); Sunan At-Tirmidzi (no. 2020); Musnad Ahmad (II/362, 466); Mushannaf Abdurrazzaq (no. 20286); dan Mushannaf Ibnu Abi Syaibah (no. 25769)"
  },
  {
    "nomor": 17,
    "judul": "Berbuat Baik Atas Segala Sesuatu",
    "arab": "عَنْ أَبِي يَعْلَى شَدَّادِ بنِ أَوْسٍ رَضِيَ اللهُ تَعَالَى عَنْهُ عَنْ رَسُولِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ قَالَ: إِنَّ اللهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَيءٍ، فَإِذَا قَتَلْتُمْ فَأَحْسِنُوْا اْلقِتْلَةَ، وَإِذَا ذَبَحْتُمْ فَأَحْسِنُوْا الذِّبْحَةَ، وَلْيُحِدَّ أَحَدُكُمْ شَفْرَتَهُ، وَلْيُرِحْ ذَبِيْحَتَهُ. رَوَاهُ مُسْلِمٌ.",
    "terjemahan": "Dari Abu Ya’la Syaddad bin Aus radhiyallahu ‘anhu dari Rasulullah shallallahu ‘alaihi wa sallam, beliau bersabda:”Sesungguhnya Allah subhanahu wa ta’ala telah menetapkan perbuatan ihsan (baik) pada tiap-tiap sesuatu. Jika kalian membunuh, maka bunuhlah dengan cara yang baik, jika kalian menyembelih, maka sembelihlah dengan cara yang baik, hendaklah salah seorang di antara kalian menajamkan pisaunya dan menenangkan sembelihannya.” Diriwayatkan oleh Muslim.",
    "perawi": "Abu Ya’la Syaddad bin Aus",
    "sumber": "Shahih: Shahih Muslim (no. 1955); Sunan Abu Dawud (no. 2815); Sunan At-Tirmidzi (no. 1409); Sunan Ibnu Majah (no. 3170); Sunan An-Nasa’i (VII/227); Musnad Ahmad (IV/123, 124, 125); Sunan Ad-Darimi (II/82); Musnad Ath-Thayalisi (no. 1215); Mushannaf Abdurrazzaq (no. 8604); dan Mushannaf Ibnu Abi Syaibah (no. 28386, 28388)"
  },
  {
    "nomor": 18,
    "judul": "Bertakwalah Dimanapun Kalian Berada",
    "arab": "عَنْ أَبِيْ ذَرٍّ جُنْدُبِ بنِ جُنَادَةَ وَأَبِي عَبْدِ الرَّحْمَنِ مُعَاذِ بِنِ جَبَلٍ رَضِيَ اللهُ عَنْهُمَا عَنْ رَسُولِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ قَالَ: إِتَّقِ اللهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ. رَوَاهُ التِّرْمِذِيّ وَقَالَ: حَدِيْثٌ حَسَنٌ. وَفِيْ بَعْضِ النَّسَخِ: حَسَنٌ صَحِيْحٌ.",
    "terjemahan": "Dari Abu Dzar Jundub bin Junadah dan Abu ‘Abdirrahman Mu’adz bin Jabal radhiyallahu ‘anhuma, dari Rasulullah shallallahu ‘alaihi wa sallam beliau bersabda: ”Bertakwalah kepada Allah subhanahu wa ta’ala di manapun engkau berada. Iringilah kejelekan itu dengan kebaikan niscaya kebaikan itu akan menghapusnya (kejelekan). Dan pergaulilah manusia dengan pergaulan yang baik.” Diriwayatkan oleh At-Tirmidzi dan berkata, “Hadis hasan,” dalam redaksi lain, “Hasan Shahih.”",
    "perawi": "Abu Dzar Jundub bin Junadah dan Abu ‘Abdirrahman Mu’adz bin Jabal",
    "sumber": "Hasan: Sunan At-Tirmidzi (no. 1987); Musnad Ahmad (V/153, 158, 177); dan Sunan Ad-Darimi (II/323)"
  },
  {
    "nomor": 19,
    "judul": "Jagalah Allah Niscaya Allah Menjagamu",
    "arab": "عَنْ أَبِي الْعَبَّاسِ عَبْدِ اللهِ بنِ عَبَّاسٍ رَضِيَ اللهُ عَنْهُمَا قَالَ: كُنْتُ خَلْفَ رَسُوْلَ اللَّهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا غُلَامُ إِنِّي أُعَلِّمُكَ كَلِمَاتٍ: احْفَظِ اللهَ يَحْفَظْكَ، احْفَظِ اللهَ تَجِدْهُ تُجَاهَكَ، إِذَا سَأَلْتَ فَاسْأَلِ اللهَ، وَإِذَا اسْتَعَنتَ فَاسْتَعِن بِاللهِ، وَاعْلَم أَنَّ الأُمَّةَ لَوِ اجْتَمَعَت عَلَى أن يَنفَعُوكَ بِشيءٍ لَمْ يَنْفَعُوكَ إِلَّا بِشَيءٍ قَدْ كَتَبَهُ اللهُ لَكَ، ولَوِ اجْتَمَعُوا عَلَى أَنْ يَضُرُّوكَ بِشيءٍ لَمْ يَضُرُّوكَ إِلَّا بِشَيءٍ قَدْ كَتَبَهُ اللهُ عَلَيْكَ، رُفعَت الأَقْلَامُ، وَجَفّتِ الصُّحُفُ. رَوَاهُ التِّرْمِذِيّ وَقَالَ: حَدِيْثٌ حَسَنٌ صَحِيْحٌ. وَفِي رِوَايَةِ غَيْرِ التِّرْمِذِيّ: اِحفَظِ اللهَ تَجٍدْهُ أَمَامَكَ، تَعَرَّفْ إلى اللهِ فِي الرَّخاءِ يَعرِفْكَ في الشّدةِ، وَاعْلَم أن مَا أَخْطَأكَ لَمْ يَكُن لِيُصيبكَ، وَمَا أَصَابَكَ لَمْ يَكُن لِيُخطِئكَ، وَاعْلَمْ أنَّ النَّصْرَ مَعَ الصَّبْرِ، وَأَنَّ الفَرَجَ مَعَ الكَربِ، وَأَنَّ مَعَ العُسرِ يُسرًا.",
    "terjemahan": "Dari Abul ‘Abbas Abdullah bin ‘Abbas radhiyallahu ‘anhuma, dia berkata: Suatu hari aku pernah berboncengan bersama Nabi shallallahu ‘alaihi wa sallam, lalu beliau bersabda: ”Wahai anak kecil, sungguh aku akan mengajarimu beberapa kalimat: ‘Jagalah Allah, niscaya Dia akan menjagamu, jagalah Allah niscaya engkau akan mendapati-Nya di hadapanmu. Apabila kamu meminta sesuatu mintalah kepada Allah, apabila engkau memohon pertolongan maka mintalah kepada Allah. Ketahuilah, kalau seandainya umat manusia bersatu untuk memberikan kemanfaatan kepadamu dengan sesuatu, niscaya mereka tidak akan mampu memberi manfaat kepadamu kecuali dengan sesuatu yang telah Allah tentukan untukmu, dan kalau seandainya mereka bersatu untuk menimpakan bahaya kepadamu dengan sesuatu, niscaya tidak akan membahayakanmu kecuali dengan sesuatu yang telah Allah tetapkan akan menimpamu. Pena-pena telah diangkat dan lembaran-lembaran telah kering.” Diriwayatkan oleh At-Tirmidzi dan berkata, “Hadis hasan shahih. Dalam riwayat selain riwayat at Tirmidzi, dengan lafadz: ”Jagalah Allah niscaya engkau akan mendapati-Nya di hadapanmu, ingatlah Allah dalam keadaan engkau lapang, niscaya Dia akan mengingatmu dalam keadaan engkau sulit. Dan ketahuilah, bahwa segala sesuatu yang Allah tetapkan luput darimu, niscaya tidak akan pernah menimpamu. Dan segala sesuatu yang telah ditetapkan menimpamu, maka tidak akan luput darimu. Ketahuilah, bahwa pertolongan itu bersama kesabaran dan kelapangan itu bersama kesulitan dan bersama kesukaran itu ada kemudahan.”",
    "perawi": "Abul ‘Abbas Abdullah bin ‘Abbas",
    "sumber": "Shahih: Sunan At-Tirmidzi (no. 2516); Musnad Ahmad (I/293, 303, 307-308); Musnad Abu Ya’la (no. 2549); Al-Mustadrak (III/541, 542, 623); Al-Mu’jam Al-Kabir lith Thabrani (no. 11243, 11426, 11560, 12988); Az-Zuhdu (I/304); Musnad ‘Abd bin Humaid (h. 214); Al-Lalika’i dalam I’tiqad Ahlis Sunnah (IV/614); dan Al-Baihaqi dalam Syu’abul Iman (II/27)"
  },
  {
    "nomor": 20,
    "judul": "Malu Akhlak Para Nabi",
    "arab": "عَنْ أَبيْ مَسْعُوْدٍ عُقْبَةَ بْنِ عَمْرٍ الأَنْصَارِي البَدْرِي رَضِيَ اللهُ عَنْهُ قَالَ: قَالَ رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: إِنَّ مِمَّا أَدْرَكَ النَّاسُ مِنْ كَلَامِ النُّبُوَّةِ الأُولَى إِذَا لَمْ تَستَحْيِ فَاصْنَعْ مَا شِئْتَ. رَوَاهُ اْلبُخَارِي.",
    "terjemahan": "Dari Abu Mas’ud ‘Uqbah bin ‘Amr Al-Anshari Al-Badri radhiyallahu ‘anhu dia berkata: ‘Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Sesungguhnya termasuk perkara yang didapati oleh manusia dari perkataan nubuwwah (kenabian) yang pertama adalah jika engkau tidak malu maka berbuatlah sesukamu.” Diriwayatkan oleh Bukhari.",
    "perawi": "Abu Mas’ud ‘Uqbah bin ‘Amr Al-Anshari Al-Badri",
    "sumber": "Shahih: Shahih Bukhari (no. 3483, 3484, 6120); Sunan Abu Dawud (no. 4797); Sunan Ibnu Majah (no. 4183); Musnad Ahmad (IV/121, 122, V/273); Musnad Ath-Thayalisi (no. 655); dan Al-Mu’jam Al-Ausath (no. 2332)"
  },
  {
    "nomor": 21,
    "judul": "Katakanlah, “Aku Beriman Kepada Allah“",
    "arab": "عَنْ أَبِيْ عَمْرٍ -وَقِيْلَ أَبِي عَمْرَةَ- سُفْيَانَ بْنِ عَبْدِ اللهِ رَضِيَ اللهُ عَنْهُ قَالَ: قُلْتُ: يَا رَسُولَ اللهِ قُلْ لِيْ فِيْ الإِسْلَامِ قَوْلًا لَا أَسْأَلُ عَنْهُ أَحَدًا غَيْرَكَ. قَالَ: قُلْ أَمَنْتُ بِاللهِ ثُمَّ اسْتَقِمْ. رَوَاهُ مُسْلِمٌ.",
    "terjemahan": "Dari Abu ‘Amr -ada yang mengatakan Abu ‘Amrah- Sufyan bin Abdillah radhiyallahu ‘anhuma dia berkata: Aku berkata: ”Ya Rasulullah, beritahukan kepadaku satu perkataan dalam Islam, yang aku tidak akan bertanya lagi kepada seorangpun selain engkau.” Beliau shallallahu ‘alaihi wa sallam bersabda: ”Katakanlah: “Aku beriman kepada Allah”, kemudian istiqamahlah.” Diriwayatkan oleh Muslim.",
    "perawi": "Abu ‘Amr -ada yang mengatakan Abu ‘Amrah- Sufyan bin Abdillah",
    "sumber": "Shahih: Shahih Muslim (no. 38); Sunan At-Tirmidzi (no. 2410); Sunan Ibnu Majah (no. 3972); Sunanul Kubra lin Nasa’i (no. 11425, 11426, 11776); Musnad Ahmad (III/413, IV/384-385); Sunan Ad-Darimi (II/298); Musnad Ath-Thayalisi (no. 1327); dan Al-Mu’jam Al-Kabir lith Thabrani (no. 6396, 6397, 6398)"
  },
  {
    "nomor": 22,
    "judul": "Amalan yang Memasukkan ke Surga",
    "arab": "عَنْ أَبِيْ عَبْدِ اللهِ جَابِر بْنِ عَبْدِ اللهِ الأَنْصَارِي رَضِيَ اللهُ عَنْهُمَا: أَنَّ رَجُلًا سَأَلَ رَسُولَ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَارَسُولَ اللهِ أَرَأَيْتَ إِذَا صَلَّيْتُ الصَّلَوَاتِ الْمَكْتُوبَاتِ، وَصُمْتُ رَمَضَانَ، وَأَحْلَلْتُ الْحَلَالَ وَحَرَّمْتُ الْحَرَامَ، وَلَمْ أَزِدْ عَلَى ذَلِكَ شَيْئًا أَأَدْخُلُ الَجَنَّةَ؟ قَالَ: نَعَمْ، قَالَ: وَاللهِ لَا أَزِيْدُ عَلَى ذَلِكَ شَيْئًا. رَوَاهُ مُسْلِمٌ. ومعنى حرمت الحرام : اجتنبته. ومعنى أحللت الحلال : فعلته معتقدا حله.",
    "terjemahan": "Dari Abu ‘Abdillah Jabir bin ‘Abdillah Al-Anshari radhiyallahu ‘anhu, bahwa ada seseorang yang bertanya kepada Rasulullah shallallahu ‘alaihi wa sallam, dia berkata: ”Wahai Rasulullah, apa pendapatmu jika aku mengerjakan shalat-shalat wajib (lima waktu), puasa Ramadhan, aku menghalalkan apa yang halal dan aku mengharamkan apa yang haram serta aku tidak akan menambahnya dengan sesuatupun selain itu, apakah aku akan masuk jannah?” Beliau menjawab:”Ya.” Dia berkata: Demi Allah I, aku tidak akan menambahnya dengan sesuatupun.” Diriwayatkan oleh Muslim. Makna:”Aku mengharamkan apa yang haram” adalah aku menjauhinya, sedangkan makna ”menghalalkan apa yang halal” adalah aku akan mengerjakannya dengan meyakini kehalalannya.",
    "perawi": "Abu ‘Abdillah Jabir bin ‘Abdillah Al-Anshari",
    "sumber": "Shahih: Shahih Muslim (no. 15); Musnad Ahmad (III/316, 348); Musnad Abu Ya’la (no. 1936, 2291); dan Musnad Abu Awanah (I/4-5)"
  },
  {
    "nomor": 23,
    "judul": "Kesucian Itu Sebagaian Dari Iman",
    "arab": "عَنْ أَبِي مَالِكٍ الْحَارِثِ بْنِ عَاصِمٍ الأَشْعَرِي رَضِيَ اللهُ عَنْهُ قَالَ: قَالَ رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: الطُّهُوْرُ شَطْرُ الإِيْمَانِ، وَالْحَمْدُ لِلهِ تَمْلأُ الْمِيْزَانَ، وَسُبْحَانَ اللهِ وَالْحَمْدُ للهِ تَمْلآنِ -أَوْ تَمْلأُ- مَا بَيْنَ السَّمَاءِ وَالأَرْضِ، وَالصَّلَاةُ نُوْرٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ، كُلُّ النَّاسِ يَغْدُو فَبَائِعُ نفْسَهُ فَمُعْتِقُهَا أَوْ مُوْبِقُهَا. رَوَاهُ مُسْلِمٌ.",
    "terjemahan": "Dari Abu Malik Al-Harits bin ‘Ashim Al-Asy’ari radhiyallahu ‘anhu, dia berkata: Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Kesucian itu separuh dari iman, (ucapan) Alhamdulillah (Segala puji hanya bagi Allah) memenuhi timbangan, (ucapannya) Subhanallah (Maha Suci Allah) dan Alhamdulillah (Segala Puji hanya bagi Allah) keduanya memenuhi apa yang ada di antara langit dan bumi, shalat adalah cahaya, sedekah adalah burhan (bukti), sabar itu dhiya’ (cahaya yang disertai rasa panas). Al-Qur’an itu bisa menjadi hujjah bagimu atau hujjah atasmu. Setiap orang berangkat di pagi hari sampai menjual dirinya sehingga dia membebaskannya atau membinasakannya.” Diriwayatkan oleh Muslim.",
    "perawi": "Abu Malik Al-Harits bin ‘Ashim Al-Asy’ari",
    "sumber": "Shahih: Shahih Muslim (no. 223); Sunan At-Tirmidzi (no. 3517); Sunan Ibnu Majah (no. 280); Musnad Ahmad (V/342, 343, 344); Sunan Ad-Darimi (I/167); dan Musnad Abu Awanah (I/223)"
  },
  {
    "nomor": 24,
    "judul": "Janganlah Kalian Saling Menzhalimi",
    "arab": "عَنْ أَبِى ذَرٍّ الْغِفَارِي رَضِيَ اللهُ عَنْهُ عَنِ النَّبِيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ فِيْمَا يَرْوِيْهِ عَنْ رَبِّهِ عَزَّ وَجَلَّ أَنَّهُ قَالَ: يَا عِبَادِي! إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّمًا فَلَا تَظَالَمُوْا. يَا عِبَادِي! كُلُّكُمْ ضَالٌّ إِلَّا مَنْ هَدَيْتُهُ فَاسْتَهْدُونِي أَهْدِكُمْ. يَا عِبَادِي! كُلُّكُمْ جَائِعٌ إِلَّا مَنْ أَطْعَمْتُهُ فَاسْتَطْعِمُونِي أُطْعِمْكُمْ. يَا عِبَادِي! كُلُّكُمْ عَارٍ إِلَّا مَنْ كَسَوْتُهُ فَاسْتَكْسُونِي أَكْسُكُمْ. يَا عِبَادِي! إِنَّكُمْ تُخْطِئُونَ بِاللَّيْلِ وَالنَّهَارِ وَأَنَا أَغْفِرُ الذُّنُوبَ جَمِيْعًا فَاسْتَغْفِرُونِي أَغْفِرْ لَكُمْ. يَا عِبَادِي! إِنَّكُمْ لَنْ تَبْلُغُوا ضُرِّي فَتَضُرُّونِي وَلَنْ تَبْلُغُوا نَفْعِي فَتَنْفَعُونِي. يَا عِبَادِي! لَوْ أَنَّ أَوَّلَكُمْ وَآخِرَكُمْ وَإِنْسَكُمْ وَجِنَّكُمْ كَانُوا عَلَى أَتْقَى قَلْبِ رَجُلٍ وَاحِدٍ مِنْكُمْ مَا زَادَ ذَلِكَ فِي مُلْكِي شَيْئًا. يَا عِبَادِي! لَوْ أَنَّ أَوَّلَكُمْ وَآخِرَكُمْ وَإِنْسَكُمْ وَجِنَّكُمْ كَانُوا عَلَى أَفْجَرِ قَلْبِ رَجُلٍ وَاحِدٍ مِنْكُمْ مَانَقَصَ ذَلِكَ مِنْ مُلْكِي شَيْئًا. يَا عِبَادِي! لَوْ أَنَّ أَوَّلَكُمْ وَآخِرَكُمْ وَإِنْسَكُمْ وَجِنَّكُمْ قَامُوا فِي صَعِيْدٍ وَاحِدٍ فَسَأَلُونِي فَأَعْطَيْتُ كُلَّ إِنْسَانٍ مَسْأَلَتَهُ مَانَقَصَ ذَلِكَ مِمَّا عِنْدِي إِلَّا كَمَا يَنْقُصُ المِخْيَطُ إِذَا أُدْخِلَ البَحْرَ. يَا عِبَادِي! إِنَّمَا هِيَ أَعْمَالُكُمْ أُحْصِيْهَا لَكُمْ ثُمَّ أُوَفِّيْكُمْ إِيَّاهَا، فَمَنْ وَجَدَ خَيْرًا فَلْيَحْمَدِ اللهَ وَمَنْ وَجَدَ غَيْرَ ذَلِكَ فَلَا يَلُومَنَّ إِلَّا نَفْسَهُ. رَوَاهُ مُسْلِمٌ",
    "terjemahan": "Dari Abu Dzar Al-Ghifary radhiyallahu ‘anhu dari Nabi shallallahu ‘alaihi wa sallam, dalam hadis qudsi yang beliau shallallahu ‘alaihi wa sallam riwayatkan dari Rabb-nya ’Azza wa Jalla, bahwasanya Dia subhanahu wa ta’ala berfirman: ”Wahai hamba-hamba-Ku, sesungguhnya Aku telah mengharamkan kezhaliman atas diri-Ku dan Akupun jadikan kezhaliman itu diantara kalian sebagai sesuatu yang haram. Maka janganlah kalian saling menzhalimi. Wahai hamba-hamba-Ku, kalian semua adalah sesat kecuali yang Aku beri petunjuk, maka mintalah petunjuk kepada-Ku niscaya Aku akan menunjukimu. Wahai hamba-hamba-Ku, kalian semua kelaparan kecuali yang telah Aku beri makan, maka mintalah makanan kepada-Ku pasti Aku akan memberi kalian makanan. Wahai hamba-hamba-Ku, sesungguhnya kalian semua telanjang kecuali yang Aku beri pakaian, maka mintalah pakaian kepada-Ku pasti Aku akan memberi kalian pakaian. Wahai hamba-hamba-Ku, sesungguhnya kalian selalu berbuat salah siang dan malam dan Aku senantiasa mengampuni semua perbuatan dosa, maka mintalah ampunan kepada-Ku. Wahai hamba-hamba-Ku, sesungguhnya kalian tidak akan memudharatkan-Ku dan tidak akan pula memberi manfaat kepada-Ku. Wahai hamba-hamba-Ku, kalau seandainya orang-orang pertama di antara kalian dan orang-orang terakhir (belakangan) baik manusia atau jin semua berada pada satu hati yang paling bertakwa diantara kalian, tidaklah hal itu menambah atas kerajaan (kekuasaan)-Ku sedikitpun. Wahai hamba-hamba-Ku, jika orang-orang yang pertama dan terakhir dari kalian semua berada pada satu hati yang paling durhaka diantara kalian, tidaklah hal itu akan mengurangi kerajaan (kekuasaan)-Ku sedikitpun. Wahai hamba-hamba-Ku, sesungguhnya jika orang-orang yang pertama dan terakhir dari kalian baik manusia dan jin berdiri di satu tempat tinggi dan luas lalu meminta (kebutuhannya) kepada-Ku, kemudian Aku memberikan setiap orang apa yang dimintanya, maka tidaklah hal itu mengurangi sedikitpun apa yang ada pada-Ku kecuali seperti berkurangnya (air laut yang menetes) yang diujung jarum jika dicelupkan kedalam lautan. Wahai hamba-hamba-Ku, sesungguhnya semua itu adalah amalan-amalan kalian yang Aku catat untuk kalian, kemudian Aku sempurnakan (balasannya) untuk kalian. Maka bagi yang mendapatkan kebaikan, hendaklah dia memuji Allah dan bagi yang mendapatkan selain itu, maka janganlah ia mencela kecuali dirinya sendiri.” Diriwayatkan oleh Muslim.",
    "perawi": "Abu Dzar Al-Ghifary",
    "sumber": "Shahih: Shahih Muslim (no. 2557); Sunan At-Tirmidzi (no. 2495); Sunan Ibnu Majah (no. 4257); Musnad Ahmad (V/160); Mushannaf Abdurrazzaq (no. 20272); Sunan Al-Baihaqi (VI/93); Al-Adab Al-Mufrad (no. 490); dan Al-Mustadrak (IV/ 241)"
  },
  {
    "nomor": 25,
    "judul": "Setiap Kebaikan Adalah Sedekah",
    "arab": "عَنْ أَبِيْ ذَرٍّ أَيْضًا: أَنَّ أُنَاسًا مِنْ أَصْحَابِ رَسُوْلِ اللَّهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ قَالُوا لِلنَّبِيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: يَا رَسُوْلَ اللَّه! ذَهَبَ أَهْلُ الدُّثُوْرِ بِالأُجُوْرِ، يُصَلُّوْنَ كَمَانُصَلِّيْ، وَيَصُوْمُوْنَ كَمَانَصُوْمُ، وَيَتَصَدَّقُوْنَ بِفُضُوْلِ أَمْوَالِهِمْ، قَالَ: أَوَلَيْسَ قَدْجَعَلَ اللَّهُ لَكُمْ مَاتَصَدَّقُوْنَ؟ إِنَّ بِكُلِّ تَسْبِيْحَةٍ صَدَقَةً، وَكُلِّ تَكْبِيْرَةٍ صَدَقَةً، وَكُلِّ تَحْمِيْدَةٍ صَدَقَةً، وَكُلِّ تَهْلِيْلَةٍ صَدَقَةً، وَأَمْرٍ بِالْمَعْرُوْفِ صَدَقَةً, وَنَهْيٍ عَنِ الْمُنْكَرِ صَدَقَةً, وَفِيْ بُضْعِ أَحَدِكُمْ صَدَقَةً، قَالُوا: يَا رَسُوْلَ اللَّهِ أَيَأْتِيْ أَحَدُنَا شَهْوَتَهُ وَيَكُوْنُ لَهُ فِيْهَا أَجْرٌ؟ قَالَ: أَرَأَيْتُمْ لَوْ وَضَعَهَا فِيْ حَرَامٍ أَكَانَ عَلَيْهِ فِيْهَا وِزْرٌ؟ فَكَذَالِكَ إِذَا وَضَعَهَا فِيْ الْحَلَالِ كَانَ لَهُ أَجْرٌ. رَوَاهُ مُسْلِمٌ.",
    "terjemahan": "Dari Abu Dzar radhiyallahu ‘anhu juga, bahwa ada sekelompok shahabat berkata kepada Nabi shallallahu ‘alaihi wa sallam: ”Wahai Rasulullah, orang-orang kaya telah pergi membawa pahala-pahala mereka. Mereka shalat sebagaimana kami shalat, mereka berpuasa sebagaimana kami juga berpuasa dan mereka bersedekah dengan kelebihan harta mereka (sedangkan kami tidak bisa bersedekah).” Beliau shallallahu ‘alaihi wa sallam bersabda: “Bukankah Allah telah menjadikan buat kalian sesuatu untuk kalian bisa bersedekah dengannya? Sesungguhnya setiap tasbih itu adalah sedekah, dan setiap takbir itu adalah sedekah, dan setiap tahmid itu adalah sedekah, dan setiap tahlil itu adalah sedekah, memerintahkan kepada hal yang ma’urf itu adalah sedekah, mencegah dari hal yang mungkar itu adalah sedekah, dan dalam kemaluan kalian itu juga terdapat sedekah. Mereka berkata:”Wahai Rasulullah shallallahu ‘alaihi wa sallam, Apakah salah seorang dari kami jika menyalurkan syahwatnya (dengan benar) dia akan mendapatkan pahala?”Beliau bersabda: ”Bagaimana pendapat kalian jika disalurkan pada yang haram, bukankah dia berdosa? Maka demikian pula kalau disalurkan pada yang halal tentu dia memperoleh pahala.” Diriwayatkan oleh Muslim.",
    "perawi": "Abu Dzar",
    "sumber": "Shahih: Shahih Muslim (no. 1006); Sunan Abu Dawud (no. 5243, 5244); Musnad Ahmad (V/167, 168); Al-Adab Al-Mufrad (no. 227); dan Musnad Al-Bazzar (no. 3917, 3918)"
  },
  {
    "nomor": 26,
    "judul": "Setiap Persendian Wajib Bersedekah",
    "arab": "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: كُلُّ سُلَامَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ كُلُّ يَومٍ تَطْلُعُ فِيْهِ الشَّمْسُ: تَعْدِلُ بَيْنَ اثْنَيْنِ صَدَقَةٌ، وَتُعِيْنُ الرَّجُلَ فِي دَابَّتِهِ فَتَحْمِلُه عَلَيْهَا أَوْ تَرْفَعُ لَهُ عَلَيْهَا مَتَاعَهُ صَدَقَةٌ، وَالْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ، وَبِكُلِّ خُطْوَةٍ تَمْشِيْهَا إِلَى الصَّلَاةِ صَدَقَةٌ، وَتُمِيْطُ الأَذَى عَنِ الطَّرِيْقِ صَدَقَةٌ. رَوَاهُ الْبُخَارِي وَمُسْلِمٌ.",
    "terjemahan": "Dari Abu Hurairah radhiyallahu ‘anhu, ia berkata: Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Setiap persendian dari manusia itu ada sedekahnya pada setiap hari yang matahari terbit padanya. Berbuat adil antara dua orang adalah sedekah, menolong seseorang dalam urusan kendaraannya membantunya agar bisa menaiki kendaraannya atau engkau angkatkan barang-barangnya ke atas kendaraannya itu juga sedekah. Sebuah ucapan yang baik adalah sedekah, setiap langkah yang kamu ayunkan menuju tempat shalat adalah sedekah dan engkau menyingkirkan gangguan dari jalan adalah sedekah”. Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Abu Hurairah",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 2707, 2891, 2989); Shahih Muslim (no. 1009); Musnad Ahmad (II/312, 316, 374); dan Sunan Al-Baihaqi (IV/187-188)"
  },
  {
    "nomor": 27,
    "judul": "Kebaikan dan Dosa",
    "arab": "عَنِ النَّوَّاسِ بْنِ سَمْعَانَ رَضِيَ اللهُ عَنْهُ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: اْلبِرُّ حُسْنُ الْخُلْقِ، وَالإِثْمُ مَا حَاكَ فِيْ نَفْسِكَ وَكَرِهْتَ أَنْ يَطَّلِعَ عَلَيْهِ النَّاسُ. رَوَاهُ مُسْلِمٌ. وَعَنْ وَابِصَةَ بْنِ مَعْبَدٍ رضي الله عنه ، قَالَ: أَتَيْتُ النبي صلى الله عليه وسلم، فَقَالَ: جِئْتَ تَسْأَلُ عَنِ اْلبِرِّ وَالإِثْمِ؟ قُلْتُ: نَعَمْ! قَالَ: اسْتَفْتِ قَلْبَكَ، اْلبِرُّ مَا اطْمَأَنَّتْ إِلَيْهِ النَّفْسُ وَاطْمَأَنَّ إِلَيْهِ اْلقَلْبُ، وَالإِثْمُ مَاحَاكَ فِي النَّفْسِ وَتَرَدَّدَ فِي الصَّدْرِ، وَإِنْ أَفْتَاكَ النَّاسُ وَأَفْتَوْكَ. قال الشيخ رحمه الله: حَدِيْثٌ حَسَنٌ، رَوَيْنَاهُ فِي مُسْنَدَيْ الإِمَام أَحْمَدَ بْنِ حَنْبَلٍ، وَالدَّارِمِي بِإِسْنَادٍ حَسَنٍ.",
    "terjemahan": "Dari Nawwas bin Sam’an radhiyallahu ‘anhu dari Nabi shallallahu ‘alaihi wa sallam beliau bersabda: “Kebaikan itu adalah akhlak yang baik, kejelekan (dosa) itu adalah sesuatu yang meresahkan jiwamu dan engkau benci apabila manusia mengetahuinya.” Diriwayatkan oleh Muslim.[1] Dari Wabishah bin Ma’bad radhiyallahu ‘anhu dia berkata: ‘Aku mendatangi Nabi shallallahu ‘alaihi wa sallam maka beliau shallallahu ‘alaihi wa sallam berkata: “Engkau datang untuk bertanya tentang kebaikan?” Aku menjawab: “Ya,” Beliau shallallahu ‘alaihi wa sallam bersabda: “Mintalah fatwa kepada hatimu, karena kebaikan itu adalah sesuatu yang membuat jiwa dan hati merasa tenang, sedangkan kejelekan (dosa) itu adalah sesuatu yang meresahkan jiwa dan membimbangkan dada meskipun manusia telah berulang kali memberi fatwa kepadamu.” Syaikh (Imam An-Nawawi) berkata, “Hadis hasan, kami meriwayatkannya dari Musnad Imam Ahmad bin Hanbal dan Musnad Ad-Darimi dengan sanad hasan.”[2]",
    "perawi": "Nawwas bin Sam’an",
    "sumber": "[1] Shahih: Shahih Muslim (no. 2553); Sunan At-Tirmidzi (no. 2389); Musnad Ahmad (IV/182); Al-Adab Al-Mufrad (no. 295, 302); Sunan Ad-Darimi (II/322); dan Al-Mustadrak (II/14). [2] Dha’if Jiddan: Musnad Ahmad (IV/228); Sunan Ad-Darimi (II/245-246); dan Musnad Abu Ya’la (no. 1583, 1584)"
  },
  {
    "nomor": 28,
    "judul": "Mendengar dan Taat",
    "arab": "عَنْ أَبِي نَجِيْحٍ الْعِرْبَاضِ بِنْ سَارِيَةَ رضي الله عنه قَالَ: وَعَظَنَا رَسُولُ اللهِ صلى الله عليه وسلم مَوْعِظَةً وَجِلَتْ مِنْهَا الْقُلُوبُ وَذَرَفَتْ مِنْهِا الْعُيُونُ، فَقُلْنَا يَا رَسُولَ اللهِ! كَأَنَّهَا مَوْعِظَةُ مُوَدِّعٍ فَأَوْصِنَا، قَالَ: أُوْصِيْكُمْ بِتَقْوَى اللهِ عَزَّ وَجَلَّ وَالسَّمْعِ وَالطَّاعةِ وَإِنْ تَأَمَّرَ عَلَيْكُمْ عَبْدٌ حَبَشِيٌّ، فَإِنَّهُ مَنْ يَعِشْ مِنْكُمْ فَسَيَرَى اخْتِلَافًا كَثِيْرًا، فَعَلَيْكُمْ بِسُنَّتِي وَسُنَّةِ الْخُلَفَاءِ الرَّاشِدِيْنَ الْمَهْدِيِّينَ عَضُّوْا عَلَيْهَا بِالنَّوَاجِذِ، وَإِيَّاكُمْ وَمُحْدَثَاتِ الأُمُورِ فَإِنَّ كُلَّ مُحْدَثَةٍ بِدْعَةٌ، فَإِنَّ كُلَّ بِدْعَةٍ ضَلاَلَةٌ. رَوَاهُ أَبُو دَاوُد والتِّرْمِذِي وَقَالَ: حَدِيْثٌ حَسَنٌ صَحِيحٌ.",
    "terjemahan": "Dari Abu Najih Irbadh bin Sariyah radhiyallahu ‘anhu, dia berkata: ‘Rasulullah shallallahu ‘alaihi wa sallam pernah memberikan nasehat kepada kami dengan sebuah nasehat yang menyebabkan hati bergetar dan air mata berlinang, lalu kami berkata: ‘Ya Rasulullah, seakan-akan ini adalah nasehat orang yang akan berpisah, maka berilah kami wasiat! Beliau bersabda: ”Aku wasiatkan kepada kalian untuk bertakwa kepada Allah, mendengar dan taat (kepada penguasa) meskipun kalian diperintah oleh seorang budak Habasyi. Dan sesungguhnya siapa di antara kalian yang masih hidup sepeninggalku niscaya ia akan melihat perselisihan yang banyak. Maka wajib atas kalian untuk berpegang teguh dengan sunnahku dan sunnah para khulafaur rasyidin yang mendapatkan petunjuk. Gigitlah sunnah tersebut dengan gigi geraham kalian, dan hati-hatilah kalian dari perkara yang baru karena setiap perkara yang baru adalah bid’ah dan setiap bid’ah adalah sesat.” Diriwayatkan oleh Abu Dawud dan Tirmidzi, dan dia berkata, “Hadis hasan shahih.”",
    "perawi": "Abu Najih Irbadh bin Sariyah",
    "sumber": "Shahih: Sunan Abu Dawud (no. 4607); Sunan At-Tirmidzi (no. 2676); Sunan Ibnu Majah (no. 42, 43); Musnad Ahmad (IV/126-127); dan Sunan Ad-Darimi (I/44)"
  },
  {
    "nomor": 29,
    "judul": "Pintu-Pintu Kebaikan",
    "arab": "عَنْ مُعَاذِ بْنِ جَبَلٍ رضي الله عنه قَالَ: قُلْتُ: يَا رَسُولَ اللهِ، أَخْبِرْنِي بِعَمَلٍ يُدْخِلُنِيْ الْجَنَّةَ، وَيُبَاعِدُنِي عَنِ النَّارِ، قَالَ: لَقَدْ سَأَلْتَنِي عَنْ عَظِيمٍ وَإِنَّهُ لَيَسِيرٌ عَلَى مَن يَسَّرَهُ اللهُ عَلَيهِ: تَعْبُدَ اللهَ وَلَا تُشْرِكُ بِهِ شَيْئًا، وَتُقِيمُ الصَّلَاةَ، وَتُؤْتِي الزَّكَاةَ، وَتَصُومُ رَمَضَانَ، وَتَحُجُّ الْبَيْتَ. ثُمَّ قَالَ: أَلَا أَدُلُّكَ عَلَى أَبْوَابِ الْخَيْرِ؟ الصَّوْمُ جُنَّةٌ، والصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ، وَصَلَاةُ الرَّجُلِ فِي جَوْفِ اللَّيْلِ. قَالَ: ثُمَّ تَلَا: (تَتَجَافَى جُنُوبُهُمْ عَنِ الْمَضَاجِع)(السجدة: الآية ۱٦-۱٧) حَتَّى بَلَغَ (يَعْمَلُونَ) ثُمَّ قَالَ: أَلَا أُخْبِرُكَ بِرَأْسِ الأَمْرِ كُلِّهِ وَعَمُودِهِ وَذِرْوَةِ سَنَامِهِ؟ قُلْتُ: بَلَى يَا رَسُولَ اللهِ! قَالَ: رَأْسُ الأَمْرِ الإِسْلَامُ وَعَمُوْدُهُ الصَّلَاةُ وَذِرْوَةُ سَنَامِهِ الْجِهَادُ. ثُمَّ قَالَ: أَلَا أُخْبِرُكَ بِمَلَاكِ ذَلِكَ كُلِّهِ؟ قُلْتُ: بَلَى يَا نَبِيَّ اللهِ! فَأَخَذَ بِلِسَانِهِ وَقَالَ: كُفَّ عَلَيْكَ هَذَا! فَقُلْتُ: يَا نَبِيَّ اللهِ! وَإِنَّا لَمُؤَاخَذُوْنَ بِمَا نَتَكَلًّمُ بِهِ؟ فَقَالَ: ثَكِلَتْكَ أُمُّكَ يَا مُعَاذُ! وَهَلْ يُكَبُّ النَّاسُ فِي النَّارِ عَلَى وُجُوهِهِمْ -أَوْ قَالَ عَلَى مَنَاخِرِهِمْ- إِلَّا حَصَائِدُ أَلْسِنَتِهِمْ؟ رَوَاهُ التِّرْمِذِي وَقَالَ: حَدِيْثٌ حَسَنٌ صَحِيْحٌ.",
    "terjemahan": "Dari Muadz bin Jabal radhiyallahu ‘anhu dia berkata: Aku berkata: ”Wahai Rasulullah shallallahu ‘alaihi wa sallam, beritahukanlah kepadaku amalan yang dapat memasukkanku ke dalam surga dan menjauhkanku dari neraka! Beliau shallallahu ‘alaihi wa sallam bersabda: ”Sungguh engkau telah bertanya tentang sesuatu yang besar, namun sungguh hal tersebut sangatlah mudah dikerjakan bagi yang dimudahkan Allah, yaitu engkau hanya beribadah pada Allah subhanahu wa ta’ala semata dan tidak menyekutukanNya dengan sesuatu apapun, menegakkan shalat, menunaikan zakat, berpuasa pada bulan Ramadhan dan menunaikan ibadah haji.” Kemudian beliau shallallahu ‘alaihi wa sallam melanjutkan: ”Maukah aku tunjukkan kepadamu pintu-pintu kebaikan? Puasa itu adalah tameng, sedekah itu memadamkan(menghapuskan) kesalahan seperti air memadamkan api dan shalatnya seseorang pada tengah malam. Lalu beliau membaca: “Lambung-lambung mereka jauh dari tempat tidurnya.” (QS. As Sajdah : 16) Sampai pada firman-Nya: “Yang telah mereka kerjakan.” Kemudian beliau shallallahu ‘alaihi wa sallam kembali bersabda: “Maukah engkau aku beritahu pokok urusan agama ini, tiangnya dan puncak tertingginya?” Aku mengatakan: ‘Tentu, wahai Rasulullah. Beliau shallallahu ‘alaihi wa sallam melanjutkan: “Pokok segala urusan adalah Islam, tiangnya adalah shalat dan puncak tertingginya adalah jihad.” Kemudian beliau shallallahu ‘alaihi wa sallam berkata: “Maukah aku beritahu tentang sesuatu yang bisa menguatkan semua itu?” Aku menjawab: ‘Tentu, wahai Nabi Allah.’ Maka Beliau shallallahu ‘alaihi wa sallam memegang lisannya (lidahnya) dan bersabda: “Tahanlah (jagalah) ini!” Aku bertanya: ”Wahai Nabi Allah, apakah kita akan disiksa disebabkan apa yang kita ucapkan?” Beliau shallallahu ‘alaihi wa sallam bersabda: ”Celaka kamu! Bukankah banyak dari kalangan manusia yang tersungkur kedalam api neraka dengan mukanya terlebih dahulu -dalam riwayat lain: dengan lehernya terlebih dahulu- itu gara-gara buah ucapan lisannya?” Diriwayatkan oleh At-Tirmidzi dan berkata, “Hadis ini hasan shahih.”",
    "perawi": "Muadz bin Jabal",
    "sumber": "Shahih: Sunan At-Tirmidzi (no. 2616); Sunan Ibnu Majah (no. 3973); As-Sunan Al-Kubra lin Nasa’i (no. 11330); Musnad Ahmad (V/231, 236, 237, 245); dan Mushannaf Abdurrazzaq (no. 20303)"
  },
  {
    "nomor": 30,
    "judul": "Batasan-Batasan Allah",
    "arab": "عَنْ أَبِيْ ثَعْلَبَةَ الخُشَنِيِّ جُرثُومِ بنِ نَاشِرٍ رضي الله عنه عَن رَسُولِ اللهِ صلى الله عليه وسلم قَالَ: إِنَّ اللهَ فَرَضَ فَرَائِضَ فَلَا تُضَيِّعُوْهَا، وَحَدَّ حُدُودًا فَلَا تَعْتَدُوْهَا وَحَرَّمَ أَشْيَاءَ فَلاَ تَنْتَهِكُوْهَا، وَسَكَتَ عَنْ أَشْيَاءَ رَحْمَةً لَكُمْ غَيْرَ نِسْيَانٍ فَلا تَبْحَثُوْا عَنْهَا. حديث حسن رَوَاهُ الدَّارُقُطْنِي وَغَيْرُهُ.",
    "terjemahan": "Dari Abu Tsa’labah Al-Khusyani Jurtsum bin Nasyir radhiyallahu ‘anhu dari Rasulullah shallallahu ‘alaihi wa sallam, beliau shallallahu ‘alaihi wa sallam bersabda: ”Sesungguhnya Allah telah menetapkan berbagai kewajiban, maka janganlah kalian menyia-nyiakan kewajiban itu. Dia telah menetapkan batasan-batasan hukum maka janganlah kalian melampuinya. Dia telah mengharamkan beberapa hal maka janganlah kalian melanggarnya. Dan Allah subhanahu wa ta’ala juga mendiamkan beberapa perkara sebagai bentuk rahmat (kasih sayang) bagi kalian bukan karena lupa, maka janganlah kalian membahasnya (mencari-cari hukumnya).“ Hadis hasan, diriwayatkan oleh Ad-Daruquthni dan selainnya.",
    "perawi": "Abu Tsa’labah Al-Khusyani Jurtsum bin Nasyir",
    "sumber": "Dha’if: Sunan Ad-Daruquthni (no. 4316). Dinilai dha’if oleh Al-Albani"
  },
  {
    "nomor": 31,
    "judul": "Perintah untuk Bersikap Zuhud",
    "arab": "عَنْ أَبي العَبَّاس سَعدِ بنِ سَهلٍ السَّاعِدِي رَضِيَ اللهُ عَنْهُ قَالَ: جَاءَ رَجُلٌ إِلَى النبي صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا رَسُوْلَ اللهِ! دُلَّنِيْ عَلَى عَمَلٍ إِذَا عَمِلتُهُ أَحَبَّنِيَ اللهُ وَأَحَبَّنِيَ النَّاسُ! فَقَالَ رسول الله صلى الله عليه وسلم: ازْهَدْ فِي الدُّنيَا يُحِبَّكَ اللهُ، وازْهَدْ فِيْمَا عِنْدَ النَّاسِ يُحِبَّكَ النَّاسُ. حَدِيْثٌ حَسَنٌ رَوَاهُ ابْنُ مَاجَه وَغَيْرُهُ بِأَسَانِيْدَ حَسَنَةٍ.",
    "terjemahan": "Dari Abul Abbas Sa’ad bin Sahl As-Sa’idi radhiyallahu ‘anhu, ia berkata: Seseorang telah datang kepada nabi shallallahu ‘alaihi wa sallam lalu mengatakan: ‘Wahai Rasulullah, tunjukkanlah kepadaku sebuah amalan yang apabila aku mengamalkannya Allah subhanahu wa ta’ala dan manusia mencintaiku!’ maka beliau shallallahu ‘alaihi wa sallam menjawab: ”Bersikaplah zuhud terhadap dunia, niscaya Allah subhanahu wa ta’ala akan mencintaimu dan bersikaplah zuhud engkau terhadap apa yang ada pada manusia niscaya mereka akan mencintaimu.” Hadis hasan, diriwayatkan oleh Ibnu Majah dan selainnya dengan sanad yang hasan.",
    "perawi": "Abul Abbas Sa’ad bin Sahl As-Sa’idi",
    "sumber": "Hasan: Sunan Ibnu Majah (no. 4102); Raudhatul Uqala (h. 128) oleh Ibnu Hibban; Mustadrak Al-Hakim (IV/313); Al-Mu’jamul Kabir (no. 5972) oleh Ath-Thabrani; Hilyatul Aulia (VII/155, no. 9991) oleh Abu Nu’aim; Syu’abul Iman (no. 10043) oleh Al-Baihaqi; Al-Kamil (III/458) oleh Ibnu Adi; dan Adh-Dhu’afa (II/357) oleh Al-Uqaili"
  },
  {
    "nomor": 32,
    "judul": "Tidak Boleh Membahayakan",
    "arab": "عنْ أَبِيْ سَعِيْدٍ سَعْدِ بنِ مَالِكٍ بْنِ سِنَانٍ الخُدْرِي رضي الله عنه أَنَّ رَسُولَ اللهِ صلى الله عليه وسلم قَالَ: لَا ضَرَرَ وَلَا ضِرَارَ. حَدِيْثٌ حَسَنٌ رَوَاهُ ابْنُ مَاجَه وَالدَّارَقُطْنِي وَغَيْرُهُمَا مُسْنَدًا، وَرَوَاهُ مَالِكٌ في الْمُوَطَّأِ مُرْسَلًا عَنْ عَمْرٍ بْنِ يَحْيَى عَنْ أَبِيْهِ عَنِ النَّبِيِّ صلى الله عليه وسلم فَأَسْقَطَ أَبَا سَعِيْدٍ، وَلَهُ طُرُقٌ يُقَوِّي بَعْضُهَا بَعْضًا.",
    "terjemahan": "Dari Abu Said Sa’ad bin Malik bin Sinan Al-Khudry radhiyallahu ‘anhu, bahwa Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Tidak boleh membahayakan diri sendiri dan tidak boleh membahayakan orang lain.” Hadis hasan diriwayatkan oleh Ibnu Majah, Ad-Daruquthni dan lainnya dengan sanad bersambung. Diriwayatkan juga oleh Malik dalam Al-Muwaththa’ dari Amr bin Yahya dari ayahnya dari Nabi shallallahu ‘alaihi wa sallam secara mursal karena menggugurkan (tidak menyebutkan) Abu Sa’id. Hadis ini memiliki beberapa jalan yang saling menguatkan.",
    "perawi": "Abu Said Sa’ad bin Malik bin Sinan Al-Khudry",
    "sumber": "Hasan: Sunan Ibnu Majah (no. 2341), Musnad Ahmad (I/313), Musnad Abu Ya’la (IV/397), Ath-Thabrani dalam Al-Kabir (no. 11086) dari hadis Ibnu ‘Abbas radhiyallahu ‘anhuma dan diriwayatkan dari hadis Abu Sa’id Al-Khudri radhiyallahu ‘anhu oleh Al-Hakim dalam Al-Mustadrak (II/66), Sunan Ad-Daruquthni (III/77), Al-Baihaqi dalam Al-Kubra (VI/69). Diriwayatkan pula dalam Al-Muwaththa’ oleh Malik secara mursal (II/745)"
  },
  {
    "nomor": 33,
    "judul": "Bukti Adalah Wajib Bagi Penuntut",
    "arab": "عَنِ ابْنِ عَبَّاسٍ رَضِيَ اللهُ عَنْهُمَا أَنَّ رَسُولَ اللهِ صلى الله عليه وسلم قَالَ: “لَوْ يُعْطَى النَّاسُ بِدَعْوَاهُمْ، لَادَّعَى رِجَالٌ أَمْوَالَ قَومٍ وَدِمَاءَهُمْ، وَلَكِنِ البَيِّنَةُ عَلَى المُدَّعِي، وَاليَمِيْنُ عَلَى مَنْ أَنْكَرَ. حَدِيْثٌ حَسَنٌ رَوَاهُ اْلبَيْهَقِيّ وغيره هَكَذَا بَعْضُهُ فِيْ الصَّحِيْحَيْنِ.",
    "terjemahan": "Dari Ibnu ‘Abbas radhiyallahu ‘anhuma, bahwa Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Seandainya setiap orang diberikan (dikabulkan) sesuai dengan pengakuannya (tuntutannya) tentunya akan banyak orang yang menuntut harta dan darah suatu kaum. Akan tetapi bukti itu harus ditegakkan oleh orang yang menuntut dan sumpah itu wajib diberikan oleh orang yang mengingkari (tuduhan).” Hadis hasan, diriwayatkan oleh Al-Baihaqi seperti ini, sebagiannya diriwayatkan dalam shahihain.",
    "perawi": "Ibnu ‘Abbas",
    "sumber": "Hasan: Sunanul Kubra (V/331-332, X/252); Shahih Bukhari (no. 4552); Shahih Muslim (no. 1711); Sunan Ibnu Majah (no. 2321); Mushannaf Abdurrazzaq (no. 15193); dan Al-Mu’jam Al-Kabir (no. 11224); oleh Ath-Thabrani"
  },
  {
    "nomor": 34,
    "judul": "Kewajiban Mengingkari Kemungkaran",
    "arab": "عَنْ أَبِيْ سَعِيْدٍ الْخُدْرِيِّ رَضِيَ اللهُ عَنْهُ قَالَ: سَمِعْتُ رَسُوْلَ اللهِ صَلىَّ اللهُ عَلَيْهِ وَسَلَّمَ يَقُوْلُ: مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِلِسَانِهِ، فَإِنْ لَمْ يَسْتَطعْ فَبِقَلبِهِ وَذَلِكَ أَضْعَفُ الإيْمَانِ. رَوَاهُ مُسْلِمٌ.",
    "terjemahan": "Dari Abu Sa’id Al-Khudri radhiyallahu ‘anhu dia berkata: ‘Aku mendengar Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Barang siapa di antara kalian yang melihat kemungkaran, hendaknya dia ubah dengan tangannya (kekuasaannya). Kalau dia tidak mampu hendaknya dia ubah dengan lisannya dan kalau dia tidak mampu hendaknya dia ingkari dengan hatinya. Dan inilah selemah-lemahnya iman.” Dirirwayatkan oleh Muslim.",
    "perawi": "Abu Sa’id Al-Khudri",
    "sumber": "Shahih: Shahih Muslim (no. 49); Sunan Abu Dawud (no. 1140, 4340); Sunan At-Tirmidzi (no. 2172); Sunan Ibnu Majah (no. 1275, 4013); Sunan An-Nasa’i (VIII/111-112); dan Musnad Ahmad (III/10, 20, 49, 52-53, 54)"
  },
  {
    "nomor": 35,
    "judul": "Sesama Muslim Adalah Saudara",
    "arab": "عَنْ أَبِيْ هُرَيْرَةَ رضي الله عنه قَالَ: قَالَ رَسُوْلُ اللهِ صلى الله عليه وسلم: لَا تَحَاسَدُوْا، وَلَا تَنَاجَشُوْا، وَلَا تَبَاغَضُوْا، وَلَا تَدَابَرُوْا، وَلَا يَبِعْ بَعْضُكُمْ عَلَى بَيْعِ بَعْضٍ، وَكُوْنُوْا عِبَادَ اللهِ إِخوَانًا، الْمُسْلِمُ أَخُوْ الْمُسْلِمِ، لَا يَظْلِمُهُ، وَلَا يَخْذُلُهُ، وَلَا يَكْذِبُهُ، وَلَايَحْقِرُهُ، التَّقْوَى هَاهُنَا -وَيُشِيْرُ إِلَى صَدْرِهِ ثَلاَثَ مَرَّاتٍ- بِحَسْبِ امْرِئٍ مِنَ الشَّرِّ أَنْ يَحْقِرَ أَخَاهُ الْمُسلِمَ، كُلُّ الْمُسْلِمِ عَلَى الْمُسْلِمِ حَرَامٌ دَمُهُ وَمَالُهُ وَعِرْضُهُ. رَوَاهُ مُسْلِمٌ.",
    "terjemahan": "Dari Abu Hurairah radhiyallahu ‘anhu dia berkata, Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Janganlah kalian saling dengki, melakukan najasy, saling membenci, saling membelakangi dan sebagian dari kalian menjual apa yang dijual saudaranya. Jadilah kalian semua hamba-hamba Allah yang bersaudara. Seorang muslim adalah saudara bagi muslim yang lain, sehingga dia tidak boleh menzhaliminya, menghinanya, mendustakannya dan merendahkannya. Takwa itu letaknya di sini -sambil menunjuk ke dadanya sebanyak tiga kali- cukuplah seseorang itu dalam kejelekan selama dia merendahkan saudaranya sesama muslim. Setiap muslim terhadap muslim lainnya haram dan darah, harta dan kehormatannya.” Diriwayatkan oleh Muslim.",
    "perawi": "Abu Hurairah",
    "sumber": "Shahih: Shahih Muslim (no. 2564); Sunan Ibnu Majah (no. 3933, 4213); dan Musnad Ahmad (no. 360)"
  },
  {
    "nomor": 36,
    "judul": "Keutamaan Akhlak dan Ilmu",
    "arab": "عَنْ أَبِيْ هُرَيْرَةَ رضي الله عنه قال: رسول الله صلى الله عليه وسلم قَالَ: مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنيَا نَفَّسَ اللهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ اْلقِيَامَةِ، وَمَنْ يَسَّرَ عَلَى مُعَسِّرٍ يَسَّرَ اللهُ عَلَيْهِ فِيْ الدُّنْيَا وَالآخِرَةِ، وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللهُ فِيْ الدُّنْيَا وَالآخِرَةِ، وَاللهُ فِيْ عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيْهِ، وَمَنْ سَلَكَ طَريقًا يَلْتَمِسُ فِيْهِ عِلْمًا سَهَّلَ اللهُ لَهُ بِهِ طَرِيْقًا إِلَى الْجَنَّةِ، وَمَا اجْتَمَعَ قَوْمٌ فِي بَيْتٍ مِنْ بُيُوْتِ اللهِ يَتْلُوْنَ كِتَابَ اللهِ وَيتَدَارَسُوْنَهَ بَيْنَهُمْ إِلَّا نَزَلَتْ عَلَيْهِمُ السَّكِيْنَةُ وَغَشِيَتْهُمُ الرَّحْمَةُ وحَفَّتْهُمُ الْمَلاَئِكَةُ وَذَكَرَهُمُ اللهُ فِيْمَنْ عِنْدَهُ، وَمَنْ بَطَّأَ بِهِ عَمَلُهُ لَمْ يُسْرِعْ بهِ نَسَبُهُ .رَوَاهُ مُسْلِمٌ بِهَذَا اللَّفْظِ.",
    "terjemahan": "Dari Abu Hurairah radhiyallahu ‘anhu dia berkata: Rasulullah shallallahu ‘alaihi wa sallam bersabda: “Barangsiapa yang menghilangkan satu kesulitan seorang mukmin yang lain dari kesulitannya di dunia, niscaya Allah akan menghilangkan darinya satu kesulitan pada hari kdiamat. Barangsiapa yang meringankan orang yang kesusahan (dalam hutangnya), niscaya Allah akan meringankan baginya (urusannya) di dunia dan akhirat. Barangsiapa yang menutupi aib seorang muslim, niscaya Allah akan menutupi aibnya di dunia dan akhirat. Dan Allah akan senantiasa menolong hamba-Nya, selama hamba tersebut mau menolong saudaranya. Barangsiapa yang menempuh satu jalan untuk mencari ilmu, niscaya Allah akan memudahkan baginya jalan menuju surga. Tidaklah suatu kaum berkumpul di salah satu rumah dari rumah-rumah Allah (masjid), membaca kitabullah, saling mengajarkan di antara mereka, melainkan akan turun kepada mereka ketenangan, diliputi oleh rahmat dan dinaungi oleh para malaikat serta Allah akan menyebut-nyebut mereka di hadapan makhluk yang berada di sisiNya. Barangsiapa yang lambat dalam beramal, sungguh garis nasabnya tidak akan bisa membantunya.” Diriwayatkan oleh Muslim dengan lafazh ini.",
    "perawi": "Abu Hurairah",
    "sumber": "Shahih: Shahih Muslim (no. 2699); Sunan Abu Dawud (no. 3643); Sunan At-Tirmidzi (no. 1425, 2646, 2945); Sunan Ibnu Majah (no. 225); Musnad Ahmad (II/252, 325); Sunan Ad-Darimi (I/99); Musnad Ath-Thayalisi (no. 2561); dan Al-Mustadrak (I/88-89)"
  },
  {
    "nomor": 37,
    "judul": "Kebaikan dan Keburukan",
    "arab": "عَن ابْنِ عَبَّاسٍ رَضِيَ اللهُ عَنْهُمَا عَنِ رسول الله صلى الله عليه وسلم فِيْمَا يَرْوِيْهِ عَنْ رَبِّهِ تَبَارَكَ وَتَعَالَى أَنَّهُ قَالَ: إِنَّ الله كَتَبَ الْحَسَنَاتِ وَالسَّيئَاتِ ثُمَّ بَيَّنَ ذَلِكَ؛ فَمَنْ هَمَّ بِحَسَنَةٍ فَلَمْ يَعْمَلْهَا كَتَبَهَا اللهُ عِنْدَهُ حَسَنَةً كَامِلَةً، وَإِنْ هَمَّ بِهَا فَعَمِلَهَا كَتَبَهَا اللهُ عِنْدَهُ عَشْرَ حَسَنَاتٍ إِلَى سَبْعِمائَةِ ضِعْفٍ إِلىَ أَضْعَافٍ كَثِيْرَةٍ. وَإِنْ هَمَّ بِسَيِّئَةٍ فَلَمْ يَعْمَلْهَا كَتَبَهَا اللهُ عِنْدَهُ حَسَنَةً كَامِلَةً، وَإِنْ هَمَّ بِهَا فَعَمِلَهَا كَتَبَهَا اللهُ له سَيِّئَةً وَاحِدَةً. رَوَاهُ البُخَارِي وَمُسْلِمٌ.",
    "terjemahan": "Dari Ibnu ‘Abbas radhiyallahu ‘anhuma dari Rasulullah, beliau bersabda tentang sesuatu yang beliau riwayatkan dari Rabb-nya Tabaraka wa Ta’ala: “Sesungguhnya Allah menetapkan adanya kebaikan dan kejelekan, kemudian Dia menjelaskannya. Barangsiapa yang berniat untuk mengerjakan amal kebaikan namun belum terlaksana, maka Allah akan catat baginya satu kebaikan yang sempurna. Dan jika dia berniat untuk kebaikan dan mengerjakannya, maka Allah akan catat baginya dengan 10 kebaikan hingga 700 kali lipat, bahkan sampai berlipat-lipat banyaknya. Sebaliknya, apabila dia berniat untuk mengerjakan amalan kejelekan namun belum terlaksana, maka Allah akan catat baginya satu kebaikan yang sempurna. Dan apabila dia berniat untuk kejelekan dan mengerjakannya, maka Allah akan mencatat baginya satu kejelekan saja.” Diriwayatkan oleh Bukhari dan Muslim.",
    "perawi": "Ibnu ‘Abbas",
    "sumber": "Muttafaqun ‘Alaih: Shahih Bukhari (no. 6491); Shahih Muslim (no. 131); dan Musnad Ahmad (I/310, 361)"
  },
  {
    "nomor": 38,
    "judul": "Cara Mendapatkan Kecintaan Allah",
    "arab": "عَنْ أَبِي هُرَيْرَةَ رضي الله عنه قَالَ: قَالَ رَسُولُ اللهِ صلى الله عليه وسلم: إِنَّ اللهَ تَعَالَى قَالَ: مَنْ عَادَى لِي وَلِيًّا فَقَدْ آذَنْتُهُ بِالحَرْبِ. وَمَا تَقَرَّبَ إِلَيَّ عَبْدِيْ بِشَيءٍ أَحَبَّ إِلَيَّ مِمَّا افْتَرَضْتُهُ عَلَيْهِ. وَلَا يَزَالُ عَبْدِيْ يَتَقَرَّبُ إِلَيَّ بِالنَّوَافِلِ حَتَّى أُحِبَّهُ، فَإِذَا أَحْبَبتُهُ كُنْتُ سَمْعَهُ الَّذِيْ يَسْمَعُ بِهِ، وَبَصَرَهُ الَّذِيْ يُبْصِرُ بِهِ، وَيَدَهُ الَّتِي يَبْطِشُ بِهَا، وَرِجْلَهُ الَّتِي يَمْشِيْ بِهَا. وَلَئِنْ سَأَلَنِيْ لَأُعْطِيَنَّهُ، وَلَئِنْ اسْتَعَاذَنِيْ لَأُعِيْذَنَّهُ. رَوَاهُ اْلبُخَارِي.",
    "terjemahan": "Dari Abu Hurairah radhiyallahu ‘anhu, dia berkata: ‘Rasulullah shallallahu ‘alaihi wa sallam bersabda: “Sesungguhnya Allah berfirman: ”Barangsiapa yang memusuhi wali-Ku, maka Aku menyatakan perang kepadanya. Tidaklah seorang hamba-Ku mendekatkan diri kepada-Ku dengan sesuatu yang lebih Aku cintai daripada hal-hal yang telah Aku wajibkan baginya. Senantiasa hamba-Ku mendekatkan diri kepada-Ku dengan amalan-amalan nafilah (sunnah) hingga Aku mencintainya. Apabila Aku telah mencintainya maka Aku menjadi pendengarannya yang dia gunakan untuk mendengar, Aku menjadi penglihatannya yang dia gunakan untuk melihat, Aku menjadi tangannya yang dia gunakan untuk memegang dan Aku menjadi kakinya yang dia gunakan untuk melangkah. Jika dia meminta kepada-Ku pasti Aku memberinya dan jika dia meminta perlindungan kepada-Ku pasti Aku akan melindunginya.” Diriwayatkan oleh Bukhari.",
    "perawi": "Abu Hurairah",
    "sumber": "Shahih: Shahih Bukhari (no. 6502); dan As-Sunan Al-Kubra lil Baihaqi (III/346, X/219)"
  },
  {
    "nomor": 39,
    "judul": "Tiga Hal yang Allah Maafkan",
    "arab": "عَنِ ابْنِ عَبَّاسٍ رَضِيَ اللهُ عَنْهُمَا أَنَّ رَسُولَ اللهِ صلى الله عليه وسلم قَال: إِنَّ اللهَ تَجَاوَزَ لِي عَنْ أُمَّتِي الْخَطَأَ وَالنِّسْيَانَ وَمَا اسْتُكْرِهُوْا عَلَيْهِ. حَدِيْثٌ حَسَنٌ رَوَاهُ ابْنُ مَاجَه وَاْلبَيْهَقِيّ وَغَيْرُهُمَا.",
    "terjemahan": "Dari Ibnu Abbas radhiyallahu ‘anhuma bahwa Rasulullah shallallahu ‘alaihi wa sallam bersabda: “Sesungguhnya Allah membiarkan(mengampuni) kesalahan dari umatku akibat kekeliruan dan lupa serta keterpaksaan.” Hadis hasan, diriwayatkan oleh Ibnu Majah, Baihaqi dan selainnya.",
    "perawi": "Ibnu Abbas",
    "sumber": "Shahih: Sunan Ibnu Majah (no. 2045); As-Sunan Al-Kubra lil Baihaqi (VII/356-357); Sunan Ad-Daruquthni (III/403); Al-Mustadrak (II/198); Shahih Ibnu Hibban (XVI/202); Ath-Thabrani dalam Al-Kabir (no. 11274)"
  },
  {
    "nomor": 40,
    "judul": "Jadilah Engkau di Dunia Ini Seperti Orang Asing",
    "arab": "عَنِ ابْنِ عُمَرَ رَضِيَ اللهُ عَنْهُمَا قَالَ: أَخَذَ رَسُولُ اللهِ صلى الله عليه وسلم بِمنْكِبَيَّ فَقَالَ: كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيْبٌ أَوْ عَابِرُ سَبِيْلٍ. وَكَانَ ابْنُ عُمَرَ رَضِيَ اللهُ عَنْهُمَا يَقُوْلُ: إِذَا أَمْسَيْتَ فَلَا تَنْتَظِرِ الصَّبَاحَ، وَإِذَا أَصْبَحْتَ فَلَا تَنْتَظِرِ المَسَاءَ. وَخُذْ مِنْ صِحَّتِكَ لِمَرَضِكَ، وَمِنْ حَيَاتِكَ لِمَوْتِكَ. رَوَاهُ الْبُخَارِي.",
    "terjemahan": "Dari Ibnu Umar radhiyallahu ‘anhuma dia berkata: “Suatu hari Rasulullah shallallahu ‘alaihi wa sallam memegang kedua pundakku seraya bersabda: ”Jadilah engkau di dunia ini seperti orang asing atau musafir (pengembara)”. Maka Ibnu ‘Umar radhiyallahu ‘anhuma menyatakan: “Jika engkau berada di sore hari janganlah engkau menunggu datangnya esok hari. Jika engkau berada di pagi hari, janganlah engkau menunggu datangnya sore hari. Pergunakanlah masa sehatmu untuk menghadapi masa sakitmu, dan masa hidupmu untuk menghadapi masa kematianmu.” Diriwayatkan oleh Bukhari.",
    "perawi": "Ibnu Umar",
    "sumber": "Shahih: Shahih Bukhari (no. 6416); Sunan At-Tirmidzi (no. 2333); Sunan Ibnu Majah (no. 4114); dan Musnad Ahmad (II/24, 41)"
  },
  {
    "nomor": 41,
    "judul": "Mengikuti Syariat Adalah Tiang Keimanan",
    "arab": "عَنْ أَبِيْ مُحَمَّدٍ عَبْدِ اللهِ بِنِ عَمْرٍ بْنِ العَاصِ رَضِيَ اللهُ عَنْهُمَا قَالَ: قَالَ رَسُولُ اللهِ صلى الله عليه وسلم: لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يَكُونَ هَواهُ تَبَعًا لِمَا جِئْتُ بِهِ. حَدِيْثٌ حَسَنٌ صَحِيْحٌ رَوَيْنَاهُ فِي كِتَابِ الحُجَّةِ بِإِسْنَادٍ صَحِيْحٍ.",
    "terjemahan": "Dari Abu Muhammad Abdullah bin Amr bin Al-Ash radhiyallahu ‘anhuma, dia berkata: ”Rasulullah shallallahu ‘alaihi wa sallam bersabda: ”Tidaklah sempurna keimanan salah seorang di antara kalian hingga hawa nafsunya mau mengikuti apa yang aku bawa.” Hadis hasan shahih, kami meriwayatkannya dari kitab Al-Hujjah dengan sanad shahih.",
    "perawi": "Abu Muhammad Abdullah bin Amr bin Al-Ash",
    "sumber": "Dha’if: Diriwayatkan oleh Al-Baghawi dalam Syarhus Sunnah (1/212), Ibnu Abi ‘Ashim dalam as Sunnah (1/12), Al-Baihaqi dalam Al-Madkhal Ilas Sunnan Al-Kubra (1/88) dan dia berkata: ”Nu’aim bin Hammad bersendirian dalam meriwayatkan hadis ini”, Al-Khatib dalam Tarikh Al-Baghdad (4/368). Lihat kritikan tentang lemahnya hadis ini dalam Jami’ul ‘Ulum Wal Hikam (h. 387-388. Dinilai dha’if oleh Imam Ibnu Rajab dan Syaikh Al-Albani"
  },
  {
    "nomor": 42,
    "judul": "Luasnya Ampunan Allah",
    "arab": "عَنْ أَنَسِ بْنِ مَالِكٍ رضي الله عنه قَالَ: سَمِعْتُ رَسُولَ اللهِ صلى الله عليه وسلم يَقُولُ: قَالَ اللهُ تبارك وتَعَالَى: يَا ابْنَ آدَمَ! إِنَّكَ مَا دَعَوْتَنِيْ وَرَجَوْتَنِيْ غَفَرْتُ لَكَ عَلَى مَا كَانَ فيك وَلَا أُبَالِيْ. يَا ابْنَ آدَمَ! لَو بَلَغَتْ ذُنُوْبُكَ عَنَانَ السَّمَاءِ ثُمَّ اسْتَغْفَرْتَنِيْ غَفَرْتُ لَكَ وَلَا أبالي. يَا ابْنَ آدَمَ! إِنَّكَ لَوْ أَتَيْتَنِيْ بِقُرَابِ الأَرْضِ خَطَايَا ثُمَّ لقِيْتَنِيْ لَا تُشْرِكُ بِيْ شَيْئًا لَأَتَيْتُكَ بِقُرَابِهَا مَغفِرَةً. رَوَاهُ التِّرْمِذِي وَقَالَ: حَدِيْثٌ حَسَنٌ صَحَيْحٌ.",
    "terjemahan": "Dari Anas bin Malik radhiyallahu ‘anhu dia berkata: ‘Aku mendengar Rasulullah shallallahu ‘alaihi wa sallam bersabda: “Allah berfirman: ”Wahai Bani Adam! sesungguhnya jika engkau senantiasa berdoa dan berharap kepada-Ku niscaya Aku akan mengampunimu semua dosa yang ada padamu dan Aku tidak peduli. Wahai anak Adam! kalau seandainya dosamu setinggi langit, kemudian engkau memohon ampun kepada- Ku, niscaya aku akan memberikan ampunan kepadamu dan Aku tidak peduli. Wahai anak Adam! seandainya engkau menghadap kepada-Ku dengan membawa dosa sepenuh bumi kemudian engkau berjumpa dengan-Ku dalam keadaan tidak menyekutukan-Ku dengan sesuatu apapun, niscaya Aku akan mendatangimu dengan ampunan sepenuh bumi pula.” Diriwayatkan oleh At-Tirmidzi dan berkata, “Hadis hasan shahih.”",
    "perawi": "Anas bin Malik",
    "sumber": "Shahih: Sunan At-Tirmidzi (no. 3540); Ath-Thabrani dalam Al-Ausath (IV/315) dari hadis Anas radhiyallahu ‘anhu. Abu Isa (At-Tirmidzi) berkata, “Ini adalah hadis gharib (diriwayatkan dengan 1 jalan), tidaklah kami mengetahuinya kecuali hanya dari jalan ini.” Diriwayatkan juga dari shahabat Abu Dzar radhiyallahu ‘anhu dalam Musnad Ahmad (V/148); Sunan Ad-Darimi (no. 2788); Al-Bazzar (IX/403); Al-Hakim dalam Al-Mustadrak (IV/269); dan dia berkata, “Hadis ini sanadnya shahih namun Imam Bukhari dan Muslim tidak mengeluarkannya.”"
  }
];

export default HADITS_ARBAIN;
