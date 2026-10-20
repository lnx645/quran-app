# Noor — Al-Qur'an & Ibadah Harian

Aplikasi web Islam: Al-Qur'an online dengan audio tersinkron per ayat & per kata
(**highlight mengikuti bacaan**), Iqro, jadwal sholat, kalkulator zakat, khatam
tracker, dan berbagai fitur ibadah harian.

Dibangun dengan **React + Vite**, **React Router**, **Emotion** (seluruh styling),
dan **react-icons** (seluruh ikon). Arsitektur: **Clean Architecture**.

## Fitur

| Rute | Fitur | Sumber Data |
| --- | --- | --- |
| `/` | Beranda & menu lengkap | — |
| `/surah/:id` (mis. `/surah/36`) | Baca surah: Arab (Uthmani), latin, terjemahan Kemenag, audio Alafasy **tersinkron timestamp per ayat & kata** (klik ayat untuk seek) | API Quran.com v4 |
| `/yasin` | Aliasan langsung ke Surah Ya-Sin (36) | API Quran.com v4 |
| `/iqro`, `/iqro/:jilid` | Belajar Iqro Jilid 1–6 (Jilid 1: 28 huruf hijaiyah + harakat interaktif) | Statis lokal |
| `/jadwal` | Jadwal sholat (metode Kemenag), countdown adzan, tanggal Hijriah, notifikasi adzan | API Aladhan |
| `/zakat` | Kalkulator zakat mal, profesi, fitrah (nisab 85 gr emas) | Logika domain murni |
| `/khatam` | Khatam tracker 30 juz + target tanggal → halaman/hari (604 hlm. Mushaf Madinah) | localStorage |
| `/tasbih` | Tasbih digital: pilihan dzikir, target, getar | — |
| `/dzikir` | Dzikir pagi & petang (Al-Ma'tsurat ringkas) dengan penghitung | Statis lokal |
| `/doa` | Doa harian (Arab, latin, arti) | Statis lokal |
| `/sholat-tracker` | Checklist 5 waktu + streak harian | localStorage |
| `/kiblat` | Arah kiblat dari Sumedang (kompas SVG + sensor perangkat) | Rumus bearing |
| `/kalender` | Kalender Hijriah & hari besar Islam | API Aladhan (gToH/hToG) |
| `/asmaul-husna` | 99 Asmaul Husna + mode hafalan | Statis lokal |
| `/kisah`, `/kisah/:slug` | Kisah 25 Nabi (ringkasan per nabi) | Statis lokal |

## Cara Sinkronisasi Audio ("Cara 2")

Satu file MP3 per surah dari Quran.com (`chapter_recitations/{reciter}/{surah}?segments=true`)
menyertakan `timestamps`: rentang ms tiap ayat (`timestamp_from`–`timestamp_to`) beserta
`segments` per kata `[indexKata, mulaiMs, selesaiMs]`. Pemutar memantau posisi audio lewat
`requestAnimationFrame`, mencari ayat aktif lalu kata aktif — keduanya di-highlight dan
ayat aktif otomatis bergeser ke tengah layar.

## Clean Architecture

```
src/
  app/            App shell, router, tema (design system Islami: emerald + emas + ivory)
  domain/         entities, repositories (kontrak), usecases (hitungZakat, hitungKiblat, hitungKhatam)
  data/           API client (Quran.com, Aladhan), DTO/mapper, repository impl, sumber statis
  presentation/   pages, components, hooks — TIDAK fetch langsung, selalu lewat repository
```

## Menjalankan

```bash
npm install
npm run dev     # mode pengembangan (Vite)
npm run build   # build produksi ke folder dist/
npm run preview # pratinjau hasil build
```

## Deploy ke Vercel

1. Push repo ini ke GitHub, lalu di [vercel.com](https://vercel.com) pilih **Add New → Project** dan impor repo.
2. Framework preset: **Vite** (terdeteksi otomatis).
3. Build Command: `npm run build` — Output Directory: `dist`.
4. Klik **Deploy**. (Tidak perlu `vercel.json` — karena SPA dengan React Router,
   bila membuka rute langsung seperti `/jadwal` agar tidak 404, tambahkan rewrite
   `/(.*) → /index.html` di pengaturan Vercel bila diperlukan.)

## Catatan

- Terjemahan Indonesia memakai sumber resmi: Quran.com translation `id 33`
  (Kementerian Agama RI).
- Progres khatam & sholat tracker disimpan **hanya di perangkat pengguna**
  (localStorage), tidak dikirim ke server.
