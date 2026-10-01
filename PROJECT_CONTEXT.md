# Clips Kinetics - Project Context & Development Log

**Owner:** Sohom Paul  
**Brand:** Clips Kinetics (Freelance Video Editor)  
**Location:** Asansol, West Bengal, India  
**WhatsApp:** +91 7047233423  
**Status:** Successfully Built & Validated (Production Ready)  

---

## 1. Project Overview & Identity
- **Goal:** Showcase Sohom's video editing portfolio (reels, YouTube long-form, event coverage, restaurant branding, thumbnails) and convert visitors into direct WhatsApp enquiries.
- **Key Visual Hook:** Interactive 3D light bulb in the hero section containing a glowing play icon, tilting with cursor/touch, surrounded by a soft amber radial halo.
- **Tone:** Cinematic, dark luxury, professional, modern, accessible.
- **Primary Call to Action:** WhatsApp chat (+91 7047233423).

---

## 2. Technical Stack (Decided & Enforced)
- **Framework:** Next.js (App Router, `src/` directory)
- **Language:** JavaScript (JSX) - Clean, readable, beginner-friendly
- **3D Graphics:** React Three Fiber (`@react-three/fiber`), Three.js (`three`), `@react-three/drei`
- **Animation:** GSAP, `@gsap/react`, ScrollTrigger
- **Styling:** Tailwind CSS with custom design tokens
- **Data Source:** Static data files in `src/data/` (zero runtime database dependencies)
- **Video Player:** Custom click-to-load Google Drive iframe embeds (`src/lib/drive.js`)
- **Hosting Target:** GitHub + Vercel

---

## 3. Strict Project & Content Rules
1. **Zero Video / File / Client Names:** Only category headings and actual video playback. No titles or client names rendered.
2. **Accessible Labels:** Neutral numbering (e.g., "Video 1 of 6").
3. **Single Active Video:** Clicking any video stops/unmounts previous iframes to prevent audio overlap and save memory.
4. **Data-Driven:** All phone numbers, links, stats, and text reside in `src/data/`.
5. **WhatsApp Helper:** Standardized via `src/lib/whatsapp.js` with pre-filled message.
6. **Code-Generated 3D Bulb:** Procedural geometry (sphere, cylinders, triangle play icon) so there are no heavy 3D assets to download.
7. **Accessibility & Reduced Motion:** Respects `prefers-reduced-motion` everywhere.
8. **Spelling:** Always use "Restaurant" (not "Resturant").

---

## 4. File Structure Map
```
clips-kinetics/
├── public/
│   ├── images/
│   │   ├── sohom-paul.webp     # Watermark-free circular profile photo (640x640)
│   │   ├── sohom-paul.jpg      # Fallback JPG
│   │   ├── covers/             # 9:16 and 16:9 cinematic video card covers
│   │   └── gallery/            # Thumbnail and Restaurant branding items
├── src/
│   ├── app/
│   │   ├── layout.js           # Fonts (Space Grotesk & Inter), SEO metadata, viewport
│   │   ├── page.js             # Main page assembling all sections
│   │   └── globals.css         # Custom design tokens, utilities & animations
│   ├── components/
│   │   ├── Navbar.jsx          # Glassmorphic top navigation with mobile drawer
│   │   ├── Hero.jsx            # Hero section with 3D logo, profile photo & CTA
│   │   ├── Logo3DScene.jsx     # Procedural 3D Crystal Play Button Logo (interactive tilt)
│   │   ├── Logo3DFallback.jsx  # CSS 3D fallback for WebGL disabled environments
│   │   ├── Stats.jsx           # Experience, clients, location metrics
│   │   ├── WorkSection.jsx     # Categorized video showcase (Short-form, Long-form, etc.)
│   │   ├── VideoCard.jsx       # Click-to-load Drive embed card
│   │   ├── ShootingServices.jsx# On-location video shooting showcase with 8 packages & poster
│   │   ├── Services.jsx        # 6 video editing services with quote request CTA
│   │   ├── ImageGallery.jsx    # Restaurant & Commercial Branding gallery (thumbnails omitted)
│   │   ├── Lightbox.jsx        # Fullscreen image viewer with keyboard navigation
│   │   ├── About.jsx           # Story, skills, tools, and "Open to work" badge
│   │   ├── Contact.jsx         # WhatsApp direct action & 6 social profile links
│   │   ├── Footer.jsx          # Brand, socials, and copyright
│   │   ├── WhatsAppButton.jsx  # Floating bottom-right quick contact button
│   │   ├── ParticleBackground.jsx # Live ambient floating particles
│   │   ├── ScrollReveal.jsx    # GSAP ScrollTrigger animation wrapper
│   │   └── icons/index.jsx     # Pure inline SVGs for zero extra dependencies
│   ├── data/
│   │   ├── site.js             # Brand info, social URLs, phone number, stats
│   │   ├── videos.js           # Video categories and Drive IDs (no titles)
│   │   ├── images.js           # Restaurant branding gallery definitions (thumbnails removed)
│   │   └── services.js         # 6 core services + 8 shooting packages (price list)
│   └── lib/
│       ├── whatsapp.js         # WhatsApp link generator with URI encoding
│       └── drive.js            # Google Drive embed URL generator
├── scripts/
│   └── validate-data.mjs       # Automated data integrity validator
├── tailwind.config.js          # Color tokens and radius definitions
├── next.config.mjs             # Next.js configuration
├── package.json                # NPM dependencies & scripts
├── eslint.config.mjs           # Flat ESLint configuration
└── PROJECT_CONTEXT.md          # Complete project context tracker
```

