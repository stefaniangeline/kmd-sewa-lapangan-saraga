import { Info } from './Icons.jsx'

export default function RuleItem({ title, children }) {
  return (
    <li className="flex gap-3 rounded-xl border border-white/10 bg-dark p-3 text-sm">
      <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-lime"><Info className="size-5" /></span>
      <span className="grid gap-1"><strong className="font-semibold text-white">{title}</strong><span className="text-muted">{children}</span></span>
    </li>
  )
}
