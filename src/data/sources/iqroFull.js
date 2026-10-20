// Data latihan Iqro Jilid 1–6 — gaya & progresi meniru metode Iqro'
// KH As'ad Humam, tetapi SELURUH baris latihan dikarang sendiri
// (bukan salinan halaman buku fisik). Harakat ditulis eksplisit.
//
// Struktur per jilid:
// {
//   jilid: number, judul: string, deskripsi: string,
//   halaman: [{ nomor, topik, petunjuk, baris: string[] }],
//   evaluasi: { judul, petunjuk, soal: [{ nomor, bacaan, kunci, hukum? }] }
// }

export const IQRO_FULL = [
  {
    jilid: 1,
    judul: 'Huruf Hijaiyah & Fathah',
    deskripsi:
      'Fondasi membaca: mengenal 28 huruf hijaiyah lepas berharakat fathah (bunyi "a"), ' +
      'membedakan huruf yang mirip bentuknya, lalu mulai menyambung huruf menjadi kata.',
    halaman: [
      {
        nomor: 1,
        topik: 'Huruf tunggal berharakat fathah',
        petunjuk: 'Baca tiap huruf dengan bunyi "a" yang pendek dan jelas. Jangan dipanjangkan.',
        baris: [
          'أَ بَ تَ ثَ جَ حَ',
          'خَ دَ ذَ رَ زَ سَ',
          'شَ صَ ضَ طَ ظَ عَ',
          'غَ فَ قَ كَ لَ مَ',
          'نَ وَ هَ يَ أَ بَ',
        ],
      },
      {
        nomor: 2,
        topik: 'Membedakan huruf yang mirip',
        petunjuk: 'Hati-hati! Huruf dalam satu baris bentuknya mirip — bedakan titik dan makhrajnya.',
        baris: [
          'بَ تَ ثَ بَ ثَ تَ',
          'جَ حَ خَ حَ جَ خَ',
          'سَ شَ صَ ضَ سَ شَ',
          'طَ ظَ عَ غَ طَ عَ',
          'دَ ذَ رَ زَ ذَ رَ',
        ],
      },
      {
        nomor: 3,
        topik: 'Huruf sambung dua huruf',
        petunjuk: 'Dua huruf dirangkai menjadi satu suku kata. Tetap dibaca pendek berharakat fathah.',
        baris: [
          'بَتَ تَبَ ثَجَ',
          'حَبَ خَدَ دَرَ',
          'سَبَ شَجَ صَدَ',
          'طَلَ ظَهَ عَبَ',
          'غَفَ قَلَ كَمَ',
        ],
      },
      {
        nomor: 4,
        topik: 'Kata sambung tiga huruf',
        petunjuk: 'Tiga huruf bersambung dibaca mengalir tanpa putus. Semua berharakat fathah.',
        baris: [
          'كَتَبَ جَلَسَ ذَهَبَ',
          'فَتَحَ نَصَرَ خَلَقَ',
          'رَزَقَ وَجَدَ سَمَعَ',
          'بَعَثَ حَمَلَ شَرَحَ',
          'مَنَعَ قَدَرَ لَمَسَ',
        ],
      },
    ],
    evaluasi: {
      judul: 'Evaluasi Akhir Jilid 1',
      petunjuk:
        'Baca seluruh soal dengan fathah yang pendek dan jelas. ' +
        'Lulus jika seluruh soal terbaca lancar tanpa mengeja huruf per huruf.',
      soal: [
        { nomor: 1, bacaan: 'بَتَ ثَجَ حَبَ', kunci: 'bata – tsaja – haba (pendek, jangan dipanjangkan)' },
        { nomor: 2, bacaan: 'كَتَبَ', kunci: 'ka-ta-ba → "kataba" (tiga suku kata pendek)' },
        { nomor: 3, bacaan: 'جَلَسَ ذَهَبَ', kunci: 'ja-la-sa → "jalasa", dza-ha-ba → "dzahaba"' },
        { nomor: 4, bacaan: 'ثَ جَ حَ خَ', kunci: 'tsa – ja – ha – kha (bedakan makhraj jim, ha, kha)' },
        { nomor: 5, bacaan: 'فَتَحَ نَصَرَ', kunci: 'fa-ta-ha → "fataha", na-sha-ra → "nashara"' },
      ],
    },
  },
  {
    jilid: 2,
    judul: 'Huruf Sambung, Mad & Layyin',
    deskripsi:
      'Naik tingkat: huruf bersambung dalam kata berharakat fathah, lalu bacaan ' +
      'panjang 2 harakat (mad thabi\'i: alif, wawu mati, ya mati) dan bacaan layyin (aw, ai).',
    halaman: [
      {
        nomor: 1,
        topik: 'Kata bersambung berharakat fathah',
        petunjuk: 'Rangkaian huruf dibaca sebagai satu kata yang mengalir. Perhatikan perubahan bentuk huruf di awal, tengah, dan akhir.',
        baris: [
          'دَخَلَ خَرَجَ طَلَبَ',
          'سَكَنَ عَمَلَ غَسَلَ',
          'قَطَعَ كَسَبَ لَعَبَ',
          'حَصَدَ زَرَعَ نَزَلَ',
        ],
      },
      {
        nomor: 2,
        topik: 'Mad thabi\'i: fathah diikuti alif',
        petunjuk: 'Huruf berfathah yang diikuti alif dibaca PANJANG 2 harakat (seperti "baa", bukan "ba").',
        baris: [
          'بَا تَا ثَا جَا حَا خَا',
          'دَا ذَا رَا زَا سَا شَا',
          'قَالَ كَانَ بَابَ',
          'نَالَ مَالَ جَاعَ',
        ],
      },
      {
        nomor: 3,
        topik: 'Mad thabi\'i: wawu mati & ya mati',
        petunjuk: 'Dhammah + wawu sukun dibaca "uu" 2 harakat; kasrah + ya sukun dibaca "ii" 2 harakat.',
        baris: [
          'بُوْ تُوْ ثُوْ جُوْ حُوْ خُوْ',
          'بِيْ تِيْ ثِيْ جِيْ حِيْ خِيْ',
          'قُوْلَ كُوْنَ بُوْرَ',
          'قِيْلَ كِيْنَ بِيْرَ',
        ],
      },
      {
        nomor: 4,
        topik: 'Layyin & kata bermad campuran',
        petunjuk: 'Fathah + wawu/ya sukun dibaca lembut "aw"/"ai" (tidak sepanjang mad). Bedakan dengan mad pada baris 3–4.',
        baris: [
          'بَوْ بَيْ تَوْ تَيْ',
          'خَوْفَ بَيْتَ سَوْطَ',
          'قَالَ بَيْتَ خَوْفَ',
          'كَانَ قَالَ بَابَ',
        ],
      },
    ],
    evaluasi: {
      judul: 'Evaluasi Akhir Jilid 2',
      petunjuk:
        'Fokus evaluasi: bedakan bacaan PENDEK, bacaan PANJANG 2 harakat (mad), ' +
        'dan bacaan layyin (aw/ai).',
      soal: [
        { nomor: 1, bacaan: 'بَا بَ', kunci: '"baa" (panjang 2 harakat) – "ba" (pendek)', hukum: 'mad thabi\'i vs pendek' },
        { nomor: 2, bacaan: 'قَالَ كَانَ', kunci: '"qaala" – "kaana" (masing-masing 2 harakat pada mad)', hukum: 'mad thabi\'i' },
        { nomor: 3, bacaan: 'قُوْلَ قِيْلَ', kunci: '"quula" – "qiila" (panjang 2 harakat)', hukum: 'mad thabi\'i (wawu/ya mati)' },
        { nomor: 4, bacaan: 'خَوْفَ بَيْتَ', kunci: '"khawfa" – "bayta" (dibaca lembut, tidak dipanjangkan)', hukum: 'layyin' },
        { nomor: 5, bacaan: 'دَخَلَ بَابَ', kunci: '"dakhala" (pendek) – "baaba" (mad pada suku pertama)', hukum: 'campuran pendek & mad' },
      ],
    },
  },
  {
    jilid: 3,
    judul: 'Kasrah, Dhammah, Tanwin & Sukun',
    deskripsi:
      'Melengkapi tiga harakat dasar (a, i, u), mengenal tanwin (bunyi -n: an, in, un), ' +
      'dan huruf mati (sukun) di tengah kata.',
    halaman: [
      {
        nomor: 1,
        topik: 'Kasrah (i) & dhammah (u) tunggal',
        petunjuk: 'Kasrah = bunyi "i" (baris di bawah), dhammah = bunyi "u" (baris melengkung di atas). Baca pendek.',
        baris: [
          'بِ تِ ثِ جِ حِ خِ',
          'بُ تُ ثُ جُ حُ خُ',
          'بَ بِ بُ تَ تِ تُ',
          'سَ سِ سُ شَ شِ شُ',
        ],
      },
      {
        nomor: 2,
        topik: 'Kata berharakat campuran a–i–u',
        petunjuk: 'Satu kata bisa berisi tiga harakat berbeda. Baca perlahan, jangan tertukar.',
        baris: [
          'كُتِبَ فُتِحَ عُلِمَ',
          'بُسِطَ ضُرِبَ جُعِلَ',
          'رُفِعَ وُضِعَ مُنِعَ',
          'كَبِيرَ عَلِيمَ سَمِيعَ',
        ],
      },
      {
        nomor: 3,
        topik: 'Tanwin: an, in, un',
        petunjuk: 'Tanwin menambah bunyi "n" di akhir: fathatain = "an", kasratain = "in", dhammatain = "un".',
        baris: [
          'بً بٍ بٌ تً تٍ تُ',
          'كِتَابًا قَلَمٌ بَيْتٍ',
          'رَجُلٌ وَلَدًا مَسْجِدٍ',
          'نُورًا ظُلْمَةً عِلْمٍ',
        ],
      },
      {
        nomor: 4,
        topik: 'Sukun & kalimat pendek',
        petunjuk: 'Huruf bersukun dibaca mati (tanpa vokal) lalu disambung ke huruf berikutnya. Pelan-pelan di sini.',
        baris: [
          'مِنْ عَنْ لَمْ قَدْ',
          'يَكْتُبُ يَجْلِسُ يَفْتَحُ',
          'مُسْلِمٌ مُسْلِمَةً',
          'اَلْحَمْدُ لِلَّهِ',
        ],
      },
    ],
    evaluasi: {
      judul: 'Evaluasi Akhir Jilid 3',
      petunjuk:
        'Baca dengan harakat yang tepat (a/i/u), tanwin yang jelas bunyi -n-nya, ' +
        'dan sukun yang benar-benar mati.',
      soal: [
        { nomor: 1, bacaan: 'كُتِبَ', kunci: '"kutiba" (u – i – a, jangan terbaca "kataba")', hukum: 'harakat campuran' },
        { nomor: 2, bacaan: 'مُسْلِمٌ', kunci: '"muslimun" (sin mati, diakhiri bunyi -un)', hukum: 'sukun + tanwin' },
        { nomor: 3, bacaan: 'كِتَابًا', kunci: '"kitaaban" (diakhiri bunyi -an)', hukum: 'tanwin fathah' },
        { nomor: 4, bacaan: 'يَكْتُبُ', kunci: '"yaktubu" (kaf mati, bukan "yakutubu")', hukum: 'sukun' },
        { nomor: 5, bacaan: 'رَجُلٍ', kunci: '"rajulin" (diakhiri bunyi -in)', hukum: 'tanwin kasrah' },
      ],
    },
  },
  {
    jilid: 4,
    judul: 'Hamzah, Tasydid, Idgham & Waqaf Dasar',
    deskripsi:
      'Masuk tajwid dasar: hamzah dalam berbagai kursi, tasydid (huruf rangkap), ' +
      'alif lam qamariyah–syamsiah, idgham dasar, dan latihan berhenti (waqaf).',
    halaman: [
      {
        nomor: 1,
        topik: 'Hamzah & kursinya',
        petunjuk: 'Hamzah berbunyi seperti "a/i/u" yang tegas dari tenggorokan. Kenali kursinya: أ إِ ؤ ئ.',
        baris: [
          'أَ إِ أُ ؤُ ئِ',
          'سَأَلَ قَرَأَ بَدَأَ',
          'مُؤْمِنٌ مُؤْمِنَةَ',
          'شَيْءٍ بَرِيءٌ',
        ],
      },
      {
        nomor: 2,
        topik: 'Tasydid / syaddah',
        petunjuk: 'Huruf bertasydid dibaca RANGKAP dengan tekanan (seperti huruf ganda). Jangan dibaca sekali.',
        baris: [
          'رَبَّ عَلَّمَ قَدَّمَ',
          'إِنَّ ثُمَّ أَنَّ',
          'مُحَمَّدٌ',
          'اَلسَّلَامُ',
        ],
      },
      {
        nomor: 3,
        topik: 'Alif lam qamariyah & syamsiah',
        petunjuk: 'Qamariyah: lam dibaca jelas (اَلْـ). Syamsiah: lam melebur, huruf sesudahnya bertasydid.',
        baris: [
          'اَلْقَمَرُ اَلْكِتَابُ اَلْعِلْمُ',
          'اَلشَّمْسُ اَلنُّورُ اَلصَّبْرُ',
          'اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
          'وَالشَّمْسِ وَالْقَمَرِ',
        ],
      },
      {
        nomor: 4,
        topik: 'Idgham dasar & waqaf',
        petunjuk: 'Nun mati bertemu ra/lam/mim/nun/wawu/ya MELEBUR ke huruf berikutnya. Tanda ۝ artinya berhenti.',
        baris: [
          'مِنْ رَبِّهِمْ',
          'مِنْ مَالِهِ',
          'قُلْ هُوَ اللَّهُ أَحَدٌ ۝',
          'اللَّهُ الصَّمَدُ ۝',
        ],
      },
    ],
    evaluasi: {
      judul: 'Evaluasi Akhir Jilid 4',
      petunjuk:
        'Pastikan tasydid terbaca rangkap, hamzah tegas, lam qamariyah/syamsiah tepat, ' +
        'dan berhenti pada tanda waqaf.',
      soal: [
        { nomor: 1, bacaan: 'سَأَلَ', kunci: '"sa-ala" (hamzah tegas di tengah, bukan "saala" panjang)', hukum: 'hamzah' },
        { nomor: 2, bacaan: 'رَبَّ', kunci: '"rabba" (ba rangkap bertekanan)', hukum: 'tasydid' },
        { nomor: 3, bacaan: 'اَلشَّمْسُ', kunci: '"asy-syamsu" (lam tidak dibaca, syin bertasydid)', hukum: 'syamsiah' },
        { nomor: 4, bacaan: 'اَلْقَمَرُ', kunci: '"al-qamaru" (lam dibaca jelas bersukun)', hukum: 'qamariyah' },
        { nomor: 5, bacaan: 'مِنْ رَبِّهِمْ', kunci: '"mir-rabbihim" (nun melebur ke ra, tanpa dengung)', hukum: 'idgham bilaghunnah' },
      ],
    },
  },
  {
    jilid: 5,
    judul: 'Tajwid Terapan & Waqaf',
    deskripsi:
      'Tajwid terapan: hukum nun mati/tanwin (izhar, idgham, iqlab, ikhfa), ' +
      'mad wajib muttasil & jaiz munfasil, serta lafaz jalalah.',
    halaman: [
      {
        nomor: 1,
        topik: 'Izhar: nun mati dibaca jelas',
        petunjuk: 'Nun mati/tanwin bertemu huruf tenggorokan (ء هـ ع ح غ خ) dibaca JELAS tanpa dengung.',
        baris: [
          'مِنْ أَجْرٍ مِنْ عِلْمٍ',
          'عَذَابٌ أَلِيمٌ',
          'يَنْهَوْنَ أَنْعَمْتَ',
          'سَمِيعٌ عَلِيمٌ',
        ],
      },
      {
        nomor: 2,
        topik: 'Idgham, iqlab & ikhfa',
        petunjuk: 'Idgham = melebur (dengan/tanpa dengung). Iqlab = nun berubah jadi mim sebelum ba. Ikhfa = samar berdengung.',
        baris: [
          'مِنْ رَبِّهِمْ مِنْ مَالٍ',
          'مِنْ بَعْدِ',
          'مِنْ شَرِّ كُنْتُمْ',
          'مِنْ فَضْلِ',
        ],
      },
      {
        nomor: 3,
        topik: 'Mad wajib muttasil & jaiz munfasil',
        petunjuk: 'Muttasil: mad bertemu hamzah DALAM satu kata (4–5 harakat). Munfasil: mad di akhir kata bertemu hamzah di kata berikut (2/4/5 harakat).',
        baris: [
          'جَآءَ سَآءَ',
          'يَا أَيُّهَا',
          'بِمَا أُنْزِلَ',
          'اَلسَّمَآءُ',
        ],
      },
      {
        nomor: 4,
        topik: 'Lafaz jalalah & kalimat terapan',
        petunjuk: 'Lafaz اللَّه dibaca tebal (tafkhim) setelah fathah/dhammah, tipis (tarqiq) setelah kasrah.',
        baris: [
          'اَلتَّوَّابُ اَلرَّحِيمُ اَلْغَفُورُ اَلْحَكِيمُ',
          'رَسُولُ اللَّهِ بِسْمِ اللَّهِ',
          'اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
          'مَالِكِ يَوْمِ الدِّينِ',
        ],
      },
    ],
    evaluasi: {
      judul: 'Evaluasi Akhir Jilid 5',
      petunjuk:
        'Sebutkan hukumnya sebelum membaca: izhar, idgham, iqlab, ikhfa, ' +
        'mad wajib/jaiz, dan tebal-tipisnya lafaz jalalah.',
      soal: [
        { nomor: 1, bacaan: 'مِنْ بَعْدِ', kunci: '"mim-ba\'di" (nun berubah menjadi mim berdengung)', hukum: 'iqlab' },
        { nomor: 2, bacaan: 'كُنْتُمْ', kunci: '"kungtum" (nun samar berdengung sebelum ta)', hukum: 'ikhfa' },
        { nomor: 3, bacaan: 'جَآءَ', kunci: '"jaa-a" (panjang 4–5 harakat, mad dan hamzah satu kata)', hukum: 'mad wajib muttasil' },
        { nomor: 4, bacaan: 'يَا أَيُّهَا', kunci: '"yaaa ayyuhaa" (mad di akhir kata bertemu hamzah kata berikut)', hukum: 'mad jaiz munfasil' },
        { nomor: 5, bacaan: 'بِسْمِ اللَّهِ', kunci: '"bismillaah" (lam jalalah dibaca TIPIS karena didahului kasrah)', hukum: 'tarqiq lafaz jalalah' },
      ],
    },
  },
  {
    jilid: 6,
    judul: 'Kelancaran & Khatam Iqro',
    deskripsi:
      'Penyempurnaan: hukum mim mati, mad far\'i (lazim, arid lissukun, lin, badal, shilah), ' +
      'tanda-tanda waqaf, bacaan gharib, dan kelancaran ayat Juz \'Amma.',
    halaman: [
      {
        nomor: 1,
        topik: 'Hukum mim mati',
        petunjuk: 'Mim mati + ba = samar (ikhfa syafawi). Mim mati + mim = melebur (idgham mimi). Selain itu = jelas (izhar syafawi).',
        baris: [
          'هُمْ بِهِ',
          'لَكُمْ مَا',
          'أَلَمْ تَرَ',
          'هُمْ فِيهَا',
        ],
      },
      {
        nomor: 2,
        topik: 'Mad far\'i: lazim, arid, lin, badal, shilah',
        petunjuk: 'Lazim 6 harakat. Arid & lin hanya saat waqaf (boleh 2/4/6). Badal 2 harakat. Shilah memanjangkan -hu/-hi 2 harakat.',
        baris: [
          'اَلضَّآلِّينَ',
          'نَسْتَعِينْ',
          'خَوْفِ',
          'آمَنُوا بِهِ',
        ],
      },
      {
        nomor: 3,
        topik: 'Tanda waqaf & ibtida\'',
        petunjuk: 'م = harus berhenti. ج = boleh berhenti/terus (berhenti lebih baik). لا = jangan berhenti. قلى/صلى = terus lebih baik.',
        baris: [
          'م — waqaf lazim ۝ ج — waqaf jaiz ۝ لا — dilarang berhenti',
          'قُلْ هُوَ اللَّهُ أَحَدٌ ۝',
          'اَللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝',
          'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ۝',
        ],
      },
      {
        nomor: 4,
        topik: 'Bacaan gharib & kelancaran',
        petunjuk: 'Bacaan khusus (gharib): مَجْرَاهَا dibaca condong ke "e" (imalah); pada saktah berhenti sejenak tanpa napas.',
        baris: [
          'مَجْرَاهَا',
          'مَنْ رَاقٍ (saktah: berhenti sejenak tanpa mengambil napas)',
          'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
          'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝',
        ],
      },
    ],
    evaluasi: {
      judul: 'Evaluasi Akhir Jilid 6 — Siap Khatam',
      petunjuk:
        'Baca lancar dengan seluruh hukum tajwid yang telah dipelajari. ' +
        'Lulus berarti siap membaca Al-Qur\'an dan khatam Iqro.',
      soal: [
        { nomor: 1, bacaan: 'هُمْ بِهِ', kunci: '"hum-bihi" (mim samar sebelum ba)', hukum: 'ikhfa syafawi' },
        { nomor: 2, bacaan: 'اَلضَّآلِّينَ', kunci: '"adh-dhaalliin" (panjang 6 harakat, tasydid setelah mad)', hukum: 'mad lazim kilmi mutsaqqal' },
        { nomor: 3, bacaan: 'مَجْرَاهَا', kunci: '"majrayhaa" (ra dibaca condong ke bunyi e)', hukum: 'imalah (bacaan gharib)' },
        { nomor: 4, bacaan: 'قُلْ هُوَ اللَّهُ أَحَدٌ', kunci: '"qul huwallaahu ahad" (qaf qalqalah, lam jalalah tebal)', hukum: 'qalqalah + tafkhim' },
        { nomor: 5, bacaan: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', kunci: '"bismillaahir-rahmaanir-rahiim" (lam jalalah tipis; ra syamsiah)', hukum: 'tarqiq + syamsiah' },
      ],
    },
  },
];

/** Ringkasan seluruh jilid untuk daftar. */
export async function listIqroFull() {
  return IQRO_FULL.map(({ jilid, judul, deskripsi, halaman, evaluasi }) => ({
    jilid,
    judul,
    deskripsi,
    jumlahHalaman: halaman.length,
    jumlahSoal: evaluasi.soal.length,
  }));
}

/** Ambil satu jilid lengkap (halaman latihan + evaluasi). */
export async function getIqroFull(jilid) {
  const data = IQRO_FULL.find((j) => j.jilid === Number(jilid));
  if (!data) throw new Error(`Iqro Jilid ${jilid} tidak ditemukan`);
  return data;
}
