import type { Profile } from "../types/content";

/**
 * Personal configuration — every name, link and contact detail on the
 * site is read from this file. Edit here, not in components.
 *
 * `email` may be set to null to remove all email links from the site.
 * `siteUrl` is used for canonical/OG metadata — update it when the
 * deployment URL is known.
 */
export const profile: Profile = {
  name: "Delroy J. Brown",
  shortName: "Delroy",
  initials: "DJB",
  title: "Creative Full-Stack Software Developer",
  statement:
    "I create full-stack software, interactive browser experiences and carefully engineered digital products. I use AI to accelerate production, while relying on software-development knowledge to shape architecture, review output and protect quality.",
  rotatingPhrases: [
    "Full-stack systems",
    "Interactive browser experiences",
    "AI-assisted production",
    "Thoughtful software architecture",
    "Creative technical problem-solving",
  ],
  availability: "Open to roles & select projects",
  currentFocus: "Care-sector software · browser physics experiments",
  location: "United Kingdom",
  email: "delroybrown.db@gmail.com",
  github: "https://github.com/DelroyBrown",
  linkedin: null, // add a LinkedIn URL to surface the link in Contact
  cvUrl: null, // add e.g. "/cv/delroy-brown-cv.pdf" once the file exists in /public
  siteUrl: "https://delroybrown.github.io/DbrownPortfolio",
  metaDescription:
    "Full-stack software, interactive browser experiences and AI-assisted development by Delroy J. Brown.",
};
