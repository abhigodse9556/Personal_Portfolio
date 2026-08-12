'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import {
  ShaderMaterial,
  Uniform,
  Vector2,
  Color,
  IcosahedronGeometry,
  TorusGeometry,
  SphereGeometry,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  Points,
  MeshBasicMaterial,
  AdditiveBlending,
  BackSide,
  Mesh,
  Group,
  DoubleSide,
  CapsuleGeometry,
  TorusKnotGeometry,
  CylinderGeometry,
  OrthographicCamera,
} from 'three';
import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// Seeded random for consistent SSR/client values
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const seededRandom = mulberry32(12345);

// Helper to create seeded random with different seeds
function createSeededRandom(seed: number) {
  return mulberry32(seed);
}

// Extend Three.js classes for use in JSX
extend({
  shaderMaterial: ShaderMaterial,
  uniform: Uniform,
  vector2: Vector2,
  color: Color,
  icosahedronGeometry: IcosahedronGeometry,
  torusGeometry: TorusGeometry,
  sphereGeometry: SphereGeometry,
  pointsMaterial: PointsMaterial,
  bufferGeometry: BufferGeometry,
  bufferAttribute: BufferAttribute,
  points: Points,
  meshBasicMaterial: MeshBasicMaterial,
  mesh: Mesh,
  group: Group,
  capsuleGeometry: CapsuleGeometry,
  torusKnotGeometry: TorusKnotGeometry,
  cylinderGeometry: CylinderGeometry,
  orthographicCamera: OrthographicCamera,
});

// Custom hook for reduced motion
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduced(media.matches);
      const listener = () => setReduced(media.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);
  return reduced;
}

// Shader code
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uAccentColor;
  uniform vec3 uRimColor;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2 uResolution;
  
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  
  #define PI 3.14159265359
  
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  float fresnel(vec3 viewDir, vec3 normal, float power) {
    float dotProduct = dot(viewDir, normal);
    float clamped = clamp(1.0 - abs(dotProduct), 0.0, 1.0);
    return pow(clamped, power);
  }
  
  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnelTerm = fresnel(viewDir, vNormal, 3.0);
    
    vec2 uv = vUv * 4.0;
    float pattern = fbm(uv + uTime * 0.05);
    
    vec3 baseColor = mix(uColor, uAccentColor, pattern * 0.3);
    vec3 rimColor = uRimColor * fresnelTerm * 2.0;
    vec3 accentGlow = uAccentColor * fresnelTerm * 3.0 * uIntensity;
    
    float edgeGlow = smoothstep(0.7, 1.0, fresnelTerm);
    vec3 finalColor = baseColor + rimColor + accentGlow * edgeGlow;
    
    float vignette = 1.0 - length(vUv - 0.5) * 0.5;
    finalColor *= vignette;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Hero Object with custom shader material
function HeroObject({ intensity = 1.2, reducedMotion }: { intensity?: number; reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);
  
  const mainMaterial = useMemo(() => 
    new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: new Color(0xb89038) },
        uAccentColor: { value: new Color(0xd4a843) },
        uRimColor: { value: new Color(0x1a1a2e) },
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uResolution: { value: new Vector2(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080) },
      },
      transparent: true,
      side: DoubleSide,
    }), [intensity]
  );

  const wireMaterial = useMemo(() => 
    new MeshBasicMaterial({
      color: 0xd4a843,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      side: DoubleSide,
    }), []
  );

  const ringMaterial = useMemo(() => 
    new MeshBasicMaterial({
      color: 0xd4a843,
      transparent: true,
      opacity: 0.3,
      side: DoubleSide,
    }), []
  );

  const particleMaterial = useMemo(() => 
    new PointsMaterial({
      color: 0xe8c56d,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
    }), []
  );

  const glowMaterial = useMemo(() => 
    new MeshBasicMaterial({
      color: 0xd4a843,
      transparent: true,
      opacity: 0.03,
      side: BackSide,
      depthWrite: false,
    }), []
  );

  const mainGeo = useMemo(() => {
    const geo = new IcosahedronGeometry(1.2, 6);
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      const len = Math.sqrt(x * x + y * y + z * z);
      const noise = (Math.sin(x * 10) + Math.cos(y * 10) + Math.sin(z * 10)) * 0.03;
      const newLen = len + noise;
      positions.setXYZ(i, x / len * newLen, y / len * newLen, z / len * newLen);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const wireGeo = useMemo(() => new IcosahedronGeometry(1.25, 3), []);
  const glowGeo = useMemo(() => new SphereGeometry(2.5, 32, 32), []);

  const ringGeos = useMemo(() => {
    const rand = createSeededRandom(1000);
    return Array.from({ length: 3 }, (_, i) => {
      const geo = new TorusGeometry(1.6 + i * 0.3, 0.02, 16, 64);
      const quat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          rand() * Math.PI,
          rand() * Math.PI,
          rand() * Math.PI
        )
      );
      geo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(quat));
      return { geometry: geo, speed: 0.1 + i * 0.05 };
    });
  }, []);

  const particleGeo = useMemo(() => {
    const rand = createSeededRandom(2000);
    const geo = new BufferGeometry();
    const count = 200;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const radius = 1.4 + rand() * 0.8;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      sizes[i] = rand() * 3 + 1;
      alphas[i] = rand() * 0.5 + 0.2;
    }
    
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    geo.setAttribute('size', new BufferAttribute(sizes, 1));
    geo.setAttribute('alpha', new BufferAttribute(alphas, 1));
    return geo;
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0015;
      groupRef.current.rotation.y += 0.0025;
    }
    
    mainMaterial.uniforms.uTime.value = time;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={mainGeo} material={mainMaterial} castShadow receiveShadow />
      <mesh geometry={wireGeo} material={wireMaterial} />
      <mesh geometry={glowGeo} material={glowMaterial} />
      <points geometry={particleGeo} material={particleMaterial} />
      {ringGeos.map((ring, i) => (
        <mesh key={i} geometry={ring.geometry} material={ringMaterial} />
      ))}
    </group>
  );
}

