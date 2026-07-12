import { useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import type { GameProject } from "../../types/content";
import { PlayableGameFrame } from "./PlayableGameFrame";
import "./games.css";

interface GamePreviewProps {
  game: GameProject;
  /** e.g. "16 / 10" — the stage keeps this ratio before and after activation */
  aspect?: string;
}

/**
 * Staged embed: a local screenshot first, the live iframe only after the
 * visitor explicitly presses play. Closing tears the iframe down and
 * returns focus to the play control.
 */
export function GamePreview({ game, aspect = "16 / 9" }: GamePreviewProps) {
  const [active, setActive] = useState(false);
  const [imageOk, setImageOk] = useState(true);
  const playRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setActive(false);
    requestAnimationFrame(() => playRef.current?.focus());
  };

  if (active) {
    return (
      <div className="game-preview" style={{ ["--aspect" as string]: aspect }}>
        <PlayableGameFrame game={game} onClose={close} />
      </div>
    );
  }

  return (
    <div className="game-preview" style={{ ["--aspect" as string]: aspect }}>
      <div className="game-preview__stage">
        {imageOk ? (
          <img
            src={game.image}
            alt={game.imageAlt}
            loading="lazy"
            decoding="async"
            onError={() => setImageOk(false)}
          />
        ) : (
          <div
            className="game-preview__fallback"
            style={{ ["--accent" as string]: game.accent }}
          >
            <p className="game-preview__fallback-title">{game.title}</p>
            <p>{game.subtitle}</p>
          </div>
        )}

        <div className="game-preview__scrim" aria-hidden="true" />

        <div className="game-preview__actions">
          <button
            ref={playRef}
            type="button"
            className="game-preview__play"
            onClick={() => setActive(true)}
            data-cursor="Play"
            data-cursor-accent={game.accent}
          >
            <span className="game-preview__play-ring" aria-hidden="true">
              <Play size={22} aria-hidden="true" />
            </span>
            Play inside the portfolio
          </button>
          <a
            className="game-preview__external"
            href={game.embedUrl}
            target="_blank"
            rel="noreferrer"
          >
            or open in a new tab
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>

        {game.orientationHint && (
          <p className="game-preview__orientation">{game.orientationHint}</p>
        )}
      </div>
    </div>
  );
}
