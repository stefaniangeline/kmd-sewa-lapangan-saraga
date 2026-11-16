import { useMemo } from 'react'
import {
  GROUPS, getDays, slotStatus, priceAt, maxDuration, totalPrice, availableCount, HOURS, rupiah, jam, PRICE_NOTE,
} from '../data.js'
import Photo from '../components/Photo.jsx'
import Button from '../components/Button.jsx'
import { Lock, Clock, Check, Left, Right, Arrow } from '../components/Icons.jsx'

function Slot({ hour, price, status, selected, inRange, onClick }) {
  const base = 'relative grid min-h-16 content-center justify-items-center gap-0.5 rounded-xl border-2 px-2 py-2 text-center text-sm transition-colors'
  const tone =
    selected ? 'border-brand bg-brand text-white ring-4 ring-lime'
    : inRange ? 'border-brand bg-brand-soft text-ink'
    : status === 'dipesan' ? 'hatch border-line text-muted cursor-not-allowed'
    : status === 'lewat' ? 'border-dashed border-line bg-slate-100 text-muted cursor-not-allowed'
    : 'border-line bg-white hover:border-brand'
  return (
    <button
      type="button"
      disabled={status !== 'tersedia'}
      aria-pressed={selected || inRange}
      onClick={onClick}
      className={`${base} ${tone}`}
    >
      <span className="font-bold tabular-nums">{jam(hour)}</span>
      {status === 'tersedia' && <span className={`text-xs tabular-nums ${selected ? 'text-white' : 'text-muted'}`}>{rupiah(price)}</span>}
      {status === 'dipesan' && <span className="flex items-center gap-1 rounded bg-white/90 px-1 text-xs"><Lock className="size-3" />Dipesan</span>}
      {status === 'lewat' && <span className="flex items-center gap-1 text-xs"><Clock className="size-3" />Terlewat</span>}
      {selected && <span className="flex items-center gap-1 rounded bg-lime px-1.5 text-xs font-bold text-ink"><Check className="size-3" />Dipilih</span>}
    </button>
  )
}

function Summary({ sport, days, b, set, total, onNext, canNext }) {
  const court = sport.courts.find((c) => c.id === b.courtId)
  const maxD = b.hour != null ? maxDuration(b.dateIdx, b.courtId, b.hour) : 1
  const rows = [
    ['Lapangan', court ? court.nama : 'Belum dipilih'],
    ['Tanggal', days[b.dateIdx].panjang],
    ['Jam', b.hour != null ? `${jam(b.hour)} sampai ${jam(b.hour + b.duration)}` : 'Belum dipilih'],
  ]
  return (
    <aside aria-label="Ringkasan pilihan" className="grid gap-4 rounded-2xl border border-line bg-white p-4">
      <h3 className="text-base font-bold">Pilihanmu</h3>
      <dl className="grid gap-2.5 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right font-semibold">{v}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted"><label htmlFor="durasi">Durasi</label></dt>
          <dd>
            <select
              id="durasi"
              value={b.duration}
              disabled={b.hour == null}
              onChange={(e) => set({ duration: Number(e.target.value) })}
              className="rounded-lg border border-line bg-white px-2 py-1 text-sm font-semibold disabled:text-muted"
            >
              {Array.from({ length: maxD }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d} jam</option>)}
            </select>
          </dd>
        </div>
      </dl>
      <div className="flex items-baseline justify-between border-t border-line pt-3">
        <span className="text-sm text-muted">Total</span>
        <strong className="rounded-lg bg-lime px-2.5 py-1 text-2xl font-extrabold tabular-nums text-ink">
          {rupiah(total)}
        </strong>
      </div>
      <p className="rounded-lg bg-brand-soft p-2.5 text-xs text-muted">
        Perubahan jadwal dikenai biaya tambahan. Rinciannya ada di langkah Tinjau.
      </p>
      <Button big disabled={!canNext} onClick={onNext}>
        Lanjut ke tinjauan <Arrow className="size-4" />
      </Button>
      {!canNext && <p className="-mt-2 text-center text-xs text-muted">Pilih lapangan dan jam dulu.</p>}
    </aside>
  )
}

