/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { FaHandPointer, FaRedoAlt, FaCog } from 'react-icons/fa';
import { Page, PageHero, Card, SectionTitle, GhostButton } from '../components/common.jsx';

const DZIKIR_OPSI = [
  { arab: 'سُبْحَانَ اللَّهِ', latin: 'Subhanallah', arti: 'Maha Suci Allah' },
  { arab: 'الْحَمْدُ لِلَّهِ', latin: 'Alhamdulillah', arti: 'Segala puji bagi Allah' },
  { arab: 'اللَّهُ أَكْبَرُ', latin: 'Allahu Akbar', arti: 'Allah Maha Besar' },
  { arab: 'لَا إِلَٰهَ إِلَّا اللَّهُ', latin: 'La ilaha illallah', arti: 'Tiada sesembahan yang berhak disembah selain Allah' },
];

const TARGET_OPSI = [33, 100];

const CounterCard = styled(Card)`
  text-align: center;
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  padding: 26px 18px;
`;

const ArabBesar = styled.div`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 38px;
  color: ${({ theme }) => theme.colors.primaryDeep};
  line-height: 1.6;
`;

const Angka = styled.div`
  font-size: 76px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.primaryDeep};
  line-height: 1.1;
`;

const TombolHitung = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lift};
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.93);
  }
`;

const Opsi = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1.5px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, aktif }) =>
    aktif ? theme.colors.primarySoft : theme.colors.surface};
  margin-bottom: 8px;
  .ar {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primaryDeep};
  }
  .lat {
    font-size: 14px;
    font-weight: 600;
  }
  .arti {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const TargetBtn = styled.button`
  padding: 9px 20px;
  border-radius: 999px;
  border: 1.5px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, aktif }) =>
    aktif ? theme.colors.goldSoft : theme.colors.surface};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDeep};
`;

const getar = () => {
  try {
    if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
  } catch {
    /* tidak didukung */
  }
};

export default function TasbihPage() {
  const [dzikir, setDzikir] = useState(DZIKIR_OPSI[0]);
  const [hitung, setHitung] = useState(0);
  const [target, setTarget] = useState(33);

  const tap = () => {
    const baru = hitung + 1;
    setHitung(baru);
    if (baru % target === 0 && target > 0) getar();
  };

  const reset = () => setHitung(0);
  const persen = target > 0 ? Math.min(100, (hitung / target) * 100) : 0;

  return (
    <Page>
      <PageHero>
        <h2>
          <FaHandPointer /> Tasbih Digital
        </h2>
        <p>Ketuk tombol bulat untuk menghitung. Getar tanda target tercapai.</p>
      </PageHero>

      <SectionTitle>Dzikir</SectionTitle>
      {DZIKIR_OPSI.map((d) => (
        <Opsi key={d.latin} aktif={dzikir.latin === d.latin} onClick={() => { setDzikir(d); reset(); }}>
          <span className="ar">{d.arab}</span>
          <span>
            <div className="lat">{d.latin}</div>
            <div className="arti">{d.arti}</div>
          </span>
        </Opsi>
      ))}

      <CounterCard css={{ marginTop: 16 }}>
        <ArabBesar dir="rtl">{dzikir.arab}</ArabBesar>
        <Angka>{hitung}</Angka>
        <div css={{ fontSize: 12.5, color: '#6B7A72', marginBottom: 12 }}>
          {persen.toFixed(0)}% dari target {target}
        </div>
        <div>
          <TombolHitung onClick={tap} aria-label="Hitung dzikir">
            <FaHandPointer />
          </TombolHitung>
        </div>
        <div css={{ marginTop: 14 }}>
          <GhostButton onClick={reset}>
            <FaRedoAlt /> Reset
          </GhostButton>
        </div>
      </CounterCard>

      <Card>
        <SectionTitle css={{ marginTop: 0 }}>
          <FaCog /> Target hitungan
        </SectionTitle>
        <div css={{ display: 'flex', gap: 8 }}>
          {TARGET_OPSI.map((t) => (
            <TargetBtn key={t} aktif={target === t} onClick={() => setTarget(t)}>
              {t}
            </TargetBtn>
          ))}
        </div>
      </Card>
    </Page>
  );
}
