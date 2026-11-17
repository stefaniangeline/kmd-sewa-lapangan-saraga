import { Check, Lock, Clock } from './Icons.jsx'

const styles = {
  available: 'bg-white text-dark',
  selected: 'bg-lime text-dark',
  booked: 'bg-brand text-white',
}

export default function LegendItem({ status, label }) {
  const icon = status === 'selected' ? <Check className="size-2.5" /> : status === 'booked' ? <Lock className="size-2.5" /> : status === 'passed' ? <Clock className="size-3.5 text-white/60" /> : null
  if (status === 'passed') return <li className="flex items-center gap-1.5 text-xs text-white/75">{icon}{label}</li>
  return (
    <li className="flex items-center gap-1.5 text-xs text-white/75">
      <i aria-hidden="true" className={`grid size-3.5 place-items-center rounded-[3px] ${styles[status]}`}>{icon}</i>{label}
    </li>
  )
}
