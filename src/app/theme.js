// Design system "Noor" v2 — tema premium "emerald & gold" mobile-first.
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
    text: '#1E2A26',
    muted: '#6B7A72',
    faint: '#9BA9A1',
    border: '#E6D9BC', // border hangat
    onPrimary: '#FFFFFF', // teks di atas emerald
    danger: '#B91C1C',
    success: '#15803D',
  },
  fonts: {
    arabic: "'Amiri', 'Scheherazade New', serif",
    display: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
  radii: { sm: 10, md: 16, lg: 20, pill: 999 },
  shadows: {
    card: '0 6px 20px rgba(11, 83, 69, 0.10)',
    lift: '0 14px 34px rgba(11, 83, 69, 0.20)',
    player: '0 -10px 30px rgba(4, 37, 31, 0.38)',
  },
  pattern:
    // Ubin bintang-8 girih (SVG inline). Cocok di atas latar gelap emerald.
    "url(\"data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A227' stroke-width='1.1' opacity='0.9'%3E%3Crect x='21' y='21' width='22' height='22'/%3E%3Crect x='21' y='21' width='22' height='22' transform='rotate(45 32 32)'/%3E%3Ccircle cx='32' cy='32' r='3.4'/%3E%3Cpath d='M0 32h14M50 32h14M32 0v14M32 50v14'/%3E%3C/g%3E%3C/svg%3E\")",
  breakpoints: { sm: 480, md: 768 },
};

export default theme;
