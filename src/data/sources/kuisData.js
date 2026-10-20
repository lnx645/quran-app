// Dataset Kuis Islami (data layer, statis — tanpa jaringan).
// Ayat yang dipakai masyhur dan referensinya pasti; terjemahan mengikuti
// redaksi Kemenag. Bentuk soal seragam:
//   { teks, tanya, opsi: [4], benar: indeks opsi benar, ref }
// - SAMBUNG_AYAT: teks = potongan AWAL terjemahan, tanya meminta lanjutannya.
// - TEBAK_SURAH:  teks = cuplikan terjemahan, tanya meminta nama surahnya.
// - TAJWID_FIKIH: teks = pertanyaan, ref = rujukan konten panduan aplikasi.

export const KUIS_SAMBUNG_AYAT = [
  {
    teks: '“Hanya kepada Engkaulah kami menyembah …”',
    tanya: 'Pilih lanjutan terjemahan ayat yang benar.',
    opsi: [
      'dan hanya kepada Engkaulah kami memohon pertolongan',
      'dan Engkaulah yang memberi rezeki kepada kami',
      'dan kepada-Mulah kami kembali',
      'dan Engkaulah sebaik-baik penolong',
    ],
    benar: 0,
    ref: 'QS. Al-Fatihah: 5',
  },
  {
    teks: '“Allah, tidak ada tuhan selain Dia, Yang Mahahidup, Yang terus-menerus mengurus (makhluk-Nya). …”',
    tanya: 'Pilih lanjutan terjemahan Ayat Kursi yang benar.',
    opsi: [
      'Dia mengetahui apa yang telah mereka kerjakan',
      'Dia tidak dilanda oleh kantuk dan tidak (pula) oleh tidur',
      'Dia meliputi segala sesuatu dengan ilmu-Nya',
      'Dia tidak merasa berat memelihara keduanya',
    ],
    benar: 1,
    ref: 'QS. Al-Baqarah: 255',
  },
  {
    teks: '“Rasul (Muhammad) beriman pada apa (Al-Qur\u2019an) yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang mukmin. …”',
    tanya: 'Pilih lanjutan terjemahan ayat yang benar.',
    opsi: [
      'Mereka semuanya taat kepada perintah-Nya',
      'Mereka memohon ampun atas dosa-dosanya',
      'Semuanya beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya, dan rasul-rasul-Nya',
      'Mereka berkata: kami dengar dan kami taat',
    ],
    benar: 2,
    ref: 'QS. Al-Baqarah: 285',
  },
  {
    teks: '“Allah tidak membebani seseorang, kecuali menurut kesanggupannya. …”',
    tanya: 'Pilih lanjutan terjemahan ayat yang benar.',
    opsi: [
      'Ia mendapat (pahala) atas kebaikan yang dikerjakannya dan mendapat (siksa) atas kejahatan yang diperbuatnya',
      'Ia akan dihisab menurut amal perbuatannya',
      'Ia memohon ampunan kepada Tuhannya',
      'Ia tidak akan disiksa kecuali atas dosanya',
    ],
    benar: 0,
    ref: 'QS. Al-Baqarah: 286',
  },
  {
    teks: '“Maka, ingatlah kepada-Ku, Aku pun akan ingat kepadamu. …”',
    tanya: 'Pilih lanjutan terjemahan ayat yang benar.',
    opsi: [
      'Berdoalah kepada-Ku, niscaya Aku kabulkan',
      'Bersyukurlah kepada-Ku dan janganlah kamu ingkar kepada-Ku',
      'Bertakwalah kepada-Ku, wahai orang-orang yang berakal',
      'Bersabarlah kamu bersama orang-orang yang sabar',
    ],
    benar: 1,
    ref: 'QS. Al-Baqarah: 152',
  },
  {
    teks: '“Jika Allah menolong kamu, tidak ada yang dapat mengalahkanmu, …”',
    tanya: 'Pilih lanjutan terjemahan ayat yang benar.',
    opsi: [
      'maka bertawakallah kamu kepada-Nya',
      'maka janganlah kamu takut kepada mereka',
      'tetapi jika Allah membiarkanmu (tidak memberi pertolongan), siapa yang dapat menolongmu setelah itu?',
      'sesungguhnya Allah Maha Perkasa lagi Maha Bijaksana',
    ],
    benar: 2,
    ref: 'QS. Ali \u2018Imran: 160',
  },
  {
    teks: '“Katakanlah (Nabi Muhammad), \u2018Wahai hamba-hamba-Ku yang melampaui batas terhadap diri mereka sendiri! Janganlah berputus asa dari rahmat Allah. …\u2019”',
    tanya: 'Pilih lanjutan terjemahan ayat yang benar.',
    opsi: [
      'Sesungguhnya Allah mengampuni dosa-dosa semuanya. Sesungguhnya Dialah Yang Maha Pengampun lagi Maha Penyayang',
      'Sesungguhnya Allah menyukai orang-orang yang bertobat',
      'Sesungguhnya rahmat Allah sangat dekat kepada orang yang berbuat kebaikan',
      'Sesungguhnya Allah tidak mengampuni dosa syirik',
    ],
    benar: 0,
    ref: 'QS. Az-Zumar: 53',
  },
  {
    teks: '“Segala puji bagi Allah yang telah menurunkan Kitab (Al-Qur\u2019an) kepada hamba-Nya …”',
    tanya: 'Pilih lanjutan terjemahan ayat yang benar.',
    opsi: [
      'sebagai petunjuk bagi orang-orang yang bertakwa',
      'dan Dia tidak membuat padanya sedikit pun kebengkokan',
      'untuk menjadi peringatan bagi seluruh alam',
      'yang membenarkan kitab-kitab sebelumnya',
    ],
    benar: 1,
    ref: 'QS. Al-Kahf: 1',
  },
  {
    teks: '“Sesungguhnya jika kamu bersyukur, niscaya Aku akan menambah (nikmat) kepadamu, …”',
    tanya: 'Pilih lanjutan terjemahan ayat yang benar.',
    opsi: [
      'dan Aku akan melipatgandakan pahalamu',
      'tetapi jika kamu mengingkari (nikmat-Ku), maka sesungguhnya azab-Ku benar-benar sangat keras',
      'maka mintalah kepada-Ku, niscaya Aku beri',
      'dan janganlah kamu kufur kepada-Ku',
    ],
    benar: 1,
    ref: 'QS. Ibrahim: 7',
  },
  {
    teks: '“Barang siapa bertawakal kepada Allah, niscaya Allah akan mencukupkan (keperluan)nya. …”',
    tanya: 'Pilih lanjutan terjemahan ayat yang benar.',
    opsi: [
      'Sesungguhnya Allah melaksanakan urusan-Nya. Sungguh, Allah telah mengadakan ketentuan bagi setiap sesuatu',
      'Sesungguhnya Allah menyukai orang-orang yang bertawakal',
      'Allah akan memberinya rezeki dari arah yang tidak disangka-sangka',
      'Dan Allah Maha Mengetahui segala sesuatu',
    ],
    benar: 0,
    ref: 'QS. Ath-Thalaq: 3',
  },
  {
    teks: '“Katakanlah (Nabi Muhammad), \u2018Dialah Allah Yang Maha Esa.\u2019 …”',
    tanya: 'Pilih lanjutan (ayat berikutnya) yang benar.',
    opsi: [
      'Dia tidak beranak dan tidak pula diperanakkan',
      'Allah tempat meminta segala sesuatu',
      'Tidak ada sesuatu pun yang setara dengan-Nya',
      'Dialah yang menciptakan langit dan bumi',
    ],
    benar: 1,
    ref: 'QS. Al-Ikhlas: 1–2',
  },
  {
    teks: '“Sesungguhnya beserta kesulitan ada kemudahan. …” (diulang sebagai penegasan pada ayat berikutnya, lalu dilanjutkan perintah):',
    tanya: 'Pilih lanjutan setelah pengulangan ayat tersebut.',
    opsi: [
      'Maka, apabila engkau telah selesai (dari satu urusan), tetaplah bekerja keras (untuk urusan yang lain)',
      'Dan hanya kepada Tuhanmulah engkau berharap',
      'Maka bersabarlah kamu dengan kesabaran yang baik',
      'Sesungguhnya pertolongan Allah itu dekat',
    ],
    benar: 0,
    ref: 'QS. Asy-Syarh: 5–7',
  },
];

