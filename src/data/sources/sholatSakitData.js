// Data statis panduan sholat orang sakit & sholat di kendaraan
// (data layer). Konten: ringkasan edukasi yang ditulis ulang —
// bukan fatwa; untuk kasus khusus rujuk ulama setempat.
// Prinsip dasarnya: "Sholatlah sambil berdiri; jika tidak mampu,
// sambil duduk; jika tidak mampu, sambil berbaring." (HR. Bukhari)

import { DISCLAIMER_PANDUAN } from './panduanSholatData.js';

export { DISCLAIMER_PANDUAN };

// Urutan posisi sholat sesuai tingkat kemampuan — turun satu tingkat
// hanya bila tingkat di atasnya tidak mampu dikerjakan.
export const POSISI_SAKIT = [
  {
    judul: 'Berdiri seperti biasa',
    desc: 'Selama masih mampu berdiri, sholat dikerjakan berdiri. Boleh bersandar pada dinding atau tongkat bila itu membantu dan tidak membahayakan.',
  },
  {
    judul: 'Duduk di kursi',
    desc: 'Bila tidak mampu berdiri lama atau berdiri membahayakan kesembuhan: sholat sambil duduk di kursi/kursi roda. Rukuk dengan membungkukkan badan sedikit, sujud membungkuk lebih dalam dari rukuk. Bila mampu sujud di lantai untuk sujud saja, itu lebih utama.',
  },
  {
    judul: 'Duduk di lantai',
    desc: 'Bila tidak tersedia kursi atau lebih nyaman di lantai: duduk iftirasy atau bersila. Gerakan rukuk dan sujud dengan isyarat membungkukkan badan dan kepala — sujud lebih rendah daripada rukuk.',
  },
  {
    judul: 'Berbaring miring',
    desc: 'Bila tidak mampu duduk: berbaring miring ke kanan menghadap kiblat (wajah dan badan mengarah kiblat). Rukuk dan sujud dengan isyarat gerakan kepala, sujud lebih rendah daripada rukuk.',
  },
  {
    judul: 'Terlentang dengan isyarat kepala',
    desc: 'Bila tidak mampu miring: berbaring terlentang, kaki diarahkan ke kiblat dan kepala sedikit diganjal bantal agar wajah menghadap kiblat. Rukuk dan sujud dengan menundukkan kepala — sujud lebih dalam daripada rukuk.',
  },
  {
    judul: 'Isyarat kelopak mata',
    desc: 'Bila kepala pun tidak dapat digerakkan: rukuk dan sujud diisyaratkan dengan memejamkan kelopak mata — pejaman sujud sedikit lebih lama/dalam daripada rukuk. Bila ini pun tidak mampu, sholat dikerjakan dalam hati: menghadirkan setiap gerakan dan bacaan tanpa menggerakkan anggota badan.',
  },
];

export const BERSUCI_SAKIT = [
  'Wudhu tetap wajib bila mampu dan air tidak membahayakan — boleh dibantu orang lain untuk membasuh anggota wudhu.',
  'Bila air membahayakan luka/penyakit, atau tidak mampu berwudhu sama sekali: bertayammum dengan debu/tanah yang suci (atau permukaan yang berdebu menurut pendapat yang membolehkan).',
  'Perban, gips, atau infus yang tidak boleh dilepas: cukup diusap bagian luarnya saat wudhu, dan bagian yang tertutup tidak wajib dibasuh.',
  'Bagian tubuh yang tidak tertutup perban tetap dibasuh seperti biasa bila mampu.',
  'Najis yang sulit dihindari karena sakit (misalnya perdarahan yang terus keluar atau kantong medis) dimaafkan sebatas kebutuhan — sholat tetap dikerjakan, jangan ditinggalkan karena alasan itu.',
  'Bila benar-benar tidak mampu bersuci dan tidak ada yang membantu, tetap sholat sebisanya; para ulama berbeda pendapat soal mengulanginya setelah sembuh — ikuti bimbingan guru setempat.',
];

export const SHOLAT_KENDARAAN = [
  'Kerjakan sholat dalam keadaan duduk di kursi kendaraan (mobil, bus, kereta, pesawat, kapal). Berdiri dan menghadap kiblat dikerjakan bila memungkinkan dan aman.',
  'Di awal sholat, hadapkan badan ke kiblat bila kendaraan memungkinkan diputar atau badan bisa diarahkan; setelah itu, ke mana pun kendaraan berbelok tidak membatalkan sholat menurut pendapat yang kuat bagi sholat di perjalanan — untuk pesawat/kereta, arah kiblat bisa diperkirakan dengan aplikasi kiblat.',
  'Rukuk diisyaratkan dengan menundukkan kepala/badan sedikit; sujud ditundukkan lebih rendah daripada rukuk. Letakkan dahi pada sandaran atau benda di depan hanya bila memungkinkan tanpa membahayakan.',
  'Sholat wajib sebisa mungkin dikerjakan saat kendaraan berhenti (rest area, stasiun, bandara). Bila waktu hampir habis dan kendaraan tidak berhenti, sholat di kendaraan sah dikerjakan — jangan sampai waktu sholat terlewat seluruhnya.',
  'Berwudhu sebelum berangkat dan menjaga wudhu selama perjalanan sangat membantu; bila batal dan tidak ada air/air membahayakan, bertayammum.',
  'Untuk sholat sunnah di kendaraan, arah kiblat lebih longgar: cukup menghadap arah perjalanan kendaraan, sebagaimana praktik Rasulullah \uFD3A.',
];
