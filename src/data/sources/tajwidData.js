// Konten panduan tajwid (data layer) — ringkas & orisinal, ditulis untuk
// pemula. `kelompok` pada ATURAN_TAJWID HARUS sinkron dengan kelompok yang
// dihasilkan tajweedParser (KELOMPOK_TAJWID) dan kunci warna tema
// `colors.tajwid` — legenda di PanduanTajwidPage membaca peta yang sama,
// jadi warna di halaman baca dan di panduan tidak akan pernah berbeda.

export const ATURAN_TAJWID = [
  {
    kelompok: 'mad',
    nama: 'Mad (bacaan panjang)',
    kelasApi: 'madda_normal, madda_permissible, madda_necessary, madda_obligatory',
    penjelasan:
      'Huruf mad (alif, wau, ya yang didahului harakat pasangannya) dibaca panjang. Panjangnya bertingkat: mad asli 2 harakat, mad yang bertemu hamzah atau sukun bisa 4–6 harakat. Ikuti tanda mad pada huruf berwarna ini dan jangan dibaca pendek.',
    contohArab: 'قَالَ لَهُمْ',
    caraBaca: 'Huruf alif setelah fathah pada "qaa" dibaca dua harakat.',
  },
  {
    kelompok: 'ghunnah',
    nama: 'Ghunnah (dengung)',
    kelasApi: 'ghunnah',
    penjelasan:
      'Bunyi dengung dari hidung selama kira-kira 2 harakat. Terjadi terutama pada huruf nun dan mim yang bertasydid. Tahan bunyinya sejenak di hidung, jangan langsung melompat ke huruf berikutnya.',
    contohArab: 'إِنَّ ٱلنَّاسَ',
    caraBaca: 'Nun bertasydid pada "inna" dan "an-naas" didengungkan.',
  },
  {
    kelompok: 'qalqalah',
    nama: 'Qalqalah (pantulan)',
    kelasApi: 'qalaqah',
    penjelasan:
      'Huruf qalqalah — qaf, tha, ba, jim, dal (ق ط ب ج د) — yang bersukun dibaca memantul. Pantulannya ringan bila di tengah kata (sughra) dan lebih kuat bila berhenti di akhir kata (kubra).',
    contohArab: 'يَقْطَعُونَ',
    caraBaca: 'Qaf sukun pada "yaq-" dipantulkan ringan.',
  },
  {
    kelompok: 'ikhfa',
    nama: 'Ikhfa (samar)',
    kelasApi: 'ikhafa, ikhafa_shafawi',
    penjelasan:
      'Nun sukun/tanwin (atau mim sukun, pada ikhfa syafawi) dibaca samar: antara jelas dan dengung, sekitar 2 harakat, lalu bersiap ke huruf berikutnya. Berlaku sebelum 15 huruf ikhfa, misalnya ta, tsa, jim, dal, dan seterusnya.',
    contohArab: 'مِن شَرِّ',
    caraBaca: 'Nun sukun sebelum syin pada "min syarri" dibaca samar berdengung.',
  },
  {
    kelompok: 'idgham',
    nama: 'Idgham (melebur)',
    kelasApi: 'idgham_ghunnah, idgham_wo_ghunnah, idgham_shafawi, idgham_mutajanisayn, idgham_mutaqaribayn',
    penjelasan:
      'Dua bunyi dilebur menjadi satu. Nun sukun/tanwin melebur ke huruf ya, nun, mim, wau (berdengung) atau ke lam dan ra (tanpa dengung). Peleburan juga terjadi antar huruf yang berdekatan makhrajnya, termasuk mim sukun bertemu mim.',
    contohArab: 'مَن يَعْمَلْ',
    caraBaca: 'Nun sukun pada "man ya‘mal" melebur ke ya dengan dengung.',
  },
  {
    kelompok: 'iqlab',
    nama: 'Iqlab (menukar bunyi)',
    kelasApi: 'iqlab',
    penjelasan:
      'Nun sukun atau tanwin yang bertemu huruf ba ditukar bunyinya menjadi mim samar disertai dengung sekitar 2 harakat. Bibir direnggangkan sedikit, tidak dirapatkan penuh.',
    contohArab: 'مِنۢ بَعْدِ',
    caraBaca: 'Nun pada "mim ba‘di" dibaca seperti mim samar berdengung.',
  },
  {
    kelompok: 'hamzahWasal',
    nama: 'Hamzah Wasal',
    kelasApi: 'ham_wasl',
    penjelasan:
      'Hamzah wasal hanya dibaca bila bacaan dimulai dari kata itu. Bila disambung dari kata sebelumnya, hamzah ini tidak dibunyikan — bacaan langsung mengalir ke huruf sesudahnya.',
    contohArab: 'بِسْمِ ٱللَّهِ',
    caraBaca: 'Bila disambung, dibaca "bismillaah", hamzah wasalnya gugur.',
  },
  {
    kelompok: 'lamSyamsiyah',
    nama: 'Lam Syamsiyah',
    kelasApi: 'laam_shamsiyah',
    penjelasan:
      'Lam pada "al-" yang bertemu huruf syamsiyah (misalnya syin, ra, tha, nun) tidak dibaca; bunyinya melebur ke huruf berikutnya yang lalu bertasydid. Kebalikannya, lam qamariyah dibaca jelas.',
    contohArab: 'ٱلشَّمْسُ',
    caraBaca: 'Dibaca "asy-syamsu", bukan "al-syamsu" — lam-nya lebur ke syin.',
  },
  {
    kelompok: 'slnt',
    nama: 'Tidak dibaca (silent)',
    kelasApi: 'slnt',
    penjelasan:
      'Tanda ini menandai huruf yang tertulis tetapi tidak diucapkan dalam bacaan bersambung, misalnya alif jamaah di akhir kata kerja. Lewati huruf ini tanpa bunyi agar bacaan mengalir benar.',
    contohArab: 'كَتَبُواْ',
    caraBaca: 'Alif terakhir pada "katabuu" tidak dibunyikan.',
  },
];

