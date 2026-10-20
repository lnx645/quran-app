/**
 * Use case: Kalkulator Waris (Faraidh) — fungsi MURNI, tanpa impor apa pun,
 * tanpa efek samping. Semua hitungan memakai pecahan rasional eksak
 * (pembilang/penyebut bilangan bulat) agar tidak ada galat floating point
 * pada bagian-bagian baku seperti 1/3, 1/6, 2/3.
 *
 * AHLI WARIS YANG DIDUKUNG (sengaja sempit tapi benar):
 * - Pasangan: suami ATAU istri (satu orang; banyak istri disederhanakan = 1).
 * - Ayah, ibu.
 * - Anak laki-laki & anak perempuan (jumlah orang).
 * - Saudara laki-laki kandung & saudara perempuan kandung (jumlah orang).
 *
 * TIDAK didukung (di luar cakupan — jangan dipaksakan): kakek, nenek, cucu,
 * saudara seayah / seibu, paman, anak angkat, wasiat wajibah, perbedaan
 * mazhab soal radd untuk pasangan, dan kasus dzawil arham.
 *
 * ATURAN BAKU YANG DITERAPKAN (jumhur / dasar Syafi'i):
 * - Suami: 1/2 (tanpa anak) / 1/4 (ada anak).
 * - Istri: 1/4 (tanpa anak) / 1/8 (ada anak).
 * - Ibu: 1/3 (tanpa anak & saudara < 2) / 1/6 (ada anak atau saudara ≥ 2).
 *   Saudara yang terhalang pun tetap mengurangi bagian ibu (hujb nuqshan).
 * - Kasus 'umariyyah (pasangan + ayah + ibu, tanpa anak, saudara < 2):
 *   ibu = 1/3 dari SISA setelah bagian pasangan; ayah mengambil sisa akhir.
 * - Ayah: 1/6 bila ada anak laki-laki; 1/6 + sisa ('ashabah) bila hanya ada
 *   anak perempuan; 'ashabah penuh bila tanpa anak.
 * - Anak perempuan tanpa anak laki-laki: 1 orang 1/2, ≥ 2 orang 2/3 (kelompok).
 * - Anak-anak dengan anak laki-laki: 'ashabah bersama, laki-laki : perempuan
 *   = 2 : 1.
 * - Saudara kandung TERHALANG (mahjub) oleh ayah & anak laki-laki.
 * - Saudara perempuan kandung berhak fardhu (1 orang 1/2, ≥ 2 orang 2/3)
 *   hanya bila tanpa anak, tanpa ayah, dan tanpa saudara laki-laki.
 *   Bersama saudara laki-laki ia menjadi 'ashabah bil-ghair (2 : 1).
 *   Bersama anak perempuan (tanpa ayah/saudara laki-laki) ia menjadi
 *   'ashabah ma'a al-ghair: mengambil sisa setelah fardhu anak perempuan.
 * - 'AUL: total fardhu > 1 → semua bagian fardhu diskala proporsional.
 * - RADD: ada sisa & tidak ada 'ashabah → sisa dikembalikan proporsional ke
 *   ahli waris fardhu SELAIN pasangan (jumhur). Bila hanya pasangan yang
 *   ada, sisa tidak terbagi (dalam praktik nyata menjadi urusan baitul mal).
 *
 * Urutan hitung: fardhu → 'aul bila perlu → 'ashabah mengambil sisa →
 * radd bila sisa & tanpa 'ashabah.
 */

// ===== Pecahan rasional eksak =====
const fpb = (a, b) => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    [x, y] = [y, x % y];
  }
  return x || 1;
};

/** Buat pecahan ternormalisasi {num, den} dengan den > 0. */
const pec = (num, den = 1) => {
  let n = num;
  let d = den;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  if (n === 0) return { num: 0, den: 1 };
  const g = fpb(n, d);
  return { num: n / g, den: d / g };
};

