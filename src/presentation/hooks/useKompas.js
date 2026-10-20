import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useKompas — membaca sensor orientasi perangkat dan menghasilkan heading
 * dalam acuan UTARA SEJATI (true north), siap dibandingkan dengan bearing kiblat.
 *
 * Konvensi yang dipakai (hasil riset spesifikasi W3C DeviceOrientation):
 *  - iOS Safari: `e.webkitCompassHeading` SUDAH acuan utara sejati (termasuk
 *    koreksi deklinasi oleh sistem), akurasi di `e.webkitCompassAccuracy`.
 *  - Android Chrome: dengarkan `deviceorientationabsolute` DULU (event
 *    non-standar Chromium; alpha acuan "sistem koordinat Bumi" = utara
 *    MAGNETIK pada implementasi Android), fallback ke `deviceorientation`
 *    dengan syarat `e.absolute === true`. Abaikan event relatif bila data
 *    absolut sudah diterima.
 *  - `alpha`: 0 saat atas perangkat menunjuk utara, bertambah BERLAWANAN
 *    arah jarum jam (konvensi matematis) → heading magnetik = (360 − alpha).
 *    Koreksi ke utara sejati: true = magnetik − D, dengan D = deklinasi
 *    (positif = timur) yang dioper dari luar (hook tidak tahu sumbernya).
 *
 * Status: 'mati' | 'meminta-izin' | 'aktif' | 'ditolak' | 'tidak-didukung'.
 * `tanpaAbsolut` true bila yang datang hanya event relatif → arah tak bisa dipercaya.
 */
export function useKompas(deklinasi = 0) {
  const [status, setStatus] = useState('mati');
  const [heading, setHeading] = useState(null); // ° dari utara SEJATI, searah jarum jam
  const [akurasi, setAkurasi] = useState(null); // webkitCompassAccuracy (°), bila ada
  const [sumberEvent, setSumberEvent] = useState(null); // 'webkit' | 'absolute' | 'relative'
  const [tanpaAbsolut, setTanpaAbsolut] = useState(false);
  const [butuhKalibrasi, setButuhKalibrasi] = useState(false);

  const deklRef = useRef(deklinasi);
  deklRef.current = deklinasi;
  const terimaAbsolut = useRef(false);
  const punyaData = useRef(false);

  const terapkan = useCallback((e) => {
    // 1) iOS: webkitCompassHeading sudah utara sejati.
    if (typeof e.webkitCompassHeading === 'number' && Number.isFinite(e.webkitCompassHeading)) {
      punyaData.current = true;
      setSumberEvent('webkit');
      setTanpaAbsolut(false);
      setHeading((((e.webkitCompassHeading % 360) + 360) % 360));
      if (typeof e.webkitCompassAccuracy === 'number' && e.webkitCompassAccuracy >= 0) {
        setAkurasi(e.webkitCompassAccuracy);
      }
      return;
    }
    // 2) Android: alpha (+ beta/gamma bila perlu). Hanya pakai data absolut.
    if (typeof e.alpha !== 'number' || !Number.isFinite(e.alpha)) return;
    if (!e.absolute && terimaAbsolut.current) return; // event relatif usang — abaikan
    punyaData.current = true;
    if (e.absolute === true) terimaAbsolut.current = true;
    setSumberEvent(e.absolute === true ? 'absolute' : 'relative');
    setTanpaAbsolut(e.absolute !== true);
    const magnetik = (((360 - e.alpha) % 360) + 360) % 360; // acuan: utara magnetik
    setHeading((((magnetik - deklRef.current) % 360) + 360) % 360); // → utara sejati
  }, []);

  const saatButuhKalibrasi = useCallback(() => setButuhKalibrasi(true), []);

  const mulai = useCallback(async () => {
    const adaEvent =
      typeof window !== 'undefined' &&
      ('ondeviceorientationabsolute' in window || 'ondeviceorientation' in window);
    const adaWebkit =
      typeof window !== 'undefined' && 'ondeviceorientation' in window; // iOS juga di sini
    if (!adaEvent && !adaWebkit) {
      setStatus('tidak-didukung');
      return;
    }
    try {
      setStatus('meminta-izin');
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        const izin = await DeviceOrientationEvent.requestPermission();
        if (izin !== 'granted') {
          setStatus('ditolak');
          return;
        }
      }
      // deviceorientationabsolute dulu (Android Chrome), lalu fallback standar.
      window.addEventListener('deviceorientationabsolute', terapkan, true);
      window.addEventListener('deviceorientation', terapkan, true);
      window.addEventListener('compassneedscalibration', saatButuhKalibrasi, true);
      setStatus('aktif');
      // Anjing penjaga: bila 6 detik tak ada data sama sekali → anggap tak didukung.
      setTimeout(() => {
        if (!punyaData.current) setStatus((s) => (s === 'aktif' ? 'tidak-didukung' : s));
      }, 6000);
    } catch {
      setStatus('tidak-didukung');
    }
  }, [terapkan, saatButuhKalibrasi]);

  const berhenti = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('deviceorientationabsolute', terapkan, true);
    window.removeEventListener('deviceorientation', terapkan, true);
    window.removeEventListener('compassneedscalibration', saatButuhKalibrasi, true);
    setStatus('mati');
    setHeading(null);
  }, [terapkan, saatButuhKalibrasi]);

  useEffect(() => berhenti, [berhenti]);

  return {
    status, // 'mati' | 'meminta-izin' | 'aktif' | 'ditolak' | 'tidak-didukung'
    heading, // null bila belum ada data
    akurasi, // null bila perangkat tak melapor
    sumberEvent, // 'webkit' | 'absolute' | 'relative' | null
    tanpaAbsolut, // true → data relatif saja, arah tak bisa dipercaya
    butuhKalibrasi,
    mulai,
    berhenti,
    sensorAktif: status === 'aktif',
  };
}
