import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CommandPalette from './components/CommandPalette'
import TopProgress from './components/TopProgress'
import WelcomePopup from './components/WelcomePopup'
import ChatBot from './components/ChatBot'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
      <ChatBot />
      <Header />
      <main id="main" className="min-h-screen">
        <Home />
      </main>
      <Footer />
    </>
  )
}
