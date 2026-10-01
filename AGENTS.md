# AGENTS.md: Project Rules for AI Coding Agents

Works with Google Antigravity (reads `AGENTS.md` from the workspace root), and also Cursor, Claude Code, and Codex. If an Antigravity-only override is ever needed, put it in `GEMINI.md`, which takes priority over this file.

## 1. Project

**Clips Kinetics**: portfolio website of **Sohom Paul**, freelance video editor (Asansol, West Bengal). 3 years of experience, 80+ clients, open to work.

Goal: turn visitors into WhatsApp enquiries. Landing page has a big interactive 3D light bulb (with a play icon), a circular photo, and scroll animations. Work sections play videos inside the site.

Read these before large changes: `PRD.md`, `TRD.md`, `ARCHITECTURE.md`, `BACKEND SCHEMA.md`, `DESIGN SYSTEM.md`, `TESTING.md`, `SECURITY.md`, `CODE_STYLE.md`. If this file conflicts with them, ask the user.

## 2. The user

- Sohom is a **beginner in coding**. He copy-pastes code into an IDE, pushes to GitHub, and deploys on Vercel.
- Give **complete files** with the **exact path** (for example `src/components/Hero.jsx`). Never give partial snippets like "add this somewhere".
- Explain changes in plain, short English. Say how to run and check them.
- Prefer simple solutions over clever ones.
- Do one task at a time. Do not rewrite unrelated files.

## 3. Fixed stack (do not change without asking)

| Area | Choice |
|------|--------|
| Framework | Next.js, App Router, `src/` directory |
| Language | **JavaScript (JSX). No TypeScript** |
| UI | React |
| 3D | React Three Fiber, drei, Three.js |
| Animation | GSAP, ScrollTrigger, `@gsap/react` |
| Styling | Tailwind CSS |
| Content | Data files in `src/data/` (no database) |
| Hosting | GitHub plus Vercel |

- Do not add packages that are not needed. Ask before adding any new dependency.
- React, React Three Fiber, and drei versions must match. Check compatibility before changing versions.

## 4. Commands

```bash
npm install        # install packages
npm run dev        # run locally at http://localhost:3000
npm run lint       # code checks
npm run build      # production build (must pass)
npm run validate   # data file checks (when the script exists)
```

A task is **not done** until `npm run lint` and `npm run build` pass.

## 5. Folder map

```
src/app/            layout.js, page.js, globals.css
src/components/     Navbar, Hero, BulbScene, Stats, WorkSection, VideoCard,
                    ImageGallery, Services, About, Contact, Footer, WhatsAppButton
src/data/           site.js, videos.js, images.js, services.js
src/lib/            whatsapp.js, drive.js
public/images/      compressed images only
```

Keep this structure. Put new components in `src/components/` and new helpers in `src/lib/`.

## 5.1 Content rules (most important)

1. **Never show video names, file names, or client names on the website.** Only videos and section headings appear. There is no `title` field for videos. `internalNote` is private and must never be rendered.
2. Video accessibility labels use neutral text such as "Video 3 of 12".
3. All text, links, phone number, and stats come from `src/data/`. Never hard-code them in components.
4. Phone number is stored as digits only. WhatsApp link: `https://wa.me/<countryCode><number>?text=<encoded message>`, built in `src/lib/whatsapp.js`.
5. The About text and contact section must always mention **"Open to work"** and how to get in touch.
6. No pricing on the site. Service cards use "Contact for quote" (opens WhatsApp).
7. Use the spelling "Restaurant" (not "Resturant").

## 6. Video rules

- Videos are Google Drive embeds: `https://drive.google.com/file/d/<FILE_ID>/preview` in an `iframe`, built only in `src/lib/drive.js`.
- Store the Drive **file ID** only, never the full link.
- Show a lightweight placeholder first. Create the iframe only when the visitor taps the card (click-to-load). Keep one iframe mounted at a time, and use Intersection Observer for lazy cover images and to unmount an iframe that scrolls far away.
- Only one video plays at a time. No autoplay with sound.
- Vertical videos use 9:16, horizontal use 16:9.
- If a video fails, show a small fallback message, not an empty box.
- Keep the code easy to switch to YouTube, Vimeo, or Cloudinary later by changing `drive.js` only.

