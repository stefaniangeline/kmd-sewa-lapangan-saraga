import { useEffect, useState } from 'react'
import PilihOlahraga from './screens/PilihOlahraga.jsx'
import PilihJadwal from './screens/PilihJadwal.jsx'
import Tinjau from './screens/Tinjau.jsx'
import Toast from './components/Toast.jsx'

const INITIAL = { dateIdx: 0, courtId: null, hour: null, duration: 1, usage: null, agreed: false }

export default function App() {
  const [step, setStep] = useState(0)
  const [sport, setSport] = useState(null)
  const [booking, setBooking] = useState(INITIAL)
  const [notice, setNotice] = useState('')

  const set = (patch) => setBooking((b) => ({ ...b, ...patch }))
  const go = (n) => setStep(n)
  const goBookingStage = (stage) => setStep(stage + 1)

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
      {step === 0 && <PilihOlahraga onPick={pickSport} onHome={reset} />}
      {step === 1 && (
          <PilihJadwal sport={sport} booking={booking} set={set} onBack={() => go(0)} onNext={() => go(2)} onHome={reset} onGo={goBookingStage} />
      )}
      {step === 2 && (
        <Tinjau
          sport={sport}
          booking={booking}
          set={set}
          onBack={() => go(1)}
          onReset={reset}
          onHome={reset}
          onGo={goBookingStage}
        />
      )}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-20 flex justify-center px-4 lg:bottom-6">
        <div className="pointer-events-auto"><Toast message={notice} /></div>
      </div>
    </>
  )
}
