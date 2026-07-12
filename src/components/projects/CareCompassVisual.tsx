import "./projects.css";

/**
 * CareCompass has no public screenshots (care data is sensitive), so its
 * visual identity is an animated blueprint: a record entering validation,
 * then joining an append-only audit history.
 */
export function CareCompassVisual() {
  return (
    <svg
      className="care-visual"
      viewBox="0 0 640 380"
      role="img"
      aria-label="Blueprint diagram: a care record passes through validation and permissions into an append-only audit history."
    >
      <defs>
        <linearGradient id="care-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(127,184,164,0.14)" />
          <stop offset="1" stopColor="rgba(127,184,164,0)" />
        </linearGradient>
      </defs>

      {/* grid */}
      {Array.from({ length: 7 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={40 + i * 94}
          y1="20"
          x2={40 + i * 94}
          y2="360"
          className="care-visual__grid"
        />
      ))}

      {/* record card */}
      <g className="care-visual__node" style={{ animationDelay: "0.1s" }}>
        <rect x="46" y="60" width="160" height="92" rx="8" className="care-visual__box" />
        <text x="66" y="88" className="care-visual__label">
          daily log entry
        </text>
        <line x1="66" y1="104" x2="186" y2="104" className="care-visual__ink" />
        <line x1="66" y1="118" x2="166" y2="118" className="care-visual__ink" />
        <line x1="66" y1="132" x2="176" y2="132" className="care-visual__ink" />
      </g>

      {/* validation gate */}
      <g className="care-visual__node" style={{ animationDelay: "0.35s" }}>
        <rect x="266" y="48" width="150" height="52" rx="8" className="care-visual__box care-visual__box--accent" />
        <text x="286" y="79" className="care-visual__label care-visual__label--accent">
          validation
        </text>
        <rect x="266" y="112" width="150" height="52" rx="8" className="care-visual__box care-visual__box--accent" />
        <text x="286" y="143" className="care-visual__label care-visual__label--accent">
          permissions
        </text>
      </g>

      {/* audit history */}
      <g className="care-visual__node" style={{ animationDelay: "0.6s" }}>
        <rect x="476" y="44" width="130" height="34" rx="6" className="care-visual__box" />
        <rect x="476" y="86" width="130" height="34" rx="6" className="care-visual__box" />
        <rect x="476" y="128" width="130" height="34" rx="6" className="care-visual__box care-visual__box--new" />
        <text x="492" y="66" className="care-visual__small">
          v1 · 06:42 · KM
        </text>
        <text x="492" y="108" className="care-visual__small">
          v2 · 07:15 · KM
        </text>
        <text x="492" y="150" className="care-visual__small care-visual__small--accent">
          v3 · 07:31 · late entry
        </text>
      </g>

      {/* flow lines */}
      <path d="M206,106 C236,106 236,74 266,74" className="care-visual__flow" />
      <path d="M206,106 C236,106 236,138 266,138" className="care-visual__flow" />
      <path d="M416,74 C446,74 446,61 476,61" className="care-visual__flow" />
      <path d="M416,138 C446,138 446,145 476,145" className="care-visual__flow" />

      {/* baseline caption */}
      <rect x="46" y="220" width="560" height="120" rx="10" fill="url(#care-fade)" />
      <text x="66" y="252" className="care-visual__caption-title">
        Records are corrected, never rewritten.
      </text>
      <text x="66" y="280" className="care-visual__caption">
        Every change keeps its author, time and previous value.
      </text>
      <text x="66" y="302" className="care-visual__caption">
        Late entries are allowed — flagged and attributed, not backdated.
      </text>
      <text x="66" y="324" className="care-visual__caption">
        No client can write a record the API would not accept.
      </text>
    </svg>
  );
}
