import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  // Social links
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/tomeramit',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/tomeramitai',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:tomer@example.com',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ]
  
  return (
    <motion.footer
      className="bg-dark-800 rounded-t-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
      <div className="container mx-auto px-4 py-5 flex flex-col items-center justify-center text-center">
        <span
          className="flex justify-center items-center mb-1"
        >
          <img src="/tl.png" alt="Tomer Amitai Logo" className="h-14 w-14 scale-[1.7] object-contain" />
        </span>
        <p className="text-gray-500 dark:text-gray-400 text-base italic mb-4">
          Developer & Researcher
        </p>
        <div className="flex items-center justify-center space-x-6 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-2xl"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="w-full border-t border-gray-200 dark:border-dark-700 pt-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} Tomer Amitai. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer