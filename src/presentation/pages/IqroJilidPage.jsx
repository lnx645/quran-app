/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  FaArrowLeft, FaCheckCircle, FaBookOpen, FaChevronLeft, FaChevronRight,
  FaClipboardCheck, FaEye, FaEyeSlash, FaInfoCircle,
} from 'react-icons/fa';
import { IqroRepositoryImpl } from '../../data/repositories/IqroRepositoryImpl.js';
import {
  Page, PageTitle, PageSubtitle, Card, GoldCard, SectionTitle, ErrorBox,
  LoadingBox, Spinner, GhostButton, PrimaryButton,
} from '../components/common.jsx';
import { stagger, reduceMotion } from '../components/motion.js';

const GridHuruf = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm}px;
  ${stagger(12, 22)}
  ${reduceMotion}
`;

const SelHuruf = styled.button`
  background: ${({ theme, aktif }) =>
    aktif ? theme.colors.primarySoft : theme.colors.surface};
  border: 1.5px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.primary : theme.colors.border)};
  border-radius: 14px;
  padding: 10px 4px 8px;
  text-align: center;
  box-shadow: ${({ theme, aktif }) => (aktif ? theme.shadows.card : 'none')};
  transition: border-color ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    background ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease},
    box-shadow ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
  &:active {
    transform: scale(0.95);
  }
  .ar {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 32px;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.judul};
  }
  .lat {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 600;
  }
`;

const PanelBesar = styled(Card)`
  text-align: center;
  border-color: ${({ theme }) => theme.colors.gold};
`;

const TigaBentuk = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Bentuk = styled.div`
  min-width: 92px;
  padding: 14px 10px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  .ar {
    font-family: ${({ theme }) => theme.fonts.arabic};
    font-size: 52px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.judul};
  }
  .lbl {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 600;
  }
`;

const BarisBaca = styled.div`
  display: flex;
  direction: rtl;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 6px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 34px;
  color: ${({ theme }) => theme.colors.text};
  &:last-child {
    border-bottom: none;
  }
`;

const Topik = styled.li`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 8px 0;
  font-size: 15px;
  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 4px;
    flex-shrink: 0;
  }
`;

/* ---- Latihan per halaman (tambahan W1) ---- */

const LencanaTopik = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.judul};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`;

const Petunjuk = styled.p`
  display: flex;
  gap: 8px;
  font-size: 13.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 14px;
  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
`;

const BarisLatihan = styled.div`
  direction: rtl;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 38px;
  line-height: 2.1;
  color: ${({ theme }) => theme.colors.judul};
  padding: 6px 4px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 44px;
  }
`;

const NavLatihan = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 16px;
`;

const IndikatorHalaman = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  .nomor {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 15px;
  }
`;

const Titik = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
  margin-top: 12px;
`;

const Bulat = styled.button`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  transition: background 0.15s ease, transform 0.15s ease;
  ${({ aktif }) => aktif && 'transform: scale(1.25);'}
`;

/* ---- Evaluasi akhir ---- */

const LabelSoal = styled.div`
  font-size: 12.5px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.goldDeep};
  margin-bottom: 4px;
`;

const SoalCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
`;

const SoalBacaan = styled.div`
  direction: rtl;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 34px;
  line-height: 1.9;
  color: ${({ theme }) => theme.colors.judul};
`;

const KunciBox = styled.div`
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.goldSoft};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  font-size: 13.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};
  .hukum {
    display: inline-block;
    margin-top: 6px;
    font-size: 12px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.judul};
    background: ${({ theme }) => theme.colors.primarySoft};
    border-radius: 999px;
    padding: 3px 10px;
  }
`;

