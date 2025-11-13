import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CommandPalette from './components/CommandPalette'
import TopProgress from './components/TopProgress'

export default function App() {
  return (
    <>
      <TopProgress />
      <CommandPalette />
      <Header />
      <main id="main" className="min-h-screen">
        <Home />
      </main>
      <Footer />
    </>
  )
}
