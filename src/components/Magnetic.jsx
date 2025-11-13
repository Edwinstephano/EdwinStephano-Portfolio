import { useEffect, useRef } from 'react'

// Wraps children and applies a small magnetic translation toward the cursor.
// Usage: <Magnetic><a className="btn-primary">...</a></Magnetic>
export default function Magnetic({ strength = 18, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let raf = 0
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      const tx = Math.max(Math.min(dx * strength, strength), -strength)
      const ty = Math.max(Math.min(dy * strength, strength), -strength)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = 'translate(0,0)'
    }
    window.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  )
}
