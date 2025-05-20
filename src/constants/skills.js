/**
 * Skills data for the portfolio
 * This centralized file allows easy updates to skills information
 */

export const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { 
          name: 'JavaScript', 
          level: 90, 
          icon: '/assets/images/logos/javascript.svg',
          description: 'Proficient in modern JavaScript (ES6+), including async/await, modules, and functional programming paradigms.'
        },
        { 
          name: 'React', 
          level: 85, 
          icon: '/assets/images/logos/react.svg',
          description: 'Expert in React ecosystem including hooks, context API, and state management solutions like Redux.'
        },
        { 
          name: 'TypeScript', 
          level: 80, 
          icon: '/assets/images/logos/typescript.svg',
          description: 'Strong typing skills with TypeScript for building robust, maintainable applications.'
        },
        { 
          name: 'Tailwind CSS', 
          level: 90, 
          icon: '/assets/images/logos/tailwind.svg',
          description: 'Advanced knowledge of Tailwind CSS for rapid UI development with custom design systems.'
        },
        { 
          name: 'Three.js', 
          level: 75, 
          icon: '/assets/images/logos/threejs.svg',
          description: 'Creating interactive 3D experiences for the web using Three.js and React Three Fiber.'
        },
      ],
    },
    {
      title: 'Backend & DevOps',
      skills: [
        { 
          name: 'Node.js', 
          level: 80, 
          icon: '/assets/images/logos/nodejs.svg',
          description: 'Building scalable APIs and services with Express and other Node.js frameworks.'
        },
        { 
          name: 'Python', 
          level: 75, 
          icon: '/assets/images/logos/python.svg',
          description: 'Using Python for security tools, data analysis, and automation scripts.'
        },
        { 
          name: 'Docker', 
          level: 70, 
          icon: '/assets/images/logos/docker.svg',
          description: 'Containerizing applications for consistent development and deployment environments.'
        },
        { 
          name: 'AWS', 
          level: 65, 
          icon: '/assets/images/logos/aws.svg',
          description: 'Deploying and managing applications on AWS cloud infrastructure.'
        },
        { 
          name: 'Firebase', 
          level: 80, 
          icon: '/assets/images/logos/firebase.svg',
          description: 'Implementing authentication, real-time databases, and serverless functions with Firebase.'
        },
      ],
    },
  ];
  
  export default skillCategories;