# Sumber Audio Iqro Jilid 1–6 — Latihan Membaca

101 berkas MP3 bunyi baris latihan, satu berkas per baris latihan Iqro
Jilid 1–6, dibunyikan halaman belajar Iqro (`/iqro/<jilid>`) lewat
tombol dengar di tiap baris: Jilid 1 = `j1-01.mp3` … `j1-20.mp3`
(20 baris), Jilid 2–6 masing-masing 16 baris (`j2-01` … `j6-16`).

## Pemetaan berkas ↔ baris

Nomor berkas mengikuti urutan baris di data aplikasi
(`src/data/sources/iqroFull.js`): Jilid 1 — halaman 1 baris 1–5 =
`j1-01`…`j1-05`, halaman 2 = `j1-06`…`j1-10`, halaman 3 =
`j1-11`…`j1-15`, halaman 4 = `j1-16`…`j1-20`. Jilid 2–6 — tiap jilid
4 halaman × 4 baris: halaman 1 = `jN-01`…`jN-04`, halaman 2 =
`jN-05`…`jN-08`, halaman 3 = `jN-09`…`jN-12`, halaman 4 =
`jN-13`…`jN-16` (N = nomor jilid).

## Cara dihasilkan

- Dihasilkan lokal oleh pengembang memakai **Piper TTS** (mesin
  text-to-speech sumber terbuka) dengan model suara Arab
  **ar_JO-kareem-medium** dari repositori `rhasspy/piper-voices`
  (Hugging Face).
- Teks yang diucapkan = teks Arab baris latihan persis dari
  `src/data/sources/iqroFull.js` — pemetaan baris↔berkas
  dijamin oleh proses pembuatannya (bukan hasil memotong rekaman
  orang lain). Jilid 1 dihasilkan lebih dulu; Jilid 2–6 dihasilkan
  22 Oktober 2026 dengan resep & model yang sama persis, dan setiap
  berkas diverifikasi (durasi wajar per isi baris + level suara sehat;
  total Jilid 2–6 = 80 berkas ±895 KB).
- Data iqro aplikasi adalah **susunan latihan sendiri** (dikarang
  mengikuti progresi metode Iqro'), **bukan salinan buku fisik** —
  jadi bunyi yang dihasilkan pun mengikuti susunan aplikasi.
- Kecepatan diturunkan (`--length-scale 1.3`) agar jelas untuk
  pemula, tepi hening dipangkas (silenceremove ambang −50 dB dua
  arah), dan level suara dinormalisasi (loudnorm I=−16).
- Format: MP3 mono 44,1 kHz 48 kbps. Total ukuran 20 berkas ±199 KB.

## Catatan

Suara ini adalah suara sintetis (mesin), dipilih karena konsisten dan
selalu tersedia di semua perangkat. Untuk peniruan makhraj yang paling
tepat, pembelajar tetap dianjurkan berlatih dengan bimbingan guru —
sejalan dengan catatan di dalam aplikasi.
