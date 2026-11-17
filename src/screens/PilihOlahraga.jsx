import { useState } from 'react'
import { SPORTS, RULES, CONTACT } from '../data.js'
import Button from '../components/Button.jsx'
import Dialog from '../components/Dialog.jsx'
import Header from '../components/Header.jsx'
import InfoBar from '../components/InfoBar.jsx'
import { Arrow } from '../components/Icons.jsx'
import SportCard from '../components/SportCard.jsx'

const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`

export default function PilihOlahraga({ onPick, onHome }) {
  const [rulesOpen, setRulesOpen] = useState(false)

  return (
    <main className="pb-16">
      <section className="relative isolate min-h-[610px] overflow-hidden sm:min-h-[690px]">
        <img src={asset('saraga-home-hero.png')} alt="Lapangan olahraga SARAGA" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/75 to-dark/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-dark/25" />
        <div className="relative z-10">
          <Header onHome={onHome} />
          <div className="mx-auto flex min-h-[490px] max-w-6xl items-center px-4 py-16 sm:min-h-[540px] sm:px-6">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-lime sm:text-base">SARAGA ITB</p>
              <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                <span className="block text-white">Sewa</span>
                <span className="block text-white">Lapangan</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-xl">
                Pilih olahraga, lihat jadwal dan harga per jam sebelum memesan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button big onClick={() => document.getElementById('pilih-olahraga')?.scrollIntoView({ behavior: 'smooth' })}>
                  Pilih olahraga <Arrow className="size-4" />
                </Button>
                <Button big variant="secondary" onClick={() => setRulesOpen(true)}>Baca aturan</Button>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-10 bg-lime [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
      </section>

      <section id="pilih-olahraga" aria-labelledby="pilih-olahraga-title" className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime">Pilih cabang olahraga</p>
            <h2 id="pilih-olahraga-title" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Pilih olahraga</h2>
          </div>
          <span className="text-sm text-muted">{SPORTS.length} pilihan olahraga</span>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPORTS.map((sport, index) => <SportCard key={sport.id} sport={sport} index={index} onPick={onPick} />)}
        </ul>

        <div className="mt-8"><InfoBar onOpen={() => setRulesOpen(true)} /></div>
        <p className="mt-4 text-xs text-muted">Data contoh. Konsep desain mahasiswa, bukan situs resmi ITB atau SARAGA.</p>
      </section>

      <Dialog open={rulesOpen} onClose={() => setRulesOpen(false)} title="Aturan sewa lapangan" actions={<Button onClick={() => setRulesOpen(false)}>Mengerti</Button>}>
        <ul className="grid list-disc gap-2 pl-5">{RULES.map((r) => <li key={r}>{r}</li>)}</ul>
        <p>{CONTACT}</p>
      </Dialog>
    </main>
  )
}
