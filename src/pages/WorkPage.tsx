import { SectionIntroduction } from "../components/common/SectionIntroduction";
import { ProjectIndex } from "../components/projects/ProjectIndex";
import { projects } from "../content/projects";
import { usePageMeta } from "../hooks/usePageMeta";
import { profile } from "../content/profile";
import "./pages.css";

export default function WorkPage() {
  usePageMeta({
    title: `Work — ${profile.name}`,
    description:
      "Selected software projects by Delroy J. Brown — care-sector platforms, browser games and interactive systems.",
    path: "/work",
  });

  return (
    <div className="page">
      <div className="container">
        <SectionIntroduction
          index="04"
          eyebrow="Selected Work"
          title="Whole products, built end to end."
          lede="Every project here is a live, public build — engineering underneath, experience on top."
        />
        <ProjectIndex projects={projects} />
      </div>
    </div>
  );
}
