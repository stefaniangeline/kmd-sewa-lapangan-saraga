import { Check } from './Icons.jsx'

const STEPS = ['Pilih jadwal', 'Tinjau', 'Pembayaran']

export default function Stepper({ current, onGo }) {
  return (
    <ol aria-label="Langkah pemesanan" className="mx-auto flex w-full max-w-6xl items-center rounded-full border border-white/30 bg-white/15 px-4 py-2.5 text-white backdrop-blur-md sm:px-8">
      {STEPS.map((label, i) => {
        const done = i < current
        const cur = i === current
        return (
          <li key={label} className="flex min-w-0 flex-1 items-center last:flex-none" aria-current={cur ? 'step' : undefined}>
            <button
              type="button"
              disabled={!done || !onGo}
              onClick={() => onGo(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full text-xs ${cur ? 'font-semibold text-white' : 'text-white/75'} ${done && onGo ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span
                className={`grid size-8 place-items-center rounded-full border text-xs font-medium ${
                  cur ? 'border-lime bg-lime text-ink ring-4 ring-lime/30' : done ? 'border-lime bg-transparent text-lime' : 'border-white/50 bg-transparent text-white/75'
                }`}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className="hidden whitespace-nowrap sm:inline">{label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className={`mx-2 h-0.5 min-w-3 flex-1 rounded ${done ? 'bg-lime' : 'bg-white/30'} sm:mx-4`} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
