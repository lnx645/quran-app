/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaHands, FaPlusCircle, FaRedoAlt, FaInfoCircle, FaHandPointRight } from 'react-icons/fa';
import {
  Page, PageTitle, PageSubtitle, Card, GhostButton,
} from '../components/common.jsx';
import { WIRID_BADA_SHOLAT, DISCLAIMER_PANDUAN } from '../../data/sources/dzikirBadaSholatData.js';

const KartuWirid = styled(Card)`
  .nama {
    font-size: 15px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 6px;
  }
  .arab {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 26px;
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
  .penutup {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
  }
  .penutup .label {
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.goldDeep};
    margin-bottom: 6px;
  }
`;

const BarisHitung = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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
  color: ${({ theme, selesai }) =>
    selesai ? (theme.mode === 'gelap' ? theme.colors.primaryDeep : '#fff') : theme.colors.judul};
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  min-height: 44px;
  font-weight: 700;
  font-size: 15px;
  transition: background 0.2s ease;
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

const TombolTasbih = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  padding: 14px 20px;
  border-radius: 14px;
  background: ${({ theme }) => theme.gradients.gold};
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-size: 15.5px;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  &:active {
    transform: scale(0.97);
  }
`;

export default function DzikirBadaSholatPage() {
  const [hitung, setHitung] = useState({});

  const tap = (idx) => setHitung((lama) => ({ ...lama, [idx]: (lama[idx] ?? 0) + 1 }));
  const resetItem = (idx) => setHitung((lama) => ({ ...lama, [idx]: 0 }));
  const resetSemua = () => setHitung({});

  const selesaiSemua = useMemo(
    () => WIRID_BADA_SHOLAT.every((d, i) => (hitung[i] ?? 0) >= d.hitung),
    [hitung]
  );

  return (
    <Page>
      <PageTitle>
        <FaHands /> Dzikir Ba&apos;da Sholat
      </PageTitle>
      <PageSubtitle>
        Wirid yang lazim dibaca setelah salam sholat fardhu. Ketuk tombol di tiap item untuk
        menghitung — tiap item punya target dan tombol reset sendiri.
      </PageSubtitle>

      {selesaiSemua && (
        <Card css={{ textAlign: 'center', fontWeight: 700 }}>
          Barakallah, wirid ba&apos;da sholat selesai!
        </Card>
      )}

      {WIRID_BADA_SHOLAT.map((d, i) => {
        const n = hitung[i] ?? 0;
        const selesai = n >= d.hitung;
        return (
          <KartuWirid
            key={i}
            css={(t) => ({ borderColor: selesai ? t.colors.gold : undefined })}
          >
            <p className="nama">
              {i + 1}. {d.nama}
            </p>
            <p className="arab" lang="ar">{d.arab}</p>
            <p className="latin">{d.latin}</p>
            <p className="arti">{d.arti}</p>
            {d.penutup && (
              <div className="penutup">
                <p className="label">Penutup (setelah 3&times;33)</p>
                <p className="arab" lang="ar">{d.penutup.arab}</p>
                <p className="latin">{d.penutup.latin}</p>
                <p className="arti">{d.penutup.arti}</p>
              </div>
            )}
            <BarisHitung>
              <span css={(t) => ({ fontSize: 13.5, color: t.colors.muted })}>
                {n} / {d.hitung} kali
              </span>
              <div css={{ display: 'flex', gap: 8 }}>
                <GhostButton
                  onClick={() => resetItem(i)}
                  aria-label={`Reset hitungan ${d.nama}`}
                  css={{ minHeight: 44, padding: '8px 12px', fontSize: 13 }}
                >
                  <FaRedoAlt />
                </GhostButton>
                <TombolTap selesai={selesai} onClick={() => tap(i)}>
                  <FaPlusCircle /> {selesai ? 'Lagi' : 'Hitung'}
                </TombolTap>
              </div>
            </BarisHitung>
          </KartuWirid>
        );
      })}

      <div css={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <TombolTasbih to="/tasbih">
          <FaHandPointRight /> Buka Tasbih Digital
        </TombolTasbih>
        <GhostButton onClick={resetSemua}>
          <FaRedoAlt /> Reset Semua
        </GhostButton>
      </div>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_PANDUAN}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
