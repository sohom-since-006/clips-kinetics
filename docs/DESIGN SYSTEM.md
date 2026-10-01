# Design System

**Project:** Clips Kinetics: Video Editing Portfolio Website
**Version:** 1.0 (draft)
**Related documents:** `PRD.md`, `TRD.md`, `ARCHITECTURE.md`, `AGENTS.md`

---

## 1. Design principles

1. **Cinematic and clean.** Dark background, one warm accent, lots of space. The work is the star.
2. **One idea of light.** The glowing bulb is the signature. Amber glow is used sparingly so it always means something.
3. **Mobile first.** Most visitors arrive from Instagram or WhatsApp on a phone.
4. **Contact is always one tap away.** The WhatsApp button stays visible.
5. **Fast and light.** Effects are simple (colour, transform, opacity) and never block loading.
6. **No video names.** Headings describe groups of work only. Videos speak for themselves.

## 2. Colour tokens

### 2.1 Core palette

| Token | Value | Use |
|-------|-------|-----|
| `bg-base` | `#0B0B10` | Page background |
| `bg-surface` | `#15151B` | Cards, nav, sections |
| `bg-elevated` | `#1E1E26` | Hover states, modals, filter chips |
| `border-subtle` | `#2C2C34` | Dividers, card borders |
| `text-primary` | `#FFFFFF` | Headings, key text |
| `text-secondary` | `#B4B2A9` | Body text |
| `text-muted` | `#888780` | Captions, small labels |
| `accent` | `#EF9F27` | Brand accent, highlights, rings |
| `accent-soft` | `#FAC775` | Bulb glass (lit), glow, hover accent |
| `accent-deep` | `#854F0B` | Play icon in bulb, text on amber |
| `whatsapp` | `#0F6E56` | WhatsApp button background |
| `whatsapp-hover` | `#0B5C48` | WhatsApp button hover |
| `whatsapp-light` | `#9FE1CB` | Text on dark green badge |
| `badge-bg` | `#085041` | "Open to work" badge background |
| `badge-dot` | `#5DCAA5` | Pulsing dot in the badge |
| `danger` | `#E24B4A` | Error text only |

### 2.2 Colour rules

- Amber is for the bulb, the brand, active states, and key highlights. Do not use it for body text.
- Green is **only** for WhatsApp and "Open to work".
- White text on the WhatsApp button uses the darker green above so it passes contrast rules (a brighter green fails for small text).
- Never place `text-muted` on top of images.
- Do not add new colours without updating this file.

### 2.3 Background glow

A soft radial amber glow sits behind the bulb: `accent` at about 15 to 25 percent opacity, fading to transparent. It is drawn with CSS, not an image, and gets stronger when the bulb is lit.

## 3. Typography

| Role | Font | Notes |
|------|------|-------|
| Headings | Space Grotesk | Modern, slightly technical, good for a creative brand |
| Body and UI | Inter | Very readable on phones |

Both are loaded with `next/font/google` (no external requests at runtime, no layout shift). Fallback: system sans-serif.

### 3.1 Type scale (mobile / desktop)

| Style | Mobile | Desktop | Weight | Line height |
|-------|--------|---------|--------|-------------|
| Display (name in hero) | 40 px | 72 px | 700 | 1.05 |
| H1 | 36 px | 56 px | 700 | 1.1 |
| H2 (section heading) | 28 px | 40 px | 600 | 1.2 |
| H3 (card title) | 20 px | 24 px | 600 | 1.3 |
| Tagline | 18 px | 24 px | 500 | 1.4 |
| Body | 16 px | 18 px | 400 | 1.6 |
| Small | 14 px | 14 px | 400 | 1.5 |
| Label / badge | 12 px | 12 px | 500 | 1.2 |

Rules: body text is never under 16 px on mobile (small captions at 14 px minimum). Keep line length around 60 to 75 characters. Use sentence case for headings and labels.

## 4. Spacing, layout, and shape

### 4.1 Spacing scale

Base unit 4 px: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

| Use | Value |
|-----|-------|
| Section vertical padding | 64 px mobile, 96 to 128 px desktop |
| Gap between cards | 16 px mobile, 24 px desktop |
| Page side padding | 20 px mobile, 40 px tablet, 64 px desktop |

### 4.2 Layout

- Maximum content width: **1200 px**, centred.
- 12-column grid on desktop, single column on mobile.

### 4.3 Breakpoints

| Name | Min width | Typical device |
|------|-----------|----------------|
| default | 0 | Phone (design from 360 px) |
| `sm` | 640 px | Large phone |
| `md` | 768 px | Tablet |
| `lg` | 1024 px | Laptop |
| `xl` | 1280 px | Desktop |

### 4.4 Radius

| Token | Value | Use |
|-------|-------|-----|
| `radius-sm` | 8 px | Chips, small inputs |
| `radius-md` | 16 px | Cards, video frames |
| `radius-lg` | 24 px | Large panels, lightbox |
| `radius-full` | 9999 px | Buttons, badges, photo, social icons |

### 4.5 Borders and shadows

- Cards: 1 px `border-subtle`, no heavy shadow.
- Glow (used only for accent elements): soft amber shadow, for example `0 0 40px` at 30 percent amber.
- Avoid stacked or harsh drop shadows.

## 5. Iconography

- Icons are small **inline SVG components** stored in `src/components/icons/`. This avoids adding an icon package.
- Style: simple outline, 1.5 to 2 px stroke, rounded ends, 20 or 24 px size.
- Needed icons: WhatsApp, Instagram, YouTube, LinkedIn, Facebook, Fiverr (letter mark), play, arrow-down, close, menu, plus one icon for each of the six services.
- Social icons sit in circular buttons (`bg-elevated`, 40 to 44 px) with an accessible label.
- The `icon` field in `services.js` must match an icon name in this folder.

## 6. Components

### 6.1 Navbar

- Fixed at the top, `bg-surface` at 80 percent with a subtle blur, 1 px bottom border.
- Left: "Clips Kinetics". Right (desktop): Work, Services, About, Contact, and a "Hire me" button.
- Mobile: brand plus a menu button that opens a full-width panel with large tap targets.
- The active section link is shown in `accent`.

### 6.2 Buttons

| Type | Look | Use |
|------|------|-----|
| Primary (WhatsApp) | `whatsapp` background, white text, full round, 48 px high | "Chat on WhatsApp", "Contact for quote" |
| Secondary | Transparent, 1 px `border-subtle`, `text-secondary` text, full round | "View my work" |
| Accent | `accent` background, `accent-deep` text | Occasional highlight, "Hire me" in nav |
| Ghost / icon | `bg-elevated`, circular | Social icons, close |

States: hover raises brightness slightly, focus shows a 2 px `accent` outline with 2 px offset, pressed scales to 0.98. Minimum tap target is 44 by 44 px.

### 6.3 "Open to work" badge

Pill, `badge-bg` background, `whatsapp-light` text, 12 px label, with a small `badge-dot` that pulses gently (disabled when reduced motion is on).

### 6.4 Section heading block

`H2` heading, optional one-line description in `text-secondary`, and a short `accent` underline bar (48 px wide, 3 px high) above or below. Headings describe groups only (for example "Short-form edits").

### 6.5 Video card

- Frame radius `radius-md`, 1 px `border-subtle`, `bg-surface` placeholder before loading.
- Aspect ratio **9:16** for reels and **16:9** for horizontal videos.
- Before playing: neutral placeholder or cover image with a centred round play button (`accent`, `accent-deep` icon).
- After tap: the embedded player replaces the placeholder.
- **No title, caption, or file name is shown.**
- Accessible label: "Video 3 of 12".
- Hover (desktop): slight lift (up to 4 px) and a faint amber border.

### 6.6 Filter chips (short-form section)

Pill buttons in a horizontally scrollable row on mobile. Inactive: `bg-elevated`, `text-secondary`. Active: `accent` background, `accent-deep` text. Includes an "All" chip.

### 6.7 Image gallery and lightbox

- Grid with equal gaps; images keep their ratio and use `radius-md`.
- Click opens a lightbox on a `#000000` overlay at 85 percent opacity, with a close button, Esc to close, and focus kept inside while open.

### 6.8 Service card

`bg-surface`, 1 px border, 24 px padding, icon in an `accent` circle, `H3` title, two-line description, and a small "Contact for quote" link that opens WhatsApp. Hover: border turns `accent` at low opacity.

### 6.9 Stats

Three items in a row (stacked on very small screens): large value (`H2` style, `accent` or white), small `text-muted` label. Items: 3 yrs, 80+, Asansol.

### 6.10 Floating WhatsApp button

