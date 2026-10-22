# Aktivasi Akun & Sinkronisasi (Supabase)

Fitur akun bersifat **opsional dan mati secara bawaan**. Aplikasi hanya
menampilkan formulir masuk bila dua variabel lingkungan tersedia saat
build. Ikuti langkah berikut (±5 menit) untuk mengaktifkannya.

## 1. Buat proyek Supabase

1. Buka https://supabase.com → **New project** (paket gratis cukup).
2. Catat **Project URL** dan **anon public key** dari
   *Project Settings → API*.

## 2. Buat tabel + kebijakan akses

1. Buka **SQL Editor** di dashboard proyek.
2. Tempel seluruh isi `supabase/skema.sql` dari repo ini → **Run**.

## 3. Atur cara masuk (Authentication)

1. **Authentication → Providers → Email**: pastikan aktif. Masuk memakai
   tautan email (magic link) — tanpa kata sandi.
2. (Opsional) **Google**: aktifkan dan isi Client ID/Secret dari Google
   Cloud Console bila ingin tombol "Masuk dengan Google" berfungsi.
3. **Authentication → URL Configuration**:
   - *Site URL*: `https://nurqalam.my.id`
   - *Redirect URLs*: tambahkan `https://nurqalam.my.id/akun`
     (dan alamat Vercel lain yang dipakai).

## 4. Pasang variabel lingkungan

Di Vercel (Project → Settings → Environment Variables), tambahkan:

- `VITE_SUPABASE_URL` = Project URL
- `VITE_SUPABASE_ANON_KEY` = anon public key

Lalu **redeploy** agar build baru membacanya. Untuk pengembangan lokal,
salin `.env.example` menjadi `.env.local` dan isi nilainya di sana.

> Anon key memang dirancang untuk tersemat di aplikasi klien — keamanan
> data dijaga oleh Row Level Security di langkah 2, bukan oleh
> kerahasiaan kunci ini. Jangan pernah memakai *service role key* di
> aplikasi.

## 5. Uji

1. Buka `https://nurqalam.my.id/akun` → formulir masuk harus tampil
   (bukan lagi kartu "belum diaktifkan").
2. Masuk dengan email → ketuk tautan di kotak masuk → kembali ke
   halaman akun dalam keadaan masuk.
3. Tekan **Sinkronkan Sekarang** → di dashboard Supabase, tabel
   `data_pengguna` harus berisi satu baris milik pengguna itu.
4. Buka peramban/perangkat lain, masuk dengan email yang sama,
   sinkronkan → progres dari perangkat pertama diterapkan.
