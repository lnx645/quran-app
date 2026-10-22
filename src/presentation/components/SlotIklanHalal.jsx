/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { iklanHalalAktif, muatIklanHalal } from '../../data/platform/iklanHalal.js';

const Wadah = styled.div`
  margin: 18px 0 4px;
  text-align: center;
`;

const Label = styled.div`
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.faint};
  margin-bottom: 6px;
`;

/**
 * Slot iklan halal — merender null selama fitur belum diaktifkan
 * (lihat data/platform/iklanHalal.js). Saat aktif: memuat skrip
 * jaringan sekali dan menyediakan wadah berlabel "Iklan" untuk
 * penempatan jaringan (auto-ads / widget). Dipasang di Beranda;
 * JANGAN pasang di Mode Anak atau halaman baca mushaf.
 */
export default function SlotIklanHalal() {
  const aktif = iklanHalalAktif();

  useEffect(() => {
    if (aktif) muatIklanHalal();
  }, [aktif]);

  if (!aktif) return null;
  return (
    <Wadah aria-label="Iklan">
      <Label>Iklan</Label>
      <div className="slot-iklan-halal" />
    </Wadah>
  );
}
