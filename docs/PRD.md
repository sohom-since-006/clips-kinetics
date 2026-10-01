# Product Requirements Document (PRD)

**Project:** Clips Kinetics: Video Editing Portfolio Website
**Owner:** Sohom Paul
**Version:** 1.0 (draft)
**Status:** Planning

---

## 1. Overview

Clips Kinetics is the personal brand of Sohom Paul, a freelance video editor based in Asansol, West Bengal. This project is a full-fledged portfolio website that presents his work, builds trust with potential clients, and makes it very easy to contact him, mainly through WhatsApp.

The site stands out through an interactive 3D light bulb on the landing page and smooth scroll-based sections that reveal his videos and designs.

## 2. Goals

| # | Goal | How we measure it |
|---|------|-------------------|
| G1 | Turn visitors into enquiries | WhatsApp and contact button clicks |
| G2 | Show the quality and range of work quickly | Visitors reach the work section and play videos |
| G3 | Look memorable and professional | Positive feedback from clients and peers |
| G4 | Be easy to update without deep coding knowledge | New video added by editing one data file |
| G5 | Load fast on phones | Landing page usable in under 3 seconds on 4G |

## 3. Target audience

- **Primary:** Small businesses, restaurants, coaches, and creators in India looking for a video editor (reels, YouTube, ads).
- **Secondary:** YouTubers and agencies looking for a freelance editor, and recruiters or collaborators.
- **Device split (assumed):** Most visitors arrive from Instagram or WhatsApp on a phone, so mobile comes first.

## 4. Brand and identity

- **Brand name:** Clips Kinetics
- **Personal name:** Sohom Paul
- **Tagline:** Freelancer Video Editor
- **Status message:** "Open to work", visible on the landing page and in the contact section.
- **Location:** Asansol, West Bengal, India
- **Highlights:** 3 years of experience, 80+ clients

## 5. Scope

### 5.1 In scope (Version 1)

- Landing page with the hero, a circular cropped photo, and an interactive 3D bulb
- Work section with headings and embedded videos
- Thumbnail design gallery and restaurant branding gallery
- Services section
- About section
- Stats (experience, clients, location)
- Contact section with social links and WhatsApp
- Floating WhatsApp button
- Responsive layout (phone, tablet, desktop)
- Basic SEO and social sharing preview
- Deployment on Vercel through GitHub

### 5.2 Out of scope (Version 1)

- User accounts or login
- Online payments or booking
- Blog
- Admin dashboard
- Multi-language support

### 5.3 Possible later versions

- Contact form with email delivery
- Client testimonials
- Showreel at the top
- Light theme
- Blog or behind-the-scenes section
- Move videos from Google Drive to YouTube or Cloudinary

## 6. Site structure

| Section | Purpose |
|---------|---------|
| Navigation bar | Brand name, links (Work, Services, About, Contact), "Hire me" button |
| Hero | Name, tagline, "Open to work" badge, short intro, WhatsApp button, photo, 3D bulb |
| Stats | 3 years, 80+ clients, Asansol |
| Work | Video and design sections (see 7.3) |
| Services | What Sohom offers, each with a "Contact for quote" button |
| About | Short story and working style |
| Contact | WhatsApp, social links, email (optional) |
| Footer | Brand, social icons, copyright |

## 7. Functional requirements

### 7.1 Hero and 3D bulb

- **FR-1:** The hero shows "Sohom Paul", "Freelancer Video Editor", the "Open to work" badge, and a short intro.
- **FR-2:** A large 3D light bulb is shown. It lights up and glows in response to mouse movement on desktop and touch or tap on mobile.
- **FR-3:** The bulb contains a play-icon design that links the idea to video editing.
- **FR-4:** The 3D scene loads lazily so the text appears first.
- **FR-5:** On very low-end devices or if 3D fails, a simple static bulb image is shown instead.
- **FR-6:** The photo appears as a circular cutout beside or below the bulb.

### 7.2 Contact and social links

- **FR-7:** A WhatsApp button opens a chat with +91 7047233423 and a pre-filled message.
- **FR-8:** A floating WhatsApp button stays visible on every section.
- **FR-9:** Social buttons open in a new tab:
  - Instagram (work): `clipskinetics`
  - Instagram (personal): `sohom_since_006`
  - YouTube: `@clipskinetics`
  - LinkedIn: `sohompaul06`
  - Facebook: `sohom.paul.731`
  - Fiverr: `sohom_since_006`
