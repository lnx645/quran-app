// Design system "Noor" v2.1 — tema premium "emerald & gold" mobile-first.
// Palet rombak total 2026-10-20 (permintaan user: ganti warna lama).
// SEMUA komponen wajib memakai token dari sini, jangan hardcode hex.
export const theme = {
  colors: {
    // Emerald gelap — primer
    primary: '#0B5345',
    primaryMid: '#117A65', // gradasi utama: primary → primaryMid
    primaryDark: '#06312A', // header / player / latar gelap
    primaryDeep: '#04251F', // emerald paling gelap
    primarySoft: '#DFF0E8', // latar lembut emerald (badge, highlight)
    // Panel emerald TETAP GELAP — dipakai untuk permukaan panel/tombol yang
    // isinya terang (teks putih, ikon goldLight, angka emas) sehingga terbaca
    // di SEMUA mode. Nilai terang & kontras SAMA PERSIS dengan primary*,
    // di mode gelap sengaja tidak ikut "membalik" menjadi hijau muda
    // (seperti primary) agar teks terang di atasnya tetap lolos AA.
    emeraldPanel: '#0B5345', // == primary (terang), tetap #0B5345 di gelap
    emeraldPanelMid: '#117A65', // == primaryMid (terang), tetap di gelap
    emeraldPanelGelap: '#06312A', // == primaryDark (terang), tetap di gelap
    // Emas — aksen
    gold: '#C9A227',
    goldLight: '#E7C65A', // gradasi emas: gold → goldLight
    goldDeep: '#856A12', // emas gelap — lolos AA sbg teks di ivory (4,78:1) & goldSoft (4,57:1)
    goldSoft: '#F9F1D6', // latar lembut emas (ayat aktif)
    // Netral
    bg: '#FAF6EC', // ivory hangat
    surface: '#FFFFFF', // kartu
    surfaceAlt: '#F3EBD6', // kartu alternatif / item lewat
    text: '#1E2A26', // teks body — kontras AA di atas bg/surface
    muted: '#5F6E66', // teks sekunder — kontras AA di atas bg
    faint: '#5F7268', // meta ringan — lolos AA di ivory (4,75:1) & kertas (4,63:1)
    border: '#E6D9BC', // border hangat
    onPrimary: '#FFFFFF', // teks di atas emerald
    // Token semantik teks khusus — nilainya di mode terang SAMA PERSIS
    // dengan token lama agar tampilan terang tidak berubah; varian gelap
    // memberi nilai terang yang terbaca di atas permukaan gelap.
    judul: '#04251F', // teks judul/penekanan (== primaryDeep di terang)
    teksArab: '#1E2A26', // teks Arab bacaan (== text di terang)
    teksLatin: '#5F6E66', // transliterasi latin (== muted di terang)
    teksTerjemah: '#0B5345', // terjemahan (== primary di terang)
    barKaca: 'rgba(255, 253, 244, 0.97)', // latar bar kontrol baca (kaca ivory)
    dangerSoft: '#FEF2F2', // latar ErrorBox
    dangerBorder: '#FECACA', // border ErrorBox
    kilau: '#EEE1C3', // kilau tengah Skeleton (shimmer)
    // Kertas mushaf — halaman baca (SurahPage) ala mushaf cetak
    paper: '#FBF3DC', // kertas hangat area baca
    paperCard: '#FFFDF4', // kartu ayat di atas kertas (sedikit lebih terang)
    paperDeep: '#F3E7C3', // kertas lebih gelap: highlight ayat aktif (halus)
    danger: '#B91C1C',
    success: '#15803D',
    // Warna tajwid (item 6) — kunci = kelompok aturan dari tajweedParser.
    // Dipakai HANYA pada teks Arab besar (±32px, teks besar WCAG ≥3:1) di
    // atas kertas mushaf terang/gelap. Nilai dipilih jenuh-pekat agar tetap
    // terbaca di kertas ivory (#FBF3DC) maupun kertas gelap (#21271F);
    // varian kontras menimpa peta ini dengan warna yang lebih pekat lagi.
    tajwid: {
      mad: '#1D4ED8', // biru — mad (panjang bacaan)
      ghunnah: '#C2410C', // oranye bakar — dengung
      qalqalah: '#B91C1C', // merah — pantulan qalqalah
      ikhfa: '#7E22CE', // ungu — samar (ikhfa)
      idgham: '#15803D', // hijau — lebur (idgham)
      iqlab: '#BE185D', // magenta — tukar bunyi (iqlab)
      hamzahWasal: '#6D28D9', // ungu muda-pekat — hamzah wasal (dibaca bila awal)
      lamSyamsiyah: '#0F766E', // teal — lam syamsiyah (lebur ke huruf berikutnya)
      slnt: '#78716C', // abu hangat — huruf yang tidak dibaca (slnt/silent)
    },
  },
  // Skala tipografi — hierarki display → heading → body → caption.
  // display: judul halaman; heroTitle: judul PageHero; h2: SectionTitle;
  // arabDisplay: nama surah Arab / bismillah hero.
  type: {
    display: { size: 30, lineHeight: 1.2, weight: 700 },
    heroTitle: { size: 24, lineHeight: 1.25, weight: 700 },
    h2: { size: 18, lineHeight: 1.3, weight: 700 },
    h3: { size: 16, lineHeight: 1.35, weight: 700 },
    body: { size: 15, lineHeight: 1.6, weight: 400 },
    bodySm: { size: 13.5, lineHeight: 1.6, weight: 400 },
    caption: { size: 12.5, lineHeight: 1.5, weight: 500 },
    overline: { size: 11.5, lineHeight: 1.4, weight: 700 },
    arabDisplay: { size: 46, lineHeight: 1.6, weight: 700 },
  },
  // Ritme spacing konsisten: section antar-blok, pad kartu, gap grid.
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
    xxl: 32,
    section: 26, // margin atas SectionTitle / antar-seksi halaman
    cardPad: 18, // padding kartu (mobile)
    cardPadMd: 22, // padding kartu (desktop)
    gridGap: 12, // gap grid kartu menu
  },
  // Token mikro-animasi: ringan, 150–250ms, ease-out.
  anim: {
    fast: '150ms',
    med: '220ms',
    slow: '320ms',
    ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  },
  fonts: {
    arabic: "'Amiri', 'Scheherazade New', serif",
    display: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
  radii: { sm: 10, md: 16, lg: 20, pill: 999 },
  // Gradasi kaya: emerald dalam → emas hidup. Dipakai hero/header/kartu penting.
  gradients: {
    hero: 'linear-gradient(155deg, #04251F 0%, #0B5345 52%, #117A65 100%)',
    heroGlow:
      'radial-gradient(120% 90% at 85% -10%, rgba(231, 198, 90, 0.26), transparent 55%)',
    header:
      'linear-gradient(120deg, #04251F 0%, #06312A 55%, #0B5345 100%)',
    gold: 'linear-gradient(135deg, #C9A227 0%, #E7C65A 100%)',
    goldSoftCard:
      'linear-gradient(180deg, #F9F1D6 0%, #FFFFFF 58%)',
    // Kertas mushaf MushafFrame: puncak kertas → latar halaman (130%).
    paperFrame: 'linear-gradient(180deg, #FDF9EC 0%, #FAF6EC 130%)',
  },
  shadows: {
    // Bayangan lembut BERLAPIS (2 lapis): garis kontak + sebaran jauh.
    card: '0 1px 2px rgba(11, 83, 69, 0.06), 0 8px 24px rgba(11, 83, 69, 0.10)',
    lift: '0 2px 5px rgba(11, 83, 69, 0.08), 0 16px 38px rgba(11, 83, 69, 0.18)',
    gold: '0 1px 3px rgba(201, 162, 39, 0.22), 0 10px 26px rgba(201, 162, 39, 0.30)',
    player: '0 -2px 6px rgba(4, 37, 31, 0.20), 0 -12px 32px rgba(4, 37, 31, 0.32)',
  },
  pattern:
    // Ubin bintang-8 girih (SVG inline). Cocok di atas latar gelap emerald.
    "url(\"data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A227' stroke-width='1.1' opacity='0.9'%3E%3Crect x='21' y='21' width='22' height='22'/%3E%3Crect x='21' y='21' width='22' height='22' transform='rotate(45 32 32)'/%3E%3Ccircle cx='32' cy='32' r='3.4'/%3E%3Cpath d='M0 32h14M50 32h14M32 0v14M32 50v14'/%3E%3C/g%3E%3C/svg%3E\")",
  breakpoints: { sm: 480, md: 768 },
};

