# Security

**Project:** Clips Kinetics: Video Editing Portfolio Website
**Version:** 1.0 (draft)
**Related documents:** `TRD.md`, `ARCHITECTURE.md`, `BACKEND SCHEMA.md`, `TESTING.md`, `AGENTS.md`

---

## 1. Summary

Version 1 is a **static website with no login, no database, no payments, and no server code**. That removes most risks. The remaining risks are mainly:

1. Leaking secrets or accounts (GitHub, Vercel, Google)
2. Unsafe packages or outdated dependencies
3. Exposure of videos and personal contact details
4. Embeds and links that could be abused
5. Mistakes when adding new features later (for example, a contact form)

This document lists simple rules to keep the site and its owner safe.

## 2. What we protect

| Asset | Why it matters |
|-------|----------------|
| GitHub, Vercel, and Google accounts | Whoever controls them can change or take down the site |
| Source code and data files | Mistakes or leaks here affect the live site |
| Client videos and work in Google Drive | Client trust and copyright |
| Phone number and social links | Visible by design, but can attract spam |
| Brand name and reputation | The site is Sohom's professional face |

## 3. Risk summary

| Risk | Likelihood | Impact | Main defence |
|------|-----------|--------|--------------|
| Account takeover (GitHub, Vercel, Google) | Medium | High | Two-factor login, strong unique passwords |
| Secret committed to GitHub | Medium | High | `.gitignore`, no secrets in Version 1, secret scanning |
| Vulnerable or malicious package | Low to medium | High | Few packages, audits, lock file |
| Videos copied or downloaded from Drive | High | Medium | Accept the risk, watermark, share only finished work |
| Phone number spam | Medium | Low | WhatsApp link, optional WhatsApp Business filters |
| Drive video blocked (too many views) | Medium | Medium | Compress, move to YouTube later |
| Malicious link or embed added by mistake | Low | Medium | Allow-list of embed sources |
| Defacement through a bad deploy | Low | Medium | Preview deploys, one-click rollback |

## 4. Account security

### 4.1 Rules for every account

- Turn on **two-factor authentication** for GitHub, Vercel, and the Google account that owns the Drive.
- Use a **unique, long password** for each, kept in a password manager.
- Do not log in to these accounts on shared or public computers.
- Do not share passwords or login codes with anyone, including freelancers or "helpers".
- Use a recovery email and phone number that only you control.

### 4.2 GitHub

- Choose **private** or **public** deliberately. Public means anyone can read the code and data files (which already contain only public information).
- Never commit passwords, tokens, API keys, or personal documents.
- Enable GitHub's secret scanning and Dependabot alerts (free for most repositories).
- Optional: protect the `main` branch so changes go through a branch and preview first.
- Review any "authorize this app" requests carefully before accepting.

### 4.3 Vercel

- Sign in with GitHub that has two-factor enabled.
- Only connect this one repository.
- Keep **preview deployments** for testing. Treat preview links as semi-private and do not share unfinished work widely.
- Know how to roll back: Vercel dashboard, Deployments, choose an earlier version, Promote.

## 5. Secrets and configuration

- **Version 1 needs no secrets at all.**
- `.env*` files must be listed in `.gitignore` before the first commit.
- Any variable starting with `NEXT_PUBLIC_` is visible to every visitor. Never put a secret in one.
- If a future feature needs a secret (for example, an email service key), store it only in Vercel's Environment Variables, use it only in server code, and never write it in source files or chat messages.
- If a secret is ever pushed to GitHub by accident: **treat it as stolen**. Rotate it (create a new one and delete the old), then remove it from the code. Deleting the file alone is not enough because history keeps it.

## 6. Dependencies and supply chain

- Keep packages to the minimum in `TRD.md`. Ask before adding any new one.
- Install only well-known packages with many users and recent updates. Check the exact package name for typos before installing.
- Commit `package-lock.json` so everyone installs the same versions.
- Run `npm audit` before each deploy and fix high or critical issues when a safe fix exists.
- Update packages on a schedule (for example monthly), then run `npm run lint`, `npm run build`, and the checklists in `TESTING.md`.
- Never run commands or paste code from unknown sources without understanding what they do.

## 7. Safe coding rules

| Rule | Reason |
|------|--------|
| Do not use `dangerouslySetInnerHTML` with any text that is not fully under your control | Prevents script injection (XSS) |
| Build links only from the data files and helper functions | Prevents wrong or malicious URLs |
| Allow only `https://` URLs in data files | Prevents unsafe link types |
| External links use `target="_blank"` and `rel="noopener noreferrer"` | Stops the opened page from controlling your tab |
| Never use `eval` or load scripts from unknown sites | Prevents code injection |
| Do not log or store personal data in Version 1 | Nothing to leak |
| Keep helper functions (`whatsapp.js`, `drive.js`) as the only places that build special URLs | Easy to review |

## 8. Embeds and iframes

- The **only allowed embed source** is Google Drive (`drive.google.com`).
- Build the iframe address only in `src/lib/drive.js`, from a file ID that contains letters, numbers, hyphens, and underscores only. Reject anything else.
- Each iframe has a neutral `title`, `loading="lazy"`, and a minimal `allow` list (fullscreen only). No autoplay permission.
- If another host is added later (YouTube, Vimeo, Cloudinary), add it to the allow-list in this file and in the security headers first.

