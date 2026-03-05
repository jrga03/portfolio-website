# Hero Section Animated Gradient Background

## Motivation

The current hero section is too plain and generic — it doesn't grab attention or differentiate from other developer portfolios. Adding an animated gradient background will make it feel alive and premium.

## Approach

CSS animated mesh gradient using overlapping radial gradient blobs with blur. This is a zero-dependency, CSS-only technique used by Linear, Vercel, and Apple. No content changes — same name, tagline, and CTAs.

## Design

### Gradient Blob Layer

Three absolutely-positioned `<div>` elements behind the hero content, each a large circle (300-500px) with a radial gradient. A CSS `blur()` filter (60-80px) on the container creates the soft, diffused look.

**Blob colors** (40-60% opacity):
- Blob 1: Blue `#3b82f6` (matches accent)
- Blob 2: Purple/indigo `#6366f1` (complementary)
- Blob 3: Cyan/teal `#06b6d4` (adds range)

### Component Structure

```
<section id="hero" className="relative overflow-hidden">
  <div className="gradient-backdrop">     absolute, inset-0, overflow-hidden, blur filter
    <div className="blob blob-1" />        radial gradient circles
    <div className="blob blob-2" />
    <div className="blob blob-3" />
  </div>
  <div className="content" z-10>          existing content unchanged
    <h1>Jason Acido</h1>
    <p>Full-stack developer building for the web.</p>
    <CTAs />
  </div>
</section>
```

No new files or dependencies. Blob styles and animations go in `index.css`.

### Animation Details

Each blob has its own `@keyframes` combining `translate` and `scale`:

- Blob 1: Drifts upper-left to lower-right, 20s loop
- Blob 2: Drifts lower-right to upper-left, 25s loop
- Blob 3: Drifts center to edges in circular path, 18s loop

All use `ease-in-out` timing with `infinite alternate` for smooth reversal. Staggered durations (18s, 20s, 25s) prevent repetitive patterns.

The blur filter goes on the backdrop container (one filter pass, not three) for better performance.

The backdrop fades in with the existing 0.8s `animate-fade-in` animation.

## Files Modified

- `src/components/Hero.tsx` — add gradient backdrop layer, add `relative`/`overflow-hidden` to section
- `src/index.css` — add blob styles and three `@keyframes` animations
