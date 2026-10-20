// Data statis fikih keluarga (data layer): menyusui/radha\u2019ah, khitan,
// pendidikan anak & nafkah keluarga.
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa. Perbedaan pendapat ulama disebutkan apa adanya tanpa
// menghakimi salah satu pihak; untuk praktik silakan rujuk ulama setempat.

export const DISCLAIMER_KELUARGA =
  'Ringkasan edukasi — bukan fatwa. Beberapa ketentuan di halaman ini diperselisihkan para ulama; perbedaan itu disebutkan apa adanya. Untuk kasus nyata di keluarga Anda, silakan rujuk ulama atau pihak yang berwenang setempat.';

// ── Menyusui / radha\u2019ah ──────────────────────────────────────
export const MENYUSUI = {
  pengertian:
    'Menyusui (radha\u2019ah) bukan hanya soal gizi: susuan tertentu menjadikan anak dan keluarga ibu susu sebagai mahram — tidak boleh dinikahi selamanya — sebagaimana mahram karena nasab. Allah berfirman: \u201CDiharamkan atas kamu (menikahi) \u2026 ibu-ibumu yang menyusui kamu (ibu persusuan) dan saudara-saudaramu sepersusuan \u2026\u201D (QS. An-Nisa\u2019: 23). Nabi shallallahu \u2019alaihi wasallam juga bersabda: \u201CDiharamkan karena persusuan apa yang diharamkan karena nasab.\u201D (HR. Bukhari & Muslim). Masa menyusui yang disebut Al-Qur\u2019an adalah dua tahun penuh bagi yang ingin menyempurnakan penyusuan (QS. Al-Baqarah: 233).',
  poin: [
    { judul: 'Siapa saja yang menjadi mahram persusuan', desc: 'Ibu susu (perempuan yang menyusui), suami ibu susu (ayah susu), anak-anak ibu susu (saudara sepersusuan), dan kerabat lain mengikuti pola mahram nasab. Anak yang disusui haram menikah dengan mereka selamanya.' },
    { judul: 'Air susu sampai ke perut bayi', desc: 'Para ulama sepakat susuan yang berpengaruh adalah ASI yang benar-benar masuk ke perut bayi melalui menyusu langsung (atau cara lain yang diperselisihkan detailnya), bukan sekadar menempel sebentar tanpa mengisap.' },
    { judul: 'Batas usia bayi', desc: 'Jumhur ulama mensyaratkan susuan terjadi pada masa menyusui, yaitu sebelum anak berusia dua tahun (hijriah). Susuan setelah usia itu menurut jumhur tidak menjadikan mahram; sebagian kecil ulama berpendapat lain.' },
    { judul: 'Jumlah susuan — ada perbedaan pendapat', desc: 'Mazhab Syafi\u2019i dan Hanbali: minimal lima kali susuan yang terpisah-pisah (berdasarkan hadits \u2019Aisyah radhiyallahu \u2019anha, HR. Muslim), dan satu susuan dihitung dari bayi menyusu hingga melepaskannya sendiri. Mazhab Hanafi dan Maliki: berapapun jumlahnya — sedikit maupun banyak — sudah menjadikan mahram. Keduanya berpegang pada dalil masing-masing; halaman ini tidak menilai mana yang lebih kuat.' },
    { judul: 'Catat & pastikan statusnya', desc: 'Karena dampaknya seumur hidup, keluarga dianjurkan mencatat siapa menyusui siapa dan berapa kali, agar jelas status mahram anak di kemudian hari. Bila ragu tentang suatu kasus, konsultasikan kepada ulama sebelum akad nikah dilangsungkan.' },
  ],
};

