/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

/**
 * StateKosong — pola keadaan kosong bersama (pencarian tanpa hasil,
 * daftar kosong, dsb). Komposisi selalu rata tengah: ikon di dalam medali
 * emas lembut, judul, deskripsi maks ~300px, lalu chip saran opsional.
 * Semua warna dari token tema → bagus di mode terang & gelap.
 */

const Wadah = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 34px 20px 38px;
`;

const Medali = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  svg {
    font-size: 34px;
    color: ${({ theme }) => theme.colors.goldDeep};
  }
`;

const Judul = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.judul};
  margin-bottom: 6px;
`;

const Deskripsi = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 300px;
`;

const LabelSaran = styled.p`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  margin-top: 18px;
  margin-bottom: 8px;
`;

const BarisChip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const Chip = styled.button`
  min-height: 40px;
  padding: 8px 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13.5px;
  font-weight: 700;
  transition: transform ${({ theme }) => theme.anim.fast} ${({ theme }) => theme.anim.ease};
  &:active {
    transform: scale(0.96);
  }
`;

const Aksi = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: center;
`;

export default function StateKosong({
  ikon,
  judul,
  deskripsi,
  saran,
  labelSaran = 'Pencarian populer',
  onSaran,
  aksi,
}) {
  return (
    <Wadah>
      <Medali aria-hidden="true">{ikon}</Medali>
      {judul && <Judul>{judul}</Judul>}
      {deskripsi && <Deskripsi>{deskripsi}</Deskripsi>}
      {Array.isArray(saran) && saran.length > 0 && typeof onSaran === 'function' && (
        <>
          <LabelSaran>{labelSaran}</LabelSaran>
          <BarisChip>
            {saran.map((s) => (
              <Chip key={s} type="button" onClick={() => onSaran(s)}>
                {s}
              </Chip>
            ))}
          </BarisChip>
        </>
      )}
      {aksi && <Aksi>{aksi}</Aksi>}
    </Wadah>
  );
}