// Orbital Rings Component
function OrbitalRings({ reducedMotion }: { reducedMotion: boolean }) {
  const ringsRef = useRef<Group>(null);
  
  const ringMaterial = useMemo(() => 
    new MeshBasicMaterial({
      color: 0xd4a843,
      transparent: true,
      opacity: 0.15,
      side: DoubleSide,
    }), []
  );
  
  const ringGeos = useMemo(() => [
    new TorusGeometry(2.4, 0.01, 16, 128),
    new TorusGeometry(1.8, 0.01, 16, 128),
    new TorusGeometry(1.2, 0.01, 16, 128),
  ], []);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, i) => {
        const speed = [0.01, -0.015, 0.02][i];
        child.rotation.z = time * speed;
        child.rotation.x = Math.PI / 2;
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {ringGeos.map((geo, i) => (
        <mesh key={i} geometry={geo} material={ringMaterial} />
      ))}
    </group>
  );
}

// Floating Particles Component
function FloatingParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const particlesRef = useRef<Points>(null);
  
  const particleGeo = useMemo(() => {
    const rand = createSeededRandom(4000);
    const geo = new BufferGeometry();
    const count = 50;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const offsets = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + rand() * 1.5;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      sizes[i] = rand() * 4 + 2;
      
      offsets[i * 3] = rand() * Math.PI * 2;
      offsets[i * 3 + 1] = rand() * Math.PI * 2;
      offsets[i * 3 + 2] = rand() * Math.PI * 2;
    }
    
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    geo.setAttribute('size', new BufferAttribute(sizes, 1));
    geo.setAttribute('offset', new BufferAttribute(offsets, 3));
    return geo;
  }, []);
  
  const particleMaterial = useMemo(() => 
    new PointsMaterial({
      color: 0xd4a843,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
    }), []
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      const offsets = particlesRef.current.geometry.attributes.offset.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + offsets[i]) * 0.0008;
        positions[i + 1] += Math.cos(time + offsets[i + 1]) * 0.0008;
        positions[i + 2] += Math.sin(time + offsets[i + 2]) * 0.0005;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={particleGeo} material={particleMaterial} />
  );
}

