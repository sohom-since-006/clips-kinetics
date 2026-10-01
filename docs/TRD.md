# Technical Requirements Document (TRD)

**Project:** Clips Kinetics: Video Editing Portfolio Website
**Owner:** Sohom Paul
**Version:** 1.0 (draft)
**Related documents:** `PRD.md`, `ARCHITECTURE.md`, `BACKEND SCHEMA.md`, `DESIGN SYSTEM.md`, `TESTING.md`, `SECURITY.md`, `CODE_STYLE.md`

---

## 1. Purpose

This document explains **how** the website defined in `PRD.md` will be built: the tools, structure, rules, and limits. It is written so a beginner can follow it and copy the code step by step.

## 2. Technical decisions at a glance

| Area | Decision | Reason |
|------|----------|--------|
| Framework | Next.js (App Router) | Easy routing, fast, SEO-friendly, deploys to Vercel with no setup |
| UI library | React | Required by Next.js and React Three Fiber |
| 3D | React Three Fiber (R3F) + drei | React-style 3D on top of Three.js |
| Scroll animation | GSAP + ScrollTrigger | Smooth, reliable scroll effects |
| Styling | Tailwind CSS | Fast styling with no separate CSS files to manage |
| Language | JavaScript (JSX) | Simpler for a beginner. Can be moved to TypeScript later |
| Content storage | Local data files (JS or JSON) | No database needed for Version 1 |
| Video hosting | Google Drive embeds (Version 1) | Videos already exist there. Replaceable later |
| Hosting | Vercel, with code on GitHub | Free tier, automatic deploys on every push |
| Package manager | npm | Comes with Node.js |

## 3. Dependency version rules

- Use the **current stable** versions of Next.js, React, Tailwind, GSAP, Three.js, R3F, and drei.
- **Important:** R3F, drei, and React versions must match each other. R3F version 9 pairs with React 19, and R3F version 8 pairs with React 18. Check the R3F installation guide when installing. Mismatches are the most common cause of build errors.
- Use the Node.js version recommended by the Next.js documentation (current LTS).
- Do not install packages that are not listed in this document unless a task needs them.

## 4. Project structure

```
clips-kinetics/
├── public/
│   ├── images/            # compressed photo, gallery images, social preview
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.js      # page shell, fonts, metadata
│   │   ├── page.js        # home page (assembles all sections)
│   │   └── globals.css    # Tailwind and global styles
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── BulbScene.jsx      # 3D bulb (client only)
│   │   ├── Stats.jsx
│   │   ├── WorkSection.jsx
│   │   ├── VideoCard.jsx
│   │   ├── ImageGallery.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── WhatsAppButton.jsx
│   ├── data/
│   │   ├── site.js        # name, tagline, stats, links, phone
│   │   ├── videos.js      # video sections and sources
│   │   ├── images.js      # thumbnail and branding galleries
│   │   └── services.js
│   └── lib/
│       ├── whatsapp.js    # builds the WhatsApp link
│       └── drive.js       # builds Drive embed links
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
```

## 5. Rendering strategy

- The page is built with Next.js **Server Components** by default.
- Components that use browser features (3D, GSAP, video loading, click handlers) are marked `"use client"`.
- The 3D bulb (`BulbScene`) is loaded with `next/dynamic` and **`ssr: false`**, because WebGL only exists in the browser.
- The hero text and buttons render first. The 3D scene appears when it is ready.

## 6. 3D bulb requirements

| ID | Requirement |
|----|-------------|
| T3D-1 | The bulb is built from **code-made shapes** (sphere glass, cylinder base, play-icon shape), not an external model file. This keeps the landing page light. |
| T3D-2 | The glow is made with emissive material and lights, not heavy image files. |
| T3D-3 | The bulb reacts to the pointer: it tilts toward the cursor and glows brighter on hover or tap. |
| T3D-4 | Pixel ratio is capped (for example, 2) to protect performance on high-density phones. |
| T3D-5 | Scene is wrapped in `Suspense` with a simple placeholder. |
| T3D-6 | If WebGL is unavailable or fails, a static bulb image is shown. |
| T3D-7 | The animation loop pauses when the hero is off screen. |
| T3D-8 | Do not load external environment maps over the network. Use simple lights so the scene works offline and loads fast. |

## 7. Scroll animation requirements

- Register ScrollTrigger once, in a client component.
- Create animations inside a GSAP context and **clean them up** when the component unmounts.
- Animations only change `transform` and `opacity` for smoothness.
- If the visitor has "reduce motion" turned on, skip or shorten animations.
- Keep animations subtle on mobile.

## 8. Video embedding requirements

