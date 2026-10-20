// Data statis edukasi makanan halal, sembelihan & adab makan (data layer).
// Modul data TERPISAH: hanya diimpor oleh chunk halaman Halal,
// jangan impor dari komponen bersama/common agar tetap lazy-loaded.
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa dan bukan sertifikasi halal. Status halal produk kemasan
// mengikuti sertifikasi resmi (BPJPH/MUI) dan label pada kemasan.

export const DISCLAIMER_HALAL =
  'Ringkasan edukasi — bukan fatwa dan bukan sertifikasi halal. Untuk status halal produk dan tempat makan, periksa sertifikat halal resmi (BPJPH) dan label pada kemasan; untuk kasus khusus (obat, bahan campuran, sembelihan di daerah tertentu) rujuk ulama setempat.';

export const MAKANAN_HARAM = {
  pengertian:
    'Asal hukum makanan dan minuman adalah halal, kecuali yang diharamkan dalil. Yang diharamkan ditegaskan dalam Al-Qur\u2019an karena mudaratnya dan sebagai bentuk ketaatan; seorang muslim meninggalkannya tanpa ragu.',
  daftar: [
    {
      judul: 'Bangkai',
      desc: 'Hewan yang mati tanpa disembelih secara syar\u2019i — misalnya mati tercekik, terjatuh, tertanduk, atau diterkam binatang buas tanpa sempat disembelih. Dikecualikan bangkai ikan dan belalang yang halal berdasarkan hadits masyhur.',
    },
    {
      judul: 'Darah yang mengalir',
      desc: 'Darah yang memancar saat penyembelihan. Sisa darah yang menempel pada daging setelah penyembelihan yang benar dimaafkan.',
    },
    {
      judul: 'Daging babi',
      desc: 'Seluruh bagian babi haram dimakan, termasuk lemak dan olahannya. Perhatikan bahan turunan (mis. gelatin dan lemak) pada produk kemasan dan periksa label halalnya.',
    },
    {
      judul: 'Sembelihan untuk selain Allah',
      desc: 'Hewan yang disembelih dengan menyebut nama selain Allah atau dipersembahkan untuk sesajen — haram dimakan meskipun hewannya sendiri halal.',
    },
    {
      judul: 'Khamar & yang memabukkan',
      desc: 'Minuman beralkohol dan segala yang memabukkan/menghilangkan akal diharamkan, sedikit maupun banyak. Khamar disebut perbuatan keji dalam QS Al-Ma\u2019idah ayat 90 dan diperintahkan untuk dijauhi.',
    },
    {
      judul: 'Hewan yang dilarang dalil',
      desc: 'Antara lain binatang buas bertaring dan burung berkuku tajam (hadits masyhur), serta hewan yang diperintahkan dibunuh atau dilarang dibunuh menurut dalil. Untuk hewan yang diperselisihkan ulama, ikuti rujukan yang diyakini dan jangan memperolok pilihan orang lain.',
    },
  ],
  dalil: {
    arab: 'حُرِّمَتْ عَلَيْكُمُ ٱلْمَيْتَةُ وَٱلدَّمُ وَلَحْمُ ٱلْخِنزِيرِ وَمَآ أُهِلَّ لِغَيْرِ ٱللَّهِ بِهِۦ',
    arti: 'Diharamkan bagimu (memakan) bangkai, darah, daging babi, dan (daging hewan) yang disembelih bukan atas (nama) Allah…',
    sumber: 'QS Al-Ma\u2019idah ayat 3; khamar pada QS Al-Ma\u2019idah ayat 90',
  },
};

export const SEMBELIHAN = {
  pengertian:
    'Sembelihan (dzabihah) yang halal mensyaratkan penyembelih, alat, cara, dan hewannya memenuhi ketentuan syariat. Daging di pasaran dari penyembelihan yang tidak diketahui statusnya — terutama di negeri mayoritas muslim — pada asalnya diperlakukan baik sangka, namun memilih yang bersertifikat halal lebih menenangkan.',
  syarat: [
    {
      judul: 'Penyembelih',
      desc: 'Muslim (atau ahli kitab menurut ketentuan yang masyhur), berakal, dan memahami maksud penyembelihan. Penyembelih mengucapkan basmalah saat menyembelih.',
    },
    {
      judul: 'Membaca basmalah',
      desc: 'Menyebut nama Allah (basmalah) saat menyembelih adalah syarat menurut jumhur ulama, berdasarkan QS Al-An\u2019am ayat 121. Hewan yang sengaja ditinggalkan basmalahnya tidak dimakan.',
    },
    {
      judul: 'Alat sembelih',
      desc: 'Alat harus tajam dan melukai dengan ketajamannya (bukan dengan berat/benturan) — pisau dan sejenisnya. Dilarang menyembelih dengan gigi, kuku, atau alat tumpul yang menyiksa hewan.',
    },
    {
      judul: 'Cara penyembelihan',
      desc: 'Memotong saluran napas dan saluran makanan serta dua urat leher hewan dengan sekali proses yang baik, membiarkan darah mengalir, memperlakukan hewan dengan ihsan: menajamkan pisau di luar pandangan hewan dan tidak menyembelih di depan hewan lain.',
    },
    {
      judul: 'Hewan yang boleh disembelih',
      desc: 'Hewan ternak dan hewan halal lainnya yang hidup dan sehat saat disembelih. Hewan yang sudah mati sebelum disembelih menjadi bangkai. Buruan darat/laut mengikuti ketentuan tersendiri dalam fikih berburu.',
    },
  ],
};

