import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLinkIcon } from './Icons'
import Magnetic from './Magnetic'
import OrbitBadges from './OrbitBadges'

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section id="home" className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, ease: 'easeOut' }}
          variants={variants}
          className="grid gap-8 md:grid-cols-2 items-center"
        >
          <div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="typing">Edwin Stephano J</span>
            </h1>
            <p className="mt-2 text-primary font-medium">Full-Stack Developer</p>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              I build fast, accessible web apps using React and modern tooling.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <a href="#projects" className="btn-primary shine">View Projects</a>
              </Magnetic>
              <Magnetic strength={12}>
                <a href="/resume.pdf" className="btn-secondary shine" aria-label="Download resume">
                  Download Resume <ExternalLinkIcon />
                </a>
              </Magnetic>
            </div>
            <div className="mt-6 flex gap-4 text-sm text-muted">
              <a href="https://github.com/your" className="hover:text-primary underline-offset-4 hover:underline">GitHub</a>
              <a href="https://linkedin.com/in/your" className="hover:text-primary underline-offset-4 hover:underline">LinkedIn</a>
              <a href="https://twitter.com/your" className="hover:text-primary underline-offset-4 hover:underline">Twitter</a>
            </div>
          </div>

          <div className="relative">
            <OrbitBadges />
            <div className="card p-4">
              <img
                src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1080&auto=format&fit=crop"
                alt="Laptop and code on desk"
                className="rounded-lg w-full h-auto"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
