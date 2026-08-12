export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  image: string;
  images?: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  year: number;
  role: string;
  techStack: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  type: 'full-time' | 'contract' | 'freelance' | 'internship';
  logo?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'soft';
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface SEOData {
  title: string;
  description: string;
  ogImage?: string;
  twitterHandle?: string;
}