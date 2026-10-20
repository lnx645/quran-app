/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaSearch, FaExclamationTriangle, FaSearchMinus } from 'react-icons/fa';
import { useChapters } from '../hooks/useChapters.js';
import { Page, PageHero, ErrorBox, Skeleton } from '../components/common.jsx';
import NomorMedali from '../components/NomorMedali.jsx';
import { stagger, reduceMotion } from '../components/motion.js';

/**
 * Daftar seluruh 114 surah: pencarian (latin/arti/arab) + filter
 * Makkiyah/Madaniyah, kartu surah → /surah/:id.
 */

const FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'makkah', label: 'Makkiyah' },
  { key: 'madinah', label: 'Madaniyah' },
];

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

const SearchWrap = styled.div`
  position: relative;
  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.faint};
    font-size: 16px;
  }
  input {
    width: 100%;
    padding: 13px 14px 13px 42px;
    font-size: 16px;
    border: 1.5px solid ${({ theme }) => theme.colors.border};
    border-radius: 14px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primarySoft};
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.faint};
    }
  }
`;

const Chips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Chip = styled.button`
  border: 1.5px solid ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.border)};
  background: ${({ active, theme }) => (active ? theme.colors.emeraldPanel : theme.colors.surface)};
  color: ${({ active, theme }) => (active ? theme.colors.onPrimary : theme.colors.muted)};
  border-radius: ${({ theme }) => theme.radii.pill}px;
  padding: 9px 16px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  &:active {
    transform: scale(0.96);
  }
`;

const CountLine = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 12px;
  b {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.sm}px;
  ${stagger(8, 30)}
  ${reduceMotion}
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SurahLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 13px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 13px 14px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  overflow: hidden;
  transition: transform ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease},
    box-shadow ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease},
    border-color ${({ theme }) => theme.anim.med} ${({ theme }) => theme.anim.ease};
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${({ theme }) => theme.pattern};
    background-size: 64px 64px;
    opacity: 0.04;
    pointer-events: none;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lift};
    border-color: ${({ theme }) => theme.colors.gold};
  }
  &:active {
    transform: scale(0.98);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
  ${reduceMotion}
`;

const SurahInfo = styled.span`
  position: relative;
  flex: 1;
  min-width: 0;
  .latin {
    display: block;
    font-weight: 700;
    font-size: 15.5px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.25;
  }
  .arti {
    display: block;
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
    font-size: 11.5px;
    color: ${({ theme }) => theme.colors.faint};
  }
  .tempat {
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radii.pill}px;
    padding: 2px 9px;
    font-weight: 700;
  }
`;

const ArabicName = styled.span`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.arabic};
  font-size: 26px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

// Skeleton daftar surah — memakai komponen Skeleton bersama (shimmer).
const SkeletonCard = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding: 13px 14px;
  .num {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }
  .tx {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .arab {
    width: 74px;
    height: 26px;
    flex-shrink: 0;
  }
`;

const EmptyBox = styled.div`
  text-align: center;
  padding: 56px 20px;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    font-size: 40px;
    color: ${({ theme }) => theme.colors.faint};
    margin-bottom: 12px;
  }
  p {
    font-size: 15px;
    line-height: 1.6;
  }
`;

const tempatLabel = (place) => (place === 'makkah' ? 'Makkiyah' : place === 'madinah' ? 'Madaniyah' : place);

export default function QuranListPage() {
  const { loading, error, chapters } = useChapters();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return chapters.filter((s) => {
      if (filter !== 'all' && s.revelationPlace !== filter) return false;
      if (!term) return true;
      return (
        s.nameLatin.toLowerCase().includes(term) ||
        s.translationId.toLowerCase().includes(term) ||
        s.nameArabic.includes(term) ||
        String(s.id) === term
      );
    });
  }, [chapters, q, filter]);

  return (
    <Page>
      <PageHero>
        <h2>
          <FaBookOpen /> Al-Qur'an Lengkap
        </h2>
        <p>114 surah — cari berdasarkan nama, arti, atau nomor, lalu ketuk untuk membaca &amp; mendengarkan.</p>
      </PageHero>

      <Toolbar>
        <SearchWrap>
          <FaSearch />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari surah — mis. Ya-Sin, Sapi, يس…"
            aria-label="Cari surah"
          />
        </SearchWrap>
        <Chips role="group" aria-label="Filter tempat turun">
          {FILTERS.map((f) => (
            <Chip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}
            </Chip>
          ))}
        </Chips>
      </Toolbar>

      {loading ? (
        <Grid aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i}>
              <Skeleton className="num" radius={14} />
              <div className="tx">
                <Skeleton h={13} />
                <Skeleton h={11} w="55%" />
              </div>
              <Skeleton className="arab" radius={8} />
            </SkeletonCard>
          ))}
        </Grid>
      ) : error ? (
        <ErrorBox>
          <FaExclamationTriangle /> Gagal memuat daftar surah: {error}. Periksa koneksi internet lalu muat
          ulang.
        </ErrorBox>
      ) : (
        <>
          <CountLine>
            Menampilkan <b>{filtered.length}</b> dari 114 surah
            {filter !== 'all' && (
              <>
                {' '}· {FILTERS.find((f) => f.key === filter)?.label}
              </>
            )}
          </CountLine>
          {filtered.length === 0 ? (
            <EmptyBox>
              <FaSearchMinus />
              <p>Tidak ada surah yang cocok dengan pencarian Anda.</p>
            </EmptyBox>
          ) : (
            <Grid>
              {filtered.map((s) => (
                <SurahLink key={s.id} to={`/surah/${s.id}`}>
                  <NomorMedali nomor={s.id} ukuran={46} />
                  <SurahInfo>
                    <span className="latin">{s.nameLatin}</span>
                    <span className="arti">{s.translationId}</span>
                    <span className="meta">
                      <span>{s.versesCount} ayat</span>
                      <span className="tempat">{tempatLabel(s.revelationPlace)}</span>
                    </span>
                  </SurahInfo>
                  <ArabicName dir="rtl" lang="ar">
                    {s.nameArabic}
                  </ArabicName>
                </SurahLink>
              ))}
            </Grid>
          )}
        </>
      )}
    </Page>
  );
}
