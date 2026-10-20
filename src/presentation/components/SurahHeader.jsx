/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { RubElHizb, GirihPaper } from './ornaments/index.js';
import { mountUp, reduceMotion } from './motion.js';

/**
 * Panel nama surah yang MENYATU dengan kertas mushaf (tanpa kotak sendiri):
 * panel tidak dibingkai lagi — bingkai halaman mushaf sudah membingkainya.
 * Isinya: pita pola girih di atas & bawah, medali Rub el Hizb di tengah,
 * nama surah besar (Amiri) + meta kecil huruf kapital berjarak.
 * Basmalah berdiri sebagai blok terpisah DI BAWAH panel (elegan,
 * diapit garis emas berlian) — tidak menempel ke ayat pertama.
 */

const Panel = styled.section`
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 8px 2px 2px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  ${mountUp}
  ${reduceMotion}
`;

const IsiPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; /* ritme konsisten: medali → nama → meta */
  padding: 13px 6px 11px;
`;

const NamaArab = styled.div`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 44px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.judul};
  text-shadow: 0 1px 0 rgba(201, 162, 39, 0.25);
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 50px;
  }
`;

const NamaLatin = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  width: 100%;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  .item {
    white-space: nowrap;
  }
`;

const BerlianKecil = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.gold};
  transform: rotate(45deg);
  flex-shrink: 0;
`;

const BlokBasmalah = styled.div`
  text-align: center;
  margin: 10px 0 12px;
  ${mountUp}
  ${reduceMotion}
  .basmalah-teks {
    font-family: ${({ theme }) => theme.fonts.arabic};
    /* clamp: mengecil halus di HP sempit agar basmalah utuh SATU baris */
    font-size: clamp(20px, 6.9vw, 30px);
    line-height: 1.9;
    color: ${({ theme }) => theme.colors.teksArab};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .teks {
    white-space: nowrap;
  }
  .garis {
    flex: 1 1 0;
    max-width: 76px;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.gold});
  }
  .garis.kanan {
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.gold}, transparent);
  }
`;

export default function SurahHeader({ surah }) {
  const tempat = surah.revelationPlace === 'makkah' ? 'Makkiyah' : 'Madaniyah';
  return (
    <>
      <Panel>
        <div css={{ position: 'relative', height: 24, overflow: 'hidden' }} aria-hidden="true">
          <GirihPaper opacity={0.16} tile={120} />
        </div>
        <IsiPanel>
          <div css={{ display: 'flex', justifyContent: 'center' }} aria-hidden="true">
            <RubElHizb size={52} />
          </div>
          <NamaArab dir="rtl" lang="ar">
            {surah.nameArabic}
          </NamaArab>
          <NamaLatin>
            Surah {surah.nameLatin} — {surah.translationId}
          </NamaLatin>
          <Meta>
            <span className="item">{tempat}</span>
            <BerlianKecil />
            <span className="item">{surah.versesCount} Ayat</span>
            <BerlianKecil />
            <span className="item">Surah ke-{surah.id}</span>
          </Meta>
        </IsiPanel>
        <div css={{ position: 'relative', height: 24, overflow: 'hidden' }} aria-hidden="true">
          <GirihPaper opacity={0.16} tile={120} />
        </div>
      </Panel>

      {surah.bismillahPre && surah.id !== 9 && (
        <BlokBasmalah>
          <div className="basmalah-teks" dir="rtl" lang="ar">
            <span className="garis kanan" aria-hidden="true" />
            <span className="teks">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className="garis" aria-hidden="true" />
          </div>
        </BlokBasmalah>
      )}
    </>
  );
}
