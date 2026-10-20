// Data statis rangkaian Tahlil & Doa Arwah (data layer).
//
// BINGKAI JUJUR: ini rangkaian yang UMUM diamalkan di Indonesia (urutan
// masyhur yang lazim dalam tradisi tahlilan, termasuk di lingkungan NU).
// Ini BUKAN fatwa dan bukan satu-satunya urutan yang sah — jumlah bacaan
// dan sebagian susunan bisa berbeda antar daerah/majelis. Ikuti bimbingan
// guru/ustadz setempat.
//
// SUMBER TEKS SUCI — tidak dikarang & tidak diketik ulang bila sudah ada
// di aplikasi; teks di bawah DIIMPOR dari data yang sudah terverifikasi:
//   - Al-Fatihah ......... panduanSholatData.js (GERAKAN_SHOLAT, bacaan
//                          langkah "Membaca Al-Fatihah & Surah Pendek");
//                          redaksi yang sama juga dipakai sholatSunnahData.js
//                          pada takbir pertama sholat jenazah.
//   - Ayat Kursi ......... dzikirBadaSholatData.js (WIRID_BADA_SHOLAT,
//                          entri "Ayat Kursi (Al-Baqarah: 255)").
//                          ayatPilihanData.js hanya memuat referensinya
//                          (surah 2 ayat 255) tanpa teks.
//   - Istighfar .......... dzikirBadaSholatData.js (WIRID_BADA_SHOLAT,
//                          entri "Istighfar": Astaghfirullāhal-'azhīm).
//   - Sholawat ........... sholatSunnahData.js (SHOLAT_JENAZAH takbir ke-2:
//                          shalawat Ibrahimiyah).
//   - Doa arwah .......... sholatSunnahData.js (SHOLAT_JENAZAH takbir ke-3:
//                          "Allāhummaghfir lahu warhamhu...").
//   - Doa penutup ........ sholatSunnahData.js (SHOLAT_JENAZAH takbir ke-4:
//                          "Allāhumma lā tahrimnā ajrahu...").
//   - Kalimat tahlil ..... lafaz pendek "Lā ilāha illallāh" — lafaz tauhid
//                          yang sama dipakai TasbihPage.jsx (DZIKIR_OPSI)
//                          dan disebut pada jenazahData.js (talqin).
//   - Surah Yasin ........ TIDAK diduplikasi di sini; langkahnya berupa
//                          tautan ke rute /yasin yang sudah ada
//                          (dialihkan ke /surah/36).
//
// Varian doa arwah (hu/ha/hum): redaksi "hu" diimpor apa adanya. Redaksi
// "ha" dan "hum" adalah penyesuaian KATA GANTI dari redaksi yang sama —
// pola penyesuaian hu→ha memang dicatat di aplikasi ini sendiri
// (catatanPerempuan pada SHOLAT_JENAZAH takbir ke-3 di sholatSunnahData.js).
import { GERAKAN_SHOLAT } from './panduanSholatData.js';
import { WIRID_BADA_SHOLAT } from './dzikirBadaSholatData.js';
import { SHOLAT_JENAZAH } from './sholatSunnahData.js';

export const BINGKAI_TAHLIL =
  'Rangkaian yang umum diamalkan di Indonesia — ikuti bimbingan guru/ustadz setempat.';

export const DISCLAIMER_TAHLIL =
  'Rangkaian tahlil ini adalah susunan yang umum diamalkan di Indonesia (urutan masyhur dalam tradisi tahlilan) — bukan fatwa dan bukan satu-satunya urutan yang sah. Jumlah bacaan serta sebagian susunan dapat berbeda antar daerah dan majelis; ikuti bimbingan guru atau ustadz setempat.';

export const LABEL_JUMLAH = 'Jumlah mengikuti kebiasaan setempat';

// --- Ambil teks yang sudah ada di aplikasi (tanpa mengetik ulang) ---
const bacaanFatihah = GERAKAN_SHOLAT.find((g) => g.ikon === 'qiroah')?.bacaan;
const wiridIstighfar = WIRID_BADA_SHOLAT.find((w) => w.nama === 'Istighfar');
const wiridAyatKursi = WIRID_BADA_SHOLAT.find((w) => w.nama.includes('Ayat Kursi'));
const sholawatJenazah = SHOLAT_JENAZAH.langkah[1]?.bacaan;
const doaJenazah = SHOLAT_JENAZAH.langkah[2]?.bacaan;
const doaPenutupJenazah = SHOLAT_JENAZAH.langkah[3]?.bacaan;

