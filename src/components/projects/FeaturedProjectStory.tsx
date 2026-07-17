import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Project } from "../../types/content";
import { Reveal } from "../common/Reveal";
import { projectRoute } from "./projectRoute";
import "./projects.css";

interface FeaturedProjectStoryProps {
  project: Project;
  visual: ReactNode;
  /** short characterisation shown in the meta rows, e.g. "Reader-first · provenance-labelled" */
  approach?: string;
}

/**
 * Editorial case-study spread for a featured project: sticky title and
 * meta on the left, scrolling visual + system detail on the right.
 */
export function FeaturedProjectStory({ project, visual, approach }: FeaturedProjectStoryProps) {
  return (
    <article
      className="featured-story"
      style={{ ["--accent" as string]: project.accent }}
      aria-labelledby={`featured-${project.slug}`}
    >
      <div className="featured-story__aside">
        <div className="featured-story__sticky">
          <Reveal as="p" className="featured-story__kicker">
            Featured — {project.category}
          </Reveal>
          <Reveal as="h3" delay={60}>
            <span id={`featured-${project.slug}`} className="featured-story__title">
              {project.title}
            </span>
          </Reveal>
          <Reveal as="p" className="featured-story__desc prose" delay={120}>
            {project.shortDescription}
          </Reveal>

          <Reveal delay={180}>
            <dl className="featured-story__meta">
              <div className="meta-row">
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div className="meta-row">
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
              {approach && (
                <div className="meta-row">
                  <dt>Approach</dt>
                  <dd>{approach}</dd>
                </div>
              )}
            </dl>
          </Reveal>

          <Reveal delay={240}>
            <Link
              to={projectRoute(project)}
              className="btn"
              data-cursor="Read"
              data-cursor-accent={project.accent}
            >
              Read the case study
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="featured-story__main">
        <Reveal className="featured-story__visual" delay={100}>
          {visual}
        </Reveal>

        <div className="featured-story__columns">
          <Reveal className="featured-story__col" delay={140}>
            <h4 className="featured-story__col-title">Inside the platform</h4>
            <ul className="featured-story__list">
              {project.keyFeatures.slice(0, 6).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="featured-story__col" delay={220}>
            <h4 className="featured-story__col-title">Engineering position</h4>
            <ul className="featured-story__list featured-story__list--challenges">
              {project.engineeringChallenges.slice(0, 3).map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="featured-story__tech" delay={260}>
          {project.technologies.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </Reveal>
      </div>
    </article>
  );
}
