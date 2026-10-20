// Data statis panduan wudhu & tayammum (data layer).
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa; untuk kasus khusus silakan rujuk ulama setempat.
// Al-Fatihah & doa di bawah adalah teks ibadah lazim.

export const DISCLAIMER_PANDUAN =
  'Ringkasan edukasi — bukan fatwa. Untuk kasus khusus, silakan rujuk ulama atau guru setempat.';

// ── Wudhu ───────────────────────────────────────────────────────
// Urutan & substansi langkah mengikuti panduan guru pengguna
// (PDF "Tata Cara Wudhu Yang Benar Beserta Gambarnya"): delapan
// langkah dari basmalah & basuh tangan sampai membasuh kaki, dengan
// niat menyertai basuhan wajah. Teks langkah adalah pengetahuan
// fikih umum; ilustrasinya karya orisinal proyek (bukan pindaian
// dari buku/PDF mana pun).
export const WUDHU = {
  langkah: [
    {
      judul: 'Membaca basmalah & mencuci kedua tangan',
      desc: 'Membaca "bismillaahirrohmaanirrohiim" sambil mencuci kedua belah tangan sampai pergelangan tangan hingga bersih.',
    },
    {
      judul: 'Berkumur-kumur',
      desc: 'Berkumur-kumur sambil membersihkan gigi jika ada sisa-sisa makanan.',
    },
    {
      judul: 'Mencuci lubang hidung',
      desc: 'Mencuci lubang hidung 3 kali dari kotoran yang ada di dalamnya.',
    },
    {
      judul: 'Mencuci muka',
      desc: 'Mencuci muka 3 kali, mulai dari tempat tumbuhnya rambut kepala hingga bawah dagu dan dari telinga kanan hingga telinga kiri, sambil niat wudhu dengan lafadz berikut:',
      niat: {
        arab: 'نَوَيْتُ الْوُضُوْءَ لِرَفْعِ الْحَدَثِ الْأَصْغَرِ فَرْضًا لِلّٰهِ تَعَالَى',
        latin: "Nawaitul Wudluu a Liraf'il Hadastil Ashghari Fardlan Lillaahita'ala",
        arti: 'Aku niat berwudhu untuk menghilangkan hadas kecil, fardhu karena Allah.',
      },
    },
    {
      judul: 'Mencuci kedua tangan hingga siku',
      desc: 'Kemudian mencuci kedua belah tangan hingga siku-siku, sebanyak 3 kali.',
    },
    {
      judul: 'Membasahi sebagian rambut kepala',
      desc: 'Kemudian membasahi sebagian rambut kepala, sebanyak 3 kali.',
    },
    {
      judul: 'Mencuci kedua telinga',
      desc: 'Kemudian mencuci kedua telinga.',
    },
    {
      judul: 'Mencuci kedua kaki',
      desc: 'Dan yang terakhir, mencuci kedua kaki hingga di atas mata kaki, sebanyak 3 kali.',
    },
  ],
  pembatal: [
    'Keluarnya sesuatu dari dua jalan (buang air kecil/besar atau kentut).',
    'Tidur lelap yang tidak dalam posisi duduk tetap.',
    'Hilang akal karena pingsan, mabuk, atau sebab lain.',
    'Menyentuh kemaluan dengan telapak tangan tanpa penghalang.',
    'Bersentuhan kulit dengan lawan jenis yang bukan mahram (menurut mazhab Syafi\u2019i).',
  ],
  doaSesudah: {
    arab: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ. اَللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ وَاجْعَلْنِيْ مِنْ عِبَادِكَ الصَّالِحِيْنَ',
    latin: "Asyhadu Alla Ila Haillallaah Wahdahu Laa Syariika Lahu Wa Asyhadu Anna Muhammadan Abduhu Wa Rasuuluhu, Alloohummaj'alni Minattawwaabiina Waj'alni Minal Mutathahhiriina Waj'alni Min Ibadi Kash Shaalihiin",
    arti: 'Aku bersaksi tiada Tuhan melainkan Allah dan tidak ada yang menyekutukan bagi-Nya. Dan aku bersaksi bahwa Nabi Muhammad adalah utusan-Nya. Ya Allah jadikanlah aku orang yang ahli taubat, dan jadikanlah aku orang yang suci dan jadikanlah aku dari golongan orang-orang yang shaleh.',
    keterangan:
      'Setelah berwudhu, disunnahkan membaca doa ini dan menghadap kiblat sambil mengangkat kedua tangan.',
  },
};

// ── Tayammum ────────────────────────────────────────────────────
// Bersuci dengan debu/tanah suci ketika air tidak tersedia atau
// tidak bisa dipakai.
export const TAYAMMUM = {
  syarat: [
    'Tidak menemukan air setelah berusaha mencarinya, atau air yang ada tidak mencukupi.',
    'Tidak mampu memakai air, misalnya karena sakit yang dikhawatirkan bertambah parah.',
    'Sudah masuk waktu sholat.',
    'Memakai debu atau tanah yang suci dan berdebu (bukan lumpur basah atau benda licin).',
  ],
  langkah: [
    {
      judul: 'Niat',
      desc: 'Berniat dalam hati untuk bertayammum sebagai pengganti wudhu atau mandi wajib agar diperbolehkan sholat.',
    },
    {
      judul: 'Menepuk debu',
      desc: 'Letakkan kedua telapak tangan di atas permukaan berdebu yang suci dengan jari-jari direnggangkan, lalu tiup atau kibaskan debu yang berlebihan.',
    },
    {
      judul: 'Mengusap wajah',
      desc: 'Usapkan kedua telapak tangan ke seluruh wajah satu kali, seperti mengusap lembut dari atas ke bawah.',
    },
    {
      judul: 'Mengusap kedua tangan',
      desc: 'Tepuk debu sekali lagi, lalu usap punggung tangan kanan dengan telapak tangan kiri, dan punggung tangan kiri dengan telapak tangan kanan — sampai pergelangan tangan (sebagian ulama sampai siku).',
    },
  ],
  catatan:
    'Tayammum batal karena hal-hal yang membatalkan wudhu, dan juga ketika air sudah ditemukan sebelum sholat dimulai. Satu kali tayammum dipakai untuk satu sholat fardhu.',
  doaSesudah: {
    arab: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ. اَللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ وَاجْعَلْنِيْ مِنْ عِبَادِكَ الصَّالِحِيْنَ',
    latin: "Asyhadu Alla Ila Haillallaah Wahdahu Laa Syariika Lahu Wa Asyhadu Anna Muhammadan Abduhu Wa Rasuuluhu, Alloohummaj'alni Minattawwaabiina Waj'alni Minal Mutathahhiriina Waj'alni Min Ibadi Kash Shaalihiin",
    arti: 'Aku bersaksi tiada Tuhan melainkan Allah dan tidak ada yang menyekutukan bagi-Nya. Dan aku bersaksi bahwa Nabi Muhammad adalah utusan-Nya. Ya Allah jadikanlah aku orang yang ahli taubat, dan jadikanlah aku orang yang suci dan jadikanlah aku dari golongan orang-orang yang shaleh.',
    keterangan: 'Setelah tayammum, boleh membaca doa yang sama seperti doa sesudah wudhu.',
  },
};
