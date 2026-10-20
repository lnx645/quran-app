// Data statis Teks Khutbah Jumat & Hari Raya (data layer).
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa. Teks Arab bagian rukun adalah lafaz ibadah lazim dan
// ayat Al-Qur'an; isi contoh khutbah sengaja berbentuk KERANGKA Bahasa
// Indonesia agar khatib mengembangkan sendiri sesuai kondisi jamaah.
// Modul ini HANYA diimpor oleh KhutbahPage agar ikut chunk halamannya.

export const DISCLAIMER_KHUTBAH =
  'Ringkasan edukasi — bukan fatwa. Rincian rukun dan syarat khutbah diringkas menurut mazhab Syafi\u2019i yang diamalkan mayoritas umat Islam Indonesia; untuk praktiknya, ikuti bimbingan ulama dan kebiasaan masjid setempat.';

export const LABEL_CONTOH =
  'Contoh untuk pegangan khatib — sesuaikan dengan kondisi jamaah: kembangkan kerangka isinya dengan bahasa Anda sendiri, perhatikan waktu (khutbah dianjurkan ringkas), dan sesuaikan tema dengan kebutuhan jamaah setempat.';

// ── Rukun khutbah Jumat (mazhab Syafi'i) ────────────────────────
// waktu: pada khutbah mana rukun itu wajib dipenuhi.
export const RUKUN_KHUTBAH = [
  {
    judul: 'Hamdalah — memuji Allah',
    waktu: 'Pada kedua khutbah',
    isi: 'Mengucapkan pujian kepada Allah (mengandung lafaz \u201cal-hamdu lill\u0101h\u201d atau semaknanya) pada khutbah pertama maupun khutbah kedua.',
  },
  {
    judul: 'Shalawat atas Nabi \uFD3A',
    waktu: 'Pada kedua khutbah',
    isi: 'Mengucapkan shalawat kepada Rasulullah \uFD3A (mengandung lafaz shalawat, misalnya \u201call\u0101humma shalli \u2019al\u0101 Muhammad\u201d) pada kedua khutbah.',
  },
  {
    judul: 'Wasiat takwa',
    waktu: 'Pada kedua khutbah',
    isi: 'Berwasiat kepada jamaah (dan diri khatib) untuk bertakwa kepada Allah — ajakan taat dan menjauhi larangan-Nya — pada kedua khutbah.',
  },
  {
    judul: 'Membaca ayat Al-Qur\u2019an',
    waktu: 'Pada salah satu khutbah — lazimnya khutbah pertama',
    isi: 'Membaca sekurang-kurangnya satu ayat Al-Qur\u2019an yang berfaedah dan dipahami maknanya sebagai nasihat; dianjurkan ayat yang sejalan dengan tema khutbah.',
  },
  {
    judul: 'Doa untuk kaum mukminin',
    waktu: 'Khusus khutbah kedua',
    isi: 'Mendoakan kebaikan akhirat bagi kaum mukminin dan mukminat — memohonkan ampunan, rahmat, dan keselamatan bagi mereka.',
  },
];

export const SYARAT_KHUTBAH_SEKILAS = [
  'Disampaikan pada waktu Zuhur hari Jumat, SEBELUM sholat Jumat (berbeda dengan khutbah Id yang sesudah sholat).',
  'Khatib suci dari hadas dan najis, menutup aurat, dan menyampaikan khutbah dengan berdiri bila mampu.',
  'Duduk sejenak di antara dua khutbah (sekadar thuma\u2019ninah) sebelum melanjutkan khutbah kedua.',
  'Kedua khutbah dan rukun-rukunnya berkesinambungan (muwalah) — tidak diselingi jeda panjang atau kegiatan lain.',
  'Rukun khutbah diucapkan dalam Bahasa Arab bila khatib mampu; isi nasihat boleh dan baik disampaikan dengan bahasa yang dipahami jamaah.',
  'Suara dikeraskan sekadar terdengar oleh jamaah, disampaikan ringkas namun jelas — Nabi \uFD3A memanjangkan sholat dan memendekkan khutbah.',
];