export default theme;

// ===== Varian tampilan aksesibilitas (P1-1) =====
// Mode GELAP: latar gelap redup-silau, teks terang berkontras tinggi.
// Mode KONTRASTINGGI: putih/hijau pekat — semua teks ≥ 7:1 sebisa mungkin.
// Token lain (tipografi, spasi, animasi) diwarisi dari tema dasar.
// Palet gelap dirancang khusus (bukan invert): kertas mushaf = arang
// kehijauan hangat, blok ayat aktif sedikit lebih terang dengan nuansa
// zaitun-emas lembut (saturasi rendah — bukan coklat lumpur), teks Arab
// ivory hangat, terjemahan sage terang, latin emas pucat.
const varianGelap = {
  colors: {
    primary: '#35B48F',
    primaryMid: '#2E9E7D',
    primarySoft: '#14352B',
    goldDeep: '#D9AE3F', // 5,1:1 di latar gelap; 5,7:1 di goldSoft gelap
    goldSoft: '#2E2A15', // emas lembut gelap, desaturasi (dulu #3A2F0E coklat)
    bg: '#0E1512',
    surface: '#18211C',
    surfaceAlt: '#1F2B24',
    text: '#EDEBE3', // 15,5:1 di bg gelap
    muted: '#A9B8AF', // 9,0:1
    faint: '#8FA398', // ≈6,5:1 — tetap lolos AA
    border: '#2E4638',
    paper: '#21271F', // kertas arang kehijauan hangat
    paperCard: '#262E25', // kartu di atas kertas gelap
    paperDeep: '#2F382A', // ayat aktif: lebih terang dari kertas, zaitun lembut
    judul: '#F0EAD6', // judul/penekanan: ivory hangat terang
    teksArab: '#F3ECDB', // Arab: ivory hangat terang
    teksLatin: '#D9C48D', // latin: emas pucat
    teksTerjemah: '#ABCBA2', // terjemahan: sage terang
    barKaca: 'rgba(33, 39, 31, 0.97)', // bar kontrol baca menyatu kertas gelap
    dangerSoft: '#2B1512',
    dangerBorder: '#7A352A',
    kilau: '#2C3A30',
    danger: '#F87171',
    success: '#4ADE80',
    // Tajwid versi gelap: versi cerah dari warna dasar agar terbaca di
    // atas kertas arang kehijauan (#21271F) pada teks Arab besar.
    tajwid: {
      mad: '#7FB0FF',
      ghunnah: '#FF9E5E',
      qalqalah: '#FF8A80',
      ikhfa: '#D8A6FF',
      idgham: '#7ED491',
      iqlab: '#FF9EC4',
      hamzahWasal: '#B79CFF',
      lamSyamsiyah: '#5ED6C8',
      slnt: '#B8B0A6',
    },
  },
  gradients: {
    goldSoftCard: 'linear-gradient(180deg, #22301F 0%, #18211C 58%)',
    paperFrame: 'linear-gradient(180deg, #252C24 0%, #1D231D 130%)',
  },
  shadows: {
    card: '0 1px 2px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.5)',
    lift: '0 2px 5px rgba(0, 0, 0, 0.5), 0 16px 38px rgba(0, 0, 0, 0.55)',
  },
};

