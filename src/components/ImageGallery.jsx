"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { galleries } from '../data/images';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { WhatsAppIcon } from './icons';
import Lightbox from './Lightbox';
import ScrollReveal from './ScrollReveal';

export default function ImageGallery() {
  const [activeGalleryKey, setActiveGalleryKey] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (galleryKey, index) => {
    setActiveGalleryKey(galleryKey);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveGalleryKey(null);
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-28 bg-bg-surface/50 border-t border-border-subtle relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {/* Fluid Cursive Script Tag */}
          <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent/85 block mb-1 tracking-wide select-none drop-shadow-sm">
            Culinary & Commercial Art
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight mb-3 sm:mb-4">
            Restaurant & Commercial Branding
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-text-secondary text-sm sm:text-base lg:text-lg">
            Appetising menu designs, promotional social posters, and aesthetic visual identities tailored for cafes, lounges, and eateries.
          </p>
        </ScrollReveal>

        {/* Restaurant Branding Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {galleries.restaurantBranding.items.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 0.08}>
              <button
                type="button"
                onClick={() => openLightbox('restaurantBranding', idx)}
                className="group w-full text-left relative aspect-[4/5] rounded-md overflow-hidden bg-bg-elevated border border-border-subtle hover:border-accent/50 transition-all duration-300 shadow-card-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Category Pill */}
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm bg-bg-base/80 backdrop-blur-md border border-border-subtle text-[10px] sm:text-[11px] font-medium text-accent">
                  {item.category}
                </div>

                {/* Zoom indicator */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-bg-base/70 backdrop-blur-md flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:scale-110 transition-all">
                  <span className="text-xs sm:text-sm">↗</span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Gallery Quote CTA */}
        <ScrollReveal delay={0.2} className="mt-8 sm:mt-10 text-center">
          <a
            href={getWhatsAppUrl("Hi Sohom, I saw your restaurant & commercial branding work and would like to get a quote for my brand.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-bg-surface hover:bg-bg-elevated border border-accent/30 hover:border-accent text-accent text-xs sm:text-sm font-semibold transition-all shadow-card-subtle group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <WhatsAppIcon className="w-4 h-4 text-whatsapp" />
            <span>Contact for Branding Quote</span>
            <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
          </a>
        </ScrollReveal>

      </div>

      {/* Lightbox Viewer */}
      {activeGalleryKey && (
        <Lightbox
          images={galleries[activeGalleryKey].items}
          currentIndex={lightboxIndex}
          isOpen={Boolean(activeGalleryKey)}
          onClose={closeLightbox}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </section>
  );
}
