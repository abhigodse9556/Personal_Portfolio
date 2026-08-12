'use client';

import { motion } from 'framer-motion';

export function BackToTop() {
  return (
    <motion.button
      className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-accent to-accent-dark text-background shadow-lg shadow-accent/30 hover:from-accent-light hover:to-accent transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.button>
  );
}