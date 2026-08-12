'use client';

import { projects } from '@/data/portfolio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion, type EasingFunction } from 'framer-motion';
import { ExternalLink, GitFork, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Work() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as unknown as EasingFunction } },
  };

  return (
    <section id="work" className="section bg-background" aria-labelledby="work-title">
      <div className="container-page">
        <motion.div
          className="section-header text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="accent" className="mb-4">Selected Work</Badge>
          <h2 id="work-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-5">
            Projects That{' '}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Matter
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            A collection of 3D web experiences, interactive visualizations, and creative engineering projects.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="space-y-6 sm:space-y-8 lg:space-y-10 mb-12 sm:mb-16 lg:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className="group"
            >
              <FeaturedProjectCard project={project} />
            </motion.article>
          ))}
        </motion.div>

        {/* Other Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {otherProjects.map((project, index) => (
            <motion.article key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Card variant="interactive" className="overflow-hidden relative group">
      <div className="relative aspect-video overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Eye className="w-10 h-10 text-accent" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-foreground">View Case Study</p>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${project.category === 'E-commerce' ? '#d4a843' : project.category === 'Data Visualization' ? '#3b82f6' : '#8b5cf6'}20, transparent)` }}>
          <div className="text-center">
            <div className="text-6xl font-display font-bold text-foreground/10">{project.year}</div>
            <div className="text-sm text-accent font-medium uppercase tracking-wider">{project.category}</div>
          </div>
        </div>
      </div>

      <CardContent className="p-5 sm:p-6 lg:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge variant="outline" size="sm">+{project.tags.length - 4} more</Badge>
          )}
        </div>

        <CardTitle className="text-xl sm:text-2xl mb-2">{project.title}</CardTitle>
        <CardDescription className="mb-5 sm:mb-6">{project.longDescription || project.description}</CardDescription>

        {project.metrics && (
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6 p-3 sm:p-4 bg-muted/40 border border-border rounded-xl">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-lg sm:text-xl font-bold text-accent">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <Button variant="primary" size="sm" leftIcon={<ExternalLink className="w-4 h-4" />}>
              Live Demo
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" size="sm" leftIcon={<GitFork className="w-4 h-4" />}>
              Source Code
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Card variant="interactive" className="h-full flex flex-col overflow-hidden group">
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent" aria-hidden="true">
          <Badge variant="accent" size="sm">{project.category}</Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-8 h-8 text-accent" aria-hidden="true" />
          </div>
        </div>
      </div>

      <CardContent className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
          ))}
        </div>

        <CardTitle className="text-lg sm:text-xl mb-2 group-hover:text-accent transition-colors">{project.title}</CardTitle>
        <CardDescription className="mb-4 flex-1">{project.description}</CardDescription>

        <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
          <Button variant="ghost" size="sm" className="flex-1" leftIcon={<ExternalLink className="w-4 h-4" />}>
            {project.liveUrl ? 'View Project' : 'Private'}
          </Button>
          {project.repoUrl && (
            <Button variant="ghost" size="sm" leftIcon={<GitFork className="w-4 h-4" />} aria-label="View source code" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}