"use client";

import React, { useState, useEffect } from 'react';
import { initialTestimonials } from '../data/testimonials';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { StarIcon, EditIcon, CloseIcon, WhatsAppIcon } from './icons';
import ScrollReveal from './ScrollReveal';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form inputs
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  // Hydrate custom reviews from localStorage if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('clips_kinetics_user_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTestimonials([...parsed, ...initialTestimonials]);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!review.trim() || review.trim().length < 10) {
      setError('Please share a short review (at least 10 characters).');
      return;
    }

    const newTestimonial = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Verified Client',
      rating,
      language: 'custom',
      text: review.trim(),
      date: 'Just now'
    };

    // 1. Save and display immediately on website
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    try {
      const stored = localStorage.getItem('clips_kinetics_user_reviews');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('clips_kinetics_user_reviews', JSON.stringify([newTestimonial, ...existing]));
    } catch {
      // Ignore localStorage write error
    }

    // 2. Prepare WhatsApp dispatch message for Sohom
    const starsEmoji = '⭐'.repeat(rating);
    const whatsappMsg = `Hi Sohom! I just submitted a new testimonial on your Clips Kinetics portfolio:\n\n${starsEmoji} Rating: ${rating}/5\n👤 Name: ${name.trim()} (${role.trim() || 'Client'})\n💬 Review: "${review.trim()}"`;
    
    // Open WhatsApp in new tab so Sohom gets it instantly
    const targetUrl = getWhatsAppUrl(whatsappMsg);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setError('');
  };

  const resetForm = () => {
    setName('');
    setRole('');
    setRating(5);
    setReview('');
    setError('');
    setSubmitted(false);
    setModalOpen(false);
  };

  // Helper for initials
  const getInitials = (fullName) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-28 relative bg-bg-surface/20 border-t border-border-subtle overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 -left-36 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-36 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent/85 block mb-1 tracking-wide select-none drop-shadow-sm">
            Client Stories & Trust
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight mb-3 sm:mb-4">
            What Clients Say
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-text-secondary text-sm sm:text-base lg:text-lg mb-6">
            Real feedback from creators, brands, and clients across YouTube, Instagram Reels, and on-location shoots.
          </p>

          {/* Action: Open Write Testimonial Modal */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 hover:bg-accent text-accent hover:text-bg-base border border-accent/30 font-semibold text-xs sm:text-sm transition-all shadow-card-subtle group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <EditIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Write a Testimonial</span>
          </button>
        </ScrollReveal>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              delay={(idx % 6) * 0.08}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-bg-surface border border-border-subtle hover:border-accent/40 hover:shadow-[0_4px_25px_rgba(239,159,39,0.08)] transition-all duration-300 relative group"
            >
              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(5)].map((_, sIdx) => (
                      <StarIcon
                        key={sIdx}
                        filled={sIdx < item.rating}
                        className="w-4 h-4 fill-current drop-shadow-[0_0_6px_rgba(239,159,39,0.4)]"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-text-muted font-medium">
                    {item.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm lg:text-base text-text-secondary leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              {/* Client Info Row */}
              <div className="pt-4 border-t border-border-subtle/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/25 to-accent/5 border border-accent/30 flex items-center justify-center text-accent font-heading font-bold text-xs sm:text-sm select-none shadow-sm">
                  {getInitials(item.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-semibold text-sm sm:text-base text-text-primary truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-text-muted truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Write a Testimonial Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="testimonial-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-bg-surface border border-accent/30 shadow-[0_0_35px_rgba(239,159,39,0.15)] max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={resetForm}
              className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-6">
                  <span className="font-script text-2xl text-accent block mb-1">
                    Your Experience
                  </span>
                  <h3 id="testimonial-modal-title" className="font-heading font-bold text-xl sm:text-2xl text-text-primary">
                    Share Your Feedback
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">
                    Your review will appear immediately on the website and be shared directly with Sohom.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Star Rating Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 text-accent hover:scale-110 transition-transform focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                          <StarIcon
                            filled={star <= (hoverRating || rating)}
                            className="w-6 h-6 fill-current"
                          />
                        </button>
                      ))}
                      <span className="text-xs text-text-muted ml-2 font-medium">
                        {rating} out of 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label htmlFor="rev-name" className="block text-xs font-semibold text-text-primary mb-1">
                      Your Name *
                    </label>
                    <input
                      id="rev-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Hemendra Singh"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Role / Project Input */}
                  <div>
                    <label htmlFor="rev-role" className="block text-xs font-semibold text-text-primary mb-1">
                      Project Type / Role (Optional)
                    </label>
                    <input
                      id="rev-role"
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. YouTube Vlogger / Wedding Shoot Client"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Review Textarea */}
                  <div>
                    <label htmlFor="rev-text" className="block text-xs font-semibold text-text-primary mb-1">
                      Your Testimonial (Hinglish or English) *
                    </label>
                    <textarea
                      id="rev-text"
                      rows={4}
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="e.g. Bhai ka editing aur cinematic cut next level hai! Pacing aur sound design ekdum perfect..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-accent hover:bg-accent-soft text-bg-base font-bold text-sm sm:text-base transition-all shadow-md active:scale-98"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-bg-base" />
                      <span>Post Review & Send via WhatsApp</span>
                    </button>
                    <p className="text-[11px] text-text-muted text-center mt-2">
                      Automatically saves on the site & forwards to Sohom's WhatsApp.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* Success Screen */
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/40 text-accent flex items-center justify-center mx-auto mb-4 text-2xl">
                  ✓
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
                  Review Posted & Sent!
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto mb-6">
                  Thank you! Your testimonial has been published to the page and your WhatsApp message has been opened to notify Sohom.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full bg-accent text-bg-base font-semibold text-sm hover:bg-accent-soft transition-all"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
