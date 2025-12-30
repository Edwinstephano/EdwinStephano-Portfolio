import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CommandPalette from './components/CommandPalette'
import TopProgress from './components/TopProgress'
import WelcomePopup from './components/WelcomePopup'
import { useEffect, Suspense, lazy } from 'react'
import { useLocation } from 'react-router-dom'

const ChatBot = lazy(() => import('./components/ChatBot'))

export default function App() {
  const location = useLocation()

  // Smooth-scroll to hash targets on navigation
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location])
  return (
    <>
      <TopProgress />
      <CommandPalette />
      <WelcomePopup />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
      <Header />
      <main id="main" className="min-h-screen">
        <Home />
      </main>
      <Footer />
    </>
  )
}
