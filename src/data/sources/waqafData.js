// Data panduan tanda waqaf & ibtida' (data layer) — tanda-tanda berhenti
// pada mushaf Madinah (Mushaf al-Madinah an-Nabawiyyah), ditulis ringkas
// untuk pemula. Di mushaf cetak tanda-tanda ini tercetak KECIL di atas
// baris ayat; di panduan ini glifnya diperbesar agar mudah dikenali.
// Contoh ayat hanya dicantumkan bila referensinya pasti; tanda tanpa
// contoh berarti penjelasannya sengaja tidak diikat ke satu ayat tertentu
// karena tanda yang sama muncul di sangat banyak tempat.

/**
 * Daftar tanda waqaf mushaf Madinah.
 * - `glif`: tanda sebagaimana dikenal pembaca (di mushaf tercetak kecil
 *   di atas kata, sebagian dalam bentuk kecilnya: mis. lazim ۘ, saktah ۜ,
 *   mu'anaqah ۛ).
 * - `hukum`: ringkasan hukum/arti tanda.
 * - `isi`: penjelasan singkat cara mengamalkannya.
 * - `contohArab`/`contohRef`/`contohKeterangan`: opsional, hanya diisi
 *   bila contoh dan referensinya terverifikasi.
 */
export const TANDA_WAQAF = [
  {
    glif: 'م',
    nama: 'Waqaf Lazim',
    hukum: 'Harus berhenti',
    isi: 'Berhenti di tanda ini wajib. Kalimat sesudahnya berkaitan dengan kalimat sebelumnya dengan cara yang — bila bacaan diteruskan tanpa berhenti — dapat merusak atau membalik makna. Ambil napas di sini, lalu lanjutkan dari kata sesudahnya.',
    contohArab: 'إِنَّمَا يَسْتَجِيبُ الَّذِينَ يَسْمَعُونَ ۘ وَالْمَوْتَىٰ يَبْعَثُهُمُ اللَّهُ',
    contohRef: 'QS. Al-An‘am [6]: 36',
    contohKeterangan:
      'Harus berhenti setelah “yasma‘uun”: yang menyambut seruan hanyalah orang hidup yang mendengar. Kata sesudahnya memulai kalimat baru — “dan orang-orang mati, Allah akan membangkitkan mereka”. Bila disambung tanpa berhenti, dua kalimat ini bisa terbaca menyatu dan maknanya rusak.',
  },
  {
    glif: 'ط',
    nama: 'Waqaf Mutlaq',
    hukum: 'Berhenti lebih utama',
    isi: 'Kalimat sebelum tanda ini sudah sempurna dan kalimat sesudahnya memulai pembahasan yang relatif baru. Berhenti di sini lebih utama daripada menyambung, meskipun menyambung tidak sampai merusak makna.',
    contohArab: null,
    contohRef: null,
    contohKeterangan: null,
  },
  {
    glif: 'ج',
    nama: 'Waqaf Jaiz',
    hukum: 'Boleh berhenti, boleh terus',
    isi: 'Kedua pilihan sama-sama dibolehkan: berhenti di sini sah karena makna kalimatnya sudah cukup utuh, dan meneruskan bacaan pun sah karena kaitannya dengan kalimat sesudahnya masih baik. Pilih sesuai napas dan kelancaran bacaan.',
    contohArab: null,
    contohRef: null,
    contohKeterangan: null,
  },
  {
    glif: 'ص',
    nama: 'Waqaf Murakhkhash',
    hukum: 'Boleh berhenti karena napas / ayat panjang',
    isi: 'Diberi keringanan (rukhshah) untuk berhenti di sini karena ayatnya panjang atau napas tidak sampai, padahal kalimatnya belum sepenuhnya sempurna. Bila berhenti di tanda ini, lanjutkan dengan ibtida’ yang benar — ulangi dari kata yang maknanya utuh (lihat bagian Ibtida’ di bawah).',
    contohArab: null,
    contohRef: null,
    contohKeterangan: null,
  },
  {
    glif: 'قلى',
    nama: 'Qila ‘Alaihil-Waqf (Qali)',
    hukum: 'Berhenti lebih utama',
    isi: 'Dibaca “qali”: menurut sebagian ulama waqaf, berhenti di tempat ini lebih utama daripada menyambung. Kalimatnya sudah utuh untuk berhenti, dan berhenti memberi jeda makna yang lebih jelas.',
    contohArab: null,
    contohRef: null,
    contohKeterangan: null,
  },
  {
    glif: 'صلى',
    nama: 'Qila ‘Alaihil-Washl (Shali)',
    hukum: 'Terus lebih utama',
    isi: 'Pasangan kebalikan dari “qali”: menyambung bacaan (washal) ke kata sesudahnya lebih utama daripada berhenti, karena kaitan maknanya masih erat. Berhenti tetap tidak dilarang bila napas memang tidak sampai — lanjutkan dengan mengulang dari kata yang tepat.',
    contohArab: null,
    contohRef: null,
    contohKeterangan: null,
  },
  {
    glif: 'لا',
    nama: 'La Waqfa ‘Alaih',
    hukum: 'Jangan berhenti',
    isi: 'Dilarang berhenti di tanda ini: kalimatnya masih sangat bergantung pada kata sesudahnya, sehingga berhenti di sini menggantungkan atau merusak makna. Bila terpaksa berhenti karena kehabisan napas, jangan memulai lagi dari titik ini — ulangi dari kata atau frasa sebelumnya agar makna tersambung utuh.',
    contohArab: null,
    contohRef: null,
    contohKeterangan: null,
  },
  {
    glif: 'ك',
    nama: 'Kaf — seperti sebelumnya',
    hukum: 'Hukumnya seperti tanda sebelumnya',
    isi: 'Tanda “kaf” (singkatan dari kadzalik, “demikian pula”) berarti hukum berhenti di tempat ini sama dengan hukum tanda waqaf yang mendahuluinya pada ayat atau rangkaian yang sama. Lihat kembali tanda sebelumnya, lalu amalkan hukum yang sama.',
    contohArab: null,
    contohRef: null,
    contohKeterangan: null,
  },
  {
    glif: 'س',
    nama: 'Saktah',
    hukum: 'Berhenti sejenak tanpa napas',
    isi: 'Saktah adalah berhenti sebentar — kira-kira dua harakat — TANPA mengambil napas, lalu bacaan langsung dilanjutkan. Di mushaf tanda ini tertulis sebagai huruf sin kecil (سكتة, dalam cetakan tampil kecil di atas kata). Dalam riwayat Hafs ada empat tempat saktah yang masyhur: Al-Kahf [18]: 1, Yasin [36]: 52, Al-Qiyamah [75]: 27, dan Al-Mutaffifin [83]: 14.',
    contohArab: 'وَلَمْ يَجْعَل لَّهُۥ عِوَجَا ۜ قَيِّمًا',
    contohRef: 'QS. Al-Kahf [18]: 1–2',
    contohKeterangan:
      'Berhenti sejenak setelah “‘iwajaa” tanpa mengambil napas, lalu lanjutkan “qayyimaa”. Jeda singkat ini menegaskan bahwa sifat “lurus” (qayyiman) tidak termasuk yang dinafikan.',
  },
  {
    glif: 'ۛ',
    nama: 'Mu‘anaqah (Ta‘anuq)',
    hukum: 'Berhenti di salah satu saja',
    isi: 'Tiga titik berpasangan yang muncul di dua tempat yang berdekatan dalam satu ayat. Berhentilah di SALAH SATU dari keduanya — tidak di kedua-duanya. Bila sudah berhenti di tanda pertama, tanda kedua harus diteruskan tanpa berhenti; bila yang pertama diteruskan, berhentilah di tanda kedua.',
    contohArab: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ',
    contohRef: 'QS. Al-Baqarah [2]: 2',
    contohKeterangan:
      'Tanda ۛ muncul setelah “laa raiba” dan setelah “fiihi”. Pilih satu: berhenti setelah “laa raiba” lalu teruskan “fiihi” tanpa berhenti, atau teruskan “laa raiba fiihi” lalu berhenti setelah “fiihi” — jangan berhenti di keduanya.',
  },
  {
    glif: '۩',
    nama: 'Ayat Sajdah (Sujud Tilawah)',
    hukum: 'Disunnahkan sujud tilawah',
    isi: 'Tanda ini menandai akhir ayat sajdah. Pembaca yang melewatinya disunnahkan melakukan sujud tilawah satu kali (di luar sholat; ketentuan di dalam sholat mengikuti panduan sujud tilawah). Di NurQalam, ayat-ayat sajdah sudah ditandai di halaman baca dan panduan sujud tilawah tersedia di halaman Sujud — setelah sujud, lanjutkan bacaan dari kata sesudah tanda ini.',
    contohArab: 'خَرُّوا سُجَّدًا وَسَبَّحُوا بِحَمْدِ رَبِّهِمْ وَهُمْ لَا يَسْتَكْبِرُونَ ۩',
    contohRef: 'QS. As-Sajdah [32]: 15',
    contohKeterangan:
      'Salah satu dari 14 ayat sajdah menurut jumhur ulama. Sujud tilawah dilakukan setelah membaca ayat ini sampai tanda ۩.',
  },
];

