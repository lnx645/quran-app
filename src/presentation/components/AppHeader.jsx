/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiChevronRight } from 'react-icons/fi';
import {
  FaQuran, FaBookOpen, FaHeart, FaMosque, FaVenus, FaCalculator, FaBookReader,
  FaHandPointer, FaCloudSun, FaPrayingHands, FaClipboardCheck, FaCompass,
  FaCalendarAlt, FaListUl, FaBook, FaGraduationCap,
} from 'react-icons/fa';
import Logo from './Logo.jsx';
import { GirihPattern } from './ornaments/index.js';
import { reduceMotion } from './motion.js';
import { useAkses } from '../a11y/pengaturanStore.js';

// ===== Header ramping (~60px) =====
// Kiri: logo + "Noor" satu baris. Kanan: tombol hamburger saja.
// Semua navigasi pindah ke drawer geser (kanan).
const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${({ theme }) => theme.gradients.heroGlow}, ${({ theme }) => theme.gradients.header};
  color: #fff;
  box-shadow: 0 1px 3px rgba(4, 37, 31, 0.22), 0 6px 18px rgba(4, 37, 31, 0.28);
`;

const Inner = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 9px 14px;
  min-height: 58px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: #fff;
  line-height: 1;
  white-space: nowrap;
  .tag {
    display: block;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 8.5px;
    font-weight: 600;
    letter-spacing: 2.2px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldLight};
    margin-top: 3px;
  }
`;

// Pita emas SANGAT tipis (garis bawah header).
const GoldStrip = styled.div`
  height: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.goldDeep},
    ${({ theme }) => theme.colors.goldLight} 30%,
    ${({ theme }) => theme.colors.gold} 55%,
    ${({ theme }) => theme.colors.goldLight} 80%,
    ${({ theme }) => theme.colors.goldDeep}
  );
`;

const IconBtn = styled.button`
  margin-left: auto;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(231, 198, 90, 0.5);
  background: rgba(255, 255, 255, 0.07);
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 20px;
  transition: background ${({ theme }) => theme.anim.fast} ease, transform ${({ theme }) => theme.anim.fast} ease;
  &:hover {
    background: rgba(231, 198, 90, 0.2);
  }
  &:active {
    transform: scale(0.94);
  }
  ${reduceMotion}
`;

// ===== Drawer navigasi =====
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(4, 37, 31, 0.55);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity ${({ theme }) => theme.anim.med} ease,
    visibility 0s linear ${({ $open, theme }) => ($open ? '0s' : theme.anim.med)};
  ${reduceMotion}
`;

const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  height: 100dvh;
  width: min(320px, 88vw);
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: ${({ theme }) => theme.shadows.lift};
  transform: translateX(${({ $open }) => ($open ? '0' : '105%')});
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: transform ${({ theme }) => theme.anim.slow} ${({ theme }) => theme.anim.ease},
    visibility 0s linear ${({ $open, theme }) => ($open ? '0s' : theme.anim.slow)};
  display: flex;
  flex-direction: column;
  ${reduceMotion}
`;

const PanelHead = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.gradients.heroGlow}, ${({ theme }) => theme.gradients.header};
  color: #fff;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
`;

const PanelTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 19px;
  font-weight: 700;
  line-height: 1.1;
  .sub {
    display: block;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldLight};
    margin-top: 3px;
  }
`;

const CloseBtn = styled.button`
  margin-left: auto;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  border: 1px solid rgba(231, 198, 90, 0.5);
  background: rgba(255, 255, 255, 0.07);
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 18px;
  &:active {
    transform: scale(0.94);
  }
  ${reduceMotion}
`;

const PanelNav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 12px 12px 20px;
  overscroll-behavior: contain;
`;

const GroupLabel = styled.div`
  font-size: ${({ theme }) => theme.type.overline.size}px;
  font-weight: ${({ theme }) => theme.type.overline.weight};
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDeep};
  margin: 18px 6px 8px;
  padding-left: 9px;
  border-left: 3px solid ${({ theme }) => theme.colors.gold};
  &:first-of-type {
    margin-top: 8px;
  }
