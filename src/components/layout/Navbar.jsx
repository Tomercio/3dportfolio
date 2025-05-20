import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  // Handle page load and hash changes
  useEffect(() => {
    // If there's no hash in the URL, scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }

    // Handle hash changes
    const handleHashChange = () => {
      if (!window.location.hash) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])
  
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]
  
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 rounded-b-2xl transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-900/80 backdrop-blur-md border-dark-800'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <RouterLink 
            to="/" 
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = ''
              scrollToTop()
            }}
          >
            <img src="/tl.png" alt="Tomer Amitai Logo" className="h-12 w-12 scale-[1.5] object-contain ml-7" />
          </RouterLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-primary-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              className="text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden py-4 mt-3 bg-dark-800 rounded-lg border border-dark-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 px-4 text-gray-300 hover:bg-dark-700 hover:text-primary-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Navbar