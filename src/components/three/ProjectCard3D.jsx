import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const ProjectCard3D = ({ project, onClick }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const { theme } = useTheme()
  
  // Calculate the rotation based on mouse position
  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return
    
    const card = cardRef.current
    const cardRect = card.getBoundingClientRect()
    const cardCenterX = cardRect.left + cardRect.width / 2
    const cardCenterY = cardRect.top + cardRect.height / 2
    
    // Calculate rotation (limited to max 10 degrees)
    const rotateY = ((e.clientX - cardCenterX) / (cardRect.width / 2)) * 10
    const rotateX = ((cardCenterY - e.clientY) / (cardRect.height / 2)) * 10
    
    setRotation({ x: rotateX, y: rotateY })
  }
  
  // Reset rotation when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }
  
  // Setup and cleanup event listeners
  useEffect(() => {
    const currentCard = cardRef.current
    if (currentCard) {
      currentCard.addEventListener('mousemove', handleMouseMove)
      currentCard.addEventListener('mouseleave', handleMouseLeave)
      
      return () => {
        currentCard.removeEventListener('mousemove', handleMouseMove)
        currentCard.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isHovered])
  
  // Generate glow effect colors based on theme
  const glowColor = theme === 'dark' 
    ? 'rgba(56, 189, 248, 0.15)' // Light blue for dark mode
    : 'rgba(2, 132, 199, 0.1)'   // Darker blue for light mode
  
  return (
    <motion.div
      ref={cardRef}
      className="project-card cursor-pointer h-[420px] group"
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'transform 0.2s ease',
        boxShadow: isHovered ? `0 0 30px ${glowColor}` : 'none'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Project Image with gradient overlay */}
        <div className="relative h-[200px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="p-6 h-[220px] flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-dark-700 rounded-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 rounded-md text-xs font-medium">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* View project button or indicator */}
          <div className="mt-4 text-primary-600 dark:text-primary-400 text-sm font-medium flex items-center">
            View Project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
        
        {/* 3D effect elements */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isHovered ? 
              `radial-gradient(circle at ${rotation.y < 0 ? '30%' : '70%'} ${rotation.x < 0 ? '70%' : '30%'}, ${glowColor}, transparent 50%)` 
              : 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        ></div>
        
        {/* Reflective edge */}
        <div 
          className={`absolute inset-0 border border-white/5 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        ></div>
      </div>
    </motion.div>
  )
}

export default ProjectCard3D