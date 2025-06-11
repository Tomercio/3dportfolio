import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ProjectCard = ({ project }) => {
  return (
    <div
      className="bg-dark-800/80 border border-dark-700 rounded-2xl shadow-lg ring-2 ring-blue-400/10 p-4 flex flex-col items-center max-w-xs mx-auto min-h-[420px] h-[500px] cursor-pointer transition-transform duration-200 hover:shadow-[0_0_12px_0_rgba(59,130,246,0.25)] hover:scale-102 hover:ring-0"
      onClick={() => window.open(project.githubUrl, '_blank')}
      tabIndex={0}
      role="button"
      onKeyPress={e => { if (e.key === 'Enter') window.open(project.githubUrl, '_blank') }}
    >
      <div className="w-full flex justify-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-full max-w-[260px] h-40 object-contain rounded-xl bg-dark-700 mb-4 border border-dark-600"
          onError={e => (e.target.style.opacity = 0)}
        />
      </div>
      <h3 className="text-2xl font-bold text-white text-center mb-2 mt-2">{project.title}</h3>
      <p className="text-gray-300 text-sm text-center mb-4 px-2">{project.details || project.description}</p>
      <div className="flex-grow" />
      <div className="flex flex-wrap justify-center gap-2 mb-0 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-blue-300/20 text-blue-300 text-xs font-semibold shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  // Project data with improved styling and static colors instead of image URLs
  const projects = [
    {
      title: 'Phishing Detector',
      details: 'A Phishing Detector application programmed with Python.Instractions: You insert the email into the machine, choose in which format to get it, and then get the result',
      image: '/pd.png', // Fallback to a gradient if this fails to load
      tags: ['Python', 'TTK'],
      githubUrl: 'https://github.com/Tomercio/phishing-detector',
    },
    {
      title: 'Malware Sandbox',
      details: 'An interactive platform to analyze suspicious files and URLs.Instractions: Inside the machine, you upload the suspicous file, choose the relevant filters and run it. I suggest to give it some time, to do overall research.In the end you have the option to see the result In web, or to download it to Text file.',
      image: '/ma.png', // Fallback to a gradient if this fails to load
      tags: ['Python', 'WatchDog', 'Docker','Scapy'
      ],
      githubUrl: 'https://github.com/Tomercio/malware-analysis',
    },
    {
      id: 'lsscanner',
      title: 'LSScanner',
      details: 'LSScanner is a web tool that turns massive, unreadable JSON logs into a flat, human-readable format. It offers instant value search, clear custom labels, one-click field copying, and aggregates data from three info-gathering sites in a single interface.',
      image: '/lsscanner.png',
      tags: ['JavaScript', 'React', 'Security'],
      githubUrl: 'https://github.com/Tomercio/LSScanner',
    },
    {
      title: 'Space Website',
      details: 'A Website that I made for myself to practice with Three.js and to create something unique in the space.',
      image: '/spaceimage.png',
      tags: ['JavaScript', 'React', 'Tailwind','Three.js'],
      githubUrl: 'https://github.com/Tomercio/Space-Portfolio',
    },
    {
      title: 'Peteks App',
      details: 'PETEKS is a Flutter-built note-taking app that combines rich-text editing (via flutter_quill), multimedia embeds and pattern-lock security for encrypted access. It leverages local/cloud storage, image and share services to enable seamless syncing and collaborative editing across devices.',
      image: '/peteksScreen.jpg',
      tags: ['Flutter', 'Dart', 'Rich-text Editor', 'Security/locking', 'Hashing/crypto'],
      githubUrl: 'https://github.com/Tomercio',
    },
    {
      title: 'Trilligence',
      details: 'Trilligence aggregates OSINT feeds into a unified, searchable interface with a React UI and automated Python/JavaScript ingestion. It correlates data, maps indicators to MITRE ATT&CK, and provides visualizations and reports for efficient threat analysis.',
      image: '/trili.png',
      tags: ['Vite', 'React', 'Tailwind'],
      githubUrl: 'trilligence.vercel.app',
    },
  ]
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
  
  return (
    <section id="projects" className="py-16 bg-gradient-to-b from-dark-900 to-dark-800" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Projects Showcase</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
            Explore my projects focusing on security research and web development.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {projects.map((project) => (
            <motion.div key={project.id || project.title} variants={itemVariants} className="flex flex-col items-center">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects