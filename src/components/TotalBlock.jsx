export default function TotalBlock({ amount, hours }) {
  return (
    <section className="grid w-full min-w-0 gap-1 overflow-hidden rounded-3xl bg-lime px-5 py-5 text-dark sm:px-6">
      <span className="text-sm font-semibold">Total pembayaran</span>
      <strong className="min-w-0 break-words text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight">{amount}</strong>
      <span className="text-xs">{hours == null ? 'Pilih jam untuk melihat total' : `${hours} jam · biaya simulasi`}</span>
    </section>
  )
}
