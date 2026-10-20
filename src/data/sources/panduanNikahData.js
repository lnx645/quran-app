// Data statis panduan nikah & doa pengantin (data layer).
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa. Detail akad dapat berbeda antarpendapat ulama dan mengikuti
// ketentuan KUA/penghulu setempat; teks Arab doa & contoh lafaz di bawah
// adalah lafaz ibadah lazim yang masyhur.

export const DISCLAIMER_NIKAH =
  'Ringkasan edukasi — bukan fatwa. Ketentuan nikah dapat berbeda antarpendapat ulama; untuk pelaksanaan akad, syarat administrasi, dan kasus khusus silakan rujuk KUA, penghulu, atau ulama setempat.';

// ── Rukun nikah ─────────────────────────────────────────────────
// Lima rukun menurut jumhur ulama (terutama mazhab Syafi\u2019i yang umum
// dipakai di Indonesia).
export const RUKUN_NIKAH = [
  {
    judul: 'Calon suami',
    desc: 'Laki-laki yang jelas identitasnya, beragama Islam, tidak sedang ihram haji/umrah, tidak memiliki penghalang perkawinan (misalnya masih memiliki empat istri atau wanita yang akan dinikahi masih dalam masa iddah dari suami lain).',
  },
  {
    judul: 'Calon istri',
    desc: 'Perempuan yang jelas identitasnya, bukan mahram bagi calon suami (bukan ibu, saudara kandung, bibi, dan seterusnya sebagaimana QS. An-Nisa\u2019: 23), tidak sedang bersuami, dan tidak dalam masa iddah.',
  },
  {
    judul: 'Wali',
    desc: 'Wali nasab dari pihak perempuan — ayah, lalu kakek, lalu saudara laki-laki kandung, dan seterusnya menurut urutan kekerabatan — yang menikahkan mempelai perempuan. Bila tidak ada wali nasab yang memenuhi syarat, kewalian beralih kepada wali hakim (di Indonesia melalui KUA). Nabi shallallahu \u2019alaihi wasallam bersabda bahwa tidak sah nikah tanpa wali (HR. Abu Dawud, Tirmidzi, dan Ibnu Majah).',
  },
  {
    judul: 'Dua orang saksi',
    desc: 'Dua laki-laki muslim yang adil, baligh, dan berakal, yang hadir dan menyaksikan langsung ijab-qabul. Di Indonesia saksi dicatat resmi oleh penghulu/KUA.',
  },
  {
    judul: 'Ijab-qabul (shighat)',
    desc: 'Ucapan ijab dari wali (\u201Csaya nikahkan engkau dengan \u2026\u201D) dan ucapan qabul dari calon suami (\u201Csaya terima nikahnya \u2026\u201D) dalam satu majelis, bersambung tanpa jeda panjang, dengan lafaz yang jelas menunjukkan pernikahan.',
  },
];

export const PENGERTIAN_NIKAH =
  'Nikah adalah akad yang menghalalkan hubungan suami-istri dengan lafaz nikah/tazwij, yang oleh Al-Qur\u2019an disebut sebagai mitsaqan ghalizhan — perjanjian yang kokoh (QS. An-Nisa\u2019: 21). Tujuannya membentuk keluarga yang sakinah, mawaddah, wa rahmah (QS. Ar-Rum: 21). Di Indonesia, pernikahan juga wajib dicatat negara melalui KUA (bagi muslim) agar sah secara hukum dan melindungi hak kedua pihak serta anak.';

// ── Urutan rangkaian pernikahan ────────────────────────────────
export const URUTAN_NIKAH = [
  {
    judul: 'Ta\u2019aruf & khitbah (peminangan)',
    desc: 'Saling mengenal dalam batas syariat, lalu pihak laki-laki meminang perempuan kepada walinya. Perempuan yang sedang dipinang tidak boleh dipinang orang lain hingga pinangan pertama selesai. Pada tahap ini keduanya belum halal satu sama lain.',
  },
  {
    judul: 'Persiapan administrasi & mahar',
    desc: 'Mengurus berkas ke KUA (KTP, KK, akta, surat pengantar RT/RW/kelurahan, dan dokumen lain sesuai ketentuan), mengikuti bimbingan pranikah bila ada, serta menyepakati mahar bersama wali/mempelai perempuan.',
  },
  {
    judul: 'Akad nikah',
    desc: 'Majelis akad dihadiri calon suami, wali, dua saksi, dan penghulu. Dibuka dengan khutbah nikah, lalu ijab-qabul dalam satu majelis, penyebutan mahar, doa, dan penandatanganan buku/akta nikah.',
  },
  {
    judul: 'Pengumuman & walimah',
    desc: 'Pernikahan diumumkan dan diselenggarakan walimah (resepsi) sebagai wujud syukur dan pemberitahuan kepada masyarakat, sesuai kemampuan dan tanpa berlebihan.',
  },
  {
    judul: 'Kehidupan rumah tangga',
    desc: 'Setelah akad, suami-istri halal satu sama lain dan mulai menjalankan hak serta kewajiban masing-masing dengan musyawarah dan saling menolong dalam kebaikan.',
  },
];

