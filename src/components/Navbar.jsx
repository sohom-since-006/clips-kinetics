"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '../data/site';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { MenuIcon, CloseIcon, WhatsAppIcon } from './icons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-surface/85 backdrop-blur-md border-b border-border-subtle shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 sm:gap-2.5 text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          {/* Animated Crystal Play Symbol */}
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/25 via-accent/10 to-transparent border border-accent/40 flex items-center justify-center text-accent group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(239,159,39,0.4)] transition-all">
            <span className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[9px] border-l-accent ml-0.5 drop-shadow-[0_0_6px_#FAC775]" />
          </span>
          <span className="font-heading font-bold text-base sm:text-xl tracking-tight text-text-primary">
            {siteConfig.brandName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:text-accent"
            >
              {link.label}
            </a>
          ))}


          {/* Quick WhatsApp Hire CTA */}
          <a
            href={getWhatsAppUrl("Hi Sohom, I'd like to hire you for a video project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent hover:bg-accent-soft text-bg-base font-semibold text-sm transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Hire me</span>
            <span className="w-1.5 h-1.5 rounded-full bg-bg-base/70 animate-ping" />
          </a>
        </nav>

        {/* Mobile Header Right Actions */}
        <div className="flex items-center gap-1.5 md:hidden">

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-surface/95 backdrop-blur-xl border-b border-border-subtle px-5 py-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </nav>



          <div className="pt-2">
            <a
              href={getWhatsAppUrl("Hi Sohom, I'd like to hire you for a video project.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-medium text-sm transition-all shadow-md active:scale-95 min-h-[48px]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
