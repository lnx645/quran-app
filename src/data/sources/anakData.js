// Data statis Mode Anak (data layer — BUKAN dari API).
// Melengkapi HURUF_HIJAIYAH di iqroData.js ({ arab, latin, baca }) yang belum
// punya contoh kata: file ini memuat 28 huruf dengan nama Arab berharakat
// (untuk dibacakan SpeechSynthesis lang ar-SA) + satu contoh kata sederhana
// yang lazim diajarkan di buku Iqro/TPQ, lengkap dengan latin & artinya.
// Urutan & nama latin disamakan persis dengan HURUF_HIJAIYAH agar konsisten.
export const HURUF_ANAK = [
  { arab: 'ا', nama: 'Alif', namaArab: 'أَلِفْ', contohArab: 'أَسَدٌ', contohLatin: 'Asadun', contohArti: 'singa' },
  { arab: 'ب', nama: 'Ba', namaArab: 'بَاءْ', contohArab: 'بَطَّةٌ', contohLatin: 'Baththah', contohArti: 'bebek' },
  { arab: 'ت', nama: 'Ta', namaArab: 'تَاءْ', contohArab: 'تُفَّاحٌ', contohLatin: "Tuffaah", contohArti: 'apel' },
  { arab: 'ث', nama: 'Tsa', namaArab: 'ثَاءْ', contohArab: 'ثَعْلَبٌ', contohLatin: "Tsa'lab", contohArti: 'rubah' },
  { arab: 'ج', nama: 'Jim', namaArab: 'جِيمْ', contohArab: 'جَمَلٌ', contohLatin: 'Jamal', contohArti: 'unta' },
  { arab: 'ح', nama: 'Ha', namaArab: 'حَاءْ', contohArab: 'حِصَانٌ', contohLatin: 'Hishaan', contohArti: 'kuda' },
  { arab: 'خ', nama: 'Kha', namaArab: 'خَاءْ', contohArab: 'خُبْزٌ', contohLatin: 'Khubz', contohArti: 'roti' },
  { arab: 'د', nama: 'Dal', namaArab: 'دَالْ', contohArab: 'دَجَاجَةٌ', contohLatin: 'Dajaajah', contohArti: 'ayam' },
  { arab: 'ذ', nama: 'Dzal', namaArab: 'ذَالْ', contohArab: 'ذِئْبٌ', contohLatin: "Dzi'b", contohArti: 'serigala' },
  { arab: 'ر', nama: 'Ra', namaArab: 'رَاءْ', contohArab: 'رَجُلٌ', contohLatin: 'Rajul', contohArti: 'laki-laki' },
  { arab: 'ز', nama: 'Za', namaArab: 'زَايْ', contohArab: 'زَرَافَةٌ', contohLatin: 'Zaraafah', contohArti: 'jerapah' },
  { arab: 'س', nama: 'Sin', namaArab: 'سِينْ', contohArab: 'سَمَكَةٌ', contohLatin: 'Samakah', contohArti: 'ikan' },
  { arab: 'ش', nama: 'Sya', namaArab: 'شِينْ', contohArab: 'شَمْسٌ', contohLatin: 'Syams', contohArti: 'matahari' },
  { arab: 'ص', nama: 'Sha', namaArab: 'صَادْ', contohArab: 'صَقْرٌ', contohLatin: 'Shaqr', contohArti: 'elang' },
  { arab: 'ض', nama: 'Dha', namaArab: 'ضَادْ', contohArab: 'ضِفْدَعٌ', contohLatin: "Dhifda'", contohArti: 'katak' },
  { arab: 'ط', nama: 'Tha', namaArab: 'طَاءْ', contohArab: 'طَائِرَةٌ', contohLatin: "Thaa'irah", contohArti: 'pesawat' },
  { arab: 'ظ', nama: 'Zha', namaArab: 'ظَاءْ', contohArab: 'ظَبْيٌ', contohLatin: 'Zhaby', contohArti: 'kijang' },
  { arab: 'ع', nama: "'Ain", namaArab: 'عَيْنْ', contohArab: 'عِنَبٌ', contohLatin: "'Inab", contohArti: 'anggur' },
  { arab: 'غ', nama: 'Gha', namaArab: 'غَيْنْ', contohArab: 'غَيْمَةٌ', contohLatin: 'Ghaymah', contohArti: 'awan' },
  { arab: 'ف', nama: 'Fa', namaArab: 'فَاءْ', contohArab: 'فِيلٌ', contohLatin: 'Fiil', contohArti: 'gajah' },
  { arab: 'ق', nama: 'Qaf', namaArab: 'قَافْ', contohArab: 'قَمَرٌ', contohLatin: 'Qamar', contohArti: 'bulan' },
  { arab: 'ك', nama: 'Kaf', namaArab: 'كَافْ', contohArab: 'كِتَابٌ', contohLatin: 'Kitaab', contohArti: 'buku' },
  { arab: 'ل', nama: 'Lam', namaArab: 'لَامْ', contohArab: 'لَيْمُونٌ', contohLatin: 'Laymuun', contohArti: 'lemon' },
  { arab: 'م', nama: 'Mim', namaArab: 'مِيمْ', contohArab: 'مَوْزٌ', contohLatin: 'Mawz', contohArti: 'pisang' },
  { arab: 'ن', nama: 'Nun', namaArab: 'نُونْ', contohArab: 'نَجْمٌ', contohLatin: 'Najm', contohArti: 'bintang' },
  { arab: 'ه', nama: 'Ha', namaArab: 'هَاءْ', contohArab: 'هِلَالٌ', contohLatin: 'Hilaal', contohArti: 'bulan sabit' },
  { arab: 'و', nama: 'Wau', namaArab: 'وَاوْ', contohArab: 'وَرْدَةٌ', contohLatin: 'Wardah', contohArti: 'bunga mawar' },
  { arab: 'ي', nama: 'Ya', namaArab: 'يَاءْ', contohArab: 'يَدٌ', contohLatin: 'Yad', contohArti: 'tangan' },
];
