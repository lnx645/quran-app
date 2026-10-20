/**
 * Data konten Sedekah & Infaq: panduan keutamaan, waktu utama, sedekah
 * subuh, jenis, adab, dan dalil.
 *
 * KEJUJURAN SUMBER TEKS SUCI:
 * - DALIL_SEDEKAH: teks Arab & terjemahan hadits disalin PERSIS (tanpa
 *   diubah satu huruf pun) dari dataset yang sudah ada di aplikasi ini —
 *   riyadhusData.js (Riyadhus Shalihin, IslamEnc/IslamHouse) dan
 *   haditsArbainData.js (Hadits Arbain an-Nawawi). Setiap entri menyebut
 *   nomor hadits + sumber datasetnya pada field sumberData.
 * - AYAT_REFERENSI_SEDEKAH: hanya REFERENSI ayat (surah + nomor + tema),
 *   BUKAN teks ayat — teks Arab & terjemahan resmi Al-Qur'an dibaca di
 *   halaman surah aplikasi ini (sumber Quran.com / terjemahan Kemenag).
 *   Satu entri (QS. Al-Ma'idah: 2) berasal dari daftar ayatPilihanData.js;
 *   dua lainnya adalah ayat masyhur tentang infaq/adab sedekah yang
 *   dicantumkan sebagai referensi saja.
 * - Teks panduan lain (keutamaan, waktu, cara, adab) adalah penjelasan
 *   ringkas redaksi aplikasi berdasarkan dalil-dalil di atas — bukan
 *   kutipan. Ringkasan masyhur yang menyebut riwayat (mis. doa malaikat
 *   di waktu subuh) ditandai sumber riwayatnya dan TIDAK dikutip verbatim.
 */

export const KEUTAMAAN_SEDEKAH = [
  {
    judul: 'Bukti keimanan',
    isi: 'Rasulullah ﷺ menyebut sedekah sebagai burhan — bukti nyata keimanan seseorang, sebagaimana dalam hadits pada bagian Dalil di bawah.',
  },
  {
    judul: 'Memadamkan kesalahan',
    isi: 'Dalam Hadits Arbain no. 29, sedekah disebut memadamkan (menghapuskan) kesalahan sebagaimana air memadamkan api.',
  },
  {
    judul: 'Tidak mengurangi harta',
    isi: 'Sedekah tidak membuat harta berkurang; yang tampak berkurang di tangan justru bertumbuh keberkahannya — satu biji nafkah di jalan Allah digambarkan Al-Qur\'an menumbuhkan tujuh bulir (lihat referensi QS. Al-Baqarah: 261).',
  },
  {
    judul: 'Perisai dari api neraka',
    isi: 'Meski hanya separuh kurma, sedekah yang ikhlas menjadi perisai dari api neraka — kecilnya pemberian bukan alasan untuk tidak memberi (Riyadhus Shalihin no. 139).',
  },
  {
    judul: 'Pahala terbesar saat sehat',
    isi: 'Sedekah yang paling besar pahalanya adalah yang diberikan saat sehat dan merasa sayang pada harta — sebelum datang ajal dan harta berpindah ke ahli waris (Riyadhus Shalihin no. 90).',
  },
  {
    judul: 'Setiap kebaikan terhitung sedekah',
    isi: 'Sedekah tidak selalu berupa harta: setiap kebaikan adalah sedekah (Riyadhus Shalihin no. 134), sehingga tidak ada yang terhalang dari berbuat baik hanya karena belum lapang harta.',
  },
];

