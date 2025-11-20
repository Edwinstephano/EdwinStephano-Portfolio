import { memo, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

function useThemeRGB() {
  return useMemo(() => {
    const css = getComputedStyle(document.documentElement)
    const p = css.getPropertyValue('--color-primary')?.trim() || '#0ea5a4'
    const a = css.getPropertyValue('--color-accent')?.trim() || '#7c3aed'
    const hexToRGB = (hex) => {
      const m = hex.replace('#', '')
      const bigint = parseInt(m.length === 3 ? m.split('').map((c) => c + c).join('') : m, 16)
      return [((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255]
    }
    return { primary: hexToRGB(p), accent: hexToRGB(a) }
  }, [])
}

function FullscreenAurora() {
  const prefersReduced = useReducedMotion()
  const { size, viewport } = useThree()
  const { primary, accent } = useThemeRGB()
  const matRef = useRef()

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uPrimary: { value: new THREE.Color(primary[0], primary[1], primary[2]) },
        uAccent: { value: new THREE.Color(accent[0], accent[1], accent[2]) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uPrimary;
        uniform vec3 uAccent;

        // Simple hash noise
        float hash(vec2 p){
          p = fract(p*vec2(123.34, 456.21));
          p += dot(p, p+45.32);
          return fract(p.x*p.y);
        }

        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
        }

        void main() {
          vec2 uv = vUv;
          // Center and scale for bands
          vec2 p = (uv - 0.5) * vec2(uResolution.x/uResolution.y, 1.0) * 1.4;

          float t = uTime * 0.08;
          // Layered bands using noise and sines
          float n1 = noise(p*1.2 + t);
          float n2 = noise(p*2.1 - t*0.8);
          float bands = sin((p.y + n1*0.6 + n2*0.4 + t) * 4.2);
          bands = smoothstep(0.0, 1.0, bands*0.5 + 0.5);

          // Mix primary and accent colors
          vec3 col = mix(uPrimary, uAccent, bands);

          // Soft vignette
          float vign = smoothstep(1.2, 0.2, length(p));
          col *= vign;

          // Subtle glow
          float glow = 0.25 + 0.75 * bands;
          col *= glow;

          gl_FragColor = vec4(col, 0.55);
        }
      `
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((_, delta) => {
    if (!matRef.current) return
    // freeze animation for reduced motion
    if (!prefersReduced) matRef.current.uniforms.uTime.value += delta
  })

  // Update resolution on resize
  if (matRef.current) {
    matRef.current.uniforms.uResolution.value.set(size.width, size.height)
  }

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive ref={matRef} object={material} attach="material" />
    </mesh>
  )
}

function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[60vmax] w-[60vmax] rounded-full bg-primary/20 blur-3xl animate-aurora" />
      <div className="absolute top-1/3 -right-32 h-[50vmax] w-[50vmax] rounded-full bg-accent/20 blur-3xl animate-aurora" />
      <div className="absolute -bottom-32 left-1/4 h-[45vmax] w-[45vmax] rounded-full bg-emerald-400/20 blur-3xl animate-aurora" />
      <div className="absolute bottom-0 right-1/3 h-[40vmax] w-[40vmax] rounded-full bg-sky-400/20 blur-3xl animate-aurora" />
    </div>
  )
}

export default memo(Aurora)