/** Panduan ibtida': cara memulai lagi bacaan setelah berhenti. */
export const PANDUAN_IBTIDA = [
  {
    nama: 'Pengertian Ibtida’',
    isi: 'Ibtida’ adalah memulai bacaan — baik dari awal bacaan maupun memulai lagi setelah berhenti (waqaf). Ibtida’ hanya sah dari kata yang maknanya utuh dan tidak menggantung: jangan memulai dari kata yang masih bergantung penuh pada kata sebelumnya, karena makna ayat bisa berubah.',
  },
  {
    nama: 'Bila waqafnya sempurna (tamm / kafi)',
    isi: 'Bila berhenti di akhir ayat, di tanda lazim (م), mutlaq (ط), atau tempat lain yang kalimatnya sudah sempurna, bacaan boleh dimulai langsung dari kata tepat sesudah tempat berhenti itu — tidak perlu mengulang kata sebelumnya.',
  },
  {
    nama: 'Bila berhenti di tengah kalimat',
    isi: 'Bila berhenti karena kehabisan napas, di tanda murakhkhash (ص), atau terpaksa di tempat bertanda لا, memulai lagi TIDAK dari titik berhenti itu. Kembalilah satu-dua kata (atau ke awal frasa) sebelum titik berhenti, lalu baca ulang dengan menyambungkannya ke kata sesudahnya sampai makna terangkai utuh.',
  },
  {
    nama: 'Hamzah wasal saat memulai',
    isi: 'Bila kata tempat memulai diawali hamzah wasal, hamzah itu DIBACA saat ibtida’ — berbeda dengan saat disambung (washal) yang hamzahnya gugur. Contoh paling sering: memulai dari “ٱقْرَأْ” dibaca “iqra’”, dan lafaz “al-” pada kata berawalan ال hamzah wasalnya dibaca fathah. Perhatikan harakat hamzah wasal yang tercetak di mushaf.',
  },
  {
    nama: 'Setelah saktah & setelah sujud tilawah',
    isi: 'Setelah saktah tidak ada ibtida’ baru: bacaan langsung dilanjutkan tanpa napas dan tanpa mengulang kata. Setelah sujud tilawah, bangkitlah dengan tenang lalu lanjutkan dari kata atau ayat sesudah ayat sajdah yang baru dibaca.',
  },
];

