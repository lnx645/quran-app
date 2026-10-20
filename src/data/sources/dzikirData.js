// Data statis dzikir pagi & petang (ringkasan Al-Ma'tsurat, data layer).
// hitung: jumlah bacaan yang dianjurkan. Tap per item untuk menghitung.
// Item dengan field `ayat` adalah bacaan berupa ayat/surah Qur'an dan
// memiliki audio per-ayat (Quran.com) untuk mode "Putar Berurutan";
// item doa biasa tidak dipaksa beraudio.

const AYAT_KURSI = {
  arab: 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ',
  latin: "Allahu laa ilaaha illaa huwa, al-hayyul qayyuum. Laa ta'khudzuhuu sinatuw wa laa nauum. Lahuu maa fis samaawaati wa maa fil ardh. Man dzal ladzii yasyfa'u 'indahuu illaa bi idznih. Ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yuhiithuuna bi syai-im min 'ilmihii illaa bi maa syaa'. Wasi'a kursiyyuhus samaawaati wal ardh, wa laa ya-uuduhuu hifzhuhumaa, wa huwal 'aliyyul 'azhiim",
  arti: 'Allah, tidak ada tuhan selain Dia, Yang Mahahidup, Yang terus-menerus mengurus (makhluk-Nya). Dia tidak dilanda oleh kantuk dan tidak (pula) oleh tidur. Milik-Nyalah apa yang di langit dan apa yang di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang ada di hadapan mereka dan apa yang ada di belakang mereka. Mereka tidak mengetahui sesuatu apa pun dari ilmu-Nya, kecuali apa yang Dia kehendaki. Kursi-Nya (ilmu dan kekuasaan-Nya) meliputi langit dan bumi. Dia tidak merasa berat memelihara keduanya. Dialah Yang Mahatinggi lagi Mahaagung.',
  hitung: 1,
  ayat: { surah: 2, dari: 255, sampai: 255, label: 'Ayat Kursi (Al-Baqarah: 255)' },
};

const AL_IKHLAS = {
  arab: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
  latin: "Qul huwallaahu ahad. Allaahush shamad. Lam yalid wa lam yuulad. Wa lam yakul lahuu kufuwan ahad",
  arti: 'Katakanlah (Nabi Muhammad), “Dialah Allah Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tidak beranak dan tidak pula diperanakkan. Tidak ada sesuatu pun yang setara dengan-Nya.”',
  hitung: 3,
  ayat: { surah: 112, dari: 1, sampai: 4, label: 'Al-Ikhlas (112: 1–4)' },
};

const AL_FALAQ = {
  arab: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
  latin: "Qul a'uudzu bi rabbil falaq. Min syarri maa khalaq. Wa min syarri ghaasiqin idzaa waqab. Wa min syarrin naffaatsaati fil 'uqad. Wa min syarri haasidin idzaa hasad",
  arti: 'Katakanlah, “Aku berlindung kepada Tuhan yang (menjaga) fajar (subuh), dari kejahatan (makhluk yang) Dia ciptakan, dari kejahatan malam apabila telah gelap gulita, dari kejahatan perempuan-perempuan (penyihir) yang meniup pada buhul-buhul, dan dari kejahatan orang yang dengki apabila dia dengki.”',
  hitung: 3,
  ayat: { surah: 113, dari: 1, sampai: 5, label: 'Al-Falaq (113: 1–5)' },
};

const AN_NAAS = {
  arab: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ ۝ مَلِكِ ٱلنَّاسِ ۝ إِلَـٰهِ ٱلنَّاسِ ۝ مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ ۝ ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ ۝ مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
  latin: "Qul a'uudzu bi rabbin naas. Malikin naas. Ilaahin naas. Min syarril waswaasil khannaas. Alladzii yuwaswisu fii shuduurin naas. Minal jinnati wan naas",
  arti: 'Katakanlah, “Aku berlindung kepada Tuhan manusia, Raja manusia, Sembahan manusia, dari kejahatan (setan) pembisik yang bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia.”',
  hitung: 3,
  ayat: { surah: 114, dari: 1, sampai: 6, label: 'An-Naas (114: 1–6)' },
};

export const DZIKIR_PAGI = [
  AYAT_KURSI,
  AL_IKHLAS,
  AL_FALAQ,
  AN_NAAS,
  {
    arab: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    latin: "Allahumma bika ashbahnaa wa bika amsaynaa, wa bika nahyaa wa bika namuutu wa ilaikan nusyuur",
    arti: 'Ya Allah, dengan-Mu kami berpagi hari dan dengan-Mu kami berpetang hari, dengan-Mu kami hidup dan dengan-Mu kami mati, dan kepada-Mu kami akan dibangkitkan.',
    hitung: 1,
  },
  {
    arab: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    latin: 'Ashbahnaa wa ashbahal mulku lillaah, walhamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah',
    arti: 'Kami berpagi hari dan berpagi hari pula kerajaan milik Allah, segala puji bagi Allah, tidak ada sesembahan yang berhak disembah kecuali Allah semata, tiada sekutu bagi-Nya.',
    hitung: 1,
  },
  {
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    latin: "Allahumma innii as-aluka 'ilman naafi'an, wa rizqan thayyiban, wa 'amalan mutaqabbalan",
    arti: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.',
    hitung: 1,
  },
  {
    arab: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: "Radhiitu billaahi rabban, wa bil islaami diinan, wa bi Muhammadin shallallaahu 'alaihi wa sallama nabiyyaa",
    arti: 'Aku ridha Allah sebagai Rabb, Islam sebagai agama, dan Muhammad shallallahu ‘alaihi wa sallam sebagai nabi.',
    hitung: 3,
  },
  {
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: 'Subhanallah wa bihamdih',
    arti: 'Maha Suci Allah dan segala puji bagi-Nya.',
    hitung: 100,
  },
];

export const DZIKIR_PETANG = [
  AYAT_KURSI,
  AL_IKHLAS,
  AL_FALAQ,
  AN_NAAS,
  {
    arab: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
    latin: "Allahumma bika amsaynaa wa bika ashbahnaa, wa bika nahyaa wa bika namuutu wa ilaykal mashiir",
    arti: 'Ya Allah, dengan-Mu kami berpetang hari dan dengan-Mu kami berpagi hari, dengan-Mu kami hidup dan dengan-Mu kami mati, dan kepada-Mu tempat kembali.',
    hitung: 1,
  },
  {
    arab: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    latin: "Amsaynaa wa amsal mulku lillaah, walhamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah",
    arti: 'Kami berpetang hari dan berpetang hari pula kerajaan milik Allah, segala puji bagi Allah, tidak ada sesembahan yang berhak disembah kecuali Allah semata, tiada sekutu bagi-Nya.',
    hitung: 1,
  },
  {
    arab: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: "A'uudzu bikalimaatillaahit taammaati min syarri maa khalaq",
    arti: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan apa yang Dia ciptakan.',
    hitung: 3,
  },
  {
    arab: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
    latin: "Allahumma innii a'uudzu bika min 'adzaabil qabr, wa a'uudzu bika min fitnatil masiihid dajjaal",
    arti: 'Ya Allah, aku berlindung kepada-Mu dari azab kubur, dan aku berlindung kepada-Mu dari fitnah Al-Masih Ad-Dajjal.',
    hitung: 1,
  },
  {
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: 'Subhanallah wa bihamdih',
    arti: 'Maha Suci Allah dan segala puji bagi-Nya.',
    hitung: 100,
  },
];
