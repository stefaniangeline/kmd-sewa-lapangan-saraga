import { useMemo } from 'react'
import {
  GROUPS, getDays, slotStatus, priceAt, maxDuration, totalPrice, availableCount, rupiah, jam, PRICE_NOTE,
  PRICE_LOW, PRICE_MID, PRICE_HIGH,
} from '../data.js'
import Photo from '../components/Photo.jsx'
import Button from '../components/Button.jsx'
import Header from '../components/Header.jsx'
import Stepper from '../components/Stepper.jsx'
import GlassCard from '../components/GlassCard.jsx'
import TextLink from '../components/TextLink.jsx'
import TotalBlock from '../components/TotalBlock.jsx'
import DateChip from '../components/DateChip.jsx'
import CourtCard from '../components/CourtCard.jsx'
import SummaryRow from '../components/SummaryRow.jsx'
import LegendItem from '../components/LegendItem.jsx'
import { Lock, Clock, Check, Arrow, Calendar } from '../components/Icons.jsx'

function Slot({ hour, price, status, selected, inRange, onClick }) {
  const base = 'relative grid min-h-20 content-center justify-items-center gap-0.5 rounded-2xl border-2 px-2 py-2 text-center text-sm transition-colors'
  const tone =
    selected ? 'border-lime bg-brand text-white shadow-[0_0_0_3px_rgba(190,216,23,.2)]'
    : inRange ? 'border-brand bg-brand/55 text-white'
    : status === 'dipesan' ? 'hatch border-white/15 text-white/55 cursor-not-allowed'
    : status === 'lewat' ? 'border-dashed border-white/20 bg-dark text-white/45 cursor-not-allowed'
    : 'border-white/20 bg-dark-raised text-white hover:border-lime'
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
      {status === 'dipesan' && <span className="flex items-center gap-1 rounded bg-dark/80 px-1 text-xs"><Lock className="size-3" />Dipesan</span>}
      {status === 'lewat' && <span className="flex items-center gap-1 text-xs"><Clock className="size-3" />Terlewat</span>}
      {selected && <span className="flex items-center gap-1 rounded bg-lime px-1.5 text-xs font-bold text-ink"><Check className="size-3" />Dipilih</span>}
      {inRange && !selected && <span className="rounded bg-lime px-1.5 text-xs font-bold text-dark">Termasuk durasi</span>}
    </button>
  )
}

function DurationSelect({ b, set, className = '' }) {
  if (b.hour == null) return <span className="text-muted">-</span>
  const maxD = b.hour != null ? maxDuration(b.dateIdx, b.courtId, b.hour) : 1
  return (
    <div id={`durasi-${className ? 'bar' : 'panel'}`} role="group" aria-label="Pilih durasi" className={`flex gap-2 ${className}`}>
      {Array.from({ length: maxD }, (_, i) => i + 1).map((d) => {
        const selected = b.duration === d
        return (
          <button key={d} type="button" aria-pressed={selected} disabled={b.hour == null} onClick={() => set({ duration: d })}
            className={`min-h-12 w-0 min-w-0 flex-1 rounded-full border px-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${selected ? 'border-lime bg-lime text-dark' : 'border-white/40 bg-transparent text-white hover:bg-white/10'}`}>
            {selected && <Check className="mr-1 inline size-4" />}{d} jam
          </button>
        )
      })}
    </div>
  )
}

function Summary({ sport, days, b, set, total, onNext, canNext }) {
  const court = sport.courts.find((c) => c.id === b.courtId)
  const rows = [
    ['Lapangan', court ? court.nama : 'Belum dipilih'],
    ['Tanggal', days[b.dateIdx].panjang],
    ['Jam', b.hour != null ? `${jam(b.hour)} sampai ${jam(b.hour + b.duration)}` : 'Belum dipilih'],
  ]
  return (
    <aside aria-label="Ringkasan pilihan" className="grid w-full min-w-0 gap-4 rounded-2xl border border-white/10 bg-dark-raised p-5 shadow-xl">
      <h3 className="text-base font-bold">Pilihanmu</h3>
      <dl className="grid gap-2.5 text-sm">
        {rows.map(([k, v]) => <SummaryRow key={k} label={k} value={v} />)}
        <div className="grid min-w-0 gap-2">
          <dt className="text-muted">Durasi</dt>
          <dd className="min-w-0"><DurationSelect b={b} set={set} /></dd>
        </div>
      </dl>
      <TotalBlock amount={rupiah(total)} hours={b.hour == null ? 0 : b.duration} />
      <p className="rounded-lg bg-brand-soft p-2.5 text-xs text-muted">
        Perubahan jadwal hanya lewat konter SARAGA, tidak lewat web. Rinciannya ada di langkah Tinjau.
      </p>
      <Button big className="w-full" disabled={!canNext} onClick={onNext}>
        Lanjut ke tinjauan <Arrow className="size-4" />
      </Button>
      {!canNext && <p className="-mt-2 text-center text-xs text-muted">Pilih lapangan dan jam dulu.</p>}
    </aside>
  )
}

