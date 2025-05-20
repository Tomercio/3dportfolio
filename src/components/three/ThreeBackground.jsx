import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Stars,
  PerspectiveCamera,
  Environment
} from '@react-three/drei'
import { useTheme } from '../../hooks/useTheme'
import * as THREE from 'three'

// Animated background shapes
const BackgroundShapes = ({ count = 15, theme }) => {
  const group = useRef()
  const { viewport } = useThree()
  
  // Create shapes with random positions and rotations
  const shapes = Array.from({ length: count }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * viewport.width * 2,
      (Math.random() - 0.5) * viewport.height * 2,
      (Math.random() - 8) * 5
    ],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ],
    size: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.02 + 0.005,
    shape: Math.floor(Math.random() * 3) // 0: box, 1: sphere, 2: torus
  }))
  
  // Colors based on theme
  const darkThemeColor = new THREE.Color('#1e3a8a') // darker blue
  const lightThemeColor = new THREE.Color('#0ea5e9') // lighter blue
  
  // Animation loop
  useFrame((state) => {
    if (!group.current) return
    
    const time = state.clock.getElapsedTime()
    
    group.current.children.forEach((mesh, i) => {
      const shape = shapes[i]
      // Slow rotation
      mesh.rotation.x += shape.speed * 0.5
      mesh.rotation.y += shape.speed * 0.7
      
      // Gentle floating movement
      mesh.position.y += Math.sin(time * shape.speed * 2) * 0.01
      mesh.position.x += Math.cos(time * shape.speed) * 0.01
    })
  })
  
  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <mesh
          key={i}
          position={shape.position}
          rotation={shape.rotation}
        >
          {shape.shape === 0 ? (
            <boxGeometry args={[shape.size, shape.size, shape.size]} />
          ) : shape.shape === 1 ? (
            <sphereGeometry args={[shape.size, 16, 16]} />
          ) : (
            <torusGeometry args={[shape.size, shape.size / 3, 16, 32]} />
          )}
          <meshStandardMaterial 
            color={theme === 'dark' ? darkThemeColor : lightThemeColor}
            opacity={0.2}
            transparent
            wireframe={true}
          />
        </mesh>
      ))}
    </group>
  )
}

// Grid floor component
const Grid = ({ size = 30, divisions = 30, theme }) => {
  const grid = useRef()
  
  const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0'
  
  return (
    <gridHelper
      ref={grid}
      args={[size, divisions, gridColor, gridColor]}
      position={[0, -3, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  )
}

// Main scene component
const Scene = () => {
  const { theme } = useTheme()
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <BackgroundShapes count={15} theme={theme} />
      <Grid theme={theme} />
      <Stars fade depth={50} factor={4} saturation={0} />
      <Environment preset="city" />
    </>
  )
}

// Main component
const ThreeBackground = ({ className = '' }) => {
  const { theme } = useTheme()
  
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        shadows
        gl={{ antialias: true }}
        className="bg-gradient-radial from-gray-100 to-white dark:from-dark-800 dark:to-dark-900"
        camera={{ position: [0, 0, 10], fov: 60 }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default ThreeBackground