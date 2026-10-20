// Data statis fitur Muslimah (sumber data layer).
// Konten fikih diambil dari riset 2026-10-20 (mazhab Syafi'i) — lihat
// ~/workspace/research_notes/riset-fikih-haid-nifas-20261020-0403/report.md
// Doa: ayat Qur'an (dengan juzt/ayat) + doa umum lazim masyarakat Indonesia.

export const DISCLAIMER =
  "Ringkasan edukasi menurut mazhab Syafi'i, bukan fatwa — untuk kasus khusus rujuk ulama.";

// ── A. Panduan mandi wajib ──────────────────────────────────────
// Rukun Syafi'i HANYA 2: niat + meratakan air (Fathul Mu'in). Sisanya sunnah.
export const MANDI_WAJIB = {
  niat: {
    haid: {
      label: 'Niat Mandi Wajib setelah Haid',
      arab: 'نَوَيْتُ الْغُسْلَ لِرَفْعِ الْحَدَثِ الْأَكْبَرِ مِنَ الْحَيْضِ لِلَّهِ تَعَالَى',
      latin: "Nawaitul ghusla liraf'il hadatsil akbari minal haidhi lillāhi ta'ālā.",
      arti: 'Aku niat mandi untuk menghilangkan hadas besar dari haid karena Allah Ta\'ala.',
    },
    nifas: {
      label: 'Niat Mandi Wajib setelah Nifas',
      arab: 'نَوَيْتُ الْغُسْلَ لِرَفْعِ الْحَدَثِ الْأَكْبَرِ مِنَ النِّفَاسِ لِلَّهِ تَعَالَى',
      latin: "Nawaitul ghusla liraf'il hadatsil akbari minan nifāsi lillāhi ta'ālā.",
      arti: 'Aku niat mandi untuk menghilangkan hadas besar dari nifas karena Allah Ta\'ala.',
    },
    catatan:
      'Melafalkan niat hukumnya sunnah; yang wajib adalah niat dalam HATI, bersamaan dengan awal membasuh tubuh. Untuk nifas, kata "minal haidhi" diganti "minan nifāsi".',
  },
  rukun: [
    {
      judul: '1. Niat (dalam hati)',
      desc: 'Niat mengangkat hadas besar (haid/nifas) karena Allah, dilakukan bersamaan dengan awal membasuh tubuh.',
    },
    {
      judul: '2. Meratakan air ke seluruh tubuh',
      desc: 'Seluruh kulit, rambut, dan pangkal rambut harus terkena air — termasuk lipatan tubuh. Tidak boleh ada bagian yang terlewat. Ini SATU-SATUNYA rukun selain niat menurut mazhab Syafi\'i.',
    },
  ],
  sunnah: [
    'Membaca basmalah.',
    'Mencuci kedua tangan 3 kali.',
    'Membersihkan kemaluan dan najis/kotoran yang menempel di badan dengan tangan kiri.',
    'Berwudhu sempurna seperti wudhu shalat (kaki boleh ditunda sampai akhir).',
    'Menyiram kepala 3 kali sambil menyela-nyela rambut hingga air mencapai kulit kepala/pangkal rambut.',
    'Menyiram seluruh tubuh — dimulai dari sisi kanan lalu kiri, menggosok badan, memperhatikan lipatan-lipatan tubuh.',
    'Membasuh kedua kaki (bila tadi ditunda) dan membaca doa setelah mandi (seperti doa setelah wudhu).',
  ],
  doaSetelahMandi: {
    arab: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ، اَللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ',
    latin:
      "Asyhadu an lā ilāha illallāhu wahdahu lā syarīka lah, wa asyhadu anna Muhammadan 'abduhu wa rasūluh. Allāhummaj'alnī minattawwābīna waj'alnī minal mutathahhirīn.",
    arti: 'Aku bersaksi bahwa tiada Tuhan selain Allah Yang Esa, tiada sekutu bagi-Nya, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk orang-orang yang bertaubat dan jadikanlah aku termasuk orang-orang yang selalu mensucikan diri.',
  },
  tandaSuci:
    'Tanda haid/nifas selesai: cairan putih (qashshah baydha\') atau kering total (jufuf) — cek dengan kapas; bila kapas bersih, haid selesai dan wajib mandi wajib sebelum shalat.',
};

