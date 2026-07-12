import type { GameProject, Project } from "../types/content";
import { withBase } from "../utils/paths";

/* ------------------------------------------------------------------ *
 *  All project content lives here. To add a project, copy the        *
 *  template at the bottom of this file, fill it in, and (optionally) *
 *  drop imagery into /public/projects/<slug>/.                       *
 * ------------------------------------------------------------------ */

export const careCompass: Project = {
  slug: "care-compass",
  title: "CareCompass",
  shortDescription:
    "A residential children's care-records platform built backend-first around accuracy, accountability and audit history.",
  fullDescription:
    "CareCompass is a full-stack care-records platform designed around accurate records, staff accountability, safety-critical workflows and transparent audit history. Residential children's care generates records that genuinely matter — daily logs, incidents, medication administration — so the system is built backend-first: the rules that keep records trustworthy live in validated, permission-aware application logic rather than in the interface.",
  category: "Care-sector platform",
  year: "Ongoing",
  role: "Design, architecture & full-stack build",
  status: "In active development",
  technologies: [
    "Django",
    "Django REST Framework",
    "React",
    "SQL",
    "JWT authentication",
    "Backend validation",
    "Historical audit records",
    "Permission-aware APIs",
    "Testing",
  ],
  keyFeatures: [
    "Resident records and care plans",
    "Shift and daily logs",
    "Incident reporting and follow-up",
    "Medication administration records",
    "Late-entry controls",
    "Manager oversight and audit history",
    "Reporting and exports",
    "Role-based access",
  ],
  engineeringChallenges: [
    "Records that can be corrected but never silently rewritten — every change keeps its history",
    "Late entries allowed, but flagged and attributed rather than backdated invisibly",
    "Permissions that follow real staff responsibilities instead of a flat admin/user split",
    "Validation that lives in the API layer, so no client can write an invalid record",
  ],
  outcomes: [
    "A working platform where the audit trail is a first-class feature, not an afterthought",
    "An API surface that enforces the same rules for every client",
    "A foundation designed to grow into rotas, handovers and richer reporting",
  ],
  image: withBase("projects/care-compass/cover.svg"),
  imageAlt:
    "Abstract system diagram for CareCompass: records, validation and audit layers connected by fine lines.",
  gallery: [],
  featured: true,
  aiAssisted: true,
  accent: "var(--care-accent)",
};

export const pendulum: GameProject = {
  slug: "pendulum",
  title: "Pendulum",
  subtitle: "A one-button physics platformer about timing, momentum and escape.",
  shortDescription:
    "A one-button physics platformer about timing, momentum and escape, set in an enormous collapsing cathedral.",
  fullDescription:
    "The player is permanently attached to a swinging rope while travelling through an enormous collapsing cathedral. The main action is release: the rope automatically catches the next anchor, turning timing and momentum into the core of the experience. Everything on screen — stone, glass, light, weather — is procedurally generated rather than drawn from conventional image assets.",
  category: "Browser game · physics",
  year: "2025",
  role: "Direction, systems design & AI-assisted build",
  status: "Live",
  technologies: [
    "React",
    "TypeScript",
    "Vite",
    "PixiJS",
    "GSAP",
    "Custom rope physics",
    "Fixed-step simulation",
    "Procedural world generation",
    "Seeded daily challenges",
    "Generated pixel-art textures",
    "Synthesised Web Audio",
    "Adaptive particles & effects",
    "PWA support",
    "Touch & controller support",
    "Accessibility settings",
    "Performance mode",
  ],
  keyFeatures: [
    "One-button release mechanic — the rope catches the next anchor automatically",
    "Holding the input keeps the rope stowed for long glides",
    "A golden perfect-release timing window that rewards momentum",
    "Momentum-based combos and a flow-state presentation",
    "Ghost racing against your own best run",
    "Seeded daily challenge — the same cathedral for everyone, every day",
    "Sandbox mode and multiple cathedral biomes",
    "Dynamic lighting, fog, particles and weather",
    "Progressive environmental collapse chasing the player",
    "Three-life run structure",
  ],
  experienceDetails: [
    "Release with Space, click or tap — one input carries the whole game",
    "Perfect releases multiply score and add speed",
    "The cathedral collapses behind you; hesitation is fatal",
  ],
  engineeringChallenges: [
    "A custom rope simulation instead of a general-purpose physics engine — deterministic swing behaviour, momentum preservation and precise game feel were easier to guarantee in a small, purpose-built system",
    "A fixed 120 Hz simulation step so the game feels identical on every machine and frame rate",
    "Procedural generation seeded from a single 32-bit hash, making daily challenges reproducible",
    "An adaptive particle budget that watches real frame timings and scales effects down before the game stutters",
  ],
  outcomes: [
    "A complete, playable game shipped to GitHub Pages as a PWA",
    "Deterministic physics that make ghost racing and daily seeds possible",
    "Every texture generated in code — the repository contains no drawn image assets",
  ],
  image: withBase("projects/pendulum/cover.webp"),
  imageAlt:
    "Pendulum gameplay: a small figure swings on a rope through a vast moonlit cathedral interior.",
  gallery: [withBase("projects/pendulum/gameplay.webp")],
  liveUrl: "https://delroybrown.github.io/pendulum/",
  repositoryUrl: "https://github.com/DelroyBrown/pendulum",
  embedUrl: "https://delroybrown.github.io/pendulum/",
  controlHint:
    "Release with Space, click or tap. Hold after release to delay the next catch.",
  featured: true,
  aiAssisted: true,
  accent: "var(--pendulum-a)",
  codeExcerptIds: ["pendulum-rope", "pendulum-fixed-step", "pendulum-seeded-rng"],
  aiAssistanceNote:
    "Pendulum was produced through an AI-assisted development workflow. I directed the product vision, mechanics, technical priorities, visual standard and iterative changes. AI accelerated implementation, exploration and refactoring, while I reviewed the behaviour, tested the results, challenged weak decisions and kept refining until the game matched the intended experience.",
  directed: [
    "The one-button concept and the feel of a perfect release",
    "Cathedral setting, palette and procedural-art direction",
    "Feature priorities: daily seeds, ghosts, flow state",
    "Performance targets for low-end and mobile devices",
    "The acceptance bar — when swing feel was actually right",
  ],
  judgement: [
    "Choosing a purpose-built rope simulation over a physics engine",
    "Catching regressions in swing feel after physics changes",
    "Rejecting implementations that ran correctly but felt wrong",
    "Deciding when effects should yield to frame rate",
  ],
  accelerated: [
    "Initial PixiJS and state-store scaffolding",
    "Candidate implementations of generation and lighting systems",
    "Refactors that touched many interconnected files",
    "Tracing behavioural bugs across the simulation",
  ],
};

