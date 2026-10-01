import React from 'react';

/**
 * Logo3DFallback
 * Static fallback for when 3D WebGL is loading, unsupported, or disabled.
 * Faithfully depicts the faceted amber crystal play button logo with glowing inner core.
 */
export default function Logo3DFallback({ className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full min-h-[300px] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Background radial glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none animate-pulse-subtle" />

      {/* Cinematic Timeline Light Trails (Background) */}
      <div className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-48 sm:w-64 h-16 pointer-events-none opacity-60">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-accent-soft blur-[1px] mb-2" />
        <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-accent-soft to-accent blur-[1px] mb-3 ml-6" />
        <div className="w-5/6 h-0.5 bg-gradient-to-r from-transparent via-accent/80 to-accent-soft blur-[1px]" />
      </div>

      {/* Crystal Play Button Graphic */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Faceted Crystal Play Outer Shield */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          
          {/* Outer Glass Beveled Triangle */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_40px_rgba(239,159,39,0.55)]"
          >
            <defs>
              <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAC775" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#EF9F27" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#854F0B" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FAC775" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#EF9F27" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Outer Faceted Prism */}
            <polygon
              points="18,10 88,50 18,90"
              fill="url(#crystalGrad)"
              stroke="url(#edgeGrad)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Facet Refraction Cut Lines */}
            <line x1="18" y1="10" x2="38" y2="50" stroke="#FAC775" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="18" y1="90" x2="38" y2="50" stroke="#FAC775" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="88" y1="50" x2="38" y2="50" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />

            {/* Inner Glowing Play Filament */}
            <polygon
              points="34,32 68,50 34,68"
              fill="#FAC775"
              className="drop-shadow-[0_0_15px_#FAC775]"
            />
          </svg>
        </div>

        {/* Brushed Metal Pedestal */}
        <div className="w-28 sm:w-36 h-3 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 rounded-t-sm -mt-2 shadow-lg border-t border-zinc-500/40" />
        <div className="w-36 sm:w-48 h-2 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 rounded-b-md border-t border-zinc-700" />
      </div>
    </div>
  );
}
