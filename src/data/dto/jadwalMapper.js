// Mapper DTO Aladhan → model jadwal harian (data layer).
const URUTAN = [
  ['Fajr', 'Subuh'],
  ['Sunrise', 'Terbit'],
  ['Dhuhr', 'Dzuhur'],
  ['Asr', 'Ashar'],
  ['Maghrib', 'Maghrib'],
  ['Isha', 'Isya'],
];

const bersih = (jam) => String(jam ?? '').split(' ')[0]; // buang suffix " (WIB)"

export function mapJadwal(data, kota) {
  const t = data.timings ?? {};
  const h = data.date?.hijri ?? {};
  const g = data.date?.gregorian ?? {};
  return {
    kota,
    tanggalMasehi: g.weekday?.en
      ? `${g.day} ${g.month?.en ?? ''} ${g.year}`
      : (g.date ?? ''),
    hijriah: {
      tanggal: Number(h.day ?? 0),
      bulan: h.month?.en ?? '',
      bulanAr: h.month?.ar ?? '',
      tahun: Number(h.year ?? 0),
      label: `${h.day} ${h.month?.en ?? ''} ${h.year} H`,
    },
    waktu: URUTAN.map(([kunci, nama]) => ({ kunci, nama, jam: bersih(t[kunci]) })),
  };
}
