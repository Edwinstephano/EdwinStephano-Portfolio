import skills from '../data/skills'
import { motion } from 'framer-motion'

export default function Skills() {
  const iconFor = (name) => {
    const commonProps = "w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"

    // Map skill names to local filenames
    const filenameMap = {
      'React': 'react.svg',
      'JavaScript': 'javascript.svg',
      'HTML': 'html5.svg',
      'Tailwind CSS': 'tailwindcss.svg',
      'PostgreSQL': 'postgresql.svg',
      'Python': 'python.svg',
      'Django': 'django.svg',
      'ERPNext': 'erpnext.svg',
      'Frappe': 'frappe.svg',
      'Vite': 'vite.svg',
      'Git': 'git.svg'
    }

    const filename = filenameMap[name]

    if (filename) {
      return <img src={`/images/skills/${filename}`} alt={`${name} logo`} className={commonProps} loading="lazy" />
    }

    // Fallback if no image mapping found
    return (
      <div className={`${commonProps} flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full`}>
        <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What I’m Good At</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            The tools and technologies that power my development workflow.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-6xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((s) => (
            <motion.div
              key={s}
              variants={item}
              whileHover={{ y: -8 }}
              className="group relative flex items-center gap-4 p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-default backdrop-blur-sm"
            >
              <div className="flex-shrink-0 p-3 bg-white dark:bg-white/5 rounded-xl shadow-sm transition-transform duration-300">
                {iconFor(s)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">{s}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
