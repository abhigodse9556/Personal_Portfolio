'use client';

import { HeroCanvas } from '@/components/three/Scene3D';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';

interface ParticleConfig {
  width: number;
  height: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
}

// Pre-computed deterministic particle configs (no random needed)
const particleConfigs: ParticleConfig[] = [
  { width: 59.74, height: 55.82, top: 66.01, left: 57.05, duration: 9.23, delay: 0.84 },
  { width: 42.24, height: 51.95, top: 74.85, left: 64.17, duration: 10.45, delay: 1.52 },
  { width: 48.87, height: 77.26, top: 68.26, left: 19.61, duration: 11.12, delay: 0.31 },
  { width: 52.65, height: 51.40, top: 70.75, left: 57.19, duration: 9.87, delay: 1.89 },
  { width: 53.58, height: 32.17, top: 28.68, left: 35.82, duration: 8.56, delay: 0.67 },
  { width: 42.10, height: 26.73, top: 72.82, left: 34.76, duration: 10.23, delay: 1.15 },
  { width: 69.90, height: 71.13, top: 49.84, left: 79.93, duration: 9.34, delay: 0.42 },
  { width: 56.39, height: 30.88, top: 45.16, left: 13.55, duration: 11.78, delay: 1.93 },
];

export function Hero() {
  const [particles] = useState<ParticleConfig[]>(particleConfigs);

  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '5+', label: 'Years Experience' },
    { value: '30+', label: 'Happy Clients' },
    { value: '15+', label: 'Open Source' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28" aria-labelledby="hero-title">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroCanvas />
      </div>

      {/* Orbital rings and floating elements (CSS-based for performance) */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-accent/10 animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-accent/5 animate-spin-reverse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-accent/5 animate-spin-slower" />
        
        {/* Floating particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-accent/20 to-transparent border border-accent/20 blur-sm"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
            }}
            animate={{
              x: [-50, 50, -50],
              y: [-50, 50, -50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <Badge variant="accent" dot size="sm" className="mb-6">
                Available for freelance & full-time
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-title"
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="block">Creative Developer</span>
              <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                & Software Engineer
              </span>
            </motion.h1>

            <motion.p
              className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              Building immersive digital experiences that push the boundaries of the web.
              Specializing in React Three Fiber, WebGL shaders, and performant front-end architecture.
            </motion.p>

            <motion.div
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View My Work
              </Button>
              <Button variant="outline" size="lg" leftIcon={<Play className="w-5 h-5" />}>
                Contact Me
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 sm:mt-14 grid grid-cols-2 gap-6 sm:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual placeholder - the 3D canvas is in the background */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent rounded-3xl blur-3xl" />
              <div className="relative aspect-[4/3] rounded-2xl bg-card border border-border overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
                      <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">Interactive 3D Scene</p>
                    <p className="text-xs text-muted-foreground/50 mt-1">Move your mouse to explore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 text-xs uppercase tracking-wider"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden="true"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}