/** Waqaf pada akhir ayat — ketentuan khusus berhenti di penutup ayat. */
export const WAQAF_AKHIR_AYAT = [
  {
    nama: 'Berhenti di akhir ayat adalah asal yang dianjurkan',
    isi: 'Berhenti pada akhir setiap ayat mengikuti cara baca Nabi ﷺ yang berhenti di akhir ayat. Karena itu berhenti di akhir ayat pada umumnya bernilai waqaf tamm atau kafi — kalimatnya utuh — sekalipun ayat berikutnya masih berkaitan temanya. Menyambung (washal) ke ayat berikutnya tetap dibolehkan selama makna tidak rusak dan bukan di tempat yang diharuskan berhenti.',
  },
  {
    nama: 'Sukunkan huruf terakhir',
    isi: 'Saat berhenti, huruf terakhir ayat dibaca sukun: harakat dammah dan kasrah serta tanwinnya hilang. Tanwin fathah diganti alif dan dibaca panjang dua harakat. Huruf ta marbutah (ة) yang berhenti dibaca menjadi ha sukun (هْ). Penanda akhir ayat di mushaf adalah lingkaran bernomor ayat (۝) sesudah kata terakhir.',
  },
  {
    nama: 'Mad ‘arid lissukun di akhir ayat',
    isi: 'Bila sebelum huruf terakhir ada huruf mad, berhentinya melahirkan mad ‘arid lissukun yang boleh dibaca 2, 4, atau 6 harakat (lihat bagian Hukum Mad di atas) — mis. berhenti di akhir Al-Fatihah [1]: 4, “…ad-diin”, boleh dipanjangkan sesuai pilihan panjang mad tersebut secara konsisten dalam satu bacaan.',
  },
  {
    nama: 'Memulai ayat berikutnya',
    isi: 'Setelah berhenti dan mengambil napas di akhir ayat, ayat berikutnya dimulai dari kata pertamanya sebagai ibtida’ baru — termasuk membaca hamzah wasalnya bila kata pertama berhamzah wasal, mis. memulai ayat dengan “ٱلَّذِينَ” dibaca “alladziina”.',
  },
];
