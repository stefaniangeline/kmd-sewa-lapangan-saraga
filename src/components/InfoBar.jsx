import { Info } from './Icons.jsx'
import TextLink from './TextLink.jsx'

export default function InfoBar({ onOpen }) {
  return (
    <aside className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-2 rounded-2xl bg-lime px-4 py-4 text-sm font-semibold text-dark sm:flex sm:items-center sm:gap-4 sm:px-6">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-dark text-lime"><Info className="size-5" /></span>
      <p className="min-w-0 sm:flex-1">Penyewaan lapangan tidak digunakan untuk event olahraga. Untuk event, konfirmasi dulu ke Bagian Pelayanan.</p>
      <TextLink tone="lime" onClick={onOpen} className="col-start-2 justify-self-start whitespace-nowrap rounded-full px-2 hover:bg-dark/10 sm:ml-auto">Baca aturan lengkap</TextLink>
    </aside>
  )
}
