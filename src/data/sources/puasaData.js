// Data statis panduan puasa, niat & doa berbuka (data layer).
// Modul data TERPISAH: hanya diimpor oleh chunk halaman panduan puasa,
// jangan impor dari komponen bersama/common agar tetap lazy-loaded.
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa; untuk kasus khusus silakan rujuk ulama setempat.
// Teks Arab & latin doa di bawah adalah teks ibadah lazim.

export const DISCLAIMER_PUASA =
  'Ringkasan edukasi — bukan fatwa. Untuk kasus khusus, silakan rujuk ulama atau guru setempat.';

// ── Niat & doa ────────────────────────────────────────────────────
export const NIAT_DOA = [
  {
    judul: 'Niat Puasa Ramadhan',
    keterangan:
      'Dibaca pada malam hari sebelum terbit fajar, karena niat puasa wajib diinapkan sebelum fajar.',
    arab: 'نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلَّهِ تَعَالَى',
    latin:
      'Nawaitu shauma ghadin ‘an adā-i fardhi syahri Ramadhāna hādzihis-sanati lillāhi ta‘ālā.',
    arti:
      'Saya berniat berpuasa esok hari untuk menunaikan kewajiban bulan Ramadhan tahun ini karena Allah Ta‘ala.',
  },
  {
    judul: 'Niat Puasa Sunnah',
    keterangan:
      'Untuk puasa sunnah, niat boleh dipasang pada pagi/siang hari selama belum melakukan hal yang membatalkan puasa sejak fajar.',
    arab: 'نَوَيْتُ صَوْمَ يَوْمِ الْخَمِيسِ سُنَّةً لِلَّهِ تَعَالَى',
    latin: 'Nawaitu shauma yaumil-khamīsi sunnatan lillāhi ta‘ālā.',
    arti:
      'Saya berniat puasa sunnah hari Kamis karena Allah Ta‘ala. (Ganti “Kamis” dengan hari yang dikehendaki.)',
  },
  {
    judul: 'Doa Berbuka Puasa (masyhur)',
    keterangan: 'Doa yang masyhur dibaca setelah berbuka, sesuai riwayat Abu Dawud.',
    arab: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
    latin:
      'Dzahabazh-zhama-u wabtallatil-‘urūqu wa tsabatal-ajru in syā-allāh.',
    arti:
      'Telah hilang dahaga, telah basah kerongkongan, dan telah ditetapkan pahala, insya Allah.',
  },
  {
    judul: 'Doa Berbuka (ringkas)',
    keterangan: 'Doa berbuka yang ringkas dan banyak diamalkan.',
    arab: 'اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
    latin: 'Allāhumma laka shumtu wa ‘alā rizqika afthartu.',
    arti:
      'Ya Allah, untuk-Mu aku berpuasa dan atas rezeki-Mu aku berbuka.',
  },
];

// ── Panduan puasa ─────────────────────────────────────────────────
export const PANDUAN_PUASA = {
  pengertian: {
    judul: 'Pengertian Puasa',
    isi: 'Puasa (shaum/shiyam) adalah menahan diri dari makan, minum, dan segala hal yang membatalkan puasa, sejak terbit fajar sampai terbenam matahari, dengan niat karena Allah. Puasa Ramadhan adalah salah satu rukun Islam yang diwajibkan bagi setiap Muslim yang memenuhi syarat.',
  },
  syaratWajib: {
    judul: 'Syarat Wajib Puasa',
    daftar: [
      'Muslim — puasa tidak wajib bagi non-Muslim.',
      'Baligh — telah mencapai usia dewasa secara syariat.',
      'Berakal — tidak wajib bagi yang hilang akalnya.',
      'Mampu — mampu menunaikan puasa secara fisik maupun keadaan.',
      'Mukim — tidak sedang dalam perjalanan jauh (safar) yang dibolehkan.',
      'Suci dari haid dan nifas — khusus bagi perempuan.',
    ],
  },
  rukun: {
    judul: 'Rukun Puasa',
    daftar: [
      'Niat — untuk puasa Ramadhan niat diinapkan pada malam hari sebelum fajar.',
      'Menahan diri dari segala yang membatalkan puasa sejak terbit fajar hingga terbenam matahari.',
    ],
  },
  pembatal: {
    judul: 'Hal-hal yang Membatalkan Puasa',
    daftar: [
      'Makan atau minum dengan sengaja.',
      'Berhubungan suami istri di siang hari.',
      'Keluar mani dengan disengaja.',
      'Muntah dengan disengaja.',
      'Haid atau nifas — puasa perempuan batal dengan keluarnya darah haid/nifas.',
      'Murtad — keluar dari Islam.',
    ],
  },
  tidakMembatalkan: {
    judul: 'Hal yang Tidak Membatalkan Puasa',
    daftar: [
      'Lupa makan atau minum — puasa tetap sah, lanjutkan.',
      'Berkumur dan menghirup air ke hidung saat wudhu, selama tidak berlebihan.',
      'Mandi atau mendinginkan badan karena haus/panas.',
      'Menggosok gigi di pagi hari, tanpa menelan pasta gigi.',
      'Kumur obat kumur, muntah tanpa disengaja, atau keluar mani tanpa disengaja (misalnya mimpi basah).',
    ],
  },
  keringanan: {
    judul: 'Yang Boleh Tidak Berpuasa & Konsekuensinya',
    daftar: [
      'Orang sakit yang dikhawatirkan membahayakan dirinya — wajib qadha setelah sembuh.',
      'Musafir (sedang safar jauh) — wajib qadha setelah kembali.',
      'Perempuan haid atau nifas — wajib qadha setelah suci.',
      'Ibu hamil atau menyusui yang khawatir pada diri atau bayinya — qadha, atau qadha + fidyah menurut sebagian ulama.',
      'Lansia yang tidak mampu berpuasa — membayar fidyah (memberi makan fakir miskin) untuk tiap hari yang ditinggalkan.',
      'Pekerja berat yang sangat terdesak — boleh berbuka lalu mengqadha di hari lain.',
    ],
    catatan:
      'Besaran dan cara fidyah mengikuti ketentuan setempat. Untuk kasus pribadi, tanyakan pada ulama atau lembaga yang berwenang.',
  },
  keutamaan: {
    judul: 'Keutamaan Ramadhan',
    daftar: [
      'Bulan penuh berkah: pintu surga dibuka, pintu neraka ditutup, setan-setan dibelenggu.',
      'Terdapat malam Lailatul Qadar yang lebih baik dari seribu bulan, pada sepuluh malam terakhir.',
      'Puasa melatih kesabaran, kejujuran, dan kepedulian kepada fakir miskin.',
      'Doa orang yang berpuasa — terutama saat berbuka — sangat mustajab.',
      'Sholat Tarawih, tadarus Al-Qur’an, dan sedekah dianjurkan untuk dilipatgandakan.',
    ],
  },
  puasaSunnah: {
    judul: 'Puasa Sunnah (ringkas)',
    daftar: [
      'Senin & Kamis — hari amalan diangkat kepada Allah.',
      'Puasa Ayyamul Bidh (13, 14, 15 tiap bulan Hijriah) — seperti puasa setahun pahalanya.',
      'Puasa Arafah (9 Dzulhijjah) — menghapus dosa setahun lalu dan setahun akan datang.',
      'Puasa Asyura (10 Muharram), dianjurkan disertai 9 atau 11 Muharram.',
      'Puasa Syawal (6 hari di bulan Syawal) — seperti berpuasa setahun.',
      'Puasa Daud — sehari puasa sehari berbuka, puasa sunnah yang paling utama.',
    ],
  },
};
