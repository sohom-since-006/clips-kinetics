import React from 'react';

/**
 * Logo3DFallback
 * High-fidelity 2D/CSS fallback for when 3D WebGL is loading, disabled, or unsupported.
 * Features the luxury brushed bezel, glowing neon Play button, and ambient amber halo.
 */
export default function Logo3DFallback({ isLit = true, className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-[250px] sm:h-[300px] lg:h-[340px] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Background radial ambient illumination */}
      <div
        className={`absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full blur-[80px] pointer-events-none transition-all duration-700 ${
          isLit ? 'bg-accent/25 opacity-100' : 'bg-accent/5 opacity-30'
        }`}
      />

      {/* Main Button Housing */}
      <div className="relative flex items-center justify-center">
        {/* Orbital Accent Halo Ring */}
        <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-accent/25 animate-spin-slow pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/80 shadow-[0_0_8px_#FAC775]" />
        </div>

        {/* Outer Titanium Bezel Disk */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-[#2D2B35] via-[#16151B] to-[#0D0C10] p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.15)] flex items-center justify-center">
          
          {/* Champagne Gold Accent Rim */}
          <div className="w-full h-full rounded-full border border-accent/40 bg-gradient-to-br from-bg-surface/90 to-bg-base/95 p-3 flex items-center justify-center shadow-inner">
            
            {/* Inner Glass Lens Dome with Amber Gradient */}
            <div className={`relative w-full h-full rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${
              isLit
                ? 'bg-gradient-to-br from-accent/20 via-transparent to-accent/10 shadow-[0_0_30px_rgba(239,159,39,0.3)]'
                : 'bg-[#100E14]'
            }`}>
              
              {/* Glass Glare Highlights */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/10 blur-md pointer-events-none" />

              {/* Glowing Play Triangle */}
              <svg
                viewBox="0 0 24 24"
                className={`w-12 h-12 sm:w-14 sm:h-14 ml-1 transition-all duration-500 ${
                  isLit
                    ? 'text-accent drop-shadow-[0_0_15px_#FAC775]'
                    : 'text-[#4A3215] opacity-40'
                }`}
                fill="currentColor"
              >
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
