import { motion, useReducedMotion } from 'framer-motion'

// Floating orbit badges around the hero visual. Unique, subtle, performant.
export default function OrbitBadges() {
  const prefersReduced = useReducedMotion()
  const items = [
    { label: 'React', x: -60, y: -100, delay: 0 },
    { label: 'Node', x: 80, y: -90, delay: 0.1 },
    { label: 'UX', x: -90, y: 60, delay: 0.15 },
    { label: 'Perf', x: 100, y: 80, delay: 0.2 }
  ]

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      {items.map((it, i) => (
        <motion.span
          key={it.label}
          className="chip bg-white/80 dark:bg-white/[0.06] shadow-soft"
          style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(${it.x}px, ${it.y}px)` }}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 6 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: [6, -6, 6] }}
          transition={{ duration: prefersReduced ? 0.4 : 4, delay: it.delay, ease: 'easeInOut', repeat: prefersReduced ? 0 : Infinity }}
        >
          {it.label}
        </motion.span>
      ))}
    </div>
  )
}
