import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon } from "../../components/common/BrandIcons";
import { profile } from "../../content/profile";
import { Reveal } from "../../components/common/Reveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { scrollToTarget } from "../../utils/smoothScroll";
import { HeroDevelopmentCanvas } from "./HeroDevelopmentCanvas";
import "./hero.css";

/** Masked vertical phrase rotation — editorial, not a typewriter. */
function RotatingPhrases({ phrases }: { phrases: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % phrases.length),
      3200,
    );
    return () => clearInterval(id);
  }, [phrases.length, reduced]);

  if (reduced) {
    return <span className="hero__phrase-static">{phrases[0]}</span>;
  }

  return (
    <span className="hero__phrases" aria-live="off">
      <span
        className="hero__phrases-track"
        style={{ transform: `translateY(${-index * 100}%)` }}
      >
        {phrases.map((phrase) => (
          <span key={phrase} className="hero__phrase">
            {phrase}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero" id="index" aria-label="Introduction">
      <HeroDevelopmentCanvas />

      <div className="container hero__content">
        <Reveal as="p" className="hero__status">
          <span className="status-chip">{profile.availability}</span>
          <span className="hero__focus">{profile.currentFocus}</span>
        </Reveal>

        <Reveal as="h1" className="hero__name" delay={90}>
          Delroy J.
          <br />
          <span className="hero__name-em">Brown</span>
        </Reveal>

        <div className="hero__row">
          <div className="hero__lede">
            <Reveal as="p" className="hero__title" delay={180}>
              {profile.title}
              <span className="hero__phrase-line">
                <RotatingPhrases phrases={profile.rotatingPhrases} />
              </span>
            </Reveal>

            <Reveal as="p" className="hero__statement prose" delay={260}>
              {profile.statement}
            </Reveal>

            <Reveal as="div" className="hero__ctas" delay={340}>
              <button
                type="button"
                className="btn btn--solid"
                onClick={() => scrollToTarget("experience")}
                data-cursor="View"
              >
                Experience & work
                <ArrowDown size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => scrollToTarget("contact")}
              >
                Contact
              </button>
              <a
                className="btn btn--ghost"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon size={15} />
                GitHub
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              {profile.cvUrl ? (
                <a className="btn btn--ghost" href={profile.cvUrl}>
                  <FileText size={15} aria-hidden="true" />
                  CV
                </a>
              ) : (
                profile.email && (
                  <a
                    className="btn btn--ghost"
                    href={`mailto:${profile.email}?subject=CV%20request`}
                  >
                    <FileText size={15} aria-hidden="true" />
                    CV on request
                  </a>
                )
              )}
            </Reveal>
          </div>
        </div>

        <span className="coord hero__coord-a" aria-hidden="true">
          52.4°N — SYS.OK
        </span>
        <span className="coord hero__coord-b" aria-hidden="true">
          fig. 01 — development field
        </span>
      </div>

      <div className="hero__signal" aria-hidden="true">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path
            className="hero__signal-path"
            d="M0,52 L180,52 L220,14 L420,14 L470,44 L720,44 L760,22 L980,22 L1020,50 L1200,50"
            fill="none"
          />
          <circle className="hero__signal-dot" cx="220" cy="14" r="3" />
          <circle className="hero__signal-dot" cx="470" cy="44" r="3" />
          <circle className="hero__signal-dot" cx="760" cy="22" r="3" />
        </svg>
      </div>
    </section>
  );
}
