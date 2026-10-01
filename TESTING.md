# Testing

**Project:** Clips Kinetics: Video Editing Portfolio Website
**Version:** 1.0 (draft)
**Related documents:** `PRD.md`, `TRD.md`, `BACKEND SCHEMA.md`, `SECURITY.md`

---

## 1. Approach

This is a content-driven portfolio site with no login, payments, or database. Because of that, testing is mostly **checklists you run by hand**, plus a few **automatic checks** that catch common mistakes before deploying.

Testing has three levels:

| Level | What | When |
|-------|------|------|
| Automatic checks | Build, lint, data validation | Before every push |
| Manual checklists | Pages, links, videos, 3D, mobile | Before every deploy |
| Audits | Performance, accessibility, SEO | Before launch and after big changes |

## 2. Automatic checks (before every push)

Run these in the project folder:

| Command | What it proves |
|---------|----------------|
| `npm run lint` | No code-style or common error problems |
| `npm run build` | The site compiles exactly as Vercel will build it |
| `npm run validate` (planned script) | Data files follow the rules in `BACKEND SCHEMA.md` |

**Rule:** if `npm run build` fails on your computer, it will fail on Vercel too. Do not push until it passes.

### 2.1 Data validation checks (planned script)

The script checks that:

1. Every `id` is unique within its file.
2. Every `driveId` is non-empty with no `/` or spaces.
3. Every video `filter` exists in its section's `filters`.
4. Every image `src` points to a real file in `public/`.
5. Every image has `alt`, `width`, and `height`.
6. No video entry has a `title` field.
7. The phone number has digits only.
8. Every social `url` starts with `https://`.

## 3. Manual test checklists

Mark each item pass or fail. Fix every fail before deploying.

### 3.1 Landing page

- [ ] Brand name, "Sohom Paul", and "Freelancer Video Editor" are visible
- [ ] "Open to work" badge is visible
- [ ] Circular photo loads, is sharp, and is not stretched
- [ ] Text appears before the 3D bulb finishes loading
- [ ] No camera watermark is visible on the photo
- [ ] Stats show 3 years, 80+ clients, and Asansol

### 3.2 3D bulb

- [ ] Bulb appears and reacts to the mouse (desktop)
- [ ] Bulb reacts to touch or tap (phone)
- [ ] Glow turns on and off smoothly
- [ ] No lag or overheating after 1 minute on a phone
- [ ] Bulb animation pauses when scrolled out of view
- [ ] Static fallback appears if 3D is turned off or fails
- [ ] Resizing the window does not break the scene

### 3.3 Navigation and scrolling

- [ ] Every menu link scrolls to the correct section
- [ ] Menu works on phone (open, close, tap a link)
- [ ] Scroll animations run once and do not flicker
- [ ] No horizontal scrollbar on any screen size
- [ ] "Reduce motion" setting turns off or shortens animations

### 3.4 Videos

- [ ] Each section shows the correct heading
- [ ] **No video names or file names appear anywhere**
- [ ] Each video shows a placeholder first, and the player loads only after a tap
- [ ] A video plays when tapped and does not autoplay with sound
- [ ] Starting a second video stops the first
- [ ] Vertical videos show 9:16 and horizontal videos show 16:9
- [ ] Filter buttons (short-form section) show the right videos
- [ ] A broken video shows the fallback message, not a blank box
- [ ] Videos play in an incognito window (proves public sharing works)

### 3.5 Image galleries

- [ ] Thumbnail and restaurant images load quickly
- [ ] Clicking an image opens a larger view
- [ ] Esc key and close button close the larger view
- [ ] Arrow keys or swipe move between images (if included)

### 3.6 Contact and social links

- [ ] WhatsApp button opens a chat with +91 7047233423
- [ ] Pre-filled WhatsApp message appears correctly
- [ ] Floating WhatsApp button is visible on every section
- [ ] Instagram (work), Instagram (personal), YouTube, LinkedIn, Facebook, and Fiverr links open the right pages
- [ ] External links open in a new tab
- [ ] "Contact for quote" buttons on service cards open WhatsApp

### 3.7 Content

- [ ] No spelling mistakes (especially "Restaurant")
- [ ] About text mentions "Open to work" and contact details
- [ ] Services list is complete (six services)
- [ ] No placeholder text such as `DRIVE_FILE_ID_HERE` remains

