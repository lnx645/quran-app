// Data statis Panduan Sholat Anak (data layer — sub-halaman Mode Anak).
// Versi SEDERHANA untuk anak: belajar sholat 2 rakaat dulu (seperti
// Subuh). Urutan 11 langkah dari niat sampai salam, tiap langkah satu
// kalimat gerakan yang mudah dimengerti anak.
//
// SUMBER BACAAN — TIDAK mengarang redaksi baru: semua bacaan diambil
// persis dari GERAKAN_SHOLAT di panduanSholatData.js (takbir, ruku',
// i'tidal, sujud, duduk antara dua sujud, tasyahud, salam, Al-Fatihah).
// Dua penyesuaian untuk anak, keduanya tetap dari data yang sama:
//  1. Iftitah PENDEK: hanya kalimat pertama redaksi iftitah di
//     panduanSholatData ("Allahu akbar kabira wal-hamdulillahi
//     katsira wa subhanallahi bukrataw wa ashila") — redaksi pendek
//     yang masyhur diajarkan kepada anak.
//  2. Tasyahud: memakai redaksi Tasyahud Awal dari panduanSholatData
//     (berakhir pada shalawat atas Nabi Muhammad) sebagai versi
//     sederhana untuk latihan 2 rakaat.
// Niat untuk anak cukup di dalam hati (tanpa lafaz khusus) — karena
// itu langkah niat tidak memuat bacaan Arab.
import { GERAKAN_SHOLAT } from './panduanSholatData.js';

function cariGerakan(nama) {
  return GERAKAN_SHOLAT.find((g) => g.nama === nama);
}

// Kalimat pertama sebuah teks (berakhir pada tanda titik pertama) —
// dipakai memotong iftitah penuh menjadi versi pendek untuk anak.
function kalimatPertama(teks) {
  if (!teks) return teks;
  const titik = teks.indexOf('. ');
  return titik === -1 ? teks : teks.slice(0, titik + 1);
}

const takbir = cariGerakan('Berdiri & Takbiratul Ihram');
const iftitah = cariGerakan('Doa Iftitah');
const fatihah = cariGerakan('Membaca Al-Fatihah & Surah Pendek');
const rukuk = cariGerakan('Rukuk');
const iktidal = cariGerakan("I'tidal");
const sujud = cariGerakan('Sujud');
const duduk = cariGerakan('Duduk di Antara Dua Sujud');
const sujudKedua = cariGerakan('Sujud Kedua');
const tasyahudAwal = cariGerakan('Tasyahud Awal');
const salam = cariGerakan('Salam');

const iftitahPendek = {
  arab: kalimatPertama(iftitah.bacaan.arab),
  latin: kalimatPertama(iftitah.bacaan.latin),
  arti: kalimatPertama(iftitah.bacaan.arti),
};

export const PENGANTAR_SHOLAT_ANAK =
  'Kita belajar sholat 2 rakaat dulu, seperti sholat Subuh. Gerakan rakaat pertama dan kedua itu sama — setelah sujud kedua di rakaat kedua, kita duduk tasyahud lalu salam. Ikuti satu langkah demi satu langkah, pelan-pelan saja!';

export const PENUTUP_SHOLAT_ANAK =
  'Hebat! Kamu sudah belajar semua gerakan sholat 2 rakaat, dari niat sampai salam. Terus berlatih setiap hari bersama ayah, ibu, atau guru — lama-lama pasti hafal dan makin rapi sholatnya. Semangat!';

export const CATATAN_PENDAMPING_SHOLAT_ANAK =
  'Belajar sholat lebih seru dan benar bila didampingi orang tua atau guru. Minta ditemani ya!';

// LANGKAH_SHOLAT_ANAK — 11 langkah. Field tiap langkah:
//  judul   : nama langkah (bahasa anak)
//  gerakan : penjelasan gerakan SATU kalimat sederhana
//  ikon    : kunci ikon react-icons yang dipetakan di halaman
//  arab/latin/arti : bacaan (dari panduanSholatData — lihat header);
//                    langkah niat sengaja tanpa bacaan
//  jumlah  : (opsional) berapa kali bacaan diulang
export const LANGKAH_SHOLAT_ANAK = [
  {
    judul: 'Niat di Dalam Hati',
    gerakan: 'Berdiri tegak menghadap kiblat dan berniat di dalam hati untuk sholat karena Allah.',
    ikon: 'niat',
  },
  {
    judul: 'Takbiratul Ihram',
    gerakan: 'Angkat kedua tangan sejajar telinga sambil mengucap takbir, lalu sedekap tangan di dada.',
    ikon: 'takbir',
    arab: takbir.bacaan.arab,
    latin: takbir.bacaan.latin,
    arti: takbir.bacaan.arti,
    jumlah: takbir.jumlah,
  },
  {
    judul: 'Doa Iftitah Pendek',
    gerakan: 'Tetap berdiri sedekap dan bacalah doa iftitah pendek ini pelan-pelan.',
    ikon: 'doa',
    arab: iftitahPendek.arab,
    latin: iftitahPendek.latin,
    arti: iftitahPendek.arti,
    jumlah: 1,
  },
  {
    judul: 'Membaca Al-Fatihah',
    gerakan: 'Masih berdiri, bacalah surah Al-Fatihah dengan tenang sampai selesai.',
    ikon: 'qiroah',
    arab: fatihah.bacaan.arab,
    latin: fatihah.bacaan.latin,
    arti: fatihah.bacaan.arti,
    jumlah: fatihah.jumlah,
  },
  {
    judul: "Ruku'",
    gerakan: 'Bungkukkan badan sampai punggung rata dan kedua tangan memegang lutut.',
    ikon: 'rukuk',
    arab: rukuk.bacaan.arab,
    latin: rukuk.bacaan.latin,
    arti: rukuk.bacaan.arti,
    jumlah: rukuk.jumlah,
  },
  {
    judul: "I'tidal",
    gerakan: 'Bangkit lagi berdiri tegak dengan tenang sambil mengangkat kedua tangan.',
    ikon: 'iktidal',
    arab: iktidal.bacaan.arab,
    latin: iktidal.bacaan.latin,
    arti: iktidal.bacaan.arti,
    jumlah: iktidal.jumlah,
  },
  {
    judul: 'Sujud Pertama',
    gerakan: 'Turun bersujud dengan dahi menempel di tempat sujud dan kedua tangan di samping kepala.',
    ikon: 'sujud',
    arab: sujud.bacaan.arab,
    latin: sujud.bacaan.latin,
    arti: sujud.bacaan.arti,
    jumlah: sujud.jumlah,
  },
  {
    judul: 'Duduk di Antara Dua Sujud',
    gerakan: 'Bangkit dari sujud, lalu duduk tenang sebentar di antara dua sujud.',
    ikon: 'duduk',
    arab: duduk.bacaan.arab,
    latin: duduk.bacaan.latin,
    arti: duduk.bacaan.arti,
    jumlah: duduk.jumlah,
  },
  {
    judul: 'Sujud Kedua',
    gerakan: 'Bersujud lagi seperti sujud pertama, dengan tenang dan tidak terburu-buru.',
    ikon: 'sujud',
    arab: sujudKedua.bacaan.arab,
    latin: sujudKedua.bacaan.latin,
    arti: sujudKedua.bacaan.arti,
    jumlah: sujudKedua.jumlah,
  },
  {
    judul: 'Tasyahud',
    gerakan: 'Setelah sujud kedua di rakaat kedua, duduklah tasyahud dan bacalah bacaan ini pelan-pelan.',
    ikon: 'tasyahud',
    arab: tasyahudAwal.bacaan.arab,
    latin: tasyahudAwal.bacaan.latin,
    arti: tasyahudAwal.bacaan.arti,
    jumlah: tasyahudAwal.jumlah,
  },
  {
    judul: 'Salam',
    gerakan: 'Tolehkan kepala ke kanan lalu ke kiri sambil mengucap salam untuk menutup sholat.',
    ikon: 'salam',
    arab: salam.bacaan.arab,
    latin: salam.bacaan.latin,
    arti: salam.bacaan.arti,
    jumlah: salam.jumlah,
  },
];
