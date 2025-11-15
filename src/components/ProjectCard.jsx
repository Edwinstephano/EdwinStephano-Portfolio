import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ExternalLinkIcon } from './Icons'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project, index }) {
  const prefersReduced = useReducedMotion()
  const variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 14 },
    show: { opacity: 1, y: 0 }
  }
  const ref = useRef(null)
  const isRemote = typeof project.image === 'string' && /^https?:\/\//.test(project.image)

  useEffect(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const max = 6 // degrees
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rx = (py - 0.5) * -2 * max
      const ry = (px - 0.5) * 2 * max
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.015)`
    }
    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [prefersReduced])

  return (
    <motion.article
      ref={ref}
      role="article"
      aria-labelledby={`project-${project.slug}`}
      className="card overflow-hidden hover-lift will-change-transform shine"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      variants={variants}
    >
      <motion.div className="relative h-48 overflow-hidden">
        {isRemote ? (
          <picture>
            <source
              type="image/webp"
              srcSet={`${project.image}?fm=webp&w=480 480w, ${project.image}?fm=webp&w=800 800w`}
            />
            <motion.img
              src={`${project.image}&w=800`}
              alt={project.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              whileHover={prefersReduced ? {} : { scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            />
          </picture>
        ) : (
          <motion.img
            src={project.image}
            alt={project.alt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            whileHover={prefersReduced ? {} : { scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          />
        )}
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: prefersReduced ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>
      <div className="p-5">
        <h3 id={`project-${project.slug}`} className="font-heading text-xl font-semibold">
          <Link to={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
       
      </div>
    </motion.article>
  )
}