// ── Mahar ───────────────────────────────────────────────────────
export const MAHAR = {
  pengertian:
    'Mahar (shadaq/mas kawin) adalah pemberian wajib dari calon suami kepada calon istri sebagai hak penuh istri, berdasarkan firman Allah: \u201CBerikanlah mahar kepada wanita (yang kamu nikahi) sebagai pemberian yang penuh kerelaan.\u201D (QS. An-Nisa\u2019: 4). Mahar bukan harga seorang perempuan, melainkan tanda kesungguhan dan penghormatan.',
  poin: [
    { judul: 'Hak milik istri', desc: 'Mahar sepenuhnya milik istri; tidak boleh diambil kembali oleh suami atau keluarga kecuali dengan kerelaan istri sendiri.' },
    { judul: 'Bentuk mahar', desc: 'Boleh berupa uang, perhiasan/emash, seperangkat alat sholat, hafalan Al-Qur\u2019an yang diajarkan, atau manfaat lain yang bernilai dan jelas. Yang penting: jelas jenis dan kadarnya saat akad.' },
    { judul: 'Tidak ada batas baku', desc: 'Syariat tidak menetapkan batas minimal maupun maksimal mahar. Yang dianjurkan adalah kemudahan — mahar yang ringan dan tidak memberatkan termasuk keberkahan pernikahan.' },
    { judul: 'Contoh wajar', desc: 'Contoh yang lazim di Indonesia: seperangkat alat sholat, cincin/perhiasan emas beberapa gram, atau uang tunai dalam jumlah yang disepakati kedua keluarga — disesuaikan kemampuan calon suami tanpa gengsi dan tanpa berutang berlebihan.' },
    { judul: 'Tunai atau ditangguhkan', desc: 'Mahar boleh dibayar tunai saat akad atau ditangguhkan sebagian/seluruhnya sesuai kesepakatan yang dicatat; yang ditangguhkan menjadi utang suami kepada istri.' },
  ],
};

// ── Contoh lafaz ijab-qabul ────────────────────────────────────
export const AKAD = {
  keterangan:
    'Contoh lafaz berikut adalah pola umum yang dipakai para penghulu; lafaz persis di majelis mengikuti arahan penghulu/wali setempat. Tanda (\u2026) diganti nama dan mahar yang sebenarnya.',
  ijab: {
    judul: 'Ijab — diucapkan wali',
    arab: 'أَنْكَحْتُكَ وَزَوَّجْتُكَ ابْنَتِي (\u2026) بِمَهْرِ (\u2026) نَقْدًا',
    latin: 'Ankahtuka wa zawwajtuka ibnat\u012B (\u2026) bi-mahri (\u2026) naqdan.',
    arti: 'Aku nikahkan engkau dan aku kawinkan engkau dengan putriku (\u2026) dengan mahar (\u2026) dibayar tunai.',
    versiIndonesia: '\u201CSaya nikahkan dan saya kawinkan engkau dengan anak kandung saya yang bernama (\u2026) dengan mas kawin berupa (\u2026) dibayar tunai.\u201D',
  },
  qabul: {
    judul: 'Qabul — diucapkan calon suami',
    arab: 'قَبِلْتُ نِكَاحَهَا وَتَزْوِيجَهَا بِالْمَهْرِ الْمَذْكُورِ نَقْدًا',
    latin: 'Qabiltu nik\u0101hah\u0101 wa tazw\u012Bjah\u0101 bil-mahril-madzk\u016bri naqdan.',
    arti: 'Saya terima nikahnya dan kawinnya dengan mahar yang disebutkan, dibayar tunai.',
    versiIndonesia: '\u201CSaya terima nikahnya (\u2026) binti (\u2026) dengan mas kawin tersebut dibayar tunai.\u201D',
  },
};

