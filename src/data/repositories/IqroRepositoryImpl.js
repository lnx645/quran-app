import { HURUF_HIJAIYAH, CONTOH_BACAAN_JILID_1, IQRO_JILID } from '../sources/iqroData.js';

/** Implementasi IqroRepository memakai data statis lokal. */
export const IqroRepositoryImpl = {
  async listJilid() {
    return IQRO_JILID.map(({ jilid, judul, ringkasan }) => ({ jilid, judul, ringkasan }));
  },
  async getJilid(jilid) {
    const meta = IQRO_JILID.find((j) => j.jilid === Number(jilid));
    if (!meta) throw new Error(`Iqro Jilid ${jilid} tidak ditemukan`);
    const FATHAH = '\u064E';
    const KASRAH = '\u0650';
    const DHAMMAH = '\u064F';
    const huruf =
      meta.jilid === 1
        ? HURUF_HIJAIYAH.map((h) => ({
            arab: h.arab,
            latin: h.latin,
            fathah: h.arab + FATHAH,
            kasrah: h.arab + KASRAH,
            dhammah: h.arab + DHAMMAH,
          }))
        : undefined;
    return {
      ...meta,
      huruf,
      contohBacaan: meta.jilid === 1 ? CONTOH_BACAAN_JILID_1 : undefined,
    };
  },
};
