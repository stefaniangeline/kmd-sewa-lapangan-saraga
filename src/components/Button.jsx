const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark disabled:bg-line disabled:text-muted',
  secondary: 'border-2 border-brand bg-white text-brand hover:bg-brand-soft',
}

export default function Button({ variant = 'primary', big = false, className = '', ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed ${
        big ? 'min-h-12 px-6 text-base' : 'min-h-10 px-4 text-sm'
      } ${variants[variant]} ${className}`}
    />
  )
}
