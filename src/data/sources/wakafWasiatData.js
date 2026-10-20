// Data statis edukasi wakaf & wasiat (data layer).
// Modul data TERPISAH: hanya diimpor oleh chunk halaman Wakaf & Wasiat,
// jangan impor dari komponen bersama/common agar tetap lazy-loaded.
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa dan bukan dokumen/akta hukum. Contoh redaksi wasiat di
// bawah ini murni bahan belajar, bukan dokumen hukum yang mengikat.

export const DISCLAIMER_WAKAF_WASIAT =
  'Ringkasan edukasi — bukan fatwa dan bukan dokumen hukum. Wakaf di Indonesia diatur undang-undang dan dicatatkan melalui nazhir serta Pejabat Pembuat Akta Ikrar Wakaf (PPAIW); wasiat dan pembagian waris sebaiknya dimusyawarahkan dengan ahli waris dan dikonsultasikan kepada notaris/PPAT serta ulama setempat.';

export const WAKAF = {
  pengertian:
    'Wakaf adalah menahan pokok harta dan menyalurkan manfaatnya di jalan kebaikan: harta wakaf tidak dijual, tidak diwariskan, dan tidak dihibahkan, sedangkan hasil/manfaatnya dipakai terus-menerus untuk kepentingan yang diniatkan wakif (pemberi wakaf). Karena manfaatnya mengalir terus, wakaf termasuk sedekah jariyah.',
  rukun: [
    {
      judul: 'Wakif',
      desc: 'Orang yang mewakafkan hartanya — berakal, dewasa, bertindak atas kehendak sendiri, dan pemilik sah harta yang diwakafkan.',
    },
    {
      judul: 'Mauquf (harta wakaf)',
      desc: 'Harta yang diwakafkan — bermanfaat, diketahui dengan jelas, dan dapat bertahan manfaatnya (atau diatur khusus untuk wakaf uang melalui lembaga yang berwenang).',
    },
    {
      judul: 'Mauquf \u2019alaih',
      desc: 'Pihak/tujuan penerima manfaat wakaf — misalnya masjid, sekolah, fakir miskin, atau kemaslahatan umum yang tidak bertentangan dengan syariat.',
    },
    {
      judul: 'Shighat (ikrar wakaf)',
      desc: 'Pernyataan wakif yang jelas bahwa hartanya diwakafkan. Di Indonesia ikrar dilakukan di hadapan PPAIW dan dituangkan dalam Akta Ikrar Wakaf.',
    },
    {
      judul: 'Nazhir',
      desc: 'Pengelola harta wakaf — perorangan, organisasi, atau badan hukum — yang wajib menjaga, mengembangkan sesuai peruntukan, dan melaporkan pengelolaan wakaf.',
    },
  ],
  jenis: [
    {
      judul: 'Wakaf tanah & bangunan',
      desc: 'Bentuk paling klasik: tanah untuk masjid, sekolah, pesantren, makam, atau fasilitas umum. Tanah wakaf dicatatkan agar terlindungi statusnya dan tidak beralih fungsi sembarangan.',
    },
    {
      judul: 'Wakaf uang',
      desc: 'Wakaf berupa uang yang pokoknya dikelola secara produktif oleh nazhir/lembaga keuangan syariah penerima wakaf uang, lalu hasilnya disalurkan untuk kemaslahatan. Pokok wakaf tidak boleh berkurang.',
    },
    {
      judul: 'Wakaf benda bergerak & manfaat',
      desc: 'Misalnya Al-Qur\u2019an dan buku untuk perpustakaan, ambulans, peralatan masjid, atau wakaf manfaat/jasa dalam bentuk yang diatur nazhir. Yang penting: jelas hartanya, jelas peruntukannya, dan tercatat pengelolaannya.',
    },
  ],
  dalil: {
    arab: 'إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ: إِلَّا مِنْ صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
    arti: 'Apabila manusia meninggal dunia, terputuslah amalnya kecuali dari tiga perkara: sedekah jariyah, ilmu yang bermanfaat, atau anak saleh yang mendoakannya.',
    sumber: 'Hadits masyhur (HR Muslim) — wakaf adalah wujud utama sedekah jariyah',
  },
  catatan:
    'Di Indonesia, wakaf diatur dalam UU No. 41 Tahun 2004 tentang Wakaf. Wakaf tanah wajib didaftarkan; wakaf uang disalurkan melalui lembaga keuangan syariah yang ditunjuk. Pilih nazhir yang amanah dan transparan laporannya.',
};

