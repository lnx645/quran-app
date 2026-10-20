/**
 * Dataset: Peristiwa Islam — 4 peringatan hari besar (data layer).
 *
 * Isi ditulis ORISINAL untuk aplikasi Noor (ringkasan edukatif netral),
 * bukan salinan dari buku/situs mana pun. Nada dijaga hati-hati:
 * - Tanggal yang masyhur dipakai untuk peringatan disebutkan apa adanya,
 *   termasuk catatan bila ulama berbeda pendapat soal tanggal pastinya.
 * - Untuk Maulid Nabi: dijelaskan ragam sikap ulama secara seimbang,
 *   TANPA menetapkan hukum (bid'ah/haram/wajib dsb.) bagi pembaca.
 * - "Kegiatan yang umum dilakukan" = praktik yang lazim dijumpai di
 *   masyarakat, disajikan sebagai informasi, bukan penetapan syariat.
 * - Dalil/rujukan hanya yang pasti & dapat dicek: ayat Al-Qur'an dengan
 *   nomor surah-ayat yang terverifikasi.
 *
 * `slug` dipakai sebagai jangkar (#slug) di halaman /peristiwa dan
 * ditautkan dari KalenderPage (daftar Hari Besar Islam).
 */

export const PERISTIWA_ISLAM = [
  {
    slug: 'tahun-baru-hijriah',
    nama: 'Tahun Baru Hijriah',
    tanggalHijriah: '1 Muharram',
    ringkasan: [
      'Tahun Baru Hijriah menandai pergantian tahun dalam kalender Hijriah, yaitu kalender Islam yang perhitungannya dimulai dari peristiwa hijrah (perpindahan) Nabi Muhammad ﷺ dari Makkah ke Madinah pada tahun 622 Masehi.',
      'Sistem penanggalan Hijriah ditetapkan sebagai penanggalan resmi pada masa pemerintahan Khalifah Umar bin Khattab. Peristiwa hijrah dipilih sebagai titik awal karena menjadi tonggak penting lahirnya masyarakat Islam di Madinah.',
      'Bulan Muharram sendiri termasuk salah satu dari empat bulan haram (bulan yang dimuliakan) yang disebut dalam Al-Qur\u2019an. Karena itu, awal tahun Hijriah lazim dijadikan momen berhenti sejenak untuk mengevaluasi diri (muhasabah) dan menyusun niat kebaikan untuk tahun yang baru.',
    ],
    kegiatan: [
      'Muhasabah: mengevaluasi amal dan kebiasaan selama setahun terakhir',
      'Menyusun tekad/resolusi kebaikan untuk tahun yang baru',
      'Sebagian masyarakat membaca doa akhir tahun dan awal tahun secara berjamaah',
      'Memperbanyak istighfar, dzikir, dan sedekah',
      'Mengikuti majelis ilmu atau kajian bertema hijrah dan perbaikan diri',
    ],
    rujukan: [
      {
        teks: '\u201CSesungguhnya bilangan bulan di sisi Allah ialah dua belas bulan, dalam ketetapan Allah di waktu Dia menciptakan langit dan bumi, di antaranya empat bulan haram.\u201D',
        sumber: 'QS. At-Taubah [9]: 36 — Muharram adalah salah satu dari empat bulan haram',
      },
    ],
  },
  {
    slug: 'maulid-nabi',
    nama: 'Maulid Nabi Muhammad ﷺ',
    tanggalHijriah: '12 Rabiul Awal',
    ringkasan: [
      'Maulid Nabi adalah peringatan hari kelahiran Nabi Muhammad ﷺ. Tanggal 12 Rabiul Awal adalah tanggal yang masyhur dan dipakai secara umum untuk peringatan ini; mengenai tanggal pasti kelahiran beliau, para ulama sirah memiliki beberapa pendapat.',
      'Peringatan Maulid telah berlangsung berabad-abad dan dijumpai di banyak negeri Muslim, termasuk Indonesia, dengan bentuk yang beragam: ada yang mengisi dengan kajian sirah, pembacaan shalawat, hingga berbagi makanan kepada tetangga dan fakir miskin.',
      'Tentang hukum memeringatinya, sikap ulama beragam dan telah lama dibahas dalam kitab-kitab mereka: sebagian ulama dan masyarakat memeringatinya sebagai ungkapan rasa syukur dan kecintaan kepada Nabi ﷺ serta sarana dakwah, sedangkan sebagian lain memilih tidak memeringatinya karena menilai tidak ada contoh langsung dari generasi pertama Islam. Perbedaan pendapat seperti ini adalah bagian dari khazanah keilmuan Islam, dan halaman ini mengajak pembaca menyikapinya dengan saling menghormati.',
    ],
    kegiatan: [
      'Majelis ilmu dan kajian sirah (sejarah kehidupan) Nabi Muhammad ﷺ',
      'Memperbanyak membaca shalawat',
      'Sedekah dan berbagi makanan',
      'Di sebagian daerah: pembacaan kitab maulid dan syair pujian secara berjamaah',
      'Meneladani akhlak Nabi ﷺ dalam keseharian, misalnya kejujuran dan kasih sayang',
    ],
    rujukan: [
      {
        teks: '\u201CSesungguhnya Allah dan para malaikat-Nya bershalawat untuk Nabi. Wahai orang-orang yang beriman, bershalawatlah kamu untuk Nabi dan ucapkanlah salam dengan penuh penghormatan kepadanya.\u201D',
        sumber: 'QS. Al-Ahzab [33]: 56 — perintah bershalawat kepada Nabi ﷺ',
      },
    ],
  },
  {
    slug: 'isra-miraj',
    nama: "Isra Mi'raj Nabi Muhammad ﷺ",
    tanggalHijriah: '27 Rajab',
    ringkasan: [
      "Isra Mi'raj adalah peristiwa perjalanan agung Nabi Muhammad ﷺ dalam satu malam: Isra, perjalanan dari Masjidil Haram di Makkah ke Masjidil Aqsha di Palestina, dilanjutkan Mi'raj, perjalanan naik beliau ke langit hingga Sidratul Muntaha.",
      'Tanggal 27 Rajab adalah tanggal yang masyhur dipakai untuk memeringati peristiwa ini; para ulama berbeda pendapat mengenai waktu pastinya. Peristiwa ini terjadi pada masa sulit dakwah di Makkah, setelah wafatnya Abu Thalib dan Siti Khadijah.',
      "Momen terpenting dari Mi'raj adalah ditetapkannya kewajiban sholat lima waktu bagi umat Islam — karena itu peristiwa ini juga menjadi pengingat tentang kedudukan sholat sebagai tiang agama.",
    ],
    kegiatan: [
      'Majelis ilmu dan kajian tentang kisah Isra Mi\u2019raj',
      'Muhasabah kualitas sholat lima waktu dan berupaya menjaganya tepat waktu',
      'Memperbanyak shalawat dan dzikir',
      'Sholat sunnah dan doa pada malam harinya, sebagaimana dilakukan sebagian masyarakat',
    ],
    rujukan: [
      {
        teks: '\u201CMahasuci (Allah) yang telah memperjalankan hamba-Nya (Muhammad) pada malam hari dari Masjidil Haram ke Masjidil Aqsha yang telah Kami berkahi sekelilingnya agar Kami perlihatkan kepadanya sebagian tanda-tanda (kebesaran) Kami.\u201D',
        sumber: "QS. Al-Isra' [17]: 1 — dasar peristiwa Isra",
      },
      {
        teks: 'Peristiwa Mi\u2019raj dan pertemuan Nabi ﷺ di langit juga diceritakan dalam QS. An-Najm [53]: 13\u201318.',
        sumber: 'QS. An-Najm [53]: 13\u201318',
      },
    ],
  },
  {
    slug: 'nuzulul-quran',
    nama: "Nuzulul Qur'an",
    tanggalHijriah: '17 Ramadhan',
    ringkasan: [
      "Nuzulul Qur'an adalah peringatan turunnya Al-Qur'an. Wahyu pertama yang diterima Nabi Muhammad ﷺ di Gua Hira adalah lima ayat pertama Surah Al-'Alaq, yang memerintahkan membaca dengan nama Allah.",
      "Al-Qur'an menegaskan bahwa Al-Qur'an diturunkan pada bulan Ramadhan, pada malam yang penuh berkah (Lailatul Qadar). Di Indonesia, peringatan Nuzulul Qur'an secara umum diselenggarakan pada malam 17 Ramadhan, dan tanggal ini yang lazim dipakai dalam kalender peringatan nasional.",
      "Peringatan ini menjadi pengingat untuk mendekatkan diri kembali kepada Al-Qur'an: membacanya, memahami maknanya, dan mengamalkan petunjuknya — terutama di bulan Ramadhan, bulan diturunkannya Al-Qur'an.",
    ],
    kegiatan: [
      'Tadarus dan khataman Al-Qur\u2019an bersama di masjid atau di rumah',
      'Majelis ilmu dan kajian tafsir ayat-ayat pilihan',
      'Memperbanyak membaca Al-Qur\u2019an beserta terjemahannya',
      'Sedekah dan berbagi hidangan berbuka puasa',
      'Menghidupkan malam Ramadhan dengan sholat malam dan doa',
    ],
    rujukan: [
      {
        teks: '\u201CBulan Ramadhan adalah (bulan) yang di dalamnya diturunkan Al-Qur\u2019an sebagai petunjuk bagi manusia dan penjelasan-penjelasan mengenai petunjuk itu dan pembeda (antara yang benar dan yang batil).\u201D',
        sumber: 'QS. Al-Baqarah [2]: 185',
      },
      {
        teks: '\u201CSesungguhnya Kami telah menurunkannya (Al-Qur\u2019an) pada malam Qadar.\u201D',
        sumber: 'QS. Al-Qadr [97]: 1',
      },
      {
        teks: '\u201CBacalah dengan (menyebut) nama Tuhanmu yang menciptakan.\u201D',
        sumber: "QS. Al-'Alaq [96]: 1 — ayat pertama wahyu yang turun di Gua Hira",
      },
    ],
  },
];
