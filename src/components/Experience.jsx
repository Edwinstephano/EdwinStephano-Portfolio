import experience from '../data/experience'
import { motion, useReducedMotion } from 'framer-motion'

export default function Experience() {
  const prefersReduced = useReducedMotion()
  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold">Experience</h2>
        <div className="relative">
          {/* Progress accent */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-1 origin-top bg-primary/30"
            initial={{ scaleY: prefersReduced ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          />
          <ol className="mt-6 relative border-l border-slate-200 dark:border-white/10">
            {experience.map((item, i) => (
              <motion.li
                key={item.role}
                className="mb-8 ml-6"
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <span className="absolute -left-2.5 mt-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
                <h3 className="font-medium">
                  {item.role} • <span className="text-primary">{item.company}</span>
                </h3>
                <p className="text-sm text-muted">{item.period}</p>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{item.summary}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