// ── Khitan ──────────────────────────────────────────────────────
export const KHITAN = {
  pengertian:
    'Khitan adalah memotong kulit yang menutupi ujung kemaluan laki-laki (dan dengan cara yang berbeda pada perempuan). Khitan termasuk fitrah yang diajarkan agama — Nabi Ibrahim \u2019alaihissalam berkhitan, dan Nabi shallallahu \u2019alaihi wasallam menyebut khitan sebagai salah satu dari lima fitrah (HR. Bukhari & Muslim).',
  poin: [
    { judul: 'Hukum bagi laki-laki — perbedaan pendapat', desc: 'Mazhab Syafi\u2019i dan Hanbali: wajib. Mazhab Hanafi dan Maliki: sunnah muakkadah (sangat ditekankan, mendekati wajib). Semua mazhab sepakat khitan laki-laki adalah syiar Islam yang sangat ditekankan dan tidak ditinggalkan tanpa uzur.' },
    { judul: 'Hukum bagi perempuan — perbedaan pendapat', desc: 'Para ulama berbeda pendapat lebih luas: sebagian menyebutnya sunnah, sebagian menyebutnya kemuliaan (makrumah), dan sebagian mewajibkannya. Praktiknya berbeda-beda antarnegara dan budaya; rujuk ulama dan tenaga medis setempat untuk ketentuan yang aman.' },
    { judul: 'Waktu pelaksanaan', desc: 'Tidak ada batas waktu yang disepakati secara mutlak. Sebagian ulama menganjurkan pada hari ke-7 kelahiran (sekaligus aqiqah), sebagian menganjurkan saat anak menjelang baligh, dan banyak keluarga melaksanakannya pada usia sekolah. Yang terpenting: dilakukan sebelum baligh menurut pendapat yang mewajibkan, dan dengan cara yang aman.' },
    { judul: 'Keselamatan & kebersihan', desc: 'Lakukan khitan melalui dokter/tenaga medis berkompeten dengan alat steril. Sisi kebersihan dan kesehatan adalah hikmah khitan yang juga diakui dunia medis; bila ada kondisi medis khusus pada anak, dahulukan arahan dokter.' },
  ],
};

// ── Pendidikan anak ─────────────────────────────────────────────
// Tahapan sunnah & pendidikan anak dari lahir hingga usia perintah sholat.
// Untuk aqiqah, halaman ini sengaja hanya merujuk halaman Aqiqah & Kurban.
export const PENDIDIKAN_ANAK = {
  tahapan: [
    {
      judul: 'Adzan di telinga bayi yang baru lahir',
      desc: 'Dinukil bahwa Nabi shallallahu \u2019alaihi wasallam mengumandangkan adzan di telinga Al-Hasan saat baru dilahirkan (HR. Abu Dawud & Tirmidzi). Para ulama menganjurkannya agar kalimat tauhid menjadi suara pertama yang didengar bayi: adzan di telinga kanan, dan sebagian menambahkan iqamah di telinga kiri.',
    },
    {
      judul: 'Tahnik',
      desc: 'Mengoleskan kurma yang telah dikunyah/dilembutkan ke langit-langit mulut bayi, lalu mendoakan keberkahan untuknya — sebagaimana Nabi shallallahu \u2019alaihi wasallam mentahnik bayi-bayi yang dibawa kepada beliau (HR. Bukhari & Muslim). Bila tidak ada kurma, boleh makanan manis lain yang aman.',
    },
    {
      judul: 'Aqiqah, cukur rambut & nama baik (hari ke-7)',
      desc: 'Pada hari ke-7 disunnahkan menyembelih aqiqah, mencukur rambut bayi, dan memberi nama yang baik. Ketentuan lengkap aqiqah — jumlah kambing, kalkulator jumlah hewan, dan pembagiannya — lihat halaman Aqiqah & Kurban di aplikasi ini.',
    },
    {
      judul: 'Masa menyusui & pengasuhan awal',
      desc: 'Dua tahun pertama adalah masa menyusui dan pengasuhan penuh kasih sayang. Orang tua menanamkan rasa aman, memperdengarkan kalimat baik, dan menjauhkan anak dari hal yang membahayakan akhlak maupun fisiknya.',
    },
    {
      judul: 'Membiasakan kebaikan sejak dini',
      desc: 'Sebelum usia perintah, anak dibiasakan dengan contoh nyata: mendengar Al-Qur\u2019an, melihat orang tua sholat, diajak ke masjid dengan tertib, dibiasakan jujur, sopan, dan mengucap salam. Keteladanan lebih utama daripada sekadar perintah.',
    },
    {
      judul: 'Perintahkan sholat pada usia 7 tahun',
      desc: 'Nabi shallallahu \u2019alaihi wasallam bersabda: \u201CPerintahkanlah anak-anak kalian untuk sholat ketika mereka berusia tujuh tahun, dan pukullah mereka (dengan pukulan mendidik yang tidak menyakitkan) karenanya ketika berusia sepuluh tahun, serta pisahkanlah tempat tidur mereka.\u201D (HR. Abu Dawud — hadits masyhur tentang pendidikan sholat anak).',
    },
    {
      judul: 'Ketegasan bertahap pada usia 10 tahun',
      desc: 'Bila pada usia 10 tahun anak masih meninggalkan sholat, orang tua bersikap lebih tegas secara bertahap dan proporsional — para ulama menegaskan pukulan yang dimaksud adalah sarana pendidikan terakhir yang ringan, tidak melukai, tidak di wajah, dan tidak disertai amarah; banyak keluarga cukup menempuh teguran dan pembatasan kesenangan anak.',
    },
    {
      judul: 'Doa & pendampingan berkelanjutan',
      desc: 'Pendidikan tidak berhenti di usia tertentu. Orang tua terus mendoakan anak — di antara doa Al-Qur\u2019an: \u201CRabbanaa hab lanaa min azwaajinaa wa dzurriyyaatinaa qurrata a\u2019yun\u201D (Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan sebagai penyejuk hati — QS. Al-Furqan: 74) — dan mendampingi anak hingga dewasa.',
    },
  ],
  haditsSholat: {
    judul: 'Hadits Perintah Sholat Anak (HR. Abu Dawud)',
    arab: 'مُرُوا أَوْلَادَكُمْ بِالصَّلَاةِ وَهُمْ أَبْنَاءُ سَبْعِ سِنِينَ، وَاضْرِبُوهُمْ عَلَيْهَا وَهُمْ أَبْنَاءُ عَشْرٍ، وَفَرِّقُوا بَيْنَهُمْ فِي الْمَضَاجِعِ',
    latin: 'Muur\u016B aul\u0101dakum bish-shal\u0101ti wa hum abn\u0101\u2019u sab\u2019i sin\u012Bn, wadhrib\u016Bhum \u2019alaih\u0101 wa hum abn\u0101\u2019u \u2019asyrin, wa farriq\u016B bainahum fil-madh\u0101ji\u2019.',
    arti: 'Perintahkanlah anak-anak kalian untuk sholat ketika berusia tujuh tahun, dan pukullah mereka karenanya ketika berusia sepuluh tahun, serta pisahkanlah tempat tidur mereka.',
    keterangan: 'Hadits ini menjadi dasar tahapan pendidikan sholat: pembiasaan dan perintah lembut sejak 7 tahun, ketegasan mendidik yang terukur mulai 10 tahun. Lihat penjelasan bertahap pada langkah 6–7 di atas.',
  },
};

