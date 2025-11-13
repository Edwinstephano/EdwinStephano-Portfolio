import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import ContactForm from '../components/ContactForm'
import Aurora from '../components/Aurora'

export default function Home() {
  return (
    <div className="relative">
      <Aurora />
      <Hero />

      <section id="projects" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-bold">Featured Projects</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                A selection of things I’ve built recently.
              </p>
            </div>
            <a href="/projects" className="btn-secondary">All Projects</a>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-heading text-2xl font-bold">About</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              I’m a full-stack developer specializing in building performant, accessible experiences
              with React, Node, and modern tooling. I enjoy design systems, DX, and web performance.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop"
              alt="Portrait placeholder"
              className="rounded-xl shadow-soft w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Skills />
      <Experience />

      <section id="contact" className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