// Showcase Object (Product Capsule)
function ShowcaseObject({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);
  
  const bodyMat = useMemo(() => 
    new MeshBasicMaterial({ color: 0xb89038 }), []
  );
  
  const capMat = useMemo(() => 
    new MeshBasicMaterial({ color: 0xd4a843 }), []
  );
  
  const bandMat = useMemo(() => 
    new MeshBasicMaterial({ color: 0xe8c56d }), []
  );
  
  const lensMat = useMemo(() => 
    new MeshBasicMaterial({ color: 0x0a0a0f, transparent: true, opacity: 0.3 }), []
  );

  useFrame((state) => {
    if (reducedMotion) return;
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <mesh geometry={new CapsuleGeometry(0.4, 1.2, 8, 16)} material={bodyMat} position={[0, 0.2, 0]} castShadow receiveShadow />
      <mesh geometry={new SphereGeometry(0.42, 32, 32)} material={capMat} position={[0, 1.0, 0]} scale={[1, 0.5, 1]} />
      <mesh geometry={new SphereGeometry(0.42, 32, 32)} material={capMat} position={[0, -0.6, 0]} scale={[1, 0.5, 1]} />
      {[0, 1, 2].map(i => (
        <mesh
          key={i}
          geometry={new TorusGeometry(0.45, 0.03, 16, 64)}
          material={bandMat}
          position={[0, -0.2 + i * 0.4, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
      <mesh
        geometry={new CylinderGeometry(0.15, 0.15, 0.08, 32)}
        material={lensMat}
        position={[0, 0.9, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

// CTA Object (Torus Knot with particles)
function CTAObject({ reducedMotion }: { reducedMotion: boolean }) {
  const torusRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);
  const particlesRef = useRef<Points>(null);
  
  const torusMaterial = useMemo(() => 
    new MeshBasicMaterial({ 
      color: 0xb89038, 
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    }), []
  );
  
  const innerMaterial = useMemo(() => 
    new MeshBasicMaterial({ color: 0xe8c56d }), []
  );
  
  const particleMaterial = useMemo(() => 
    new PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
    }), []
  );

  const torusGeo = useMemo(() => new TorusKnotGeometry(0.8, 0.25, 128, 32, 2, 3), []);
  const innerGeo = useMemo(() => new TorusKnotGeometry(0.5, 0.15, 64, 16, 3, 2), []);
  
  const particleGeo = useMemo(() => {
    const rand = createSeededRandom(3000);
    const geo = new BufferGeometry();
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const u = rand();
      const v = rand();
      const r = 1.3 + rand() * 0.5;
      const theta = u * Math.PI * 4;
      const phi = v * Math.PI * 2;
      
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi);
      
      const color = new Color().setHSL(0.12, 0.8, 0.5 + rand() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = rand() * 2 + 0.5;
    }
    
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    geo.setAttribute('color', new BufferAttribute(colors, 3));
    geo.setAttribute('size', new BufferAttribute(sizes, 1));
    return geo;
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.002;
      torusRef.current.rotation.y += 0.003;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= 0.003;
      innerRef.current.rotation.y -= 0.002;
      innerRef.current.rotation.z += 0.001;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0003;
      
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time * 2 + i * 0.01) * 0.0005;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={torusRef} geometry={torusGeo} material={torusMaterial} castShadow receiveShadow />
      <mesh ref={innerRef} geometry={innerGeo} material={innerMaterial} />
      <points ref={particlesRef} geometry={particleGeo} material={particleMaterial} />
    </group>
  );
}

// Scene components
function LoadingFallback() {
  return (
    <Html
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#8b8b9a',
        fontSize: '14px',
      }}
    >
      Loading 3D scene...
    </Html>
  );
}

function HeroScene() {
  const reducedMotion = useReducedMotion();
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={2.5} castShadow>
        <orthographicCamera attach="shadowCamera" args={[-10, 10, 10, -10, 0.5, 30]} />
      </directionalLight>
      <directionalLight position={[-5, 5, -5]} intensity={1} />
      <directionalLight position={[0, -5, -10]} intensity={1.5} color="#d4a843" />
      <pointLight position={[3, 3, 3]} intensity={2} color="#d4a843" distance={10} />
      <pointLight position={[-3, -2, 4]} intensity={1.5} color="#e8c56d" distance={8} />
      <hemisphereLight groundColor="#1a1a2e" color="#fff8f0" intensity={1} />
      
      <HeroObject intensity={1.2} reducedMotion={reducedMotion} />
      <OrbitalRings reducedMotion={reducedMotion} />
      <FloatingParticles reducedMotion={reducedMotion} />
    </>
  );
}

function ShowcaseScene() {
  const reducedMotion = useReducedMotion();
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={2.5} castShadow>
        <orthographicCamera attach="shadowCamera" args={[-10, 10, 10, -10, 0.5, 30]} />
      </directionalLight>
      <directionalLight position={[-5, 5, -5]} intensity={1} />
      <directionalLight position={[0, -5, -10]} intensity={1.5} color="#d4a843" />
      <pointLight position={[3, 3, 3]} intensity={2} color="#d4a843" distance={10} />
      <pointLight position={[-3, -2, 4]} intensity={1.5} color="#e8c56d" distance={8} />
      <hemisphereLight groundColor="#1a1a2e" color="#fff8f0" intensity={1} />
      
      <ShowcaseObject reducedMotion={reducedMotion} />
    </>
  );
}

function CTAScene() {
  const reducedMotion = useReducedMotion();
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={2.5} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={1} />
      <directionalLight position={[0, -5, -10]} intensity={1.5} color="#d4a843" />
      <pointLight position={[3, 3, 3]} intensity={2} color="#d4a843" distance={10} />
      <hemisphereLight groundColor="#1a1a2e" color="#fff8f0" intensity={1} />
      
      <CTAObject reducedMotion={reducedMotion} />
    </>
  );
}

// Exported Canvas Components
export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', top: 0, left: 0 }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="scene" args={['#0a0a0f', 0.02]} />
      <Suspense fallback={<LoadingFallback />}>
        <HeroScene />
      </Suspense>
    </Canvas>
  );
}

export function DeviceScreenCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="scene" args={['#0a0a0f', 0.02]} />
      <Suspense fallback={<LoadingFallback />}>
        <ShowcaseScene />
      </Suspense>
    </Canvas>
  );
}

export function CTACanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="scene" args={['#0a0a0f', 0.02]} />
      <Suspense fallback={<LoadingFallback />}>
        <CTAScene />
      </Suspense>
    </Canvas>
  );
}