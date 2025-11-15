import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const AnimatedMascot = lazy(() => import('./AnimatedMascot'))

export default function WelcomePopup({ message = "Hey, I’m Steno! 👋 Welcome to my portfolio." }) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 500)
    const auto = setTimeout(() => setOpen(false), 5000)
    return () => { clearTimeout(t); clearTimeout(auto) }
  }, [])

  // Optional: allow manual trigger via custom event or query param
  useEffect(() => {
    const onOpen = () => setOpen((o) => (o ? o : true))
    window.addEventListener('open-welcome', onOpen)
    // query param: ?welcome=1
    try {
      const usp = new URLSearchParams(window.location.search)
      if (usp.get('welcome') === '1') setOpen(true)
    } catch {}
    return () => window.removeEventListener('open-welcome', onOpen)
  }, [])

  const dismiss = () => {
    setOpen(false)
    localStorage.setItem('welcomeDismissed', '1')
  }

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={open ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="pointer-events-none fixed left-4 top-10 z-40"
      role="dialog"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex items-center gap-2 px-0 py-0 bg-transparent">
        <Suspense fallback={<div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200/70 dark:bg-white/10" /> }>
          <AnimatedMascot className="scale-75 origin-left" message={message} ariaLabel="Waving cartoon boy" />
        </Suspense>
        <button
          onClick={dismiss}
          aria-label="Dismiss welcome"
          className="ml-2 rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
        >
          Dismiss
        </button>
      </div>
      {!prefersReduced && (
        <div aria-hidden className="absolute inset-x-10 -bottom-2 h-3 rounded-full bg-black/5 blur-md dark:bg-white/5" />
      )}
    </motion.div>
  )
}
