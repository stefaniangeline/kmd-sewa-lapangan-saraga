import Photo from './Photo.jsx'
import Button from './Button.jsx'
import Chip from './Chip.jsx'
import Sticker from './Sticker.jsx'
import { Arrow } from './Icons.jsx'

export default function SportCard({ sport, index, onPick }) {
  const available = sport.courts.length > 0
  return (
    <li className="group relative overflow-hidden rounded-2xl border border-white/10 bg-dark-raised shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo src={sport.foto} label={sport.nama} className="size-full transition-transform duration-500 group-hover:scale-105" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
        <span className="absolute left-4 top-3 text-5xl font-black text-white/80">0{index + 1}</span>
        <Chip tone={available ? 'lime' : 'glass'} className="absolute right-3 top-3">{available ? 'Tersedia' : 'Segera hadir'}</Chip>
        <div className="absolute inset-x-4 bottom-4">
          <h3 className="text-xl font-extrabold">{sport.nama}</h3>
          <p className="mt-1 text-sm text-white/75">{available ? `${sport.courts.length} lapangan tersedia` : 'Informasi lapangan menyusul'}</p>
        </div>
        {available && sport.harga != null && <Sticker value={`${Math.round(sport.harga / 1000)}rb`} />}
      </div>
      <div className="p-4 pt-0">
        <Button onClick={() => onPick(sport)} className="w-full" disabled={!available}>
          {available ? 'Lihat jadwal' : 'Segera hadir'} <Arrow className="size-4" />
        </Button>
      </div>
    </li>
  )
}
