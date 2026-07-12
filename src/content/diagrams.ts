import type { ArchitectureDiagramData } from "../types/content";

/* Layout grid: x/y are cells on a 12-column grid; w is column span. */

export const pendulumDiagram: ArchitectureDiagramData = {
  id: "pendulum-architecture",
  title: "Pendulum — system architecture",
  nodes: [
    {
      id: "react",
      label: "React Interface",
      detail:
        "Menus, HUD, settings and stats. Renders from store snapshots — it never reaches into the simulation.",
      x: 3,
      y: 0,
      w: 6,
      kind: "interface",
    },
    {
      id: "store",
      label: "Observable State Store",
      detail:
        "A small subscribe/snapshot store that bridges the game and React. The game writes, the interface reads.",
      x: 3,
      y: 1,
      w: 6,
      kind: "bridge",
    },
    {
      id: "orchestrator",
      label: "Game Orchestrator",
      detail:
        "Owns the fixed-step loop, screens, scoring, lives and mode logic. Everything below is a subsystem it conducts.",
      x: 3,
      y: 2,
      w: 6,
      kind: "core",
    },
    {
      id: "physics",
      label: "Custom Rope Physics",
      detail:
        "A purpose-built point-mass rope simulation at 120 Hz — deterministic swings, preserved momentum, precise feel.",
      x: 0,
      y: 3,
      w: 4,
      kind: "system",
    },
    {
      id: "world",
      label: "Procedural World Generator",
      detail:
        "Builds the cathedral — anchors, geometry, biomes, decor — from a single 32-bit seed.",
      x: 4,
      y: 3,
      w: 4,
      kind: "system",
    },
    {
      id: "camera",
      label: "Camera",
      detail: "Momentum-aware framing, zoom pulses and screen shake within accessibility limits.",
      x: 8,
      y: 3,
      w: 4,
      kind: "system",
    },
    {
      id: "fx",
      label: "Effects & Lighting",
      detail:
        "Dynamic light, fog, weather and particles with an adaptive budget driven by real frame timings.",
      x: 0,
      y: 4,
      w: 4,
      kind: "system",
    },
    {
      id: "audio",
      label: "Adaptive Audio",
      detail:
        "Synthesised Web Audio — wind, creaks and chimes respond to speed, stretch and combo.",
      x: 4,
      y: 4,
      w: 4,
      kind: "system",
    },
    {
      id: "persistence",
      label: "Persistence & Statistics",
      detail: "Local bests, ghosts, settings and daily-challenge history.",
      x: 8,
      y: 4,
      w: 4,
      kind: "system",
    },
  ],
  edges: [
    { from: "react", to: "store", bidirectional: true },
    { from: "store", to: "orchestrator", bidirectional: true },
    { from: "orchestrator", to: "physics" },
    { from: "orchestrator", to: "world" },
    { from: "orchestrator", to: "camera" },
    { from: "orchestrator", to: "fx" },
    { from: "orchestrator", to: "audio" },
    { from: "orchestrator", to: "persistence" },
  ],
};

