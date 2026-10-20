/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaCheck } from 'react-icons/fa';

/**
 * KotakCentang — checkbox kustom Noor (menggantikan checkbox bawaan browser
 * yang tampil putih polos & mengabaikan accent-color di sebagian WebView).
 * Input asli disembunyikan secara visual tapi tetap fokus & bisa dioperasikan
 * keyboard; kotak digambar dengan token tema: tercentang = gradien emas +
 * centang emerald pekat.
 */

export const inputTersembunyiCss = {
  position: 'absolute',
  opacity: 0,
  width: 1,
  height: 1,
  margin: 0,
  pointerEvents: 'none',
};

export const KotakVisual = styled.span`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primaryDeep};
  transition: background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    border-color ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  ${({ cek, theme }) =>
    cek &&
    `
      background: ${theme.gradients.gold};
      border-color: ${theme.colors.gold};
      box-shadow: ${theme.shadows.gold};
    `}
`;

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 44px;
  padding: 7px 0;
  cursor: pointer;
  font-size: 14.5px;
  line-height: 1.5;
  input:focus-visible ~ .kotak-visual {
    outline: 3px solid ${({ theme }) => theme.colors.goldDeep};
    outline-offset: 2px;
  }
`;

export default function KotakCentang({ id, checked, onChange, children, ...rest }) {
  return (
    // className penanda WAJIB: aturan `label {}` generik di wadah formulir
    // (Field dkk.) dikecualikan untuk kelas ini — tanpa penanda, aturan itu
    // menimpa display:flex label ini dan tampilannya rusak (terbukti di Waris).
    <Label htmlFor={id} {...rest} className="noor-kotak-label">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        css={inputTersembunyiCss}
      />
      <KotakVisual className="kotak-visual" cek={checked} aria-hidden="true">
        {checked && <FaCheck />}
      </KotakVisual>
      <span>{children}</span>
    </Label>
  );
}
