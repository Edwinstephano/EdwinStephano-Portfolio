import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

function useCssPrimaryColor() {
  return useMemo(() => {
    if (typeof window === 'undefined') return '#0ea5a4'
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || '#0ea5a4'
    return raw.toString().trim() || '#0ea5a4'
  }, [])
}

function Particles({ count = 800, baseSize = 0.018, rotationSpeed = { x: 0.02, y: 0.06 } }) {
  const prefersReduced = useReducedMotion()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 2.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      arr[i * 3] = x
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = z
    }
    return arr
  }, [count])
  const color = useCssPrimaryColor()
  const group = useMemo(() => new THREE.Object3D(), [])
  const matRef = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: baseSize,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        color,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }),
    [baseSize, color]
  )

  useFrame((state, delta) => {
    if (prefersReduced) return
    // Smooth idle rotation
    group.rotation.y += delta * rotationSpeed.y
    group.rotation.x += delta * rotationSpeed.x
    // Gentle pulsation for size and opacity
    const t = state.clock.getElapsedTime()
    const pulse = 0.5 + Math.sin(t * 0.8) * 0.5
    matRef.size = baseSize * (0.85 + pulse * 0.25)
    matRef.opacity = 0.6 + pulse * 0.25
    // Subtle parallax following pointer
    const targetX = state.pointer.y * -0.08
    const targetY = state.pointer.x * 0.12
    group.rotation.x += (targetX - group.rotation.x) * 0.02
    group.rotation.y += (targetY - group.rotation.y) * 0.02
  })

  return (
    <primitive object={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <primitive object={matRef} attach="material" />
      </points>
    </primitive>
  )
}

function Sparkles({ count = 140, size = 0.035 }) {
  const prefersReduced = useReducedMotion()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.4 + Math.random() * 2.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])
  const group = useMemo(() => new THREE.Object3D(), [])
  const matRef = useMemo(
    () =>
      new THREE.PointsMaterial({
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        color: '#ffffff',
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }),
    [size]
  )

  useFrame((state, delta) => {
    if (prefersReduced) return
    group.rotation.y -= delta * 0.03
    const t = state.clock.getElapsedTime()
    const twinkle = 0.5 + Math.sin(t * 2.2) * 0.5
    matRef.opacity = 0.35 + twinkle * 0.35
  })

  return (
    <primitive object={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <primitive object={matRef} attach="material" />
      </points>
    </primitive>
  )
}

export default function ThreeBackground() {
  const prefersReduced = useReducedMotion()
  // Default ON: only disable when user prefers reduced motion
  if (prefersReduced) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 55 }} dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <fog attach="fog" args={[new THREE.Color(0x000000), 6, 12]} />
        <Particles />
        <Sparkles />
      </Canvas>
    </div>
  )
}
