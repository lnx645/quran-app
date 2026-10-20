/**
 * Daftar statis 14 ayat sajdah (sujud tilawah) menurut jumhur ulama —
 * dipakai sebagai CADANGAN penanda sajdah di halaman baca.
 *
 * Sumber utama penanda adalah field `sajdah_number` pada respons verses
 * Quran.com API v4 (terverifikasi curl 2026-10-20: field selalu hadir,
 * mis. verse 7:206 → sajdah_number 1, dan teks Uthmani-nya sendiri sudah
 * memuat simbol ۩). Daftar statis ini hanya menambal bila API suatu saat
 * tidak mengirim field tersebut untuk ayat yang semestinya bersajdah.
 *
 * 14 ayat jumhur: 7:206, 13:15, 16:50, 17:109, 19:58, 22:18, 25:60,
 * 27:26, 32:15, 38:24, 41:38, 53:62, 84:21, 96:19.
 *
 * Verifikasi silang curl 2026-10-20 (API vs daftar ini): cocok persis
 * kecuali dua selisih yang memang dikenal dalam literatur —
 * (1) API juga menandai 22:77 (sajdah ke-15 menurut madzhab Syafi'i);
 * (2) API menandai 41:37 sedangkan daftar jumhur menulis 41:38 (selisih
 * penomoran ayat Fussilat antar riwayat hitungan). Penanda aplikasi =
 * GABUNGAN keduanya (API ∪ daftar ini), jadi kedua titik Fussilat dan
 * 22:77 ikut tertandai; lebih aman daripada kehilangan satu penanda.
 */
export const AYAT_SAJDAH_JUMHUR = new Set([
  '7:206',
  '13:15',
  '16:50',
  '17:109',
  '19:58',
  '22:18',
  '25:60',
  '27:26',
  '32:15',
  '38:24',
  '41:38',
  '53:62',
  '84:21',
  '96:19',
]);

/** true bila verse_key ("surah:ayat") termasuk ayat sajdah jumhur. */
export function adalahAyatSajdah(verseKey) {
  return AYAT_SAJDAH_JUMHUR.has(String(verseKey ?? ''));
}
