import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../utils/motion";
import { setLenis } from "../utils/smoothScroll";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Smooth inertial scrolling, driven by the GSAP ticker so ScrollTrigger
 * stays perfectly in sync. Disabled entirely under reduced motion —
 * the site then uses native scrolling.
 */
export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3.4),
      touchMultiplier: 1.4,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);
}