/** Makhraj huruf ringkas: tempat keluar huruf dikelompokkan per rongga. */
export const MAKHRAJ_HURUF = [
  {
    tempat: 'Tenggorokan',
    isi: 'Pangkal tenggorokan: hamzah dan ha. Tengah tenggorokan: ‘ain dan ha (ح). Ujung tenggorokan (dekat mulut): kha dan ghain.',
  },
  {
    tempat: 'Lidah',
    isi: 'Kelompok terbesar. Pangkal lidah dengan langit-langit: qaf dan kaf. Tengah lidah: jim, syin, ya. Sisi lidah: dhad. Ujung lidah: ta, dal, tha, sin, zay, shad, nun, lam, ra, dan huruf gigi lainnya.',
  },
  {
    tempat: 'Bibir',
    isi: 'Bibir bawah dengan gigi atas: fa. Kedua bibir: ba, mim, wau — ketiganya kunci hukum mim sukun (ikhfa syafawi, idgham syafawi, izhar syafawi).',
  },
  {
    tempat: 'Hidung',
    isi: 'Rongga hidung adalah tempat ghunnah (dengung) pada nun dan mim, baik yang bertasydid maupun pada hukum ikhfa, iqlab, dan idgham berdengung.',
  },
  {
    tempat: 'Rongga mulut',
    isi: 'Huruf mad (alif, wau sukun setelah dammah, ya sukun setelah kasrah) keluar dari rongga mulut dan tenggorokan tanpa sentuhan organ — karena itu bunyinya mengalir dan bisa dipanjangkan.',
  },
];

/** Hukum nun sukun & tanwin — empat hukum pokok. */
export const HUKUM_NUN_SUKUN = [
  {
    nama: 'Izhar (jelas)',
    isi: 'Nun sukun/tanwin dibaca jelas tanpa dengung bila bertemu huruf tenggorokan: hamzah, ha, ‘ain, ha (ح), ghain, kha.',
  },
  {
    nama: 'Idgham (lebur)',
    isi: 'Melebur ke huruf berikutnya — ya, nun, mim, wau dengan dengung; lam dan ra tanpa dengung. Di NurQalam, titik leburnya berwarna hijau.',
  },
  {
    nama: 'Iqlab (tukar)',
    isi: 'Khusus bertemu ba: bunyi nun berubah menjadi mim samar berdengung. Di NurQalam berwarna magenta.',
  },
  {
    nama: 'Ikhfa (samar)',
    isi: 'Sebelum 15 huruf lainnya nun dibaca samar antara izhar dan idgham, disertai dengung ringan. Di NurQalam berwarna ungu.',
  },
];

/** Hukum mad ringkas. */
export const HUKUM_MAD = [
  {
    nama: 'Mad Asli (Thabi‘i) — 2 harakat',
    isi: 'Huruf mad tidak bertemu hamzah atau sukun sesudahnya. Ini mad dasar; semua mad lain diukur darinya.',
  },
  {
    nama: 'Mad Wajib Muttasil — 4–5 harakat',
    isi: 'Huruf mad bertemu hamzah dalam satu kata yang sama, wajib dipanjangkan.',
  },
  {
    nama: 'Mad Jaiz Munfasil — boleh 2, 4, atau 5 harakat',
    isi: 'Huruf mad di akhir kata bertemu hamzah di awal kata berikutnya; boleh dipanjangkan atau dibaca asli.',
  },
  {
    nama: 'Mad Lazim — 6 harakat',
    isi: 'Huruf mad bertemu sukun asli (termasuk huruf muqatta‘ah di awal surah seperti Alif Lam Mim), wajib enam harakat.',
  },
  {
    nama: 'Mad ‘Arid lissukun — boleh 2, 4, atau 6 harakat',
    isi: 'Huruf mad sebelum huruf terakhir kata yang disukunkan karena berhenti (waqaf). Panjangnya fleksibel saat berhenti.',
  },
];
