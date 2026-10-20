/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaCalculator, FaLock, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaTrashAlt, FaCalendarAlt,
} from 'react-icons/fa';
import { vonisDarah } from '../../domain/usecases/vonisHaid.js';
import { LocalMuslimahRepository } from '../../data/repositories/LocalMuslimahRepository.js';
import { DISCLAIMER } from '../../data/sources/muslimahData.js';
import {
  Page, PageHero, Card, SectionTitle, Field, TextInput, SelectInput, PrimaryButton, GhostButton, ErrorBox,
} from '../components/common.jsx';
import { useToast } from '../components/feedback/toastStore.js';

const VonisBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 10px;
  background: ${({ theme, jenis }) =>
    jenis === 'ISTIHADAH' ? theme.colors.primarySoft : theme.colors.goldSoft};
  color: ${({ theme, jenis }) =>
    jenis === 'ISTIHADAH' ? theme.colors.judul : theme.colors.goldDeep};
  border: 1.5px solid
    ${({ theme, jenis }) => (jenis === 'ISTIHADAH' ? theme.colors.primary : theme.colors.gold)};
`;

const StatusRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  svg {
    flex-shrink: 0;
    margin-top: 3px;
    font-size: 16px;
  }
  .t {
    font-size: 14px;
    font-weight: 700;
  }
  .c {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.55;
    margin-top: 2px;
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  gap: 9px;
  align-items: flex-start;
  font-size: 13.5px;
  line-height: 1.5;
  margin-bottom: 12px;
  input {
    margin-top: 3px;
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Catatan = styled.p`
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

const LABEL_IBADAH = {
  sholat: 'Shalat',
  puasa: 'Puasa',
  bacaQuranTilawah: "Baca Al-Qur'an (niat tilawah)",
  sentuhMushaf: 'Menyentuh mushaf langsung',
  masukMasjid: 'Masuk / berdiam di masjid',
  thawaf: 'Thawaf',
  jima: 'Hubungan suami-istri',
};

function FormPin({ mode }) {
  const [pin, setPin] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();

  const buat = mode === 'buat';
  return (
    <Card>
      <SectionTitle css={{ marginTop: 0 }}>
        <FaLock /> {buat ? 'Buat PIN Kalkulator' : 'Masukkan PIN'}
      </SectionTitle>
      <p css={{ fontSize: 13.5, lineHeight: 1.6, marginBottom: 14 }}>
        {buat
          ? 'Data haid bersifat pribadi. Buat PIN 4–6 digit untuk mengunci halaman ini di perangkat ini (PIN tersimpan sebagai hash, bukan teks mentah).'
          : 'Halaman ini terkunci. Masukkan PIN yang pernah dibuat di perangkat ini.'}
      </p>
      <Field>
        <label htmlFor="pin">PIN (4–6 digit)</label>
        <TextInput
          id="pin"
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        />
      </Field>
      {buat && (
        <Field>
          <label htmlFor="pin2">Ulangi PIN</label>
          <TextInput
            id="pin2"
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={konfirmasi}
            onChange={(e) => setKonfirmasi(e.target.value.replace(/\D/g, ''))}
          />
        </Field>
      )}
      {error && (
        <div css={{ marginBottom: 12 }}>
          <ErrorBox>{error}</ErrorBox>
        </div>
      )}
      <PrimaryButton
        css={{ width: '100%' }}
        onClick={() => {
          if (buat) {
            if (pin.length < 4) return setError('PIN minimal 4 digit.');
            if (pin !== konfirmasi) return setError('PIN dan ulangi PIN tidak sama.');
            try {
              LocalMuslimahRepository.simpanPin(pin);
              toast.sukses('PIN tersimpan. Kalkulator terbuka.');
              window.dispatchEvent(new Event('muslimah-pin-ok'));
            } catch (e) {
              setError(e.message);
            }
          } else if (LocalMuslimahRepository.cekPin(pin)) {
            window.dispatchEvent(new Event('muslimah-pin-ok'));
          } else {
            setError('PIN salah. Coba lagi.');
          }
        }}
      >
        <FaLock /> {buat ? 'Simpan PIN & Buka' : 'Buka Kalkulator'}
      </PrimaryButton>
    </Card>
  );
}

