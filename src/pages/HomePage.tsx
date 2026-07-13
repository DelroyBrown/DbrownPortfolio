import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../features/hero/Hero";
import { SelectedWork } from "../features/work/SelectedWork";
import { AiDevelopment } from "../features/aiDevelopment/AiDevelopment";
import { Exhibition } from "../features/gameExhibition/Exhibition";
import { CodeStoriesSection } from "../features/codeStories/CodeStoriesSection";
import { DevelopmentPrinciples } from "../features/approach/DevelopmentPrinciples";
import { TechnologyMap } from "../features/skills/TechnologyMap";
import { Experience } from "../features/experience/Experience";
import { About } from "../features/about/About";
import { ContactPanel } from "../features/contact/ContactPanel";
import { usePageMeta } from "../hooks/usePageMeta";
import { profile } from "../content/profile";
import { scrollToTarget } from "../utils/smoothScroll";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: profile.siteUrl,
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
  address: {
    "@type": "PostalAddress",
    addressLocality: "High Wycombe",
    addressCountry: "GB",
  },
  knowsAbout: [
    "Full-stack development",
    "Python",
    "Django",
    "React",
    "TypeScript",
    "AWS cloud infrastructure",
    "Interactive browser experiences",
    "AI-assisted software development",
  ],
};

export function HomePage() {
  usePageMeta({
    title: "Delroy J. Brown — Creative Full-Stack Software Developer",
    description: profile.metaDescription,
    path: "/",
    jsonLd: personJsonLd,
  });

  const location = useLocation();

  /* Arriving with a hash (e.g. /#work from another route) — settle the
   * layout for a frame, then glide to the section. */
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const t = window.setTimeout(() => scrollToTarget(id), 80);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <Hero />
      <SelectedWork />
      <AiDevelopment />
      <Exhibition />
      <CodeStoriesSection />
      <DevelopmentPrinciples />
      <TechnologyMap />
      <Experience />
      <About />
      <ContactPanel />
    </>
  );
}
