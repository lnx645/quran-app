// Data statis Iqro Jilid 1–6 (data layer — BUKAN dari API).
// Huruf hijaiyah Jilid 1 lengkap dengan 3 bentuk harakat.
export const HURUF_HIJAIYAH = [
  { arab: 'ا', latin: 'Alif', baca: ['a', 'i', 'u'] },
  { arab: 'ب', latin: 'Ba', baca: ['ba', 'bi', 'bu'] },
  { arab: 'ت', latin: 'Ta', baca: ['ta', 'ti', 'tu'] },
  { arab: 'ث', latin: 'Tsa', baca: ['tsa', 'tsi', 'tsu'] },
  { arab: 'ج', latin: 'Jim', baca: ['ja', 'ji', 'ju'] },
  { arab: 'ح', latin: 'Ha', baca: ['ha', 'hi', 'hu'] },
  { arab: 'خ', latin: 'Kha', baca: ['kha', 'khi', 'khu'] },
  { arab: 'د', latin: 'Dal', baca: ['da', 'di', 'du'] },
  { arab: 'ذ', latin: 'Dzal', baca: ['dza', 'dzi', 'dzu'] },
  { arab: 'ر', latin: 'Ra', baca: ['ra', 'ri', 'ru'] },
  { arab: 'ز', latin: 'Za', baca: ['za', 'zi', 'zu'] },
  { arab: 'س', latin: 'Sin', baca: ['sa', 'si', 'su'] },
  { arab: 'ش', latin: 'Sya', baca: ['sya', 'syi', 'syu'] },
  { arab: 'ص', latin: 'Sha', baca: ['sha', 'shi', 'shu'] },
  { arab: 'ض', latin: 'Dha', baca: ['dha', 'dhi', 'dhu'] },
  { arab: 'ط', latin: 'Tha', baca: ['tha', 'thi', 'thu'] },
  { arab: 'ظ', latin: 'Zha', baca: ['zha', 'zhi', 'zhu'] },
  { arab: 'ع', latin: "'Ain", baca: ["'a", "'i", "'u"] },
  { arab: 'غ', latin: 'Gha', baca: ['gha', 'ghi', 'ghu'] },
  { arab: 'ف', latin: 'Fa', baca: ['fa', 'fi', 'fu'] },
  { arab: 'ق', latin: 'Qaf', baca: ['qa', 'qi', 'qu'] },
  { arab: 'ك', latin: 'Kaf', baca: ['ka', 'ki', 'ku'] },
  { arab: 'ل', latin: 'Lam', baca: ['la', 'li', 'lu'] },
  { arab: 'م', latin: 'Mim', baca: ['ma', 'mi', 'mu'] },
  { arab: 'ن', latin: 'Nun', baca: ['na', 'ni', 'nu'] },
  { arab: 'ه', latin: 'Ha', baca: ['ha', 'hi', 'hu'] },
  { arab: 'و', latin: 'Wau', baca: ['wa', 'wi', 'wu'] },
  { arab: 'ي', latin: 'Ya', baca: ['ya', 'yi', 'yu'] },
];

// Baris latihan membaca Jilid 1 (huruf tunggal berharakat, dibaca per huruf).
export const CONTOH_BACAAN_JILID_1 = [
  ['بَ', 'تَ', 'ثَ', 'جَ', 'حَ', 'خَ'],
  ['دَ', 'ذَ', 'رَ', 'زَ', 'سَ', 'شَ'],
  ['صَ', 'ضَ', 'طَ', 'ظَ', 'عَ', 'غَ'],
  ['فَ', 'قَ', 'كَ', 'لَ', 'مَ', 'نَ'],
  ['كَ', 'تَ', 'بَ', 'سَ', 'جَ', 'دَ'],
  ['قَ', 'رَ', 'أَ', 'نَ', 'زَ', 'لَ'],
];

export const IQRO_JILID = [
  {
    jilid: 1,
    judul: 'Huruf Hijaiyah & Fathah',
    ringkasan:
      'Mengenal 28 huruf hijaiyah lepas dan membacanya dengan harakat fathah — gerbang pertama membaca Al-Qur\u2019an.',
    topik: [
      'Mengenal bentuk & nama 28 huruf hijaiyah',
      'Membaca huruf berharakat fathah (a, ba, ta, ...)',
      'Latihan deretan huruf tunggal berharakat',
      'Membedakan huruf yang mirip (ba-ta-tsa, jim-ha-kha)',
    ],
  },
  {
    jilid: 2,
    judul: 'Kasrah, Dhammah & Huruf Sambung',
    ringkasan:
      'Melengkapi tiga harakat dasar lalu mulai menyambung huruf menjadi suku kata dan kata sederhana.',
    topik: [
      'Membaca huruf berharakat kasrah (i) dan dhammah (u)',
      'Huruf bersambung 2–3 huruf dalam satu kata',
      'Kata sederhana berharakat campuran',
      'Pengantar bacaan panjang (mad thabi\u2019i)',
    ],
  },
  {
    jilid: 3,
    judul: 'Tanwin, Sukun & Mad',
    ringkasan:
      'Membaca tanwin (an-in-un), huruf mati (sukun), dan aturan panjang-pendek bacaan.',
    topik: [
      'Tanwin fathah, kasrah, dan dhammah',
      'Huruf sukun (mati) di tengah kata',
      'Mad thabi\u2019i dan bacaan panjang 2 harakat',
      'Membaca kalimat pendek dari ayat',
    ],
  },
  {
    jilid: 4,
    judul: 'Tasydid & Hukum Nun Mati',
    ringkasan:
      'Mengenal tasydid (huruf dobel) dan hukum bacaan nun mati/tanwin secara bertahap.',
    topik: [
      'Tasydid: membaca huruf rangkap dengan tekanan',
      'Idzhar: nun mati dibaca jelas',
      'Idgham: nun mati melebur ke huruf berikutnya',
      'Iqlab & ikhfa secara pengenalan',
      'Qalqalah pada huruf ق ط ب ج د',
    ],
  },
  {
    jilid: 5,
    judul: 'Tajwid Terapan & Waqaf',
    ringkasan:
      'Memantapkan hukum tajwid dan belajar berhenti (waqaf) serta memulai (ibtida) dengan benar.',
    topik: [
      'Hukum mim mati: ikhfa syafawi, idgham mimi, idzhar syafawi',
      'Mad jaiz munfashil & mad wajib muttasil',
      'Tanda-tanda waqaf (م، ج، لا، صلى، قلى)',
      'Bacaan gharib sederhana dalam Al-Qur\u2019an',
    ],
  },
  {
    jilid: 6,
    judul: 'Kelancaran & Khatam Iqro',
    ringkasan:
      'Membaca lancar potongan ayat dan surah-surah pendek Juz \u2018Amma dengan tajwid terapan.',
    topik: [
      'Membaca lancar ayat-ayat pilihan',
      'Surah-surah pendek Juz \u2018Amma',
      'Tajwid terapan menyeluruh',
      'Adab membaca Al-Qur\u2019an & doa khatam Iqro',
    ],
  },
];
