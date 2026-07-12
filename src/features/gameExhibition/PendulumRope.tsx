import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { gsap } from "../../utils/motion";

/**
 * A rope that hangs from the top of the Pendulum exhibit and swings
 * gently as the section scrolls through the viewport. Static under
 * reduced motion.
 */
export function PendulumRope() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reduced) return;
    const path = svg.querySelector<SVGPathElement>(".pendulum-rope__line");
    const bob = svg.querySelector<SVGCircleElement>(".pendulum-rope__bob");
    if (!path || !bob) return;

    const state = { p: 0 };
    const render = () => {
      // swing angle follows scroll progress through a sine, ±0.32 rad
      const angle = Math.sin(state.p * Math.PI * 2.2) * 0.32;
      const ax = 90; // anchor
      const ay = 0;
      const len = 240;
      const bx = ax + Math.sin(angle) * len;
      const by = ay + Math.cos(angle) * len;
      // control point bows opposite the swing for a rope-like curve
      const cx = ax + Math.sin(angle) * len * 0.45 - Math.cos(angle) * 18 * Math.sin(state.p * 7);
      const cy = ay + Math.cos(angle) * len * 0.5;
      path.setAttribute("d", `M${ax},${ay} Q${cx.toFixed(1)},${cy.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}`);
      bob.setAttribute("cx", bx.toFixed(1));
      bob.setAttribute("cy", by.toFixed(1));
    };
    render();

    const ctx = gsap.context(() => {
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: svg.closest(".showcase") ?? svg,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <svg
      ref={svgRef}
      className="pendulum-rope"
      viewBox="0 0 180 260"
      aria-hidden="true"
    >
      <line x1="60" y1="1" x2="120" y2="1" className="pendulum-rope__beam" />
      <path className="pendulum-rope__line" d="M90,0 Q90,120 90,240" />
      <circle className="pendulum-rope__bob" cx="90" cy="240" r="5" />
    </svg>
  );
}
