// Data statis panduan haji, umrah & checklist perlengkapan (data layer).
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan menyalin buku manasik dan bukan fatwa. Talbiyah & doa di bawah
// adalah teks ibadah lazim yang masyhur.

export const DISCLAIMER_HAJI =
  'Ringkasan edukasi — bukan fatwa. Detail manasik dapat berbeda antarpendapat ulama dan mengikuti bimbingan resmi (Kemenag / KBIHU); untuk kasus khusus silakan rujuk pembimbing ibadah setempat.';

// ── Haji ────────────────────────────────────────────────────────
export const HAJI = {
  rukun: [
    {
      judul: 'Ihram (niat)',
      desc: 'Berniat ihram untuk haji dari miqat dengan memakai pakaian ihram dan menjauhi larangan ihram sejak niat diucapkan.',
    },
    {
      judul: 'Wukuf di Arafah',
      desc: 'Hadir di padang Arafah pada waktunya (siang hingga terbenam matahari tanggal 9 Dzulhijah) walau sejenak — ini inti haji.',
    },
    {
      judul: 'Thawaf ifadah',
      desc: 'Mengelilingi Ka\u2019bah tujuh putaran setelah kembali dari Arafah/Muzdalifah, dikerjakan setelah melontar jumrah aqabah.',
    },
    {
      judul: 'Sa\u2019i',
      desc: 'Berjalan antara bukit Shafa dan Marwah tujuh kali perjalanan, dimulai dari Shafa dan berakhir di Marwah.',
    },
    {
      judul: 'Tahallul (mencukur/memendekkan rambut)',
      desc: 'Mencukur gundul (afdhal bagi laki-laki) atau memendekkan rambut sebagai tanda keluar dari sebagian/seluruh larangan ihram.',
    },
    {
      judul: 'Tertib',
      desc: 'Mengerjakan rukun-rukun di atas secara berurutan sesuai urutannya.',
    },
  ],
  wajib: [
    'Ihram dari miqat — tempat yang telah ditentukan, tidak melewatinya tanpa ihram.',
    'Mabit (bermalam) di Muzdalifah pada malam 10 Dzulhijah.',
    'Mabit di Mina pada malam-malam hari tasyrik (11, 12, dan bagi yang nafar tsani juga 13 Dzulhijah).',
    'Melontar jumrah: aqabah pada 10 Dzulhijah, lalu ketiga jumrah (ula, wustha, aqabah) pada hari-hari tasyrik.',
    'Menjauhi larangan ihram, seperti memakai wewangian, memotong rambut/kuku, dan berburu.',
    'Thawaf wada\u2019 (perpisahan) sebelum meninggalkan Makkah — bagi yang tidak berhalangan.',
  ],
  // Urutan manasik per hari, ringkas.
  manasik: [
    {
      hari: '8 Dzulhijah — Hari Tarwiyah',
      desc: 'Berihram untuk haji dari tempat tinggal di Makkah, lalu menuju Mina dan bermalam di sana sambil memperbanyak talbiyah dan dzikir.',
    },
    {
      hari: '9 Dzulhijah — Wukuf di Arafah',
      desc: 'Setelah terbit matahari menuju Arafah. Wukuf dari tergelincir matahari sampai terbenam: perbanyak doa, dzikir, dan istighfar — waktu paling utama untuk berdoa.',
    },
    {
      hari: 'Malam 10 Dzulhijah — Muzdalifah',
      desc: 'Setelah maghrib bergerak ke Muzdalifah, sholat Maghrib dan Isya dijamak-qashar di sana, lalu bermalam dan mengumpulkan kerikil untuk melontar jumrah.',
    },
    {
      hari: '10 Dzulhijah — Hari Nahar',
      desc: 'Melontar jumrah aqabah (7 kerikil), menyembelih hadyu bagi yang wajib, tahallul awal dengan mencukur/memendekkan rambut, lalu thawaf ifadah dan sa\u2019i bagi yang belum sa\u2019i.',
    },
    {
      hari: '11–12 Dzulhijah — Hari Tasyrik',
      desc: 'Bermalam di Mina dan melontar ketiga jumrah setelah tergelincir matahari setiap harinya. Yang mengambil nafar awwal meninggalkan Mina sebelum maghrib tanggal 12.',
    },
    {
      hari: '13 Dzulhijah — Nafar Tsani',
      desc: 'Bagi yang bermalam hingga tanggal 13: melontar ketiga jumrah sekali lagi, lalu kembali ke Makkah.',
    },
    {
      hari: 'Sebelum pulang — Thawaf Wada\u2019',
      desc: 'Thawaf perpisahan tujuh putaran mengelilingi Ka\u2019bah sebagai penghormatan terakhir sebelum meninggalkan Makkah.',
    },
  ],
  talbiyah: {
    judul: 'Talbiyah',
    arab: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    latin: 'Labbaika Allāhumma labbaika, labbaika lā syarīka laka labbaik. Innal-hamda wan-ni\u2019mata laka wal-mulk, lā syarīka lak.',
    arti: 'Aku memenuhi panggilan-Mu, ya Allah, aku memenuhi panggilan-Mu. Aku memenuhi panggilan-Mu, tiada sekutu bagi-Mu, aku memenuhi panggilan-Mu. Sesungguhnya segala puji, nikmat, dan kerajaan adalah milik-Mu, tiada sekutu bagi-Mu.',
    keterangan: 'Dibaca berulang sejak ihram — dengan suara yang terdengar bagi laki-laki — sampai mulai melontar jumrah aqabah pada hari Nahar (untuk haji).',
  },
  doaLain: [
    {
      judul: 'Doa saat melihat Ka\u2019bah & di Multazam',
      arab: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً',
      latin: 'Allāhumma zid hādzal-baita tasyrīfan wa ta\u2019zhīman wa takrīman wa mahābah.',
      arti: 'Ya Allah, tambahkanlah rumah ini (Ka\u2019bah) kemuliaan, keagungan, kehormatan, dan kewibawaan.',
    },
    {
      judul: 'Doa antara Rukun Yamani dan Hajar Aswad',
      arab: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      latin: 'Rabbanā ātinā fid-dunyā hasanah wa fil-ākhirati hasanah wa qinā \u2019adzāban-nār.',
      arti: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka. (QS. Al-Baqarah: 201)',
    },
  ],
};