export const KUIS_TEBAK_SURAH = [
  {
    teks: '“Allah, tidak ada tuhan selain Dia, Yang Mahahidup, Yang terus-menerus mengurus (makhluk-Nya).”',
    tanya: 'Ayat masyhur ini (Ayat Kursi) terdapat dalam surah …',
    opsi: ['Al-Baqarah', 'Ali \u2018Imran', 'An-Nisa', 'Al-Ma\u2019idah'],
    benar: 0,
    ref: 'QS. Al-Baqarah: 255',
  },
  {
    teks: '“Maka, nikmat Tuhanmu yang manakah yang kamu dustakan?” (diulang 31 kali)',
    tanya: 'Ayat yang diulang-ulang ini adalah ciri khas surah …',
    opsi: ['Ya-Sin', 'Ar-Rahman', 'Al-Mulk', 'Al-Waqi\u2019ah'],
    benar: 1,
    ref: 'QS. Ar-Rahman: 13',
  },
  {
    teks: '“Segala puji bagi Allah, Tuhan semesta alam, Yang Maha Pengasih lagi Maha Penyayang …”',
    tanya: 'Cuplikan terjemahan ini adalah awal surah …',
    opsi: ['Al-Fatihah', 'Al-An\u2019am', 'Al-Kahf', 'Saba'],
    benar: 0,
    ref: 'QS. Al-Fatihah: 1–3',
  },
  {
    teks: '“Katakanlah (Nabi Muhammad), \u2018Dialah Allah Yang Maha Esa. Allah tempat meminta segala sesuatu.\u2019”',
    tanya: 'Cuplikan terjemahan ini adalah surah …',
    opsi: ['Al-Kafirun', 'An-Nashr', 'Al-Ikhlas', 'An-Nas'],
    benar: 2,
    ref: 'QS. Al-Ikhlas: 1–2',
  },
  {
    teks: '“Segala puji bagi Allah yang telah menurunkan Kitab (Al-Qur\u2019an) kepada hamba-Nya dan Dia tidak membuat padanya sedikit pun kebengkokan.”',
    tanya: 'Ayat pembuka ini adalah awal surah …',
    opsi: ['Maryam', 'Thaha', 'Al-Kahf', 'Al-Isra'],
    benar: 2,
    ref: 'QS. Al-Kahf: 1',
  },
  {
    teks: '“Yasin. Demi Al-Qur\u2019an yang penuh hikmah, sesungguhnya engkau (Nabi Muhammad) benar-benar salah seorang dari rasul-rasul (yang diutus).”',
    tanya: 'Cuplikan terjemahan ini adalah awal surah …',
    opsi: ['Ya-Sin', 'Ash-Shaffat', 'Shad', 'Az-Zumar'],
    benar: 0,
    ref: 'QS. Ya-Sin: 1–3',
  },
  {
    teks: '“Mahasuci Allah yang menguasai (segala) kerajaan, dan Dia Mahakuasa atas segala sesuatu.”',
    tanya: 'Ayat pembuka ini adalah awal surah …',
    opsi: ['Al-Furqan', 'Al-Mulk', 'Al-Qalam', 'Al-Haqqah'],
    benar: 1,
    ref: 'QS. Al-Mulk: 1',
  },
  {
    teks: '“Demi waktu duha (ketika matahari naik sepenggalah) dan demi malam apabila telah sunyi.”',
    tanya: 'Cuplikan terjemahan ini adalah awal surah …',
    opsi: ['Asy-Syams', 'Al-Lail', 'Ad-Dhuha', 'Al-Fajr'],
    benar: 2,
    ref: 'QS. Ad-Dhuha: 1–2',
  },
  {
    teks: '“Sesungguhnya Kami menurunkannya (Al-Qur\u2019an) pada malam qadar. Tahukah kamu apakah malam qadar itu?”',
    tanya: 'Cuplikan terjemahan ini adalah awal surah …',
    opsi: ['Al-Qadr', 'Al-Bayyinah', 'Al-\u2019Alaq', 'Ad-Dukhan'],
    benar: 0,
    ref: 'QS. Al-Qadr: 1–2',
  },
  {
    teks: '“Tidakkah engkau (Nabi Muhammad) memperhatikan bagaimana Tuhanmu telah bertindak terhadap pasukan bergajah?”',
    tanya: 'Cuplikan terjemahan ini adalah awal surah …',
    opsi: ['Quraisy', 'Al-Fil', 'Al-Humazah', 'Al-Kautsar'],
    benar: 1,
    ref: 'QS. Al-Fil: 1',
  },
  {
    teks: '“Sesungguhnya Kami telah memberimu (Nabi Muhammad) nikmat yang banyak. Maka, laksanakanlah sholat karena Tuhanmu dan berkurbanlah.”',
    tanya: 'Cuplikan terjemahan ini adalah surah terpendek, yaitu …',
    opsi: ['Al-\u2019Ashr', 'An-Nashr', 'Al-Kautsar', 'Al-Ikhlas'],
    benar: 2,
    ref: 'QS. Al-Kautsar: 1–2',
  },
  {
    teks: '“Apabila telah datang pertolongan Allah dan kemenangan, dan engkau melihat manusia berbondong-bondong masuk agama Allah …”',
    tanya: 'Cuplikan terjemahan ini adalah awal surah …',
    opsi: ['An-Nashr', 'Al-Fath', 'Al-Kafirun', 'Al-Lahab'],
    benar: 0,
    ref: 'QS. An-Nashr: 1–2',
  },
];