// Varian doa arwah: "hu" = redaksi impor apa adanya; "ha"/"hum" =
// penyesuaian kata ganti dari redaksi yang sama (lihat catatan di header).
const DOA_ARWAH_VARIAN = [
  {
    kunci: 'hu',
    label: 'Laki-laki',
    arab: doaJenazah?.arab,
    latin: doaJenazah?.latin,
    arti: doaJenazah?.arti,
  },
  {
    kunci: 'ha',
    label: 'Perempuan',
    arab: 'اللَّهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا وَعَافِهَا وَاعْفُ عَنْهَا، وَأَكْرِمْ نُزُلَهَا، وَوَسِّعْ مَدْخَلَهَا، وَاغْسِلْهَا بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهَا مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ',
    latin:
      "Allāhummaghfir lahā warhamhā wa 'āfihā wa'fu 'anhā, wa akrim nuzulahā, wa wassi' madkhalahā, waghsilhā bil-mā'i wats-tsalji wal-barad, wa naqqihā minal-khathāyā kamā yunaqqats-tsaubul-abyadhu minad-danas.",
    arti: 'Ya Allah, ampunilah dia (perempuan), rahmatilah dia, selamatkanlah dia, dan maafkanlah dia. Muliakanlah tempat tinggalnya, lapangkanlah tempat masuknya, basuhlah dia dengan air, salju, dan embun, dan bersihkanlah dia dari kesalahan sebagaimana pakaian putih dibersihkan dari kotoran.',
  },
  {
    kunci: 'hum',
    label: 'Jamaah / Umum',
    arab: 'اللَّهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَعَافِهِمْ وَاعْفُ عَنْهُمْ، وَأَكْرِمْ نُزُلَهُمْ، وَوَسِّعْ مَدْخَلَهُمْ، وَاغْسِلْهُمْ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِمْ مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ',
    latin:
      "Allāhummaghfir lahum warhamhum wa 'āfihim wa'fu 'anhum, wa akrim nuzulahum, wa wassi' madkhalahum, waghsilhum bil-mā'i wats-tsalji wal-barad, wa naqqihim minal-khathāyā kamā yunaqqats-tsaubul-abyadhu minad-danas.",
    arti: 'Ya Allah, ampunilah mereka, rahmatilah mereka, selamatkanlah mereka, dan maafkanlah mereka. Muliakanlah tempat tinggal mereka, lapangkanlah tempat masuk mereka, basuhlah mereka dengan air, salju, dan embun, dan bersihkanlah mereka dari kesalahan sebagaimana pakaian putih dibersihkan dari kotoran.',
  },
];

