import { useEffect, useRef, useState } from 'react'

// Subtle spotlight that follows the cursor and creates a radial highlight.
// Disabled for users preferring reduced motion.
export default function Spotlight() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(!mql.matches)
    update()
    mql.addEventListener?.('change', update)
    return () => mql.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      el.style.setProperty('--x', `${x}px`)
      el.style.setProperty('--y', `${y}px`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10"
      style={{
        background:
          enabled
            ? 'radial-gradient(200px 200px at var(--x, -999px) var(--y, -999px), rgba(255,255,255,0.12), transparent 60%)'
            : 'transparent'
      }}
    />
  )
}
