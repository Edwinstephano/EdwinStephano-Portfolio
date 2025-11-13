export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/60 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted">© {new Date().getFullYear()} Edwin Stephano. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/feed.json" className="hover:text-primary">RSS</a>
          <a href="https://github.com/your" className="hover:text-primary">GitHub</a>
          <a href="https://linkedin.com/in/your" className="hover:text-primary">LinkedIn</a>
          <a href="https://twitter.com/your" className="hover:text-primary">Twitter</a>
        </div>
      </div>
    </footer>
  )
}
