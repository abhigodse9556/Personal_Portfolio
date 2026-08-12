'use client';

import { testimonials } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  return (
    <section id="testimonials" className="section bg-background" aria-labelledby="testimonials-title">
      <div className="container-page">
        <motion.div
          className="section-header text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Trusted by Leaders
          </span>
          <h2 id="testimonials-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-5">
            Loved by{' '}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Teams Worldwide
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Join 30+ clients who have transformed their digital presence with immersive 3D experiences.
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-card border border-border hover:border-accent/50 hover:bg-accent/5 hover:text-accent transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-accent w-8'
                      : 'bg-border hover:bg-accent/50'
                  )}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-card border border-border hover:border-accent/50 hover:bg-accent/5 hover:text-accent transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Touch swipe area */}
        <div
          className="absolute inset-0 -z-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <Card variant="elevated" className="h-full">
      <CardContent className="p-5 sm:p-6 lg:p-8">
        <div className="flex gap-1 mb-4 sm:mb-5" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-5 h-5',
                i < testimonial.rating ? 'fill-accent text-accent' : 'text-border'
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        
        <blockquote className="text-base sm:text-lg text-foreground leading-relaxed mb-6 sm:mb-8">
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>
        
        <footer className="flex items-center gap-3 sm:gap-4">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-border flex-shrink-0">
            <img
              src={testimonial.avatar}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <cite className="font-semibold text-foreground block not-italic">{testimonial.name}</cite>
            <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}