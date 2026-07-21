import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { FeaturedProjectStory } from "../../components/projects/FeaturedProjectStory";
import { ProjectIndex } from "../../components/projects/ProjectIndex";
import {
  invaderStorm,
  pendulum,
  perennial,
  portfolioSite,
  thread,
} from "../../content/projects";

export function SelectedWork() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionIntroduction
          index="04"
          eyebrow="Selected Work"
          title={<span id="work-title">Whole products, built end to end.</span>}
          lede="Shipped, public and complete — engineering underneath, experience on top."
        />

        <FeaturedProjectStory
          project={perennial}
          approach="Reader-first · provenance-labelled"
          visual={
            <a
              href={perennial.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open The Perennial live (opens in a new tab)"
              data-cursor="Visit"
              data-cursor-accent={perennial.accent}
            >
              <img
                src={perennial.image}
                alt={perennial.imageAlt}
                loading="lazy"
                decoding="async"
              />
            </a>
          }
        />

        <ProjectIndex
          projects={[pendulum, thread, invaderStorm, portfolioSite]}
          startAt={2}
        />
      </div>
    </section>
  );
}