export default function PilihJadwal({ sport, booking: b, set, onBack, onNext }) {
  const days = useMemo(() => getDays(7), [])
  const canNext = b.courtId != null && b.hour != null
  const weekend = days[b.dateIdx].weekend
  const total = canNext ? totalPrice(b.hour, b.duration, weekend) : 0

  const pickDate = (i) => set({ dateIdx: i, hour: null, duration: 1 })
  const pickCourt = (id) => set({ courtId: id, hour: null, duration: 1, usage: null })
  const pickHour = (h) => set({ hour: h, duration: 1 })
  const month = days[0].date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:pb-16">
      <div className="relative mt-6 overflow-hidden rounded-2xl">
        <Photo src={sport.foto} label={sport.nama} className="aspect-[21/8] max-h-72 w-full" />
        <div className="absolute bottom-3 left-3 rounded-xl bg-white p-3 shadow">
          <h1 className="text-lg font-extrabold leading-tight">{sport.nama}</h1>
          <p className="text-xs text-muted">
            {sport.courts.length} lapangan ·{' '}
            <button type="button" onClick={onBack} className="font-semibold text-brand underline underline-offset-2">Ubah olahraga</button>
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-9">
          <section aria-labelledby="h-tgl">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 id="h-tgl" className="flex items-center gap-2 text-lg font-bold">
                <span className="grid size-6 place-items-center rounded-full bg-ink text-xs text-white">1</span>Pilih tanggal
              </h2>
              <span className="text-sm text-muted">{month}</span>
            </div>
            <ul className="flex gap-2 overflow-x-auto pb-1">
              {days.map((d) => {
                const on = b.dateIdx === d.idx
                return (
                  <li key={d.idx} className="min-w-[4.25rem] flex-1">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => pickDate(d.idx)}
                      className={`grid w-full justify-items-center rounded-xl border-2 py-2 ${on ? 'border-brand bg-brand text-white' : 'border-line bg-white hover:border-brand'}`}
                    >
                      <span className="text-xs">{d.hari}</span>
                      <span className="text-xl font-extrabold tabular-nums">{d.tgl}</span>
                      <span className={`rounded px-1 text-[0.65rem] font-bold ${d.idx === 0 ? (on ? 'bg-lime text-ink' : 'bg-lime-soft text-ink') : 'invisible'}`}>Hari ini</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <section aria-labelledby="h-lap">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 id="h-lap" className="flex items-center gap-2 text-lg font-bold">
                <span className="grid size-6 place-items-center rounded-full bg-ink text-xs text-white">2</span>Pilih lapangan
              </h2>
              <span className="hidden text-sm text-muted sm:inline">Jam tersedia pada tanggal terpilih</span>
            </div>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {sport.courts.map((c) => {
                const on = b.courtId === c.id
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => pickCourt(c.id)}
                      className={`grid w-full gap-1.5 rounded-xl border-2 bg-white p-2 text-left ${on ? 'border-brand ring-4 ring-lime' : 'border-line hover:border-brand'}`}
                    >
                      <Photo src={c.foto} label={c.nama} className="aspect-[4/3] w-full rounded-lg" />
                      <span className="flex items-center justify-between gap-1 px-1 font-bold">
                        {c.nama}
                        {on && <Check className="size-4 text-brand" />}
                      </span>
                      <span className="px-1 pb-1 text-xs text-muted">
                        {availableCount(b.dateIdx, c.id)} dari {HOURS.length} jam tersedia
                        <br />
                        Untuk: {c.untuk.join(' atau ')}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <section aria-labelledby="h-jam">
            <h2 id="h-jam" className="mb-3 flex items-center gap-2 text-lg font-bold">
              <span className="grid size-6 place-items-center rounded-full bg-ink text-xs text-white">3</span>Pilih jam
            </h2>
            <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Arti status slot">
              <li className="flex items-center gap-2"><i className="size-5 rounded border-2 border-line bg-white" />Tersedia</li>
              <li className="flex items-center gap-2"><i className="hatch size-5 rounded border-2 border-line" /><Lock className="size-3.5" />Dipesan</li>
              <li className="flex items-center gap-2"><i className="size-5 rounded border-2 border-dashed border-line bg-slate-100" /><Clock className="size-3.5" />Waktu terlewat</li>
              <li className="flex items-center gap-2"><i className="size-5 rounded border-2 border-brand bg-brand" /><Check className="size-3.5" />Dipilih</li>
            </ul>
            <p className="mb-4 text-sm text-muted">
              Harga per jam bervariasi menurut jam dan hari{weekend ? ' (akhir pekan)' : ''}: Rp 40.000, Rp 50.000, atau Rp 75.000.
            </p>
            {b.courtId == null ? (
              <p className="rounded-xl border border-dashed border-line bg-white p-6 text-center text-sm text-muted">
                Pilih lapangan dulu untuk melihat jam dan harganya.
              </p>
            ) : (
              <div className="grid gap-5">
                {GROUPS.map((g) => (
                  <div key={g.nama}>
                    <h3 className="mb-2 text-sm font-bold">
                      {g.nama} <span className="font-normal text-muted">{g.rentang}</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {g.jam.map((h) => {
                        const st = slotStatus(b.dateIdx, b.courtId, h)
                        const sel = b.hour === h
                        const inRange = b.hour != null && h > b.hour && h < b.hour + b.duration
                        return (
                          <Slot key={h} hour={h} price={priceAt(h, weekend)} status={st} selected={sel} inRange={inRange} onClick={() => pickHour(h)} />
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-5 text-xs text-muted">Data contoh. {PRICE_NOTE}</p>
          </section>
        </div>

        <div className="lg:sticky lg:top-4">
          <Summary sport={sport} days={days} b={b} set={set} total={total} onNext={onNext} canNext={canNext} />
        </div>
      </div>

      {/* Ponsel dan tablet: ringkasan jadi bilah bawah yang selalu terlihat */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-white p-3 lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted">{canNext ? `${jam(b.hour)} sampai ${jam(b.hour + b.duration)}` : 'Belum ada jam dipilih'}</p>
            <strong className="rounded bg-lime px-2 text-lg font-extrabold tabular-nums">{rupiah(total)}</strong>
          </div>
          <Button disabled={!canNext} onClick={onNext}>Lanjut ke tinjauan <Arrow className="size-4" /></Button>
        </div>
      </div>
    </main>
  )
}
