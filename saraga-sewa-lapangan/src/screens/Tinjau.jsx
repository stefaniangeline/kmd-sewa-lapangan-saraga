import { useMemo, useState } from 'react'
import { getDays, totalPrice, rupiah, jam, RULES, CONTACT, PRICE_NOTE } from '../data.js'
import Photo from '../components/Photo.jsx'
import Button from '../components/Button.jsx'
import Dialog from '../components/Dialog.jsx'

export default function Tinjau({ sport, booking: b, set, onBack, onReset }) {
  const [done, setDone] = useState(false)
  const days = useMemo(() => getDays(7), [])
  const court = sport.courts.find((c) => c.id === b.courtId)
  const needsUsage = court.untuk.length > 1
  const total = totalPrice(b.hour, b.duration, days[b.dateIdx].weekend)
  const canPay = b.agreed && (!needsUsage || b.usage)
  const rows = [
    ['Lapangan', court.nama],
    ['Tanggal', days[b.dateIdx].panjang + (b.dateIdx === 0 ? ' (hari ini)' : '')],
    ['Jam', `${jam(b.hour)} sampai ${jam(b.hour + b.duration)}`],
    ['Durasi', `${b.duration} jam`],
    ['Penggunaan', court.untuk.length === 1 ? court.untuk[0] : (b.usage ?? 'Belum dipilih')],
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="py-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Tinjau pesananmu</h1>
        <p className="mt-1 text-muted">Periksa ringkasan dan aturan sebelum melanjutkan.</p>
      </div>

      <div className="grid items-start gap-6 md:grid-cols-[1fr_1.15fr]">
        <section aria-labelledby="h-ringkas" className="grid gap-4 rounded-2xl border border-line bg-white p-4">
          <h2 id="h-ringkas" className="font-bold">Ringkasan pemesanan</h2>
          <Photo src={court.foto} label={court.nama} className="aspect-[21/8] w-full rounded-xl" />
          <dl className="grid gap-2.5 text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          {needsUsage && (
            <fieldset className="grid gap-2 rounded-xl bg-brand-soft p-3">
              <legend className="px-1 text-sm font-bold">Gunakan untuk</legend>
              <div className="grid grid-cols-2 gap-2">
                {court.untuk.map((u) => (
                  <label
                    key={u}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 bg-white px-3 py-2 text-sm font-semibold ${b.usage === u ? 'border-brand ring-4 ring-lime' : 'border-line'}`}
                  >
                    <input type="radio" name="usage" value={u} checked={b.usage === u} onChange={() => set({ usage: u })} className="size-4 accent-brand" />
                    {u}
                  </label>
                ))}
              </div>
              <p className="px-1 text-xs text-muted">{court.nama} bisa dipakai untuk {court.untuk.join(' atau ').toLowerCase()}. Pilih salah satu sebelum membayar.</p>
            </fieldset>
          )}
          <div className="flex items-baseline justify-between border-t border-line pt-3">
            <span className="text-sm text-muted">Total pembayaran</span>
            <strong className="rounded-lg bg-lime px-3 py-1 text-3xl font-extrabold tabular-nums text-ink">{rupiah(total)}</strong>
          </div>
        </section>

        <section aria-labelledby="h-aturan" className="grid gap-4 rounded-2xl border-2 border-lime bg-white p-4">
          <h2 id="h-aturan" className="font-bold">Sebelum melanjutkan, pastikan</h2>
          <ul className="grid gap-3 text-sm">
            {RULES.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted">{CONTACT}</p>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-brand-soft p-3 text-sm font-semibold">
            <input
              type="checkbox"
              checked={b.agreed}
              onChange={(e) => set({ agreed: e.target.checked })}
              className="mt-0.5 size-5 shrink-0 accent-brand"
            />
            Saya sudah membaca aturan di atas.
          </label>
        </section>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button variant="secondary" onClick={onBack}>Ubah jadwal</Button>
        <div className="grid justify-items-end gap-1">
          <Button big disabled={!canPay} onClick={() => setDone(true)}>Lanjut ke Pembayaran</Button>
          {!canPay && <p className="text-xs text-muted">{needsUsage && !b.usage ? 'Pilih penggunaan lapangan dan centang aturan untuk melanjutkan.' : 'Centang kotak aturan untuk melanjutkan.'}</p>}
        </div>
      </div>
      <p className="mt-6 text-xs text-muted">Data contoh. Konsep desain mahasiswa, bukan situs resmi ITB atau SARAGA. {PRICE_NOTE}</p>

      <Dialog
        open={done}
        onClose={() => setDone(false)}
        title="Alur berhenti di sini"
        actions={
          <>
            <Button variant="secondary" onClick={() => setDone(false)}>Kembali ke tinjauan</Button>
            <Button onClick={() => { setDone(false); onReset() }}>Ulangi dari awal</Button>
          </>
        }
      >
        <p>Prototype ini mencakup alur dari beranda sampai tinjauan sebelum checkout. Pembayaran tidak dibuat dalam proyek ini.</p>
      </Dialog>
    </main>
  )
}
