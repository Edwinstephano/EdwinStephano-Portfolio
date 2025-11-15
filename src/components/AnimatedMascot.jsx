import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * AnimatedMascot
 * Cute developer boy with entrance, idle, and hover micro-interactions.
 * - SVG parts animated with Framer Motion
 * - Dark mode aware via Tailwind classes
 * - Accessible: decorative by default; pass ariaLabel to announce
 */
export default function AnimatedMascot({
  message = "Hey, Welcomne To my Portfolio! 👋",
  ariaLabel,
  className = ''
}) {
  const prefersReduced = useReducedMotion()

  const variants = useMemo(() => {
    const idle = prefersReduced
      ? { y: 0 }
      : { y: [0, -4, 0, -2, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }
    return {
      container: {
        initial: { opacity: 0, y: 24, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', bounce: 0.35, duration: 0.9 } },
        hover: { rotate: prefersReduced ? 0 : -2 }
      },
      boy: idle,
      hand: prefersReduced
        ? { rotate: 0 }
        : {
            rotate: [0, 18, -6, 12, 0],
            transition: { duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2 }
          },
      bubble: {
        initial: { opacity: 0, y: 8, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut', delay: 0.25 } }
      }
    }
  }, [prefersReduced])

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      variants={variants.container}
      initial="initial"
      animate="animate"
      whileHover="hover"
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {/* Character SVG */}
      <motion.svg
        variants={variants.boy}
        width="120"
        height="120"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-sm"
        aria-hidden={ariaLabel ? undefined : true}
      >
        <defs>
          <linearGradient id="hoodie" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Body (hoodie) */}
        <g>
          <path d="M55 120 q45 -20 90 0 v40 H55 Z" fill="url(#hoodie)" />
          <rect x="70" y="150" width="20" height="28" rx="6" className="fill-slate-400 dark:fill-slate-500" />
          <rect x="110" y="150" width="20" height="28" rx="6" className="fill-slate-400 dark:fill-slate-500" />
        </g>

        {/* Laptop */}
        <g>
          <rect x="68" y="118" width="64" height="12" rx="3" className="fill-slate-600/40 dark:fill-slate-300/20" />
          <motion.rect
            x="58"
            y="88"
            width="84"
            height="34"
            rx="6"
            className="fill-white/70 dark:fill-white/10"
            animate={
              prefersReduced
                ? {}
                : { boxShadow: ['0 0 0px rgba(56,189,248,0.0)', '0 0 16px rgba(56,189,248,0.25)', '0 0 0px rgba(56,189,248,0.0)'] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>

        {/* Head group */}
        <g>
          {/* Neck */}
          <rect x="96" y="78" width="12" height="10" rx="3" className="fill-orange-200 dark:fill-orange-300" />
          {/* Face */}
          <circle cx="102" cy="62" r="22" className="fill-orange-200 dark:fill-orange-300" />
          {/* Hair */}
          <path d="M82 56 q20 -22 40 0 v10 h-40 z" className="fill-slate-900 dark:fill-slate-200" />
          {/* Eyes */}
          <circle cx="94" cy="62" r="2.6" className="fill-slate-900 dark:fill-slate-50" />
          <circle cx="110" cy="62" r="2.6" className="fill-slate-900 dark:fill-slate-50" />
          {/* Smile */}
          <path d="M94 70 q8 6 16 0" className="stroke-slate-900 dark:stroke-slate-50" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* Waving hand (right) */}
        <motion.g
          style={{ originX: 150, originY: 92 }}
          variants={variants.hand}
        >
          <circle cx="150" cy="92" r="6" className="fill-orange-200 dark:fill-orange-300" />
          <path d="M150 92 q18 -10 18 -30" className="stroke-orange-200 dark:stroke-orange-300" strokeWidth="6" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Left hand resting */}
        <g>
          <circle cx="54" cy="108" r="6" className="fill-orange-200 dark:fill-orange-300" />
        </g>
      </motion.svg>
      {/* Speech bubble */}
      <motion.div
        variants={variants.bubble}
        initial="initial"
        animate="animate"
        className="relative z-10 mt-2 inline-block rounded-2xl border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100"
      >
        {message}
        <span
          aria-hidden
          className="absolute left-6 -top-2 h-0 w-0 border-b-8 border-l-8 border-r-8 border-b-white/90 border-l-transparent border-r-transparent dark:border-b-white/10"
        />
      </motion.div>
    </motion.div>
  )
}
