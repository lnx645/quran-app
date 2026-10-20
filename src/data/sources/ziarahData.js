// Data statis panduan ziarah kubur (data layer).
// Konten adab: ringkasan edukasi yang ditulis ulang dengan bahasa
// sendiri — bukan fatwa; praktik di lapangan mengikuti bimbingan
// guru/ustadz setempat.
// Teks doa TIDAK ditulis dari ingatan bebas:
//  - Salam ahli kubur: redaksi hadits masyhur riwayat Muslim.
//  - Doa untuk mayit: redaksi yang SUDAH ADA di aplikasi ini — dipakai
//    ulang persis dari bacaan takbir ketiga sholat jenazah di
//    sholatSunnahData.js (SHOLAT_JENAZAH.langkah[2].bacaan).

export const DISCLAIMER_ZIARAH =
  'Ringkasan edukasi — bukan fatwa. Amalan ziarah dapat berbeda dalam hal-hal cabang antarpendapat ulama dan kebiasaan setempat; ikuti bimbingan guru/ustadz setempat dan pengelola makam.';

export const CATATAN_SETEMPAT =
  'Di sebagian daerah ada amalan tambahan saat ziarah — misalnya tahlil bersama, membaca Yasin, atau urutan bacaan tertentu. Hal-hal cabang seperti ini dapat berbeda antarpendapat ulama dan kebiasaan setempat. Halaman ini hanya memuat adab dan doa yang redaksinya jelas bersumber; untuk amalan setempat, ikuti bimbingan guru/ustadz setempat.';

