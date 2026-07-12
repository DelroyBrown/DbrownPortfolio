import type { Principle } from "../types/content";

export const principles: Principle[] = [
  {
    id: "real-problem",
    title: "Start with the real problem",
    body: "Before choosing components or tools, I define what the software must make easier, safer or more enjoyable.",
  },
  {
    id: "backend-truth",
    title: "Treat the backend as a source of truth",
    body: "For data-heavy applications, important rules belong in dependable application logic rather than only in the interface.",
  },
  {
    id: "systems",
    title: "Build systems, not isolated screens",
    body: "I look for reusable behaviours, clear boundaries and structures that allow a product to grow.",
  },
  {
    id: "ai-deliberate",
    title: "Use AI deliberately",
    body: "I use AI to increase speed and breadth, but I still inspect, test and judge the result.",
  },
  {
    id: "refine",
    title: "Refine the experience",
    body: "Functional is the starting point. I continue until interactions, layout and feedback feel coherent.",
  },
  {
    id: "explain",
    title: "Explain the decisions",
    body: "Good software is easier to trust when the reasoning, constraints and trade-offs are visible.",
  },
];
