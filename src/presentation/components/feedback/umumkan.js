/**
 * umumkan(pesan, prioritas) — umumkan pesan status ke screen reader lewat
 * wilayah live global (<LiveRegion/> yang dipasang di App).
 * prioritas: 'sopan' (aria-live polite, default) | 'tegas' (assertive).
 * Aman dipanggil dari mana saja (event, efek); tanpa provider React.
 */
export function umumkan(pesan, prioritas = 'sopan') {
  if (typeof window === 'undefined' || !pesan) return;
  window.dispatchEvent(
    new CustomEvent('noor-umumkan', { detail: { pesan: String(pesan), prioritas } }),
  );
}
