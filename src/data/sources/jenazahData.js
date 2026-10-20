// Data statis panduan penyelenggaraan jenazah (data layer).
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa; praktik di lapangan mengikuti arahan modin/ustadz dan
// adat setempat yang tidak bertentangan dengan syariat.

export const DISCLAIMER_JENAZAH =
  'Ringkasan edukasi — bukan fatwa. Penyelenggaraan jenazah di lapangan sebaiknya didampingi modin, ustadz, atau pihak yang berpengalaman; untuk kasus khusus silakan rujuk ulama setempat.';

export const JENAZAH = {
  // Hal yang dilakukan saat sakaratulmaut & segera setelah wafat.
  sebelum: {
    judul: 'Saat Sakaratulmaut & Segera Setelah Wafat',
    daftar: [
      'Di samping orang yang sedang sakaratulmaut: talqinkan kalimat \u201cLā ilāha illallāh\u201d dengan lembut tanpa memaksa, dan bacakan surah Yasin bila memungkinkan.',
      'Hadapkan ke arah kiblat (miring ke kanan menghadap kiblat) semampunya.',
      'Setelah ruh berpisah: pejamkan matanya dan doakan, ikat dagunya agar mulut tidak terbuka, dan luruskan persendiannya dengan lembut sebelum kaku.',
      'Tutup seluruh tubuhnya dengan kain, letakkan benda ringan di atas perut agar tidak mengembung, dan jauhkan dari tangisan yang meratap berlebihan.',
      'Segerakan pengurusan jenazah dan lunasi utangnya dari harta peninggalannya; kabari keluarga dan kerabat.',
    ],
  },
  tahap: [
    {
      nomor: 1,
      judul: 'Memandikan',
      ringkas:
        'Memandikan jenazah hukumnya fardhu kifayah. Jenazah dimandikan di tempat tertutup, hanya oleh orang yang diperlukan, dengan menjaga aurat dan kehormatannya.',
      poin: [
        'Syarat singkat: jenazah seorang muslim, jasadnya ada (walau sebagian), dan bukan orang yang mati syahid di medan perang (yang tidak dimandikan menurut ketentuan).',
        'Yang memandikan: laki-laki dimandikan laki-laki, perempuan dimandikan perempuan — kecuali pasangan suami-istri dan mahram sesuai ketentuan. Mengutamakan keluarga terdekat yang amanah dan paham tata caranya.',
        'Urutan ringkas: letakkan jenazah terlentang sedikit terangkat bagian atasnya, tekan perut perlahan untuk mengeluarkan sisa kotoran, bersihkan najis, lalu wudhukan seperti wudhu orang hidup (tanpa berkumur/istinsyaq berlebihan).',
        'Basuh seluruh tubuh dengan air bersih — dianjurkan bilangan ganjil (3, 5, atau lebih bila perlu): mulai dari sisi kanan dan anggota wudhu, gunakan air bidara/sabun pada basuhan awal dan air kapur barus pada basuhan terakhir.',
        'Keringkan dengan handuk, dan bila diperlukan beri wewangian pada tubuh dan lipatan-lipatannya.',
      ],
    },
    {
      nomor: 2,
      judul: 'Mengkafani',
      ringkas:
        'Mengkafani dengan kain putih bersih yang menutup seluruh tubuh, dari harta peninggalan jenazah, secukupnya tanpa berlebihan.',
      poin: [
        'Laki-laki: tiga lapis kain kafan putih — digelar bertumpuk, jenazah diletakkan di atasnya, lalu dilipat dari sisi kiri dan kanan secara bergantian, dan diikat dengan tali pengikat (di kepala, tengah, dan kaki) yang akan dilepas di kubur.',
        'Perempuan: lima lapis — sarung (kain bawah), kerudung kepala, gamis/baju, dan dua lapis kain pembungkus seluruh tubuh.',
        'Beri kain dan kapas secukupnya pada bagian yang memerlukan, dan wewangian (misalnya kapur barus) di antara lipatan kain.',
        'Kepala dan kaki ditutup sempurna; ikatan dibuat simpul yang mudah dilepas setelah jenazah dimasukkan ke liang kubur.',
      ],
    },
    {
      nomor: 3,
      judul: 'Menyolatkan',
      ringkas:
        'Sholat jenazah adalah fardhu kifayah: empat takbir tanpa rukuk dan sujud, dilakukan setelah jenazah dimandikan dan dikafani, sebelum dikuburkan.',
      poin: [
        'Jenazah diletakkan di depan jamaah; imam berdiri sejajar kepala jenazah laki-laki atau sejajar tengah/pinggang jenazah perempuan.',
        'Makmum yang hadir semakin banyak semakin baik; keluarga mengajak tetangga dan jamaah masjid untuk ikut menyolatkan.',
      ],
      tautan: { ke: '/sholat-jenazah', label: 'Buka Panduan Sholat Jenazah' },
    },
    {
      nomor: 4,
      judul: 'Menguburkan',
      ringkas:
        'Menguburkan jenazah adalah tahap terakhir fardhu kifayah — dikerjakan dengan segera, tenang, dan penuh hormat.',
      poin: [
        'Liang lahad (ceruk di sisi kiblat dasar kubur) dianjurkan bila tanahnya keras; bila tanah gembur dipakai syaqq (galian di tengah). Kedalaman kubur kira-kira setinggi orang berdiri dengan tangan terangkat agar bau tidak tercium dan aman dari binatang.',
        'Jenazah dimasukkan dari arah kaki kubur (kepala lebih dulu dari sisi kiblat menurut kelaziman setempat), diletakkan miring ke kanan menghadap kiblat, dengan pipi kanan menempel tanah bila memungkinkan.',
        'Lepaskan ikatan kain kafan, ganjal punggungnya dengan tanah agar tidak terlentang kembali, lalu tutup lahad dengan papan/bambu sebelum ditimbun tanah.',
        'Doa masyhur saat meletakkan jenazah: \u201cBismillāhi wa \u2018alā millati Rasūlillāh\u201d — Dengan nama Allah dan di atas agama Rasulullah. Setelah penguburan selesai, dianjurkan berhenti sejenak untuk mendoakan jenazah dan memohonkan keteguhan untuknya.',
      ],
    },
  ],
};
