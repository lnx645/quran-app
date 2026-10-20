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
    // Emas — aksen
    gold: '#C9A227',
    goldLight: '#E7C65A', // gradasi emas: gold → goldLight
    goldDeep: '#9A7B1A',
    goldSoft: '#F9F1D6', // latar lembut emas (ayat aktif)
    // Netral
    bg: '#FAF6EC', // ivory hangat
    surface: '#FFFFFF', // kartu
    surfaceAlt: '#F3EBD6', // kartu alternatif / item lewat
    text: '#1E2A26', // teks body — kontras AA di atas bg/surface
    muted: '#5F6E66', // teks sekunder — kontras AA di atas bg
    faint: '#8B9890', // meta/dekoratif saja (bukan teks penting)
    border: '#E6D9BC', // border hangat
    onPrimary: '#FFFFFF', // teks di atas emerald
    danger: '#B91C1C',
    success: '#15803D',
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
