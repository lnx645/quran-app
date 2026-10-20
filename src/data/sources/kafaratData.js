// Data statis edukasi kafarat (data layer).
// Modul data TERPISAH: hanya diimpor oleh chunk halaman Kafarat,
// jangan impor dari komponen bersama/common agar tetap lazy-loaded.
// Konten: ringkasan edukasi yang ditulis ulang dengan bahasa sendiri —
// bukan fatwa; urutan pilihan kafarat bersifat BERURUTAN (tartib):
// pilihan berikutnya hanya diambil bila tidak mampu menjalankan yang
// sebelumnya.

export const DISCLAIMER_KAFARAT =
  'Ringkasan edukasi — bukan fatwa. Untuk penetapan kafarat pada kasus nyata, silakan rujuk ulama atau guru setempat.';

export const CATATAN_URUTAN =
  'Pilihan kafarat bersifat berurutan (tartib): kerjakan pilihan pertama; pilihan berikutnya hanya boleh diambil bila benar-benar tidak mampu menjalankan pilihan sebelumnya.';

export const KAFARAT_LIST = [
  {
    id: 'sumpah',
    nama: 'Kafarat Sumpah (Yamin)',
    sebab:
      'Melanggar sumpah yang diucapkan dengan nama Allah, atau tidak menepati sumpah yang telah diikrarkan.',
    sumber: 'QS Al-Ma’idah ayat 89',
    urutan: [
      'Memberi makan 10 orang miskin dari makanan pertengahan yang biasa diberikan kepada keluarga, ATAU memberi pakaian kepada 10 orang miskin, ATAU memerdekakan seorang budak.',
      'Bila tidak mampu melakukan salah satu pilihan di atas: berpuasa 3 hari.',
    ],
  },
  {
    id: 'zhihar',
    nama: 'Kafarat Zhihar',
    sebab:
      'Suami menzhihar istrinya — menyamakan istri dengan perempuan yang haram dinikahi selamanya (mis. punggung ibunya) — lalu ingin kembali kepadanya.',
    sumber: 'QS Al-Mujadalah ayat 3–4',
    urutan: [
      'Memerdekakan seorang budak, sebelum keduanya kembali berhubungan.',
      'Bila tidak mampu: berpuasa 2 bulan berturut-turut.',
      'Bila tidak mampu: memberi makan 60 orang miskin.',
    ],
  },
  {
    id: 'pembunuhan',
    nama: 'Kafarat Pembunuhan Tidak Sengaja',
    sebab:
      'Membunuh seorang mukmin karena keliru/tidak sengaja (mis. kecelakaan yang menyebabkan hilangnya nyawa).',
    sumber: 'QS An-Nisa ayat 92',
    urutan: [
      'Memerdekakan seorang budak mukmin, DAN membayar diyat (tebusan darah) kepada keluarga korban — kecuali bila keluarga memaafkan/menyedekahkannya.',
      'Bila tidak menemukan (tidak mampu memerdekakan) budak: berpuasa 2 bulan berturut-turut sebagai tobat kepada Allah.',
    ],
  },
  {
    id: 'jima-ramadhan',
    nama: "Kafarat Jima' di Siang Ramadhan",
    sebab:
      'Berhubungan suami-istri pada siang hari Ramadhan saat sedang berpuasa, sebagaimana kasus yang diadukan kepada Rasulullah ﷺ.',
    sumber: 'Hadits masyhur (HR Bukhari & Muslim)',
    urutan: [
      'Memerdekakan seorang budak.',
      'Bila tidak mampu: berpuasa 2 bulan berturut-turut.',
      'Bila tidak mampu: memberi makan 60 orang miskin.',
    ],
  },
];
