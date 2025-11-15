import { motion } from 'framer-motion'
import certificates from '../data/certificates'

export default function Certificates() {
  const container = { show: { transition: { staggerChildren: 0.06 } } }
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }
  return (
    <section id="certificates" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold">Certificates</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">A few credentials I’ve earned.</p>
        <motion.ul
          className="mt-6 grid gap-4 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certificates.map((c) => (
            <motion.li key={c.id} variants={item} className="card p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{c.issuer} • {c.date}</p>
                </div>
                {c.link && (
                  <a href={c.link} target="_blank" rel="noreferrer" className="btn-secondary whitespace-nowrap">View</a>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
