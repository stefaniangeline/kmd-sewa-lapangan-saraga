const variants = {
  primary: 'bg-lime text-ink hover:brightness-95 disabled:bg-white/15 disabled:text-white/50',
  blue: 'bg-brand text-white hover:bg-brand-dark disabled:bg-white/15 disabled:text-white/50',
  secondary: 'border border-white/70 bg-transparent text-white hover:bg-white/10',
}

export default function Button({ variant = 'primary', big = false, className = '', ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed ${
        big ? 'min-h-14 px-6 text-base' : 'min-h-12 px-4 text-sm'
      } ${variants[variant]} ${className}`}
    />
  )
}
