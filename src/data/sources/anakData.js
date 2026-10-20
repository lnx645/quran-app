// Data statis Mode Anak (data layer — BUKAN dari API).
// Melengkapi HURUF_HIJAIYAH di iqroData.js ({ arab, latin, baca }) yang belum
// punya contoh kata: file ini memuat 28 huruf dengan nama Arab berharakat
// (untuk dibacakan SpeechSynthesis lang ar-SA) + satu contoh kata sederhana
// yang lazim diajarkan di buku Iqro/TPQ, lengkap dengan latin & artinya.
// Urutan & nama latin disamakan persis dengan HURUF_HIJAIYAH agar konsisten.
// Field `audio` = nama berkas bunyi nama huruf di public/audio/hijaiyah/
// (tanpa ekstensi) — dihasilkan Piper TTS, lihat SUMBER.md di folder itu.
export const HURUF_ANAK = [
  { arab: 'ا', nama: 'Alif', namaArab: 'أَلِفْ', contohArab: 'أَسَدٌ', contohLatin: 'Asadun', contohArti: 'singa', audio: '01-alif' },
  { arab: 'ب', nama: 'Ba', namaArab: 'بَاءْ', contohArab: 'بَطَّةٌ', contohLatin: 'Baththah', contohArti: 'bebek', audio: '02-ba' },
  { arab: 'ت', nama: 'Ta', namaArab: 'تَاءْ', contohArab: 'تُفَّاحٌ', contohLatin: "Tuffaah", contohArti: 'apel', audio: '03-ta' },
  { arab: 'ث', nama: 'Tsa', namaArab: 'ثَاءْ', contohArab: 'ثَعْلَبٌ', contohLatin: "Tsa'lab", contohArti: 'rubah', audio: '04-tsa' },
  { arab: 'ج', nama: 'Jim', namaArab: 'جِيمْ', contohArab: 'جَمَلٌ', contohLatin: 'Jamal', contohArti: 'unta', audio: '05-jim' },
  { arab: 'ح', nama: 'Ha', namaArab: 'حَاءْ', contohArab: 'حِصَانٌ', contohLatin: 'Hishaan', contohArti: 'kuda', audio: '06-ha' },
  { arab: 'خ', nama: 'Kha', namaArab: 'خَاءْ', contohArab: 'خُبْزٌ', contohLatin: 'Khubz', contohArti: 'roti', audio: '07-kha' },
  { arab: 'د', nama: 'Dal', namaArab: 'دَالْ', contohArab: 'دَجَاجَةٌ', contohLatin: 'Dajaajah', contohArti: 'ayam', audio: '08-dal' },
  { arab: 'ذ', nama: 'Dzal', namaArab: 'ذَالْ', contohArab: 'ذِئْبٌ', contohLatin: "Dzi'b", contohArti: 'serigala', audio: '09-dzal' },
  { arab: 'ر', nama: 'Ra', namaArab: 'رَاءْ', contohArab: 'رَجُلٌ', contohLatin: 'Rajul', contohArti: 'laki-laki', audio: '10-ra' },
  { arab: 'ز', nama: 'Za', namaArab: 'زَايْ', contohArab: 'زَرَافَةٌ', contohLatin: 'Zaraafah', contohArti: 'jerapah', audio: '11-za' },
  { arab: 'س', nama: 'Sin', namaArab: 'سِينْ', contohArab: 'سَمَكَةٌ', contohLatin: 'Samakah', contohArti: 'ikan', audio: '12-sin' },
  { arab: 'ش', nama: 'Sya', namaArab: 'شِينْ', contohArab: 'شَمْسٌ', contohLatin: 'Syams', contohArti: 'matahari', audio: '13-sya' },
  { arab: 'ص', nama: 'Sha', namaArab: 'صَادْ', contohArab: 'صَقْرٌ', contohLatin: 'Shaqr', contohArti: 'elang', audio: '14-sha' },
  { arab: 'ض', nama: 'Dha', namaArab: 'ضَادْ', contohArab: 'ضِفْدَعٌ', contohLatin: "Dhifda'", contohArti: 'katak', audio: '15-dha' },
  { arab: 'ط', nama: 'Tha', namaArab: 'طَاءْ', contohArab: 'طَائِرَةٌ', contohLatin: "Thaa'irah", contohArti: 'pesawat', audio: '16-tha' },
  { arab: 'ظ', nama: 'Zha', namaArab: 'ظَاءْ', contohArab: 'ظَبْيٌ', contohLatin: 'Zhaby', contohArti: 'kijang', audio: '17-zha' },
  { arab: 'ع', nama: "'Ain", namaArab: 'عَيْنْ', contohArab: 'عِنَبٌ', contohLatin: "'Inab", contohArti: 'anggur', audio: '18-ain' },
  { arab: 'غ', nama: 'Gha', namaArab: 'غَيْنْ', contohArab: 'غَيْمَةٌ', contohLatin: 'Ghaymah', contohArti: 'awan', audio: '19-gha' },
  { arab: 'ف', nama: 'Fa', namaArab: 'فَاءْ', contohArab: 'فِيلٌ', contohLatin: 'Fiil', contohArti: 'gajah', audio: '20-fa' },
  { arab: 'ق', nama: 'Qaf', namaArab: 'قَافْ', contohArab: 'قَمَرٌ', contohLatin: 'Qamar', contohArti: 'bulan', audio: '21-qaf' },
  { arab: 'ك', nama: 'Kaf', namaArab: 'كَافْ', contohArab: 'كِتَابٌ', contohLatin: 'Kitaab', contohArti: 'buku', audio: '22-kaf' },
  { arab: 'ل', nama: 'Lam', namaArab: 'لَامْ', contohArab: 'لَيْمُونٌ', contohLatin: 'Laymuun', contohArti: 'lemon', audio: '23-lam' },
  { arab: 'م', nama: 'Mim', namaArab: 'مِيمْ', contohArab: 'مَوْزٌ', contohLatin: 'Mawz', contohArti: 'pisang', audio: '24-mim' },
  { arab: 'ن', nama: 'Nun', namaArab: 'نُونْ', contohArab: 'نَجْمٌ', contohLatin: 'Najm', contohArti: 'bintang', audio: '25-nun' },
  { arab: 'ه', nama: 'Ha', namaArab: 'هَاءْ', contohArab: 'هِلَالٌ', contohLatin: 'Hilaal', contohArti: 'bulan sabit', audio: '26-ha-2' },
  { arab: 'و', nama: 'Wau', namaArab: 'وَاوْ', contohArab: 'وَرْدَةٌ', contohLatin: 'Wardah', contohArti: 'bunga mawar', audio: '27-wau' },
  { arab: 'ي', nama: 'Ya', namaArab: 'يَاءْ', contohArab: 'يَدٌ', contohLatin: 'Yad', contohArti: 'tangan', audio: '28-ya' },
];
