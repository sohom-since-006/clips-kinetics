"use client";

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { siteConfig } from '../data/site';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { WhatsAppIcon, ArrowDownIcon } from './icons';
import Logo3DFallback from './Logo3DFallback';

// Dynamic import with ssr: false for client-only WebGL 3D Crystal Logo
const Logo3DScene = dynamic(() => import('./Logo3DScene'), {
  ssr: false,
  loading: () => <Logo3DFallback />,
});

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-12 sm:pt-24 sm:pb-16 lg:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-accent/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* "Open to Work" Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-badge-bg border border-badge-dot/30 shadow-sm mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-badge-dot opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-badge-dot" />
              </span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-whatsapp-light">
                {siteConfig.status}
              </span>
            </div>

            {/* Fluid Script Accent Tag */}
            <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent/85 tracking-wide block mb-1 select-none drop-shadow-sm">
              The Creative Storyteller
            </span>

            {/* Main Name Heading */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-7xl tracking-tight text-text-primary leading-[1.1] mb-2 sm:mb-3">
              {siteConfig.name}
            </h1>

            {/* Tagline */}
            <p className="font-heading text-lg sm:text-2xl lg:text-3xl font-medium text-accent mb-3 sm:mb-4">
              {siteConfig.tagline}
            </p>

            {/* Bio summary */}
            <p className="font-body text-sm sm:text-base lg:text-lg text-text-secondary max-w-xl leading-relaxed mb-6 sm:mb-8">
              {siteConfig.shortBio}
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-10">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-emerald-900/40 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="#work"
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-border-subtle bg-bg-surface/60 hover:bg-bg-elevated hover:border-accent/40 text-text-primary font-medium text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>View my work</span>
                <ArrowDownIcon className="w-4 h-4 text-accent" />
              </a>
            </div>

            {/* Location & Quick Credibility pill */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Based in {siteConfig.location}</span>
              <span className="text-border-subtle">•</span>
              <span>Available for worldwide remote edits</span>
            </div>
          </div>

          {/* Right Column: 3D Interactive Play Button + Profile Portrait */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
            
            {/* 3D Interactive Play Button Canvas */}
            <div className="w-full relative z-10 flex items-center justify-center">
              <Logo3DScene />
            </div>

            {/* Circular Profile Portrait overlapping lower area */}
            <div className="absolute -bottom-2 right-1 sm:bottom-0 sm:right-4 lg:-bottom-4 lg:right-0 z-20 group">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full border-2 border-accent p-1 bg-bg-surface shadow-amber-glow transition-transform duration-300 group-hover:scale-105">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/sohom-paul.webp"
                    alt="Sohom Paul, freelance video editor"
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                    priority
                    className="object-cover object-top"
                  />
                </div>

                {/* Verified editor badge */}
                <div className="absolute bottom-0 right-1 bg-accent text-bg-base text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                  Editor
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
