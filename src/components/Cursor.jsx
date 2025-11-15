import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const prefersReduced = useReducedMotion()
  const isCoarse = typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches
  const saveData = typeof navigator !== 'undefined' && navigator.connection && navigator.connection.saveData

  const [visible, setVisible] = useState(false)
  const [hoverMagnet, setHoverMagnet] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const raf = useRef(0)

  useEffect(() => {
    if (prefersReduced || isCoarse || saveData) return
    document.documentElement.classList.add('custom-cursor')
    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      setVisible(true)
      const magnet = e.target && (e.target.closest('[data-magnetic]') || e.target.matches('[data-magnetic]'))
      setHoverMagnet(!!magnet)
    }
    const onLeave = () => setVisible(false)

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18
      pos.current.y += (target.current.y - pos.current.y) * 0.18
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [prefersReduced, isCoarse, saveData])

  if (prefersReduced || isCoarse || saveData) return null

  const size = hoverMagnet ? 36 : 14
  const opacity = visible ? (hoverMagnet ? 0.18 : 0.35) : 0

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
      style={{ translateX: -size / 2, translateY: -size / 2 }}
      animate={{ x: pos.current.x, y: pos.current.y }}
      transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.4 }}
    >
      <motion.div
        className="rounded-full"
        style={{ width: size, height: size, backgroundColor: 'white' }}
        animate={{ opacity }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  )
}
