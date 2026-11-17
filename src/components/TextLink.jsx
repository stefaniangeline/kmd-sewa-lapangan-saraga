import { ArrowUpRight } from './Icons.jsx'

export default function TextLink({ children, onClick, tone = 'dark', className = '' }) {
  const color = tone === 'lime' ? 'text-dark hover:text-dark/70' : 'text-lime hover:text-lime/80'
  return (
    <button type="button" onClick={onClick} className={`inline-flex min-h-10 items-center gap-1 font-semibold ${color} ${className}`}>
      {children}<ArrowUpRight className="size-[18px]" />
    </button>
  )
}