// Tiap langkah: { id, judul, keterangan?, arab?, latin?, arti?,
// jumlahKetuk?, labelJumlah?, jenis?, tautan?, varian?, sumber }.
// jenis: undefined = bacaan biasa; 'tautan' = langkah berupa tautan rute.
export const RANGKAIAN_TAHLIL = [
  {
    id: 'pembuka',
    judul: 'Pembuka & Niat',
    keterangan:
      'Duduk dengan tenang dan wudhu bila memungkinkan. Niatkan dalam hati membaca rangkaian tahlil ini dan menghadiahkan pahalanya untuk almarhum/almarhumah yang dituju, serta untuk seluruh mukminin dan mukminat yang telah wafat. Niat letaknya di hati — tidak ada lafaz niat khusus yang diwajibkan pada langkah ini.',
    sumber: 'Panduan pembuka — niat di hati, tanpa lafaz khusus.',
  },
  {
    id: 'fatihah',
    judul: 'Al-Fatihah',
    arab: bacaanFatihah?.arab,
    latin: bacaanFatihah?.latin,
    arti: bacaanFatihah?.arti,
    keterangan:
      'Dibaca dengan menghadiahkan pahalanya untuk almarhum/almarhumah yang dituju.',
    sumber:
      'Teks dari panduanSholatData.js (bacaan Al-Fatihah pada panduan sholat; redaksi sama di sholatSunnahData.js, takbir pertama sholat jenazah).',
  },
  {
    id: 'ayat-kursi',
    judul: 'Ayat Kursi (Al-Baqarah: 255)',
    arab: wiridAyatKursi?.arab,
    latin: wiridAyatKursi?.latin,
    arti: wiridAyatKursi?.arti,
    sumber:
      'Teks dari dzikirBadaSholatData.js (wirid ba’da sholat, entri Ayat Kursi); referensi ayat juga tercatat di ayatPilihanData.js (surah 2 ayat 255).',
  },
  {
    id: 'yasin',
    judul: 'Surah Yasin',
    jenis: 'tautan',
    keterangan:
      'Dalam rangkaian tahlil, Surah Yasin dibaca pada bagian ini. Teksnya tidak diduplikasi di halaman ini — buka Surah Yasin dari rute yang sudah ada, baca sampai selesai, lalu kembali ke halaman ini dan tekan “Lanjut”.',
    tautan: { ke: '/yasin', label: 'Buka Surah Yasin' },
    sumber: 'Tautan ke rute /yasin yang sudah ada di aplikasi (menuju /surah/36).',
  },
  {
    id: 'istighfar',
    judul: 'Istighfar',
    arab: wiridIstighfar?.arab,
    latin: wiridIstighfar?.latin,
    arti: wiridIstighfar?.arti,
    jumlahKetuk: 33,
    labelJumlah: LABEL_JUMLAH,
    sumber:
      'Teks dari dzikirBadaSholatData.js (wirid ba’da sholat, entri Istighfar). Jumlah 33× sebagai panduan ketuk — jumlah mengikuti kebiasaan setempat.',
  },
  {
    id: 'tahlil',
    judul: 'Tahlil — Lā ilāha illallāh',
    arab: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    latin: 'Lā ilāha illallāh.',
    arti: 'Tidak ada sesembahan yang berhak disembah selain Allah.',
    jumlahKetuk: 100,
    labelJumlah: LABEL_JUMLAH,
    keterangan:
      'Inti rangkaian tahlil: kalimat tauhid dibaca berulang dengan tenang dan khusyuk.',
    sumber:
      'Lafaz tauhid pendek yang sama dipakai TasbihPage.jsx (DZIKIR_OPSI) dan disebut pada jenazahData.js (talqin). Jumlah 100× sebagai panduan ketuk — jumlah mengikuti kebiasaan setempat.',
  },
  {
    id: 'sholawat',
    judul: 'Sholawat atas Nabi ﷺ',
    arab: sholawatJenazah?.arab,
    latin: sholawatJenazah?.latin,
    arti: sholawatJenazah?.arti,
    jumlahKetuk: 33,
    labelJumlah: LABEL_JUMLAH,
    sumber:
      'Teks shalawat Ibrahimiyah dari sholatSunnahData.js (takbir kedua sholat jenazah). Jumlah 33× sebagai panduan ketuk — jumlah mengikuti kebiasaan setempat.',
  },
  {
    id: 'doa-arwah',
    judul: 'Doa Arwah — Doa untuk Mayit',
    keterangan:
      'Doa khusus untuk yang telah wafat. Pilih kata ganti sesuai yang didoakan: “hu” untuk seorang laki-laki, “ha” untuk seorang perempuan, “hum” untuk jamaah/umum. Redaksi “hu” adalah redaksi doa jenazah yang dipakai aplikasi ini; redaksi “ha” dan “hum” adalah penyesuaian kata ganti dari redaksi yang sama.',
    varian: DOA_ARWAH_VARIAN,
    // Teks tampil bawaan (varian pertama) — halaman terpandu dapat
    // menggantinya lewat pemilih varian.
    arab: DOA_ARWAH_VARIAN[0]?.arab,
    latin: DOA_ARWAH_VARIAN[0]?.latin,
    arti: DOA_ARWAH_VARIAN[0]?.arti,
    sumber:
      'Teks dari sholatSunnahData.js (takbir ketiga sholat jenazah). Penyesuaian kata ganti hu→ha mengikuti catatanPerempuan pada berkas yang sama; varian “hum” penyesuaian kata ganti jamak dari redaksi yang sama.',
  },
  {
    id: 'doa-penutup',
    judul: 'Doa Penutup',
    arab: doaPenutupJenazah?.arab,
    latin: doaPenutupJenazah?.latin,
    arti: doaPenutupJenazah?.arti,
    keterangan:
      'Kata ganti pada doa penutup ini mengikuti yang didoakan (hu/ha/hum) — sesuaikan dengan bimbingan guru setempat. Setelah doa, rangkaian ditutup dengan hamdalah dan salam kepada jamaah yang hadir.',
    sumber: 'Teks dari sholatSunnahData.js (takbir keempat sholat jenazah).',
  },
];

export default RANGKAIAN_TAHLIL;
