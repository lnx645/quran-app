/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { FaSun, FaMoon, FaPlusCircle, FaRedoAlt } from 'react-icons/fa';
import { DZIKIR_PAGI, DZIKIR_PETANG } from '../../data/sources/dzikirData.js';
import {
  Page, PageTitle, PageSubtitle, Card, GhostButton,
} from '../components/common.jsx';
import OrnamentDivider from '../components/OrnamentDivider.jsx';

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 14px;
  border: 1.5px solid ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, aktif }) => (aktif ? theme.colors.goldSoft : theme.colors.surface)};
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const KartuDzikir = styled(Card)`
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 28px;
    line-height: 2;
    text-align: right;
    direction: rtl;
  }
  .latin {
    font-style: italic;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 8px;
  }
  .arti {
    font-size: 14.5px;
    margin-top: 4px;
  }
`;

const BarisHitung = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
`;

const TombolTap = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme, selesai }) =>
    selesai ? theme.colors.primary : theme.colors.primarySoft};
  color: ${({ theme, selesai }) => (selesai ? '#fff' : theme.colors.primaryDeep)};
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 700;
  font-size: 15px;
  transition: background 0.2s ease;
`;

export default function DzikirPage() {
  const [mode, setMode] = useState('pagi'); // pagi | petang
  const [hitung, setHitung] = useState({});
  const daftar = mode === 'pagi' ? DZIKIR_PAGI : DZIKIR_PETANG;

  const tap = (idx) =>
    setHitung((lama) => ({ ...lama, [idx]: (lama[idx] ?? 0) + 1 }));

  const resetMode = () => setHitung({});

  const selesaiSemua = useMemo(
    () => daftar.every((d, i) => (hitung[i] ?? 0) >= d.hitung),
    [daftar, hitung]
  );

  return (
    <Page>
      <PageTitle>Dzikir {mode === 'pagi' ? 'Pagi' : 'Petang'}</PageTitle>
      <PageSubtitle>
        Ringkasan Al-Ma&apos;tsurat. Ketuk tombol di tiap dzikir sesuai jumlah anjuran.
      </PageSubtitle>
      <Tabs>
        <Tab aktif={mode === 'pagi'} onClick={() => setMode('pagi')}>
          <FaSun /> Pagi
        </Tab>
        <Tab aktif={mode === 'petang'} onClick={() => setMode('petang')}>
          <FaMoon /> Petang
        </Tab>
      </Tabs>

      {selesaiSemua && (
        <Card css={{ textAlign: 'center', fontWeight: 700 }}>
          Barakallah, dzikir {mode} selesai!
        </Card>
      )}

      {daftar.map((d, i) => {
        const n = hitung[i] ?? 0;
        const selesai = n >= d.hitung;
        return (
          <KartuDzikir key={i} css={{ borderColor: selesai ? '#C9A227' : undefined }}>
            <p className="arab" lang="ar">{d.arab}</p>
            <p className="latin">{d.latin}</p>
            <p className="arti">{d.arti}</p>
            <BarisHitung>
              <span css={{ fontSize: 13.5, color: '#64748B' }}>
                {n} / {d.hitung} kali
              </span>
              <TombolTap selesai={selesai} onClick={() => tap(i)}>
                <FaPlusCircle /> {selesai ? 'Lagi' : 'Hitung'}
              </TombolTap>
            </BarisHitung>
          </KartuDzikir>
        );
      })}

      <OrnamentDivider />
      <div css={{ display: 'flex', justifyContent: 'center' }}>
        <GhostButton onClick={resetMode}>
          <FaRedoAlt /> Reset {mode === 'pagi' ? 'Pagi' : 'Petang'}
        </GhostButton>
      </div>
    </Page>
  );
}
