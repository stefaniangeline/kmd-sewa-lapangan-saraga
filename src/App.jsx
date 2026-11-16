import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Stepper from './components/Stepper.jsx'
import PilihOlahraga from './screens/PilihOlahraga.jsx'
import PilihJadwal from './screens/PilihJadwal.jsx'
import Tinjau from './screens/Tinjau.jsx'

const INITIAL = { dateIdx: 0, courtId: null, hour: null, duration: 1, usage: null, agreed: false }

export default function App() {
  const [step, setStep] = useState(0)
  const [sport, setSport] = useState(null)
  const [booking, setBooking] = useState(INITIAL)
  const [notice, setNotice] = useState('')

  const set = (patch) => setBooking((b) => ({ ...b, ...patch }))
  const go = (n) => setStep(n)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(''), 3500)
    return () => clearTimeout(t)
  }, [notice])

  const pickSport = (s) => {
    if (s.courts.length === 0) {
      setNotice(`Jadwal ${s.nama} belum dimuat di prototype ini. Alur yang sudah lengkap: Basket/Voli.`)
      return
    }
    setSport(s)
    setBooking(INITIAL)
    go(1)
  }
  const reset = () => {
    setSport(null)
    setBooking(INITIAL)
    go(0)
  }

  return (
    <>
      <Header onHome={reset} />
      <Stepper current={step} onGo={go} />
      {step === 0 && <PilihOlahraga onPick={pickSport} />}
      {step === 1 && (
        <PilihJadwal sport={sport} booking={booking} set={set} onBack={() => go(0)} onNext={() => go(2)} />
      )}
      {step === 2 && (
        <Tinjau sport={sport} booking={booking} set={set} onBack={() => go(1)} onReset={reset} />
      )}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-20 flex justify-center px-4 lg:bottom-6">
        {notice && (
          <p className="pointer-events-auto max-w-md rounded-xl bg-ink px-4 py-3 text-sm text-white shadow-lg">{notice}</p>
        )}
      </div>
    </>
  )
}
