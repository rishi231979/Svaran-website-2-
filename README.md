# Svaran

Marketing/landing website for **Svaran** — a freelance lead-generation and outbound service for SaaS companies, with an affiliate tie-in to [Deel](https://www.deel.com/).

## Overview

This is a single-page site built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no Node dependencies required to run it. It's designed to be pushed to GitHub and hosted on **Azure Static Web Apps**.

## Project Structure

```
svaran/
├── index.html                  # Main page (single-page site)
├── css/
│   └── style.css               # Design tokens, reset, layout, responsive styles
├── js/
│   └── main.js                 # Nav toggle, smooth scroll, fade-in, form validation
├── assets/
│   └── favicon.svg             # Brand favicon (navy square, gold "S")
├── sitemap.xml                 # Points search engines at https://svaran.in/
├── robots.txt                  # Allows crawling, references sitemap.xml
├── staticwebapp.config.json    # Azure Static Web Apps routing/MIME config
├── README.md
└── .gitignore
```

## Design System

Defined as CSS custom properties in `css/style.css`:

- **Colors** — navy `#0B1F3A` (primary), gold `#C9A227` (accent), white `#FFFFFF` (background), light gray `#F5F6F8` (alternate section background), dark gray `#333333` (body text). Gold is reserved for accents, icons, and buttons with dark text on top of it — never used as body text on white/light-gray, since it fails WCAG AA contrast there.
- **Typography** — [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts, mobile-first type scale for h1/h2/h3/body/small.
- **Spacing** — 8px-based scale: 8 / 16 / 24 / 32 / 48 / 64 / 96px.
- **Radius & shadow** — shared `--radius-base` and `--shadow-card` tokens for cards/buttons.
- **Breakpoints** — mobile-first, `min-width` media queries at 768px (tablet) and 1024px (desktop).

## Accessibility & Progressive Enhancement

- All decorative SVGs are marked `aria-hidden`/non-focusable; the contact form has `<label for>` on every field plus `aria-required` and JS-managed `aria-invalid`/inline error text.
- Keyboard focus is visible everywhere (navy outline on light backgrounds, gold inside the navy header/footer).
- The scroll-triggered fade-in effect is CSS-first: an inline script adds a `js` class to `<html>`, and only `.js .fade-in` is hidden by default. If JavaScript fails to load, every section stays fully visible — nothing depends on JS to be readable.

## Running Locally

No build step needed. Open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:

```bash
npx serve .
```

## Deployment

Intended for deployment via **Azure Static Web Apps**, pointed directly at this repository with no build command required. `staticwebapp.config.json` is already configured with a single-page-app fallback to `index.html` (excluding `/css`, `/js`, `/assets`, `robots.txt`, and `sitemap.xml`) and explicit MIME types for SVG/JSON/XML.

The GitHub Actions workflow for CI/CD is intentionally **not** included yet — Azure generates it automatically when you connect this repo through the Azure Portal.

## Before Going Live — Placeholder Checklist

These are hardcoded as findable placeholders (each flagged with an HTML comment in `index.html`) and must be replaced with real values before launch:

- [x] **Deel affiliate link** — done. The "Set Up Deel" button now points to the real referral link.
- [x] **Formspree form ID** — done. The contact form now submits to the real Formspree endpoint.
- [ ] **Open Graph image** — `index.html`, `og:image` points to `https://svaran.in/assets/og-image.png`, which doesn't exist yet. Add a real 1200×630 image to `/assets/` before launch so link previews render correctly.

## Status

Content, accessibility, SEO metadata, and Azure deployment config are all in place. The three items above are the only things standing between this and a live launch.