// ── B. Doa khusus wanita (Arab + Latin + Indonesia) ─────────────
export const DOA_WANITA = [
  {
    id: 'hamil',
    judul: 'Doa Ibu Hamil (Nazar untuk Anak)',
    sumber: 'QS Āli \'Imrān [3]:35 — doa istri Imrān untuk kandungan',
    arab: 'رَبِّ إِنِّي نَذَرْتُ لَكَ مَا فِي بَطْنِي مُحَرَّرًا فَتَقَبَّلْ مِنِّي ۖ إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    latin: "Rabbi innī nadzartu laka mā fī bathnī muharraran fataqabbal minnī, innaka antas-samī'ul-'alīm.",
    arti: 'Ya Tuhanku, sesungguhnya aku menazarkan kepada-Mu apa yang ada dalam kandunganku menjadi hamba yang saleh dan berkhidmat, maka terimalah dari padaku. Sesungguhnya Engkaulah Yang Maha Mendengar lagi Maha Mengetahui.',
  },
  {
    id: 'persalinan',
    judul: 'Doa Dimudahkan Persalinan',
    sumber: 'Doa umum yang lazim dibaca saat menunggu persalinan',
    arab: 'اللَّهُمَّ سَهِّلْ وِلَادَتَهَا وَاجْعَلْ مَوْلُودَهَا سَالِمًا مُعَافًى',
    latin: "Allāhumma sahhil wilādatahā waj'al maulūdahā sāliman mu'āfā.",
    arti: 'Ya Allah, mudahkanlah persalinannya dan jadikanlah bayinya selamat serta sehat.',
  },
  {
    id: 'menyusui',
    judul: 'Doa saat Menyusui (Keberkahan & Kekuatan Mendidik)',
    sumber: 'Doa umum yang lazim',
    arab: 'اللَّهُمَّ بَارِكْ لِي فِي وَلَدِي وَأَعِنِّي عَلَى تَرْبِيَتِهِ',
    latin: "Allāhumma bārik lī fī waladī wa a'innī 'alā tarbiyatih.",
    arti: 'Ya Allah, berkahilah aku pada anakku dan tolonglah aku dalam mendidiknya.',
  },
  {
    id: 'keturunan',
    judul: 'Doa Memohon Keturunan yang Baik',
    sumber: 'QS Āli \'Imrān [3]:38 — doa Nabi Zakariyā',
    arab: 'رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ',
    latin: "Rabbi hab lī min ladunka dzurriyyatan thayyibah, innaka samī'ud-du'ā'.",
    arti: 'Ya Tuhanku, berilah aku dari sisi-Mu seorang anak yang baik. Sesungguhnya Engkau Maha Pendengar doa.',
  },
  {
    id: 'untuk-anak-1',
    judul: 'Doa untuk Anak (Penyejuk Hati)',
    sumber: 'QS Al-Furqān [25]:74',
    arab: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    latin: "Rabbanā hab lanā min azwājinā wa dzurriyyātinā qurrata a'yunin waj'alnā lil-muttaqīna imāmā.",
    arti: 'Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.',
  },
  {
    id: 'untuk-anak-2',
    judul: 'Doa agar Anak Rajin Shalat',
    sumber: 'QS Ibrāhīm [14]:40 — doa Nabi Ibrāhīm',
    arab: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    latin: "Rabbij'alnī muqīmash-shalāti wa min dzurriyyatī, rabbanā wa taqabbal du'ā'.",
    arti: 'Ya Tuhanku, jadikanlah aku dan anak cucuku orang yang tetap melaksanakan shalat. Ya Tuhan kami, perkenankanlah doaku.',
  },
];

