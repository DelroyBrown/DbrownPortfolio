import type { CodeExcerpt, GameKey } from "../types/content";
import { generatedExcerpts } from "./codeExcerpts.gen";

/* ------------------------------------------------------------------ *
 *  Code stories. The code itself is generated from the real repos    *
 *  (npm run sync:excerpts); this file adds the editorial layer —     *
 *  what question the code answers, and what the trade-off was.       *
 *  highlightedLines use the original file's line numbers.            *
 * ------------------------------------------------------------------ */

interface ExcerptStory {
  id: string;
  title: string;
  description: string;
  highlightedLines?: number[];
  story: CodeExcerpt["story"];
}

const stories: ExcerptStory[] = [
  {
    id: "pendulum-rope",
    title: "The rope is the game",
    description:
      "The full physics step for the player: gravity, drag, an elastic distance constraint, and the detail everything depends on — outward radial velocity is absorbed, tangential velocity is preserved.",
    highlightedLines: [82, 83, 84, 85, 86, 87],
    story: {
      question:
        "How can a one-button game still create enough control and expressive movement?",
      behaviour:
        "While attached, the player is a point mass on a slightly elastic rope. When the rope over-stretches, most of the excess is pulled back and any outward radial velocity is absorbed — but tangential velocity is left untouched. That preserved tangential component is the swing: energy carries cleanly around the arc, so a well-timed release converts it into exactly the launch the player expects. A gentle assist keeps a hanging player from stalling dead, and everything runs at a fixed 120 Hz.",
      decision:
        "Use a custom rope simulation tuned specifically for momentum, release timing and predictable anchor capture — not a general-purpose physics engine.",
      tradeOff:
        "A broad physics engine would provide collisions, joints and tooling for free, and this bespoke sim provides none of that. But the central mechanic benefits from a smaller deterministic system that can be tuned precisely — every constant in this file is a game-feel decision, not an engine default. For a game that is only a rope, owning the physics was the cheaper trade.",
    },
  },
  {
    id: "pendulum-fixed-step",
    title: "One clock for every machine",
    description:
      "The heart of the update loop: render time is accumulated and the simulation is stepped at a fixed rate, with the glide mechanic and ghost recording hanging off the same clock.",
    highlightedLines: [919, 920, 921, 922, 923, 924, 925, 926, 927, 928],
    story: {
      question:
        "How do you make a physics game feel identical at 30 fps, 60 fps and 144 fps?",
      behaviour:
        "Frame time is added to an accumulator and the simulation consumes it in fixed 1/120 s bites. Latch cooldowns, the hold-to-glide window and ghost recording all advance on simulation time, not render time — so a slow laptop and a 144 Hz monitor produce the same swing from the same input.",
      decision:
        "Decouple simulation time from render time with a classic fixed-step accumulator, and hang every gameplay timer off the simulation clock.",
      tradeOff:
        "Fixed stepping costs a little latency (up to one step of input delay) and needs care around the accumulator on slow frames. Variable stepping would be simpler — but it makes physics frame-rate dependent, which would quietly break ghost racing, daily-seed fairness and the perfect-release window.",
    },
  },
  {
    id: "pendulum-seeded-rng",
    title: "The same cathedral for everyone",
    description:
      "A 32-bit string hash and a mulberry32 generator — the entire source of randomness for world generation, which is what makes daily challenges and reproducible runs possible.",
    highlightedLines: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    story: {
      question:
        "How can a procedurally generated world be shared — so today's daily challenge is the same cathedral for every player?",
      behaviour:
        "Every random decision in world generation flows through one seeded generator. Hash a date string like a fixed salt plus '2026-07-11' into 32 bits, feed it to mulberry32, and generation becomes a pure function of the seed: same seed, same anchors, same biomes, same run.",
      decision:
        "Ban Math.random() from generation entirely and thread a single seeded RNG through every world-building function.",
      tradeOff:
        "Threading an RNG parameter everywhere is more ceremony than calling Math.random(), and one forgotten call silently breaks determinism. In exchange: replayable runs, shareable daily seeds and bug reports that can be reproduced exactly.",
    },
  },
  {
    id: "thread-tension",
    title: "Tension as a single source of truth",
    description:
      "The thread's fixed-timestep update: rope behaviour (no force when slack), self-snugging after hooking, and overload that accumulates before the thread snaps.",
    highlightedLines: [145, 146, 147, 150, 151, 152, 153, 154, 155, 156, 157, 158],
    story: {
      question:
        "How does a stretched constraint read as fabric — slack, taut, straining, snapping — rather than as a rigid rod?",
      behaviour:
        "Each physics step, the thread compares its current length to its rest length. Below rest length, stiffness drops to zero — a slack thread pushes nothing, so it sags and drapes. Above it, spring stiffness returns. The same measurement feeds tension(), a 0–2 signal that drives rendering brightness, shake, particle flow and — sustained above a threshold — snapping. Freshly hooked threads even reel themselves snug.",
      decision:
        "Make tension a first-class computed signal on the thread itself, and let physics, rendering, audio and breakage all read the one number.",
      tradeOff:
        "Toggling stiffness per-step is a hack by physics-engine standards, and a properly simulated segmented rope would look even better. But segmented ropes are expensive and unstable under the loads these puzzles create — one constraint with behavioural stiffness gives 90% of the read at a fraction of the cost, on phone hardware.",
    },
  },
  {
    id: "thread-events",
    title: "A 28-line boundary",
    description:
      "The entire bridge between the game engine and React: a generic, fully typed event emitter. Goals, prompts, collectibles, completion and pause requests all cross here.",
    highlightedLines: [7, 8, 9, 10, 11, 12, 13, 14],
    story: {
      question:
        "How do a Matter.js game loop and a React interface share state without strangling each other?",
      behaviour:
        "The engine emits named events with typed payloads; React components subscribe in effects and set local state. The map type ties every event name to its payload shape, so a typo in an event key or a wrong payload is a compile error, not a runtime mystery. on() returns its own unsubscribe function, which is exactly the shape a React effect cleanup wants.",
      decision:
        "Keep the boundary to a deliberately tiny typed emitter — no shared store, no game objects leaking into props.",
      tradeOff:
        "An emitter means the interface can only know what the engine chooses to announce, and debugging event flow is less direct than reading a store. In exchange the engine is fully testable without React, the interface is replaceable, and neither side can reach into the other's internals — the separation that kept five levels of features from tangling.",
    },
  },
  {
    id: "thread-level-data",
    title: "Levels are data, not code",
    description:
      "The opening of Level 1 — platforms, hooks, thread nodes, objects and goals declared as plain data. The engine reads this; it contains no level-specific logic.",
    highlightedLines: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    story: {
      question:
        "How can many puzzle objects interact without every level becoming a hardcoded chain of special cases?",
      behaviour:
        "A level is one typed object: geometry, hooks, thread nodes, interactive objects, decor, collectibles, goals and an exit. The runtime instantiates reusable systems from it — the folding bridge here is the same FoldingBridge class any level can use, wired to a goal flag by id. Nothing in the engine knows this is 'level one'.",
      decision:
        "Represent levels through declarative data and keep core interactions inside reusable object and thread systems.",
      tradeOff:
        "A data schema is a commitment — every new mechanic needs a declarative shape, which is slower than just writing imperative setup code for one level. The return is that new levels combine existing mechanics without engine changes, and the whole level is reviewable at a glance.",
    },
  },
];