// ── Umrah ───────────────────────────────────────────────────────
export const UMRAH = {
  langkah: [
    {
      judul: 'Ihram dari miqat & niat',
      desc: 'Mandi sunnah, memakai pakaian ihram (laki-laki: dua helai kain tanpa jahitan; perempuan: pakaian yang menutup aurat seperti biasa), sholat sunnah ihram, lalu berniat umrah dan membaca talbiyah. Sejak niat, berlaku larangan ihram.',
    },
    {
      judul: 'Thawaf 7 putaran',
      desc: 'Memasuki Masjidil Haram dan mengelilingi Ka\u2019bah tujuh putaran berlawanan arah jarum jam, dimulai dan diakhiri sejajar Hajar Aswad, dalam keadaan suci dari hadas.',
    },
    {
      judul: 'Sholat 2 rakaat di Maqam Ibrahim',
      desc: 'Setelah thawaf, sholat dua rakaat di belakang Maqam Ibrahim (atau di tempat lain di masjid bila tidak memungkinkan), lalu disunnahkan minum air zamzam.',
    },
    {
      judul: 'Sa\u2019i Shafa–Marwah 7×',
      desc: 'Berjalan dari Shafa ke Marwah dihitung satu, kembali dari Marwah ke Shafa dihitung kedua, dan seterusnya hingga tujuh perjalanan berakhir di Marwah. Disunnahkan berlari kecil di antara dua tanda hijau bagi laki-laki.',
    },
    {
      judul: 'Tahallul',
      desc: 'Mencukur gundul atau memendekkan rambut (perempuan: memotong ujung rambut seujung jari). Dengan tahallul, umrah selesai dan larangan ihram berakhir.',
    },
  ],
  talbiyah: HAJI.talbiyah,
  perbedaan: [
    { aspek: 'Waktu', haji: 'Hanya pada bulan haji, puncaknya 9–13 Dzulhijah', umrah: 'Sepanjang tahun' },
    { aspek: 'Wukuf di Arafah', haji: 'Ada — rukun utama', umrah: 'Tidak ada' },
    { aspek: 'Mabit & melontar jumrah', haji: 'Ada di Muzdalifah dan Mina', umrah: 'Tidak ada' },
    { aspek: 'Hukum', haji: 'Wajib sekali seumur hidup bagi yang mampu', umrah: 'Sunnah muakkadah (sebagian ulama mewajibkan sekali)' },
    { aspek: 'Durasi rangkaian', haji: 'Beberapa hari', umrah: 'Beberapa jam dalam satu rangkaian' },
  ],
};

