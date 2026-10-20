// Design system "Noor" — tema Islami: emerald gelap + aksen emas + latar ivory.
// SEMUA komponen wajib memakai token dari sini, jangan hardcode hex.
export const theme = {
  colors: {
    primary: '#0D7C6C', // emerald utama
    primaryDark: '#0A5F53', // gradasi header/player
    primaryDeep: '#07332C', // emerald paling gelap
    primarySoft: '#E3F2EE', // latar lembut emerald
    gold: '#C9A227', // aksen emas
    goldLight: '#E3C766',
    goldSoft: '#F7EFD2',
    bg: '#FBF7EF', // ivory hangat
    surface: '#FFFFFF',
    surfaceAlt: '#F5EFE2',
    text: '#1E293B', // slate gelap
    muted: '#64748B',
    faint: '#94A3B8',
    border: '#E7DFC9', // border hangat
    danger: '#B91C1C',
    success: '#15803D',
  },
  fonts: {
    arabic: "'Amiri', 'Scheherazade New', serif",
    display: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
  radii: { sm: 8, md: 14, lg: 20, pill: 999 },
  shadows: {
    card: '0 2px 10px rgba(13, 95, 83, 0.08)',
    lift: '0 8px 24px rgba(13, 95, 83, 0.16)',
    player: '0 -6px 24px rgba(7, 51, 44, 0.25)',
  },
  pattern:
    // Pola geometris arabesque (SVG inline, opacity diatur pemakai lewat wrapper)
    "url(\"data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A227' stroke-width='1'%3E%3Cpath d='M28 4 L52 28 L28 52 L4 28 Z'/%3E%3Cpath d='M28 14 L42 28 L28 42 L14 28 Z'/%3E%3Ccircle cx='28' cy='28' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
  breakpoints: { sm: 480, md: 768 },
};

export default theme;
