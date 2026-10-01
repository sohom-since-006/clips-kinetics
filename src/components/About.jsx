import React from 'react';
import Image from 'next/image';
import { siteConfig } from '../data/site';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { WhatsAppIcon } from './icons';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const tools = siteConfig.tools || [
    "Adobe Premiere Pro",
    "DaVinci Resolve Studio",
    "Adobe After Effects",
    "Capcut Pro",
    "Adobe Lightroom",
    "Canva"
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 bg-bg-surface/30 border-t border-border-subtle relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal className="relative">
              {/* Outer decorative ring */}
              <div className="relative w-52 h-52 sm:w-68 sm:h-68 lg:w-80 lg:h-80 rounded-full border-2 border-accent/40 p-2 shadow-amber-glow">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/sohom-paul.webp"
                    alt="Sohom Paul video editor portrait"
                    fill
                    sizes="(max-width: 640px) 208px, (max-width: 1024px) 272px, 320px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Status floating card */}
              <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-bg-elevated/95 backdrop-blur-md border border-border-subtle shadow-xl flex items-center gap-2.5 sm:gap-3">
                <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-badge-dot opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-badge-dot" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-text-primary">
                  {siteConfig.status} • Asansol, WB
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Bio Narrative & Philosophy */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              {/* Fluid Cursive Script Tag */}
              <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent/90 block mb-2 tracking-wide select-none drop-shadow-sm">
                The Creative Mind
              </span>

              <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight mb-5 sm:mb-6">
                Crafting visual rhythm that keeps eyes locked on screen.
              </h2>

              <div className="space-y-4 text-text-secondary text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
                <p>
                  I'm <strong className="text-text-primary font-semibold">Sohom Paul</strong>, a passionate freelance video editor based in Asansol, West Bengal. Over the last 3 years, I have collaborated with 80+ creators, restaurants, local brands, and digital agencies to turn hours of raw footage into impactful, high-retention content.
                </p>
                <p>
                  Whether it's snappy 9:16 reels designed for algorithmic discovery, long-form YouTube documentary edits, or cinematic festival and event aftermovies, I obsess over pacing, sound design, and colour mood.
                </p>
                <p className="text-text-primary font-medium">
                  I am currently <span className="text-accent underline underline-offset-4 font-semibold">open to work</span> for freelance commissions, retainer partnerships, and creator channels globally.
                </p>
              </div>

              {/* Core Software Stack */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-3">
                  Primary Toolset
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-md bg-bg-elevated border border-border-subtle text-xs sm:text-sm text-text-secondary font-medium hover:border-accent/40 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Button */}
              <div>
                <a
                  href={getWhatsAppUrl("Hi Sohom, I read your About section and would love to work together!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Get in Touch on WhatsApp</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