## 9. Security headers

Add headers in `next.config.mjs`. Start with the simple, safe ones:

| Header | Suggested value | Purpose |
|--------|-----------------|---------|
| `X-Content-Type-Options` | `nosniff` | Stops file type guessing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits what other sites learn |
| `X-Frame-Options` | `SAMEORIGIN` | Stops other sites from embedding this site |
| `Permissions-Policy` | Camera, microphone, and geolocation turned off | The site never needs them |
| `Strict-Transport-Security` | Provided by Vercel on HTTPS | Forces secure connections |

**Content Security Policy (CSP)** is the strongest protection but needs care with Next.js, three.js, and the Drive embed. Add it in stages:

1. Start in **report-only** mode and test the full site.
2. Allow `frame-src https://drive.google.com` (and other Google domains the embed needs, found by testing).
3. Fonts load through `next/font`, so no external font source is needed.
4. Tighten step by step. Switch from report-only to enforced only after the full checklist in `TESTING.md` passes.

## 10. Privacy

### 10.1 What the site collects

Version 1 collects **no personal data**: no forms, no cookies set by the site, no analytics.

### 10.2 What the site publishes

Only what Sohom chose: brand and personal name, location (Asansol, West Bengal), WhatsApp number, social links, and his photo. Do not add a home address, date of birth, ID numbers, or family details.

### 10.3 Phone number and spam

- The number is public by design, so expect some unwanted messages.
- Use the `wa.me` link instead of printing the number in plain text where possible.
- Consider a **WhatsApp Business** account for quick replies, labels, and easier blocking.
- Report and block spam numbers.

### 10.4 If analytics are added later

Choose a privacy-friendly option, update this file, and add a short privacy notice to the footer.

## 11. Google Drive and content safety

- Drive links are public: **anyone with a link can view**, and the file IDs appear in the page source. Assume anyone can find and download the videos.
- Keep the shared folder for **finished, approved work only**. Never place raw footage, client contracts, invoices, or personal files inside it.
- Always set sharing to **Viewer**. Never give public **Editor** access.
- Review the folder before sharing and check that no subfolder holds private files.
- If a client asks to remove their video, delete or unshare the file and remove its entry from `videos.js`, then push.
- Optional: add a small watermark or brand mark to videos to discourage reuse.
- To stop abuse or view limits on Drive later, move videos to YouTube unlisted or Cloudinary.

## 12. Legal and content safety

- Only publish work you have the right to show. Confirm that clients are comfortable with their work being public.
- Check that music, footage, and fonts used in portfolio videos are licensed, to avoid copyright claims.
- Client and brand names are not displayed on the site. Keep alt text neutral as well.
- Keep the right to remove any item quickly.

## 13. Future features

### 13.1 Contact form (if added)

| Rule | Detail |
|------|--------|
| Validate on the server | Check length and format of every field (see `BACKEND SCHEMA.md`) |
| Never trust the browser | Browser checks are only for user comfort |
| Spam protection | Hidden honeypot field, rate limiting, and a CAPTCHA such as Cloudflare Turnstile if spam appears |
| Secrets | Email service key only in Vercel Environment Variables, used only in server code |
| Data handling | Do not log message contents. Send them to email and discard |
| Response | Generic messages only. Never show internal error details |

### 13.2 Database or admin panel (if added)

- Use a managed service (for example Supabase) with **Row Level Security** turned on.
- Never put the service key in browser code.
- Admin login with two-factor authentication. Public visitors get read-only access to public content.
- Update this document before launching it.

## 14. Monitoring and incident response

### 14.1 Regular checks (monthly)

- [ ] Visit the live site and test videos and links
- [ ] Review Vercel deployments for unexpected ones
- [ ] Review GitHub security alerts and Dependabot suggestions
- [ ] Run `npm audit`
- [ ] Check Drive sharing and the folder contents

### 14.2 If something goes wrong

| Situation | Action |
|-----------|--------|
| Site shows wrong or harmful content | Roll back in Vercel, then change passwords and check recent GitHub commits |
| GitHub or Vercel login suspicious | Change password, sign out all sessions, check two-factor, review authorised apps |
| Secret pushed to GitHub | Rotate it immediately, then clean up code |
| A private file appears in the shared Drive folder | Unshare or move it, then check who might have accessed it |
| Videos suddenly stop loading | Check Drive sharing and quota. Consider YouTube or Cloudinary |
| Harassing or spam messages | Block and report. Consider WhatsApp Business filters |

## 15. Pre-launch security checklist

- [ ] Two-factor enabled on GitHub, Vercel, and Google
- [ ] No secrets in the code or Git history
- [ ] `.gitignore` includes `.env*`
- [ ] `package-lock.json` committed, `npm audit` reviewed
- [ ] All external links use `rel="noopener noreferrer"`
- [ ] Only Google Drive is used in iframes
- [ ] Drive folder contains finished work only, shared as Viewer
- [ ] No personal documents or private details on the site
- [ ] Security headers added and the site tested
- [ ] Client permission checked for public work
- [ ] Rollback steps in Vercel understood

## 16. Review

Review this document whenever a new feature (form, database, analytics, new embed source) is planned, and at least every six months.
