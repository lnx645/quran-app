// Hari besar Islam: tanggal Hijriah TETAP (data layer).
// bulanHijriah: 1=Muharram, 3=Rabiulawal, 7=Rajab, 9=Ramadan, 10=Syawal, 12=Dzulhijjah.
// Konversi ke Masehi dilakukan lewat Aladhan API hToG di repository.
export const HARI_BESAR = [
  { nama: 'Tahun Baru Hijriah', hari: 1, bulanHijriah: 1, namaBulan: 'Muharram' },
  { nama: 'Maulid Nabi Muhammad ﷺ', hari: 12, bulanHijriah: 3, namaBulan: 'Rabiulawal' },
  { nama: "Isra Mi'raj Nabi Muhammad ﷺ", hari: 27, bulanHijriah: 7, namaBulan: 'Rajab' },
  { nama: 'Awal Ramadan (Puasa)', hari: 1, bulanHijriah: 9, namaBulan: 'Ramadan' },
  { nama: 'Idul Fitri', hari: 1, bulanHijriah: 10, namaBulan: 'Syawal' },
  { nama: 'Hari Arafah', hari: 9, bulanHijriah: 12, namaBulan: 'Dzulhijjah' },
  { nama: 'Idul Adha', hari: 10, bulanHijriah: 12, namaBulan: 'Dzulhijjah' },
];
