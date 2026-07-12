import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { CodeExcerpt } from "../../types/content";
import { CodeViewer } from "./CodeViewer";
import "./code.css";

const TABS = ["Code", "Behaviour", "Decision", "Trade-off"] as const;
type Tab = (typeof TABS)[number];

interface CodeStoryProps {
  excerpt: CodeExcerpt;
  accent?: string;
}

/**
 * A code excerpt told as an engineering story: the question it answers,
 * then Code / Behaviour / Decision / Trade-off views behind an
 * accessible tablist.
 */
export function CodeStory({ excerpt, accent }: CodeStoryProps) {
  const [tab, setTab] = useState<Tab>("Code");
  const baseId = useId();
  const tabRefs = useRef<Map<Tab, HTMLButtonElement>>(new Map());

  const onKeyDown = (e: KeyboardEvent) => {
    const idx = TABS.indexOf(tab);
    let next: Tab | null = null;
    if (e.key === "ArrowRight") next = TABS[(idx + 1) % TABS.length];
    if (e.key === "ArrowLeft") next = TABS[(idx - 1 + TABS.length) % TABS.length];
    if (e.key === "Home") next = TABS[0];
    if (e.key === "End") next = TABS[TABS.length - 1];
    if (next) {
      e.preventDefault();
      setTab(next);
      tabRefs.current.get(next)?.focus();
    }
  };

  const storyText: Record<Exclude<Tab, "Code">, string> = {
    Behaviour: excerpt.story.behaviour,
    Decision: excerpt.story.decision,
    "Trade-off": excerpt.story.tradeOff,
  };

  return (
    <article
      className="code-story"
      style={accent ? { ["--accent" as string]: accent } : undefined}
      aria-label={`Code story: ${excerpt.title}`}
    >
      <header className="code-story__head">
        <h4 className="code-story__title">{excerpt.title}</h4>
        <p className="code-story__question">
          <span>Engineering question —</span> {excerpt.story.question}
        </p>
        <p className="code-story__desc">{excerpt.description}</p>
      </header>

      <div
        role="tablist"
        aria-label={`${excerpt.title} — views`}
        className="code-story__tabs"
        onKeyDown={onKeyDown}
      >
        {TABS.map((t) => (
          <button
            key={t}
            ref={(el) => {
              if (el) tabRefs.current.set(t, el);
            }}
            role="tab"
            id={`${baseId}-tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`${baseId}-panel`}
            tabIndex={tab === t ? 0 : -1}
            className={`code-story__tab ${tab === t ? "is-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${tab}`}
        className="code-story__panel"
      >
        {tab === "Code" ? (
          <CodeViewer excerpt={excerpt} />
        ) : (
          <p className="code-story__prose">{storyText[tab]}</p>
        )}
      </div>
    </article>
  );
}
