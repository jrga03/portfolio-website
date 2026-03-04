# Lighthouse Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve Lighthouse scores to ~100 across all categories and add CI regression protection.

**Architecture:** Fix SEO metadata, accessibility contrast, missing favicon, convert images to WebP, and add a Lighthouse CI GitHub Action. All changes are additive or simple edits — no structural refactoring.

**Tech Stack:** Vite, React, Tailwind CSS, sharp (for image conversion), GitHub Actions, Lighthouse CI

---

### Task 1: SEO — Add meta description

**Files:**
- Modify: `index.html:4-6`

**Step 1: Add meta description tag**

In `index.html`, add the meta description inside `<head>` after the viewport meta tag:

```html
<meta name="description" content="Jason Acido — full-stack developer. Portfolio showcasing web projects built with React, TypeScript, and modern web technologies." />
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Builds successfully with no errors.

**Step 3: Commit**

```bash
git add index.html
git commit -m "Add meta description for SEO"
```

---

### Task 2: SEO — Add robots.txt

**Files:**
- Create: `public/robots.txt`

**Step 1: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /
```

**Step 2: Verify it's included in build output**

Run: `npm run build`
Then check: `ls dist/robots.txt`
Expected: File exists in build output.

**Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "Add robots.txt for SEO"
```

---

### Task 3: Accessibility — Fix color contrast

**Files:**
- Modify: `src/index.css:13`

**Step 1: Update muted text color**

In `src/index.css`, change `--color-text-muted` from `#737373` to `#8a8a8a`:

```css
--color-text-muted: #8a8a8a;
```

**Step 2: Visual check**

Run: `npm run dev`
Verify muted text (tagline, tech pills, dates, nav links, footer) is readable but still visually subdued.

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "Improve muted text contrast for WCAG AA compliance"
```

---

### Task 4: Best Practices — Add favicon

**Files:**
- Create: `public/favicon.svg`
- Modify: `index.html:4-6`

**Step 1: Create SVG favicon**

Create `public/favicon.svg` — a minimal "JA" monogram on a dark background matching the site's accent color:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#3b82f6"/>
  <text x="16" y="22" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#fff" text-anchor="middle">JA</text>
</svg>
```

**Step 2: Reference favicon in index.html**

In `index.html`, add inside `<head>` after the title tag:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

**Step 3: Verify favicon loads**

Run: `npm run dev`
Check browser tab — should show "JA" icon. Check browser console — no 404 for favicon.

**Step 4: Commit**

```bash
git add public/favicon.svg index.html
git commit -m "Add SVG favicon to fix 404 console error"
```

---

### Task 5: Image Optimization — Convert PNGs to WebP

**Files:**
- Modify: `src/data/projects.ts` (all `.png` references → `.webp`)
- Delete: `public/projects/*.png` (13 files, keep `placeholder.svg`)
- Create: `public/projects/*.webp` (13 files)

**Step 1: Install sharp as devDependency**

Run: `npm install --save-dev sharp`

sharp is a fast image processing library that handles PNG→WebP conversion.

**Step 2: Write a one-time conversion script**

Create a temporary script `scripts/convert-to-webp.mjs`:

```javascript
#!/usr/bin/env node
import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join } from "path";

const dir = "public/projects";
const files = await readdir(dir);
const pngs = files.filter((f) => f.endsWith(".png"));

for (const png of pngs) {
  const input = join(dir, png);
  const output = join(dir, png.replace(/\.png$/, ".webp"));
  await sharp(input).webp({ quality: 80 }).toFile(output);
  await unlink(input);
  console.log(`${png} -> ${png.replace(/\.png$/, ".webp")}`);
}

console.log(`\nConverted ${pngs.length} images.`);
```

**Step 3: Run the conversion**

Run: `node scripts/convert-to-webp.mjs`
Expected: 13 PNG files converted to WebP, originals deleted.

**Step 4: Update project data references**

In `src/data/projects.ts`, replace all `.png` with `.webp` in the `image` fields. There are 13 occurrences:

```
.png  →  .webp
```

for every `image: "/projects/...png"` line.

**Step 5: Verify build and images load**

Run: `npm run build && npx vite preview`
Check that all project card images load correctly.

**Step 6: Clean up conversion script**

Delete `scripts/convert-to-webp.mjs` — it was a one-time utility.

Run: `rm scripts/convert-to-webp.mjs && rmdir scripts 2>/dev/null`

**Step 7: Commit**

```bash
git add public/projects/ src/data/projects.ts
git commit -m "Convert project thumbnails from PNG to WebP"
```

---

### Task 6: Update generate-thumbnails skill to output WebP

**Files:**
- Modify: `.claude/skills/generate-thumbnails/scripts/screenshot.mjs:104,109`
- Modify: `.claude/skills/generate-thumbnails/SKILL.md`

**Step 1: Update screenshot script to output WebP**

In `.claude/skills/generate-thumbnails/scripts/screenshot.mjs`, make two changes:

a) Change the output file extension (line 104):

```javascript
const outPath = join(outDir, `${slug}.webp`);
```

b) Change the screenshot type (line 109):

```javascript
await page.screenshot({ path: outPath, type: "webp", quality: 80 });
```

**Step 2: Update SKILL.md references**

In `.claude/skills/generate-thumbnails/SKILL.md`, update all references:

- Change "PNG thumbnails" → "WebP thumbnails"
- Change "saves a viewport screenshot as a PNG" → "saves a viewport screenshot as a WebP"
- Change `.png` → `.webp` in the image path example under "Adding a new project"
- Change "Verify the generated PNGs" → "Verify the generated WebP files"
- Update the overview line: "saves them as PNG thumbnails" → "saves them as WebP thumbnails"

**Step 3: Test the skill with a single project**

Run: `node .claude/skills/generate-thumbnails/scripts/screenshot.mjs --slug stackdown`
Expected: Creates `public/projects/stackdown.webp` (should already exist from Task 5 conversion).

**Step 4: Commit**

```bash
git add .claude/skills/generate-thumbnails/
git commit -m "Update generate-thumbnails skill to output WebP"
```

---

### Task 7: Lighthouse CI — Add GitHub Action

**Files:**
- Create: `.lighthouserc.json`
- Create: `.github/workflows/lighthouse.yml`

**Step 1: Create Lighthouse CI config**

Create `.lighthouserc.json` at project root:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

**Step 2: Create GitHub Actions workflow**

Create `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci

      - run: npm run build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: .lighthouserc.json
```

**Step 3: Verify config is valid JSON**

Run: `python3 -c "import json; json.load(open('.lighthouserc.json'))"`
Expected: No error.

**Step 4: Commit**

```bash
git add .lighthouserc.json .github/workflows/lighthouse.yml
git commit -m "Add Lighthouse CI GitHub Action for score regression protection"
```

---

### Task 8: Final verification — Run Lighthouse locally

**Step 1: Build and serve**

Run: `npm run build`
Then start preview server.

**Step 2: Run Lighthouse audit**

Run Lighthouse against the local preview and compare scores to baseline:

| Category | Before | Target |
|---|---|---|
| Performance | 100 | 100 |
| Accessibility | 95 | ~100 |
| Best Practices | 96 | ~100 |
| SEO | 83 | ~97+ |

**Step 3: Address any remaining issues**

If any score is unexpectedly low, investigate and fix.

**Step 4: Uninstall sharp if not needed**

If sharp is not used by anything else:

Run: `npm uninstall sharp`

sharp was only needed for the one-time PNG→WebP conversion.

**Step 5: Final commit (if any cleanup)**

```bash
git add package.json package-lock.json
git commit -m "Remove sharp after image conversion"
```
