import React, { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import App from './App'

const ProjectsPage = lazy(() => import('./pages/Projects'))
const BlogPage = lazy(() => import('./pages/Blog'))

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
          path="/blog"
          element={
            <Suspense fallback={<div className="p-8">Loading blog…</div>}>
              <motion.div initial="hidden" animate="show" exit="exit" transition={{ duration: 0.35, ease: 'easeOut' }} variants={variants}>
                <BlogPage />
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
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
