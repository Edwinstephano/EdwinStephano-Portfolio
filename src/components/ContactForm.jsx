import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SunIcon } from './Icons' // Assuming we might want an icon or similar, or just remove if unused

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
  const [toast, setToast] = useState({ show: false, message: '' })

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
    e.preventDefault()
    const error = validate()
    if (error) {
      setStatus({ state: 'error', message: error })
      return
    }
    try {
      setStatus({ state: 'loading', message: 'Sending…' })
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID
      if (formspreeId) {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form)
        })
        const data = await res.json()
        if (res.ok) {
          setStatus({ state: 'success', message: 'Thanks! Your message is on the way.' })
          setForm({ name: '', email: '', message: '' })
          setToast({ show: true, message: 'Message sent!' })
          setTimeout(() => setToast({ show: false, message: '' }), 2500)
          return
        }
        throw new Error(data.error || 'Formspree error')
      } else {
        // Fallback: native submit to FormSubmit to deliver email without extra setup
        setStatus({ state: 'idle', message: '' })
        setToast({ show: true, message: 'Sending…' })
        // Allow native submission
        const formEl = e.currentTarget
        formEl.submit()
      }
    } catch (err) {
      setStatus({
        state: 'error',
        message: `Something went wrong. ${err?.message ? err.message + ' — ' : ''}Try again or email me directly: edwinstephano23@gmail.com`
      })
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 id="contact-title" className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Let’s work <span className="text-primary">together</span> 🚀
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Got a project or idea you'd like to discuss? Fill out the form below.
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 sm:p-12 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-xl w-full"
        >
          <form
            name="contact"
            method="POST"
            action="https://formsubmit.co/edwinstephano23@gmail.com"
            acceptCharset="UTF-8"
            onSubmit={handleSubmit}
            aria-labelledby="contact-title"
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-base font-bold text-slate-700 dark:text-slate-200">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 px-5 py-4 text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-slate-800 dark:text-white placeholder-slate-400"
                aria-invalid={status.state === 'error' && !form.name}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-base font-bold text-slate-700 dark:text-slate-200">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 px-5 py-4 text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-slate-800 dark:text-white placeholder-slate-400"
                aria-invalid={status.state === 'error' && !/^\S+@\S+\.\S+$/.test(form.email)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="message" className="text-base font-bold text-slate-700 dark:text-slate-200">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                placeholder="Type your message..."
                value={form.message}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 px-5 py-4 text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-slate-800 dark:text-white placeholder-slate-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status.state === 'loading'}
              className="btn-primary w-full justify-center py-4 text-lg rounded-xl mt-4 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-1"
            >
              {status.state === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status Messages */}
            <div className="text-center">
              <AnimatePresence>
                {status.state === 'success' && (
                  <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <motion.path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                    </svg>
                    Message sent successfully!
                  </motion.span>
                )}
                {status.state === 'error' && (
                  <span className="text-red-500 font-medium">{status.message}</span>
                )}
              </AnimatePresence>
            </div>

            {/* Hidden Fields for FormSubmit */}
            <input type="hidden" name="_next" value="https://edwinstephano-portfolio.netlify.app/?sent=1" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New portfolio contact" />
          </form>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed right-6 bottom-6 z-50 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-6 py-4 shadow-xl flex items-center gap-3"
            role="status"
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-medium text-slate-800 dark:text-white">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
