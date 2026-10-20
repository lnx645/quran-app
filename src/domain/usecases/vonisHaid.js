// Usecase domain murni: vonis haid / nifas / istihadah (mazhab Syafi'i).
// Angka acuan (WAJIB sesuai riset fikih 2026-10-20, Safinatun Najah Fasal 18):
// - Haid minimal total 24 jam (boleh terputus-putus dalam rentang 15 hari).
// - Haid maksimal rentang 15 hari 15 malam — selebihnya istihadah.
// - Masa suci minimal antar dua haid = 15 hari (tidak berlaku antar haid↔nifas).
// - Nifas: minimal sesaat (majjah), ghalib 40 hari, maksimal 60 hari (Syafi'i).
// - Status ibadah haid/nifas: sholat haram (tidak qadha), puasa haram (wajib
//   qadha), baca Qur'an niat tilawah haram (Syafi'i), sentuh mushaf langsung
//   haram, berdiam di masjid haram (lewat makruh bila aman dari mengotori).
// - Mustahadhah dihukumi suci: sholat & puasa WAJIB, dengan tata cara khusus.
// Fungsi murni tanpa I/O — mudah diuji.

export const BATAS_HAID = {
  minTotalJam: 24, // 1 hari 1 malam
  maksHari: 15, // 15 hari 15 malam
  minSuciHari: 15, // masa suci minimal antar dua haid
  ghalibHari: '6–7',
};
export const BATAS_NIFAS = { minSesaat: true, ghalibHari: 40, maksHari: 60 };
export const LABEL_MAZHAB = "menurut mazhab Syafi'i";

// Ibadah saat HAID / NIFAS (menurut mazhab Syafi'i — riset Bagian 4).
const IBADAH_HAID = {
  sholat: {
    boleh: false,
    wajibQadha: false,
    catatan: 'Haram & tidak sah; TIDAK wajib diqadha (ijma\', hadis Aisyah).',
  },
  puasa: {
    boleh: false,
    wajibQadha: true,
    catatan: 'Haram & tidak sah; puasa Ramadan WAJIB diqadha.',
  },
  bacaQuranTilawah: {
    boleh: false,
    catatan:
      "Haram dengan niat tilawah menurut mazhab Syafi'i. Kecuali: bacaan dzikir/doa, penghafal yang khawatir lupa, dan kebutuhan belajar-mengajar. Al-Qur'an di aplikasi HP bukan mushaf — boleh dibaca.",
  },
  sentuhMushaf: {
    boleh: false,
    catatan:
      'Haram menyentuh/membawa mushaf langsung tanpa penghalang (jumhur). Dengan penghalang (sarung tangan/kain) dibolehkan jumhur bila ada hajat.',
  },
  masukMasjid: {
    boleh: false,
    catatan:
      'Haram berdiam/i\'tikaf di masjid. Sekadar lewat: makruh menurut Syafi\'i bila aman dari mengotori, haram bila dikhawatirkan darah menetes.',
  },
  thawaf: { boleh: false, catatan: 'Tidak sah; mana­sik lain (sa\'i, wukuf) tetap boleh.' },
  jima: {
    boleh: false,
    catatan: 'Haram sampai suci DAN selesai mandi wajib (bukan sekadar darah berhenti).',
  },
};

// Ibadah saat ISTIHADAH (mustahadhah dihukumi suci — riset Bagian 3.4).
const IBADAH_ISTIHADAH = {
  sholat: {
    boleh: true,
    wajibQadha: false,
    catatan:
      'WAJIB shalat. Tata cara: bersihkan darah, pakai pembalut, wudhu SETELAH masuk waktu (1 wudhu = 1 shalat fardhu), lalu segera shalat.',
  },
  puasa: { boleh: true, wajibQadha: false, catatan: 'WAJIB puasa seperti orang suci.' },
  bacaQuranTilawah: { boleh: true, catatan: 'Boleh membaca Al-Qur\'an.' },
  sentuhMushaf: { boleh: true, catatan: 'Boleh menyentuh mushaf (dengan wudhu).' },
  masukMasjid: { boleh: true, catatan: 'Boleh masuk & berdiam di masjid.' },
  thawaf: { boleh: true, catatan: 'Boleh thawaf dengan tata cara mustahadhah.' },
  jima: { boleh: true, catatan: 'Boleh (mustahadhah dihukumi suci).' },
};

const MS_PER_HARI = 24 * 3600 * 1000;

