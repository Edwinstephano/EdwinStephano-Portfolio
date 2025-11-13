import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

const ACTIONS = [
  { id: 'go-home', label: 'Go to Home', run: () => (window.location.href = '/#home') },
  { id: 'go-projects-section', label: 'Go to Projects (section)', run: () => (window.location.href = '/#projects') },
  { id: 'open-projects', label: 'Open /projects', run: () => (window.location.href = '/projects') },
  { id: 'open-blog', label: 'Open /blog', run: () => (window.location.href = '/blog') },
  { id: 'download-resume', label: 'Download Resume', run: () => window.open('/resume.pdf', '_blank', 'noopener') },
  {
    id: 'toggle-theme',
    label: 'Toggle Theme (Light/Dark)',
    run: () => {
      const root = document.documentElement
      const next = root.classList.contains('dark') ? 'light' : 'dark'
      root.classList.toggle('dark')
      localStorage.setItem('theme', next)
    }
  },
  // Theme presets
  { id: 'preset-teal', label: 'Theme Preset: Teal', run: () => setPreset('theme-teal') },
  { id: 'preset-purple', label: 'Theme Preset: Purple', run: () => setPreset('theme-purple') },
  { id: 'preset-sunset', label: 'Theme Preset: Sunset', run: () => setPreset('theme-sunset') },
  { id: 'preset-forest', label: 'Theme Preset: Forest', run: () => setPreset('theme-forest') },
  { id: 'copy-email', label: 'Copy Email (you@example.com)', run: async () => {
    try {
      await navigator.clipboard.writeText('you@example.com')
      // no-op; gentle UX
    } catch {}
  }}
]

function setPreset(cls) {
  const root = document.documentElement
  root.classList.remove('theme-teal', 'theme-purple', 'theme-sunset', 'theme-forest')
  root.classList.add(cls)
  localStorage.setItem('palette', cls)
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)

  // Global shortcuts and programmatic open
  useEffect(() => {
    const onKey = (e) => {
      const isK = e.key.toLowerCase() === 'k'
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault()
        setOpen((o) => !o)
        setQ('')
        setActive(0)
      } else if (open) {
        if (e.key === 'Escape') {
          setOpen(false)
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          setActive((i) => Math.min(i + 1, filtered.length - 1))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setActive((i) => Math.max(i - 1, 0))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          filtered[active]?.run()
          setOpen(false)
        }
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-cmdk', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-cmdk', onOpen)
    }
  }, [open])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return ACTIONS
    return ACTIONS.filter((a) => a.label.toLowerCase().includes(query))
  }, [q])

  if (!open) return null
  return createPortal(
    <div role="dialog" aria-modal className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30 dark:bg-black/60" onClick={() => setOpen(false)} />
      <div className="absolute left-1/2 top-24 w-[90vw] max-w-xl -translate-x-1/2">
        <div className="card overflow-hidden">
          <div className="border-b border-slate-200/60 dark:border-white/10">
            <input
              autoFocus
              value={q}
              onChange={(e) => { setQ(e.target.value); setActive(0) }}
              placeholder="Search commands… (Try: projects, theme, resume)"
              className="w-full bg-transparent px-4 py-3 outline-none"
              aria-label="Search commands"
            />
          </div>
          <ul role="listbox" className="max-h-80 overflow-auto p-2">
            {filtered.map((a, i) => (
              <li
                key={a.id}
                role="option"
                aria-selected={i === active}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 ${i === active ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-white/10'}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => { a.run(); setOpen(false) }}
              >
                <span>{a.label}</span>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-sm text-muted">No results</li>
            )}
          </ul>
        </div>
        <p className="mt-2 text-center text-xs text-muted">Press Esc to close • Cmd/Ctrl+K to toggle</p>
      </div>
    </div>,
    document.body
  )
}
