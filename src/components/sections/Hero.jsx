import { useRef } from 'react'
import { motion } from 'framer-motion'
import HeroScene from '../three/HeroScene'
import { useInView } from 'react-intersection-observer'
import useMediaQuery from '../../hooks/useMediaQuery'

const Hero = () => {
  const textRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  
  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.5,
      },
    },
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        delay: 2.2
      }
    }
  }
  
  return (
    <section 
      id="hero" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden" 
      ref={ref}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bottom-[20%] bg-gradient-to-b from-transparent via-transparent to-dark-900 z-0" />
      
      {/* HeroScene with text overlay as children */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <HeroScene layout={isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}>
          <div className="flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: 'Poppins, Inter, Arial, sans-serif', textShadow: '0 2px 8px rgba(56,189,248,0.10)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-200">
                  Hey, It's Tomer
                </span>
              </motion.h1>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                ref={textRef}
              >
                <motion.h2 
                  variants={itemVariants} 
                  className="text-xl md:text-2xl text-gray-300 mb-6"
                >
                  <span className="font-mono">Developer & </span> <span className="font-mono">Researcher</span>
                </motion.h2>
                
                <motion.div variants={itemVariants}>
                  <p className="text-gray-400 max-w-xl mb-8 text-sm md:text-base">
                  Developer and Security Analyst specializing in OSINT research and threat data analysis, with hands-on experience. Skilled web developer, building automated pipelines and visualization tools to surface actionable insights. Continuously exploring emerging threats and enhancing security through code-driven solutions.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={buttonVariants}
                  className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3"
                >
                  <a 
                    href="#projects" 
                    className="px-5 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                  >
                    View My Work
                  </a>
                  <a 
                    href="#contact" 
                    className="px-5 py-2 text-sm rounded-md bg-dark-800 text-white border border-dark-700 hover:bg-dark-700 transition-colors"
                  >
                    Get In Touch
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </HeroScene>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 mb-1">Scroll Down</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary-500 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero