import type { Project } from "../../types/content";
import { games } from "../../content/projects";

/** Games live under /experiments, everything else under /work. */
export function projectRoute(project: Project): string {
  return games.some((g) => g.slug === project.slug)
    ? `/experiments/${project.slug}`
    : `/work/${project.slug}`;
}
