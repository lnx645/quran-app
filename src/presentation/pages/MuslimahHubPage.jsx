/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaFemale, FaCalculator, FaShower, FaPrayingHands, FaBookOpen, FaInfoCircle } from 'react-icons/fa';
import { Page, PageHero, Card, MenuCard } from '../components/common.jsx';
import { stagger, reduceMotion } from '../components/motion.js';
import { DISCLAIMER } from '../../data/sources/muslimahData.js';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.gridGap}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  ${stagger(4, 45)}
  ${reduceMotion}
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const DisclaimerBox = styled(Card)`
  display: flex;
  gap: 10px;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
`;

export default function MuslimahHubPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaFemale /> Muslimah
        </h2>
        <p>
          Fikih haid, nifas &amp; istihadah, kalkulator vonis darah, panduan mandi wajib, dan doa
          khusus wanita — semua menurut mazhab Syafi&apos;i.
        </p>
      </PageHero>

      <Grid>
        <MenuCard
          to="/muslimah/kalkulator"
          icon={<FaCalculator />}
          judul="Kalkulator Haid"
          desc="Vonis haid / nifas / istihadah + status ibadah (terkunci PIN)."
        />
        <MenuCard
          to="/muslimah/mandi-wajib"
          icon={<FaShower />}
          judul="Mandi Wajib"
          desc="Niat haid & nifas, rukun (hanya 2), dan sunnah-sunnahnya."
        />
        <MenuCard
          to="/muslimah/doa"
          icon={<FaPrayingHands />}
          judul="Doa Wanita"
          desc="Doa hamil, menyusui, persalinan, keturunan, dan untuk anak."
        />
        <MenuCard
          to="/muslimah/fikih"
          icon={<FaBookOpen />}
          judul="Fikih & Mitos"
          desc="Ringkasan angka fikih + tabel mitos vs hukum sebenarnya."
        />
      </Grid>

      <DisclaimerBox>
        <FaInfoCircle />
        <span>
          <strong>Disclaimer:</strong> {DISCLAIMER} Angka kunci: haid minimal 24 jam, maksimal 15
          hari; suci minimal 15 hari; nifas kebiasaan 40 hari, maksimal 60 hari — menurut mazhab
          Syafi&apos;i.
        </span>
      </DisclaimerBox>
    </Page>
  );
}
