import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function TopProgress() {
  const location = useLocation()
  const [show, setShow] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Trigger on route change
    setKey((k) => k + 1)
    setShow(true)
    const t = setTimeout(() => setShow(false), 500)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={key}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-primary"
        />
      )}
    </AnimatePresence>
  )
}