export const ZIARAH = {
  // Tujuan ziarah — ringkasan dari hadits izin ziarah kubur.
  pengantar: {
    judul: 'Tujuan Ziarah Kubur',
    isi: 'Ziarah kubur disyariatkan untuk dua tujuan utama: mengingat kematian dan kehidupan akhirat sehingga hati menjadi lembut dan jauh dari kelalaian, serta mendoakan ahli kubur — memohonkan ampunan dan rahmat bagi kaum muslimin yang telah wafat, terutama keluarga dan kerabat.',
    dalil:
      'Rasulullah ﷺ bersabda (maknanya): \u201CDahulu aku melarang kalian berziarah kubur, maka (sekarang) berziarahlah, karena ziarah itu mengingatkan pada kematian.\u201D',
    sumberDalil: 'HR. Muslim No. 977',
  },

  // Adab per fase: { judul, isi, sumber? }.
  fase: [
    {
      id: 'sebelum',
      judul: 'Sebelum Berangkat',
      daftar: [
        {
          judul: 'Luruskan niat',
          isi: 'Niatkan ziarah untuk mengingat mati dan mendoakan ahli kubur — bukan untuk meminta sesuatu kepada penghuni kubur atau mencari keberkahan dari kuburan itu sendiri.',
        },
        {
          judul: 'Berwudhu dan bersuci',
          isi: 'Berwudhu sebelum berangkat dianjurkan agar selama ziarah berada dalam keadaan suci, sebagaimana adab umum ketika hendak beribadah dan berdoa.',
        },
        {
          judul: 'Berpakaian sopan dan menutup aurat',
          isi: 'Kenakan pakaian yang sopan, bersih, dan menutup aurat. Hindari pakaian yang mencolok atau tidak pantas untuk suasana makam yang khidmat.',
        },
        {
          judul: 'Pilih waktu yang tepat',
          isi: 'Datanglah pada waktu kunjungan yang diizinkan pengelola makam, tidak mengganggu ketenangan lingkungan, dan tidak berdesakan hingga menyulitkan peziarah lain.',
        },
      ],
    },
    {
      id: 'selama',
      judul: 'Selama di Kuburan',
      daftar: [
        {
          judul: 'Ucapkan salam saat memasuki area makam',
          isi: 'Saat masuk area pemakaman, ucapkan salam kepada ahli kubur dengan doa salam pada seksi Doa di bawah ini, dengan suara yang cukup terdengar oleh diri sendiri.',
          sumber: 'HR. Muslim No. 975',
        },
        {
          judul: 'Jangan duduk, menginjak, atau bersandar pada kuburan',
          isi: 'Hormati kuburan: jangan duduk di atasnya, jangan menginjaknya, dan jangan menjadikannya sandaran atau tempat meletakkan barang.',
          sumber: 'HR. Muslim — larangan duduk di atas kubur',
        },
        {
          judul: 'Jangan sholat menghadap kuburan',
          isi: 'Tidak mengerjakan sholat dengan menghadap ke kuburan dan tidak menjadikan area kuburan sebagai tempat sholat.',
          sumber: 'HR. Muslim — larangan sholat menghadap kubur',
        },
        {
          judul: 'Jaga ketenangan dan kebersihan makam',
          isi: 'Berbicara seperlunya dengan suara pelan, tidak bercanda berlebihan, tidak meratap atau menangis dengan histeris, serta tidak membuang sampah atau merusak tanaman dan tanda makam.',
        },
        {
          judul: 'Baca Al-Qur\u2019an dan doakan ahli kubur',
          isi: 'Isi waktu ziarah dengan membaca Al-Qur\u2019an (lihat anjuran bacaan di bawah) dan memperbanyak doa untuk ahli kubur — terutama doa ampunan pada seksi Doa.',
        },
        {
          judul: 'Merenungi kematian',
          isi: 'Ambil pelajaran dari ziarah: yang dikubur dahulu hidup seperti kita, dan kita pun akan menyusul. Gunakan momen ini untuk muhasabah dan memperbaiki amal.',
        },
      ],
    },
    {
      id: 'sesudah',
      judul: 'Sesudah Ziarah',
      daftar: [
        {
          judul: 'Doakan mayit dan keluarganya',
          isi: 'Sebelum pulang, doakan kembali mayit yang diziarahi dan keluarga yang ditinggalkan agar diberi kesabaran dan keteguhan. Doa untuk mayit dapat dibaca dari seksi Doa di bawah ini.',
        },
        {
          judul: 'Lanjutkan dengan amal untuk mayit',
          isi: 'Amal yang manfaatnya sampai kepada mayit menurut penjelasan para ulama antara lain sedekah atas namanya, doa anak dan kerabat yang saleh, serta pelunasan utang dan wasiatnya bila masih ada.',
        },
        {
          judul: 'Jaga adab sampai meninggalkan makam',
          isi: 'Tinggalkan area makam dalam keadaan bersih dan tenang seperti saat datang, tanpa mengganggu peziarah lain yang masih berdoa.',
        },
      ],
    },
  ],

  // Daftar doa — arab + latin + arti + sumber, redaksi tidak dikarang.
  doa: [
    {
      judul: 'Salam kepada Ahli Kubur',
      keterangan: 'Diucapkan saat memasuki area pemakaman.',
      arab: 'السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَلَاحِقُونَ، أَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ',
      latin:
        "As-salamu 'alaikum ahlad-diyari minal-mu'minina wal-muslimin, wa inna insya Allahu bikum lahiqun, as-alullaha lana wa lakumul-'afiyah",
      arti: 'Keselamatan atas kalian, wahai penghuni (kubur) dari kalangan orang-orang mukmin dan muslim. Sesungguhnya kami, insya Allah, akan menyusul kalian. Aku memohon kepada Allah keselamatan untuk kami dan untuk kalian.',
      sumber: 'HR. Muslim No. 975',
    },
    {
      judul: 'Doa untuk Mayit',
      keterangan:
        'Doa ampunan untuk mayit yang diziarahi — redaksi sama dengan doa takbir ketiga pada sholat jenazah yang sudah ada di aplikasi ini (untuk jenazah laki-laki).',
      arab: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مَدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ',
      latin:
        "Allāhummaghfir lahu warhamhu wa 'āfihi wa'fu 'anhu, wa akrim nuzulahu, wa wassi' madkhalahu, waghsilhu bil-mā'i wats-tsalji wal-barad, wa naqqihi minal-khathāyā kamā yunaqqats-tsaubul-abyadhu minad-danas.",
      arti: 'Ya Allah, ampunilah dia, rahmatilah dia, selamatkanlah dia, dan maafkanlah dia. Muliakanlah tempat tinggalnya, lapangkanlah tempat masuknya, basuhlah dia dengan air, salju, dan embun, dan bersihkanlah dia dari kesalahan sebagaimana pakaian putih dibersihkan dari kotoran.',
      sumber: 'HR. Muslim No. 963',
      catatanPerempuan:
        'Untuk mayit perempuan, kata ganti laki-laki (hu/lahu) diganti kata ganti perempuan (hā/lahā): \u201CAllāhummaghfir lahā warhamhā wa \u2018āfihā wa\u2019fu \u2018anhā...\u201D dan seterusnya — sebagaimana catatan pada halaman Sholat Jenazah.',
    },
  ],

  // Anjuran bacaan: DIRUJUK namanya saja — teks lengkapnya dibaca dari
  // mushaf/fitur Al-Qur\u2019an di aplikasi ini, tidak diduplikasi di sini.
  bacaan: {
    judul: 'Anjuran Bacaan',
    isi: 'Selain doa-doa di atas, peziarah dapat membaca ayat/surah Al-Qur\u2019an lalu menghadiahkan pahalanya untuk mayit menurut bimbingan guru setempat. Bacaan yang lazim dirujuk:',
    daftar: [
      { nama: 'Surah Al-Fatihah', keterangan: 'Surah ke-1 — pembuka Al-Qur\u2019an' },
      { nama: 'Surah Al-Ikhlas', keterangan: 'Surah ke-112' },
      { nama: 'Surah Al-Falaq', keterangan: 'Surah ke-113' },
      { nama: 'Surah An-Nas', keterangan: 'Surah ke-114' },
    ],
    catatan:
      'Teks lengkap keempat surah di atas tersedia di fitur Al-Qur\u2019an aplikasi ini — buka daftar surah dan cari berdasarkan namanya.',
  },
};
