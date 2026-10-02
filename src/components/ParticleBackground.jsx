"use client";

import React, { useEffect, useRef } from 'react';

/**
 * Cyberpunk Grid & Interactive Node Connections Background
 *
 * - Subtle dark charcoal / pure black cyberpunk grid with micro crosshairs.
 * - Interactive node network: when user hovers or moves cursor, nearby nodes
 *   light up in signature theme orange (#EF9F27 / #FFAE26) and connect
 *   with thin luminous white lines.
 * - Seamlessly transitions between Dark Mode and Light Mode.
 * - Optimized 60fps HTML5 Canvas with tab visibility & reduced-motion safeguards.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Accessibility check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse / Pointer interaction state
    const mouse = {
      x: null,
      y: null,
      radius: 175, // Interaction proximity radius
      isActive: false,
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.isActive = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchend', handleMouseLeave);

    // Helper to check current theme
    const getIsDark = () => {
      return document.documentElement.getAttribute('data-theme') !== 'light';
    };

    // Responsive node count
    const nodeCount = Math.min(65, Math.max(28, Math.floor((width * height) / 22000)));
    const maxConnectionDistance = 120;

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.baseRadius = Math.random() * 1.2 + 1.2;
        this.radius = this.baseRadius;
        this.glowIntensity = 0; // 0 to 1 when near cursor
      }

      update() {
        // Move with drift velocity
        this.x += this.vx;
        this.y += this.vy;

        // Bounce gently at screen boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Proximity calculation to mouse
        if (mouse.isActive && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Target glow based on distance (1 at center, 0 at boundary)
            const targetGlow = 1 - distance / mouse.radius;
            this.glowIntensity += (targetGlow - this.glowIntensity) * 0.15;

            // Subtle interactive organic repulsion
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 0.6;
            this.y -= (dy / distance) * force * 0.6;

            // Expand radius slightly when lit up
            this.radius = this.baseRadius + this.glowIntensity * 1.6;
          } else {
            this.glowIntensity *= 0.88; // Smooth decay
            this.radius += (this.baseRadius - this.radius) * 0.1;
          }
        } else {
          this.glowIntensity *= 0.88;
          this.radius += (this.baseRadius - this.radius) * 0.1;
        }
      }

      draw(isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(1, this.radius), 0, Math.PI * 2);

        if (this.glowIntensity > 0.05) {
          // Lit up node in website theme orange / amber
          const orangeRgb = isDark ? '239, 159, 39' : '217, 119, 6';
          const nodeAlpha = Math.min(1.0, 0.4 + this.glowIntensity * 0.6);

          ctx.fillStyle = `rgba(${orangeRgb}, ${nodeAlpha})`;
          ctx.shadowBlur = this.glowIntensity * 14;
          ctx.shadowColor = isDark ? 'rgba(239, 159, 39, 0.9)' : 'rgba(217, 119, 6, 0.7)';
          ctx.fill();
          ctx.shadowBlur = 0; // Reset
        } else {
          // Ambient idle node
          const defaultColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(15, 23, 42, 0.2)';
          ctx.fillStyle = defaultColor;
          ctx.fill();
        }
      }
    }

    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    // Draw Cyberpunk Grid
    const drawGrid = (isDark) => {
      const gridSize = 56;
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.022)' : 'rgba(15, 23, 42, 0.032)';

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Subtle micro crosshairs at intersections
      const crossSize = 2.5;
      ctx.beginPath();
      ctx.strokeStyle = isDark ? 'rgba(239, 159, 39, 0.045)' : 'rgba(217, 119, 6, 0.05)';
      for (let x = gridSize; x < width; x += gridSize * 2) {
        for (let y = gridSize; y < height; y += gridSize * 2) {
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
        }
      }
      ctx.stroke();
    };

    // Draw connecting lines between nodes and to cursor
    const drawConnections = (isDark) => {
      // 1. Inter-node connecting lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const baseAlpha = 1 - dist / maxConnectionDistance;
            const maxGlow = Math.max(nodes[i].glowIntensity, nodes[j].glowIntensity);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            if (maxGlow > 0.08) {
              // Lit connections: thin luminous white lines
              ctx.lineWidth = 0.8 + maxGlow * 0.4;
              ctx.strokeStyle = isDark
                ? `rgba(255, 255, 255, ${Math.min(0.7, baseAlpha * (0.3 + maxGlow * 0.5))})`
                : `rgba(217, 119, 6, ${Math.min(0.65, baseAlpha * (0.25 + maxGlow * 0.45))})`;
            } else {
              // Ambient faint connections
              ctx.lineWidth = 0.4;
              ctx.strokeStyle = isDark
                ? `rgba(255, 255, 255, ${baseAlpha * 0.045})`
                : `rgba(15, 23, 42, ${baseAlpha * 0.04})`;
            }
            ctx.stroke();
          }
        }
      }

      // 2. Direct lines from cursor to nearby illuminated orange nodes
      if (mouse.isActive && mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = mouse.x - nodes[i].x;
          const dy = mouse.y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.55;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(nodes[i].x, nodes[i].y);
            ctx.lineWidth = 0.9;
            // Thin white luminous beam to cursor
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(217, 119, 6, ${alpha})`;
            ctx.stroke();
          }
        }
      }
    };

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
      const isDark = getIsDark();

      // 1. Render Cyberpunk Grid
      drawGrid(isDark);

      // 2. Update all nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
      }

      // 3. Render connecting lines
      drawConnections(isDark);

      // 4. Render nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].draw(isDark);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
    />
  );
}
