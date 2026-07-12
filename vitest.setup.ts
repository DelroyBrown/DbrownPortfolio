import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

/* ---- browser APIs missing from jsdom ---- */

/* Unit tests run with prefers-reduced-motion so GSAP/Lenis/canvas paths
 * are skipped deterministically; the reduced experience is the one that
 * must always be complete. */
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string): MediaQueryList =>
      ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  });
}

/* navigator.clipboard is provided per-test by user-event's own stub. */

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
window.IntersectionObserver =
  window.IntersectionObserver ?? MockIntersectionObserver;

class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = window.ResizeObserver ?? MockResizeObserver;

if (!window.scrollTo) {
  Object.defineProperty(window, "scrollTo", { writable: true, value: () => undefined });
}
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => undefined;
}
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => undefined;
}

/* Lenis drives a rAF scroll loop that has no meaning in jsdom. */
vi.mock("lenis", () => ({
  default: class MockLenis {
    on() {}
    off() {}
    raf() {}
    destroy() {}
    scrollTo() {}
    stop() {}
    start() {}
  },
}));
