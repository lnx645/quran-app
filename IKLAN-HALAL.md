# Iklan Halal — Panduan Aktivasi

Kode slot iklan halal **sudah terpasang dan dorman**: tidak ada iklan
yang tampil sampai pengelola memilih jaringan, mendaftar, dan mengisi
satu variabel lingkungan. Dokumen ini membandingkan kandidat dan
menjelaskan langkah aktivasinya.

## Kandidat jaringan (riset 22 Oktober 2026)

| Jaringan | Cara pasang | Bagi hasil / bayar | Catatan |
|---|---|---|---|
| **HalalSpark** (halalspark.co.uk) | Satu baris skrip auto-ads per situs | Publisher 60% dari harga standar; dibayar bulanan tiap tanggal 1 setelah £10 | Setiap iklan & situs diperiksa manusia; alkohol/judi/dewasa disaring. Integrasi paling sederhana. |
| **Muslim Ad Network** (muslimadnetwork.com) | Formulir pendaftaran → tim menghubungi → tag khusus | NET-30; gratis bergabung | Jaringan tertua (16 tahun); peninjauan manual ketat; permintaan terkuat dari US/UK/Kanada/GCC — lalu lintas Indonesia tetap dimonetisasi tapi lebih tipis. Syarat: konten Islami berkualitas + lalu lintas konsisten. |
| **Islamic Ad Network** (islamicadnetwork.com) | Daftar → verifikasi halal (±24 jam) → satu baris JS | Hingga 70%; bulanan via transfer bank/PayPal/Wise | Masih berlabel beta. Fokus Asia Tenggara & Timur Tengah. |
| **Halal.Ad** (halal.ad) | Daftar → buat widget → tim mengaktifkan setelah memeriksa situs | Bulanan via PayPal (hanya tayangan/klik terjual yang dihitung) | Berbasis widget per penempatan, bukan auto-ads. |

Rekomendasi awal: **HalalSpark** untuk kecepatan aktivasi (satu skrip,
tanpa negosiasi), atau **Muslim Ad Network** bila mengutamakan reputasi
jaringan dan CPM — dengan catatan permintaan iklan untuk audiens
Indonesia di semua jaringan halal masih jauh lebih kecil daripada
AdSense, jadi perlakukan ini sebagai pelengkap nilai (kesesuaian
syariah), bukan pengganti pendapatan.

## Langkah aktivasi

1. Pilih jaringan dari tabel di atas → daftar sebagai publisher untuk
   domain **nurqalam.my.id** → tunggu persetujuan situs.
2. Salin **URL skrip** resmi yang diterbitkan jaringan untuk situs ini.
3. Di Vercel (Settings → Environment Variables) tambahkan:
   `VITE_IKLAN_HALAL_URL_SKRIP` = URL skrip tersebut → **redeploy**.
4. Buka nurqalam.my.id → slot berlabel "Iklan" di bagian bawah Beranda
   harus mulai terisi. Bila jaringan memakai widget per penempatan
   (bukan auto-ads), sesuaikan `SlotIklanHalal.jsx` dengan potongan
   kode dari jaringan.
5. **Perbarui Kebijakan Privasi**: tambahkan jaringan tersebut ke
   bagian iklan di `src/presentation/pages/KebijakanPrivasiPage.jsx`
   (nama jaringan, penggunaan cookie/pengenalnya, dan tautan kebijakan
   mereka) — jangan aktifkan iklan sebelum langkah ini selesai.
6. Verifikasi penjaga: buka aplikasi Android → slot TIDAK boleh tampil
   di sana (iklan native berjalan lewat AdMob sukarela yang terpisah).

## Aturan penempatan (tetap)

- Tidak pernah di Mode Anak dan halaman-halaman anak.
- Tidak pernah di halaman baca mushaf, pemutar audio, atau halaman
  ibadah yang sedang berjalan (dzikir, sholat, dst.).
- Tidak pernah mengunci/menunda konten ibadah.
- Selalu ada label "Iklan" di atas wadahnya.