export const thread: GameProject = {
  slug: "thread",
  title: "Thread",
  subtitle: "A handmade physics puzzle-platformer set in the Loomlands.",
  shortDescription:
    "A handmade physics puzzle-platformer where glowing threads pull bridges, lift platforms and wake machinery.",
  fullDescription:
    "The player controls Patch, a stitched-fabric adventurer who manipulates glowing threads connecting the world. Threads can pull bridges, operate counterweights, lift platforms, wake machinery and transform the environment. The game engine remains separate from the React interface: a typed event layer communicates goals, prompts, collectibles, completion states and pause requests, while levels are defined as data rather than hardcoded engine branches.",
  category: "Browser game · puzzle physics",
  year: "2025",
  role: "Direction, systems design & AI-assisted build",
  status: "Live",
  technologies: [
    "React",
    "TypeScript",
    "Vite",
    "PixiJS",
    "Matter.js",
    "Tailwind CSS",
    "Framer Motion",
    "Web Audio API",
    "Data-driven level definitions",
    "Typed event communication",
    "Procedural game rendering",
    "Matter.js constraints",
    "Custom pulley behaviour",
    "Buoyancy",
    "Kinematic platforms",
    "Touch controls",
    "Accessibility options",
    "Persistent local progress",
  ],
  keyFeatures: [
    "Grab thread beads and tie threads to hooks",
    "Snip threads and reel them inward",
    "Use lanterns as counterweights and balloons to lift planks",
    "Activate bells and machinery",
    "Solve connection-based environmental puzzles",
    "Discover optional Lost Buttons",
    "Play across five designed levels",
  ],
  experienceDetails: [
    "Threads slacken, tense, brighten and can snap under load",
    "Thread endpoints migrate between objects, the player and hooks",
    "Glowing particles travel along loaded threads",
  ],
  engineeringChallenges: [
    "Rope-like constraints on top of Matter.js — zero stiffness when slack, spring behaviour when taut — so threads read as fabric, not rods",
    "Endpoint migration: a thread's end can move between a bead, the player's hands and a hook without rebuilding the puzzle state",
    "Tension as a first-class signal — it drives rendering, audio, particle flow and breakage from one number",
    "Declarative level data, so five levels combine the same object systems instead of five hardcoded branches",
  ],
  outcomes: [
    "Five complete levels shipped to GitHub Pages",
    "An engine/interface split where React never reaches into the simulation",
    "New puzzle objects compose with threads without touching existing levels",
  ],
  image: withBase("projects/thread/cover.webp"),
  imageAlt:
    "Thread gameplay: Patch, a stitched-fabric character, stands in a handcrafted meadow scene connected by glowing threads.",
  gallery: [withBase("projects/thread/gameplay.webp")],
  liveUrl: "https://delroybrown.github.io/thread/",
  repositoryUrl: "https://github.com/DelroyBrown/thread",
  embedUrl: "https://delroybrown.github.io/thread/",
  controlHint:
    "Move with A/D or arrows. Jump with Space. Use E, F, Q and Shift to manipulate threads.",
  orientationHint:
    "Thread plays best in landscape — rotate your phone or use fullscreen.",
  featured: true,
  aiAssisted: true,
  accent: "var(--thread-cyan)",
  codeExcerptIds: ["thread-tension", "thread-events", "thread-level-data"],
  aiAssistanceNote:
    "Thread was produced through an AI-assisted development workflow. I directed the product vision, the puzzle mechanics, the handcrafted visual standard and every iteration. AI accelerated implementation, exploration and refactoring, while I reviewed behaviour, tested the puzzles, challenged weak decisions and refined the game until it matched the intended experience.",
  directed: [
    "The thread-manipulation concept and puzzle vocabulary",
    "The handcrafted fabric-and-paper visual direction",
    "Level pacing and what each level teaches",
    "Touch controls and landscape phone expectations",
    "The acceptance bar for puzzle readability",
  ],
  judgement: [
    "Keeping the engine and React strictly separated",
    "Reviewing how object systems interact under constraint load",
    "Testing puzzle edge cases the generator of a solution never sees",
    "Simplifying mechanics that were clever but unreadable",
  ],
  accelerated: [
    "Scaffolding the object and level runtime systems",
    "Candidate pulley, buoyancy and bridge implementations",
    "Multi-file refactors across objects and rendering",
    "Drafting the typed event layer and save system",
  ],
};

