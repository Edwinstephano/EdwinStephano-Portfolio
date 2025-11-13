import { memo } from 'react'

// Full-screen animated aurora background. Respects reduced motion via CSS media query.
function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[60vmax] w-[60vmax] rounded-full bg-primary/20 blur-3xl animate-aurora" />
      <div className="absolute top-1/3 -right-32 h-[50vmax] w-[50vmax] rounded-full bg-accent/20 blur-3xl animate-aurora" />
      <div className="absolute -bottom-32 left-1/4 h-[45vmax] w-[45vmax] rounded-full bg-emerald-400/20 blur-3xl animate-aurora" />
      <div className="absolute bottom-0 right-1/3 h-[40vmax] w-[40vmax] rounded-full bg-sky-400/20 blur-3xl animate-aurora" />
    </div>
  )
}

export default memo(Aurora)
