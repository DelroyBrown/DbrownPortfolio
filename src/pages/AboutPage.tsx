import { About } from "../features/about/About";
import { Experience } from "../features/experience/Experience";
import { TechnologyMap } from "../features/skills/TechnologyMap";
import { usePageMeta } from "../hooks/usePageMeta";
import { profile } from "../content/profile";
import "./pages.css";

export default function AboutPage() {
  usePageMeta({
    title: `About — ${profile.name}`,
    description:
      "About Delroy J. Brown — a creative full-stack developer working across Django backends, React interfaces and browser-based interactive experiences.",
    path: "/about",
  });

  return (
    <div className="page">
      <About />
      <Experience />
      <TechnologyMap />
    </div>
  );
}
