import type { Project, Experience, Skill, Testimonial, NavLink, SEOData } from '@/types';
import { navLinks, socialLinks, seoData } from './social.tsx';

export { navLinks, socialLinks, seoData };

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '3D Product Configurator',
    description: 'Real-time 3D product customization with material switching, AR preview, and WebGL shaders.',
    longDescription: 'Built a high-performance 3D product configurator for a major footwear brand. Features real-time material switching, dynamic lighting, AR preview via WebXR, and a headless CMS integration for content management.',
    category: 'E-commerce',
    tags: ['React Three Fiber', 'TypeScript', 'WebGL', 'GSAP', 'WebXR'],
    image: '/projects/configurator.jpg',
    images: ['/projects/configurator-1.jpg', '/projects/configurator-2.jpg'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/yourusername/configurator',
    featured: true,
    year: 2024,
    role: 'Lead Developer',
    techStack: ['React', 'Three.js', 'R3F', 'GSAP', 'Tailwind', 'Vite'],
    metrics: [
      { label: 'Conversion Increase', value: '+40%' },
      { label: 'Load Time', value: '<2s' },
      { label: 'Lighthouse Score', value: '98/100' },
    ],
  },
  {
    id: 'project-2',
    title: 'Immersive Data Dashboard',
    description: '3D data visualization platform for enterprise analytics with WebGL rendering.',
    longDescription: 'Developed an interactive 3D dashboard for visualizing complex datasets. Supports real-time data streaming, custom shader-based visualizations, and collaborative annotation features.',
    category: 'Data Visualization',
    tags: ['Three.js', 'WebGL Shaders', 'WebSockets', 'D3.js', 'Next.js'],
    image: '/projects/dashboard.jpg',
    liveUrl: 'https://example.com',
    featured: true,
    year: 2024,
    role: 'Full Stack Developer',
    techStack: ['Next.js', 'Three.js', 'TypeScript', 'PostgreSQL', 'WebSockets'],
    metrics: [
      { label: 'Data Points Rendered', value: '1M+' },
      { label: 'Frame Rate', value: '60fps' },
      { label: 'Users', value: '500+' },
    ],
  },
  {
    id: 'project-3',
    title: 'Virtual Showroom Platform',
    description: 'Multi-tenant virtual showroom solution for luxury brands with CMS integration.',
    category: 'Real Estate',
    tags: ['React Three Fiber', 'Next.js', 'Headless CMS', 'WebXR'],
    image: '/projects/showroom.jpg',
    liveUrl: 'https://example.com',
    featured: false,
    year: 2023,
    role: 'Technical Lead',
    techStack: ['Next.js', 'R3F', 'Sanity.io', 'TypeScript', 'Vercel'],
    metrics: [
      { label: 'Brands Onboarded', value: '12' },
      { label: 'Session Duration', value: '4.5min' },
    ],
  },
  {
    id: 'project-4',
    title: 'Interactive Learning Experience',
    description: 'WebGL-powered educational platform with gamified 3D simulations.',
    category: 'Education',
    tags: ['Three.js', 'React', 'Canvas API', 'GSAP'],
    image: '/projects/learning.jpg',
    liveUrl: 'https://example.com',
    featured: false,
    year: 2023,
    role: 'Senior Developer',
    techStack: ['React', 'Three.js', 'TypeScript', 'Node.js', 'MongoDB'],
    metrics: [
      { label: 'Students', value: '10K+' },
      { label: 'Completion Rate', value: '87%' },
    ],
  },
  {
    id: 'project-5',
    title: 'Real-time Collaboration Tool',
    description: 'Figma-like collaborative 3D editor with presence, comments, and version history.',
    category: 'Productivity',
    tags: ['WebRTC', 'Yjs', 'Three.js', 'React'],
    image: '/projects/collab.jpg',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/yourusername/collab',
    featured: true,
    year: 2024,
    role: 'Architect & Lead',
    techStack: ['React', 'Three.js', 'Yjs', 'WebRTC', 'TypeScript', 'Node.js'],
    metrics: [
      { label: 'Concurrent Users', value: '50+' },
      { label: 'Latency', value: '<50ms' },
    ],
  },
  {
    id: 'project-6',
    title: 'Generative Art Engine',
    description: 'Procedural 3D art generator with export to GLTF, OBJ, and 3D print formats.',
    category: 'Creative Tech',
    tags: ['Three.js', 'Web Workers', 'WASM', 'Canvas'],
    image: '/projects/generative.jpg',
    liveUrl: 'https://example.com',
    featured: false,
    year: 2022,
    role: 'Solo Developer',
    techStack: ['Vanilla JS', 'Three.js', 'Web Workers', 'WebAssembly', 'Rust'],
    metrics: [
      { label: 'Generations', value: '100K+' },
      { label: 'Export Formats', value: '6' },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Current Company',
    role: 'Senior Creative Developer',
    period: '2023 — Present',
    location: 'San Francisco, CA (Remote)',
    description: [
      'Lead development of 3D web experiences for Fortune 500 clients',
      'Architected reusable component library for React Three Fiber projects',
      'Mentor junior developers on WebGL, shaders, and performance optimization',
      'Collaborate with design teams to translate Figma prototypes into performant 3D experiences',
    ],
    technologies: ['React', 'Three.js', 'R3F', 'TypeScript', 'GSAP', 'Vite', 'Vercel'],
    type: 'full-time',
  },
  {
    id: 'exp-2',
    company: 'Previous Company',
    role: 'Frontend Engineer (3D Focus)',
    period: '2021 — 2023',
    location: 'New York, NY',
    description: [
      'Built interactive 3D product viewers for e-commerce clients',
      'Optimized WebGL rendering pipeline achieving 60fps on mobile devices',
      'Implemented CI/CD pipelines for 3D asset optimization and deployment',
      'Created internal tools for designers to author 3D scenes without code',
    ],
    technologies: ['React', 'Three.js', 'WebGL', 'TypeScript', 'Webpack', 'AWS'],
    type: 'full-time',
  },
  {
    id: 'exp-3',
    company: 'Startup Inc.',
    role: 'Full Stack Developer',
    period: '2019 — 2021',
    location: 'Austin, TX',
    description: [
      'Developed MVP for real-time collaborative design tool',
      'Built backend APIs with Node.js, GraphQL, and PostgreSQL',
      'Implemented real-time sync using WebSockets and Operational Transforms',
    ],
    technologies: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'WebSockets', 'Docker'],
    type: 'full-time',
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 90, category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
  { name: 'Framer Motion', level: 85, category: 'frontend' },
  { name: 'GSAP', level: 88, category: 'frontend' },
  
  // 3D & Graphics
  { name: 'Three.js', level: 92, category: 'frontend' },
  { name: 'React Three Fiber', level: 90, category: 'frontend' },
  { name: 'WebGL/GLSL', level: 85, category: 'frontend' },
  { name: 'WebGPU', level: 70, category: 'frontend' },
  { name: 'Blender', level: 75, category: 'design' },
  { name: 'Spline', level: 80, category: 'design' },
  
  // Backend & DevOps
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'PostgreSQL', level: 80, category: 'backend' },
  { name: 'GraphQL', level: 80, category: 'backend' },
  { name: 'Docker', level: 75, category: 'devops' },
  { name: 'Vercel/AWS', level: 80, category: 'devops' },
  { name: 'CI/CD', level: 80, category: 'devops' },
  
  // Soft Skills
  { name: 'Technical Leadership', level: 85, category: 'soft' },
  { name: 'Mentoring', level: 80, category: 'soft' },
  { name: 'Client Communication', level: 88, category: 'soft' },
  { name: 'Agile/Scrum', level: 85, category: 'soft' },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Chen',
    role: 'VP of Product',
    company: 'Nike',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content: 'Transformed how we present products. Our conversion rates increased 40% after implementing their 3D configurator. The quality and attention to detail is unmatched.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Marcus Johnson',
    role: 'Creative Director',
    company: 'Tesla',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    content: 'The visual editor is a game-changer. Our designers can now prototype 3D experiences in hours instead of weeks. It\'s the tool we\'ve been waiting for.',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Elena Rodriguez',
    role: 'CTO',
    company: 'Sotheby\'s',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    content: 'Security was our top concern. The zero-knowledge architecture gave us confidence to move all our 3D assets to their platform. Best technical decision we made.',
    rating: 5,
  },
];

export const personalInfo = {
  name: 'Your Name',
  title: 'Creative Developer & 3D Engineer',
  tagline: 'Building immersive digital experiences that push the boundaries of the web.',
  bio: `I'm a creative developer specializing in 3D web experiences, interactive data visualizations, and performant front-end architecture. With 5+ years of experience, I've led projects for global brands, built developer tools, and contributed to open-source 3D libraries.

My passion lies at the intersection of design, engineering, and human-computer interaction. I believe the web should be immersive, accessible, and delightful.`,
  location: 'San Francisco, CA',
  email: 'youremail@example.com',
  availability: 'Open to opportunities',
  resumeUrl: '/resume.pdf',
};