import { useEffect, useRef, useState } from 'react'

// A lightweight custom cursor ring that follows the pointer and grows on interactive elements.
export default function CursorRing() {
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

    let x = -100, y = -100
    let targetX = x, targetY = y
    let scale = 1
    let raf = 0

    const animate = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      const s = scale
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const interactiveSelector = 'a, button, input, select, textarea, [role="button"], .btn, .chip'
    const onOver = (e) => {
      const t = e.target
      if (t && t.closest && t.closest(interactiveSelector)) scale = 1.6
    }
    const onOut = (e) => {
      const t = e.target
      if (t && t.closest && t.closest(interactiveSelector)) scale = 1
    }
    const onDown = () => { scale = 1.2 }
    const onUp = () => { scale = 1.6 }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerout', onOut)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerout', onOut)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 dark:border-white/30 bg-white/10 backdrop-blur-sm"
      style={{ mixBlendMode: 'difference' }}
    />
  )
}
