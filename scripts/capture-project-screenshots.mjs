#!/usr/bin/env node
/**
 * Captures real screenshots of the deployed games and writes optimised
 * WebP files into public/projects/. Production never takes screenshots
 * at runtime — these are committed local assets.
 *
 *   npm run capture:projects
 *
 * Requires Playwright's chromium (npx playwright install chromium) and
 * network access to the GitHub Pages builds. Each target fails loudly
 * but independently: one unreachable game doesn't abort the other.
 *
 * Manual fallback (documented in the README): open the live game, use
 * the browser's device toolbar at 1600×900, screenshot, convert to WebP
 * (e.g. `npx sharp-cli -i shot.png -o cover.webp`) and drop the file
 * into the paths below.
 */
import { mkdir, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const outRoot = resolve(here, "../public/projects");

const TARGETS = [
  {
    slug: "pendulum",
    url: "https://delroybrown.github.io/pendulum/",
    viewport: { width: 1600, height: 950 },
    /** menu runs an attract-mode simulation — already shows the game world */
    coverDelay: 6000,
    async play(page) {
      // one tap starts a run; a few timed releases produce real gameplay
      await page.mouse.click(800, 500);
      await page.waitForTimeout(1400);
      for (const wait of [900, 1100, 900]) {
        await page.keyboard.press("Space");
        await page.waitForTimeout(wait);
      }
    },
  },
  {
    slug: "thread",
    url: "https://delroybrown.github.io/thread/",
    viewport: { width: 1600, height: 900 },
    /** Thread's title screen is DOM UI — the canvas only exists in-game,
     *  so we wait for the Play button rather than a canvas. */
    readySelector: 'button:has-text("Play")',
    coverDelay: 4000,
    async play(page) {
      await page.getByRole("button", { name: /play/i }).first().click();
      await page.waitForSelector("canvas", { timeout: 20_000 });
      await page.waitForTimeout(2500);
      // walk right so Patch is mid-scene rather than at spawn
      await page.keyboard.down("d");
      await page.waitForTimeout(1400);
      await page.keyboard.up("d");
      await page.waitForTimeout(400);
    },
  },
  {
    slug: "invader-storm",
    url: "https://delroybrown.github.io/Invader/",
    viewport: { width: 1600, height: 900 },
    coverDelay: 4000,
    async play(page) {
      // menu → tutorial → playing, then fight through the first formation
      await page.keyboard.press("Enter");
      await page.waitForTimeout(900);
      await page.keyboard.press("Enter");
      await page.waitForTimeout(2200);
      await page.keyboard.down("Space");
      await page.keyboard.down("ArrowLeft");
      await page.waitForTimeout(900);
      await page.keyboard.up("ArrowLeft");
      await page.keyboard.down("ArrowRight");
      await page.waitForTimeout(1400);
      await page.keyboard.up("ArrowRight");
      await page.waitForTimeout(600);
      await page.keyboard.up("Space");
    },
  },
  {
    slug: "kybalion",
    url: "https://kybalion.onrender.com/",
    viewport: { width: 1600, height: 1000 },
    /** a web app, not a game — wait for the SPA shell, no canvas */
    readySelector: "#root main, #root [class]",
    coverDelay: 5000,
    /** second shot: the reader itself, captured as reader.webp */
    secondShotName: "reader",
    async play(page) {
      await page.goto("https://kybalion.onrender.com/read", {
        waitUntil: "networkidle",
        timeout: 60_000,
      });
      await page.waitForTimeout(4000);
    },
  },
];

async function toWebp(pngBuffer, outPath) {
  await sharp(pngBuffer).webp({ quality: 84 }).toFile(outPath);
  console.log(`  ✓ ${outPath}`);
}

async function captureTarget(browser, target) {
  console.log(`\n▶ ${target.slug} — ${target.url}`);
  const dir = resolve(outRoot, target.slug);
  await mkdir(dir, { recursive: true });

  const context = await browser.newContext({
    viewport: target.viewport,
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30_000);

  try {
    await page.goto(target.url, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForSelector(target.readySelector ?? "canvas", { timeout: 20_000 });
    await page.waitForTimeout(target.coverDelay);
    await toWebp(await page.screenshot({ type: "png" }), resolve(dir, "cover.webp"));

    const secondShot = `${target.secondShotName ?? "gameplay"}.webp`;
    try {
      await target.play(page);
      await toWebp(await page.screenshot({ type: "png" }), resolve(dir, secondShot));
    } catch (err) {
      console.warn(`  ⚠ second-shot interaction failed (${err.message}) — capturing current frame`);
      await toWebp(await page.screenshot({ type: "png" }), resolve(dir, secondShot));
    }
  } finally {
    await context.close();
  }
}

const browser = await chromium.launch();
let failures = 0;

for (const target of TARGETS) {
  try {
    await captureTarget(browser, target);
  } catch (err) {
    failures++;
    console.error(`✗ ${target.slug} failed: ${err.message}`);
    console.error(
      "  Check the live URL in a browser; if it is up, re-run. Otherwise use the manual fallback in the README.",
    );
    await rm(resolve(outRoot, target.slug, "incomplete.tmp"), { force: true });
  }
}

await browser.close();

if (failures > 0) {
  process.exitCode = 1;
  console.error(`\n${failures} target(s) failed.`);
} else {
  console.log("\nAll screenshots captured.");
}