// ── Contoh khutbah Jumat (tema: takwa & syukur) ─────────────────
// langkah arab = teks rukun yang diucapkan; kerangka = poin isi
// berbahasa Indonesia yang dikembangkan khatib sendiri.
export const CONTOH_JUMAT = {
  tema: 'Takwa & Syukur — Bekal Hidup yang Diberkahi',
  khutbahPertama: [
    {
      label: 'Pembuka: hamdalah & syahadat (rukun 1)',
      arab: 'الْحَمْدُ لِلَّهِ الَّذِي أَنْعَمَ عَلَيْنَا بِنِعْمَةِ الْإِيمَانِ وَالْإِسْلَامِ. أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      arti: 'Segala puji bagi Allah yang telah menganugerahkan kepada kita nikmat iman dan Islam. Aku bersaksi tidak ada tuhan selain Allah semata, tiada sekutu bagi-Nya, dan aku bersaksi Muhammad adalah hamba dan utusan-Nya.',
    },
    {
      label: 'Shalawat (rukun 2)',
      arab: 'اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِينَ',
      arti: 'Ya Allah, limpahkanlah shalawat, salam, dan keberkahan kepada Nabi kami Muhammad, beserta keluarga dan seluruh sahabatnya.',
    },
    {
      label: 'Wasiat takwa (rukun 3)',
      arab: 'أُوصِيكُمْ وَإِيَّايَ بِتَقْوَى اللَّهِ الْعَلِيِّ الْعَظِيمِ، فَقَدْ فَازَ الْمُتَّقُونَ',
      arti: 'Aku wasiatkan kepada kalian dan kepada diriku sendiri untuk bertakwa kepada Allah Yang Mahatinggi lagi Mahaagung — sungguh beruntunglah orang-orang yang bertakwa.',
    },
    {
      label: 'Ayat tema (rukun 4)',
      arab: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ وَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ',
      arti: '\u201cWahai orang-orang yang beriman, bertakwalah kepada Allah dengan sebenar-benar takwa kepada-Nya dan janganlah kamu mati kecuali dalam keadaan muslim.\u201d (QS. Ali \u2019Imran: 102)',
    },
    {
      label: 'Isi khutbah pertama (kerangka — kembangkan sendiri)',
      kerangka: [
        'Takwa adalah sebaik-baik bekal (QS. Al-Baqarah: 197): menjalankan perintah Allah dan menjauhi larangan-Nya, di keramaian maupun saat sendirian.',
        'Syukur adalah kunci bertambahnya nikmat (QS. Ibrahim: 7): syukur dengan hati (mengakui dari Allah), lisan (memuji & menyebut nikmat), dan perbuatan (memakai nikmat untuk taat).',
        'Contoh nyata pekan ini: jujur dalam berdagang dan bekerja, menjaga sholat lima waktu di awal waktu, berbakti kepada orang tua, dan tidak mengeluhkan rezeki yang halal.',
        'Penutup bagian pertama: siapa bertakwa, Allah beri jalan keluar dan rezeki dari arah tak terduga (QS. Ath-Thalaq: 2\u20133) — maka mari periksa kembali takwa dan syukur kita masing-masing.',
      ],
    },
  ],
  dudukAntara:
    'Khatib duduk sejenak di antara dua khutbah (jamaah dianjurkan beristighfar dan berdoa dalam hati), kemudian berdiri untuk khutbah kedua.',
  khutbahKedua: [
    {
      label: 'Hamdalah & shalawat ringkas (rukun 1 & 2)',
      arab: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى أَشْرَفِ الْأَنْبِيَاءِ وَالْمُرْسَلِينَ، نَبِيِّنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِينَ',
      arti: 'Segala puji bagi Allah, Rabb semesta alam. Shalawat dan salam atas nabi dan rasul termulia, Nabi kita Muhammad, beserta keluarga dan seluruh sahabatnya.',
    },
    {
      label: 'Wasiat takwa ringkas (rukun 3)',
      arab: 'اتَّقُوا اللَّهَ فِي السِّرِّ وَالْعَلَانِيَةِ، وَحَافِظُوا عَلَى الصَّلَوَاتِ الْخَمْسِ',
      arti: 'Bertakwalah kepada Allah saat sendirian maupun di hadapan orang banyak, dan jagalah sholat lima waktu.',
      kerangka: [
        'Khutbah kedua bersifat penegasan singkat: ingatkan kembali pokok khutbah pertama dalam satu-dua kalimat — takwa diuji justru setelah keluar dari masjid.',
      ],
    },
    {
      label: 'Doa untuk kaum mukminin (rukun 5)',
      arab: 'اللَّهُمَّ اغْفِرْ لِلْمُسْلِمِينَ وَالْمُسْلِمَاتِ، وَالْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ، الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ، إِنَّكَ سَمِيعٌ قَرِيبٌ مُجِيبُ الدَّعَوَاتِ. رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      arti: 'Ya Allah, ampunilah kaum muslimin dan muslimat, mukminin dan mukminat, yang masih hidup di antara mereka maupun yang telah wafat — sesungguhnya Engkau Maha Mendengar, Mahadekat, lagi Maha Mengabulkan doa. Ya Rabb kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    },
    {
      label: 'Penutup: perintah adil & iqamah',
      arab: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ وَيَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ وَالْبَغْيِ ۚ يَعِظُكُمْ لَعَلَّكُمْ تَذَكَّرُونَ',
      arti: '\u201cSesungguhnya Allah menyuruh (kamu) berlaku adil dan berbuat kebajikan, memberi bantuan kepada kerabat, dan Dia melarang perbuatan keji, kemungkaran, dan permusuhan. Dia memberi pengajaran kepadamu agar kamu dapat mengambil pelajaran.\u201d (QS. An-Nahl: 90)',
      kerangka: [
        'Setelah ayat penutup, khatib turun dan muadzin mengumandangkan iqamah — sholat Jumat segera ditegakkan.',
      ],
    },
  ],
};

