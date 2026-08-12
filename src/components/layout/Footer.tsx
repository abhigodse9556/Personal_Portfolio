import { navLinks, personalInfo } from '@/data/portfolio';
import { socialLinks } from '@/data/social.tsx';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerNav = [
    {
      title: 'Work',
      links: [
        { label: 'All Projects', href: '#work' },
        { label: 'Case Studies', href: '#work' },
        { label: 'Open Source', href: 'https://github.com/yourusername' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#experience' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Email', href: `mailto:${personalInfo.email}` },
        { label: 'LinkedIn', href: socialLinks[1].href },
        { label: 'Twitter', href: socialLinks[2].href },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-card/50 border-t border-border" role="contentinfo">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12 lg:mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-4" aria-label="Go to homepage">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accent-dark relative overflow-hidden" aria-hidden="true">
                <div className="absolute inset-1 bg-gradient-to-br from-accent-light to-accent opacity-30 rounded-md" />
              </div>
              <span>Portfolio</span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-xs">
              {personalInfo.tagline}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background border border-border hover:border-accent/50 hover:bg-accent/5 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerNav.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground/60">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/60 text-center md:text-right">
            Built with Next.js, React Three Fiber, and a lot of ☕
          </p>
        </div>
      </div>
    </footer>
  );
}