`;

const ItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.gradients.header};
  color: ${({ theme }) => theme.colors.goldLight};
  font-size: 15px;
  box-shadow: inset 0 0 0 1px rgba(231, 198, 90, 0.4);
`;

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 9px 10px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  transition: background ${({ theme }) => theme.anim.fast} ease;
  .chev {
    margin-left: auto;
    color: ${({ theme }) => theme.colors.faint};
    font-size: 15px;
    flex-shrink: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
  &.active {
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    ${ItemIcon} {
      background: ${({ theme }) => theme.gradients.gold};
      color: ${({ theme }) => theme.colors.primaryDeep};
      box-shadow: none;
    }
  }
`;

const PanelFoot = styled.div`
  flex-shrink: 0;
  padding: 10px 16px calc(12px + env(safe-area-inset-bottom));
  text-align: center;
  font-size: 11px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.faint};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

// Pilihan mode tema di drawer: Sistem / Terang / Gelap / Kontras (≥44px).
const SegTema = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 0 2px;
`;

const SegBtn = styled.button`
  min-height: 44px;
  padding: 8px 6px;
  border-radius: 12px;
  border: 1.5px solid
    ${({ theme, aktif }) => (aktif ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, aktif }) => (aktif ? theme.colors.primarySoft : theme.colors.surface)};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 700;