export const invaderStorm: GameProject = {
  slug: "invader-storm",
  title: "Invader Storm",
  subtitle: "A neon arcade shooter built from canvas primitives and synthesised sound.",
  shortDescription:
    "A fast, neon-soaked arcade shooter — Space Invaders DNA with light bullet-hell patterns, built with zero runtime dependencies.",
  fullDescription:
    "Neon Void: Invader Storm is a fast browser arcade shooter — Space Invaders DNA crossed with modern arcade juice and light bullet-hell patterns. It is built in TypeScript on the raw HTML5 canvas with zero runtime dependencies: every sprite is drawn with canvas primitives, every sound is synthesised live with Web Audio, and the soundtrack is procedural synthwave running through a compressor and delay bus. No frameworks, no image files, no audio files.",
  category: "Browser game · arcade",
  year: "2026",
  role: "Direction, systems design & AI-assisted build",
  status: "Live",
  technologies: [
    "TypeScript",
    "Vite",
    "HTML5 Canvas",
    "Zero runtime dependencies",
    "Canvas-primitive rendering",
    "Cached glow sprites",
    "Synthesised Web Audio",
    "Procedural synthwave soundtrack",
    "Data-driven wave scheduling",
    "Touch controls with haptics",
    "localStorage persistence",
    "Responsive canvas",
  ],
  keyFeatures: [
    "8 weapons, each with 3 upgrade levels",
    "9 powerups with generous drop rates, a pity system and supply drops",
    "8 enemy types plus elite mini-bosses",
    "3 multi-phase bosses on a 5-wave cycle, with telegraphed attacks and weak points",
    "Combo-multiplier scoring with perfect-wave and speed bonuses",
    "Particle explosions, shockwaves, screen shake and slow-motion kicks",
    "Relative drag steering with auto-fire on mobile",
    "High scores persisted locally",
  ],
  experienceDetails: [
    "Kill chains build a combo multiplier — hesitate and it decays",
    "Dash through danger with brief invincibility; clear the screen with a nova bomb",
    "On phones the ship mirrors your finger, so your thumb never covers the action",
  ],
  engineeringChallenges: [
    "Zero-dependency rendering — the neon look comes from cached radial glow sprites drawn with 'lighter' compositing, not per-frame shadowBlur, which would melt mobile frame rates",
    "Waves are data, not code paths — each wave builds a timed spawn schedule whose composition scales with the wave number, so difficulty is tuned in one place",
    "An arcade drop economy with a pity floor, so a run is never starved of powerups by bad luck",
    "Relative drag steering for touch — the ship mirrors amplified finger movement instead of sitting under it",
  ],
  outcomes: [
    "A complete arcade game shipped to GitHub Pages, playable on desktop and mobile",
    "A repository containing no image or audio assets — everything is generated in code",
    "One TypeScript codebase with no runtime dependencies at all",
  ],
  image: withBase("projects/invader-storm/cover.webp"),
  imageAlt:
    "Invader Storm gameplay: a neon ship fires glowing shots at formations of alien invaders over a starfield.",
  gallery: [withBase("projects/invader-storm/gameplay.webp")],
  liveUrl: "https://delroybrown.github.io/Invader/",
  repositoryUrl: "https://github.com/DelroyBrown/Invader",
  embedUrl: "https://delroybrown.github.io/Invader/",
  controlHint:
    "Move with WASD or arrows. Fire with Space. Shift to dash, B for a nova bomb.",
  featured: true,
  aiAssisted: true,
  accent: "var(--invader-magenta)",
  codeExcerptIds: ["invader-glow", "invader-waves", "invader-kill"],
  aiAssistanceNote:
    "Invader Storm was produced through an AI-assisted development workflow. I directed the arcade feel, the weapon and enemy roster, the difficulty curve and the zero-asset constraint. AI accelerated implementation, exploration and refactoring, while I played the builds, tested the results, challenged weak decisions and kept refining until the game matched the intended experience.",
  directed: [
    "The neon-arcade concept and the zero-asset constraint",
    "Weapon, powerup and enemy roster priorities",
    "The difficulty curve and boss cycle pacing",
    "Mobile control expectations — drag steering, auto-fire",
    "The acceptance bar for game feel and juice",
  ],
  judgement: [
    "Choosing cached glow sprites over per-frame shadow effects",
    "Keeping wave composition in one data-driven schedule",
    "Tuning the pity-floor drop economy by playing, not by theory",
    "Rejecting mechanics that read badly at arcade speed",
  ],
  accelerated: [
    "Scaffolding the entity and system structure",
    "Candidate implementations of weapons, enemies and bosses",
    "The synthesised audio and soundtrack bus",
    "Refactors across the entity roster",
  ],
};

