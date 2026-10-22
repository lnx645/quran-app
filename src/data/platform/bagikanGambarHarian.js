/**
 * Modul platform: render & bagikan "gambar harian" (ayat / hadits) sebagai
 * PNG potret 1080×1350 memakai Canvas API.
 *
 * SENGAJA terpisah dan HANYA diimpor secara DINAMIS (import()) dari
 * KartuHarian.jsx saat tombol "Bagikan sebagai Gambar" ditekan — logika
 * canvas ini tidak boleh membebani chunk Beranda / entry aplikasi.
 *
 * Desain gambar: tipografi & garis geometris SAJA (tanpa ilustrasi figur) —
 * latar emerald tua (token theme colors.primaryDeep), panel emeraldPanel,
 * bingkai garis ganda emas dengan berlian sudut, teks Arab font Amiri
 * (sudah dimuat aplikasi via Google Fonts), terjemahan/arti, sumber, dan
 * kaki "NurQalam — Al-Qur'an & Ibadah • nurqalam.my.id".
 */
import { theme } from '../../app/theme.js';

const LEBAR = 1080;
const TINGGI = 1350;
const LEBAR_TEKS = 824; // 1080 - 2 × 128 (margin isi di dalam bingkai)
const KAKI_TEKS = "NurQalam — Al-Qur'an & Ibadah • nurqalam.my.id";

/** Bungkus teks menjadi baris-baris yang muat selebar lebarMaks di ctx. */
function bungkusTeks(ctx, teks, lebarMaks) {
  const kata = String(teks ?? '').trim().split(/\s+/).filter(Boolean);
  const baris = [];
  let kini = '';
  for (const k of kata) {
    const calon = kini ? `${kini} ${k}` : k;
    if (kini && ctx.measureText(calon).width > lebarMaks) {
      baris.push(kini);
      kini = k;
    } else {
      kini = calon;
    }
  }
  if (kini) baris.push(kini);
  return baris;
}

/** Berlian kecil (persegi diputar 45°) — ornamen geometris sudut & pemisah. */
function gambarBerlian(ctx, x, y, r, warna) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = warna;
  ctx.fillRect(-r / 2, -r / 2, r, r);
  ctx.restore();
}

/** Bintang-8 girih sederhana: dua persegi bertumpuk (0° & 45°), garis saja. */
function gambarBintangGirih(ctx, x, y, r, warna) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = warna;
  ctx.lineWidth = 2;
  for (const sudut of [0, Math.PI / 4]) {
    ctx.save();
    ctx.rotate(sudut);
    ctx.strokeRect(-r / 2, -r / 2, r, r);
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

/** Tunggu font aplikasi siap agar teks Arab (Amiri) tidak tergambar fallback. */
async function tungguFontSiap() {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load("400 58px Amiri"),
      document.fonts.load("700 58px Amiri"),
      document.fonts.load("700 34px Inter"),
      document.fonts.load("400 37px Inter"),
      document.fonts.load("700 44px 'Playfair Display'"),
    ]);
  } catch {
    /* abaikan: lanjut dengan font apa adanya setelah fonts.ready */
  }
  try {
    await document.fonts.ready;
  } catch {
    /* abaikan */
  }
}

/**
 * Susun blok teks (judul / Arab / terjemahan) dengan penyusutan ukuran font
 * bertahap sampai total tingginya muat di area isi kanvas.
 * Mengembalikan { blok: [{baris, font, lineHeight, warna, rtl, jarakAtas}], tinggi }.
 */
function susunBlok(ctx, { judul, arab, terjemahan }) {
  const warna = theme.colors;
  for (const skala of [1, 0.92, 0.84, 0.76, 0.68]) {
    const blok = [];
    let tinggi = 0;
    const tambah = (teks, { font, lineHeight, warnaTeks, rtl = false, jarakAtas = 0 }) => {
      if (!teks) return;
      ctx.font = font;
      const baris = bungkusTeks(ctx, teks, LEBAR_TEKS);
      if (!baris.length) return;
      blok.push({ baris, font, lineHeight, warna: warnaTeks, rtl, jarakAtas });
      tinggi += jarakAtas + baris.length * lineHeight;
    };
    if (judul) {
      tambah(judul, {
        font: `700 ${Math.round(46 * skala)}px 'Playfair Display', Georgia, serif`,
        lineHeight: Math.round(46 * skala * 1.3),
        warnaTeks: warna.goldLight,
        jarakAtas: 0,
      });
    }
    if (arab) {
      const ukuran = Math.round(58 * skala);
      tambah(arab, {
        font: `400 ${ukuran}px Amiri, 'Scheherazade New', serif`,
        lineHeight: Math.round(ukuran * 1.95),
        warnaTeks: '#FFFFFF',
        rtl: true,
        jarakAtas: judul ? 36 : 0,
      });
    }
    if (terjemahan) {
      const ukuran = Math.round(37 * skala);
      tambah(terjemahan, {
        font: `400 ${ukuran}px Inter, system-ui, sans-serif`,
        lineHeight: Math.round(ukuran * 1.55),
        warnaTeks: 'rgba(255, 255, 255, 0.94)',
        jarakAtas: blok.length ? 42 : 0,
      });
    }
    // Area isi aman: dari ±190 sampai ±1130 (di atas sumber & kaki).
    if (tinggi <= 900 || skala === 0.68) return { blok, tinggi };
  }
  return { blok: [], tinggi: 0 };
}

