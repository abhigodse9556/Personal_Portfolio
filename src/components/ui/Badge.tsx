'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const badgeStyles = {
  base: 'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors',
  variants: {
    default: 'bg-muted text-muted-foreground border-transparent',
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    outline: 'bg-transparent text-foreground border-border',
  },
  sizes: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeStyles.base,
          badgeStyles.variants[variant],
          badgeStyles.sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'relative w-1.5 h-1.5 rounded-full',
              variant === 'accent' && 'bg-accent animate-pulse',
              variant === 'success' && 'bg-green-400',
              variant === 'warning' && 'bg-yellow-400',
              variant === 'error' && 'bg-red-400',
              variant === 'default' && 'bg-muted-foreground',
              variant === 'outline' && 'bg-border'
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  removable?: boolean;
  onRemove?: () => void;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, removable, onRemove, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full bg-card border border-border',
        removable && 'cursor-pointer hover:border-accent/50',
        className
      )}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="p-0.5 rounded-full hover:bg-accent/10 hover:text-accent transition-colors"
          aria-label="Remove tag"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  )
);
Tag.displayName = 'Tag';