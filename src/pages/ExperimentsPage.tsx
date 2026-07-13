import { SectionIntroduction } from "../components/common/SectionIntroduction";
import { GameShowcase } from "../features/gameExhibition/GameShowcase";
import { InvaderAtmosphere } from "../features/gameExhibition/Exhibition";
import { PendulumRope } from "../features/gameExhibition/PendulumRope";
import { invaderStorm, pendulum, thread } from "../content/projects";
import { usePageMeta } from "../hooks/usePageMeta";
import { profile } from "../content/profile";
import "./pages.css";

export default function ExperimentsPage() {
  usePageMeta({
    title: `Experiments — ${profile.name}`,
    description:
      "Playable browser experiments by Delroy J. Brown: Pendulum, a one-button physics platformer; Thread, a handmade puzzle-platformer; and Invader Storm, a neon arcade shooter.",
    path: "/experiments",
  });

  return (
    <div className="page">
      <div className="container">
        <SectionIntroduction
          index="05"
          eyebrow="Interactive Exhibition"
          title="Three worlds, playable here."
          lede="Complete browser games treated as serious technical and creative work. Press play to load the live builds."
          accent="var(--gold)"
        />
      </div>

      <GameShowcase
        game={pendulum}
        index="05·01"
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
        index="05·02"
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
        index="05·03"
        variant="invader"
        aspect="16 / 9"
        atmosphere={<InvaderAtmosphere />}
      />
    </div>
  );
}
