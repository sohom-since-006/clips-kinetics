"use client";

import React, { useEffect, useRef } from 'react';

/**
 * ParticleBackground Component
 * Ultra-lightweight HTML5 canvas floating ambient dust motes & golden embers.
 * Runs at 60fps with negligible CPU usage, pauses when off-screen/tab hidden.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Number of subtle particles (scaled to screen size)
    const particleCount = Math.min(45, Math.floor(width / 35));
    const particles = [];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.size = Math.random() * 1.8 + 0.6; // Tiny micro-motes
        this.speedY = Math.random() * 0.35 + 0.15; // Slow upward drift
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.35 + 0.1;
        this.baseOpacity = this.opacity;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseAngle = Math.random() * Math.PI * 2;
        // Warm golden/amber tones with occasional soft emerald sheen
        this.color = Math.random() > 0.15 ? '239, 159, 39' : '250, 199, 117';
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.pulseAngle) * 0.15;
        this.pulseAngle += this.pulseSpeed;
        this.opacity = this.baseOpacity + Math.sin(this.pulseAngle) * 0.08;

        // Reset when drifted off top or sides
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${Math.max(0.05, this.opacity)})`;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = `rgba(${this.color}, 0.4)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        render();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
