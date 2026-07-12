import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "../../components/common/BrandIcons";
import type { GameProject } from "../../types/content";
import { Reveal } from "../../components/common/Reveal";
import { GamePreview } from "../../components/games/GamePreview";
import "./exhibition.css";

interface GameShowcaseProps {
  game: GameProject;
  index: string;
  variant: "pendulum" | "thread" | "invader";
  aspect: string;
  atmosphere?: ReactNode;
  /** number of technology chips to surface on the homepage teaser */
  techCount?: number;
}

/**
 * A full-width exhibit for one game: atmosphere layer, cinematic title,
 * staged playable embed and a technical aside. Each variant carries its
 * own visual identity via CSS.
 */
export function GameShowcase({
  game,
  index,
  variant,
  aspect,
  atmosphere,
  techCount = 8,
}: GameShowcaseProps) {
  return (
    <article
      className={`showcase showcase--${variant}`}
      id={game.slug}
      aria-labelledby={`showcase-${game.slug}`}
    >
      {atmosphere}

      <div className="container showcase__inner">
        <header className="showcase__header">
          <Reveal as="p" className="showcase__index">
            exhibit {index}
          </Reveal>
          <Reveal as="h3" delay={70}>
            <span id={`showcase-${game.slug}`} className="showcase__title">
              {game.title}
            </span>
          </Reveal>
          <Reveal as="p" className="showcase__subtitle" delay={140}>
            {game.subtitle}
          </Reveal>
        </header>

        <div className="showcase__layout">
          <div className="showcase__media">
            <Reveal delay={120}>
              <GamePreview game={game} aspect={aspect} />
            </Reveal>

            <Reveal as="div" className="showcase__links" delay={200}>
              <a
                className="btn"
                href={game.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Play"
                data-cursor-accent={game.accent}
              >
                Play live
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              <a className="btn btn--ghost" href={game.repositoryUrl} target="_blank" rel="noreferrer">
                <GithubIcon size={15} />
                Repository
              </a>
              <Link
                className="btn btn--ghost"
                to={`/experiments/${game.slug}`}
                data-cursor="Read"
                data-cursor-accent={game.accent}
              >
                Full case study
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <aside className="showcase__panel">
            <Reveal as="p" className="showcase__desc prose" delay={160}>
              {game.fullDescription}
            </Reveal>

            <Reveal delay={220}>
              <h4 className="showcase__panel-label">In play</h4>
              <ul className="showcase__features">
                {game.experienceDetails.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={280}>
              <h4 className="showcase__panel-label">Built with</h4>
              <div className="showcase__tech">
                {game.technologies.slice(0, techCount).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
                <Link className="tag tag--accent" to={`/experiments/${game.slug}`}>
                  + {Math.max(game.technologies.length - techCount, 0)} more
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </article>
  );
}
