import React from 'react';
import { siteConfig } from '../data/site';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { WhatsAppIcon, SocialIcon, ArrowUpRightIcon } from './icons';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <ScrollReveal className="relative rounded-lg overflow-hidden bg-gradient-to-b from-bg-surface to-bg-elevated border border-border-subtle p-6 sm:p-10 lg:p-16 text-center max-w-4xl mx-auto shadow-2xl">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-accent/15 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

          {/* "Open to Work" Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-badge-bg border border-badge-dot/30 shadow-sm mb-4 sm:mb-6">
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-badge-dot opacity-75" />
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-badge-dot" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-whatsapp-light">
              {siteConfig.status}
            </span>
          </div>

          {/* Fluid Cursive Script Tag */}
          <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent/85 block mb-2 tracking-wide select-none drop-shadow-sm">
            Let's Collaborate
          </span>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight mb-3 sm:mb-4">
            Have a project in mind? Let's bring it to life.
          </h2>

          <p className="text-text-secondary text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            I'm currently accepting new video editing clients, creator retainers, and commercial brand edits. Drop me a message on WhatsApp for instant replies.
          </p>

          {/* Direct WhatsApp Call to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-12">
            <a
              href={getWhatsAppUrl("Hi Sohom, I'm ready to discuss a new video project!")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-base sm:text-lg transition-all duration-200 shadow-xl hover:shadow-emerald-900/40 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-5 sm:w-6 h-5 sm:h-6" />
              <span>Message on WhatsApp</span>
            </a>
          </div>

          {/* Quick contact details summary */}
          <div className="text-xs sm:text-sm text-text-muted mb-8 sm:mb-10">
            <span>Direct WhatsApp: </span>
            <span className="text-text-primary font-mono font-medium">{siteConfig.displayPhone}</span>
            <span className="mx-2">•</span>
            <span>{siteConfig.location}</span>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-6 sm:pt-8 border-t border-border-subtle">
            <p className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-4 sm:mb-6">
              Connect Across Platforms
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-md bg-bg-base/60 hover:bg-bg-elevated border border-border-subtle hover:border-accent/40 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg-surface border border-border-subtle flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent/40 mb-1.5 sm:mb-2 transition-colors">
                    <SocialIcon name={social.icon} className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                    {social.name.split(' ')[0]}
                    <ArrowUpRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-[11px] text-text-muted truncate max-w-full">
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </ScrollReveal>

      </div>
    </section>
  );
}
