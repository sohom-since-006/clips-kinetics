import React from 'react';
import { services } from '../data/services';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { ServiceIcon, WhatsAppIcon } from './icons';
import ScrollReveal from './ScrollReveal';

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {/* Fluid Cursive Script Tag */}
          <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent/85 block mb-1 tracking-wide select-none drop-shadow-sm">
            Craftsmanship & Motion
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight mb-3 sm:mb-4">
            Services & Expertise
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-text-secondary text-sm sm:text-base lg:text-lg">
            High-standard post-production tailored to elevate engagement, retention, and brand aesthetics.
          </p>
        </ScrollReveal>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <ScrollReveal
              key={service.id}
              delay={idx * 0.08}
              className="group flex flex-col justify-between p-5 sm:p-7 rounded-md bg-bg-surface border border-border-subtle hover:border-accent/40 hover:shadow-card-subtle transition-all duration-300"
            >
              <div>
                {/* Icon in Accent Circle */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-105 transition-all">
                  <ServiceIcon name={service.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Service Title */}
                <h3 className="font-heading font-semibold text-lg sm:text-xl lg:text-2xl text-text-primary mb-2.5">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-xs sm:text-sm lg:text-base text-text-secondary leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Contact for Quote CTA (Strictly opens WhatsApp) */}
              <div className="pt-4 border-t border-border-subtle/80">
                <a
                  href={getWhatsAppUrl(service.quoteMessage)}
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

      </div>
    </section>
  );
}
