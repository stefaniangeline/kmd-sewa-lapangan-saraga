export default function GlassCard({ title, subtitle, className = '' }) {
  return (
    <aside className={`flex items-center rounded-3xl border border-white/35 bg-white/15 px-5 py-4 text-white backdrop-blur-xl ${className}`}>
      <div className="grid gap-1">
        <strong className="text-2xl font-bold leading-9">{title}</strong>
        <span className="text-xs text-white/75">{subtitle}</span>
      </div>
    </aside>
  )
}
