const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`

export default function Sticker({ value, className = '' }) {
  return (
    <div className={`absolute bottom-3 right-3 z-10 grid size-24 content-center justify-items-center text-center text-dark ${className}`}>
      <img src={asset('sticker-scallop.svg')} alt="" aria-hidden="true" className="absolute inset-0 size-full" />
      <span className="relative z-10 text-xs leading-3">Mulai</span>
      <strong className="relative z-10 text-base font-extrabold leading-5">{value}</strong>
      <span className="relative z-10 text-xs leading-3">per jam</span>
    </div>
  )
}
