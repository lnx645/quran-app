/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {
  FaHeart, FaMonument, FaPrayingHands, FaBookOpen, FaInfoCircle,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle,
} from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import {
  ZIARAH, DISCLAIMER_ZIARAH, CATATAN_SETEMPAT,
} from '../../data/sources/ziarahData.js';

const Paragraf = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
  margin-bottom: 8px;
`;

const Dalil = styled.p`
  font-size: 13.5px;
  line-height: 1.7;
  font-style: italic;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 6px;
`;

const Sumber = styled.p`
  font-size: ${({ theme }) => theme.type.caption.size}px;
  line-height: ${({ theme }) => theme.type.caption.lineHeight};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDeep};
`;

const BarisAdab = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:first-of-type { padding-top: 2px; }
  &:last-child { border-bottom: none; padding-bottom: 2px; }
  > div { flex: 1; min-width: 0; }
  .judul {
    font-size: ${({ theme }) => theme.type.body.size}px;
    font-weight: 700;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.judul};
    margin-bottom: 3px;
  }
  .isi {
    font-size: 13.5px;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.muted};
    overflow-wrap: break-word;
  }
`;

const JudulDoa = styled.h3`
  font-size: ${({ theme }) => theme.type.h3.size}px;
  line-height: ${({ theme }) => theme.type.h3.lineHeight};
  font-weight: ${({ theme }) => theme.type.h3.weight};
  color: ${({ theme }) => theme.colors.judul};
  margin-bottom: 4px;
`;

const Keterangan = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 8px;
`;

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 26px;
  line-height: 2;
  direction: rtl;
  text-align: right;
  color: ${({ theme }) => theme.colors.teksArab};
  margin: 6px 0 10px;
`;

const Latin = styled.p`
  font-style: italic;
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.teksLatin};
  margin-bottom: 8px;
`;

const Arti = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.teksTerjemah};
  margin-bottom: 8px;
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg { flex-shrink: 0; margin-top: 3px; }
`;

const BarisBacaan = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:first-of-type { padding-top: 2px; }
  &:last-child { border-bottom: none; padding-bottom: 2px; }
  > div { flex: 1; min-width: 0; }
  .nama {
    font-size: 14.5px;
    font-weight: 700;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.judul};
  }
  .ket {
    font-size: 12.5px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const IKON_FASE = {
  sebelum: <FaHeart aria-hidden="true" />,
  selama: <FaMonument aria-hidden="true" />,
  sesudah: <FaPrayingHands aria-hidden="true" />,
};

export default function ZiarahPage() {
  return (
    <Page>
      <PageHero>
        <h2><FaMonument /> Ziarah Kubur</h2>
        <p>
          Adab berziarah dan doa untuk ahli kubur: mengingat kematian,
          melembutkan hati, dan mendoakan yang telah wafat.
        </p>
      </PageHero>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_ZIARAH}</span>
        </Catatan>
      </Card>

      <SectionTitle><FaHeart /> {ZIARAH.pengantar.judul}</SectionTitle>
      <Card>
        <Paragraf>{ZIARAH.pengantar.isi}</Paragraf>
        <Dalil>{ZIARAH.pengantar.dalil}</Dalil>
        <Sumber>{ZIARAH.pengantar.sumberDalil}</Sumber>
      </Card>

      {ZIARAH.fase.map((fase) => (
        <div key={fase.id}>
          <SectionTitle>
            {IKON_FASE[fase.id]} {fase.judul}
          </SectionTitle>
          <Card>
            {fase.daftar.map((adab, i) => (
              <BarisAdab key={adab.judul}>
                <NomorMedali nomor={i + 1} ukuran={38} />
                <div>
                  <div className="judul">{adab.judul}</div>
                  <div className="isi">{adab.isi}</div>
                  {adab.sumber && <Sumber css={{ marginTop: 4 }}>{adab.sumber}</Sumber>}
                </div>
              </BarisAdab>
            ))}
          </Card>
        </div>
      ))}

      <SectionTitle><FaPrayingHands /> Doa Ziarah Kubur</SectionTitle>
      {ZIARAH.doa.map((doa) => (
        <Card key={doa.judul}>
          <JudulDoa>{doa.judul}</JudulDoa>
          {doa.keterangan && <Keterangan>{doa.keterangan}</Keterangan>}
          <Arab lang="ar">{doa.arab}</Arab>
          <Latin>{doa.latin}</Latin>
          <Arti>&ldquo;{doa.arti}&rdquo;</Arti>
          <Sumber>{doa.sumber}</Sumber>
          {doa.catatanPerempuan && (
            <Catatan css={{ marginTop: 10 }}>
              <FaInfoCircle /> <span><strong>Bila mayit perempuan: </strong>{doa.catatanPerempuan}</span>
            </Catatan>
          )}
        </Card>
      ))}

      <SectionTitle><FaBookOpen /> {ZIARAH.bacaan.judul}</SectionTitle>
      <Card>
        <Paragraf>{ZIARAH.bacaan.isi}</Paragraf>
        {ZIARAH.bacaan.daftar.map((bacaan, i) => (
          <BarisBacaan key={bacaan.nama}>
            <NomorMedali nomor={i + 1} ukuran={38} />
            <div>
              <div className="nama">{bacaan.nama}</div>
              <div className="ket">{bacaan.keterangan}</div>
            </div>
          </BarisBacaan>
        ))}
        <Catatan css={{ marginTop: 10 }}>
          <FaInfoCircle /> <span>{ZIARAH.bacaan.catatan}</span>
        </Catatan>
      </Card>

      <GoldCard>
        <Catatan>
          <FaInfoCircle /> <span>{CATATAN_SETEMPAT}</span>
        </Catatan>
      </GoldCard>

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER_ZIARAH}</span>
        </Catatan>
      </Card>
    </Page>
  );
}
