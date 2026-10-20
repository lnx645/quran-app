/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiChevronRight } from 'react-icons/fi';
import {
  FaQuran, FaBookOpen, FaHeart, FaMosque, FaVenus, FaCalculator, FaBookReader,
  FaHandPointer, FaCloudSun, FaPrayingHands, FaClipboardCheck, FaCompass,
  FaCalendarAlt, FaListUl, FaBook, FaGraduationCap, FaUniversalAccess,
  FaSearch, FaBookmark, FaBrain, FaPalette, FaTint, FaMoon, FaBroadcastTower, FaMicrophone, FaChild,
  FaBalanceScale, FaKaaba, FaBaby, FaGift, FaHandHoldingHeart, FaTasks, FaMonument,
  FaDownload,
} from 'react-icons/fa';
import Logo from './Logo.jsx';
import { PrimaryButton } from './common.jsx';
import { useInstallPrompt } from '../hooks/useInstallPrompt.js';
import { GirihPattern } from './ornaments/index.js';
import { reduceMotion } from './motion.js';
import { useAkses } from '../a11y/pengaturanStore.js';
import { useBahasa } from '../../app/bahasa.js';

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
    kunciGrup: 'grup.quran',
    items: [
      { to: '/quran', icon: <FaQuran />, kunci: 'menu.quran' },
      { to: '/surah/36', icon: <FaHeart />, kunci: 'menu.yasin' },
      { to: '/surah/18', icon: <FaBookOpen />, kunci: 'menu.kahf' },
      { to: '/surah/67', icon: <FaBookOpen />, kunci: 'menu.mulk' },
      { to: '/surah/55', icon: <FaBookOpen />, kunci: 'menu.rahman' },
      { to: '/cari', icon: <FaSearch />, kunci: 'menu.cari' },
      { to: '/hafalan', icon: <FaBrain />, kunci: 'menu.hafalan' },
      { to: '/bookmark', icon: <FaBookmark />, kunci: 'menu.bookmark' },
      { to: '/panduan-tajwid', icon: <FaPalette />, kunci: 'menu.tajwid' },
      { to: '/indeks-tematik', icon: <FaListUl />, kunci: 'menu.indeks' },
      { to: '/kuis', icon: <FaBrain />, kunci: 'menu.kuis' },
      { to: '/radio', icon: <FaBroadcastTower />, kunci: 'menu.radio' },
      { to: '/tes-baca', icon: <FaMicrophone />, kunci: 'menu.tesBaca' },
      { to: '/anak', icon: <FaChild />, kunci: 'menu.anak' },
    ],
  },
  {
    kunciGrup: 'grup.ibadah',
    items: [
      { to: '/jadwal', icon: <FaMosque />, kunci: 'menu.jadwal' },
      { to: '/tasbih', icon: <FaHandPointer />, kunci: 'menu.tasbih' },
      { to: '/sholawat', icon: <FaHeart />, kunci: 'menu.sholawat' },
      { to: '/dzikir', icon: <FaCloudSun />, kunci: 'menu.dzikir' },
      { to: '/doa', icon: <FaPrayingHands />, kunci: 'menu.doa' },
      { to: '/sholat-tracker', icon: <FaClipboardCheck />, kunci: 'menu.sholatTracker' },
      { to: '/wudhu', icon: <FaTint />, kunci: 'menu.wudhu' },
      { to: '/panduan-sholat', icon: <FaPrayingHands />, kunci: 'menu.panduanSholat' },
      { to: '/sholat-sunnah', icon: <FaMoon />, kunci: 'menu.sholatSunnah' },
      { to: '/dzikir-bada-sholat', icon: <FaCloudSun />, kunci: 'menu.dzikirBada' },
      { to: '/sholat-jenazah', icon: <FaBook />, kunci: 'menu.sholatJenazah' },
      { to: '/tahlil', icon: <FaPrayingHands />, kunci: 'menu.tahlil' },
      { to: '/sholat-id', icon: <FaMoon />, kunci: 'menu.sholatId' },
      { to: '/sholat-musafir', icon: <FaBookOpen />, kunci: 'menu.sholatMusafir' },
      { to: '/sholat-sakit', icon: <FaBook />, kunci: 'menu.sholatSakit' },
      { to: '/qunut', icon: <FaPrayingHands />, kunci: 'menu.qunut' },
      { to: '/panduan-imam', icon: <FaMosque />, kunci: 'menu.imam' },
      { to: '/sujud', icon: <FaBookOpen />, kunci: 'menu.sujud' },
      { to: '/panduan-puasa', icon: <FaBookOpen />, kunci: 'menu.puasa' },
      { to: '/qadha-puasa', icon: <FaClipboardCheck />, kunci: 'menu.qadha' },
      { to: '/ramadhan', icon: <FaMoon />, kunci: 'menu.ramadhan' },
      { to: '/hisnul-muslim', icon: <FaPrayingHands />, kunci: 'menu.hisnul' },
      { to: '/itikaf', icon: <FaMoon />, kunci: 'menu.itikaf' },
      { to: '/ruqyah', icon: <FaBookOpen />, kunci: 'menu.ruqyah' },
      { to: '/mutabaah', icon: <FaTasks />, kunci: 'menu.mutabaah' },
    ],
  },
  {
    kunciGrup: 'grup.panduan',
    items: [
      { to: '/waris', icon: <FaBalanceScale />, kunci: 'menu.waris' },
      { to: '/fidyah', icon: <FaHandHoldingHeart />, kunci: 'menu.fidyah' },
      { to: '/kafarat', icon: <FaBookOpen />, kunci: 'menu.kafarat' },
      { to: '/haji-umrah', icon: <FaKaaba />, kunci: 'menu.haji' },
      { to: '/panduan-jenazah', icon: <FaBook />, kunci: 'menu.panduanJenazah' },
      { to: '/ziarah', icon: <FaMonument />, kunci: 'menu.ziarah' },
      { to: '/aqiqah-kurban', icon: <FaGift />, kunci: 'menu.aqiqah' },
      { to: '/nama-bayi', icon: <FaBaby />, kunci: 'menu.namaBayi' },
      { to: '/masjid-terdekat', icon: <FaMosque />, kunci: 'menu.masjid' },
      { to: '/panduan-nikah', icon: <FaHeart />, kunci: 'menu.nikah' },
      { to: '/fikih-keluarga', icon: <FaBook />, kunci: 'menu.fikihKeluarga' },
      { to: '/muamalah', icon: <FaBalanceScale />, kunci: 'menu.muamalah' },
      { to: '/wakaf-wasiat', icon: <FaHandHoldingHeart />, kunci: 'menu.wakaf' },
      { to: '/halal', icon: <FaBookOpen />, kunci: 'menu.halal' },
      { to: '/khutbah', icon: <FaBook />, kunci: 'menu.khutbah' },
    ],
  },
  {
    kunciGrup: 'grup.belajar',
    items: [
      { to: '/iqro', icon: <FaGraduationCap />, kunci: 'menu.iqro' },
      { to: '/kisah', icon: <FaBook />, kunci: 'menu.kisah' },
      { to: '/asmaul-husna', icon: <FaListUl />, kunci: 'menu.asmaul' },
      { to: '/hadits', icon: <FaBook />, kunci: 'menu.hadits' },
      { to: '/sirah', icon: <FaBookOpen />, kunci: 'menu.sirah' },
      { to: '/riyadhus', icon: <FaBook />, kunci: 'menu.riyadhus' },
      { to: '/peristiwa', icon: <FaCalendarAlt />, kunci: 'menu.peristiwa' },
    ],
  },
  {
    kunciGrup: 'grup.muslimah',
    items: [
      { to: '/muslimah', icon: <FaVenus />, kunci: 'menu.muslimah' },
      { to: '/muslimah/kalkulator', icon: <FaClipboardCheck />, kunci: 'menu.haid' },
      { to: '/muslimah/mandi-wajib', icon: <FaHandPointer />, kunci: 'menu.mandiWajib' },
      { to: '/muslimah/doa', icon: <FaPrayingHands />, kunci: 'menu.doaWanita' },
      { to: '/muslimah/fikih', icon: <FaBook />, kunci: 'menu.fikihWanita' },
    ],
  },
  {
    kunciGrup: 'grup.utilitas',
    items: [
      { to: '/zakat', icon: <FaCalculator />, kunci: 'menu.zakat' },
      { to: '/sedekah', icon: <FaHandHoldingHeart />, kunci: 'menu.sedekah' },
      { to: '/khatam', icon: <FaBookReader />, kunci: 'menu.khatam' },
      { to: '/kiblat', icon: <FaCompass />, kunci: 'menu.kiblat' },
      { to: '/kalender', icon: <FaCalendarAlt />, kunci: 'menu.kalender' },
      { to: '/konverter', icon: <FaCalendarAlt />, kunci: 'menu.konverter' },
      { to: '/statistik', icon: <FaClipboardCheck />, kunci: 'menu.statistik' },
      { to: '/data-progres', icon: <FaTasks />, kunci: 'menu.dataProgres' },
      { to: '/aksesibilitas', icon: <FaUniversalAccess />, kunci: 'menu.aksesibilitas' },
    ],
  },
];

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const { bisaInstall, pasang } = useInstallPrompt();
  const location = useLocation();
  const { pengaturan, ubah } = useAkses();
  const { t } = useBahasa();
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
    const tombolMenu = menuBtnRef.current;
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
      tombolMenu?.focus({ preventScroll: true });
    };
  }, [open ]);

  return (
    <>
      <Bar>
        <div css={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <GirihPattern opacity={0.1} />
        </div>
        <Inner>
          <Brand to="/" aria-label={`Noor — ${t('umum.beranda')}`}>
            <Logo size={38} />
            <Wordmark>
              Noor
              <span className="tag">{t('umum.tagline')}</span>
            </Wordmark>
          </Brand>
          <IconBtn
            type="button"
            ref={menuBtnRef}
            onClick={() => setOpen(true)}
            aria-label={t('umum.bukaMenu')}
            aria-expanded={open}
            aria-controls="panel-navigasi"
          >
            <FiMenu />
          </IconBtn>
        </Inner>
        <GoldStrip />
      </Bar>

      <Overlay $open={open} onClick={() => setOpen(false)} aria-hidden="true" />
      <Panel $open={open} aria-hidden={!open} aria-label={t('umum.menuNavigasi')} id="panel-navigasi" ref={panelRef}>
        <PanelHead>
          <div css={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <GirihPattern opacity={0.1} />
          </div>
          <Logo size={42} />
          <PanelTitle>
            Noor
            <span className="sub">{t('umum.tagline')}</span>
          </PanelTitle>
          <CloseBtn ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label={t('umum.tutupMenu')}>
            <FiX />
          </CloseBtn>
        </PanelHead>
        <GoldStrip />
        <PanelNav aria-label={t('umum.menuUtama')}>
          <Item to="/" end onClick={() => setOpen(false)}>
            <ItemIcon>
              <FiHome />
            </ItemIcon>
            {t('umum.beranda')}
            <FiChevronRight className="chev" />
          </Item>
          {bisaInstall && (
            <PrimaryButton
              type="button"
              css={{ width: '100%', marginTop: 10 }}
              onClick={async () => {
                await pasang();
                setOpen(false);
              }}
            >
              <FaDownload aria-hidden="true" /> {t('umum.install')}
            </PrimaryButton>
          )}
          {MENU.map((grup) => (
            <div key={grup.kunciGrup}>
              <GroupLabel>{t(grup.kunciGrup)}</GroupLabel>
              {grup.items.map((item) => (
                <Item key={item.to} to={item.to} onClick={() => setOpen(false)}>
                  <ItemIcon>{item.icon}</ItemIcon>
                  {t(item.kunci)}
                  <FiChevronRight className="chev" />
                </Item>
              ))}
            </div>
          ))}
          <div>
            <GroupLabel>{t('umum.tampilan')}</GroupLabel>
            <SegTema role="group" aria-label={t('umum.modeTemaAria')}>
              {[
                ['ikut', 'umum.modeIkut'],
                ['terang', 'umum.modeTerang'],
                ['gelap', 'umum.modeGelap'],
                ['kontras', 'umum.modeKontras'],
              ].map(([nilai, kunciLabel]) => (
                <SegBtn
                  key={nilai}
                  type="button"
                  aktif={pengaturan.modeTema === nilai}
                  aria-pressed={pengaturan.modeTema === nilai}
                  onClick={() => ubah({ modeTema: nilai })}
                >
                  {t(kunciLabel)}
                </SegBtn>
              ))}
            </SegTema>
          </div>
        </PanelNav>
        <PanelFoot>{t('umum.footerDrawer')}</PanelFoot>
      </Panel>
    </>
  );
}
