import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MoonIcon, SunIcon, MenuIcon, XIcon } from './Icons'

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
  { href: '/projects', label: 'All Projects' }
]

export default function Header() {
  const [theme, setTheme] = useState('light')
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const persisted = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const next = persisted ?? (prefersDark ? 'dark' : 'light')
    setTheme(next)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])


  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location])

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      setHidden(y > 80 && y > lastY)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur border-b border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-neutral/90 text-slate-900 dark:text-slate-100 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">ES</span>
            <span>Edwin Stephano J</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 relative" aria-label="Main">
            {navItems.map((n) =>
              n.href.startsWith('/#') ? (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault()
                      const id = n.href.slice(1) // "#section"
                      const el = document.querySelector(id)
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        history.replaceState(null, '', n.href)
                      }
                    }
                  }}
                  className="group relative hover:text-primary transition-colors"
                >
                  {n.label}
                  {`/${location.hash}` === n.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="pointer-events-none absolute -bottom-1 left-0 h-0.5 bg-primary"
                      style={{ width: '100%' }}
                    />
                  )}
                </a>
              ) : (
                <NavLink
                  key={n.href}
                  to={n.href}
                  className={({ isActive }) =>
                    `group relative hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`
                  }
                >
                  {n.label}
                  {location.pathname === n.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="pointer-events-none absolute -bottom-1 left-0 h-0.5 bg-primary"
                      style={{ width: '100%' }}
                    />
                  )}
                </NavLink>
              )
            )}
            {/* Command palette button removed per request (keyboard shortcut only) */}
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 p-2 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 p-2"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200/60 dark:border-white/10 bg-white/80 dark:bg-neutral/90 backdrop-blur text-slate-900 dark:text-slate-100">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {navItems.map((n) =>
              n.href.startsWith('/#') ? (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault()
                      const id = n.href.slice(1)
                      const el = document.querySelector(id)
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        history.replaceState(null, '', n.href)
                      }
                    }
                  }}
                  className="py-2 hover:text-primary"
                >
                  {n.label}
                </a>
              ) : (
                <NavLink key={n.href} to={n.href} className="py-2 hover:text-primary">
                  {n.label}
                </NavLink>
              )
            )}
            {/* Command palette button removed per request (keyboard shortcut only) */}
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              <span>Theme</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
