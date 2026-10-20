/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaMinus, FaPlus } from 'react-icons/fa';

/**
 * Bar kontrol baca: strip ramping selebar area baca yang MENYATU di tepi
 * bawah, tepat menempel di atas PlayerBar (bukan pil melayang):
 * - A− / A+ : ukuran font Arab
 * - chip "Latin", "Arti" & "Tajwid" : toggle transliterasi, terjemahan,
 *   dan pewarnaan tajwid pada teks Arab
 * Preferensi dikelola useReadingPrefs (localStorage) di SurahPage.
 * Tinggi PlayerBar ≈ 165px + safe-area — bar ini menempel persis di atasnya.
 */

const Bar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(166px + env(safe-area-inset-bottom));
  z-index: 55;
  width: calc(100vw - 28px);
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: min(920px, calc(100vw - 40px));
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 54px;
  padding: 5px 12px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background: ${({ theme }) => theme.colors.barKaca};
  backdrop-filter: blur(8px) saturate(1.15);
  -webkit-backdrop-filter: blur(8px) saturate(1.15);
  border-top: 2px solid ${({ theme }) => theme.colors.gold};
  box-shadow: 0 -3px 10px rgba(4, 37, 31, 0.07);
  > * {
    flex-shrink: 0;
  }
`;

const GrupFont = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Pembatas = styled.span`
  width: 1px;
  height: 28px;
  background: ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const TombolFont = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
  &:active {
    transform: scale(0.93);
  }
  &:disabled {
    opacity: 0.35;
  }
`;

const LabelUkuran = styled.span`
  min-width: 32px;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.goldDeep};
`;

const GrupChip = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Chip = styled.button`
  min-height: 44px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, aktif }) =>
    aktif ? theme.gradients.gold : theme.colors.surface};
  color: ${({ theme, aktif }) => (aktif ? theme.colors.primaryDeep : theme.colors.muted)};
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.3px;
  white-space: nowrap;
  &:active {
    transform: scale(0.96);
  }
`;

export default function ReadingControls({ pref, ubah, tambahArab, kurangArab }) {
  return (
    <Bar role="group" aria-label="Kontrol baca">
      <GrupFont>
        <TombolFont onClick={kurangArab} disabled={pref.arabSize <= 26} aria-label="Perkecil huruf Arab">
          <FaMinus />
        </TombolFont>
        <LabelUkuran aria-live="polite">{pref.arabSize}</LabelUkuran>
        <TombolFont onClick={tambahArab} disabled={pref.arabSize >= 46} aria-label="Perbesar huruf Arab">
          <FaPlus />
        </TombolFont>
      </GrupFont>
      <Pembatas aria-hidden="true" />
      <GrupChip>
        <Chip aktif={pref.latin} onClick={() => ubah({ latin: !pref.latin })} aria-pressed={pref.latin}>
          Latin
        </Chip>
        <Chip aktif={pref.terjemah} onClick={() => ubah({ terjemah: !pref.terjemah })} aria-pressed={pref.terjemah}>
          Arti
        </Chip>
        <Chip aktif={pref.tajwid} onClick={() => ubah({ tajwid: !pref.tajwid })} aria-pressed={pref.tajwid} aria-label="Warnai huruf sesuai aturan tajwid">
          Tajwid
        </Chip>
        <Chip aktif={pref.perKata} onClick={() => ubah({ perKata: !pref.perKata })} aria-pressed={pref.perKata} aria-label="Tampilkan terjemahan per kata (Bahasa Inggris)">
          Per Kata
        </Chip>
      </GrupChip>
    </Bar>
  );
}
