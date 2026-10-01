"use client";

import React, { useState } from 'react';
import { videoSections } from '../data/videos';
import VideoCard from './VideoCard';
import ScrollReveal from './ScrollReveal';

export default function WorkSection() {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section id="work" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Global Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {/* Fluid Cursive Script Tag */}
          <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent/85 block mb-1 tracking-wide select-none drop-shadow-sm">
            Selected Creations
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight mb-3 sm:mb-4">
            Featured Video Works
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-text-secondary text-sm sm:text-base lg:text-lg">
            A curated showcase of short-form reels, long-form YouTube narratives, event aftermovies, and festival cinematography.
          </p>
        </ScrollReveal>

        {/* Video Categories */}
        <div className="space-y-16 lg:space-y-28">
          {videoSections.map((section) => {
            const isShortForm = section.id === 'short-form';
            const displayedVideos = isShortForm && activeFilter !== 'all'
              ? section.videos.filter((v) => v.filter === activeFilter)
              : section.videos;

            return (
              <div key={section.id} className="scroll-mt-24">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-border-subtle">
                  <div>
                    <h3 className="font-heading font-semibold text-xl sm:text-2xl lg:text-3xl text-text-primary mb-1.5 sm:mb-2">
                      {section.heading}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-text-secondary max-w-xl">
                      {section.description}
                    </p>
                  </div>

                  {/* Filter Chips for Short-Form Section (Mobile scrollable) */}
                  {section.filters && (
                    <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 py-1 scrollbar-none touch-pan-x">
                      {section.filters.map((filter) => (
                        <button
                          key={filter.id}
                          type="button"
                          onClick={() => setActiveFilter(filter.id)}
                          className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                            activeFilter === filter.id
                              ? 'bg-accent text-accent-deep font-semibold shadow-sm scale-105'
                              : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-zinc-800'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Video Grid */}
                <div
                  className={`grid ${
                    section.aspectRatio === '9:16'
                      ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6'
                      : 'grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'
                  }`}
                >
                  {displayedVideos.map((video, idx) => (
                    <ScrollReveal key={video.id} delay={idx * 0.08}>
                      <VideoCard
                        video={video}
                        index={idx}
                        totalCount={displayedVideos.length}
                        isActive={activeVideoId === video.id}
                        onActivate={(id) => setActiveVideoId(id)}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
