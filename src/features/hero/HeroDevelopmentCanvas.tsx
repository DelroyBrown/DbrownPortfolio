import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/* The hero's living backdrop: a drifting constellation of development
 * concepts — systems as nodes, connections as plotted lines, small code
 * tokens floating between them. Pointer movement shifts the field in
 * depth. Pure canvas, no React state, paused off-screen and when the
 * tab is hidden. Reduced motion renders a single static frame. */

const NODE_LABELS = [
  "api",
  "ui",
  "physics",
  "audio",
  "data",
  "auth",
  "render",
  "tests",
  "state",
  "deploy",
  "camera",
  "events",
];

const TOKENS = [
  "const",
  "emit()",
  "useEffect",
  "SELECT",
  "class",
  "await",
  "=>",
  "commit",
  "120Hz",
  "JWT",
];

interface FieldNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number; // depth 0.35..1
  label?: string;
  token?: string;
  accent?: string;
}

const ACCENTS = ["#5fc8cf", "#e08d6d", "#c9a86a"];

function buildField(w: number, h: number, dense: boolean): FieldNode[] {
  const nodes: FieldNode[] = [];
  const labelCount = dense ? NODE_LABELS.length : 7;
  const tokenCount = dense ? TOKENS.length : 5;
  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  for (let i = 0; i < labelCount; i++) {
    nodes.push({
      x: rand(0.06, 0.94) * w,
      y: rand(0.06, 0.94) * h,
      vx: rand(-4, 4),
      vy: rand(-4, 4),
      z: rand(0.45, 1),
      label: NODE_LABELS[i],
      accent: i % 4 === 0 ? ACCENTS[i % ACCENTS.length] : undefined,
    });
  }
  for (let i = 0; i < tokenCount; i++) {
    nodes.push({
      x: rand(0.02, 0.98) * w,
      y: rand(0.02, 0.98) * h,
      vx: rand(-2.5, 2.5),
      vy: rand(-2.5, 2.5),
      z: rand(0.35, 0.7),
      token: TOKENS[i],
    });
  }
  return nodes;
}

export function HeroDevelopmentCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: FieldNode[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();

    // pointer parallax target/current (lerped in the loop, never in React)
    let px = 0;
    let py = 0;
    let cpx = 0;
    let cpy = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      nodes = buildField(width, height, width > 640);
      if (reduced) draw(0);
    };

    const draw = (dt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      cpx += (px - cpx) * 0.045;
      cpy += (py - cpy) * 0.045;

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      const pos = (n: FieldNode) => ({
        x: n.x + cpx * 26 * n.z,
        y: n.y + cpy * 18 * n.z,
      });

      // connections between nearby labelled nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a.label) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (!b.label) continue;
          const pa = pos(a);
          const pb = pos(b);
          const d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
          const max = Math.min(width, height) * 0.42;
          if (d > max) continue;
          const alpha = (1 - d / max) * 0.16;
          ctx.strokeStyle = `rgba(166, 173, 186, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const p = pos(n);
        if (n.label) {
          const r = 2.2 * n.z + 1;
          ctx.fillStyle = n.accent ?? "rgba(234, 231, 223, 0.75)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
          if (n.accent) {
            ctx.strokeStyle = `${n.accent}33`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.fillStyle = `rgba(166, 173, 186, ${(0.28 + n.z * 0.4).toFixed(2)})`;
          ctx.font = `${9 + n.z * 2}px "IBM Plex Mono", monospace`;
          ctx.fillText(n.label, p.x + r + 6, p.y + 3);
        } else if (n.token) {
          ctx.fillStyle = `rgba(111, 118, 131, ${(0.2 + n.z * 0.3).toFixed(2)})`;
          ctx.font = `${8 + n.z * 2}px "IBM Plex Mono", monospace`;
          ctx.fillText(n.token, p.x, p.y);
        }
      }
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(dt);
      if (running) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              if (visible) start();
              else stop();
            },
            { threshold: 0.02 },
          )
        : null;

    resize();
    io?.observe(canvas);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      start();
    } else {
      draw(0);
    }

    return () => {
      stop();
      io?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
