import { useEffect, useRef } from 'react'

export default function Dialog({ open, onClose, title, children, actions }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(92vw,30rem)] rounded-2xl p-0 shadow-2xl backdrop:bg-ink/50"
    >
      <div className="grid gap-4 p-6">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="grid gap-3 text-sm leading-relaxed text-muted">{children}</div>
        <div className="flex flex-wrap justify-end gap-2 pt-2">{actions}</div>
      </div>
    </dialog>
  )
}
