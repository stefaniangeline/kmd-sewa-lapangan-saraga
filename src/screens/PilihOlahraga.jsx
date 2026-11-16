import { useState } from 'react'
import { SPORTS, RULES, CONTACT, rupiah } from '../data.js'
import Photo from '../components/Photo.jsx'
import Button from '../components/Button.jsx'
import Dialog from '../components/Dialog.jsx'
import { Info, Arrow } from '../components/Icons.jsx'

export default function PilihOlahraga({ onPick }) {
  const [rulesOpen, setRulesOpen] = useState(false)

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <section className="grid items-center gap-8 py-8 md:grid-cols-2">
        <div className="grid gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Sewa Lapangan</h1>
          <p className="max-w-[46ch] text-lg text-muted">
            Pilih olahraga, lihat jadwal dan harga per jam sebelum memesan.
          </p>
          <ul className="flex flex-wrap gap-2 text-sm font-medium">
            {['4 olahraga', 'Harga terlihat di jadwal', 'Aturan dibaca sebelum bayar'].map((t) => (
              <li key={t} className="rounded-full bg-lime-soft px-3 py-1">{t}</li>
            ))}
          </ul>
        </div>
        <Photo src="hero.jpg" label="lapangan SARAGA" className="aspect-video w-full rounded-2xl" />
      </section>

      <section aria-labelledby="pilih-olahraga">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 id="pilih-olahraga" className="text-xl font-bold">Pilih olahraga</h2>
          <span className="text-sm text-muted">{SPORTS.length} pilihan</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPORTS.map((s) => (
            <li key={s.id} className="grid content-start gap-3 rounded-2xl border border-line bg-white p-3">
              <Photo src={s.foto} label={s.nama} className="aspect-[4/3] w-full rounded-xl" />
              <div className="grid gap-0.5 px-1">
                <h3 className="text-lg font-bold">{s.nama}</h3>
                <p className="text-sm text-muted">{s.ringkas}</p>
                <p className="text-sm font-semibold">
                  {s.harga ? <>Mulai {rupiah(s.harga)} <span className="font-normal text-muted">/ jam</span></> : <span className="font-normal text-muted">Harga menyusul</span>}
                </p>
              </div>
              <Button onClick={() => onPick(s)} className="w-full">
                Lihat jadwal <Arrow className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm text-muted">
        <Info className="mt-0.5 size-5 shrink-0 text-brand" />
        <p>
          Penyewaan lapangan tidak digunakan untuk event olahraga. Untuk event, konfirmasi dulu ke Bagian Pelayanan.{' '}
          <button type="button" onClick={() => setRulesOpen(true)} className="font-semibold text-brand underline underline-offset-4">
            Baca aturan lengkap
          </button>
        </p>
      </div>
      <p className="mt-4 text-xs text-muted">Data contoh. Konsep desain mahasiswa, bukan situs resmi ITB atau SARAGA.</p>

      <Dialog
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        title="Aturan sewa lapangan"
        actions={<Button onClick={() => setRulesOpen(false)}>Mengerti</Button>}
      >
        <ul className="grid list-disc gap-2 pl-5">
          {RULES.map((r) => <li key={r}>{r}</li>)}
        </ul>
        <p>{CONTACT}</p>
      </Dialog>
    </main>
  )
}
