'use client';

import { experiences, skills } from '@/data/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import { Briefcase, Code2, Database, Server, Palette, Users, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryIcons = {
  frontend: Code2,
  backend: Database,
  devops: Server,
  design: Palette,
  soft: Users,
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps',
  design: 'Design',
  soft: 'Soft Skills',
};

export function Experience() {
  return (
    <section id="experience" className="section bg-card/50" aria-labelledby="experience-title">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <Badge variant="accent">Experience</Badge>
              <Briefcase className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <h2 id="experience-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-5">
              Where I{' '}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Made Impact
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10">
              Leading 3D web projects, building developer tools, and mentoring teams at innovative companies.
            </p>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 to-transparent" aria-hidden="true" />
              
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-11 sm:pl-12 pb-8 sm:pb-10 last:pb-0"
                >
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-background bg-accent flex items-center justify-center z-10" aria-hidden="true">
                    <div className="w-2 h-2 rounded-full bg-background" />
                  </div>
                  
                  <Card variant="outlined" className="transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
                    <CardContent className="p-4 sm:p-5 lg:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-accent" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground">{exp.role}</h3>
                            <span className="text-sm text-muted-foreground">{exp.period}</span>
                          </div>
                          <p className="text-accent font-medium mb-1">{exp.company}</p>
                          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {exp.location}
                          </p>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {exp.description.map((desc, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-2 flex-shrink-0" aria-hidden="true" />
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.slice(0, 6).map((tech) => (
                              <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <Badge variant="accent">Skills</Badge>
              <Code2 className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 sm:mb-8">
              Technical{' '}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Expertise
              </span>
            </h3>

            <div className="space-y-8 sm:space-y-10">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const categorySkills = skills.filter(s => s.category === key);
                if (categorySkills.length === 0) return null;
                
                const Icon = categoryIcons[key as keyof typeof categoryIcons];
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                      <h4 className="text-base sm:text-lg font-semibold text-foreground capitalize">{label}</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                      {categorySkills.map((skill) => (
                        <SkillBar key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill }: { skill: typeof skills[0] }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}