// ── Checklist perlengkapan ──────────────────────────────────────
// id stabil dipakai sebagai kunci penyimpanan di LocalChecklistHajiRepository.
export const CHECKLIST_HAJI = [
  {
    kategori: 'Dokumen',
    item: [
      { id: 'dok-paspor', label: 'Paspor yang masih berlaku' },
      { id: 'dok-visa', label: 'Visa haji/umrah' },
      { id: 'dok-tiket', label: 'Tiket pesawat & jadwal keberangkatan' },
      { id: 'dok-vaksin', label: 'Buku/kartu vaksin & keterangan sehat' },
      { id: 'dok-id', label: 'KTP & fotokopi dokumen penting' },
    ],
  },
  {
    kategori: 'Pakaian & Ihram',
    item: [
      { id: 'pak-ihram', label: 'Kain ihram (2 set untuk laki-laki)' },
      { id: 'pak-sabuk', label: 'Sabuk/ikat pinggang ihram' },
      { id: 'pak-sandal', label: 'Sandal yang nyaman & tidak menutup mata kaki' },
      { id: 'pak-sehari', label: 'Pakaian sehari-hari secukupnya' },
      { id: 'pak-dalam', label: 'Pakaian dalam & kaus kaki' },
      { id: 'pak-jaket', label: 'Jaket/sweater untuk perjalanan & ruangan ber-AC' },
    ],
  },
  {
    kategori: 'Kesehatan & Obat',
    item: [
      { id: 'kes-obat-pribadi', label: 'Obat pribadi rutin (stok cukup + resep)' },
      { id: 'kes-obat-umum', label: 'Obat umum: flu, batuk, diare, penurun panas' },
      { id: 'kes-vitamin', label: 'Vitamin & madu untuk daya tahan' },
      { id: 'kes-masker', label: 'Masker secukupnya' },
      { id: 'kes-pelembap', label: 'Pelembap kulit & bibir (tanpa pewangi saat ihram)' },
      { id: 'kes-minyak', label: 'Minyak angin / balsam & plester luka' },
    ],
  },
  {
    kategori: 'Ibadah',
    item: [
      { id: 'ibd-sajadah', label: 'Sajadah tipis untuk perjalanan' },
      { id: 'ibd-mukena', label: 'Mukena / pakaian sholat (perempuan)' },
      { id: 'ibd-tasbih', label: 'Tasbih / penghitung dzikir' },
      { id: 'ibd-buku-doa', label: 'Buku doa & panduan manasik' },
      { id: 'ibd-gunting', label: 'Gunting kecil untuk tahallul' },
    ],
  },
  {
    kategori: 'Lainnya',
    item: [
      { id: 'lain-tas', label: 'Tas selempang kecil untuk dokumen & uang' },
      { id: 'lain-uang', label: 'Uang tunai riyal & rupiah secukupnya' },
      { id: 'lain-charger', label: 'Charger, power bank & adaptor colokan' },
      { id: 'lain-botol', label: 'Botol minum kosong untuk air zamzam' },
      { id: 'lain-makanan', label: 'Makanan ringan tahan lama' },
      { id: 'lain-alat-mandi', label: 'Alat mandi tanpa pewangi (untuk saat ihram)' },
    ],
  },
];
