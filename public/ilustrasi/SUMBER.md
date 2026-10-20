# Sumber Ilustrasi — Aplikasi Noor (quran-app)

Tanggal riset & pemasangan: 2026-10-20.
Gambar unduhan di folder ini berasal dari **Wikimedia Commons** dan dipilih
HANYA yang lisensinya jelas bebas (domain publik / CC0 / CC-BY). Setiap
gambar diverifikasi lisensinya di API Wikimedia Commons dan diperiksa
visualnya sebelum dipakai. Pengecualian: ilustrasi langkah wudhu
(`wudhu-*.svg`) adalah **karya orisinal proyek** — lihat bagian 4.

---

## 1. Panduan Tajwid — diagram makhraj

### `makhraj-sakkaki.png` (dipakai)
- **Judul sumber:** Sakkaki makharij al-huruf
- **Pembuat:** Yūsuf ibn Abī Bakr as-Sakkākī (1160–1229), diagram makharijul
  huruf dari kitab *Miftāḥ al-ʿUlūm*
- **Lisensi:** Public domain (domain publik)
- **URL sumber:** https://commons.wikimedia.org/wiki/File:Sakkaki_makharij_al-huruf.png
- **Catatan:** diagram garis klasik satu gambar yang memuat seluruh titik
  artikulasi (tenggorokan di kanan, lidah di tengah, bibir di kiri). Dipakai
  sebagai diagram rujukan di bagian "Makhraj Huruf" — lima kelompok makhraj
  dijelaskan pada kartu teks di bawahnya. Diagram makhraj modern per-kelompok
  dengan lisensi bebas TIDAK ditemukan di Wikimedia Commons (pencarian
  "makharij/makhraj/articulation" — hasil lain berupa PDF buku teks atau
  situs web tanpa lisensi bebas yang jelas, ditolak).

## 2. Panduan Sholat — siluet gerakan

Satu set poster urutan sholat berlisensi CC0 diekstrak per posisi dan
diwarnai ulang menjadi siluet emerald tunggal agar konsisten dengan tema
aplikasi (modifikasi diizinkan CC0):

### `sholat-berdiri.png`, `sholat-rukuk.png`, `sholat-duduk.png`, `sholat-sujud.png` (dipakai)
- **Judul sumber:** Salat or Muslim Prayers — Illustration showing the
  sequence and recitations made in each posture
- **Pembuat:** Visions International, Orlando, Florida, USA (poster);
  diunggah ke Wikimedia Commons oleh Ayman.alhasan (2013)
