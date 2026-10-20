/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa';
import { GoldCard, Card } from './common.jsx';
import { useTerakhirDibaca } from '../hooks/useTerakhirDibaca.js';

const Baris = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IkonBuku = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: ${({ theme }) => theme.gradients.header};
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 20px;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(231, 198, 90, 0.45);
`;

const Teks = styled.div`
  flex: 1;
  min-width: 0;
  .label {
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
  .judul {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 17px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    margin-top: 2px;
  }
  .meta {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
`;

const TombolLanjut = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 12px 20px;
  border-radius: 14px;
  background: ${({ theme }) => theme.gradients.gold};
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-size: 15px;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  flex-shrink: 0;
  &:active {
    transform: scale(0.97);
  }
`;

/**
 * LanjutkanMembaca — kartu "Terakhir Dibaca" untuk beranda.
 * Bila belum ada riwayat → kartu ajakan mulai membaca ke /quran.
 */
export default function LanjutkanMembaca() {
  const { terakhir } = useTerakhirDibaca();

  if (!terakhir) {
    return (
      <Card>
        <Baris>
          <IkonBuku aria-hidden="true">
            <FaBookOpen />
          </IkonBuku>
          <Teks>
            <div className="judul">Mulai Membaca Al-Qur&apos;an</div>
            <div className="meta">114 surah menanti — mulai dari Al-Fatihah atau surah favoritmu.</div>
          </Teks>
          <TombolLanjut to="/quran" aria-label="Mulai membaca Al-Qur'an">
            Mulai <FaArrowRight />
          </TombolLanjut>
        </Baris>
      </Card>
    );
  }

  return (
    <GoldCard>
      <Baris>
        <IkonBuku aria-hidden="true">
          <FaBookOpen />
        </IkonBuku>
        <Teks>
          <div className="label">Terakhir Dibaca</div>
          <div className="judul">{terakhir.namaSurah}</div>
          <div className="meta">Ayat {terakhir.nomorAyat}</div>
        </Teks>
        <TombolLanjut
          to={`/surah/${terakhir.surahId}?ayat=${terakhir.nomorAyat}`}
          aria-label={`Lanjutkan membaca ${terakhir.namaSurah} ayat ${terakhir.nomorAyat}`}
        >
          Lanjutkan <FaArrowRight />
        </TombolLanjut>
      </Baris>
    </GoldCard>
  );
}
