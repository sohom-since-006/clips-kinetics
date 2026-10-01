"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getDriveEmbedUrl } from '../lib/drive';
import { PlayIcon } from './icons';

export default function VideoCard({
  video,
  index,
  totalCount,
  isActive,
  onActivate,
}) {
  const [loadError, setLoadError] = useState(false);
  const cardRef = useRef(null);

  const isVertical = video.aspectRatio === '9:16';
  const accessibleLabel = `Video ${index + 1} of ${totalCount}`;

  // Unmount iframe if scrolled far out of view to free browser memory
  useEffect(() => {
    if (!isActive || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isActive) {
          // When scrolled out of viewport, deactivate video
          onActivate(null);
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isActive, onActivate]);

  const handleCardClick = () => {
    if (!isActive) {
      setLoadError(false);
      onActivate(video.id);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-md overflow-hidden bg-bg-surface border border-border-subtle hover:border-accent/50 transition-all duration-300 shadow-card-subtle ${
        isVertical ? 'aspect-[9/16]' : 'aspect-[16/9]'
      }`}
    >
      {/* State 1: Active Playing Iframe */}
      {isActive ? (
        <div className="w-full h-full relative bg-black flex items-center justify-center">
          {loadError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
              <p className="text-sm text-text-secondary">
                Video player took too long or is unavailable.
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLoadError(false);
                }}
                className="px-4 py-2 rounded-full bg-accent text-bg-base font-semibold text-xs hover:bg-accent-soft transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <iframe
              src={getDriveEmbedUrl(video.driveId)}
              title={accessibleLabel}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              onError={() => setLoadError(true)}
              className="w-full h-full border-0 absolute inset-0"
            />
          )}
        </div>
      ) : (
        /* State 2: Lightweight Click-to-Load Placeholder */
        <button
          type="button"
          onClick={handleCardClick}
          aria-label={`Play ${accessibleLabel}`}
          className="w-full h-full relative block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {/* Cover image or fallback gradient */}
          {video.coverImage ? (
            <Image
              src={video.coverImage}
              alt={accessibleLabel}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-bg-surface via-bg-elevated to-bg-base" />
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-bg-base/20 transition-opacity group-hover:opacity-60" />

          {/* Centered Golden Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent text-accent-deep flex items-center justify-center shadow-amber-glow transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-soft active:scale-95">
              <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7 ml-1" />
            </span>
          </div>

          {/* Neutral Accessible Index Badge */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-sm bg-bg-base/80 backdrop-blur-md border border-border-subtle text-[11px] font-mono text-text-muted">
            {accessibleLabel}
          </div>
        </button>
      )}
    </div>
  );
}