export const WAKTU_UTAMA_SEDEKAH = [
  {
    id: 'subuh',
    judul: 'Waktu Subuh',
    isi: 'Diberikan setelah sholat Subuh, sebelum memulai aktivitas hari itu. Ringkasan masyhur menyebutkan setiap pagi ada malaikat yang mendoakan orang yang berinfaq agar hartanya diganti, dan mendoakan kebinasaan bagi harta yang ditahan (HR. Bukhari & Muslim) — dicantumkan sebagai ringkasan, bukan kutipan teks.',
  },
  {
    id: 'jumat',
    judul: 'Hari Jumat',
    isi: 'Jumat adalah hari terbaik dalam sepekan; memperbanyak sedekah pada hari Jumat — misalnya sebelum atau sesudah sholat Jumat — adalah amalan yang sangat dianjurkan para ulama.',
  },
  {
    id: 'ramadan',
    judul: 'Bulan Ramadan',
    isi: 'Rasulullah ﷺ adalah orang yang paling dermawan, dan kedermawanan beliau lebih lagi pada bulan Ramadan (ringkasan masyhur, HR. Bukhari & Muslim). Ramadan adalah musim terbaik memperbanyak sedekah dan infaq.',
  },
  {
    id: 'sehat',
    judul: 'Saat Sehat & Lapang',
    isi: 'Jangan menunda sedekah sampai sakit atau ajal mendekat: sedekah saat sehat dan harta terasa berharga justru yang paling besar pahalanya (Riyadhus Shalihin no. 90).',
  },
];

export const SEDEKAH_SUBUH = {
  ringkas:
    'Kebiasaan bersedekah khusus di waktu subuh — diberikan setelah sholat Subuh, diawali niat mendekatkan diri kepada Allah dan membantu sesama di awal hari.',
  cara: [
    'Luruskan niat karena Allah sebelum memberi — nilai sedekah mengikuti niatnya.',
    'Siapkan dari malam hari: siapkan uang tunai, isi saldo, atau tentukan tujuan (kotak amal masjid, kerabat/fakir miskin terdekat, atau lembaga penyalur yang amanah).',
    'Segera setelah sholat Subuh, tunaikan: masukkan ke kotak amal, serahkan langsung, atau transfer — jangan ditunda sampai lupa.',
    'Berdoalah dengan doa masing-masing untuk kebaikan diri, keluarga, dan penerima. Catatan jujur: tidak ada bacaan doa khusus sedekah subuh yang ditetapkan secara khusus dalam dalil di aplikasi ini — berdoalah dengan bahasa dan doa yang kamu hafal.',
    'Catat di halaman ini (nominal boleh dikosongkan) agar kebiasaan baikmu terpantau dan terjaga.',
  ],
  catatan:
    'Sedekah subuh adalah kebiasaan baik yang dianjurkan secara umum oleh keutamaan berinfaq di pagi hari; bentuk dan nominalnya bebas — yang utama adalah keikhlasan dan konsistensinya.',
};

export const JENIS_PANDUAN_SEDEKAH = [
  {
    id: 'Subuh',
    nama: 'Sedekah Subuh',
    contoh: 'Sedekah rutin setelah sholat Subuh — uang tunai, makanan, atau transfer di awal hari.',
  },
  {
    id: 'Jumat',
    nama: 'Sedekah Jumat',
    contoh: 'Sedekah yang khusus diberikan pada hari Jumat, misalnya ke kotak amal masjid atau berbagi makanan.',
  },
  {
    id: 'Infaq',
    nama: 'Infaq',
    contoh: 'Mengeluarkan sebagian harta di jalan Allah secara umum: pembangunan masjid, pendidikan, dakwah, dan kegiatan sosial-keagamaan.',
  },
  {
    id: 'Umum',
    nama: 'Sedekah Umum',
    contoh: 'Sedekah harta di luar kategori di atas: membantu fakir miskin, anak yatim, tetangga, kerabat, atau korban musibah, kapan pun.',
  },
];

export const SEDEKAH_NON_HARTA = [
  'Setiap ucapan tasbih, tahmid, tahlil, dan takbir adalah sedekah (Riyadhus Shalihin no. 118 & 120).',
  'Perkataan yang baik adalah sedekah (Riyadhus Shalihin no. 122).',
  'Mendamaikan dua orang yang berselisih adalah sedekah (Riyadhus Shalihin no. 122).',
  'Menolong seseorang mengangkat barang atau menaiki kendaraannya adalah sedekah (Riyadhus Shalihin no. 122).',
  'Menyingkirkan gangguan dari jalan adalah sedekah (Riyadhus Shalihin no. 122).',
  'Mengajak kepada kebaikan dan mencegah kemungkaran adalah sedekah (Riyadhus Shalihin no. 118).',
  'Menanam tanaman yang kemudian dimakan manusia, hewan, atau burung menjadi sedekah bagi penanamnya (Riyadhus Shalihin no. 135).',
];

