import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ExternalLinkIcon } from './Icons'
import OrbitBadges from './OrbitBadges'

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    show: { opacity: 1, y: 0 }
  }

  const cardRef = useRef(null)

  useEffect(() => {
    if (prefersReduced) return
    const isCoarse = !window.matchMedia('(pointer: fine)').matches
    const saveData = navigator.connection && navigator.connection.saveData
    if (isCoarse || saveData) return

    const el = cardRef.current
    if (!el) return
    let targetX = 0, targetY = 0
    let x = 0, y = 0
    let raf = 0

    const animate = () => {
      x += (targetX - x) * 0.15
      y += (targetY - y) * 0.15
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const handle = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      targetX = (px - 0.5) * 12
      targetY = (py - 0.5) * 12
    }
    const leave = () => {
      targetX = 0
      targetY = 0
    }
    el.addEventListener('pointermove', handle, { passive: true })
    el.addEventListener('pointerleave', leave, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', handle)
      el.removeEventListener('pointerleave', leave)
    }
  }, [prefersReduced])

  // (Removed feather writing effects)

  return (
    <section id="home" className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, ease: 'easeOut' }}
          variants={variants}
          className="grid gap-6 md:grid-cols-2 items-center"
        >
          <div>
            {/* Plain static name heading (no gradient, no animation) */}
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="typing" style={{ animation: 'typing 2.0s steps(15, end) forwards' }}>Edwin Stephano</span>
            </h1>
            <p className="mt-2 text-primary font-medium">Full-Stack Developer</p>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              I build fast, accessible web apps using React and modern tooling.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                className="btn-primary shine min-w-[140px] text-center"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                className="btn-secondary shine min-w-[160px] text-center"
                aria-label="Download resume"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                Download Resume <ExternalLinkIcon />
              </motion.a>
            </div>
            <div className="mt-6 flex gap-4 text-sm text-muted">
              <a href="https://github.com/Edwinstephano" className="hover:text-primary underline-offset-4 hover:underline">GitHub</a>
              <a href="https://www.linkedin.com/in/edwin-stephano-8059992ab/" className="hover:text-primary underline-offset-4 hover:underline">LinkedIn</a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <OrbitBadges />
            <motion.div
              className="card p-3 will-change-transform max-w-sm w-full"
              ref={cardRef}
              initial={{ y: 0 }}
              animate={prefersReduced ? { y: 0 } : { y: [0, -6, 0, -3, 0] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/Edwin.jpg"
                alt="Laptop and code on desk"
                className="rounded-xl w-full h-[360px] sm:h-[420px] object-cover object-top"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
