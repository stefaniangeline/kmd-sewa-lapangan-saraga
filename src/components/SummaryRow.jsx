export default function SummaryRow({ label, value }) {
  return (
    <div className="flex min-w-0 justify-between gap-3 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="min-w-0 max-w-[62%] break-words text-right font-semibold">{value}</dd>
    </div>
  )
}
