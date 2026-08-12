'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, socialLinks } from '@/data/portfolio';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-xl shadow-black/20'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav className="container-page" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground" aria-label="Go to homepage">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accent-dark relative overflow-hidden" aria-hidden="true">
              <div className="absolute inset-1 bg-gradient-to-br from-accent-light to-accent opacity-30 rounded-md" />
            </div>
            <span>Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <Link href="#contact" className="hidden sm:block">
              <button className="px-5 py-2.5 bg-gradient-to-r from-accent to-accent-dark text-background font-medium rounded-xl hover:from-accent-light hover:to-accent transition-all shadow-lg shadow-accent/30">
                Get In Touch
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl bg-card border border-border text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-background border-t border-border"
            >
              <div className="py-5 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-accent/5 rounded-xl transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t border-border">
                  <Link
                    href="#contact"
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-accent to-accent-dark text-background font-medium rounded-xl"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get In Touch
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-4 pt-4 pb-1">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-card border border-border hover:border-accent/50 hover:bg-accent/5 transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}