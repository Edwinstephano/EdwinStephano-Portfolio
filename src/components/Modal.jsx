import { useEffect, useRef } from 'react'

export default function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    // Focus the dialog for accessibility
    const t = setTimeout(() => dialogRef.current?.focus(), 0)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, onClose])

  if (!open) return null

  const close = () => onClose?.()

  return (
    <div className="fixed inset-0 z-[2000]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />
      <div className="absolute inset-0 grid place-items-center px-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          className="card w-full max-w-2xl p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight">{title}</h3>
            <button onClick={close} className="btn-secondary px-3 py-1.5" aria-label="Close">
              Close
            </button>
          </div>
          <div className="mt-4 text-slate-700 dark:text-slate-200 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
