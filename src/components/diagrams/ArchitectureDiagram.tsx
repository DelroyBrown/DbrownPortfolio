import { useEffect, useRef, useState } from "react";
import type { ArchitectureDiagramData, DiagramNode } from "../../types/content";
import "./diagrams.css";

interface ArchitectureDiagramProps {
  diagram: ArchitectureDiagramData;
  accent?: string;
}

/* Layout constants — nodes sit on a 12-column grid, rows are fixed height. */
const COLS = 12;
const ROW_H = 92;
const NODE_H = 56;
const VIEW_W = 720;

function nodeRect(node: DiagramNode) {
  const colW = VIEW_W / COLS;
  return {
    x: node.x * colW + 6,
    y: node.y * ROW_H + (ROW_H - NODE_H) / 2,
    w: node.w * colW - 12,
    h: NODE_H,
  };
}

/**
 * A data-driven architecture diagram. Every node is a real button —
 * keyboard focusable — and selecting one explains that system below the
 * drawing. Edges draw themselves when the diagram enters view.
 */
export function ArchitectureDiagram({ diagram, accent }: ArchitectureDiagramProps) {
  const [selected, setSelected] = useState<string>(diagram.nodes[0]?.id ?? "");
  const rootRef = useRef<HTMLDivElement>(null);
  const rows = Math.max(...diagram.nodes.map((n) => n.y)) + 1;
  const viewH = rows * ROW_H;
  const selectedNode = diagram.nodes.find((n) => n.id === selected);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      rootRef.current?.classList.add("is-drawn");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          root.classList.add("is-drawn");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="arch"
      ref={rootRef}
      style={accent ? { ["--accent" as string]: accent } : undefined}
    >
      <svg
        className="arch__svg"
        viewBox={`0 0 ${VIEW_W} ${viewH}`}
        role="presentation"
        aria-hidden="true"
      >
        {diagram.edges.map((edge, i) => {
          const from = diagram.nodes.find((n) => n.id === edge.from);
          const to = diagram.nodes.find((n) => n.id === edge.to);
          if (!from || !to) return null;
          const a = nodeRect(from);
          const b = nodeRect(to);
          const x1 = a.x + a.w / 2;
          const y1 = a.y + a.h;
          const x2 = b.x + b.w / 2;
          const y2 = b.y;
          const mid = (y1 + y2) / 2;
          const active = edge.from === selected || edge.to === selected;
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              className={`arch__edge ${active ? "is-active" : ""}`}
              style={{ transitionDelay: `${i * 60}ms` }}
              d={`M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}`}
            />
          );
        })}
      </svg>

      <div className="arch__nodes" style={{ aspectRatio: `${VIEW_W} / ${viewH}` }}>
        {diagram.nodes.map((node) => {
          const r = nodeRect(node);
          return (
            <button
              key={node.id}
              type="button"
              className={`arch__node arch__node--${node.kind} ${
                selected === node.id ? "is-selected" : ""
              }`}
              style={{
                left: `${(r.x / VIEW_W) * 100}%`,
                top: `${(r.y / viewH) * 100}%`,
                width: `${(r.w / VIEW_W) * 100}%`,
                height: `${(r.h / viewH) * 100}%`,
              }}
              aria-pressed={selected === node.id}
              onClick={() => setSelected(node.id)}
            >
              {node.label}
            </button>
          );
        })}
      </div>

      <div className="arch__detail" role="status" aria-live="polite">
        {selectedNode && (
          <>
            <p className="arch__detail-label">{selectedNode.label}</p>
            <p className="arch__detail-text">{selectedNode.detail}</p>
          </>
        )}
      </div>
    </div>
  );
}
