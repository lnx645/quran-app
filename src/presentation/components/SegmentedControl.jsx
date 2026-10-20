/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

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
  min-height: 40px;
  padding: 6px 8px;
  border: none;
  border-radius: 999px;
  background: ${({ theme, aktif }) => (aktif ? theme.gradients.gold : 'transparent')};
  color: ${({ theme, aktif }) => (aktif ? theme.colors.primaryDeep : theme.colors.muted)};
  box-shadow: ${({ theme, aktif }) => (aktif ? theme.shadows.gold : 'none')};
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: 0.2px;
  /* Label panjang MELIPAT rapi ke baris kedua — tidak boleh terpotong di
     tengah kata (temuan user di Konverter: "Hijriah → Mase…"). */
  white-space: normal;
  text-align: center;
  line-height: 1.3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    color ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    box-shadow ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: scale(0.97);
  }
  svg {
    flex-shrink: 0;
    font-size: 15px;
  }
`;

// Segmen tab dengan semantik tab yang benar.
export function SegmenTab({ aktif, ...props }) {
  return <Segmen role="tab" aria-selected={!!aktif} aktif={aktif} {...props} />;
}