export const RAGU_DARURAT = {
  poin: [
    {
      judul: 'Makanan yang diragukan (syubhat)',
      desc: 'Perkara syubhat adalah yang tidak jelas halal-haramnya. Sikap wara\u2019 (berhati-hati) adalah meninggalkannya demi menjaga agama dan kehormatan, sebagaimana hadits masyhur tentang halal yang jelas, haram yang jelas, dan syubhat di antara keduanya (HR Bukhari & Muslim). Untuk produk kemasan: membaca komposisi dan mencari logo halal resmi membantu menghilangkan keraguan.',
    },
    {
      judul: 'Keadaan darurat',
      desc: 'Dalam keadaan darurat yang mengancam jiwa — tidak ada makanan halal sama sekali — dibolehkan memakan yang haram sekadar untuk bertahan hidup, tidak berlebihan dan tidak melampaui kebutuhan, berdasarkan pengecualian pada QS Al-Ma\u2019idah ayat 3. Bila pilihan halal tersedia kembali, pengecualian itu berhenti.',
    },
    {
      judul: 'Bertanya kepada yang tahu',
      desc: 'Keraguan pada bahan, proses, atau sembelihan suatu makanan diselesaikan dengan bertanya kepada pihak yang kompeten (lembaga halal, penyembelih, ulama), bukan dengan waswas berkepanjangan maupun sikap meremehkan.',
    },
  ],
};

export const ADAB_MAKAN = [
  'Mencuci tangan sebelum makan dan menjaga kebersihan makanan serta tempat makan.',
  'Membaca basmalah sebelum mulai makan; bila lupa di awal, membaca \u201cBismillahi awwalahu wa akhirahu\u201d saat ingat di tengah makan.',
  'Makan dengan tangan kanan dan mengambil makanan yang terdekat, sebagaimana petunjuk Rasulullah ﷺ dalam hadits masyhur (HR Bukhari & Muslim).',
  'Duduk dengan baik saat makan, tidak bersandar, dan tidak makan sambil berjalan tanpa kebutuhan.',
  'Tidak berlebihan dan tidak mubazir: berhenti sebelum terlalu kenyang dan mengambil makanan secukupnya.',
  'Tidak mencela makanan: bila suka dimakan, bila tidak suka ditinggalkan tanpa mencelanya.',
  'Menghormati makanan bersama: tidak mendahului sebelum yang lebih tua/pemimpin memulai pada jamuan, dan tidak meniup makanan/minuman yang masih panas.',
  'Berdoa sesudah makan dan bersyukur atas rezeki, serta menutup dengan hamdalah.',
];

export const DALIL_TIDAK_BERLEBIHAN = {
  arab: 'وَكُلُوا۟ وَٱشْرَبُوا۟ وَلَا تُسْرِفُوٓا۟ ۚ إِنَّهُۥ لَا يُحِبُّ ٱلْمُسْرِفِينَ',
  arti: '“…Makan dan minumlah, tetapi jangan berlebihan. Sungguh, Allah tidak menyukai orang yang berlebih-lebihan.”',
  sumber: 'QS Al-A\u2019raf ayat 31',
};

export const DOA_SESUDAH_MAKAN = {
  judul: 'Doa Sesudah Makan',
  arab: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
  latin: 'Alhamdu lillāhil-ladzī ath\u2019amanī hādzā wa razaqanīhi min ghairi haulin minnī wa lā quwwah.',
  arti: 'Segala puji bagi Allah yang telah memberiku makanan ini dan merezekikannya kepadaku, tanpa daya dan kekuatan dariku.',
  keterangan: 'Dirujuk dari Hisnul Muslim (bab doa sesudah makan). Lafal hamdalah sesudah makan memiliki beberapa riwayat lazim; yang di atas adalah salah satu yang masyhur.',
};
