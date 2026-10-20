/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaKaaba, FaMoon, FaClipboardCheck, FaClipboardList, FaCheckCircle,
  FaInfoCircle, FaListOl, FaCalendarAlt, FaRedoAlt, FaIdCard, FaTshirt,
  FaBriefcaseMedical, FaPrayingHands, FaSuitcase,
} from 'react-icons/fa';
import {
  Page, PageHero, Card, GoldCard, SectionTitle, GhostButton,
} from '../components/common.jsx';
import { SegmenWadah, SegmenTab } from '../components/SegmentedControl.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import {
  HAJI, UMRAH, CHECKLIST_HAJI, DISCLAIMER_HAJI,
} from '../../data/sources/hajiUmrahData.js';
import { LocalChecklistHajiRepository } from '../../data/repositories/LocalChecklistHajiRepository.js';
import { useDialog } from '../components/feedback/dialogStore.js';
import { useToast } from '../components/feedback/toastStore.js';

const Arab = styled.p`
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 24px;
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

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  svg { flex-shrink: 0; margin-top: 3px; }
`;

const Step = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child { border-bottom: none; }
  svg { flex-shrink: 0; margin-top: 3px; color: ${({ theme }) => theme.colors.primary}; }
  > div { flex: 1; min-width: 0; }
  .t { font-size: 14px; font-weight: 700; overflow-wrap: break-word; }
  .c { font-size: 13px; color: ${({ theme }) => theme.colors.muted}; line-height: 1.6; margin-top: 3px; overflow-wrap: break-word; }
`;

const Paragraf = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
`;

const Tabel = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    line-height: 1.55;
  }
  th, td {
    text-align: left;
    padding: 9px 8px;
    border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
    vertical-align: top;
  }
  th { color: ${({ theme }) => theme.colors.primary}; font-size: 12.5px; }
  tr:last-child td { border-bottom: none; }
`;

const BarProgres = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primarySoft};
  overflow: hidden;
  > div {
    height: 100%;
    border-radius: 999px;
    background: ${({ theme }) => theme.gradients.gold};
    transition: width ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
  }
`;

