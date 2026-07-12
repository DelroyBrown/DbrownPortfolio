import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ExternalLink,
  Maximize,
  RotateCcw,
  X,
} from "lucide-react";
import type { GameProject } from "../../types/content";
import "./games.css";

interface PlayableGameFrameProps {
  game: GameProject;
  onClose: () => void;
  /** how long to wait for the iframe's load event before failing over */
  loadTimeoutMs?: number;
}

/**
 * The live game embed. Created only after explicit user interaction and
 * fully torn down on close. Handles: loading state, load-failure
 * fallback, fullscreen, restart, external link, and keeping
 * Space/arrow keys from scrolling the page while the frame chrome has
 * focus (keys inside the iframe already stay in the game).
 */
export function PlayableGameFrame({
  game,
  onClose,
  loadTimeoutMs = 15_000,
}: PlayableGameFrameProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [frameKey, setFrameKey] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const canFullscreen =
    typeof document !== "undefined" && !!document.documentElement.requestFullscreen;

  /* Load-failure detection: cross-origin pages can't be inspected, but a
   * frame that never fires `load` (blocked, offline) is caught here. */
  useEffect(() => {
    if (status !== "loading") return;
    const t = window.setTimeout(() => setStatus("failed"), loadTimeoutMs);
    return () => clearTimeout(t);
  }, [status, frameKey, loadTimeoutMs]);

  const onFrameLoad = useCallback(() => {
    setStatus("ready");
    iframeRef.current?.focus();
  }, []);

  const restart = useCallback(() => {
    setStatus("loading");
    setFrameKey((k) => k + 1);
  }, []);

  const enterFullscreen = useCallback(() => {
    shellRef.current?.requestFullscreen?.().catch(() => {
      /* unsupported or denied — the external link remains available */
    });
  }, []);

  /* Keep game keys from scrolling the page when frame chrome is focused. */
  const onShellKeyDown = useCallback((e: KeyboardEvent) => {
    const scrollKeys = [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (scrollKeys.includes(e.key) && e.target === shellRef.current) {
      e.preventDefault();
    }
  }, []);

  return (
    <div
      className="game-frame"
      ref={shellRef}
      data-cursor-hide
      tabIndex={-1}
      onKeyDown={onShellKeyDown}
    >
      <div className="game-frame__bar">
        <p className="game-frame__title">
          <span className="game-frame__title-dot" aria-hidden="true" />
          {game.title} — live
        </p>
        <div className="game-frame__controls">
          <button
            type="button"
            className="game-frame__btn"
            onClick={restart}
            aria-label={`Restart ${game.title} embed`}
          >
            <RotateCcw size={15} aria-hidden="true" />
          </button>
          {canFullscreen && (
            <button
              type="button"
              className="game-frame__btn"
              onClick={enterFullscreen}
              aria-label={`Play ${game.title} fullscreen`}
            >
              <Maximize size={15} aria-hidden="true" />
            </button>
          )}
          <a
            className="game-frame__btn"
            href={game.embedUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${game.title} in a new tab`}
          >
            <ExternalLink size={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="game-frame__btn game-frame__btn--close"
            onClick={onClose}
            aria-label={`Close ${game.title} embed`}
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="game-frame__stage">
        {status === "loading" && (
          <div className="game-frame__status" role="status" aria-live="polite">
            <span className="game-frame__spinner" aria-hidden="true" />
            Connecting to {game.title}…
          </div>
        )}

        {status === "failed" ? (
          <div className="game-frame__status game-frame__status--failed" role="alert">
            <p>This browser prevented the embedded version from loading.</p>
            <a className="btn" href={game.embedUrl} target="_blank" rel="noreferrer">
              Open the full game in a new tab
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        ) : (
          <iframe
            key={frameKey}
            ref={iframeRef}
            src={game.embedUrl}
            title={`Play ${game.title}`}
            loading="lazy"
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
            onLoad={onFrameLoad}
          />
        )}
      </div>

      <p className="game-frame__hint">
        {game.controlHint} Press <kbd>Tab</kbd> to leave the game and return to the
        page controls.
      </p>
    </div>
  );
}
