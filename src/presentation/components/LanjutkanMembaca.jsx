/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa';
import { GoldCard, Card } from './common.jsx';
import { useTerakhirDibaca } from '../hooks/useTerakhirDibaca.js';

// Layout BERTUMPUK (bukan satu baris sempit): kepala = chip ikon + judul
// satu baris; deskripsi full-width di bawahnya; tombol CTA di baris bawah
// rata kanan. Mengikuti pola kartu Hadits/Ayat Hari Ini di beranda.
const Susunan = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Kepala = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
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

const TeksKepala = styled.div`
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
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Deskripsi = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
`;

const BarisTombol = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TombolLanjut = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 10px 18px;
  border-radius: 14px;
  background: ${({ theme }) => theme.gradients.gold};
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-size: 15px;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.shadows.gold};
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
        <Susunan>
          <Kepala>
            <IkonBuku aria-hidden="true">
              <FaBookOpen />
            </IkonBuku>
            <TeksKepala>
              <div className="judul">Mulai Membaca Al-Qur&apos;an</div>
            </TeksKepala>
          </Kepala>
          <Deskripsi>
            114 surah menanti — mulai dari Al-Fatihah atau surah favoritmu.
          </Deskripsi>
          <BarisTombol>
            <TombolLanjut to="/quran" aria-label="Mulai membaca Al-Qur'an">
              Mulai <FaArrowRight aria-hidden="true" />
            </TombolLanjut>
          </BarisTombol>
        </Susunan>
      </Card>
    );
  }

  return (
    <GoldCard>
      <Susunan>
        <Kepala>
          <IkonBuku aria-hidden="true">
            <FaBookOpen />
          </IkonBuku>
          <TeksKepala>
            <div className="label">Terakhir Dibaca</div>
            <div className="judul">{terakhir.namaSurah}</div>
          </TeksKepala>
        </Kepala>
        <Deskripsi>
          Kamu terakhir membaca sampai ayat {terakhir.nomorAyat}. Lanjutkan dari sana?
        </Deskripsi>
        <BarisTombol>
          <TombolLanjut
            to={`/surah/${terakhir.surahId}?ayat=${terakhir.nomorAyat}`}
            aria-label={`Lanjutkan membaca ${terakhir.namaSurah} ayat ${terakhir.nomorAyat}`}
          >
            Lanjutkan <FaArrowRight aria-hidden="true" />
          </TombolLanjut>
        </BarisTombol>
      </Susunan>
    </GoldCard>
  );
}
