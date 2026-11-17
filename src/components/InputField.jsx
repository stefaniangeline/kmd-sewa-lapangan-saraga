export default function InputField({ id, label, value, onChange, placeholder = 'Masukkan kode' }) {
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-semibold text-white">
      {label}
      <input id={id} value={value} onChange={onChange} placeholder={placeholder} autoComplete="off"
        className="h-14 w-full rounded-xl border border-slate-400 bg-white px-5 text-base font-normal text-ink placeholder:text-slate-500 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40" />
    </label>
  )
}
