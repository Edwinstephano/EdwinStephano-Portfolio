import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import certificates from '../data/certificates'

export default function Certificate() {
  const { id } = useParams()
  const cert = useMemo(() => certificates.find((c) => c.id === id), [id])

  if (!cert) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-heading text-2xl font-bold">Certificate not found</h1>
        <p className="mt-2 text-muted">We couldn't find that certificate.</p>
        <div className="mt-6">
          <Link to="/" className="btn-secondary">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-bold">{cert.title}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{cert.issuer} • {cert.date}</p>
        </div>
        <Link to="/#certificates" className="btn-secondary">Back to Certificates</Link>
      </div>

      <div className="mt-8 card overflow-hidden">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-auto object-contain bg-white"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="p-8 text-center text-muted">
            No image available for this certificate.
          </div>
        )}
      </div>

      {cert.description && (
        <p className="mt-6 text-slate-700 dark:text-slate-300">
          {cert.description}
        </p>
      )}
    </div>
  )
}
