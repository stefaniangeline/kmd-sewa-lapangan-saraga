const NAV = ['Beranda', 'Beli Tiket', 'Paket Langganan', 'Sewa Lapangan']

export default function Header({ onHome }) {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-3 sm:px-6">
        <button type="button" onClick={onHome} className="flex items-center gap-2.5 rounded-md">
          <span className="grid size-8 place-items-center rounded-lg bg-brand text-sm font-bold text-white" aria-hidden="true">S</span>
          <span className="font-bold tracking-tight">Pesan Tiket</span>
        </button>
        <nav aria-label="Menu utama" className="hidden flex-1 gap-6 text-sm text-muted md:flex">
          {NAV.map((n) => {
            const on = n === 'Sewa Lapangan'
            return (
              <span
                key={n}
                aria-current={on ? 'page' : undefined}
                className={on ? 'border-b-[3px] border-lime pb-0.5 font-semibold text-ink' : ''}
              >
                {n}
              </span>
            )
          })}
        </nav>
        <span className="ml-auto rounded-full border border-line px-3 py-1 text-sm">Hi, Mahasiswa</span>
      </div>
    </header>
  )
}
