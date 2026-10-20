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

---

## 2026-10-20 — Ornamen unduhan untuk halaman baca mushaf (Commit: `feat(ornamen)`)

**Dipakai — sudah diverifikasi visual sebagai pola Islami otentik & simetris sempurna:**

6. `rub-el-hizb.svg` (dalam folder `public/ornaments/`)
   Lisensi: **CC BY-SA 4.0** — karya Dudaweyll
   https://commons.wikimedia.org/wiki/File:Rub_El_Hizb_Outline.svg
   Verifikasi: render PNG 500px diperiksa manual — bintang-8 (khatam) yang
   dibangun dari dua kotak berotasi 45° dengan jalinan mulus, simetri
   8-lipat sempurna, tanpa cacat. Merupakan simbol ۞ otentik penanda
   pembagian Juz dalam mushaf — dipakai sebagai medali panel nama surah
   dan penanda awal Juz.
   Catatan lisensi: atribusi pada file SUMBER.md ini sudah memenuhi
   kewajiban CC BY-SA 4.0 (file juga tetap tersedia apa adanya).

**Ditolak setelah verifikasi visual:**

7. `Islamic geometric pattern.svg` (Moelja, CC BY-SA 4.0)
   https://commons.wikimedia.org/wiki/File:Islamic_geometric_pattern.svg
   Alasan: setelah dirender dan diperiksa, polanya adalah hasil
   *auto-trace* (2157 path garis bebas) yang tidak rapi untuk UI — garis
   tidak mengikuti konstruksi geometris konsisten, skala terlalu padat,
   tidak transparan-friendly. Tidak dipakai.

**Keputusan desain:** unduhan dipakai untuk medali panel surah (aset di
atas). Seluruh ornamen lain tetap **SVG orisinal yang dihitung secara
matematis** (lihat `ornaments/geometry.js`): bintang-8 dari star-polygon
{8/3} dengan koordinat trigonomtri presisi, ubin girih dengan simetri
lipat-8 yang menyambung sempurna di tepi repeat, bingkai mushaf dengan
medali sudut proporsional.