const ItemCentang = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 8px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  cursor: pointer;
  &:last-child { border-bottom: none; }
  input {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
  span {
    font-size: 14px;
    line-height: 1.5;
    color: ${({ theme, selesai }) => (selesai ? theme.colors.muted : theme.colors.text)};
    text-decoration: ${({ selesai }) => (selesai ? 'line-through' : 'none')};
  }
`;

const IKON_KATEGORI = {
  Dokumen: <FaIdCard />,
  'Pakaian & Ihram': <FaTshirt />,
  'Kesehatan & Obat': <FaBriefcaseMedical />,
  Ibadah: <FaPrayingHands />,
  Lainnya: <FaSuitcase />,
};

function KartuDoa({ doa }) {
  return (
    <GoldCard>
      <p css={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{doa.judul}</p>
      {doa.arab && <Arab lang="ar">{doa.arab}</Arab>}
      {doa.latin && <Latin>{doa.latin}</Latin>}
      {doa.arti && <Arti>&ldquo;{doa.arti}&rdquo;</Arti>}
      {doa.keterangan && (
        <Catatan css={{ marginTop: 12 }}>
          <FaInfoCircle /> <span>{doa.keterangan}</span>
        </Catatan>
      )}
    </GoldCard>
  );
}

function Disclaimer() {
  return (
    <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
      <Catatan>
        <FaInfoCircle /> <span>{DISCLAIMER_HAJI}</span>
      </Catatan>
    </Card>
  );
}

export default function HajiUmrahPage() {
  const [tab, setTab] = useState('haji'); // haji | umrah | checklist
  const dialog = useDialog();
  const toast = useToast();
  const [centang, setCentang] = useState(() => LocalChecklistHajiRepository.load());

  const totalItem = useMemo(
    () => CHECKLIST_HAJI.reduce((n, k) => n + k.item.length, 0),
    [],
  );
  const totalCentang = useMemo(
    () => CHECKLIST_HAJI.reduce(
      (n, k) => n + k.item.filter((it) => centang[it.id]).length,
      0,
    ),
    [centang],
  );
  const persenTotal = totalItem ? Math.round((totalCentang / totalItem) * 100) : 0;

  const ubahCentang = (id, nilai) => {
    const baru = { ...centang };
    if (nilai) baru[id] = true;
    else delete baru[id];
    setCentang(baru);
    LocalChecklistHajiRepository.save(baru);
  };

  const resetChecklist = async () => {
    const ya = await dialog.confirm({
      judul: 'Reset Checklist?',
      pesan: 'Semua centang perlengkapan haji/umrah akan dihapus dan daftar kembali kosong.',
      teksYa: 'Reset',
      teksTidak: 'Batal',
      bahaya: true,
    });
    if (!ya) return;
    setCentang({});
    LocalChecklistHajiRepository.reset();
    toast.sukses('Checklist direset.');
  };

  return (
    <Page>
      <PageHero>
        <h2><FaKaaba /> Panduan Haji &amp; Umrah</h2>
        <p>
          Rukun, wajib, dan urutan manasik haji; tata cara umrah; serta checklist
          perlengkapan yang tersimpan di perangkat ini.
        </p>
      </PageHero>

      <SegmenWadah role="tablist" aria-label="Bagian haji dan umrah">
        <SegmenTab aktif={tab === 'haji'} onClick={() => setTab('haji')}>
          <FaKaaba /> Haji
        </SegmenTab>
        <SegmenTab aktif={tab === 'umrah'} onClick={() => setTab('umrah')}>
          <FaMoon /> Umrah
        </SegmenTab>
        <SegmenTab aktif={tab === 'checklist'} onClick={() => setTab('checklist')}>
          <FaClipboardCheck /> Checklist
        </SegmenTab>
      </SegmenWadah>

      {tab === 'haji' && (
        <>
          <SectionTitle><FaListOl /> Rukun Haji</SectionTitle>
          <Card>
            {HAJI.rukun.map((s, i) => (
              <Step key={s.judul}>
                <NomorMedali nomor={i + 1} ukuran={30} />
                <div>
                  <div className="t">{s.judul}</div>
                  <div className="c">{s.desc}</div>
                </div>
              </Step>
            ))}
          </Card>

          <SectionTitle><FaCheckCircle /> Wajib Haji</SectionTitle>
          <Card>
            {HAJI.wajib.map((s) => (
              <Step key={s}>
                <FaCheckCircle />
                <div><div className="c">{s}</div></div>
              </Step>
            ))}
          </Card>

          <SectionTitle><FaCalendarAlt /> Urutan Manasik per Hari</SectionTitle>
          <Card>
            {HAJI.manasik.map((s, i) => (
              <Step key={s.hari}>
                <NomorMedali nomor={i + 1} ukuran={30} />
                <div>
                  <div className="t">{s.hari}</div>
                  <div className="c">{s.desc}</div>
                </div>
              </Step>
            ))}
          </Card>

          <SectionTitle><FaPrayingHands /> Doa Utama</SectionTitle>
          <KartuDoa doa={HAJI.talbiyah} />
          {HAJI.doaLain.map((d) => (
            <div key={d.judul}>
              <p css={{ fontWeight: 700, fontSize: 15, margin: '14px 0 8px' }}>{d.judul}</p>
              <KartuDoa doa={d} />
            </div>
          ))}
          <Disclaimer />
        </>
      )}

      {tab === 'umrah' && (
        <>
          <SectionTitle><FaListOl /> Urutan Umrah</SectionTitle>
          <Card>
            {UMRAH.langkah.map((s, i) => (
              <Step key={s.judul}>
                <NomorMedali nomor={i + 1} ukuran={30} />
                <div>
                  <div className="t">{s.judul}</div>
                  <div className="c">{s.desc}</div>
                </div>
              </Step>
            ))}
          </Card>

          <SectionTitle><FaPrayingHands /> Talbiyah</SectionTitle>
          <KartuDoa doa={UMRAH.talbiyah} />

          <SectionTitle><FaClipboardList /> Perbedaan Haji &amp; Umrah</SectionTitle>
          <Card>
            <Tabel>
              <table>
                <thead>
                  <tr><th>Aspek</th><th>Haji</th><th>Umrah</th></tr>
                </thead>
                <tbody>
                  {UMRAH.perbedaan.map((b) => (
                    <tr key={b.aspek}>
                      <td><strong>{b.aspek}</strong></td>
                      <td>{b.haji}</td>
                      <td>{b.umrah}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tabel>
          </Card>
          <Disclaimer />
        </>
      )}

      {tab === 'checklist' && (
        <>
          <SectionTitle><FaClipboardCheck /> Checklist Perlengkapan</SectionTitle>
          <Card>
            <Paragraf>
              {totalCentang} dari {totalItem} item siap ({persenTotal}%).
            </Paragraf>
            <div css={{ marginTop: 10 }}>
              <BarProgres role="progressbar" aria-valuenow={persenTotal} aria-valuemin={0} aria-valuemax={100} aria-label="Progres checklist keseluruhan">
                <div style={{ width: `${persenTotal}%` }} />
              </BarProgres>
            </div>
            <GhostButton
              type="button"
              onClick={resetChecklist}
              disabled={totalCentang === 0}
              css={{ marginTop: 14, width: '100%' }}
            >
              <FaRedoAlt /> Reset Checklist
            </GhostButton>
          </Card>

          {CHECKLIST_HAJI.map((kat) => {
            const selesai = kat.item.filter((it) => centang[it.id]).length;
            const persen = kat.item.length ? Math.round((selesai / kat.item.length) * 100) : 0;
            return (
              <div key={kat.kategori}>
                <SectionTitle>
                  {IKON_KATEGORI[kat.kategori]} {kat.kategori}
                </SectionTitle>
                <Card>
                  <Paragraf css={(t) => ({ fontSize: 13, color: t.colors.muted })}>
                    {selesai}/{kat.item.length} siap ({persen}%)
                  </Paragraf>
                  <div css={{ margin: '8px 0 6px' }}>
                    <BarProgres aria-hidden="true"><div style={{ width: `${persen}%` }} /></BarProgres>
                  </div>
                  {kat.item.map((it) => (
                    <ItemCentang key={it.id} selesai={!!centang[it.id]}>
                      <input
                        type="checkbox"
                        checked={!!centang[it.id]}
                        onChange={(e) => ubahCentang(it.id, e.target.checked)}
                      />
                      <span>{it.label}</span>
                    </ItemCentang>
                  ))}
                </Card>
              </div>
            );
          })}
          <Disclaimer />
        </>
      )}
    </Page>
  );
}
