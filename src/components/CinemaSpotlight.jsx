"use client";

import React, { useState } from 'react';
import { getDriveEmbedUrl } from '../lib/drive';
import { PlayIcon, ChevronLeftIcon, ChevronRightIcon, WaveformIcon } from './icons';

export default function CinemaSpotlight({
  activeVideo,
  activeSection,
  currentIndex,
  totalCount,
  onPrevious,
  onNext,
  isPlaying,
  setIsPlaying,
}) {
  const [loadError, setLoadError] = useState(false);

  if (!activeVideo) return null;

  const isVertical = activeVideo.aspectRatio === '9:16';
  const accessibleLabel = `Edit ${String(currentIndex + 1).padStart(2, '0')} of ${String(totalCount).padStart(2, '0')}`;

  return (
    <div className="relative mb-14 sm:mb-20">
      {/* Ambient Cinema Halo Glow */}
      <div 
        aria-hidden="true" 
        className="absolute -inset-4 sm:-inset-8 bg-gradient-to-b from-accent/20 via-accent/5 to-transparent rounded-3xl blur-3xl opacity-60 pointer-events-none -z-10" 
      />

      {/* Spotlight Cinema Frame */}
      <div className="relative rounded-2xl bg-bg-surface/90 border border-border-subtle p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-border-subtle mb-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                  Cinema Spotlight
                </span>
                {activeSection?.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-[10px] text-accent font-medium">
                    {activeSection.badge}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-semibold text-base sm:text-lg text-text-primary mt-0.5">
                {activeSection?.heading || "Featured Video"}
              </h3>
            </div>
          </div>

          {/* Stepper Controls & Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="px-3 py-1 rounded-full bg-bg-elevated border border-border-subtle text-xs font-mono text-text-secondary flex items-center gap-2">
              <WaveformIcon className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>{accessibleLabel}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Previous video"
                className="w-9 h-9 rounded-full bg-bg-elevated hover:bg-bg-base border border-border-subtle hover:border-accent text-text-secondary hover:text-accent flex items-center justify-center transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next video"
                className="w-9 h-9 rounded-full bg-bg-elevated hover:bg-bg-base border border-border-subtle hover:border-accent text-text-secondary hover:text-accent flex items-center justify-center transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Screen Viewport */}
        <div className="flex items-center justify-center py-2 sm:py-4">
          <div
            className={`w-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-border-subtle shadow-2xl transition-all duration-500 ring-1 ring-white/10 ${
              isVertical
                ? 'max-w-[320px] sm:max-w-[360px] md:max-w-[380px] aspect-[9/16]'
                : 'max-w-4xl aspect-[16/9]'
            }`}
          >
            {isPlaying ? (
              <div className="w-full h-full relative bg-black flex items-center justify-center">
                {loadError ? (
                  <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <p className="text-sm text-text-secondary">
                      Video stream takes a moment or needs refresh.
                    </p>
                    <button
                      type="button"
                      onClick={() => setLoadError(false)}
                      className="px-4 py-2 rounded-full bg-accent text-accent-deep font-semibold text-xs hover:bg-accent-soft transition-colors"
                    >
                      Reload Stream
                    </button>
                  </div>
                ) : (
                  <>
                    <iframe
                      key={activeVideo.driveId}
                      src={getDriveEmbedUrl(activeVideo.driveId)}
                      title={`Cinema Spotlight - ${accessibleLabel}`}
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                      onError={() => setLoadError(true)}
                      className="w-full h-full border-0 absolute inset-0"
                    />

                    {/*
                      Anti-Popout Shield:
                      Google Drive iframe puts a 'popout / new tab' icon on the top-right corner.
                      This transparent shield blocks direct clicking on that popout button so
                      viewers stay in your player without downloading, while bottom player controls remain 100% accessible.
                    */}
                    <div 
                      aria-hidden="true"
                      className="absolute top-0 right-0 w-16 h-16 pointer-events-auto bg-transparent z-20"
                      title="Direct playback inside portfolio"
                    />
                  </>
                )}
              </div>
            ) : (
              /* Idle Click-to-Play Theater Screen */
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play ${accessibleLabel} in Cinema Spotlight`}
                className="group w-full h-full relative flex items-center justify-center bg-gradient-to-br from-bg-surface via-bg-elevated to-bg-base focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {/* Dynamic Vignette & Grid Backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(#EF9F27_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-bg-base/40" />

                {/* Golden Pulsing Play Button */}
                <div className="relative flex flex-col items-center gap-4 z-10">
                  <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent text-accent-deep flex items-center justify-center shadow-amber-glow transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-soft active:scale-95">
                    <PlayIcon className="w-7 h-7 sm:w-9 sm:h-9 ml-1" />
                  </span>
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-semibold text-text-primary group-hover:text-accent transition-colors block">
                      Click to Play in Cinema Spotlight
                    </span>
                    <span className="text-[11px] text-text-muted mt-0.5 block">
                      {isVertical ? '9:16 Vertical Reel' : '16:9 Landscape Video'}
                    </span>
                  </div>
                </div>

                {/* Neutral Bottom Badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-bg-base/80 backdrop-blur-md border border-border-subtle text-[11px] font-mono text-text-secondary">
                  {accessibleLabel}
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-4 pt-3 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between text-[11px] text-text-muted gap-2">
          <span>Click any card below in the rows to instantly change the spotlight video.</span>
          <span className="hidden sm:inline">Use Prev/Next buttons to step through edits.</span>
        </div>

      </div>
    </div>
  );
}
