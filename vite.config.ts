/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { copyFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/**
 * GitHub Pages serves 404.html for unknown paths. Copying the built
 * index.html to 404.html lets BrowserRouter handle deep links after a
 * hard refresh. Documented in README → Deployment.
 */
function spaFallback(): Plugin {
  return {
    name: "spa-github-pages-fallback",
    apply: "build",
    async closeBundle() {
      const dist = resolve(here, "dist");
      await copyFile(resolve(dist, "index.html"), resolve(dist, "404.html"));
    },
  };
}

export default defineConfig({
  // Set PORTFOLIO_BASE="/your-repo-name/" when deploying to GitHub Pages.
  base: process.env.PORTFOLIO_BASE ?? "/",
  plugins: [react(), spaFallback()],
  build: {
    sourcemap: false,
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          const pkg = id.split("node_modules/").pop()?.split("/")[0] ?? "";
          if (pkg === "gsap" || pkg === "lenis") return "motion";
          if (["react", "react-dom", "react-router", "react-router-dom", "scheduler"].includes(pkg)) {
            return "vendor";
          }
          return undefined;
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
  },
});
