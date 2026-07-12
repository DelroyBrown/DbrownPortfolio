#!/usr/bin/env node
/**
 * Refreshes src/content/codeExcerpts.gen.ts from the real project
 * repositories, using the line ranges declared in excerpts.manifest.json.
 *
 * This runs at *development* time only — production never fetches code
 * from GitHub. The generated file is committed so builds are hermetic.
 *
 *   npm run sync:excerpts
 *
 * If GitHub is unreachable the script fails loudly and leaves the
 * previous generated file untouched.
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = resolve(here, "excerpts.manifest.json");
const outPath = resolve(here, "../src/content/codeExcerpts.gen.ts");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

async function fetchSource(repo, branch, sourcePath) {
  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${sourcePath}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) {
    throw new Error(`GET ${url} → ${res.status} ${res.statusText}`);
  }
  return res.text();
}

const results = {};

for (const entry of manifest.excerpts) {
  const { id, repo, branch, sourcePath, startLine, endLine } = entry;
  process.stdout.write(`↳ ${id}  (${repo}/${sourcePath} L${startLine}–L${endLine}) … `);
  const source = await fetchSource(repo, branch, sourcePath);
  const lines = source.split("\n");
  if (endLine > lines.length) {
    throw new Error(
      `${id}: endLine ${endLine} is beyond ${sourcePath} (${lines.length} lines). ` +
        `The upstream file changed — update the manifest range.`,
    );
  }
  const code = lines.slice(startLine - 1, endLine).join("\n").trimEnd();
  results[id] = {
    project: entry.project,
    language: entry.language,
    sourcePath,
    startLine,
    endLine,
    repositoryUrl: `https://github.com/${repo}/blob/${branch}/${sourcePath}#L${startLine}-L${endLine}`,
    code,
  };
  console.log("ok");
}

const banner = `/* ------------------------------------------------------------------ *
 *  GENERATED FILE — do not edit by hand.                              *
 *  Run \`npm run sync:excerpts\` to refresh from the source repos.     *
 *  Ranges are declared in scripts/excerpts.manifest.json.             *
 * ------------------------------------------------------------------ */

export interface GeneratedExcerpt {
  project: "pendulum" | "thread" | "invader";
  language: string;
  sourcePath: string;
  startLine: number;
  endLine: number;
  repositoryUrl: string;
  code: string;
}

export const generatedExcerpts: Record<string, GeneratedExcerpt> = `;

await writeFile(outPath, banner + JSON.stringify(results, null, 2) + ";\n", "utf8");
console.log(`\n✓ wrote ${outPath} (${manifest.excerpts.length} excerpts)`);
