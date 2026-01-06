import React, { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App'

const ProjectsPage = lazy(() => import('./pages/Projects'))
const BlogPage = lazy(() => import('./pages/Blog'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudy'))
const BookPage = lazy(() => import('./pages/Book'))
const CertificatePage = lazy(() => import('./pages/Certificate'))

function AnimatedRoutes() {
  const location = useLocation()
  const variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } }
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<div className="p-8">Loading projects…</div>}>
              <motion.div initial="hidden" animate="show" exit="exit" transition={{ duration: 0.35, ease: 'easeOut' }} variants={variants}>
                <ProjectsPage />
              </motion.div>
            </Suspense>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <Suspense fallback={<div className="p-8">Loading case study…</div>}>
              <motion.div initial="hidden" animate="show" exit="exit" transition={{ duration: 0.35, ease: 'easeOut' }} variants={variants}>
                <CaseStudyPage />
              </motion.div>
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<div className="p-8">Loading blog…</div>}>
              <motion.div initial="hidden" animate="show" exit="exit" transition={{ duration: 0.35, ease: 'easeOut' }} variants={variants}>
                <BlogPage />
              </motion.div>
            </Suspense>
          }
        />
        <Route
          path="/book"
          element={
            <Suspense fallback={<div className="p-8">Loading…</div>}>
              <motion.div initial="hidden" animate="show" exit="exit" transition={{ duration: 0.35, ease: 'easeOut' }} variants={variants}>
                <BookPage />
              </motion.div>
            </Suspense>
          }
        />
        <Route
          path="/certificates/:id"
          element={
            <Suspense fallback={<div className="p-8">Loading certificate…</div>}>
              <motion.div initial="hidden" animate="show" exit="exit" transition={{ duration: 0.35, ease: 'easeOut' }} variants={variants}>
                <CertificatePage />
              </motion.div>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
