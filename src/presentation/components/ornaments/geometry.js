// ============================================================
// geometry.js — konstruksi geometri Islami MATEMATIS (bukan gambar bebas).
// Semua titik poligon dihitung dari rumus trigonometri presisi:
//  - titikPolar(cx, cy, r, derajat) → koordinat titik pada lingkaran.
//  - starPolygonPath: star polygon {n/k} (jalur satu goresan, mis. {8/3}).
//  - khatamPath: bintang-8 dari DUA KOTAK (satu axis, satu rotasi 45°)
//    digabung (union) → poligon 16 titik bergantian luar/dalam.
//  - rosettePath: lingkaran bergerigi (lobus mushaf) dari busur-busur
//    simetris — titik luar & titik kontrol dihitung dari rotasi tetap.
//  - girihTile: ubin pola girih 120×120 dengan simetri lipat-8 yang
//    menyambung sempurna saat di-repeat (motif di tepi = kelanjutan motif).
// ============================================================

const RAD = Math.PI / 180;

/** Titik pada lingkaran pusat (cx,cy) jari-jari r pada sudut deg (0° = atas, searah jarum jam). */
export function titikPolar(cx, cy, r, deg) {
  const a = (deg - 90) * RAD;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function fmt(n) {
  return Math.round(n * 100) / 100;
}

function titikStr([x, y]) {
  return `${fmt(x)} ${fmt(y)}`;
}

/**
 * Star polygon {n/k}: n titik pada lingkaran, dihubungkan tiap k langkah.
 * Untuk n=8, k=3 menghasilkan bintang-8 satu goresan (khatam).
 */
export function starPolygonPath(cx, cy, r, n = 8, k = 3, rot = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) pts.push(titikPolar(cx, cy, r, rot + (i * 360) / n));
  const urutan = [];
  let idx = 0;
  const seen = new Set();
  while (!seen.has(idx)) {
    seen.add(idx);
    urutan.push(pts[idx]);
    idx = (idx + k) % n;
  }
  return `M ${urutan.map(titikStr).join(' L ')} Z`;
}

/**
 * Garis besar bintang-8 "dua kotak" (khatam): gabungan persegi axis-aligned
 * dan persegi rotasi 45° berjari-jari sudut sama.
 * Kontur luarnya = poligon 16 titik: titik luar pada sudut kelipatan 45°
 * (sudut-sudut kedua persegi, jarak R = s·√2), titik dalam pada sudut
 * kelipatan 45°+22.5° pada jarak rDalam = s / cos(22.5°) — hasil irisan
 * tepi kedua persegi (matematis eksak).
 */
export function khatamPath(cx, cy, s) {
  const R = s * Math.SQRT2; // jarak pusat → sudut persegi
  const rDalam = s / Math.cos(22.5 * RAD); // jarak pusat → titik irisan tepi
  const pts = [];
  for (let i = 0; i < 8; i++) {
    pts.push(titikPolar(cx, cy, R, i * 45));
    pts.push(titikPolar(cx, cy, rDalam, i * 45 + 22.5));
  }
  return `M ${pts.map(titikStr).join(' L ')} Z`;
}

/**
 * Rosette mushaf: lingkaran dengan tepi bergerigi N lobus simetris.
 * Tiap lobus = busur kuadratik dari titik luar P_i (r) ke P_{i+1} dengan
 * titik kontrol pada jari-jari r·faktor di sudut tengah — semua dari rotasi.
 */
export function rosettePath(cx, cy, r, lobus = 16, faktorTonjol = 1.16) {
  const pts = [];
  for (let i = 0; i < lobus; i++) pts.push(titikPolar(cx, cy, r, (i * 360) / lobus));
  let d = `M ${titikStr(pts[0])}`;
  for (let i = 0; i < lobus; i++) {
    const next = pts[(i + 1) % lobus];
    const sudutTengah = ((i + 0.5) * 360) / lobus;
    const kontrol = titikPolar(cx, cy, r * faktorTonjol, sudutTengah);
    d += ` Q ${titikStr(kontrol)} ${titikStr(next)}`;
  }
  return d + ' Z';
}

/**
 * Konten ubin girih 120×120 (string path) — simetri lipat-8, seamless:
 * bintang khatam besar di TENGAH tile + bintang khatam di EMPAT SUDUT
 * (digambar penuh di tiap sudut; saat tile di-repeat, sudut-sudut dari
 * 4 tile tetangga menyatu menjadi bintang utuh) + berlian di tengah
 * tiap tepi (setengah di tepi ini, setengahnya di tile tetangga).
 * Mengembalikan { bintang: [...path], berlian: [...path] }.
 */
export function girihTilePaths(ukuran = 120) {
  const t = ukuran;
  const c = t / 2;
  const sUtama = 15; // setengah sisi persegi bintang tengah → R ≈ 21.2
  const sSudut = 13; // bintang sudut
  const bintang = [khatamPath(c, c, sUtama)];
  // bintang sudut: 4 posisi, digambar penuh (dipotong oleh batas tile, konsisten)
  for (const [x, y] of [
    [0, 0],
    [t, 0],
    [0, t],
    [t, t],
  ]) {
    bintang.push(khatamPath(x, y, sSudut));
  }
  // berlian tengah tepi: titik berlian penuh melewati tepi → digambar di
  // kedua sisi berlawanan agar sambungan antar-tile tepat.
  const berlianSatu = (cx, cy, r) =>
    `M ${fmt(cx)} ${fmt(cy - r)} L ${fmt(cx + r)} ${fmt(cy)} L ${fmt(cx)} ${fmt(cy + r)} L ${fmt(cx - r)} ${fmt(cy)} Z`;
  const berlian = [
    berlianSatu(c, 0, 8),
    berlianSatu(c, t, 8),
    berlianSatu(0, c, 8),
    berlianSatu(t, c, 8),
  ];
  return { bintang, berlian };
}

/** Daftar awal Juz kanonik mushaf (key ayat pertama tiap Juz) — terverifikasi ke Quran.com API (juz_number). */
export const JUZ_AWAL = [
  [1, '1:1'], [2, '2:142'], [3, '2:253'], [4, '3:93'], [5, '4:24'],
  [6, '4:148'], [7, '5:82'], [8, '6:111'], [9, '7:88'], [10, '8:41'],
  [11, '9:93'], [12, '11:6'], [13, '12:53'], [14, '15:1'], [15, '17:1'],
  [16, '18:75'], [17, '21:1'], [18, '23:1'], [19, '25:21'], [20, '27:56'],
  [21, '29:46'], [22, '33:31'], [23, '36:28'], [24, '39:32'], [25, '41:47'],
  [26, '46:1'], [27, '51:31'], [28, '58:1'], [29, '67:1'], [30, '78:1'],
];

const JUZ_MAP = new Map(JUZ_AWAL.map(([juz, key]) => [key, juz]));

/** Juz yang DIMULAI pada ayat ini (dari key "surah:ayat"), atau 0 bila bukan awal Juz. */
export function juzMulaiPada(key) {
  return JUZ_MAP.get(key) ?? 0;
}

/** Juz berjalan untuk sebuah key ayat (untuk label mini-header, opsional). */
export function juzDariKey(key) {
  const [s, a] = key.split(':').map(Number);
  let juz = 1;
  for (const [j, k] of JUZ_AWAL) {
    const [js, ja] = k.split(':').map(Number);
    if (s > js || (s === js && a >= ja)) juz = j;
    else break;
  }
  return juz;
}