| ID | Requirement |
|----|-------------|
| TV-1 | Each video is stored in `videos.js` by its Drive **file ID** only. |
| TV-2 | The embed link is built as `https://drive.google.com/file/d/<FILE_ID>/preview` inside an `iframe`. |
| TV-3 | An iframe is created only when the visitor taps a card (click-to-load). Intersection Observer is used to lazy-load cover images and to unmount an iframe that scrolls far out of view. |
| TV-4 | Until tapped, a lightweight placeholder or cover image is shown. |
| TV-5 | Only one video should play at a time. Others unload when a new one starts. |
| TV-6 | Videos never autoplay with sound. |
| TV-7 | **No video title or file name is rendered anywhere on the page.** Accessibility labels use neutral text such as "Video 3 of 12". |
| TV-8 | Drive-specific behaviour is isolated in `lib/drive.js`, so switching to YouTube, Vimeo, Cloudinary, or direct files later means changing one file. |
| TV-9 | Vertical (reel) and horizontal (YouTube) videos use different frame shapes (9:16 and 16:9). |
| TV-10 | If a video fails to load, a small fallback with a "Watch on Drive" style link or a retry message is shown. |

**Known limits of Drive embeds**

- Large files may load slowly or show "processing".
- Drive can temporarily block a file if too many people open it.
- Drive shows its own player controls and branding.
- Recommended improvement: compress videos (around 50 MB or less for reels) or use YouTube unlisted for long videos.

## 9. Image requirements

- Use `next/image` for local images.
- Source images must be compressed before use. The original restaurant and event images in Drive are too large (up to about 30 MB each).
- Preferred formats: WebP or optimised JPG. Convert files that are PNG files with a .jpg extension.
- Set width, height, and `sizes` to avoid layout shift.
- Gallery images open in a simple lightbox with keyboard close (Esc).
- The profile photo is a circular cutout, stored in at least two sizes.

## 10. Content and data requirements

- All content is stored in `src/data/*.js`. Components read from these files.
- Adding a new video means adding one entry to `videos.js`.
- The data format is defined in `BACKEND SCHEMA.md`.
- There is **no database and no custom backend** in Version 1.

## 11. Contact link requirements

- WhatsApp link format: `https://wa.me/917047233423?text=<URL-encoded message>`
- The pre-filled message is a short greeting asking about a video editing project.
- All external links use `target="_blank"` and `rel="noopener noreferrer"`.
- Phone number and social URLs live in `site.js` only, never repeated in components.

## 12. Performance budget

| Metric | Target |
|--------|--------|
| First load JavaScript | As small as possible: lazy-load 3D and GSAP-heavy parts |
| Largest Contentful Paint | Under 2.5 s on a typical 4G phone |
| Layout shift | Under 0.1 |
| Landing page images | Each under about 300 KB after compression |
| Total initial page weight | Under about 2 MB, excluding videos |

Videos and the 3D scene must never block the first paint.

## 13. Accessibility requirements

- Semantic headings (one `h1`, then `h2` for each section).
- Every image has useful `alt` text, or empty alt if decorative.
- Buttons and links are reachable by keyboard and have visible focus.
- Text contrast meets WCAG AA.
- The 3D canvas is marked decorative and does not trap focus.
- Iframes have a `title` that does not reveal the video name.

## 14. SEO and sharing

- Set page title and description with the Next.js metadata feature.
- Add Open Graph and Twitter preview images.
- Add `sitemap` and `robots` once a domain is set.
- Use clear section headings so search engines understand the page.
- Add structured data (Person or ProfessionalService) as a later improvement.

## 15. Browser and device support

- Latest two versions of Chrome, Edge, Safari, and Firefox
- Android Chrome and iOS Safari
- Minimum screen width: 360 px

## 16. Environment and configuration

- Version 1 needs **no secret keys**.
- Optional public settings may use environment variables starting with `NEXT_PUBLIC_`. These are visible to everyone and must never hold secrets.
- `.env*` files are listed in `.gitignore`.

## 17. Build, deploy, and hosting

1. Code lives in a GitHub repository.
2. Vercel is connected to the repository.
3. Every push to the main branch deploys automatically.
4. Build command: `npm run build`. Output is handled by Vercel's Next.js support.
5. Local development: `npm run dev`.
6. A custom domain can be added in Vercel later.

## 18. Tooling

- ESLint (included with Next.js) for code checks
- Prettier for formatting (see `CODE_STYLE.md`)
- Git for version control

## 19. Quality and testing

Testing rules are in `TESTING.md`. At minimum, before each deploy: the build passes, the site is checked on a real phone, and all links and videos are tested.

## 20. Security

Security rules are in `SECURITY.md`. Key points: no secrets in the code, safe external links, and only trusted embed sources.

## 21. Technical risks

| Risk | Mitigation |
|------|------------|
| R3F, drei, and React version mismatch | Install matching versions and follow the R3F guide |
| 3D hurts performance on weak phones | Simple geometry, capped pixel ratio, pause off screen, static fallback |
| Drive embeds are slow or blocked | Compress videos; plan migration to YouTube or Cloudinary |
| GSAP animations stack or leak | Use contexts and clean up on unmount |
| Large images slow the site | Compress and use `next/image` |
| Beginner copy-paste mistakes | Clear file paths in the README and one file at a time |

## 22. Future technical improvements

- Contact form with email delivery
- Move videos to YouTube unlisted or Cloudinary
- Move to TypeScript
- Add analytics
- Add a simple content management tool for non-coders
- Replace the code-made bulb with a custom 3D model file if desired
