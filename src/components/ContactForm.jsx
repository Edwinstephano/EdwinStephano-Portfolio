import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Serverless-friendly contact form.
 * Options:
 * - Formspree: set FORMSPREE_ID in a .env file and the form will POST to https://formspree.io/f/<id>.
 * - Netlify: deploy on Netlify and keep data-netlify="true" and name="contact" attributes.
 * - Custom: replace handleSubmit fetch with your own endpoint.
 */
export default function ContactForm() {
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (e) => {
    setStatus({ state: 'idle', message: '' })
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Please enter a valid email.'
    if (form.message.trim().length < 10) return 'Please enter a message (10+ chars).'
    return null
  }

  const handleSubmit = async (e) => {
    const error = validate()
    if (error) {
      e.preventDefault()
      setStatus({ state: 'error', message: error })
      return
    }
    try {
      setStatus({ state: 'loading', message: 'Sending…' })
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID
      if (formspreeId) {
        e.preventDefault()
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form)
        })
        const data = await res.json()
        if (res.ok) {
          setStatus({ state: 'success', message: 'Thanks! Your message is on the way.' })
          setForm({ name: '', email: '', message: '' })
          return
        }
        throw new Error(data.error || 'Formspree error')
      } else {
        // Native submit to Netlify Forms (no AJAX)
        // Allow the browser to POST the form; Netlify will capture it.
        // Status will reset on navigation; Netlify will redirect back to our hash.
      }
    } catch (err) {
      setStatus({
        state: 'error',
        message: `Something went wrong. ${err?.message ? err.message + ' — ' : ''}Try again or email me directly: edwinstephano23@gmail.com`
      })
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      action="/"
      acceptCharset="UTF-8"
      onSubmit={handleSubmit}
      className="card p-6"
      aria-labelledby="contact-title"
    >
      <h2 id="contact-title" className="font-heading text-2xl font-bold">Contact</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Like what you see? Let’s build something great together.
      </p>

      <motion.div className="mt-4 grid gap-4 sm:grid-cols-2" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
        <motion.div className="flex flex-col gap-1" variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={onChange}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-white/[0.06] px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-invalid={status.state === 'error' && !form.name}
          />
        </motion.div>
        <motion.div className="flex flex-col gap-1" variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-white/[0.06] px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-invalid={status.state === 'error' && !/^\S+@\S+\.\S+$/.test(form.email)}
          />
        </motion.div>
      </motion.div>

      <motion.div className="mt-4 flex flex-col gap-1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          value={form.message}
          onChange={onChange}
          className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-white/[0.06] px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        />
      </motion.div>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" className="btn-primary">Send Message</button>
        <span role="status" className="text-sm">
          {status.state === 'loading' && 'Sending…'}
          <AnimatePresence>
            {status.state === 'success' && (
              <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 text-green-600 dark:text-green-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <motion.path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
                </svg>
                Sent!
              </motion.span>
            )}
          </AnimatePresence>
          {status.state === 'error' && (
            <span className="text-red-600 dark:text-red-400">{status.message}</span>
          )}
        </span>
      </div>

      {/* Lightweight confetti on success */}
      <AnimatePresence>
        {status.state === 'success' && (
          <motion.div className="relative h-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="confetti" aria-hidden />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Netlify honeypot */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out if you're human: <input name="bot-field" />
        </label>
      </p>
    </form>
  )
}