export const KUIS_TAJWID_FIKIH = [
  {
    teks: 'Nun sukun atau tanwin bertemu huruf ba (ب), hukum bacaannya adalah …',
    tanya: 'Pilih jawaban tajwid yang benar.',
    opsi: ['Idzhar halqi', 'Iqlab', 'Idgham bighunnah', 'Ikhfa haqiqi'],
    benar: 1,
    ref: 'Panduan Tajwid — hukum nun sukun & tanwin',
  },
  {
    teks: 'Nun sukun atau tanwin bertemu huruf ta (ت), hukum bacaannya adalah …',
    tanya: 'Pilih jawaban tajwid yang benar.',
    opsi: ['Iqlab', 'Idgham bilaghunnah', 'Ikhfa haqiqi (samar dengan dengung)', 'Idzhar syafawi'],
    benar: 2,
    ref: 'Panduan Tajwid — hukum nun sukun & tanwin',
  },
  {
    teks: 'Huruf-huruf qalqalah terkumpul pada lafal “quthbu jadin”, yaitu …',
    tanya: 'Pilih jawaban tajwid yang benar.',
    opsi: ['Qaf, tha, ba, jim, dal', 'Qaf, fa, ba, jim, sin', 'Kaf, tha, ba, ha, dal', 'Qaf, tha, mim, jim, dal'],
    benar: 0,
    ref: 'Panduan Tajwid — qalqalah',
  },
  {
    teks: 'Mad thabi\u2019i (mad asli) dibaca panjang sebanyak …',
    tanya: 'Pilih jawaban tajwid yang benar.',
    opsi: ['1 harakat', '2 harakat', '4 harakat', '6 harakat'],
    benar: 1,
    ref: 'Panduan Tajwid — mad',
  },
  {
    teks: 'Mad wajib muttashil terjadi apabila …',
    tanya: 'Pilih jawaban tajwid yang benar.',
    opsi: [
      'Huruf mad bertemu sukun pada kata berikutnya',
      'Huruf mad bertemu hamzah dalam satu kata',
      'Huruf mad bertemu tasydid',
      'Huruf mad berada di akhir ayat',
    ],
    benar: 1,
    ref: 'Panduan Tajwid — mad',
  },
  {
    teks: 'Mim sukun bertemu huruf mim (berharakat), hukum bacaannya adalah …',
    tanya: 'Pilih jawaban tajwid yang benar.',
    opsi: ['Idzhar syafawi', 'Ikhfa syafawi', 'Idgham mimi (idgham mitslain) dengan dengung', 'Iqlab'],
    benar: 2,
    ref: 'Panduan Tajwid — hukum mim sukun',
  },
  {
    teks: 'Rukun wudhu yang pertama menurut urutan fikih adalah …',
    tanya: 'Pilih jawaban fikih yang benar.',
    opsi: ['Membasuh wajah', 'Niat', 'Mengusap kepala', 'Tertib (berurutan)'],
    benar: 1,
    ref: 'Panduan Wudhu — rukun wudhu',
  },
  {
    teks: 'Berikut ini yang MEMBATALKAN wudhu adalah …',
    tanya: 'Pilih jawaban fikih yang benar.',
    opsi: [
      'Makan dan minum',
      'Berkumur-kumur',
      'Sesuatu yang keluar dari dua jalan (qubul dan dubur)',
      'Berbicara saat berwudhu',
    ],
    benar: 2,
    ref: 'Panduan Wudhu — pembatal wudhu',
  },
  {
    teks: 'Anggota tubuh yang diusap (bukan dibasuh) dalam wudhu adalah …',
    tanya: 'Pilih jawaban fikih yang benar.',
    opsi: ['Wajah', 'Kepala', 'Kedua tangan sampai siku', 'Kedua kaki sampai mata kaki'],
    benar: 1,
    ref: 'Panduan Wudhu — rukun wudhu',
  },
  {
    teks: 'Jumlah rakaat sholat Maghrib adalah …',
    tanya: 'Pilih jawaban fikih yang benar.',
    opsi: ['2 rakaat', '3 rakaat', '4 rakaat', '5 rakaat'],
    benar: 1,
    ref: 'Panduan Sholat — sholat fardhu',
  },
  {
    teks: 'Tayamum sebagai pengganti wudhu dilakukan dengan menggunakan …',
    tanya: 'Pilih jawaban fikih yang benar.',
    opsi: ['Air yang sedikit', 'Debu/tanah yang suci', 'Batu yang licin', 'Pasir pantai yang basah'],
    benar: 1,
    ref: 'Panduan Bersuci — tayamum',
  },
  {
    teks: 'Berikut ini yang MEMBATALKAN puasa adalah …',
    tanya: 'Pilih jawaban fikih yang benar.',
    opsi: [
      'Mandi di siang hari',
      'Mencicipi ujung sendok lalu membuangnya tanpa menelan',
      'Makan dan minum dengan sengaja',
      'Tidur sepanjang hari',
    ],
    benar: 2,
    ref: 'Panduan Puasa — pembatal puasa',
  },
  {
    teks: 'Air yang suci pada dirinya dan dapat dipakai menyucikan (untuk wudhu/mandi wajib) disebut …',
    tanya: 'Pilih jawaban fikih yang benar.',
    opsi: ['Air musta\u2019mal', 'Air mutlak', 'Air musyammas', 'Air ma\u2019in'],
    benar: 1,
    ref: 'Panduan Bersuci — pembagian air',
  },
];

export const MODE_KUIS = [
  { kunci: 'sambung', nama: 'Sambung Ayat', soal: KUIS_SAMBUNG_AYAT },
  { kunci: 'tebak', nama: 'Tebak Surah', soal: KUIS_TEBAK_SURAH },
  { kunci: 'tajwid', nama: 'Tajwid & Fikih', soal: KUIS_TAJWID_FIKIH },
];
