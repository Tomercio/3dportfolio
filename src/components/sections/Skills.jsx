import { motion } from 'framer-motion'
import { 
  SiJavascript, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiDocker, SiFirebase, SiTestinglibrary 
} from 'react-icons/si'
import { FaAws, FaCube, FaShieldAlt, FaNetworkWired, FaSearch, FaChartBar } from 'react-icons/fa'

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
      { name: 'React', icon: <SiReact className="text-cyan-400" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400" /> },
      { name: 'Three.js', icon: <FaCube className="text-purple-400" /> },
    ],
  },
  {
    title: 'Backend & DevOps',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs className="text-green-500" /> },
      { name: 'Python', icon: <SiPython className="text-yellow-300" /> },
      { name: 'Docker', icon: <SiDocker className="text-blue-300" /> },
      { name: 'AWS', icon: <FaAws className="text-orange-400" /> },
      { name: 'Firebase', icon: <SiFirebase className="text-yellow-400" /> },
    ],
  },
  {
    title: 'Security Tools',
    skills: [
      { name: 'Penetration Testing', icon: <FaShieldAlt className="text-red-400" /> },
      { name: 'SAST/DAST', icon: <SiTestinglibrary className="text-pink-400" /> },
      { name: 'Log Analysis', icon: <FaChartBar className="text-blue-400" /> },
      { name: 'Network Security', icon: <FaNetworkWired className="text-green-400" /> },
      { name: 'SIEM', icon: <FaSearch className="text-yellow-400" /> },
    ],
  },
]

const Skills = () => {
  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Skills & Tools</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
            A combination of technical expertise and business acumen allows me to deliver comprehensive solutions.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-lg font-bold mb-4 text-white text-center tracking-wide uppercase letter-spacing-wide">
                {category.title}
              </h3>
              <div className="flex flex-col gap-3">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, boxShadow: '0 2px 16px 0 rgba(59,130,246,0.18)' }}
                    className="bg-dark-700/80 rounded-lg flex flex-row items-center justify-center px-4 py-2 shadow border border-dark-600 transition-all duration-200 min-h-[48px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="font-semibold text-gray-100 text-base">{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills