# Sumber Audio Iqro Jilid 1 — Latihan Membaca

20 berkas MP3 bunyi baris latihan (`j1-01.mp3` … `j1-20.mp3`), satu berkas
per baris latihan Iqro Jilid 1, dibunyikan halaman belajar Iqro
(`/iqro/1`) lewat tombol dengar di tiap baris.

## Pemetaan berkas ↔ baris

Nomor berkas mengikuti urutan baris di data aplikasi
(`src/data/sources/iqroFull.js`, Jilid 1): halaman 1 baris 1–5 =
`j1-01`…`j1-05`, halaman 2 baris 1–5 = `j1-06`…`j1-10`, halaman 3 =
`j1-11`…`j1-15`, halaman 4 = `j1-16`…`j1-20`.

## Cara dihasilkan

- Dihasilkan lokal oleh pengembang memakai **Piper TTS** (mesin
  text-to-speech sumber terbuka) dengan model suara Arab
  **ar_JO-kareem-medium** dari repositori `rhasspy/piper-voices`
  (Hugging Face).
- Teks yang diucapkan = teks Arab baris latihan persis dari
  `src/data/sources/iqroFull.js` (Jilid 1) — pemetaan baris↔berkas
  dijamin oleh proses pembuatannya (bukan hasil memotong rekaman
  orang lain).
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
