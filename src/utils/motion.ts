import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Central motion configuration — every GSAP sequence reads from here
 * so the site moves with one voice. CSS equivalents live in tokens.css. */
export const MOTION = {
  ease: {
    out: "power3.out",
    inOut: "power2.inOut",
    soft: "sine.out",
  },
  duration: {
    fast: 0.22,
    base: 0.48,
    slow: 0.85,
  },
  revealY: 26,
  stagger: 0.08,
} as const;

export { gsap, ScrollTrigger };
