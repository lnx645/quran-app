/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import {
  FaUsers, FaUserPlus, FaCheck, FaEdit, FaTrash, FaExchangeAlt, FaInfoCircle, FaSave,
} from 'react-icons/fa';
import { LocalProfilRepository } from '../../data/repositories/LocalProfilRepository.js';
import { MAKS_PROFIL } from '../../domain/usecases/profilKeluarga.js';
import { useDialog } from '../components/feedback/dialogStore.js';
import { useToast } from '../components/feedback/toastStore.js';
import {
  Page, PageHero, Card, SectionTitle, PrimaryButton, GhostButton, Field, TextInput,
} from '../components/common.jsx';

const BarisProfil = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  .info {
    min-width: 0;
    flex: 1;
  }
  .nama {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.judul};
    word-break: break-word;
  }
  .status {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const LencanaAktif = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryDeep};
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill}px;
  padding: 4px 10px;
  white-space: nowrap;
`;

const TombolKecil = styled(GhostButton)`
  min-height: 44px;
  padding: 9px 13px;
  font-size: 13.5px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  flex-shrink: 0;
`;

const TombolAktifkan = styled(PrimaryButton)`
  min-height: 44px;
  padding: 9px 13px;
  font-size: 13.5px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  flex-shrink: 0;
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

