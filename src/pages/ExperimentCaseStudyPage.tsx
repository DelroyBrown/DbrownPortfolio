import { useCallback } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Scan } from "lucide-react";
import { GithubIcon } from "../components/common/BrandIcons";
import { gameBySlug } from "../content/projects";
import { excerptById } from "../content/codeExcerpts";
import { invaderDiagram, pendulumDiagram, threadDiagram } from "../content/diagrams";
import type { ArchitectureDiagramData } from "../types/content";
import { GamePreview } from "../components/games/GamePreview";
import { GameFocusMode } from "../components/games/GameFocusMode";
import { ArchitectureDiagram } from "../components/diagrams/ArchitectureDiagram";
import { CodeStory } from "../components/code/CodeStory";
import { Reveal } from "../components/common/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { profile } from "../content/profile";
import NotFoundPage from "./NotFoundPage";
import "./pages.css";

/** Per-game presentation config — add an entry when a new game ships. */
const GAME_PRESENTATION: Record<string, { diagram: ArchitectureDiagramData; aspect: string }> = {
  pendulum: { diagram: pendulumDiagram, aspect: "16 / 9.5" },
  thread: { diagram: threadDiagram, aspect: "16 / 9" },
  "invader-storm": { diagram: invaderDiagram, aspect: "16 / 9" },
};

export default function ExperimentCaseStudyPage() {
  const { slug } = useParams();
  const game = slug ? gameBySlug(slug) : undefined;
  const [searchParams, setSearchParams] = useSearchParams();
  const focusMode = searchParams.get("mode") === "focus";

  const exitFocus = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  usePageMeta({
    title: game
      ? `${game.title} — ${profile.name}`
      : `Not found — ${profile.name}`,
    description: game?.shortDescription,
    path: game ? `/experiments/${game.slug}` : "/experiments",
    jsonLd: game
      ? {
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: game.title,
          description: game.shortDescription,
          url: game.liveUrl,
          author: { "@type": "Person", name: profile.name, url: profile.siteUrl },
          gamePlatform: "Web browser",
        }
      : undefined,
  });

  const presentation = game ? GAME_PRESENTATION[game.slug] : undefined;
  if (!game || !presentation) {
    return <NotFoundPage />;
  }

  const { diagram, aspect } = presentation;
  const excerpts = (game.codeExcerptIds ?? []).flatMap((id) => {
    const excerpt = excerptById(id);
    return excerpt ? [excerpt] : [];
  });

  return (
    <div className="page" style={{ ["--accent" as string]: game.accent }}>
      <div className="container">
        <Link className="page__crumb" to="/experiments">
          <ArrowLeft size={13} aria-hidden="true" />
          Interactive exhibition
        </Link>

        <header className="case-study__header">
          <Reveal as="p" className="case-study__kicker">
            {game.category} · {game.year}
          </Reveal>
          <Reveal as="h1" className="case-study__title" delay={60}>
            {game.title}
          </Reveal>
          <Reveal as="p" className="case-study__subtitle" delay={120}>
            {game.subtitle}
          </Reveal>
          <Reveal as="p" className="case-study__meta" delay={160}>
            <span>
              Role — <strong>{game.role}</strong>
            </span>
            <span>
              Status — <strong>{game.status}</strong>
            </span>
          </Reveal>
          <Reveal as="div" className="case-study__actions" delay={200}>
            <button
              type="button"
              className="btn btn--solid"
              onClick={() => setSearchParams({ mode: "focus" })}
              data-cursor="Play"
              data-cursor-accent={game.accent}
            >
              <Scan size={15} aria-hidden="true" />
              Enter focus mode
            </button>
            <a className="btn" href={game.liveUrl} target="_blank" rel="noreferrer">
              Play live
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              className="btn btn--ghost"
              href={game.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon size={15} />
              Repository
            </a>
          </Reveal>
        </header>

        <Reveal delay={140}>
          <GamePreview game={game} aspect={aspect} />
        </Reveal>

        <section className="case-study__section" aria-label="Overview">
          <h2 className="case-study__section-title">The experience</h2>
          <div className="case-study__grid">
            <div className="prose">
              <p>{game.fullDescription}</p>
            </div>
            <ul className="case-study__list">
              {game.keyFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-study__section" aria-label="Engineering">
          <h2 className="case-study__section-title">Engineering position</h2>
          <div className="case-study__grid">
            <ul className="case-study__list">
              {game.engineeringChallenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <ul className="case-study__list">
              {game.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-study__section" aria-label="Architecture">
          <h2 className="case-study__section-title">{diagram.title}</h2>
          <ArchitectureDiagram diagram={diagram} accent={game.accent} />
        </section>

        <section className="case-study__section" aria-label="Code stories">
          <h2 className="case-study__section-title">Engineering stories</h2>
          <div className="case-study__stories">
            {excerpts.map((excerpt) => (
              <CodeStory key={excerpt.id} excerpt={excerpt} accent={game.accent} />
            ))}
          </div>
        </section>

        <section className="case-study__section" aria-label="AI-assisted development">
          <h2 className="case-study__section-title">AI-assisted development</h2>
          <div className="case-study__ai">
            <p className="case-study__ai-note">{game.aiAssistanceNote}</p>
            <div className="case-study__ai-grid">
              <div className="case-study__ai-col">
                <h4>What I directed</h4>
                <ul className="case-study__list">
                  {game.directed.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="case-study__ai-col">
                <h4>What required judgement</h4>
                <ul className="case-study__list">
                  {game.judgement.map((j) => (
                    <li key={j}>{j}</li>
                  ))}
                </ul>
              </div>
              <div className="case-study__ai-col">
                <h4>What AI accelerated</h4>
                <ul className="case-study__list">
                  {game.accelerated.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="case-study__section" aria-label="Technologies">
          <h2 className="case-study__section-title">Technologies</h2>
          <div className="case-study__tech">
            {game.technologies.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      {focusMode && <GameFocusMode game={game} onExit={exitFocus} />}
    </div>
  );
}
