import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./motion.css";

function supportsFinePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(pointer: fine)").matches
  );
}

/**
 * Restrained custom cursor: a dot that tracks the pointer directly and a
 * ring that follows with soft inertia. Elements opt in to labels and
 * accents via `data-cursor="Play"` / `data-cursor-accent="var(--gold)"`.
 * Containers with `data-cursor-hide` (e.g. live game embeds) suspend it.
 * Desktop fine-pointer only; never rendered under reduced motion.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [finePointer] = useState(supportsFinePointer);
  const enabled = finePointer && !reduced;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let pmx = -100;
    let pmy = -100;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.classList.remove("is-hidden");
        ring.classList.remove("is-hidden");
      }
    };

    const hide = () => {
      visible = false;
      dot.classList.add("is-hidden");
      ring.classList.add("is-hidden");
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest("[data-cursor-hide], iframe")) {
        hide();
        return;
      }
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      const interactive = target.closest("a, button, [role='button'], input, textarea, summary");
      const text = labelled?.dataset.cursor ?? "";
      const accent = labelled?.dataset.cursorAccent ?? "";
      label.textContent = text;
      ring.classList.toggle("has-label", !!text);
      ring.classList.toggle("is-engaged", !!text || !!interactive);
      ring.style.setProperty("--cursor-accent", accent || "");
    };

    const loop = () => {
      // ring follows with inertia; a light velocity stretch keeps it alive
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const vx = mx - pmx;
      const vy = my - pmy;
      pmx = mx;
      pmy = my;
      const speed = Math.min(Math.hypot(vx, vy), 40);
      const stretch = 1 + speed * 0.006;
      const angle = Math.atan2(vy, vx);
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) rotate(${angle}rad) scale(${stretch}, ${2 - stretch}) rotate(${-angle}rad)`;
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", hide);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor cursor--dot is-hidden" aria-hidden="true" />
      <div ref={ringRef} className="cursor cursor--ring is-hidden" aria-hidden="true">
        <span ref={labelRef} className="cursor__label" />
      </div>
    </>
  );
}
