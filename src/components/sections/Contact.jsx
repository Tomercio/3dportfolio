import { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  
  // Form handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSubmitted(false)
    setShowThankYou(false)
    try {
      const response = await fetch('https://formspree.io/f/xeogdvjd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      })
      if (response.ok) {
        setIsSubmitted(true)
        setShowThankYou(true)
        setFormState({ name: '', email: '', message: '' })
        setTimeout(() => {
          setShowThankYou(false)
        }, 5000)
      } else {
        // Optionally handle error
        alert('There was an error submitting the form. Please try again.')
      }
    } catch (error) {
      alert('There was an error submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Social links with improved styling
  const socialLinks = [
    {
      name: 'Email',
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
      href: 'mailto:tomer@example.com',
    },
    {
      name: 'LinkedIn',
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
      href: 'https://linkedin.com/in/tomeramitai',
    },
    {
      name: 'GitHub',
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
      href: 'https://github.com/tomeramit',
    },
  ]
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
  
  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Get In Touch</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
            Let's connect to discuss projects, opportunities, or just exchange ideas about development and security.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold mb-4 text-white">Send a Message</h3>
              </motion.div>
              
              {showThankYou && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-dark-800 rounded-xl shadow-lg p-8 max-w-sm w-full text-center border border-primary-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-primary-500 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h4 className="text-xl font-bold mb-2 text-primary-400">
                      Thanks for submitting!
                    </h4>
                    <p className="text-primary-200 text-base">
                      We will be in touch soon.
                    </p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <motion.div variants={itemVariants} className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-dark-600 bg-dark-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-dark-600 bg-dark-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-5">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-dark-600 bg-dark-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-md bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </motion.div>
              </form>
            </motion.div>
            
            {/* Connect Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold mb-4 text-white">Connect with Me</h3>
                <p className="text-gray-400 mb-5 text-sm">
                  Feel free to reach out through any of these platforms. I'm always open to discussing new projects, ideas, or opportunities.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-dark-700/50 border border-dark-600 hover:bg-dark-600/50 transition-colors"
                  >
                    <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-2 rounded-full text-white">
                      {link.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{link.name}</h4>
                      <p className="text-xs text-gray-400">
                        {link.name === 'Email' ? 'amitayy4@gmail.com' : 
                         link.name === 'LinkedIn' ? 'linkedin.com/in/tomerai' : 
                         'github.com/Tomercio'}
                      </p>
                    </div>
                  </a>
                ))}
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-6">
                <div className="p-4 bg-dark-700/30 rounded-lg border border-dark-600">
                  <h4 className="font-bold mb-2 text-white text-sm">Looking for collaborations in:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Web Application Security Projects</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">AI-Powered Security Tools</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Interactive Web Experiences</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact