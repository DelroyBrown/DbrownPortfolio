#!/usr/bin/env node
/**
 * Renders the Open Graph / Twitter card image (1200×630 PNG) from an
 * inline SVG. Run once (npm run generate:social); the output is
 * committed at public/social/og-image.png.
 */
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../public/social");
await mkdir(outDir, { recursive: true });

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0b0d12"/>
  <g stroke="rgba(214,222,235,0.06)" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join("")}
  </g>
  <path d="M0,520 L260,520 L320,430 L640,430 L700,500 L1000,500 L1050,455 L1200,455"
        fill="none" stroke="rgba(95,200,207,0.55)" stroke-width="2"/>
  <circle cx="320" cy="430" r="6" fill="#5fc8cf"/>
  <circle cx="700" cy="500" r="6" fill="#e08d6d"/>
  <circle cx="1050" cy="455" r="6" fill="#c9a86a"/>
  <text x="90" y="205" font-family="Segoe UI, Arial, sans-serif" font-size="30" letter-spacing="14" fill="#6f7683">DJB — PORTFOLIO</text>
  <text x="86" y="300" font-family="Segoe UI, Arial, sans-serif" font-weight="300" font-size="76" fill="#eae7de">Delroy J. Brown</text>
  <text x="90" y="360" font-family="Segoe UI, Arial, sans-serif" font-weight="400" font-size="34" fill="#a6adba">Creative Full-Stack Software Developer</text>
  <text x="90" y="410" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#6f7683">Full-stack systems · interactive browser experiences · AI-assisted development</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(resolve(outDir, "og-image.png"));
console.log("✓ wrote public/social/og-image.png");
