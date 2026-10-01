# Architecture

**Project:** Clips Kinetics: Video Editing Portfolio Website
**Version:** 1.0 (draft)
**Related documents:** `PRD.md`, `TRD.md`, `BACKEND SCHEMA.md`, `DESIGN SYSTEM.md`, `SECURITY.md`

---

## 1. Summary

The website is a **single-page, statically built Next.js site** with no database and no custom server. Content comes from local data files. The 3D bulb and animations run in the visitor's browser. Videos are embedded from Google Drive. WhatsApp and social links open external apps.

Simple parts, clear boundaries, and easy replacement of any one part (for example, Drive for YouTube).

## 2. System context

```
                    ┌──────────────────────┐
                    │       Visitor        │
                    │  (phone or laptop)   │
                    └──────────┬───────────┘
                               │ opens link
                               ▼
┌────────────┐  push   ┌──────────────┐  deploys  ┌──────────────────┐
│  Sohom's   │ ──────► │    GitHub    │ ────────► │      Vercel      │
│  computer  │         │ (code store) │           │ (hosting + CDN)  │
└────────────┘         └──────────────┘           └────────┬─────────┘
                                                           │ serves site
                                                           ▼
                                                  ┌──────────────────┐
                                                  │  Portfolio site  │
                                                  │ (Next.js, static)│
                                                  └───┬──────┬───┬───┘
                                    iframe embeds     │      │   │ links
                                    ┌─────────────────┘      │   └───────────────┐
                                    ▼                        ▼                   ▼
                            ┌───────────────┐       ┌────────────────┐   ┌──────────────────┐
                            │ Google Drive  │       │ Google Fonts   │   │ WhatsApp, Insta, │
                            │ (video player)│       │ (via next/font)│   │ YouTube, LinkedIn│
                            └───────────────┘       └────────────────┘   │ Facebook, Fiverr │
                                                                         └──────────────────┘
```

**External services used:** Vercel (hosting), GitHub (code), Google Drive (video playback), social platforms (links only). Nothing else.

## 3. Layers

| Layer | Folder | Responsibility | Knows about |
|-------|--------|----------------|-------------|
| Data | `src/data/` | Raw content: site details, videos, images, services | Nothing else |
| Helpers | `src/lib/` | Pure functions: build WhatsApp link, build Drive embed link | Data shape only |
| Components | `src/components/` | Visual pieces and their behaviour | Data, helpers |
| Page | `src/app/page.js` | Assembles sections in order | Components |
| Shell | `src/app/layout.js` | Fonts, metadata, global wrapper | Styles |
| Styles | `src/app/globals.css` | Design tokens and base styles | Nothing else |
| Assets | `public/` | Compressed images and icons | Nothing else |

**Rule:** dependencies point downward only. Data never imports components. Helpers never import components. Components never contain hard-coded content.

## 4. Component tree

```
layout.js
└── page.js
    ├── Navbar
    ├── Hero
    │   ├── HeroText (badge, name, tagline, intro, buttons)
    │   ├── BulbScene   ← client only, loaded lazily (3D)
    │   │     └── BulbFallback (static image)
    │   └── ProfilePhoto (circular cutout)
    ├── Stats
    ├── WorkSection
    │   ├── SectionHeading
    │   ├── FilterChips (short-form only)
    │   └── VideoCard × N
    │         └── VideoPlayer (iframe, mounted on tap)
    ├── ImageGallery × 2 (thumbnails, restaurant branding)
    │   └── Lightbox
    ├── Services
    │   └── ServiceCard × 6
    ├── About
    ├── Contact
    │   └── SocialButtons
    ├── Footer
    └── WhatsAppButton (floating, fixed position)
```

## 5. Server and client boundaries

| Component | Runs on | Why |
|-----------|---------|-----|
| `layout.js`, `page.js` | Server (built at deploy time) | Static content, best speed and SEO |
| Navbar (menu toggle) | Client | Needs click state |
| Hero text, Stats, Services, About, Footer | Server where possible | No interactivity needed |
| Scroll animation wrapper | Client | GSAP uses the browser |
| `BulbScene` | Client only, `ssr: false` | WebGL exists only in the browser |
| `WorkSection`, `VideoCard`, `FilterChips` | Client | Click, filter, and active-video state |
| `ImageGallery`, `Lightbox` | Client | Open and close state, keyboard handling |
| `WhatsAppButton` | Server or client | Simple link |

Mark a file `"use client"` only when it truly needs browser features.

## 6. Data flow

```
 src/data/*.js ──► src/lib/* (link builders) ──► components ──► page ──► HTML sent to visitor
      ▲
      └── The only place Sohom edits to change content
```

Examples:

- **Video:** `videos.js` holds a `driveId`. `drive.js` turns it into the embed URL. `VideoCard` renders it.
- **WhatsApp:** `site.js` holds the phone number and message. `whatsapp.js` builds the `wa.me` link. Every button uses the same helper.

There is no runtime data fetching in Version 1. Everything is known at build time.

## 7. State management

No state library is needed. State is kept small and local:

| State | Where it lives | Purpose |
|-------|----------------|---------|
| Mobile menu open | `Navbar` | Show or hide menu |
| Active filter | `WorkSection` (short-form) | Filter visible videos |
| Active video id | Page-level video context or `WorkSection` | Only one iframe mounted at a time |
| Lightbox open and index | `ImageGallery` | Show larger image |
| Bulb lit level and pointer | Inside `BulbScene` (refs) | Smooth 3D reaction without re-rendering React |
| Reduced motion | One small hook, read by animation code | Respect user setting |

## 8. 3D architecture

