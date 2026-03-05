# Hero Animated Gradient Background Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an animated mesh gradient background to the hero section using CSS-only blob animations.

**Architecture:** Three absolutely-positioned gradient blobs behind hero content, blurred together via a container filter. Animations use staggered CSS keyframes for organic movement. No new dependencies.

**Tech Stack:** React, Tailwind CSS v4, CSS keyframes

---

### Task 1: Add blob keyframe animations to index.css

**Files:**
- Modify: `src/index.css:27-31` (after existing `fade-in` keyframes)

**Step 1: Add blob CSS to index.css**

Append the following after the existing `.animate-fade-in` rule (line 31) in `src/index.css`:

```css
/* Hero gradient blobs */
.gradient-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  filter: blur(70px);
  opacity: 0;
  animation: fade-in 0.8s ease-out forwards;
}

.blob {
  position: absolute;
  border-radius: 50%;
  width: 400px;
  height: 400px;
}

.blob-1 {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%);
  top: -10%;
  left: -5%;
  animation: blob-drift-1 20s ease-in-out infinite alternate;
}

.blob-2 {
  background: radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%);
  bottom: -10%;
  right: -5%;
  animation: blob-drift-2 25s ease-in-out infinite alternate;
}

.blob-3 {
  background: radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: blob-drift-3 18s ease-in-out infinite alternate;
}

@keyframes blob-drift-1 {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(30%, 40%) scale(1.2);
  }
}

@keyframes blob-drift-2 {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(-30%, -40%) scale(1.1);
  }
}

@keyframes blob-drift-3 {
  from {
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    transform: translate(-30%, -70%) scale(1.3);
  }
}
```

**Step 2: Verify CSS is valid**

Run: `npx vite build 2>&1 | tail -5`
Expected: Build succeeds with no CSS errors.

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "Add CSS blob animations for hero gradient background"
```

---

### Task 2: Add gradient backdrop layer to Hero component

**Files:**
- Modify: `src/components/Hero.tsx:9-13`

**Step 1: Update the Hero component**

Replace the full content of `src/components/Hero.tsx` with:

```tsx
export function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.querySelector("#projects")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="gradient-backdrop" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="relative z-10 max-w-2xl text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Jason Acido
        </h1>
        <p className="text-lg md:text-xl text-text-muted mb-8">
          Full-stack developer building for the web.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#projects"
            onClick={handleScroll}
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors font-medium"
          >
            View Projects
          </a>
          <a
            href="https://github.com/jasonacido"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border hover:border-text-muted rounded-lg transition-colors font-medium text-text-muted hover:text-text"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
```

Changes from original:
- Line 11: Added `relative` and `overflow-hidden` to section className
- Lines 13-17: New gradient backdrop div with three blob children, `aria-hidden="true"` for accessibility
- Line 18: Added `relative z-10` to content div so it layers above the blobs

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "Add gradient backdrop layer to hero section"
```

---

### Task 3: Visual verification and tuning

**Step 1: Start dev server and check the result**

Run: `npm run dev`

Open in browser and verify:
- Three blurred gradient blobs are visible behind hero text
- Blobs animate smoothly (drift and scale over ~18-25s)
- Text remains fully readable over the gradient
- No overflow/scrollbar issues
- Mobile viewport looks correct (resize to 375px width)
- Backdrop and content both fade in on page load

**Step 2: Run Lighthouse locally**

Run: `npx @lhci/cli autorun`
Expected: All scores remain above 90 thresholds set in `.lighthouserc.json`.

**Step 3: Commit any tuning adjustments (if needed)**

```bash
git add -A
git commit -m "Tune hero gradient blob colors and animation timing"
```

Skip this commit if no adjustments were needed.