// ── C. Ringkasan fikih & mitos vs hukum (dari laporan riset) ───
export const RINGKASAN_FIKIH = {
  haid: [
    { label: 'Definisi', nilai: 'Darah alami (dam jibillah) dari pangkal rahim pada waktu tertentu, bukan karena sakit/melahirkan.' },
    { label: 'Minimal', nilai: '24 jam (1 hari 1 malam) total — boleh terputus-putus dalam rentang 15 hari. Kurang dari itu = istihadah.' },
    { label: 'Kebiasaan (ghalib)', nilai: '6–7 hari (info saja, BUKAN batas hukum).' },
    { label: 'Maksimal', nilai: '15 hari 15 malam — hari ke-16+ = istihadah.' },
    { label: 'Suci minimal antar dua haid', nilai: '15 hari; tidak ada batas maksimal. Tidak berlaku antara haid ↔ nifas.' },
    { label: 'Usia minimal haid', nilai: '9 tahun Hijriah kurang sedikit (taqriban; rumusan pesantren: kurang 16 hari kurang sedikit).' },
    { label: 'Tanda suci', nilai: 'Cairan putih (qashshah baydha\') atau kering total (jufuf).' },
  ],
  nifas: [
    { label: 'Definisi', nilai: 'Darah setelah rahim kosong dari kandungan (termasuk lahiran sesar, \'alaqah/mudhghah).' },
    { label: 'Minimal', nilai: 'Tidak terbatas — bisa sesaat (majjah). Darah berhenti = suci, wajib mandi & shalat, tidak perlu menunggu 40 hari.' },
    { label: 'Kebiasaan (ghalib)', nilai: '40 hari (hadis Ummu Salamah).' },
    { label: 'Maksimal', nilai: "60 hari menurut mazhab Syafi'i — catatan khilaf: 40 hari menurut Hanafi, Hambali & jumhur sahabat." },
    { label: 'Setelah 60 hari', nilai: 'Istihadah (atau haid bila bertepatan dengan \'adah haid & memenuhi syarat).' },
  ],
  istihadah: [
    { label: 'Definisi', nilai: 'Darah penyakit (dam \'illah) dari urat al-\'ādzil — tidak memenuhi syarat haid/nifas.' },
    { label: 'Ciri darah haid (kuat)', nilai: 'Hitam/merah pekat, kental, berbau tidak sedap khas.' },
    { label: 'Ciri darah istihadah (lemah)', nilai: 'Merah segar/muda, encer, tidak berbau khas.' },
    { label: 'Hukum mustahadhah', nilai: 'Dihukumi SUCI: wajib shalat & puasa. Wudhu baru tiap masuk waktu fardhu setelah membersihkan darah & memakai pembalut; mandi besar sekali saat masa haidnya (tamyiz/\'adah) berakhir.' },
    { label: 'Kategori', nilai: 'Mubtadi\'ah (baru pertama) / mu\'tadah (punya kebiasaan) × mumayyizah (bisa bedakan sifat darah → tamyiz) / ghairu mumayyizah (→ \'adah; mubtadi\'ah: 1 hari 1 malam per bulan).' },
  ],
  larangan: [
    { label: 'Shalat', nilai: 'Haram, tidak sah, TIDAK wajib diqadha.' },
    { label: 'Puasa', nilai: 'Haram, tidak sah, puasa Ramadan WAJIB diqadha.' },
    { label: 'Thawaf', nilai: 'Tidak sah; manasik lain boleh.' },
    { label: 'Sentuh/bawa mushaf', nilai: 'Haram langsung tanpa penghalang (jumhur). Dengan penghalang boleh bila ada hajat.' },
    { label: 'Baca Qur\'an niat tilawah', nilai: "Haram menurut Syafi'i (kecuali dzikir/doa, penghafal khawatir lupa, belajar-mengajar). HP bukan mushaf." },
    { label: 'Masjid', nilai: 'Haram berdiam/i\'tikaf. Lewat: makruh bila aman dari mengotori, haram bila khawatir menetes.' },
    { label: 'Jima\' suami-istri', nilai: 'Haram sampai suci DAN mandi wajib. Istimta\' antara pusar–lutut juga haram (Syafi\'iyah).' },
    { label: 'Thalaq saat haid', nilai: 'Haram (thalaq bid\'ah) — rujuk pengadilan agama/ulama untuk konsekuensinya.' },
    { label: 'Setelah darah berhenti, sebelum mandi', nilai: 'Larangan tetap berlaku, KECUALI puasa & thalaq yang sudah boleh.' },
  ],
};

