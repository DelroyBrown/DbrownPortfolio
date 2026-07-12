/* ------------------------------------------------------------------ *
 *  GENERATED FILE — do not edit by hand.                              *
 *  Run `npm run sync:excerpts` to refresh from the source repos.     *
 *  Ranges are declared in scripts/excerpts.manifest.json.             *
 * ------------------------------------------------------------------ */

export interface GeneratedExcerpt {
  project: "pendulum" | "thread" | "invader";
  language: string;
  sourcePath: string;
  startLine: number;
  endLine: number;
  repositoryUrl: string;
  code: string;
}

export const generatedExcerpts: Record<string, GeneratedExcerpt> = {
  "pendulum-rope": {
    "project": "pendulum",
    "language": "tsx",
    "sourcePath": "src/game/physics/player.ts",
    "startLine": 51,
    "endLine": 111,
    "repositoryUrl": "https://github.com/DelroyBrown/pendulum/blob/main/src/game/physics/player.ts#L51-L111",
    "code": "  step(dt: number, speedCap: number) {\n    // integrate\n    this.vy += GRAVITY * dt\n    if (this.vy > 1500) this.vy = Math.min(this.vy, 1500 + (this.vy - 1500) * 0.5) // soft terminal velocity\n    const drag = 1 - AIR_DRAG * dt\n    this.vx *= drag\n    this.vy *= drag\n    this.x += this.vx * dt\n    this.y += this.vy * dt\n\n    this.stretch = 0\n    this.tangential = 0\n\n    if (!this.attached) return\n\n    let dx = this.x - this.ropeX\n    let dy = this.y - this.ropeY\n    let d = Math.hypot(dx, dy)\n    if (d < 1e-4) return\n\n    let nx = dx / d\n    let ny = dy / d\n\n    if (d > this.len) {\n      // elastic constraint: pull most of the way back, keep a visible stretch\n      const excess = d - this.len\n      this.stretch = excess / this.len\n      const corr = excess * STRETCH_CORRECT\n      this.x -= nx * corr\n      this.y -= ny * corr\n\n      // absorb outward radial velocity, preserve tangential (this is the swing)\n      const vr = this.vx * nx + this.vy * ny\n      if (vr > 0) {\n        this.vx -= nx * vr * RADIAL_ABSORB\n        this.vy -= ny * vr * RADIAL_ABSORB\n      }\n\n      // recompute normal after correction\n      dx = this.x - this.ropeX\n      dy = this.y - this.ropeY\n      d = Math.hypot(dx, dy)\n      if (d > 1e-4) {\n        nx = dx / d\n        ny = dy / d\n      }\n    }\n\n    // tangent (perpendicular to rope, positive = clockwise = forward at bottom)\n    const tx = -ny\n    const ty = nx\n    this.tangential = this.vx * tx + this.vy * ty\n\n    // gentle energy assist: only while hanging below the anchor and under cap\n    const depth = dy / this.len // 1 = straight down\n    if (depth > ASSIST_MIN_DEPTH && this.speed() < speedCap) {\n      const dir = Math.abs(this.tangential) < 24 ? 1 : Math.sign(this.tangential)\n      this.vx += tx * ASSIST_ACCEL * dir * dt * depth\n      this.vy += ty * ASSIST_ACCEL * dir * dt * depth\n    }\n  }"
  },
  "pendulum-fixed-step": {
    "project": "pendulum",
    "language": "tsx",
    "sourcePath": "src/game/Game.ts",
    "startLine": 911,
    "endLine": 941,
    "repositoryUrl": "https://github.com/DelroyBrown/pendulum/blob/main/src/game/Game.ts#L911-L941",
    "code": "    const dt = rawDt * this.timeScale\n    this.time += dt\n\n    const simRunning = this.alive && (screen === 'playing' || screen === 'menu' || screen === 'settings' || screen === 'stats' || screen === 'credits' || screen === 'gameover')\n\n    if (simRunning && this.mode === 'attract') this.autopilot(dt)\n\n    if (simRunning) {\n      this.acc += dt\n      const speedCap = 1080 + this.combo * 25\n      while (this.acc > STEP) {\n        this.acc -= STEP\n        this.sim.step(STEP, speedCap)\n        this.latchCooldown -= STEP\n        this.sinceRelease += STEP\n        // holding the button past a beat keeps the rope stowed — gliding\n        const gliding = this.input.held && this.sinceRelease > GLIDE_HOLD_S && this.mode !== 'attract'\n        if (!this.sim.attached && !gliding) this.tryLatch()\n      }\n      this.afterSim(dt)\n      this.updateChase(dt)\n      this.updateDrift()\n\n      // ghost: record this run at a fixed sim-time rate\n      if ((this.mode === 'endless' || this.mode === 'daily') && this.alive && this.ghostRec.length < 12000) {\n        this.ghostAcc += dt\n        while (this.ghostAcc >= 1 / GHOST_HZ) {\n          this.ghostAcc -= 1 / GHOST_HZ\n          this.ghostRec.push(Math.round(this.sim.x), Math.round(this.sim.y))\n        }\n      }"
  },
  "pendulum-seeded-rng": {
    "project": "pendulum",
    "language": "tsx",
    "sourcePath": "src/game/core/rng.ts",
    "startLine": 1,
    "endLine": 28,
    "repositoryUrl": "https://github.com/DelroyBrown/pendulum/blob/main/src/game/core/rng.ts#L1-L28",
    "code": "// Seeded deterministic RNG — every run (and the daily challenge) is reproducible from one 32-bit seed.\n\nexport type RNG = () => number\n\nexport function hash32(s: string): number {\n  let h = 0x811c9dc5\n  for (let i = 0; i < s.length; i++) {\n    h ^= s.charCodeAt(i)\n    h = Math.imul(h, 0x01000193)\n  }\n  return h >>> 0\n}\n\nexport function mulberry32(seed: number): RNG {\n  let a = seed >>> 0\n  return () => {\n    a |= 0\n    a = (a + 0x6d2b79f5) | 0\n    let t = Math.imul(a ^ (a >>> 15), 1 | a)\n    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t\n    return ((t ^ (t >>> 14)) >>> 0) / 4294967296\n  }\n}\n\nexport const range = (rng: RNG, a: number, b: number) => a + rng() * (b - a)\nexport const irange = (rng: RNG, a: number, b: number) => Math.floor(range(rng, a, b + 1))\nexport const pick = <T>(rng: RNG, arr: readonly T[]): T => arr[Math.floor(rng() * arr.length) % arr.length]\nexport const chance = (rng: RNG, p: number) => rng() < p"
  },
  "thread-tension": {
    "project": "thread",
    "language": "tsx",
    "sourcePath": "src/game/threads/Thread.ts",
    "startLine": 125,
    "endLine": 183,
    "repositoryUrl": "https://github.com/DelroyBrown/thread/blob/main/src/game/threads/Thread.ts#L125-L183",
    "code": "  /** 0 = slack, 1 = fully stretched (at breaking strain for breakables). */\n  tension(): number {\n    const d = this.currentLength()\n    if (d <= this.restLength) return 0\n    return clamp((d - this.restLength) / Math.max(this.restLength * 0.55, 50), 0, 2)\n  }\n\n  setRestLength(len: number) {\n    this.restLength = clamp(len, this.minLength, this.maxLength)\n    this.constraint.length = this.restLength\n  }\n\n  reel(delta: number) {\n    this.setRestLength(this.restLength + delta)\n  }\n\n  /** Physics-side update; runs on the fixed timestep. */\n  fixedUpdate(dtS: number) {\n    if (!this.alive) return\n\n    // Rope behaviour: zero force when slack, spring back when taut.\n    const d = this.currentLength()\n    this.constraint.stiffness = d < this.restLength * 0.995 ? 0 : this.stiffness\n\n    // Magical self-winding after attaching to a hook.\n    if (this.snugTarget != null && this.restLength > this.snugTarget) {\n      const t = this.tension()\n      if (t < 1.5) {\n        this.setRestLength(this.restLength - 110 * dtS)\n      }\n      if (this.restLength <= this.snugTarget + 0.5) {\n        this.snugTarget = null\n      }\n    }\n\n    // Overload → snap.\n    if (this.breakTension != null) {\n      const t = this.tension()\n      if (t > this.breakTension) {\n        this.overloadTime += dtS\n        if (this.overloadTime > 0.65) this.wantsSnap = true\n      } else {\n        this.overloadTime = Math.max(0, this.overloadTime - dtS * 2)\n      }\n    }\n\n    if (this.pulse > 0) this.pulse = Math.max(0, this.pulse - dtS * 2.4)\n\n    // Hard safety: never let the constraint stretch to absurd lengths.\n    if (d > this.maxLength * 2.5 && 'body' in this.b) {\n      const bodyB = this.b.body\n      const pa = this.getA()\n      const dir = Vector.normalise(Vector.sub(pa, bodyB.position))\n      Body.setVelocity(bodyB, {\n        x: bodyB.velocity.x + dir.x * 2,\n        y: bodyB.velocity.y + dir.y * 2,\n      })\n    }\n  }"
  },
  "thread-events": {
    "project": "thread",
    "language": "tsx",
    "sourcePath": "src/utils/events.ts",
    "startLine": 1,
    "endLine": 28,
    "repositoryUrl": "https://github.com/DelroyBrown/thread/blob/main/src/utils/events.ts#L1-L28",
    "code": "export type Listener<T> = (payload: T) => void\n\n/** Tiny typed event emitter used to bridge game ↔ React. */\nexport class Emitter<M extends Record<string, unknown>> {\n  private listeners = new Map<keyof M, Set<Listener<never>>>()\n\n  on<K extends keyof M>(key: K, fn: Listener<M[K]>): () => void {\n    let set = this.listeners.get(key)\n    if (!set) {\n      set = new Set()\n      this.listeners.set(key, set)\n    }\n    set.add(fn as Listener<never>)\n    return () => this.off(key, fn)\n  }\n\n  off<K extends keyof M>(key: K, fn: Listener<M[K]>) {\n    this.listeners.get(key)?.delete(fn as Listener<never>)\n  }\n\n  emit<K extends keyof M>(key: K, payload: M[K]) {\n    this.listeners.get(key)?.forEach((fn) => (fn as Listener<M[K]>)(payload))\n  }\n\n  clear() {\n    this.listeners.clear()\n  }\n}"
  },
  "thread-level-data": {
    "project": "thread",
    "language": "tsx",
    "sourcePath": "src/data/levels/level1.ts",
    "startLine": 1,
    "endLine": 50,
    "repositoryUrl": "https://github.com/DelroyBrown/thread/blob/main/src/data/levels/level1.ts#L1-L50",
    "code": "import type { LevelData } from './types'\n\n/**\n * Level 1 — The First Thread\n * Teaches: move, jump, grab a thread bead (E), pull to unfold the bridge.\n */\nexport const level1: LevelData = {\n  id: 'first-thread',\n  index: 0,\n  name: 'The First Thread',\n  tagline: 'A little thread can move a lot.',\n  theme: 'meadow',\n  width: 2400,\n  height: 900,\n  spawn: { x: 140, y: 690 },\n  hint: 'Grab the bead with E, then hold Shift to reel it in — the world follows.',\n  killY: 1010,\n\n  platforms: [\n    { x: 380, y: 790, w: 760, h: 120, kind: 'felt' },\n    { x: 1730, y: 790, w: 1340, h: 120, kind: 'felt' },\n    { x: 520, y: 610, w: 130, h: 22, kind: 'cardboard' },\n    { x: 1900, y: 630, w: 150, h: 22, kind: 'wood' },\n  ],\n\n  hooks: [{ id: 'sky-hook', x: 905, y: 500 }],\n\n  nodes: [\n    {\n      id: 'bridge-node',\n      object: 'bridge1',\n      offset: { x: -145, y: 0 },\n      bead: { x: 700, y: 706 },\n      maxLength: 560,\n      respawn: true,\n    },\n  ],\n\n  objects: [\n    { type: 'crate', x: 450, y: 700 },\n    {\n      type: 'foldingBridge',\n      id: 'bridge1',\n      hinge: { x: 1060, y: 740 },\n      length: 310,\n      thickness: 20,\n      foldedAngle: 1.5,\n      flag: 'bridge-down',\n    },\n  ],"
  },
  "invader-glow": {
    "project": "invader",
    "language": "tsx",
    "sourcePath": "src/utils/gfx.ts",
    "startLine": 1,
    "endLine": 31,
    "repositoryUrl": "https://github.com/DelroyBrown/Invader/blob/main/src/utils/gfx.ts#L1-L31",
    "code": "const glowCache = new Map<string, HTMLCanvasElement>();\n\n/**\n * Cached radial glow sprite for a 6-digit hex colour. Drawn with 'lighter'\n * compositing these read as neon light without per-frame shadowBlur cost.\n */\nexport function glowSprite(color: string): HTMLCanvasElement {\n  let c = glowCache.get(color);\n  if (c) return c;\n  c = document.createElement('canvas');\n  c.width = c.height = 64;\n  const g = c.getContext('2d')!;\n  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);\n  grad.addColorStop(0, '#ffffff');\n  grad.addColorStop(0.22, color);\n  grad.addColorStop(1, color + '00');\n  g.fillStyle = grad;\n  g.fillRect(0, 0, 64, 64);\n  glowCache.set(color, c);\n  return c;\n}\n\n/** Draw a glow sprite centred at (x, y) with the given radius. */\nexport function drawGlow(\n  ctx: CanvasRenderingContext2D,\n  x: number, y: number, radius: number, color: string, alpha = 1,\n): void {\n  ctx.globalAlpha = alpha;\n  ctx.drawImage(glowSprite(color), x - radius, y - radius, radius * 2, radius * 2);\n  ctx.globalAlpha = 1;\n}"
  },
  "invader-waves": {
    "project": "invader",
    "language": "tsx",
    "sourcePath": "src/systems/Waves.ts",
    "startLine": 19,
    "endLine": 105,
    "repositoryUrl": "https://github.com/DelroyBrown/Invader/blob/main/src/systems/Waves.ts#L19-L105",
    "code": "  /** Build the timed spawn schedule for a (non-boss) wave. */\n  startWave(n: number, game: Game): void {\n    this.wave = n;\n    this.timer = 0;\n    this.queue = [];\n    const w = game.width;\n\n    const add = (t: number, fn: (g: Game) => void) => this.queue.push({ t, fn });\n\n    const formation = (t0: number, kind: EnemyKind, rows: number, cols: number, y0: number) => {\n      const spacing = Math.min(56, (w - 90) / Math.max(1, cols - 1));\n      const startX = w / 2 - ((cols - 1) * spacing) / 2;\n      for (let r = 0; r < rows; r++) {\n        for (let c = 0; c < cols; c++) {\n          const x = startX + c * spacing;\n          const y = y0 + r * 46;\n          add(t0 + c * 0.07 + r * 0.15, (g) => g.enemies.push(new Enemy(kind, x, y, n)));\n        }\n      }\n    };\n\n    const scatter = (t0: number, kind: EnemyKind, count: number, yMin: number, yMax: number, gap = 0.35) => {\n      for (let i = 0; i < count; i++) {\n        const x = rand(50, w - 50);\n        const y = rand(yMin, yMax);\n        add(t0 + i * gap, (g) => g.enemies.push(new Enemy(kind, x, y, n)));\n      }\n    };\n\n    const swarmStream = (t0: number, count: number) => {\n      for (let i = 0; i < count; i++) {\n        const side = i % 2 === 0 ? 0.25 : 0.75;\n        const x = w * side + rand(-60, 60);\n        add(t0 + i * 0.14, (g) => g.enemies.push(new Enemy('swarm', x, -20 - (i % 4) * 18, n)));\n      }\n    };\n\n    // --- composition scales with wave number ---\n    const rows = clamp(1 + Math.floor(n / 3), 1, 3);\n    const cols = clamp(4 + Math.floor(n / 2), 5, 9);\n    formation(0.4, 'grunt', rows, cols, 80);\n\n    if (n >= 6) {\n      const shields = Math.min(4, Math.floor(n / 3) - 1);\n      scatter(1.2, 'shield', shields, 130, 170, 0.25);\n    }\n    if (n >= 3) {\n      const shooters = Math.min(4, 1 + Math.floor((n - 1) / 3));\n      scatter(2.2, 'shooter', shooters, 140, 230, 0.4);\n    }\n    if (n >= 2) {\n      const divers = Math.min(6, 1 + Math.floor(n / 2));\n      scatter(3.4, 'diver', divers, 60, 110, 0.5);\n    }\n    if (n >= 7) {\n      const bombers = 1 + (n >= 11 ? 1 : 0);\n      for (let i = 0; i < bombers; i++) {\n        const fromLeft = i % 2 === 0;\n        add(4.2 + i * 2, (g) => g.enemies.push(\n          new Enemy('bomber', fromLeft ? -25 : g.width + 25, rand(90, 150), n),\n        ));\n      }\n    }\n    if (n >= 4) {\n      const splitters = Math.min(3, Math.floor(n / 4));\n      scatter(5.2, 'splitter', splitters, 60, 100, 0.6);\n    }\n    if (n >= 4) swarmStream(6.4, 8 + Math.min(n, 12));\n    if (n >= 8) {\n      const lasers = Math.min(3, Math.floor((n - 5) / 3));\n      scatter(7.4, 'laser', lasers, 120, 150, 0.8);\n    }\n\n    // mini-boss escort on the x3 waves\n    if (n % 5 === 3 && n >= 3) {\n      add(8.5, (g) => {\n        g.enemies.push(new Enemy('elite', g.width / 2, 150, n));\n        g.addText(g.width / 2, g.height * 0.35, 'ELITE DETECTED', '#ff5df1', 24);\n        g.audio.bossWarning();\n      });\n    }\n\n    // late reinforcement wave keeps the pressure on\n    if (n >= 5) formation(13, 'grunt', 1, Math.min(7, cols), 70);\n\n    this.queue.sort((a, b) => a.t - b.t);\n  }"
  },
  "invader-kill": {
    "project": "invader",
    "language": "tsx",
    "sourcePath": "src/Game.ts",
    "startLine": 548,
    "endLine": 582,
    "repositoryUrl": "https://github.com/DelroyBrown/Invader/blob/main/src/Game.ts#L548-L582",
    "code": "  killEnemy(e: Enemy): void {\n    if (e.dead) return;\n    e.dead = true;\n    this.kills++;\n    this.combo++;\n    this.comboTimer = 3;\n    this.maxCombo = Math.max(this.maxCombo, this.combo);\n    this.addScore(e.score, e.x, e.y);\n\n    const big = e.r >= 18;\n    this.particles.explosion(e.x, e.y, e.color, big ? 40 : 22, big ? 320 : 230, big ? 4 : 3);\n    if (big) this.particles.ring(e.x, e.y, e.color, 420);\n    this.shake(clamp(2 + e.r * 0.15, 2, 9));\n    this.audio.explosion(e.kind === 'elite' ? 2 : big ? 1 : 0);\n\n    if (e.kind === 'splitter') {\n      for (let i = 0; i < 3; i++) {\n        this.enemies.push(new Enemy('mini', e.x + (i - 1) * 22, e.y + rand(-8, 8), this.wave));\n      }\n    }\n    if (e.kind === 'elite') {\n      this.cineSlow = 0.25;\n      this.particles.ring(e.x, e.y, '#ffffff', 650);\n      for (let i = 0; i < 2; i++) this.powerups.push(new PowerUp(e.x + (i - 0.5) * 44, e.y));\n      this.dropPity = 0;\n    } else {\n      // generous drops with a pity floor so a build is never starved\n      this.dropPity++;\n      const small = e.kind === 'swarm' || e.kind === 'mini';\n      if (Math.random() < (small ? 0.07 : 0.18) || this.dropPity >= 14) {\n        this.powerups.push(new PowerUp(e.x, e.y));\n        this.dropPity = 0;\n      }\n    }\n  }"
  }
};
