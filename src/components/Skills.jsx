import skills from '../data/skills'
import { motion } from 'framer-motion'

export default function Skills() {
  const iconFor = (name) => {
    const commonProps = "w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"

    // Inline SVG icons for some skills
    if (name === 'CSS') {
      return (
        <svg viewBox="0 0 24 24" className={commonProps} aria-hidden>
          <path fill="#264de4" d="M4 3h16l-1.5 17-6.5 2-6.5-2L4 3z" />
          <path fill="#2965f1" d="M12 4v16.5l5.2-1.6L18.8 4H12z" />
          <path fill="#ebebeb" d="M12 13.5H9.2l-.2-2.1H12V9.4H7.8l.6 6.2H12v-2.1z" />
          <path fill="#fff" d="M12 13.5v2.1h2.5l-.3 2.3-2.2.7v2.2l4-1.3.8-6H12z" />
        </svg>
      )
    }

    if (name === 'GitHub') {
      return (
        <svg viewBox="0 0 24 24" className={commonProps} aria-hidden>
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.17 9.17 0 0 1 12 6.07c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.56 1.4.22 2.44.11 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
          />
        </svg>
      )
    }

    if (name === 'VS Code') {
      return (
        <svg viewBox="0 0 24 24" className={commonProps} aria-hidden>
          <path fill="#007acc" d="M3.3 9.4 15.1 2.3c.4-.2.9-.3 1.2-.1l3.4 1.6c.2.1.3.3.3.6v15.4c0 .3-.1.5-.4.6l-3.3 1.6c-.3.2-.8.1-1.2-.1L3.3 14.7c-.5-.3-.5-1 0-1.3L6 11.2l-2.7-1.8c-.5-.3-.5-1 0-1.3Z" />
          <path fill="#1f9cf0" d="m9.3 12-4 4.1 2.1 1.4L13 12 7.4 6.6 5.3 8z" />
        </svg>
      )
    }

    // Map remaining skill names to local filenames
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
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
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
              className="group relative flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-default backdrop-blur-sm"
            >
              <div className="flex-shrink-0 p-2 bg-white dark:bg-white/5 rounded-xl shadow-sm transition-transform duration-300 flex items-center justify-center">
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