// ── Walimah ─────────────────────────────────────────────────────
export const WALIMAH = [
  { judul: 'Hukum & tujuan', desc: 'Walimah (resepsi pernikahan) hukumnya sunnah muakkadah menurut jumhur ulama. Tujuannya mengumumkan pernikahan, berbagi kegembiraan, dan bersyukur — Nabi shallallahu \u2019alaihi wasallam memerintahkan walimah walau dengan seekor kambing (HR. Bukhari & Muslim).' },
  { judul: 'Sesuai kemampuan', desc: 'Selenggarakan semampunya, sederhana pun cukup. Hindari berlebih-lebihan (israf), berutang besar demi gengsi, dan hal-hal yang melanggar syariat dalam acara.' },
  { judul: 'Mengundang dengan adil', desc: 'Dianjurkan mengundang kerabat, tetangga, dan termasuk fakir miskin — bukan hanya orang kaya. Seburuk-buruk hidangan walimah adalah yang hanya mengundang orang kaya dan meninggalkan orang miskin (HR. Bukhari & Muslim).' },
  { judul: 'Menghadiri undangan', desc: 'Menghadiri undangan walimah sangat dianjurkan (sebagian ulama mewajibkan bila tidak ada uzur); tamu mendoakan keberkahan bagi kedua mempelai.' },
];

// ── Hak & kewajiban suami-istri (ringkas) ──────────────────────
export const HAK_KEWAJIBAN = [
  { pihak: 'Bersama', desc: 'Bergaul dengan cara yang baik (mu\u2019asyarah bil ma\u2019ruf, QS. An-Nisa\u2019: 19), saling menjaga kehormatan dan rahasia rumah tangga, bermusyawarah, serta saling menolong dalam ketaatan dan mendidik anak.' },
  { pihak: 'Suami', desc: 'Memberi mahar, menafkahi istri dan anak sesuai kemampuan (makanan, pakaian, tempat tinggal), berlaku adil dan lembut, membimbing keluarga dalam agama, dan tidak menyakiti istri lahir maupun batin.' },
  { pihak: 'Istri', desc: 'Taat kepada suami dalam hal yang ma\u2019ruf (bukan maksiat), menjaga diri dan kehormatan keluarga, mengelola rumah tangga dengan baik, dan tidak memasukkan orang yang tidak disukai suami ke rumah tanpa izin.' },
  { pihak: 'Catatan', desc: 'Rincian di atas adalah ringkasan umum. Pembagian peran di rumah tangga terbaik adalah hasil musyawarah dan saling ridha kedua pihak, bukan sekadar daftar tuntutan.' },
];

// ── Doa-doa ─────────────────────────────────────────────────────
export const DOA_PENGANTIN = {
  judul: 'Doa untuk Kedua Pengantin',
  arab: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
  latin: 'Baarakallaahu laka wa baaraka \u2019alaika wa jama\u2019a bainakumaa fii khair.',
  arti: 'Semoga Allah memberkahimu, memberkahi atasmu, dan mengumpulkan kalian berdua dalam kebaikan.',
  keterangan: 'Doa yang diajarkan Nabi shallallahu \u2019alaihi wasallam untuk diucapkan kepada pengantin (HR. Abu Dawud, Tirmidzi, dan Ibnu Majah). Ucapkan doa ini — bukan sekadar \u201Cselamat\u201D — saat memberi selamat kepada mempelai.',
};

export const DOA_MALAM_PERTAMA = {
  judul: 'Doa Malam Pertama (Ringkas)',
  arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِهَا وَخَيْرِ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ',
  latin: 'Allaahumma inn\u012B as-aluka min khairih\u0101 wa khairi m\u0101 jabaltah\u0101 \u2019alaihi, wa a\u2019\u016Bdzu bika min syarrih\u0101 wa syarri m\u0101 jabaltah\u0101 \u2019alaihi.',
  arti: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikannya dan kebaikan tabiat yang Engkau ciptakan padanya. Dan aku berlindung kepada-Mu dari keburukannya dan keburukan tabiat yang Engkau ciptakan padanya. (HR. Abu Dawud & Ibnu Majah)',
  keterangan: 'Ringkasnya: disunnahkan sholat sunnah dua rakaat bersama istri, lalu suami meletakkan tangan di ubun-ubun/kepala istri sambil membaca doa di atas. Sebelum berhubungan, bacalah basmalah dan doa: \u201CBismillaah, Allaahumma jannibnasy-syaithaana wa jannibisy-syaithaana maa razaqtanaa\u201D (Dengan nama Allah, ya Allah jauhkanlah kami dari setan dan jauhkanlah setan dari apa yang Engkau rezekikan kepada kami — HR. Bukhari & Muslim).',
};
