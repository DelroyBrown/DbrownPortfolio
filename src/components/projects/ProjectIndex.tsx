import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../types/content";
import { Reveal } from "../common/Reveal";
import { projectRoute } from "./projectRoute";
import "./projects.css";

interface ProjectIndexProps {
  projects: Project[];
  startAt?: number;
}

/**
 * Numbered editorial index — each row is a full-width link with its own
 * accent, not a card. Hover slides the accent bar in and surfaces the
 * one-line description.
 */
export function ProjectIndex({ projects, startAt = 1 }: ProjectIndexProps) {
  return (
    <ol className="project-index" role="list">
      {projects.map((project, i) => (
        <Reveal as="li" key={project.slug} delay={i * 70}>
          <Link
            to={projectRoute(project)}
            className="project-index__row"
            style={{ ["--accent" as string]: project.accent }}
            data-cursor="Open"
            data-cursor-accent={project.accent}
          >
            <span className="project-index__num" aria-hidden="true">
              {String(startAt + i).padStart(2, "0")}
            </span>
            <span className="project-index__body">
              <span className="project-index__title">{project.title}</span>
              <span className="project-index__desc">{project.shortDescription}</span>
            </span>
            <span className="project-index__meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </span>
            <ArrowUpRight className="project-index__arrow" size={20} aria-hidden="true" />
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
