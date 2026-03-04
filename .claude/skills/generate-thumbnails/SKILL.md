---
name: generate-thumbnails
description: Generate screenshot thumbnails for portfolio project cards. Use this skill when the user wants to capture, update, or refresh project thumbnail images, or when adding a new project that needs a screenshot.
---

# Generate Thumbnails

## Overview

This skill captures live screenshots of portfolio project URLs and saves them as PNG thumbnails used in the project cards. It reads project data from `src/data/projects.ts` and outputs images to `public/projects/`.

## Prerequisites

Puppeteer is included as a devDependency. Ensure dependencies are installed:

```bash
npm install
```

## Usage

The screenshot script is located at `.claude/skills/generate-thumbnails/scripts/screenshot.mjs`.

### Capture all projects

```bash
node .claude/skills/generate-thumbnails/scripts/screenshot.mjs
```

### Capture a single project by slug

```bash
node .claude/skills/generate-thumbnails/scripts/screenshot.mjs --slug stackdown
```

### Capture an arbitrary URL with a custom slug

```bash
node .claude/skills/generate-thumbnails/scripts/screenshot.mjs --url https://example.com --slug my-project
```

### Options

| Flag       | Default | Description                              |
| ---------- | ------- | ---------------------------------------- |
| `--slug`   | (all)   | Capture only this project slug           |
| `--url`    | —       | Override URL (requires `--slug`)         |
| `--width`  | 1200    | Viewport width in pixels                 |
| `--height` | 800     | Viewport height in pixels                |
| `--wait`   | 2000    | Extra wait time (ms) after page load     |

## Workflow

### Refreshing all thumbnails

1. Run: `node .claude/skills/generate-thumbnails/scripts/screenshot.mjs`
2. Verify the generated PNGs in `public/projects/`

### Adding a new project

1. Add the project entry to `src/data/projects.ts` with the `image` field set to `/projects/<slug>.png`
2. Run: `node .claude/skills/generate-thumbnails/scripts/screenshot.mjs --slug <slug>`

### Updating a single thumbnail

1. Run: `node .claude/skills/generate-thumbnails/scripts/screenshot.mjs --slug <slug>`
2. Optionally override the URL: `--url <new-url>`

## How It Works

The script parses `src/data/projects.ts` to extract project titles, live URLs, and image slugs. It launches a headless Chromium browser via Puppeteer, navigates to each URL, waits for the page to fully render (networkidle2 + configurable delay), and saves a viewport screenshot as a PNG to `public/projects/`.

## Resources

### scripts/

- `screenshot.mjs` — Node.js script that captures screenshots using Puppeteer. Can be run directly without loading into context.
