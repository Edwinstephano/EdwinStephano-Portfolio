import skills from '../data/skills'
import { motion } from 'framer-motion'

export default function Skills() {
  const iconFor = (name) => {
    switch (name) {
      case 'React':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-[#61dafb]">
            <g fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="2"/><ellipse rx="8" ry="3.5" transform="rotate(60 12 12)" cx="12" cy="12"/><ellipse rx="8" ry="3.5" transform="rotate(-60 12 12)" cx="12" cy="12"/><ellipse rx="8" ry="3.5" cx="12" cy="12"/></g>
          </svg>
        )
      case 'JavaScript':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-[#f7df1e]"><rect width="18" height="18" x="3" y="3" rx="3" fill="currentColor"/></svg>
        )
      case 'HTML5':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-[#e34f26]"><path fill="currentColor" d="M4 3h16l-1.6 18.1L12 23l-6.4-1.9L4 3zm12.2 5.6.2-2.3H7.6l.3 3.5h6.8l-.3 3.2L12 14.1l-2.4-.8-.2-2.1H7l.4 3.9L12 17l4.6-1.9.6-6.5z"/></svg>
        )
      case 'Tailwind CSS':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-[#38bdf8]"><path fill="currentColor" d="M12 5c-3 0-4.8 1.5-5.4 4.6 1.1-1.5 2.4-2.1 3.8-1.8.83.18 1.43.9 2.09 1.69C13.38 10.52 14.35 11.6 16.8 11.6c3 0 4.8-1.5 5.4-4.6-1.1 1.5-2.4 2.1-3.8 1.8-.83-.18-1.43-.9-2.09-1.69C15.62 6.08 14.65 5 12.2 5H12zm-6.6 7.4c-3 0-4.8 1.5-5.4 4.6 1.1-1.5 2.4-2.1 3.8-1.8.83.18 1.43.9 2.09 1.69.9 1.11 1.87 2.19 4.32 2.19 3 0 4.8-1.5 5.4-4.6-1.1 1.5-2.4 2.1-3.8 1.8-.83-.18-1.43-.9-2.09-1.69-.9-1.11-1.87-2.19-4.32-2.19z"/></svg>
        )
      case 'PostgreSQL':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-[#336791]"><path fill="currentColor" d="M12 3c-3.5 0-7 1.4-7 5.5S8.5 18 12 21c3.5-3 7-7.1 7-12.5S15.5 3 12 3z"/></svg>
        )
      case 'Python':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-[#3776ab]"><path fill="currentColor" d="M12 2c2.2 0 4 1.8 4 4v2H8V6c0-2.2 1.8-4 4-4z"/><path fill="#ffd43b" d="M12 22c-2.2 0-4-1.8-4-4v-2h8v2c0 2.2-1.8 4-4 4z"/></svg>
        )
      case 'Django':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-[#092e20]"><rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor"/></svg>
        )
      case 'Vite':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-[#646cff]"><path fill="currentColor" d="M12 2 3 6l9 16 9-16-9-4z"/></svg>
        )
      case 'Git':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-[#f05133]"><path fill="currentColor" d="M12 3 3 12l9 9 9-9-9-9z"/></svg>
        )
      default:
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="text-slate-500"><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
        )
    }
  }
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.05 }
    }
  }
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 }
  }
  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold">Skills</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Tools and technologies I use.</p>
        <motion.div className="mt-6 flex flex-wrap gap-3" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {skills.map((s) => (
            <motion.span
              key={s}
              variants={item}
              whileHover={{ scale: 1.06 }}
              className="chip px-3.5 py-2 text-base bg-white/80 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/10"
            >
              <span aria-hidden className="mr-2 inline-block align-[-1px]">{iconFor(s)}</span>
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
