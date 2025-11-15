import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'
import Aurora from '../components/Aurora'
import { Suspense, lazy } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SunIcon } from '../components/Icons'

const Skills = lazy(() => import('../components/Skills'))
const Experience = lazy(() => import('../components/Experience'))
const Certificates = lazy(() => import('../components/Certificates'))
const ContactForm = lazy(() => import('../components/ContactForm'))

export default function Home() {
  const prefersReduced = useReducedMotion()
  const sectionVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    show: { opacity: 1, y: 0 }
  }
  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
  }
  return (
    <div className="relative">
      <Aurora />
      <main id="content" className="block" aria-labelledby="home">
        <motion.section
          id="home"
          className="scroll-mt-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Hero />
        </motion.section>
        <motion.section
          id="about"
          className="relative overflow-hidden min-h-screen flex items-center scroll-mt-24 bg-gradient-to-b from-primary/15 via-white/90 to-primary/5 dark:from-primary/25 dark:via-transparent dark:to-transparent"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* light pattern behind */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(100,116,139,0.06) 1px, transparent 1px), linear-gradient(rgba(100,116,139,0.06) 1px, transparent 1px)'
              ,
              backgroundSize: '24px 24px'
            }}
          />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="mx-auto w-full rounded-2xl border border-primary/20 dark:border-primary/30 ring-1 ring-primary/10 dark:ring-primary/20 bg-white/80 dark:bg-slate-900/40 backdrop-blur p-6 sm:p-8 shadow-soft min-h-[60vh] flex flex-col justify-start">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <SunIcon width={18} height={18} />
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">About</h2>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                Hi, I’m Edwin stephano J, a passionate and dedicated Software Developer with a strong focus on building clean, efficient, and user-friendly applications. I love turning ideas into real, working solutions—whether it’s through modern frontend design, backend logic, or frameworks like Frappe/ERPNext that I actively explore and work with. I enjoy learning new technologies every day and constantly improving my coding skills to become a more talented and confident developer. Beyond coding, I follow simple values: consistency, curiosity, and solving problems with a calm mind. My goal is to grow into a well-rounded developer who delivers meaningful digital experiences with clean design, smooth animations, and smart functionality.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="py-16 sm:py-20 scroll-mt-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-bold">Featured Projects</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  A selection of things I’ve built recently.
                </p>
              </div>
              <Link to="/projects" className="btn-secondary">All Projects</Link>
            </div>

            <motion.div
              className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {projects.slice(0, 3).map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="scroll-mt-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Suspense fallback={<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8" aria-busy="true">Loading skills…</div>}>
            <Skills />
          </Suspense>
        </motion.section>
        <motion.section
          id="experience"
          className="scroll-mt-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Suspense fallback={<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8" aria-busy="true">Loading experience…</div>}>
            <Experience />
          </Suspense>
        </motion.section>

        

        <motion.section
          id="certificates"
          className="scroll-mt-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Suspense fallback={<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8" aria-busy="true">Loading certificates…</div>}>
            <Certificates />
          </Suspense>
        </motion.section>

        

        <motion.section
          id="contact"
          className="py-16 sm:py-20 scroll-mt-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="py-8" aria-busy="true">Loading contact form…</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

