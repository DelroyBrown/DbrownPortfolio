import { useEffect, useState } from "react";
import { profile } from "../../content/profile";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./motion.css";

const SEEN_KEY = "djb-intro-seen";

const STAGES = [
  "Initialising interface",
  "Loading selected work",
  "Connecting live experiments",
];

function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return true;
  }
}

/**
 * Brief plotted-line entrance. Runs once per session (~1.6s), can be
 * skipped with any click or key, and is skipped entirely on repeat
 * visits and under reduced motion. The decision is made once at mount —
 * `reduced` is already correct on first render because the provider
 * reads the media query synchronously.
 */
export function IntroLoader() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<"running" | "leaving" | "done">(() =>
    hasSeenIntro() || reduced ? "done" : "running",
  );
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (state !== "running") return;

    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage unavailable */
      }
      setState("leaving");
    };

    const timers = [
      window.setTimeout(() => setStage(1), 550),
      window.setTimeout(() => setStage(2), 1050),
      window.setTimeout(finish, 1600),
    ];
    window.addEventListener("pointerdown", finish, { once: true });
    window.addEventListener("keydown", finish, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
    };
  }, [state]);

  useEffect(() => {
    if (state !== "leaving") return;
    const t = window.setTimeout(() => setState("done"), 650);
    return () => clearTimeout(t);
  }, [state]);

  if (state === "done") return null;

  return (
    <div className={`loader ${state === "leaving" ? "is-leaving" : ""}`}>
      <div className="loader__inner">
        <div className="loader__initials">{profile.initials}</div>
        <div className="loader__line" aria-hidden="true" />
        <p className="loader__status" role="status" aria-live="polite">
          {STAGES[stage]}
        </p>
      </div>
      <p className="loader__skip">Click anywhere to skip</p>
    </div>
  );
}