export const MITOS_VS_HUKUM = [
  {
    mitos: 'Tidak boleh keramas/mandi saat haid.',
    hukum: 'BOLEH, bahkan dianjurkan menjaga kebersihan. Yang dilarang hanya mandi dengan niat menghilangkan hadas padahal haid belum selesai. Rambut rontok saat haid tidak wajib dikumpulkan/dicuci.',
  },
  {
    mitos: 'Tidak boleh memotong kuku/rambut saat haid (akan kembali dalam keadaan hadas besar).',
    hukum: 'Tidak ada dalil larangan — mitos masyarakat (MUI). Asalnya anjuran adab untuk junub (makruh tanzih, bukan haram). Nabi ﷺ menyuruh Aisyah yang haid menyisir rambutnya (HR Bukhari–Muslim).',
  },
  {
    mitos: 'Wanita haid itu "kotor", harus dijauhi total (tidak boleh makan/masak bersama).',
    hukum: 'Salah. Yang najis adalah darahnya, bukan orangnya. Nabi ﷺ tetap makan, minum, dan tidur bersama Aisyah saat beliau haid; yang dilarang hanya jima\'.',
  },
  {
    mitos: 'Shalat yang ditinggalkan saat haid wajib diqadha.',
    hukum: 'Tidak wajib diqadha (ijma\', hadis Aisyah). Yang wajib diqadha hanya puasa Ramadan.',
  },
  {
    mitos: 'Darah berhenti = langsung boleh shalat tanpa mandi.',
    hukum: 'Wajib mandi besar dulu. Larangan tetap berlaku sampai mandi, kecuali puasa & thalaq.',
  },
  {
    mitos: 'Flek/darah kurang dari sehari otomatis haid.',
    hukum: 'Total < 24 jam = istihadah, BUKAN haid: tetap wajib shalat, dan shalat yang terlanjur ditinggalkan wajib diqadha.',
  },
  {
    mitos: 'Haid > 15 hari berarti terus tinggalkan shalat sampai darah berhenti.',
    hukum: 'Hari ke-16+ adalah istihadah: wajib mandi & kembali shalat/puasa dengan tata cara mustahadhah; hari haid dihitung dengan tamyiz/\'adah.',
  },
  {
    mitos: 'Nifas pasti 40 hari; sebelum itu belum boleh shalat walau darah sudah berhenti.',
    hukum: 'Nifas tidak ada batas minimal: begitu darah berhenti (walau hari ke-10), wanita suci — wajib mandi & shalat. 40 hari hanyalah kebiasaan (ghalib).',
  },
  {
    mitos: 'Istihadah = sama dengan haid, boleh meninggalkan shalat & puasa.',
    hukum: 'Mustahadhah dihukumi suci: WAJIB shalat & puasa; hanya tata cara wudhunya yang khusus.',
  },
  {
    mitos: 'Membaca Al-Qur\'an dari HP sama haramnya dengan menyentuh mushaf.',
    hukum: 'Layar HP/aplikasi bukan mushaf menurut jumhur ulama kontemporer — boleh dibaca. (Larangan tilawah itu sendiri ada khilaf; pendapat Syafi\'i: haram dengan niat tilawah.)',
  },
  {
    mitos: 'Hari bersih di tengah haid berarti haid selesai permanen.',
    hukum: 'Hari bersih di sela darah dalam rentang 15 hari (naqa\') tetap dihukumi haid (qaul mu\'tamad), tetapi saat melihat bersih tetap wajib mandi & shalat; bila keluar darah lagi dan puasa batal, puasa hari itu wajib diqadha.',
  },
];

export const SUMBER_RINGKAS =
  'Sumber: Safinatun Najah Fasal 18, Fathul Mu\'in, Fathul Wahhab, Tuhfah al-Muhtaj — dirangkum dalam riset fikih 20 Oktober 2026.';
