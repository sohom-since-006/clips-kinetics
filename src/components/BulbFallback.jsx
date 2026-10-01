import React from 'react';

/**
 * BulbFallback
 * Static fallback for when 3D WebGL is loading, unsupported, or disabled.
 * Displays a styled glowing bulb with the signature play icon inside.
 */
export default function BulbFallback({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center w-full h-full min-h-[320px] select-none ${className}`} aria-hidden="true">
      {/* Background radial glow */}
      <div className="absolute w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none animate-pulse-subtle" />
      
      {/* Fallback bulb graphic */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glass Dome with Play Icon */}
        <div className="relative w-40 h-40 rounded-full bg-gradient-to-b from-accent-soft/80 via-accent/60 to-accent-deep/80 border-2 border-accent-soft/50 shadow-[0_0_50px_rgba(239,159,39,0.5)] flex items-center justify-center">
          {/* Subtle inner reflection */}
          <div className="absolute top-3 left-6 w-12 h-6 rounded-full bg-white/30 rotate-[-25deg] blur-[2px]" />
          
          {/* Internal Play Icon */}
          <div className="w-0 h-0 border-y-[16px] border-y-transparent border-l-[26px] border-l-bg-base/90 ml-2 drop-shadow-md" />
        </div>
        
        {/* Bulb Neck / Base Ring */}
        <div className="w-20 h-5 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 rounded-t-sm -mt-1 border-x border-zinc-600" />
        <div className="w-18 h-3 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 border-t border-zinc-600" />
        <div className="w-14 h-4 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 rounded-b-md" />
      </div>
    </div>
  );
}
