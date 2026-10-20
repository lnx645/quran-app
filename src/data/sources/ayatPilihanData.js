/**
 * Daftar ayat-ayat masyhur untuk kartu "Ayat Hari Ini" di beranda.
 *
 * SENGAJA hanya berisi referensi { surahId, nomorAyat, tema } — TANPA teks
 * ayat. Teks Arab & terjemahan diambil saat runtime dari
 * QuranRepositoryImpl.getSurahDetail(surahId) agar selalu akurat mengikuti
 * sumber data Qur'an aplikasi (Quran.com API, terjemahan Kemenag).
 * File ini kecil dan aman diimpor statis oleh komponen beranda.
 */
export const AYAT_PILIHAN = [
  { surahId: 1, nomorAyat: 5, tema: 'Hanya kepada Allah memohon pertolongan' },
  { surahId: 2, nomorAyat: 45, tema: 'Sabar dan shalat sebagai penolong' },
  { surahId: 2, nomorAyat: 152, tema: 'Mengingat Allah, Allah mengingatmu' },
  { surahId: 2, nomorAyat: 153, tema: 'Allah bersama orang yang sabar' },
  { surahId: 2, nomorAyat: 156, tema: 'Inna lillahi wa inna ilaihi raji\u2019un' },
  { surahId: 2, nomorAyat: 183, tema: 'Kewajiban puasa Ramadhan' },
  { surahId: 2, nomorAyat: 186, tema: 'Allah dekat, mengabulkan doa' },
  { surahId: 2, nomorAyat: 201, tema: 'Doa kebaikan dunia dan akhirat' },
  { surahId: 2, nomorAyat: 216, tema: 'Boleh jadi yang dibenci itu baik bagimu' },
  { surahId: 2, nomorAyat: 255, tema: 'Ayat Kursi — keagungan Allah' },
  { surahId: 2, nomorAyat: 286, tema: 'Allah tidak membebani di luar kesanggupan' },
  { surahId: 3, nomorAyat: 139, tema: 'Jangan lemah dan jangan bersedih' },
  { surahId: 3, nomorAyat: 160, tema: 'Pertolongan hanya dari Allah' },
  { surahId: 3, nomorAyat: 173, tema: 'Hasbunallah wa ni\u2019mal wakil' },
  { surahId: 3, nomorAyat: 185, tema: 'Setiap yang bernyawa akan merasakan mati' },
  { surahId: 5, nomorAyat: 2, tema: 'Tolong-menolong dalam kebaikan dan takwa' },
  { surahId: 13, nomorAyat: 28, tema: 'Hati tenang dengan mengingat Allah' },
  { surahId: 14, nomorAyat: 7, tema: 'Syukur menambah nikmat' },
  { surahId: 17, nomorAyat: 23, tema: 'Jangan berkata \u201cah\u201d kepada orang tua' },
  { surahId: 20, nomorAyat: 114, tema: 'Doa memohon tambahan ilmu' },
  { surahId: 21, nomorAyat: 87, tema: 'Doa Nabi Yunus dalam kesulitan' },
  { surahId: 24, nomorAyat: 35, tema: 'Allah cahaya langit dan bumi' },
  { surahId: 25, nomorAyat: 74, tema: 'Doa untuk keluarga yang menyejukkan mata' },
  { surahId: 30, nomorAyat: 21, tema: 'Sakinah, mawaddah, dan rahmah' },
  { surahId: 31, nomorAyat: 14, tema: 'Bersyukur kepada Allah dan orang tua' },
  { surahId: 33, nomorAyat: 56, tema: 'Bershalawat kepada Nabi' },
  { surahId: 40, nomorAyat: 60, tema: 'Berdoalah, niscaya Aku kabulkan' },
  { surahId: 49, nomorAyat: 13, tema: 'Yang paling mulia adalah yang paling bertakwa' },
  { surahId: 55, nomorAyat: 13, tema: 'Nikmat Tuhanmu yang manakah yang kamu dustakan?' },
  { surahId: 65, nomorAyat: 3, tema: 'Tawakal — Allah mencukupkan urusannya' },
  { surahId: 94, nomorAyat: 6, tema: 'Bersama kesulitan ada kemudahan' },
  { surahId: 97, nomorAyat: 1, tema: 'Lailatulqadar' },
  { surahId: 103, nomorAyat: 2, tema: 'Manusia sungguh dalam kerugian' },
  { surahId: 112, nomorAyat: 1, tema: 'Katakanlah: Dialah Allah Yang Maha Esa' },
];

export default AYAT_PILIHAN;