const invaderStories: ExcerptStory[] = [
  {
    id: "invader-glow",
    title: "Neon without the frame-rate bill",
    description:
      "The entire glow system: a 64px radial-gradient sprite is rendered once per colour, cached, and stamped with 'lighter' compositing wherever light is needed.",
    highlightedLines: [7, 8, 9, 13, 14, 15, 16, 19],
    story: {
      question:
        "How does a zero-asset game look like it's made of neon light without melting mobile frame rates?",
      behaviour:
        "Every glowing thing on screen — bullets, engines, explosions, powerups — is the same trick: a small canvas holding a white-cored radial gradient, generated once per hex colour and cached in a Map. Drawing it with additive compositing stacks light the way neon should. A second cache holds soft sprites without the white core for nebulae and ambient glow.",
      decision:
        "Pre-render glow into cached sprites and stamp them with drawImage, instead of using canvas shadowBlur per draw call.",
      tradeOff:
        "shadowBlur gives geometrically exact glows for free — and costs a full blur pass per draw, which collapses on phones with hundreds of glowing entities. A stamped sprite is an approximation (one radius shape, scaled), but drawImage from a cached canvas is one of the fastest paths a 2D context has. At arcade entity counts, exactness lost to approximation is invisible; the frame rate isn't.",
    },
  },
  {
    id: "invader-waves",
    title: "Difficulty is data",
    description:
      "A wave is a timed spawn schedule. Helpers place formations, scatters and swarm streams; the composition — how many of what, arriving when — scales with the wave number in one readable block.",
    highlightedLines: [56, 57, 58, 59, 61, 62, 63, 93, 94, 95, 96, 97, 98, 99],
    story: {
      question:
        "How do fifteen-plus waves stay tuned and readable without becoming fifteen hand-written scripts?",
      behaviour:
        "startWave builds a queue of (time, spawn) entries from three helpers — grid formations, random scatters, alternating swarm streams. Every quantity is a small formula of the wave number: rows and columns grow, shooters and divers unlock at thresholds, elites escort every wave ending in 3 or 8, and a late reinforcement formation keeps pressure on. The update loop just pops entries whose time has come.",
      decision:
        "Represent waves as generated, timed spawn schedules with all composition rules in one function, rather than scripting each wave by hand.",
      tradeOff:
        "Hand-authored waves allow bespoke set-pieces this system can't express — a formula can't choreograph a story moment. In exchange, the whole difficulty curve lives in thirty lines: rebalancing the game is editing thresholds, not fifteen files, and the curve keeps scaling past the last authored wave.",
    },
  },
  {
    id: "invader-kill",
    title: "One kill, the whole arcade loop",
    description:
      "Everything that makes a kill feel right happens in one place: combo and score, scaled explosion juice, splitter children, elite slow-motion — and a pity-floor drop economy.",
    highlightedLines: [573, 574, 575, 576, 577, 578, 579, 580, 581],
    story: {
      question:
        "How does an arcade game stay generous without powerup drops becoming either a flood or a famine?",
      behaviour:
        "Each kill advances the combo (on a three-second fuse), awards multiplied score, and spends visual budget proportional to the victim — bigger enemies get bigger explosions, rings and shake. Splitters burst into children; elites trigger a slow-motion kick and guaranteed drops. Ordinary kills roll for a drop, but a pity counter guarantees one at least every fourteenth kill, so no build is ever starved by bad luck.",
      decision:
        "Centralise the kill consequences in one function and back the random drop economy with an explicit pity floor.",
      tradeOff:
        "Pure randomness is simpler and occasionally showers the player — but its dry streaks read as unfairness at arcade speed. The pity floor adds bookkeeping and caps the excitement of lucky streaks slightly, in exchange for a guaranteed worst case you can tune. The counter resets on elite kills so guaranteed drops and jackpot moments don't stack.",
    },
  },
];

const allStories = [...stories, ...invaderStories];

export const codeExcerpts: CodeExcerpt[] = allStories.map((s) => {
  const gen = generatedExcerpts[s.id];
  if (!gen) {
    throw new Error(
      `No generated code for excerpt "${s.id}" — run \`npm run sync:excerpts\`.`,
    );
  }
  return {
    id: s.id,
    project: gen.project,
    title: s.title,
    description: s.description,
    language: gen.language,
    sourcePath: gen.sourcePath,
    repositoryUrl: gen.repositoryUrl,
    startLine: gen.startLine,
    endLine: gen.endLine,
    highlightedLines: s.highlightedLines,
    code: gen.code,
    story: s.story,
  };
});

export function excerptsFor(project: GameKey): CodeExcerpt[] {
  return codeExcerpts.filter((e) => e.project === project);
}

export function excerptById(id: string): CodeExcerpt | undefined {
  return codeExcerpts.find((e) => e.id === id);
}