export default function PilihJadwal({ sport, booking: b, set, onBack, onNext, onHome, onGo }) {
  const days = useMemo(() => getDays(7), [])
  const canNext = b.courtId != null && b.hour != null
  const weekend = days[b.dateIdx].weekend
  const total = canNext ? totalPrice(b.hour, b.duration, weekend) : 0

  const pickDate = (i) => set({ dateIdx: i, hour: null, duration: 1 })
  const pickCourt = (id) => set({ courtId: id, hour: null, duration: 1, usage: null })
  const pickHour = (h) => set(b.hour === h ? { hour: null, duration: 1 } : { hour: h, duration: 1 })
  const selectedDate = days[b.dateIdx].date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main className="pb-40 lg:pb-16">
      <div className="relative min-h-[390px] overflow-hidden sm:min-h-[440px]">
        <Photo src={sport.foto} label={`Lapangan ${sport.nama}`} className="absolute inset-0 size-full" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/55 to-dark/20" />
        <div className="relative z-10">
          <Header onHome={onHome} />
          {b.courtId != null && <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6"><Stepper current={0} onGo={onGo} /></div>}
          <div className="mx-auto flex min-h-[280px] max-w-6xl items-end justify-between gap-6 px-4 pb-12 pt-16 sm:px-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime">Jadwal {sport.nama}</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Pilih jadwal</h1>
              <p className="mt-3 text-base text-white/85 sm:text-lg">Pilih tanggal, lapangan, dan jam yang tersedia.</p>
              <TextLink onClick={onBack} className="mt-2 lg:hidden">Ubah olahraga</TextLink>
            </div>
            <div className="hidden flex-col items-end gap-2 lg:flex">
              <GlassCard type="Stat" title={String(sport.courts.length)} subtitle="lapangan tersedia" />
              <TextLink onClick={onBack}>Ubah olahraga</TextLink>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-7 bg-lime [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
      </div>

      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-9">
          <section aria-labelledby="h-tgl">
            <div className="mb-4">
              <h2 id="h-tgl" className="text-2xl font-bold tracking-tight">Pilih tanggal</h2>
              <p className="mt-1 text-sm text-muted">{selectedDate}</p>
            </div>
            <ul className="hide-scrollbar flex snap-x snap-proximity gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 xl:grid xl:grid-cols-7 xl:overflow-visible" aria-label="Pilih tanggal">
              {days.map((d) => {
                const on = b.dateIdx === d.idx
                return (
                  <li key={d.idx} className="w-[98px] shrink-0 snap-start xl:w-auto xl:min-w-0">
                    <DateChip day={d.hari} date={d.tgl} today={d.idx === 0} selected={on} onClick={() => pickDate(d.idx)} />
                  </li>
                )
              })}
            </ul>
          </section>

          <section aria-labelledby="h-lap">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 id="h-lap" className="flex items-center gap-2 text-lg font-bold">
                <span className="grid size-7 place-items-center rounded-full bg-lime text-xs font-bold text-dark">2</span>Pilih lapangan
              </h2>
            </div>
            <p className="mb-3 rounded-lg bg-dark-raised px-3 py-2 text-sm text-muted">
              Pilih lapangan untuk melihat slot yang tersedia. Jumlah slot mengikuti tanggal yang kamu pilih.
            </p>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {sport.courts.map((c) => {
                const on = b.courtId === c.id
                return (
                  <li key={c.id}>
                    <CourtCard court={c} selected={on} available={availableCount(b.dateIdx, c.id)} onClick={() => pickCourt(c.id)} />
                  </li>
                )
              })}
            </ul>
          </section>

          <section aria-labelledby="h-jam">
            <h2 id="h-jam" className="mb-1 text-lg font-bold">Pilih jam mulai</h2>
            <p className="mb-3 text-xs text-muted">
              Harga per jam bervariasi menurut jam dan hari{weekend ? ' (akhir pekan)' : ''}: {rupiah(PRICE_LOW)}, {rupiah(PRICE_MID)}, atau {rupiah(PRICE_HIGH)}.
            </p>
            <ul className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Keterangan status jam">
              <LegendItem status="available" label="Tersedia" />
              <LegendItem status="selected" label="Dipilih" />
              <LegendItem status="booked" label="Dipesan" />
              <LegendItem status="passed" label="Terlewat" />
              <li className="flex items-center gap-1.5 text-xs text-white/75">
                <i aria-hidden="true" className="size-3.5 rounded-[3px] border border-brand bg-brand/55" />Termasuk durasi
              </li>
            </ul>
            {b.courtId == null ? (
              <div className="grid min-h-[144px] justify-items-center content-center gap-2 rounded-2xl border border-dashed border-white/40 bg-white/10 px-4 py-5 text-center">
                <span className="grid size-9 place-items-center rounded-full bg-lime text-dark"><Calendar className="size-5" /></span>
                <strong className="text-sm">Pilih lapangan dulu</strong>
                <p className="text-xs text-muted">Pilih lapangan untuk melihat jam dan harganya.</p>
              </div>
            ) : (
              <div className="grid gap-5">
                {GROUPS.map((g) => (
                  <div key={g.nama} className="rounded-xl border border-white/10 bg-dark-raised p-3 sm:p-4">
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

        <div className="hidden min-w-0 lg:sticky lg:top-4 lg:block">
          <Summary sport={sport} days={days} b={b} set={set} total={total} onNext={onNext} canNext={canNext} />
        </div>
      </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-white/15 bg-dark-raised p-3 lg:hidden">
        <div className="mx-auto grid max-w-6xl gap-2">
          <div className="flex items-center justify-between gap-3 text-xs">
            <p className="text-muted">{canNext ? `${jam(b.hour)} sampai ${jam(b.hour + b.duration)}` : 'Belum ada jam dipilih'}</p>
            <p className="shrink-0 text-muted">Durasi {b.hour == null ? '-' : `${b.duration} jam`}</p>
          </div>
          {b.hour != null && <DurationSelect b={b} set={set} className="w-full" />}
          <div className="flex items-center justify-between gap-3">
            <strong className="rounded bg-lime px-2 text-lg font-extrabold tabular-nums">{rupiah(total)}</strong>
            <Button disabled={!canNext} onClick={onNext}>Lanjut ke tinjauan <Arrow className="size-4" /></Button>
          </div>
        </div>
      </div>
    </main>
  )
}
