"use client";

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-3">
        <span className="text-xs sm:text-sm font-mono text-text-muted px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-700">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image lightbox"
          className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-text-secondary hover:text-white border border-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Navigation Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex - 1 + images.length) % images.length);
          }}
          aria-label="Previous image"
          className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-text-secondary hover:text-white border border-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[82vh] w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh] flex items-center justify-center">
          <Image
            src={currentImage.src}
            alt={currentImage.alt || 'Gallery item'}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <span className="inline-block text-xs font-medium text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-1">
            {currentImage.category}
          </span>
          <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto">
            {currentImage.alt}
          </p>
        </div>
      </div>

      {/* Next Navigation Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex + 1) % images.length);
          }}
          aria-label="Next image"
          className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-text-secondary hover:text-white border border-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
