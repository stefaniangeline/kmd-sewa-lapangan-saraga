export default function TotalBlock({ amount, hours }) {
  return (
    <section className="grid w-full min-w-0 gap-1 overflow-hidden rounded-3xl border border-lime/25 border-l-4 bg-dark px-5 py-5 text-white sm:px-6">
      <span className="text-sm font-semibold text-muted">Total pembayaran</span>
      <strong className="min-w-0 break-words text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight">{amount}</strong>
      <span className="text-xs text-muted">{hours == null ? 'Pilih jam untuk melihat total' : `${hours} jam · biaya simulasi`}</span>
    </section>
  )
}
