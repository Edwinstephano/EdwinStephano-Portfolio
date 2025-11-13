export default function Blog() {
  // Static list sample; replace with your own CMS or markdown pipeline
  const posts = [
    {
      title: 'Hello, World',
      date: 'Jan 1, 2025',
      excerpt: 'Welcome to my blog! I write about React, UX, and performance.',
      url: '#'
    },
    {
      title: 'Improving Lighthouse scores',
      date: 'Feb 8, 2025',
      excerpt: 'Practical tips for hitting 90+ across the board.',
      url: '#'
    }
  ]
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-bold">Blog</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Occasional posts about frontend, performance, and UX.
      </p>

      <div className="mt-8 grid gap-6">
        {posts.map((p) => (
          <article key={p.title} className="card p-6">
            <h2 className="font-heading text-xl font-semibold">{p.title}</h2>
            <p className="text-sm text-muted">{p.date}</p>
            <p className="mt-2">{p.excerpt}</p>
            <a href={p.url} className="mt-3 inline-flex text-primary hover:underline">
              Read more
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
