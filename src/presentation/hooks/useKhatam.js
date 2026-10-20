import { useCallback, useMemo, useState } from 'react';
import { LocalKhatamRepository } from '../../data/repositories/LocalKhatamRepository.js';
import {
  halamanSelesai,
  persenKhatam,
  kebutuhanHarian,
} from '../../domain/usecases/hitungKhatam.js';

// Hook Khatam Tracker: state progres dari repository lokal.
export function useKhatam() {
  const [progres, setProgres] = useState(() => LocalKhatamRepository.load());

  const simpan = useCallback((baru) => {
    setProgres(baru);
    LocalKhatamRepository.save(baru);
  }, []);

  const toggleJuz = useCallback(
    (juz) => {
      setProgres((lama) => {
        const baru = {
          ...lama,
          selesai: { ...lama.selesai, [juz]: !lama.selesai[juz] },
        };
        LocalKhatamRepository.save(baru);
        return baru;
      });
    },
    []
  );

  const setTarget = useCallback(
    (iso) => {
      setProgres((lama) => {
        const baru = { ...lama, targetTanggal: iso || null };
        LocalKhatamRepository.save(baru);
        return baru;
      });
    },
    []
  );

  const reset = useCallback(() => {
    LocalKhatamRepository.reset();
    setProgres(LocalKhatamRepository.load());
  }, []);

  const ringkasan = useMemo(
    () => ({
      halaman: halamanSelesai(progres.selesai),
      persen: persenKhatam(progres.selesai),
      juzSelesai: Object.values(progres.selesai).filter(Boolean).length,
      kebutuhan: kebutuhanHarian(progres.selesai, progres.targetTanggal),
    }),
    [progres]
  );

  return { progres, toggleJuz, setTarget, reset, ringkasan, simpan };
}