Fixed, bottom-right, 56 px circle, `whatsapp` background, white WhatsApp icon, 16 px from edges (safe-area aware on phones). Subtle pulse every few seconds (disabled with reduced motion). It never covers important buttons or the lightbox.

### 6.11 Footer

`bg-surface`, brand name, social icon row (both Instagram accounts, YouTube, LinkedIn, Facebook, Fiverr), "Open to work" line, and copyright.

## 7. Landing page (hero) layout

| Screen | Layout |
|--------|--------|
| Desktop | Two columns. Left: badge, name, tagline, intro, buttons, stats. Right: large 3D bulb with the circular photo overlapping its lower corner. |
| Mobile | One column. Badge, name, tagline, intro, buttons first. Bulb below, then the photo, then stats. Text must be visible without waiting for 3D. |

Hero height is at least the viewport height on desktop. On mobile, content flows naturally and avoids tall empty space.

### 7.1 Profile photo

- Circular cutout (`radius-full`), 2 px `accent` ring, soft amber glow.
- Sizes: 200 px (mobile), 260 px (tablet), 320 px (desktop).
- Crop: face and shoulders, centred. Camera watermark removed.
- `alt`: "Sohom Paul, freelance video editor".

## 8. The 3D bulb

### 8.1 Visual spec

| Part | Spec |
|------|------|
| Glass | Sphere, warm amber (`accent-soft`) when lit, dark smoky grey when off |
| Play icon | Triangle in `accent-deep`, centred inside the glass |
| Base | Cylinder in dark metal grey with two thin ring lines |
| Cap | Small dark cylinder under the base |
| Glow | Emissive material plus a soft point light in `accent-soft` |
| Rays | Short amber lines appear around the bulb when lit (optional) |
| Halo | CSS radial glow behind the canvas |

### 8.2 Behaviour

| State | What happens |
|-------|--------------|
| Load | Bulb is dim, then lights up smoothly after the scene is ready |
| Mouse or touch move | The bulb tilts gently toward the pointer (about 15 degrees maximum) |
| Hover or tap | Glow intensity rises, then eases back |
| Click or tap | Toggles lit and off (optional, to be confirmed) |
| Scroll away | Rendering pauses |
| Reduced motion | No tilt or pulsing. Bulb stays lit and still |
| 3D unavailable | A static bulb image is shown in the same position |

Transition time for glow changes: about 300 to 500 ms with ease-out.

## 9. Motion

| Token | Value | Use |
|-------|-------|-----|
| `duration-fast` | 150 ms | Hover, focus |
| `duration-base` | 300 ms | Buttons, chips, cards |
| `duration-slow` | 600 to 800 ms | Section reveals |
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Toggles |

Scroll reveals: fade in with a 24 px upward slide, staggered by 60 to 100 ms for grids. Each reveal plays once. Animate only `transform` and `opacity`. Honour `prefers-reduced-motion` everywhere.

## 10. Accessibility rules

- Text contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text).
- Focus is always visible (`accent` outline).
- Tap targets are at least 44 by 44 px.
- Colour is never the only way to show state (active chips also change weight or show an underline).
- Decorative elements (halo, rays, 3D canvas) are hidden from screen readers.
- Video frames have neutral `title` text such as "Video 3 of 12".

## 11. Imagery guidelines

- Photo: warm, natural, smiling, face-forward, cut out cleanly.
- Thumbnails and restaurant images: show at original ratio, compressed, with neutral `alt` text.
- Do not place client or brand names in captions or `alt` text.

## 12. Voice and copy

- Friendly, confident, and short. Speak directly to the visitor.
- Always include a clear next step ("Chat on WhatsApp").
- Headings use sentence case: "Short-form edits", "Long-form edits", "Event coverage", "Festival and shoots", "Thumbnail designs", "Restaurant branding" (final names to be confirmed).
- Keep "Open to work" visible in the hero and in the contact section.

## 13. Implementation notes

- Tokens are defined once in the Tailwind theme (in `globals.css`) and used through utility classes. Avoid hard-coded colour values in components.
- Fonts load in `layout.js` through `next/font/google`.
- Icons live in `src/components/icons/`.
- Any new component must reuse these tokens. If a new token is needed, add it here first.

## 14. Notes on the preview mockup

The earlier layout sketch used a brighter green for the WhatsApp button for illustration. The final colour is the darker green listed above, chosen so white text stays readable.
