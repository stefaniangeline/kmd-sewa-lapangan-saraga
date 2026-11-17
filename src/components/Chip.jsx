const tones = {
  glass: 'border border-white/40 bg-white/15 text-white backdrop-blur',
  lime: 'bg-lime text-dark',
  dark: 'bg-dark text-white',
  soft: 'bg-brand-soft text-white',
}

export default function Chip({ children, tone = 'glass', className = '' }) {
  return <span className={`inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-bold ${tones[tone]} ${className}`}>{children}</span>
}
