/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaFire, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { useSholatTracker, LIMA_WAKTU } from '../hooks/useSholatTracker.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle,
} from '../components/common.jsx';

const Baris = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 16px;
  margin-bottom: 10px;
  border-radius: 14px;
  border: 1.5px solid
    ${({ theme, selesai }) => (selesai ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, selesai }) =>
    selesai ? theme.colors.goldSoft : theme.colors.surface};
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  transition: background 0.2s ease;
  svg {
    color: ${({ theme, selesai }) => (selesai ? theme.colors.gold : theme.colors.faint)};
    font-size: 20px;
  }
  .kanan {
    margin-left: auto;
    font-size: 12.5px;
    font-weight: 700;
    color: ${({ theme, selesai }) => (selesai ? theme.colors.goldDeep : theme.colors.muted)};
  }
`;

const StreakBox = styled(GoldCard)`
  text-align: center;
  .angka {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 44px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primaryDeep};
  }
`;

export default function SholatTrackerPage() {
  const { hariIni, toggle, selesaiHariIni, streak } = useSholatTracker();

  return (
    <Page>
      <PageTitle>Sholat Tracker</PageTitle>
      <PageSubtitle>
        Checklist sholat wajib hari ini. Ketuk untuk menandai — progres tersimpan di perangkat.
      </PageSubtitle>

      <StreakBox>
        <div css={{ display: 'flex', justifyContent: 'center', gap: 26 }}>
          <div>
            <div className="angka">{streak}</div>
            <div css={(t) => ({ fontSize: 12.5, color: t.colors.muted })}>
              <FaFire /> Hari beruntun lengkap
            </div>
          </div>
          <div>
            <div className="angka">{selesaiHariIni}/5</div>
            <div css={(t) => ({ fontSize: 12.5, color: t.colors.muted })}>Hari ini</div>
          </div>
        </div>
      </StreakBox>

      <SectionTitle>Hari Ini</SectionTitle>
      <Card>
        {LIMA_WAKTU.map((w) => (
          <Baris key={w} selesai={!!hariIni[w]} onClick={() => toggle(w)} aria-pressed={!!hariIni[w]}>
            {hariIni[w] ? <FaCheckCircle /> : <FaRegCircle />}
            Sholat {w}
            <span className="kanan">{hariIni[w] ? 'SUDAH' : 'BELUM'}</span>
          </Baris>
        ))}
        <p css={(t) => ({ fontSize: 13, color: t.colors.muted, marginTop: 6 })}>
          Streak dihitung dari hari-hari dengan kelima sholat wajib tuntas. Terus jaga — Allah
          mencintai amal yang konsisten walau sedikit.
        </p>
      </Card>
    </Page>
  );
}
