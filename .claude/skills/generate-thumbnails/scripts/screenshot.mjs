#!/usr/bin/env node

/**
 * Screenshot generator for portfolio project thumbnails.
 *
 * Usage:
 *   node screenshot.mjs                          # Capture all projects
 *   node screenshot.mjs --slug stackdown         # Capture a single project by slug
 *   node screenshot.mjs --url <url> --slug name  # Capture an arbitrary URL
 *
 * Requirements: puppeteer must be installed (npm install --no-save puppeteer)
 *
 * Output: WebP files at <project-root>/public/projects/<slug>.webp (1200x800 viewport)
 */

import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Navigate from .claude/skills/generate-thumbnails/scripts/ to project root
const projectRoot = join(__dirname, "..", "..", "..", "..");
const outDir = join(projectRoot, "public", "projects");

// ---------------------------------------------------------------------------
// Parse projects from src/data/projects.ts
// ---------------------------------------------------------------------------
function parseProjects() {
  const filePath = join(projectRoot, "src", "data", "projects.ts");
  const content = readFileSync(filePath, "utf-8");

  const projects = [];
  const regex =
    /title:\s*"([^"]+)"[\s\S]*?liveUrl:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const title = match[1];
    const liveUrl = match[2];
    const image = match[3];
    // Derive slug from image path: /projects/foo.png -> foo
    const slug = image.replace(/^\/projects\//, "").replace(/\.\w+$/, "");
    projects.push({ title, slug, url: liveUrl });
  }
  return projects;
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null;
}

const argSlug = getArg("slug");
const argUrl = getArg("url");
const argWidth = parseInt(getArg("width") || "1200", 10);
const argHeight = parseInt(getArg("height") || "800", 10);
const argWait = parseInt(getArg("wait") || "2000", 10);

// ---------------------------------------------------------------------------
// Determine which projects to capture
// ---------------------------------------------------------------------------
let targets;

if (argUrl && argSlug) {
  // Explicit URL + slug override
  targets = [{ title: argSlug, slug: argSlug, url: argUrl }];
} else {
  const allProjects = parseProjects();
  if (argSlug) {
    const found = allProjects.find((p) => p.slug === argSlug);
    if (!found) {
      console.error(
        `Slug "${argSlug}" not found. Available: ${allProjects.map((p) => p.slug).join(", ")}`
      );
      process.exit(1);
    }
    targets = [found];
  } else {
    targets = allProjects;
  }
}

// ---------------------------------------------------------------------------
// Capture screenshots
// ---------------------------------------------------------------------------
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({
  width: argWidth,
  height: argHeight,
  deviceScaleFactor: 1,
});

let failed = 0;

for (const { title, slug, url } of targets) {
  const outPath = join(outDir, `${slug}.webp`);
  console.log(`Capturing "${title}" (${slug}) from ${url} ...`);
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, argWait));
    await page.screenshot({ path: outPath, type: "webp", quality: 80 });
    console.log(`  -> ${outPath}`);
  } catch (err) {
    console.error(`  !! Failed: ${err.message}`);
    failed++;
  }
}

await browser.close();

console.log(
  `\nDone. ${targets.length - failed}/${targets.length} screenshots captured.`
);
if (failed > 0) process.exit(1);