export const portfolioSite: Project = {
  slug: "portfolio",
  title: "This Portfolio",
  shortDescription:
    "The site you are reading — an interactive exhibition built with the same workflow it describes.",
  fullDescription:
    "This portfolio is itself a demonstration piece: content-driven architecture, a custom motion system on GSAP and Lenis, playable game embeds that load only on interaction, real code excerpts synced from the source repositories by script, and screenshots captured from the live games by Playwright. It is built with the same AI-assisted, judgement-heavy workflow it documents.",
  category: "Interactive portfolio",
  year: "2026",
  role: "Design, build & content system",
  status: "Live",
  technologies: [
    "React",
    "TypeScript",
    "Vite",
    "GSAP + ScrollTrigger",
    "Lenis",
    "Canvas rendering",
    "Playwright automation",
    "Vitest",
    "GitHub Actions",
  ],
  keyFeatures: [
    "Content lives in typed data files, not components",
    "Games embed on demand and tear down cleanly",
    "Code excerpts are pulled from the real repositories by script",
    "Reduced-motion users get a complete, polished experience",
  ],
  engineeringChallenges: [
    "Making heavy visuals coexist with strict performance budgets",
    "A reveal/motion system that degrades gracefully to zero animation",
  ],
  outcomes: ["The site itself — view source on GitHub"],
  image: withBase("projects/portfolio/cover.svg"),
  imageAlt: "Wireframe composition of this portfolio's hero section.",
  gallery: [],
  repositoryUrl: "https://github.com/DelroyBrown",
  featured: false,
  aiAssisted: true,
  accent: "var(--gold)",
};

export const projects: Project[] = [
  careCompass,
  pendulum,
  thread,
  invaderStorm,
  portfolioSite,
];
export const games: GameProject[] = [pendulum, thread, invaderStorm];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function gameBySlug(slug: string): GameProject | undefined {
  return games.find((g) => g.slug === slug);
}

/* ------------------------------------------------------------------ *
 *  Template for a new project — copy, fill in, add to `projects`.    *
 *
 *  export const myProject: Project = {
 *    slug: "my-project",
 *    title: "My Project",
 *    shortDescription: "One sentence for the index.",
 *    fullDescription: "A paragraph for the case study.",
 *    category: "Web application",
 *    year: "2026",
 *    role: "Full-stack build",
 *    status: "In development",
 *    technologies: ["..."],
 *    keyFeatures: ["..."],
 *    engineeringChallenges: ["..."],
 *    outcomes: ["..."],
 *    image: withBase("projects/my-project/cover.webp"),
 *    imageAlt: "Describe the image for screen readers.",
 *    gallery: [],
 *    liveUrl: undefined,
 *    repositoryUrl: undefined,
 *    featured: false,
 *    aiAssisted: false,
 *    accent: "var(--cyan)",
 *  };
 * ------------------------------------------------------------------ */
