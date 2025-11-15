import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import projects from '../data/projects'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug])

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-heading text-2xl font-bold">Project not found</h1>
        <p className="mt-2 text-muted">We couldn't find that case study.</p>
        <div className="mt-6">
          <Link to="/projects" className="btn-secondary">Back to Projects</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-muted">
        <Link to="/projects" className="hover:text-primary">← Back to Projects</Link>
      </nav>

      <header className="mt-4">
        <h1 className="font-heading text-3xl font-bold">{project.title}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech?.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          {project.live && (
            <a href={project.live} className="btn-primary" aria-label={`Open ${project.title} live`}>
              Live
            </a>
          )}
          {project.code && (
            <a href={project.code} className="btn-secondary" aria-label={`Open ${project.title} code`}>
              Code
            </a>
          )}
        </div>
      </header>

      <section className="mt-8 grid gap-6">
        <div className="card p-6">
          <h2 className="font-heading text-xl font-semibold">Overview</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            This case study outlines the problem, approach, and outcome. Replace this text with specific goals, constraints, and your role.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="font-heading text-xl font-semibold">Architecture & Stack</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Summarize architecture decisions and trade-offs. Add diagrams or code snippets as needed.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="font-heading text-xl font-semibold">Results</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Quantify impact: performance improvements, users, revenue, or developer experience gains.
          </p>
        </div>
      </section>
    </div>
  )
}
