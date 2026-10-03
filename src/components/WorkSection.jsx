"use client";

import React, { useState, useRef } from 'react';
import { videoSections } from '../data/videos';
import CinemaSpotlight from './CinemaSpotlight';
import VideoCarouselRow from './VideoCarouselRow';
import ScrollReveal from './ScrollReveal';

export default function WorkSection() {
  // Default to the first video in the featured Brand Reels section
  const initialSection = videoSections[0];
  const initialVideo = initialSection.videos[0];

  const [activeSection, setActiveSection] = useState(initialSection);
  const [activeVideo, setActiveVideo] = useState(initialVideo);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const spotlightRef = useRef(null);

  // When a card in any carousel row is clicked
  const handleSelectVideo = (section, video, idx) => {
    setActiveSection(section);
    setActiveVideo(video);
    setCurrentIndex(idx);
    setIsPlaying(true);

    // Smoothly scroll up to the spotlight theater
    if (spotlightRef.current) {
      spotlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Previous video in the active category
  const handlePrevious = () => {
    if (!activeSection?.videos?.length) return;
    const prevIdx = (currentIndex - 1 + activeSection.videos.length) % activeSection.videos.length;
    setCurrentIndex(prevIdx);
    setActiveVideo(activeSection.videos[prevIdx]);
    setIsPlaying(true);
  };

  // Next video in the active category
  const handleNext = () => {
    if (!activeSection?.videos?.length) return;
    const nextIdx = (currentIndex + 1) % activeSection.videos.length;
    setCurrentIndex(nextIdx);
    setActiveVideo(activeSection.videos[nextIdx]);
    setIsPlaying(true);
  };

  return (
    <section id="work" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent/85 block mb-1 tracking-wide select-none drop-shadow-sm">
            Selected Creations
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight mb-3 sm:mb-4">
            Featured Video Works
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-text-secondary text-sm sm:text-base lg:text-lg">
            An interactive showcase merging a live Cinema Spotlight player with Netflix-style curated category rows.
          </p>
        </ScrollReveal>

        {/* Category Quick Jump Chips */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 mb-8 scrollbar-none touch-pan-x">
          {videoSections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                sec.isHighlighted
                  ? 'bg-accent/15 text-accent border-accent/40 hover:bg-accent hover:text-accent-deep font-semibold shadow-sm'
                  : 'bg-bg-surface text-text-secondary hover:text-text-primary hover:bg-bg-elevated border-border-subtle'
              }`}
            >
              {sec.isHighlighted && <span className="mr-1">★</span>}
              {sec.heading}
            </a>
          ))}
        </div>

        {/* Feature 1: The Cinema Spotlight Player */}
        <div ref={spotlightRef} className="scroll-mt-28">
          <CinemaSpotlight
            activeVideo={activeVideo}
            activeSection={activeSection}
            currentIndex={currentIndex}
            totalCount={activeSection?.videos?.length || 1}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>

        {/* Feature 2: Netflix-Style Carousel Rows for All Categories */}
        <div className="space-y-10 sm:space-y-14 lg:space-y-18">
          {videoSections.map((section, sIdx) => (
            <ScrollReveal key={section.id} delay={sIdx * 0.05}>
              <VideoCarouselRow
                section={section}
                activeVideoId={activeVideo?.id}
                onSelectVideo={handleSelectVideo}
              />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