export default function MuslimahKalkulatorPage() {
  const [pinAda] = useState(() => LocalMuslimahRepository.pinSudahAda());
  const [terbuka, setTerbuka] = useState(false);
  const [riwayat, setRiwayat] = useState(() => LocalMuslimahRepository.ambilRiwayat());

  // Form kalkulator
  const [jenis, setJenis] = useState('haid');
  const [mulai, setMulai] = useState('');
  const [berhenti, setBerhenti] = useState('');
  const [totalJam, setTotalJam] = useState('');
  const [suciHari, setSuciHari] = useState('');
  const [adahHari, setAdahHari] = useState('');
  const [tamyiz, setTamyiz] = useState(false);
  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState('');
  const toast = useToast();

  const siap = useMemo(() => mulai && berhenti, [mulai, berhenti]);

  if (!terbuka) {
    return (
      <Page>
        <PageHero>
          <h2>
            <FaCalculator /> Kalkulator Haid &amp; Nifas
          </h2>
          <p>Vonis haid / nifas / istihadah + status ibadah, menurut mazhab Syafi&apos;i.</p>
        </PageHero>
        <PinGate pinAda={pinAda} onOk={() => setTerbuka(true)} />
        <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
          <Catatan>
            <FaInfoCircle /> <span>{DISCLAIMER}</span>
          </Catatan>
        </Card>
      </Page>
    );
  }

  const hitung = () => {
    setError('');
    if (!siap) return setError('Isi tanggal mulai dan tanggal berhenti dulu.');
    const input = {
      jenis,
      tanggalMulai: mulai,
      tanggalBerhenti: berhenti,
    };
    if (totalJam !== '') input.totalJamDarah = Number(totalJam);
    if (jenis === 'haid') {
      if (suciHari !== '') input.hariSuciSejakHaidTerakhir = Number(suciHari);
      if (adahHari !== '') input.adahHari = Number(adahHari);
      input.bisaBedakanSifatDarah = tamyiz;
    }
    const r = vonisDarah(input);
    if (r.vonis === 'TIDAK_VALID') return setError(r.penjelasan[0]);
    setHasil(r);
    LocalMuslimahRepository.tambahRiwayat({
      tanggalCatat: new Date().toISOString(),
      jenis,
      tanggalMulai: mulai,
      tanggalBerhenti: berhenti,
      totalJamDarah: input.totalJamDarah ?? null,
      vonis: r.vonis,
      ringkasan: r.ringkasan,
      penjelasan: r.penjelasan,
    });
    setRiwayat(LocalMuslimahRepository.ambilRiwayat());
    toast.sukses(`Vonis: ${r.vonis} — hasil tersimpan di riwayat perangkat ini.`);
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaCalculator /> Kalkulator Haid &amp; Nifas
        </h2>
        <p>
          Aturan Syafi&apos;i: haid total ≥ 24 jam &amp; rentang ≤ 15 hari; suci ≥ 15 hari; nifas
          maksimal 60 hari.
        </p>
      </PageHero>

      <Card>
        <Field>
          <label htmlFor="jenis">Jenis Darah</label>
          <SelectInput id="jenis" value={jenis} onChange={(e) => setJenis(e.target.value)}>
            <option value="haid">Haid (menstruasi)</option>
            <option value="nifas">Nifas (setelah melahirkan)</option>
          </SelectInput>
        </Field>
        <Field>
          <label htmlFor="mulai">
            {jenis === 'nifas' ? 'Tanggal Melahirkan' : 'Tanggal Mulai Darah Keluar'}
          </label>
          <TextInput id="mulai" type="date" value={mulai} onChange={(e) => setMulai(e.target.value)} />
        </Field>
        <Field>
          <label htmlFor="berhenti">Tanggal Terakhir Darah Keluar</label>
          <TextInput
            id="berhenti"
            type="date"
            value={berhenti}
            onChange={(e) => setBerhenti(e.target.value)}
          />
        </Field>
        {jenis === 'haid' && (
          <>
            <Field>
              <label htmlFor="jam">
                Total Jam Darah Benar-benar Keluar (kosongkan bila keluar terus-menerus)
              </label>
              <TextInput
                id="jam"
                type="number"
                min="0"
                placeholder="cth flek terputus-putus: 10"
                value={totalJam}
                onChange={(e) => setTotalJam(e.target.value)}
              />
            </Field>
            <Field>
              <label htmlFor="suci">Hari Suci Sejak Haid Sebelumnya Selesai (bila tahu)</label>
              <TextInput
                id="suci"
                type="number"
                min="0"
                placeholder="cth: 25"
                value={suciHari}
                onChange={(e) => setSuciHari(e.target.value)}
              />
            </Field>
            <Field>
              <label htmlFor="adah">Kebiasaan (&apos;adah) Durasi Haid Biasanya (hari, bila ada)</label>
              <TextInput
                id="adah"
                type="number"
                min="0"
                placeholder="cth: 7"
                value={adahHari}
                onChange={(e) => setAdahHari(e.target.value)}
              />
            </Field>
            <CheckboxRow>
              <input type="checkbox" checked={tamyiz} onChange={(e) => setTamyiz(e.target.checked)} />
              <span>
                Saya bisa membedakan sifat darah (tamyiz): darah haid kuat = hitam/pekat, kental,
                berbau khas; darah istihadah lemah = merah segar, encer.
              </span>
            </CheckboxRow>
          </>
        )}
        {error && (
          <div css={{ marginBottom: 12 }}>
            <ErrorBox>{error}</ErrorBox>
          </div>
        )}
        <PrimaryButton css={{ width: '100%' }} onClick={hitung} disabled={!siap}>
          <FaCalculator /> Hitung Vonis
        </PrimaryButton>
        <Catatan css={{ marginTop: 10 }}>
          <FaInfoCircle /> Kasus rumit (KB/hormonal, siklus sangat tidak teratur, darah bercampur
          lama) — konsultasikan ke ulama/dokter.
        </Catatan>
      </Card>

      {hasil && (
        <Card role="status" aria-label={`Hasil vonis: ${hasil.vonis}`}>
          <VonisBadge jenis={hasil.vonis}>{hasil.vonis}</VonisBadge>
          <p css={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{hasil.ringkasan}</p>
          {hasil.penjelasan.map((p, i) => (
            <p key={i} css={{ fontSize: 13.5, lineHeight: 1.65, marginBottom: 6 }}>
              {p}
            </p>
          ))}
          <SectionTitle>Status Ibadah (Syafi&apos;i)</SectionTitle>
          {hasil.ibadah &&
            Object.entries(hasil.ibadah).map(([kunci, s]) => (
              <StatusRow key={kunci}>
                {s.boleh ? (
                  <FaCheckCircle css={(t) => ({ color: t.colors.success })} />
                ) : (
                  <FaTimesCircle css={(t) => ({ color: t.colors.danger })} />
                )}
                <div>
                  <div className="t">
                    {LABEL_IBADAH[kunci]}: {s.boleh ? 'Boleh / Wajib' : 'Tidak boleh'}
                    {s.wajibQadha ? ' — wajib qadha (puasa)' : ''}
                  </div>
                  <div className="c">{s.catatan}</div>
                </div>
              </StatusRow>
            ))}
          {hasil.arahanLanjutan && (
            <Catatan css={{ marginTop: 12 }}>
              <FaInfoCircle /> <span>{hasil.arahanLanjutan}</span>
            </Catatan>
          )}
        </Card>
      )}

      {riwayat.length > 0 && (
        <>
          <SectionTitle>
            <FaCalendarAlt /> Riwayat (di perangkat ini)
          </SectionTitle>
          {riwayat.map((r) => (
            <Card key={r.id} css={{ padding: '14px 16px' }}>
              <div css={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <strong css={{ fontSize: 14 }}>
                  {r.vonis} — {r.jenis === 'nifas' ? 'Nifas' : 'Haid'}
                </strong>
                <GhostButton
                  css={{ minHeight: 44, padding: '8px 12px', fontSize: 12.5 }}
                  onClick={() => {
                    LocalMuslimahRepository.hapusRiwayat(r.id);
                    setRiwayat(LocalMuslimahRepository.ambilRiwayat());
                  }}
                >
                  <FaTrashAlt /> Hapus
                </GhostButton>
              </div>
              <p css={{ fontSize: 12.5, marginTop: 4 }}>
                {r.tanggalMulai} s.d. {r.tanggalBerhenti} · {r.ringkasan}
              </p>
            </Card>
          ))}
        </>
      )}

      <Card css={{ fontSize: 13, lineHeight: 1.6 }}>
        <Catatan>
          <FaInfoCircle /> <span>{DISCLAIMER}</span>
        </Catatan>
      </Card>
    </Page>
  );
}

// Gerbang PIN: membungkus FormPin + mendengarkan sinyal sukses.
function PinGate({ pinAda, onOk }) {
  useEffect(() => {
    const handler = () => onOk();
    window.addEventListener('muslimah-pin-ok', handler);
    return () => window.removeEventListener('muslimah-pin-ok', handler);
  }, [onOk]);
  return <FormPin mode={pinAda ? 'masuk' : 'buat'} />;
}
