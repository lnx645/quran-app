# Sumber Audio Hijaiyah — Mode Anak

28 berkas MP3 nama huruf hijaiyah (`01-alif.mp3` … `28-ya.mp3`), satu berkas
per huruf, dibunyikan Mode Anak (`/anak`) sebagai jalur suara UTAMA agar
tidak bergantung pada paket suara (TTS) perangkat pengguna.

## Cara dihasilkan

- Dihasilkan lokal oleh pengembang memakai **Piper TTS** (mesin text-to-speech
  sumber terbuka) dengan model suara Arab **ar_JO-kareem-medium** dari
  repositori `rhasspy/piper-voices` (Hugging Face).
- Teks yang diucapkan = nama huruf berharakat persis dari
  `src/data/sources/anakData.js` (mis. أَلِفْ, بَاءْ, جِيمْ) — pemetaan
  huruf↔berkas dijamin oleh proses pembuatannya (bukan hasil memotong
  rekaman orang lain).
- Kecepatan diturunkan (`--length-scale 1.3`) agar jelas untuk anak,
  tepi hening dipangkas lembut, dan level suara dinormalisasi (loudnorm).
- Total ukuran 28 berkas ±86 KB.

## Catatan

Suara ini adalah suara sintetis (mesin), dipilih karena konsisten dan
selalu tersedia di semua perangkat. Untuk peniruan makhraj yang paling
tepat, anak tetap dianjurkan belajar dengan bimbingan orang tua/guru —
sejalan dengan catatan di dalam aplikasi.
