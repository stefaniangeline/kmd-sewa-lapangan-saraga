import { USER_PROFILE } from '../data.js'

const NAV = ['Beranda', 'Beli Tiket', 'Paket Langganan', 'Sewa Lapangan']

export default function Header({ onHome }) {
  return (
    <header className="relative z-20 border-b border-white/10 bg-dark/20 text-white backdrop-blur-sm">
      <div className="mx-auto flex h-[88px] max-w-6xl items-center gap-5 px-4 sm:px-6">
        <button type="button" onClick={onHome} className="flex items-center gap-2.5 rounded-md">
          <img src={`${import.meta.env.BASE_URL}images/saraga-logo.svg`} alt="Logo SARAGA" className="size-12 object-contain" />
          <span className="font-bold tracking-tight text-white">SARAGA</span>
        </button>
        <nav aria-label="Menu utama" className="hidden flex-1 gap-7 pl-6 text-xs text-white/70 lg:flex lg:text-sm">
          {NAV.map((n) => {
            const on = n === 'Sewa Lapangan'
            return <span key={n} aria-current={on ? 'page' : undefined} className={on ? 'border-b-2 border-lime pb-1 font-semibold text-white' : 'pb-1'}>{n}</span>
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 rounded-full border border-white/25 bg-dark/35 py-1 pl-1 pr-3 text-white/90 backdrop-blur" aria-label={`Profil ${USER_PROFILE.name}`}>
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-lime font-bold text-dark">{USER_PROFILE.initials}</span>
          <span className="text-xs">Hi, <strong className="font-bold text-white">{USER_PROFILE.name}</strong></span>
        </div>
      </div>
    </header>
  )
}