```
Hero
 └── BulbScene (dynamic import, ssr: false)
      ├── Suspense (fallback = static bulb image)
      └── Canvas (R3F, dpr capped)
           ├── Lights (ambient + warm point light)
           ├── Bulb group
           │    ├── Glass (sphere, emissive material)
           │    ├── Play icon (triangle shape)
           │    └── Base and cap (cylinders)
           └── Frame loop (useFrame): ease tilt toward pointer, ease glow intensity
```

Key decisions:

- Shapes are generated in code, so there is no model download.
- Pointer position and glow value live in **refs**, not React state, to avoid re-rendering on every mouse move.
- An Intersection Observer pauses the loop when the hero is off screen.
- If WebGL setup fails, an error boundary swaps in the static fallback.
- A CSS radial halo behind the canvas adds glow cheaply.

## 9. Animation architecture

- One client component registers GSAP and ScrollTrigger once.
- Sections use a small shared wrapper (for example `Reveal`) that animates `transform` and `opacity` when the section enters view.
- Animations are created in a GSAP context (`useGSAP`) and cleaned up on unmount.
- A reduced-motion check disables or shortens every animation.
- GSAP and 3D never fight: 3D uses its own frame loop, GSAP handles DOM sections only.

## 10. Video architecture

```
VideoCard (placeholder: cover or neutral box + play button)
    │ visitor taps
    ▼
set activeVideoId = this card
    │
    ▼
VideoPlayer mounts:  <iframe src="https://drive.google.com/file/d/<ID>/preview">
    │
    ├── another card tapped  → previous iframe unmounts (back to placeholder)
    ├── scrolled far away    → iframe unmounts (Intersection Observer)
    └── load fails / timeout → fallback message with retry
```

Why click-to-load: a Drive player is heavy. Mounting it only on tap keeps the page fast even with 40+ videos. Cover images load lazily.

All Drive-specific code is inside `src/lib/drive.js` and `VideoPlayer`. To move to YouTube, Vimeo, or Cloudinary, change those two places and add a `source` field to `videos.js`.

## 11. Image architecture

- Local images are served through `next/image` for resizing, modern formats, and lazy loading.
- Source images are compressed before they enter `public/images/`.
- Galleries use fixed `width` and `height` so the layout does not jump.
- The lightbox loads the larger version only when opened.

## 12. Styling architecture

- Design tokens (colours, fonts, spacing, radius, motion) are defined once in the Tailwind theme inside `globals.css`.
- Components use utility classes only. No hard-coded colours.
- Fonts load through `next/font/google` in `layout.js`.
- Mobile-first: base styles are for phones, larger screens are added with breakpoints.

## 13. Error handling and resilience

| Failure | Behaviour |
|---------|-----------|
| WebGL not available or 3D crash | Static bulb image shown. Rest of the site works |
| A Drive video does not load | Small fallback message and retry. Other videos unaffected |
| An image fails | Neutral placeholder box with correct size |
| JavaScript disabled | Hero text, services, about, and contact links still render (server-built) |
| Slow network | Text first, then images, then 3D, then videos on tap |

## 14. Build and deployment pipeline

```
Edit code locally
      │  npm run lint, npm run build, npm run validate
      ▼
git push (new branch)  ──►  Vercel preview link  ──►  test on phone
      │ merge to main
      ▼
Vercel production build  ──►  live site (global CDN)
```

- No environment secrets are required.
- A bad build never replaces the live site. Vercel keeps the previous working version.
- Roll back by redeploying an earlier version from the Vercel dashboard.

## 15. Security and privacy overview

Detailed rules are in `SECURITY.md`. Architecture-level points:

- No server code, no database, and no stored visitor data in Version 1.
- Only one embed source (Google Drive) is allowed in iframes.
- External links use `rel="noopener noreferrer"`.
- The only public contact details are the ones Sohom chose to show.

## 16. Performance architecture

| Technique | Where |
|-----------|-------|
| Static build and CDN | Whole site |
| Lazy-loaded 3D with `ssr: false` | `BulbScene` |
| Click-to-load video players | `VideoCard` |
| Lazy images with fixed sizes | Galleries, covers |
| Pixel ratio cap and loop pausing | 3D scene |
| `transform` and `opacity` only | Animations |
| Font optimisation | `next/font` |

## 17. Extensibility

| Future change | What to touch |
|---------------|---------------|
| Add or remove a video | `videos.js` only |
| New section | New data file or section entry, plus one component, plus one line in `page.js` |
| Switch video host | `drive.js`, `VideoPlayer`, and a `source` field |
| Contact form | New `app/api/contact/route.js` and a form component (see `BACKEND SCHEMA.md`) |
| Admin panel and database | Replace data files with database reads (see `BACKEND SCHEMA.md`) |
| Light theme | Add a second set of tokens in `globals.css` |
| Blog | New route under `src/app/blog/` |

## 18. Key decisions

| # | Decision | Reason | Trade-off |
|---|----------|--------|-----------|
| 1 | Static site, no database | Content changes rarely, simplest for a beginner | Edits need a code push |
| 2 | JavaScript, not TypeScript | Fewer build errors for a beginner | Less type safety |
| 3 | Code-made 3D bulb | Tiny download, easy to tweak | Less detailed than a sculpted model |
| 4 | Click-to-load videos | Fast page even with many videos | One extra tap to watch |
| 5 | Drive embeds first | Videos already there | Slower and limited; planned migration |
| 6 | Content in data files | One place to edit | No visual admin screen |
| 7 | No state library | State is small and local | Revisit if the app grows |
| 8 | Inline SVG icons | No extra package | A few icons must be drawn or copied |

## 19. Open items

- Whether tapping the bulb toggles it on and off
- Final section headings and short-form filter names
- Move videos off Drive, and when
- Domain name