- **Lisensi:** CC0 1.0 — http://creativecommons.org/publicdomain/zero/1.0/deed.en
- **URL sumber:** https://commons.wikimedia.org/wiki/File:Salat_or_Muslim_Prayers_-_Illustration_showing_the_sequence_and_recitations_made_in_each_posture.jpg
- **Catatan pemakaian (transparan):** poster asli memuat 4 postur yang
  digambar bertumpuk. Yang diekstrak: **berdiri** (dipakai juga untuk doa
  iftitah, qiroah, dan i'tidal karena posturnya sama-sama berdiri),
  **rukuk**, **duduk** (dipakai untuk duduk antara dua sujud, tasyahud, dan
  salam — postur duduknya sama), dan **sujud**. Takbiratul ihram memakai
  siluet berdiri; posisi mengangkat tangan khas takbir tidak tergambar
  pada sumber ini.

## 3. Panduan Wudhu — foto praktik

### `wudhu-praktik.jpg` (dipakai)
- **Judul sumber:** Ablution (Wudu) Süleymaniye Mosque, Istanbul
  (6328282594)
- **Pembuat/fotografer:** np&djjewell (Flickr)
- **Lisensi:** CC BY 2.0 — https://creativecommons.org/licenses/by/2.0
- **URL sumber:** https://commons.wikimedia.org/wiki/File:Ablution_(Wudu)_S%C3%BCleymaniye_Mosque,_Istanbul_(6328282594).jpg
- **Catatan:** foto suasana tempat wudhu Masjid Süleymaniye, Istanbul —
  dipakai sebagai ilustrasi pembuka tab Wudhu dengan keterangan kredit
  di halaman.

### Yang TIDAK tersedia bebas (dicatat jujur)
- **Ilustrasi/diagram per langkah wudhu** (membasuh wajah, tangan, dst.):
  TIDAK ditemukan set ilustrasi langkah berlisensi bebas di Wikimedia
  Commons. Pencarian "wudu", "wudhu steps", "wudu diagram", "taharah",
  "ablution islam" hanya menghasilkan foto orang asli yang berbeda-beda
  (tidak konsisten sebagai set langkah) dan PDF buku teks. **Solusi:
  langkah wudhu kini memakai ilustrasi orisinal buatan proyek sendiri —
  lihat bagian 4 di bawah.**
- **Ilustrasi tayammum per langkah:** juga tidak ditemukan sumber bebas;
  tab Tayammum tetap teks bernomor.

## 4. Panduan Wudhu — ilustrasi langkah ORISINAL proyek (dipakai)

Karena set ilustrasi langkah wudhu berlisensi bebas tidak ditemukan,
delapan figur berikut **digambar sendiri oleh tim proyek** (SVG buatan
tangan, bukan unduhan dan bukan hasil tracing karya orang lain):

### `wudhu-tangan.svg`, `wudhu-kumur.svg`, `wudhu-hidung.svg`, `wudhu-wajah.svg`, `wudhu-lengan.svg`, `wudhu-kepala.svg`, `wudhu-telinga.svg`, `wudhu-kaki.svg` (dipakai)
- **Pembuat:** tim proyek Noor (karya orisinal, 2026-10-20)
- **Lisensi:** karya proyek sendiri — bebas dipakai di dalam aplikasi ini
- **Gaya:** satu bahasa visual dengan siluet sholat di bagian 2 — figur
  siluet emerald tunggal tanpa detail wajah, bagian tubuh yang dibasuh
  pada langkah tersebut disorot warna emas, air digambarkan sebagai
  tetes/gelombang biru lembut beraksen emas.
- **Pemetaan langkah:** telapak tangan di bawah keran (langkah 1),
  berkumur & istinsyaq/membersihkan hidung (langkah 2, dua figur
  berdampingan), wajah (3), tangan sampai siku (4), kepala (5),
  telinga (6), kaki sampai mata kaki (7). Niat, basmalah, dan doa
  memang teks saja.
- **Uji kualitas:** setiap figur dirender ke PNG dan diperiksa visual
  (proporsi & keterbacaan langkah dalam mode terang dan gelap) sebelum
  dipasang; figur yang gagal proporsi digambar ulang sampai pantas.
- Foto praktik Süleymaniye (bagian 3) tetap dipertahankan sebagai
  gambar konteks di kepala tab Wudhu, bukan di langkah.
- Foto hitam-putih "A Muslim man performs ablution (wudu) during the holy
  month of Ramadan" (CC BY-SA 4.0) dievaluasi tetapi TIDAK dipakai —
  monokrom dan suasana dokumenter, tidak selaras gaya panduan.

---

## Ringkasan verifikasi lisensi (API Wikimedia Commons, 2026-10-20)

| File lokal | Lisensi sumber | Status |
|---|---|---|
| makhraj-sakkaki.png | Public domain | dipakai |
| sholat-berdiri.png | CC0 (ekstrak dari poster) | dipakai |
| sholat-rukuk.png | CC0 (ekstrak dari poster) | dipakai |
| sholat-duduk.png | CC0 (ekstrak dari poster) | dipakai |
| sholat-sujud.png | CC0 (ekstrak dari poster) | dipakai |
| wudhu-praktik.jpg | CC BY 2.0 (np&djjewell) | dipakai + kredit di halaman |
| wudhu-tangan.svg | Karya orisinal proyek | dipakai |
| wudhu-kumur.svg | Karya orisinal proyek | dipakai |
| wudhu-hidung.svg | Karya orisinal proyek | dipakai |
| wudhu-wajah.svg | Karya orisinal proyek | dipakai |
| wudhu-lengan.svg | Karya orisinal proyek | dipakai |
| wudhu-kepala.svg | Karya orisinal proyek | dipakai |
| wudhu-telinga.svg | Karya orisinal proyek | dipakai |
| wudhu-kaki.svg | Karya orisinal proyek | dipakai |