/**
 * Gambar kanvas harian dan kembalikan Blob PNG.
 * payload: { label, judul?, arab?, terjemahan?, sumber }
 */
export async function buatBlobGambarHarian({ label, judul, arab, terjemahan, sumber }) {
  await tungguFontSiap();
  const canvas = document.createElement('canvas');
  canvas.width = LEBAR;
  canvas.height = TINGGI;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D tidak tersedia di perangkat ini.');
  const warna = theme.colors;

  // — Latar: emerald tua penuh + panel emerald di dalam bingkai —
  ctx.fillStyle = warna.primaryDeep;
  ctx.fillRect(0, 0, LEBAR, TINGGI);
  ctx.fillStyle = warna.emeraldPanel;
  ctx.globalAlpha = 0.35;
  ctx.fillRect(62, 62, LEBAR - 124, TINGGI - 124);
  ctx.globalAlpha = 1;

  // — Bingkai garis ganda emas + berlian sudut —
  ctx.strokeStyle = warna.gold;
  ctx.lineWidth = 3;
  ctx.strokeRect(44, 44, LEBAR - 88, TINGGI - 88);
  ctx.strokeStyle = warna.goldLight;
  ctx.lineWidth = 1;
  ctx.strokeRect(62, 62, LEBAR - 124, TINGGI - 124);
  for (const [x, y] of [[44, 44], [LEBAR - 44, 44], [44, TINGGI - 44], [LEBAR - 44, TINGGI - 44]]) {
    gambarBerlian(ctx, x, y, 16, warna.gold);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // — Label atas + ornamen girih —
  try {
    ctx.letterSpacing = '6px';
  } catch {
    /* letterSpacing kanvas belum didukung di semua peramban */
  }
  ctx.font = "700 32px Inter, system-ui, sans-serif";
  ctx.fillStyle = warna.goldLight;
  ctx.fillText(String(label ?? '').toUpperCase(), LEBAR / 2, 148);
  try {
    ctx.letterSpacing = '0px';
  } catch {
    /* abaikan */
  }
  gambarBintangGirih(ctx, LEBAR / 2, 196, 34, warna.gold);

  // — Blok isi (judul / Arab / terjemahan), terpusat vertikal —
  const { blok, tinggi } = susunBlok(ctx, { judul, arab, terjemahan });
  let y = Math.max(268, (TINGGI - tinggi) / 2 + 30);
  for (const b of blok) {
    y += b.jarakAtas;
    ctx.font = b.font;
    ctx.fillStyle = b.warna;
    ctx.direction = b.rtl ? 'rtl' : 'ltr';
    for (const baris of b.baris) {
      y += b.lineHeight;
      // fillText menggambar dari baseline: geser agar ritme baris pas.
      ctx.fillText(baris, LEBAR / 2, y - b.lineHeight * 0.22);
    }
  }
  ctx.direction = 'ltr';

  // — Pemisah geometris + sumber —
  const ySumber = Math.min(y + 74, 1152);
  ctx.strokeStyle = warna.gold;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(LEBAR / 2 - 170, ySumber - 34);
  ctx.lineTo(LEBAR / 2 - 26, ySumber - 34);
  ctx.moveTo(LEBAR / 2 + 26, ySumber - 34);
  ctx.lineTo(LEBAR / 2 + 170, ySumber - 34);
  ctx.stroke();
  gambarBerlian(ctx, LEBAR / 2, ySumber - 34, 13, warna.gold);
  ctx.font = "700 34px Inter, system-ui, sans-serif";
  ctx.fillStyle = warna.goldLight;
  const barisSumber = bungkusTeks(ctx, sumber ?? '', LEBAR_TEKS);
  barisSumber.forEach((baris, i) => {
    ctx.fillText(baris, LEBAR / 2, ySumber + 14 + i * 46);
  });

  // — Kaki —
  ctx.font = "400 27px Inter, system-ui, sans-serif";
  ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
  ctx.fillText(KAKI_TEKS, LEBAR / 2, TINGGI - 84);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Gagal membuat gambar PNG.');
  return blob;
}

/**
 * Buat gambar lalu bagikan via Web Share API (berkas PNG) bila didukung;
 * selain itu unduh sebagai PNG.
 * Mengembalikan 'dibagikan' | 'diunduh' | 'batal' (pengguna menutup panel
 * bagikan). Kegagalan lain dilempar sebagai Error untuk ditangani pemanggil
 * (Toast).
 */
export async function bagikanGambarHarian(payload, namaBerkas = 'noor-harian.png') {
  const blob = await buatBlobGambarHarian(payload);
  const berkas = new File([blob], namaBerkas, { type: 'image/png' });

  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [berkas] })
  ) {
    try {
      await navigator.share({
        files: [berkas],
        title: payload.label ?? 'NurQalam — Harian',
        text: payload.sumber ?? '',
      });
      return 'dibagikan';
    } catch (err) {
      if (err && err.name === 'AbortError') return 'batal';
      // Bagikan gagal karena alasan lain → jatuh ke unduhan di bawah.
    }
  }

  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = namaBerkas;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
  return 'diunduh';
}

export default bagikanGambarHarian;
