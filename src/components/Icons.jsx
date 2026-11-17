const base = { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const Lock = (p) => (
  <svg {...base} {...p}><rect x="3" y="7" width="10" height="7" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></svg>
)
export const Clock = (p) => (
  <svg {...base} {...p}><circle cx="8" cy="8" r="6" /><path d="M8 4.5V8l2.4 1.6" /></svg>
)
export const Check = (p) => (
  <svg {...base} strokeWidth={2.2} {...p}><path d="M3 8.5l3.2 3.2L13 4.8" /></svg>
)
export const Info = (p) => (
  <svg {...base} {...p}><circle cx="8" cy="8" r="6.2" /><path d="M8 7.2v4M8 4.8v.1" /></svg>
)
export const Left = (p) => (
  <svg {...base} {...p}><path d="M10 3.5L5.5 8 10 12.5" /></svg>
)
export const Right = (p) => (
  <svg {...base} {...p}><path d="M6 3.5L10.5 8 6 12.5" /></svg>
)
export const Arrow = (p) => (
  <svg {...base} {...p}><path d="M3 8h10M9 4l4 4-4 4" /></svg>
)
export const ArrowUpRight = (p) => (
  <svg {...base} {...p}><path d="M5 11L11 5M5 5h6v6" /></svg>
)
export const Calendar = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <rect x="4" y="6" width="16" height="15" rx="2" />
    <path d="M8 3v5M16 3v5M4 10h16M9 14h2v2H9z" />
  </svg>
)
