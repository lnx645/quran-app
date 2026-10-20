// Repository progres khatam tersimpan di localStorage (data layer).
const KUNCI = 'noor.khatam.v1';
const KOSONG = { selesai: {}, targetTanggal: null };

export const LocalKhatamRepository = {
  load() {
    try {
      const raw = localStorage.getItem(KUNCI);
      if (!raw) return { ...KOSONG };
      const parsed = JSON.parse(raw);
      // Defensif: bentuk lama/rusak dinormalisasi ke bentuk baku.
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return { ...KOSONG };
      }
      return {
        selesai:
          parsed.selesai &&
          typeof parsed.selesai === 'object' &&
          !Array.isArray(parsed.selesai)
            ? parsed.selesai
            : {},
        targetTanggal:
          typeof parsed.targetTanggal === 'string' ? parsed.targetTanggal : null,
      };
    } catch {
      return { ...KOSONG };
    }
  },
  save(progres) {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(progres));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
  },
  reset() {
    try {
      localStorage.removeItem(KUNCI);
    } catch {
      /* abaikan */
    }
  },
};
