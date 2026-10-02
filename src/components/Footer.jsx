import React from 'react';
import Link from 'next/link';
import { siteConfig } from '../data/site';
import { SocialIcon } from './icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-bg-surface py-12">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border-subtle">
          
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block font-heading font-bold text-xl text-text-primary tracking-tight mb-1">
              {siteConfig.brandName}
            </Link>
            <p className="text-xs sm:text-sm text-text-muted">
              {siteConfig.tagline} • {siteConfig.location}
            </p>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-3">
            {siteConfig.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 rounded-full bg-bg-elevated hover:bg-bg-surface border border-border-subtle hover:border-accent/40 flex items-center justify-center text-text-secondary hover:text-accent transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <SocialIcon name={social.icon} className="w-4 h-4" />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Credits & Status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted text-center sm:text-left">
          <p>
            © {currentYear} {siteConfig.brandName} ({siteConfig.name}). All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-badge-dot" />
            <span>{siteConfig.status} for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
