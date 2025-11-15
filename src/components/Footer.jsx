export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/60 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted"> {new Date().getFullYear()} Edwin Stephano. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Edwinstephano" className="hover:text-primary">GitHub</a>
          <a href="http://linkedin.com/in/edwin-stephano-8059992ab " className="hover:text-primary">LinkedIn</a>
          <a href="mailto:stephanoedwin8@gmail.com" className="hover:text-primary">Email</a>
         
        </div>
      </div>
    </footer>
  )
}