// ── Nafkah keluarga (sekilas) ───────────────────────────────────
export const NAFKAH = {
  pengertian:
    'Nafkah keluarga — makanan, pakaian, dan tempat tinggal yang layak — adalah kewajiban utama suami/ayah sesuai kemampuannya: \u201CHendaklah orang yang mampu memberi nafkah menurut kemampuannya, dan orang yang disempitkan rezekinya hendaklah memberi nafkah dari harta yang diberikan Allah kepadanya.\u201D (QS. Ath-Thalaq: 7). Kewajiban ini juga ditegaskan dalam QS. Al-Baqarah: 233 terkait ayah menanggung nafkah ibu yang menyusui anaknya.',
  poin: [
    { judul: 'Kadar sesuai kemampuan', desc: 'Tidak ada angka baku: nafkah diukur dari kemampuan pemberi dan kebutuhan wajar penerima serta kebiasaan setempat (\u2019urf). Yang lapang tidak boleh kikir, yang sempit tidak dibebani di luar kesanggupannya.' },
    { judul: 'Urutan yang ditanggung', desc: 'Secara umum: diri sendiri, lalu istri, lalu anak-anak, lalu orang tua yang tidak mampu, kemudian kerabat dekat yang menjadi tanggungan — dengan rincian yang dapat berbeda antarpendapat ulama.' },
    { judul: 'Istri bekerja', desc: 'Harta dan penghasilan istri adalah hak penuh istri. Bila istri ikut menanggung biaya keluarga, itu terhitung sedekah dan kebaikan darinya — bukan kewajiban yang menggugurkan nafkah suami, kecuali ada kesepakatan berbeda yang saling ridha.' },
    { judul: 'Nafkah adalah ibadah', desc: 'Nafkah yang diberikan dengan niat karena Allah bernilai sedekah. Rasulullah shallallahu \u2019alaihi wasallam bersabda bahwa satu dinar yang dinafkahkan untuk keluarga adalah yang paling besar pahalanya di antara dinar yang dibelanjakan di jalan Allah (HR. Muslim).' },
  ],
};
