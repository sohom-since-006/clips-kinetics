import React from 'react';
import { siteConfig } from '../data/site';
import ScrollReveal from './ScrollReveal';

export default function Stats() {
  return (
    <section className="relative py-8 sm:py-12 border-y border-border-subtle bg-bg-surface/40 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {siteConfig.stats.map((stat, idx) => (
            <ScrollReveal
              key={stat.label}
              delay={idx * 0.1}
              className="flex flex-col items-center sm:items-start text-center sm:text-left p-5 sm:p-6 rounded-md bg-bg-surface/80 border border-border-subtle/80 hover:border-accent/40 transition-colors duration-300 shadow-sm"
            >
              <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-accent tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="font-heading font-semibold text-base sm:text-lg text-text-primary mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm text-text-muted">
                {stat.description}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