## 7. 3D rules

- `BulbScene` is a client component loaded with `next/dynamic` and `ssr: false`.
- Build the bulb from **code-made shapes** (sphere, cylinder, play icon). No large model files and no network environment maps.
- Cap pixel ratio (for example, `dpr={[1, 2]}`).
- Wrap the scene in `Suspense`. Show a static fallback if WebGL fails.
- Pause rendering when the hero is off screen.
- The bulb reacts to the mouse (desktop) and touch (phone).
- The canvas is decorative: no keyboard focus trap, `aria-hidden` where suitable.
- Hero text must appear before the 3D scene loads.

## 8. Animation rules

- Register ScrollTrigger once, in a client component.
- Use `useGSAP` (or a GSAP context) and **clean up** on unmount.
- Animate only `transform` and `opacity`.
- Respect `prefers-reduced-motion`: skip or shorten animations.
- Keep mobile animations subtle.

## 9. Design rules

- Dark theme, warm amber accent (bulb glow), green WhatsApp button. Use tokens from `DESIGN SYSTEM.md`. Do not invent random colours or fonts.
- Mobile first. It must work from 360 px wide with no horizontal scroll.
- Use Tailwind utility classes. Avoid custom CSS unless necessary.
- A floating WhatsApp button is visible in all sections.

## 10. Images

- Use `next/image` with `width`, `height`, and `sizes`.
- Use compressed WebP or optimised JPG. Landing page images should be about 300 KB or less.
- Every image needs meaningful `alt` text (neutral, no client names) or empty `alt` if decorative.
- File names: lowercase with hyphens, no spaces.

## 11. Code style (short version; full rules in `CODE_STYLE.md`)

- Functional components with hooks. One component per file, named in PascalCase.
- Mark client components with `"use client"` only when needed.
- Small, readable functions. Short comments that explain **why**, written for a beginner.
- No unused code, no `console.log` left behind, no commented-out blocks.
- Import with relative paths unless an alias is already configured.

## 12. Security (full rules in `SECURITY.md`)

- Never put secrets, tokens, keys, or passwords in code or in this repo.
- `.env*` files stay in `.gitignore`. Anything starting with `NEXT_PUBLIC_` is public.
- External links use `target="_blank"` and `rel="noopener noreferrer"`.
- Only allow trusted embed sources (Google Drive for now).
- Never use `dangerouslySetInnerHTML` with untrusted text.
- Do not collect visitors' personal data in Version 1.

## 13. Workflow for every task

1. Read the relevant docs and files first.
2. State a short plan (what files change and why).
3. Make the smallest change that works.
4. Run `npm run lint` and `npm run build`. Fix errors.
5. Check mobile layout and the checklist in `TESTING.md` for the changed area.
6. Report in plain English: what changed, which files, how to see it, anything the user must do (for example, share a Drive file publicly).

## 14. Do not

- Do not switch to TypeScript or another framework.
- Do not add a database, login, or backend unless the user asks.
- Do not show video or client names on the page.
- Do not hard-code contact details or video IDs in components.
- Do not load heavy 3D models or large uncompressed images.
- Do not remove accessibility features or the reduced-motion handling.
- Do not rename or delete files the user did not mention.
- Do not claim success without running the checks.

## 15. When unsure

Ask one short, clear question. If a Drive file might not be public, a version of a video is unclear, or a design choice is not covered in the docs, ask the user instead of guessing.

## 16. Key facts

| Item | Value |
|------|-------|
| Brand | Clips Kinetics |
| Person | Sohom Paul |
| Tagline | Freelancer Video Editor |
| Location | Asansol, West Bengal |
| Stats | 3 years, 80+ clients |
| WhatsApp | +91 7047233423 |
| Socials | Instagram (work and personal), YouTube, LinkedIn, Facebook, Fiverr (handles are in `src/data/site.js`) |
| Services | YouTube editing, reels, colour grading, motion graphics, sound design, thumbnail and graphic design |