export const ADAB_SEDEKAH = [
  'Ikhlas karena Allah — amal bergantung pada niatnya (Hadits Arbain no. 1); jangan memberi demi pujian atau konten.',
  'Jangan mengungkit-ungkit pemberian dan jangan menyakiti hati penerima — itu membatalkan pahala sedekah (lihat referensi QS. Al-Baqarah: 264).',
  'Berikan dari harta yang halal dan baik, bukan sisa yang sudah tidak diinginkan.',
  'Dahulukan yang terdekat: keluarga dan kerabat yang membutuhkan, tetangga, lalu masyarakat yang lebih luas.',
  'Jangan menunda-nunda: tunaikan saat sehat, sebelum ajal atau berpindahnya harta ke ahli waris (Riyadhus Shalihin no. 90).',
  'Jangan meremehkan pemberian kecil — separuh kurma pun bernilai perisai dari neraka (Riyadhus Shalihin no. 139).',
  'Boleh disembunyikan maupun ditampakkan untuk memotivasi orang lain; yang disembunyikan umumnya lebih menjaga keikhlasan — pilih yang paling selamat bagi hatimu.',
  'Jangan mengharap balasan atau ucapan terima kasih dari manusia; cukuplah balasan dari Allah.',
];

export const DALIL_SEDEKAH = [
  {
    "id": "riyadhus-25",
    "judul": "Sedekah adalah bukti keimanan",
    "arab": "وَعَن أبي مَالكٍ الْحَارِثِ بْنِ عَاصِمٍ الأشْعَرِيِّ رضي الله عنه قَالَ: قَالَ رسولُ الله صلى الله عليه وسلم : «الطُّهُورُ شَطْرُ الإِيمَان، وَالْحَمْدُ لله تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ الله وَالْحَمْدُ لله تَمْلآنِ ــ أوْ تَمْلأُ ــ مَا بَيْنَ السَّمَاواتِ وَالأرْضِ، وَالصَّلاةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أوْ عَلَيْكَ. كُلُّ النَّاسِ يَغْدُو، فَبَائعٌ نَفْسَهُ فَمُعْتِقُهَا، أوْ مُوبِقُهَا» . رواه مسلم.",
    "terjemahan": "Abu Mālik Al-Ḥāriṡ bin 'Āṣim Al-Asy'ariy -raḍiyallāhu 'anhu- berkata: Rasulullah -ṣallallāhu 'alaihi wa sallam- bersabda, \"Bersuci itu setengah dari iman, ucapan alhamdulillah memenuhi timbangan, ucapan subḥānallāh dan alḥamdulillāh memenuhi antara langit dan bumi, salat adalah cahaya, sedekah adalah bukti, sabar sebagai sinar, dan Al-Qur`ān sebagai hujah yang akan membelamu atau yang akan memberatkanmu. Semua orang keluar bekerja di pagi hari lalu menjual dirinya; maka antara dia memerdekakannya atau membinasakannya. (HR. Muslim)",
    "sumberHadits": "HR. Muslim",
    "sumberData": "Riyadhus Shalihin no. 25 (Bab 3 — Sabar) — dataset aplikasi riyadhusData.js (IslamEnc / IslamHouse — Riyadhus Shalihin (riyadh.islamenc.com))"
  },
  {
    "id": "arbain-29",
    "judul": "Sedekah memadamkan kesalahan seperti air memadamkan api",
    "arab": "عَنْ مُعَاذِ بْنِ جَبَلٍ رضي الله عنه قَالَ: قُلْتُ: يَا رَسُولَ اللهِ، أَخْبِرْنِي بِعَمَلٍ يُدْخِلُنِيْ الْجَنَّةَ، وَيُبَاعِدُنِي عَنِ النَّارِ، قَالَ: لَقَدْ سَأَلْتَنِي عَنْ عَظِيمٍ وَإِنَّهُ لَيَسِيرٌ عَلَى مَن يَسَّرَهُ اللهُ عَلَيهِ: تَعْبُدَ اللهَ وَلَا تُشْرِكُ بِهِ شَيْئًا، وَتُقِيمُ الصَّلَاةَ، وَتُؤْتِي الزَّكَاةَ، وَتَصُومُ رَمَضَانَ، وَتَحُجُّ الْبَيْتَ. ثُمَّ قَالَ: أَلَا أَدُلُّكَ عَلَى أَبْوَابِ الْخَيْرِ؟ الصَّوْمُ جُنَّةٌ، والصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ، وَصَلَاةُ الرَّجُلِ فِي جَوْفِ اللَّيْلِ. قَالَ: ثُمَّ تَلَا: (تَتَجَافَى جُنُوبُهُمْ عَنِ الْمَضَاجِع)(السجدة: الآية ۱٦-۱٧) حَتَّى بَلَغَ (يَعْمَلُونَ) ثُمَّ قَالَ: أَلَا أُخْبِرُكَ بِرَأْسِ الأَمْرِ كُلِّهِ وَعَمُودِهِ وَذِرْوَةِ سَنَامِهِ؟ قُلْتُ: بَلَى يَا رَسُولَ اللهِ! قَالَ: رَأْسُ الأَمْرِ الإِسْلَامُ وَعَمُوْدُهُ الصَّلَاةُ وَذِرْوَةُ سَنَامِهِ الْجِهَادُ. ثُمَّ قَالَ: أَلَا أُخْبِرُكَ بِمَلَاكِ ذَلِكَ كُلِّهِ؟ قُلْتُ: بَلَى يَا نَبِيَّ اللهِ! فَأَخَذَ بِلِسَانِهِ وَقَالَ: كُفَّ عَلَيْكَ هَذَا! فَقُلْتُ: يَا نَبِيَّ اللهِ! وَإِنَّا لَمُؤَاخَذُوْنَ بِمَا نَتَكَلًّمُ بِهِ؟ فَقَالَ: ثَكِلَتْكَ أُمُّكَ يَا مُعَاذُ! وَهَلْ يُكَبُّ النَّاسُ فِي النَّارِ عَلَى وُجُوهِهِمْ -أَوْ قَالَ عَلَى مَنَاخِرِهِمْ- إِلَّا حَصَائِدُ أَلْسِنَتِهِمْ؟ رَوَاهُ التِّرْمِذِي وَقَالَ: حَدِيْثٌ حَسَنٌ صَحِيْحٌ.",
    "terjemahan": "Dari Muadz bin Jabal radhiyallahu ‘anhu dia berkata: Aku berkata: ”Wahai Rasulullah shallallahu ‘alaihi wa sallam, beritahukanlah kepadaku amalan yang dapat memasukkanku ke dalam surga dan menjauhkanku dari neraka! Beliau shallallahu ‘alaihi wa sallam bersabda: ”Sungguh engkau telah bertanya tentang sesuatu yang besar, namun sungguh hal tersebut sangatlah mudah dikerjakan bagi yang dimudahkan Allah, yaitu engkau hanya beribadah pada Allah subhanahu wa ta’ala semata dan tidak menyekutukanNya dengan sesuatu apapun, menegakkan shalat, menunaikan zakat, berpuasa pada bulan Ramadhan dan menunaikan ibadah haji.” Kemudian beliau shallallahu ‘alaihi wa sallam melanjutkan: ”Maukah aku tunjukkan kepadamu pintu-pintu kebaikan? Puasa itu adalah tameng, sedekah itu memadamkan(menghapuskan) kesalahan seperti air memadamkan api dan shalatnya seseorang pada tengah malam. Lalu beliau membaca: “Lambung-lambung mereka jauh dari tempat tidurnya.” (QS. As Sajdah : 16) Sampai pada firman-Nya: “Yang telah mereka kerjakan.” Kemudian beliau shallallahu ‘alaihi wa sallam kembali bersabda: “Maukah engkau aku beritahu pokok urusan agama ini, tiangnya dan puncak tertingginya?” Aku mengatakan: ‘Tentu, wahai Rasulullah. Beliau shallallahu ‘alaihi wa sallam melanjutkan: “Pokok segala urusan adalah Islam, tiangnya adalah shalat dan puncak tertingginya adalah jihad.” Kemudian beliau shallallahu ‘alaihi wa sallam berkata: “Maukah aku beritahu tentang sesuatu yang bisa menguatkan semua itu?” Aku menjawab: ‘Tentu, wahai Nabi Allah.’ Maka Beliau shallallahu ‘alaihi wa sallam memegang lisannya (lidahnya) dan bersabda: “Tahanlah (jagalah) ini!” Aku bertanya: ”Wahai Nabi Allah, apakah kita akan disiksa disebabkan apa yang kita ucapkan?” Beliau shallallahu ‘alaihi wa sallam bersabda: ”Celaka kamu! Bukankah banyak dari kalangan manusia yang tersungkur kedalam api neraka dengan mukanya terlebih dahulu -dalam riwayat lain: dengan lehernya terlebih dahulu- itu gara-gara buah ucapan lisannya?” Diriwayatkan oleh At-Tirmidzi dan berkata, “Hadis ini hasan shahih.”",
    "sumberHadits": "Shahih: Sunan At-Tirmidzi (no. 2616); Sunan Ibnu Majah (no. 3973); As-Sunan Al-Kubra lin Nasa’i (no. 11330); Musnad Ahmad (V/231, 236, 237, 245); dan Mushannaf Abdurrazzaq (no. 20303)",
    "sumberData": "Hadits Arbain an-Nawawi no. 29 — “Pintu-Pintu Kebaikan” — dataset aplikasi haditsArbainData.js (Dataset Hadits Arbain — github.com/Eucl1ds/arbain-nawawi)"
  },
  {
    "id": "riyadhus-90",
    "judul": "Sedekah yang paling besar pahalanya: saat sehat",
    "arab": "الرَّابع: عَنْ أَبِي هُرَيْرَةَ رضي الله عنه قَالَ: جَاءَ رَجُلٌ إلَىٰ النَّبِيِّ صلى الله عليه وسلم ، فَقَالَ: يا رَسُولَ الله! أَيُّ الصَّدَقَةِ أَعْظَمُ أجْراً؟ قَالَ: «أَنْ تَصَدَّقَ وَأَنْتَ صَحِيحٌ شَحيحٌ تَخْشَىٰ الْفَقْرَ، وَتَأْمُلُ الْغنَى، وَلاَ تُمْهِلُ حَتَّىٰ إِذَا بَلَغَت الْحُلْقُومَ قُلْتَ: لِفُلانٍ كَذَا وَلِفُلانٍ كَذَا، وَقَدْ كَانَ لِفُلانٍ» . مُتَّفَقٌ عَلَيْه.",
    "terjemahan": "Keempat: Abu Hurairah -raḍiyallāhu 'anhu- berkata, Seorang laki-laki datang kepada Nabi -ṣallallāhu 'alaihi wa sallam- seraya bertanya, \"Wahai Rasulullah! Sedekah apakah yang paling besar pahalanya?\" Beliau bersabda, \"Yaitu engkau bersedekah pada saat sehat dan kikir, saat engkau takut miskin dan berangan-angan kaya. Janganlah engkau menunda-nunda sedekah, hingga ketika nyawa telah sampai di tenggorokan, kamu baru berkata, 'Untuk si polan sekian dan untuk si polan sekian, padahal harta itu telah (berpindah) menjadi hak si polan (ahli waris).'\" (Muttafaq 'Alaih)",
    "sumberHadits": "Muttafaq 'Alaih (HR. Bukhari & Muslim)",
    "sumberData": "Riyadhus Shalihin no. 90 (Bab 10 — Bersegera melakukan kebaikan) — dataset aplikasi riyadhusData.js (IslamEnc / IslamHouse — Riyadhus Shalihin (riyadh.islamenc.com))"
  },
  {
    "id": "riyadhus-139",
    "judul": "Berlindung dari neraka walau dengan separuh kurma",
    "arab": "الثَّالثُ وَالعشْرُونَ: عَنْ عَدِيِّ بنِ حَاتِمٍ رضي الله عنه قال: سَمِعْتُ النَّبيَ صلى الله عليه وسلم يقول: «اتَّقُوا النَّارَ وَلَوْ بِشقِّ تَمْرَةٍ» . متفقٌ عليه.",
    "terjemahan": "Kedua puluh tiga: 'Adiy bin Ḥātim -raḍiyallāhu 'anhu- mengabarkan: Aku mendengar Nabi -ṣallallāhu 'alaihi wa sallam- bersabda, \"Berlindunglah kalian dari api neraka meskipun hanya dengan (bersedekah) separuh kurma.\" (Muttafaq ‘Alaih)",
    "sumberHadits": "Muttafaq 'Alaih (HR. Bukhari & Muslim)",
    "sumberData": "Riyadhus Shalihin no. 139 (Bab 13 — Penjelasan tentang banyaknya jalan kebaikan) — dataset aplikasi riyadhusData.js (IslamEnc / IslamHouse — Riyadhus Shalihin (riyadh.islamenc.com))"
  },
  {
    "id": "riyadhus-134",
    "judul": "Setiap kebaikan adalah sedekah",
    "arab": "الثَّامنَ عَشَرَ: عَنْ جَابِرٍ رضي الله عنه قال: قال رسولُ الله صلى الله عليه وسلم : «كُلُّ مَعْرُوفٍ صَدَقَةٌ» . رواه البخاري، ورواه مسلم مِن رواية حُذَيْفَةَ رضي الله عنه.",
    "terjemahan": "Kedelapan belas: Jābir -raḍiyallāhu 'anhu- berkata, Rasulullah -ṣallallāhu 'alaihi wa sallam- bersabda, \"Setiap kebaikan itu adalah sedekah.\" (HR. Bukhari) Juga diriwayatkan oleh Muslim dari jalur Ḥużaifah -raḍiyallāhu 'anhu-.",
    "sumberHadits": "HR. Bukhari",
    "sumberData": "Riyadhus Shalihin no. 134 (Bab 13 — Penjelasan tentang banyaknya jalan kebaikan) — dataset aplikasi riyadhusData.js (IslamEnc / IslamHouse — Riyadhus Shalihin (riyadh.islamenc.com))"
  }
];

