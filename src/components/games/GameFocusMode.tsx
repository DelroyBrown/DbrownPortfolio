import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GameProject } from "../../types/content";
import { PlayableGameFrame } from "./PlayableGameFrame";
import "./games.css";

interface GameFocusModeProps {
  game: GameProject;
  onExit: () => void;
}

/**
 * Focus Mode — a distraction-free exhibit where the game occupies the
 * screen. Escape exits, focus is trapped while open and restored to the
 * opener afterwards, and body scroll is locked.
 */
export function GameFocusMode({ game, onExit }: GameFocusModeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    opener.current = document.activeElement;
    document.body.style.overflow = "hidden";
    rootRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit();
        return;
      }
      if (e.key !== "Tab") return;
      const root = rootRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>("button, a[href], iframe, [tabindex='-1']"),
      ).filter((el) => el.tabIndex >= 0 || el.tagName === "IFRAME");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [onExit]);

  return createPortal(
    <div
      className="focus-mode"
      role="dialog"
      aria-modal="true"
      aria-label={`${game.title} — focus mode`}
      ref={rootRef}
      tabIndex={-1}
      style={{ ["--accent" as string]: game.accent }}
    >
      <header className="focus-mode__header">
        <p className="focus-mode__title">
          <span aria-hidden="true">◍</span> {game.title}
          <span className="focus-mode__sub">{game.subtitle}</span>
        </p>
        <button type="button" className="btn" onClick={onExit}>
          Exit exhibit
        </button>
      </header>

      <div className="focus-mode__stage">
        <PlayableGameFrame game={game} onClose={onExit} />
      </div>

      {game.orientationHint && (
        <p className="focus-mode__orientation">{game.orientationHint}</p>
      )}
    </div>,
    document.body,
  );
}
