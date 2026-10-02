import React from 'react';

/**
 * Logo3DFallback
 *
 * 2D SVG/CSS fallback matching the sculpted metallic play triangle.
 * Displays when 3D WebGL is loading, disabled, or unsupported.
 */
export default function Logo3DFallback({ isLit = true, className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-[230px] sm:h-[280px] lg:h-[330px] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Background radial ambient glow */}
      <div
        className={`absolute w-44 h-44 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full pointer-events-none transition-all duration-700 ${
          isLit
            ? 'bg-accent/35 blur-[75px] sm:blur-[95px] scale-105 opacity-100'
            : 'bg-slate-300/40 blur-[50px] scale-90 opacity-40'
        }`}
      />

      {/* Solid metallic play triangle */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 120 120"
          className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52"
          fill="none"
        >
          <defs>
            {/* Drop shadow */}
            <filter id="play-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation={isLit ? "6" : "4"} />
              <feOffset dx="0" dy="4" />
              <feComponentTransfer>
                <feFuncA type="linear" slope={isLit ? "0.45" : "0.2"} />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Warm glow for lit state */}
            {isLit && (
              <filter id="play-glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
              </filter>
            )}

            {/* Gradient for the outer metallic bezel */}
            <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isLit ? "#F6C768" : "#E2E8F0"} />
              <stop offset="35%" stopColor={isLit ? "#D49B35" : "#CBD5E1"} />
              <stop offset="70%" stopColor={isLit ? "#B26E08" : "#94A3B8"} />
              <stop offset="100%" stopColor={isLit ? "#E2A93C" : "#CBD5E1"} />
            </linearGradient>

            {/* Inner Core Gradient */}
            <linearGradient id="inner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isLit ? "#FFC043" : "#94A3B8"} />
              <stop offset="100%" stopColor={isLit ? "#FF9500" : "#64748B"} />
            </linearGradient>
          </defs>

          {/* Glow layer (only when lit) */}
          {isLit && (
            <path
              d="M34 26 C34 20 40 17 45 20 L94 54 C99 57 99 63 94 66 L45 100 C40 103 34 100 34 94 Z"
              fill="#FFAE26"
              opacity="0.3"
              filter="url(#play-glow)"
            />
          )}

          {/* Main outer metallic play triangle */}
          <path
            d="M34 26 C34 20 40 17 45 20 L94 54 C99 57 99 63 94 66 L45 100 C40 103 34 100 34 94 Z"
            fill="url(#metal-grad)"
            filter="url(#play-shadow)"
            stroke={isLit ? "#FFE7B8" : "#F8FAFC"}
            strokeWidth={isLit ? "2" : "1.5"}
          />

          {/* Recessed inner core */}
          <path
            d="M42 36 C42 32 46 30 49 32 L83 56 C86 58 86 62 83 64 L49 88 C46 90 42 88 42 84 Z"
            fill="url(#inner-grad)"
            opacity={isLit ? "0.9" : "0.7"}
          />

          {/* Specular highlight rim */}
          <path
            d="M44 26 L90 53"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={isLit ? "0.45" : "0.6"}
          />
        </svg>
      </div>
    </div>
  );
}
