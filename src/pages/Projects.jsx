import { useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tech)))]

export default function Projects() {
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('All')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const byTag = tag === 'All' || p.tech.includes(tag)
      const byQuery = p.title.toLowerCase().includes(q.trim().toLowerCase())
      return byTag && byQuery
    })
  }, [q, tag])

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            Filter by technology or search by title.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search projects…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search projects"
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-white/[0.06] px-3 py-2"
          />
          <div className="flex gap-2 flex-wrap">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`chip ${t === tag ? 'ring-2 ring-primary/50' : ''}`}
                aria-pressed={t === tag}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
        {filtered.length === 0 && <p className="text-muted">No projects found.</p>}
      </div>
    </div>
  )
}
