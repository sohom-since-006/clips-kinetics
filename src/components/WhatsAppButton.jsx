"use client";

import React, { useState, useEffect } from 'react';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { WhatsAppIcon } from './icons';

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside aria-label="Quick contact" className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-30">
      <a
        href={getWhatsAppUrl("Hi Sohom, I'm reaching out from your Clips Kinetics website!")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sohom on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white shadow-xl hover:shadow-emerald-900/60 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-whatsapp/40 animate-ping opacity-60 pointer-events-none motion-reduce:hidden" />
        
        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-105" />

        {/* Hover Tooltip (Desktop) */}
        <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-bg-surface/95 backdrop-blur-md border border-border-subtle text-xs font-semibold text-text-primary whitespace-nowrap shadow-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