export default function ProfilPage() {
  const dialog = useDialog();
  const toast = useToast();
  const [state, setState] = useState(() => LocalProfilRepository.load());
  const [namaBaru, setNamaBaru] = useState('');
  const [editId, setEditId] = useState(null);
  const [namaEdit, setNamaEdit] = useState('');

  const segarkan = () => setState(LocalProfilRepository.load());
  const penuh = state.daftar.length >= MAKS_PROFIL;

  const gantiAktif = (id) => {
    if (id === state.aktifId) return;
    LocalProfilRepository.aturAktif(id);
    // Muat ulang penuh SENGAJA: seluruh state aplikasi (setiap repository
    // & hook) membaca namespace profil saat pertama dimuat. Reload adalah
    // cara paling aman menjamin tidak ada satu pun data profil lama yang
    // masih tampil/tertulis setelah berganti profil.
    window.location.reload();
  };

  const tambah = () => {
    const nama = namaBaru.trim();
    if (!nama) {
      toast.peringatan('Isi dulu nama profil barunya.');
      return;
    }
    if (penuh) {
      toast.peringatan(`Jumlah profil sudah maksimal (${MAKS_PROFIL}).`);
      return;
    }
    LocalProfilRepository.tambahProfil(nama);
    setNamaBaru('');
    segarkan();
    toast.sukses(`Profil "${nama}" dibuat. Aktifkan untuk mulai memakainya.`);
  };

  const simpanNama = (id) => {
    if (!namaEdit.trim()) {
      toast.peringatan('Nama profil tidak boleh kosong.');
      return;
    }
    LocalProfilRepository.ubahNama(id, namaEdit);
    setEditId(null);
    segarkan();
    toast.sukses('Nama profil diubah.');
  };

  const hapus = async (profil) => {
    const ya = await dialog.confirm({
      judul: `Hapus Profil "${profil.nama}"?`,
      pesan:
        `Seluruh data milik profil "${profil.nama}" di perangkat ini — bookmark, hafalan, ` +
        'tracker, catatan, dan progres lainnya — ikut terhapus dan tidak bisa dikembalikan. ' +
        'Data profil lain (termasuk profil Utama) tidak tersentuh. Lanjutkan?',
      teksYa: 'Hapus Profil',
      teksTidak: 'Batal',
      bahaya: true,
    });
    if (!ya) return;
    if (LocalProfilRepository.hapusProfil(profil.id)) {
      segarkan();
      toast.sukses(`Profil "${profil.nama}" dan datanya dihapus.`);
    } else {
      toast.peringatan('Profil aktif atau profil Utama tidak bisa dihapus.');
    }
  };

  return (
    <Page>
      <PageHero>
        <h2>
          <FaUsers /> Profil Keluarga
        </h2>
        <p>
          Satu perangkat dipakai bersama? Setiap anggota keluarga bisa punya profil sendiri agar
          data ibadahnya tidak tercampur.
        </p>
      </PageHero>

      <Card css={{ marginBottom: 16 }}>
        <Catatan>
          <FaInfoCircle aria-hidden="true" />
          <span>
            Profil tersimpan di perangkat ini saja; profil Utama memakai data yang sudah ada —
            tidak ada data yang dipindah atau dihapus saat membuat profil baru.
          </span>
        </Catatan>
      </Card>

      <SectionTitle>
        <FaUsers /> Profil di Perangkat Ini ({state.daftar.length}/{MAKS_PROFIL})
      </SectionTitle>
      <Card css={{ marginBottom: 16 }}>
        {state.daftar.map((profil) => {
          const aktif = profil.id === state.aktifId;
          return (
            <BarisProfil key={profil.id}>
              <div className="info">
                {editId === profil.id ? (
                  <Field css={{ marginBottom: 0 }}>
                    <TextInput
                      value={namaEdit}
                      onChange={(e) => setNamaEdit(e.target.value)}
                      maxLength={40}
                      aria-label="Nama profil"
                      autoFocus
                    />
                  </Field>
                ) : (
                  <>
                    <div className="nama">{profil.nama}</div>
                    <div className="status">
                      {profil.id === 'utama'
                        ? 'Profil bawaan — memakai data yang sudah ada'
                        : 'Profil tambahan di perangkat ini'}
                    </div>
                  </>
                )}
              </div>
              {aktif && (
                <LencanaAktif>
                  <FaCheck aria-hidden="true" /> Aktif
                </LencanaAktif>
              )}
              {editId === profil.id ? (
                <TombolKecil
                  type="button"
                  onClick={() => simpanNama(profil.id)}
                  aria-label={`Simpan nama ${profil.nama}`}
                >
                  <FaSave aria-hidden="true" /> Simpan
                </TombolKecil>
              ) : (
                <>
                  {!aktif && (
                    <TombolAktifkan type="button" onClick={() => gantiAktif(profil.id)}>
                      <FaExchangeAlt aria-hidden="true" /> Aktifkan
                    </TombolAktifkan>
                  )}
                  <TombolKecil
                    type="button"
                    onClick={() => {
                      setEditId(profil.id);
                      setNamaEdit(profil.nama);
                    }}
                    aria-label={`Ganti nama ${profil.nama}`}
                  >
                    <FaEdit aria-hidden="true" />
                  </TombolKecil>
                  {!aktif && profil.id !== 'utama' && (
                    <TombolKecil
                      type="button"
                      onClick={() => hapus(profil)}
                      aria-label={`Hapus profil ${profil.nama}`}
                      css={(t) => ({ color: t.colors.danger, borderColor: t.colors.danger })}
                    >
                      <FaTrash aria-hidden="true" />
                    </TombolKecil>
                  )}
                </>
              )}
            </BarisProfil>
          );
        })}
        <Catatan css={{ marginTop: 10 }}>
          <FaInfoCircle aria-hidden="true" />
          <span>
            Mengaktifkan profil akan memuat ulang aplikasi agar seluruh data berganti ke profil
            yang dipilih.
          </span>
        </Catatan>
      </Card>

      <SectionTitle>
        <FaUserPlus /> Tambah Profil
      </SectionTitle>
      <Card>
        <Field>
          <label htmlFor="nama-profil-baru">Nama profil baru</label>
          <TextInput
            id="nama-profil-baru"
            value={namaBaru}
            onChange={(e) => setNamaBaru(e.target.value)}
            placeholder="Mis. Anak 1, Ibu, Ayah"
            maxLength={40}
            disabled={penuh}
          />
        </Field>
        <PrimaryButton type="button" onClick={tambah} disabled={penuh} css={{ width: '100%' }}>
          <FaUserPlus aria-hidden="true" />
          {penuh ? `Sudah Maksimal (${MAKS_PROFIL} Profil)` : 'Tambah Profil'}
        </PrimaryButton>
      </Card>
    </Page>
  );
}
