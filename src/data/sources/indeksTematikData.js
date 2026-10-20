// Data statis Indeks Tematik Al-Qur'an (data layer).
// Kurasi topik kehidupan → ayat-ayat masyhur. Setiap referensi diverifikasi
// pada level surah:ayat (tema ayat memang sesuai topiknya); yang ditampilkan
// hanya referensi + ringkasan makna satu baris — teks & terjemahan lengkap
// dibaca di halaman surahnya (tautan /surah/:id?ayat=N didukung SurahPage).
// Struktur: [{ topik, ikon (kunci string, dipetakan di halaman), deskripsi,
// ayat: [{ surahId, surah (nama latin), ayat (nomor), makna }] }]
// Modul ini HANYA diimpor oleh IndeksTematikPage agar ikut chunk halamannya.

export const INDEKS_TEMATIK = [
  {
    topik: 'Sabar',
    ikon: 'sabar',
    deskripsi: 'Menahan diri dalam ketaatan, musibah, dan menghadapi manusia.',
    ayat: [
      { surahId: 2, surah: 'Al-Baqarah', ayat: 153, makna: 'Mintalah pertolongan dengan sabar dan sholat; Allah bersama orang yang sabar.' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 155, makna: 'Allah pasti menguji dengan rasa takut, lapar, dan kekurangan — kabar gembira bagi yang sabar.' },
      { surahId: 3, surah: 'Ali \u2018Imran', ayat: 200, makna: 'Perintah bersabar, menguatkan kesabaran, dan tetap siaga serta bertakwa.' },
      { surahId: 94, surah: 'Asy-Syarh', ayat: 6, makna: 'Sesungguhnya bersama kesulitan itu ada kemudahan.' },
    ],
  },
  {
    topik: 'Syukur',
    ikon: 'syukur',
    deskripsi: 'Mengakui nikmat berasal dari Allah dan menggunakannya dalam ketaatan.',
    ayat: [
      { surahId: 14, surah: 'Ibrahim', ayat: 7, makna: 'Jika kamu bersyukur, pasti Aku tambah (nikmatmu); jika kufur, azab-Ku sangat pedih.' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 152, makna: 'Ingatlah kepada-Ku, niscaya Aku ingat kepadamu; bersyukurlah dan jangan kufur.' },
      { surahId: 31, surah: 'Luqman', ayat: 12, makna: 'Luqman diberi hikmah: bersyukurlah kepada Allah, syukur itu untuk diri sendiri.' },
      { surahId: 46, surah: 'Al-Ahqaf', ayat: 15, makna: 'Doa agar diberi ilham mensyukuri nikmat Allah atas diri dan kedua orang tua.' },
    ],
  },
  {
    topik: 'Rezeki',
    ikon: 'rezeki',
    deskripsi: 'Jaminan rezeki dari Allah dan jalan menjemputnya dengan takwa & tawakal.',
    ayat: [
      { surahId: 65, surah: 'Ath-Thalaq', ayat: 3, makna: 'Allah memberi rezeki dari arah yang tidak disangka-sangka bagi yang bertawakal.' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 172, makna: 'Makanlah rezeki yang baik-baik yang Kami berikan dan bersyukurlah kepada Allah.' },
      { surahId: 51, surah: 'Adz-Dzariyat', ayat: 58, makna: 'Sesungguhnya Allah, Dialah Maha Pemberi Rezeki yang mempunyai kekuatan.' },
      { surahId: 11, surah: 'Hud', ayat: 6, makna: 'Tidak ada satu makhluk melata pun melainkan Allah yang memberi rezekinya.' },
    ],
  },
  {
    topik: 'Kesembuhan',
    ikon: 'sembuh',
    deskripsi: 'Al-Qur\u2019an sebagai syifa (penawar) dan keyakinan Allah Yang Menyembuhkan.',
    ayat: [
      { surahId: 26, surah: 'Asy-Syu\u2018ara', ayat: 80, makna: 'Ucapan Nabi Ibrahim: “Apabila aku sakit, Dialah yang menyembuhkanku.”' },
      { surahId: 10, surah: 'Yunus', ayat: 57, makna: 'Al-Qur\u2019an datang sebagai penawar bagi penyakit di dalam dada dan petunjuk serta rahmat.' },
      { surahId: 17, surah: 'Al-Isra', ayat: 82, makna: 'Kami turunkan dari Al-Qur\u2019an sesuatu yang menjadi penawar dan rahmat bagi orang beriman.' },
      { surahId: 41, surah: 'Fussilat', ayat: 44, makna: 'Katakanlah: Al-Qur\u2019an itu petunjuk dan penawar bagi orang-orang yang beriman.' },
    ],
  },
  {
    topik: 'Ketenangan Hati',
    ikon: 'tenang',
    deskripsi: 'Sakinah dan hati yang tenteram dengan mengingat Allah.',
    ayat: [
      { surahId: 13, surah: 'Ar-Ra\u2018d', ayat: 28, makna: 'Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.' },
      { surahId: 48, surah: 'Al-Fath', ayat: 4, makna: 'Dialah yang menurunkan ketenangan (sakinah) ke dalam hati orang-orang mukmin.' },
      { surahId: 94, surah: 'Asy-Syarh', ayat: 5, makna: 'Maka sesungguhnya bersama kesulitan ada kemudahan.' },
      { surahId: 94, surah: 'Asy-Syarh', ayat: 6, makna: 'Sesungguhnya bersama kesulitan itu ada kemudahan — penegasan yang menenangkan.' },
    ],
  },
  {
    topik: 'Ampunan Allah',
    ikon: 'ampun',
    deskripsi: 'Luasnya maghfirah Allah bagi hamba yang memohon ampun.',
    ayat: [
      { surahId: 39, surah: 'Az-Zumar', ayat: 53, makna: 'Jangan berputus asa dari rahmat Allah; Dia mengampuni dosa semuanya.' },
      { surahId: 4, surah: 'An-Nisa', ayat: 110, makna: 'Siapa berbuat jahat lalu memohon ampun, ia dapati Allah Maha Pengampun lagi Maha Penyayang.' },
      { surahId: 3, surah: 'Ali \u2018Imran', ayat: 135, makna: 'Orang bertakwa segera mengingat Allah dan memohon ampun atas dosa-dosanya.' },
      { surahId: 71, surah: 'Nuh', ayat: 10, makna: 'Seruan Nabi Nuh: mohonlah ampun kepada Rabbmu, Dia Maha Pengampun.' },
    ],
  },
  {
    topik: 'Berbakti pada Orang Tua',
    ikon: 'ortu',
    deskripsi: 'Birrul walidain: berkata lembut, merendahkan diri, dan mendoakan keduanya.',
    ayat: [
      { surahId: 17, surah: 'Al-Isra', ayat: 23, makna: 'Jangan berkata “ah” kepada keduanya dan jangan membentak; ucapkan perkataan yang mulia.' },
      { surahId: 17, surah: 'Al-Isra', ayat: 24, makna: 'Rendahkanlah dirimu dengan penuh kasih sayang dan doakan: “Sayangilah keduanya…”' },
      { surahId: 31, surah: 'Luqman', ayat: 14, makna: 'Wasiat berbuat baik kepada ibu-bapak; bersyukurlah kepada Allah dan kepada kedua orang tua.' },
      { surahId: 46, surah: 'Al-Ahqaf', ayat: 15, makna: 'Wasiat berbuat baik kepada kedua orang tua yang telah mengandung dan menyusui dengan susah payah.' },
    ],
  },
  {
    topik: 'Ujian & Musibah',
    ikon: 'ujian',
    deskripsi: 'Hakikat ujian kehidupan dan sikap orang beriman saat ditimpa musibah.',
    ayat: [
      { surahId: 2, surah: 'Al-Baqarah', ayat: 155, makna: 'Kami pasti menguji kamu dengan sedikit ketakutan, kelaparan, dan kekurangan harta, jiwa, dan buah-buahan.' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 156, makna: 'Yang apabila ditimpa musibah berkata: “Inna lillahi wa inna ilaihi raji\u2018un.”' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 157, makna: 'Mereka itulah yang mendapat ampunan, rahmat, dan petunjuk dari Rabb mereka.' },
      { surahId: 29, surah: 'Al-\u2018Ankabut', ayat: 2, makna: 'Apakah manusia mengira akan dibiarkan berkata “kami beriman” sedang mereka tidak diuji?' },
    ],
  },
  {
    topik: 'Kematian',
    ikon: 'mati',
    deskripsi: 'Kepastian kematian sebagai pengingat untuk berbekal amal.',
    ayat: [
      { surahId: 3, surah: 'Ali \u2018Imran', ayat: 185, makna: 'Setiap yang bernyawa akan merasakan mati; pahala disempurnakan pada hari Kiamat.' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 156, makna: 'Kalimat istirja\u2019: sesungguhnya kami milik Allah dan kepada-Nya kami kembali.' },
      { surahId: 29, surah: 'Al-\u2018Ankabut', ayat: 57, makna: 'Setiap yang bernyawa akan merasakan mati, kemudian hanya kepada Kami kamu dikembalikan.' },
      { surahId: 67, surah: 'Al-Mulk', ayat: 2, makna: 'Allah menciptakan mati dan hidup untuk menguji siapa yang paling baik amalnya.' },
    ],
  },
  {
    topik: 'Pernikahan & Keluarga',
    ikon: 'nikah',
    deskripsi: 'Sakinah, mawaddah, rahmah — fondasi rumah tangga dalam Al-Qur\u2019an.',
    ayat: [
      { surahId: 30, surah: 'Ar-Rum', ayat: 21, makna: 'Diciptakan pasangan agar kamu cenderung dan merasa tenteram; dijadikan mawaddah dan rahmah.' },
      { surahId: 4, surah: 'An-Nisa', ayat: 1, makna: 'Allah menciptakan manusia dari diri yang satu dan menciptakan pasangannya darinya.' },
      { surahId: 25, surah: 'Al-Furqan', ayat: 74, makna: 'Doa: anugerahkan pasangan dan keturunan sebagai penyejuk mata (qurrata a\u2019yun).' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 187, makna: 'Mereka (pasanganmu) adalah pakaian bagimu dan kamu pun pakaian bagi mereka.' },
    ],
  },
  {
    topik: 'Ilmu',
    ikon: 'ilmu',
    deskripsi: 'Kemuliaan ilmu dan perintah pertama: membaca.',
    ayat: [
      { surahId: 20, surah: 'Thaha', ayat: 114, makna: 'Doa Nabi: “Ya Rabbku, tambahkanlah ilmu kepadaku.”' },
      { surahId: 96, surah: 'Al-\u2018Alaq', ayat: 1, makna: 'Bacalah dengan (menyebut) nama Rabbmu yang menciptakan — wahyu pertama.' },
      { surahId: 96, surah: 'Al-\u2018Alaq', ayat: 5, makna: 'Dia mengajarkan manusia apa yang tidak diketahuinya.' },
      { surahId: 39, surah: 'Az-Zumar', ayat: 9, makna: 'Katakanlah: apakah sama orang-orang yang mengetahui dengan yang tidak mengetahui?' },
    ],
  },
  {
    topik: 'Sedekah & Infak',
    ikon: 'sedekah',
    deskripsi: 'Pelipatgandaan pahala dan adab berinfak di jalan Allah.',
    ayat: [
      { surahId: 2, surah: 'Al-Baqarah', ayat: 261, makna: 'Perumpamaan infak seperti sebutir benih yang menumbuhkan tujuh bulir, tiap bulir seratus biji.' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 274, makna: 'Yang berinfak malam dan siang, sembunyi dan terang, mendapat pahala di sisi Rabb mereka.' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 267, makna: 'Infakkanlah dari hasil usahamu yang baik-baik, jangan memilih yang buruk untuk diinfakkan.' },
      { surahId: 57, surah: 'Al-Hadid', ayat: 18, makna: 'Orang yang bersedekah laki-laki dan perempuan dilipatgandakan balasan baginya.' },
    ],
  },
  {
    topik: 'Doa',
    ikon: 'doa',
    deskripsi: 'Jaminan Allah mengabulkan doa dan kedekatan-Nya dengan yang berdoa.',
    ayat: [
      { surahId: 40, surah: 'Ghafir', ayat: 60, makna: 'Rabbmu berfirman: “Berdoalah kepada-Ku, niscaya Aku perkenankan bagimu.”' },
      { surahId: 2, surah: 'Al-Baqarah', ayat: 186, makna: 'Sesungguhnya Aku dekat; Aku kabulkan permohonan orang yang berdoa apabila ia berdoa kepada-Ku.' },
      { surahId: 7, surah: 'Al-A\u2018raf', ayat: 55, makna: 'Berdoalah kepada Rabbmu dengan berendah diri dan suara yang lembut.' },
      { surahId: 25, surah: 'Al-Furqan', ayat: 77, makna: 'Rabbku tidak akan mempedulikan kamu sekiranya bukan karena doamu.' },
    ],
  },
  {
    topik: 'Taubat',
    ikon: 'taubat',
    deskripsi: 'Pintu taubat yang selalu terbuka dan Allah yang Maha Penerima taubat.',
    ayat: [
      { surahId: 66, surah: 'At-Tahrim', ayat: 8, makna: 'Wahai orang beriman, bertaubatlah kepada Allah dengan taubat yang semurni-murninya (nasuha).' },
      { surahId: 39, surah: 'Az-Zumar', ayat: 53, makna: 'Jangan berputus asa dari rahmat Allah; Dia mengampuni dosa semuanya.' },
      { surahId: 9, surah: 'At-Taubah', ayat: 104, makna: 'Tidakkah mereka tahu bahwa Allah menerima taubat hamba-hamba-Nya dan menerima sedekah?' },
      { surahId: 25, surah: 'Al-Furqan', ayat: 70, makna: 'Yang bertaubat, beriman, dan beramal saleh — kejahatannya diganti Allah dengan kebajikan.' },
    ],
  },
];

// Total topik & ayat (untuk subjudul halaman).
export const TOTAL_TOPIK_TEMATIK = INDEKS_TEMATIK.length;
export const TOTAL_AYAT_TEMATIK = INDEKS_TEMATIK.reduce((n, t) => n + t.ayat.length, 0);
