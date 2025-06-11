import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const About = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  
  // Timeline items with improved styling
  const timelineItems = [
    {
      period: "2018-2023",
      title: "Sales & Business Development",
      description: "Led business development and sales initiatives at tech startups, gaining valuable experience in understanding client needs and product-market fit."
    },
    {
      period: "2023-2024",
      title: "Transition to Development & Security",
      description: "Made a focused transition to web development and security, building a foundation in JavaScript, React, Web Security, modern tools, Cybersecurity and OSINT research."
    },
    {
      period: "2024-Present",
      title: "Developer & Security Analyst",
      description: "Building rich web interfaces and mobile applications using modern technologies and best practices. Security Analyst specializing in OSINT research and threat data analysis, with hands-on experience."
    }
  ]
  
  return (
    <section id="about" className="relative py-16 overflow-hidden bg-dark-800" ref={containerRef}>
      {/* Background elements with parallax effect */}
      <motion.div 
        className="absolute right-0 top-20 w-64 h-64 bg-primary-900/10 rounded-full filter blur-3xl opacity-30"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute left-0 bottom-20 w-48 h-48 bg-secondary-900/10 rounded-full filter blur-3xl opacity-30"
        style={{ y: y2 }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">About Me</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm md:text-base">
              From Business Development to Web & Security Development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bio section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold mb-3 text-white">My Journey</h3>
              <p className="text-gray-300 text-sm md:text-base">
                With a unique background that bridges business and technology, I bring a holistic perspective to development projects. My experience in sales has instilled a deep understanding of client needs and market positioning.
              </p>
              <p className="text-gray-300 text-sm md:text-base">
                For the past two years, I've been building web interfaces and security tools using modern technologies, focusing on exceptional user experiences.
              </p>
              <p className="text-gray-300 text-sm md:text-base">
                I'm passionate about creating efficient, scalable, and user-friendly applications that solve real-world problems and research threats.
              </p>
            </motion.div>
            
            {/* Timeline */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold mb-3 text-white">Career Timeline</h3>
              <div className="space-y-6">
                {timelineItems.map((item, index) => (
                  <div key={index} className="relative pl-8 border-l border-primary-600/30">
                    <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary-500 transform -translate-x-1.5"></div>
                    <span className="text-xs font-mono text-primary-400">{item.period}</span>
                    <h4 className="text-base font-semibold mt-1 text-white">{item.title}</h4>
                    <p className="text-gray-400 mt-1 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Skills/tech summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >

          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About