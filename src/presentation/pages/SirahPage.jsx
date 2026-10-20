/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaHistory, FaBookOpen } from 'react-icons/fa';
import { FASE_SIRAH, SIRAH_PERISTIWA } from '../../data/sources/sirahData.js';
import { Page, PageHero, Card, SectionTitle } from '../components/common.jsx';

// Garis waktu vertikal: rel di kiri dengan garis emas pudar, titik emas
// per peristiwa, dan kartu berisi tahun, judul, dan ringkasan.
const Rel = styled.div`
  position: relative;
  margin-left: 10px;
  padding-left: 26px;
  &::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

const Item = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: -27px;
    top: 22px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradients.gold};
    box-shadow: ${({ theme }) => theme.shadows.gold};
    border: 2px solid ${({ theme }) => theme.colors.bg};
    z-index: 1;
  }
`;

const KartuPeristiwa = styled(Card)`
  .kepala {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .tahun {
    font-size: ${({ theme }) => theme.type.caption.size}px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.goldDeep};
    letter-spacing: 0.2px;
  }
  .judul {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 17px;
    color: ${({ theme }) => theme.colors.judul};
    margin-bottom: 4px;
  }
  .ringkasan {
    font-size: 14.5px;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const LencanaFase = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radii.pill}px;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.type.overline.size}px;
  font-weight: ${({ theme }) => theme.type.overline.weight};
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

export default function SirahPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaHistory /> Sirah Nabawiyah
        </h2>
        <p>
          Garis waktu ringkas perjalanan hidup Nabi Muhammad ﷺ — dari kelahiran
          di Makkah hingga wafat di Madinah, dalam {FASE_SIRAH.length} fase dan{' '}
          {SIRAH_PERISTIWA.length} peristiwa.
        </p>
      </PageHero>

      <p
        css={(t) => ({
          display: 'flex',
          gap: 8,
          alignItems: 'flex-start',
          fontSize: 13.5,
          lineHeight: 1.6,
          color: t.colors.muted,
          marginBottom: 6,
        })}
      >
        <FaBookOpen aria-hidden="true" css={(t) => ({ color: t.colors.goldDeep, marginTop: 3, flexShrink: 0 })} />
        <span>
          <strong>Ringkasan edukasi:</strong> teks di halaman ini adalah ringkasan
          orisinal untuk pembelajaran, disusun dari peristiwa-peristiwa yang
          disepakati secara umum dalam kitab sirah. Tahun Hijriah/Masehi bersifat
          perkiraan yang masyhur.
        </span>
      </p>

      {FASE_SIRAH.map((fase) => {
        const daftar = SIRAH_PERISTIWA.filter((p) => p.fase === fase);
        return (
          <section key={fase}>
            <SectionTitle>
              <FaHistory /> Fase {fase}
            </SectionTitle>
            <Rel>
              {daftar.map((p) => (
                <Item key={p.judul}>
                  <KartuPeristiwa>
                    <div className="kepala">
                      <LencanaFase>{p.fase}</LencanaFase>
                      <span className="tahun">{p.tahun}</span>
                    </div>
                    <div className="judul">{p.judul}</div>
                    <p className="ringkasan">{p.ringkasan}</p>
                  </KartuPeristiwa>
                </Item>
              ))}
            </Rel>
          </section>
        );
      })}
    </Page>
  );
}
