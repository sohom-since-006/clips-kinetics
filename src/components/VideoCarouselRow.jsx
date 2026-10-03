"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, WaveformIcon, SparklesIcon } from './icons';

export default function VideoCarouselRow({
  section,
  activeVideoId,
  onSelectVideo,
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isVertical = section.aspectRatio === '9:16';
  const isBrandHighlighted = Boolean(section.isHighlighted);

  // Check scroll position to enable/disable arrow buttons
  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    updateScrollButtons();
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', updateScrollButtons, { passive: true });
      window.addEventListener('resize', updateScrollButtons);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', updateScrollButtons);
      }
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [section.videos.length]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div
      id={section.id}
      className={`scroll-mt-28 relative rounded-2xl transition-all duration-300 ${
        isBrandHighlighted
          ? 'p-5 sm:p-7 bg-gradient-to-b from-accent/10 via-bg-surface to-bg-surface border-2 border-accent/40 shadow-[0_0_35px_rgba(239,159,39,0.12)]'
          : 'p-4 sm:p-6 bg-bg-surface/50 border border-border-subtle/80'
      }`}
    >
      {/* Brand Highlight Header Accent */}
      {isBrandHighlighted && (
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-deep font-semibold text-xs shadow-sm">
            <SparklesIcon className="w-3.5 h-3.5 fill-current" />
            <span>Featured Brand Collaborations</span>
          </span>
          <span className="text-[11px] text-accent/80 font-mono hidden sm:inline">
            Priority Client Showcase
          </span>
        </div>
      )}

      {/* Row Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading font-semibold text-lg sm:text-2xl text-text-primary">
              {section.heading}
            </h3>
            {section.badge && !isBrandHighlighted && (
              <span className="px-2.5 py-0.5 rounded-full bg-bg-elevated border border-border-subtle text-[11px] text-text-secondary">
                {section.badge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
            {section.description}
          </p>
        </div>

        {/* Desktop Carousel Controls & Video Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-xs font-mono text-text-muted px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle">
            {section.videos.length} {section.videos.length === 1 ? 'Edit' : 'Edits'}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label={`Scroll ${section.heading} left`}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'bg-bg-elevated hover:bg-bg-base border-border-subtle hover:border-accent text-text-primary hover:text-accent shadow-sm active:scale-95'
                  : 'bg-bg-elevated/40 border-border-subtle/40 text-text-muted/40 cursor-not-allowed'
              }`}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label={`Scroll ${section.heading} right`}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'bg-bg-elevated hover:bg-bg-base border-border-subtle hover:border-accent text-text-primary hover:text-accent shadow-sm active:scale-95'
                  : 'bg-bg-elevated/40 border-border-subtle/40 text-text-muted/40 cursor-not-allowed'
              }`}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Swipeable Track */}
      <div
        ref={scrollRef}
        className="flex gap-3.5 sm:gap-5 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-2 -mx-2 px-2"
      >
        {section.videos.map((video, idx) => {
          const isCurrentActive = activeVideoId === video.id;
          const accessibleBadge = `Edit ${String(idx + 1).padStart(2, '0')}`;

          return (
            <button
              key={video.id}
              type="button"
              onClick={() => onSelectVideo(section, video, idx)}
              aria-label={`Select ${accessibleBadge} from ${section.heading}`}
              className={`group relative shrink-0 snap-start text-left rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isVertical
                  ? 'w-[150px] sm:w-[190px] md:w-[215px] aspect-[9/16]'
                  : 'w-[270px] sm:w-[320px] md:w-[360px] aspect-[16/9]'
              } ${
                isCurrentActive
                  ? 'ring-2 ring-accent border border-accent shadow-[0_0_25px_rgba(239,159,39,0.35)] scale-[1.02]'
                  : 'border border-border-subtle hover:border-accent/60 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] bg-bg-elevated'
              }`}
            >
              {/* Card Background & Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-bg-surface via-bg-elevated to-bg-base" />
              <div className="absolute inset-0 bg-[radial-gradient(#EF9F27_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-bg-base/30 to-transparent group-hover:opacity-75 transition-opacity" />

              {/* Centered Golden Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrentActive
                      ? 'w-12 h-12 bg-accent text-accent-deep shadow-amber-glow scale-110'
                      : 'w-11 h-11 bg-bg-surface/90 text-accent group-hover:bg-accent group-hover:text-accent-deep group-hover:scale-110 group-hover:shadow-amber-glow border border-border-subtle group-hover:border-accent'
                  }`}
                >
                  <PlayIcon className="w-5 h-5 ml-0.5" />
                </span>
              </div>

              {/* Active "Now Playing" Banner */}
              {isCurrentActive && (
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-accent text-accent-deep text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <WaveformIcon className="w-3 h-3 animate-pulse" />
                    <span>In Cinema</span>
                  </span>
                </div>
              )}

              {/* Neutral Numbering Pill */}
              <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-bg-base/80 backdrop-blur-md border border-border-subtle text-[11px] font-mono text-text-secondary group-hover:text-accent group-hover:border-accent/40 transition-colors">
                {accessibleBadge}
              </div>

              {/* Aspect Indicator Badge */}
              <div className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded bg-bg-base/60 text-[10px] font-mono text-text-muted">
                {isVertical ? '9:16' : '16:9'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
