// Data statis Sirah Nabawiyah (data layer): garis waktu ringkas perjalanan
// hidup Nabi Muhammad ﷺ dalam tiga fase. Ringkasan ditulis orisinal untuk
// keperluan edukasi, berdasarkan peristiwa yang disepakati secara umum
// dalam kitab-kitab sirah; tahun bersifat perkiraan yang masyhur.
// Modul ini HANYA diimpor oleh SirahPage agar ikut chunk halamannya.
//
// Struktur: { fase: string[], peristiwa: [{ fase, tahun, judul, ringkasan }] }
export const FASE_SIRAH = ['Pra-Kenabian', 'Makkah', 'Madinah'];

export const SIRAH_PERISTIWA = [
  // ===== Pra-Kenabian =====
  {
    fase: 'Pra-Kenabian',
    tahun: '±570 M — Tahun Gajah',
    judul: 'Kelahiran Nabi Muhammad ﷺ',
    ringkasan:
      'Nabi Muhammad ﷺ lahir di Makkah pada Tahun Gajah, tahun ketika pasukan bergajah dari Yaman yang hendak menghancurkan Ka’bah digagalkan oleh Allah. Ayahnya, Abdullah, telah wafat sebelum beliau lahir, sehingga beliau terlahir sebagai yatim dan diasuh oleh ibunya, Aminah.',
  },
  {
    fase: 'Pra-Kenabian',
    tahun: '±570–575 M',
    judul: 'Masa Kecil di Pengasuhan Halimah',
    ringkasan:
      'Sesuai kebiasaan bangsawan Arab, bayi Muhammad disusui dan dibesarkan di perkampungan Bani Sa’ad oleh Halimah As-Sa’diyah. Di lingkungan pedesaan yang udaranya bersih, beliau tumbuh sehat dan fasih berbahasa Arab, lalu dikembalikan kepada ibunya di Makkah.',
  },
  {
    fase: 'Pra-Kenabian',
    tahun: '±576–578 M',
    judul: 'Wafatnya Ibu dan Kakek',
    ringkasan:
      'Pada usia sekitar enam tahun, ibunya Aminah wafat di Abwa’ dalam perjalanan pulang dari Madinah. Beliau kemudian diasuh kakeknya, Abdul Muthalib, dan setelah sang kakek wafat dua tahun kemudian, pengasuhan beralih kepada pamannya, Abu Thalib.',
  },
  {
    fase: 'Pra-Kenabian',
    tahun: '±582 M',
    judul: 'Perjalanan Dagang ke Syam',
    ringkasan:
      'Menginjak remaja, beliau ikut kafilah dagang pamannya menuju Syam. Dalam perjalanan itu beliau mulai mengenal dunia perniagaan, dan kejujuran serta amanahnya dalam berdagang kelak membuat beliau dikenal luas dengan julukan Al-Amin, yang terpercaya.',
  },
  {
    fase: 'Pra-Kenabian',
    tahun: '±595 M',
    judul: 'Menikah dengan Khadijah',
    ringkasan:
      'Khadijah binti Khuwailid, saudagar Makkah yang mulia, mempercayakan dagangannya kepada Muhammad karena kejujurannya. Setelah perniagaan itu berhasil dengan baik, Khadijah melamarnya, dan keduanya menikah ketika beliau berusia sekitar 25 tahun; Khadijah menjadi pendamping dan pendukung utama beliau.',
  },

  // ===== Makkah =====
  {
    fase: 'Makkah',
    tahun: '610 M — Awal Kenabian',
    judul: 'Wahyu Pertama di Gua Hira',
    ringkasan:
      'Pada usia 40 tahun, saat menyendiri (bertahannuts) di Gua Hira, beliau menerima wahyu pertama melalui Malaikat Jibril, yaitu lima ayat awal surah Al-‘Alaq yang diawali perintah “Iqra’” (bacalah). Peristiwa ini menandai pengangkatan beliau sebagai nabi dan rasul.',
  },
  {
    fase: 'Makkah',
    tahun: '610–613 M',
    judul: 'Dakwah Sembunyi-sembunyi',
    ringkasan:
      'Pada masa awal, dakwah disampaikan secara terbatas kepada orang-orang terdekat. Khadijah menjadi orang pertama yang beriman, disusul Abu Bakar, Ali bin Abi Thalib, dan sejumlah sahabat awal yang kemudian dikenal sebagai As-Sabiqunal Awwalun.',
  },
  {
    fase: 'Makkah',
    tahun: '±613 M',
    judul: 'Dakwah Terang-terangan',
    ringkasan:
      'Setelah turun perintah untuk berdakwah secara terbuka, beliau menyeru penduduk Makkah menyembah Allah semata dan meninggalkan berhala. Seruan ini ditolak keras oleh para pembesar Quraisy, dan para pengikut beliau mulai mengalami tekanan dan intimidasi.',
  },
  {
    fase: 'Makkah',
    tahun: '615 M',
    judul: 'Hijrah ke Habasyah',
    ringkasan:
      'Karena tekanan Quraisy semakin berat, sekelompok Muslimin berhijrah ke Habasyah (Ethiopia) yang dipimpin raja yang adil, Najasyi. Hijrah ini dilakukan dua gelombang, dan kaum Muslimin memperoleh perlindungan serta kebebasan beribadah di sana.',
  },
  {
    fase: 'Makkah',
    tahun: '±619 M',
    judul: 'Tahun Kesedihan',
    ringkasan:
      'Pada tahun kesepuluh kenabian, paman beliau Abu Thalib dan istrinya Khadijah wafat dalam waktu berdekatan. Tahun ini dikenang sebagai ‘Amul Huzn (Tahun Kesedihan) karena beliau kehilangan dua penopang utama dakwah, sementara gangguan Quraisy justru bertambah berat.',
  },
  {
    fase: 'Makkah',
    tahun: '±620 M',
    judul: 'Isra’ Mi’raj',
    ringkasan:
      'Dalam satu malam, Nabi ﷺ diperjalankan dari Masjidil Haram ke Masjidil Aqsha (Isra’), kemudian naik ke langit (Mi’raj). Pada peristiwa inilah kewajiban shalat lima waktu ditetapkan, menjadi penguat bagi beliau setelah masa-masa sulit di Makkah dan Thaif.',
  },
  {
    fase: 'Makkah',
    tahun: '621–622 M',
    judul: 'Baiat Aqabah',
    ringkasan:
      'Sejumlah penduduk Yatsrib (Madinah) dari suku Aus dan Khazraj menemui Nabi ﷺ di Aqabah dan berbaiat untuk beriman serta melindungi beliau. Baiat pertama dan kedua ini membuka jalan bagi hijrah kaum Muslimin ke Madinah.',
  },

  // ===== Madinah =====
  {
    fase: 'Madinah',
    tahun: '622 M — 1 H',
    judul: 'Hijrah & Pembangunan Masjid',
    ringkasan:
      'Nabi ﷺ berhijrah ke Madinah dan disambut penduduk dengan penuh sukacita. Di sana beliau membangun Masjid Nabawi sebagai pusat ibadah dan masyarakat, serta mempersaudarakan kaum Muhajirin dan Anshar sebagai fondasi masyarakat Madinah.',
  },
  {
    fase: 'Madinah',
    tahun: '2 H — 624 M',
    judul: 'Perang Badar',
    ringkasan:
      'Pertempuran besar pertama antara kaum Muslimin dan Quraisy terjadi di Badar pada bulan Ramadhan. Kaum Muslimin yang berjumlah jauh lebih sedikit memperoleh kemenangan, dan peristiwa ini menjadi tonggak penting yang mengokohkan kedudukan mereka di Madinah.',
  },
  {
    fase: 'Madinah',
    tahun: '3 H — 625 M',
    judul: 'Perang Uhud',
    ringkasan:
      'Setahun setelah Badar, Quraisy kembali menyerang Madinah dan pertempuran berkecamuk di kaki Gunung Uhud. Kaum Muslimin sempat terdesak akibat sebagian pasukan pemanah meninggalkan posnya; peristiwa ini menjadi pelajaran besar tentang ketaatan kepada perintah Rasulullah ﷺ.',
  },
  {
    fase: 'Madinah',
    tahun: '5 H — 627 M',
    judul: 'Perang Khandaq',
    ringkasan:
      'Menghadapi pasukan gabungan yang mengepung Madinah, kaum Muslimin menggali parit (khandaq) di sisi utara kota atas usul Salman Al-Farisi. Pengepungan berakhir tanpa pertempuran besar setelah pasukan gabungan mundur, di antaranya karena cuaca buruk dan perpecahan di pihak penyerang.',
  },
  {
    fase: 'Madinah',
    tahun: '6 H — 628 M',
    judul: 'Perjanjian Hudaibiyah',
    ringkasan:
      'Ketika kaum Muslimin bermaksud menunaikan umrah, Quraisy menghalangi mereka di Hudaibiyah hingga tercapai perjanjian gencatan senjata. Sebagian sahabat awalnya berat menerima isinya, namun perjanjian ini membuka ruang dakwah yang luas dan disebut Allah sebagai “kemenangan yang nyata”.',
  },
  {
    fase: 'Madinah',
    tahun: '8 H — 630 M',
    judul: 'Fathu Makkah',
    ringkasan:
      'Setelah perjanjian dilanggar pihak Quraisy, Nabi ﷺ berangkat ke Makkah dengan pasukan besar dan kota itu dibuka tanpa pertumpahan darah yang berarti. Beliau memberikan pengampunan umum kepada penduduk Makkah, menghancurkan berhala di sekitar Ka’bah, dan mengembalikan Makkah sebagai kota tauhid.',
  },
  {
    fase: 'Madinah',
    tahun: '10–11 H — 632 M',
    judul: 'Haji Wada’ & Wafatnya Nabi ﷺ',
    ringkasan:
      'Pada tahun 10 H beliau menunaikan Haji Wada’ (haji perpisahan) dan menyampaikan khutbah yang menekankan kesucian jiwa dan harta, persamaan manusia, serta amanat berpegang pada Al-Qur’an dan sunnah. Tak lama setelah kembali ke Madinah, beliau wafat pada tahun 11 H setelah mengalami sakit.',
  },
];
