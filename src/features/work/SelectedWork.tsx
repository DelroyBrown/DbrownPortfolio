import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { CareCompassVisual } from "../../components/projects/CareCompassVisual";
import { FeaturedProjectStory } from "../../components/projects/FeaturedProjectStory";
import { ProjectIndex } from "../../components/projects/ProjectIndex";
import {
  careCompass,
  invaderStorm,
  pendulum,
  portfolioSite,
  thread,
} from "../../content/projects";

export function SelectedWork() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionIntroduction
          index="01"
          eyebrow="Selected Work"
          title={<span id="work-title">Software shaped around real problems.</span>}
          lede="Maintainable systems, clear user needs, and rules that live where they can be trusted."
        />

        <FeaturedProjectStory project={careCompass} visual={<CareCompassVisual />} />

        <ProjectIndex
          projects={[pendulum, thread, invaderStorm, portfolioSite]}
          startAt={2}
        />
      </div>
    </section>
  );
}
