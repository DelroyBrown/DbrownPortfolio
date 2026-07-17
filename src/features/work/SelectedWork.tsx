import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { FeaturedProjectStory } from "../../components/projects/FeaturedProjectStory";
import { ProjectIndex } from "../../components/projects/ProjectIndex";
import {
  invaderStorm,
  kybalion,
  pendulum,
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
          title={<span id="work-title">Software shaped around real problems.</span>}
          lede="Maintainable systems, clear user needs, and rules that live where they can be trusted."
        />

        <FeaturedProjectStory
          project={kybalion}
          approach="Reader-first · provenance-labelled"
          visual={
            <a
              href={kybalion.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open The Kybalion live (opens in a new tab)"
              data-cursor="Visit"
              data-cursor-accent={kybalion.accent}
            >
              <img
                src={kybalion.image}
                alt={kybalion.imageAlt}
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
