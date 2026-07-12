import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { invaderStorm, pendulum, thread } from "../../content/projects";
import { GameShowcase } from "./GameShowcase";
import { PendulumRope } from "./PendulumRope";
import "./exhibition.css";

export function InvaderAtmosphere() {
  return (
    <div className="showcase__atmosphere" aria-hidden="true">
      <div className="invader-stars" />
      <div className="invader-horizon" />
      <div className="invader-scanlines" />
    </div>
  );
}

/** The interactive exhibition: both games, playable in place. */
export function Exhibition() {
  return (
    <section className="section section--exhibition" id="experiments" aria-labelledby="exhibition-title">
      <div className="container">
        <SectionIntroduction
          index="03"
          eyebrow="Interactive Exhibition"
          title={<span id="exhibition-title">Three worlds, playable here.</span>}
          lede="Featured AI-assisted projects — complete browser games, built as serious engineering. The live builds load only when you press play."
          accent="var(--gold)"
        />
      </div>

      <GameShowcase
        game={pendulum}
        index="03·01"
        variant="pendulum"
        aspect="16 / 9.5"
        atmosphere={
          <div className="showcase__atmosphere" aria-hidden="true">
            <div className="showcase__glow showcase__glow--moon" />
            <div className="showcase__arches" />
            <PendulumRope />
          </div>
        }
      />

      <GameShowcase
        game={thread}
        index="03·02"
        variant="thread"
        aspect="16 / 9"
        atmosphere={
          <div className="showcase__atmosphere" aria-hidden="true">
            <div className="showcase__glow showcase__glow--lantern" />
            <svg className="thread-line" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                className="thread-line__path"
                d="M0,30 C200,95 380,20 600,64 C820,108 1000,25 1200,55"
              />
              <path
                className="thread-line__pulse"
                d="M0,30 C200,95 380,20 600,64 C820,108 1000,25 1200,55"
              />
            </svg>
          </div>
        }
      />

      <GameShowcase
        game={invaderStorm}
        index="03·03"
        variant="invader"
        aspect="16 / 9"
        atmosphere={<InvaderAtmosphere />}
      />
    </section>
  );
}
