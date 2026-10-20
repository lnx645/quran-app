import { fetchTimingsByCity } from '../aladhanApi.js';
import { mapJadwal } from '../dto/jadwalMapper.js';

/** Implementasi JadwalRepository memakai Aladhan API (method 20 = Kemenag RI). */
export const JadwalRepositoryImpl = {
  async getJadwalHarian(kota, tanggal = new Date()) {
    const data = await fetchTimingsByCity(kota, tanggal);
    return mapJadwal(data, kota);
  },
};
