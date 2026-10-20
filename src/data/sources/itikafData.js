// Data statis Panduan I'tikaf (data layer).
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa; untuk kasus khusus silakan rujuk ulama setempat.
// Teks Arab niat & dalil adalah lafaz/teks lazim yang diamalkan.
// Modul ini HANYA diimpor oleh ItikafPage agar ikut chunk halamannya.

export const DISCLAIMER_ITIKAF =
  'Ringkasan edukasi — bukan fatwa. Detail fikih i\u2019tikaf bisa berbeda antar mazhab; untuk kasus khusus, silakan rujuk ulama atau guru setempat.';

export const PENGERTIAN_ITIKAF = {
  judul: 'Pengertian I\u2019tikaf',
  isi: 'I\u2019tikaf adalah berdiam diri di dalam masjid dengan niat khusus untuk mendekatkan diri kepada Allah — memperbanyak sholat, membaca Al-Qur\u2019an, dzikir, dan doa, serta menjauh sejenak dari kesibukan dunia. I\u2019tikaf yang paling utama dikerjakan pada sepuluh malam terakhir bulan Ramadhan untuk meraih Lailatul Qadar, sebagaimana kebiasaan Rasulullah \uFD3A setiap Ramadhan.',
  dalil: {
    arab: '\u0648\u064e\u0644\u064e\u0627 \u062a\u064f\u0628\u064e\u0627\u0634\u0650\u0631\u064f\u0648\u0647\u064f\u0646\u0651\u064e \u0648\u064e\u0623\u064e\u0646\u062a\u064f\u0645\u0652 \u0639\u064e\u0627\u0643\u0650\u0641\u064f\u0648\u0646\u064e \u0641\u0650\u064a \u0627\u0644\u0652\u0645\u064e\u0633\u064e\u0627\u062c\u0650\u062f\u0650',
    arti: '\u201c\u2026janganlah kamu campuri mereka (istri-istrimu) ketika kamu sedang beri\u2019tikaf di dalam masjid\u2026\u201d',
    sumber: 'QS. Al-Baqarah: 187 — ayat ini menyebut i\u2019tikaf dilakukan di masjid. Hadits: \u201cRasulullah \uFD3A beri\u2019tikaf pada sepuluh hari terakhir Ramadhan hingga beliau wafat, kemudian istri-istri beliau beri\u2019tikaf sepeninggal beliau.\u201d (HR. Bukhari & Muslim, dari Aisyah radhiyallahu \u2019anha)',
  },
};

export const NIAT_ITIKAF = {
  arab: '\u0646\u064e\u0648\u064e\u064a\u0652\u062a\u064f \u0627\u0644\u0652\u0627\u0639\u0652\u062a\u0650\u0643\u064e\u0627\u0641\u064e \u0641\u0650\u064a \u0647\u064e\u0670\u0630\u064e\u0627 \u0627\u0644\u0652\u0645\u064e\u0633\u0652\u062c\u0650\u062f\u0650 \u0645\u064e\u0627 \u062f\u064f\u0645\u0652\u062a\u064f \u0641\u0650\u064a\u0647\u0650 \u0633\u064f\u0646\u0651\u064e\u0629\u064b \u0644\u0650\u0644\u0651\u064e\u0647\u0650 \u062a\u064e\u0639\u064e\u0627\u0644\u064e\u0649',
  latin: 'Nawaitul-i\u2019tik\u0101fa f\u012b h\u0101dzal-masjidi m\u0101 dumtu f\u012bhi sunnatan lill\u0101hi ta\u2019\u0101l\u0101.',
  arti: 'Saya berniat i\u2019tikaf di masjid ini selama saya berada di dalamnya, sunnah karena Allah Ta\u2019ala.',
  keterangan:
    'Niat letaknya di hati dan dihadirkan saat mulai berdiam di masjid. Lafaz di atas sekadar menuntun niat. Untuk i\u2019tikaf nazar (yang dinazarkan), niatnya disesuaikan sebagai i\u2019tikaf wajib karena nazar.',
};

