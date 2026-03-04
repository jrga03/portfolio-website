# Lighthouse Optimization Design

## Goal

Improve Lighthouse scores across all categories and add CI-based regression protection.

## Current Scores

| Category | Score |
|---|---|
| Performance | 100/100 |
| Accessibility | 95/100 |
| Best Practices | 96/100 |
| SEO | 83/100 |

## Changes

### 1. SEO Fixes

- Add `<meta name="description">` to `index.html`
- Add `public/robots.txt` with permissive crawl rules

### 2. Accessibility Fix

- Bump `--color-text-muted` from `#737373` to `#8a8a8a` in `src/index.css`
- `#8a8a8a` on `#141414` (surface) = ~5.2:1 — passes WCAG AA
- `#8a8a8a` on `#0a0a0a` (bg) = ~5.6:1 — passes WCAG AA

### 3. Favicon

- Add an SVG favicon with initials "JA" to `public/favicon.svg`
- Reference it in `index.html` with `<link rel="icon">`
- Fixes the 404 console error flagged under Best Practices

### 4. Image Optimization

- Convert all 14 PNG thumbnails in `public/projects/` to WebP
- Update image references in `src/data/projects.ts` from `.png` to `.webp`
- Delete original PNGs
- Update the `generate-thumbnails` skill to output WebP directly

### 5. Lighthouse CI

- Add `.lighthouserc.json` at project root with score thresholds (90 minimum per category)
- Add `.github/workflows/lighthouse.yml` GitHub Action
- Runs on every push to `main` and on every PR
- Builds the site, audits static output, fails if scores drop below threshold

## Dropped from Scope

- **Bundle optimization:** ~21 KiB unused JS is React internals, not tree-shakeable. Performance already 100.
- **Render-blocking CSS:** Tailwind output is 3.4 KiB gzipped, already tiny. No score impact.

## Expected Scores After

| Category | Score |
|---|---|
| Performance | 100 |
| Accessibility | ~100 |
| Best Practices | ~100 |
| SEO | ~97+ |
