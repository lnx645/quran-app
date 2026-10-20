// Data statis dzikir & wirid ba'da sholat fardhu (data layer) —
// urutan baku yang lazim diamalkan setelah salam. hitung: target
// pengulangan tiap item; halaman memakai counter ketuk per item.
// Konten: ringkasan edukasi yang ditulis ulang — bukan fatwa.

export const DISCLAIMER_PANDUAN =
  'Ringkasan edukasi — bukan fatwa. Untuk kasus khusus, silakan rujuk ulama atau guru setempat.';

export const WIRID_BADA_SHOLAT = [
  {
    nama: 'Istighfar',
    arab: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
    latin: "Astaghfirullāhal-'azhīm.",
    arti: 'Aku memohon ampun kepada Allah Yang Maha Agung.',
    hitung: 3,
  },
  {
    nama: 'Salam kepada Allah (As-Salam)',
    arab: 'اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    latin: "Allāhumma antas-salām, wa minkas-salām, tabārakta yā dzal-jalāli wal-ikrām.",
    arti: 'Ya Allah, Engkaulah As-Salam (Maha Pemberi keselamatan), dari-Mu segala keselamatan, Maha Berkah Engkau wahai Pemilik keagungan dan kemuliaan.',
    hitung: 1,
  },
  {
    nama: 'Tahlil & pujian kekuasaan Allah',
    arab: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin: "Lā ilāha illallāhu wahdahu lā syarīka lah, lahul-mulku wa lahul-hamd, wa huwa 'alā kulli syai'in qadīr.",
    arti: 'Tidak ada sesembahan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya segala kerajaan dan milik-Nya segala puji, dan Dia Mahakuasa atas segala sesuatu.',
    hitung: 1,
  },
  {
    nama: 'Doa agar dibantu berdzikir',
    arab: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    latin: "Allāhumma a'innī 'alā dzikrika wa syukrika wa husni 'ibādatik.",
    arti: 'Ya Allah, tolonglah aku untuk mengingat-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu.',
    hitung: 1,
  },
  {
    nama: 'Ayat Kursi (Al-Baqarah: 255)',
    arab: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ، لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ، مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ، يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ، وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ، وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ، وَلَا يَئُودُهُ حِفْظُهُمَا، وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: "Allāhu lā ilāha illā huwal-hayyul-qayyūm. Lā ta'khudzuhu sinatuw wa lā naum. Lahu mā fis-samāwāti wa mā fil-ardh. Man dzal-ladzī yasyfa'u 'indahu illā bi'idznih. Ya'lamu mā baina aidīhim wa mā khalfahum, wa lā yuhīthūna bisyai'im min 'ilmihi illā bimā syā'. Wasi'a kursiyyuhus-samāwāti wal-ardh, wa lā ya'ūduhu hifzhuhumā, wa huwal-'aliyyul-'azhīm.",
    arti: 'Allah, tidak ada tuhan selain Dia, Yang Maha Hidup lagi terus-menerus mengurus makhluk-Nya. Dia tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan di bumi. Siapa yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya? Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka, dan mereka tidak mengetahui sesuatu pun dari ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi, dan Dia tidak merasa berat memelihara keduanya. Dan Dia Mahatinggi lagi Maha Agung.',
    hitung: 1,
  },
  {
    nama: 'Tasbih',
    arab: 'سُبْحَانَ اللَّهِ',
    latin: 'Subhānallāh.',
    arti: 'Maha Suci Allah.',
    hitung: 33,
  },
  {
    nama: 'Tahmid',
    arab: 'الْحَمْدُ لِلَّهِ',
    latin: 'Alhamdu lillāh.',
    arti: 'Segala puji bagi Allah.',
    hitung: 33,
  },
  {
    nama: 'Takbir & penutup',
    arab: 'اللَّهُ أَكْبَرُ',
    latin: 'Allāhu akbar.',
    arti: 'Allah Maha Besar. (Setelah takbir ke-33, sempurnakan menjadi seratus dengan tahlil di bawah.)',
    hitung: 33,
    penutup: {
      arab: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      latin: "Lā ilāha illallāhu wahdahu lā syarīka lah, lahul-mulku wa lahul-hamd, wa huwa 'alā kulli syai'in qadīr.",
      arti: 'Tidak ada sesembahan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya segala kerajaan dan milik-Nya segala puji, dan Dia Mahakuasa atas segala sesuatu.',
    },
  },
];
