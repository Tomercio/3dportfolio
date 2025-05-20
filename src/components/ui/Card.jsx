import { forwardRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Card component with better proportions and styling
 */
const Card = forwardRef(({
  children,
  className = '',
  variant = 'default', // default, elevated, outline, flat
  padding = 'default', // none, small, default, large
  hover = false,
  animated = false,
  onClick,
  ...props
}, ref) => {
  // Card variants with more subtle styling
  const variants = {
    default: 'bg-white/5 backdrop-blur-sm border border-white/10',
    elevated: 'bg-white/10 backdrop-blur-sm border border-white/15 shadow-lg',
    outline: 'bg-transparent border border-white/20',
    flat: 'bg-dark-700/50',
  }
  
  // Padding options with more balanced spacing
  const paddingOptions = {
    none: '',
    small: 'p-2',
    default: 'p-4', // Reduced padding
    large: 'p-6', // Reduced padding
  }
  
  // Hover effects
  const hoverEffects = hover 
    ? 'transition-all hover:bg-white/15 transform hover:-translate-y-1'
    : ''
  
  // Combine all classes
  const cardClasses = `
    rounded-lg overflow-hidden
    ${variants[variant]}
    ${paddingOptions[padding]}
    ${hoverEffects}
    ${className}
  `.trim()
  
  // Use motion.div for animated cards
  if (animated) {
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        whileHover={hover ? { y: -5, scale: 1.02 } : {}}
        whileTap={onClick ? { scale: 0.98 } : {}}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
  
  // Standard div for non-animated cards
  return (
    <div
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export default Card