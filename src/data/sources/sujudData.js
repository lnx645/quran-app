/**
 * Data panduan sujud di luar sholat & sujud koreksi: sujud sahwi,
 * sujud syukur, dan sujud tilawah. Redaksi mengikuti penjelasan fikih
 * yang masyhur (madzhab Syafi'i yang umum diamalkan di Indonesia);
 * perbedaan kecil antar ulama adalah hal yang wajar.
 */

export const BACAAN_SUJUD_TILAWAH = {
  arab: 'سَجَدَ وَجْهِيَ لِلَّذِيْ خَلَقَهُ وَصَوَّرَهُ وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ فَتَبَارَكَ اللهُ أَحْسَنُ الْخَالِقِيْنَ',
  latin:
    "Sajada wajhiya lilladzii khalaqahuu wa shawwarahuu wa syaqqa sam'ahuu wa basharahuu bihawlihii wa quwwatihii, fatabaarakallaahu ahsanul khaaliqiin.",
  arti: '“Wajahku bersujud kepada (Allah) yang menciptakannya, membentuk rupanya, dan membelah pendengaran serta penglihatannya dengan daya dan kekuatan-Nya. Mahasuci Allah, sebaik-baik Pencipta.” (HR. At-Tirmidzi, Abu Dawud, An-Nasa’i)',
};

export const SUJUD_SAHWI = {
  nama: 'Sujud Sahwi',
  ringkas:
    'Sujud dua kali karena lupa dalam sholat — dilakukan sebelum salam (dan sebagian sebab sesudah salam), disertai niat mengoreksi kekurangan sholat.',
  sebab: [
    'Lupa jumlah rakaat (ragu sudah 3 atau 4 rakaat): ambil yang yakin (lebih sedikit), sempurnakan, lalu sujud sahwi.',
    'Lupa tasyahud awal atau duduk tasyahud awal.',
    'Lupa membaca qunut (pada sholat Subuh menurut madzhab Syafi’i).',
    'Kelebihan rakaat, rukuk, atau sujud karena lupa.',
    'Lupa meninggalkan salah satu sunnah ab’adh sholat lainnya.',
  ],
  cara: [
    'Sempurnakan dulu kekurangan sholatnya (mis. tambah rakaat yang kurang).',
    'Duduk seperti tasyahud akhir menjelang salam, dalam keadaan suci dan tetap dalam sholat.',
    'Sujud dua kali dengan tuma’ninah, dipisah duduk sejenak — persis seperti dua sujud biasa dalam sholat.',
    'Di setiap sujud, baca bacaan sujud sahwi (lihat kartu bacaan) atau bacaan sujud biasa.',
    'Setelah sujud kedua, duduk kembali lalu salam seperti biasa.',
  ],
  bacaan: {
    label: 'Bacaan sujud sahwi yang masyhur',
    arab: 'سُبْحَانَ مَنْ لَا يَنَامُ وَلَا يَسْهُوْ',
    latin: 'Subhaana man laa yanaamu wa laa yas-huu.',
    arti: '“Mahasuci (Allah) yang tidak tidur dan tidak lupa.” Bacaan sujud biasa (subhaana rabbiyal a’laa) juga sah dibaca.',
  },
  catatan:
    'Mayoritas sebab di atas sujud sahwinya SEBELUM salam. Bila salam sudah terlanjur diucapkan tetapi baru ingat kekurangannya dan jedanya belum lama, sempurnakan kekurangannya lalu sujud sahwi dan salam lagi. Bila ragu apakah sebabnya menuntut sujud sahwi, bertanyalah kepada guru/ulama setempat.',
};

export const SUJUD_SYUKUR = {
  nama: 'Sujud Syukur',
  ringkas:
    'Sujud sekali sebagai ungkapan terima kasih ketika memperoleh nikmat besar yang tidak disangka atau terhindar dari musibah.',
  sebab: [
    'Mendapat kabar gembira besar: kelulusan, kelahiran anak, kesembuhan, rezeki yang tidak terduga.',
    'Terhindar dari kecelakaan atau musibah.',
    'Nikmat baru pada umumnya — sunnah menurut jumhur ulama, mengikuti teladan Rasulullah ﷺ yang sujud syukur saat menerima kabar gembira (HR. Abu Dawud, At-Tirmidzi).',
  ],
  cara: [
    'Menghadap kiblat, dalam keadaan suci (mayoritas ulama mensyaratkan seperti sholat; sebagian membolehkannya tanpa wudhu).',
    'Takbir, lalu langsung sujud satu kali dengan tuma’ninah.',
    'Dalam sujud, perbanyak syukur: hamdalah, pujian kepada Allah, dan doa sesuai nikmat yang diterima.',
    'Bangkit dari sujud dengan takbir; tidak ada tasyahud dan tidak ada salam.',
  ],
  catatan:
    'Sujud syukur dilakukan di LUAR sholat, satu kali sujud saja. Bila sedang dalam sholat, cukup lanjutkan sholat — sujud syukur tidak disisipkan ke dalam sholat.',
};

export const SUJUD_TILAWAH = {
  nama: 'Sujud Tilawah',
  ringkas:
    'Sujud sekali ketika membaca atau mendengar ayat sajdah (ayat bertanda ۩ — 14 ayat menurut jumhur). Di aplikasi ini ayat sajdah ditandai label “Ayat Sajdah” pada halaman baca.',
  cara: [
    'Ketika sampai pada ayat sajdah, takbir lalu sujud satu kali (di luar sholat: diawali takbir; sebagian ulama menambahkan takbir saat bangkit).',
    'Dalam sujud baca doa sujud tilawah (lihat kartu bacaan di bawah).',
    'Bangkit dari sujud; di luar sholat tidak ada tasyahud dan tidak ada salam, lalu lanjutkan bacaan.',
    'Bila ayat sajdah dibaca DALAM sholat: takbir, sujud, takbir untuk bangkit, lalu lanjutkan sholat seperti biasa.',
  ],
  catatan:
    'Hukumnya sunnah menurut jumhur (wajib menurut madzhab Hanafi). Bila mendengar ayat sajdah dibacakan orang lain, disunnahkan ikut sujud. Pendengar yang tidak memungkinkan sujud (mis. sedang berkendara) cukup membaca doa tilawah.',
};
