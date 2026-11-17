import { Info } from './Icons.jsx'

export default function Toast({ message }) {
  if (!message) return null
  return (
    <div role="status" aria-live="polite" className="flex max-w-[min(92vw,32rem)] items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-[0_24px_48px_-12px_rgba(5,31,51,.35)]">
      <Info className="size-5 shrink-0 text-brand" />
      <p>{message}</p>
    </div>
  )
}
