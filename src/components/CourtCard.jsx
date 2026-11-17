import Photo from './Photo.jsx'
import { Check } from './Icons.jsx'

export default function CourtCard({ court, selected, available, onClick }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick}
      className={`grid w-full gap-3 rounded-2xl border p-3 text-left transition-colors ${selected ? 'border-2 border-lime bg-brand/60' : 'border-white/20 bg-dark-raised hover:border-white/50'}`}>
      <Photo src={court.foto} label={court.nama} className="h-32 w-full rounded-xl" />
      <span className="flex w-full items-center justify-between gap-2 px-1 font-bold">
        {court.nama}
        {selected && <Check className="size-5 shrink-0 text-lime" />}
      </span>
      <span className="px-1 pb-1 text-xs text-muted">
        {available} jam tersedia
        <br />
        Untuk: {court.untuk.join(' atau ')}
      </span>
    </button>
  )
}
