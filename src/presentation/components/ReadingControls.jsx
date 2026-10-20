/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaMinus, FaPlus } from 'react-icons/fa';

/**
 * Kontrol baca melayang di atas PlayerBar:
 * - A− / A+ : ukuran font Arab
 * - chip "Latin" & "Arti" : toggle tampil/sembunyi transliterasi & terjemahan
 * Preferensi dikelola useReadingPrefs (localStorage) di SurahPage.
 */

const Bar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(158px + env(safe-area-inset-bottom));
  z-index: 55;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(255, 253, 244, 0.94);
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
  border: 1px solid ${({ theme }) => theme.colors.gold};
  box-shadow: 0 4px 18px rgba(4, 37, 31, 0.22);
  max-width: calc(100vw - 20px);
`;

const TombolFont = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
  &:active {
    transform: scale(0.93);
  }
  &:disabled {
    opacity: 0.35;
  }
`;

const LabelUkuran = styled.span`
  min-width: 34px;
  text-align: center;
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.goldDeep};
`;

const Chip = styled.button`
  height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, aktif }) =>
    aktif ? theme.gradients.gold : theme.colors.surface};
  color: ${({ theme, aktif }) => (aktif ? theme.colors.primaryDeep : theme.colors.muted)};
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.3px;
  white-space: nowrap;
  &:active {
    transform: scale(0.96);
  }
`;

const Pemisah = styled.span`
  width: 1px;
  align-self: stretch;
  margin: 5px 1px;
  background: ${({ theme }) => theme.colors.border};
`;

export default function ReadingControls({ pref, ubah, tambahArab, kurangArab }) {
  return (
    <Bar role="group" aria-label="Kontrol baca">
      <TombolFont onClick={kurangArab} disabled={pref.arabSize <= 26} aria-label="Perkecil huruf Arab">
        <FaMinus />
      </TombolFont>
      <LabelUkuran aria-live="polite">{pref.arabSize}</LabelUkuran>
      <TombolFont onClick={tambahArab} disabled={pref.arabSize >= 46} aria-label="Perbesar huruf Arab">
        <FaPlus />
      </TombolFont>
      <Pemisah />
      <Chip aktif={pref.latin} onClick={() => ubah({ latin: !pref.latin })} aria-pressed={pref.latin}>
        Latin
      </Chip>
      <Chip aktif={pref.terjemah} onClick={() => ubah({ terjemah: !pref.terjemah })} aria-pressed={pref.terjemah}>
        Arti
      </Chip>
    </Bar>
  );
}