export const WASIAT = {
  pengertian:
    'Wasiat adalah pesan seseorang tentang hartanya yang dilaksanakan setelah ia wafat — misalnya menyisihkan sebagian harta untuk kerabat yang tidak mendapat waris, anak yatim, atau amal kebaikan. Wasiat dilaksanakan setelah biaya pengurusan jenazah dan pelunasan utang pewaris.',
  poin: [
    {
      judul: 'Batas maksimal sepertiga harta',
      desc: 'Wasiat harta berlaku paling banyak 1/3 (sepertiga) dari sisa harta setelah utang dilunasi. Ketentuan ini berdasarkan pengarahan Rasulullah ﷺ kepada Sa\u2019d bin Abi Waqqash (hadits masyhur HR Bukhari & Muslim): sepertiga pun sudah dinilai banyak. Kelebihan dari 1/3 hanya berlaku bila seluruh ahli waris merelakannya setelah pewaris wafat.',
    },
    {
      judul: 'Tidak untuk ahli waris',
      desc: 'Wasiat tidak boleh ditujukan kepada orang yang sudah menjadi ahli waris — karena bagiannya telah ditetapkan dalam hukum waris (faraidh) — kecuali bila seluruh ahli waris lain menyetujuinya setelah pewaris wafat.',
    },
    {
      judul: 'Urutan sebelum wasiat dijalankan',
      desc: 'Dari harta peninggalan: pertama biaya pengurusan jenazah sewajarnya, kedua pelunasan utang pewaris, ketiga pelaksanaan wasiat (maksimal 1/3), barulah sisanya dibagi kepada ahli waris menurut faraidh.',
    },
    {
      judul: 'Ditulis dan disaksikan',
      desc: 'Wasiat dianjurkan ditulis semasa sehat dan disaksikan orang yang amanah, agar tidak menimbulkan sengketa. Isinya boleh diubah selama pewaris masih hidup. Jangan menunda menulis kebaikan yang ingin diwasiatkan.',
    },
  ],
  contohRedaksi: [
    'CONTOH REDAKSI — BAHAN EDUKASI, BUKAN DOKUMEN HUKUM',
    'Saya yang bertanda tangan di bawah ini, [nama lengkap], dalam keadaan sehat akal, dengan ini berwasiat: setelah saya wafat, setelah biaya pengurusan jenazah dan seluruh utang saya dilunasi, saya wasiatkan sebesar [jumlah/persentase, maksimal 1/3 sisa harta] kepada [nama penerima / lembaga, yang bukan ahli waris saya] untuk [tujuan kebaikan yang jelas].',
    'Wasiat ini saya buat dengan sadar dan tanpa paksaan. Saya mohon ahli waris saya bermusyawarah dengan baik dalam melaksanakannya, dan saya sarankan wasiat ini dikonsultasikan serta dicatatkan melalui notaris agar kuat secara hukum.',
  ],
  catatan:
    'Redaksi di atas hanyalah contoh untuk memahami unsur-unsur wasiat. Untuk kekuatan hukum di Indonesia, buatlah wasiat melalui notaris (mis. wasiat olografis yang dititipkan atau akta wasiat umum) dan musyawarahkan dengan ahli waris sejak awal agar tidak menimbulkan perselisihan.',
};