---

## 5. Development Steps & Log
- [x] Initialized project requirements review and design system alignment
- [x] Created `PROJECT_CONTEXT.md` context log
- [x] Processed user's profile image (`My Image.jpg`) into watermark-free WebP and JPG assets
- [x] Initialized `package.json` with Next.js 15, React 19, R3F v9, drei v10, GSAP, and Tailwind CSS
- [x] Installed all dependencies successfully
- [x] Configured Tailwind CSS with custom design tokens (`bg-base`, `accent`, `whatsapp`, etc.)
- [x] Built data modules (`site.js`, `videos.js`, `images.js`, `services.js`)
- [x] Implemented utility helpers (`whatsapp.js`, `drive.js`)
- [x] Created full inline SVG icon set in `src/components/icons/index.jsx`
- [x] Implemented procedural 3D `BulbScene.jsx` & `BulbFallback.jsx`
- [x] Implemented UI components (`Navbar`, `Hero`, `Stats`, `WorkSection`, `VideoCard`, `ImageGallery`, `Lightbox`, `Services`, `About`, `Contact`, `Footer`, `WhatsAppButton`, `ScrollReveal`)
- [x] Updated Primary Toolset in `site.js` & `About.jsx` (Adobe Premiere Pro, DaVinci Resolve Studio, Adobe After Effects, Capcut Pro, Adobe Lightroom, Canva)
- [x] Comprehensive mobile optimizations across all breakpoints (360px+ support, safe-area aware floating WhatsApp button, touch-pan-y 3D canvas, mobile scrollable filter chips, 44px+ tap targets)
- [x] Upgraded 3D hero from bulb to **Interactive 3D Crystal Play Button Logo** matching custom reference design ([Logo3DScene.jsx](src/components/Logo3DScene.jsx) & [Logo3DFallback.jsx](src/components/Logo3DFallback.jsx))
- [x] Installed Spline 3D packages (`@splinetool/react-spline` and `@splinetool/runtime`) for direct Spline URL integration
- [x] Upgraded Typography Suite: Cursive Script (`Alex Brush`), Headings (`Montserrat`), Body Text (`Open Sans`)
- [x] Added Fluid Cursive Script Accent phrases woven above headlines across all major sections
- [x] Implemented Lightweight Ambient Live Particle Background with floating golden embers ([ParticleBackground.jsx](src/components/ParticleBackground.jsx))
- [x] Assembled `page.js` and `layout.js`
- [x] Created `scripts/validate-data.mjs` verification test suite
- [x] Ran and verified `npm run validate` (PASSED with 0 errors)
- [x] Ran and verified `npm run lint` (PASSED with 0 errors)
- [x] Ran and verified `npm run build` (PASSED with 0 errors, prerendered static build)

---

## 6. How to Run Locally & Deploy

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Code & Data Checks
```bash
npm run validate
npm run lint
npm run build
```

### How to Update Videos Later
Open `src/data/videos.js` and replace any `driveId` with your Google Drive file ID.
Ensure the file in Google Drive is shared with **"Anyone with the link can view"**.

### Deploy to Vercel
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Clips Kinetics portfolio"
   ```
2. Push to your GitHub repository.
3. Import the project into Vercel and deploy.

---

## 7. Shoot Services Policy
- **Zero Prices Displayed:** As per strict client instructions, all shoot services provide "Contact for quote" buttons linking to WhatsApp with pre-filled messages. Prices are discussed directly via chat or call (+91 7047233423).
- **No Specific Camera/Gimbal Model Names:** Neutral phrasing describing high-quality on-location cinematography and stabilization.
- **Uploaded Poster Image Omitted:** The UI features clean, high-performance cards with interactive glowing accents, avoiding external image dependencies.
3. Import the repository into [Vercel](https://vercel.com) - Next.js will be auto-detected and deploy immediately.
