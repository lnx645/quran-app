// Data statis edukasi fikih muamalah (data layer).
// Modul data TERPISAH: hanya diimpor oleh chunk halaman Muamalah,
// jangan impor dari komponen bersama/common agar tetap lazy-loaded.
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa dan bukan nasihat keuangan/hukum. Untuk transaksi nyata
// yang rumit, rujuk ulama dan ahli keuangan syariah setempat.

export const DISCLAIMER_MUAMALAH =
  'Ringkasan edukasi — bukan fatwa dan bukan nasihat keuangan atau hukum. Ketentuan muamalah pada kasus nyata dapat berbeda menurut konteks dan pendapat ulama; untuk akad dan transaksi penting, silakan rujuk ulama serta ahli keuangan syariah setempat.';

export const PENGANTAR_MUAMALAH =
  'Muamalah adalah aturan Islam dalam hubungan antarmanusia di bidang harta: jual beli, utang-piutang, gadai, dan upah. Prinsip dasarnya: harta diperoleh dengan cara yang halal, atas dasar saling rida, tanpa riba, tanpa penipuan, dan tanpa ketidakjelasan yang merugikan salah satu pihak.';

export const MUAMALAH_BAGIAN = [
  {
    id: 'riba',
    judul: 'Riba',
    pengertian:
      'Riba adalah tambahan yang disyaratkan dalam pertukaran barang ribawi atau dalam utang-piutang, tanpa imbalan yang dibenarkan syariat. Riba diharamkan secara tegas dalam Al-Qur\u2019an dan termasuk dosa besar.',
    poin: [
      {
        judul: 'Riba fadhl',
        desc: 'Kelebihan pada pertukaran barang ribawi sejenis secara tunai, misalnya menukar 1 kg emas dengan 1,2 kg emas, atau beras sejenis dengan takaran berbeda. Barang ribawi sejenis yang ditukar harus sama takarannya dan tunai.',
      },
      {
        judul: 'Riba nasi\u2019ah',
        desc: 'Tambahan karena penundaan waktu — bentuk yang umum adalah bunga utang: pokok dikembalikan lebih besar hanya karena waktu pembayaran ditunda. Inilah riba jahiliah yang paling tegas diharamkan.',
      },
      {
        judul: 'Barang ribawi yang masyhur',
        desc: 'Emas, perak, dan bahan makanan pokok yang ditakar/ditimbang (dalam hadits: gandum, jewawut, kurma, garam). Mata uang kertas diqiyaskan kepada emas-perak, sehingga pertukaran mata uang sejenis harus sama nilainya dan tunai.',
      },
      {
        judul: 'Sikap seorang muslim',
        desc: 'Menjauhi akad yang mengandung bunga/riba, membaca syarat produk keuangan dengan teliti, dan memilih alternatif syariah bila tersedia. Bila terlanjur terlibat, bertobat dan berupaya keluar dari akad ribawi semampunya.',
      },
    ],
    dalil: {
      arab: 'وَأَحَلَّ ٱللَّهُ ٱلْبَيْعَ وَحَرَّمَ ٱلرِّبَوٰٓا۟',
      arti: '“…Padahal Allah telah menghalalkan jual beli dan mengharamkan riba…”',
      sumber: 'QS Al-Baqarah ayat 275',
    },
  },
  {
    id: 'utang-piutang',
    judul: 'Utang-Piutang (Qardh)',
    pengertian:
      'Utang-piutang pada asalnya adalah akad tolong-menolong: pemilik harta meminjamkan hartanya, dan peminjam wajib mengembalikan sejumlah yang sama. Karena itu mencatat dan menepatinya adalah bagian dari amanah.',
    poin: [
      {
        judul: 'Adab berutang',
        desc: 'Berutang hanya untuk kebutuhan nyata, bukan gaya hidup; berniat sungguh-sungguh untuk melunasi; memberitahu keadaan sebenarnya kepada pemberi utang; dan mendahulukan pelunasan utang sebelum bersedekah sunnah atau membeli hal yang tidak mendesak.',
      },
      {
        judul: 'Mencatat utang',
        desc: 'Utang yang jatuh temponya di masa depan dianjurkan ditulis dengan jelas: jumlah, waktu pelunasan, dan disaksikan. Ayat terpanjang dalam Al-Qur\u2019an justru mengatur pencatatan utang agar tidak ada pihak yang dirugikan atau lupa.',
      },
      {
        judul: 'Memberi tenggang bagi yang kesulitan',
        desc: 'Pemberi utang dianjurkan memberi kelonggaran waktu kepada peminjam yang benar-benar kesulitan, bahkan menyedekahkan sebagian/seluruh utang dinilai lebih baik. Menagih tetap dengan cara yang baik, tanpa mempermalukan.',
      },
      {
        judul: 'Bahaya menunda padahal mampu',
        desc: 'Menunda pembayaran padahal mampu adalah kezaliman (hadits masyhur HR Bukhari & Muslim). Utang yang belum lunas tetap menjadi tanggungan seseorang sampai dilunasi, sehingga melunasinya tidak boleh diremehkan.',
      },
    ],
    dalil: {
      arab: 'وَإِن كَانَ ذُو عُسْرَةٍۢ فَنَظِرَةٌ إِلَىٰ مَيْسَرَةٍۢ ۚ وَأَن تَصَدَّقُوا۟ خَيْرٌۭ لَّكُمْ',
      arti: '“Jika (orang berutang itu) dalam kesulitan, berilah tenggang sampai dia berkelapangan. Dan menyedekahkan (sebagian atau semua utang) itu lebih baik bagimu, jika kamu mengetahui.”',
      sumber: 'QS Al-Baqarah ayat 280; pencatatan utang diatur pada ayat 282',
    },
  },
  {
    id: 'jual-beli',
    judul: 'Jual Beli',
    pengertian:
      'Jual beli adalah pertukaran harta dengan harta atas dasar saling rida. Ia halal pada asalnya, dan menjadi tidak sah atau terlarang bila rukun dan syaratnya tidak terpenuhi atau mengandung unsur yang diharamkan.',
    poin: [
      {
        judul: 'Syarat sah jual beli',
        desc: 'Penjual dan pembeli berakal dan bertindak atas kehendak sendiri (tanpa paksaan); barangnya halal, bermanfaat, milik penjual atau ia berwenang menjualnya, dapat diserahkan, serta diketahui sifat dan ukurannya; harga jelas; dan ada ijab-kabul (kesepakatan) yang menunjukkan keridaan kedua pihak.',
      },
      {
        judul: 'Khiyar (hak memilih)',
        desc: 'Khiyar majlis: kedua pihak masih boleh membatalkan selama belum berpisah dari majelis akad. Khiyar syarat: hak membatalkan dalam tempo yang disepakati. Khiyar \u2019aib: pembeli boleh mengembalikan barang bila menemukan cacat yang tidak diketahui saat akad.',
      },
      {
        judul: 'Larangan gharar',
        desc: 'Gharar adalah ketidakjelasan besar pada barang, harga, atau penyerahan yang berpotensi menimbulkan perselisihan — misalnya menjual barang yang belum ada/tidak dapat diserahkan, atau menjual sesuatu yang isinya tidak diketahui. Jual beli harus jelas objek dan konsekuensinya.',
      },
      {
        judul: 'Larangan najasy dan penipuan',
        desc: 'Najasy adalah menawar barang bukan untuk membeli, melainkan sekadar menaikkan harga agar orang lain tertipu — ini dilarang. Demikian pula menyembunyikan cacat barang, mengurangi takaran/timbangan, dan sumpah palsu dalam berdagang.',
      },
    ],
    dalil: {
      arab: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ لَا تَأْكُلُوٓا۟ أَمْوَٰلَكُم بَيْنَكُم بِٱلْبَـٰطِلِ إِلَّآ أَن تَكُونَ تِجَـٰرَةً عَن تَرَاضٍۢ مِّنكُمْ',
      arti: '“Wahai orang-orang yang beriman, janganlah kamu saling memakan harta sesamamu dengan jalan yang batil, kecuali dengan jalan perniagaan yang berlaku dengan suka sama suka di antara kamu…”',
      sumber: 'QS An-Nisa ayat 29',
    },
  },
  {
    id: 'rahn',
    judul: 'Gadai (Rahn)',
    pengertian:
      'Rahn adalah menjadikan suatu barang berharga sebagai jaminan utang, agar utang dapat dilunasi dari barang itu bila peminjam tidak mampu membayar. Gadai dibolehkan dalam keadaan bermukim maupun safar, terutama bila pencatatan utang tidak memungkinkan.',
    poin: [
      {
        judul: 'Unsur gadai',
        desc: 'Ada pihak yang berutang (rahin), pemberi utang penerima gadai (murtahin), barang jaminan (marhun) yang bernilai dan dapat dijual, utang yang jelas (marhun bih), serta ijab-kabul akad gadai.',
      },
      {
        judul: 'Ketentuan barang gadai',
        desc: 'Barang gadai tetap milik penggadai; penerima gadai menjaganya sebagai amanah dan tidak boleh memanfaatkannya tanpa izin pemiliknya. Biaya pemeliharaan dan risiko barang pada dasarnya mengikuti kepemilikan, sesuai kesepakatan yang adil.',
      },
      {
        judul: 'Saat jatuh tempo',
        desc: 'Bila utang tidak terlunasi pada waktunya, barang gadai dapat dijual untuk melunasi utang: hasil penjualan dipakai membayar utang dan kelebihannya dikembalikan kepada pemilik barang; bila kurang, sisanya tetap menjadi tanggungan yang berutang.',
      },
    ],
    dalil: {
      arab: 'فَرِهَـٰنٌۭ مَّقْبُوضَةٌۭ',
      arti: '“…maka hendaklah ada barang tanggungan (jaminan) yang dipegang (oleh yang berpiutang)…”',
      sumber: 'QS Al-Baqarah ayat 283',
    },
  },
  {
    id: 'ijarah',
    judul: 'Upah & Sewa (Ijarah) — Sekilas',
    pengertian:
      'Ijarah adalah akad atas manfaat — jasa pekerjaan atau pemakaian barang — dengan imbalan upah/sewa yang jelas. Ia adalah dasar kebolehan bekerja sebagai karyawan, buruh, guru, maupun menyewakan properti dan alat.',
    poin: [
      {
        judul: 'Yang harus jelas di awal',
        desc: 'Jenis pekerjaan atau manfaat yang disewa, masa/waktu kerja, dan jumlah upah harus disepakati dengan jelas sebelum pekerjaan dimulai, agar tidak timbul perselisihan di kemudian hari.',
      },
      {
        judul: 'Adab pemberi kerja',
        desc: 'Membayar upah tepat waktu sesuai kesepakatan — dalam hadits masyhur dianjurkan memberi upah pekerja sebelum kering keringatnya (HR Ibnu Majah) — tidak membebani di luar kemampuan dan kesepakatan, serta memperlakukan pekerja dengan manusiawi.',
      },
      {
        judul: 'Adab pekerja',
        desc: 'Menunaikan pekerjaan dengan amanah dan sebaik-baiknya (itqan), menjaga waktu dan kepercayaan pemberi kerja, dan tidak mengambil upah untuk pekerjaan yang tidak dikerjakan.',
      },
    ],
    dalil: null,
  },
];