export const SYARAT_ITIKAF = [
  'Muslim, berakal, dan suci dari haid serta nifas (bagi perempuan). Anak yang sudah mumayyiz (dapat membedakan baik-buruk) boleh beri\u2019tikaf dengan izin walinya.',
  'Niat i\u2019tikaf di hati sejak mulai berdiam di masjid.',
  'Berdiam di masjid — i\u2019tikaf tidak sah dikerjakan di rumah menurut jumhur ulama, karena Al-Qur\u2019an menyebutnya \u201cdi dalam masjid\u201d (QS. Al-Baqarah: 187).',
  'Menetap sekurang-kurangnya sesaat dengan tenang (thuma\u2019ninah) menurut mazhab Syafi\u2019i; sebagian ulama mensyaratkan minimal sehari-semalam atau durasi tertentu — ikuti penjelasan guru setempat.',
  'Suci dari hadas besar (junub): orang yang junub tidak boleh berdiam di masjid sebelum mandi wajib.',
  'Izin suami bagi istri yang sudah menikah, dan izin orang tua/wali bagi yang masih di bawah perwalian, agar tidak menimbulkan mudarat keluarga.',
];

export const TEMPAT_ITIKAF = [
  {
    judul: 'Masjid — tempat satu-satunya',
    isi: 'I\u2019tikaf dikerjakan di masjid. Yang paling utama adalah masjid jami\u2019 (masjid yang dipakai sholat Jumat), agar orang yang beri\u2019tikaf tidak perlu keluar masjid untuk menunaikan sholat Jumat.',
  },
  {
    judul: 'Tiga masjid paling utama',
    isi: 'Bila dimungkinkan, masjid yang paling utama untuk i\u2019tikaf adalah Masjidil Haram (Makkah), Masjid Nabawi (Madinah), dan Masjidil Aqsha (Palestina) — sesuai keutamaan sholat di ketiga masjid tersebut.',
  },
  {
    judul: 'Menetap di area masjid',
    isi: 'Selama i\u2019tikaf, tidur, makan, dan minum dilakukan di dalam area masjid dengan tetap menjaga kebersihan, ketenangan, dan adab masjid. Pilih sudut yang tidak mengganggu jamaah lain dan jalur lalu-lalang.',
  },
];

export const AMALAN_10_MALAM = [
  {
    judul: 'Sholat malam: tarawih, tahajud & witir',
    isi: 'Hidupkan malam dengan sholat tarawih berjamaah sampai selesai bersama imam, lanjutkan tahajud dan witir menjelang sahur. Rasulullah \uFD3A bersungguh-sungguh pada sepuluh malam terakhir melebihi kesungguhan beliau di waktu lain (HR. Muslim).',
  },
  {
    judul: 'Tilawah & tadabbur Al-Qur\u2019an',
    isi: 'Perbanyak membaca Al-Qur\u2019an dengan tartil, mengulang hafalan, dan merenungkan maknanya. Jibril \u2019alaihissalam biasa menyimak (mudarasah) Al-Qur\u2019an bersama Rasulullah \uFD3A setiap Ramadhan.',
  },
  {
    judul: 'Dzikir, doa & istighfar',
    isi: 'Perbanyak dzikir, shalawat, istighfar, dan doa — terutama doa yang diajarkan untuk Lailatul Qadar: \u201cAll\u0101humma innaka \u2019afuwwun tuhibbul-\u2019afwa fa\u2019fu \u2019ann\u012b\u201d (Ya Allah, Engkau Maha Pemaaf dan menyukai pemaafan, maka maafkanlah aku).',
  },
  {
    judul: 'Berburu Lailatul Qadar',
    isi: 'Lailatul Qadar adalah malam yang lebih baik dari seribu bulan (QS. Al-Qadr: 3). Rasulullah \uFD3A memerintahkan mencarinya pada malam-malam ganjil sepuluh malam terakhir (malam 21, 23, 25, 27, 29). Karena malam pastinya dirahasiakan, hidupkanlah kesepuluh malamnya, jangan hanya memilih satu malam.',
  },
  {
    judul: 'I\u2019tikaf itu sendiri & sedekah',
    isi: 'Menetap di masjid dengan niat i\u2019tikaf sudah merupakan ibadah. Lengkapi dengan sedekah, memberi makan orang berbuka, dan membantu keperluan jamaah masjid.',
  },
];

