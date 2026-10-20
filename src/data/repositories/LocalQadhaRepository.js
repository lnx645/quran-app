// Repository tracker qadha puasa tersimpan di localStorage (data layer).
// Bentuk data: { totalUtang: number, terbayar: number, log: { 'YYYY-MM-DD': n } }
// — log mencatat jumlah hari yang dibayarkan pada tanggal tersebut.
const KUNCI = 'noor.qadha-puasa.v1';
const KOSONG = { totalUtang: 0, terbayar: 0, log: {} };

function normalisasi(parsed) {
  if (!parsed || typeof parsed !== 'object') return { ...KOSONG };
  return {
    totalUtang: Math.max(0, Number(parsed.totalUtang) || 0),
    terbayar: Math.max(0, Number(parsed.terbayar) || 0),
    log: parsed.log && typeof parsed.log === 'object' ? parsed.log : {},
  };
}

function tanggalHariIni(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const LocalQadhaRepository = {
  loadSemua() {
    try {
      const raw = localStorage.getItem(KUNCI);
      return raw ? normalisasi(JSON.parse(raw)) : { ...KOSONG };
    } catch {
      return { ...KOSONG };
    }
  },

  saveSemua(data) {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(normalisasi(data)));
    } catch {
      /* penyimpanan penuh / privat — abaikan */
    }
  },

  muat() {
    return this.loadSemua();
  },

  setTotalUtang(n) {
    const data = this.loadSemua();
    data.totalUtang = Math.max(0, Math.floor(Number(n) || 0));
    this.saveSemua(data);
    return data;
  },

  /** Catat pembayaran n hari pada tanggal tertentu (default: hari ini). */
  tambahBayar(n = 1, tanggal) {
    const data = this.loadSemua();
    const tgl = tanggal || tanggalHariIni();
    const jumlah = Math.max(1, Math.floor(Number(n) || 1));
    data.terbayar += jumlah;
    data.log[tgl] = (data.log[tgl] || 0) + jumlah;
    this.saveSemua(data);
    return data;
  },

  /** Batalkan pembayaran n hari, dikurangi dari log paling akhir terlebih dahulu. */
  batalBayar(n = 1) {
    const data = this.loadSemua();
    let sisaKurangi = Math.min(Math.max(1, Math.floor(Number(n) || 1)), data.terbayar);
    data.terbayar -= sisaKurangi;
    const tanggalTerurut = Object.keys(data.log).sort().reverse();
    for (const tgl of tanggalTerurut) {
      if (sisaKurangi <= 0) break;
      const potong = Math.min(data.log[tgl], sisaKurangi);
      data.log[tgl] -= potong;
      sisaKurangi -= potong;
      if (data.log[tgl] <= 0) delete data.log[tgl];
    }
    this.saveSemua(data);
    return data;
  },

  sisa(data) {
    const d = data || this.loadSemua();
    return Math.max(0, d.totalUtang - d.terbayar);
  },
};