`;

// Daftar menu drawer — mengikuti rute router.jsx & seksi Home.
const MENU = [
  {
    nama: "Al-Qur'an",
    items: [
      { to: '/quran', icon: <FaQuran />, label: "Al-Qur'an — 114 Surah" },
      { to: '/surah/36', icon: <FaHeart />, label: 'Surah Ya-Sin' },
      { to: '/surah/18', icon: <FaBookOpen />, label: 'Surah Al-Kahf' },
      { to: '/surah/67', icon: <FaBookOpen />, label: 'Surah Al-Mulk' },
      { to: '/surah/55', icon: <FaBookOpen />, label: 'Surah Ar-Rahman' },
    ],
  },
  {
    nama: 'Ibadah Harian',
    items: [
      { to: '/jadwal', icon: <FaMosque />, label: 'Jadwal Sholat' },
      { to: '/tasbih', icon: <FaHandPointer />, label: 'Tasbih Digital' },
      { to: '/dzikir', icon: <FaCloudSun />, label: 'Dzikir Pagi & Petang' },
      { to: '/doa', icon: <FaPrayingHands />, label: 'Doa Harian' },
      { to: '/sholat-tracker', icon: <FaClipboardCheck />, label: 'Sholat Tracker' },
    ],
  },
  {
    nama: 'Belajar & Kisah',
    items: [
      { to: '/iqro', icon: <FaGraduationCap />, label: 'Belajar Iqro' },
      { to: '/kisah', icon: <FaBook />, label: 'Kisah 25 Nabi' },
      { to: '/asmaul-husna', icon: <FaListUl />, label: 'Asmaul Husna' },
    ],
  },
  {
    nama: 'Muslimah',
    items: [
      { to: '/muslimah', icon: <FaVenus />, label: 'Ruang Muslimah' },
      { to: '/muslimah/kalkulator', icon: <FaClipboardCheck />, label: 'Kalkulator Haid' },
      { to: '/muslimah/mandi-wajib', icon: <FaHandPointer />, label: 'Panduan Mandi Wajib' },
      { to: '/muslimah/doa', icon: <FaPrayingHands />, label: 'Doa Khusus Wanita' },
      { to: '/muslimah/fikih', icon: <FaBook />, label: 'Fikih Wanita' },
    ],
  },
  {
    nama: 'Utilitas',
    items: [
      { to: '/zakat', icon: <FaCalculator />, label: 'Kalkulator Zakat' },
      { to: '/khatam', icon: <FaBookReader />, label: 'Khatam Tracker' },
      { to: '/kiblat', icon: <FaCompass />, label: 'Arah Kiblat' },
      { to: '/kalender', icon: <FaCalendarAlt />, label: 'Kalender Hijriah' },
    ],
  },
];

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { pengaturan, ubah } = useAkses();
  const closeRef = useRef(null);
  const menuBtnRef = useRef(null);
  const panelRef = useRef(null);

  // Tutup drawer setiap pindah halaman (pola sesuaikan-state-saat-render).
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setOpen(false);
  }

  // Kunci scroll body + Escape + jebakan fokus sederhana + fokus kembali ke
  // tombol menu saat drawer tertutup.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && panelRef.current) {
        const fokusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled])',
        );
        if (!fokusable.length) return;
        const pertama = fokusable[0];
        const terakhir = fokusable[fokusable.length - 1];
        if (e.shiftKey && document.activeElement === pertama) {
          e.preventDefault();
          terakhir.focus();
        } else if (!e.shiftKey && document.activeElement === terakhir) {
          e.preventDefault();
          pertama.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      menuBtnRef.current?.focus({ preventScroll: true });
    };
  }, [open ]);

  return (
    <>
      <Bar>
        <div css={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <GirihPattern opacity={0.1} />
        </div>
        <Inner>
          <Brand to="/" aria-label="Noor — Beranda">
            <Logo size={38} />
            <Wordmark>
              Noor
              <span className="tag">Al-Qur&apos;an &amp; Ibadah</span>
            </Wordmark>
          </Brand>
          <IconBtn
            type="button"
            ref={menuBtnRef}
            onClick={() => setOpen(true)}
            aria-label="Buka menu navigasi"
            aria-expanded={open}
            aria-controls="panel-navigasi"
          >
            <FiMenu />
          </IconBtn>
        </Inner>
        <GoldStrip />
      </Bar>

      <Overlay $open={open} onClick={() => setOpen(false)} aria-hidden="true" />
      <Panel $open={open} aria-hidden={!open} aria-label="Menu navigasi" id="panel-navigasi" ref={panelRef}>
        <PanelHead>
          <div css={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <GirihPattern opacity={0.1} />
          </div>
          <Logo size={42} />
          <PanelTitle>
            Noor
            <span className="sub">Al-Qur&apos;an &amp; Ibadah</span>
          </PanelTitle>
          <CloseBtn ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Tutup menu">
            <FiX />
          </CloseBtn>
        </PanelHead>
        <GoldStrip />
        <PanelNav aria-label="Menu utama">
          <Item to="/" end onClick={() => setOpen(false)}>
            <ItemIcon>
              <FiHome />
            </ItemIcon>
            Beranda
            <FiChevronRight className="chev" />
          </Item>
          {MENU.map((grup) => (
            <div key={grup.nama}>
              <GroupLabel>{grup.nama}</GroupLabel>
              {grup.items.map((item) => (
                <Item key={item.to} to={item.to} onClick={() => setOpen(false)}>
                  <ItemIcon>{item.icon}</ItemIcon>
                  {item.label}
                  <FiChevronRight className="chev" />
                </Item>
              ))}
            </div>
          ))}
          <div>
            <GroupLabel>Tampilan</GroupLabel>
            <SegTema role="group" aria-label="Mode tema tampilan">
              {[
                ['ikut', 'Ikut Sistem'],
                ['terang', 'Terang'],
                ['gelap', 'Mode Gelap'],
                ['kontras', 'Kontras Tinggi'],
              ].map(([nilai, label]) => (
                <SegBtn
                  key={nilai}
                  type="button"
                  aktif={pengaturan.modeTema === nilai}
                  aria-pressed={pengaturan.modeTema === nilai}
                  onClick={() => ubah({ modeTema: nilai })}
                >
                  {label}
                </SegBtn>
              ))}
            </SegTema>
          </div>
        </PanelNav>
        <PanelFoot>Noor — menemani ibadah harian</PanelFoot>
      </Panel>
    </>
  );
}
