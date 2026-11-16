import { Check } from './Icons.jsx'

const STEPS = ['Pilih olahraga', 'Pilih jadwal', 'Tinjau']

export default function Stepper({ current, onGo }) {
  return (
    <ol aria-label="Langkah pemesanan" className="mx-auto flex max-w-6xl items-center px-4 pt-6 sm:px-6">
      {STEPS.map((label, i) => {
        const done = i < current
        const cur = i === current
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none" aria-current={cur ? 'step' : undefined}>
            <button
              type="button"
              disabled={!done}
              onClick={() => onGo(i)}
              className={`flex items-center gap-2 rounded-full text-sm ${cur ? 'font-bold text-ink' : 'text-muted'} ${done ? 'cursor-pointer hover:text-ink' : 'cursor-default'}`}
            >
              <span
                className={`grid size-7 place-items-center rounded-full border-2 text-xs font-bold ${
                  cur ? 'border-lime bg-lime text-ink' : done ? 'border-brand bg-brand text-white' : 'border-line bg-white'
                }`}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className={cur ? 'inline' : 'hidden sm:inline'}>{label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className={`mx-3 h-0.5 min-w-4 flex-1 rounded ${done ? 'bg-brand' : 'bg-line'}`} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