export const AYAT_REFERENSI_SEDEKAH = [
  {
    "surahId": 5,
    "nomorAyat": 2,
    "referensi": "QS. Al-Ma'idah (5): 2",
    "tema": "Tolong-menolong dalam kebaikan dan takwa",
    "sumberData": "Daftar ayat pilihan aplikasi (ayatPilihanData.js) — teks Arab & terjemahan resmi dibaca di halaman surah terkait dalam aplikasi ini."
  },
  {
    "surahId": 2,
    "nomorAyat": 261,
    "referensi": "QS. Al-Baqarah (2): 261",
    "tema": "Perumpamaan orang yang menafkahkan hartanya di jalan Allah: satu biji menumbuhkan tujuh bulir, pada tiap bulir seratus biji — Allah melipatgandakan bagi siapa yang Dia kehendaki",
    "sumberData": "Ayat masyhur tentang infaq. Di sini hanya dicantumkan REFERENSINYA — teks Arab & terjemahan resmi (Kemenag via Quran.com, sumber data aplikasi ini) dibaca di halaman Surah Al-Baqarah ayat 261."
  },
  {
    "surahId": 2,
    "nomorAyat": 264,
    "referensi": "QS. Al-Baqarah (2): 264",
    "tema": "Jangan membatalkan pahala sedekah dengan mengungkit-ungkit pemberian dan menyakiti hati penerima",
    "sumberData": "Ayat masyhur tentang adab sedekah. Di sini hanya dicantumkan REFERENSINYA — teks Arab & terjemahan resmi dibaca di halaman Surah Al-Baqarah ayat 264."
  }
];
