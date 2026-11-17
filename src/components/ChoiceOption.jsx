export default function ChoiceOption({ name, value, checked, onChange }) {
  return (
    <label className={`flex min-h-[72px] cursor-pointer items-center gap-3 rounded-2xl border-2 px-5 py-3 text-sm font-semibold transition-colors ${checked ? 'border-lime bg-brand text-white' : 'border-white/30 bg-dark-raised text-white hover:bg-brand/50'}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="size-6 accent-lime" />
      {value}
    </label>
  )
}
