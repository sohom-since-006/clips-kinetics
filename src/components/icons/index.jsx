import React from 'react';

export function WhatsAppIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.42C9.36 7.42 9.08 7.48 8.84 7.74C8.6 8 7.93 8.63 7.93 9.91C7.93 11.19 8.87 12.43 9 12.6C9.13 12.78 10.84 15.42 13.46 16.55C14.08 16.82 14.57 16.98 14.95 17.1C15.57 17.3 16.14 17.27 16.58 17.2C17.07 17.13 18.1 16.58 18.31 15.98C18.52 15.38 18.52 14.87 18.45 14.77C18.39 14.66 18.21 14.6 17.94 14.46C17.67 14.33 16.34 13.67 16.09 13.58C15.84 13.49 15.66 13.45 15.48 13.72C15.3 13.99 14.78 14.6 14.62 14.78C14.47 14.97 14.31 14.99 14.04 14.85C13.77 14.72 12.91 14.44 11.89 13.53C11.1 12.82 10.56 11.95 10.41 11.69C10.26 11.42 10.39 11.28 10.53 11.14C10.65 11.02 10.8 10.82 10.94 10.66C11.08 10.5 11.12 10.38 11.21 10.2C11.3 10.02 11.26 9.87 11.19 9.73C11.12 9.6 10.6 8.32 10.38 7.8C10.17 7.29 9.96 7.36 9.8 7.35C9.65 7.34 9.47 7.42 9.53 7.42Z"/>
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export function YouTubeIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
    </svg>
  );
}

export function LinkedInIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export function FacebookIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export function FiverrIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M21.2 13.9c-.3-.2-1.3-.4-2-.4-1.7 0-2.4 1-2.4 2.5v4.2H14v-9.3h2.6v1.4c.6-1.1 1.7-1.6 3.1-1.6.8 0 1.5.1 1.9.3l-.4 2.9zm-9.3 6.3H9.1V10.9h2.8v9.3zm0-11.8H9.1V5.9h2.8v2.5zM6.9 20.2H4.1V10.9h2.8v9.3zM6.9 8.4H4.1V5.9h2.8v2.5z"/>
    </svg>
  );
}

export function PlayIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <polygon points="6 4 20 12 6 20 6 4"/>
    </svg>
  );
}

export function CloseIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

export function MenuIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

export function ArrowDownIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <line x1="12" y1="5" x2="12" y2="19"/>
      <polyline points="19 12 12 19 5 12"/>
    </svg>
  );
}

export function ChevronLeftIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <line x1="7" y1="17" x2="17" y2="7"/>
      <polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}

export function StarIcon({ className = "w-4 h-4", filled = true, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

export function EditIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

/* Service Icons */

export function YouTubeVideoIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="3"/>
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
    </svg>
  );
}

export function ReelIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="5" y="2" width="14" height="20" rx="3"/>
      <line x1="5" y1="7" x2="19" y2="7"/>
      <line x1="5" y1="17" x2="19" y2="17"/>
      <polygon points="11 10 15 12 11 14 11 10" fill="currentColor"/>
    </svg>
  );
}

export function PaletteIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.8 1.7-1.8 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.5 0-1.1.9-2 2-2h2.3c3.9 0 7-3.1 7-7 0-5-4.5-8.3-10-8.3z"/>
    </svg>
  );
}

export function SparklesIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}

export function WaveformIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <line x1="3" y1="10" x2="3" y2="14"/>
      <line x1="7" y1="6" x2="7" y2="18"/>
      <line x1="11" y1="3" x2="11" y2="21"/>
      <line x1="15" y1="8" x2="15" y2="16"/>
      <line x1="19" y1="5" x2="19" y2="19"/>
      <line x1="23" y1="11" x2="23" y2="13"/>
    </svg>
  );
}

export function LayoutIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="9" y1="21" x2="9" y2="9"/>
    </svg>
  );
}

export function CameraIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
}

export function CarIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 11.5v4.5c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  );
}

export function BikeIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <circle cx="5.5" cy="17.5" r="3.5"/>
      <circle cx="18.5" cy="17.5" r="3.5"/>
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 12l3-5h3l3 4.5"/>
      <path d="M12 17.5V14h3"/>
    </svg>
  );
}

export function HomeIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

export function RingIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="14" r="7"/>
      <path d="M9 5l3-3 3 3-3 3z"/>
    </svg>
  );
}

export function CakeIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
      <path d="M2 21h20"/>
      <line x1="12" y1="7" x2="12" y2="11"/>
      <line x1="12" y1="4" x2="12.01" y2="4"/>
    </svg>
  );
}

export function MailIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

/**
 * Service icon mapper
 */
export function ServiceIcon({ name, className = "w-6 h-6" }) {
  switch (name) {
    case 'youtube-video':
      return <YouTubeVideoIcon className={className} />;
    case 'reel':
      return <ReelIcon className={className} />;
    case 'palette':
      return <PaletteIcon className={className} />;
    case 'sparkles':
      return <SparklesIcon className={className} />;
    case 'waveform':
      return <WaveformIcon className={className} />;
    case 'camera':
      return <CameraIcon className={className} />;
    case 'car':
      return <CarIcon className={className} />;
    case 'bike':
      return <BikeIcon className={className} />;
    case 'home':
      return <HomeIcon className={className} />;
    case 'ring':
      return <RingIcon className={className} />;
    case 'cake':
      return <CakeIcon className={className} />;
    case 'mail':
      return <MailIcon className={className} />;
    case 'layout':
      return <LayoutIcon className={className} />;
    default:
      return <SparklesIcon className={className} />;
  }
}

/**
 * Social icon mapper
 */
export function SocialIcon({ name, className = "w-5 h-5" }) {
  switch (name) {
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'youtube':
      return <YouTubeIcon className={className} />;
    case 'linkedin':
      return <LinkedInIcon className={className} />;
    case 'facebook':
      return <FacebookIcon className={className} />;
    case 'fiverr':
      return <FiverrIcon className={className} />;
    default:
      return null;
  }
}