const varianKontras = {
  colors: {
    primary: '#00473A', // ≈10:1 di putih
    primaryMid: '#005C4B',
    primaryDark: '#00382D',
    primaryDeep: '#002A22',
    primarySoft: '#D9EDE5',
    emeraldPanel: '#00473A', // == primary kontras
    emeraldPanelMid: '#005C4B', // == primaryMid kontras
    emeraldPanelGelap: '#00382D', // == primaryDark kontras
    gold: '#7A6200',
    goldLight: '#FFE27A',
    goldDeep: '#6E570B', // 6,9:1 di putih
    goldSoft: '#FFF3C4',
    bg: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceAlt: '#F2F2F2',
    text: '#000000', // 21:1
    muted: '#333333',
    faint: '#444444',
    border: '#595959',
    paper: '#FFFFFF',
    paperCard: '#FFFFFF',
    paperDeep: '#FFEFA8',
    judul: '#002A22', // == primaryDeep kontras
    teksArab: '#000000', // == text kontras
    teksLatin: '#333333', // == muted kontras
    teksTerjemah: '#00473A', // == primary kontras
    barKaca: 'rgba(255, 255, 255, 0.97)',
    dangerSoft: '#FEF2F2',
    dangerBorder: '#FECACA',
    kilau: '#E4E4E4',
    danger: '#B00020',
    success: '#00691F',
    // Tajwid versi kontras tinggi: semua ≥4,5:1 di atas putih/kertas kontras.
    tajwid: {
      mad: '#003FA3',
      ghunnah: '#9A3400',
      qalqalah: '#B00020',
      ikhfa: '#5B00A6',
      idgham: '#00691F',
      iqlab: '#A10046',
      hamzahWasal: '#4A00A8',
      lamSyamsiyah: '#00584F',
      slnt: '#444444',
    },
  },
  gradients: {
    goldSoftCard: 'linear-gradient(180deg, #FFF3C4 0%, #FFFFFF 58%)',
    paperFrame: 'linear-gradient(180deg, #FDF9EC 0%, #FFFFFF 130%)',
  },
};

/**
 * buatTema(modeEfektif, opsi) — gabung tema dasar + varian tampilan.
 * modeEfektif: 'terang' | 'gelap' | 'kontras'.
 * opsi.fontDisleksia: pakai Atkinson Hyperlegible untuk teks Latin.
 */
export function buatTema(modeEfektif, opsi = {}) {
  const varian =
    modeEfektif === 'gelap' ? varianGelap : modeEfektif === 'kontras' ? varianKontras : null;
  const hasil = {
    ...theme,
    colors: { ...theme.colors, ...(varian?.colors ?? {}) },
    gradients: { ...theme.gradients, ...(varian?.gradients ?? {}) },
    shadows: { ...theme.shadows, ...(varian?.shadows ?? {}) },
    fonts: { ...theme.fonts },
    mode: modeEfektif,
  };
  if (opsi.fontDisleksia) {
    hasil.fonts.body = "'Atkinson Hyperlegible', 'Inter', system-ui, sans-serif";
  }
  return hasil;
}
