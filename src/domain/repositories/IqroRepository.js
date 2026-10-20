/**
 * Kontrak repository Iqro (data statis lokal, bukan API).
 * Implementasi: data/repositories/IqroRepositoryImpl.js membaca
 * data/sources/iqroData.js.
 */
export const IqroRepository = {
  /** @returns {Promise<Array<{jilid:number, judul:string, ringkasan:string}>>} */
  async listJilid() {
    throw new Error('IqroRepository.listJilid belum diimplementasikan');
  },
  /**
   * @param {number} jilid 1–6
   * @returns {Promise<{jilid:number, judul:string, topik:string[],
   *   huruf?: Array<{arab:string, latin:string, fathah:string, kasrah:string, dhammah:string}>,
   *   contohBacaan?: string[]}>}
   */
  async getJilid(_jilid) {
    throw new Error('IqroRepository.getJilid belum diimplementasikan');
  },
};
