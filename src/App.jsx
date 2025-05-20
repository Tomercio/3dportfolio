import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import { useEffect } from 'react'

// Remove ThemeProvider wrapping since we're only using dark mode now

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
    if (location.pathname !== '/') {
      navigate('/', { replace: true })
    }
  }, [location, navigate])
  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </AnimatePresence>
  )
}

export default App