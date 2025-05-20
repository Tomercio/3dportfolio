import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import Contact from '../components/sections/Contact'

// Remove all theme-related imports and context

const Home = () => {
  // Scroll to section if URL has a hash
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
    
    // Debug - log if sections are in the DOM
    console.log("Sections in DOM:", {
      hero: document.getElementById('hero'),
      about: document.getElementById('about'),
      projects: document.getElementById('projects'),
      skills: document.getElementById('skills'),
      research: document.getElementById('research'),
      contact: document.getElementById('contact')
    })
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero section */}
      <Hero />
      
      {/* Make sure sections appear by wrapping them in a relative container */}
      <div className="relative z-10">
        <About />
        <Projects />
        <Skills />
        {/* <SecurityResearch /> */}
        <Contact />
      </div>
    </motion.div>
  )
}

export default Home