## 4. Device and browser matrix

Test at least these combinations before launch:

| Device | Browser |
|--------|---------|
| Android phone (real device) | Chrome |
| iPhone (real device, if available) | Safari |
| Windows or Mac laptop | Chrome |
| Windows or Mac laptop | Edge or Firefox |
| Tablet (or browser device mode) | Chrome or Safari |

Also test these screen widths using browser developer tools: 360, 390, 768, 1024, and 1440 pixels.

Test on a **slow connection** (Chrome DevTools, "Slow 4G") and on a **low-end phone** if you can.

## 5. Performance audit

Use **Lighthouse** (built into Chrome DevTools) or **PageSpeed Insights** on the deployed Vercel link.

| Metric | Target |
|--------|--------|
| Performance score (mobile) | 80 or higher |
| Largest Contentful Paint | Under 2.5 s |
| Cumulative Layout Shift | Under 0.1 |
| Accessibility score | 90 or higher |
| SEO score | 90 or higher |
| Best Practices score | 90 or higher |

If performance is low, check these first: image sizes, 3D loading, and number of embedded videos loading at once.

## 6. Accessibility audit

- [ ] Whole site can be used with the keyboard only (Tab, Enter, Esc)
- [ ] Focus outline is always visible
- [ ] Text has enough contrast against the dark background
- [ ] Every image has meaningful `alt` text
- [ ] Video frames have neutral titles (for example "Video 3 of 12")
- [ ] Headings follow a logical order (one `h1`, then `h2` sections)
- [ ] The 3D canvas does not trap keyboard focus

Tools: Lighthouse accessibility audit, and the free axe DevTools or WAVE browser extensions.

## 7. SEO and sharing checks

- [ ] Page title and description are set
- [ ] Sharing the link on WhatsApp or Instagram shows a preview image and title
- [ ] Favicon appears in the browser tab
- [ ] Page works when opened directly on its link
- [ ] `robots` and `sitemap` work once a domain is added

## 8. Security checks

Detailed rules are in `SECURITY.md`. Before launch:

- [ ] No secrets, keys, or passwords are in the code or GitHub repository
- [ ] `.env` files are excluded by `.gitignore`
- [ ] External links use `rel="noopener noreferrer"`
- [ ] Only Google Drive embeds are allowed for video frames

## 9. Test on Vercel preview first

1. Push your changes to a new branch on GitHub.
2. Vercel creates a **preview link** automatically.
3. Run the checklists on the preview link.
4. Merge to the main branch only when everything passes.

This keeps the live site safe from mistakes.

## 10. Pre-deploy release checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] `npm run validate` passes
- [ ] Sections 3.1 to 3.7 checked on a real phone
- [ ] Lighthouse mobile score meets targets
- [ ] Preview link tested
- [ ] README instructions still accurate

## 11. Regression checks after changes

After any change, re-test only what could be affected:

| Change made | Re-test |
|-------------|---------|
| Added or replaced a video | Section 3.4 and data validation |
| Added images | Section 3.5 and performance audit |
| Changed the bulb or animations | Sections 3.2 and 3.3 and performance audit |
| Changed contact details | Section 3.6 |
| Updated packages | Everything, plus build |

## 12. Optional automated tests (later)

When the site grows, these can be added:

| Tool | Purpose |
|------|---------|
| Playwright | Opens the real site, clicks buttons, and checks the main flow on desktop and mobile sizes |
| Vitest | Unit tests for helper functions (WhatsApp link builder, Drive link builder) |
| Lighthouse CI | Fails a deploy if performance drops below the targets |

Suggested first automated tests:

1. Home page loads without errors.
2. WhatsApp link is built correctly from the phone number.
3. Drive embed link is built correctly from a file ID.
4. No page text contains a video file name.

## 13. Bug report template

When something fails, write it down like this:

```
Title:
Where (section / page):
Device and browser:
Steps to reproduce:
1.
2.
What happened:
What should happen:
Screenshot or screen recording:
Priority: High / Medium / Low
```

## 14. Priority guide

| Priority | Examples | Action |
|----------|----------|--------|
| High | Site does not load, WhatsApp button broken, videos blocked | Fix before deploying |
| Medium | Animation glitch, slow image, small layout issue | Fix soon |
| Low | Minor spacing or wording | Fix when convenient |