function keDate(v) {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Vonis dasar haid/nifas/istihadah (mazhab Syafi'i).
 *
 * @param {object} input
 * @param {'haid'|'nifas'} [input.jenis='haid']
 * @param {Date|string} input.tanggalMulai — hari pertama darah keluar
 *   (untuk nifas: tanggal melahirkan).
 * @param {Date|string} input.tanggalBerhenti — hari terakhir darah keluar.
 * @param {number} [input.totalJamDarah] — TOTAL jam darah benar-benar keluar
 *   dalam rentang (untuk flek terputus-putus). Bila kosong: diasumsikan darah
 *   keluar penuh selama rentang (hari × 24 jam).
 * @param {number} [input.hariSuciSejakHaidTerakhir] — hari suci penuh sejak
 *   haid SEBELUMNYA selesai sampai darah ini mulai (khusus jenis haid).
 * @param {boolean} [input.bisaBedakanSifatDarah] — tamyiz: bisa membedakan
 *   darah kuat (haid) vs lemah (istihadah)?
 * @param {number} [input.adahHari] — kebiasaan ('adah) durasi haid sebelumnya.
 * @returns {{vonis:string, ibadah:object, penjelasan:string[],
 *   arahanLanjutan:string, ringkasan:string}}
 */
export function vonisDarah(input = {}) {
  const jenis = input.jenis === 'nifas' ? 'nifas' : 'haid';
  const mulai = keDate(input.tanggalMulai);
  const berhenti = keDate(input.tanggalBerhenti);
  const penjelasan = [];

  if (!mulai || !berhenti || berhenti < mulai) {
    return {
      vonis: 'TIDAK_VALID',
      ibadah: null,
      penjelasan: ['Tanggal mulai/berhenti tidak valid — periksa kembali tanggalnya.'],
      arahanLanjutan: '',
      ringkasan: 'Data belum lengkap.',
    };
  }

  const rentangHari = Math.floor((berhenti - mulai) / MS_PER_HARI) + 1;
  const totalJam =
    typeof input.totalJamDarah === 'number' && Number.isFinite(input.totalJamDarah)
      ? Math.max(0, input.totalJamDarah)
      : rentangHari * 24;

  if (jenis === 'nifas') return vonisNifas({ rentangHari, penjelasan });

  // ── Jenis HAID ───────────────────────────────────────────────────
  // 1) Suci < 15 hari sejak haid sebelumnya → bukan haid baru.
  if (
    typeof input.hariSuciSejakHaidTerakhir === 'number' &&
    input.hariSuciSejakHaidTerakhir < BATAS_HAID.minSuciHari
  ) {
    penjelasan.push(
      `Masa suci sejak haid sebelumnya hanya ${input.hariSuciSejakHaidTerakhir} hari — kurang dari suci minimal 15 hari ${LABEL_MAZHAB}, jadi darah ini BUKAN haid baru.`,
    );
    return hasilIstihadah(penjelasan, {
      ringkasan: 'Istihadah — suci belum sempurna 15 hari.',
      tamyizAdah: input,
    });
  }

  // 2) Total darah < 24 jam → istihadah (flek).
  if (totalJam < BATAS_HAID.minTotalJam) {
    penjelasan.push(
      `Total darah hanya ${totalJam} jam — kurang dari minimal haid 24 jam (1 hari 1 malam) ${LABEL_MAZHAB}, jadi ini istihadah/darah fasad, BUKAN haid.`,
    );
    penjelasan.push(
      'Shalat yang terlanjur ditinggalkan karena mengira haid WAJIB diqadha; tidak wajib mandi besar karenanya.',
    );
    return hasilIstihadah(penjelasan, { ringkasan: 'Istihadah — darah kurang dari 24 jam.' });
  }

  // 3) Rentang > 15 hari → selebihnya (hari 16+) istihadah.
  if (rentangHari > BATAS_HAID.maksHari) {
    penjelasan.push(
      `Darah keluar selama ${rentangHari} hari — melebihi maksimal haid 15 hari 15 malam ${LABEL_MAZHAB}. Hari ke-16 dan seterusnya adalah ISTIHADAH; hari haidnya ditentukan dengan tamyiz/'adah.`,
    );
    return hasilIstihadah(penjelasan, {
      ringkasan: 'Campuran haid + istihadah — darah melebihi 15 hari.',
      tamyizAdah: input,
      campuran: true,
    });
  }

  // 4) Dalam rentang sah → HAID.
  penjelasan.push(
    `Total darah ${totalJam} jam dalam rentang ${rentangHari} hari memenuhi syarat haid ${LABEL_MAZHAB} (total ≥ 24 jam, rentang ≤ 15 hari${rentangHari >= 6 && rentangHari <= 7 ? ', sesuai kebiasaan umum 6–7 hari' : ''}).`,
  );
  penjelasan.push(
    'Hari bersih di sela darah dalam rentang 15 hari (naqa\') tetap dihukumi haid menurut qaul mu\'tamad; saat melihat darah berhenti, tetap wajib mandi & shalat.',
  );
  penjelasan.push(
    'Tanda suci: cairan putih (qashshah baydha\') atau kering total (jufuf). Setelah suci, wajib mandi wajib sebelum shalat.',
  );
  return {
    vonis: 'HAID',
    ibadah: IBADAH_HAID,
    penjelasan,
    arahanLanjutan:
      'Darah berhenti = suci, tetapi larangan tetap berlaku sampai selesai mandi wajib (kecuali puasa & thalaq). Puasa Ramadan yang tertinggal wajib diqadha; shalat tidak diqadha.',
    ringkasan: `Haid (${rentangHari} hari, total ${totalJam} jam).`,
  };
}

function vonisNifas({ rentangHari, penjelasan }) {
  if (rentangHari > BATAS_NIFAS.maksHari) {
    penjelasan.push(
      `Darah nifas sudah ${rentangHari} hari — melebihi maksimal nifas 60 hari ${LABEL_MAZHAB}. Darah setelah hari ke-60 adalah ISTIHADAH (kecuali bertepatan dengan kebiasaan haid & memenuhi syarat haid).`,
    );
    penjelasan.push(
      'Catatan khilaf: sebagian ulama (Hanafi, Hambali, jumhur sahabat) memakai batas 40 hari.',
    );
    return hasilIstihadah(penjelasan, {
      ringkasan: 'Nifas berakhir — darah lanjutannya istihadah (> 60 hari).',
    });
  }
  penjelasan.push(
    `Darah setelah melahirkan selama ${rentangHari} hari masih dalam batas nifas ${LABEL_MAZHAB} (minimal sesaat/majjah, kebiasaan 40 hari, maksimal 60 hari).`,
  );
  penjelasan.push(
    'Nifas tidak ada batas minimal: bila darah berhenti sebelum 40 hari, wanita sudah suci — wajib mandi & kembali shalat, tidak perlu menunggu 40 hari.',
  );
  return {
    vonis: 'NIFAS',
    ibadah: IBADAH_HAID, // hukum ibadah nifas sama dengan haid
    penjelasan,
    arahanLanjutan:
      'Setelah darah berhenti & mandi wajib, kembali shalat. Puasa Ramadan yang tertinggal selama nifas wajib diqadha; shalat tidak diqadha.',
    ringkasan: `Nifas (hari ke-${rentangHari} dari maksimal 60 hari, Syafi'i).`,
  };
}

function hasilIstihadah(penjelasan, { ringkasan, tamyizAdah = null, campuran = false } = {}) {
  let arahan =
    'Mustahadhah dihukumi SUCI: tetap wajib shalat & puasa. Mandi besar sekali saat masa haid (menurut tamyiz/\'adah) selesai, lalu setiap masuk waktu shalat fardhu: bersihkan darah, pakai pembalut, wudhu, dan segera shalat.';
  if (tamyizAdah) {
    if (tamyizAdah.bisaBedakanSifatDarah) {
      arahan +=
        ' Penentuan hari haid: TAMYIZ — darah kuat (hitam/pekat, kental, berbau khas) selama 24 jam s.d. 15 hari = haid; darah lemah (merah segar, encer) = istihadah. Berlaku untuk mubtadi\'ah maupun mu\'tadah mumayyizah (tamyiz didahulukan).';
      penjelasan.push(
        'Kategori: mustahadhah mumayyizah — gunakan TAMYIZ (sifat darah) untuk menentukan hari haid.',
      );
    } else if (typeof tamyizAdah.adahHari === 'number' && tamyizAdah.adahHari > 0) {
      arahan += ` Penentuan hari haid: 'ADAH — kembali ke kebiasaan haid sebelumnya (${tamyizAdah.adahHari} hari tiap siklus); selebihnya istihadah (mu'tadah ghairu mumayyizah).`;
      penjelasan.push(
        `Kategori: mu'tadah ghairu mumayyizah — hari haid mengikuti 'adah ${tamyizAdah.adahHari} hari.`,
      );
    } else {
      arahan +=
        ' Bila baru pertama kali (mubtadi\'ah) dan tidak bisa membedakan sifat darah: haid dihitung 1 hari 1 malam tiap bulan, sisanya istihadah, dan shalat yang ditinggalkan di luar hitungan itu wajib diqadha.';
      penjelasan.push(
        'Kategori dasar: bila tidak ada tamyiz maupun \'adah, hitungan mubtadi\'ah ghairu mumayyizah = 1 hari 1 malam per bulan.',
      );
    }
  }
  if (campuran) {
    arahan +=
      ' Kasus darah > 15 hari yang rumit (KB/hormonal, siklus sangat tidak teratur) — konsultasikan ke ulama/dokter; ada perbedaan pendapat kontemporer.';
  }
  return { vonis: 'ISTIHADAH', ibadah: IBADAH_ISTIHADAH, penjelasan, arahanLanjutan: arahan, ringkasan };
}

export default vonisDarah;
