// Data statis panduan wudhu & tayammum (data layer).
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa; untuk kasus khusus silakan rujuk ulama setempat.
// Al-Fatihah & doa di bawah adalah teks ibadah lazim.

export const DISCLAIMER_PANDUAN =
  'Ringkasan edukasi — bukan fatwa. Untuk kasus khusus, silakan rujuk ulama atau guru setempat.';

// ── Wudhu ───────────────────────────────────────────────────────
// Langkah mengikuti urutan tertib yang lazim diajarkan: niat menyertai
// basuhan wajah, lalu anggota wudhu berurutan sampai kaki.
export const WUDHU = {
  langkah: [
    {
      judul: 'Niat & membaca basmalah',
      desc: 'Berniat dalam hati untuk berwudhu karena Allah, lalu membaca basmalah dan membasuh kedua telapak tangan tiga kali.',
    },
    {
      judul: 'Berkumur & membersihkan hidung',
      desc: 'Berkumur tiga kali, lalu menghirup air ke hidung dan mengeluarkannya tiga kali. Bagian ini sunnah yang sangat dianjurkan.',
    },
    {
      judul: 'Membasuh wajah',
      desc: 'Membasuh seluruh wajah tiga kali — dari tempat tumbuh rambut kepala sampai dagu, dan dari telinga ke telinga. Niat wudhu dibaca ketika air pertama kali menyentuh wajah.',
    },
    {
      judul: 'Membasuh tangan sampai siku',
      desc: 'Membasuh tangan kanan sampai siku tiga kali, lalu tangan kiri sampai siku tiga kali. Pastikan air merata termasuk sela-sela jari.',
    },
    {
      judul: 'Mengusap kepala',
      desc: 'Mengusap sebagian atau seluruh kepala dengan tangan yang basah, satu kali. Bagi yang berambut, usap dari depan ke belakang lalu kembali ke depan.',
    },
    {
      judul: 'Mengusap telinga',
      desc: 'Mengusap bagian luar dan dalam kedua telinga dengan air yang baru, satu kali. Langkah ini sunnah yang melengkapi usapan kepala.',
    },
    {
      judul: 'Membasuh kaki sampai mata kaki',
      desc: 'Membasuh kaki kanan sampai mata kaki tiga kali, lalu kaki kiri sampai mata kaki tiga kali, termasuk sela-sela jari kaki.',
    },
    {
      judul: 'Tertib & doa sesudah wudhu',
      desc: 'Seluruh langkah dilakukan berurutan tanpa diselingi jeda panjang (tertib dan muwalat). Akhiri dengan doa sesudah wudhu di bawah ini.',
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
    arab: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    latin: "Asyhadu allā ilāha illallāhu wahdahu lā syarīka lah, wa asyhadu anna Muhammadan 'abduhu wa rasūluh. Allāhummaj'alnī minat-tawwābīn waj'alnī minal-mutathahhirīn.",
    arti: 'Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk orang-orang yang bertaubat dan jadikanlah aku termasuk orang-orang yang bersuci.',
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
    arab: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    latin: "Asyhadu allā ilāha illallāhu wahdahu lā syarīka lah, wa asyhadu anna Muhammadan 'abduhu wa rasūluh. Allāhummaj'alnī minat-tawwābīn waj'alnī minal-mutathahhirīn.",
    arti: 'Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk orang-orang yang bertaubat dan jadikanlah aku termasuk orang-orang yang bersuci.',
    keterangan: 'Setelah tayammum, boleh membaca doa yang sama seperti doa sesudah wudhu.',
  },
};
