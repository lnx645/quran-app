/**
 * Kontrak repository jadwal sholat (Aladhan API).
 * Implementasi: data/repositories/JadwalRepositoryImpl.js.
 */
export const JadwalRepository = {
  /**
   * @param {string} kota Nama kota (mis. "Sumedang")
   * @param {Date} tanggal Tanggal yang diminta
   * @returns {Promise<{kota:string,
   *   tanggalMasehi:string,
   *   hijriah:{hari:string, tanggal:number, bulan:string, tahun:number, label:string},
   *   waktu:Array<{kunci:string, nama:string, jam:string}>}>}
   */
  async getJadwalHarian(_kota, _tanggal) {
    throw new Error('JadwalRepository.getJadwalHarian belum diimplementasikan');
  },
};
