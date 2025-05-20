import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Button component with improved styling
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  to,
  className = '',
  disabled = false,
  animated = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  onClick,
  ...props
}, ref) => {
  // Button style variants with improved styling
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-dark-700 text-white hover:bg-dark-600 border border-dark-600',
    outline: 'bg-transparent text-primary-400 hover:bg-primary-900/30 border border-primary-500/50',
    ghost: 'bg-transparent text-gray-300 hover:bg-white/10',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  
  // Button sizes with improved proportions
  const sizes = {
    sm: 'text-xs px-2 py-1 rounded',
    md: 'text-sm px-3 py-1.5 rounded-md',
    lg: 'text-md px-4 py-2 rounded-lg',
    xl: 'text-lg px-6 py-3 rounded-xl',
  }
  
  // Common button styles
  const buttonClasses = `
    inline-flex items-center justify-center font-medium
    transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-dark-900
    disabled:opacity-50 disabled:pointer-events-none
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim()
  
  // Content with icon
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={`mr-2 ${animated ? 'group-hover:-translate-x-0.5 transition-transform' : ''}`}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={`ml-2 ${animated ? 'group-hover:translate-x-0.5 transition-transform' : ''}`}>
          {icon}
        </span>
      )}
    </>
  )
  
  // Wrapped in motion component if animated
  const ButtonComponent = animated ? motion[as] : as
  const animationProps = animated 
    ? { 
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.98 },
        className: `group ${buttonClasses}`
      } 
    : { className: buttonClasses }
  
  // Render based on the 'as' prop
  if (as === 'a' && href) {
    return (
      <ButtonComponent
        ref={ref}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        disabled={disabled}
        onClick={onClick}
        {...animationProps}
        {...props}
      >
        {content}
      </ButtonComponent>
    )
  }
  
  if (as === 'link' && to) {
    return (
      <ButtonComponent
        ref={ref}
        to={to}
        disabled={disabled}
        onClick={onClick}
        {...animationProps}
        {...props}
        component={Link}
      >
        {content}
      </ButtonComponent>
    )
  }
  
  return (
    <ButtonComponent
      ref={ref}
      type={as === 'button' ? 'button' : undefined}
      disabled={disabled}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {content}
    </ButtonComponent>
  )
})

Button.displayName = 'Button'

export default Button