export const invaderDiagram: ArchitectureDiagramData = {
  id: "invader-architecture",
  title: "Invader Storm — system architecture",
  nodes: [
    {
      id: "canvas",
      label: "HTML5 Canvas — no framework",
      detail:
        "One canvas, one bootstrap file, zero runtime dependencies. Every pixel on screen is drawn with canvas primitives.",
      x: 3,
      y: 0,
      w: 6,
      kind: "interface",
    },
    {
      id: "game",
      label: "Game — state machine & loop",
      detail:
        "Owns the screens (menu, tutorial, playing, boss intro, wave clear, game over), the frame loop, scoring, combos and the juice budget.",
      x: 3,
      y: 1,
      w: 6,
      kind: "core",
    },
    {
      id: "entities",
      label: "Entities",
      detail:
        "Player, 8 enemy kinds, 3 multi-phase bosses, bullets and powerups — plain classes updated and drawn by the loop.",
      x: 0,
      y: 2,
      w: 4,
      kind: "system",
    },
    {
      id: "waves",
      label: "Wave Manager",
      detail:
        "Waves are timed spawn schedules generated from the wave number — the whole difficulty curve lives in one function.",
      x: 4,
      y: 2,
      w: 4,
      kind: "system",
    },
    {
      id: "collision",
      label: "Collision",
      detail: "Circle-based collision between bullets, entities and the player, tuned for arcade fairness.",
      x: 8,
      y: 2,
      w: 4,
      kind: "system",
    },
    {
      id: "input",
      label: "Input",
      detail:
        "Keyboard on desktop; on touch, relative drag steering — the ship mirrors amplified finger movement with auto-fire always on.",
      x: 0,
      y: 3,
      w: 4,
      kind: "system",
    },
    {
      id: "fx",
      label: "Particles & Juice",
      detail:
        "Explosions, shockwave rings, screen shake, hit flashes and slow-motion kicks — drawn from cached glow sprites.",
      x: 4,
      y: 3,
      w: 4,
      kind: "system",
    },
    {
      id: "audio",
      label: "Synthesised Audio",
      detail:
        "Every sound effect and the procedural synthwave soundtrack are generated live with Web Audio through a compressor and delay bus.",
      x: 8,
      y: 3,
      w: 4,
      kind: "system",
    },
    {
      id: "hud",
      label: "HUD",
      detail: "Score, hull, boss bar, buffs and the touch buttons — drawn on the same canvas.",
      x: 0,
      y: 4,
      w: 4,
      kind: "system",
    },
    {
      id: "gfx",
      label: "Glow Sprite Cache",
      detail:
        "Radial glow sprites rendered once per colour and stamped with additive compositing — neon without per-frame shadowBlur.",
      x: 4,
      y: 4,
      w: 4,
      kind: "system",
    },
    {
      id: "storage",
      label: "Storage",
      detail: "High scores and settings persisted in localStorage.",
      x: 8,
      y: 4,
      w: 4,
      kind: "system",
    },
  ],
  edges: [
    { from: "canvas", to: "game", bidirectional: true },
    { from: "game", to: "entities" },
    { from: "game", to: "waves" },
    { from: "game", to: "collision" },
    { from: "game", to: "input" },
    { from: "game", to: "fx" },
    { from: "game", to: "audio" },
    { from: "game", to: "hud" },
    { from: "game", to: "gfx" },
    { from: "game", to: "storage" },
  ],
};

export const threadDiagram: ArchitectureDiagramData = {
  id: "thread-architecture",
  title: "Thread — system architecture",
  nodes: [
    {
      id: "react",
      label: "React Interface",
      detail:
        "Title, HUD, menus, settings and touch controls — plain React components that know nothing about physics.",
      x: 3,
      y: 0,
      w: 6,
      kind: "interface",
    },
    {
      id: "events",
      label: "Typed Event Layer",
      detail:
        "A tiny generic emitter carries goals, prompts, collectibles, completion and pause requests across the boundary — fully typed in both directions.",
      x: 3,
      y: 1,
      w: 6,
      kind: "bridge",
    },
    {
      id: "runtime",
      label: "Game Runtime",
      detail:
        "Boots a level from data, steps physics on a fixed timestep and coordinates every object system.",
      x: 3,
      y: 2,
      w: 6,
      kind: "core",
    },
    {
      id: "levels",
      label: "Declarative Level Data",
      detail:
        "Levels are data files — platforms, hooks, thread nodes, goals — not hardcoded engine branches.",
      x: 0,
      y: 3,
      w: 4,
      kind: "system",
    },
    {
      id: "physics",
      label: "Matter.js Physics",
      detail:
        "Rigid bodies, collisions and constraints, with custom behaviours (pulleys, buoyancy, kinematic platforms) layered on top.",
      x: 4,
      y: 3,
      w: 4,
      kind: "system",
    },
    {
      id: "threads",
      label: "Thread System",
      detail:
        "Rope-mode constraints with live tension, endpoint migration, self-snugging and overload snapping.",
      x: 8,
      y: 3,
      w: 4,
      kind: "system",
    },
    {
      id: "objects",
      label: "Interactive Objects",
      detail:
        "Bridges, lanterns, balloons, bells, pulleys, plates — reusable systems that levels compose freely.",
      x: 0,
      y: 4,
      w: 4,
      kind: "system",
    },
    {
      id: "camera",
      label: "Camera & Effects",
      detail: "Soft-follow camera, parallax background, particles travelling along loaded threads.",
      x: 4,
      y: 4,
      w: 4,
      kind: "system",
    },
    {
      id: "audio",
      label: "Synthesised Audio",
      detail: "Web Audio instruments for creaks, bells, snips and ambience — no sample files.",
      x: 8,
      y: 4,
      w: 4,
      kind: "system",
    },
  ],
  edges: [
    { from: "react", to: "events", bidirectional: true },
    { from: "events", to: "runtime", bidirectional: true },
    { from: "runtime", to: "levels" },
    { from: "runtime", to: "physics" },
    { from: "runtime", to: "threads" },
    { from: "runtime", to: "objects" },
    { from: "runtime", to: "camera" },
    { from: "runtime", to: "audio" },
  ],
};
