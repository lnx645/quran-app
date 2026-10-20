import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useKompas — kompas HP yang perilakunya MENIRU kompas kiblat daring referensi
 * (al-habib.info kiblat-kompas.js v2.0), karena terbukti dirasakan akurat pengguna:
 *
 *  - SATU jalur listener: 'deviceorientationabsolute' bila didukung, selain itu
 *    'deviceorientation'.
 *  - Heading mentah per event: h = (-1 * e.webkitCompassHeading) || e.alpha
 *    (Android = alpha MENTAH, iOS = -webkitCompassHeading).
 *  - Rose diputar LANGSUNG per event: rotateZ(h - (window.orientation || 0))
 *    tanpa transisi CSS dan tanpa akumulasi jalur-terpendek.
 *  - TANPA koreksi deklinasi pada jalur heading (sama seperti referensi).
 *
 * Heading tampil (untuk angka & zona kiblat) juga mengikuti referensi:
 *    hng = h - window.orientation
 *    phase = hng < 0 ? 360 + hng : hng
 *    tampil = 360 - phase
 *
 * Listener dipasang otomatis saat hook dipakai (halaman dibuka); iOS meminta
 * izin sensor di klik/tap pertama — sama seperti referensi. Tombol "Aktifkan
 * Kompas" tetap tersedia lewat `mulai()`.
 *
 * Status: 'mati' | 'meminta-izin' | 'aktif' | 'ditolak' | 'tidak-didukung'.
 * `tanpaAbsolut` true bila event bukan absolut → arah tak bisa dipercaya.
 */
export function useKompas() {
  // Status awal langsung benar untuk perangkat tanpa API orientasi.
  const didukung =
    typeof window !== 'undefined' &&
    ('ondeviceorientationabsolute' in window || 'ondeviceorientation' in window);
  const [status, setStatus] = useState(didukung ? 'aktif' : 'tidak-didukung');
  const [heading, setHeading] = useState(null); // heading TAMPIL ala referensi (°)
  const [rotasi, setRotasi] = useState(null); // nilai rotateZ mentah untuk rose
  const [akurasi, setAkurasi] = useState(null); // webkitCompassAccuracy (°), bila ada
  const [sumberEvent, setSumberEvent] = useState(null); // 'webkit' | 'absolute' | 'relative'
  const [tanpaAbsolut, setTanpaAbsolut] = useState(false);
  const [butuhKalibrasi, setButuhKalibrasi] = useState(false);

  const namaEventRef = useRef(null);
  const terpasangRef = useRef(false);
  const punyaData = useRef(false);
  const izinDimintaRef = useRef(false);

  const tangani = useCallback((e) => {
    const h = -1 * e.webkitCompassHeading || e.alpha; // persis referensi
    if (typeof h !== 'number' || !Number.isFinite(h)) return;
    punyaData.current = true;
    const hng = h - ((typeof window !== 'undefined' && window.orientation) || 0);
    const phase = hng < 0 ? 360 + hng : hng;
    setRotasi(hng);
    setHeading(360 - phase);
    if (typeof e.webkitCompassHeading === 'number' && Number.isFinite(e.webkitCompassHeading)) {
      setSumberEvent('webkit');
      setTanpaAbsolut(false);
      if (typeof e.webkitCompassAccuracy === 'number' && e.webkitCompassAccuracy >= 0) {
        setAkurasi(e.webkitCompassAccuracy);
      }
    } else {
      setSumberEvent(
        namaEventRef.current === 'deviceorientationabsolute' ? 'absolute' : 'relative',
      );
      setTanpaAbsolut(e.absolute !== true);
    }
    setStatus('aktif');
  }, []);

  const pasang = useCallback(() => {
    if (typeof window === 'undefined' || terpasangRef.current) return false;
    const nama =
      'ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation';
    namaEventRef.current = nama;
    window.addEventListener(nama, tangani, true);
    terpasangRef.current = true;
    return true;
  }, [tangani]);

  const saatButuhKalibrasi = useCallback(() => setButuhKalibrasi(true), []);

  const mulai = useCallback(async () => {
    if (typeof window === 'undefined') {
      setStatus('tidak-didukung');
      return;
    }
    if (!('ondeviceorientationabsolute' in window) && !('ondeviceorientation' in window)) {
      setStatus('tidak-didukung');
      return;
    }
    try {
      setStatus('meminta-izin');
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        izinDimintaRef.current = true;
        const izin = await DeviceOrientationEvent.requestPermission();
        if (izin !== 'granted') {
          setStatus('ditolak');
          return;
        }
      }
      pasang();
      setStatus('aktif');
      // Anjing penjaga: bila 6 detik tak ada data sama sekali → anggap tak didukung.
      setTimeout(() => {
        if (!punyaData.current) setStatus((s) => (s === 'aktif' ? 'tidak-didukung' : s));
      }, 6000);
    } catch {
      setStatus('tidak-didukung');
    }
  }, [pasang]);

  // Auto-start ala referensi: pasang listener begitu halaman dibuka.
  // iOS: izin sensor diminta di klik/tap pertama.
  useEffect(() => {
    if (!didukung) return undefined;
    pasang();
    let klikPertama = null;
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      klikPertama = async () => {
        if (izinDimintaRef.current) return;
        izinDimintaRef.current = true;
        try {
          const izin = await DeviceOrientationEvent.requestPermission();
          if (izin !== 'granted') setStatus('ditolak');
        } catch {
          /* abaikan */
        }
        window.removeEventListener('click', klikPertama);
        window.removeEventListener('touchend', klikPertama);
      };
      window.addEventListener('click', klikPertama);
      window.addEventListener('touchend', klikPertama);
    }
    window.addEventListener('compassneedscalibration', saatButuhKalibrasi, true);
    const w = setTimeout(() => {
      if (!punyaData.current) setStatus((s) => (s === 'aktif' ? 'tidak-didukung' : s));
    }, 6000);
    return () => {
      clearTimeout(w);
      if (klikPertama) {
        window.removeEventListener('click', klikPertama);
        window.removeEventListener('touchend', klikPertama);
      }
      window.removeEventListener('compassneedscalibration', saatButuhKalibrasi, true);
      if (namaEventRef.current && terpasangRef.current) {
        window.removeEventListener(namaEventRef.current, tangani, true);
        terpasangRef.current = false;
      }
      punyaData.current = false;
    };
  }, [pasang, tangani, saatButuhKalibrasi, didukung]);

  return {
    status, // 'mati' | 'meminta-izin' | 'aktif' | 'ditolak' | 'tidak-didukung'
    heading, // heading tampil (°), null bila belum ada data
    rotasi, // nilai rotateZ mentah untuk rose, null bila belum ada data
    akurasi, // null bila perangkat tak melapor
    sumberEvent, // 'webkit' | 'absolute' | 'relative' | null
    tanpaAbsolut, // true → data relatif saja, arah tak bisa dipercaya
    butuhKalibrasi,
    mulai,
    sensorAktif: status === 'aktif',
  };
}
