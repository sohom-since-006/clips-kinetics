"use client";

import React from 'react';
import { shootingPackages } from '../data/services';
import { siteConfig } from '../data/site';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { ServiceIcon, WhatsAppIcon } from './icons';
import ScrollReveal from './ScrollReveal';

export default function ShootingServices() {
  return (
    <section id="shooting" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-bg-surface/30 border-t border-border-subtle">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent/85 block mb-1 tracking-wide select-none drop-shadow-sm">
            On-Location Production
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight mb-3 sm:mb-4">
            Open for Video Shooting
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-text-secondary text-sm sm:text-base lg:text-lg leading-relaxed">
            On-location video production and cinematic event coverage based in <span className="text-text-primary font-medium">Asansol, West Bengal</span>. Available for vehicle deliveries, weddings, ceremonies, and creative social shoots.
          </p>

          {/* Contact for Pricing Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-6 p-2 sm:p-2.5 rounded-full bg-bg-surface border border-accent/30 shadow-card-subtle">
            <span className="text-xs sm:text-sm text-text-secondary pl-3">
              Direct shoot inquiries & custom package quotes:
            </span>
            <a
              href={getWhatsAppUrl("Hi Sohom, I'd like to check your availability and pricing for an upcoming video shoot.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Get Shoot Quote</span>
            </a>
          </div>
        </ScrollReveal>

        {/* 8 Shoot Packages Grid (Zero Prices Displayed - Contact For Quote) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {shootingPackages.map((pkg, idx) => (
            <ScrollReveal
              key={pkg.id}
              delay={0.05 * idx}
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-bg-surface border border-border-subtle hover:border-accent/40 hover:shadow-[0_4px_25px_rgba(239,159,39,0.08)] transition-all duration-300"
            >
              <div>
                {/* Top: Icon & Optional Badge */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/25 text-accent flex items-center justify-center group-hover:scale-105 group-hover:bg-accent/20 transition-all">
                    <ServiceIcon name={pkg.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  {pkg.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase bg-accent/15 border border-accent/30 text-accent">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">
                  {pkg.title}
                </h3>

                {pkg.subtitle && (
                  <p className="text-xs font-medium text-accent/80 mb-2">
                    {pkg.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                  {pkg.tagline}
                </p>
              </div>

              {/* Bottom: Contact for Quote Button (Strictly WhatsApp, No Prices) */}
              <div className="pt-4 border-t border-border-subtle/80 flex items-center justify-between">
                <a
                  href={getWhatsAppUrl(pkg.quoteMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-accent hover:text-accent-soft transition-colors focus:outline-none focus-visible:underline"
                >
                  <WhatsAppIcon className="w-4 h-4 text-whatsapp" />
                  <span>Contact for quote</span>
                  <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Booking Note */}
        <ScrollReveal delay={0.2} className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-text-muted">
            Need a custom shoot setup or multi-day coverage? Feel free to call or WhatsApp at{' '}
            <a
              href={`tel:+${siteConfig.phone}`}
              className="text-text-primary hover:text-accent underline font-medium transition-colors"
            >
              {siteConfig.displayPhone}
            </a>
            .
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
