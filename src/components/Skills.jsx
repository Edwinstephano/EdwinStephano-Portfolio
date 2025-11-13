import skills from '../data/skills'
import { motion } from 'framer-motion'

export default function Skills() {
  const icons = {
    React: '⚛️',
    Python: '🐍',
    Django: '🌿',
    JavaScript: '🟨',
    HTML5: '🧱',
    'Tailwind CSS': '🌬️',
    PostgreSQL: '🐘',
    Vite: '⚡',
    Git: '🔧'
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
              className="chip px-3.5 py-2 text-base"
            >
              <span aria-hidden className="mr-2 inline-block text-sm align-[-1px]">
                {icons[s] ?? '🔹'}
              </span>
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
