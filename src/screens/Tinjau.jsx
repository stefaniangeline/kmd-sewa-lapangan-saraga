import { useEffect, useMemo, useState } from 'react'
import { getDays, totalPrice, rupiah, jam, RULES, CONTACT, PRICE_NOTE } from '../data.js'
import Photo from '../components/Photo.jsx'
import Button from '../components/Button.jsx'
import Dialog from '../components/Dialog.jsx'
import Header from '../components/Header.jsx'
import Stepper from '../components/Stepper.jsx'
import TotalBlock from '../components/TotalBlock.jsx'
import RuleItem from '../components/RuleItem.jsx'
import InputField from '../components/InputField.jsx'
import ChoiceOption from '../components/ChoiceOption.jsx'
import SummaryRow from '../components/SummaryRow.jsx'
import { Check, Arrow, Clock } from '../components/Icons.jsx'

const PAYMENT_METHODS = ['QRIS', 'Transfer bank', 'E-wallet']
const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`

function ReviewHero({ sport, onHome, onGo }) {
  return (
    <div className="relative min-h-[390px] overflow-hidden sm:min-h-[440px]">
      <Photo src={sport.foto} label={`Lapangan ${sport.nama}`} className="absolute inset-0 size-full" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/65 to-dark/25" />
      <div className="relative z-10">
        <Header onHome={onHome} />
        <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6"><Stepper current={1} onGo={onGo} /></div>
        <div className="mx-auto flex min-h-[280px] max-w-6xl items-end px-4 pb-12 pt-16 sm:px-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime">Langkah 2 dari 3</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Tinjau pesananmu</h1>
            <p className="mt-3 text-base text-white/85 sm:text-lg">Pastikan rincian dan aturan sudah sesuai sebelum membayar.</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-7 bg-lime [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
    </div>
  )
}

export default function Tinjau({ sport, booking: b, set, onBack, onReset, onHome, onGo }) {
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('QRIS')
  const [checkout, setCheckout] = useState(false)
  const [paid, setPaid] = useState(false)
  const [seconds, setSeconds] = useState(300)
  const [transactionId, setTransactionId] = useState('GC432')
  const [paymentCode, setPaymentCode] = useState('')
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

  useEffect(() => {
    if (!checkout || paid || seconds <= 0) return
    const timer = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [checkout, paid, seconds])

  useEffect(() => {
    if (checkout || paid) window.scrollTo({ top: 0 })
  }, [checkout, paid])

  const confirmPayment = () => {
    setPaid(true)
  }

  if (paid) {
    return (
      <>
      <Header onHome={onHome} />
      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="pt-6"><Stepper current={3} /></div>
        <section className="mx-auto mt-12 grid max-w-2xl justify-items-center gap-5 rounded-3xl border border-white/10 bg-dark-raised p-6 text-center shadow-2xl sm:p-10" role="status" aria-live="polite">
          <span className="grid size-16 place-items-center rounded-full bg-lime text-dark"><Check className="size-9" /></span>
          <div className="grid gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime">SARAGA · SEWA LAPANGAN</p>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Pembayaran Berhasil</h1>
            <p className="text-muted">Pembayaran simulasi berhasil. Ini bukan transaksi sungguhan.</p>
          </div>
          <div className="w-full rounded-2xl border border-white/10 bg-dark p-5 text-left">
            <h2 className="mb-4 font-bold">Rincian pemesanan</h2>
            <dl className="grid gap-3 text-sm">
              {[...rows, ['Metode pembayaran', paymentMethod]].map(([k, v]) => <SummaryRow key={k} label={k} value={v} />)}
              <div className="flex justify-between gap-4 border-t border-white/15 pt-3"><dt className="font-bold">Total dibayar</dt><dd className="font-extrabold text-lime">{rupiah(total)}</dd></div>
            </dl>
          </div>
          <Button big onClick={onReset}>Kembali ke Halaman Utama</Button>
        </section>
      </main>
      </>
    )
  }

  if (checkout) {
    return (
      <main className="min-h-screen">
        <Header onHome={onHome} />
        <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6"><Stepper current={2} onGo={onGo} /></div>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold sm:text-3xl">Pembayaran</h1>
              <p className="mt-2 text-sm text-muted sm:text-base">Pindai kode QR dengan aplikasi pembayaran favoritmu.</p>
            </div>
            <div className="flex w-full flex-col items-center gap-1 text-center sm:w-auto sm:items-end sm:text-right">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white/90 sm:justify-end sm:text-[10px]">
                <Clock className="size-3.5 text-lime" /> Segera lakukan pembayaran
              </div>
              <div className="grid justify-items-center sm:justify-items-end">
                <strong className={`text-3xl font-extrabold leading-none tabular-nums tracking-tight sm:text-5xl ${seconds === 0 ? 'text-red-300' : 'text-lime'}`}>
                  {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
                </strong>
                <span className="mt-1 text-[10px] text-muted">Menit : Detik</span>
              </div>
            </div>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_0.9fr]">
            <section className="grid justify-items-center gap-4 rounded-2xl bg-white p-5 text-dark sm:p-7">
              {paymentMethod === 'Transfer bank' ? (
                <div className="grid min-h-64 w-full content-center justify-items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center sm:min-h-80">
                  <span className="rounded bg-dark px-3 py-1 text-sm font-bold text-white">BCA Virtual Account</span>
                  <p className="text-sm text-slate-600">Nomor rekening simulasi</p>
                  <strong className="text-2xl font-extrabold tracking-wider text-dark">8800 1234 5678 9001</strong>
                  <p className="text-sm text-slate-600">Atas nama SARAGA · Kode transfer contoh</p>
                </div>
              ) : (
                <>
                  <div className="rounded-xl bg-white p-2"><img src={asset('qris-sample.png')} alt="Kode QRIS contoh untuk simulasi" className="size-56 object-contain sm:size-72" /></div>
                  <span className="rounded bg-dark px-3 py-1 text-sm font-bold text-white">QRIS</span>
                </>
              )}
              <p className="max-w-md text-center text-sm text-slate-600">Informasi pembayaran ini hanya contoh untuk simulasi tampilan. Tidak dapat digunakan untuk transaksi sungguhan.</p>
              {paymentMethod !== 'Transfer bank' && <a href={asset('qris-sample.png')} download="saraga-qris-simulasi.png" className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark">Simpan QRIS</a>}
              {paymentMethod !== 'Transfer bank' && <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold text-slate-500"><span className="rounded-full border px-3 py-1">OVO</span><span className="rounded-full border px-3 py-1">GoPay</span><span className="rounded-full border px-3 py-1">DANA</span><span className="rounded-full border px-3 py-1">LinkAja</span><span className="rounded-full border px-3 py-1">BCA</span><span className="rounded-full border px-3 py-1">Mandiri</span></div>}
            </section>
            <aside className="grid gap-4 rounded-2xl border border-white/10 bg-dark-raised p-5">
              <h2 className="text-lg font-bold">Rincian pembayaran</h2>
              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-muted">Metode pembayaran</dt><dd className="font-semibold">{paymentMethod}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted">ID transaksi</dt><dd className="font-semibold">{transactionId}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted">Status</dt><dd className={`rounded-full px-2 py-0.5 font-semibold ${seconds === 0 ? 'bg-red-400/15 text-red-200' : 'bg-lime/15 text-lime'}`}>{seconds === 0 ? 'Waktu habis' : 'Menunggu pembayaran'}</dd></div>
              </dl>
              <TotalBlock amount={rupiah(total)} hours={b.duration} />
              <Button big onClick={confirmPayment} disabled={seconds === 0}>Konfirmasi sudah bayar <Arrow className="size-4" /></Button>
              {seconds === 0 && <div className="grid gap-2 rounded-xl border border-red-200/20 bg-red-300/10 p-3 text-sm text-red-100"><p>Waktu pembayaran habis. QR dan nomor transaksi ini sudah tidak berlaku.</p><button type="button" onClick={() => { setCheckout(false); setPaymentOpen(true); setPaymentCode(''); setTransactionId(`GC${Math.floor(100 + Math.random() * 900)}`) }} className="justify-self-start font-semibold underline underline-offset-4">Buat sesi pembayaran baru</button></div>}
              <button type="button" onClick={() => setCheckout(false)} className="justify-self-center text-sm text-muted underline underline-offset-4">Kembali ke tinjauan</button>
            </aside>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pb-16">
      <ReviewHero sport={sport} onHome={onHome} onGo={onGo} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mt-8 grid items-start gap-6 md:grid-cols-[1fr_1.15fr]">
        <section aria-labelledby="h-ringkas" className="grid gap-4 rounded-2xl border border-white/10 bg-dark-raised p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3"><h2 id="h-ringkas" className="font-bold">Ringkasan pemesanan</h2><span className="rounded-full bg-lime/15 px-3 py-1 text-xs font-bold text-lime">{sport.nama}</span></div>
          <Photo src={court.foto} label={court.nama} className="aspect-[21/8] w-full rounded-xl" />
          <dl className="grid gap-3 text-sm">
            {rows.map(([k, v]) => <SummaryRow key={k} label={k} value={v} />)}
          </dl>
          {needsUsage && <fieldset className="grid gap-2 rounded-xl border border-lime/40 bg-dark p-3"><legend className="px-1 text-sm font-bold">Gunakan untuk</legend><div className="grid grid-cols-2 gap-2">{court.untuk.map((u) => <ChoiceOption key={u} name="usage" value={u} checked={b.usage === u} onChange={() => set({ usage: u })} />)}</div><p className="px-1 text-xs text-muted">Pilih salah satu sebelum membayar.</p></fieldset>}
          <TotalBlock amount={rupiah(total)} hours={b.duration} />
        </section>

        <section aria-labelledby="h-aturan" className="grid gap-4 rounded-2xl border border-white/10 bg-dark-raised p-4 sm:p-5">
          <h2 id="h-aturan" className="font-bold">Aturan penyewaan</h2>
          <ul className="grid gap-3">{RULES.map((r, i) => <RuleItem key={i} title={['Perubahan jadwal', 'Penggunaan lapangan', 'Informasi tiket'][i]}>{r}</RuleItem>)}</ul>
          <p className="text-sm text-muted">{CONTACT}</p>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-lime/25 bg-lime/10 p-3 text-sm font-semibold"><input type="checkbox" checked={b.agreed} onChange={(e) => set({ agreed: e.target.checked })} className="mt-0.5 size-5 shrink-0 accent-lime" />Saya sudah membaca aturan di atas.</label>
        </section>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button variant="secondary" onClick={onBack}>Ubah jadwal</Button>
        <div className="grid justify-items-end gap-1"><Button big disabled={!canPay} onClick={() => setPaymentOpen(true)}>Lanjut ke Pembayaran <Arrow className="size-4" /></Button>{!canPay && <p className="text-xs text-muted">{needsUsage && !b.usage ? 'Pilih penggunaan lapangan dan centang aturan untuk melanjutkan.' : 'Centang kotak aturan untuk melanjutkan.'}</p>}</div>
      </div>
      <p className="mt-6 text-xs text-muted">Data contoh. Konsep desain mahasiswa, bukan situs resmi ITB atau SARAGA. {PRICE_NOTE}</p>
      </div>
      <Dialog open={paymentOpen} onClose={() => setPaymentOpen(false)} title="Checkout" actions={<><Button variant="secondary" onClick={() => setPaymentOpen(false)}>Batal</Button><Button disabled={paymentCode.trim().toUpperCase() !== transactionId} onClick={() => { setPaymentOpen(false); setCheckout(true); setSeconds(300) }}>Lanjut ke pembayaran</Button></>}>
        <div className="rounded-xl bg-dark p-4 text-white"><p className="text-sm text-muted">Ringkasan pesanan</p><p className="mt-1 font-bold">{court.nama} · {days[b.dateIdx].panjang}</p><p className="mt-1 text-sm text-muted">{jam(b.hour)} sampai {jam(b.hour + b.duration)}</p><p className="mt-3 text-2xl font-extrabold text-lime">{rupiah(total)}</p></div>
        <fieldset className="grid gap-2"><legend className="mb-1 font-semibold">Metode pembayaran</legend>{PAYMENT_METHODS.map((method) => <ChoiceOption key={method} name="payment-method" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />)}</fieldset>
        <div className="grid gap-3 rounded-xl border border-white/15 bg-dark p-4">
          <div className="flex items-center justify-between gap-3 text-sm"><span className="text-muted">Kode pembayaran</span><strong className="rounded-md bg-lime px-2 py-1 font-bold text-dark">{transactionId}</strong></div>
          <InputField id="payment-code" label="Masukkan kode pembayaran" value={paymentCode} onChange={(event) => setPaymentCode(event.target.value.trim().toUpperCase())} />
          <p className="text-xs text-muted">Masukkan kode di atas untuk melanjutkan.</p>
        </div>
        <p className="text-xs text-muted">Pembayaran merupakan simulasi dan tidak memproses transaksi sungguhan.</p>
      </Dialog>
    </main>
  )
}
