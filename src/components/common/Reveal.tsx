import {
  createElement,
  useCallback,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/* One shared observer for every revealed element on the page. */
let sharedObserver: IntersectionObserver | null = null;

function observe(el: Element) {
  if (typeof IntersectionObserver === "undefined") {
    el.classList.add("is-revealed");
    return () => undefined;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
  }
  sharedObserver.observe(el);
  const obs = sharedObserver;
  return () => obs.unobserve(el);
}

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
  children?: ReactNode;
}

/**
 * One-time masked reveal on scroll. Under prefers-reduced-motion the CSS
 * neutralises the transition, so content is simply visible.
 */
export function Reveal({ as = "div", delay = 0, className, id, children }: RevealProps) {
  /* React 19 callback ref with cleanup — no ref object, no effect. */
  const ref = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    return observe(el);
  }, []);

  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return createElement(
    as,
    { ref, id, className, style, "data-reveal": "" },
    children,
  );
}
