// Data statis panduan aqiqah & kurban (data layer).
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa. Ketentuan dapat berbeda antarpendapat ulama; untuk
// pelaksanaan silakan rujuk ulama / panitia kurban setempat.

export const DISCLAIMER_AQIQAH_KURBAN =
  'Ringkasan edukasi — bukan fatwa. Untuk kasus khusus (misalnya nazar, kurban patungan, atau aqiqah yang tertunda hingga dewasa), silakan rujuk ulama atau panitia setempat.';

export const AQIQAH = {
  pengertian:
    'Aqiqah adalah penyembelihan hewan sebagai ungkapan syukur atas kelahiran seorang anak, disertai pemberian nama yang baik dan mencukur rambut bayi. Hukumnya sunnah muakkadah bagi orang tua yang mampu.',
  poin: [
    { judul: 'Waktu', desc: 'Disunnahkan pada hari ke-7 dari kelahiran; bila belum mampu, pada hari ke-14, lalu hari ke-21, atau kapan pun setelahnya saat mampu.' },
    { judul: 'Jumlah hewan', desc: 'Anak laki-laki: 2 ekor kambing/domba. Anak perempuan: 1 ekor kambing/domba. Hewan aqiqah disyaratkan sehat dan cukup umur seperti hewan kurban.' },
    { judul: 'Pembagian', desc: 'Daging aqiqah dianjurkan dimasak terlebih dahulu lalu dibagikan/dihidangkan kepada keluarga, tetangga, dan fakir miskin; sebagian pendapat membolehkan dibagikan mentah.' },
    { judul: 'Cukur rambut & nama baik', desc: 'Pada hari aqiqah, rambut bayi dicukur dan bayi diberi nama yang baik. Disunnahkan bersedekah perak (atau senilai uang) seberat rambut yang dicukur.' },
    { judul: 'Sunnah terkait lainnya', desc: 'Mentahnik bayi (mengoleskan kurma yang dikunyah lembut ke langit-langit mulut bayi) oleh orang saleh, dan mendoakan keberkahan untuk sang anak.' },
  ],
};

export const KURBAN = {
  pengertian:
    'Kurban (udhhiyah) adalah penyembelihan hewan tertentu pada hari Idul Adha dan hari-hari tasyrik sebagai bentuk taqarrub kepada Allah, meneladani keikhlasan Nabi Ibrahim \u2018alaihissalam.',
  syaratHewan: [
    { jenis: 'Unta', umur: 'Minimal 5 tahun (masuk tahun ke-6)' },
    { jenis: 'Sapi / kerbau', umur: 'Minimal 2 tahun (masuk tahun ke-3)' },
    { jenis: 'Kambing', umur: 'Minimal 1 tahun (masuk tahun ke-2)' },
    { jenis: 'Domba', umur: 'Minimal 6 bulan (jadza\u2019ah) dengan postur gemuk/sehat' },
  ],
  poin: [
    { judul: 'Syarat umum hewan', desc: 'Hewan harus sehat dan tidak cacat yang jelas: tidak buta sebelah yang nyata, tidak pincang yang parah, tidak sakit yang jelas, dan tidak kurus kering hingga tidak bersumsum. Bukan hewan hasil curian dan dimiliki secara sah.' },
    { judul: 'Batas peserta', desc: 'Unta dan sapi/kerbau: untuk 7 orang. Kambing dan domba: untuk 1 orang (boleh diniatkan pahalanya untuk diri dan keluarga).' },
    { judul: 'Waktu penyembelihan', desc: 'Mulai setelah sholat Idul Adha pada 10 Dzulhijah hingga terbenam matahari pada 13 Dzulhijah (akhir hari tasyrik). Penyembelihan sebelum sholat Id tidak terhitung kurban.' },
    { judul: 'Pembagian daging', desc: 'Pembagian yang masyhur: sepertiga untuk yang berkurban dan keluarganya, sepertiga dihadiahkan kepada kerabat/tetangga, dan sepertiga disedekahkan kepada fakir miskin. Kulit dan bagian lain hewan tidak boleh dijadikan upah bagi penyembelih, tetapi boleh disedekahkan.' },
  ],
};
