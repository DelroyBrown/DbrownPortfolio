import type Lenis from "lenis";

/* The active Lenis instance (if smooth scrolling is running). Kept in a
 * module so navigation code can scroll without prop-drilling. */
let activeLenis: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  activeLenis = lenis;
}

export function getLenis(): Lenis | null {
  return activeLenis;
}

/** Scroll to an element id (without '#') or to top. Falls back to native. */
export function scrollToTarget(id?: string) {
  if (!id) {
    if (activeLenis) activeLenis.scrollTo(0, { duration: 1 });
    else window.scrollTo({ top: 0 });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (activeLenis) {
    activeLenis.scrollTo(el, { offset: -70, duration: 1.1 });
  } else {
    el.scrollIntoView({ block: "start" });
  }
}