const TombolKunci = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 10px;
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 700;
  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`;

export default function IqroJilidPage() {
  const { jilid } = useParams();
  const [data, setData] = useState(null);
  const [full, setFull] = useState(null);
  const [error, setError] = useState(null);
  const [pilihan, setPilihan] = useState(1); // index huruf terpilih (Ba)
  const [halamanIdx, setHalamanIdx] = useState(0);
  const [kunciTerbuka, setKunciTerbuka] = useState({});

  useEffect(() => {
    setData(null);
    setFull(null);
    setError(null);
    setHalamanIdx(0);
    setKunciTerbuka({});
    Promise.all([
      IqroRepositoryImpl.getJilid(jilid),
      IqroRepositoryImpl.getJilidFull(jilid),
    ])
      .then(([lama, lengkap]) => {
        setData(lama);
        setFull(lengkap);
      })
      .catch((e) => setError(e.message));
  }, [jilid]);

  if (error) {
    return (
      <Page>
        <ErrorBox>{error}</ErrorBox>
      </Page>
    );
  }
  if (!data || !full) {
    return (
      <Page>
        <LoadingBox>
          <Spinner /> Memuat jilid…
        </LoadingBox>
      </Page>
    );
  }

  const huruf = data.huruf?.[pilihan];
  const halaman = full.halaman[halamanIdx];
  const totalHalaman = full.halaman.length;

  const keHalaman = (i) => {
    if (i >= 0 && i < totalHalaman) setHalamanIdx(i);
  };

  const toggleKunci = (nomor) =>
    setKunciTerbuka((s) => ({ ...s, [nomor]: !s[nomor] }));

  return (
    <Page>
      <Link to="/iqro">
        <GhostButton>
          <FaArrowLeft /> Semua Jilid
        </GhostButton>
      </Link>
      <PageTitle css={{ marginTop: 14 }}>
        Iqro Jilid {data.jilid}
      </PageTitle>
      <PageSubtitle>
        <b>{full.judul}.</b> {full.deskripsi}
      </PageSubtitle>

      {/* ---- Latihan per halaman (data lengkap iqroFull) ---- */}
      <SectionTitle>
        <FaBookOpen /> Latihan Membaca
      </SectionTitle>
      <Card>
        <LencanaTopik>
          Halaman {halaman.nomor} — {halaman.topik}
        </LencanaTopik>
        <Petunjuk>
          <FaInfoCircle /> <span>{halaman.petunjuk}</span>
        </Petunjuk>
        {halaman.baris.map((b, i) => (
          <BarisLatihan key={i}>{b}</BarisLatihan>
        ))}
        <NavLatihan>
          <GhostButton
            onClick={() => keHalaman(halamanIdx - 1)}
            disabled={halamanIdx === 0}
            css={{ visibility: halamanIdx === 0 ? 'hidden' : 'visible' }}
          >
            <FaChevronLeft /> Sebelumnya
          </GhostButton>
          <IndikatorHalaman>
            <span className="nomor">{halamanIdx + 1}</span> / {totalHalaman}
          </IndikatorHalaman>
          {halamanIdx < totalHalaman - 1 ? (
            <PrimaryButton onClick={() => keHalaman(halamanIdx + 1)}>
              Berikutnya <FaChevronRight />
            </PrimaryButton>
          ) : (
            <GhostButton as="a" href="#evaluasi">
              Evaluasi <FaChevronRight />
            </GhostButton>
          )}
        </NavLatihan>
        <Titik>
          {full.halaman.map((h, i) => (
            <Bulat
              key={h.nomor}
              aktif={i === halamanIdx}
              onClick={() => keHalaman(i)}
              aria-label={`Ke halaman ${h.nomor}`}
            />
          ))}
        </Titik>
      </Card>

      {/* ---- Grid huruf interaktif Jilid 1 (fungsi lama, dipertahankan) ---- */}
      {data.huruf && (
        <>
          <SectionTitle>
            <FaBookOpen /> 28 Huruf Hijaiyah — ketuk untuk melihat harakatnya
          </SectionTitle>
          <GridHuruf>
            {data.huruf.map((h, i) => (
              <SelHuruf key={h.arab} aktif={i === pilihan} onClick={() => setPilihan(i)}>
                <div className="ar">{h.arab}</div>
                <div className="lat">{h.latin}</div>
              </SelHuruf>
            ))}
          </GridHuruf>

          {huruf && (
            <PanelBesar css={{ marginTop: 16 }}>
              <div css={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Huruf {huruf.latin}
              </div>
              <TigaBentuk>
                <Bentuk>
                  <div className="ar">{huruf.fathah}</div>
                  <div className="lbl">Fathah</div>
                </Bentuk>
                <Bentuk>
                  <div className="ar">{huruf.kasrah}</div>
                  <div className="lbl">Kasrah</div>
                </Bentuk>
                <Bentuk>
                  <div className="ar">{huruf.dhammah}</div>
                  <div className="lbl">Dhammah</div>
                </Bentuk>
              </TigaBentuk>
            </PanelBesar>
          )}

          {data.contohBacaan && (
            <>
              <SectionTitle>Contoh Bacaan (Fathah)</SectionTitle>
              <Card>
                {data.contohBacaan.map((baris, i) => (
                  <BarisBaca key={i}>
                    {baris.map((sel, j) => (
                      <span key={j}>{sel}</span>
                    ))}
                  </BarisBaca>
                ))}
              </Card>
            </>
          )}
        </>
      )}

      {/* ---- Evaluasi akhir jilid ---- */}
      <div id="evaluasi">
        <SectionTitle>
          <FaClipboardCheck /> {full.evaluasi.judul}
        </SectionTitle>
      </div>
      <GoldCard>
        <Petunjuk css={{ marginBottom: 16 }}>
          <FaInfoCircle /> <span>{full.evaluasi.petunjuk}</span>
        </Petunjuk>
        {full.evaluasi.soal.map((s) => (
          <SoalCard key={s.nomor}>
            <LabelSoal>SOAL {s.nomor}</LabelSoal>
            <SoalBacaan>{s.bacaan}</SoalBacaan>
            <div css={{ textAlign: 'center' }}>
              <TombolKunci onClick={() => toggleKunci(s.nomor)}>
                {kunciTerbuka[s.nomor] ? <FaEyeSlash /> : <FaEye />}
                {kunciTerbuka[s.nomor] ? 'Sembunyikan kunci' : 'Lihat kunci bacaan'}
              </TombolKunci>
            </div>
            {kunciTerbuka[s.nomor] && (
              <KunciBox>
                <FaCheckCircle css={{ marginRight: 6 }} />
                {s.kunci}
                {s.hukum && (
                  <>
                    <br />
                    <span className="hukum">{s.hukum}</span>
                  </>
                )}
              </KunciBox>
            )}
          </SoalCard>
        ))}
      </GoldCard>

      <SectionTitle>Materi Jilid Ini</SectionTitle>
      <Card>
        <ul css={{ listStyle: 'none' }}>
          {data.topik.map((t) => (
            <Topik key={t}>
              <FaCheckCircle /> <span>{t}</span>
            </Topik>
          ))}
        </ul>
      </Card>
    </Page>
  );
}