export const TANDA_LAILATUL_QADAR = [
  'Malam terasa tenang, sejuk, dan tidak panas — udara nyaman tidak seperti malam biasanya.',
  'Matahari terbit keesokan paginya dengan cahaya redup, putih, dan tidak menyilaukan, seperti piringan tanpa sinar yang tajam (HR. Muslim).',
  'Hati terasa lapang dan khusyuk dalam beribadah pada malam itu.',
  'Catatan: tanda-tanda ini sekadar isyarat dari hadits dan pengalaman para salaf — bukan penentu pasti. Tanda yang paling jelas justru terasa setelah malamnya berlalu, karena itu jangan mengurangi ibadah hanya karena \u201cbelum merasakan tanda\u201d.',
];

export const PEMBATAL_ITIKAF = [
  'Keluar dari masjid tanpa keperluan yang dibenarkan (udzur syar\u2019i) — i\u2019tikaf terputus menurut jumhur; keperluan yang dibenarkan antara lain buang hajat, mandi wajib, makan bila tidak memungkinkan di masjid, dan sholat Jumat bila masjidnya bukan masjid jami\u2019.',
  'Berhubungan suami-istri (QS. Al-Baqarah: 187) — membatalkan i\u2019tikaf secara tegas dalam Al-Qur\u2019an.',
  'Haid atau nifas bagi perempuan — ia keluar dari masjid, dan i\u2019tikafnya terputus; bila i\u2019tikaf nazar berkelanjutan, dilanjutkan setelah suci menurut ketentuan mazhab.',
  'Hilang akal (gila), mabuk, atau murtad — membatalkan i\u2019tikaf karena syarat berakal dan Islam tidak lagi terpenuhi.',
  'Junub lalu berdiam lama tanpa segera mandi — orang junub wajib segera keluar dan mandi; berdiam dalam keadaan junub tidak dibenarkan.',
];

export const ITIKAF_WANITA = [
  'Boleh dan ada contohnya: istri-istri Rasulullah \uFD3A beri\u2019tikaf di masjid sepeninggal beliau (HR. Bukhari & Muslim).',
  'Syaratnya: izin suami (bagi yang menikah), suci dari haid dan nifas, serta aman dari fitnah — menempati area khusus perempuan di masjid dan menjaga adab serta pakaian syar\u2019i.',
  'Bila haid datang di tengah i\u2019tikaf, perempuan keluar dari masjid; i\u2019tikaf sunnahnya selesai, dan i\u2019tikaf nazar diteruskan setelah suci sesuai penjelasan ulama.',
  'I\u2019tikaf di rumah (di musholla rumah) tidak disebut i\u2019tikaf menurut jumhur ulama; berdiam untuk ibadah di rumah tetap berpahala sebagai ibadah, tetapi tidak berlaku padanya hukum-hukum i\u2019tikaf.',
];

export const ITIKAF_SUNNAH = [
  'I\u2019tikaf pada dasarnya sunnah dan boleh dikerjakan kapan saja sepanjang tahun, tidak khusus Ramadhan — hanya saja sepuluh malam terakhir Ramadhan adalah waktu yang paling utama dan paling ditekankan.',
  'Di luar Ramadhan, i\u2019tikaf bisa singkat (sebagian ulama membolehkan sesaat selama diniatkan dan berdiam dengan tenang) atau beberapa hari, misalnya pada hari libur.',
  'Hukumnya berubah menjadi wajib bila dinazarkan: siapa bernazar untuk i\u2019tikaf, wajib menunaikannya.',
  'Sebagian ulama menganjurkan berpuasa saat i\u2019tikaf; mazhab Syafi\u2019i tidak mensyaratkan puasa, tetapi i\u2019tikaf Ramadhan praktisnya selalu bersama puasa.',
];
