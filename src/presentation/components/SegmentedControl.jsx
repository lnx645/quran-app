/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { reduceMotion } from './motion.js';

/**
 * SegmentedControl — pola tab bersama aplikasi: satu wadah pil ramping
 * full-width berisi segmen sama lebar. Bahasa visual segmen aktif sama
 * dengan tombol utama PlayerBar & chip aktif ReadingControls: gradasi
 * emas + teks primaryDeep. Total tinggi wadah ±48px.
 *
 * Pemakaian:
 *   <SegmenWadah role="tablist" aria-label="Jenis zakat">
 *     <SegmenTab aktif={tab === 'mal'} onClick={...}>
 *       <FaCoins /> Zakat Mal
 *     </SegmenTab>
 *     ...
 *   </SegmenWadah>
 */
export const SegmenWadah = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
`;

export const Segmen = styled.button`
  flex: 1;
  min-width: 0;
  min-height: 52px;
  padding: 7px 6px 6px;
  border: none;
  border-radius: 999px;
  background: ${({ theme, aktif }) => (aktif ? theme.gradients.gold : 'transparent')};
  color: ${({ theme, aktif }) => (aktif ? theme.colors.primaryDeep : theme.colors.muted)};
  box-shadow: ${({ theme, aktif }) => (aktif ? theme.shadows.gold : 'none')};
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.2px;
  /* Tata letak tab: ikon DI ATAS, label satu baris di bawahnya (seperti tab
     bar aplikasi). Label tidak pernah melipat/terpotong — temuan user di
     Konverter dua kali: sebaris ikon+teks selalu sempit & berantakan. */
  white-space: nowrap;
  text-align: center;
  line-height: 1.2;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  transition: background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    color ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    box-shadow ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: scale(0.97);
  }
  svg {
    flex-shrink: 0;
    font-size: 16px;
  }
`;

// Segmen tab dengan semantik tab yang benar.
export function SegmenTab({ aktif, ...props }) {
  return <Segmen role="tab" aria-selected={!!aktif} aktif={aktif} {...props} />;
}

/**
 * Varian KOMPAK — untuk kontrol opsi berisi teks pendek TANPA ikon
 * (angka/satuan/pilihan singkat, mis. 1×/3×/5×/∞). Berbeda dari
 * SegmenWadah/Segmen di atas yang dirancang sebagai tab ikon-di-atas-label
 * full-width: wadah kompak selebar isinya (fit-content) dan segmennya
 * sebaris setinggi 38px, jadi kapsulnya proporsional dengan label mungil.
 *
 * Pemakaian:
 *   <SegmenKompakWadah role="group" aria-labelledby="label-ulang">
 *     <SegmenKompak aktif={ulang === '1'} aria-pressed={...} onClick={...}>
 *       1×
 *     </SegmenKompak>
 *     ...
 *   </SegmenKompakWadah>
 */
export const SegmenKompakWadah = styled.div`
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  gap: 3px;
  padding: 3px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
`;

export const SegmenKompak = styled.button`
  min-width: 54px;
  height: 38px;
  padding: 0 14px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  border: none;
  border-radius: 999px;
  white-space: nowrap;
  background: ${({ theme, aktif }) => (aktif ? theme.gradients.gold : 'transparent')};
  color: ${({ theme, aktif }) => (aktif ? theme.colors.primaryDeep : theme.colors.muted)};
  box-shadow: ${({ theme, aktif }) => (aktif ? theme.shadows.gold : 'none')};
  transition: background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    color ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    box-shadow ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: scale(0.97);
  }
  ${reduceMotion}
`;
