import { useState } from 'react'

// Menampilkan foto dari public/photos/<src>. Jika file belum ada, tampil placeholder dengan label.
export default function Photo({ src, label, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`Foto ${label} menyusul`}
        className={`photo-ph grid place-items-center overflow-hidden text-center ${className}`}
      >
        <span className="rounded-md bg-white/80 px-2.5 py-1 text-xs font-medium text-muted">Foto {label} menyusul</span>
      </div>
    )
  }
  return (
    <img
      src={`${import.meta.env.BASE_URL}photos/${src}`}
      alt={`Foto ${label} di SARAGA ITB`}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