// ── Contoh khutbah hari raya (ringkas) ───────────────────────────
// takbirJumlah: jumlah takbir pembuka berturut-turut menurut kebiasaan
// yang masyhur diajarkan (khutbah Id dibuka dengan takbir).
export const KHUTBAH_ID = [
  {
    id: 'fitri',
    nama: 'Khutbah Idul Fitri',
    takbirJumlah: '9 kali takbir berturut-turut di pembuka khutbah pertama, dan 7 kali di pembuka khutbah kedua (kebiasaan yang masyhur diajarkan; sebagian ulama tidak membatasi jumlahnya).',
    kerangka: [
      'Pembuka: takbir berulang, hamdalah, syahadat, dan shalawat — segala puji bagi Allah yang telah menyempurnakan puasa Ramadhan dan mengaruniakan hari kemenangan.',
      'Wasiat takwa: hari raya bukan akhir ibadah — nilai Ramadhan (puasa, tarawih, tilawah, sedekah) dijaga berlanjut setelahnya; tanda diterimanya amal adalah berlanjutnya ketaatan.',
      'Ayat/nasihat tema: Allah menghendaki kita menyempurnakan bilangan puasa dan mengagungkan-Nya atas petunjuk yang diberikan (QS. Al-Baqarah: 185).',
      'Ingatkan (bila khutbah sebelum pembayaran berakhir): zakat fitrah ditunaikan sebelum sholat Id, serta sunnah puasa enam hari Syawal setelahnya.',
      'Ajakan sosial: saling memaafkan, menyambung silaturahmi, mengunjungi orang tua dan kerabat, serta berbagi kegembiraan dengan fakir miskin agar mereka turut berbahagia.',
      'Khutbah kedua ringkas: takbir pembuka, hamdalah, shalawat, wasiat singkat, dan doa untuk kaum mukminin — ditutup doa keselamatan bagi negeri dan jamaah yang hadir.',
    ],
  },
  {
    id: 'adha',
    nama: 'Khutbah Idul Adha',
    takbirJumlah: '7 kali takbir berturut-turut di pembuka khutbah pertama, dan 5 kali di pembuka khutbah kedua (kebiasaan yang masyhur diajarkan; sebagian ulama tidak membatasi jumlahnya).',
    kerangka: [
      'Pembuka: takbir berulang (takbir hari raya), hamdalah, syahadat, dan shalawat — segala puji bagi Allah yang mensyariatkan kurban sebagai syiar-Nya.',
      'Wasiat takwa: sebaik-baik bekal menyambut hari-hari mulia Dzulhijjah adalah takwa; daging dan darah kurban tidak mencapai Allah, yang mencapai-Nya adalah takwa kita (QS. Al-Hajj: 37).',
      'Kisah tema: ketaatan Ibrahim dan Ismail \u2019alaihimassalam — teladan pengorbanan, kepatuhan kepada perintah Allah, dan keikhlasan keluarga dalam beribadah.',
      'Makna kurban: mendekatkan diri kepada Allah, melatih kepekaan sosial — dagingnya dibagikan kepada fakir miskin dan tetangga, bukan sekadar disimpan sendiri.',
      'Ingatkan amalan hari tasyrik (11\u201313 Dzulhijjah): hari makan, minum, dan dzikir kepada Allah; dilarang berpuasa, dan takbir dibaca setiap selesai sholat fardhu.',
      'Khutbah kedua ringkas: takbir pembuka, hamdalah, shalawat, wasiat singkat, dan doa untuk kaum mukminin, jamaah haji, serta keselamatan negeri — ditutup saling bermaafan.',
    ],
  },
];

export const TAKBIR_PEMBUKA = {
  arab: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ',
  latin: 'All\u0101hu akbar, All\u0101hu akbar, All\u0101hu akbar. L\u0101 il\u0101ha illall\u0101h, wall\u0101hu akbar. All\u0101hu akbar wa lill\u0101hil-hamd.',
  arti: 'Allah Maha Besar, Allah Maha Besar, Allah Maha Besar. Tiada tuhan selain Allah, dan Allah Maha Besar. Allah Maha Besar dan segala puji hanya bagi Allah.',
};