const tambah = (a, b) => pec(a.num * b.den + b.num * a.den, a.den * b.den);
const kurang = (a, b) => pec(a.num * b.den - b.num * a.den, a.den * b.den);
const kali = (a, b) => pec(a.num * b.num, a.den * b.den);
const bagi = (a, b) => pec(a.num * b.den, a.den * b.num);
/** -1 / 0 / 1 hasil banding a terhadap b. */
const banding = (a, b) => Math.sign(a.num * b.den - b.num * a.den);

const NOL = { num: 0, den: 1 };
const SATU = { num: 1, den: 1 };

export const teksPecahan = (p) => {
  if (!p || p.num === 0) return '0';
  return p.den === 1 ? `${p.num}` : `${p.num}/${p.den}`;
};

// ===== Sanitasi input =====
const jumlahAman = (n) => {
  const v = Math.floor(Number(n));
  return Number.isFinite(v) && v > 0 ? Math.min(v, 99) : 0;
};
const hartaAman = (n) => {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

/**
 * Hitung pembagian waris.
 *
 * @param {object} input
 * @param {number} input.totalHarta - harta bersih (Rp) setelah biaya jenazah,
 *   utang, dan wasiat (maks. 1/3 untuk bukan ahli waris).
 * @param {'tidak-ada'|'suami'|'istri'} input.pasangan - pasangan yang ditinggalkan.
 * @param {boolean} input.ayah - ayah pewaris masih hidup.
 * @param {boolean} input.ibu - ibu pewaris masih hidup.
 * @param {number} input.anakLaki - jumlah anak laki-laki.
 * @param {number} input.anakPerempuan - jumlah anak perempuan.
 * @param {number} input.saudaraLaki - jumlah saudara laki-laki kandung.
 * @param {number} input.saudaraPerempuan - jumlah saudara perempuan kandung.
 * @returns {object} { valid, pesan?, totalHarta, statusKasus, baris,
 *   sisaTakTerbagi, totalTerbagi, catatan }
 *   Tiap baris: { kunci, golongan, jumlah, dasarBagian, pecahanDasar,
 *   pecahan {num,den}, pecahanTeks, persen, nominal,
 *   perOrang {pecahan, pecahanTeks, nominal} | null,
 *   status: 'fardhu'|'ashabah'|'fardhu-ashabah'|'terhalang', penjelasan }
 */
export function hitungWaris(input = {}) {
  const totalHarta = hartaAman(input.totalHarta);
  const pasangan = ['suami', 'istri'].includes(input.pasangan) ? input.pasangan : 'tidak-ada';
  const adaPasangan = pasangan !== 'tidak-ada';
  const adaAyah = Boolean(input.ayah);
  const adaIbu = Boolean(input.ibu);
  const anakLk = jumlahAman(input.anakLaki);
  const anakPr = jumlahAman(input.anakPerempuan);
  const sdrLk = jumlahAman(input.saudaraLaki);
  const sdrPr = jumlahAman(input.saudaraPerempuan);

  const adaAnak = anakLk + anakPr > 0;
  const jmlSaudara = sdrLk + sdrPr;

  const catatan = [
    'Harta yang dibagi adalah harta bersih: setelah biaya pengurusan jenazah, pelunasan utang, dan pelaksanaan wasiat (maksimal 1/3, untuk bukan ahli waris).',
  ];

  if (!adaPasangan && !adaAyah && !adaIbu && !adaAnak && jmlSaudara === 0) {
    return {
      valid: false,
      pesan: 'Belum ada ahli waris yang dipilih. Isi minimal satu ahli waris untuk melihat hasil.',
      totalHarta,
      statusKasus: [],
      baris: [],
      sisaTakTerbagi: SATU,
      totalTerbagi: NOL,
      catatan,
    };
  }

  // ===== Langkah 1: tentukan fardhu =====
  const fardhu = {}; // kunci -> pecahan fardhu (kelompok)

  if (adaPasangan) {
    fardhu.pasangan =
      pasangan === 'suami'
        ? adaAnak
          ? pec(1, 4)
          : pec(1, 2)
        : adaAnak
          ? pec(1, 8)
          : pec(1, 4);
  }

  // 'Umariyyah: pasangan + ayah + ibu, tanpa anak, saudara < 2.
  const umariyyah = adaPasangan && adaAyah && adaIbu && !adaAnak && jmlSaudara < 2;
  if (adaIbu) {
    if (umariyyah) {
      // Ibu = 1/3 dari sisa setelah bagian pasangan.
      fardhu.ibu = kali(pec(1, 3), kurang(SATU, fardhu.pasangan));
    } else {
      fardhu.ibu = adaAnak || jmlSaudara >= 2 ? pec(1, 6) : pec(1, 3);
    }
  }

  if (adaAyah && adaAnak) {
    // Ada anak laki-laki → fardhu saja; hanya anak perempuan → fardhu +
    // 'ashabah (sisa ditambahkan pada langkah 3).
    fardhu.ayah = pec(1, 6);
  }

  if (anakPr > 0 && anakLk === 0) {
    fardhu.anakPerempuan = anakPr === 1 ? pec(1, 2) : pec(2, 3);
  }

  // Saudara kandung terhalang oleh ayah & anak laki-laki.
  const sdrTerhalang = adaAyah || anakLk > 0;
  if (sdrPr > 0 && !sdrTerhalang && anakPr === 0 && sdrLk === 0) {
    fardhu.saudaraPerempuan = sdrPr === 1 ? pec(1, 2) : pec(2, 3);
  }

  // ===== Langkah 2: tentukan 'ashabah (pengambil sisa) =====
  // Berkat aturan mahjub, paling banyak SATU kelompok 'ashabah yang aktif:
  // anak (ada anak laki-laki) > ayah > saudara kandung.
  let ashabah = null; // 'anak' | 'ayah' | 'saudara' | 'saudari-maa'
  if (anakLk > 0) ashabah = 'anak';
  else if (adaAyah) ashabah = 'ayah';
  else if (sdrLk > 0) ashabah = 'saudara';
  else if (sdrPr > 0 && anakPr > 0) ashabah = 'saudari-maa';

  // ===== Langkah 3: total fardhu, 'aul, sisa, radd =====
  let totalFardhu = NOL;
  for (const k of Object.keys(fardhu)) totalFardhu = tambah(totalFardhu, fardhu[k]);

  const akhir = {}; // kunci -> pecahan akhir (kelompok)
  const statusKasus = [];
  let sisaTakTerbagi = NOL;
  let terjadiAul = false;
  const dapatRadd = {}; // kunci -> pecahan tambahan radd

  if (banding(totalFardhu, SATU) > 0) {
    // 'AUL: skala semua fardhu proporsional; 'ashabah tidak mendapat apa-apa.
    terjadiAul = true;
    statusKasus.push('aul');
    for (const k of Object.keys(fardhu)) akhir[k] = bagi(fardhu[k], totalFardhu);
  } else {
    for (const k of Object.keys(fardhu)) akhir[k] = fardhu[k];
    const sisa = kurang(SATU, totalFardhu);
    if (banding(sisa, NOL) > 0) {
      if (ashabah === 'anak') {
        statusKasus.push('ashabah');
        const totalBerat = 2 * anakLk + anakPr;
        akhir.anakLaki = kali(sisa, pec(2 * anakLk, totalBerat));
        if (anakPr > 0) akhir.anakPerempuan = kali(sisa, pec(anakPr, totalBerat));
      } else if (ashabah === 'ayah') {
        statusKasus.push('ashabah');
        akhir.ayah = tambah(akhir.ayah ?? NOL, sisa);
      } else if (ashabah === 'saudara') {
        statusKasus.push('ashabah');
        const totalBerat = 2 * sdrLk + sdrPr;
        akhir.saudaraLaki = kali(sisa, pec(2 * sdrLk, totalBerat));
        if (sdrPr > 0) akhir.saudaraPerempuan = kali(sisa, pec(sdrPr, totalBerat));
      } else if (ashabah === 'saudari-maa') {
        statusKasus.push('ashabah');
        akhir.saudaraPerempuan = tambah(akhir.saudaraPerempuan ?? NOL, sisa);
      } else {
        // RADD: sisa kembali ke ahli waris fardhu selain pasangan (jumhur).
        const kunciRadd = Object.keys(fardhu).filter((k) => k !== 'pasangan');
        let totalRadd = NOL;
        for (const k of kunciRadd) totalRadd = tambah(totalRadd, fardhu[k]);
        if (banding(totalRadd, NOL) > 0) {
          statusKasus.push('radd');
          for (const k of kunciRadd) {
            dapatRadd[k] = kali(sisa, bagi(fardhu[k], totalRadd));
            akhir[k] = tambah(akhir[k], dapatRadd[k]);
          }
        } else {
          // Hanya pasangan yang ada → sisa tidak terbagi (urusan baitul mal).
          sisaTakTerbagi = sisa;
          statusKasus.push('sisa-tak-terbagi');
          catatan.push(
            'Karena hanya pasangan yang menjadi ahli waris dan tidak ada penerima radd, sisa harta tidak terbagi di kalkulator ini — dalam praktiknya diserahkan ke baitul mal / lembaga resmi.',
          );
        }
      }
    } else {
      statusKasus.push('pas');
    }
  }

  // ===== Langkah 4: susun baris hasil per golongan =====
  const persenDari = (p) => Math.round((p.num / p.den) * 10000) / 100;
  const nominalDari = (p) => Math.round(totalHarta * (p.num / p.den));

  const buatBaris = ({ kunci, golongan, jumlah, dasarBagian, status, penjelasan }) => {
    const bagian = akhir[kunci] ?? NOL;
    const perOrangPecahan = jumlah > 0 ? bagi(bagian, pec(jumlah)) : NOL;
    return {
      kunci,
      golongan,
      jumlah,
      dasarBagian,
      pecahanDasar: fardhu[kunci] ?? null,
      pecahan: bagian,
      pecahanTeks: teksPecahan(bagian),
      persen: persenDari(bagian),
      nominal: nominalDari(bagian),
      perOrang:
        jumlah > 1
          ? {
              pecahan: perOrangPecahan,
              pecahanTeks: teksPecahan(perOrangPecahan),
              nominal: nominalDari(perOrangPecahan),
            }
          : null,
      status,
      penjelasan,
    };
  };

  const baris = [];

  if (adaPasangan) {
    const label = pasangan === 'suami' ? 'Suami' : 'Istri';
    let penjelasan =
      pasangan === 'suami'
        ? `Suami mendapat ${teksPecahan(fardhu.pasangan)} karena ${adaAnak ? 'pewaris meninggalkan anak' : 'pewaris tidak meninggalkan anak'}.`
        : `Istri mendapat ${teksPecahan(fardhu.pasangan)} karena ${adaAnak ? 'pewaris meninggalkan anak' : 'pewaris tidak meninggalkan anak'} (dihitung untuk 1 istri).`;
    if (terjadiAul) {
      penjelasan += ` Karena 'aul, bagian akhir menyusut menjadi ${teksPecahan(akhir.pasangan)}.`;
    }
    baris.push(
      buatBaris({
        kunci: 'pasangan',
        golongan: label,
        jumlah: 1,
        dasarBagian: teksPecahan(fardhu.pasangan),
        status: 'fardhu',
        penjelasan,
      }),
    );
  }

  if (adaAyah) {
    let status;
    let dasarBagian;
    let penjelasan;
    if (anakLk > 0) {
      status = 'fardhu';
      dasarBagian = '1/6';
      penjelasan = 'Ayah mendapat 1/6 (fardhu) karena ada anak laki-laki; sisa harta untuk anak-anak sebagai \'ashabah.';
    } else if (anakPr > 0) {
      if (terjadiAul) {
        status = 'fardhu';
        dasarBagian = '1/6 + sisa';
        penjelasan = 'Ayah berhak 1/6 + sisa (\'ashabah), tetapi karena terjadi \'aul hak \'ashabah gugur dan bagiannya ikut diskala.';
      } else {
        status = 'fardhu-ashabah';
        dasarBagian = '1/6 + sisa';
        penjelasan = 'Ayah mendapat 1/6 (fardhu) ditambah seluruh sisa harta sebagai \'ashabah, karena hanya ada anak perempuan.';
      }
    } else {
      status = 'ashabah';
      dasarBagian = "'Ashabah (sisa)";
      penjelasan = 'Ayah mengambil seluruh sisa harta sebagai \'ashabah karena tidak ada anak.';
    }
    baris.push(
      buatBaris({ kunci: 'ayah', golongan: 'Ayah', jumlah: 1, dasarBagian, status, penjelasan }),
    );
  }

  if (adaIbu) {
    let penjelasan;
    if (umariyyah) {
      penjelasan =
        'Kasus \'umariyyah: ibu mendapat 1/3 dari SISA harta setelah bagian pasangan dikeluarkan, bukan 1/3 dari seluruh harta.';
    } else if (adaAnak) {
      penjelasan = 'Ibu mendapat 1/6 karena pewaris meninggalkan anak.';
    } else if (jmlSaudara >= 2) {
      penjelasan = 'Ibu mendapat 1/6 karena jumlah saudara pewaris 2 orang atau lebih (meski saudara itu sendiri terhalang).';
    } else {
      penjelasan = 'Ibu mendapat 1/3 karena tidak ada anak dan saudara kurang dari 2 orang.';
    }
    if (dapatRadd.ibu) {
      penjelasan += ` Ditambah radd sebesar ${teksPecahan(dapatRadd.ibu)} dari sisa harta.`;
    }
    if (terjadiAul) {
      penjelasan += ` Karena 'aul, bagian akhir menyusut menjadi ${teksPecahan(akhir.ibu)}.`;
    }
    baris.push(
      buatBaris({
        kunci: 'ibu',
        golongan: 'Ibu',
        jumlah: 1,
        dasarBagian: umariyyah ? '1/3 dari sisa' : teksPecahan(fardhu.ibu),
        status: 'fardhu',
        penjelasan,
      }),
    );
  }

  if (anakLk > 0) {
    baris.push(
      buatBaris({
        kunci: 'anakLaki',
        golongan: 'Anak Laki-laki',
        jumlah: anakLk,
        dasarBagian: "'Ashabah (2 : 1)",
        status: 'ashabah',
        penjelasan:
          anakPr > 0
            ? 'Anak-anak menjadi \'ashabah bersama: setiap anak laki-laki mendapat 2 bagian berbanding 1 bagian anak perempuan, dari sisa harta setelah fardhu.'
            : 'Anak laki-laki mengambil seluruh sisa harta sebagai \'ashabah setelah bagian fardhu dibagikan.',
      }),
    );
  }

  if (anakPr > 0) {
    if (anakLk > 0) {
      baris.push(
        buatBaris({
          kunci: 'anakPerempuan',
          golongan: 'Anak Perempuan',
          jumlah: anakPr,
          dasarBagian: "'Ashabah (2 : 1)",
          status: 'ashabah',
          penjelasan:
            'Ikut menjadi \'ashabah bersama anak laki-laki dengan perbandingan 2 : 1 (laki-laki : perempuan).',
        }),
      );
    } else {
      let penjelasan =
        anakPr === 1
          ? 'Satu anak perempuan mendapat 1/2 (fardhu).'
          : 'Dua anak perempuan atau lebih berbagi 2/3 (fardhu) secara merata.';
      if (dapatRadd.anakPerempuan) {
        penjelasan += ` Ditambah radd sebesar ${teksPecahan(dapatRadd.anakPerempuan)} dari sisa harta.`;
      }
      if (terjadiAul) {
        penjelasan += ` Karena 'aul, bagian akhir menyusut menjadi ${teksPecahan(akhir.anakPerempuan)}.`;
      }
      baris.push(
        buatBaris({
          kunci: 'anakPerempuan',
          golongan: 'Anak Perempuan',
          jumlah: anakPr,
          dasarBagian: teksPecahan(fardhu.anakPerempuan),
          status: 'fardhu',
          penjelasan,
        }),
      );
    }
  }

  const alasanTerhalang = adaAyah && anakLk > 0
    ? 'ayah dan anak laki-laki'
    : adaAyah
      ? 'ayah'
      : 'anak laki-laki';

  if (sdrLk > 0) {
    if (sdrTerhalang) {
      baris.push(
        buatBaris({
          kunci: 'saudaraLaki',
          golongan: 'Saudara Laki-laki Kandung',
          jumlah: sdrLk,
          dasarBagian: 'Mahjub',
          status: 'terhalang',
          penjelasan: `Terhalang (mahjub) oleh adanya ${alasanTerhalang} — tidak mendapat bagian.`,
        }),
      );
    } else {
      baris.push(
        buatBaris({
          kunci: 'saudaraLaki',
          golongan: 'Saudara Laki-laki Kandung',
          jumlah: sdrLk,
          dasarBagian: "'Ashabah (sisa)",
          status: 'ashabah',
          penjelasan:
            sdrPr > 0
              ? 'Saudara kandung menjadi \'ashabah bersama: saudara laki-laki mendapat 2 bagian berbanding 1 bagian saudara perempuan, dari sisa harta.'
              : 'Saudara laki-laki kandung mengambil seluruh sisa harta sebagai \'ashabah.',
        }),
      );
    }
  }

  if (sdrPr > 0) {
    if (sdrTerhalang) {
      baris.push(
        buatBaris({
          kunci: 'saudaraPerempuan',
          golongan: 'Saudara Perempuan Kandung',
          jumlah: sdrPr,
          dasarBagian: 'Mahjub',
          status: 'terhalang',
          penjelasan: `Terhalang (mahjub) oleh adanya ${alasanTerhalang} — tidak mendapat bagian.`,
        }),
      );
    } else if (ashabah === 'saudara') {
      baris.push(
        buatBaris({
          kunci: 'saudaraPerempuan',
          golongan: 'Saudara Perempuan Kandung',
          jumlah: sdrPr,
          dasarBagian: "'Ashabah (2 : 1)",
          status: 'ashabah',
          penjelasan:
            'Menjadi \'ashabah bil-ghair bersama saudara laki-laki dengan perbandingan 2 : 1 (laki-laki : perempuan).',
        }),
      );
    } else if (ashabah === 'saudari-maa') {
      baris.push(
        buatBaris({
          kunci: 'saudaraPerempuan',
          golongan: 'Saudara Perempuan Kandung',
          jumlah: sdrPr,
          dasarBagian: "'Ashabah ma'a al-ghair (sisa)",
          status: 'ashabah',
          penjelasan:
            'Bersama anak perempuan, saudara perempuan kandung menjadi \'ashabah ma\'a al-ghair: mengambil sisa setelah bagian fardhu dibagikan.',
        }),
      );
    } else {
      let penjelasan =
        sdrPr === 1
          ? 'Satu saudara perempuan kandung mendapat 1/2 (fardhu) karena tidak ada anak, ayah, maupun saudara laki-laki.'
          : 'Dua saudara perempuan kandung atau lebih berbagi 2/3 (fardhu) secara merata karena tidak ada anak, ayah, maupun saudara laki-laki.';
      if (dapatRadd.saudaraPerempuan) {
        penjelasan += ` Ditambah radd sebesar ${teksPecahan(dapatRadd.saudaraPerempuan)} dari sisa harta.`;
      }
      if (terjadiAul) {
        penjelasan += ` Karena 'aul, bagian akhir menyusut menjadi ${teksPecahan(akhir.saudaraPerempuan)}.`;
      }
      baris.push(
        buatBaris({
          kunci: 'saudaraPerempuan',
          golongan: 'Saudara Perempuan Kandung',
          jumlah: sdrPr,
          dasarBagian: teksPecahan(fardhu.saudaraPerempuan),
          status: 'fardhu',
          penjelasan,
        }),
      );
    }
  }

  let totalTerbagi = NOL;
  for (const b of baris) totalTerbagi = tambah(totalTerbagi, b.pecahan);

  return {
    valid: true,
    totalHarta,
    statusKasus,
    baris,
    sisaTakTerbagi,
    totalTerbagi,
    catatan,
  };
}

export default hitungWaris;
