export default function DateChip({ day, date, today, selected, onClick }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick}
      className={`grid h-[90px] w-full min-w-0 justify-items-center rounded-2xl border-2 py-2.5 text-dark transition-colors duration-200 ease-out ${selected ? 'border-white bg-lime' : 'border-transparent bg-white hover:border-lime/60'}`}>
      <span className="text-xs font-medium text-slate-600">{day}</span>
      <span className="text-2xl font-extrabold leading-7 tabular-nums">{date}</span>
      <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${today ? selected ? 'bg-dark/10 text-dark' : 'bg-lime text-dark' : 'invisible'}`}>Hari ini</span>
    </button>
  )
}
