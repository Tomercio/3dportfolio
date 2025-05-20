import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float,
  PerspectiveCamera,
  Environment,
  Stars,
  Html
} from '@react-three/drei'
import * as THREE from 'three'

// Animated T Monogram using custom geometry
const TLogo = () => {
  const meshRef = useRef()
  
  const primaryColor = new THREE.Color('#38bdf8')
  const secondaryColor = new THREE.Color('#e879f9')
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time / 4) * 0.3
      meshRef.current.rotation.z = Math.sin(time / 4) * 0.1
    }
  })
  
  // Create a more subtle 3D "T" logo
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group 
        ref={meshRef}
        scale={[0.8, 0.8, 0.8]} // Scale down for better proportions
      >
        {/* Create a custom 3D "T" shape with a geometry */}
        <mesh>
          <torusGeometry args={[1.5, 0.4, 16, 32]} />
          <meshStandardMaterial
            color={primaryColor}
            emissive={secondaryColor}
            emissiveIntensity={0.2}
            roughness={0.4}
            metalness={0.7}
            wireframe={true}
          />
        </mesh>
        
        {/* Add a glowing sphere in the center */}
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={secondaryColor}
            emissive={primaryColor}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Background Elements - more subtle and smaller
const BackgroundElements = ({ count = 20 }) => {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
    }
  })
  
  const elements = []
  for (let i = 0; i < count; i++) {
    // Create more distant elements for better depth
    const distance = 15 + Math.random() * 25
    const angle = Math.random() * Math.PI * 2
    
    // Calculate position in a circular pattern
    const x = Math.sin(angle) * distance
    const y = (Math.random() - 0.5) * 20
    const z = Math.cos(angle) * distance
    
    const size = Math.random() * 0.5 + 0.2 // Larger elements
    const color = new THREE.Color('#60a5fa') // Lighter blue
    color.multiplyScalar(0.8 + Math.random() * 0.4) // Color variation
    
    elements.push(
      <mesh key={i} position={[x, y, z]}>
        {Math.random() > 0.6 ? (
          <torusGeometry args={[size * 3, size, 8, 16]} />
        ) : (
          <sphereGeometry args={[size, 8, 8]} />
        )}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3} // More visible
          wireframe={Math.random() > 0.5}
        />
      </mesh>
    )
  }
  
  return <group ref={groupRef}>{elements}</group>
}

// Main Scene Component
const Scene = ({ children, layout }) => {
  // Responsive positions and scales
  let logoPosition = [-3.5, 0, 0]
  let logoScale = 1.5 // Make the main object much bigger
  let textPosition = [3.5, 0, 0]
  let textAlign = 'left'
  let textWidth = '40vw'
  if (layout === 'mobile') {
    logoPosition = [0, 1.2, 0]
    textPosition = [0, -1.2, 0]
    logoScale = 1.0
    textAlign = 'center'
    textWidth = '90vw'
  } else if (layout === 'tablet') {
    logoPosition = [-1.5, 0, 0]
    textPosition = [1.5, 0, 0]
    logoScale = 1.2
    textAlign = 'left'
    textWidth = '60vw'
  } else if (layout === 'desktop') {
    logoPosition = [-3.5, 0, 0]
    textPosition = [3.5, 0, 0]
    logoScale = 1.5
    textAlign = 'left'
    textWidth = '40vw'
  }
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} /> {/* Narrower FOV */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      {/* Background elements behind main object */}
      <BackgroundElements count={40} />
      {/* Responsive TLogo position/scale */}
      <group position={logoPosition} scale={[logoScale, logoScale, logoScale]}>
        <TLogo />
      </group>
      <Stars radius={100} depth={50} count={800} factor={4} fade saturation={0.5} />
      <Environment preset="night" />
      {/* Responsive Html (text) position/width/alignment */}
      {children && (
        <group position={textPosition}>
          <Html center style={{ pointerEvents: 'auto', width: textWidth, textAlign: textAlign }}>
            {children}
          </Html>
        </group>
      )}
    </>
  )
}

// Main Component
const HeroScene = ({ children, layout = 'desktop' }) => {
  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      dpr={[1, 2]} // Limit pixel ratio for performance
      className="bg-dark-900"
    >
      <Scene layout={layout}>{children}</Scene>
    </Canvas>
  )
}

export default HeroScene