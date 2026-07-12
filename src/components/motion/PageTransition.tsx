import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { getLenis } from "../../utils/smoothScroll";
import "./motion.css";

/**
 * Route transitions: the incoming page rises softly into place and the
 * scroll position resets (unless the URL carries a hash target). Under
 * reduced motion the swap is instant.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reduced = useReducedMotion();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (location.hash) return; // anchor navigation handles its own scroll
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <div key={location.pathname} className={reduced ? undefined : "page-enter"}>
      {children}
    </div>
  );
}
