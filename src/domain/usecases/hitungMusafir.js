/**
 * Use case: penentuan status musafir berdasarkan jarak safar
 * (fungsi murni — tanpa efek samping).
 *
 * Ketentuan yang dipakai (jumhur ulama): jarak safar minimal adalah
 * 2 marhalah, yang dikonversi para ulama kontemporer menjadi sekitar
 * 81 km (sebagian pendapat menyebut ±80,6 km atau 88 km — perbedaan
 * kecil antarpendapat adalah hal yang wajar; ikuti pendapat yang
 * diyakini / guru setempat).
 *
 * Orang yang telah mencapai jarak safar dan tidak berniat mukim
 * (menetap) 4 hari atau lebih di tempat tujuan — di luar hari datang
 * dan hari pulang, menurut jumhur — berstatus musafir dan mendapat
 * keringanan (rukhshah):
 * - Qashar: sholat 4 rakaat (Zuhur, Asar, Isya) diringkas menjadi 2 rakaat.
 * - Jama': menggabung Zuhur–Asar atau Magrib–Isya dalam satu waktu.
 */

export const JARAK_MUSAFIR_KM = 81;
export const BATAS_MUKIM_HARI = 4;

const aman = (n) => {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

/**
 * @param {number} jarakKm jarak perjalanan (satu arah) dalam kilometer
 * @returns {{
 *   valid: boolean, jarakKm: number, batasKm: number,
 *   status: 'musafir'|'belum-musafir', judul: string,
 *   bolehQashar: boolean, bolehJama: boolean,
 *   keterangan: string, ringkasan: string[],
 * }}
 */
export function hitungMusafir(jarakKm) {
  const jarak = aman(jarakKm);
  const valid = jarak > 0;
  const musafir = valid && jarak >= JARAK_MUSAFIR_KM;

  const ringkasan = musafir
    ? [
        'Qashar boleh: Zuhur, Asar, dan Isya dikerjakan 2 rakaat. Subuh dan Magrib tidak diqashar.',
        'Jama\u2019 boleh: Zuhur dengan Asar, atau Magrib dengan Isya — didahulukan (taqdim) atau diakhirkan (ta\u2019khir).',
        `Batas mukim: bila berniat menetap ${BATAS_MUKIM_HARI} hari atau lebih di tempat tujuan (di luar hari datang dan pulang, menurut jumhur), status musafir berakhir dan sholat dikerjakan sempurna tanpa qashar.`,
        'Status musafir berlaku sejak keluar dari batas tempat tinggal sampai kembali pulang.',
      ]
    : [
        'Qashar dan jama\u2019 karena safar belum berlaku — sholat dikerjakan sempurna seperti biasa.',
        'Jama\u2019 tetap boleh dalam kondisi lain yang dibenarkan syariat (misalnya hujan lebat atau sakit) menurut pendapat yang membolehkannya; rujuk guru setempat.',
        `Status musafir menurut jumhur ulama dimulai bila jarak perjalanan mencapai ${JARAK_MUSAFIR_KM} km (2 marhalah) atau lebih.`,
      ];

  return {
    valid,
    jarakKm: jarak,
    batasKm: JARAK_MUSAFIR_KM,
    status: musafir ? 'musafir' : 'belum-musafir',
    judul: !valid
      ? 'Masukkan jarak perjalanan terlebih dahulu'
      : musafir
        ? 'Berstatus musafir'
        : 'Belum berstatus musafir',
    bolehQashar: musafir,
    bolehJama: musafir,
    keterangan: !valid
      ? 'Isi jarak satu arah dari tempat tinggal ke tujuan dalam kilometer.'
      : musafir
        ? `Jarak ${jarak.toLocaleString('id-ID')} km sudah mencapai batas safar ${JARAK_MUSAFIR_KM} km (2 marhalah), sehingga keringanan qashar dan jama\u2019 berlaku.`
        : `Jarak ${jarak.toLocaleString('id-ID')} km belum mencapai batas safar ${JARAK_MUSAFIR_KM} km (2 marhalah menurut jumhur ulama).`,
    ringkasan,
  };
}
