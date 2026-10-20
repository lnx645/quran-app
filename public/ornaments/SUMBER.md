# Sumber Ornamen — Aplikasi Noor (quran-app)

Tanggal riset: 2026-10-20.

## Riset sumber berlisensi bebas

Dicari via **Wikimedia Commons API** (kata kunci: "islamic geometric pattern",
"girih", "islamic star pattern", "arabesque ornament", "islamic eight-pointed star").
**Openverse** (`api.openverse.org`) dicoba tetapi API anonim menolak tanpa OAuth —
tidak ada file yang diambil dari sana.

Kandidat yang dievaluasi dan **TIDAK dipakai**:

1. `File:53561355-islamic-ornament-pattern-seamless-geometric-background-in-arabian-style.jpg`
   Lisensi: CC BY-SA 4.0 (Moelja)
   https://commons.wikimedia.org/wiki/File:53561355-islamic-ornament-pattern-seamless-geometric-background-in-arabian-style.jpg
   Alasan: terdapat **watermark stok** yang terlihat pada gambar.

2. `File:Green mosque girih.png`
   Lisensi: CC BY-SA 4.0 (İnfoCan)
   https://commons.wikimedia.org/wiki/File:Green_mosque_girih.png
   Alasan: diagram teknis girih berwarna pastel (merah jambu/hijau muda/biru),
   tidak cocok untuk dekorasi antarmuka.

3. `File:Spandrel-large scale pattern.svg`
   Lisensi: CC BY-SA 3.0 (İnfoCan)
   https://commons.wikimedia.org/wiki/File:Spandrel-large_scale_pattern.svg
   Alasan: file konstruksi arsitektur berukuran raksasa dengan warna acak,
   tidak cocok untuk dekorasi antarmuka.

4. `File:Islamic star draft3.svg`
   Lisensi: CC BY-SA 4.0
   https://commons.wikimedia.org/wiki/File:Islamic_star_draft3.svg
   Alasan: gambar konstruksi bintang berwarna biru navy/merun/hijau,
   tidak sesuai palet aplikasi.

5. Tile keramik bintang-8 bermotif hewan (Metropolitan Museum, CC0) — bermotif
   figuratif hewan, tidak cocok untuk aplikasi Al-Qur'an.

## Keputusan akhir

Semua ornamen yang **benar-benar dipakai** di aplikasi adalah **SVG orisinal
buatan sendiri** di `src/presentation/components/ornaments/`:

- `GirihPattern.jsx` — ubin pola girih bintang-8 mulus (header, hero, kartu).
- `OrnamentBand.jsx` — pita ornamen horizontal (pembatas header/player/hero).
- `CornerOrnament.jsx` — bingkai sudut ala iluminasi mushaf (bingkai kartu).
- `MosqueSilhouette.jsx` — siluet masjid: kubah bawang + 2 menara.
- `../OrnamentDivider.jsx` — pemisah seksi dengan medali bintang-8.

Karya orisinal ini **bebas lisensi pihak ketiga** dan warnanya mengikuti
token tema aplikasi (emerald `#0B5345`, emas `#C9A227`).
