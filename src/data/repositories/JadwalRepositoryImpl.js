import { fetchTimingsByCity, fetchGToH, fetchHToG, fetchGToHCalendar, fetchHijriCalendarByCity } from '../aladhanApi.js';
import { mapJadwal } from '../dto/jadwalMapper.js';

const bersih = (jam) => String(jam ?? '').split(' ')[0]; // buang suffix " (WIB)"

const pad = (n) => String(n).padStart(2, '0');

/** Implementasi JadwalRepository memakai Aladhan API (method 20 = Kemenag RI). */
export const JadwalRepositoryImpl = {
  async getJadwalHarian(kota, tanggal = new Date(), method = 20) {
    const data = await fetchTimingsByCity(kota, tanggal, method);
    return mapJadwal(data, kota);
  },

  /** Tanggal Hijriah suatu tanggal Masehi: { day, month, monthName, year }. */
  async getHijriahTanggal(tanggal = new Date()) {
    const h = await fetchGToH(tanggal);
    return {
      day: Number(h.day),
      month: Number(h.month?.number ?? 0),
      monthName: h.month?.en ?? '',
      year: Number(h.year),
    };
  },

  /** Tanggal Masehi (Date lokal tengah malam) dari tanggal Hijriah. */
  async getMasehiDariHijriah(day, month, year) {
    const g = await fetchHToG(`${pad(day)}-${pad(month)}-${year}`);
    return new Date(Number(g.year), Number(g.month?.number ?? 1) - 1, Number(g.day));
  },

  /**
   * Satu bulan Masehi penuh dengan padanan Hijriahnya (1 panggilan API).
   * @returns {Array<{masehi:{day:number,month:number,year:number,weekday:number}, hijri:{day:number,month:number,monthName:string,year:number}}>}
   * weekday mengikuti Date.getDay() (0=Ahad).
   */
  async getKalenderMasehiSebulan(bulanMasehi, tahunMasehi) {
    const data = await fetchGToHCalendar(bulanMasehi, tahunMasehi);
    return (data ?? []).map((d) => {
      const g = d.gregorian ?? {};
      const h = d.hijri ?? {};
      const tanggal = new Date(Number(g.year), Number(g.month?.number ?? 1) - 1, Number(g.day));
      return {
        masehi: {
          day: Number(g.day),
          month: Number(g.month?.number ?? bulanMasehi),
          year: Number(g.year),
          weekday: tanggal.getDay(),
        },
        hijri: {
          day: Number(h.day),
          month: Number(h.month?.number ?? 0),
          monthName: h.month?.en ?? '',
          year: Number(h.year),
        },
      };
    });
  },

  /**
   * Imsakiyah: jadwal satu bulan Ramadan penuh (bulan Hijriah 9) per kota.
   * @returns {Array<{hijriDay:number, masehiLabel:string, imsak:string, subuh:string, magrib:string}>}
   */
  async getImsakiyahRamadhan(kota, tahunHijriah) {
    const data = await fetchHijriCalendarByCity(kota, tahunHijriah, 9);
    return (data ?? []).map((d) => {
      const t = d.timings ?? {};
      const g = d.date?.gregorian ?? {};
      const h = d.date?.hijri ?? {};
      return {
        hijriDay: Number(h.day),
        masehiLabel: `${g.day ?? ''} ${g.month?.en ?? ''} ${g.year ?? ''}`.trim(),
        imsak: bersih(t.Imsak),
        subuh: bersih(t.Fajr),
        magrib: bersih(t.Maghrib),
      };
    });
  },
};
