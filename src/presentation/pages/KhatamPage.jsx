/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaBookReader, FaCalendarAlt, FaRedoAlt, FaTrophy, FaCheckCircle } from 'react-icons/fa';
import { useKhatam } from '../hooks/useKhatam.js';
import { halamanJuz, TOTAL_HALAMAN } from '../../data/sources/khatamData.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle, Field, TextInput,
  ResultRow, GhostButton,
} from '../components/common.jsx';
import OrnamentDivider from '../components/OrnamentDivider.jsx';

const Bar = styled.div`
  height: 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  overflow: hidden;
  margin: 12px 0 4px;
`;
const Isi = styled.div`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.gold});
  width: ${({ persen }) => persen}%;
  transition: width 0.5s ease;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 10px;
`;

const JuzBtn = styled.button`
  position: relative;
  border-radius: 14px;
  padding: 10px 4px 8px;
  border: 1.5px solid
    ${({ theme, selesai }) => (selesai ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, selesai }) =>
    selesai ? theme.colors.goldSoft : theme.colors.surface};
  transition: transform 0.12s ease, border-color 0.15s ease;
  &:active {
    transform: scale(0.95);
  }
  .n {
    font-weight: 700;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.primaryDeep};
  }
  .hal {
    font-size: 10.5px;
    color: ${({ theme }) => theme.colors.muted};
  }
  .cek {
    position: absolute;
    top: -7px;
    right: -5px;
    color: ${({ theme }) => theme.colors.gold};
    background: #fff;
    border-radius: 50%;
    font-size: 17px;
    display: ${({ selesai }) => (selesai ? 'block' : 'none')};
  }
`;

const Stat = styled.div`
  text-align: center;
  .angka {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 40px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primaryDeep};
  }
  .label {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
    letter-spacing: 0.5px;
  }
`;

export default function KhatamPage() {
  const { progres, toggleJuz, setTarget, reset, ringkasan } = useKhatam();

  const maxTarget = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 3);
    return d.toISOString().slice(0, 10);
  })();

  return (
    <Page>
      <PageTitle>
        <FaBookReader /> Khatam Tracker
      </PageTitle>
      <PageSubtitle>
        Tandai juz yang sudah dibaca — progres tersimpan otomatis di perangkat ini. Mushaf
        Madinah: {TOTAL_HALAMAN} halaman.
      </PageSubtitle>

      <GoldCard>
        <div css={{ display: 'flex', gap: 12 }}>
          <Stat css={{ flex: 1 }}>
            <div className="angka">{ringkasan.persen}%</div>
            <div className="label">SELESAI</div>
          </Stat>
          <Stat css={{ flex: 1 }}>
            <div className="angka">{ringkasan.juzSelesai}/30</div>
            <div className="label">JUZ SELESAI</div>
          </Stat>
          <Stat css={{ flex: 1 }}>
            <div className="angka">{ringkasan.halaman}</div>
            <div className="label">HALAMAN</div>
          </Stat>
        </div>
        <Bar>
          <Isi persen={ringkasan.persen} />
        </Bar>
        <div css={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6B7A72' }}>
          <span>{ringkasan.halaman} dari {TOTAL_HALAMAN} halaman</span>
          <span>{TOTAL_HALAMAN - ringkasan.halaman} tersisa</span>
        </div>
      </GoldCard>

      <Card>
        <Field>
          <label htmlFor="target">
            <FaCalendarAlt css={{ marginRight: 6 }} /> Target Khatam (opsional)
          </label>
          <TextInput
            id="target"
            type="date"
            value={progres.targetTanggal ?? ''}
            max={maxTarget}
            onChange={(e) => setTarget(e.target.value)}
          />
        </Field>
        {ringkasan.kebutuhan && ringkasan.kebutuhan.sisaHalaman > 0 && (
          <>
            <ResultRow>
              <span className="label">Hari tersisa (dari hari ini)</span>
              <span className="value">{ringkasan.kebutuhan.hariTersisa} hari</span>
            </ResultRow>
            <ResultRow>
              <span className="label">
                <FaTrophy css={{ marginRight: 6 }} /> Perlu dibaca per hari
              </span>
              <span className="value">{ringkasan.kebutuhan.halamanPerHari} halaman</span>
            </ResultRow>
          </>
        )}
        {ringkasan.kebutuhan && ringkasan.kebutuhan.sisaHalaman === 0 && (
          <p css={{ textAlign: 'center', fontWeight: 700, padding: '8px 0' }}>
            Barakallah! Khatam 30 juz selesai.
          </p>
        )}
      </Card>

      <SectionTitle>Checklist 30 Juz — ketuk untuk menandai</SectionTitle>
      <Grid>
        {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
          const hal = halamanJuz(juz);
          return (
            <JuzBtn
              key={juz}
              selesai={!!progres.selesai[juz]}
              onClick={() => toggleJuz(juz)}
              aria-pressed={!!progres.selesai[juz]}
            >
              <span className="cek"><FaCheckCircle /></span>
              <div className="n">Juz {juz}</div>
              <div className="hal">hlm. {hal.awal}–{hal.akhir}</div>
            </JuzBtn>
          );
        })}
      </Grid>

      <OrnamentDivider />
      <div css={{ display: 'flex', justifyContent: 'center' }}>
        <GhostButton
          onClick={() => {
            if (window.confirm('Hapus semua progres khatam?')) reset();
          }}
        >
          <FaRedoAlt /> Ulangi dari Awal
        </GhostButton>
      </div>
    </Page>
  );
}