- **FR-10:** Contact details and "Open to work" appear in both the hero and the contact section.

### 7.3 Work section

- **FR-11:** Work is grouped under headings (proposed, final names to be confirmed):
  1. Short-form edits (reels and shorts), with optional filter buttons by topic
  2. Long-form edits (YouTube)
  3. Event coverage
  4. Festival and shoots
  5. Thumbnail designs
  6. Restaurant branding
- **FR-12:** **No video names or file names are shown anywhere on the website.** Only the videos themselves appear, under the section headings.
- **FR-13:** Videos play inside the website using embedded players. Only one video plays at a time.
- **FR-14:** A placeholder is shown for each video, and the player loads only when the visitor taps it. Videos never autoplay with sound.
- **FR-15:** Image galleries open a larger view when clicked.
- **FR-16:** Videos use cover images where available and a neutral placeholder otherwise.
- **FR-17:** Every video source is defined in one data file, so adding or removing a video needs no layout changes.

### 7.4 Services

- **FR-18:** Services shown as cards: YouTube editing, reels, colour grading, motion graphics, sound design, thumbnail and graphic design.
- **FR-19:** Pricing is not shown. Each card has a "Contact for quote" button that opens WhatsApp.

### 7.5 About

- **FR-20:** A short about text, written in a friendly and professional tone, that always mentions "Open to work" and how to get in touch.

### 7.6 Animation

- **FR-21:** Sections animate in on scroll (fade, slide, or reveal) using GSAP ScrollTrigger.
- **FR-22:** Animations respect the visitor's "reduce motion" setting.

## 8. Non-functional requirements

| Area | Requirement |
|------|-------------|
| Performance | Fast first load, lazy-loaded 3D and videos, compressed images |
| Responsive | Works from 360 px phones to large desktops |
| Accessibility | Keyboard navigation, alt text, readable contrast, reduced motion support |
| SEO | Page title, description, social preview image, semantic headings |
| Browser support | Latest Chrome, Edge, Safari, Firefox; Android and iOS browsers |
| Reliability | Site still works if 3D or a video fails to load |
| Privacy | No personal data collected in Version 1 |
| Maintainability | Content lives in data files; code is simple and commented for a beginner |

## 9. Content requirements

- **Photo:** cropped to a circle around the face and shoulders, with the camera watermark removed.
- **Videos:** hosted in Google Drive for Version 1 (folders and files shared as "Anyone with the link can view").
- **Video size:** many source files are 100 MB or larger. Compressed versions (around 50 MB or less) are recommended for smooth playback.
- **Images:** large restaurant and event images must be compressed before use.
- **Text:** all headings, services, and about text written in clear English.

## 10. Design direction

- Dark theme with a warm amber accent (the bulb glow) and a green WhatsApp call to action.
- Clean, modern, and cinematic. Details are defined in `DESIGN SYSTEM.md`.

## 11. Technology (decided)

- Next.js, React Three Fiber, drei, GSAP ScrollTrigger, Tailwind CSS
- Code hosted on GitHub, deployed on Vercel
- Details are defined in `TRD.md` and `ARCHITECTURE.md`

## 12. Assumptions and dependencies

- All Drive folders and files stay publicly viewable.
- Sohom provides the final video versions and confirms section headings.
- Sohom is comfortable showing client or brand content publicly.
- Sohom will copy the provided code into an editor, push to GitHub, and deploy on Vercel.

## 13. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Large Drive videos load slowly or hit viewing limits | Videos fail or lag | Compress files; move to YouTube or Cloudinary later |
| 3D is heavy on low-end phones | Slow landing page | Lazy loading, a simple model, and a static fallback |
| Beginner setup errors | Delays | Step-by-step README, copy-paste ready code |
| Drive link sharing changed by accident | Videos stop playing | Keep all folders shared as "Anyone with the link" |

## 14. Milestones

1. Documents approved (PRD, TRD, and the rest)
2. Basic version: landing page, bulb, contact links, WhatsApp
3. Work section with video embeds and galleries
4. Polish: animations, mobile tuning, SEO
5. Deploy on Vercel and test on real phones

## 15. Open questions

- Final section headings and the short-form topic filters
- Which version is final for videos that have more than one
- Whether to show an email address
- Final brand colours and logo, if any
- Domain name, or a free Vercel link for now
