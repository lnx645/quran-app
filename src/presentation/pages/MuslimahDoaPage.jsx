/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaPrayingHands, FaInfoCircle } from 'react-icons/fa';
import { Page, PageHero, Card, GoldCard } from '../components/common.jsx';
import { DOA_WANITA, DISCLAIMER } from '../../data/sources/muslimahData.js';

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 22px;
  line-height: 2;
  direction: rtl;
  text-align: right;
  margin-bottom: 10px;
`;

const Latin = styled.p`
  font-style: italic;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 8px;
`;

const Arti = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
`;

const Sumber = styled.span`
  display: inline-block;
  font-size: 11.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDeep};
  background: ${({ theme }) => theme.colors.goldSoft};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 999px;
  padding: 4px 11px;
  margin-bottom: 10px;
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

export default function MuslimahDoaPage() {
  return (
    <Page>
      <PageHero>
        <h2>
          <FaPrayingHands /> Doa Khusus Wanita
        </h2>
        <p>
          Doa untuk ibu hamil, menyusui, dimudahkan persalinan, memohon keturunan, dan untuk anak —
          Arab, Latin, dan terjemahan Indonesia.
        </p>
      </PageHero>

      {DOA_WANITA.map((d, i) => {
        const Kartu = i % 2 === 0 ? GoldCard : Card;
        return (
          <Kartu key={d.id}>
            <h3 css={{ fontSize: 16, marginBottom: 8 }}>{d.judul}</h3>
            <Sumber>{d.sumber}</Sumber>
            <Arab>{d.arab}</Arab>
            <Latin>{d.latin}</Latin>
            <Arti>&ldquo;{d.arti}&rdquo;</Arti>
          </Kartu>
        );
      })}

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
