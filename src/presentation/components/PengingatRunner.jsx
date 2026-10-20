import { usePengingatRunner } from '../hooks/usePengingat.js';

/**
 * PengingatRunner — komponen TANPA UI (render null) yang menjalankan mesin
 * penjadwalan pengingat ibadah lokal (dzikir pagi/petang & target baca).
 *
 * WIRING (koordinator): pasang SEKALI di shell aplikasi (src/app/App.jsx),
 * di dalam RouterProvider/shell agar hidup lintas halaman selama aplikasi
 * terbuka, misalnya di samping <LiveRegion />:
 *
 *   import PengingatRunner from '../presentation/components/PengingatRunner.jsx';
 *   ...
 *   <PengingatRunner />
 *
 * Pengingat hanya tampil selama aplikasi/peramban terbuka di perangkat ini
 * dan hanya bila izin notifikasi sudah 'granted' (lihat usePengingat).
 */
export default function PengingatRunner() {
  usePengingatRunner();
  return null;
}
