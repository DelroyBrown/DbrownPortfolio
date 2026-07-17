import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/common/BrandIcons";
import { games, projectBySlug } from "../content/projects";
import { Reveal } from "../components/common/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { profile } from "../content/profile";
import NotFoundPage from "./NotFoundPage";
import "./pages.css";

export default function WorkCaseStudyPage() {
  const { slug } = useParams();
  const project = slug ? projectBySlug(slug) : undefined;
  const isGame = !!project && games.some((g) => g.slug === project.slug);

  usePageMeta({
    title: project
      ? `${project.title} — ${profile.name}`
      : `Not found — ${profile.name}`,
    description: project?.shortDescription,
    path: project ? `/work/${project.slug}` : "/work",
    jsonLd: project
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.shortDescription,
          author: { "@type": "Person", name: profile.name, url: profile.siteUrl },
        }
      : undefined,
  });

  /* Games have richer dedicated case studies. */
  if (!project || isGame) return <NotFoundPage />;

  return (
    <div className="page" style={{ ["--accent" as string]: project.accent }}>
      <div className="container">
        <Link className="page__crumb" to="/work">
          <ArrowLeft size={13} aria-hidden="true" />
          Selected work
        </Link>

        <header className="case-study__header">
          <Reveal as="p" className="case-study__kicker">
            {project.category} · {project.year}
          </Reveal>
          <Reveal as="h1" className="case-study__title" delay={60}>
            {project.title}
          </Reveal>
          <Reveal as="p" className="case-study__subtitle" delay={120}>
            {project.shortDescription}
          </Reveal>
          <Reveal as="p" className="case-study__meta" delay={160}>
            <span>
              Role — <strong>{project.role}</strong>
            </span>
            <span>
              Status — <strong>{project.status}</strong>
            </span>
          </Reveal>
          {(project.liveUrl || project.repositoryUrl) && (
            <Reveal as="div" className="case-study__actions" delay={200}>
              {project.liveUrl && (
                <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Visit
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  className="btn btn--ghost"
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon size={15} />
                  GitHub
                </a>
              )}
            </Reveal>
          )}
        </header>

        {project.image && (
          <Reveal className="featured-story__visual" delay={140}>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} live (opens in a new tab)`}
                data-cursor="Visit"
                data-cursor-accent={project.accent}
              >
                <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
              </a>
            ) : (
              <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
            )}
          </Reveal>
        )}

        <section className="case-study__section" aria-label="Overview">
          <h2 className="case-study__section-title">The problem & the system</h2>
          <div className="case-study__grid">
            <div className="prose">
              <p>{project.fullDescription}</p>
            </div>
            <ul className="case-study__list">
              {project.keyFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-study__section" aria-label="Engineering">
          <h2 className="case-study__section-title">Engineering position</h2>
          <div className="case-study__grid">
            <ul className="case-study__list">
              {project.engineeringChallenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <ul className="case-study__list">
              {project.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-study__section" aria-label="Technologies">
          <h2 className="case-study__section-title">Technologies</h2>
          <div className="case-study__tech">
            {project.technologies.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
